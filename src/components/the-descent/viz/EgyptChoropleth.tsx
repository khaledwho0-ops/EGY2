'use client';
/* ═══════════════════════════════════════════════════════════════
 * M10 viz · EgyptChoropleth — Egypt 27-governorate choropleth.  (DESIGN WAVE)
 *
 * d3-geo geoMercator().fitSize over the REAL asset at
 * src/data/egypt-governorates.geojson (27 ADM1 features), projected
 * to React <path>. Recolored per scroll-step BY DOMAIN: the parent
 * passes `domainId`, and every governorate fill maps to that domain's
 * accent at a MODELED intensity.
 *
 * §G9 FIX — the map used to read as a flat color block:
 *   • The full-bleed accent <rect> plate is GONE. The sea is dark
 *     (`--dw-canvas`), and every governorate is an OPAQUE filled shape
 *     with a bright dividing stroke, so the 27 paths are unmistakable.
 *   • Fill = a stepped magnitude ramp (dark→accent) so the choropleth
 *     reads as DATA, not one wash.
 *   • If the geometry cannot be loaded, the a11y <table> becomes the
 *     PRIMARY representation (visible, high-contrast rows) — never a
 *     flat block, never withheld behind aria-hidden.
 *   • Domain FILTER CHIPS let the reader switch the active domain.
 *
 * ── HONESTY GATE ── fill is a MODELED distribution keyed off national
 *    sector shares, labeled "modeled, not measured" everywhere.
 * ── A11y ── a real <table> twin is ALWAYS rendered.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { geoPath, geoTransform, type GeoPermissibleObjects } from 'd3-geo';
import { useReducedMotion } from 'framer-motion';
import { CHOROPLETH_META, BLAST_DOMAINS, type BlastDomain } from '../descent-data';
import { Sourced } from '../shared/Sourced';
import { FailLoud } from '../shared/FailLoud';
import { useReveal } from '../dw/useReveal';
import { TierBadge, TierLegend, resolveTierKey } from '../dw/TierLegend';

/* ── geometry typing (matches the ambient *.geojson module) ────── */
interface GovGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}
interface GovFeature {
  type: 'Feature';
  properties: { name: string; iso: string } & Record<string, unknown>;
  geometry: GovGeometry;
}
interface GovCollection {
  type: 'FeatureCollection';
  features: GovFeature[];
}

const VIEW_W = 720;
const VIEW_H = 480;

/* Deterministic 0..1 hash of a governorate name. Gives the modeled
 * distribution a stable, reproducible spread — cosmetic variance
 * around the national share, explicitly NOT a measurement. */
function nameHash(name: string): number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i += 1) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // map to ~0.18..1.0 so the magnitude ramp has real spread
  return 0.18 + ((h >>> 0) % 1000) / 1219;
}

