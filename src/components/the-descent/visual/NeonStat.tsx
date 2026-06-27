'use client';
/* ═══════════════════════════════════════════════════════════════
 * NeonStat — benchmark-chip wrapper around <Sourced> (v2 §2.10).
 *
 * Wraps the One-Law <Sourced> component (which still enforces the
 * required source+tier) in an accent-glow chip with mono tabular
 * figures — the HydraDB benchmark vibe. The <Sourced> child keeps full
 * responsibility for the claim + Arabic-Indic value formatting; NeonStat
 * only supplies the neon frame and the zone accent.
 *
 * No animation here → reduced-motion safe. (Count-ups belong to the
 * caller's AnimatedCounter, which carries its own reduced-motion path.)
 * ═══════════════════════════════════════════════════════════════ */

import type { CSSProperties, ReactNode } from 'react';
import { theme, glow, type Zone } from '../descent-theme';
import { Sourced, type SourcedProps } from '../shared/Sourced';

export interface NeonStatProps extends Omit<SourcedProps, 'accent'> {
  zone?: Zone;
  /** Use accent B instead of A for the glow + value. */
  alt?: boolean;
  /** Render a custom node instead of the <Sourced> value (e.g. an AnimatedCounter). Source/tier still required for the badge. */
  children?: ReactNode;
  className?: string;
}

export function NeonStat({ zone = 'descent', alt = false, children, className = '', ...sourced }: NeonStatProps) {
  const t = theme(zone);
  const accent = alt ? t.accentB : t.accentA;
  const rgb = alt ? t.accentBRGB : t.accentARGB;

  const chip: CSSProperties = {
    borderRadius: 14,
    border: `1px solid rgba(${rgb},0.35)`,
    background: `rgba(${rgb},0.05)`,
    boxShadow: glow(zone, { which: alt ? 'B' : 'A', strength: 0.28, radius: 30 }),
    padding: '0.9rem 1.1rem',
  };

  return (
    <div className={`relative ${className}`} style={chip} data-neon-stat>
      {children ? (
        <>
          <div
            className="font-bold tabular-nums leading-none"
            style={{
              color: accent,
              fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
              textShadow: `0 0 18px rgba(${rgb},0.5)`,
              fontSize: 'clamp(1.6rem,4vw,2.8rem)',
            }}
          >
            {children}
          </div>
          {/* still route the badge/source through Sourced for the One-Law trail */}
          <div className="mt-1">
            <Sourced {...sourced} value="" accent={accent} inline />
          </div>
        </>
      ) : (
        <Sourced {...sourced} accent={accent} />
      )}
    </div>
  );
}

export default NeonStat;
