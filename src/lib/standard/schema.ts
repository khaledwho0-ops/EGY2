/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — UNIFORM OUTPUT SCHEMA + CONFIDENCE DERIVATION
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §2 + §6.
 * The whole platform speaks this shape: { verdict, confidence, layer, defense, sources[] }.
 * ═══════════════════════════════════════════════════════════════ */

import { z } from 'zod';
import type { SourceTier } from './sources';
import { tierWeight } from './sources';

export const VerdictEnum = z.enum([
  'DEBUNKED',
  'MISLEADING',
  'PARTIALLY_TRUE',
  'UNVERIFIED',
  'TRUE',
]);
export type Verdict = z.infer<typeof VerdictEnum>;

/** Confidence is DERIVED, never hardcoded (Strategy 3). */
export const ConfidenceLabelEnum = z.enum(['HIGH', 'MEDIUM', 'CONTESTED', 'UNVERIFIED']);
export type ConfidenceLabel = z.infer<typeof ConfidenceLabelEnum>;

export const StandardSourceSchema = z.object({
  title: z.string(),
  url: z.string().optional(),
  tier: z.enum(['S', 'A', 'B', 'C', 'U']),
  snippet: z.string().optional(),
  isIslamicAuthority: z.boolean().optional(),
});
export type StandardSource = z.infer<typeof StandardSourceSchema>;

export const StandardClaimResultSchema = z.object({
  verdict: VerdictEnum,
  confidence: z.object({
    score: z.number().min(0).max(100),
    label: ConfidenceLabelEnum,
  }),
  layer: z.object({
    number: z.number().min(1).max(8),
    name: z.string(),
    nameAr: z.string(),
    defense: z.string(),
  }),
  sources: z.array(StandardSourceSchema),
});
export type StandardClaimResult = z.infer<typeof StandardClaimResultSchema>;

/* ── Confidence derivation (the heart of Strategy 3 + the contract gate) ── */

export interface ConfidenceInputs {
  /** Did the cross-model second opinion AGREE with the primary verdict? */
  agreement: boolean;
  /** Best (highest) tier present in the evidence set. */
  topTier: SourceTier | null;
  /** Number of resolvable sources actually grounding the answer. */
  sourceCount: number;
  /** Count of sentences flagged unsupported by the self-critique pass (Strategy 5). */
  unsupportedCount: number;
  /** The model's own self-reported score 0-100 (signal, not authority). */
  modelScore?: number;
}

/**
 * Maps the four Truth-Stack signals onto a single honest label.
 * Order matters: abstention > contested > critique-penalty > tier/quality.
 */
export function deriveConfidenceLabel(i: ConfidenceInputs): {
  label: ConfidenceLabel;
  score: number;
} {
  // Strategy 2 — no sources ⇒ abstain. Never present as fact.
  if (!i.sourceCount || !i.topTier) {
    return { label: 'UNVERIFIED', score: Math.min(i.modelScore ?? 30, 35) };
  }
  // Strategy 3 — models disagree ⇒ contested, never silently resolved.
  if (!i.agreement) {
    return { label: 'CONTESTED', score: Math.min(i.modelScore ?? 50, 55) };
  }

  const weight = tierWeight(i.topTier); // S=100 … U=20
  let score = Math.round(0.55 * weight + 0.45 * (i.modelScore ?? weight));

  // Strategy 5 — unsupported sentences cap the ceiling.
  if (i.unsupportedCount > 0) {
    score = Math.min(score, 65);
    return { label: 'MEDIUM', score };
  }

  if ((i.topTier === 'S' || i.topTier === 'A') && score >= 75) {
    return { label: 'HIGH', score };
  }
  return { label: 'MEDIUM', score: Math.min(score, 74) };
}
