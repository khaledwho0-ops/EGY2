'use client';
/* ═══════════════════════════════════════════════════════════════
 * SectionKicker — vertical (writing-mode) side label + index (v2 §2.7).
 *
 * DESIGN-WAVE's vertical side text, e.g. "00 — THE THREAD". Pure CSS
 * writing-mode; no motion, so it's inherently reduced-motion safe. On
 * <768px it folds to a small horizontal kicker rather than vertical.
 * ═══════════════════════════════════════════════════════════════ */

import { theme, type Zone } from '../descent-theme';
import { useVisualEnv } from './use-visual-env';

export interface SectionKickerProps {
  /** EN label (e.g. "THE THREAD"). */
  en: string;
  /** AR label (RTL). */
  ar?: string;
  /** Two-digit index string (e.g. "00", "12"). */
  index?: string;
  /** Zone → accent. */
  zone?: Zone;
  /** Side to pin to. Default 'left'. */
  side?: 'left' | 'right';
  className?: string;
}

export function SectionKicker({
  en,
  ar,
  index,
  zone = 'descent',
  side = 'left',
  className = '',
}: SectionKickerProps) {
  const env = useVisualEnv();
  const t = theme(zone);

  // Mobile: a plain horizontal kicker.
  if (env.mounted && !env.wide) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {index && (
          <span className="font-mono text-[10px]" style={{ color: t.accentA }}>
            {index}
          </span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">{en}</span>
        {ar && (
          <span dir="rtl" className="text-[10px] text-white/40" style={{ fontFamily: 'var(--font-heading-ar),sans-serif' }}>
            {ar}
          </span>
        )}
      </div>
    );
  }

  const pin = side === 'right' ? { right: 0 } : { left: 0 };

  return (
    <div
      aria-hidden={false}
      className={`pointer-events-none select-none ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        ...pin,
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
      }}
    >
      {index && (
        <span
          className="font-mono"
          style={{ fontSize: 11, color: t.accentA, letterSpacing: '0.2em', textShadow: `0 0 10px rgba(${t.accentARGB},0.4)` }}
        >
          {index}
        </span>
      )}
      <span
        className="font-mono uppercase"
        style={{ fontSize: 11, letterSpacing: '0.5em', color: 'rgba(255,255,255,0.55)' }}
      >
        {en}
      </span>
      {ar && (
        <span
          dir="rtl"
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-heading-ar),sans-serif' }}
        >
          {ar}
        </span>
      )}
    </div>
  );
}

export default SectionKicker;
