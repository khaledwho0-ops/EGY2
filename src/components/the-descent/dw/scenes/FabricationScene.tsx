'use client';
/* ═══════════════════════════════════════════════════════════════
 * FabricationScene — id="layer-1" — ABSOLUTE FABRICATION (cinematic).
 * A cure conjured from nothing: a citation chain that ends at a source
 * that was never there. Name-free. One-Law via <Sourced>.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { LAYER_DEFENSE_MAP, DESCENT_CASES, STATS } from '../../descent-data';

const AC = '#FF4D4D';
const EMBERS = [
  { l: '14%', d: '0s', u: '11s' }, { l: '30%', d: '2.4s', u: '13s' }, { l: '46%', d: '1s', u: '12s' },
  { l: '62%', d: '3.2s', u: '14s' }, { l: '80%', d: '1.6s', u: '10s' }, { l: '90%', d: '4s', u: '15s' },
];

export function FabricationScene() {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === 1);
  const cse = DESCENT_CASES.find((c) => c.layers.includes(1));
  const pk = STATS.curcuminPackages;
  const fr = STATS.corpusFrauds;
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  return (
    <section id="layer-1" data-descent-section="layer-1" className="dwf" aria-label="Layer 1 — Absolute Fabrication">
      <div className="dwf-stage" aria-hidden>
        <div className="dwf-bg" />
        <div className="dwf-num">−1</div>
        {EMBERS.map((e, i) => (
          <span key={i} className="dwf-ember" style={{ left: e.l, animationDelay: e.d, animationDuration: e.u }} />
        ))}
      </div>

      <div className="dwf-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwf-in ${shown ? 'is-in' : ''}`}>
        <div className="dwf-k">الطبقة ٠١ · {entry?.layer.en}</div>
        <h2 className="dwf-name" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.layer)}</h2>
        <p className="dwf-beat" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.youBeat)}</p>

        {/* hero — the citation chain that ends at a void */}
        <div className="dwf-hero" aria-hidden>
          <svg viewBox="0 0 540 90" width="100%" height="100%">
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <line x1={56 + i * 120} y1={45} x2={176 + i * 120} y2={45} stroke={AC} strokeWidth="2.4" strokeDasharray="6 5" opacity="0.85" />
                <circle cx={56 + i * 120} cy={45} r={14} fill="rgba(255,77,77,0.08)" stroke={AC} strokeWidth="2" />
                <text x={56 + i * 120} y={50} textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ffd2d2">{i + 1}</text>
              </g>
            ))}
            <g style={{ filter: `drop-shadow(0 0 10px ${AC})` }}>
              <circle cx={500} cy={45} r={18} fill="none" stroke={AC} strokeWidth="2.6" strokeDasharray="3 6" />
              <line x1={489} y1={34} x2={511} y2={56} stroke={AC} strokeWidth="2.6" />
              <line x1={511} y1={34} x2={489} y2={56} stroke={AC} strokeWidth="2.6" />
            </g>
          </svg>
          <div className="dwf-void">{lang === 'en' ? '…the chain ends at a source that was never there' : '…السلسلة بتنتهي عند مصدر مكنش موجود أصلًا'}</div>
        </div>

        {cse && <p className="dwf-line" dir={rtl ? 'rtl' : 'ltr'}>{pick(cse.line)}</p>}

        <div className="dwf-stats">
          {pk && <Sourced value={pk.value} tier={pk.tier} source={pk.source} accent={AC} inline />}
          {fr && <Sourced value={fr.value} tier={fr.tier} source={fr.source} corpusCount={fr.corpusCount} accent={AC} inline />}
          {cse && <Sourced value={`Tier ${cse.tier}`} tier={cse.tier} source={cse.source} accent={AC} inline />}
        </div>
      </div>

      <div className="dwf-bar dwf-top" aria-hidden /><div className="dwf-bar dwf-bot" aria-hidden />
      <div className="dwf-vig" aria-hidden />

      <style>{`
        .dwf{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#0a0303;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwf-stage{position:absolute;inset:0;z-index:0;animation:dwf-kb 20s ease-in-out infinite alternate}
        @keyframes dwf-kb{from{transform:scale(1.02)}to{transform:scale(1.1)}}
        .dwf-bg{position:absolute;inset:0;background:radial-gradient(125% 100% at 50% 44%,#3a0b0b 0%,#1a0606 40%,#070202 76%)}
        .dwf-num{position:absolute;right:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,50vw,700px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(255,77,77,.12);animation:dwf-nf 13s ease-in-out infinite}
        @keyframes dwf-nf{50%{transform:translateY(-53%);opacity:.7}}
        .dwf-ember{position:absolute;bottom:4%;width:3px;height:3px;border-radius:50%;background:#ffb0b0;box-shadow:0 0 8px #ff5a5a;animation:dwf-rise linear infinite}
        @keyframes dwf-rise{0%{transform:translateY(20px);opacity:0}12%{opacity:.8}100%{transform:translateY(-280px);opacity:0}}
        .dwf-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid ${AC}66;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dwf-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#e7a3a3;background:transparent;border:0;cursor:pointer}
        .dwf-lang button[data-on="true"]{color:#0a0303;background:${AC};font-weight:700}
        .dwf-in{position:relative;z-index:5;width:100%;max-width:1040px;text-align:center;padding:0 5%;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwf-in.is-in{opacity:1;transform:none}
        .dwf-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#ff8f8f}
        .dwf-name{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(40px,8vw,104px);line-height:.95;margin-top:8px;
          background:linear-gradient(140deg,#fff,${AC});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(255,77,77,.3)}
        .dwf-name[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwf-beat{font-size:clamp(16px,2.4vw,22px);color:#f3dada;margin-top:14px;max-width:30ch;line-height:1.5}
        .dwf-beat[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwf-hero{width:min(560px,86vw);margin:clamp(22px,4vh,40px) auto 0}
        .dwf-hero svg{width:100%;height:auto;display:block}
        .dwf-void{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:1px;color:#ff9a9a;margin-top:10px}
        .dwf-line{font-size:14.5px;line-height:1.6;color:#cdbaba;margin-top:clamp(20px,3vh,30px);max-width:60ch}
        .dwf-line[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwf-stats{display:flex;flex-wrap:wrap;gap:14px 22px;justify-content:center;margin-top:16px;max-width:64ch}
        .dwf-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwf-top{top:0}.dwf-bot{bottom:0}
        .dwf-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 210px 56px rgba(0,0,0,.9)}
        @media (prefers-reduced-motion:reduce){.dwf-stage,.dwf-num,.dwf-ember{animation:none}.dwf-in{transition:none}}
      `}</style>
    </section>
  );
}
export default FabricationScene;
