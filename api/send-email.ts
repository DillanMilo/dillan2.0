import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://dillanmilo.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, website } = req.body;

    // Honeypot anti-spam: if the hidden field has a value, return fake success
    if (website) {
      return res.status(200).json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate input lengths
    if (name.length > 200) {
      return res.status(400).json({ error: 'Name must be 200 characters or fewer' });
    }
    if (email.length > 320) {
      return res.status(400).json({ error: 'Email must be 320 characters or fewer' });
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message must be 5000 characters or fewer' });
    }

    // Sanitize user inputs to prevent HTML injection
    const safeName = sanitizeHtml(name);
    const safeEmail = sanitizeHtml(email);
    const safeMessage = sanitizeHtml(message);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Dillan Milo <contact@dillanmilo.com>',
      to: 'dillan@creativecurrents.io',
      replyTo: email,
      subject: `CC Inquiry — ${safeName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a1a;">
          <!-- Header with logo -->
          <div style="background-color: #0a0a0a; padding: 32px 40px 24px; text-align: center; border-bottom: 1px solid #1a1a1a;">
            <img src="https://dillanmilo.com/3B82C20B-8F01-4D2B-8EAF-1B5FD4F9EBCE.PNG" alt="Creative Currents" style="height: 48px; margin-bottom: 8px;" />
            <p style="color: #555; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0;">New Inquiry</p>
          </div>

          <!-- Contact details -->
          <div style="padding: 32px 40px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 80px; vertical-align: top;">From</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #e0e0e0; font-size: 15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #1a1a1a;"><a href="mailto:${safeEmail}" style="color: #4a9eff; text-decoration: none; font-size: 15px;">${safeEmail}</a></td>
              </tr>
            </table>

            <!-- Message body -->
            <div style="background-color: #111; padding: 24px; border-radius: 8px; border-left: 3px solid #4a9eff;">
              <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">Message</p>
              <p style="white-space: pre-wrap; color: #ccc; font-size: 15px; line-height: 1.6; margin: 0;">${safeMessage}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="color: #444; font-size: 11px; margin: 0;">dillanmilo.com &middot; Creative Currents</p>
          </div>
        </div>
      `,
      text: `
CC Inquiry — ${safeName}

From: ${safeName}
Email: ${safeEmail}

Message:
${safeMessage}

—
dillanmilo.com · Creative Currents
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
