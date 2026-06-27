'use client';
/* ═══════════════════════════════════════════════════════════════
 * ArchitectsSection — id="layer-7" — THE ARCHITECTS (PEAK). You are
 * one lit node wired into a vast machine. Name-free.
 * Rebuilt: EN⇄ع toggle, balanced composition, the "you" node WIRED
 * into the machine (not a lonely dot), legible cards. Cinematic peak.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { DESCENT_CASES, STATS } from '../../descent-data';

type Lang = 'en' | 'ar';

const HEAD = {
  lead: { en: "You weren't one liar's target.", ar: 'إنت ماكنتش هدف كذّاب واحد.' },
  emph: { en: "You're inside a machine — built to keep you walking behind the screen.", ar: 'إنت جوّه ماكينة، مبنية تخلّيك ماشي ورا الشاشة.' },
};
const WORLD = {
  scope: { en: 'Worldwide', ar: 'عالميًا' },
  text: {
    en: 'Recommendation engines learned outrage = watch-time, and nudged millions toward extremism — for ad money.',
    ar: 'محرّكات ترشيح اكتشفت إن الغضب = وقت مشاهدة أطول، فدفعت الملايين للتطرّف — كله عشان الإعلانات.',
  },
};

/* a small wired constellation; the red node (index 2) is "you" */
const MNODES = [
  { x: 30, y: 40 }, { x: 90, y: 22 }, { x: 120, y: 70 }, { x: 186, y: 34 }, { x: 210, y: 84 }, { x: 64, y: 96 }, { x: 150, y: 112 },
];
const MEDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [2, 6], [5, 0], [6, 4]];
const YOU = 2;

