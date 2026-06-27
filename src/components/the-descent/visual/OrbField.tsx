'use client';
/* ═══════════════════════════════════════════════════════════════
 * OrbField — glowing 3D-ish radial-gradient spheres (v2 §2.5).
 *
 * Absolutely-positioned radial spheres, slow CSS drift + optional
 * scroll parallax (transform only), behind content, pointer-events:none.
 * Complements the existing R3F particle field — does NOT open a second
 * WebGL context.
 *
 * Reduced-motion / <768px: spheres render statically (no drift, no
 * parallax). Parallax reads ScrollContext.stateRef via rAF (no React
 * re-renders) and only runs when motion is OK.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
import { theme, type Zone } from '../descent-theme';
import { useVisualEnv } from './use-visual-env';
import { useScrollContext } from '@/components/six-layers/ScrollContext';

export interface OrbFieldProps {
  zone?: Zone;
  /** Number of orbs. Default 4. */
  count?: number;
  /** Parallax strength (0 = none). Default 0.4. */
  parallax?: number;
  className?: string;
  /** Overall opacity of the field. Default 0.7. */
  opacity?: number;
}

interface Orb {
  top: string;
  left: string;
  size: number;
  which: 'A' | 'B';
  dur: number;
  depth: number;
}

// Deterministic pseudo-layout so SSR and client agree (no Math.random
// in render). A small fixed bank, sliced to `count`.
const ORB_BANK: Orb[] = [
  { top: '12%', left: '8%', size: 320, which: 'A', dur: 17, depth: 0.8 },
  { top: '64%', left: '72%', size: 380, which: 'B', dur: 21, depth: 0.5 },
  { top: '38%', left: '54%', size: 240, which: 'A', dur: 15, depth: 1 },
  { top: '78%', left: '18%', size: 280, which: 'B', dur: 19, depth: 0.6 },
  { top: '6%', left: '80%', size: 200, which: 'A', dur: 23, depth: 0.4 },
  { top: '48%', left: '30%', size: 160, which: 'B', dur: 14, depth: 0.9 },
];

export function OrbField({ zone = 'descent', count = 4, parallax = 0.4, className = '', opacity = 0.7 }: OrbFieldProps) {
  const env = useVisualEnv();
  const t = theme(zone);
  const { stateRef } = useScrollContext();
  const rootRef = useRef<HTMLDivElement>(null);

  const orbs = useMemo(() => ORB_BANK.slice(0, Math.max(1, Math.min(count, ORB_BANK.length))), [count]);

  // Scroll-parallax via rAF, transform only, no re-renders.
  useEffect(() => {
    if (!env.motionOK || parallax <= 0) return;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const els = Array.from(root.children) as HTMLElement[];

    const tick = () => {
      const p = stateRef.current.progress; // 0..1
      els.forEach((el, i) => {
        const depth = orbs[i]?.depth ?? 0.5;
        const y = (p - 0.5) * 240 * parallax * depth;
        el.style.setProperty('--td-parallax-y', `${y.toFixed(1)}px`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [env.motionOK, parallax, orbs, stateRef]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none', opacity, zIndex: 0 }}
      data-orb-field
    >
      {orbs.map((o, i) => {
        const rgb = o.which === 'B' ? t.accentBRGB : t.accentARGB;
        const grad = `radial-gradient(circle at 35% 30%, rgba(${rgb},0.5), rgba(${rgb},0.12) 45%, transparent 70%)`;
        const wrapStyle: CSSProperties = {
          top: o.top,
          left: o.left,
          width: o.size,
          height: o.size,
          // parallax offset on the wrapper transform
          transform: env.motionOK ? 'translate3d(0, var(--td-parallax-y, 0px), 0)' : undefined,
        };
        return (
          <div key={i} style={wrapStyle} className="td-orb-wrap absolute" data-orb>
            <div
              className={env.motionOK ? 'td-orb' : ''}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 9999,
                background: grad,
                ['--td-orb-dur' as string]: `${o.dur}s`,
                filter: 'blur(2px)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default OrbField;
