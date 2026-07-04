/**
 * Destination metadata: lat/lon + IANA timezone + hero_region for all 42
 * library regions.
 *
 * Coordinates are anchor points anglers actually fish or the closest coastal
 * town/village to a WorldTides reference station. Not tourism-brochure
 * centroids. Chosen for two purposes at once:
 *   - Sunrise/sunset accuracy (longitude affects time, latitude affects
 *     day length — good to ~50 mi is fine)
 *   - Tide station attribution — for 33 of 42 destinations, the coord is
 *     tuned to sit within WorldTides' station coverage so the tide chart
 *     shows a real reference station name. The other 9 have no nearby
 *     station on any reasonable coord within the fishing zone; those fall
 *     back to pure astronomical predictions (still accurate, just no
 *     station attribution). See PR #59 for the audit.
 *
 * hero_region picks which watercolor hero image loads at the top of the
 * Trip Scout report. Six variants live at /brand/heroes/regions/{region}.jpg:
 *   - atlantic          (13 destinations — Bahamas + Caribbean + US Atlantic + Gabón)
 *   - pacific           (9 destinations — Kiribati, PNG, Solomons, Australia, Hawaii, Baja Sur, CR Pacific, Raja Ampat)
 *   - central-america   (7 destinations — Belize, Yucatán, Honduras, CR Caribbean, Nicaragua, Panama)
 *   - gulf-coast        (6 destinations — Florida Keys, Biscayne, Mosquito Lagoon, Tampa, Louisiana, Texas)
 *   - indian-ocean      (5 destinations — Seychelles, Maldives, Rodrigues, Madagascar, Mozambique)
 *   - red-sea           (2 destinations — Sudan, Oman)
 *
 * Timezones are IANA names, used with Intl.DateTimeFormat to render sunrise /
 * sunset in the destination's local time (DST handled automatically).
 *
 * Consumed by:
 *   - scout-lib/render-sun-calendar.mjs (sunrise/sunset times)
 *   - scout-lib/solunar.mjs
 *   - scout-lib/render-tide-chart.mjs
 *   - scout-lib/render-report.mjs (hero_region picks the top-of-report hero)
 *   - bite-lib/* (Eat Window score inputs)
 *
 * Keys must EXACTLY match the destination names used in
 * scout-lib/species-by-destination.mjs and scout/index.html's dropdown.
 */

