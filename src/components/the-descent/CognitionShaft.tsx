'use client';
/* ═══════════════════════════════════════════════════════════════
 * CognitionShaft.tsx — M14 · climb-cognition  (CALM / MAGAZINE)
 * MOVEMENT TWO: HOW THINKING IS REBUILT.
 *
 * Rebuilt against the "boxes-in-boxes" critique:
 *   · FLAT rungs — one container each, no nested defense box / DefenseChip.
 *     Hierarchy by SIZE/WEIGHT: small struck deception → a PROMINENT
 *     "overwritten by" relationship → bold defense → its explanation →
 *     a quiet citation.
 *   · ONE language at a time (EN⇄ع toggle); no line-by-line interleave.
 *   · ≤3 colours: the rung's cyan→gold climb accent + white + gray.
 *     Proportional sans body; monospace only for labels/citations.
 *   · scroll-driven fill, @nivo radar, ladder spine, ONE-LAW <Sourced>,
 *     reduced-motion fallbacks — UNCHANGED.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ResponsiveRadar } from '@nivo/radar';

import {
  SECTION_COPY,
  LAYER_DEFENSE_MAP,
  INOCULATIONS,
  INOCULATION_CAVEAT,
  type LayerDefenseMap,
} from './descent-data';
import { theme } from './descent-theme';
import { OrbField } from './visual';
import { Sourced } from './shared/Sourced';
import { useReveal } from './dw/useReveal';
import { LayerLegend } from './dw/LayerLegend';

type Lang = 'en' | 'ar';
const CLIMB = theme('climb');
const RESOLVE = theme('enterprise');
const CYAN = CLIMB.accentA;
const GOLD = RESOLVE.accentA;
const CLIMB_BG = CLIMB.canvas;
const SHAFT_BG = CLIMB.ramp[2];
const RESOLVE_BG = RESOLVE.ramp[1];

function useClimbOrder(): LayerDefenseMap[] {
  return useMemo(() => [...LAYER_DEFENSE_MAP].sort((a, b) => b.n - a.n), []);
}

function rungColor(t: number): string {
  const hex = (col: string): [number, number, number] => [
    parseInt(col.slice(1, 3), 16), parseInt(col.slice(3, 5), 16), parseInt(col.slice(5, 7), 16),
  ];
  const a = hex(CYAN), b = hex(GOLD);
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
}

const arDigits = (s: string) => s.replace(/[0-9]/g, (d) => new Intl.NumberFormat('ar-EG').format(Number(d)));

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="cs-lang" role="group" aria-label="Language">
      <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
    </div>
  );
}

/* ── radar (logic unchanged) ── */
function DefenseRadar({ fill, rtl, animate }: { fill: number; rtl: boolean; animate: boolean }) {
  const climb = useClimbOrder();
  const ordered = rtl ? [...climb].reverse() : climb;
  const data = ordered.map((l, idx) => {
    const ascendIdx = rtl ? climb.length - 1 - idx : idx;
    const earned = Math.min(Math.max(fill - ascendIdx, 0), 1);
    return { axis: `L${l.n}`, defense: Math.round(earned * 100) };
  });
  const activeAxes = Math.round(Math.min(fill, 8));
  return (
    <div className="cs-radar relative h-[300px] sm:h-[350px] w-full" role="img"
      aria-label={rtl ? `رادار الدفاعات — ${arDigits(String(activeAxes))} من ٨` : `Defense radar — ${activeAxes} of 8`}>
      <ResponsiveRadar data={data} keys={['defense']} indexBy="axis" maxValue={100}
        margin={{ top: 46, right: 66, bottom: 38, left: 66 }} borderColor={CYAN} borderWidth={2.5}
        gridLabelOffset={20} gridShape="circular" gridLevels={4} dotSize={7} dotColor={CYAN}
        dotBorderColor={GOLD} dotBorderWidth={2} colors={[CYAN]} fillOpacity={0.26} blendMode="screen"
        motionConfig="gentle" isInteractive={false} animate={animate}
        theme={{ background: 'transparent', text: { fill: `rgba(${CLIMB.accentARGB},0.9)`, fontSize: 13, fontWeight: 700 },
          grid: { line: { stroke: `rgba(${CLIMB.accentARGB},0.18)`, strokeWidth: 1 } } }} />
    </div>
  );
}