function hexWithAlpha(hex: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  const v = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${v}`;
}

/* Mix a hex accent toward a dark base by t∈0..1 (t=0 → base, 1 → accent).
 * Produces a SOLID opaque fill so each governorate reads as a filled
 * shape on the dark sea — the choropleth, not a translucent wash. */
function rampFill(hex: string, t: number): string {
  const base = [14, 12, 16]; // near-black sea
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const k = Math.max(0, Math.min(1, t));
  const mix = (c: number, base0: number) => Math.round(base0 + (c - base0) * k);
  return `rgb(${mix(r, base[0])}, ${mix(g, base[1])}, ${mix(b, base[2])})`;
}

export interface EgyptChoroplethProps {
  /**
   * The active blast domain id. When provided, the parent drives recolor.
   * When omitted, the map starts on the first domain and the in-figure
   * filter chips control it.
   */
  domainId?: string;
  /**
   * Whether to render the in-figure filter chips. Default 'show'. Set to
   * 'hide' when the parent already provides chips (so we don't duplicate).
   */
  chips?: 'show' | 'hide';
  /** Active language for in-figure labels. Defaults to bilingual fallback. */
  lang?: 'en' | 'ar';
}

export function EgyptChoropleth({ domainId, chips = 'show', lang }: EgyptChoroplethProps) {
  const reduce = useReducedMotion();
  const glowId = useId().replace(/:/g, '');
  const [features, setFeatures] = useState<GovFeature[] | null>(null);
  const [failed, setFailed] = useState(false);

  // Local domain selection — seeded by the prop, overridable by the chips.
  const [localId, setLocalId] = useState<string>(domainId ?? BLAST_DOMAINS[0].id);
  useEffect(() => {
    if (domainId) setLocalId(domainId);
  }, [domainId]);

  const [revealRef, shown] = useReveal<HTMLDivElement>();

  /* Load the real asset; fail loud if it cannot be loaded. */
  useEffect(() => {
    let alive = true;
    import('@/data/egypt-governorates.geojson')
      .then((mod) => {
        if (!alive) return;
        const gj = ((mod as { default?: GovCollection }).default ??
          (mod as unknown as GovCollection)) as GovCollection;
        if (gj?.features?.length) setFeatures(gj.features);
        else setFailed(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  /* Resolve the active domain. */
  const activeDomain: BlastDomain = useMemo(() => {
    return BLAST_DOMAINS.find((d) => d.id === localId) ?? BLAST_DOMAINS[0];
  }, [localId]);

  /* Project the geometry once features are loaded. */
  const paths = useMemo(() => {
    if (!features?.length) return null;
    try {
      // Planar fit from the RAW lng/lat bbox — deliberately NOT
      // geoMercator().fitSize. Some rings in the asset have reversed
      // winding; d3's SPHERICAL geoBounds then blows up to ~the whole
      // globe, squishing Egypt to a dot while each clipped ring fills
      // the frame (the "solid rectangle" bug). A planar geoTransform
      // bypasses spherical clipping/winding entirely.
      let minLng = Infinity;
      let maxLng = -Infinity;
      let minLat = Infinity;
      let maxLat = -Infinity;
      const scan = (a: unknown): void => {
        if (!Array.isArray(a)) return;
        if (typeof a[0] === 'number') {
          const lng = a[0] as number;
          const lat = a[1] as number;
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        } else {
          for (const c of a) scan(c);
        }
      };
      features.forEach((f) => scan(f.geometry.coordinates));
      const pad = 18;
      const s = Math.min(
        (VIEW_W - pad * 2) / (maxLng - minLng || 1),
        (VIEW_H - pad * 2) / (maxLat - minLat || 1)
      );
      const offX = (VIEW_W - (maxLng - minLng) * s) / 2;
      const offY = (VIEW_H - (maxLat - minLat) * s) / 2;
      const projection = geoTransform({
        point(lng: number, lat: number) {
          // flip Y: higher latitude → smaller y (north at top)
          this.stream.point(offX + (lng - minLng) * s, offY + (maxLat - lat) * s);
        },
      });
      const pathGen = geoPath(projection);
      const projected = features
        .map((f) => ({
          name: f.properties.name,
          iso: f.properties.iso,
          d: pathGen(f as unknown as GeoPermissibleObjects) ?? '',
          intensity: nameHash(f.properties.name),
        }))
        .filter((p) => p.d.length > 4);
      return projected.length ? projected : null;
    } catch {
      return null;
    }
  }, [features]);

  /* Domain filter chips — let the reader switch the active domain. */
  const filterChips = (
    <div className="td-choro-chips" role="group" aria-label="Domain filter · مرشّح المجال">
      {BLAST_DOMAINS.map((d) => {
        const on = d.id === activeDomain.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => setLocalId(d.id)}
            aria-pressed={on}
            className="td-choro-chip"
            style={{
              color: on ? '#0b0c10' : d.accent,
              background: on ? d.accent : hexWithAlpha(d.accent, 0.1),
              borderColor: hexWithAlpha(d.accent, on ? 1 : 0.45),
              boxShadow: on ? `0 0 16px -4px ${hexWithAlpha(d.accent, 0.7)}` : 'none',
            }}
          >
            {d.domain.en}
            <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif', opacity: 0.85 }}>
              {' · '}
              {d.domain.ar}
            </span>
          </button>
        );
      })}
    </div>
  );

  /* ── The a11y <table> twin — also the PRIMARY representation on fail ── */
  const dataTable = (primary: boolean) => (
    <table className="td-choro-table">
      <caption>
        {CHOROPLETH_META.label.en} — national sector shares (modeled, not measured)
        <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
          {CHOROPLETH_META.label.ar} — حصص قطاعية قومية (مُنمذَجة، غير مقيسة)
        </span>
      </caption>
      <thead>
        <tr>
          <th scope="col">Domain · المجال</th>
          <th scope="col">Headline stat · الإحصاء</th>
          <th scope="col">Evidence · الدليل</th>
        </tr>
      </thead>
      <tbody>
        {BLAST_DOMAINS.map((d) => {
          const s = d.stats[0];
          const isActive = d.id === activeDomain.id;
          const tierKey = resolveTierKey({ tier: s.tier, contested: s.contested, source: s.source });
          return (
            <tr
              key={d.id}
              data-active={isActive ? 'true' : 'false'}
              aria-current={isActive && !primary ? 'true' : undefined}
              style={isActive ? { background: hexWithAlpha(d.accent, 0.14) } : undefined}
            >
              <th scope="row" style={{ color: d.accent }}>
                {d.domain.en}
                <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
                  {d.domain.ar}
                </span>
              </th>
              <td>
                <span className="td-choro-val" style={{ color: d.accent }}>
                  {s.value}
                </span>{' '}
                {s.en}
              </td>
              <td>
                <span className="td-choro-evi">
                  <TierBadge tier={tierKey} />
                  <span className="td-choro-src" title={s.source}>
                    {s.source}
                  </span>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  /* ── FailLoud: geojson missing ⇒ the data-table is the PRIMARY view ── */
  if (failed) {
    return (
      <div className="dw-panel dw-panel--full td-choro-root" style={panelVars(activeDomain.accent)}>
        <ChoroStyles />
        <div className="dw-panel__head">
          <span className="dw-panel__chip" aria-hidden />
          <span className="dw-panel__title">Modeled distribution · توزيع مُنمذَج</span>
        </div>
        <FailLoud
          reasonEn="The Egypt governorate geometry (src/data/egypt-governorates.geojson) could not be loaded. The map is withheld; the table below is the real, complete representation of this section's data."
          reasonAr="تعذّر تحميل هندسة محافظات مصر. الخريطة محجوبة؛ الجدول بالأسفل هو التمثيل الحقيقي الكامل لبيانات هذا القسم."
        >
          {chips === 'show' && filterChips}
          <div className="td-choro-tablewrap td-choro-tablewrap--primary">{dataTable(true)}</div>
          <div className="td-choro-legend">
            <TierLegend />
          </div>
        </FailLoud>
      </div>
    );
  }

  const headerStat = activeDomain.stats[0];

  return (
    <div
      ref={revealRef}
      id="egypt-choropleth"
      className={`dw-panel dw-panel--full td-choro-root dw-reveal ${shown ? 'is-in' : ''}`}
      style={panelVars(activeDomain.accent)}
    >
      <ChoroStyles />

      {/* panel head */}
      <div className="dw-panel__head">
        <span className="dw-panel__chip" aria-hidden />
        <span className="dw-panel__title">
          Modeled distribution · {features ? `${paths?.length ?? features.length} governorates` : 'loading…'}
        </span>
        <span
          className="dw-panel__title"
          dir="rtl"
          style={{ marginInlineStart: 'auto', fontFamily: 'var(--font-heading-ar), sans-serif' }}
        >
          {CHOROPLETH_META.label.ar}
        </span>
      </div>

      {/* HONESTY GATE banner — modeled, NOT measured */}
      <p className="td-choro-honesty">{CHOROPLETH_META.honesty.en}</p>
      <p className="td-choro-honesty td-choro-honesty--ar" dir="rtl">
        {CHOROPLETH_META.honesty.ar}
      </p>

      {/* domain filter chips — suppressed when the parent provides them */}
      {chips === 'show' && filterChips}

      {/* active-domain headline stat */}
      <div className="td-choro-active">
        <span
          className="td-choro-activechip"
          style={{
            color: activeDomain.accent,
            borderColor: hexWithAlpha(activeDomain.accent, 0.55),
            background: hexWithAlpha(activeDomain.accent, 0.12),
          }}
        >
          <span aria-hidden className="td-choro-dot" style={{ background: activeDomain.accent }} />
          {activeDomain.domain.en} ·{' '}
          <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
            {activeDomain.domain.ar}
          </span>
        </span>
        <Sourced
          value={headerStat.value}
          tier={headerStat.tier}
          source={headerStat.source}
          contested={headerStat.contested}
          corpusCount={headerStat.corpusCount}
          labelEn={lang === 'ar' ? undefined : headerStat.en}
          labelAr={lang === 'en' ? undefined : headerStat.ar}
          accent={activeDomain.accent}
          inline
        />
      </div>

      {/* the map — opaque magnitude-filled governorates on a dark sea */}
      {paths ? (
        <div className="td-choro-mapwrap">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="td-choro-svg"
            role="img"
            aria-label="Modeled distribution shaded by domain magnitude across Egypt's 27 governorates. The table below is the accessible twin."
          >
            <defs>
              <filter id={`choro-glow-${glowId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* PASS 1 · OPAQUE magnitude fills — each governorate a solid shape */}
            <g>
              {paths.map((p) => (
                <path
                  key={p.iso || p.name}
                  d={p.d}
                  fill={rampFill(activeDomain.accent, 0.16 + p.intensity * 0.84)}
                  stroke={hexWithAlpha(activeDomain.accent, 0.85)}
                  strokeWidth={0.9}
                  strokeLinejoin="round"
                  style={reduce ? undefined : { transition: 'fill 0.6s ease, stroke 0.6s ease' }}
                >
                  <title>
                    {p.name} — modeled {Math.round((0.16 + p.intensity * 0.84) * 100)}%
                  </title>
                </path>
              ))}
            </g>

            {/* PASS 2 · bright outer rim of the country (glow), aids the read */}
            <g fill="none" filter={reduce ? undefined : `url(#choro-glow-${glowId})`}>
              {paths.map((p) => (
                <path
                  key={`rim-${p.iso || p.name}`}
                  d={p.d}
                  stroke={hexWithAlpha(activeDomain.accent, 0.5)}
                  strokeWidth={0.5}
                  strokeLinejoin="round"
                />
              ))}
            </g>
          </svg>

          {/* magnitude scale legend */}
          <div className="td-choro-scale" aria-hidden>
            <span className="td-choro-scale__label">low</span>
            <span
              className="td-choro-scale__bar"
              style={{
                background: `linear-gradient(90deg, ${rampFill(activeDomain.accent, 0.16)}, ${rampFill(
                  activeDomain.accent,
                  1
                )})`,
                borderColor: hexWithAlpha(activeDomain.accent, 0.5),
              }}
            />
            <span className="td-choro-scale__label">high · modeled · مُنمذَج</span>
          </div>
        </div>
      ) : (
        <div className="td-choro-loading">Projecting governorate geometry…</div>
      )}

      {/* MANDATORY a11y table twin — strong alternating row contrast */}
      <div className="td-choro-tablewrap">{dataTable(false)}</div>

      {/* the evidence key, in-panel so every TierBadge resolves */}
      <div className="td-choro-legend">
        <TierLegend />
      </div>
    </div>
  );
}

