'use client';
/* ═══════════════════════════════════════════════════════════════
 * LayerTag.tsx — the deception-layer badge (AR + EN name).
 * Pulls the name from LAYER_DEFENSE_MAP so it stays in sync with the
 * single source of truth. Accent from DESCENT_LAYER_COLORS.
 * ═══════════════════════════════════════════════════════════════ */

import { LAYER_DEFENSE_MAP, DESCENT_LAYER_COLORS } from '../descent-data';

export interface LayerTagProps {
  /** Layer number 1–8. */
  n: number;
  /** Show the Arabic name too (default true). */
  showAr?: boolean;
  /** Compact pill. */
  small?: boolean;
}

export function LayerTag({ n, showAr = true, small }: LayerTagProps) {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === n);
  const color =
    (DESCENT_LAYER_COLORS as Record<number, { accent: string }>)[n]?.accent ?? '#E8E2D6';

  if (!entry) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono"
        style={{ color: '#ef4444', border: '1px solid #ef444455' }}
      >
        ⚠ UNKNOWN LAYER {n}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${small ? 'px-2 py-0.5' : 'px-3 py-1'}`}
      style={{ borderColor: `${color}55`, background: `${color}12`, color }}
      data-layer-tag={n}
    >
      <span
        className={`font-bold tabular-nums ${small ? 'text-[11px]' : 'text-sm'}`}
        style={{ fontFamily: "'Clash Display', var(--font-heading-en), sans-serif" }}
      >
        L{n}
      </span>
      <span className={`uppercase tracking-wider font-mono ${small ? 'text-[9px]' : 'text-[11px]'}`}>
        {entry.layer.en}
      </span>
      {showAr && (
        <span
          className={small ? 'text-[10px]' : 'text-xs'}
          dir="rtl"
          style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: `${color}cc` }}
        >
          {entry.layer.ar}
        </span>
      )}
    </span>
  );
}

export default LayerTag;
