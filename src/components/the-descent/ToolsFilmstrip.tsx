'use client';
/* ═══════════════════════════════════════════════════════════════
 * M13 · climb-tools — THE VERIFICATION ARSENAL  (CALM / MAGAZINE)
 *
 * Rebuilt against the density critique:
 *   · ONE language at a time via a header EN⇄ع toggle (no line-by-line
 *     interleave); titles stay short.
 *   · FLAT collapsible rows (progressive disclosure) — no boxes-in-boxes.
 *     Collapsed = name + one-line "what it does" + live dot. Expand for
 *     benchmark, the (elevated) honest caveat, live count, guards.
 *   · Hierarchy by SIZE/WEIGHT, not colour: one cyan accent + white +
 *     slate-gray. Proportional sans body; monospace ONLY for d-values /
 *     endpoints / numbers.
 *
 * ONE LAW PRESERVED: cards 1 & 3 still fetch /api/search/evidence; every
 * figure routes through <Sourced>; unreachable index ⇒ [⚠ UNVERIFIED].
 * ═══════════════════════════════════════════════════════════════ */

import { Fragment, useEffect, useState } from 'react';
import {
  SECTION_COPY,
  VERIFICATION_TOOLS,
  type VerificationTool,
  type Tier,
} from './descent-data';
import { LayerTag } from './shared/LayerTag';
import { Sourced } from './shared/Sourced';
import { useReveal } from './dw/useReveal';

type Lang = 'en' | 'ar';
const CYAN = '#22d3ee';
const SLATE = '#06121A';

const PIPELINE: { en: string; ar: string }[] = [
  { en: 'RETRIEVE', ar: 'استرجاع' },
  { en: 'RELEVANCE', ar: 'صلة' },
  { en: 'CROSS-VERIFY', ar: 'تحقّق متقاطع' },
  { en: 'CITE', ar: 'استشهاد' },
  { en: 'CRITIQUE', ar: 'نقد' },
];

/* ── language toggle ── */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="tf-lang" role="group" aria-label="Language">
      <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * LIVE COUNT — fetch /api/search/evidence (logic unchanged), rendered
 * COMPACT through <Sourced> (One-Law).
 * ═══════════════════════════════════════════════════════════════ */
type LiveState = { phase: 'loading' } | { phase: 'ok'; count: number } | { phase: 'fail' };

