/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — THE RELEVANCE LOGIC LAYER
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §6 (stage 1.5).
 *
 * Problem this fixes: search engines match KEYWORDS. A result can share words
 * with a claim while being about something else entirely. Retrieval ≠ evidence.
 * This layer judges, from the ABSTRACT (not the title), whether each retrieved
 * source ACTUALLY addresses the claim, what it says about it (stance), and WHY.
 * Only sources that pass become grounding; confidence is computed from those.
 * ═══════════════════════════════════════════════════════════════ */

import { z } from 'zod';

export const StanceEnum = z.enum(['supports', 'refutes', 'neutral', 'unrelated']);
export type Stance = z.infer<typeof StanceEnum>;

export const SourceAdjudicationSchema = z.object({
  adjudications: z.array(
    z.object({
      index: z.number().describe('the 0-based index of the source from the list'),
      relevant: z
        .boolean()
        .describe('true ONLY if the source genuinely addresses THIS specific claim — judged from the abstract/content, NOT the title or shared keywords'),
      relevanceScore: z.number().min(0).max(1).describe('how on-topic the source is for this exact claim'),
      stance: StanceEnum.describe('does the source CONTENT support or refute the claim, is it neutral/background, or unrelated to it'),
      why: z
        .string()
        .describe('one sentence citing what the abstract actually says — WHY it is or is not relevant, and what it implies about the claim'),
    }),
  ),
});
export type SourceAdjudication = z.infer<typeof SourceAdjudicationSchema>['adjudications'][number];

export interface AdjudicableSource {
  title: string;
  snippet?: string | null;
}

export function buildLogicLayerPrompt(claim: string, sources: AdjudicableSource[]): string {
  const list = sources
    .map((s, i) => `[${i}] TITLE: ${s.title}\nABSTRACT/CONTENT: ${s.snippet || '(no abstract retrieved)'}`)
    .join('\n\n');
  return `You are the RELEVANCE LOGIC LAYER for a fact-checking engine. A keyword search returned the sources below for a claim. Because search matches words, a result can SHARE WORDS with the claim yet be about a different topic. Judge each source by its ABSTRACT/CONTENT — the TITLE ALONE IS NOT ENOUGH.

CLAIM: "${claim}"

SOURCES:
${list}

For EACH source return:
- index
- relevant: true ONLY if the abstract genuinely addresses THIS specific claim (not merely overlapping keywords).
- relevanceScore: 0–1.
- stance: supports | refutes | neutral | unrelated (based on what the CONTENT says about the claim).
- why: one sentence citing what the abstract actually says.

If an abstract does not discuss the claim's specific subject, mark relevant=false, stance=unrelated — even when the title contains the same keywords. Be strict: a vaguely-related review is not evidence for a specific claim.`;
}

export type AdjudicatedSource<T> = T & {
  relevant: boolean;
  stance: Stance;
  relevanceScore: number;
  why: string;
};

/** Merge the logic-layer verdict back onto each source (by index). */
export function applyAdjudication<T extends AdjudicableSource>(
  sources: T[],
  adjudications: SourceAdjudication[],
): AdjudicatedSource<T>[] {
  return sources.map((s, i) => {
    const a = adjudications.find((x) => x.index === i);
    return {
      ...s,
      relevant: a?.relevant ?? false,
      stance: (a?.stance ?? 'unrelated') as Stance,
      relevanceScore: a?.relevanceScore ?? 0,
      why: a?.why ?? '',
    };
  });
}

/** Fallback when the logic layer could not run — relevance UNKNOWN, do not fake it. */
export function unadjudicated<T extends AdjudicableSource>(sources: T[]): AdjudicatedSource<T>[] {
  return sources.map((s) => ({
    ...s,
    relevant: true,
    stance: 'neutral' as Stance,
    relevanceScore: 0.5,
    why: 'relevance not adjudicated (logic layer unavailable)',
  }));
}

export const RELEVANCE_THRESHOLD = 0.5;
