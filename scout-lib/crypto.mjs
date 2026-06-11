/**
 * Cryptographic primitives for confirmation tokens and ID generation.
 *
 * Uses Node's built-in `crypto` module — no external dependencies.
 *
 * Token format: <intake_id>.<expiry_unix_seconds>.<hmac_16_hex>
 *   - intake_id is a random 16-char hex
 *   - expiry is a base-10 unix timestamp (10 digits)
 *   - hmac is HMAC-SHA256(intake_id + ":" + expiry, SIGNING_SECRET)
 *     truncated to the first 16 hex characters (64 bits of authenticity)
 *
 * Stateless: we don't need to store tokens — the HMAC + expiry encode
 * everything we need to validate.
 */

import { createHmac, randomBytes } from "node:crypto";

const SIGNING_SECRET = process.env.NETLIFY_SIGNING_SECRET || "";
const CONFIRMATION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

/**
 * Generate a random URL-safe ID of N hex chars (default 16 → 64 bits).
 */
export function generateId(bytes = 8) {
  return randomBytes(bytes).toString("hex");
}

/**
 * Generate a shorter, URL-friendly report ID (10 chars base36-ish).
 * Format: 8-char hex prefix + 2-char timestamp suffix.
 */
export function generateReportId() {
  const prefix = randomBytes(4).toString("hex");
  const suffix = Date.now().toString(36).slice(-2);
  return `${prefix}${suffix}`;
}

/**
 * Build a signed confirmation token for an intake_id.
 * Includes expiry (24h default).
 */
export function buildConfirmationToken(intakeId) {
  if (!SIGNING_SECRET) {
    throw new Error("NETLIFY_SIGNING_SECRET is not set");
  }
  const expiry = Math.floor(Date.now() / 1000) + CONFIRMATION_TTL_SECONDS;
  const hmac = createHmac("sha256", SIGNING_SECRET)
    .update(`${intakeId}:${expiry}`)
    .digest("hex")
    .slice(0, 16);
  return `${intakeId}.${expiry}.${hmac}`;
}

/**
 * Verify a confirmation token. Returns { valid, intakeId, reason } where
 * reason describes the failure mode if invalid.
 */
export function verifyConfirmationToken(token) {
  if (!SIGNING_SECRET) {
    return { valid: false, reason: "Signing secret not configured" };
  }
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "Missing token" };
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false, reason: "Malformed token" };
  }
  const [intakeId, expiryStr, providedHmac] = parts;
  const expiry = parseInt(expiryStr, 10);
  if (!Number.isFinite(expiry)) {
    return { valid: false, reason: "Invalid expiry" };
  }
  if (Date.now() / 1000 > expiry) {
    return { valid: false, reason: "Token expired" };
  }
  const expectedHmac = createHmac("sha256", SIGNING_SECRET)
    .update(`${intakeId}:${expiry}`)
    .digest("hex")
    .slice(0, 16);
  if (expectedHmac !== providedHmac) {
    return { valid: false, reason: "Signature mismatch" };
  }
  return { valid: true, intakeId };
}
