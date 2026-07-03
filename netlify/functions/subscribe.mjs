/**
 * POST /.netlify/functions/subscribe
 *
 * Public newsletter subscription endpoint. Used by:
 *  - fishfly.ai landing hero "Notify me" form (source: "landing")
 *  - blog.fishfly.ai Field Notes subscribe strip (source: "field-notes-strip")
 *  - blog.fishfly.ai post-page inline nudge (source: "field-notes-nudge")
 *
 * Request body:
 *   { email: string, source?: string, _gotcha?: string }
 *
 * Behavior:
 *   1. Honeypot check — bots that fill _gotcha get silent 200
 *   2. Email validation
 *   3. Add member to Ghost with `source:<src>` label (via scout-lib/ghost.mjs
 *      which handles the 422-already-exists case with label-merge)
 *   4. Send a small welcome email in Brad's voice (fire-and-forget)
 *   5. Return 200 to caller
 *
 * On duplicate signup, treats as success (idempotent) to avoid leaking
 * subscriber state via error messages (enumeration attack prevention).
 *
 * CORS: allows POST from https://fishfly.ai and https://blog.fishfly.ai.
 *
 * NOTE: This replaces the legacy subscribe.js (CommonJS, no welcome email,
 * fishfly.ai-only CORS) as of PR #56 (2026-07-03). Ghost Portal was tried
 * for the blog forms (PR #53 + #54) but its send-magic-link endpoint returns
 * 400 to inline form submits on this specific site — Portal's client JS
 * silently swallows the error and shows optimistic success. Routing through
 * this function is reliable and gives us: (a) verified capture, (b) source
 * attribution via labels, (c) a real welcome-email touchpoint.
 */

import { addNewsletterSubscriber } from "../../scout-lib/ghost.mjs";
import { sendEmail } from "../../scout-lib/email.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Whitelist of allowed source values. Anything else falls back to "landing"
// so a malicious client can't inject arbitrary labels via the label wire.
const ALLOWED_SOURCES = new Set([
  "landing",
  "field-notes-strip",
  "field-notes-nudge",
]);

const CORS_ORIGINS = new Set([
  "https://fishfly.ai",
  "https://blog.fishfly.ai",
]);

function corsHeaders(origin) {
  const allowed = CORS_ORIGINS.has(origin) ? origin : "https://fishfly.ai";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

function jsonResponse(status, body, origin) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(origin) });
}

export default async (req) => {
  const origin = req.headers.get("origin") || "";

  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed" }, origin);
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse(400, { ok: false, message: "Invalid JSON" }, origin);
  }

  const { email, source, _gotcha } = payload || {};

  // Honeypot — silently succeed for bots that filled the hidden field
  if (_gotcha) {
    return jsonResponse(200, { ok: true, message: "Subscribed" }, origin);
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return jsonResponse(400, { ok: false, message: "Please enter a valid email address." }, origin);
  }

  const normalizedSource = ALLOWED_SOURCES.has(source) ? source : "landing";
  const labels = [`source:${normalizedSource}`];

  // ---- Ghost add (await; this is the primary side effect) ----
  let ghostResult;
  try {
    ghostResult = await addNewsletterSubscriber({
      email,
      firstName: null,
      labels,
    });
  } catch (err) {
    console.error("[subscribe] ghost add threw:", err);
    return jsonResponse(500, { ok: false, message: "Could not subscribe. Try again later." }, origin);
  }

  if (!ghostResult.added) {
    // Reasons include "member already exists" (idempotent success),
    // "Ghost not configured" (dev/preview), or transient errors.
    console.warn(`[subscribe] ghost.added=false for ${email} reason=${ghostResult.reason}`);
    // Do not surface the reason to the caller. Idempotent success is the
    // right user-facing behavior in every case here.
  } else {
    console.log(`[subscribe] added ${email} with labels=[${labels.join(",")}]`);
  }

  // ---- Welcome email (fire-and-forget) ----
  // Send a small, personal note from Brad. Non-blocking — if SMTP is down,
  // the subscribe still succeeds and the user is captured in Ghost. We
  // accept the tradeoff of some subscribers not getting a welcome email
  // over blocking the whole flow on transient SMTP failure.
  sendEmail({
    to: email,
    subject: "Welcome to FishFly Field Notes — a note from Brad",
    html: welcomeHtml(),
  })
    .then(() => console.log(`[subscribe] welcome email sent to ${email}`))
    .catch((err) => console.error("[subscribe] welcome email failed:", err?.message));

  return jsonResponse(200, { ok: true, message: "Subscribed" }, origin);
};

function welcomeHtml() {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f7f3ec;">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;font-family:'Playfair Display',Georgia,serif;font-size:17px;line-height:1.55;color:#1a1f2e;">

<p style="margin:0 0 18px;">Hey — thanks for signing up.</p>

<p style="margin:0 0 18px;">I'm Brad. FishFly is a personal project. I built it in retirement, because after decades running an online music education company I finally had time to make the saltwater fly-fishing planning toolkit I'd wished existed for years.</p>

<p style="margin:0 0 18px;">Field Notes go out roughly weekly. Destination guides, technique deep-dives, product updates, and occasional stuff I'm working on. If you find them useful, tell me what to build next. If you don't, unsubscribe — every email has a one-click link at the bottom.</p>

<p style="margin:0 0 18px;">Everything's free right now while I figure out whether it's actually useful to other anglers. Poke around:</p>

<ul style="margin:0 0 18px;padding-left:20px;">
  <li style="margin-bottom:6px;"><a href="https://fishfly.ai/library/" style="color:#1e3a5f;text-decoration:underline;">Saltwater Fly Library</a> — 204 patterns, cross-referenced by destination and species</li>
  <li style="margin-bottom:6px;"><a href="https://fishfly.ai/scout/" style="color:#1e3a5f;text-decoration:underline;">Trip Scout</a> — personalized AI-generated trip report for your next trip</li>
  <li style="margin-bottom:6px;"><a href="https://fishfly.ai/eat-window/" style="color:#1e3a5f;text-decoration:underline;">Eat Window</a> — daily "should I fish today" forecast for your home waters</li>
</ul>

<p style="margin:0 0 18px;">Tight lines,<br>Brad</p>

<p style="margin:24px 0 0;font-family:'JetBrains Mono',monospace;font-size:12px;color:#8b8478;">
fish·fly &middot; <a href="https://fishfly.ai/" style="color:#8b8478;">fishfly.ai</a>
</p>

</div></body></html>`;
}
