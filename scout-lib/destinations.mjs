/**
 * Destination metadata: lat/lon + IANA timezone for all 42 library regions.
 *
 * Coordinates are representative centroids (good to ~50 mi for sunrise/sunset
 * purposes — longitude affects the time, latitude affects the day length).
 *
 * Timezones are IANA names, used with Intl.DateTimeFormat to render sunrise /
 * sunset in the destination's local time (DST handled automatically).
 *
 * Consumed by:
 *   - scout-lib/render-sun-calendar.mjs (sunrise/sunset times)
 *   - scout-lib/solunar.mjs (when added in Phase 2E Tier 2b)
 *   - scout-lib/render-tide-chart.mjs (when added in Phase 2E Tier 3)
 *
 * Keys must EXACTLY match the destination names used in
 * scout-lib/species-by-destination.mjs and scout/index.html's dropdown.
 */

export const DESTINATION_META = {
  // Caribbean & Bahamas
  "Andros, Bahamas":                                                 { lat: 24.6,  lon: -77.8,  tz: "America/Nassau" },
  "Abaco & Bahamas Out Islands (Long Island, Acklins, Crooked Island)": { lat: 26.5,  lon: -77.1,  tz: "America/Nassau" },
  "Bimini, Bahamas":                                                 { lat: 25.7,  lon: -79.3,  tz: "America/Nassau" },
  "Turks & Caicos":                                                  { lat: 21.7,  lon: -71.6,  tz: "America/Grand_Turk" },
  "Cayman Islands":                                                  { lat: 19.3,  lon: -81.4,  tz: "America/Cayman" },
  "ABC Islands (Bonaire, Aruba, Curaçao)":                           { lat: 12.2,  lon: -68.9,  tz: "America/Curacao" },
  "Jardines de la Reina, Cuba":                                      { lat: 20.7,  lon: -78.9,  tz: "America/Havana" },
  "Cuba — Cayo Cruz / Cayo Largo":                                   { lat: 21.8,  lon: -78.0,  tz: "America/Havana" },

  // Florida & Gulf Coast
  "Florida Keys (Lower & Middle Keys)":                              { lat: 24.7,  lon: -81.0,  tz: "America/New_York" },
  "Biscayne Bay & Everglades, FL":                                   { lat: 25.5,  lon: -80.4,  tz: "America/New_York" },
  "Mosquito Lagoon & Indian River Lagoon, FL":                       { lat: 28.7,  lon: -80.8,  tz: "America/New_York" },
  "Tampa Bay & Sanibel, FL":                                         { lat: 27.0,  lon: -82.4,  tz: "America/New_York" },
  "Louisiana Marsh":                                                 { lat: 29.5,  lon: -89.5,  tz: "America/Chicago" },
  "Texas Gulf Coast / Laguna Madre":                                 { lat: 26.3,  lon: -97.4,  tz: "America/Chicago" },

  // Atlantic Coast (US)
  "Outer Banks, NC":                                                 { lat: 35.5,  lon: -75.5,  tz: "America/New_York" },
  "South Carolina Lowcountry":                                       { lat: 32.8,  lon: -79.9,  tz: "America/New_York" },
  "Georgia Lowcountry":                                              { lat: 31.1,  lon: -81.5,  tz: "America/New_York" },

  // Mexico & Central America
  "Ambergris Caye & Turneffe, Belize":                               { lat: 17.9,  lon: -87.9,  tz: "America/Belize" },
  "Boca Paila & Sian Ka'an, Mexico":                                 { lat: 19.6,  lon: -87.5,  tz: "America/Cancun" },
  "Ascension Bay & Espíritu Santo Bay, Mexico (Yucatán)":            { lat: 19.7,  lon: -87.5,  tz: "America/Cancun" },
  "Baja California Sur, Mexico":                                     { lat: 23.0,  lon: -109.7, tz: "America/Mazatlan" },
  "Honduras (Rio Sico / Mosquitia)":                                 { lat: 15.7,  lon: -84.9,  tz: "America/Tegucigalpa" },
  "Costa Rica Pacific Coast":                                        { lat: 9.6,   lon: -84.4,  tz: "America/Costa_Rica" },
  "Costa Rica Caribbean (Tortuguero / Río Colorado)":                { lat: 10.6,  lon: -83.5,  tz: "America/Costa_Rica" },
  "Nicaragua (Río San Juan)":                                        { lat: 11.0,  lon: -84.8,  tz: "America/Managua" },
  "Bocas del Toro, Panama":                                          { lat: 9.3,   lon: -82.3,  tz: "America/Panama" },

  // South America
  "Los Roques, Venezuela":                                           { lat: 11.9,  lon: -66.7,  tz: "America/Caracas" },

  // Africa & Middle East
  "Sudan / Nubian Flats (Red Sea)":                                  { lat: 18.5,  lon: 38.2,   tz: "Africa/Khartoum" },
  "Oman (Hallaniyat Islands)":                                       { lat: 17.5,  lon: 56.0,   tz: "Asia/Muscat" },
  "Mozambique (Bazaruto Archipelago)":                               { lat: -21.7, lon: 35.5,   tz: "Africa/Maputo" },
  "Gabón, West Africa":                                              { lat: -0.5,  lon: 9.0,    tz: "Africa/Libreville" },
  "Seychelles (Alphonse, Astove, Cosmoledo, Providence)":            { lat: -7.0,  lon: 52.7,   tz: "Indian/Mahe" },

  // Indian Ocean
  "Maldives":                                                        { lat: 3.2,   lon: 73.1,   tz: "Indian/Maldives" },
  "Rodrigues, Mauritius":                                            { lat: -19.7, lon: 63.4,   tz: "Indian/Mauritius" },
  "Madagascar (Nosy Be)":                                            { lat: -13.4, lon: 48.3,   tz: "Indian/Antananarivo" },

  // Indo-Pacific & Oceania
  "Australia — Exmouth / Ningaloo Reef":                             { lat: -21.9, lon: 114.1,  tz: "Australia/Perth" },
  "Australia — Cape York / Gulf of Carpentaria":                     { lat: -10.7, lon: 142.6,  tz: "Australia/Brisbane" },
  "Papua New Guinea (Bismarck Archipelago)":                         { lat: -4.7,  lon: 152.0,  tz: "Pacific/Port_Moresby" },
  "Indonesia (Raja Ampat)":                                          { lat: -0.5,  lon: 130.5,  tz: "Asia/Jayapura" },
  "Solomon Islands":                                                 { lat: -9.0,  lon: 159.5,  tz: "Pacific/Guadalcanal" },

  // Pacific
  "Hawaii":                                                          { lat: 20.7,  lon: -156.4, tz: "Pacific/Honolulu" },
  "Christmas Island, Kiribati":                                      { lat: 1.9,   lon: -157.4, tz: "Pacific/Kiritimati" },
};

/**
 * Get destination metadata. Returns null if unknown.
 */
export function getDestinationMeta(name) {
  if (!name || typeof name !== "string") return null;
  return DESTINATION_META[name] || null;
}
