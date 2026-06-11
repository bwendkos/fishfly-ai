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

export async function generateTripReport(intake) {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: 8 * 60 * 1000, // 8-min client timeout; Trip Scout targets 2-3 min generation
    maxRetries: 0,
  });

  const initialUserMessage = { role: "user", content: buildUserMessage(intake) };

  console.log("[anthropic] first attempt starting…");
  const t0 = Date.now();
  const firstResponse = await callClaude(client, [initialUserMessage]);
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
  const retryResponse = await callClaude(client, retryMessages);
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
