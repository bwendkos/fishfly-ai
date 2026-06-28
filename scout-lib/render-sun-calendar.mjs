/**
 * Render the daylight calendar for the Weather/Moon/Tides section.
 *
 * For each day in the trip window (or sampled days from the month), renders:
 *   [date] [sunrise time]  [---horizontal night/twilight/day gradient---]  [sunset time]  [day length]
 *
 * The ribbon uses CSS linear-gradient with stops at civil-twilight and
 * sunrise/sunset boundaries — visualizing the day's light progression.
 *
 * Sunrise/sunset are computed in destination-local time (IANA timezone),
 * so DST is handled automatically.
 */

import { sunTimes, formatLocalTime, formatLocalDate, formatDayLength, localDayFraction } from "./sun.mjs";
import { getDestinationMeta } from "./destinations.mjs";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function renderSunCalendar(timing, destination, metaOverride = null) {
  const meta = metaOverride || getDestinationMeta(destination);
  if (!meta || !timing) return "";

  if (timing.mode === "exact" && timing.start_date && timing.end_date) {
    return renderDailyRows(timing.start_date, timing.end_date, meta);
  }

  if (timing.mode === "month" && timing.month) {
    return renderMonthSample(timing.month, meta);
  }

  if (timing.mode === "flexible") {
    const flex = (timing.flex_months || [])[0];
    if (flex) return renderMonthSample(flex, meta);
  }

  return "";
}

/* ============================================================ */
/*  EXACT DATES: one row per day                                  */
/* ============================================================ */

function renderDailyRows(startISO, endISO, meta) {
  const start = new Date(startISO + "T12:00:00Z");
  const end = new Date(endISO + "T12:00:00Z");
  if (isNaN(start) || isNaN(end) || end < start) return "";

  const ONE_DAY = 86400000;
  const rows = [];
  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY) {
    const d = new Date(t);
    rows.push(renderRow(d, meta));
    if (rows.length >= 14) break;
  }

  return `
  <div class="sun-calendar">
    <div class="sun-calendar-label">Daylight at your destination</div>
    <div class="sun-rows">${rows.join("")}</div>
  </div>`;
}

/* ============================================================ */
/*  MONTH MODE: sample 6 days across the month                    */
/* ============================================================ */

function renderMonthSample(monthName, meta) {
  const monthIdx = MONTHS.indexOf(monthName);
  if (monthIdx < 0) return "";

  const year = new Date().getUTCFullYear();
  // Sample 6 days: 1, 6, 11, 16, 21, 26 of the month
  const sampleDays = [1, 6, 11, 16, 21, 26];
  const rows = sampleDays.map((day) => {
    const d = new Date(Date.UTC(year, monthIdx, day, 12));
    return renderRow(d, meta);
  });

  return `
  <div class="sun-calendar">
    <div class="sun-calendar-label">Daylight across ${monthName}</div>
    <div class="sun-rows">${rows.join("")}</div>
  </div>`;
}

/* ============================================================ */
/*  Per-day row                                                   */
/* ============================================================ */

function renderRow(date, meta) {
  const times = sunTimes(date, meta.lat, meta.lon);

  if (!times.sunrise) {
    return `
    <div class="sun-row sun-row-polar">
      <div class="sun-row-date">${formatLocalDate(date, meta.tz)}</div>
      <div class="sun-row-note">${times.dayLengthMinutes === 0 ? "Polar night — sun does not rise" : "Polar day — sun does not set"}</div>
    </div>`;
  }

  const dawnFrac = localDayFraction(times.civilDawn, meta.tz) ?? 0;
  const riseFrac = localDayFraction(times.sunrise, meta.tz);
  const setFrac  = localDayFraction(times.sunset, meta.tz);
  const duskFrac = localDayFraction(times.civilDusk, meta.tz) ?? 1;

  const dawnPct = (dawnFrac * 100).toFixed(2);
  const risePct = (riseFrac * 100).toFixed(2);
  const setPct  = (setFrac * 100).toFixed(2);
  const duskPct = (duskFrac * 100).toFixed(2);

  // Linear gradient: night -> civil twilight -> daylight -> civil twilight -> night
  const gradient = `linear-gradient(to right,
    var(--gradient-night) 0%,
    var(--gradient-night) ${dawnPct}%,
    var(--gradient-twilight) ${risePct}%,
    var(--gradient-day) ${(parseFloat(risePct) + 0.5).toFixed(2)}%,
    var(--gradient-day) ${(parseFloat(setPct) - 0.5).toFixed(2)}%,
    var(--gradient-twilight) ${setPct}%,
    var(--gradient-night) ${duskPct}%,
    var(--gradient-night) 100%)`;

  return `
    <div class="sun-row">
      <div class="sun-row-date">${formatLocalDate(date, meta.tz)}</div>
      <div class="sun-row-rise">${formatLocalTime(times.sunrise, meta.tz)}</div>
      <div class="sun-row-ribbon" style="background:${gradient}">
        <span class="sun-row-noon-tick" style="left:${(localDayFraction(times.solarNoon, meta.tz) * 100).toFixed(2)}%"></span>
      </div>
      <div class="sun-row-set">${formatLocalTime(times.sunset, meta.tz)}</div>
      <div class="sun-row-length">${formatDayLength(times.dayLengthMinutes)}</div>
    </div>`;
}
