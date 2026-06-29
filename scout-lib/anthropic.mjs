/**
 * Anthropic API client wrapper for Trip Scout.
 *
 * Mirrors safety.road.voyage's pattern with Trip Scout-specific configuration:
 *   - Lower MAX_WEB_SEARCHES (5 vs safety's 10) — Trip Scout reports are smaller
 *   - Same model (Sonnet 4.x), streaming, Tool Use forced, schema validation + retry
 *   - System prompt caching (90% cost reduction)
 *
 * Returns the validated JSON from Claude's tool call, ready for the renderer.
 */

import Anthropic from "@anthropic-ai/sdk";
import { TOOL_NAME, TOOL_DESCRIPTION, REPORT_SCHEMA } from "./claude-schema.mjs";
import { buildSystemPrompt, buildUserMessage } from "./claude-prompt.mjs";
import { validateReport, ValidationError } from "./validate.mjs";

const MODEL = "claude-sonnet-4-5"; // TODO: confirm model name at deploy time
const MAX_TOKENS = 16000; // Trip Scout reports are smaller than safety's 32K
const MAX_WEB_SEARCHES = 5; // Trip Scout doesn't need 10; tighter budget

const WEB_SEARCH_TOOL_TYPE = "web_search_20250305";

// Network/server-error retry policy.
//
// Each Claude call is 4-8 minutes; running out of the Netlify 15-min background
// budget is a real risk, so we keep total retries tight. The fast-path goal is
// to absorb transient failures (ECONNRESET, brief 5xx, momentary 429) without
// the user ever seeing a "report failed" email.
//
// Backoff schedule below: attempt 1 fails -> wait 1s -> attempt 2 fails -> wait
// 4s -> attempt 3. Max ~5s of sleep across the whole sequence; the dominant
// cost remains the Claude call itself.
//
// We own retries here rather than letting the SDK's built-in retry handle them
// (the SDK is configured with maxRetries: 0 below) because:
//   - We want explicit logging of each attempt for production debugging
//   - We want to respect 429 Retry-After while still bounding total wait
//   - We want network retries to apply BEFORE the existing schema-validation
//     retry (so a network blip doesn't burn the schema-retry budget)
const MAX_NETWORK_RETRIES = 2;
const BACKOFF_MS = [1000, 4000];

const NODE_NETWORK_ERROR_CODES = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EPIPE",
  "ECONNREFUSED",
  "ECONNABORTED",
  "UND_ERR_SOCKET",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_BODY_TIMEOUT",
]);

