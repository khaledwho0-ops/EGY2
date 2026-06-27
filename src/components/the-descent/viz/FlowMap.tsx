'use client';
/* ═══════════════════════════════════════════════════════════════
 * FlowMap.tsx — M8 «The Architects» governorate propagation flow-map.
 *
 * THE MACHINE, NOT THE MAN. The lie does not start with one liar; it
 * rides a rail (82M internet users) and propagates across Egypt's
 * governorates. Renders the real Egypt geometry (d3-geo
 * geoMercator().fitSize over src/data/egypt-governorates.geojson),
 * draws propagation arcs from the Cairo origin to every other
 * governorate, and rides particles along each arc.
 *
 * §G9 FIX — the flow-map used to read as a coral rectangle:
 *   • The sea is dark (`--dw-canvas`); each governorate is a visibly
 *     filled shape with a bright dividing stroke (no full-bleed wash).
 *   • Arcs are REAL, clearly-visible bezier arcs — brightness + width
 *     scale with the modeled weight, so the propagation reads.
 *   • Nodes are sized BY weight; the Cairo hub is unmistakable.
 *   • Labels are ≥12px high-contrast (.dw-panel floor).
 *
 * HONESTY GATE — arc weights are a MODELED distance-decay from the
 * Cairo hub, NEVER measured per-governorate spread. The anchoring
 * figures each render through <Sourced> with a TierBadge.
 *
 * GEOMETRY GATE — geojson absent ⇒ a labeled ABSTRACT node-arc diagram
 * (clearly not Egypt) + a note, so the gap is honest.
 *
 * MOTION GATE — particles only run ≥768px AND not reduced-motion.
 * NO GSAP / DrawSVG / R3F — arcs "draw in" via a CSS stroke-dashoffset
 * transition keyed to a useReveal() latch (DESIGN WAVE).
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath, type GeoPermissibleObjects } from 'd3-geo';
import { STATS, DESCENT_LAYER_COLORS, LAYER_DEFENSE_MAP } from '../descent-data';
import { Sourced } from '../shared/Sourced';
import { useReveal } from '../dw/useReveal';
import { TierBadge, resolveTierKey } from '../dw/TierLegend';
import { layerAccent } from '../descent-theme';

/* ───────────────────────────────────────────────────────────────
 * The Architects = layer 7 ("the machine, not the man").
 * Use the FIXED §G6 layer-7 accent (steel) so the flow-map matches
 * the rest of the per-layer color system, not a cold coral.
 * ─────────────────────────────────────────────────────────────── */
const ARCHITECT_LAYER = 7;
const ACCENT = layerAccent(ARCHITECT_LAYER).hex; // steel #AEB9C7
const ACCENT_RGB = layerAccent(ARCHITECT_LAYER).rgb;
const ARCHITECT = LAYER_DEFENSE_MAP.find((l) => l.n === ARCHITECT_LAYER);

const VIEW_W = 760;
const VIEW_H = 560;
const ORIGIN_NAME = 'Cairo'; // the rail's hub — where the lie boards the network

interface GovFeature {
  type: 'Feature';
  properties: { name: string; iso: string } & Record<string, unknown>;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
}
interface GovCollection {
  type: 'FeatureCollection';
  features: GovFeature[];
}

interface NodeXY {
  name: string;
  x: number;
  y: number;
  /** Modeled propagation weight (0..1), normalized across nodes. */
  weight: number;
}
interface ArcGeom {
  name: string;
  d: string;
  weight: number;
}

function rgba(a: number): string {
  return `rgba(${ACCENT_RGB}, ${a})`;
}

/* Opaque magnitude fill for governorate shapes (dark sea → steel). */
function rampFill(t: number): string {
  const [r, g, b] = ACCENT_RGB.split(',').map((n) => parseInt(n.trim(), 10));
  const base = [14, 14, 18];
  const k = Math.max(0, Math.min(1, t));
  const mix = (c: number, b0: number) => Math.round(b0 + (c - b0) * k);
  return `rgb(${mix(r, base[0])}, ${mix(g, base[1])}, ${mix(b, base[2])})`;
}

