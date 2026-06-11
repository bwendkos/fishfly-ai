/**
 * Tool Use JSON schema for the Trip Scout report.
 *
 * This is the structured output contract Claude MUST satisfy. Server-side Ajv
 * validation enforces it (one retry on validation failure with corrective
 * feedback). The renderer (lib/render-report.js) reads this exact shape.
 *
 * Report has 6 sections:
 *   1. trip_overview        — personalized greeting + reality check
 *   2. species_profiles     — deep-dive per species (1-6 entries)
 *   3. weather_moon_tides   — interpreted real data
 *   4. packing_checklist    — trip-specific
 *   5. logistics            — airports, transport, lodging
 *   6. regulations          — honest, double-disclaimed
 *
 * TODO before launch:
 *   - Validate this schema produces good outputs across test destinations
 *   - Tune required fields (start permissive, tighten as we learn)
 *   - Consider whether self_critique section adds value (safety has it; Trip Scout may skip)
 */

export const TOOL_NAME = "submit_trip_report";

export const TOOL_DESCRIPTION =
  "Submit the complete personalized saltwater fly fishing trip report. " +
  "Must include all 6 sections. The user is an experienced angler — go deep " +
  "on specifics that actually matter at this destination in this month. " +
  "Be honest about non-viable species. No filler.";

export const REPORT_SCHEMA = {
  type: "object",
  required: [
    "trip_overview",
    "species_profiles",
    "weather_moon_tides",
    "packing_checklist",
    "logistics",
    "regulations",
  ],
  properties: {
    /* ------------------------------------------------------------------ */
    trip_overview: {
      type: "object",
      required: ["greeting", "destination_reality", "species_reality_check", "weather_caveat"],
      properties: {
        greeting: {
          type: "string",
          minLength: 50,
          description:
            "Warm, personal opening using the user's first name. 2-3 sentences. Not 'Dear Mike,' — more like 'Hey Mike — here's what you're walking into.'",
        },
        destination_reality: {
          type: "string",
          minLength: 200,
          description:
            "Honest practical orientation to the specific area. What makes it different from other parts of the country/island. What experienced anglers consistently get wrong about it. Cultural notes if relevant. NOT a generic destination overview.",
        },
        species_reality_check: {
          type: "array",
          minItems: 1,
          maxItems: 6,
          items: {
            type: "object",
            required: ["species", "viability", "notes"],
            properties: {
              species: { type: "string" },
              viability: {
                type: "string",
                enum: ["prime", "solid", "marginal", "non_viable"],
                description:
                  "Honest assessment for this species at this destination in this month.",
              },
              notes: { type: "string", minLength: 80 },
            },
          },
        },
        weather_caveat: {
          type: "string",
          minLength: 80,
          description:
            "Honest weather/conditions framing for the trip length. Flag short-trip vulnerability if trip is 3 days or fewer.",
        },
      },
    },

    /* ------------------------------------------------------------------ */
    species_profiles: {
      type: "array",
      minItems: 1,
      maxItems: 6,
      items: {
        type: "object",
        required: ["species", "the_fish", "gear", "top_flies", "presentation", "conservation"],
        properties: {
          species: { type: "string" },
          the_fish: {
            type: "string",
            minLength: 200,
            description:
              "What makes this species uniquely challenging/rewarding at this specific destination in this specific month. Feeding patterns, movement, how water temp affects them. What experienced anglers get wrong about THIS fish at THIS destination.",
          },
          gear: {
            type: "object",
            required: ["rod", "reel", "line", "leader"],
            properties: {
              rod: { type: "string" },
              reel: { type: "string" },
              line: { type: "string" },
              leader: { type: "string" },
              season_notes: { type: "string" },
            },
          },
          top_flies: {
            type: "array",
            minItems: 3,
            maxItems: 5,
            description:
              "Top 3-5 flies in priority order. Library cross-link injection happens in post-processing — Claude just names the patterns; the matcher adds Library URLs where available.",
            items: {
              type: "object",
              required: ["name", "hook_size", "colors", "why_it_works"],
              properties: {
                name: { type: "string" },
                hook_size: { type: "string" },
                colors: { type: "string" },
                why_it_works: { type: "string", minLength: 50 },
              },
            },
          },
          presentation: {
            type: "string",
            minLength: 200,
            description:
              "Approach, cast, retrieve, reading fish at this destination. If fishing style includes DIY, add self-positioning advice. Most common presentation mistakes for this species here.",
          },
          conservation: {
            type: "string",
            minLength: 80,
            description:
              "Handling, release best practices, regulations-relevant notes. Practical not preachy.",
          },
        },
      },
    },

    /* ------------------------------------------------------------------ */
    weather_moon_tides: {
      type: "object",
      required: ["weather_overview", "moon_summary", "tide_summary", "solunar_summary"],
      properties: {
        weather_overview: { type: "string", minLength: 200 },
        moon_summary: { type: "string", minLength: 100 },
        tide_summary: { type: "string", minLength: 100 },
        solunar_summary: { type: "string", minLength: 100 },
        best_dates_recommendation: {
          type: "object",
          description:
            "Only present if timing_mode is 'month' or 'flexible'. Specific date range recommendation with rationale.",
          properties: {
            window_label: { type: "string" },
            why_this_window: { type: "string", minLength: 100 },
            per_species_benefit: { type: "string", minLength: 100 },
          },
        },
      },
    },

    /* ------------------------------------------------------------------ */
    packing_checklist: {
      type: "object",
      required: ["must_have", "nice_to_have"],
      properties: {
        must_have: {
          type: "object",
          properties: {
            tackle_and_gear: { type: "array", items: { type: "string" } },
            clothing_sun: { type: "array", items: { type: "string" } },
            travel_logistics: { type: "array", items: { type: "string" } },
            medical_safety: { type: "array", items: { type: "string" } },
          },
        },
        nice_to_have: {
          type: "object",
          properties: {
            extras: { type: "array", items: { type: "string" } },
          },
        },
      },
    },

    /* ------------------------------------------------------------------ */
    logistics: {
      type: "object",
      required: ["nearest_airports", "ground_transport", "lodging_notes"],
      properties: {
        nearest_airports: {
          type: "array",
          minItems: 1,
          maxItems: 4,
          items: {
            type: "object",
            required: ["airport", "details"],
            properties: {
              airport: { type: "string" },
              details: { type: "string" },
            },
          },
        },
        ground_transport: { type: "string", minLength: 100 },
        lodging_notes: { type: "string", minLength: 100 },
      },
    },

    /* ------------------------------------------------------------------ */
    regulations: {
      type: "object",
      required: ["disclaimer_top", "licenses_required", "species_regulations", "disclaimer_bottom"],
      properties: {
        disclaimer_top: {
          type: "string",
          minLength: 100,
          description:
            "Required at top: 'Regulations change. Always verify with local authority before fishing.'",
        },
        licenses_required: { type: "string", minLength: 80 },
        species_regulations: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            required: ["species", "season", "bag_limit"],
            properties: {
              species: { type: "string" },
              season: { type: "string" },
              bag_limit: { type: "string" },
              size_limit: { type: "string" },
              handling: { type: "string" },
              notes: { type: "string" },
            },
          },
        },
        disclaimer_bottom: {
          type: "string",
          minLength: 100,
          description:
            "Required at bottom: same disclaimer text reinforcing 'verify before you fish'.",
        },
      },
    },
  },
};
