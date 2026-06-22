/**
 * Render the moon phase calendar for the Weather/Moon/Tides section.
 *
 * Renders one of three layouts based on intake.timing.mode:
 *   - "exact"    -> horizontal strip of moon icons, one per day in the trip window
 *   - "month"    -> a 30-day grid for the month
 *   - "flexible" -> uses the first flex_month or the current month, 30-day grid
 *
 * Output: a self-contained <div class="moon-calendar">...</div> ready to drop
 * into the Weather, Moon & Tides section. All styling is in render-css.mjs
 * (rules prefixed .moon-* / .moon-calendar-*).
 */

import {
  moonPhaseFraction,
  moonIllumination,
  moonPhaseName,
  isWaxing,
  moonEventsInRange,
} from "./moon-phase.mjs";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function renderMoonCalendar(timing) {
  if (!timing) return "";

  if (timing.mode === "exact" && timing.start_date && timing.end_date) {
    return renderStrip(timing.start_date, timing.end_date);
  }

  if (timing.mode === "month" && timing.month) {
    return renderMonthGrid(timing.month, currentYear());
  }

  if (timing.mode === "flexible") {
    const flex = (timing.flex_months || [])[0];
    if (flex) return renderMonthGrid(flex, currentYear());
    return renderMonthGrid(MONTHS[new Date().getUTCMonth()], currentYear());
  }

  // Fallback: current month
  return renderMonthGrid(MONTHS[new Date().getUTCMonth()], currentYear());
}

/* ============================================================ */
/*  STRIP: horizontal row of moon icons for exact-date trips      */
/* ============================================================ */

function renderStrip(startISO, endISO) {
  const start = new Date(startISO + "T12:00:00Z");
  const end = new Date(endISO + "T12:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return "";

  const events = moonEventsInRange(start, end);
  const eventByDate = new Map(events.map((e) => [e.date, e]));

  const ONE_DAY = 86400000;
  const days = [];
  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY) {
    const d = new Date(t);
    days.push(d);
  }

  // Cap at 14 days — anything longer than that, render a strip but it will wrap
  const visibleDays = days.slice(0, 14);

  const cells = visibleDays.map((d) => {
    const iso = d.toISOString().slice(0, 10);
    const event = eventByDate.get(iso);
    const phase = moonPhaseFraction(d);
    const day = d.getUTCDate();
    const monthName = MONTHS[d.getUTCMonth()].slice(0, 3);
    const eventLabel = event ? formatEventLabel(event.type) : "";
    return `
      <div class="moon-day${event ? " moon-day-event" : ""}">
        ${moonSvg(phase, 44)}
        <div class="moon-day-num">${monthName} ${day}</div>
        ${eventLabel ? `<div class="moon-day-event-label">${eventLabel}</div>` : ""}
      </div>`;
  }).join("");

  const summary = events.length > 0
    ? `<p class="moon-summary-line">${events.map((e) =>
        `<strong>${formatEventLabel(e.type)}</strong> ${formatEventDate(e.date)}`
      ).join(" · ")}</p>`
    : "";

  return `
  <div class="moon-calendar moon-calendar-strip">
    <div class="moon-calendar-label">Moon phases during your trip</div>
    <div class="moon-strip">${cells}</div>
    ${summary}
  </div>`;
}

/* ============================================================ */
/*  GRID: full month for "month" / "flexible" intakes             */
/* ============================================================ */

function renderMonthGrid(monthName, year) {
  const monthIdx = MONTHS.indexOf(monthName);
  if (monthIdx < 0) return "";

  // First day of the month at noon UTC (avoids timezone phase shifts)
  const first = new Date(Date.UTC(year, monthIdx, 1, 12));
  const next = new Date(Date.UTC(year, monthIdx + 1, 1, 12));
  const daysInMonth = Math.round((next - first) / 86400000);

  const events = moonEventsInRange(first, new Date(next - 86400000));
  const eventByDate = new Map(events.map((e) => [e.date, e]));

  const cells = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, monthIdx, day, 12));
    const iso = d.toISOString().slice(0, 10);
    const event = eventByDate.get(iso);
    const phase = moonPhaseFraction(d);
    cells.push(`
      <div class="moon-day${event ? " moon-day-event" : ""}">
        ${moonSvg(phase, 36)}
        <div class="moon-day-num">${day}</div>
        ${event ? `<div class="moon-day-event-label">${formatEventLabel(event.type)}</div>` : ""}
      </div>`);
  }

  const summary = events.length > 0
    ? `<p class="moon-summary-line">${events.map((e) =>
        `<strong>${formatEventLabel(e.type)}</strong> ${formatEventDate(e.date)}`
      ).join(" · ")}</p>`
    : "";

  return `
  <div class="moon-calendar moon-calendar-grid">
    <div class="moon-calendar-label">${monthName} ${year} moon calendar</div>
    <div class="moon-grid">${cells.join("")}</div>
    ${summary}
  </div>`;
}

