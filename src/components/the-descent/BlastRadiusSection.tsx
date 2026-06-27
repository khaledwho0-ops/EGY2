'use client';
/* ═══════════════════════════════════════════════════════════════
 * M10 · descent-radius — THE BLAST RADIUS  (CALM / MAGAZINE)
 *
 * "It didn't stop at you." A central YOU avatar; FIVE domain nodes
 * (Medical · Religious/Mental · Economic · Political · Social) sized BY
 * their headline magnitude; a labelled causal chain You → Family →
 * Friends → Community; the active domain's sourced stats; the Egypt
 * 27-governorate choropleth recolors per active node.
 *
 * Rebuild against the density critique:
 *   · EN⇄ع toggle (no line-by-line interleave; titles stay short).
 *   · Each stat is a SINGLE flat row (Sourced already shows tier),
 *     no nested TierBadge stacking — the old all-domains grid is gone.
 *   · Hierarchy by size/weight; sans-serif body; monospace only for
 *     codes (d-values, %).
 *   · The map's own filter chips are suppressed in controlled mode so
 *     the section drives one source of truth.
 *
 * ONE LAW preserved: every figure renders through <Sourced>; the case's
 * source/tier comes from descent-data. Reveals via useReveal().
 * ═══════════════════════════════════════════════════════════════ */

import { useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  SECTION_COPY,
  BLAST_DOMAINS,
  RIPPLE_RINGS,
  STATS,
  DESCENT_LAYER_COLORS,
  type Stat,
} from './descent-data';
import { Sourced } from './shared/Sourced';
import { EgyptChoropleth } from './viz/EgyptChoropleth';
import { useReveal } from './dw/useReveal';
import { layerAccent } from './descent-theme';
import { TierLegend } from './dw/TierLegend';

type Lang = 'en' | 'ar';

const BONE = '#E8E2D6';
const FLOOR = DESCENT_LAYER_COLORS[8].bg;
const ARTERIAL = DESCENT_LAYER_COLORS[5].bg;

const DOMAIN_LAYER: Record<string, number> = {
  medical: 1, religious: 3, economic: 2, political: 4, social: 6,
};
function domainAccent(id: string): string {
  return layerAccent(DOMAIN_LAYER[id] ?? 1).hex;
}
function hexWithAlpha(hex: string, alpha: number): string {
  const a = Math.max(0, Math.min(1, alpha));
  const v = Math.round(a * 255).toString(16).padStart(2, '0');
  return `${hex}${v}`;
}
function statMagnitude(value: string): number {
  const m = value.replace(/[~,]/g, '').match(/[\d.]+/);
  if (!m) return 0.5;
  const n = parseFloat(m[0]);
  if (value.includes('%')) return Math.max(0.08, Math.min(1, n / 100));
  if (/M\b/i.test(value)) return Math.max(0.08, Math.min(1, n / 100));
  return Math.max(0.12, Math.min(1, n / 100));
}
function renderedStats(domainId: string): Stat[] {
  const d = BLAST_DOMAINS.find((x) => x.id === domainId);
  if (!d) return [];
  if (domainId === 'religious') return d.stats.filter((s) => s.id !== 'psychiatrists');
  if (domainId === 'medical') return [...d.stats, STATS.psychiatrists];
  return d.stats;
}

const RING_RADIUS = 178;

