/**
 * POST /scout/admin/purge?admin_key=<KEY>&confirm=YES
 *
 * Admin-only wipe of ALL intake + report blobs. Purges the seven data stores:
 *
 *   Trip Scout (scout-lib/storage.mjs):
 *     - "intake"
 *     - "intakes-by-email"
 *     - "report"
 *     - "report-meta"
 *
 *   Eat Window (bite-lib/storage.mjs):
 *     - "bite-intake"
 *     - "bite-report"
 *     - "bite-report-meta"
 *
 * Does NOT touch shared data caches:
 *   - "tide-cache"    (WorldTides responses; purge = higher API cost next request)
 *   - "weather-cache" (StormGlass responses; same reason)
 *
 * Auth — provide one of (SAME pattern as scout-admin-intakes.mjs):
 *   - Header: X-Admin-Key: <ADMIN_KEY>
 *   - Query:  ?admin_key=<ADMIN_KEY>
 *
 * Safety — the endpoint requires TWO signals to actually delete:
 *   1. Valid admin_key
 *   2. Query param ?confirm=YES  (exact match)
 *
 * Without confirm=YES the endpoint returns a dry-run count of keys per store.
 * With confirm=YES it deletes and returns the count of keys removed per store.
 *
 * Method: POST (to make casual GET requests never destructive).
 * Returns JSON.
 */

import { getStore } from "@netlify/blobs";

const SCOUT_STORES = ["intake", "intakes-by-email", "report", "report-meta"];
const BITE_STORES = ["bite-intake", "bite-report", "bite-report-meta"];
const ALL_STORES = [...SCOUT_STORES, ...BITE_STORES];

export default async (req) => {
  const url = new URL(req.url);

  // ---- Auth ----
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return jsonResponse(500, { error: "ADMIN_KEY not configured on site" });
  }
  const providedKey =
    req.headers.get("x-admin-key") ||
    url.searchParams.get("admin_key") ||
    "";
  if (providedKey !== adminKey) {
    return jsonResponse(401, { error: "Bad or missing admin key" });
  }

  // ---- Method guard ----
  if (req.method !== "POST") {
    return jsonResponse(405, {
      error: "Method not allowed — POST required",
      hint: "POST /scout/admin/purge?admin_key=<KEY>&confirm=YES",
    });
  }

  // ---- Dry run vs live ----
  const confirm = url.searchParams.get("confirm") || "";
  const dryRun = confirm !== "YES";

  const results = {
    mode: dryRun ? "dry_run" : "live_purge",
    started_at: new Date().toISOString(),
    stores: {},
  };

  for (const storeName of ALL_STORES) {
    try {
      const store = getStore(storeName);
      const { blobs } = await store.list();
      const keys = (blobs || []).map((b) => b.key);
      let deletedCount = 0;
      let errors = [];

      if (!dryRun && keys.length > 0) {
        // Delete in batches of 20 to be gentle on the SDK
        for (let i = 0; i < keys.length; i += 20) {
          const batch = keys.slice(i, i + 20);
          const outcomes = await Promise.allSettled(
            batch.map((k) => store.delete(k))
          );
          for (let j = 0; j < outcomes.length; j++) {
            if (outcomes[j].status === "fulfilled") {
              deletedCount++;
            } else {
              errors.push({
                key: batch[j],
                error: String(outcomes[j].reason?.message || outcomes[j].reason),
              });
            }
          }
        }
      }

      results.stores[storeName] = {
        listed: keys.length,
        deleted: dryRun ? 0 : deletedCount,
        errors: errors.slice(0, 10), // cap error output
        error_count: errors.length,
      };
    } catch (err) {
      results.stores[storeName] = {
        error: String(err?.message || err),
      };
    }
  }

  results.finished_at = new Date().toISOString();
  results.total_listed = Object.values(results.stores).reduce(
    (a, s) => a + (s.listed || 0), 0
  );
  results.total_deleted = Object.values(results.stores).reduce(
    (a, s) => a + (s.deleted || 0), 0
  );

  if (dryRun) {
    results.hint =
      "This was a DRY RUN. To actually delete, POST again with &confirm=YES.";
  }

  return jsonResponse(200, results);
};

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