function useEvidenceCount(query: string, enabled: boolean): LiveState {
  const [state, setState] = useState<LiveState>({ phase: 'loading' });
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    (async () => {
      try {
        const res = await fetch(`/api/search/evidence?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        if (!alive) return;
        if (!res.ok) { setState({ phase: 'fail' }); return; }
        const data: unknown = await res.json();
        if (!alive) return;
        const results =
          data && typeof data === 'object' && Array.isArray((data as { results?: unknown }).results)
            ? (data as { results: unknown[] }).results
            : null;
        if (!results || results.length === 0) { setState({ phase: 'fail' }); return; }
        setState({ phase: 'ok', count: results.length });
      } catch {
        if (alive) setState({ phase: 'fail' });
      } finally {
        clearTimeout(timer);
      }
    })();
    return () => { alive = false; clearTimeout(timer); controller.abort(); };
  }, [query, enabled]);
  return state;
}

function CompactLive({ state, lang }: { state: LiveState; lang: Lang }) {
  if (state.phase === 'loading') {
    return <span className="tf-live-mini" aria-live="polite"><i className="tf-dot" />{lang === 'en' ? 'querying live index…' : 'يستعلم الفهرس الحي…'}</span>;
  }
  if (state.phase === 'fail') {
    return (
      <Sourced value={lang === 'en' ? 'insufficient evidence' : 'أدلة غير كافية'} tier={'' as unknown as Tier} source="" accent={CYAN} inline />
    );
  }
  return (
    <Sourced value={lang === 'en' ? `${state.count} sources live` : `${state.count} مصدر حيّ`} tier={'A' as Tier}
      source="Live: GET /api/search/evidence (free-first evidence index)" accent={CYAN} inline />
  );
}

/* ═══════════════════════════════════════════════════════════════
 * INSTRUMENT ROW — flat, collapsible. Hierarchy by size/weight.
 * ═══════════════════════════════════════════════════════════════ */
function InstrumentRow({ tool, index, lang, live }: { tool: VerificationTool; index: number; lang: Lang; live?: LiveState }) {
  const [open, setOpen] = useState(false);
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  return (
    <div className={`tf-row ${open ? 'is-open' : ''}`} data-tool={tool.id}>
      <button type="button" className="tf-row-head" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="tf-row-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="tf-row-main" dir={rtl ? 'rtl' : 'ltr'} style={rtl ? { textAlign: 'right' } : undefined}>
          <span className="tf-row-name">{pick(tool.name)}</span>
          <span className="tf-row-preview">{pick(tool.strength)}</span>
        </span>
        <span className="tf-row-meta">
          {tool.live && <span className="tf-live-tag"><i className="tf-dot" />{lang === 'en' ? 'live' : 'حيّ'}</span>}
          <span className="tf-chev" aria-hidden>›</span>
        </span>
      </button>

      <div className="tf-row-detail">
        <div className="tf-row-detail-in" dir={rtl ? 'rtl' : 'ltr'} style={rtl ? { textAlign: 'right' } : undefined}>
          <div className="tf-field">
            <span className="tf-field-h">{lang === 'en' ? 'Benchmark' : 'المعيار'}</span>
            <p className="tf-field-body">{pick(tool.strength)}</p>
          </div>
          <div className="tf-field tf-caveat">
            <span className="tf-field-h tf-caveat-h">{lang === 'en' ? 'Honest caveat' : 'تنبيه أمين'}</span>
            <p className="tf-field-body tf-caveat-body">{pick(tool.caveat)}</p>
          </div>
          {tool.live && live && (
            <div className="tf-field">
              <span className="tf-field-h">{lang === 'en' ? 'Live now' : 'حيّ الآن'}</span>
              <div className="tf-live-row">
                <CompactLive state={live} lang={lang} />
              </div>
            </div>
          )}
          <div className="tf-field">
            <span className="tf-field-h">{lang === 'en' ? 'Guards against' : 'بتحمي من'}</span>
            <div className="tf-guards">
              {tool.layerGuarded.map((n) => <LayerTag key={n} n={n} small showAr={false} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── the claim's-journey pipeline (kept bold; single accent) ── */
function Pipeline({ lang }: { lang: Lang }) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`tf-pipe ${shown ? 'is-in' : ''}`}>
      <div className="tf-pipe-label">{lang === 'en' ? "A CLAIM'S JOURNEY" : 'مسار الادّعاء'}</div>
      <div className="tf-pipe-row">
        {PIPELINE.map((p, i) => (
          <Fragment key={p.en}>
            <div className="tf-node">
              <div className="tf-node-dot">{i + 1}</div>
              <div className="tf-node-label">{lang === 'en' ? p.en : p.ar}</div>
            </div>
            {i < PIPELINE.length - 1 && <div className="tf-conn" aria-hidden><span className="tf-pulse" style={{ animationDelay: `${i * 0.45}s` }} /></div>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * MAIN
 * ═══════════════════════════════════════════════════════════════ */
export function ToolsFilmstrip() {
  const c = SECTION_COPY.tools;
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  const aggregatorLive = useEvidenceCount('misinformation health Egypt', true);
  const claimMatchLive = useEvidenceCount('fact check claim verification Arabic', true);
  const [headRef, headShown] = useReveal<HTMLDivElement>();

  return (
    <section id={c.anchor} data-descent-section="M13" className="dw-climb tf" aria-label="The verification arsenal">
      <div className="tf-glow" aria-hidden />
      <div className="tf-grid-bg" aria-hidden />
      <div className="dw-side-label" style={{ left: 'clamp(12px, 3vw, 40px)', zIndex: 6 }}>The Arsenal · الترسانة — 13</div>

      <div ref={headRef} className={`tf-head ${headShown ? 'is-in' : ''}`}>
        <div className="tf-head-top">
          <div className="tf-kick">{c.kicker?.en} · <span dir="rtl">{c.kicker?.ar}</span></div>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <h2 className="tf-title" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.headline)}</h2>
        {c.sub && <p className="tf-sub" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.sub)}</p>}
        <Pipeline lang={lang} />
      </div>

      <div className="tf-arsenal">
        <div className="tf-arsenal-head">
          <span className="tf-arsenal-count">{VERIFICATION_TOOLS.length}</span>
          <span className="tf-arsenal-label">{lang === 'en' ? 'instruments — each names its own limit' : 'أداة — كل واحدة بتقول حدّها'}</span>
        </div>

        <div className="tf-rows">
          {VERIFICATION_TOOLS.map((tool, i) => (
            <InstrumentRow key={tool.id} tool={tool} index={i} lang={lang}
              live={tool.id === 'evidence-aggregator' ? aggregatorLive : tool.id === 'claim-match' ? claimMatchLive : undefined} />
          ))}
        </div>

        <p className="tf-closer" dir={rtl ? 'rtl' : 'ltr'}>
          {lang === 'en'
            ? <>These check a <b>claim</b>. Next — the part that changes the <b>person</b>.</>
            : <>دي بتفحص الادّعاء. بعدها — الجزء اللي بيغيّر الإنسان.</>}
        </p>
      </div>

      <style>{`
        .tf{position:relative;min-height:100vh;overflow:hidden;isolation:isolate;
          padding:clamp(72px,10vh,130px) clamp(18px,5vw,56px) clamp(64px,8vh,110px);background:${SLATE};
          font-family:var(--font-body,'Inter','Segoe UI',system-ui,sans-serif)}
        .tf-glow{position:absolute;inset-inline:0;top:0;height:56vh;z-index:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,${CYAN}1c,transparent 70%)}
        .tf-grid-bg{position:absolute;inset:0;z-index:0;opacity:.04;background-image:linear-gradient(#9fdfe0 1px,transparent 1px),linear-gradient(90deg,#9fdfe0 1px,transparent 1px);background-size:56px 56px;
          -webkit-mask-image:radial-gradient(ellipse 90% 70% at 50% 20%,#000,transparent 80%);mask-image:radial-gradient(ellipse 90% 70% at 50% 20%,#000,transparent 80%)}

        /* header */
        .tf-head{position:relative;z-index:3;max-width:880px;margin-inline:auto;text-align:center;
          opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1)}
        .tf-head.is-in{opacity:1;transform:none}
        .tf-head-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .tf-kick{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:4px;text-transform:uppercase;color:${CYAN}}
        .tf-kick span{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .tf-lang{display:inline-flex;border:1px solid ${CYAN}40;border-radius:999px;overflow:hidden;background:rgba(255,255,255,.03)}
        .tf-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:1px;padding:6px 14px;color:#8aa3a0;background:transparent;border:0;cursor:pointer;transition:all .2s ease}
        .tf-lang button[data-on="true"]{color:${SLATE};background:${CYAN};font-weight:700}
        .tf-title{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(32px,6vw,64px);line-height:1.0;margin-top:14px;
          background:linear-gradient(140deg,#eafffe,${CYAN});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 50px ${CYAN}2a}
        .tf-title[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .tf-sub{font-size:15px;line-height:1.6;color:#9fbcb9;margin-top:14px;max-width:60ch;margin-inline:auto}
        .tf-sub[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}

        /* pipeline */
        .tf-pipe{margin:clamp(30px,4.5vh,52px) auto 0;max-width:760px;opacity:0;transform:translateY(16px);transition:opacity .7s ease .1s,transform .7s ease .1s}
        .tf-pipe.is-in{opacity:1;transform:none}
        .tf-pipe-label{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:3px;color:#bfeeec;margin-bottom:18px}
        .tf-pipe-row{display:flex;align-items:flex-start;justify-content:space-between}
        .tf-node{display:flex;flex-direction:column;align-items:center;width:92px}
        .tf-node-dot{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:19px;color:${SLATE};
          background:radial-gradient(circle at 35% 30%,#bdfff7,${CYAN});box-shadow:0 0 0 4px ${CYAN}1f,0 0 22px ${CYAN}66}
        .tf-node-label{font-family:var(--font-mono,'Space Mono',monospace);font-size:10.5px;letter-spacing:.5px;color:#cfeeec;margin-top:10px;text-align:center}
        .tf-conn{flex:1;height:46px;position:relative;min-width:14px}
        .tf-conn::before{content:'';position:absolute;left:0;right:0;top:22px;height:2px;background:${CYAN}55;border-radius:2px}
        .tf-pulse{position:absolute;top:19.5px;left:0;width:7px;height:7px;border-radius:50%;background:#eafffe;box-shadow:0 0 10px ${CYAN};animation:tf-travel 2.4s ease-in-out infinite}
        @keyframes tf-travel{0%{left:0;opacity:0}15%{opacity:1}85%{opacity:1}100%{left:100%;opacity:0}}

        /* arsenal */
        .tf-arsenal{position:relative;z-index:3;max-width:860px;margin:clamp(40px,6vh,72px) auto 0}
        .tf-arsenal-head{display:flex;align-items:baseline;gap:12px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:6px}
        .tf-arsenal-count{font-family:'Anton',sans-serif;font-size:40px;line-height:.9;color:${CYAN}}
        .tf-arsenal-label{font-size:14px;color:#9fbcb9}

        /* rows — FLAT, collapsible */
        .tf-rows{display:flex;flex-direction:column}
        .tf-row{border-bottom:1px solid rgba(255,255,255,.07)}
        .tf-row-head{width:100%;display:flex;align-items:center;gap:16px;padding:18px 6px;background:transparent;border:0;cursor:pointer;text-align:left;transition:background .2s ease}
        .tf-row-head:hover{background:rgba(34,211,238,.04)}
        .tf-row-num{font-family:var(--font-mono,'Space Mono',monospace);font-size:13px;color:${CYAN}99;min-width:26px}
        .tf-row-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
        .tf-row-name{font-size:18px;font-weight:700;color:#eef6f5;line-height:1.25}
        .tf-row-preview{font-size:13.5px;color:#8aa3a0;line-height:1.45;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}
        .tf-row.is-open .tf-row-preview{display:none}
        .tf-row-meta{display:flex;align-items:center;gap:14px;flex-shrink:0}
        .tf-live-tag{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1px;color:${CYAN}}
        .tf-dot{width:7px;height:7px;border-radius:50%;background:${CYAN};box-shadow:0 0 8px ${CYAN};animation:tf-blink 1.5s ease-in-out infinite}
        @keyframes tf-blink{50%{opacity:.3}}
        .tf-chev{font-size:22px;color:#8aa3a0;transition:transform .3s ease;line-height:1}
        .tf-row.is-open .tf-chev{transform:rotate(90deg);color:${CYAN}}
        .tf-row-detail{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.16,1,.3,1)}
        .tf-row.is-open .tf-row-detail{grid-template-rows:1fr}
        .tf-row-detail-in{overflow:hidden}
        .tf-field{padding:0 6px 16px;display:flex;flex-direction:column;gap:5px}
        .tf-field:first-child{padding-top:2px}
        .tf-field-h{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${CYAN}aa}
        .tf-field-body{font-size:14.5px;line-height:1.6;color:#d6e6e4}
        .tf-caveat{border-left:2px solid #d9a04f66;padding-left:14px;margin-left:6px}
        .tf-caveat-h{color:#d9a04f}
        .tf-caveat-body{font-style:italic;color:#c9b79a}
        .tf-live-row{margin-top:2px}
        .tf-live-mini{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;color:#9fbcb9}
        .tf-guards{display:flex;flex-wrap:wrap;gap:7px;margin-top:3px}

        .tf-closer{margin-top:34px;text-align:center;font-size:clamp(15px,2vw,20px);color:#cfeeec;line-height:1.5}
        .tf-closer b{color:${CYAN};font-weight:700}
        .tf-closer[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}

        @media (max-width:600px){.tf-pipe-row{flex-wrap:wrap;justify-content:center;gap:14px}.tf-node{width:74px}.tf-conn{display:none}}
        @media (prefers-reduced-motion:reduce){.tf-pulse,.tf-dot{animation:none}.tf-head,.tf-pipe,.tf-row-detail,.tf-chev{transition:none}}
      `}</style>
    </section>
  );
}

export default ToolsFilmstrip;
