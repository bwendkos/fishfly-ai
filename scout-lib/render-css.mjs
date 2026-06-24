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

.report-header .trip-dates-eyebrow {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
  margin-bottom: 10px;
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
  position: relative;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-left: 4px solid var(--sand);
  padding: 28px 32px;
  margin: 32px 0;
  box-shadow: 0 1px 3px rgba(30, 58, 95, 0.04), 0 4px 12px rgba(30, 58, 95, 0.05);
}
.best-dates-label {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sand);
  margin-bottom: 6px;
}
.best-dates h3 {
  font-family: "Playfair Display", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.15;
  color: var(--ocean);
  margin: 0 0 20px;
  letter-spacing: -0.5px;
  text-transform: none;
  padding: 0;
}
.best-dates h4 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-soft);
  margin-top: 18px;
  margin-bottom: 6px;
}
.best-dates p {
  font-size: 15px;
  color: var(--text-soft);
  line-height: 1.6;
  margin: 0;
}
.best-dates p + h4 { margin-top: 18px; }
@media print {
  .best-dates { break-inside: avoid; box-shadow: none; }
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


/* ============================================================
   Global nav + toolbar (mirrors safety.road.voyage)
   ============================================================ */
.rpt-nav {
  background: var(--bg-cream);
  border-bottom: 1px solid var(--rule);
  padding: 14px 32px;
}
.rpt-nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}
.rpt-nav-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: var(--text-primary);
  line-height: 1;
}
.rpt-wordmark {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.3px;
}
.rpt-wordmark .dot { color: var(--sand); margin: 0 3px; }
.rpt-brand-tagline {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 9.5px;
  color: var(--sand);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  margin-top: 4px;
}
.rpt-nav-spacer { flex: 1; }
.rpt-nav-links {
  display: flex;
  align-items: center;
  gap: 22px;
}
.rpt-nav-links a {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-soft);
  text-decoration: none;
  transition: color 0.15s;
}
.rpt-nav-links a:hover { color: var(--ocean); }
.rpt-nav-cta {
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 9px 16px;
  background: var(--ocean);
  color: #ffffff;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.15s;
  white-space: nowrap;
}
.rpt-nav-cta:hover { background: #2a4d7a; }

/* Toolbar — below the nav, above the article. */
.rpt-toolbar {
  background: var(--bg-oyster);
  border-bottom: 1px solid var(--rule);
  padding: 14px 32px;
}
.rpt-toolbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.rpt-toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
  color: var(--text-soft);
}
.rpt-toolbar-left strong { color: var(--text-primary); font-weight: 600; }
.rpt-toolbar-dot { color: var(--sand); font-size: 10px; }
.rpt-toolbar-sep { color: var(--text-muted); }
.rpt-report-id {
  font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 11.5px;
  color: var(--ocean);
  background: rgba(30, 58, 95, 0.06);
  padding: 2px 6px;
  border-radius: 3px;
}
.rpt-toolbar-actions {
  display: flex;
  gap: 8px;
}
.rpt-tool-btn {
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-radius: 999px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
}
.rpt-tool-btn:hover {
  border-color: var(--ocean);
  color: var(--ocean);
}

