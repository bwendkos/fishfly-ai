/**
 * Runtime validator for Claude's structured output.
 *
 * Wraps Ajv (a fast JSON Schema validator). The schema and ValidationError
 * shape are stable contracts — change them only intentionally.
 *
 * Usage:
 *   import { validateReport, ValidationError } from "./validate.mjs";
 *   const result = validateReport(claudeJson);
 *   if (!result.valid) {
 *     // result.errors is an array of human-readable messages
 *     // result.correctivePrompt is a corrective prompt suitable for retry
 *   }
 */

import Ajv from "ajv";
import addFormats from "ajv-formats";
import { REPORT_SCHEMA } from "./claude-schema.mjs";

const ajv = new Ajv({
  allErrors: true,        // collect all errors, not just the first
  strict: false,          // schema uses some loose patterns
  removeAdditional: false,
});
addFormats(ajv);

const validate = ajv.compile(REPORT_SCHEMA);

/**
 * Validate Claude's report JSON against the schema.
 * Returns { valid: true } or { valid: false, errors, correctivePrompt }.
 */
export function validateReport(data) {
  const valid = validate(data);
  if (valid) return { valid: true };

  const errors = (validate.errors || []).map(formatError);
  const correctivePrompt = buildCorrectivePrompt(validate.errors || []);

  return {
    valid: false,
    errors,
    correctivePrompt,
  };
}

/**
 * Format a single Ajv error into a human-readable message.
 */
function formatError(err) {
  const path = err.instancePath || "(root)";
  const msg = err.message || "(no message)";
  const params = err.params ? ` (${JSON.stringify(err.params)})` : "";
  return `${path}: ${msg}${params}`;
}

/**
 * Build a corrective prompt the orchestrator can send back to Claude on a
 * retry. Surface the specific missing/invalid fields so the model can fix
 * them rather than regenerating from scratch.
 */
function buildCorrectivePrompt(errors) {
  const groupedByPath = {};
  for (const err of errors) {
    const path = err.instancePath || "(root)";
    if (!groupedByPath[path]) groupedByPath[path] = [];
    groupedByPath[path].push(err.message || JSON.stringify(err.params));
  }

  const lines = Object.entries(groupedByPath).map(
    ([path, msgs]) => `- \`${path}\`: ${msgs.join("; ")}`
  );

  return `Your previous response failed schema validation with the following issues:

${lines.join("\n")}

Please re-submit the report via the \`submit_safety_briefing\` tool, fixing only the issues listed above. Keep all other content identical. Pay particular attention to:
- \`self_critique\` must be an array of EXACTLY THREE strings, each at least 100 characters.
- Every category must have either 3 products (applicable=true) or 0 products with an \`omission_reason\` (applicable=false).
- Every \`confirmed_specs\` field requires both \`value\` and \`source_url\` (source_url can be null with [unverified] in value).`;
}

/**
 * Custom error class for validation failures, used by the function orchestrator.
 */
export class ValidationError extends Error {
  constructor(errors, correctivePrompt) {
    super(`Report validation failed with ${errors.length} error(s)`);
    this.name = "ValidationError";
    this.errors = errors;
    this.correctivePrompt = correctivePrompt;
  }
}
