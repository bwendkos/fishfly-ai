/**
 * POST /.netlify/functions/generate-background
 *
 * Netlify BACKGROUND function (note the -background suffix in filename).
 * Returns 202 immediately, runs up to 15 minutes asynchronously.
 *
 * Pipeline:
 *   1. Validate internal trigger header
 *   2. Read intake from Blobs
 *   3. Fetch external data (weather/tides/moon) — TODO Phase 2
 *   4. Call Claude (lib/anthropic.js) with Tool Use forced
 *   5. Validate against schema (handled inside generateTripReport)
 *   6. Post-process for Library cross-links (lib/library-matcher.js)
 *   7. Render HTML report (lib/render-report.js)
 *   8. Store HTML + metadata in Blobs
 *   9. Update intake with report_id
 *  10. Send "report ready" email
 *
 * Newsletter opt-in was previously step 11 here. Moved to scout-confirm.mjs
 * on 2026-07-03 so users are captured for marketing on confirmation, not
 * only on successful report completion. See PR #55.
 *
 * Idempotency: if report_id is already set on the intake, exit early.
 */

import { getIntake, setIntakeReportId, saveReport } from "../../scout-lib/storage.mjs";
import { generateReportId } from "../../scout-lib/crypto.mjs";
import { generateTripReport } from "../../scout-lib/anthropic.mjs";
import { renderReport } from "../../scout-lib/render-report.mjs";
import { enrichWithLibraryLinks } from "../../scout-lib/library-matcher.mjs";
import { sendEmail } from "../../scout-lib/email.mjs";
import { reportReadyEmail } from "../../scout-lib/email-templates.mjs";
import { fetchTidesForTrip, tripDates } from "../../scout-lib/worldtides.mjs";
import { fetchWeatherForTripRange, splitWeatherByDay } from "../../scout-lib/stormglass.mjs";
import { getDestinationMeta } from "../../scout-lib/destinations.mjs";