/* Print: nav, toolbar, and any leftover .print-btn are hidden in the printed PDF. */
@media print {
  .rpt-nav, .rpt-toolbar, .print-btn { display: none !important; }
  body { background: #ffffff; }
  .page { padding-top: 24px; }
}

/* Responsive: collapse the nav links on narrow viewports. The brand + CTA stay. */
@media (max-width: 700px) {
  .rpt-nav-inner { flex-wrap: wrap; row-gap: 12px; }
  .rpt-nav-links { display: none; }
  .rpt-toolbar-inner { flex-direction: column; align-items: flex-start; }
}

/* Species banner -- watercolor scientific illustration above each species
   block. Cream background blends into the page bg seamlessly. */
.species-banner {
  display: block;
  width: 100%;
  max-width: 760px;
  height: auto;
  margin: 0 auto 8px;
  background: var(--bg-cream);
  border-bottom: 1px solid var(--rule);
}

.species-block .species-banner + h3 {
  margin-top: 16px;
}

@media print {
  .species-banner { break-inside: avoid; }
}

@media (max-width: 720px) {
  .species-banner {
    width: calc(100% + 64px);
    max-width: none;
    margin-left: -32px;
    margin-right: -32px;
  }
}

/* ============================================================
   Moon phase calendar (PR #9) — strip for exact dates, grid for month
   ============================================================ */
.moon-calendar {
  margin: 24px 0 16px;
  padding: 20px 0;
}
.moon-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.moon-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 14px;
  align-items: flex-start;
}
.moon-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px 8px;
}
.moon-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 44px;
}
.moon-day .moon-svg {
  flex-shrink: 0;
}
.moon-day-num {
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-soft);
  white-space: nowrap;
}
.moon-day-event .moon-day-num {
  color: var(--ocean);
  font-weight: 600;
}
.moon-day-event-label {
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: 600;
  color: var(--sand);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  margin-top: 1px;
}
.moon-summary-line {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 14px;
  line-height: 1.6;
}
.moon-summary-line strong {
  color: var(--text);
  font-weight: 600;
}

@media (max-width: 600px) {
  .moon-strip { gap: 12px 10px; }
  .moon-grid { grid-template-columns: repeat(5, 1fr); }
}

@media print {
  .moon-calendar { break-inside: avoid; }
}

/* ============================================================
   Sun calendar (PR #10) — daylight ribbon per trip day
   Gradient colors are bound to CSS vars so the renderer can
   reference them inline.
   ============================================================ */
:root {
  --gradient-night:    #1a1f2e;
  --gradient-twilight: #c89668;
  --gradient-day:      #f7d8a0;
}
.sun-calendar {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.sun-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.sun-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sun-row {
  display: grid;
  grid-template-columns: 110px 64px 1fr 64px 70px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
}
.sun-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.sun-row-rise, .sun-row-set {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-soft);
  font-size: 12px;
  text-align: center;
}
.sun-row-length {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-muted);
  font-size: 11.5px;
  text-align: right;
}
.sun-row-ribbon {
  height: 18px;
  border-radius: 9px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--rule);
}
.sun-row-noon-tick {
  position: absolute;
  top: 2px;
  bottom: 2px;
  width: 1px;
  background: rgba(30, 58, 95, 0.4);
  transform: translateX(-50%);
}
.sun-row-polar {
  grid-template-columns: 110px 1fr;
  font-style: italic;
  color: var(--text-muted);
}
.sun-row-note {
  font-size: 12.5px;
}

@media (max-width: 600px) {
  .sun-row {
    grid-template-columns: 1fr 60px 60px;
    grid-template-areas:
      "date  rise  set"
      "ribbon ribbon ribbon"
      "length length length";
    gap: 4px 10px;
  }
  .sun-row-date { grid-area: date; }
  .sun-row-rise { grid-area: rise; text-align: left; }
  .sun-row-set  { grid-area: set; text-align: right; }
  .sun-row-ribbon { grid-area: ribbon; }
  .sun-row-length { grid-area: length; text-align: right; font-size: 11px; }
}

@media print {
  .sun-calendar { break-inside: avoid; }
  .sun-row-ribbon { box-shadow: inset 0 0 0 0.5pt var(--rule); }
}

/* ============================================================
   Tide chart (PR #20 — WorldTides API)
   Per-day 24-hour tide curve with H/L markers. Visual register
   matches the sun/moon/solunar charts above.
   ============================================================ */
