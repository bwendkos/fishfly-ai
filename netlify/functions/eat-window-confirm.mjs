/**
 * GET /eat-window/api/confirm?token=<signed_token>
 *
 * Magic-link target. Validates the token, fetches tide + weather data
 * (cached), generates the Bite Window report synchronously, persists it,
 * sends a "report ready" email, and redirects the user to /eat-window/r/<id>.
 *
 * Unlike Trip Scout (which fires a 15-min background function because Claude
 * generation is slow), the Bite Window report is fully algorithmic — sun,
 * moon, solunar are computed locally; tide + weather come from cached APIs
 * (PRs #20, #21). End-to-end generation typically completes in 1-3 sec when
 * cached, ~5-10 sec on cache miss. Fits well within Netlify's sync timeout.
 *
 * Idempotency: re-clicking the magic link redirects to the existing report
 * (we don't regenerate).
 */

import { getIntake, markIntakeConfirmed, setIntakeReportId, saveReport } from "../../bite-lib/storage.mjs";
import { verifyConfirmationToken, generateReportId } from "../../scout-lib/crypto.mjs";
import { fetchTidesForTrip, tripDates } from "../../scout-lib/worldtides.mjs";
import { fetchWeatherForTripRange, splitWeatherByDay } from "../../scout-lib/stormglass.mjs";
import { sendEmail } from "../../scout-lib/email.mjs";
import { reportReadyEmail } from "../../bite-lib/email-templates.mjs";
import { renderBiteReport } from "../../bite-lib/render-bite-report.mjs";
import { addNewsletterSubscriber } from "../../scout-lib/ghost.mjs";

