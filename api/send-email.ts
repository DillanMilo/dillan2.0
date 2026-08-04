import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isAllowedOrigin, verifyTurnstile } from './contact-security.js';
import { sendContactEmail } from './send-email-core.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  const originAllowed = isAllowedOrigin(origin);

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (originAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return originAllowed ? res.status(204).end() : res.status(403).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!originAllowed) {
    return res.status(403).json({ error: 'Request origin not allowed' });
  }

  const contentType = req.headers['content-type'];
  if (typeof contentType !== 'string' || !contentType.toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  const contentLength = Number(req.headers['content-length']);
  if (Number.isFinite(contentLength) && contentLength > 12_000) {
    return res.status(413).json({ error: 'Request body too large' });
  }

  try {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const body = req.body as Record<string, unknown>;

    // Bots that fill the hidden honeypot get a fake success without using Resend.
    if (typeof body.website === 'string' && body.website.length > 0) {
      return res.status(200).json({ success: true });
    }

    const forwardedFor = req.headers['x-forwarded-for'];
    const remoteIp = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)
      ?.split(',')[0]
      ?.trim();
    const verification = await verifyTurnstile(body.turnstileToken, remoteIp);

    if (!verification.ok) {
      const status = verification.reason === 'not-configured' || verification.reason === 'unavailable' ? 503 : 403;
      return res.status(status).json({ error: 'Human verification failed' });
    }

    const result = await sendContactEmail(body);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
