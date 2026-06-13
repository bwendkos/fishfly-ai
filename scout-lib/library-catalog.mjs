/**
 * Saltwater Fly Library catalog — pre-baked from the live Library data.
 *
 * This is the curated catalog of verified fly patterns used by lib/library-matcher.js
 * to add cross-links to Claude-generated fly recommendations.
 *
 * Generation: run `npm run build:catalog` to re-bake from the live Library
 * webpage at fishfly.ai/library/ (see scripts/build-library-catalog.js).
 *
 * Shape per pattern:
 *   {
 *     pattern_name: "Bob Clouser's Clouser Minnow",
 *     slug: "clouser-minnow",
 *     target_species: ["snook", "tarpon", "striped bass"],
 *     region: "Marathon & Middle Keys",
 *     originator: "Bob Clouser",
 *     library_url: "https://fishfly.ai/library/#pattern=clouser-minnow",
 *     image_url: "https://...",
 *     buy_url: "https://orvis.com/...",
 *     buy_retailer: "Orvis"
 *   }
 *
 * Currently EMPTY — populated by build script before first deploy.
 *
 * TODO: Run `npm run build:catalog` after creating scripts/build-library-catalog.js.
 */

export const LIBRARY_CATALOG = {
  generated_at: null,
  source_url: "https://fishfly.ai/library/",
  patterns: [],
  // After build:
  // patterns: [ /* 683 verified fly patterns */ ]
};
