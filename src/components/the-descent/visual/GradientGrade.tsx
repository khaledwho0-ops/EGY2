'use client';
/* ═══════════════════════════════════════════════════════════════
 * GradientGrade — per-zone gradient wash + velocity hue-rotate (v2 §2.12).
 *
 * A fixed, pointer-events-none grading layer: a 135deg accentA→accentB
 * wash plus a vignette, with a CLAMPED scroll-velocity hue-rotate read
 * from ScrollContext.stateRef via rAF (filter only). Reads the page
 * accent vars so it cross-fades automatically when the M12/M15 flips
 * swap --td-accent-*.
 *
 * Reduced-motion / <768px: static wash, no hue-rotate (rAF never runs).
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { gradient, type Zone } from '../descent-theme';
import { useScrollContext } from '@/components/six-layers/ScrollContext';
import { useVisualEnv } from './use-visual-env';

export interface GradientGradeProps {
  zone?: Zone;
  /** Wash opacity. Default 0.5. */
  opacity?: number;
  /** Max hue-rotate degrees at peak velocity. Default 18. */
  hueMax?: number;
  position?: 'fixed' | 'absolute';
  z?: number;
}

export function GradientGrade({ zone = 'descent', opacity = 0.5, hueMax = 18, position = 'fixed', z = 42 }: GradientGradeProps) {
  const env = useVisualEnv();
  const { stateRef } = useScrollContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!env.motionOK) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      // clamp velocity → small hue-rotate, no layout
      const v = stateRef.current.velocity || 0;
      const hue = Math.max(-hueMax, Math.min(hueMax, v * 2));
      el.style.filter = `hue-rotate(${hue.toFixed(1)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [env.motionOK, hueMax, stateRef]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position,
        inset: 0,
        zIndex: z,
        pointerEvents: 'none',
        opacity,
        // gradient() resolves from the zone prop; the vignette darkens edges.
        backgroundImage: `${gradient(zone, { aFrom: 0.1, bTo: 0.08 })}, radial-gradient(ellipse at center, transparent 55%, rgba(5,3,4,0.85) 100%)`,
        mixBlendMode: 'soft-light',
        willChange: env.motionOK ? 'filter' : undefined,
      }}
      data-gradient-grade
    />
  );
}

export default GradientGrade;