export default async (req) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  // ---- Token verification ----
  const result = verifyConfirmationToken(token);
  if (!result.valid) {
    console.warn("[bite-confirm] token rejected:", result.reason);
    return redirectTo(req, `/eat-window/confirm-failed.html?reason=${encodeURIComponent(result.reason)}`);
  }
  const { intakeId } = result;

  // ---- Look up intake ----
  let intake;
  try {
    intake = await getIntake(intakeId);
  } catch (err) {
    console.error("[bite-confirm] getIntake failed:", err);
    return redirectTo(req, "/eat-window/confirm-failed.html?reason=storage_error");
  }
  if (!intake) {
    return redirectTo(req, "/eat-window/confirm-failed.html?reason=intake_not_found");
  }

  // ---- Idempotency: already generated? ----
  if (intake.report_id) {
    return redirectTo(req, `/eat-window/r/${intake.report_id}`);
  }

  // ---- Mark confirmed ----
  if (!intake.confirmed_at) {
    try {
      await markIntakeConfirmed(intakeId);
      intake.confirmed_at = new Date().toISOString();
    } catch (err) {
      console.error("[bite-confirm] mark confirmed failed:", err);
      // Continue — non-fatal
    }
  }

  // ---- Ghost newsletter opt-in (PR #55) ----
  // The intake stores newsletter_opt_in but the confirm handler previously
  // never acted on it. Fire-and-forget subscription so users are captured
  // for marketing regardless of report generation outcome.
  if (intake.newsletter_opt_in) {
    const locSlug = (intake.location || "unknown")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    addNewsletterSubscriber({
      email: intake.email,
      firstName: intake.first_name,
      labels: [
        "source:eat-window",
        `location:${locSlug}`,
      ],
    })
      .then(() => console.log(`[bite-confirm] ghost subscribe done for ${intake.email}`))
      .catch((err) => console.error("[bite-confirm] ghost subscribe failed:", err));
  }

  // ---- Generate report ----
  const t0 = Date.now();
  const stamp = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;
  console.log(`[bite-confirm] generating intake=${intakeId} location="${intake.location}"`);

  let tides = null, weather = null;
  try {
    const dates = tripDates(intake.timing);
    const lat = intake.location_lat;
    const lon = intake.location_lon;

    if (Number.isFinite(lat) && Number.isFinite(lon) && dates.length > 0) {
      // Fetch tide data per day (cached 30 days per <lat,lon,date>)
      const wtKey = process.env.WORLDTIDES_API_KEY;
      if (wtKey) {
        try {
          tides = await fetchTidesForTrip({ lat, lon, dates, apiKey: wtKey });
          const ok = tides.filter((d) => !d.error).length;
          console.log(`[bite-confirm] WorldTides @ ${stamp()} — ${ok}/${dates.length} days`);
        } catch (err) {
          console.error(`[bite-confirm] WorldTides fetch failed: ${err?.message}`);
        }
      } else {
        console.warn("[bite-confirm] WORLDTIDES_API_KEY missing — skipping tide");
      }

      // Fetch weather (one call covers the whole trip range; cached 12h)
      const sgKey = process.env.STORMGLASS_API_KEY;
      if (sgKey) {
        try {
          const range = await fetchWeatherForTripRange({
            lat, lon, tz: intake.location_tz || "UTC",
            startDate: intake.timing.start_date,
            endDate: intake.timing.end_date,
            apiKey: sgKey,
          });
          weather = splitWeatherByDay({ weather: range, dates, tz: intake.location_tz || "UTC" });
          const ok = weather.filter((d) => d.hours && d.hours.length > 0).length;
          console.log(`[bite-confirm] StormGlass @ ${stamp()} — ${ok}/${dates.length} days`);
        } catch (err) {
          console.error(`[bite-confirm] StormGlass fetch failed: ${err?.message}`);
        }
      } else {
        console.warn("[bite-confirm] STORMGLASS_API_KEY missing — skipping weather");
      }
    } else {
      console.warn(`[bite-confirm] missing lat/lon — generating with sun/moon/solunar only`);
    }
  } catch (err) {
    console.error("[bite-confirm] data fetch crashed:", err);
    // Continue with whatever data we got
  }

  // ---- Render HTML ----
  const reportId = generateReportId();
  let html;
  try {
    const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
    const root = baseUrl.replace(/\/scout\/?$/, "");
    html = renderBiteReport({
      intake,
      tides,
      weather,
      reportId,
      generatedAt: new Date().toISOString(),
      reportUrl: `${root}/eat-window/r/${reportId}`,
    });
    console.log(`[bite-confirm] HTML rendered @ ${stamp()} (${html.length} chars)`);
  } catch (err) {
    console.error("[bite-confirm] renderBiteReport crashed:", err);
    return redirectTo(req, "/eat-window/confirm-failed.html?reason=render_error");
  }

  // ---- Persist ----
  try {
    await saveReport(reportId, html, {
      intake_id: intakeId,
      location: intake.location,
      location_lat: intake.location_lat,
      location_lon: intake.location_lon,
      timing: intake.timing,
      owner_email: intake.email,
      owner_first_name: intake.first_name,
    });
    await setIntakeReportId(intakeId, reportId);
    console.log(`[bite-confirm] persisted reportId=${reportId} @ ${stamp()}`);
  } catch (err) {
    console.error("[bite-confirm] persist failed:", err);
    return redirectTo(req, "/eat-window/confirm-failed.html?reason=persist_error");
  }

  // ---- Send "report ready" email (best-effort) ----
  try {
    const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
    const root = baseUrl.replace(/\/scout\/?$/, "");
    const reportUrl = `${root}/eat-window/r/${reportId}`;
    const dateLabel = intake.timing.days > 1
      ? `${intake.timing.start_date} → ${intake.timing.end_date}`
      : intake.timing.start_date;
    const { subject, html: emailHtml } = reportReadyEmail({
      firstName: intake.first_name,
      reportUrl,
      location: intake.location,
      dateLabel,
    });
    await sendEmail({ to: intake.email, subject, html: emailHtml });
    console.log(`[bite-confirm] report-ready email sent @ ${stamp()}`);
  } catch (err) {
    console.error("[bite-confirm] report-ready email failed:", err);
    // Non-fatal — user is about to see the report inline
  }

  // ---- Redirect to the report ----
  return redirectTo(req, `/eat-window/r/${reportId}`);
};

function redirectTo(req, path) {
  const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;
  const root = baseUrl.replace(/\/scout\/?$/, "");
  return new Response("", {
    status: 302,
    headers: { Location: `${root}${path}` },
  });
}
