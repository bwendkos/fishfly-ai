/**
 * Moon position math for Trip Scout — RA/Dec, altitude, transit and
 * moonrise/moonset times for any UTC date and (lat, lon).
 *
 * Algorithm: simplified Meeus lunar formulas, accurate to ~5-10 arc-min
 * for position and within ~1-2 minutes for moonrise/set/transit times.
 * Sufficient for fishing-window planning.
 *
 * Strategy for transit and rise/set times: instead of solving the
 * transcendental equations directly, scan the moon's altitude at 5-min
 * resolution across a 30-hour window and detect:
 *   - Local maxima -> upper transit (moon highest)
 *   - Local minima -> lower transit
 *   - Zero crossings (going up) -> moonrise
 *   - Zero crossings (going down) -> moonset
 *
 * The moon-day is ~24h 50min, so a 30-hour scan reliably captures one
 * full cycle. We then filter results to the requested calendar date in
 * the destination's local timezone.
 */

const rad = (d) => d * Math.PI / 180;
const deg = (r) => r * 180 / Math.PI;
const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const asin = Math.asin;
const atan2 = Math.atan2;

// Obliquity of the ecliptic (J2000, simplified — close enough for our purposes)
const ECLIPTIC = rad(23.4397);

/* ============================================================ */
/*  Time helpers                                                  */
/* ============================================================ */

// Days since J2000.0 epoch (2000-01-01 12:00 UTC)
function toDays(date) {
  return date.getTime() / 86400000 - 0.5 + 2440588 - 2451545;
}

// Apparent sidereal time (radians) at observer longitude
function siderealTime(d, lw) {
  return rad(280.16 + 360.9856235 * d) - lw;
}

/* ============================================================ */
/*  Moon position (ecliptic -> equatorial)                        */
/* ============================================================ */

function moonCoords(d) {
  // Geocentric ecliptic coordinates of the moon (simplified Meeus)
  const L = rad(218.316 + 13.176396 * d); // mean longitude
  const M = rad(134.963 + 13.064993 * d); // mean anomaly
  const F = rad(93.272 + 13.229350 * d);  // mean distance argument

  const lng = L + rad(6.289) * sin(M);
  const lat = rad(5.128) * sin(F);
  // const dist = 385001 - 20905 * cos(M); // km, not used here

  const ra = atan2(sin(lng) * cos(ECLIPTIC) - tan(lat) * sin(ECLIPTIC), cos(lng));
  const dec = asin(sin(lat) * cos(ECLIPTIC) + cos(lat) * sin(ECLIPTIC) * sin(lng));

  return { ra, dec };
}

/**
 * Moon altitude (radians) for a given UTC date at observer (lat, lon).
 * Negative altitudes mean the moon is below the horizon.
 *
 * Doesn't apply atmospheric refraction here — we add a -0.583° threshold
 * (the standard "horizon altitude" for rising/setting) in moonRiseSet().
 */
export function moonAltitude(date, lat, lon) {
  const lw = rad(-lon);
  const phi = rad(lat);
  const d = toDays(date);
  const c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  return asin(sin(phi) * sin(c.dec) + cos(phi) * cos(c.dec) * cos(H));
}

/* ============================================================ */
/*  Transit, moonrise, moonset                                    */
/* ============================================================ */

/**
 * For a given UTC date (the day in local time) and observer location,
 * compute the moon's transit (upper culmination), antitransit (lower
 * culmination), moonrise, and moonset. All return values are JS Date
 * objects in UTC; the caller formats with a timezone.
 *
 * Returns:
 *   { upperTransit, lowerTransit, moonrise, moonset, alwaysUp, alwaysDown }
 *
 * Any field can be null if it doesn't occur during the scan window.
 * `alwaysUp` is true if the moon never goes below horizon on this day,
 * `alwaysDown` if it never rises.
 */