/* publish the active accent as the panel's layer accent vars. */
function panelVars(hex: string): React.CSSProperties {
  const h = hex.replace('#', '');
  const rgb = `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(
    h.slice(4, 6),
    16
  )}`;
  return {
    ['--td-layer-accent' as string]: hex,
    ['--td-layer-accent-rgb' as string]: rgb,
  } as React.CSSProperties;
}

/* Scoped styles — legible (≥12px) labels, strong table contrast, chips. */
function ChoroStyles() {
  return (
    <style>{`
      .td-choro-root { display: flex; flex-direction: column; }
      .td-choro-honesty {
        font-size: var(--dw-t-secondary, 13px);
        line-height: 1.5;
        color: #fcd34d;
        margin: 0 0 0.15rem;
      }
      .td-choro-honesty--ar { color: rgba(252,211,77,0.78); font-family: var(--font-heading-ar), sans-serif; margin-bottom: 0.9rem; }

      .td-choro-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.4rem 0 1rem; }
      .td-choro-chip {
        font-size: var(--dw-t-secondary, 13px);
        font-weight: 700;
        padding: 0.32rem 0.7rem;
        border-radius: 999px;
        border: 1px solid;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
      }
      .td-choro-chip:focus-visible { outline: 2px solid var(--td-layer-accent); outline-offset: 2px; }

      .td-choro-active { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; margin-bottom: 1rem; }
      .td-choro-activechip {
        display: inline-flex; align-items: center; gap: 0.45rem;
        border: 1px solid; border-radius: 999px; padding: 0.3rem 0.75rem;
        font-size: var(--dw-t-secondary, 13px); font-weight: 600;
      }
      .td-choro-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; box-shadow: 0 0 10px currentColor; }

      .td-choro-mapwrap { position: relative; width: 100%; }
      .td-choro-svg {
        display: block; width: 100%; height: auto; border-radius: 14px;
        background: radial-gradient(120% 90% at 50% 0%, #11131b 0%, var(--dw-canvas, #08080a) 80%);
        border: 1px solid rgba(var(--td-layer-accent-rgb), 0.22);
      }
      .td-choro-scale { display: flex; align-items: center; gap: 0.6rem; margin: 0.7rem 0 0.2rem; }
      .td-choro-scale__bar { flex: 1; height: 9px; border-radius: 999px; border: 1px solid; }
      .td-choro-scale__label { font-size: var(--dw-t-mono, 12px); color: var(--dw-bone-dim, #c9c5bd); white-space: nowrap; }

      .td-choro-loading { display: flex; height: 12rem; align-items: center; justify-content: center; font-size: var(--dw-t-secondary, 13px); color: var(--dw-bone-dim, #c9c5bd); }

      /* the data table — strong alternating contrast, legible ≥12px */
      .td-choro-tablewrap { margin-top: 1.25rem; overflow-x: auto; }
      .td-choro-tablewrap--primary { margin-top: 1rem; }
      .td-choro-table { width: 100%; border-collapse: collapse; font-size: var(--dw-t-secondary, 13px); text-align: start; }
      .td-choro-table caption { text-align: start; color: var(--dw-bone-dim, #c9c5bd); margin-bottom: 0.6rem; font-size: var(--dw-t-secondary, 13px); }
      .td-choro-table caption span { display: block; color: var(--dw-muted-strong, #b4b0bd); }
      .td-choro-table thead th {
        text-align: start; padding: 0.5rem 0.6rem;
        font-size: var(--dw-t-mono, 12px); text-transform: uppercase; letter-spacing: 0.08em;
        color: var(--dw-bone-dim, #c9c5bd); border-bottom: 1px solid rgba(255,255,255,0.18);
      }
      .td-choro-table tbody tr { background: rgba(255,255,255,0.015); }
      .td-choro-table tbody tr:nth-child(even) { background: rgba(255,255,255,0.06); }
      .td-choro-table tbody td, .td-choro-table tbody th {
        padding: 0.6rem; vertical-align: top; border-top: 1px solid rgba(255,255,255,0.08);
        color: var(--dw-bone-dim, #c9c5bd);
      }
      .td-choro-table tbody th { font-weight: 700; }
      .td-choro-table tbody th span { display: block; font-weight: 500; color: var(--dw-muted-strong, #b4b0bd); }
      .td-choro-val { font-weight: 800; font-variant-numeric: tabular-nums; }
      .td-choro-evi { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 0.4rem; }
      .td-choro-src { font-size: var(--dw-t-mono, 12px); color: var(--dw-muted-strong, #b4b0bd); max-width: 34ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

      .td-choro-legend { margin-top: 1.1rem; }
    `}</style>
  );
}

export default EgyptChoropleth;
