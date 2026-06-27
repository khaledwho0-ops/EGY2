'use client';
/* ═══════════════════════════════════════════════════════════════
 * LayerLegend.tsx — §G6 the tiny persistent layer key.
 *
 * Maps each of the 8 deception layers to its FIXED color + bilingual
 * name, so the reader can always decode the per-layer accent system
 * (L1 red … L8 pale). Meant to live in / beside the DepthRail, or as a
 * collapsed strip in a corner. Highlights the active layer.
 *
 * Sources of truth:
 *   • colors  → LAYER_ACCENTS  (descent-theme.ts)
 *   • names   → LAYER_DEFENSE_MAP[].layer  (descent-data.ts)
 * RTL-aware, pure presentational, no motion.
 * ═══════════════════════════════════════════════════════════════ */

import { LAYER_ACCENTS, layerAccent, type LayerId } from '../descent-theme';
import { LAYER_DEFENSE_MAP } from '../descent-data';
import { useRTL } from '@/components/shared/rtl-provider';

const LAYER_IDS: LayerId[] = [1, 2, 3, 4, 5, 6, 7, 8];

/** name lookup: layer n → bilingual name from the defense map. */
function layerName(n: number): { en: string; ar: string } {
  const row = LAYER_DEFENSE_MAP.find((r) => r.n === n);
  return row?.layer ?? { en: `Layer ${n}`, ar: `الطبقة ${n}` };
}

export interface LayerLegendProps {
  /** The currently-active layer (1..8) to highlight, if any. */
  active?: number | null;
  /** Render only swatch + number (no names) — for the narrow rail. */
  compact?: boolean;
  className?: string;
}

/** The persistent 8-layer color key. */
export function LayerLegend({
  active = null,
  compact = false,
  className = '',
}: LayerLegendProps) {
  const { isRTL } = useRTL();
  return (
    <div
      className={`dw-layer-legend ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      role="list"
      aria-label={isRTL ? 'مفتاح طبقات الخداع الثماني' : 'Eight deception-layer key'}
    >
      {LAYER_IDS.map((n) => {
        const acc = layerAccent(n);
        const name = layerName(n);
        const isActive = active === n;
        return (
          <div
            className="dw-layer-legend__row"
            role="listitem"
            data-active={isActive ? 'true' : 'false'}
            key={n}
            title={`${n}. ${isRTL ? name.ar : name.en}`}
          >
            <span
              className="dw-layer-legend__swatch"
              style={{ background: acc.hex, color: acc.hex }}
              aria-hidden
            />
            <span className="dw-layer-legend__num">−{n}</span>
            {!compact && (
              <span
                className={`dw-layer-legend__name ${isRTL ? 'dw-ar' : ''}`}
                style={
                  isRTL ? { fontFamily: 'var(--font-heading-ar), sans-serif' } : undefined
                }
              >
                {isRTL ? name.ar : name.en}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Export the id list + accents for consumers that want raw data. */
export { LAYER_ACCENTS, LAYER_IDS };

export default LayerLegend;
