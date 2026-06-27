'use client';
/* ═══════════════════════════════════════════════════════════════
 * UnknownScene — id="layer-8" — THE UNKNOWN. Some of it, honestly, we
 * don't know — and the liar exploits exactly that gap. A confidence
 * band that never resolves to 0% or 100%. Calibrated uncertainty.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { LAYER_DEFENSE_MAP, DESCENT_CASES } from '../../descent-data';

const AC = '#DAD6CC';
const FOG = [
  { l: '14%', t: '30%', d: '0s', u: '16s' }, { l: '64%', t: '24%', d: '3s', u: '20s' },
  { l: '40%', t: '60%', d: '5s', u: '18s' }, { l: '80%', t: '56%', d: '7s', u: '22s' },
];

export function UnknownScene() {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === 8);
  const cse = DESCENT_CASES.find((c) => c.layers.includes(8));
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');
  const calibrated = !!(cse && (cse.unverified || cse.contested));

  return (
    <section id="layer-8" data-descent-section="layer-8" className="dwu" aria-label="Layer 8 — The Unknown">
      <div className="dwu-stage" aria-hidden>
        <div className="dwu-bg" />
        <div className="dwu-num">−8</div>
        {FOG.map((f, i) => (
          <span key={i} className="dwu-fog" style={{ left: f.l, top: f.t, animationDelay: f.d, animationDuration: f.u }} />
        ))}
      </div>

      <div className="dwu-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwu-in ${shown ? 'is-in' : ''}`}>
        <div className="dwu-k">الطبقة ٠٨ · {entry?.layer.en}</div>
        <h2 className="dwu-name" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.layer)}</h2>
        <p className="dwu-beat" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.youBeat)}</p>

        {/* hero — a confidence band that never resolves */}
        <div className="dwu-hero" aria-hidden>
          <div className="dwu-poles" dir={rtl ? 'rtl' : 'ltr'}>
            <span>{lang === 'en' ? '0% — impossible to assert' : '٠٪ — يستحيل الجزم'}</span>
            <span>{lang === 'en' ? '100% — refused' : '١٠٠٪ — مرفوض'}</span>
          </div>
          <div className="dwu-track">
            <div className="dwu-band" />
            <div className="dwu-needle"><span /></div>
          </div>
          <div className="dwu-mid" dir={rtl ? 'rtl' : 'ltr'}>
            {lang === 'en' ? 'the needle never reaches certainty' : 'المؤشّر مبيوصلش لليقين أبدًا'}
          </div>
        </div>

        {cse && <p className="dwu-line" dir={rtl ? 'rtl' : 'ltr'}>{pick(cse.line)}</p>}

        {calibrated && (
          <p className="dwu-cal" dir={rtl ? 'rtl' : 'ltr'}>
            {lang === 'en'
              ? 'Held as calibrated uncertainty — neither asserted nor denied.'
              : 'مُمسَك كشكٍّ مُعايَر — لا يُؤكَّد ولا يُنفى.'}
          </p>
        )}

        <div className="dwu-stats">
          {cse && <Sourced value={cse.unverified ? 'UNVERIFIED' : `Tier ${cse.tier}`} tier={cse.tier} source={cse.source} contested={cse.contested} accent={AC} inline />}
        </div>
      </div>

      <div className="dwu-bar dwu-top" aria-hidden /><div className="dwu-bar dwu-bot" aria-hidden />
      <div className="dwu-vig" aria-hidden />

      <style>{`
        .dwu{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#050607;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwu-stage{position:absolute;inset:0;z-index:0;animation:dwu-kb 24s ease-in-out infinite alternate}
        @keyframes dwu-kb{from{transform:scale(1.02)}to{transform:scale(1.07)}}
        .dwu-bg{position:absolute;inset:0;background:radial-gradient(110% 80% at 50% 46%,#1a1f24 0%,#0c0f12 42%,#040506 80%)}
        .dwu-num{position:absolute;right:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,50vw,700px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(218,214,204,.1)}
        .dwu-fog{position:absolute;width:34vw;height:34vw;border-radius:50%;background:radial-gradient(circle,rgba(218,214,204,.06),transparent 64%);
          filter:blur(40px);animation:dwu-drift linear infinite}
        @keyframes dwu-drift{0%{transform:translate(0,0)}50%{transform:translate(4vw,-3vw)}100%{transform:translate(0,0)}}
        .dwu-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid ${AC}55;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dwu-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#b9b6ad;background:transparent;border:0;cursor:pointer}
        .dwu-lang button[data-on="true"]{color:#050607;background:${AC};font-weight:700}
        .dwu-in{position:relative;z-index:5;width:100%;max-width:1040px;text-align:center;padding:0 5%;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwu-in.is-in{opacity:1;transform:none}
        .dwu-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#b9b6ad}
        .dwu-name{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(38px,7.4vw,96px);line-height:.96;margin-top:8px;
          background:linear-gradient(140deg,#fff,${AC});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(218,214,204,.22)}
        .dwu-name[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwu-beat{font-size:clamp(16px,2.4vw,22px);color:#dcd9d0;margin-top:14px;max-width:34ch;line-height:1.5}
        .dwu-beat[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwu-hero{width:min(560px,88vw);margin:clamp(20px,3.4vh,38px) auto 0}
        .dwu-poles{display:flex;justify-content:space-between;font-family:var(--font-mono,'Space Mono',monospace);font-size:11.5px;color:#9a978e}
        .dwu-track{position:relative;height:18px;margin:10px 0;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(218,214,204,.18)}
        .dwu-band{position:absolute;left:30%;right:30%;top:0;bottom:0;border-radius:999px;background:linear-gradient(90deg,transparent,${AC}3a,transparent)}
        .dwu-needle{position:absolute;top:-7px;bottom:-7px;left:50%;width:3px;animation:dwu-osc 6s ease-in-out infinite}
        .dwu-needle span{display:block;width:3px;height:100%;border-radius:3px;background:${AC};box-shadow:0 0 14px ${AC}}
        @keyframes dwu-osc{0%,100%{left:38%}50%{left:62%}}
        .dwu-mid{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:1px;color:#a7a499;margin-top:8px}
        .dwu-line{font-size:14.5px;line-height:1.6;color:#b7b4ab;margin-top:clamp(18px,3vh,28px);max-width:60ch}
        .dwu-line[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwu-cal{font-size:13px;font-style:italic;color:#8f8c83;margin-top:10px;max-width:54ch}
        .dwu-cal[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-style:normal}
        .dwu-stats{display:flex;flex-wrap:wrap;gap:14px 22px;justify-content:center;margin-top:14px;max-width:64ch}
        .dwu-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwu-top{top:0}.dwu-bot{bottom:0}
        .dwu-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 220px 60px rgba(0,0,0,.92)}
        @media (prefers-reduced-motion:reduce){.dwu-stage,.dwu-fog,.dwu-needle{animation:none}.dwu-in{transition:none}}
      `}</style>
    </section>
  );
}
export default UnknownScene;
