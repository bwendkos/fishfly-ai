/**
 * Netlify Blobs storage wrapper for Bite Window.
 *
 * Three logical stores (separate from Trip Scout's stores so the two products
 * don't share intake records, but they DO share the WorldTides + StormGlass
 * data caches — those stay in their original `tide-cache` / `weather-cache`
 * stores per PRs #20 + #21):
 *
 *   - "bite-intake"      — intake records keyed by intake_id (JSON)
 *   - "bite-report"      — rendered HTML reports keyed by report_id (HTML string)
 *   - "bite-report-meta" — report metadata keyed by report_id (JSON)
 *
 * Mirrors scout-lib/storage.mjs's pattern. getStore() requires being invoked
 * inside a Netlify Function context.
 */

import { getStore } from "@netlify/blobs";

const INTAKE_STORE = "bite-intake";
const REPORT_STORE = "bite-report";
const META_STORE = "bite-report-meta";

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
}

export async function getIntake(intakeId) {
  const store = getStore(INTAKE_STORE);
  return store.get(intakeId, { type: "json" });
}

export async function markIntakeConfirmed(intakeId) {
  const store = getStore(INTAKE_STORE);
  const intake = await store.get(intakeId, { type: "json" });
  if (!intake) throw new Error(`Bite intake not found: ${intakeId}`);
  intake.confirmed_at = new Date().toISOString();
  await store.setJSON(intakeId, intake);
  return intake;
}

export async function setIntakeReportId(intakeId, reportId) {
  const store = getStore(INTAKE_STORE);
  const intake = await store.get(intakeId, { type: "json" });
  if (!intake) throw new Error(`Bite intake not found: ${intakeId}`);
  intake.report_id = reportId;
  intake.generated_at = new Date().toISOString();
  await store.setJSON(intakeId, intake);
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
