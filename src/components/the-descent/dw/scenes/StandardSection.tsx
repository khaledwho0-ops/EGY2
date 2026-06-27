'use client';
/* ═══════════════════════════════════════════════════════════════
 * StandardSection — id="standard" — THE ONE LAW (the EAL standard).
 * A claim with a source passes; a bare claim is stamped UNVERIFIED.
 * Cinematic port of the approved "The One Law" mockup.
 * ═══════════════════════════════════════════════════════════════ */
import { useReveal } from '../useReveal';
import { SECTION_COPY } from '../../descent-data';

export function StandardSection() {
  const c = SECTION_COPY.standard;
  const [ref, shown] = useReveal<HTMLDivElement>();

  return (
    <section id="standard" data-descent-section="standard" className="dwl" aria-label="The One Law">
      <div className="dwl-glow" aria-hidden />
      <div ref={ref} className={`dwl-in ${shown ? 'is-in' : ''}`}>
        <div className="dwl-head">
          <div className="dwl-k">{c.kicker?.en ?? 'The Standard'} · <span dir="rtl">معيار EAL</span></div>
          <div className="dwl-big">THE ONE LAW</div>
          <div className="dwl-ar" dir="rtl">القانون الواحد</div>
        </div>

        <div className="dwl-stage">
          <div className="dwl-gate" aria-hidden />
          <div className="dwl-lane dwl-pass">
            <div className="dwl-stamp">موثّق ✓</div>
            <div className="dwl-claim">
              <div className="dwl-t" dir="rtl">«ادّعاء»</div>
              <span className="dwl-pp">مصدر · Tier A</span>
            </div>
          </div>
          <div className="dwl-lane dwl-fail">
            <div className="dwl-claim">
              <div className="dwl-t" dir="rtl">«ادّعاء»</div>
              <span className="dwl-pp dwl-bare">بلا مصدر</span>
            </div>
            <div className="dwl-stamp">غير مُتحقَّق ✕</div>
          </div>
        </div>

        <div className="dwl-foot">
          <div className="dwl-far" dir="rtl">{c.headline.ar}</div>
          <div className="dwl-fen">{c.headline.en} — no source ⇒ flagged UNVERIFIED, never shown as fact.</div>
        </div>
      </div>

      <style>{`
        .dwl{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
          padding:clamp(56px,10vh,110px) clamp(20px,5vw,40px);overflow:hidden;
          background:radial-gradient(120% 90% at 50% 8%,#1c1606 0%,#0a0805 60%)}
        .dwl-glow{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:30%;height:70%;
          background:radial-gradient(ellipse at 50% 50%,rgba(240,192,48,.27),transparent 64%);filter:blur(34px);
          z-index:0;animation:dwl-pl 6s ease-in-out infinite}
        @keyframes dwl-pl{50%{opacity:.6}}
        .dwl-in{position:relative;z-index:2;width:100%;max-width:840px;text-align:center;
          opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
        .dwl-in.is-in{opacity:1;transform:none}
        .dwl-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;
          text-transform:uppercase;color:#F0C030}
        .dwl-big{font-family:'Anton',var(--font-heading-en),sans-serif;font-size:clamp(30px,5.4vw,56px);
          line-height:.95;margin-top:6px;background:linear-gradient(120deg,#F0C030,#FFE9A8);
          -webkit-background-clip:text;background-clip:text;color:transparent}
        .dwl-ar{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;
          font-size:clamp(20px,3vw,30px);color:#FFE9A8;margin-top:2px;text-shadow:0 0 24px rgba(240,192,48,.35)}
        .dwl-stage{position:relative;height:200px;margin:1.4rem 0 .5rem}
        .dwl-gate{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:8px;height:150px;
          border-radius:8px;background:linear-gradient(rgba(240,192,48,0),#F0C030,rgba(240,192,48,0));
          box-shadow:0 0 30px #F0C030,0 0 70px rgba(240,192,48,.53)}
        .dwl-lane{position:absolute;top:50%;transform:translateY(-50%);width:42%;display:flex;align-items:center;gap:10px}
        .dwl-pass{left:4%;justify-content:flex-end;flex-direction:row-reverse;text-align:right}
        .dwl-fail{right:4%}
        .dwl-claim{background:rgba(20,16,6,.6);border:1px solid #4a3c18;border-radius:12px;padding:11px 13px;
          backdrop-filter:blur(8px)}
        .dwl-pass .dwl-claim{border-color:#3FCB6B;box-shadow:0 0 24px rgba(63,203,107,.27)}
        .dwl-fail .dwl-claim{border-color:#e63939;box-shadow:0 0 24px rgba(230,57,57,.27);opacity:.85}
        .dwl-t{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:700;font-size:14px;color:#fff}
        .dwl-pp{display:inline-flex;font-family:var(--font-mono,'Space Mono',monospace);font-size:10px;margin-top:7px;
          border-radius:6px;padding:3px 8px;color:#bff0d2;border:1px solid #2f8f63;background:#10261c}
        .dwl-bare{color:#caa;border-color:#5a3a3a;background:#1c0d0d}
        .dwl-stamp{font-family:'Anton',sans-serif;font-size:15px;letter-spacing:1px;padding:6px 12px;border-radius:6px;
          transform:rotate(-7deg);white-space:nowrap}
        .dwl-pass .dwl-stamp{color:#3FCB6B;border:2px solid #3FCB6B;text-shadow:0 0 10px rgba(63,203,107,.4)}
        .dwl-fail .dwl-stamp{color:#FF5A5A;border:2px solid #FF5A5A;text-shadow:0 0 10px rgba(255,57,57,.4)}
        .dwl-foot{margin-top:.5rem}
        .dwl-far{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:700;
          font-size:clamp(15px,2.4vw,21px);color:#fff}
        .dwl-fen{font-size:12.5px;color:#a39a82;margin-top:6px}
        @media (max-width:640px){.dwl-lane{width:46%}.dwl-stamp{font-size:11px}}
        @media (prefers-reduced-motion:reduce){.dwl-glow{animation:none}.dwl-in{transition:none}}
      `}</style>
    </section>
  );
}
export default StandardSection;
