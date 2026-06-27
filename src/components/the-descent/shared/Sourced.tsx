'use client';
/* ═══════════════════════════════════════════════════════════════
 * Sourced.tsx — THE ONE LAW, enforced in the type system.
 *
 * Every numeric/factual claim on /the-descent renders through this.
 * The props TYPE REQUIRES non-empty `source` + `tier`. If either is
 * empty at runtime ⇒ visible red [⚠ UNVERIFIED] (fail loud, never a
 * fabricated fill). `contested` ⇒ violet [CONTESTED]. `corpusCount`
 * ⇒ a [corpus count] label instead of a primary tier badge.
 * ═══════════════════════════════════════════════════════════════ */

import type { Tier } from '../descent-data';

/** Sourced requires a non-empty source string and a tier — by type. */
export interface SourcedProps {
  /** The display value, EXACTLY as cited (e.g. "14.5%"). */
  value: string;
  /** Tier S/A/B/C — required. */
  tier: Tier;
  /** Resolvable source string — required, must be non-empty. */
  source: string;
  /** Optional EN label shown beside the value. */
  labelEn?: string;
  /** Optional AR label shown beside the value (RTL). */
  labelAr?: string;
  /** Disputed across outlets ⇒ violet [CONTESTED]. */
  contested?: boolean;
  /** Corpus-only tally ⇒ [corpus count] label, no primary tier claim. */
  corpusCount?: boolean;
  /** Accent color for the value text. */
  accent?: string;
  /** Render compact (inline) vs block. */
  inline?: boolean;
}

const CONTESTED_VIOLET = '#8B5CF6';
const UNVERIFIED_RED = '#ef4444';

export function Sourced({
  value,
  tier,
  source,
  labelEn,
  labelAr,
  contested,
  corpusCount,
  accent = '#E8E2D6',
  inline,
}: SourcedProps) {
  // Fail loud: the type requires these, but guard at runtime too.
  const unverified = !source || !source.trim() || !tier;

  const badge = unverified
    ? { text: '⚠ UNVERIFIED', color: UNVERIFIED_RED }
    : contested
      ? { text: 'CONTESTED', color: CONTESTED_VIOLET }
      : corpusCount
        ? { text: 'corpus count', color: '#94a3b8' }
        : { text: `Tier ${tier}`, color: accent };

  const Wrapper = inline ? 'span' : 'div';

  return (
    <Wrapper
      className={inline ? 'inline-flex items-baseline gap-1.5' : 'flex flex-col gap-1'}
      data-sourced
      data-tier={tier}
      data-unverified={unverified || undefined}
      data-contested={contested || undefined}
    >
      <span className={inline ? 'inline-flex items-baseline gap-2' : 'flex items-baseline gap-2 flex-wrap'}>
        <span
          className="font-bold tabular-nums leading-none"
          style={{
            color: unverified ? UNVERIFIED_RED : accent,
            fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
            textShadow: unverified ? 'none' : `0 0 18px ${accent}55`,
            fontSize: inline ? '1em' : 'clamp(1.6rem,4vw,2.8rem)',
          }}
        >
          {value}
        </span>
        {labelEn && (
          <span className="text-[11px] text-white/55 leading-tight max-w-[28ch]">{labelEn}</span>
        )}
      </span>

      {labelAr && (
        <span
          className="text-[11px] text-white/40 leading-tight max-w-[30ch]"
          dir="rtl"
          style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
        >
          {labelAr}
        </span>
      )}

      <span className="flex items-center gap-1.5 mt-0.5">
        <span
          className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm border"
          style={{
            color: badge.color,
            borderColor: `${badge.color}55`,
            background: `${badge.color}12`,
          }}
        >
          {badge.text}
        </span>
        {!unverified && (
          <span className="text-[9px] text-white/30 font-mono truncate max-w-[40ch]" title={source}>
            {source}
          </span>
        )}
      </span>
    </Wrapper>
  );
}

export default Sourced;
