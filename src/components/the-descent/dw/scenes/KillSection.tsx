'use client';
/* ═══════════════════════════════════════════════════════════════
 * KillSection — id="layer-5" — THE KILL (Evil Application, PEAK).
 * Letterbox + god-ray + drifting dust + push-in; a full-width heart
 * monitor that flatlines as the BPM falls to zero. Name-free.
 * ═══════════════════════════════════════════════════════════════ */
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { DESCENT_CASES, STATS } from '../../descent-data';

const DUST = [
  { left: '18%', bottom: '20%', dur: '9s', delay: '0s' },
  { left: '30%', bottom: '10%', dur: '12s', delay: '2s' },
  { left: '46%', bottom: '24%', dur: '10s', delay: '1s' },
  { left: '62%', bottom: '14%', dur: '13s', delay: '3s' },
  { left: '74%', bottom: '22%', dur: '11s', delay: '1.5s' },
  { left: '84%', bottom: '12%', dur: '14s', delay: '4s' },
  { left: '8%', bottom: '30%', dur: '10s', delay: '2.5s' },
];

export function KillSection() {
  const kill = DESCENT_CASES.find((c) => c.id === 'the-kill');
  const s = STATS.selfMedicate;
  const [ref, shown] = useReveal<HTMLDivElement>();

  return (
    <section id="layer-5" data-descent-section="layer-5" className="dwk" aria-label="Layer 5 — The Kill">
      <div className="dwk-stage" aria-hidden>
        <div className="dwk-bg" />
        <div className="dwk-ray" />
        <div className="dwk-num">−5</div>
        {DUST.map((d, i) => (
          <span key={i} className="dwk-dust" style={{ left: d.left, bottom: d.bottom, animationDuration: d.dur, animationDelay: d.delay }} />
        ))}
      </div>

      <div ref={ref} className={`dwk-in ${shown ? 'is-in' : ''}`}>
        <div className="dwk-lab">
          <div className="dwk-k">الطبقة ٠٥ · The Evil Application</div>
          <div className="dwk-name" dir="rtl">التطبيق الشرير</div>
        </div>

        <div className="dwk-line1" dir="rtl">سمع إن الأنسولين «كذبة»، <b>فوقّفه.</b></div>

        <div className="dwk-ecgwrap" aria-hidden>
          <svg viewBox="0 0 1000 130" preserveAspectRatio="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <polyline
              points="0,65 130,65 150,65 165,30 180,100 196,65 320,65 350,65 366,24 384,106 400,65 520,65 548,65 564,32 580,102 596,65 1000,65"
              fill="none" stroke="#3fcb6b" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 9px #3fcb6b)' }}
            />
            <circle cx="596" cy="65" r="6.5" fill="#FF5A5A" style={{ filter: 'drop-shadow(0 0 10px #FF5A5A)' }} />
          </svg>
        </div>

        <div className="dwk-bpm"><div className="dwk-v">0</div><div className="dwk-bl">BPM · نبض</div></div>

        <div className="dwk-line2">
          <div className="dwk-l2en">{kill?.line.en}</div>
          <div className="dwk-l2ar" dir="rtl">والخط بقى مستقيم… <span style={{ color: '#FF5A5A' }}>في أسبوع.</span></div>
        </div>

        <div className="dwk-stat">
          <Sourced value={s.value} tier={s.tier} source={s.source} labelAr={s.ar} accent="#3fcb6b" inline />
        </div>
      </div>

      <div className="dwk-bar dwk-top" aria-hidden /><div className="dwk-bar dwk-bot" aria-hidden />
      <div className="dwk-vig" aria-hidden />

      <style>{`
        .dwk{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:radial-gradient(130% 100% at 50% 50%,#06160d 0%,#030604 65%)}
        .dwk-stage{position:absolute;inset:0;z-index:0;animation:dwk-kb 18s ease-in-out infinite alternate}
        @keyframes dwk-kb{from{transform:scale(1)}to{transform:scale(1.08)}}
        .dwk-bg{position:absolute;inset:0;background:radial-gradient(130% 100% at 50% 42%,#073019 0%,#04150c 40%,#010302 74%)}
        .dwk-ray{position:absolute;top:-30%;left:50%;width:60%;height:150%;transform:translateX(-50%) rotate(8deg);
          background:linear-gradient(100deg,transparent 38%,rgba(63,203,107,.09) 49%,rgba(63,203,107,.19) 50%,rgba(63,203,107,.09) 51%,transparent 62%);
          filter:blur(6px);animation:dwk-ray 7s ease-in-out infinite}
        @keyframes dwk-ray{50%{opacity:.5;transform:translateX(-50%) rotate(6deg)}}
        .dwk-num{position:absolute;left:-6%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(300px,52vw,720px);line-height:.66;color:transparent;-webkit-text-stroke:3px rgba(63,203,107,.13);animation:dwk-nf 13s ease-in-out infinite}
        @keyframes dwk-nf{50%{transform:translateY(-53%);opacity:.7}}
        .dwk-dust{position:absolute;width:3px;height:3px;border-radius:50%;background:#bdf0cf;filter:blur(.4px);animation:dwk-rise linear infinite}
        @keyframes dwk-rise{0%{transform:translateY(20px);opacity:0}10%{opacity:.7}100%{transform:translateY(-260px);opacity:0}}
        .dwk-in{position:relative;z-index:5;width:100%;max-width:1100px;text-align:center;padding:0 24px;
          opacity:0;transition:opacity 1s ease}
        .dwk-in.is-in{opacity:1}
        .dwk-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#22e07a}
        .dwk-name{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(22px,3.4vw,34px);color:#fff;text-shadow:0 0 22px rgba(34,224,122,.35)}
        .dwk-line1{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(24px,4.2vw,44px);color:#fff;margin:1.4rem 0 .4rem;text-shadow:0 2px 30px #000}
        .dwk-line1 b{color:#FF5A5A;text-shadow:0 0 28px rgba(255,57,57,.8)}
        .dwk-ecgwrap{height:120px;margin:.4rem 0}
        .dwk-bpm{position:absolute;top:0;right:5%;text-align:right;font-family:var(--font-mono,'Space Mono',monospace);color:#22e07a}
        .dwk-v{font-family:'Anton',sans-serif;font-size:40px;color:#FF5A5A;line-height:1;text-shadow:0 0 18px rgba(255,57,57,.67)}
        .dwk-bl{font-size:10px;letter-spacing:2px;color:#7fb89a}
        .dwk-l2en{font-size:13px;color:#9fb7a8;margin-top:6px}
        .dwk-l2ar{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(20px,3.4vw,32px);color:#fff;text-shadow:0 0 22px rgba(255,57,57,.33)}
        .dwk-stat{display:flex;justify-content:center;margin-top:1.2rem}
        .dwk-bar{position:absolute;left:0;right:0;height:6.5%;background:#000;z-index:8}.dwk-top{top:0}.dwk-bot{bottom:0}
        .dwk-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 200px 50px rgba(0,0,0,.93)}
        @media (prefers-reduced-motion:reduce){.dwk-stage,.dwk-ray,.dwk-num,.dwk-dust{animation:none}.dwk-in{transition:none}}
      `}</style>
    </section>
  );
}
export default KillSection;
