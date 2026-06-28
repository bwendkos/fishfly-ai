/**
 * Render the solunar peak windows chart for the Weather/Moon/Tides section.
 *
 * Per day:
 *   [Date]  [-------- 24-hour timeline with major/minor windows --------]  [Rating]
 *
 * Major windows (centered on moon transit) shown as bold sand bars.
 * Minor windows (moonrise/moonset) shown as fainter sand bars.
 * Sunrise/sunset marked with thin vertical ocean-colored ticks.
 *
 * Hour scale (0, 6, 12, 18, 24) labeled at the top of the chart.
 */

import { computeSolunar } from "./solunar.mjs";
import { getDestinationMeta } from "./destinations.mjs";
import { formatLocalDate, formatLocalTime, localDayFraction } from "./sun.mjs";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function renderSolunar(timing, destination, metaOverride = null) {
  const meta = metaOverride || getDestinationMeta(destination);
  if (!meta || !timing) return "";

  if (timing.mode === "exact" && timing.start_date && timing.end_date) {
    return renderDays(getDailyDates(timing.start_date, timing.end_date), meta);
  }

  if (timing.mode === "month" && timing.month) {
    return renderDays(getMonthSample(timing.month), meta);
  }

  if (timing.mode === "flexible") {
    const flex = (timing.flex_months || [])[0];
    if (flex) return renderDays(getMonthSample(flex), meta);
  }

  return "";
}

/* ============================================================ */
/*  Date assembly                                                 */
/* ============================================================ */

function getDailyDates(startISO, endISO) {
  const start = new Date(startISO + "T12:00:00Z");
  const end = new Date(endISO + "T12:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return [];
  const ONE_DAY = 86400000;
  const out = [];
  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY) {
    out.push(new Date(t));
    if (out.length >= 14) break;
  }
  return out;
}

function getMonthSample(monthName) {
  const idx = MONTHS.indexOf(monthName);
  if (idx < 0) return [];
  const y = new Date().getUTCFullYear();
  return [1, 6, 11, 16, 21, 26].map((d) => new Date(Date.UTC(y, idx, d, 12)));
}

/* ============================================================ */
/*  Rendering                                                     */
/* ============================================================ */

function renderDays(dates, meta) {
  if (dates.length === 0) return "";

  const rows = dates.map((d) => {
    const s = computeSolunar(d, meta.lat, meta.lon, meta.tz);
    return renderRow(d, s, meta);
  });

  return `
  <div class="solunar-calendar">
    <div class="solunar-calendar-label">Solunar peak feeding windows</div>
    <div class="solunar-scale">
      <span style="left:0%">12 AM</span>
      <span style="left:25%">6 AM</span>
      <span style="left:50%">noon</span>
      <span style="left:75%">6 PM</span>
      <span style="left:100%">12 AM</span>
    </div>
    <div class="solunar-rows">${rows.join("")}</div>
    <div class="solunar-legend">
      <span><span class="solunar-swatch solunar-swatch-major"></span> Major (moon overhead / underfoot)</span>
      <span><span class="solunar-swatch solunar-swatch-minor"></span> Minor (moonrise / moonset)</span>
      <span><span class="solunar-swatch solunar-swatch-sun"></span> Sunrise / sunset</span>
    </div>
  </div>`;
}

function renderRow(date, s, meta) {
  // Build the inline window bars as absolutely-positioned children
  const windowBars = s.windows.map((w) => {
    const startFrac = localDayFraction(w.start, meta.tz);
    const endFrac = localDayFraction(w.end, meta.tz);
    if (startFrac == null || endFrac == null) return "";

    // Handle wrap-around (window crosses midnight in local time)
    if (endFrac < startFrac) {
      // Two pieces: from startFrac to 100%, and from 0% to endFrac
      return `${barPiece(w.kind, startFrac, 1, w)}${barPiece(w.kind, 0, endFrac, w)}`;
    }
    return barPiece(w.kind, startFrac, endFrac, w);
  }).join("");

  // Sun tick marks
  const sunTicks = [];
  if (s.sunrise) {
    const f = localDayFraction(s.sunrise, meta.tz);
    if (f != null) sunTicks.push(sunTick(f, `Sunrise ${formatLocalTime(s.sunrise, meta.tz)}`));
  }
  if (s.sunset) {
    const f = localDayFraction(s.sunset, meta.tz);
    if (f != null) sunTicks.push(sunTick(f, `Sunset ${formatLocalTime(s.sunset, meta.tz)}`));
  }

  const ratingClass = "rating-" + s.rating.toLowerCase();

  return `
    <div class="solunar-row">
      <div class="solunar-row-date">${formatLocalDate(date, meta.tz)}</div>
      <div class="solunar-row-bar">
        ${windowBars}
        ${sunTicks.join("")}
      </div>
      <div class="solunar-row-rating ${ratingClass}">${s.rating}</div>
    </div>`;
}

function barPiece(kind, startFrac, endFrac, w) {
  const left = (startFrac * 100).toFixed(2);
  const width = ((endFrac - startFrac) * 100).toFixed(2);
  if (parseFloat(width) <= 0) return "";
  const title = `${w.label} · ${formatTimeRange(w)}`;
  return `<span class="solunar-window solunar-window-${kind}" style="left:${left}%;width:${width}%" title="${escapeAttr(title)}"></span>`;
}

function sunTick(frac, title) {
  const pct = (frac * 100).toFixed(2);
  return `<span class="solunar-sun-tick" style="left:${pct}%" title="${escapeAttr(title)}"></span>`;
}

function formatTimeRange(w) {
  // Simple HH:MM in UTC for the tooltip
  const fmt = (d) => d.toISOString().slice(11, 16) + " UTC";
  return `${fmt(w.start)} – ${fmt(w.end)}`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
