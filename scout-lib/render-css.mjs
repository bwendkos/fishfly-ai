/**
 * Inline CSS for the Trip Scout report HTML.
 *
 * Single source of truth for all report styling. Matches FishFly brand kit v1.0:
 *   - Cream background, Playfair Display headlines, Inter body
 *   - Ocean blue accent, sand for rules/middots, rust for warnings
 *
 * Includes @media print stylesheet so browser print-to-PDF produces clean output.
 */

export function getReportCss() {
  return `
/* ============================================================
   FishFly brand palette v1.0
   ============================================================ */
:root {
  --bg-cream: #f7f3ec;
  --bg-oyster: #efe9df;
  --ocean: #1e3a5f;
  --sand: #c89668;
  --rust: #8b3a3a;
  --text-primary: #1a1f2e;
  --text-soft: #4a5568;
  --text-muted: #8b8478;
  --rule: #d8d2c4;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-cream);
  color: var(--text-primary);
  line-height: 1.65;
  font-size: 16px;
}

.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 32px 80px;
}

/* ============================================================
   Header
   ============================================================ */
.report-header {
  border: 1px solid var(--rule);
  background: #ffffff;
  padding: 32px;
  margin-bottom: 32px;
  position: relative;
}

.wordmark {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: -0.5px;
}
.wordmark .dot { color: var(--sand); margin: 0 4px; }

.tagline {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin: 4px 0 16px;
}

.report-header h1 {
  font-family: "Playfair Display", Georgia, serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.meta {
  color: var(--text-muted);
  font-size: 14px;
}

.print-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  background: var(--ocean);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0.02em;
}

/* ============================================================
   Sections
   ============================================================ */
.section {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--rule);
}
.section:last-of-type { border-bottom: none; }

.section-header {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--ocean);
}

.section-number {
  font-family: "Playfair Display", serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--sand);
}

.section h2 {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 28px;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.section h3 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ocean);
  margin: 24px 0 12px;
}

.section h4 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin: 16px 0 8px;
}

.section p {
  margin-bottom: 12px;
  color: var(--text-primary);
}

/* ============================================================
   Trip Overview specific
   ============================================================ */
.greeting {
  font-size: 18px;
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: 24px;
}

.reality-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.reality-row {
  padding: 12px 16px;
  background: var(--bg-oyster);
  border-left: 4px solid var(--rule);
}
.reality-prime { border-left-color: var(--ocean); }
.reality-solid { border-left-color: var(--sand); }
.reality-marginal { border-left-color: var(--text-muted); }
.reality-non_viable { border-left-color: var(--rust); }

.viability-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 3px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: 8px;
}
.viability-prime { background: var(--ocean); color: #fff; }
.viability-solid { background: var(--sand); color: #fff; }
.viability-marginal { background: var(--text-muted); color: #fff; }
.viability-non_viable { background: var(--rust); color: #fff; }

.callout {
  background: var(--bg-oyster);
  border-left: 4px solid var(--ocean);
  padding: 14px 18px;
  margin: 16px 0;
  font-size: 15px;
}
.callout-warn {
  border-left-color: var(--rust);
  background: rgba(139, 58, 58, 0.06);
}

/* ============================================================
   Species blocks
   ============================================================ */
.species-block {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px dashed var(--rule);
}
.species-block:last-child { border-bottom: none; }
.species-block h3 {
  font-family: "Playfair Display", serif;
  font-size: 24px;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 2px solid var(--sand);
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.gear-list {
  list-style: none;
  background: var(--bg-oyster);
  padding: 16px 20px;
  margin: 0 0 16px;
}
.gear-list li {
  padding: 6px 0;
  border-bottom: 1px solid var(--rule);
}
.gear-list li:last-child { border-bottom: none; }

.fly-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin: 12px 0;
}
.fly-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-radius: 4px;
}
.fly-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.fly-body { flex: 1; }
.fly-rank {
  display: inline-block;
  font-weight: 700;
  color: var(--sand);
  font-size: 13px;
  margin-bottom: 4px;
}
.fly-card h4 {
  font-family: "Playfair Display", serif;
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 4px;
}
.fly-specs {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.fly-card p { font-size: 14px; }
.library-link {
  display: inline-block;
  font-size: 13px;
  color: var(--ocean);
  font-weight: 600;
  margin-top: 8px;
  text-decoration: none;
  border-bottom: 1px solid var(--ocean);
}

/* ============================================================
   Weather / Moon / Tides
   ============================================================ */
.best-dates {
  background: var(--bg-oyster);
  border: 2px solid var(--ocean);
  padding: 24px;
  margin: 24px 0;
}
.best-dates-label {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ocean);
  margin-bottom: 8px;
}
.best-dates h3 {
  font-family: "Playfair Display", serif;
  font-size: 28px;
  color: var(--text-primary);
  text-transform: none;
  letter-spacing: 0;
  margin: 0 0 16px;
  padding: 0;
}

/* ============================================================
   Checklists
   ============================================================ */
.checklist-tier {
  font-family: "Playfair Display", serif !important;
  font-size: 20px !important;
  font-weight: 700;
  color: var(--text-primary) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  margin-top: 24px !important;
  border-top: 1px solid var(--rule);
  padding-top: 12px !important;
}
.checklist {
  list-style: none;
  margin-bottom: 16px;
}
.checklist li {
  padding: 6px 0 6px 24px;
  position: relative;
  border-bottom: 1px solid var(--rule);
}
.checklist li::before {
  content: "□";
  position: absolute;
  left: 0;
  color: var(--text-muted);
  font-size: 16px;
}

/* ============================================================
   Tables
   ============================================================ */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}
thead {
  background: var(--ocean);
  color: #ffffff;
}
th, td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--rule);
  font-size: 14px;
}
th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
tr:nth-child(even) td { background: var(--bg-oyster); }

/* ============================================================
   Footer
   ============================================================ */
.report-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 2px solid var(--ocean);
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
}
.report-footer p { margin: 4px 0; }
.report-footer .small { font-size: 11px; color: var(--text-muted); }
.report-footer .closing {
  font-family: "Playfair Display", serif;
  font-size: 18px;
  color: var(--text-primary);
  margin-top: 24px;
}

/* ============================================================
   Print stylesheet
   ============================================================ */
@media print {
  body { background: #ffffff; }
  .page { max-width: 100%; padding: 24px; }
  .no-print-actions .print-btn { display: none; }
  .report-header { border: none; padding: 0 0 24px; }
  .section {
    page-break-inside: avoid;
    margin-bottom: 32px;
  }
  .section-header { page-break-after: avoid; }
  .species-block { page-break-inside: avoid; }
  .fly-card { page-break-inside: avoid; }
  .library-link, .print-btn { display: none; }
}
`;
}
