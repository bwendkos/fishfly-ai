/**
 * Email templates for Trip Scout transactional emails.
 *
 * Two emails per user submission:
 *   1. confirmationEmail — sent immediately after intake, contains magic link
 *   2. reportReadyEmail  — sent after generation completes, contains report URL
 *
 * Both return { subject, html } objects to pass to sendEmail() in lib/email.js.
 *
 * Voice: warm, direct, expert fishing buddy. Matches Trip Scout's brand voice.
 */

const FROM_NAME = process.env.EMAIL_FROM_NAME || "FishFly";

/* ============================================================ */
/*  Confirmation email — sent after intake submission             */
/* ============================================================ */

export function confirmationEmail({ firstName, confirmationUrl, destination }) {
  const subject = `${firstName}, confirm your FishFly Trip Scout report request`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Confirm your Trip Scout report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1a1f2e; margin: 0; padding: 24px; background: #f7f3ec; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; }
    h1 { font-family: "Playfair Display", Georgia, serif; font-size: 24px; margin: 0 0 16px; color: #1a1f2e; }
    p { font-size: 16px; margin: 0 0 16px; }
    .button { display: inline-block; background: #1e3a5f; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #d8d2c4; font-size: 14px; color: #4a5568; }
    .url { word-break: break-all; font-size: 13px; color: #8b8478; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hey ${escapeHtml(firstName)} —</h1>
    <p>Almost there. Click below to confirm your Trip Scout request for <strong>${escapeHtml(destination)}</strong> and we'll start generating your report.</p>
    <p><a class="button" href="${confirmationUrl}">Generate my trip report</a></p>
    <p>Your report will take 2-3 minutes. We'll email it to you the moment it's ready.</p>
    <div class="footer">
      <p>If the button doesn't work, paste this into your browser:<br>
        <span class="url">${confirmationUrl}</span></p>
      <p>This link expires in 24 hours. If you didn't request this, you can ignore this email.</p>
      <p>— ${FROM_NAME}<br>fishfly.ai</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, html };
}

/* ============================================================ */
/*  Report-ready email — sent after generation completes          */
/* ============================================================ */

export function reportReadyEmail({ firstName, reportUrl, destination, species }) {
  const speciesText = Array.isArray(species) ? species.join(", ") : species;
  const subject = `${firstName}, your Trip Scout report for ${destination} is ready`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Trip Scout report is ready</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #1a1f2e; margin: 0; padding: 24px; background: #f7f3ec; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; }
    h1 { font-family: "Playfair Display", Georgia, serif; font-size: 24px; margin: 0 0 16px; color: #1a1f2e; }
    p { font-size: 16px; margin: 0 0 16px; }
    .button { display: inline-block; background: #1e3a5f; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 16px 0; }
    .summary { background: #efe9df; padding: 16px; border-left: 4px solid #c89668; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #d8d2c4; font-size: 14px; color: #4a5568; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your report is ready, ${escapeHtml(firstName)}.</h1>
    <p>Here's everything you asked for — tide tables, fly recommendations, gear specs, and the local intel that's worth knowing before you go.</p>

    <div class="summary">
      <strong>${escapeHtml(destination)}</strong><br>
      Targeting: ${escapeHtml(speciesText || "your selected species")}
    </div>

    <p><a class="button" href="${reportUrl}">View my report</a></p>

    <p>The report is saved to your account — bookmark the link or come back to <strong>fishfly.ai/scout</strong> any time. Use the "Print to PDF" button at the top of the report to take it with you offline.</p>

    <div class="footer">
      <p>Tight lines.<br>— ${FROM_NAME}</p>
      <p style="font-size: 12px; color: #8b8478;">FishFly may earn a commission when you purchase gear through our partner retailers. This costs you nothing extra and helps us keep Trip Scout free.</p>
    </div>
  </div>
</body>
</html>`;
  return { subject, html };
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
