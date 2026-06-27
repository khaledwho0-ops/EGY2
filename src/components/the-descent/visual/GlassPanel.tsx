'use client';
/* ═══════════════════════════════════════════════════════════════
 * GlassPanel — premium glassmorphism card (v2 §2.4).
 *
 * backdrop-filter blur+saturate, hairline gradient border (.td-glass
 * mask trick), inner top highlight, optional accent glow shadow.
 * Replaces the plain .glass-card for case/tool/enterprise cards.
 *
 * Static by default → reduced-motion safe. The glow is a box-shadow,
 * not an animation. Publishes zone accent vars locally so the
 * .td-glass border gradient resolves per zone.
 * ═══════════════════════════════════════════════════════════════ */

import type { CSSProperties, ReactNode } from 'react';
import { theme, glow, type Zone } from '../descent-theme';

export interface GlassPanelProps {
  children: ReactNode;
  zone?: Zone;
  /** Add the accent glow shadow. Default true. */
  glow?: boolean;
  /** Use accent B for the glow. */
  alt?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Padding scale. */
  pad?: 'none' | 'sm' | 'md' | 'lg';
  /** Optional element id (so DepthRail / observers can target it). */
  id?: string;
  as?: 'div' | 'article' | 'section' | 'li';
}

const PAD: Record<string, string> = {
  none: '0',
  sm: '0.9rem',
  md: '1.4rem',
  lg: '2rem',
};

export function GlassPanel({
  children,
  zone = 'descent',
  glow: withGlow = true,
  alt = false,
  className = '',
  style,
  pad = 'md',
  id,
  as = 'div',
}: GlassPanelProps) {
  const t = theme(zone);
  const Tag = as;

  const merged = {
    '--td-accent-a-rgb': alt ? t.accentBRGB : t.accentARGB,
    '--td-accent-b-rgb': alt ? t.accentARGB : t.accentBRGB,
    padding: PAD[pad],
    boxShadow: withGlow ? glow(zone, { which: alt ? 'B' : 'A', strength: 0.35 }) : undefined,
    ...style,
  } as CSSProperties;

  return (
    <Tag id={id} className={`td-glass ${className}`} style={merged} data-glass-panel>
      {children}
    </Tag>
  );
}

export default GlassPanel;
