'use client';
/* ═══════════════════════════════════════════════════════════════
 * use-visual-env.ts — shared environment guards for visual primitives.
 *
 * Every animated primitive must degrade under prefers-reduced-motion
 * and below 768px (v2 §2 contract). This hook resolves both once,
 * SSR-safe (returns the "calm" branch on the server), and updates on
 * media-query / resize changes.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useState } from 'react';

export interface VisualEnv {
  /** prefers-reduced-motion: reduce is set. */
  reducedMotion: boolean;
  /** viewport ≥ 768px (the desktop motion gate). */
  wide: boolean;
  /** convenience: motion is allowed (wide AND not reduced). */
  motionOK: boolean;
  /** true until mounted on the client (avoids hydration flashes). */
  mounted: boolean;
}

export function useVisualEnv(): VisualEnv {
  const [env, setEnv] = useState<VisualEnv>({
    reducedMotion: true,
    wide: false,
    motionOK: false,
    mounted: false,
  });

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 768px)');

    const update = () => {
      const reducedMotion = rm.matches;
      const isWide = wide.matches;
      setEnv({
        reducedMotion,
        wide: isWide,
        motionOK: isWide && !reducedMotion,
        mounted: true,
      });
    };

    update();
    rm.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      rm.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, []);

  return env;
}