export function BlastRadiusSection() {
  const c = SECTION_COPY.radius;
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(BLAST_DOMAINS[0].id);
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  const [headRef, headIn] = useReveal<HTMLDivElement>();
  const [ringRef, ringIn] = useReveal<HTMLDivElement>();
  const [mapRef, mapIn] = useReveal<HTMLDivElement>();

  const activeDomain = useMemo(
    () => BLAST_DOMAINS.find((d) => d.id === activeId) ?? BLAST_DOMAINS[0],
    [activeId]
  );
  const activeAccent = domainAccent(activeDomain.id);

  return (
    <section
      id={c.anchor}
      data-descent-section="M10"
      className="dw-section blr"
      style={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${ARTERIAL} 0%, ${FLOOR} 70%)`,
        maxWidth: 'none',
      }}
    >
      <BlastStyles />

      <div className="dw-orb dw-orb--1" aria-hidden />
      <div className="dw-orb dw-orb--2" aria-hidden />
      <div className="dw-orb dw-orb--3" aria-hidden />

      <div
        className="dw-side-label"
        style={{ right: 'clamp(12px,3vw,40px)', left: 'auto', transform: 'translateY(-50%) rotate(0deg)' }}
        aria-hidden
      >
        10 · THE BLAST RADIUS · مدى الانفجار
      </div>

      <div className="blr-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div className="blr-wrap">
        {/* headline */}
        <div ref={headRef} className={`dw-reveal ${headIn ? 'is-in' : ''} blr-head`}>
          <div className="blr-depth" aria-label="You fell all eight layers — depth minus 8 of 8">
            <span className="blr-depth-lbl">
              {lang === 'en' ? 'You fell all eight layers' : 'نزلت الطبقات الثمانية'} · −8 / −8
            </span>
            <div className="blr-depth-ticks" aria-hidden>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="blr-depth-tick" data-in={headIn} style={{ transitionDelay: `${i * 70}ms` }} />
              ))}
            </div>
          </div>
          <h2 className="blr-title dw-gradient-text" dir={rtl ? 'rtl' : 'ltr'}>
            {pick(c.headline)}
          </h2>
        </div>

        {/* radial blast + causal chain */}
        <div ref={ringRef} className={`dw-reveal ${ringIn ? 'is-in' : ''} blr-blast`}>
          <div className="blr-desktop">
            <RippleChain accent={activeAccent} lang={lang} />

            <div className="blr-ring-stage" style={{ width: RING_RADIUS * 2 + 220, height: RING_RADIUS * 2 + 150 }}>
              <div className="blr-rings-bg">
                {[0.55, 0.8, 1].map((r) => (
                  <span
                    key={r}
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      border: '1px solid',
                      width: RING_RADIUS * 2 * r,
                      height: RING_RADIUS * 2 * r,
                      borderColor: hexWithAlpha(activeAccent, 0.16),
                      transition: 'border-color 0.5s ease',
                    }}
                  />
                ))}
              </div>

              <svg
                viewBox={`0 0 ${RING_RADIUS * 2 + 220} ${RING_RADIUS * 2 + 150}`}
                className="blr-spokes"
                aria-hidden
              >
                {BLAST_DOMAINS.map((d, i) => {
                  const angle = (-90 + (360 / BLAST_DOMAINS.length) * i) * (Math.PI / 180);
                  const cx0 = (RING_RADIUS * 2 + 220) / 2;
                  const cy0 = (RING_RADIUS * 2 + 150) / 2;
                  const x2 = cx0 + Math.cos(angle) * RING_RADIUS;
                  const y2 = cy0 + Math.sin(angle) * RING_RADIUS;
                  const acc = domainAccent(d.id);
                  const on = d.id === activeId;
                  return (
                    <line
                      key={d.id}
                      x1={cx0}
                      y1={cy0}
                      x2={x2}
                      y2={y2}
                      stroke={acc}
                      strokeOpacity={on ? 0.7 : 0.22}
                      strokeWidth={on ? 2 : 1}
                      style={{ transition: 'stroke-opacity 0.4s ease' }}
                    />
                  );
                })}
              </svg>

              <div className="blr-you-wrap">
                <YouAvatar accent={activeAccent} lang={lang} />
              </div>

              {BLAST_DOMAINS.map((d, i) => {
                const angle = (-90 + (360 / BLAST_DOMAINS.length) * i) * (Math.PI / 180);
                const cx = Math.cos(angle) * RING_RADIUS;
                const cy = Math.sin(angle) * RING_RADIUS;
                const isActive = d.id === activeId;
                const acc = domainAccent(d.id);
                const headline = d.stats[0];
                const mag = statMagnitude(headline.value);
                const size = 78 + mag * 54;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveId(d.id)}
                    onMouseEnter={() => setActiveId(d.id)}
                    aria-pressed={isActive}
                    aria-label={`${d.domain.en} — ${headline.value} ${headline.en}`}
                    className="blr-node"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      height: size,
                      width: size,
                      transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${ringIn ? 1 : 0.6})`,
                      opacity: ringIn ? 1 : 0,
                      transitionDelay: reduce ? '0s' : `${0.08 * i}s`,
                      transition:
                        'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease, box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease',
                      borderColor: hexWithAlpha(acc, isActive ? 0.95 : 0.45),
                      background: hexWithAlpha(acc, isActive ? 0.2 : 0.09),
                      boxShadow: isActive ? `0 0 38px -4px ${hexWithAlpha(acc, 0.65)}` : 'none',
                    }}
                  >
                    <span className="blr-node-name" style={{ color: acc }}>{pick(d.domain)}</span>
                    <span className="blr-node-val" style={{ color: acc }}>{headline.value}</span>
                  </button>
                );
              })}
            </div>

            <p className="blr-maglegend">
              {lang === 'en' ? 'Node size = headline magnitude' : 'حجم العقدة = حجم الإحصاء'}
            </p>
          </div>

          {/* mobile fallback */}
          <div className="blr-mobile">
            <ol className="blr-chain-mobile">
              {RIPPLE_RINGS.map((r, i) => (
                <li key={r.en}>
                  <span className="blr-chain-mobile-num">{i + 1}</span>
                  <span>{pick(r)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* filter chips */}
        <div className="blr-chips" role="group" aria-label="Domain filter">
          {BLAST_DOMAINS.map((d) => {
            const acc = domainAccent(d.id);
            const on = d.id === activeId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveId(d.id)}
                aria-pressed={on}
                className="blr-chip"
                style={{
                  color: on ? '#0b0c10' : acc,
                  background: on ? acc : hexWithAlpha(acc, 0.1),
                  borderColor: hexWithAlpha(acc, on ? 1 : 0.45),
                  boxShadow: on ? `0 0 16px -4px ${hexWithAlpha(acc, 0.7)}` : 'none',
                }}
              >
                {pick(d.domain)}
              </button>
            );
          })}
        </div>

        {/* active panel — flat: each stat is ONE row, no nested boxes */}
        <div
          className="blr-panel"
          style={{
            borderColor: hexWithAlpha(activeAccent, 0.48),
            background: `linear-gradient(160deg, ${hexWithAlpha(activeAccent, 0.1)}, rgba(20, 12, 20, 0.5))`,
            boxShadow: `0 30px 70px -50px ${activeAccent}`,
          }}
        >
          <div className="blr-panel-head" style={{ color: activeAccent }} dir={rtl ? 'rtl' : 'ltr'}>
            <span className="blr-panel-dot" style={{ background: activeAccent }} aria-hidden />
            {pick(activeDomain.domain)}
          </div>
          <ul className="blr-stats" dir={rtl ? 'rtl' : 'ltr'}>
            {renderedStats(activeDomain.id).map((s) => (
              <li key={s.id} className="blr-stat">
                <Sourced
                  value={s.value}
                  tier={s.tier}
                  source={s.source}
                  contested={s.contested}
                  corpusCount={s.corpusCount}
                  labelEn={lang === 'en' ? s.en : undefined}
                  labelAr={lang === 'ar' ? s.ar : undefined}
                  accent={activeAccent}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* tier legend */}
        <div className="blr-legend">
          <TierLegend />
        </div>

        {/* the flagship map (recolors per active node) — chips hidden because the section drives */}
        <div ref={mapRef} className={`dw-reveal ${mapIn ? 'is-in' : ''} blr-map`}>
          <EgyptChoropleth domainId={activeDomain.id} chips="hide" lang={lang} />
        </div>
      </div>
    </section>
  );
}

function YouAvatar({ accent, lang }: { accent: string; lang: Lang }) {
  const you = RIPPLE_RINGS[0];
  return (
    <div
      className="blr-you"
      style={{
        borderColor: hexWithAlpha(accent, 0.75),
        background: `radial-gradient(circle, ${hexWithAlpha(accent, 0.24)} 0%, rgba(5,3,4,0.9) 70%)`,
        boxShadow: `0 0 44px ${hexWithAlpha(accent, 0.38)}`,
      }}
    >
      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: BONE }}>{lang === 'en' ? you.en : you.ar}</span>
    </div>
  );
}