/* ── ONE RUNG — flat, hierarchy by size/weight ── */
function Rung({ entry, index, total, earned, lang }: { entry: LayerDefenseMap; index: number; total: number; earned: boolean; lang: Lang }) {
  const t = total > 1 ? index / (total - 1) : 0;
  const accent = rungColor(t);
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  return (
    <div className="cs-rung" data-earned={earned} style={{ ['--ac' as string]: accent }} dir={rtl ? 'rtl' : 'ltr'}>
      <span className="cs-rung-node" aria-hidden />
      <div className="cs-rung-rail">
        <span className="cs-rung-n">+{entry.n}</span>
        <span className="cs-rung-layer">L{entry.n} · {pick(entry.layer)}</span>
      </div>
      <div className="cs-rung-body" style={rtl ? { textAlign: 'right' } : undefined}>
        <p className="cs-decep">
          <span className="cs-decep-h">{lang === 'en' ? 'The deception' : 'الخدعة'}</span>
          {pick(entry.youBeat)}
        </p>
        <div className="cs-over" aria-hidden>
          <span className="cs-over-line" />
          <span className="cs-over-tag">{earned ? (lang === 'en' ? '↓ overwritten by' : '↓ يُكتب فوقها') : (lang === 'en' ? '↓ overwrite it' : '↓ اكتب فوقها')}</span>
          <span className="cs-over-line" />
        </div>
        <p className="cs-def-name">{pick(entry.defense)}</p>
        <p className="cs-cog">{pick(entry.cognition)}</p>
        <p className="cs-cite">— {entry.cognitionSource}</p>
      </div>
    </div>
  );
}

