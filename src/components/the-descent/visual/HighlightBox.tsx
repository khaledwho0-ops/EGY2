'use client';
/* ═══════════════════════════════════════════════════════════════
 * HighlightBox — the "Anna Davies" boxed term (v2 §2.6).
 *
 * Thin accent border + faint fill + corner ticks, for a key term: a
 * victim's condition, a layer name, "ENTERPRISE AWARENESS", a death
 * stat. Static (no animation) → reduced-motion safe by construction.
 * Reads the zone accent via inline CSS vars so the .td-hbox corner-tick
 * pseudo-elements pick up the right color.
 * ═══════════════════════════════════════════════════════════════ */

import type { CSSProperties, ReactNode } from 'react';
import { theme, type Zone } from '../descent-theme';

export interface HighlightBoxProps {
  children: ReactNode;
  zone?: Zone;
  /** Use accent B instead of A. */
  alt?: boolean;
  className?: string;
  /** Padding scale. Default 'md'. */
  pad?: 'sm' | 'md' | 'lg';
}

const PAD: Record<string, string> = {
  sm: '0.2rem 0.55rem',
  md: '0.4rem 0.9rem',
  lg: '0.65rem 1.2rem',
};

export function HighlightBox({ children, zone = 'descent', alt = false, className = '', pad = 'md' }: HighlightBoxProps) {
  const t = theme(zone);
  const rgb = alt ? t.accentBRGB : t.accentARGB;
  const accent = alt ? t.accentB : t.accentA;

  const style = {
    '--td-accent-a-rgb': rgb,
    '--td-accent-a': accent,
    padding: PAD[pad],
    borderRadius: 4,
    color: '#f0ece2',
    boxShadow: `0 0 22px -10px rgba(${rgb},0.6)`,
  } as CSSProperties;

  return (
    <span className={`td-hbox ${className}`} style={style} data-highlight-box>
      {children}
    </span>
  );
}

export default HighlightBox;
