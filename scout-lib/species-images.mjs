/**
 * Species name -> illustration filename lookup.
 *
 * Maps the various species names Claude can output to the canonical slug of
 * an illustration in /images/species/. Returns null if no matching
 * illustration exists; the renderer renders the species block without a
 * banner in that case.
 *
 * Illustrations live in fishfly-ai/images/species/<slug>.webp and were
 * imported 2026-06-14 as a permanent approved species image library
 * (28 species at this time).
 *
 * Updates:
 *   - Add new species to SPECIES_TO_SLUG when illustrations are added.
 *   - Local-language variants (Hawaiian, etc.) are handled via normalize().
 *     Update SPECIES_TO_SLUG if a variant needs to point at a different slug.
 */

// Pacific destinations — used to disambiguate species with regional variants
// (currently only Cubera Snapper has Atlantic vs Pacific illustrations).
const PACIFIC_DESTINATIONS = [
  "costa rica", "panama", "christmas island", "kiribati", "hawaii",
  "baja", "mexico pacific", "cape york", "raja ampat", "papua new guinea",
  "png", "solomon", "exmouth", "ningaloo", "oman", "alphonse", "seychelles",
  "rodrigues", "madagascar", "mozambique",
];

// Canonical species -> slug. Use lowercase, no parens content.
const SPECIES_TO_SLUG = {
  // Tier 1 (focus species)
  "bonefish":               "bonefish",
  "tarpon":                 "tarpon",
  "atlantic tarpon":        "tarpon",
  "smalleye tarpon":        "tarpon",
  "indo pacific tarpon":    "tarpon",
  "permit":                 "permit",
  "indo pacific permit":    "permit",
  "snook":                  "snook",
  "common snook":           "snook",
  "fat snook":              "snook",
  "pacific snook":          "snook",
  "redfish":                "redfish",
  "red drum":               "redfish",
  "giant trevally":         "giant-trevally",
  "gt":                     "giant-trevally",

  // Tier 2 (high-frequency)
  "jack crevalle":          "jack-crevalle",
  "jacks":                  "jack-crevalle",
  "papio jacks":            "jack-crevalle",
  "barracuda":              "barracuda",
  "great barracuda":        "barracuda",
  "bluefin trevally":       "bluefin-trevally",
  "golden trevally":        "golden-trevally",
  "spanish mackerel":       "spanish-mackerel",
  "sierra mackerel":        "spanish-mackerel",
  // Cubera has two illustrations — handled by getSpeciesImageSlug() w/ destination
  "cubera snapper":         "cubera-snapper-atlantic",

  // Tier 3 (long tail covered)
  "mutton snapper":         "mutton-snapper",
  "milkfish":               "milkfish",
  "ladyfish":               "ladyfish",
  "sheepshead":             "sheepshead",
  "roosterfish":            "roosterfish",
  "wahoo":                  "wahoo",
  "yellowfin tuna":         "yellowfin-tuna",
  "dorado":                 "dorado-mahi-mahi",
  "mahi mahi":              "dorado-mahi-mahi",
  "mahi":                   "dorado-mahi-mahi",
  "blue marlin":            "blue-marlin",
  "black marlin":           "black-marlin",
  "striped marlin":         "striped-marlin",
  "barramundi":             "barramundi",
  "threadfin salmon":       "threadfin-salmon",
  "papuan black bass":      "papuan-black-bass",
  "niugini black bass":     "papuan-black-bass",
  "niugini papuan black bass": "papuan-black-bass",
  "triggerfish":            "triggerfish",
  "yellowmargin triggerfish": "triggerfish",
  "titan triggerfish":      "triggerfish",
};

/**
 * Get the illustration slug for a species, with destination context for
 * disambiguating regional variants (e.g., cubera snapper).
 *
 * Returns the slug (no extension, no path) or null if no illustration exists.
 */
export function getSpeciesImageSlug(speciesName, destination) {
  const key = normalize(speciesName);
  if (!key) return null;

  // Direct hit
  if (SPECIES_TO_SLUG[key]) {
    // Cubera Pacific: switch to pacific slug if destination is in Pacific region
    if (SPECIES_TO_SLUG[key] === "cubera-snapper-atlantic" && isPacificDestination(destination)) {
      return "cubera-snapper-pacific";
    }
    return SPECIES_TO_SLUG[key];
  }

  // Fallback: try stripping common suffixes / parens
  const stripped = key
    .replace(/\b(adult|juvenile|baby|resident|big|small|baby and resident)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (stripped !== key && SPECIES_TO_SLUG[stripped]) {
    return SPECIES_TO_SLUG[stripped];
  }

  // Substring fallback: e.g. "bonefish (oio)" already handled by normalize, but
  // catch other "<species> (<local name>)" patterns by token-equality.
  for (const [k, v] of Object.entries(SPECIES_TO_SLUG)) {
    if (key.includes(k) || k.includes(key)) {
      if (v === "cubera-snapper-atlantic" && isPacificDestination(destination)) {
        return "cubera-snapper-pacific";
      }
      return v;
    }
  }

  return null;
}

/**
 * Full URL for an illustration, relative to the site root.
 * Returns null if no illustration exists for this species.
 */
export function getSpeciesImageUrl(speciesName, destination) {
  const slug = getSpeciesImageSlug(speciesName, destination);
  return slug ? `/images/species/${slug}.webp` : null;
}

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/\([^)]*\)/g, " ")  // drop parens content like "(oio)" or "(baby and resident)"
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isPacificDestination(destination) {
  if (!destination) return false;
  const d = (typeof destination === "string" ? destination : (destination.country || destination.region || "")).toLowerCase();
  return PACIFIC_DESTINATIONS.some((p) => d.includes(p));
}
