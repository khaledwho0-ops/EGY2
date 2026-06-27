'use client';
/* ═══════════════════════════════════════════════════════════════
 * BiasedLensScene — id="layer-2" — BIASED LENS / SURVIVORSHIP.
 * You only ever see the testimonials, never the deaths. An iceberg:
 * a bright tip above the waterline, a vast dark mass below. Name-free.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { LAYER_DEFENSE_MAP, DESCENT_CASES } from '../../descent-data';

const AC = '#F5A623';
const BUBBLES = [
  { l: '20%', d: '0s', u: '12s' }, { l: '38%', d: '2.6s', u: '14s' }, { l: '58%', d: '1.1s', u: '13s' },
  { l: '72%', d: '3.4s', u: '15s' }, { l: '86%', d: '1.8s', u: '11s' },
];

export function BiasedLensScene() {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === 2);
  const cse = DESCENT_CASES.find((c) => c.layers.includes(2));
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  return (
    <section id="layer-2" data-descent-section="layer-2" className="dwb" aria-label="Layer 2 — Biased Lens">
      <div className="dwb-stage" aria-hidden>
        <div className="dwb-bg" />
        <div className="dwb-num">−2</div>
        {BUBBLES.map((e, i) => (
          <span key={i} className="dwb-bub" style={{ left: e.l, animationDelay: e.d, animationDuration: e.u }} />
        ))}
      </div>

      <div className="dwb-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwb-in ${shown ? 'is-in' : ''}`}>
        <div className="dwb-k">الطبقة ٠٢ · {entry?.layer.en}</div>
        <h2 className="dwb-name" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.layer)}</h2>
        <p className="dwb-beat" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.youBeat)}</p>

        {/* hero — the iceberg: a tiny lit tip over a vast dark mass */}
        <div className="dwb-hero" aria-hidden>
          <svg viewBox="0 0 420 300" width="100%" height="100%">
            <line x1="0" y1="96" x2="420" y2="96" stroke={AC} strokeWidth="1.5" strokeDasharray="4 5" opacity="0.5" />
            {/* the tip — what you're shown */}
            <polygon points="210,28 168,96 252,96" fill={`${AC}cc`} stroke={AC} strokeWidth="2" style={{ filter: `drop-shadow(0 0 14px ${AC})` }} />
            {/* the mass — what's omitted (dominant) */}
            <polygon points="168,96 252,96 300,290 120,290" fill="rgba(180,150,60,0.08)" stroke={`${AC}55`} strokeWidth="1.5" />
          </svg>
          <div className="dwb-tip" dir={rtl ? 'rtl' : 'ltr'}>{lang === 'en' ? 'the testimonials' : 'الشهادات'}</div>
          <div className="dwb-mass" dir={rtl ? 'rtl' : 'ltr'}>{lang === 'en' ? 'the omitted deaths — the larger half' : 'الوفيات المحذوفة — النص الأكبر'}</div>
        </div>

        {cse && <p className="dwb-line" dir={rtl ? 'rtl' : 'ltr'}>{pick(cse.line)}</p>}

        <div className="dwb-stats">
          {cse && <Sourced value={`Tier ${cse.tier}`} tier={cse.tier} source={cse.source} contested={cse.contested} accent={AC} inline />}
        </div>
      </div>

      <div className="dwb-bar dwb-top" aria-hidden /><div className="dwb-bar dwb-bot" aria-hidden />
      <div className="dwb-vig" aria-hidden />

      <style>{`
        .dwb{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#0a0702;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwb-stage{position:absolute;inset:0;z-index:0;animation:dwb-kb 21s ease-in-out infinite alternate}
        @keyframes dwb-kb{from{transform:scale(1.02)}to{transform:scale(1.09)}}
        .dwb-bg{position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 18%,#3a2a08 0%,#1a1304 38%,#060402 78%)}
        .dwb-num{position:absolute;left:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,50vw,700px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(245,166,35,.12);animation:dwb-nf 14s ease-in-out infinite}
        @keyframes dwb-nf{50%{transform:translateY(-53%);opacity:.7}}
        .dwb-bub{position:absolute;bottom:2%;width:4px;height:4px;border-radius:50%;background:rgba(245,166,35,.5);box-shadow:0 0 8px ${AC};animation:dwb-rise linear infinite}
        @keyframes dwb-rise{0%{transform:translateY(20px);opacity:0}14%{opacity:.6}100%{transform:translateY(-300px);opacity:0}}
        .dwb-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid ${AC}66;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dwb-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#e7c98f;background:transparent;border:0;cursor:pointer}
        .dwb-lang button[data-on="true"]{color:#0a0702;background:${AC};font-weight:700}
        .dwb-in{position:relative;z-index:5;width:100%;max-width:1040px;text-align:center;padding:0 5%;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwb-in.is-in{opacity:1;transform:none}
        .dwb-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#f3c477}
        .dwb-name{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(40px,8vw,104px);line-height:.95;margin-top:8px;
          background:linear-gradient(140deg,#fff,${AC});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(245,166,35,.28)}
        .dwb-name[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwb-beat{font-size:clamp(16px,2.4vw,22px);color:#f3e6cf;margin-top:14px;max-width:32ch;line-height:1.5}
        .dwb-beat[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwb-hero{position:relative;width:min(420px,80vw);margin:clamp(20px,3vh,34px) auto 0}
        .dwb-hero svg{width:100%;height:auto;display:block}
        .dwb-tip{position:absolute;top:4%;left:50%;transform:translateX(-50%);font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;color:#ffd98c}
        .dwb-mass{position:absolute;bottom:8%;left:50%;transform:translateX(-50%);font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;color:#9a8a5a}
        .dwb-line{font-size:14.5px;line-height:1.6;color:#cdbf9a;margin-top:clamp(18px,3vh,28px);max-width:60ch}
        .dwb-line[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwb-stats{display:flex;flex-wrap:wrap;gap:14px 22px;justify-content:center;margin-top:16px;max-width:64ch}
        .dwb-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwb-top{top:0}.dwb-bot{bottom:0}
        .dwb-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 210px 56px rgba(0,0,0,.9)}
        @media (prefers-reduced-motion:reduce){.dwb-stage,.dwb-num,.dwb-bub{animation:none}.dwb-in{transition:none}}
      `}</style>
    </section>
  );
}
export default BiasedLensScene;
