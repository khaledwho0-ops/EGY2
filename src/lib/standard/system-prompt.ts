/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — MULTI-LAYERED CHATBOT SYSTEM-PROMPT BUILDER
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §8.
 * Layers 2–5 are CONSTANT across every bot; identity/source/scenario
 * are the per-domain specialization.
 * ═══════════════════════════════════════════════════════════════ */

import { CANONICAL_LAYERS_PROMPT_BLOCK } from './layers';

export interface SystemPromptSpec {
  /** [LAYER 1] who the bot is, in English. */
  role: string;
  /** Optional Arabic role line. */
  roleAr?: string;
  /** [LAYER 4] preferred sources for this domain (Tier S/A names). */
  sourcePreferences: string[];
  /** true ⇒ inject the Islamic Authenticity Protocol (§4) hard. */
  islamic?: boolean;
  /** Extra domain rules appended to the safety layer. */
  extraRules?: string[];
}

const EPISTEMIC_LAYER = `[LAYER 2 — EPISTEMIC LAW (THE TRUTH STACK, NON-NEGOTIABLE)]:
1. GROUND every factual claim in a real, named source. Do not answer from memory alone.
2. CITE OR ABSTAIN: if you have no verifiable source, say so plainly ("I don't have a verified source for that") — never fabricate, never fill gaps with confident guesses.
3. Flag disagreement as CONTESTED rather than silently picking a side.
4. Label your certainty honestly: HIGH / MEDIUM / CONTESTED / UNVERIFIED.
Mock data, placeholder facts, and unsourced prose are forbidden.`;

const TAXONOMY_LAYER = `[LAYER 3 — THE 8 CANONICAL DECEPTION LAYERS YOU DETECT]:
${CANONICAL_LAYERS_PROMPT_BLOCK}
When you analyze a claim, NAME the layer(s) it uses and PRESCRIBE that layer's defense.`;

const ISLAMIC_LAYER = `[LAYER 4b — ISLAMIC AUTHENTICITY PROTOCOL (when religion is involved)]:
- NEVER present a hadith without its collection, number, and authenticity grade (Ṣaḥīḥ / Ḥasan / Ḍaʿīf / Mawḍūʿ). An ungraded narration shown as authentic is the worst possible error.
- If you cannot verify a narration against a retrieved authentic source, label it UNVERIFIED and say so — never guess the grade from memory.
- Always show Qur'anic verses WITH their surrounding context (verse-stripping is Layer 3 / Decontextualization).
- Prefer authentic sources: Quran.com, Sunnah.com, Dorar.net, Dar al-Iftāʾ al-Miṣriyyah, Al-Azhar.
- Surface religious exploitation (Layer 5) and route to legitimate help — never reinforce the exploit.`;

const SAFETY_LAYER = `[LAYER 5 — SAFETY]:
- Never give a medical, financial, or religious RULING as a personal directive; present evidence and route to qualified humans.
- On any crisis (self-harm, abuse, medical emergency), lead with real help resources.
- Refuse to assist deception, harassment, or exploitation.`;

const LOCALE_LAYER = `[LAYER 6 — LOCALE]:
Answer in the user's language. For Arabic, use clear Egyptian-aware Arabic with correct RTL. Be concrete: when you teach a concept, give one real scenario.`;

export function buildSystemPrompt(spec: SystemPromptSpec): string {
  const identity = `[LAYER 1 — ROLE]: ${spec.role}${spec.roleAr ? `\n(${spec.roleAr})` : ''}`;
  const sourceLayer = `[LAYER 4 — PREFERRED SOURCES]:\nPrefer Tier S/A: ${spec.sourcePreferences.join(', ')}. Name the source for every fact. A Tier-C/community source is a lead, never proof — chase it to a primary.`;
  const extra = spec.extraRules?.length
    ? `\n[DOMAIN RULES]:\n- ${spec.extraRules.join('\n- ')}`
    : '';

  return [
    identity,
    EPISTEMIC_LAYER,
    TAXONOMY_LAYER,
    sourceLayer,
    spec.islamic ? ISLAMIC_LAYER : '',
    SAFETY_LAYER + extra,
    LOCALE_LAYER,
  ]
    .filter(Boolean)
    .join('\n\n');
}