/* ============================================================ */
/*  SVG icon (parametric — smooth across all phases)              */
/* ============================================================ */

/**
 * Returns an inline SVG string for a moon icon at the given phase.
 *
 * Implementation: full circle in shadow color, with the lit portion
 * overlaid as a path that combines a half-circle (outer edge) with a
 * half-ellipse (the terminator). The terminator ellipse's horizontal
 * radius shrinks toward 0 at the quarter phases and equals the full
 * radius at new/full moons.
 *
 * size = SVG width/height in pixels (the moon fills the box, padded ~5%).
 */
function moonSvg(phase, size = 40) {
  const r = size * 0.45;
  const cx = size / 2;
  const cy = size / 2;

  // Phase = 0 (new moon, no lit) — render shadow circle only
  if (phase < 0.005 || phase > 0.995) {
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="moon-svg" aria-label="new moon">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg-oyster)" stroke="var(--rule)" stroke-width="0.6"/>
</svg>`;
  }

  // Phase = 0.5 (full moon, all lit) — render lit circle only
  if (phase > 0.495 && phase < 0.505) {
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="moon-svg" aria-label="full moon">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--sand)" stroke="var(--sand)" stroke-width="0.6"/>
</svg>`;
  }

  // For any other phase: render shadow background + lit portion
  const waxing = isWaxing(phase);
  // termRadius is the absolute horizontal radius of the terminator ellipse:
  //   phase 0 / 1 -> termRadius = r (terminator coincides with outer edge)
  //   phase 0.25 / 0.75 -> termRadius = 0 (terminator is a vertical line)
  //   phase 0.5 -> termRadius = r (terminator coincides with outer edge on other side)
  const termRadius = Math.abs(Math.cos(Math.PI * 2 * phase)) * r;

  // Path: walk from top of circle to bottom along the lit outer edge,
  // then back to top along the terminator ellipse.
  //
  // For waxing (phase 0 to 0.5): lit outer edge is the RIGHT half.
  //   M cx,(cy-r) A r,r 0 0,1 cx,(cy+r)            -- right half arc clockwise
  // For waning (phase 0.5 to 1): lit outer edge is the LEFT half.
  //   M cx,(cy-r) A r,r 0 0,0 cx,(cy+r)            -- left half arc counterclockwise
  //
  // Terminator arc — depends on whether we're in crescent (lit < 0.5) or
  // gibbous (lit > 0.5). In crescent the terminator bulges INTO the lit
  // area (away from outer arc). In gibbous it bulges AWAY (into shadow).
  const top = `${cx},${cy - r}`;
  const bottom = `${cx},${cy + r}`;
  const outerSweep = waxing ? 1 : 0; // 1=clockwise, 0=ccw

  // Is the lit portion < 50% (crescent) or > 50% (gibbous)?
  const litFraction = waxing ? phase * 2 : (1 - phase) * 2;
  const isCrescent = litFraction < 0.5;
  // Terminator sweep direction (for the arc going from bottom back to top):
  //   Waxing crescent (right lit, terminator bulges left into lit):    sweep=0
  //   Waxing gibbous  (right+middle lit, terminator bulges right):     sweep=1
  //   Waning gibbous  (left+middle lit, terminator bulges left):       sweep=0
  //   Waning crescent (left lit, terminator bulges right into lit):    sweep=1
  let termSweep;
  if (waxing) termSweep = isCrescent ? 0 : 1;
  else        termSweep = isCrescent ? 1 : 0;

  const litPath = `M ${top} A ${r},${r} 0 0,${outerSweep} ${bottom} A ${termRadius},${r} 0 0,${termSweep} ${top} Z`;

  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="moon-svg" aria-label="moon ${(phase*100).toFixed(0)}%">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg-oyster)" stroke="var(--rule)" stroke-width="0.6"/>
  <path d="${litPath}" fill="var(--sand)"/>
</svg>`;
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function formatEventLabel(type) {
  return {
    new: "New moon",
    first_quarter: "First quarter",
    full: "Full moon",
    last_quarter: "Last quarter",
  }[type] || type;
}

function formatEventDate(iso) {
  const d = new Date(iso + "T12:00:00Z");
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function currentYear() {
  return new Date().getUTCFullYear();
}
