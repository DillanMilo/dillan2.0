import React, { useState, useRef, useEffect } from "react";
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactFormSuccess,
  trackContactFormValidationError,
} from "../utils/analytics";

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_ACTION = "contact_form";

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      size: "flexible";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const finish = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile did not initialize"));
    };

    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", finish, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Turnstile failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", finish, { once: true });
    script.addEventListener("error", () => reject(new Error("Turnstile failed to load")), {
      once: true,
    });
    document.head.appendChild(script);
  });
}

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isVisible, setIsVisible] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const hasStartedForm = useRef(false);
  const turnstileSiteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
    (import.meta.env.DEV ? TURNSTILE_TEST_SITE_KEY : "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) {
      setVerificationError("MESSAGE FORM IS TEMPORARILY UNAVAILABLE.");
      return;
    }

    let active = true;

    loadTurnstile()
      .then((turnstile) => {
        if (!active || !turnstileContainerRef.current || turnstileWidgetId.current) return;

        turnstileWidgetId.current = turnstile.render(turnstileContainerRef.current, {
          sitekey: turnstileSiteKey,
          action: TURNSTILE_ACTION,
          theme: "dark",
          size: "flexible",
          callback: (token) => {
            if (!active) return;
            setTurnstileToken(token);
            setVerificationError("");
          },
          "expired-callback": () => {
            if (!active) return;
            setTurnstileToken("");
            setVerificationError("VERIFICATION EXPIRED. PLEASE TRY AGAIN.");
          },
          "error-callback": () => {
            if (!active) return;
            setTurnstileToken("");
            setVerificationError("HUMAN VERIFICATION FAILED. PLEASE RETRY.");
          },
        });
      })
      .catch(() => {
        if (active) setVerificationError("HUMAN VERIFICATION COULD NOT LOAD.");
      });

    return () => {
      active = false;
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [turnstileSiteKey]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      trackContactFormValidationError(Object.keys(newErrors));
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name !== "website" && !hasStartedForm.current) {
      hasStartedForm.current = true;
      trackContactFormStart(name);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!turnstileToken) {
      setVerificationError("PLEASE COMPLETE HUMAN VERIFICATION.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Honeypot anti-spam: if the hidden field has a value, silently "succeed"
    if (formData.website) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "", website: "" });
      hasStartedForm.current = false;
      setIsSubmitting(false);
      return;
    }

    trackContactFormSubmit();

    try {
      // Using Resend via Vercel serverless function
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: formData.website,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        trackContactFormSuccess();
        setFormData({ name: "", email: "", message: "", website: "" });
        hasStartedForm.current = false;
      } else {
        setSubmitStatus("error");
        trackContactFormError(`http_${response.status}`);
      }
    } catch {
      setSubmitStatus("error");
      trackContactFormError("network_error");
    } finally {
      resetTurnstile();
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`w-full max-w-md mx-auto space-y-5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      noValidate
    >
      {/* Honeypot field - hidden from real users, bots will fill it in */}
      <div
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="YOUR NAME"
          className={`w-full px-4 py-3 bg-black/60 border-2 ${errors.name ? "border-red-500" : "border-white/30"
            } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300`}
          aria-label="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas m-0">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="YOUR EMAIL"
          className={`w-full px-4 py-3 bg-black/60 border-2 ${errors.email ? "border-red-500" : "border-white/30"
            } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300`}
          aria-label="Your email address"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas m-0">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="relative mt-6">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="TELL ME ABOUT YOUR PROJECT..."
          rows={4}
          className={`w-full px-4 py-3 bg-black/60 border-2 ${errors.message ? "border-red-500" : "border-white/30"
            } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none`}
          aria-label="Your message"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas m-0">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div ref={turnstileContainerRef} className="min-h-[65px] w-full" />
        {verificationError && (
          <p className="mt-2 text-center text-red-400 text-sm font-bebas tracking-wider">
            {verificationError}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className={`w-full mt-6 px-6 py-4 font-bebas text-xl tracking-wider transition-all duration-300 ${isSubmitting
            ? "bg-gray-600 cursor-not-allowed"
            : !turnstileToken
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-600/30"
          } text-white`}
        aria-label="Send message"
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="text-center py-3 bg-green-600/20 border border-green-500 text-green-400 font-bebas text-lg tracking-wider animate-fadeIn">
          MESSAGE SENT! I'LL BE IN TOUCH SOON.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="text-center py-3 bg-red-600/20 border border-red-500 text-red-400 font-bebas text-lg tracking-wider animate-fadeIn">
          OOPS! SOMETHING WENT WRONG. TRY AGAIN OR EMAIL ME DIRECTLY.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
