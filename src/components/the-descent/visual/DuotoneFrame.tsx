'use client';
/* ═══════════════════════════════════════════════════════════════
 * DuotoneFrame — grayscale→accent duotone figure (v2 §2.3).
 *
 * An abstract silhouette / Nile-delta motif fused behind/in front of a
 * DisplayType — the "you"/victim depth cue. If a real `src` is given it
 * is rendered through an SVG feColorMatrix duotone; with no asset we
 * draw an ABSTRACT SVG silhouette or a Nile-delta motif — NEVER a stock
 * face implying a real victim (v2 §2.3 hard rule).
 *
 * Static SVG → reduced-motion safe. Zone accents from ZONE_THEME map to
 * the duotone shadow/highlight stops.
 * ═══════════════════════════════════════════════════════════════ */

import { useId } from 'react';
import { theme, type Zone } from '../descent-theme';

export interface DuotoneFrameProps {
  /** Optional real image to duotone. Omit → abstract SVG motif. */
  src?: string;
  /** Which abstract motif when no src. Default 'silhouette'. */
  shape?: 'silhouette' | 'delta';
  /** Shadow color override (defaults to zone canvas-dark). */
  from?: string;
  /** Highlight color override (defaults to zone accentA). */
  to?: string;
  zone?: Zone;
  className?: string;
  /** Decorative alt; figure is aria-hidden by default. */
  alt?: string;
  /** Opacity of the motif. Default 0.5. */
  opacity?: number;
}

export function DuotoneFrame({
  src,
  shape = 'silhouette',
  from,
  to,
  zone = 'descent',
  className = '',
  alt,
  opacity = 0.5,
}: DuotoneFrameProps) {
  const t = theme(zone);
  const uid = useId().replace(/:/g, '');
  const shadow = from ?? '#060507';
  const light = to ?? t.accentA;

  // feColorMatrix duotone: luminance → lerp(shadow, light).
  // Build a matrix that maps grayscale to a 2-color ramp.
  const duoFilter = (
    <filter id={`duo-${uid}`} colorInterpolationFilters="sRGB">
      <feColorMatrix
        type="matrix"
        values="0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0    0    0    1 0"
      />
      <feComponentTransfer>
        <feFuncR type="table" tableValues={`${hexToUnit(shadow).r} ${hexToUnit(light).r}`} />
        <feFuncG type="table" tableValues={`${hexToUnit(shadow).g} ${hexToUnit(light).g}`} />
        <feFuncB type="table" tableValues={`${hexToUnit(shadow).b} ${hexToUnit(light).b}`} />
      </feComponentTransfer>
    </filter>
  );

  if (src) {
    return (
      <div className={`relative ${className}`} style={{ opacity }} role="img" aria-label={alt ?? ''} data-duotone>
        <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
          <defs>{duoFilter}</defs>
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: `url(#duo-${uid})` }}
        />
      </div>
    );
  }

  // Abstract motif — no real face, ever.
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      style={{ width: '100%', height: '100%', opacity }}
      aria-hidden={!alt}
      role={alt ? 'img' : undefined}
      aria-label={alt}
      data-duotone={shape}
    >
      <defs>
        <linearGradient id={`duograd-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} stopOpacity="0.85" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.95" />
        </linearGradient>
        <filter id={`soft-${uid}`}>
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {shape === 'silhouette' ? (
        // an abstract human head-and-shoulders silhouette (no features)
        <path
          d="M200 70
             C 250 70 285 110 285 160
             C 285 200 265 225 250 240
             C 300 255 340 300 355 360
             L 360 500 L 40 500 L 45 360
             C 60 300 100 255 150 240
             C 135 225 115 200 115 160
             C 115 110 150 70 200 70 Z"
          fill={`url(#duograd-${uid})`}
          filter={`url(#soft-${uid})`}
        />
      ) : (
        // a Nile-delta motif: a stem fanning into branching distributaries
        <g stroke={`url(#duograd-${uid})`} strokeWidth="3" fill="none" filter={`url(#soft-${uid})`}>
          <path d="M200 20 L200 220" strokeWidth="6" />
          <path d="M200 220 C 170 300 120 360 60 470" />
          <path d="M200 220 C 185 310 160 380 120 480" />
          <path d="M200 220 C 200 320 200 400 200 490" />
          <path d="M200 220 C 215 310 240 380 280 480" />
          <path d="M200 220 C 230 300 280 360 340 470" />
          <path d="M150 330 C 175 350 200 355 230 345" opacity="0.6" />
          <path d="M120 410 C 160 435 230 440 290 415" opacity="0.5" />
        </g>
      )}
    </svg>
  );
}

/* hex → 0..1 channel units for feFuncX tableValues */
function hexToUnit(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return {
    r: +(((n >> 16) & 255) / 255).toFixed(3),
    g: +(((n >> 8) & 255) / 255).toFixed(3),
    b: +((n & 255) / 255).toFixed(3),
  };
}

export default DuotoneFrame;
