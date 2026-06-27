'use client';
/* ═══════════════════════════════════════════════════════════════
 * DepthRail.tsx — left depth gauge (−8 … +8).
 *
 * A fork of a FloatingNav, parameterized to the descent section ids
 * (DEPTH_RAIL_STOPS). It fills downward as you descend the 8-layer
 * shaft (−1…−8), bottoms at the floor, then drains upward on the
 * climb (+1…+8). An IntersectionObserver tracks the active section;
 * the active stop and its signed depth drive the gauge fill + label.
 *
 * Reduced-motion / <768px safe: pure CSS transitions, no GSAP; on
 * very narrow screens it collapses to a thin progress spine.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState } from 'react';
import { DEPTH_RAIL_STOPS, DESCENT_LAYER_COLORS, type RailStop } from './descent-data';
import { theme, type Zone } from './descent-theme';
import { useRTL } from '@/components/shared/rtl-provider';

export interface DepthRailProps {
  /** Override the stop list (defaults to DEPTH_RAIL_STOPS). */
  stops?: RailStop[];
  /** Active palette zone — tints the gauge glow per ZONE_THEME. */
  zone?: Zone;
}

export function DepthRail({ stops = DEPTH_RAIL_STOPS, zone = 'descent' }: DepthRailProps) {
  const zt = theme(zone);
  const { isRTL } = useRTL();
  const [activeAnchor, setActiveAnchor] = useState<string>(stops[0]?.anchor ?? '');
  const [compact, setCompact] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Signed depth domain for the gauge: −8 (deepest) … +8 (highest).
  const { minDepth, maxDepth } = useMemo(() => {
    const ds = stops.map((s) => s.depth);
    return { minDepth: Math.min(...ds), maxDepth: Math.max(...ds) };
  }, [stops]);

  const active = stops.find((s) => s.anchor === activeAnchor) ?? stops[0];
  // 0 at deepest descent, 1 at highest climb — drives the fill height.
  const fill = active ? (active.depth - minDepth) / (maxDepth - minDepth || 1) : 0;

  // Neon zone treatment: the active palette zone drives the gauge accent
  // (descent blood / climb cyan / enterprise gold), with the floor (depth
  // 0) reading the flip teal as the pivot. Pulled from ZONE_THEME so it
  // shifts with the page palette swap.
  const railColor =
    !active || active.depth === 0
      ? DESCENT_LAYER_COLORS.flip.accent
      : zt.accentA;
  const railColorB = zt.accentB;

  useEffect(() => {
    const check = () => setCompact(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Track the active section via IntersectionObserver (no scroll math).
  useEffect(() => {
    const els = stops
      .map((s) => document.getElementById(s.anchor))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveAnchor(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -20% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    observerRef.current = obs;
    return () => obs.disconnect();
  }, [stops]);

  const go = (anchor: string) => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const side = isRTL ? { right: 0 } : { left: 0 };

  return (
    <nav
      aria-label="Depth gauge"
      className="fixed top-1/2 -translate-y-1/2 z-[60] pointer-events-none"
      style={{ ...side, padding: compact ? '0 8px' : '0 16px' }}
    >
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* The gauge spine — neon zone treatment */}
        <div
          className="relative rounded-full"
          style={{
            width: compact ? 4 : 5,
            height: compact ? 180 : 320,
            background: 'rgba(255,255,255,0.06)',
            boxShadow: `inset 0 0 0 1px rgba(${zt.accentARGB},0.12)`,
            overflow: 'hidden',
          }}
        >
          {/* Fill from the bottom (depth) up to the active stop, glowing. */}
          <div
            className="absolute left-0 right-0 bottom-0 rounded-full transition-all duration-500"
            style={{
              height: `${fill * 100}%`,
              background: `linear-gradient(180deg, ${railColorB}, ${railColor})`,
              boxShadow: `0 0 18px ${railColor}, 0 0 6px ${railColor}`,
            }}
          />
        </div>

        {/* Stop ticks + active label (hidden in compact) */}
        {!compact && (
          <ul className="flex flex-col-reverse gap-0.5">
            {stops.map((s) => {
              const isActive = s.anchor === activeAnchor;
              const c =
                s.depth === 0 ? DESCENT_LAYER_COLORS.flip.accent : zt.accentA;
              return (
                <li key={s.anchor}>
                  <button
                    type="button"
                    onClick={() => go(s.anchor)}
                    className="group flex items-center gap-2 py-0.5"
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span
                      className="rounded-full transition-all"
                      style={{
                        width: isActive ? 10 : 5,
                        height: isActive ? 10 : 5,
                        background: isActive ? c : 'rgba(255,255,255,0.25)',
                        boxShadow: isActive ? `0 0 8px ${c}` : 'none',
                      }}
                    />
                    <span
                      className="text-[9px] font-mono whitespace-nowrap transition-opacity"
                      style={{ color: isActive ? c : 'rgba(255,255,255,0.3)', opacity: isActive ? 1 : 0.55 }}
                    >
                      {s.depth > 0 ? `+${s.depth}` : s.depth} ·{' '}
                      <span dir={isRTL ? 'rtl' : 'ltr'} style={isRTL ? { fontFamily: 'var(--font-heading-ar),sans-serif' } : undefined}>
                        {isRTL ? s.label.ar : s.label.en}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default DepthRail;
