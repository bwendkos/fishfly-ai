/**
 * Moon phase calculations for Trip Scout.
 *
 * Algorithm: simplified Meeus, accurate to ~1 day over years 1900-2100 —
 * sufficient for trip planning where the phase changes ~12-13% per day.
 *
 * Phase fraction (0..1):
 *   0.00 = new moon (no illumination)
 *   0.25 = first quarter (right half lit, waxing)
 *   0.50 = full moon (full illumination)
 *   0.75 = last quarter (left half lit, waning)
 *
 * Reference: Jean Meeus, "Astronomical Algorithms" 2nd ed. ch. 49.
 * Synodic month constant: 29.53058867 days.
 */

const SYNODIC_MONTH = 29.53058867;
// A known new-moon reference: 2000-01-06 18:14 UTC, JD 2451550.1
const REF_NEW_MOON_JD = 2451550.1;

/**
 * Convert a JS Date to Julian Day (continuous count of days).
 */
export function dateToJD(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

/**
 * Get the moon phase fraction (0..1) at a UTC date.
 */
export function moonPhaseFraction(date) {
  const jd = dateToJD(date);
  const cyclesSinceRef = (jd - REF_NEW_MOON_JD) / SYNODIC_MONTH;
  const frac = cyclesSinceRef - Math.floor(cyclesSinceRef);
  return frac < 0 ? frac + 1 : frac;
}

/**
 * Illumination fraction (0..1). 0 = new moon (dark), 1 = full moon (bright).
 * Smooth cosine-based.
 */
export function moonIllumination(phase) {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

/**
 * Whether the moon is waxing (growing toward full) or waning (shrinking toward new).
 */
export function isWaxing(phase) {
  return phase < 0.5;
}

/**
 * Discrete phase name. Uses ~1.5-day windows around the four canonical
 * quarter phases so "first quarter" / "last quarter" actually land on
 * the day it visibly is.
 */
export function moonPhaseName(phase) {
  const tol = 0.025; // ~0.74 days each side
  if (phase < tol || phase > 1 - tol) return "new moon";
  if (Math.abs(phase - 0.25) < tol) return "first quarter";
  if (Math.abs(phase - 0.5) < tol)  return "full moon";
  if (Math.abs(phase - 0.75) < tol) return "last quarter";
  if (phase < 0.25) return "waxing crescent";
  if (phase < 0.5)  return "waxing gibbous";
  if (phase < 0.75) return "waning gibbous";
  return "waning crescent";
}

/**
 * Find moon events (new, first quarter, full, last quarter) within a date
 * range. Walks day-by-day and detects when the phase crosses each quarter
 * threshold. Returns: [{ date: ISO, type: 'new'|'first_quarter'|'full'|'last_quarter' }, ...]
 *
 * The phase boundaries are 0, 0.25, 0.5, 0.75. A "crossing" is when consecutive
 * days have phase values on different sides of a boundary.
 */
export function moonEventsInRange(startDate, endDate) {
  const events = [];
  const ONE_DAY = 86400000;
  let prev = null;
  for (let t = startDate.getTime(); t <= endDate.getTime() + ONE_DAY; t += ONE_DAY) {
    const d = new Date(t);
    const phase = moonPhaseFraction(d);
    if (prev !== null) {
      // Check for each quarter-phase crossing between prev and current
      for (const [boundary, type] of [
        [0,    "new"],
        [0.25, "first_quarter"],
        [0.5,  "full"],
        [0.75, "last_quarter"],
      ]) {
        if (crossed(prev.phase, phase, boundary)) {
          events.push({
            date: d.toISOString().slice(0, 10),
            type,
            phase: boundary,
          });
        }
      }
    }
    prev = { phase, date: d };
  }
  return events;
}

/**
 * Did the phase value cross a boundary between two consecutive samples?
 * Handles the 1.0 -> 0.0 wraparound for the "new moon" boundary.
 */
function crossed(prevPhase, currentPhase, boundary) {
  if (boundary === 0) {
    // New moon: crossing means going from high (~0.95+) to low (~0.05-)
    return prevPhase > 0.5 && currentPhase < 0.5 && (1 - prevPhase) + currentPhase < 0.15;
  }
  return prevPhase < boundary && currentPhase >= boundary;
}
