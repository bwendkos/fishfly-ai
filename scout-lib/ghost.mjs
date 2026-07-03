/**
 * Ghost Admin API wrapper.
 *
 * Adds a subscriber to the FishFly Ghost newsletter with source/attribution
 * labels so the list can be segmented later. Called from scout-confirm and
 * eat-window-confirm when an intake has newsletter_opt_in=true.
 *
 * Required env vars:
 *   GHOST_API_URL         — Ghost admin base, e.g. https://fly-fish-fish-fly.ghost.io
 *   GHOST_ADMIN_API_KEY   — Admin API key, format: <id>:<secret_hex>
 *
 * If env vars are not set, all calls become no-ops and log a warning. Dev/
 * preview environments don't need Ghost configured — emails still send,
 * reports still generate, only newsletter sync is skipped.
 */

import { createHmac } from "node:crypto";

const ADMIN_URL = process.env.GHOST_API_URL;
const ADMIN_KEY = process.env.GHOST_ADMIN_API_KEY;

const ENABLED = Boolean(ADMIN_URL && ADMIN_KEY);

/**
 * Add a member to the Ghost newsletter list with attribution labels.
 *
 * @param {object} subscriber
 * @param {string} subscriber.email
 * @param {string} subscriber.firstName
 * @param {string[]} [subscriber.labels] - attribution labels for segmentation
 *                                          (e.g. "source:trip-scout", "destination:andros-bahamas")
 * @returns {Promise<{ added: boolean, reason?: string }>}
 */
export async function addNewsletterSubscriber({ email, firstName, labels = [] }) {
  if (!ENABLED) {
    console.warn("[ghost] Skipping subscriber add — GHOST_API_URL / GHOST_ADMIN_API_KEY not configured");
    return { added: false, reason: "Ghost not configured" };
  }

  // Labels come entirely from the caller. The old "rv-safety" default was a
  // stale relic from the Road Voyage fork — removed 2026-07-03 to keep the
  // FishFly member list clean.
  const allLabels = labels;

  try {
    const token = signJwt(ADMIN_KEY);
    const res = await fetch(`${ADMIN_URL}/ghost/api/admin/members/`, {
      method: "POST",
      headers: {
        Authorization: `Ghost ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        members: [
          {
            email,
            name: firstName,
            labels: allLabels.map((name) => ({ name })),
            subscribed: true,
          },
        ],
      }),
    });

    if (res.status === 422) {
      // Member already exists — try to update labels instead
      console.log(`[ghost] Member ${email} already exists; attempting label update`);
      return await updateMemberLabels(email, allLabels, token);
    }

    if (!res.ok) {
      const text = await res.text();
      console.error(`[ghost] Add failed: ${res.status} ${text}`);
      return { added: false, reason: `HTTP ${res.status}` };
    }

    console.log(`[ghost] Added ${email} with labels [${allLabels.join(", ")}]`);
    return { added: true };
  } catch (err) {
    console.error("[ghost] Add error:", err);
    return { added: false, reason: err.message };
  }
}

async function updateMemberLabels(email, labels, token) {
  try {
    // Lookup by email
    const lookupRes = await fetch(
      `${ADMIN_URL}/ghost/api/admin/members/?filter=${encodeURIComponent(`email:${email}`)}`,
      { headers: { Authorization: `Ghost ${token}` } }
    );
    if (!lookupRes.ok) return { added: false, reason: "Lookup failed" };
    const data = await lookupRes.json();
    const member = data.members?.[0];
    if (!member) return { added: false, reason: "Not found after 422" };

    const existing = member.labels?.map((l) => l.name) || [];
    const merged = Array.from(new Set([...existing, ...labels]));

    const updateRes = await fetch(`${ADMIN_URL}/ghost/api/admin/members/${member.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Ghost ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        members: [
          {
            id: member.id,
            labels: merged.map((name) => ({ name })),
            subscribed: true,
          },
        ],
      }),
    });

    if (!updateRes.ok) {
      const t = await updateRes.text();
      return { added: false, reason: `Update HTTP ${updateRes.status}: ${t}` };
    }
    console.log(`[ghost] Updated ${email} labels → [${merged.join(", ")}]`);
    return { added: true };
  } catch (err) {
    return { added: false, reason: err.message };
  }
}

/* ============================================================ */
/*  JWT signing — Ghost Admin API uses a short-lived HS256 JWT   */
/* ============================================================ */

function signJwt(adminKey) {
  const [id, secret] = adminKey.split(":");
  if (!id || !secret) {
    throw new Error("GHOST_ADMIN_API_KEY must be in <id>:<secret_hex> format");
  }

  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT", kid: id }));
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(
    JSON.stringify({ iat: now, exp: now + 5 * 60, aud: "/admin/" })
  );

  const data = `${header}.${payload}`;
  const sig = createHmac("sha256", Buffer.from(secret, "hex"))
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${sig}`;
}

function base64url(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
