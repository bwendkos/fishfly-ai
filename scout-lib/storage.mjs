/**
 * Netlify Blobs storage wrapper for Trip Scout.
 *
 * Mirrors safety.road.voyage's storage.js with one Trip-Scout-specific addition:
 * the `intakes-by-email` index store, which enables "show me my past trips"
 * queries without scanning the whole intakes store.
 *
 * Four logical stores:
 *   - "intake"               — intake records keyed by intake_id (JSON)
 *   - "intakes-by-email"     — INDEX: email_hash → list of intake_ids (JSON)
 *   - "report"               — rendered HTML reports keyed by report_id (HTML string)
 *   - "report-meta"          — report metadata keyed by report_id (JSON)
 *
 * NOTE: getStore() requires being invoked inside a Netlify Function context.
 * For local testing, set NETLIFY_BLOBS_CONTEXT or use the Netlify CLI.
 */

import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

const INTAKE_STORE = "intake";
const INTAKES_BY_EMAIL_STORE = "intakes-by-email";
const REPORT_STORE = "report";
const META_STORE = "report-meta";

/* ============================================================ */
/*  Intake records                                                */
/* ============================================================ */

export async function saveIntake(intakeId, intake) {
  const store = getStore(INTAKE_STORE);
  await store.setJSON(intakeId, {
    ...intake,
    intake_id: intakeId,
    created_at: new Date().toISOString(),
    confirmed_at: null,
    report_id: null,
  });
  // Update email index so we can answer "all intakes for this email" later.
  if (intake.email) {
    await appendEmailIndex(intake.email, intakeId);
  }
}

export async function getIntake(intakeId) {
  const store = getStore(INTAKE_STORE);
  return store.get(intakeId, { type: "json" });
}

export async function markIntakeConfirmed(intakeId) {
  const store = getStore(INTAKE_STORE);
  const intake = await store.get(intakeId, { type: "json" });
  if (!intake) throw new Error(`Intake not found: ${intakeId}`);
  intake.confirmed_at = new Date().toISOString();
  await store.setJSON(intakeId, intake);
  return intake;
}

export async function setIntakeReportId(intakeId, reportId) {
  const store = getStore(INTAKE_STORE);
  const intake = await store.get(intakeId, { type: "json" });
  if (!intake) throw new Error(`Intake not found: ${intakeId}`);
  intake.report_id = reportId;
  intake.generated_at = new Date().toISOString();
  await store.setJSON(intakeId, intake);
}

/* ============================================================ */
/*  Email index — Trip Scout addition for return-user queries     */
/* ============================================================ */

function hashEmail(email) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export async function appendEmailIndex(email, intakeId) {
  const store = getStore(INTAKES_BY_EMAIL_STORE);
  const key = hashEmail(email);
  const existing = (await store.get(key, { type: "json" })) || {
    email: email.toLowerCase(),
    intake_ids: [],
    first_seen_at: new Date().toISOString(),
  };
  existing.intake_ids.push(intakeId);
  existing.last_seen_at = new Date().toISOString();
  await store.setJSON(key, existing);
}

export async function getIntakesByEmail(email) {
  const store = getStore(INTAKES_BY_EMAIL_STORE);
  const record = await store.get(hashEmail(email), { type: "json" });
  return record || { email: email.toLowerCase(), intake_ids: [] };
}

/* ============================================================ */
/*  Reports — rendered HTML                                       */
/* ============================================================ */

export async function saveReport(reportId, html, metadata) {
  const reportStore = getStore(REPORT_STORE);
  const metaStore = getStore(META_STORE);
  await Promise.all([
    reportStore.set(reportId, html, { metadata: { contentType: "text/html" } }),
    metaStore.setJSON(reportId, {
      ...metadata,
      report_id: reportId,
      created_at: new Date().toISOString(),
    }),
  ]);
}

export async function getReport(reportId) {
  const store = getStore(REPORT_STORE);
  return store.get(reportId);
}

export async function getReportMeta(reportId) {
  const store = getStore(META_STORE);
  return store.get(reportId, { type: "json" });
}
