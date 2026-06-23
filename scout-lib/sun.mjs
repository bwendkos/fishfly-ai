/**
 * Solar position math for Trip Scout — sunrise, sunset, day length, twilight.
 *
 * Algorithm: NOAA Solar Position Calculator (Meeus, with NOAA's tweaks).
 * Accurate to ~1 minute across the modern era. Handles polar
 * day / polar night by returning nulls when the sun doesn't cross the
 * given altitude.
 *
 * All times returned are JS Date objects in UTC. Use Intl.DateTimeFormat
 * with the destination's IANA timezone to format in local time.
 *
 * Reference: https://gml.noaa.gov/grad/solcalc/calcdetails.html
 */

const deg = (rad) => rad * 180 / Math.PI;
const rad = (d) => d * Math.PI / 180;

/* ============================================================ */
/*  Core astronomical functions                                   */
/* ============================================================ */

function julianDay(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function julianCentury(jd) {
  return (jd - 2451545.0) / 36525.0;
}

function geomMeanLongSun(t) {
  const l = 280.46646 + t * (36000.76983 + t * 0.0003032);
  return ((l % 360) + 360) % 360;
}

function geomMeanAnomalySun(t) {
  return 357.52911 + t * (35999.05029 - 0.0001537 * t);
}

function eccentricityEarthOrbit(t) {
  return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
}

function sunEqOfCenter(t) {
  const mrad = rad(geomMeanAnomalySun(t));
  return Math.sin(mrad)     * (1.914602 - t * (0.004817 + 0.000014 * t))
       + Math.sin(2 * mrad) * (0.019993 - 0.000101 * t)
       + Math.sin(3 * mrad) * 0.000289;
}

function sunTrueLong(t) {
  return geomMeanLongSun(t) + sunEqOfCenter(t);
}

function sunAppLong(t) {
  return sunTrueLong(t) - 0.00569 - 0.00478 * Math.sin(rad(125.04 - 1934.136 * t));
}

function meanObliquityOfEcliptic(t) {
  const seconds = 21.448 - t * (46.815 + t * (0.00059 - t * 0.001813));
  return 23.0 + (26.0 + seconds / 60.0) / 60.0;
}

function obliquityCorrection(t) {
  return meanObliquityOfEcliptic(t) + 0.00256 * Math.cos(rad(125.04 - 1934.136 * t));
}

function sunDeclination(t) {
  const e = rad(obliquityCorrection(t));
  const lambda = rad(sunAppLong(t));
  return deg(Math.asin(Math.sin(e) * Math.sin(lambda)));
}

function equationOfTime(t) {
  const epsilon = obliquityCorrection(t);
  const l0 = geomMeanLongSun(t);
  const e = eccentricityEarthOrbit(t);
  const m = geomMeanAnomalySun(t);

  const y = Math.tan(rad(epsilon / 2));
  const y2 = y * y;

  const sin2l0 = Math.sin(rad(2 * l0));
  const sinm = Math.sin(rad(m));
  const cos2l0 = Math.cos(rad(2 * l0));
  const sin4l0 = Math.sin(rad(4 * l0));
  const sin2m = Math.sin(rad(2 * m));

  const eqTimeRad = y2 * sin2l0 - 2 * e * sinm + 4 * e * y2 * sinm * cos2l0
                  - 0.5 * y2 * y2 * sin4l0 - 1.25 * e * e * sin2m;
  return deg(eqTimeRad) * 4; // in minutes
}

/**
 * Hour angle (degrees) at the moment the sun is at `altitude` degrees above
 * the horizon. Returns null if the sun never reaches that altitude on this
 * date for this latitude (polar night / polar day).
 *
 * Standard altitudes:
 *   -0.833  sunrise / sunset (atmospheric refraction + solar disk radius)
 *   -6      civil twilight (still light enough to read outside)
 *   -12     nautical twilight (horizon distinguishable from sea)
 *   -18     astronomical twilight (true darkness for stargazing)
 */
function hourAngle(lat, declination, altitudeDeg = -0.833) {
  const latRad = rad(lat);
  const decRad = rad(declination);
  const altRad = rad(altitudeDeg);
  const cosH = (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad))
             / (Math.cos(latRad) * Math.cos(decRad));
  if (cosH > 1) return null;
  if (cosH < -1) return null;
  return deg(Math.acos(cosH));
}

