/**
 * Solunar theory (John Alden Knight, 1926) — computes the best feeding
 * windows for fish across a day based on moon transit + moon rise/set
 * times, then rates the day based on moon phase + window-sunrise/sunset
 * overlap.
 *
 * Each day has up to:
 *   - 2 MAJOR windows (~2 hours each, centered on moon's upper and lower
 *     transits). The strongest feeding activity.
 *   - 2 MINOR windows (~1 hour each, centered on moonrise and moonset).
 *     Secondary activity.
 *
 * Rating heuristic:
 *   - Excellent: moon is at new or full (highest gravitational tidal pull),
 *                AND at least one major window overlaps with sunrise OR sunset.
 *   - Good:      moon is at new/full OR major window overlaps with sunrise/sunset.
 *   - Average:   neither of the above.
 *   - Poor:      moon is at quarter (illumination near 50%) AND no overlap.
 */

import { moonEvents } from "./moon-position.mjs";
import { sunTimes } from "./sun.mjs";
import { moonPhaseFraction, moonIllumination } from "./moon-phase.mjs";

const MAJOR_HALF_HOURS = 1;    // major window = ±60 min around transit -> 2h total
const MINOR_HALF_HOURS = 0.5;  // minor window = ±30 min around rise/set -> 1h total
const OVERLAP_TOLERANCE_MIN = 30; // sunrise/sunset within 30 min of a window edge counts as overlap

export function computeSolunar(date, lat, lon, tz) {
  const me = moonEvents(date, lat, lon, tz);
  const st = sunTimes(date, lat, lon);
  const phase = moonPhaseFraction(date);
  const illum = moonIllumination(phase);

  const windows = [];

  if (me.upperTransit) {
    windows.push(makeWindow("major", me.upperTransit, MAJOR_HALF_HOURS, "Moon overhead"));
  }
  if (me.lowerTransit) {
    windows.push(makeWindow("major", me.lowerTransit, MAJOR_HALF_HOURS, "Moon underfoot"));
  }
  if (me.moonrise) {
    windows.push(makeWindow("minor", me.moonrise, MINOR_HALF_HOURS, "Moonrise"));
  }
  if (me.moonset) {
    windows.push(makeWindow("minor", me.moonset, MINOR_HALF_HOURS, "Moonset"));
  }

  // Sort by start time
  windows.sort((a, b) => a.start - b.start);

  // Compute overlap with sunrise / sunset
  const hasOverlap = (st.sunrise && windowsOverlap(windows, st.sunrise))
                  || (st.sunset  && windowsOverlap(windows, st.sunset));

  // Moon phase strength: 0 = quarter (worst), 1 = new or full (best)
  // illum is 0 at new, 1 at full. We want extremes -> high score.
  // |illum - 0.5| * 2 -> 0 at quarter, 1 at new or full
  const phaseStrength = Math.abs(illum - 0.5) * 2;
  const phaseStrong = phaseStrength > 0.7;   // > 70% lit or < 30% lit
  const phaseWeak   = phaseStrength < 0.25;  // quarters

  let rating;
  if (phaseStrong && hasOverlap) rating = "Excellent";
  else if (phaseStrong || hasOverlap) rating = "Good";
  else if (phaseWeak && !hasOverlap) rating = "Poor";
  else rating = "Average";

  return {
    windows,         // [{ kind, label, start, end }]
    moonrise: me.moonrise,
    moonset:  me.moonset,
    upperTransit: me.upperTransit,
    lowerTransit: me.lowerTransit,
    alwaysUp: me.alwaysUp,
    alwaysDown: me.alwaysDown,
    sunrise: st.sunrise,
    sunset: st.sunset,
    phase,
    illumination: illum,
    phaseStrength,
    rating,
    hasOverlap,
  };
}

function makeWindow(kind, center, halfHours, label) {
  const halfMs = halfHours * 3600 * 1000;
  return {
    kind,
    label,
    start: new Date(center.getTime() - halfMs),
    end:   new Date(center.getTime() + halfMs),
    center,
  };
}

function windowsOverlap(windows, time) {
  const t = time.getTime();
  const tolMs = OVERLAP_TOLERANCE_MIN * 60 * 1000;
  for (const w of windows) {
    if (t >= w.start.getTime() - tolMs && t <= w.end.getTime() + tolMs) return true;
  }
  return false;
}
