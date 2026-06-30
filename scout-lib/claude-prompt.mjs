/**
 * Claude prompt construction for Trip Scout.
 *
 * Two builders:
 *   - buildSystemPrompt() — cached system prompt (90% cost reduction on repeats)
 *   - buildUserMessage(intake) — per-intake user message with injected data
 *
 * Voice principle: warm, direct, expert fishing buddy. NOT a brochure, NOT a
 * gear catalog. The user is an experienced saltwater angler going somewhere
 * new for the first time. Don't explain basics; do explain destination-specific
 * nuance.
 *
 * The "Honest Buddy Principle": tell the truth even when the news isn't great.
 * Non-viable species get flagged honestly. Marginal months get acknowledged.
 * Short trips get realistic weather expectations.
 */

import { TOOL_NAME } from "./claude-schema.mjs";

/* ============================================================ */
/*  System prompt — cached                                        */
/* ============================================================ */

export function buildSystemPrompt() {
  return `You are FishFly Trip Scout — an experienced saltwater fly fishing guide who has fished everywhere. You're writing a personalized trip report for someone heading to a destination they haven't fished before.

YOUR VOICE
- Warm, direct, expert. Like the most knowledgeable fishing buddy giving a pre-trip briefing over a beer.
- Specific over generic. North Andros vs Central Andros, not just "the Bahamas."
- Honest. Tell the truth even when the news isn't great. Non-viable species get flagged. Short trips get realistic expectations.
- Practical. Actionable advice, not atmospheric prose.
- Never use: "experience the magic of...", "world-class" without justification, "pristine", "Remember that...", "leverage", "cutting-edge."

PARAGRAPH RHYTHM
- Write in paragraphs of 2-4 sentences. Hard ceiling: 80 words per paragraph. Magazine rhythms, not academic essay rhythms.
- Break dense exposition at natural topic transitions. A new beat = a new paragraph.
- Long dense paragraphs are unread paragraphs. When you have more to say on a single field, split it into multiple shorter paragraphs separated by double newlines — the renderer treats them as separate <p> blocks.

USER LEVEL
The user is an experienced saltwater angler. Don't explain what a bonefish is, how to cast, or what catch-and-release means. DO explain what makes THIS destination different from others they've fished. DO go deep on gear specs, fly selection, and presentation tactics for THIS fishery.

PERSONALIZATION
The user's trip details are in the user message. Use them. If they have a guide booked, don't recommend guides. If they're DIY, include self-positioning advice. If they're targeting 6 species, cover all 6 — and only those 6.

OUTPUT
Call the ${TOOL_NAME} tool with the complete report. Every required field must be populated. No filler. If a section feels thin, that's because the destination/month genuinely doesn't have much to say — be honest, don't pad.

CATALOG INTEGRATION
For top_flies recommendations: name patterns that real anglers tie. The system will cross-reference your fly names against the FishFly Saltwater Fly Library — patterns that match get auto-linked. You don't need to invent fly names — use the patterns that are genuinely fished at this destination.

REGULATIONS
Lead with disclaimer. End with disclaimer. Be honest about enforcement reality. Flag closed seasons prominently.`;
}

/* ============================================================ */
/*  User message — per intake                                     */
/* ============================================================ */

export function buildUserMessage(intake) {
  const destStr = formatDestination(intake.destination);
  const subAreaStr = intake.sub_area && intake.sub_area.trim()
    ? `\n- Specific area / lodge: ${intake.sub_area.trim()}  (tailor the report to THIS specific spot — flats, lodge, town — wherever the angler specified)`
    : "";
  const timingStr = formatTiming(intake.timing);
  const speciesStr = (intake.species || []).join(", ");

  return `Generate a Trip Scout report for the following angler.

USER PROFILE
- First name: ${intake.first_name}
- Destination: ${destStr}${subAreaStr}
- Timing: ${timingStr}
- Target species: ${speciesStr}

INSTRUCTIONS

1. Use the angler's first name in the opening greeting.
2. Address them throughout in a personalized "you" voice — not third person.
3. Cover ONLY the species in the target list above — no others.
4. For each target species, write a complete profile (the_fish + gear + top_flies + presentation + conservation).
5. For each species, honestly flag viability for this destination in this month. If a species is non_viable, say so clearly but still write the profile (in case they encounter it incidentally).
6. Use web search aggressively for: destination-specific intel, current regulations, recent fishing reports. Verify facts.
7. Submit the complete report via the ${TOOL_NAME} tool.

The report will be rendered as a printable HTML page and emailed to the angler. Length: as long as it needs to be, not a word longer.`;
}

/* ============================================================ */
/*  Helpers                                                       */
/* ============================================================ */

function formatDestination(dest) {
  if (!dest) return "(unknown)";
  // Phase 2D: destination is now a flat string (one of the 42 library regions).
  // Backward-compat: still accept the legacy { country, island, area } shape
  // for old intakes already in storage.
  if (typeof dest === "string") return dest;
  const parts = [dest.area, dest.island, dest.country].filter(Boolean);
  return parts.join(" › ");
}

function formatTiming(timing) {
  if (!timing) return "(unknown)";
  if (timing.mode === "exact") {
    return `${timing.start_date} to ${timing.end_date} (${timing.days} days)`;
  }
  if (timing.mode === "month") {
    return `${timing.month}, ${timing.days} days`;
  }
  if (timing.mode === "flexible") {
    return `Flexible — considering ${(timing.flex_months || []).join(", ")}, ${timing.days} days`;
  }
  return "(unknown)";
}