/* ============================================================ */
/*  Public API                                                    */
/* ============================================================ */

/**
 * Get sunrise, sunset, solar noon, and twilight times for a given
 * date and location. Date is a JS Date (any time of day — only the
 * UTC date portion is used). lat in [-90,90], lon in [-180,180].
 *
 * Returns: {
 *   sunrise: Date | null,
 *   sunset: Date | null,
 *   solarNoon: Date,
 *   civilDawn: Date | null,    // sun at -6° before sunrise
 *   civilDusk: Date | null,    // sun at -6° after sunset
 *   dayLengthMinutes: number,
 *   declinationDeg: number,
 * }
 */
export function sunTimes(date, lat, lon) {
  // Use noon UTC of the requested date as the reference point — avoids
  // edge cases near midnight where the day rollover can be ambiguous.
  const dayStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const noonRef = new Date(dayStart.getTime() + 12 * 3600 * 1000);

  const t = julianCentury(julianDay(noonRef));
  const decl = sunDeclination(t);
  const eqTime = equationOfTime(t);

  // Solar noon (minutes after UTC midnight at this longitude)
  const solarNoonMin = 720 - 4 * lon - eqTime;

  const haSunrise = hourAngle(lat, decl, -0.833);
  const haCivil   = hourAngle(lat, decl, -6);

  function toDate(min) {
    return new Date(dayStart.getTime() + min * 60 * 1000);
  }

  const solarNoon = toDate(solarNoonMin);
  const sunrise = haSunrise !== null ? toDate(solarNoonMin - 4 * haSunrise) : null;
  const sunset  = haSunrise !== null ? toDate(solarNoonMin + 4 * haSunrise) : null;
  const civilDawn = haCivil !== null ? toDate(solarNoonMin - 4 * haCivil) : null;
  const civilDusk = haCivil !== null ? toDate(solarNoonMin + 4 * haCivil) : null;

  const dayLengthMinutes = haSunrise !== null ? 8 * haSunrise : 0;

  return {
    sunrise,
    sunset,
    solarNoon,
    civilDawn,
    civilDusk,
    dayLengthMinutes,
    declinationDeg: decl,
  };
}

/**
 * Format a Date as local time string in the given IANA timezone.
 * e.g., formatLocalTime(d, "America/Nassau") -> "6:14 AM"
 */
export function formatLocalTime(date, tz, opts = {}) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...opts,
  }).format(date);
}

/**
 * Format a Date as the local date (e.g., "Tue Jun 23") in the given IANA timezone.
 */
export function formatLocalDate(date, tz, opts = {}) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    month: "short",
    day: "numeric",
    ...opts,
  }).format(date);
}

/**
 * Format day length as "13h 34m"
 */
export function formatDayLength(minutes) {
  if (!minutes || minutes <= 0) return "0";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

/**
 * Compute the percentage offset (0-1) of a given time within a 24-hour day
 * relative to the destination's local midnight. Useful for placing markers
 * on a horizontal time-of-day chart.
 *
 * Returns null if the date is null.
 */
export function localDayFraction(date, tz) {
  if (!date) return null;
  // Format date in destination timezone to extract hour/minute
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  let h = 0, m = 0, s = 0;
  for (const p of parts) {
    if (p.type === "hour") h = parseInt(p.value, 10);
    else if (p.type === "minute") m = parseInt(p.value, 10);
    else if (p.type === "second") s = parseInt(p.value, 10);
  }
  // Intl can return "24" for the hour at midnight in some locales — normalize
  if (h >= 24) h = h % 24;
  return (h * 3600 + m * 60 + s) / 86400;
}
