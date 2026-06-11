/**
 * POST /.netlify/functions/scout-migrate-blobs
 *
 * One-shot Blobs migration from the standalone Trip Scout Netlify site into
 * fishfly-ai's Blobs. Run once after merge deploy, before cutover.
 *
 * Auth: requires X-Admin-Key header matching ADMIN_KEY env var.
 *
 * Body (JSON):
 *   {
 *     sourceSiteId: "a1551e26-3ea1-4905-af3f-53342076de96",
 *     sourceToken:  "nfp_...",     // Netlify PAT with access to source site
 *     stores?: ["intake","intakes-by-email","report","report-meta"],  // default all 4
 *     dryRun?: true                 // count keys only, no writes
 *   }
 *
 * Returns: { migrated: { storeName: count }, errors: [...] }
 *
 * Safe to invoke multiple times — `set()` is idempotent per key.
 *
 * Delete this file in a follow-up cleanup commit once migration is verified.
 */

import { getStore } from "@netlify/blobs";

const DEFAULT_STORES = ["intake", "intakes-by-email", "report", "report-meta"];

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ---- auth ----------
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return jsonResponse(500, { error: "ADMIN_KEY env var not configured on this site" });
  }
  if (req.headers.get("x-admin-key") !== adminKey) {
    return jsonResponse(401, { error: "Bad or missing X-Admin-Key header" });
  }

  // ---- body ----------
  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const { sourceSiteId, sourceToken, stores, dryRun } = body || {};
  if (!sourceSiteId || !sourceToken) {
    return jsonResponse(400, { error: "Missing sourceSiteId or sourceToken in body" });
  }

  const targetStores = Array.isArray(stores) && stores.length > 0 ? stores : DEFAULT_STORES;
  const result = { migrated: {}, errors: [], dryRun: !!dryRun };

  for (const name of targetStores) {
    try {
      const src = getStore({ name, siteID: sourceSiteId, token: sourceToken });
      const dst = getStore(name); // current-site Blobs (no explicit siteID/token needed inside a function)

      const { blobs } = await src.list();
      const keys = (blobs || []).map((b) => b.key);
      let copied = 0;

      for (const key of keys) {
        try {
          if (dryRun) {
            copied++;
            continue;
          }
          // Use raw get/set so we work for both HTML (string) and JSON stores
          // without caring about content-type.
          const data = await src.getWithMetadata(key, { type: "arrayBuffer" });
          if (data == null) continue;
          await dst.set(key, data.data, data.metadata ? { metadata: data.metadata } : undefined);
          copied++;
        } catch (err) {
          result.errors.push({ store: name, key, error: err?.message || String(err) });
        }
      }

      result.migrated[name] = { totalKeys: keys.length, copied };
    } catch (err) {
      result.errors.push({ store: name, error: err?.message || String(err) });
    }
  }

  return jsonResponse(200, result);
};

function jsonResponse(status, body) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
