/**
 * Curated lookup table: which species to show in the intake dropdown
 * for a given destination + month combination.
 *
 * Keys: `{slug-of-area-or-country}` — match keys produced by frontend.
 * Values: month → array of top 6 species, sorted marquee-9-first.
 *
 * Fallback: if no entry for (key, month), the intake form shows the
 * marquee 9 species as a safe default. The miss is logged so we can
 * fill the table.
 *
 * MVP scope: Bahamas, Belize, Florida Keys × 12 months.
 *
 * TODO: This is a scaffold. Brad to validate the species lists per
 * destination/month with help from Claude generating first-pass picks.
 */

export const SPECIES_BY_DESTINATION = {
  // ============================================================
  // BAHAMAS — bonefish-dominant year-round
  // ============================================================
  "central-andros-bahamas": {
    January: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    February: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    March: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    April: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    May: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    June: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    July: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    August: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    September: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    October: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    November: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
    December: ["bonefish", "tarpon", "permit", "barracuda", "jack crevalle"],
  },

  // ============================================================
  // FLORIDA KEYS — varies seasonally (tarpon peak March-July)
  // ============================================================
  "seven-mile-bridge-marathon-keys": {
    January: ["snook", "permit", "tarpon", "bonefish", "barracuda"],
    February: ["snook", "permit", "tarpon", "bonefish", "barracuda"],
    March: ["tarpon", "permit", "bonefish", "snook", "barracuda"],
    April: ["tarpon", "permit", "bonefish", "snook", "barracuda"],
    May: ["tarpon", "permit", "bonefish", "snook", "barracuda", "spanish mackerel"],
    June: ["tarpon", "permit", "bonefish", "snook", "barracuda", "spanish mackerel"],
    July: ["tarpon", "permit", "bonefish", "snook", "barracuda", "spanish mackerel"],
    August: ["permit", "bonefish", "tarpon", "snook", "barracuda", "spanish mackerel"],
    September: ["permit", "bonefish", "tarpon", "snook", "barracuda", "spanish mackerel"],
    October: ["permit", "bonefish", "tarpon", "snook", "barracuda", "spanish mackerel"],
    November: ["snook", "permit", "tarpon", "bonefish", "barracuda", "spanish mackerel"],
    December: ["snook", "permit", "tarpon", "bonefish", "barracuda"],
  },

  // ============================================================
  // BELIZE — flats species year-round
  // ============================================================
  "ambergris-caye-belize": {
    January: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    February: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    March: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    April: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    May: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    June: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    July: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    August: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    September: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    October: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    November: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
    December: ["bonefish", "permit", "tarpon", "snook", "barracuda", "jack crevalle"],
  },

  // ============================================================
  // TODO: expand for all MVP destinations
  // Bahamas: Abaco, Exumas, Long Island, Eleuthera, Bimini, Grand Bahama
  // Belize: Turneffe Atoll, Placencia, Glover's Reef
  // Florida Keys: Islamorada, Marathon (other areas), Key West, Other Keys
  // ============================================================
};

/**
 * Look up recommended species for a destination + month.
 * Falls back to marquee-9 if no specific entry exists.
 */
export function pickSpecies(destinationKey, month) {
  const entry = SPECIES_BY_DESTINATION[destinationKey];
  if (entry && entry[month]) return entry[month];
  // Fallback: marquee 9 (caller will show first 6)
  return [
    "bonefish",
    "tarpon",
    "permit",
    "redfish",
    "snook",
    "giant trevally",
    "striped bass",
    "false albacore",
    "roosterfish",
  ];
}
