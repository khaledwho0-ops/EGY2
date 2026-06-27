'use client';
/* ═══════════════════════════════════════════════════════════════
 * TimingScene — id="layer-4" — WEAPONIZED TIMING. A pre-recorded
 * "I was killed" video drops the moment doubt rises — recasting a
 * natural death as martyrdom. A cinematic timeline. Name-free.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { LAYER_DEFENSE_MAP, DESCENT_CASES } from '../../descent-data';

const AC = '#2EA8FF';

export function TimingScene() {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === 4);
  const cse = DESCENT_CASES.find((c) => c.layers.includes(4));
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  return (
    <section id="layer-4" data-descent-section="layer-4" className="dwt" aria-label="Layer 4 — Weaponized Timing">
      <div className="dwt-stage" aria-hidden>
        <div className="dwt-bg" />
        <div className="dwt-grid" />
        <div className="dwt-num">−4</div>
      </div>

      <div className="dwt-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwt-in ${shown ? 'is-in' : ''}`}>
        <div className="dwt-k">الطبقة ٠٤ · {entry?.layer.en}</div>
        <h2 className="dwt-name" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.layer)}</h2>
        <p className="dwt-beat" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.youBeat)}</p>

        {/* hero — the timeline: a natural death, then a timed release */}
        <div className="dwt-hero" aria-hidden>
          <svg viewBox="0 0 600 160" width="100%" height="100%">
            <line x1="20" y1="92" x2="580" y2="92" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            <line x1="20" y1="92" x2="580" y2="92" stroke={AC} strokeWidth="2.5" className="dwt-draw" />
            {/* event — natural death */}
            <circle cx="200" cy="92" r="7" fill="#fff" />
            <line x1="200" y1="92" x2="200" y2="52" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
            <text x="200" y="44" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">{lang === 'en' ? 'death (natural)' : 'وفاة طبيعية'}</text>
            {/* release — the pre-recorded video drops */}
            <circle cx="408" cy="92" r="9" fill={AC} className="dwt-ignite" style={{ filter: `drop-shadow(0 0 12px ${AC})` }} />
            <line x1="408" y1="92" x2="408" y2="132" stroke={AC} strokeWidth="1.5" opacity="0.6" />
            <text x="408" y="148" textAnchor="middle" fontSize="14" fontWeight="600" fill={AC}>{lang === 'en' ? '“I was killed” drops' : 'فيديو «أنا اتقتلت» بينزل'}</text>
            {/* the playhead */}
            <circle cx="20" cy="92" r="4" fill="#fff" className="dwt-head" />
          </svg>
        </div>

        <div className="dwt-q">
          <span>{lang === 'en' ? 'Why now?' : 'ليه دلوقتي؟'}</span>
          <span className="dwt-qsep" aria-hidden>·</span>
          <span>{lang === 'en' ? 'Who benefits?' : 'مين المستفيد؟'}</span>
        </div>

        {cse && <p className="dwt-line" dir={rtl ? 'rtl' : 'ltr'}>{pick(cse.line)}</p>}

        <div className="dwt-stats">
          {cse && <Sourced value={`Tier ${cse.tier}`} tier={cse.tier} source={cse.source} contested={cse.contested} accent={AC} inline />}
        </div>
      </div>

      <div className="dwt-bar dwt-top" aria-hidden /><div className="dwt-bar dwt-bot" aria-hidden />
      <div className="dwt-vig" aria-hidden />

      <style>{`
        .dwt{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#030810;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwt-stage{position:absolute;inset:0;z-index:0;animation:dwt-kb 22s ease-in-out infinite alternate}
        @keyframes dwt-kb{from{transform:scale(1.02)}to{transform:scale(1.08)}}
        .dwt-bg{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 44%,#062338 0%,#04121f 40%,#020810 78%)}
        .dwt-grid{position:absolute;inset:0;opacity:.05;background-image:linear-gradient(${AC} 1px,transparent 1px),linear-gradient(90deg,${AC} 1px,transparent 1px);background-size:50px 50px;
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,#000,transparent 78%);mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,#000,transparent 78%)}
        .dwt-num{position:absolute;left:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,50vw,700px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(46,168,255,.12)}
        .dwt-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid ${AC}66;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dwt-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#9fcdef;background:transparent;border:0;cursor:pointer}
        .dwt-lang button[data-on="true"]{color:#030810;background:${AC};font-weight:700}
        .dwt-in{position:relative;z-index:5;width:100%;max-width:1040px;text-align:center;padding:0 5%;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwt-in.is-in{opacity:1;transform:none}
        .dwt-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#7fc0ee}
        .dwt-name{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(38px,7.4vw,96px);line-height:.96;margin-top:8px;
          background:linear-gradient(140deg,#fff,${AC});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(46,168,255,.28)}
        .dwt-name[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwt-beat{font-size:clamp(16px,2.4vw,22px);color:#dceaf7;margin-top:14px;max-width:34ch;line-height:1.5}
        .dwt-beat[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwt-hero{width:min(620px,92vw);margin:clamp(18px,3vh,32px) auto 0}
        .dwt-hero svg{width:100%;height:auto;display:block}
        .dwt-draw{stroke-dasharray:560;stroke-dashoffset:560;transition:stroke-dashoffset 1.6s ease-in-out .2s}
        .dwt-in.is-in .dwt-draw{stroke-dashoffset:0}
        .dwt-ignite{opacity:0;transition:opacity .5s ease 1.4s}
        .dwt-in.is-in .dwt-ignite{opacity:1}
        .dwt-head{animation:dwt-sweep 4.5s ease-in-out infinite}
        @keyframes dwt-sweep{0%,100%{transform:translateX(0)}50%{transform:translateX(388px)}}
        .dwt-q{display:flex;align-items:center;gap:14px;justify-content:center;margin-top:clamp(16px,2.6vh,26px);
          font-weight:800;font-size:clamp(18px,2.8vw,30px);color:#fff}
        .dwt-q span[dir],.dwt-q{font-family:var(--font-heading-ar),'Tajawal',var(--font-body),sans-serif}
        .dwt-qsep{color:${AC}}
        .dwt-line{font-size:14.5px;line-height:1.6;color:#a9c0d4;margin-top:clamp(16px,2.4vh,24px);max-width:60ch}
        .dwt-line[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwt-stats{display:flex;flex-wrap:wrap;gap:14px 22px;justify-content:center;margin-top:14px;max-width:64ch}
        .dwt-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwt-top{top:0}.dwt-bot{bottom:0}
        .dwt-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 210px 56px rgba(0,0,0,.9)}
        @media (prefers-reduced-motion:reduce){.dwt-stage,.dwt-head{animation:none}.dwt-in,.dwt-draw,.dwt-ignite{transition:none}.dwt-in .dwt-draw{stroke-dashoffset:0}.dwt-in .dwt-ignite{opacity:1}}
      `}</style>
    </section>
  );
}
export default TimingScene;
