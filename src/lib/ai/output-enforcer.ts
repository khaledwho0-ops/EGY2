/* ═══════════════════════════════════════════════════════════════
 * EAL OUTPUT ENFORCER — THE ONE LAW, APPLIED TO AI PROSE
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md.
 *
 * The <Sourced> component enforces the One Law on STATIC page data:
 * no claim renders without a real, resolvable, tiered source; an empty
 * source fails loud as [⚠ UNVERIFIED].
 *
 * This module extends the SAME law to AI-GENERATED output. Any verdict,
 * answer, or summary an LLM produces must be backed by ≥1 admissible
 * source (Tier S–C via the whitelist). If not, the output is marked
 * UNVERIFIED and MUST be rendered as such — never as fact.
 *
 * Pure + dependency-light: reuses classifyTier() from lib/standard/sources.
 * No network, no API key — safe to call on every AI response.
 * ═══════════════════════════════════════════════════════════════ */

import { z } from 'zod';
import { classifyTier, tierWeight, type SourceTier } from '@/lib/standard/sources';

/** A source the model offers as backing for its answer. */
export interface CandidateSource {
  title?: string;
  url: string;
  /** optional snippet/quote the model claims supports the text */
  evidence?: string;
  /** pre-assigned tier (e.g. from the evidence aggregator's trustBand). When
   *  present it is TRUSTED as-is; otherwise the URL is classified via the
   *  whitelist. Lets vetted academic results count without their leaf-URL
   *  domain (a journal, doi.org, a repo) being on the whitelist. */
  tier?: SourceTier;
}

/** A candidate after tier classification. */
export interface ClassifiedSource {
  title: string;
  url: string;
  tier: SourceTier;
  tierLabel: string;
  evidence?: string;
}

export type EnforcementStatus = 'verified' | 'unverified';

export interface EnforcementResult {
  status: EnforcementStatus;
  /** admissible sources (Tier S–C), strongest first */
  sources: ClassifiedSource[];
  /** sources rejected as Tier U / malformed */
  rejected: ClassifiedSource[];
  /** strongest tier present, or 'U' if none */
  tierFloor: SourceTier;
  /** human reason when unverified */
  reason?: string;
}

const UNVERIFIED_REASON =
  'No admissible source (Tier S–C). Fails the One Law — render as [⚠ UNVERIFIED], never as fact.';

/** Is a tier admissible (real, resolvable, whitelisted)? Tier U is not. */
export function isAdmissible(tier: SourceTier): boolean {
  return tier !== 'U';
}

/**
 * Apply the One Law to the set of candidate sources behind an AI output.
 * Verified iff ≥1 source classifies to Tier S–C. Pure; never throws.
 */
export function enforceOneLaw(candidates: CandidateSource[] | undefined): EnforcementResult {
  const list = Array.isArray(candidates) ? candidates : [];

  const classified: ClassifiedSource[] = list
    .filter((c) => c && typeof c.url === 'string' && c.url.trim().length > 0)
    .map((c) => {
      // Trust a pre-assigned tier (vetted academic source from the aggregator);
      // otherwise classify the leaf URL against the whitelist.
      const info = c.tier ? { tier: c.tier, label: `Tier ${c.tier}` } : classifyTier(c.url);
      return {
        title: (c.title && c.title.trim()) || c.url,
        url: c.url,
        tier: info.tier,
        tierLabel: info.label,
        evidence: c.evidence,
      };
    });

  const sources = classified
    .filter((s) => isAdmissible(s.tier))
    .sort((a, b) => tierWeight(b.tier) - tierWeight(a.tier));
  const rejected = classified.filter((s) => !isAdmissible(s.tier));

  const tierFloor: SourceTier = sources.length ? sources[0].tier : 'U';
  const status: EnforcementStatus = sources.length > 0 ? 'verified' : 'unverified';

  return {
    status,
    sources,
    rejected,
    tierFloor,
    reason: status === 'unverified' ? UNVERIFIED_REASON : undefined,
  };
}

/**
 * Zod schema a route can hand to structured-output generation to FORCE the
 * model to return sources. An empty sources[] fails the parse outright.
 */
export const SourcedAIOutputSchema = z.object({
  text: z.string().min(1),
  sources: z
    .array(
      z.object({
        title: z.string().optional(),
        url: z.string().min(1),
        evidence: z.string().optional(),
      }),
    )
    .min(1, 'At least one source is required (the One Law).'),
  confidence: z.number().min(0).max(1).optional(),
});
export type SourcedAIOutput = z.infer<typeof SourcedAIOutputSchema>;

/**
 * Validate a full AI output object AND enforce the One Law on its sources in
 * one call. Returns a discriminated result the route/UI can trust: either a
 * verified payload, or an explicit unverified verdict (fail loud).
 */
export function enforceSourcedOutput(
  raw: unknown,
):
  | { ok: true; output: SourcedAIOutput; enforcement: EnforcementResult }
  | { ok: false; status: 'unverified'; reason: string; enforcement: EnforcementResult } {
  const parsed = SourcedAIOutputSchema.safeParse(raw);
  if (!parsed.success) {
    // Malformed / no well-formed sources at all → fail loud.
    return {
      ok: false,
      status: 'unverified',
      reason: 'AI output missing required text/sources shape. ' + UNVERIFIED_REASON,
      enforcement: enforceOneLaw([]),
    };
  }
  const enforcement = enforceOneLaw(parsed.data.sources);
  if (enforcement.status === 'unverified') {
    return { ok: false, status: 'unverified', reason: enforcement.reason!, enforcement };
  }
  return { ok: true, output: parsed.data, enforcement };
}

/**
 * Apply the One Law to a model-produced verdict object. If an admissible
 * source backs it, the verdict passes through untouched. If not (or if the
 * model produced nothing), it is downgraded to UNVERIFIED with capped
 * confidence and a reason — so a route can never present an unsourced claim
 * as fact. Pure + testable; the wiring point for /api/ai/* verdicts.
 */
export function applyVerdictEnforcement(
  verdict: Record<string, unknown> | null | undefined,
  enforcement: EnforcementResult,
): Record<string, unknown> {
  if (verdict && enforcement.status === 'verified') return verdict;
  return {
    ...(verdict ?? {}),
    verdict: 'UNVERIFIED',
    confidence: Math.min(Number((verdict as { confidence?: unknown } | null)?.confidence) || 0, 0.2),
    unverifiedReason: enforcement.reason ?? 'No admissible source backed this claim.',
  };
}
