'use client';
/* ═══════════════════════════════════════════════════════════════
 * DisplayType — the massive layered headline (v2 §2.1).
 *
 * A filled layer + 1–2 offset stroke "ghost" layers (-webkit-text-stroke),
 * optional background-clip:text gradient. Arabic uses var(--font-heading-ar)
 * and is NEVER split into glyphs. This is THE biggest hook (M0/M16 «النزول»
 * / THE DESCENT, M14 climb title).
 *
 * Reduced-motion / <768px: the ghost layers collapse to a single static
 * fill — no offset, no transform — but the headline always renders.
 * ═══════════════════════════════════════════════════════════════ */

import type { CSSProperties, ReactNode } from 'react';
import { theme, type Zone } from '../descent-theme';
import { useVisualEnv } from './use-visual-env';

export interface DisplayTypeProps {
  /** English line (the structural fill layer). */
  en?: string;
  /** Arabic line (RTL, var(--font-heading-ar), never glyph-split). */
  ar?: string;
  /** Which line leads visually. Default 'en'. */
  lead?: 'en' | 'ar';
  /** Fluid size via clamp(); pass a CSS font-size or a preset. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | (string & {});
  /** Render ghost stroke-outline layers behind the fill. Default true. */
  stroke?: boolean;
  /** Fill style: 'solid' near-white, or 'gradient' accentA→accentB clip. */
  fill?: 'solid' | 'gradient';
  /** Zone → ZONE_THEME accents. */
  zone?: Zone;
  /** Optional className passthrough. */
  className?: string;
  /** Extra children rendered above the type (e.g. an OrbField). */
  children?: ReactNode;
  /** Center the block. Default true. */
  center?: boolean;
}

const SIZE_PRESET: Record<string, string> = {
  sm: 'clamp(2rem, 7vw, 4rem)',
  md: 'clamp(2.6rem, 9vw, 6rem)',
  lg: 'clamp(3.4rem, 12vw, 9rem)',
  xl: 'clamp(4rem, 16vw, 13rem)',
};

export function DisplayType({
  en,
  ar,
  lead = 'en',
  size = 'lg',
  stroke = true,
  fill = 'solid',
  zone = 'descent',
  className = '',
  children,
  center = true,
}: DisplayTypeProps) {
  const env = useVisualEnv();
  const t = theme(zone);
  const fontSize = SIZE_PRESET[size as string] ?? (size as string);

  // The ghost stroke offsets are decorative depth — drop them when motion
  // is off / on mobile so we keep one crisp, legible fill.
  const showGhosts = stroke && env.motionOK;

  const fillStyle: CSSProperties =
    fill === 'gradient'
      ? {
          background: `linear-gradient(120deg, ${t.accentA}, ${t.accentB})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }
      : { color: '#f5f2ec' };

  const Line = ({ kind }: { kind: 'en' | 'ar' }) => {
    const text = kind === 'ar' ? ar : en;
    if (!text) return null;
    const isAr = kind === 'ar';
    return (
      <span
        dir={isAr ? 'rtl' : 'ltr'}
        className="td-display-line"
        style={{
          display: 'block',
          position: 'relative',
          fontSize,
          lineHeight: 0.92,
          fontWeight: 800,
          letterSpacing: isAr ? '0' : '-0.02em',
          fontFamily: isAr
            ? 'var(--font-heading-ar), sans-serif'
            : "'Clash Display', var(--font-heading-en), sans-serif",
        }}
      >
        {/* ghost stroke layers — offset, behind the fill */}
        {showGhosts && (
          <>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(0.06em, 0.06em)',
                WebkitTextStroke: `1.5px rgba(${t.accentARGB}, 0.45)`,
                color: 'transparent',
                opacity: 0.7,
              }}
            >
              {text}
            </span>
            <span
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(-0.05em, -0.05em)',
                WebkitTextStroke: `1px rgba(${t.accentBRGB}, 0.3)`,
                color: 'transparent',
                opacity: 0.5,
              }}
            >
              {text}
            </span>
          </>
        )}
        {/* the readable fill layer */}
        <span style={{ position: 'relative', ...fillStyle }}>{text}</span>
      </span>
    );
  };

  return (
    <div
      className={`relative ${center ? 'text-center' : ''} ${className}`}
      style={{ filter: env.motionOK ? `drop-shadow(0 0 24px rgba(${t.accentARGB},0.18))` : undefined }}
    >
      {children}
      {lead === 'ar' ? (
        <>
          {Line({ kind: 'ar' })}
          {Line({ kind: 'en' })}
        </>
      ) : (
        <>
          {Line({ kind: 'en' })}
          {Line({ kind: 'ar' })}
        </>
      )}
    </div>
  );
}

export default DisplayType;