/* ───────────────────────────────────────────────────────────────
 * Modeled propagation weight per governorate (distance-decay).
 * ─────────────────────────────────────────────────────────────── */
function modeledWeight(distPx: number, maxDist: number): number {
  if (maxDist <= 0) return 1;
  return 0.28 + 0.72 * (1 - distPx / maxDist);
}

/* Quadratic-bezier arc bowed perpendicular to the chord. */
function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(len * 0.22, 90);
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * bow;
  const cy = my + ny * bow;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

export function FlowMap() {
  const glowId = useId().replace(/:/g, '');
  const [collection, setCollection] = useState<GovCollection | null>(null);
  const [geoFailed, setGeoFailed] = useState(false);
  const [enableMotion, setEnableMotion] = useState(false);
  const [revealRef, shown] = useReveal<HTMLElement>();

  // ── load the REAL geometry; never fabricate ──────────────────
  useEffect(() => {
    let alive = true;
    import('@/data/egypt-governorates.geojson')
      .then((mod) => {
        if (!alive) return;
        const gj = (mod.default ?? mod) as unknown as GovCollection;
        if (gj?.features?.length) setCollection(gj);
        else setGeoFailed(true);
      })
      .catch(() => alive && setGeoFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  // ── motion gate: ≥768px AND not reduced-motion ───────────────
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const wide = window.matchMedia('(min-width: 768px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnableMotion(wide.matches && !reduce.matches);
    update();
    wide.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      reduce.removeEventListener('change', update);
    };
  }, []);

  // ── project geometry → base path + nodes + arcs ──────────────
  const projected = useMemo(() => {
    if (!collection) return null;
    const projection = geoMercator().fitSize([VIEW_W, VIEW_H], collection as unknown as GeoPermissibleObjects);
    const path = geoPath(projection);

    const basePaths = collection.features
      .map((f) => ({
        name: f.properties.name,
        d: path(f as unknown as GeoPermissibleObjects) ?? '',
      }))
      .filter((p) => p.d.length > 4);

    if (!basePaths.length) return null;

    const centroids: NodeXY[] = collection.features.map((f) => {
      const [cx, cy] = path.centroid(f as unknown as GeoPermissibleObjects);
      return { name: f.properties.name, x: cx, y: cy, weight: 0 };
    });

    const origin = centroids.find((c) => c.name === ORIGIN_NAME) ?? centroids[0];

    const maxDist = centroids.reduce(
      (m, c) => Math.max(m, Math.hypot(c.x - origin.x, c.y - origin.y)),
      0
    );

    const nodes: NodeXY[] = centroids.map((c) => ({
      ...c,
      weight:
        c.name === origin.name
          ? 1
          : modeledWeight(Math.hypot(c.x - origin.x, c.y - origin.y), maxDist),
    }));

    const arcs: ArcGeom[] = nodes
      .filter((n) => n.name !== origin.name)
      .map((n) => ({
        name: n.name,
        d: arcPath(origin.x, origin.y, n.x, n.y),
        weight: n.weight,
      }));

    return { basePaths, nodes, arcs, origin };
  }, [collection]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // ── particles riding arcs via getPointAtLength (throttled) ───
  const particleLayerRef = useRef<SVGGElement | null>(null);
  useEffect(() => {
    if (!enableMotion || !projected || !svgRef.current || !particleLayerRef.current) return;
    const svg = svgRef.current;
    const layer = particleLayerRef.current;

    const arcEls = Array.from(svg.querySelectorAll<SVGPathElement>('[data-arc]'));
    if (!arcEls.length) return;

    const lengths = arcEls.map((p) => {
      try {
        return p.getTotalLength();
      } catch {
        return 0;
      }
    });
    const offsets = arcEls.map((_, i) => (i * 0.137) % 1);

    const dots: SVGCircleElement[] = arcEls.map(() => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '2.8');
      c.setAttribute('fill', '#fff');
      c.setAttribute('opacity', '0.95');
      c.style.filter = `drop-shadow(0 0 5px ${ACCENT})`;
      layer.appendChild(c);
      return c;
    });

    let raf = 0;
    let last = 0;
    const FRAME_MS = 33;
    const SPEED = 0.00016;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < FRAME_MS) return;
      last = t;
      for (let i = 0; i < arcEls.length; i++) {
        const total = lengths[i];
        if (!total) continue;
        const dot = dots[i];
        const phase = (offsets[i] + t * SPEED) % 1;
        const pt = arcEls[i].getPointAtLength(phase * total);
        dot.setAttribute('cx', pt.x.toFixed(1));
        dot.setAttribute('cy', pt.y.toFixed(1));
        const edge = Math.min(phase, 1 - phase) * 6;
        dot.setAttribute('opacity', Math.min(0.95, edge).toFixed(2));
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      dots.forEach((d) => d.remove());
    };
  }, [enableMotion, projected]);

  /* ── render: GEOMETRY GATE — abstract node-arc fallback ──────── */
  if (geoFailed) {
    return <AbstractFlowFallback />;
  }

  /* ── header + sourced rail anchor ──── */
  const railKey = resolveTierKey({
    tier: STATS.internetUsers.tier,
    source: STATS.internetUsers.source,
  });
  const header = (
    <div className="dw-panel__head" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <span className="dw-panel__chip" aria-hidden />
      <div style={{ flex: 1, minWidth: 0 }}>
        <span className="dw-panel__title">propagation flow-map · the machine, not the man</span>
        {ARCHITECT && (
          <p
            className="td-flow-sub"
            dir="rtl"
            style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
          >
            {ARCHITECT.cognition.ar}
          </p>
        )}
      </div>
      <span className="td-flow-railanchor">
        <Sourced {...STATS.internetUsers} accent={ACCENT} inline />
        <TierBadge tier={railKey} />
      </span>
    </div>
  );

  return (
    <figure
      ref={revealRef}
      className={`dw-panel dw-panel--full td-flow-root m-0 dw-reveal ${shown ? 'is-in' : ''}`}
      data-flow-map
      style={
        {
          ['--td-layer-accent' as string]: ACCENT,
          ['--td-layer-accent-rgb' as string]: ACCENT_RGB,
        } as React.CSSProperties
      }
    >
      <FlowStyles />
      {header}

      {projected ? (
        <div className="td-flow-mapwrap">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="td-flow-svg"
            role="img"
            aria-label="Modeled propagation of a false claim across Egypt's governorates from the Cairo network hub. Arc intensity is a modeled distance-decay, not measured per-governorate data."
          >
            <defs>
              <radialGradient id={`flow-hub-glow-${glowId}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.6" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </radialGradient>
              <filter id={`flow-glow-${glowId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* base map — real geometry, visibly filled shapes on dark sea */}
            <g data-base>
              {projected.basePaths.map((p) => (
                <path
                  key={p.name}
                  d={p.d}
                  fill={rampFill(0.18)}
                  stroke={rgba(0.55)}
                  strokeWidth={0.8}
                  strokeLinejoin="round"
                />
              ))}
            </g>

            {/* propagation arcs — REAL, clearly visible; weight = brightness+width */}
            <g data-arcs fill="none" filter={enableMotion ? `url(#flow-glow-${glowId})` : undefined}>
              {projected.arcs.map((a, i) => {
                const DASH = 1400;
                const drawn = !enableMotion || shown;
                return (
                  <path
                    key={a.name}
                    data-arc
                    d={a.d}
                    stroke={ACCENT}
                    strokeOpacity={0.35 + a.weight * 0.55}
                    strokeWidth={1 + a.weight * 2.6}
                    strokeLinecap="round"
                    style={
                      enableMotion
                        ? {
                            strokeDasharray: DASH,
                            strokeDashoffset: drawn ? 0 : DASH,
                            transition: `stroke-dashoffset 1.1s ease-out ${(i * 0.045).toFixed(3)}s`,
                          }
                        : undefined
                    }
                  />
                );
              })}
            </g>

            {/* particle layer (populated imperatively when motion is on) */}
            <g ref={particleLayerRef} data-particles />

            {/* governorate nodes — radius = modeled weight */}
            <g data-nodes>
              {projected.nodes.map((n) => {
                const isHub = n.name === projected.origin.name;
                return (
                  <g key={n.name}>
                    {isHub && <circle cx={n.x} cy={n.y} r={30} fill={`url(#flow-hub-glow-${glowId})`} />}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={isHub ? 6.5 : 2.2 + n.weight * 3.6}
                      fill={isHub ? '#fff' : ACCENT}
                      stroke={isHub ? ACCENT : 'none'}
                      strokeWidth={isHub ? 2 : 0}
                    />
                  </g>
                );
              })}
            </g>

            {/* hub label */}
            <text
              x={projected.origin.x + 10}
              y={projected.origin.y - 10}
              fill="#fff"
              fontSize={14}
              fontWeight={700}
              fontFamily="'Clash Display', var(--font-heading-en), sans-serif"
              style={{ pointerEvents: 'none' }}
            >
              {ORIGIN_NAME} · hub
            </text>
          </svg>
        </div>
      ) : (
        <div className="td-flow-loading">loading Egypt geometry…</div>
      )}

      {/* honesty caption + rail anchors (every claim is Sourced) */}
      <figcaption className="td-flow-cap">
        <p className="td-flow-honesty">
          Arc intensity is a <strong>modeled</strong> distance-decay from the Cairo network hub — a way to
          see <em>the machine</em>, not measured per-governorate spread.
        </p>
        <p className="td-flow-honesty td-flow-honesty--ar" dir="rtl">
          شدّة القوس <strong>نموذج</strong> لتناقص بالمسافة من محور القاهرة — لرؤية الماكينة، لا قياسًا فعليًا لكل محافظة.
        </p>

        <div className="td-flow-anchors">
          <span className="td-flow-anchor">
            <Sourced {...STATS.vosoughi} accent={ACCENT} labelEn={STATS.vosoughi.en} labelAr={STATS.vosoughi.ar} />
            <TierBadge tier={resolveTierKey({ tier: STATS.vosoughi.tier, source: STATS.vosoughi.source })} />
          </span>
          <span className="td-flow-anchor">
            <Sourced
              {...STATS.misinfo2025}
              accent={ACCENT}
              labelEn={STATS.misinfo2025.en}
              labelAr={STATS.misinfo2025.ar}
            />
            <TierBadge tier={resolveTierKey({ tier: STATS.misinfo2025.tier, source: STATS.misinfo2025.source })} />
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────────────────────────────────────────
 * GEOMETRY GATE — labeled ABSTRACT node-arc diagram (NOT a fake map).
 * ─────────────────────────────────────────────────────────────── */
function AbstractFlowFallback() {
  const spokes = ['rail', 'feed', 'group', 'reply', 'share', 'dm', 'repost', 'forward'];
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const R = 200;
  const nodes = spokes.map((label, i) => {
    const a = (i / spokes.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  });

  return (
    <figure
      className="dw-panel dw-panel--full td-flow-root m-0"
      data-flow-map="abstract"
      style={
        {
          ['--td-layer-accent' as string]: ACCENT,
          ['--td-layer-accent-rgb' as string]: ACCENT_RGB,
        } as React.CSSProperties
      }
    >
      <FlowStyles />
      <div className="dw-panel__head" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <span className="dw-panel__chip" aria-hidden />
        <span className="dw-panel__title">propagation flow · abstract (geometry unavailable)</span>
        <Sourced {...STATS.internetUsers} accent={ACCENT} inline />
      </div>

      <div role="note" className="td-flow-note">
        Egypt governorate geometry (src/data/egypt-governorates.geojson) could not be loaded, so this is an{' '}
        <strong>abstract</strong> hub→spoke diagram of how the lie propagates — <strong>not a map of Egypt</strong>.
        <span className="td-flow-note__ar" dir="rtl">
          تعذّر تحميل هندسة المحافظات، لذا هذا رسم تجريدي لانتشار الكذبة — وليس خريطة لمصر.
        </span>
      </div>

      <div className="td-flow-mapwrap">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="td-flow-svg" role="img" aria-label="Abstract hub-and-spoke propagation diagram (not a geographic map).">
          <g fill="none" stroke={ACCENT}>
            {nodes.map((n, i) => (
              <path
                key={n.label}
                d={arcPath(cx, cy, n.x, n.y)}
                strokeOpacity={0.7 - (i % 3) * 0.1}
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            ))}
          </g>
          <circle cx={cx} cy={cy} r={8} fill="#fff" stroke={ACCENT} strokeWidth={2} />
          <text x={cx + 12} y={cy - 12} fill="#fff" fontSize={14} fontWeight={700} fontFamily="'Clash Display', var(--font-heading-en), sans-serif">
            origin
          </text>
          {nodes.map((n) => (
            <g key={`${n.label}-node`}>
              <circle cx={n.x} cy={n.y} r={5} fill={ACCENT} />
              <text x={n.x} y={n.y - 11} fill="#fff" fontSize={12} textAnchor="middle" fontFamily="monospace">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <figcaption className="td-flow-anchors">
        <span className="td-flow-anchor">
          <Sourced {...STATS.vosoughi} accent={ACCENT} labelEn={STATS.vosoughi.en} labelAr={STATS.vosoughi.ar} />
          <TierBadge tier={resolveTierKey({ tier: STATS.vosoughi.tier, source: STATS.vosoughi.source })} />
        </span>
        <span className="td-flow-anchor">
          <Sourced {...STATS.misinfo2025} accent={ACCENT} labelEn={STATS.misinfo2025.en} labelAr={STATS.misinfo2025.ar} />
          <TierBadge tier={resolveTierKey({ tier: STATS.misinfo2025.tier, source: STATS.misinfo2025.source })} />
        </span>
      </figcaption>
    </figure>
  );
}

function FlowStyles() {
  return (
    <style>{`
      .td-flow-root { display: flex; flex-direction: column; }
      .td-flow-sub { font-size: var(--dw-t-secondary, 13px); color: var(--dw-bone-dim, #c9c5bd); margin-top: 0.25rem; }
      .td-flow-railanchor { display: inline-flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; }

      .td-flow-mapwrap {
        position: relative; width: 100%; overflow: hidden; border-radius: 14px;
        border: 1px solid rgba(var(--td-layer-accent-rgb), 0.22);
      }
      .td-flow-svg {
        display: block; width: 100%; height: auto;
        background: radial-gradient(120% 90% at 50% 0%, #11131b 0%, var(--dw-canvas, #08080a) 82%);
      }
      .td-flow-loading { display: flex; height: 12rem; align-items: center; justify-content: center; font-size: var(--dw-t-secondary, 13px); color: var(--dw-bone-dim, #c9c5bd); }

      .td-flow-cap { margin-top: 1.1rem; }
      .td-flow-honesty { font-size: var(--dw-t-secondary, 13px); line-height: 1.55; color: rgba(252,211,77,0.85); margin: 0 0 0.2rem; }
      .td-flow-honesty--ar { color: rgba(252,211,77,0.62); font-family: var(--font-heading-ar), sans-serif; }

      .td-flow-anchors { margin-top: 1rem; display: grid; gap: 0.85rem; grid-template-columns: 1fr; }
      @media (min-width: 640px) { .td-flow-anchors { grid-template-columns: 1fr 1fr; } }
      .td-flow-anchor { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }

      .td-flow-note {
        border-radius: 10px; border: 1px solid rgba(245,158,11,0.4);
        background: rgba(245,158,11,0.07); color: #fcd34d;
        padding: 0.7rem 0.85rem; margin: 0.6rem 0 1rem;
        font-size: var(--dw-t-secondary, 13px); line-height: 1.55;
      }
      .td-flow-note__ar { display: block; margin-top: 0.3rem; color: rgba(252,211,77,0.7); font-family: var(--font-heading-ar), sans-serif; }
    `}</style>
  );
}

export default FlowMap;
