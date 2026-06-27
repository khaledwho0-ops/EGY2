'use client';
/* ═══════════════════════════════════════════════════════════════
 * MatrixSection — id="layer-6" — THE MATRIX (PEAK). A closed world
 * where facts bounce off and the lie digs deeper. Name-free.
 * Rebuilt: balanced composition, "you're inside" centred in the rings,
 * EN⇄ع toggle (no interleave), legible cards. Keeps the cinematic peak.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';

type Lang = 'en' | 'ar';

const HEAD = {
  lead: { en: 'A closed world. Show someone the truth —', ar: 'عالم مقفول. لمّا حد يوريك الحقيقة —' },
  emph: { en: 'the lie only digs deeper.', ar: 'الكذبة بتتعمّق أكتر.' },
};
const CASES = [
  {
    scope: { en: 'Worldwide', ar: 'عالميًا' },
    text: {
      en: 'A conspiracy movement turned “do your own research” into a rabbit hole that swallowed whole families.',
      ar: 'حركة مؤامرة حوّلت «ابحث بنفسك» لجُحر ابتلع عائلات بحالها.',
    },
  },
  {
    scope: { en: 'Egypt', ar: 'في مصر' },
    text: {
      en: 'A “cure” forwarded by a trusted relative bypasses all doubt — and correcting grandma makes her trust you less.',
      ar: '«علاج» متبعّت من قريب موثوق بيتعدّى كل شك — وتصحيح الجدّة بيخلّيها تثق فيك أقل.',
    },
  },
];

const DUST = [
  { left: '28%', dur: '11s', delay: '0s' },
  { left: '52%', dur: '13s', delay: '2s' },
  { left: '70%', dur: '12s', delay: '1s' },
  { left: '84%', dur: '14s', delay: '3s' },
];

export function MatrixSection() {
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  return (
    <section id="layer-6" data-descent-section="layer-6" className="dwm" aria-label="Layer 6 — The Matrix">
      <div className="dwm-stage" aria-hidden>
        <div className="dwm-bg" />
        <div className="dwm-num">−6</div>
        {DUST.map((d, i) => (
          <span key={i} className="dwm-dust" style={{ left: d.left, animationDuration: d.dur, animationDelay: d.delay }} />
        ))}
      </div>

      <div className="dwm-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dwm-in ${shown ? 'is-in' : ''}`}>
        <div className="dwm-k">الطبقة ٠٦ · The Matrix</div>
        <div className="dwm-name" dir="rtl">مصفوفة التلاعب</div>

        <h2 className="dwm-head" dir={rtl ? 'rtl' : 'ltr'}>
          {pick(HEAD.lead)} <b>{pick(HEAD.emph)}</b>
        </h2>

        {/* the closed world — you inside, truth bouncing off */}
        <div className="dwm-rings" aria-hidden>
          <span className="dwm-ring dwm-ring1" />
          <span className="dwm-ring dwm-ring2" />
          <span className="dwm-ring dwm-ring3" />
          <svg className="dwm-bounce" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dwm-ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M1 1 L8 5 L1 9" fill="none" stroke="#7af0ff" strokeWidth="1.8" />
              </marker>
            </defs>
            <path d="M214 60 L150 60" stroke="#7af0ff" strokeWidth="2" fill="none" markerEnd="url(#dwm-ah)" />
            <path d="M150 60 q-16 -26 -40 -12" stroke="#7af0ff" strokeWidth="2" fill="none" opacity="0.7" strokeDasharray="3 4" />
          </svg>
          <span className="dwm-truth">{lang === 'en' ? 'truth bounces off' : 'الحقيقة بترتدّ'}</span>
          <div className="dwm-you">
            <span className="dwm-dot" />
            <span className="dwm-t">{lang === 'en' ? "you're inside" : 'إنت جوّه'}</span>
          </div>
        </div>

        <div className="dwm-ex" dir={rtl ? 'rtl' : 'ltr'}>
          {CASES.map((c) => (
            <div key={c.scope.en} className="dwm-x">
              <span className="dwm-scope">{pick(c.scope)}</span>
              <p className="dwm-xt">{pick(c.text)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dwm-bar dwm-top" aria-hidden /><div className="dwm-bar dwm-bot" aria-hidden />
      <div className="dwm-vig" aria-hidden />

      <style>{`
        .dwm{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          background:#0a0410;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dwm-stage{position:absolute;inset:0;z-index:0;animation:dwm-kb 20s ease-in-out infinite alternate}
        @keyframes dwm-kb{from{transform:scale(1.03)}to{transform:scale(1.1)}}
        .dwm-bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 46%,#3a0a2e 0%,#15041a 42%,#070209 76%)}
        .dwm-num{position:absolute;right:-4%;top:50%;transform:translateY(-50%);font-family:'Anton',sans-serif;
          font-size:clamp(280px,46vw,640px);line-height:.66;color:transparent;-webkit-text-stroke:2.5px rgba(255,73,216,.12)}
        .dwm-dust{position:absolute;bottom:6%;width:3px;height:3px;border-radius:50%;background:#f5b3e6;animation:dwm-rise linear infinite}
        @keyframes dwm-rise{0%{transform:translateY(20px);opacity:0}12%{opacity:.6}100%{transform:translateY(-260px);opacity:0}}

        .dwm-lang{position:absolute;top:clamp(20px,4vh,34px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;
          border:1px solid rgba(255,73,216,.4);border-radius:999px;overflow:hidden;background:rgba(0,0,0,.3)}
        .dwm-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#e7a9da;background:transparent;border:0;cursor:pointer}
        .dwm-lang button[data-on="true"]{color:#0a0410;background:#FF49D8;font-weight:700}

        .dwm-in{position:relative;z-index:5;width:100%;max-width:1000px;text-align:center;padding:0 5%;display:flex;
          flex-direction:column;align-items:center;opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dwm-in.is-in{opacity:1;transform:none}
        .dwm-k{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#FF8FE3}
        .dwm-name{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;font-size:clamp(24px,3.6vw,38px);color:#fff;margin-top:6px;text-shadow:0 0 24px rgba(255,73,216,.45)}
        .dwm-head{font-weight:800;font-size:clamp(20px,3.4vw,36px);color:#fff;margin:1.1rem auto 0;max-width:22ch;line-height:1.4;text-shadow:0 4px 30px #000}
        .dwm-head[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dwm-head b{color:#FF6FDB}

        /* the rings visual — you centred inside, truth bouncing off */
        .dwm-rings{position:relative;width:min(300px,72vw);height:200px;margin:clamp(18px,3vh,34px) auto}
        .dwm-ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;border:1px solid #FF49D8}
        .dwm-ring1{width:92px;height:92px;opacity:.9;animation:dwm-pl 3s ease-in-out infinite}
        .dwm-ring2{width:160px;height:160px;opacity:.5;border-style:dashed;animation:dwm-spin 22s linear infinite}
        .dwm-ring3{width:230px;height:230px;opacity:.28;border-style:dashed;animation:dwm-spin 34s linear infinite reverse}
        @keyframes dwm-pl{50%{opacity:.5;transform:translate(-50%,-50%) scale(1.05)}}
        @keyframes dwm-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        .dwm-bounce{position:absolute;left:50%;top:50%;width:220px;height:120px;transform:translate(-46%,-50%)}
        .dwm-truth{position:absolute;left:calc(50% + 86px);top:calc(50% - 34px);font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;color:#9fe8ff;white-space:nowrap}
        .dwm-you{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;z-index:2}
        .dwm-dot{display:block;width:15px;height:15px;border-radius:50%;background:#FF49D8;box-shadow:0 0 16px #FF49D8,0 0 42px #FF49D8;margin:0 auto;animation:dwm-pl 1.8s ease-in-out infinite}
        .dwm-t{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-size:13px;color:#ffc2f0;margin-top:7px;font-weight:800;text-shadow:0 0 10px #FF49D8;display:block}

        .dwm-ex{display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:860px;margin:0 auto;width:100%}
        .dwm-x{background:linear-gradient(160deg,rgba(40,10,38,.66),rgba(14,4,16,.5));backdrop-filter:blur(10px);
          border:1px solid rgba(255,73,216,.28);border-top:3px solid #FF49D8;border-radius:16px;padding:16px 16px;text-align:start}
        .dwm-scope{display:inline-block;font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:1.5px;
          text-transform:uppercase;color:#FF8FE3;font-weight:700;margin-bottom:8px}
        .dwm-xt{font-size:14px;line-height:1.6;color:#f3e3ef}
        .dwm-ex[dir=rtl] .dwm-xt,.dwm-ex[dir=rtl] .dwm-scope{font-family:var(--font-heading-ar),'Tajawal',sans-serif}

        .dwm-bar{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:8}.dwm-top{top:0}.dwm-bot{bottom:0}
        .dwm-vig{position:absolute;inset:0;z-index:7;pointer-events:none;box-shadow:inset 0 0 200px 50px rgba(0,0,0,.88)}
        @media (max-width:640px){.dwm-ex{grid-template-columns:1fr}.dwm-num{font-size:60vw}}
        @media (prefers-reduced-motion:reduce){.dwm-stage,.dwm-dot,.dwm-dust,.dwm-ring,.dwm-ring2,.dwm-ring3{animation:none}.dwm-in{transition:none}}
      `}</style>
    </section>
  );
}
export default MatrixSection;