export default async (req) => {
  // ---- Internal trigger guard ----------
  const expectedSecret = process.env.INTERNAL_TRIGGER_SECRET;
  if (expectedSecret) {
    const provided = req.headers.get("x-internal-trigger");
    if (provided !== expectedSecret) {
      console.warn("[generate] rejected — missing or wrong internal trigger");
      return new Response("Forbidden", { status: 403 });
    }
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const intakeId = payload.intake_id;
  if (!intakeId) {
    return new Response("Missing intake_id", { status: 400 });
  }

  // Fire-and-forget. Netlify tracks the promise until completion (up to 15 min).
  await runGeneration(intakeId);
  return new Response("", { status: 202 });
};

async function runGeneration(intakeId) {
  const t0 = Date.now();
  const stamp = () => ((Date.now() - t0) / 1000).toFixed(1) + "s";
  console.log(`[generate] starting intake=${intakeId}`);

  try {
    // ---- 1. Load intake ----------
    const intake = await getIntake(intakeId);
    if (!intake) {
      console.error(`[generate] intake not found: ${intakeId}`);
      return;
    }
    if (intake.report_id) {
      console.log(`[generate] already generated (${intake.report_id}), skipping`);
      return;
    }
    console.log(
      `[generate] intake loaded @ ${stamp()} — ${typeof intake.destination === "string" ? intake.destination : (intake.destination?.area || intake.destination?.country)} / ${(intake.species || []).join(",")}`
    );

    // ---- 2. Fetch external data (TODO Phase 2) ----------
    // const weather = await fetchWeatherData(intake);
    // const tides = await fetchTideData(intake);
    // const moonSolunar = computeMoonSolunar(intake);

    // ---- 3. Call Claude ----------
    console.log(`[generate] calling Claude @ ${stamp()}`);
    const report = await generateTripReport(intake);
    console.log(`[generate] Claude returned valid JSON @ ${stamp()}`);

    // ---- 4. Post-process for Library cross-links ----------
    const enrichedReport = enrichWithLibraryLinks(report, intake);
    console.log(`[generate] Library matcher run @ ${stamp()}`);

    // ---- 4b. Fetch real tide data (PR #20) ----------
    // Non-fatal — if WorldTides fails or the destination has no lat/lon, we
    // leave context.tides empty and the renderer falls back to Claude's
    // tide_summary prose only. Trips in month/flexible mode return [] from
    // tripDates() — no per-day chart rendered.
    const destMeta = getDestinationMeta(intake.destination);
    const dates = tripDates(intake.timing);
    let tidesData = null;
    try {
      const apiKey = process.env.WORLDTIDES_API_KEY;
      if (destMeta && dates.length > 0 && apiKey) {
        tidesData = await fetchTidesForTrip({
          lat: destMeta.lat,
          lon: destMeta.lon,
          dates,
          apiKey,
        });
        const successCount = tidesData.filter((d) => !d.error).length;
        console.log(`[generate] WorldTides fetched @ ${stamp()} — ${successCount}/${dates.length} days`);
      } else if (!apiKey) {
        console.warn("[generate] WORLDTIDES_API_KEY not set — skipping tide chart");
      }
    } catch (err) {
      console.error(`[generate] WorldTides fetch failed @ ${stamp()}:`, err?.message);
    }

    // ---- 4c. Fetch real weather data (PR #21) ----------
    // One StormGlass call covers the entire trip range. Same graceful-fallback
    // pattern as tides: failure leaves context.weather null and the chart
    // simply doesn't render — Claude's weather_overview prose still appears.
    let weatherData = null;
    try {
      const apiKey = process.env.STORMGLASS_API_KEY;
      if (destMeta && dates.length > 0 && apiKey) {
        const range = await fetchWeatherForTripRange({
          lat: destMeta.lat,
          lon: destMeta.lon,
          tz: destMeta.tz,
          startDate: dates[0],
          endDate: dates[dates.length - 1],
          apiKey,
        });
        weatherData = splitWeatherByDay({ weather: range, dates, tz: destMeta.tz });
        const successCount = weatherData.filter((d) => d.hours && d.hours.length > 0).length;
        console.log(`[generate] StormGlass fetched @ ${stamp()} — ${successCount}/${dates.length} days, cost=${range.meta?.cost} quota=${range.meta?.dailyQuota}`);
      } else if (!apiKey) {
        console.warn("[generate] STORMGLASS_API_KEY not set — skipping weather chart");
      }
    } catch (err) {
      console.error(`[generate] StormGlass fetch failed @ ${stamp()}:`, err?.message);
    }

    // ---- 5. Generate report ID + render HTML ----------
    const reportId = generateReportId();
    const baseUrl = process.env.PUBLIC_BASE_URL || "https://fishfly.ai";
    const reportUrl = `${baseUrl}/r/${reportId}`;

    let html;
    try {
      html = renderReport(enrichedReport, {
        reportId,
        generatedAt: new Date().toISOString(),
        firstName: intake.first_name,
        destination: intake.destination,
        sub_area: intake.sub_area,  // PR #12: optional sub-area for header
        species: intake.species,
        timing: intake.timing,  // PR #9: needed by render-moon-calendar
        tides: tidesData,       // PR #20: real tide data (or null if unavailable)
        weather: weatherData,   // PR #21: real weather data (or null if unavailable)
      });
    } catch (renderErr) {
      const errMsg = `[generate] renderReport CRASHED for intake=${intakeId}: ${renderErr?.message}`;
      console.error(errMsg);
      if (renderErr?.stack) console.error(renderErr.stack);
      await persistErrorToIntake(intakeId, errMsg, renderErr?.stack);
      throw renderErr;
    }
    console.log(`[generate] HTML rendered @ ${stamp()} (${html.length} chars)`);

    // ---- 6. Persist ----------
    await saveReport(reportId, html, {
      intake_id: intakeId,
      destination: intake.destination,
      species: intake.species,
      owner_email: intake.email,
      owner_first_name: intake.first_name,
    });
    await setIntakeReportId(intakeId, reportId);
    console.log(`[generate] persisted reportId=${reportId} @ ${stamp()}`);

    // ---- 7. Send "report ready" email ----------
    const destStr = typeof intake.destination === "string"
      ? intake.destination
      : [intake.destination?.area, intake.destination?.island, intake.destination?.country]
          .filter(Boolean)
          .join(" › ");

    try {
      const { subject, html: emailHtml } = reportReadyEmail({
        firstName: intake.first_name,
        reportUrl,
        destination: destStr,
        species: intake.species,
      });
      await sendEmail({ to: intake.email, subject, html: emailHtml });
      console.log(`[generate] report-ready email sent @ ${stamp()}`);
    } catch (err) {
      console.error("[generate] report-ready email failed:", err);
      // Don't fail the run — report is saved; admin can re-send.
    }

    // NOTE: newsletter opt-in is handled in scout-confirm.mjs (PR #55).
    // Users are added to the Ghost newsletter on confirmation, not here.

    console.log(`[generate] complete intake=${intakeId} report=${reportId} in ${stamp()}`);
  } catch (err) {
    const errMsg = `[generate] FAILED for intake=${intakeId} @ ${stamp()}: ${err?.message || err}`;
    console.error(errMsg);
    if (err?.stack) console.error(err.stack);
    // PR #13 diagnostic: persist error to intake so admin can read it without
    // needing Netlify Functions log UI access.
    await persistErrorToIntake(intakeId, errMsg, err?.stack).catch(() => {});
    // TODO: send "we ran into an issue" email to user OR notify admin
  }
}



/**
 * PR #13: write a diagnostic error onto the intake record so it's visible
 * in the admin endpoint without needing Netlify Functions log access.
 */
async function persistErrorToIntake(intakeId, message, stack) {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("intake");
    const intake = await store.get(intakeId, { type: "json" });
    if (!intake) return;
    intake.error_log = {
      at: new Date().toISOString(),
      message,
      stack: stack || null,
    };
    await store.setJSON(intakeId, intake);
  } catch (_persistErr) {
    // Fall through silently — we already logged the original error above.
  }
}
