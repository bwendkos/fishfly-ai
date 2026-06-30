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
import { REPORT_SCHEMA, TOOL_NAME } from "./claude-schema.mjs";

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

Please re-submit the report via the \`${TOOL_NAME}\` tool, fixing only the issues listed above. Keep all other content identical. Specific reminders for the Trip Scout schema:
- Every required field in every section must be populated with real content (no placeholders, no empty strings, no "TBD").
- Every \`species_profiles\` entry must include all subfields: \`the_fish\`, \`gear\`, \`top_flies\` (array), \`presentation\`, \`conservation\`.
- \`viability\` values (in \`trip_overview.species_reality_check\`) must be exactly one of: \`prime\`, \`solid\`, \`marginal\`, \`non_viable\`.
- \`best_dates_recommendation\` (when present) requires \`window_label\`, \`why_this_window\`, \`per_species_benefit\`.
- Field types matter: arrays must be arrays, strings must be strings, no nesting mistakes.`;
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