export function moonEvents(date, lat, lon, tz) {
  // Anchor scan to local-time start-of-day at this destination. Use a
  // 30-hour window starting 3 hours before local midnight to catch
  // pre-midnight events that "belong" to the previous day.
  const localMidnightUTC = startOfLocalDayUTC(date, tz);
  const scanStart = localMidnightUTC - 3 * 3600 * 1000;
  const scanEnd   = localMidnightUTC + 27 * 3600 * 1000;
  const stepMin = 5;
  const stepMs = stepMin * 60 * 1000;

  // Sample altitudes at every step
  const samples = [];
  for (let t = scanStart; t <= scanEnd; t += stepMs) {
    const d = new Date(t);
    samples.push({ t, alt: moonAltitude(d, lat, lon) });
  }

  // The "horizon" altitude for moonrise/set — includes refraction (-0.34°)
  // and moon's apparent radius (-0.25°) — total -0.583° = -0.01018 rad.
  const HORIZON = -0.01018;

  let upperTransit = null;
  let lowerTransit = null;
  const rises = [];
  const sets = [];

  for (let i = 1; i < samples.length - 1; i++) {
    const a0 = samples[i - 1].alt;
    const a1 = samples[i].alt;
    const a2 = samples[i + 1].alt;

    // Local maximum -> upper transit
    if (a1 > a0 && a1 > a2) {
      // Refine with parabolic fit
      const t = refinePeak(samples[i - 1], samples[i], samples[i + 1]);
      // Only count transits within the local-day window
      if (t >= localMidnightUTC && t < localMidnightUTC + 24 * 3600 * 1000) {
        if (!upperTransit || isHigher(t, lat, lon, upperTransit)) {
          upperTransit = t;
        }
      }
    }

    // Local minimum -> lower transit (moon below horizon at lowest)
    if (a1 < a0 && a1 < a2) {
      const t = refinePeak(samples[i - 1], samples[i], samples[i + 1]);
      if (t >= localMidnightUTC && t < localMidnightUTC + 24 * 3600 * 1000) {
        if (!lowerTransit || isLower(t, lat, lon, lowerTransit)) {
          lowerTransit = t;
        }
      }
    }

    // Zero crossing going UP -> moonrise
    if (a0 < HORIZON && a1 >= HORIZON) {
      const t = interpolate(samples[i - 1], samples[i], HORIZON);
      if (t >= localMidnightUTC && t < localMidnightUTC + 24 * 3600 * 1000) {
        rises.push(t);
      }
    }

    // Zero crossing going DOWN -> moonset
    if (a0 >= HORIZON && a1 < HORIZON) {
      const t = interpolate(samples[i - 1], samples[i], HORIZON);
      if (t >= localMidnightUTC && t < localMidnightUTC + 24 * 3600 * 1000) {
        sets.push(t);
      }
    }
  }

  // Detect always-up / always-down
  const minAlt = Math.min(...samples.map((s) => s.alt));
  const maxAlt = Math.max(...samples.map((s) => s.alt));
  const alwaysUp = minAlt > HORIZON;
  const alwaysDown = maxAlt < HORIZON;

  return {
    upperTransit: upperTransit ? new Date(upperTransit) : null,
    lowerTransit: lowerTransit ? new Date(lowerTransit) : null,
    moonrise: rises[0] ? new Date(rises[0]) : null,
    moonset:  sets[0]  ? new Date(sets[0])  : null,
    alwaysUp,
    alwaysDown,
  };
}

/* ============================================================ */
/*  Internal helpers                                              */
/* ============================================================ */

// Refine a local extremum by fitting a parabola through three samples
function refinePeak(s0, s1, s2) {
  const denom = (s0.alt - 2 * s1.alt + s2.alt);
  if (Math.abs(denom) < 1e-12) return s1.t;
  const offset = 0.5 * (s0.alt - s2.alt) / denom;
  return s1.t + offset * (s1.t - s0.t);
}

// Linear interpolate the t where altitude crosses `target`
function interpolate(s0, s1, target) {
  const frac = (target - s0.alt) / (s1.alt - s0.alt);
  return s0.t + frac * (s1.t - s0.t);
}

// Helpers for choosing the highest/lowest of two candidate transit times
function isHigher(tNew, lat, lon, tOld) {
  return moonAltitude(new Date(tNew), lat, lon) > moonAltitude(new Date(tOld), lat, lon);
}
function isLower(tNew, lat, lon, tOld) {
  return moonAltitude(new Date(tNew), lat, lon) < moonAltitude(new Date(tOld), lat, lon);
}

// UTC timestamp at the local midnight of the given calendar date in the
// destination's timezone. Uses Intl.DateTimeFormat to derive the offset
// (handles DST without us having to track rules).
function startOfLocalDayUTC(date, tz) {
  // Construct the wall-clock date string for this date in the destination's tz
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  let y = "1970", m = "01", d = "01";
  for (const p of parts) {
    if (p.type === "year") y = p.value;
    else if (p.type === "month") m = p.value;
    else if (p.type === "day") d = p.value;
  }
  // Approximate the UTC equivalent of local midnight: start from naive UTC
  // midnight, then adjust by the destination's UTC offset at that moment.
  const naiveUTC = Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
  const offsetMin = getTimezoneOffsetMin(new Date(naiveUTC), tz);
  return naiveUTC - offsetMin * 60 * 1000;
}

// Returns the offset (in minutes) such that UTC + offsetMin*60s = local time.
// Positive for east of UTC. Derived via Intl by comparing the "wall clock"
// representation of a UTC date in the destination's timezone vs. the same
// date treated as UTC.
function getTimezoneOffsetMin(date, tz) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const parts = fmt.formatToParts(date);
  const m = {};
  for (const p of parts) m[p.type] = p.value;
  const localAsUTC = Date.UTC(+m.year, +m.month - 1, +m.day, +m.hour, +m.minute, +m.second);
  return (localAsUTC - date.getTime()) / 60000;
}