export const DESTINATION_META = {
  // Caribbean & Bahamas
  "Andros, Bahamas":                                                 { lat: 24.7333, lon: -77.7833, tz: "America/Nassau", hero_region: "atlantic" },
  "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": { lat: 26.5,  lon: -77.1,  tz: "America/Nassau", hero_region: "atlantic" },
  "Bimini, Bahamas":                                                 { lat: 25.7,  lon: -79.3,  tz: "America/Nassau", hero_region: "atlantic" },
  "Turks & Caicos":                                                  { lat: 21.4667, lon: -71.1333, tz: "America/Grand_Turk", hero_region: "atlantic" },
  "Cayman Islands":                                                  { lat: 19.3,  lon: -81.4,  tz: "America/Cayman", hero_region: "atlantic" },
  "ABC Islands (Bonaire, Aruba, Curaçao)":                           { lat:   12.15, lon: -68.2667, tz: "America/Curacao", hero_region: "atlantic" },
  "Jardines de la Reina, Cuba":                                      { lat: 20.7,  lon: -78.9,  tz: "America/Havana", hero_region: "atlantic" },
  "Cuba — Cayo Cruz / Cayo Largo":                                   { lat: 21.8,  lon: -78.0,  tz: "America/Havana", hero_region: "atlantic" },

  // Florida & Gulf Coast
  "Florida Keys (Lower & Middle Keys)":                              { lat: 24.7,  lon: -81.0,  tz: "America/New_York", hero_region: "gulf-coast" },
  "Biscayne Bay & Everglades, FL":                                   { lat: 25.5,  lon: -80.4,  tz: "America/New_York", hero_region: "gulf-coast" },
  "Mosquito Lagoon & Indian River Lagoon, FL":                       { lat:  29.025, lon:    -80.9, tz: "America/New_York", hero_region: "gulf-coast" },
  "Tampa Bay & Sanibel, FL":                                         { lat: 27.0,  lon: -82.4,  tz: "America/New_York", hero_region: "gulf-coast" },
  "Louisiana Marsh":                                                 { lat: 29.2683, lon:   -89.35, tz: "America/Chicago", hero_region: "gulf-coast" },
  "Texas Gulf Coast / Laguna Madre":                                 { lat: 26.1067, lon: -97.1683, tz: "America/Chicago", hero_region: "gulf-coast" },

  // Atlantic Coast (US)
  "Outer Banks, NC":                                                 { lat: 35.2519, lon: -75.5289, tz: "America/New_York", hero_region: "atlantic" },
  "South Carolina Lowcountry":                                       { lat: 32.8,  lon: -79.9,  tz: "America/New_York", hero_region: "atlantic" },
  "Georgia Lowcountry":                                              { lat: 31.1,  lon: -81.5,  tz: "America/New_York", hero_region: "atlantic" },

  // Mexico & Central America
  "Ambergris Caye & Turneffe, Belize":                               { lat:    17.5, lon: -88.1833, tz: "America/Belize", hero_region: "central-america" },
  "Boca Paila & Sian Ka'an, Mexico":                                 { lat: 19.6,  lon: -87.5,  tz: "America/Cancun", hero_region: "central-america" },
  "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)":            { lat: 19.7,  lon: -87.5,  tz: "America/Cancun", hero_region: "central-america" },
  "Baja California Sur, Mexico":                                     { lat: 24.1442, lon:  -110.31, tz: "America/Mazatlan", hero_region: "pacific" },
  "Honduras (Rio Sico / Mosquitia)":                                 { lat: 15.7,  lon: -84.9,  tz: "America/Tegucigalpa", hero_region: "central-america" },
  "Costa Rica Pacific Coast":                                        { lat:  9.9764, lon: -84.8383, tz: "America/Costa_Rica", hero_region: "pacific" },
  "Costa Rica Caribbean (Tortuguero / Río Colorado)":                { lat:  9.9906, lon: -83.0356, tz: "America/Costa_Rica", hero_region: "central-america" },
  "Nicaragua (Río San Juan)":                                        { lat: 11.0,  lon: -84.8,  tz: "America/Managua", hero_region: "central-america" },
  "Bocas del Toro, Panama":                                          { lat: 9.3,   lon: -82.3,  tz: "America/Panama", hero_region: "central-america" },

  // South America
  "Los Roques, Venezuela":                                           { lat: 11.9,  lon: -66.7,  tz: "America/Caracas", hero_region: "atlantic" },

  // Africa & Middle East
  "Sudan / Nubian Flats (Red Sea)":                                  { lat: 19.6167, lon:  37.2167, tz: "Africa/Khartoum", hero_region: "red-sea" },
  "Oman (Hallaniyat Islands)":                                       { lat: 17.5,  lon: 56.0,   tz: "Asia/Muscat", hero_region: "red-sea" },
  "Mozambique (Bazaruto Archipelago)":                               { lat: -21.7, lon: 35.5,   tz: "Africa/Maputo", hero_region: "indian-ocean" },
  "Gabón, West Africa":                                              { lat: -0.5,  lon: 9.0,    tz: "Africa/Libreville", hero_region: "atlantic" },
  "Seychelles (Alphonse, Astove, Cosmoledo, Providence)":            { lat: -7.0,  lon: 52.7,   tz: "Indian/Mahe", hero_region: "indian-ocean" },

  // Indian Ocean
  "Maldives":                                                        { lat:  4.1667, lon:     73.5, tz: "Indian/Maldives", hero_region: "indian-ocean" },
  "Rodrigues, Mauritius":                                            { lat: -19.7, lon: 63.4,   tz: "Indian/Mauritius", hero_region: "indian-ocean" },
  "Madagascar (Nosy Be)":                                            { lat: -13.4, lon: 48.3,   tz: "Indian/Antananarivo", hero_region: "indian-ocean" },

  // Indo-Pacific & Oceania
  "Australia — Exmouth / Ningaloo Reef":                             { lat: -21.9, lon: 114.1,  tz: "Australia/Perth", hero_region: "pacific" },
  "Australia — Cape York / Gulf of Carpentaria":                     { lat: -10.7, lon: 142.6,  tz: "Australia/Brisbane", hero_region: "pacific" },
  "Papua New Guinea (Bismarck Archipelago)":                         { lat:    -4.2, lon:  152.183, tz: "Pacific/Port_Moresby", hero_region: "pacific" },
  "Indonesia (Raja Ampat)":                                          { lat: -0.4269, lon:  130.815, tz: "Asia/Jayapura", hero_region: "pacific" },
  "Solomon Islands":                                                 { lat: -9.4333, lon:  159.956, tz: "Pacific/Guadalcanal", hero_region: "pacific" },

  // Pacific
  "Hawaii":                                                          { lat: 20.7,  lon: -156.4, tz: "Pacific/Honolulu", hero_region: "pacific" },
  "Christmas Island, Kiribati":                                      { lat:  1.9847, lon: -157.476, tz: "Pacific/Kiritimati", hero_region: "pacific" },
};

/**
 * Get destination metadata. Returns null if unknown.
 */
export function getDestinationMeta(name) {
  if (!name || typeof name !== "string") return null;
  return DESTINATION_META[name] || null;
}