.tide-chart {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.tide-chart-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.tide-chart-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tide-row {
  display: grid;
  grid-template-columns: 110px 1fr 60px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
}
.tide-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.tide-row-chart {
  height: 56px;
  position: relative;
}
.tide-row-range {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-muted);
  font-size: 12px;
  text-align: right;
}
.tide-svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}
.tide-midline {
  stroke: var(--rule);
  stroke-width: 0.3;
  stroke-dasharray: 1.5 1.5;
}
.tide-fill {
  fill: var(--ocean);
  opacity: 0.08;
}
.tide-line {
  fill: none;
  stroke: var(--ocean);
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.85;
  vector-effect: non-scaling-stroke;
}
.tide-extreme circle {
  fill: var(--ocean);
}
.tide-extreme-high circle { fill: var(--sand); }
.tide-extreme text {
  font-family: "JetBrains Mono", monospace;
  font-size: 5.5px;
  fill: var(--text-soft);
  letter-spacing: 0.02em;
}
.tide-extreme-high text { fill: var(--sand); font-weight: 600; }
.tide-row-empty {
  grid-template-columns: 110px 1fr;
  font-style: italic;
  color: var(--text-muted);
}
.tide-row-note {
  font-size: 12.5px;
}
.tide-chart-source {
  margin-top: 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

@media (max-width: 600px) {
  .tide-row {
    grid-template-columns: 1fr 60px;
    grid-template-areas:
      "date  range"
      "chart chart";
    gap: 4px 10px;
  }
  .tide-row-date { grid-area: date; }
  .tide-row-range { grid-area: range; text-align: right; }
  .tide-row-chart { grid-area: chart; height: 64px; }
}

@media print {
  .tide-chart { break-inside: avoid; }
  .tide-line { opacity: 1; stroke-width: 1.2; }
  .tide-fill { opacity: 0.15; }
}

/* ============================================================
   Solunar peak windows (PR #11)
   ============================================================ */
.solunar-calendar {
  margin: 24px 0 16px;
  padding: 20px 0 4px;
}
.solunar-calendar-label {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--sand);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.solunar-scale {
  position: relative;
  height: 16px;
  margin-left: 110px;
  margin-right: 80px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--text-muted);
}
.solunar-scale span {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}
.solunar-scale span:first-child { transform: translateX(0%); }
.solunar-scale span:last-child  { transform: translateX(-100%); }

.solunar-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.solunar-row {
  display: grid;
  grid-template-columns: 110px 1fr 80px;
  align-items: center;
  gap: 14px;
  font-family: "Inter", sans-serif;
  font-size: 12.5px;
}
.solunar-row-date {
  color: var(--text);
  font-weight: 600;
  font-size: 13px;
}
.solunar-row-bar {
  position: relative;
  height: 22px;
  background: var(--bg-oyster);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--rule);
}
.solunar-window {
  position: absolute;
  top: 0;
  bottom: 0;
}
.solunar-window-major {
  background: var(--sand);
  opacity: 0.85;
}
.solunar-window-minor {
  background: var(--sand-soft, #e8c9a3);
  opacity: 0.6;
}
.solunar-sun-tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--ocean);
  transform: translateX(-50%);
  pointer-events: none;
}
.solunar-row-rating {
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: right;
  padding: 4px 0;
}
.solunar-row-rating.rating-excellent { color: var(--ocean); }
.solunar-row-rating.rating-good      { color: var(--sand); }
.solunar-row-rating.rating-average   { color: var(--text-soft); }
.solunar-row-rating.rating-poor      { color: var(--text-muted); }

.solunar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 14px;
  padding-left: 110px;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  color: var(--text-soft);
}
.solunar-legend > span { display: inline-flex; align-items: center; gap: 6px; }
.solunar-swatch {
  display: inline-block;
  width: 14px;
  height: 10px;
  border-radius: 2px;
}
.solunar-swatch-major { background: var(--sand); opacity: 0.85; }
.solunar-swatch-minor { background: var(--sand-soft, #e8c9a3); opacity: 0.6; box-shadow: inset 0 0 0 1px var(--rule); }
.solunar-swatch-sun   {
  width: 3px; height: 12px; background: var(--ocean); border-radius: 0;
}

@media (max-width: 600px) {
  .solunar-scale { margin-left: 0; margin-right: 0; }
  .solunar-row {
    grid-template-columns: 1fr 70px;
    grid-template-areas: "date rating" "bar bar";
    gap: 4px 10px;
  }
  .solunar-row-date { grid-area: date; }
  .solunar-row-rating { grid-area: rating; text-align: right; }
  .solunar-row-bar { grid-area: bar; }
  .solunar-legend { padding-left: 0; }
}

@media print {
  .solunar-calendar { break-inside: avoid; }
}
`;
}