export async function generateTripReport(intake) {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: 8 * 60 * 1000, // 8-min client timeout; Trip Scout targets 2-3 min generation
    maxRetries: 0,
  });

  const initialUserMessage = { role: "user", content: buildUserMessage(intake) };

  console.log("[anthropic] first attempt starting…");
  const t0 = Date.now();
  const firstResponse = await callClaudeWithNetworkRetry(client, [initialUserMessage], "initial");
  console.log(`[anthropic] first attempt complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  const firstReport = extractToolUseInput(firstResponse);
  const firstValidation = validateReport(firstReport);

  if (firstValidation.valid) {
    return firstReport;
  }

  console.warn("[anthropic] first response failed validation; retrying with corrective feedback", {
    errors: firstValidation.errors,
  });

  // Build retry messages WITHOUT the prior assistant tool_use response.
  //
  // Anthropic's API requires that an assistant message containing tool_use
  // blocks must be followed by a user message with tool_result blocks
  // referencing those IDs. Sending text-only feedback violates that rule
  // and gets a 400 "tool_use ids were found without tool_result blocks".
  //
  // Simpler + reliable approach: start the retry as a fresh conversation,
  // restating the assignment and noting the validation errors. Claude will
  // re-research and re-write — slightly more cost on failure, zero protocol
  // headaches, no latent bug.
  const retryMessages = [
    initialUserMessage,
    {
      role: "user",
      content:
        "Your previous attempt produced output that failed schema validation. " +
        firstValidation.correctivePrompt +
        `\n\nTry again from scratch. Call submit_trip_report with all required fields populated and correctly typed. Do not ask clarifying questions — use the trip details from the original assignment above.`,
    },
  ];

  console.log("[anthropic] retry attempt starting…");
  const t1 = Date.now();
  const retryResponse = await callClaudeWithNetworkRetry(client, retryMessages, "schema-retry");
  console.log(`[anthropic] retry complete in ${((Date.now() - t1) / 1000).toFixed(1)}s`);

  const retryReport = extractToolUseInput(retryResponse);
  const retryValidation = validateReport(retryReport);

  if (retryValidation.valid) {
    return retryReport;
  }

  throw new ValidationError(retryValidation.errors, retryValidation.correctivePrompt);
}

async function callClaude(client, messages) {
  const messagesArr =
    typeof messages === "string" ? [{ role: "user", content: messages }] : messages;

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,

    // Cached system prompt — 90% cost reduction within 5-min window
    system: [
      {
        type: "text",
        text: buildSystemPrompt(),
        cache_control: { type: "ephemeral" },
      },
    ],

    tools: [
      {
        type: WEB_SEARCH_TOOL_TYPE,
        name: "web_search",
        max_uses: MAX_WEB_SEARCHES,
      },
      {
        name: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        input_schema: REPORT_SCHEMA,
      },
    ],

    tool_choice: { type: "auto" },
    messages: messagesArr,
  });

  let chunkCount = 0;
  stream.on("text", () => chunkCount++);
  stream.on("inputJson", () => chunkCount++);
  const heartbeat = setInterval(() => {
    console.log(`[anthropic] streaming… chunks=${chunkCount}`);
  }, 30_000);

  try {
    const finalMessage = await stream.finalMessage();
    return finalMessage;
  } finally {
    clearInterval(heartbeat);
  }
}

/**
 * Wrap callClaude with retry logic for transient network failures and Anthropic
 * 5xx / 429 responses. Schema-validation errors are NOT retried here — those
 * are handled separately in generateTripReport with corrective re-prompting.
 *
 * Why bother:
 *   Trip Scout generation is 4-8 minutes of model time. A single ECONNRESET
 *   in the middle of streaming (we hit one at 247s during PR #21 verification)
 *   kills the whole run and sends the user a "report failed" email. With this
 *   wrapper, the same transient failure becomes a sub-second hiccup that the
 *   user never sees.
 *
 * What we retry on:
 *   - Anthropic.APIConnectionError / APIConnectionTimeoutError (SDK network)
 *   - Anthropic.RateLimitError (429) — respects Retry-After header
 *   - Anthropic.InternalServerError (500) and any 5xx by status code
 *   - Raw Node fetch / undici errors (ECONNRESET, ETIMEDOUT, etc.) that may
 *     leak past the SDK's error mapping
 *
 * What we do NOT retry on:
 *   - 4xx other than 429 (bad request, auth, content policy — retrying won't
 *     fix any of these)
 *   - ValidationError (caller's responsibility, separate retry loop)
 *   - Any other unexpected error
 */
async function callClaudeWithNetworkRetry(client, messages, label) {
  for (let attempt = 1; attempt <= MAX_NETWORK_RETRIES + 1; attempt++) {
    try {
      return await callClaude(client, messages);
    } catch (err) {
      const retryable = isRetryableError(err);
      const errName = err?.constructor?.name || "Error";
      const status = err?.status ?? err?.response?.status ?? "—";
      const code = err?.cause?.code || err?.code || "—";
      const msg = (err?.message || "").slice(0, 200);
      console.warn(
        `[anthropic] ${label} attempt ${attempt} failed: ${errName} status=${status} code=${code} retryable=${retryable}  ${msg}`
      );

      if (!retryable || attempt > MAX_NETWORK_RETRIES) {
        throw err;
      }

      // Respect Retry-After when Anthropic sends one (429 rate-limit case).
      // Bound it by our backoff schedule so a hostile/buggy header can't pin
      // us for minutes inside a function that has only ~15 to play with.
      let delayMs = BACKOFF_MS[attempt - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
      const retryAfter = readRetryAfter(err);
      if (Number.isFinite(retryAfter) && retryAfter > 0) {
        delayMs = Math.min(Math.max(delayMs, retryAfter * 1000), 10_000);
      }

      console.log(`[anthropic] ${label} sleeping ${delayMs}ms before retry ${attempt + 1}…`);
      await sleep(delayMs);
    }
  }
  // Unreachable — the loop either returns successfully or throws above.
  throw new Error(`[anthropic] ${label} exhausted retries without throwing`);
}

function isRetryableError(err) {
  if (!err) return false;

  // SDK-typed errors (when the SDK is imported, instanceof checks are reliable)
  if (Anthropic?.APIConnectionError && err instanceof Anthropic.APIConnectionError) return true;
  if (Anthropic?.APIConnectionTimeoutError && err instanceof Anthropic.APIConnectionTimeoutError) return true;
  if (Anthropic?.RateLimitError && err instanceof Anthropic.RateLimitError) return true;
  if (Anthropic?.InternalServerError && err instanceof Anthropic.InternalServerError) return true;

  // Status-based fallback for any APIError variant the SDK exposes
  const status = err.status ?? err.response?.status;
  if (Number.isFinite(status)) {
    if (status === 429) return true;
    if (status >= 500 && status < 600) return true;
    return false; // Other 4xx — not retryable
  }

  // Raw Node / undici network errors that didn't get wrapped by the SDK
  const code = err.cause?.code || err.code;
  if (code && NODE_NETWORK_ERROR_CODES.has(code)) return true;

  // AbortError on stream — usually means the connection dropped
  if (err.name === "AbortError") return true;

  return false;
}

function readRetryAfter(err) {
  // SDK error has .headers (already a plain object); fetch-style errors have .response.headers
  const fromObj = err?.headers?.["retry-after"] || err?.headers?.["Retry-After"];
  if (fromObj) return parseFloat(fromObj);
  const fromFetch = err?.response?.headers?.get?.("retry-after");
  if (fromFetch) return parseFloat(fromFetch);
  return null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractToolUseInput(response) {
  const toolUseBlock = response.content.find(
    (block) => block.type === "tool_use" && block.name === TOOL_NAME
  );

  if (!toolUseBlock) {
    const stopReason = response.stop_reason;
    const textBlock = response.content.find((b) => b.type === "text");
    const preview = textBlock?.text?.slice(0, 500) || "(no text content)";
    throw new Error(
      `Claude did not call ${TOOL_NAME}. stop_reason=${stopReason}, text preview: ${preview}`
    );
  }

  return toolUseBlock.input;
}
