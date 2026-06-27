'use client';
/* ═══════════════════════════════════════════════════════════════
 * ParallaxLayer — scroll-velocity depth (v2 §2.9).
 *
 * Reads ScrollContext.stateRef (the shared, re-render-free scroll
 * state) via rAF and translates its children on Y proportionally to
 * scroll progress × speed. Transform only.
 *
 * Reduced-motion / <768px: renders children with no transform (the
 * rAF loop never starts).
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useScrollContext } from '@/components/six-layers/ScrollContext';
import { useVisualEnv } from './use-visual-env';

export interface ParallaxLayerProps {
  children: ReactNode;
  /** Depth factor. Positive lags (moves down-slower), negative leads. */
  speed?: number;
  /** Max travel in px (clamps the effect). Default 120. */
  max?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.3, max = 120, className = '' }: ParallaxLayerProps) {
  const env = useVisualEnv();
  const { stateRef } = useScrollContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!env.motionOK) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const p = stateRef.current.progress; // 0..1 page progress
      const y = Math.max(-max, Math.min(max, (p - 0.5) * 2 * max * speed));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [env.motionOK, speed, max, stateRef]);

  return (
    <div ref={ref} className={className} style={{ willChange: env.motionOK ? 'transform' : undefined }}>
      {children}
    </div>
  );
}

export default ParallaxLayer;
