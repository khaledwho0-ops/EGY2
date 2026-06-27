'use client';
/* ═══════════════════════════════════════════════════════════════
 * TierLegend.tsx — §G5 the reusable "evidence key".
 *
 * The page shows Tier S/A/B/C, CONTESTED and UNVERIFIED badges with
 * no explanation. This module supplies:
 *
 *   • <TierBadge tier="A" />  — a small but legible (≥11px), color-
 *     coded badge with a native-title tooltip carrying the one-line
 *     meaning, and an optional `#dw-tier-legend` anchor link so a
 *     click jumps to the full key.
 *   • <TierLegend />          — the compact key: every tier + its
 *     one-line bilingual meaning. Drop it once per page (e.g. in a
 *     footer or a disclosure) and give it id="dw-tier-legend".
 *   • <TierKeyToggle />       — a tiny fixed affordance that scrolls
 *     to / reveals the legend.
 *
 * Single source of truth: TIER_META / TIER_ORDER in descent-theme.ts.
 * Pure presentational — no data fetch, RTL-aware, reduced-motion safe.
 * ═══════════════════════════════════════════════════════════════ */

import {
  TIER_META,
  TIER_ORDER,
  tierMeta,
  type TierKey,
} from '../descent-theme';
import { useRTL } from '@/components/shared/rtl-provider';

/** Map the data's `Tier | '' | contested` shape → a TierKey. */
export function resolveTierKey(opts: {
  tier?: string;
  contested?: boolean;
  source?: string;
}): TierKey {
  if (opts.contested) return 'CONTESTED';
  if (!opts.source || !opts.tier) return 'UNVERIFIED';
  const t = opts.tier.toUpperCase();
  if (t === 'S' || t === 'A' || t === 'B' || t === 'C') return t as TierKey;
  return 'UNVERIFIED';
}

export interface TierBadgeProps {
  tier: TierKey;
  /** Link to the legend anchor (default '#dw-tier-legend'). Pass null to disable. */
  href?: string | null;
  /** Extra classes. */
  className?: string;
}

/** A single color-coded, tooltipped tier badge that links to the key. */
export function TierBadge({
  tier,
  href = '#dw-tier-legend',
  className = '',
}: TierBadgeProps) {
  const { isRTL } = useRTL();
  const meta = tierMeta(tier);
  const title = isRTL ? meta.meaning.ar : meta.meaning.en;
  const label = tier === 'CONTESTED' || tier === 'UNVERIFIED' ? tier : `Tier ${tier}`;

  const style = {
    ['--_tier' as string]: meta.hex,
    ['--_tier-rgb' as string]: meta.rgb,
  } as React.CSSProperties;

  const inner = (
    <>
      <span className="dw-tier-badge__dot" aria-hidden />
      {label}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`dw-tier-badge ${className}`}
        style={style}
        title={title}
        aria-label={`${label} — ${title}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <span
      className={`dw-tier-badge ${className}`}
      style={style}
      title={title}
      aria-label={`${label} — ${title}`}
    >
      {inner}
    </span>
  );
}

export interface TierLegendProps {
  /** DOM id for badge links to target. Default 'dw-tier-legend'. */
  id?: string;
  className?: string;
}

/** The compact evidence key — every tier + one-line bilingual meaning. */
export function TierLegend({ id = 'dw-tier-legend', className = '' }: TierLegendProps) {
  const { isRTL } = useRTL();
  return (
    <div
      id={id}
      className={`dw-tier-legend ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      role="list"
      aria-label={isRTL ? 'مفتاح فئات الأدلة' : 'Evidence tier key'}
    >
      {TIER_ORDER.map((key) => {
        const meta = TIER_META[key];
        return (
          <div className="dw-tier-legend__row" role="listitem" key={key}>
            <TierBadge tier={key} href={null} />
            <span
              className={`dw-tier-legend__meaning ${isRTL ? 'dw-ar--body' : ''}`}
            >
              {isRTL ? meta.meaning.ar : meta.meaning.en}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export interface TierKeyToggleProps {
  /** Legend anchor to scroll to. Default '#dw-tier-legend'. */
  href?: string;
  className?: string;
}

/** A tiny affordance that jumps to the evidence key. */
export function TierKeyToggle({
  href = '#dw-tier-legend',
  className = '',
}: TierKeyToggleProps) {
  const { isRTL } = useRTL();
  return (
    <a href={href} className={`dw-tier-key-toggle ${className}`}>
      <span aria-hidden>?</span>
      {isRTL ? 'مفتاح الأدلة' : 'Evidence key'}
    </a>
  );
}

export default TierLegend;
