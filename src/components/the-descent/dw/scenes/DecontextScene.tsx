'use client';
/* ═══════════════════════════════════════════════════════════════
 * DecontextScene — id="layer-3" — DECONTEXTUALIZATION. A fragment
 * ripped from its verse, then the surrounding context restored.
 * Reverent (never split scripture — a clip-path wipe). Name-free.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { LAYER_DEFENSE_MAP, DESCENT_CASES } from '../../descent-data';

const AC = '#A855F7';

export function DecontextScene() {
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === 3);
  const cse = DESCENT_CASES.find((c) => c.layers.includes(3));
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  return (
    <section id="layer-3" data-descent-section="layer-3" className="dwd" aria-label="Layer 3 — Decontextualization">
      <div className="dwd-stage" aria-hidden>
        <div className="dwd-bg" />
        <div className="dwd-num">−3</div>
        <div className="dwd-aura" />
      </div>

      <div className="dwd-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwd-in ${shown ? 'is-in' : ''}`}>
        <div className="dwd-k">الطبقة ٠٣ · {entry?.layer.en}</div>
        <h2 className="dwd-name" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.layer)}</h2>
        <p className="dwd-beat" dir={rtl ? 'rtl' : 'ltr'}>{pick(entry?.youBeat)}</p>

        {/* hero — the fragment isolated, then its verse restored around it */}
        <div className="dwd-hero">
          <div className="dwd-fraglabel" dir={rtl ? 'rtl' : 'ltr'}>{lang === 'en' ? 'the fragment they show you' : 'الشظية اللي بيوروهالك'}</div>
          <div className="dwd-frag" dir="rtl">«الطيّب / الخبيث»</div>
          <div className="dwd-restore-line" aria-hidden />
          <div className="dwd-restorelabel" dir={rtl ? 'rtl' : 'ltr'}>{lang === 'en' ? 'restored to its verse' : 'مردودة إلى آيتها'}</div>
          <p className="dwd-restored" dir={rtl ? 'rtl' : 'ltr'}>
            {lang === 'en'
              ? 'Moral vocabulary in scripture — not a diet that forbids fruit and fish.'
              : 'مفردات أخلاقية في القرآن — مش حِمية بتمنع الفاكهة والسمك.'}
          </p>
        </div>

        {cse && <p className="dwd-line" dir={rtl ? 'rtl' : 'ltr'}>{pick(cse.line)}</p>}

        <div className="dwd-stats">
          {cse && <Sourced value={`Tier ${cse.tier}`} tier={cse.tier} source={cse.source} contested={cse.contested} accent={AC} inline />}
        </div>
      </div>

      <div className="dwd-bar dwd-top" aria-hidden /><div className="dwd-bar dwd-bot" aria-hidden />
      <div className="dwd-vig" aria-hidden />

      <style>{`
        .dwd{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#070310;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwd-stage{position:absolute;inset:0;z-index:0;animation:dwd-kb 22s ease-in-out infinite alternate}
        @keyframes dwd-kb{from{transform:scale(1.02)}to{transform:scale(1.08)}}
        .dwd-bg{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 44%,#2a1048 0%,#140828 40%,#050210 78%)}
        .dwd-num{position:absolute;right:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,50vw,700px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(168,85,247,.12)}
        .dwd-aura{position:absolute;left:50%;top:54%;width:42vw;height:42vw;transform:translate(-50%,-50%);border-radius:50%;
          background:radial-gradient(circle,rgba(168,85,247,.22),transparent 62%);filter:blur(50px);animation:dwd-pl 7s ease-in-out infinite}
        @keyframes dwd-pl{50%{opacity:.6}}
        .dwd-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid ${AC}66;border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dwd-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#d4b3f0;background:transparent;border:0;cursor:pointer}
        .dwd-lang button[data-on="true"]{color:#070310;background:${AC};font-weight:700}
        .dwd-in{position:relative;z-index:5;width:100%;max-width:1040px;text-align:center;padding:0 5%;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwd-in.is-in{opacity:1;transform:none}
        .dwd-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#c79cf2}
        .dwd-name{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;font-size:clamp(38px,7.4vw,96px);line-height:.96;margin-top:8px;
          background:linear-gradient(140deg,#fff,${AC});-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 60px rgba(168,85,247,.3)}
        .dwd-name[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwd-beat{font-size:clamp(16px,2.4vw,22px);color:#e9dcf7;margin-top:14px;max-width:32ch;line-height:1.5}
        .dwd-beat[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwd-hero{margin:clamp(20px,3.4vh,38px) auto 0;max-width:640px;width:100%}
        .dwd-fraglabel{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#b78fe6}
        .dwd-frag{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(28px,4.4vw,46px);color:#fff;margin-top:8px;
          text-shadow:0 0 30px rgba(168,85,247,.7)}
        .dwd-restore-line{height:2px;width:60%;margin:18px auto;border-radius:2px;background:linear-gradient(90deg,transparent,${AC},transparent);
          transform:scaleX(0);transform-origin:center;transition:transform 1.1s cubic-bezier(.16,1,.3,1) .3s}
        .dwd-in.is-in .dwd-restore-line{transform:scaleX(1)}
        .dwd-restorelabel{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#9a7ac0}
        .dwd-restored{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-size:clamp(17px,2.4vw,24px);font-weight:700;color:#efe7fb;margin-top:8px;line-height:1.5;
          clip-path:inset(0 100% 0 0);transition:clip-path 1.2s cubic-bezier(.16,1,.3,1) .5s}
        .dwd-restored[dir=ltr]{font-family:var(--font-body,'Inter',sans-serif);clip-path:inset(0 0 0 100%)}
        .dwd-in.is-in .dwd-restored{clip-path:inset(0 0 0 0)}
        .dwd-line{font-size:14.5px;line-height:1.6;color:#bcabd0;margin-top:clamp(18px,3vh,28px);max-width:60ch}
        .dwd-line[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dwd-stats{display:flex;flex-wrap:wrap;gap:14px 22px;justify-content:center;margin-top:16px;max-width:64ch}
        .dwd-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwd-top{top:0}.dwd-bot{bottom:0}
        .dwd-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 210px 56px rgba(0,0,0,.9)}
        @media (prefers-reduced-motion:reduce){.dwd-stage,.dwd-aura{animation:none}.dwd-in,.dwd-restore-line,.dwd-restored{transition:none}.dwd-in .dwd-restored{clip-path:none}.dwd-in .dwd-restore-line{transform:scaleX(1)}}
      `}</style>
    </section>
  );
}
export default DecontextScene;
