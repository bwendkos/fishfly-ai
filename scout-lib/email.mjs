/**
 * Email sender using Gmail SMTP (Google Workspace).
 *
 * Sender: brad@road.voyage (configurable via SENDER_EMAIL env)
 * Authentication: Gmail App Password (16-char app-specific password)
 *   Generate at https://myaccount.google.com/apppasswords
 *   Requires 2-Step Verification enabled on the Google Account.
 *
 * Required env vars:
 *   GMAIL_SMTP_USER  — full email address (e.g. brad@road.voyage)
 *   GMAIL_SMTP_PASS  — the 16-char app password (NOT the regular account password)
 *   SENDER_EMAIL     — From: header (e.g. brad@road.voyage)
 *   SENDER_NAME      — display name (e.g. "Brad — Road Voyage")
 *
 * For higher volumes (>500/day) migrate to Resend or another transactional
 * provider. Code structure makes this swap trivial — only this file changes.
 */

import nodemailer from "nodemailer";

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.GMAIL_SMTP_USER;
  const pass = process.env.GMAIL_SMTP_PASS;
  if (!user || !pass) {
    throw new Error("GMAIL_SMTP_USER and GMAIL_SMTP_PASS must be set");
  }

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  return cachedTransporter;
}

/**
 * Send an email.
 *
 * @param {object} opts
 * @param {string} opts.to       - recipient email
 * @param {string} opts.subject  - email subject
 * @param {string} opts.html     - HTML body
 * @param {string} [opts.text]   - optional plain-text fallback (auto-derived if omitted)
 * @returns {Promise<object>}    - nodemailer info object
 */
export async function sendEmail({ to, subject, html, text }) {
  const senderEmail = process.env.EMAIL_FROM_ADDRESS || process.env.GMAIL_SMTP_USER;
  const senderName = process.env.EMAIL_FROM_NAME || "FishFly";
  const from = `"${senderName}" <${senderEmail}>`;

  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text || stripHtml(html),
  });

  console.log(`[email] sent to=${to} subject="${subject}" messageId=${info.messageId}`);
  return info;
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
