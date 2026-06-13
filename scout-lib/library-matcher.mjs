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
  const claudeNorm = normalize(claudeFlyName);
  const claudeTokens = tokenSet(claudeNorm);
  const speciesNorm = species?.toLowerCase().trim();

  // Score every catalog pattern; return the highest-scoring one that also
  // passes the context filter (species). Score breakdown:
  //   100 — exact normalized name match
  //    90 — same token set (different order)
  //    80 — Claude's tokens are a subset of the catalog pattern's tokens
  //         (e.g., "Clouser Minnow" -> "Clouser Deep Minnow")
  //    70 — catalog pattern's tokens are a subset of Claude's tokens
  //         (e.g., "EP Permit Crab" -> "EP Crab")
  //    50 — substring match either way
  // Ties broken by SHORTER pattern name (closer to Claude's input, less drift).

  let best = null;
  for (const pattern of LIBRARY_CATALOG.patterns) {
    const pNorm = normalize(pattern.pattern_name);
    const pTokens = tokenSet(pNorm);
    let score = 0;

    if (pNorm === claudeNorm) score = 100;
    else if (setsEqual(pTokens, claudeTokens)) score = 90;
    else if (isSubsetOf(claudeTokens, pTokens)) score = 80;
    else if (isSubsetOf(pTokens, claudeTokens)) score = 70;
    else if (pNorm.includes(claudeNorm) || claudeNorm.includes(pNorm)) score = 50;
    else continue;

    if (!patternMatchesContext(pattern, speciesNorm, destination)) continue;

    if (!best || score > best.score ||
        (score === best.score && pNorm.length < normalize(best.pattern.pattern_name).length)) {
      best = { pattern, score };
    }
  }

  return best ? best.pattern : null;
}

function tokenSet(s) {
  return new Set((s || "").split(" ").filter(Boolean));
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function isSubsetOf(small, big) {
  if (small.size === 0 || small.size > big.size) return false;
  for (const x of small) if (!big.has(x)) return false;
  return true;
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