function RippleChain({ accent, lang }: { accent: string; lang: Lang }) {
  return (
    <ol className="blr-chain" aria-label="ripple chain">
      {RIPPLE_RINGS.map((r, i) => (
        <li key={r.en} className="blr-chain-item">
          <span
            className="blr-chain-node"
            style={{
              borderColor: hexWithAlpha(accent, 0.55),
              background: hexWithAlpha(accent, i === 0 ? 0.22 : 0.08),
              color: BONE,
            }}
          >
            <span className="blr-chain-num" style={{ color: accent }}>{i + 1}</span>
            <span className="blr-chain-label">{lang === 'en' ? r.en : r.ar}</span>
          </span>
          {i < RIPPLE_RINGS.length - 1 && (
            <span className="blr-chain-arrow" style={{ color: hexWithAlpha(accent, 0.8) }} aria-hidden>→</span>
          )}
        </li>
      ))}
    </ol>
  );
}

function BlastStyles() {
  return (
    <style>{`
      .blr { position: relative; overflow: hidden; font-family: var(--font-body,'Inter',system-ui,sans-serif); }
      .blr-wrap { position: relative; z-index: 10; margin: 0 auto; width: 100%; max-width: 72rem;
        padding: clamp(72px,9vh,110px) 1rem clamp(56px,7vh,84px); }

      .blr-lang { position: absolute; top: clamp(20px,3vh,32px); right: clamp(16px,4vw,40px); z-index: 9;
        display: inline-flex; border: 1px solid rgba(255,73,216,0.4); border-radius: 999px; overflow: hidden;
        background: rgba(0,0,0,0.4); }
      .blr-lang button { font-family: var(--font-mono,'Space Mono',monospace); font-size: 12px;
        padding: 5px 13px; color: #d4a3c5; background: transparent; border: 0; cursor: pointer; transition: all .2s ease; }
      .blr-lang button[data-on="true"] { color: #1a0510; background: #FF49D8; font-weight: 700; }

      .blr-head { text-align: center; }
      .blr-depth { display: flex; flex-direction: column; align-items: center; gap: 9px; margin-bottom: 1.3rem; }
      .blr-depth-lbl { font-family: var(--font-mono,'Space Mono',monospace); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #b8a8b2; }
      .blr-depth-ticks { display: flex; gap: 6px; }
      .blr-depth-tick { width: 26px; height: 4px; border-radius: 999px; background: rgba(255,255,255,0.12); opacity: 0; transition: opacity .45s ease, background .45s ease; }
      .blr-depth-tick[data-in="true"] { opacity: 1; background: linear-gradient(90deg, #FF2E9A, #F0C030); box-shadow: 0 0 8px rgba(255,46,154,0.5); }
      .blr-title { font-family: 'Anton', var(--font-heading-en), sans-serif; font-weight: 400;
        font-size: clamp(28px, 5vw, 60px); line-height: 1.05; max-width: 18ch; margin: 0 auto;
        background: linear-gradient(135deg, #ffe5f0, #FF49D8 55%, #ff9472);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        text-shadow: 0 0 60px rgba(255, 73, 216, 0.22); }
      .blr-title[dir=rtl] { font-family: var(--font-heading-ar), 'Tajawal', sans-serif; font-weight: 900; }

      .blr-blast { position: relative; margin-top: clamp(30px, 4vh, 56px); }
      .blr-mobile { display: none; }
      @media (max-width: 767px) {
        .blr-desktop { display: none; }
        .blr-mobile { display: block; }
      }

      .blr-ring-stage { position: relative; margin: 0 auto; }
      .blr-rings-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
      .blr-spokes { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
      .blr-you-wrap { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      .blr-you { position: relative; z-index: 10; display: flex; height: 116px; width: 116px;
        flex-direction: column; align-items: center; justify-content: center;
        border-radius: 50%; border: 2px solid;
        transition: border-color 0.5s ease, box-shadow 0.5s ease, background 0.5s ease; }

      .blr-node { display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; border-radius: 50%; outline: none; cursor: pointer; padding: 0.4rem;
        border: 1px solid; backdrop-filter: blur(10px); }
      .blr-node:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
      .blr-node-name { font-size: 13px; font-weight: 700; line-height: 1.15; }
      .blr-node-val { margin-top: 3px; font-size: 14px; font-weight: 800; font-variant-numeric: tabular-nums; letter-spacing: -.01em; }

      .blr-maglegend { text-align: center; margin-top: 1.3rem; font-size: 12px; color: #9a8888;
        font-family: var(--font-mono,'Space Mono',monospace); letter-spacing: .04em; }

      .blr-chain { display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
        gap: 0.4rem; margin: 0 0 1.5rem; padding: 0; list-style: none; }
      .blr-chain-item { display: inline-flex; align-items: center; gap: 0.4rem; }
      .blr-chain-node { display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid;
        border-radius: 999px; padding: 0.4rem 0.9rem; transition: border-color 0.5s ease, background 0.5s ease; }
      .blr-chain-num { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; }
      .blr-chain-label { font-size: 13px; font-weight: 600; }
      .blr-chain-arrow { font-size: 1.15rem; font-weight: 700; }

      .blr-chain-mobile { list-style: none; margin: 1rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
      .blr-chain-mobile li { display: flex; align-items: center; gap: 0.6rem; font-size: 13px; color: #c9c5bd; }
      .blr-chain-mobile-num { display: inline-flex; align-items: center; justify-content: center;
        width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25);
        font-size: 12px; font-weight: 700; }

      .blr-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 2rem; }
      .blr-chip { font-size: 13px; font-weight: 700; padding: 0.36rem 0.9rem; border-radius: 999px;
        border: 1px solid; cursor: pointer; transition: all 0.2s ease;
        font-family: var(--font-body,'Inter',system-ui,sans-serif); }
      .blr-chip:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }

      .blr-panel { margin: 1.5rem auto 0; max-width: 48rem; border: 1px solid; border-radius: 22px;
        padding: 1.5rem 1.75rem; backdrop-filter: blur(14px); transition: all 0.5s ease; }
      .blr-panel-head { display: flex; align-items: center; gap: 0.55rem;
        font-family: var(--font-mono,'Space Mono',monospace); font-size: 13px; font-weight: 700;
        letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.15rem; }
      .blr-panel-dot { width: 9px; height: 9px; border-radius: 50%; box-shadow: 0 0 12px currentColor; }
      .blr-stats { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
      .blr-stat { padding-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
      .blr-stat:last-child { padding-bottom: 0; border-bottom: 0; }

      .blr-legend { margin-top: 1.5rem; max-width: 40rem; }
      .blr-map { margin-top: 2.75rem; }
    `}</style>
  );
}

export default BlastRadiusSection;