export function CognitionShaft() {
  const c = SECTION_COPY.cognition;
  const climb = useClimbOrder();
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;
  const total = climb.length;
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  const sectionRef = useRef<HTMLElement | null>(null);
  const [fill, setFill] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [headRef, headShown] = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (!mounted) return;
    const isSmall = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
    if (reduced || isSmall) { setFill(total); return; }
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollable = Math.max(1, rect.height - vh);
      const p = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setFill(p * total);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [mounted, reduced, total]);

  const effectiveFill = mounted && !reduced ? fill : total;
  const overwrittenCount = mounted && !reduced ? Math.floor(effectiveFill + 1e-4) : total;
  const activeAxes = Math.round(Math.min(effectiveFill, 8));
  const ladderProgress = Math.min(effectiveFill / total, 1);

  return (
    <section ref={sectionRef} id={c.anchor} data-descent-section="M14" className="dw-climb cs"
      style={{ background: `linear-gradient(180deg, ${CLIMB_BG} 0%, ${SHAFT_BG} 45%, ${RESOLVE_BG} 100%)` }}>
      <OrbField zone="climb" count={4} parallax={0.35} opacity={0.5} />
      <div className="cs-veil" aria-hidden />

      <div className="cs-wrap">
        <div className="dw-side-label" style={{ left: 'clamp(12px, 3vw, 40px)', zIndex: 6 }}>COGNITION · الإدراك — 14</div>

        <header ref={headRef} className={`cs-head ${headShown ? 'is-in' : ''}`}>
          <div className="cs-head-top">
            <div className="cs-kick">{c.kicker?.en} · <span dir="rtl">{c.kicker?.ar}</span></div>
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          <h2 className="cs-title" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.headline)}</h2>
          <p className="cs-lead" dir={rtl ? 'rtl' : 'ltr'}>
            {lang === 'en'
              ? 'You climb the same shaft in reverse — +8 to +1 — and each rung’s technique overwrites the deception that dropped you.'
              : 'بتطلع نفس البئر بالعكس — من +٨ لـ+١ — وكل درجة تقنيتها بتكتب فوق الخدعة اللي وقّعتك.'}
          </p>
        </header>

        <div className="cs-grid">
          {/* the mirrored shaft */}
          <div className="cs-shaft">
            <div className="cs-ladder" aria-hidden>
              <div className="cs-ladder-track" />
              <div className="dw-ladder-fill cs-ladder-fill" style={{ transform: `scaleY(${ladderProgress})` }} />
            </div>
            <ol className="cs-rungs">
              {climb.map((entry, i) => (
                <li key={entry.n}><Rung entry={entry} index={i} total={climb.length} earned={i < overwrittenCount} lang={lang} /></li>
              ))}
            </ol>
          </div>

          {/* aside */}
          <aside className="cs-aside">
            <div className="cs-card cs-radar-card">
              <h3 className="cs-card-title">{lang === 'en' ? 'Your cognitive defenses' : 'دفاعاتك المعرفية'}</h3>
              <p className="cs-card-sub">
                {lang === 'en' ? <>Earned as you ascend — <b>{activeAxes} / 8</b> axes</> : <>بتتكسب وانت طالع — <b>{arDigits(String(activeAxes))} / ٨</b> محاور</>}
              </p>
              <DefenseRadar fill={effectiveFill} rtl={rtl} animate={mounted && !reduced} />
              <div className="cs-legend"><LayerLegend active={activeAxes > 0 ? 9 - activeAxes : null} /></div>
            </div>

            <div className="cs-card cs-arsenal">
              <h3 className="cs-card-title">{lang === 'en' ? 'Inoculation arsenal' : 'ترسانة التلقيح'}</h3>
              <ul className="cs-inoc" dir={rtl ? 'rtl' : 'ltr'}>
                {INOCULATIONS.map((i) => (
                  <li key={i.id} className="cs-inoc-row">
                    <span className="cs-inoc-name">{lang === 'en' ? i.name.en : i.name.ar}</span>
                    <Sourced value={lang === 'en' ? i.effect.en : i.effect.ar} tier="A" source={i.source} accent={GOLD} inline />
                  </li>
                ))}
              </ul>
              <div className="cs-caveat" dir={rtl ? 'rtl' : 'ltr'}>
                <span className="cs-caveat-h">{lang === 'en' ? '⚠ honest caveat' : '⚠ تنبيه أمين'}</span>
                <p className="cs-caveat-body">{lang === 'en' ? INOCULATION_CAVEAT.en : INOCULATION_CAVEAT.ar}</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="cs-foot" dir={rtl ? 'rtl' : 'ltr'}>
          {lang === 'en'
            ? 'Eight deceptions. Eight techniques. Each one names the exact bias it counters — never a generic “think critically.”'
            : 'ثماني خدع. ثماني تقنيات. كلٌّ منها يسمّي التحيّز اللي بيقاومه — مش «فكّر نقديًا» عامة.'}
        </footer>
      </div>

      <style>{`
        .cs{position:relative;overflow:hidden;isolation:isolate;font-family:var(--font-body,'Inter','Segoe UI',system-ui,sans-serif)}
        .cs-veil{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 90% 60% at 50% 0%,${CYAN}12,transparent 60%)}
        .cs-wrap{position:relative;z-index:2;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:clamp(72px,10vh,120px) clamp(18px,5vw,56px) clamp(64px,9vh,110px)}

        /* header */
        .cs-head{width:100%;max-width:1180px;margin-inline:auto;opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
        .cs-head.is-in{opacity:1;transform:none}
        .cs-head-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .cs-kick{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${CYAN}}
        .cs-kick span{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .cs-lang{display:inline-flex;border:1px solid ${CYAN}40;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.03)}
        .cs-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:6px 14px;color:#8aa3a0;background:transparent;border:0;cursor:pointer;transition:all .2s ease}
        .cs-lang button[data-on="true"]{color:#06121A;background:${CYAN};font-weight:700}
        .cs-title{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(30px,5.4vw,62px);line-height:1.0;margin-top:14px;max-width:20ch;
          background:linear-gradient(135deg,#eafffe,${CYAN} 55%,${GOLD});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 56px ${CYAN}26}
        .cs-title[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;margin-inline-start:auto}
        .cs-lead{font-size:15px;line-height:1.7;color:#a7c8c4;margin-top:16px;max-width:60ch}
        .cs-lead[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;margin-inline-start:auto}

        /* grid */
        .cs-grid{margin-top:clamp(36px,5vh,64px);width:100%;max-width:1180px;margin-inline:auto;display:grid;grid-template-columns:1fr minmax(310px,400px);gap:clamp(22px,3vw,48px);align-items:start}
        @media (max-width:1024px){.cs-grid{grid-template-columns:1fr}}

        /* ladder */
        .cs-shaft{position:relative}
        .cs-ladder{position:absolute;left:16px;top:8px;bottom:8px;width:3px;pointer-events:none}
        .cs-ladder-track{position:absolute;inset:0;background:rgba(255,255,255,.08);border-radius:999px}
        .cs-ladder-fill{position:absolute;inset:0;transform-origin:bottom;border-radius:999px;background:linear-gradient(to top,${CYAN},${GOLD});box-shadow:0 0 10px ${CYAN}66}
        .cs-rungs{position:relative;display:flex;flex-direction:column;gap:16px;padding-left:44px;list-style:none;margin:0}

        /* ── FLAT rung card ── */
        .cs-rung{position:relative;display:grid;grid-template-columns:128px 1fr;gap:18px;align-items:start;padding:20px 22px;border-radius:20px;
          background:linear-gradient(150deg,color-mix(in srgb,var(--ac) 10%,rgba(8,18,22,.62)),rgba(6,14,18,.46));
          border:1px solid color-mix(in srgb,var(--ac) 22%,transparent);
          box-shadow:0 20px 56px -46px var(--ac);backdrop-filter:blur(10px);transition:opacity .6s ease,border-color .6s ease;opacity:.6}
        .cs-rung[data-earned="true"]{opacity:1;border-color:color-mix(in srgb,var(--ac) 46%,transparent)}
        .cs-rung[dir=rtl]{grid-template-columns:1fr 128px}
        .cs-rung-node{position:absolute;left:-30px;top:28px;width:13px;height:13px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--ac));box-shadow:0 0 0 4px color-mix(in srgb,var(--ac) 20%,transparent),0 0 16px var(--ac)}
        .cs-rung[dir=rtl] .cs-rung-node{left:auto;right:-30px}
        .cs-rung-rail{display:flex;flex-direction:column;gap:6px}
        .cs-rung-n{font-family:'Anton',var(--font-heading-en),sans-serif;font-size:40px;line-height:.85;color:transparent;background:linear-gradient(160deg,#fff,var(--ac));-webkit-background-clip:text;background-clip:text}
        .cs-rung-layer{font-family:var(--font-mono,'Space Mono',monospace);font-size:10.5px;letter-spacing:.5px;color:color-mix(in srgb,var(--ac) 75%,#fff);line-height:1.4}
        .cs-rung[dir=rtl] .cs-rung-layer{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-size:12px}
        .cs-rung-body{min-width:0}
        .cs-decep{font-size:13.5px;line-height:1.55;color:#b9c7c5;transition:opacity .5s ease}
        .cs-decep-h{display:block;font-family:var(--font-mono,'Space Mono',monospace);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9aa8a6;opacity:.7;margin-bottom:3px}
        .cs-rung[dir=rtl] .cs-decep,.cs-rung[dir=rtl] .cs-cog{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .cs-rung[data-earned="true"] .cs-decep{opacity:.45;text-decoration:line-through;text-decoration-color:#9aa8a655}
        .cs-over{display:flex;align-items:center;gap:10px;margin:13px 0}
        .cs-over-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--ac) 55%,transparent),transparent)}
        .cs-over-tag{font-family:var(--font-mono,'Space Mono',monospace);font-size:11.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ac);white-space:nowrap;font-weight:700;text-shadow:0 0 12px color-mix(in srgb,var(--ac) 50%,transparent)}
        .cs-def-name{font-size:18px;font-weight:800;color:#fff;line-height:1.3}
        .cs-rung[dir=rtl] .cs-def-name{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .cs-cog{font-size:14px;line-height:1.65;color:#c4d6d3;margin-top:7px}
        .cs-cite{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;color:#7f9694;margin-top:9px;font-style:normal}

        /* aside cards */
        .cs-aside{position:sticky;top:88px;display:flex;flex-direction:column;gap:18px}
        @media (max-width:1024px){.cs-aside{position:static}}
        .cs-card{border-radius:22px;padding:22px;backdrop-filter:blur(14px);background:linear-gradient(160deg,rgba(14,28,32,.74),rgba(7,16,20,.56));border:1px solid ${CYAN}22;box-shadow:0 26px 64px -52px ${CYAN}}
        .cs-radar-card{background:linear-gradient(160deg,${CYAN}10,${GOLD}08 70%,rgba(7,16,20,.56));border-color:${CYAN}30}
        .cs-card-title{font-size:18px;font-weight:800;color:#fff}
        .cs-radar-card .cs-card-title{background:linear-gradient(120deg,${GOLD},#ffe9a8);-webkit-background-clip:text;background-clip:text;color:transparent}
        .cs-card-title[dir=rtl],.cs-arsenal .cs-card-title{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .cs-card-sub{font-size:13px;color:#9fc6c2;margin-top:6px}
        .cs-card-sub b{color:${GOLD};font-weight:800}
        .cs-legend{margin-top:14px;border-top:1px solid rgba(255,255,255,.07);padding-top:14px}

        .cs-inoc{list-style:none;margin:14px 0 0;padding:0;display:flex;flex-direction:column;gap:10px}
        .cs-inoc-row{display:flex;flex-direction:column;gap:5px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.06)}
        .cs-inoc-row:last-child{border-bottom:0;padding-bottom:0}
        .cs-inoc-name{font-size:14px;font-weight:700;color:${CYAN}}
        .cs-inoc-row[dir] .cs-inoc-name,.cs-inoc[dir=rtl] .cs-inoc-name{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .cs-caveat{margin-top:16px;border-left:3px solid ${GOLD}88;padding-left:13px}
        .cs-caveat-h{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#fbbf24}
        .cs-caveat-body{font-size:13px;line-height:1.7;color:#d8c39a;margin-top:6px;font-style:italic}
        .cs-caveat[dir=rtl] .cs-caveat-body{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-style:normal}

        .cs-foot{margin-top:clamp(40px,6vh,72px);max-width:62ch;margin-inline:auto;text-align:center;font-size:clamp(15px,1.9vw,19px);font-weight:600;color:${GOLD};line-height:1.6}
        .cs-foot[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}

        @media (max-width:560px){.cs-rung,.cs-rung[dir=rtl]{grid-template-columns:1fr;gap:10px}.cs-rungs{padding-left:32px}.cs-rung-rail{flex-direction:row;align-items:baseline;gap:12px}}
        @media (prefers-reduced-motion:reduce){.cs-head,.cs-rung,.cs-decep{transition:none}}
      `}</style>
    </section>
  );
}

export default CognitionShaft;
