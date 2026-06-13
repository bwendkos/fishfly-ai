/**
 * Library cross-link post-processor for Trip Scout.
 *
 * After Claude generates the report, scan the top_flies recommendations
 * across all species_profiles. For each fly name, try to match it against
 * the Saltwater Fly Library catalog. Where a match is found, inject:
 *   - library_url (link to the Library pattern page)
 *   - library_image_url (verified image)
 *   - library_buy_url (existing retailer routing)
 *
 * NO architectural dependency — if no Library match, fly stands on its own.
 *
 * TODO: Replace simple substring matching with a real fuzzy-match algorithm
 * (Levenshtein distance, weighted by region + species filter).
 *
 * See: skills/ai-report-app-pattern/README.md for the pattern rationale.
 */

import { LIBRARY_CATALOG } from "./library-catalog.mjs";

/**
 * Enrich a report object by adding Library cross-references to top_flies.
 * Returns a NEW report object (does not mutate input).
 */
export function enrichWithLibraryLinks(report, intake) {
  if (!report?.species_profiles?.length) return report;

  const enrichedProfiles = report.species_profiles.map((profile) => ({
    ...profile,
    top_flies: (profile.top_flies || []).map((fly) => enrichOneFly(fly, profile.species, intake)),
  }));

  return { ...report, species_profiles: enrichedProfiles };
}

function enrichOneFly(fly, species, intake) {
  const match = findBestMatch(fly.name, species, intake.destination);
  if (!match) return fly;

  return {
    ...fly,
    library_url: match.library_url,
    library_image_url: match.image_url,
    library_buy_url: match.buy_url,
    library_originator: match.originator,
  };
}

function findBestMatch(claudeFlyName, species, destination) {
  if (!claudeFlyName || !LIBRARY_CATALOG.patterns) return null;
  const normalized = normalize(claudeFlyName);
  const speciesNorm = species?.toLowerCase().trim();

  // First pass: exact name match
  for (const pattern of LIBRARY_CATALOG.patterns) {
    if (normalize(pattern.pattern_name) === normalized) {
      if (patternMatchesContext(pattern, speciesNorm, destination)) {
        return pattern;
      }
    }
  }

  // Second pass: substring match (Claude may abbreviate)
  for (const pattern of LIBRARY_CATALOG.patterns) {
    const patternNorm = normalize(pattern.pattern_name);
    if (patternNorm.includes(normalized) || normalized.includes(patternNorm)) {
      if (patternMatchesContext(pattern, speciesNorm, destination)) {
        return pattern;
      }
    }
  }

  return null;
}

function patternMatchesContext(pattern, species, destination) {
  // Filter by species if pattern has species tags
  if (species && pattern.target_species?.length) {
    const speciesNorms = pattern.target_species.map((s) => normalize(s));
    if (!speciesNorms.some((s) => s.includes(species) || species.includes(s))) {
      return false;
    }
  }
  // TODO: also filter by region — pattern.region vs destination.area/island/country
  // For now, accept any match. Add region filter once Library catalog has consistent region tags.
  return true;
}

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ");
}
