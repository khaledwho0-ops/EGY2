'use client';
/* ═══════════════════════════════════════════════════════════════
 * GrainOverlay — feTurbulence grain + photocopy scanline (v2 §2.11).
 *
 * Enhances the inline overlay that lived in DescentExperience. A fixed,
 * pointer-events-none, blend-overlay layer. Per-zone opacity; the grain
 * opacity also follows the page var --td-grain-opacity (tweened by the
 * M12 flip). The subtle grain "shift" is a CSS animation that the
 * .td-grain rule disables under reduced-motion.
 * ═══════════════════════════════════════════════════════════════ */

import { useId } from 'react';
import type { Zone } from '../descent-theme';

export interface GrainOverlayProps {
  zone?: Zone;
  /** Base grain opacity (also clamped by --td-grain-opacity). */
  opacity?: number;
  /** Scanline opacity. Default 0.04. */
  scanline?: number;
  /** Render fixed (page-global) vs absolute (section-scoped). Default 'fixed'. */
  position?: 'fixed' | 'absolute';
  /** z-index. Default 40. */
  z?: number;
}

const ZONE_GRAIN: Record<Zone, number> = {
  descent: 0.06,
  climb: 0.035,
  enterprise: 0.04,
};

export function GrainOverlay({
  zone = 'descent',
  opacity,
  scanline = 0.04,
  position = 'fixed',
  z = 40,
}: GrainOverlayProps) {
  const uid = useId().replace(/:/g, '');
  const grain = opacity ?? ZONE_GRAIN[zone];

  return (
    <>
      {/* 1 · animated feTurbulence grain (opacity honors the page var) */}
      <div
        className="td-grain"
        style={{
          position,
          inset: 0,
          zIndex: z,
          opacity: `var(--td-grain-opacity, ${grain})`,
        }}
        aria-hidden
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`grain-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${uid})`} />
        </svg>
      </div>

      {/* 2 · photocopy scanline */}
      <div
        className="td-scanline"
        style={{ position, inset: 0, zIndex: z + 1, opacity: scanline }}
        aria-hidden
      />
    </>
  );
}

export default GrainOverlay;
