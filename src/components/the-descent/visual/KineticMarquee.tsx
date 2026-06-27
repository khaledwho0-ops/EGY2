'use client';
/* ═══════════════════════════════════════════════════════════════
 * KineticMarquee — diagonal scrolling tape (v2 §2.2).
 *
 * CSS @keyframes translate on a duplicated track → seamless loop. The
 * DESCENT tape carries the real Arabic lie-phrases in a blood-red,
 * hazard-striped strip; the CLIMB tape carries the defense techniques.
 *
 * Reduced-motion / <768px: a STATIC angled strip (no animation). The
 * .td-marquee CSS also force-disables the keyframes under both media
 * queries — belt and braces.
 *
 * NB: the lie-phrases are framed as lies (struck-through hazard tape),
 * never asserted as fact; no <Sourced> needed because nothing here is a
 * truth claim — it is a museum of the message that kills.
 * ═══════════════════════════════════════════════════════════════ */

import type { CSSProperties } from 'react';
import { theme, type Zone } from '../descent-theme';
import { useVisualEnv } from './use-visual-env';

/** The DESCENT lie-phrases (the message that becomes a coffin). */
export const DESCENT_LIE_PHRASES = [
  'الأنسولين كذبة',
  'الدوا ثانوي',
  'مصر اكتشفت العلاج',
  'حقنة بتجيب الشفا',
] as const;

/** The CLIMB defense techniques (short tape labels). */
export const CLIMB_DEFENSE_PHRASES = [
  'تحقّق من المصدر',
  'اقرأ ما بعد العنوان',
  'لاحقة الادّعاء',
  'قارن بالإجماع العلمي',
  'افصل الدليل عن الرأي',
] as const;

export interface KineticMarqueeProps {
  /** Explicit items; if omitted, derived from `tone`/zone defaults. */
  items?: readonly string[];
  /** Diagonal angle in degrees. Default -4. */
  angle?: number;
  /** Loop duration in seconds (lower = faster). Default 28. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  zone?: Zone;
  /** 'lie' = hazard red descent tape; 'defense' = climb tape; 'plain'. */
  tone?: 'lie' | 'defense' | 'plain';
  className?: string;
}

export function KineticMarquee({
  items,
  angle = -4,
  speed = 28,
  reverse = false,
  zone = 'descent',
  tone = zone === 'descent' ? 'lie' : 'defense',
  className = '',
}: KineticMarqueeProps) {
  const env = useVisualEnv();
  const t = theme(zone);

  const data =
    items ?? (tone === 'lie' ? DESCENT_LIE_PHRASES : tone === 'defense' ? CLIMB_DEFENSE_PHRASES : []);
  if (!data.length) return null;

  // duplicate the sequence so the -50% loop is seamless
  const track = [...data, ...data];

  const isHazard = tone === 'lie';
  const sep = '·';

  const wrapStyle: CSSProperties = {
    '--td-accent-a-rgb': t.accentARGB,
    '--td-marquee-dur': `${speed}s`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'center',
    borderTop: `1px solid rgba(${t.accentARGB},0.35)`,
    borderBottom: `1px solid rgba(${t.accentARGB},0.35)`,
    padding: '0.5rem 0',
    background: isHazard ? `rgba(${t.accentARGB},0.07)` : `rgba(${t.accentBRGB},0.05)`,
  } as CSSProperties;

  // Plain render helper (NOT a nested component) — calling it directly
  // keeps the marquee pure/deterministic: no new component identity per
  // render, so React never reports "update a component while rendering".
  const renderItem = (phrase: string, i: number) => (
    <span
      key={i}
      dir="rtl"
      className="inline-flex items-center gap-4 px-6"
      style={{
        fontFamily: 'var(--font-heading-ar), sans-serif',
        fontSize: 'clamp(0.95rem, 2.4vw, 1.5rem)',
        fontWeight: 700,
        color: isHazard ? t.accentA : t.accentB,
        textShadow: `0 0 14px rgba(${isHazard ? t.accentARGB : t.accentBRGB},0.4)`,
        // lie tape is visually negated — it is a museum of the message
        textDecoration: isHazard ? 'line-through' : 'none',
        textDecorationColor: isHazard ? `rgba(${t.accentARGB},0.6)` : undefined,
      }}
    >
      {phrase}
      <span aria-hidden style={{ color: 'rgba(255,255,255,0.3)', WebkitTextStroke: '0' }}>
        {sep}
      </span>
    </span>
  );

  const staticStrip = env.mounted && !env.motionOK;

  return (
    <div
      className={`td-marquee ${isHazard ? 'td-hazard' : ''} ${className}`}
      style={wrapStyle}
      role="presentation"
      aria-hidden
    >
      {staticStrip ? (
        // reduced-motion / mobile: one static, non-looping line
        <div className="td-marquee__track" style={{ animation: 'none' }}>
          {data.map((p, i) => renderItem(p, i))}
        </div>
      ) : (
        <div className={`td-marquee__track ${reverse ? 'td-marquee__track--rev' : ''}`}>
          {track.map((p, i) => renderItem(p, i))}
        </div>
      )}
    </div>
  );
}

export default KineticMarquee;