export function ArchitectsSection() {
  const hogg = DESCENT_CASES.find((c) => c.id === 'hoggpool');
  const s = STATS.hoggPoolOfficial;
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);
  const eg = hogg ? { en: hogg.line.en, ar: hogg.line.ar } : { en: '', ar: '' };

  return (
    <section id="layer-7" data-descent-section="layer-7" className="dwa" aria-label="Layer 7 — The Architects">
      <div className="dwa-stage" aria-hidden>
        <div className="dwa-net" />
        <div className="dwa-glow" />
        <div className="dwa-ray" />
        <div className="dwa-num">−7</div>
      </div>

      <div className="dwa-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwa-in ${shown ? 'is-in' : ''}`}>
        <div className="dwa-k">الطبقة ٠٧ · The Architects</div>
        <div className="dwa-name" dir="rtl">المهندسون</div>

        <h2 className="dwa-head" dir={rtl ? 'rtl' : 'ltr'}>
          {pick(HEAD.lead)} <b>{pick(HEAD.emph)}</b>
        </h2>

        {/* you, wired into the machine */}
        <div className="dwa-machine" aria-hidden>
          <svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
            {MEDGES.map(([a, b], i) => (
              <line key={i} x1={MNODES[a].x} y1={MNODES[a].y} x2={MNODES[b].x} y2={MNODES[b].y}
                stroke={a === YOU || b === YOU ? '#FF5A5A' : '#AEB9C7'} strokeOpacity={a === YOU || b === YOU ? 0.7 : 0.32} strokeWidth={a === YOU || b === YOU ? 1.4 : 1} />
            ))}
            {MNODES.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={i === YOU ? 6 : 3.4}
                fill={i === YOU ? '#FF5A5A' : '#AEB9C7'} style={{ filter: `drop-shadow(0 0 ${i === YOU ? 8 : 4}px ${i === YOU ? '#ff3939' : '#AEB9C7'})` }} />
            ))}
          </svg>
          <span className="dwa-younode">{lang === 'en' ? 'you' : 'إنت'}</span>
        </div>

        <div className="dwa-ex" dir={rtl ? 'rtl' : 'ltr'}>
          <div className="dwa-x">
            <span className="dwa-scope">{pick(WORLD.scope)}</span>
            <p className="dwa-xt">{pick(WORLD.text)}</p>
          </div>
          <div className="dwa-x">
            <span className="dwa-scope">{lang === 'en' ? 'Egypt' : 'في مصر'}</span>
            <p className="dwa-xt">{pick(eg)}</p>
            <div className="dwa-stat"><Sourced value={s.value} tier={s.tier} source={s.source} accent="#AEB9C7" inline /></div>
          </div>
        </div>
      </div>

      <div className="dwa-bar dwa-top" aria-hidden /><div className="dwa-bar dwa-bot" aria-hidden />
      <div className="dwa-vig" aria-hidden />

      <style>{`
        .dwa{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#04060a;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwa-stage{position:absolute;inset:0;z-index:0;animation:dwa-kb 22s ease-in-out infinite alternate}
        @keyframes dwa-kb{from{transform:scale(1.02)}to{transform:scale(1.09)}}
        .dwa-net{position:absolute;left:-20%;right:-20%;bottom:-10%;top:20%;
          background-image:radial-gradient(circle,#AEB9C7 1.4px,transparent 1.6px);background-size:42px 42px;
          transform:perspective(560px) rotateX(58deg);transform-origin:bottom;opacity:.2;
          -webkit-mask-image:radial-gradient(ellipse at 50% 90%,#000 10%,transparent 72%);
          mask-image:radial-gradient(ellipse at 50% 90%,#000 10%,transparent 72%);animation:dwa-flow 9s linear infinite}
        @keyframes dwa-flow{to{background-position:0 42px}}
        .dwa-glow{position:absolute;width:70%;aspect-ratio:1;bottom:-26%;left:50%;transform:translateX(-50%);
          background:radial-gradient(circle,rgba(127,147,170,.25),transparent 64%);filter:blur(40px)}
        .dwa-ray{position:absolute;top:-20%;left:46%;width:30%;height:130%;transform:rotate(10deg);
          background:linear-gradient(100deg,transparent,rgba(195,206,219,.08) 50%,transparent);filter:blur(6px);animation:dwa-ray 9s ease-in-out infinite}
        @keyframes dwa-ray{50%{opacity:.5}}
        .dwa-num{position:absolute;right:-4%;top:48%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(280px,46vw,640px);line-height:.66;color:transparent;-webkit-text-stroke:2.5px rgba(174,185,199,.12)}

        .dwa-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;
          border:1px solid rgba(174,185,199,.4);border-radius:999px;overflow:hidden;background:rgba(0,0,0,.3)}
        .dwa-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#c3cedb;background:transparent;border:0;cursor:pointer}
        .dwa-lang button[data-on="true"]{color:#04060a;background:#cdd6e1;font-weight:700}

        .dwa-in{position:relative;z-index:5;width:100%;max-width:1000px;text-align:center;padding:0 5%;display:flex;
          flex-direction:column;align-items:center;opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwa-in.is-in{opacity:1;transform:none}
        .dwa-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#c3cedb}
        .dwa-name{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(24px,3.6vw,38px);color:#fff;margin-top:6px;text-shadow:0 0 24px rgba(174,185,199,.45)}
        .dwa-head{font-weight:800;font-size:clamp(20px,3.3vw,36px);color:#fff;margin:1.1rem auto 0;max-width:26ch;line-height:1.38;text-shadow:0 4px 30px #000}
        .dwa-head[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwa-head b{color:#dbe3ec}

        .dwa-machine{position:relative;width:min(320px,76vw);margin:clamp(16px,3vh,30px) auto}
        .dwa-machine svg{width:100%;height:auto;display:block}
        .dwa-younode{position:absolute;left:50%;top:50%;transform:translate(-50%,8px);font-family:var(--font-heading-ar),'Tajawal',sans-serif;
          font-size:13px;font-weight:800;color:#FFb3b3;text-shadow:0 0 10px #ff3939}

        .dwa-ex{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:900px;margin:0 auto;width:100%}
        .dwa-x{background:linear-gradient(160deg,rgba(16,20,28,.66),rgba(6,9,13,.5));backdrop-filter:blur(10px);
          border:1px solid rgba(174,185,199,.26);border-top:3px solid #AEB9C7;border-radius:16px;padding:16px;text-align:start}
        .dwa-scope{display:inline-block;font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:1.5px;
          text-transform:uppercase;color:#cdd6e1;font-weight:700;margin-bottom:8px}
        .dwa-xt{font-size:14px;line-height:1.6;color:#e8edf2}
        .dwa-ex[dir=rtl] .dwa-xt,.dwa-ex[dir=rtl] .dwa-scope{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwa-stat{margin-top:10px;display:flex}

        .dwa-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwa-top{top:0}.dwa-bot{bottom:0}
        .dwa-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 200px 50px rgba(0,0,0,.9)}
        @media (max-width:640px){.dwa-ex{grid-template-columns:1fr}.dwa-num{font-size:60vw}}
        @media (prefers-reduced-motion:reduce){.dwa-stage,.dwa-net,.dwa-ray{animation:none}.dwa-in{transition:none}}
      `}</style>
    </section>
  );
}
export default ArchitectsSection;
