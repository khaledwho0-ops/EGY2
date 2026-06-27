'use client';
/* ═══════════════════════════════════════════════════════════════
 * DefenseChip.tsx — the climb-side counter to a deception layer.
 * Shows the named cognition technique (EN + AR) for layer `n`, with
 * its scholarly anchor on hover/title. Pulled from LAYER_DEFENSE_MAP.
 * ═══════════════════════════════════════════════════════════════ */

import { LAYER_DEFENSE_MAP, DESCENT_LAYER_COLORS } from '../descent-data';

export interface DefenseChipProps {
  /** Layer number 1–8 whose defense to render. */
  n: number;
  /** Show the full cognition sentence, not just the short technique label. */
  full?: boolean;
}

export function DefenseChip({ n, full }: DefenseChipProps) {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === n);
  // Climb is cold/emerald regardless of the descent accent.
  const color = DESCENT_LAYER_COLORS.climb.accent;

  if (!entry) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono"
        style={{ color: '#ef4444', border: '1px solid #ef444455' }}
      >
        ⚠ NO DEFENSE FOR LAYER {n}
      </span>
    );
  }

  return (
    <span
      className="inline-flex flex-col gap-1 rounded-xl border px-3 py-2"
      style={{ borderColor: `${color}40`, background: `${color}10` }}
      data-defense-chip={n}
      title={entry.cognitionSource}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
          style={{ color, background: `${color}1a` }}
        >
          +{n}
        </span>
        <span className="text-sm font-semibold" style={{ color }}>
          {entry.defense.en}
        </span>
        <span className="text-xs" dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: `${color}cc` }}>
          {entry.defense.ar}
        </span>
      </span>
      {full && (
        <>
          <span className="text-xs text-white/60 leading-relaxed">{entry.cognition.en}</span>
          <span
            className="text-xs text-white/40 leading-relaxed"
            dir="rtl"
            style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
          >
            {entry.cognition.ar}
          </span>
          <span className="text-[9px] text-white/30 font-mono mt-0.5">{entry.cognitionSource}</span>
        </>
      )}
    </span>
  );
}

export default DefenseChip;
