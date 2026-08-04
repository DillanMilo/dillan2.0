const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

export const CONTACT_FORM_ACTION = "contact_form";

interface TurnstileVerificationResponse {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

export type TurnstileVerificationResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "not-configured" | "unavailable" };

function isProduction(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

export function getAllowedOrigins(): string[] {
  const configured = process.env.CONTACT_ALLOWED_ORIGINS
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  const origins = configured?.length
    ? configured
    : ["https://dillanmilo.com", "https://www.dillanmilo.com"];

  if (process.env.VERCEL_ENV === "preview") {
    for (const hostname of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) {
      if (hostname) origins.push(`https://${hostname}`);
    }
  }

  if (!isProduction()) {
    origins.push("http://localhost:5173", "http://127.0.0.1:5173");
  }

  return [...new Set(origins)];
}

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;

  try {
    return getAllowedOrigins().includes(new URL(origin).origin);
  } catch {
    return false;
  }
}

function getAllowedHostnames(): string[] {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES
    ?.split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  return configured?.length ? configured : ["dillanmilo.com", "www.dillanmilo.com"];
}

export async function verifyTurnstile(
  token: unknown,
  remoteIp?: string,
): Promise<TurnstileVerificationResult> {
  if (typeof token !== "string" || token.length < 1 || token.length > 2048) {
    return { ok: false, reason: "invalid" };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY || (!isProduction() ? TURNSTILE_TEST_SECRET : "");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured; contact form is disabled.");
    return { ok: false, reason: "not-configured" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("Turnstile verification request failed:", response.status);
      return { ok: false, reason: "unavailable" };
    }

    const result = (await response.json()) as TurnstileVerificationResponse;
    const hostnameAllowed =
      !isProduction() ||
      (typeof result.hostname === "string" &&
        getAllowedHostnames().includes(result.hostname.toLowerCase()));

    if (!result.success || result.action !== CONTACT_FORM_ACTION || !hostnameAllowed) {
      console.warn("Turnstile rejected a contact submission:", {
        hostname: result.hostname,
        action: result.action,
        errorCodes: result["error-codes"],
      });
      return { ok: false, reason: "invalid" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Turnstile verification unavailable:", error instanceof Error ? error.message : error);
    return { ok: false, reason: "unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}
