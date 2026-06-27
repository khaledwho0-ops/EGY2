'use client';
/* ═══════════════════════════════════════════════════════════════
 * ImmunitySection — id="immunity" — COGNITIVE IMMUNITY (the philosophy).
 * MAXIMALIST rebuild: giant layered type, a living "immune mind" emblem
 * (antibody shields repelling lie-spores), a vaccine-label mechanism,
 * dense ornament + multi-accent colour. Name-free. Bilingual equals.
 * ═══════════════════════════════════════════════════════════════ */
import { useReveal } from '../useReveal';
import { SECTION_COPY, INOCULATION_CAVEAT } from '../../descent-data';

/* orbiting antibodies — angle (deg) + orbit radius + delay */
const ANTIBODIES = [
  { a: 12, r: 128, d: '0s' },
  { a: 68, r: 150, d: '1.1s' },
  { a: 134, r: 132, d: '2.0s' },
  { a: 196, r: 152, d: '0.6s' },
  { a: 252, r: 130, d: '1.6s' },
  { a: 312, r: 150, d: '2.6s' },
];

/* lie-spores darting in from the edges and bouncing OFF the shield */
const LIES = [
  { top: '-4%', left: '50%', bx: '0px', by: '64px', dx: '-58px', dy: '34px', delay: '0s' },
  { top: '46%', left: '-6%', bx: '58px', by: '0px', dx: '36px', dy: '-58px', delay: '1.3s' },
  { top: '96%', left: '64%', bx: '-8px', by: '-62px', dx: '52px', dy: '-26px', delay: '2.4s' },
  { top: '20%', left: '104%', bx: '-60px', by: '14px', dx: '-30px', dy: '54px', delay: '3.2s' },
];

const STEPS = [
  { n: '01', tEn: 'DOSE', tAr: 'الجُرعة', dEn: 'a weakened dose of the lie', dAr: 'جرعة مُضعَّفة من الكذبة', col: '#FF49D8' },
  { n: '02', tEn: 'RESPONSE', tAr: 'الاستجابة', dEn: 'your mind builds antibodies', dAr: 'عقلك يبني أجسام مضادة', col: '#F0C030' },
  { n: '03', tEn: 'IMMUNE', tAr: 'المناعة', dEn: 'the next lie bounces off', dAr: 'الكذبة الجاية بترتدّ', col: '#22e0c8' },
];

export function ImmunitySection() {
  const c = SECTION_COPY.immunity;
  const [ref, shown] = useReveal<HTMLDivElement>();

  return (
    <section id="immunity" data-descent-section="immunity" className="ci" aria-label="Cognitive immunity">
      {/* ── layered maximalist background ── */}
      <div className="ci-bg" aria-hidden />
      <div className="ci-halftone" aria-hidden />
      <div className="ci-orb ci-orb-a" aria-hidden />
      <div className="ci-orb ci-orb-b" aria-hidden />
      <div className="ci-orb ci-orb-c" aria-hidden />
      <div className="ci-mandala" aria-hidden>
        <svg viewBox="0 0 600 600" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="180" fill="none" stroke="#22e0c8" strokeWidth="1" strokeDasharray="2 12" opacity="0.5" />
          <circle cx="300" cy="300" r="240" fill="none" stroke="#22e0c8" strokeWidth="1" strokeDasharray="2 18" opacity="0.32" />
          <circle cx="300" cy="300" r="290" fill="none" stroke="#22e0c8" strokeWidth="1" strokeDasharray="1 22" opacity="0.2" />
        </svg>
      </div>
      <div className="ci-ghost" dir="rtl" aria-hidden>مناعة</div>

      <div ref={ref} className={`ci-in ${shown ? 'is-in' : ''}`}>
        {/* ── kicker with flourishes ── */}
        <div className="ci-kick">
          <span className="ci-flourish" aria-hidden />
          <span>{c.kicker?.en ?? 'The Philosophy'} · <span dir="rtl">فلسفة EAL</span></span>
          <span className="ci-flourish" aria-hidden />
        </div>

        {/* ── colossal layered title ── */}
        <h2 className="ci-title">COGNITIVE<br /><span className="ci-title-2">IMMUNITY</span></h2>
        <div className="ci-title-ar" dir="rtl">المناعة المعرفية</div>

        {/* ── the living immune-mind emblem ── */}
        <div className="ci-emblem" aria-hidden>
          <div className="ci-shield ci-shield-1" />
          <div className="ci-shield ci-shield-2" />
          <div className="ci-shield ci-shield-3" />
          <div className="ci-core" />
          <svg className="ci-mind" width="120" height="132" viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10c24 0 39 17 39 41 0 15-7 24-7 32 0 7 5 9 5 15 0 9-9 13-20 13s-17-4-17-13c0-3 0-4-5-4-15 0-28-15-28-37C27 30 36 10 60 10z"
              fill="#06241f" stroke="#22e0c8" strokeWidth="1.8" />
            <path d="M47 54c0-10 24-10 24 0M54 70c4 4 11 4 15 0" fill="none" stroke="#7af0e0" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
          </svg>
          {/* orbiting antibodies (Y-shapes) */}
          {ANTIBODIES.map((ab, i) => (
            <span
              key={i}
              className="ci-ab"
              style={{ ['--a' as string]: `${ab.a}deg`, ['--r' as string]: `${ab.r}px`, animationDelay: ab.d }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 18 L10 10 M10 10 L4 3 M10 10 L16 3" fill="none" stroke="#7af0e0" strokeWidth="2" strokeLinecap="round" /></svg>
            </span>
          ))}
          {/* lie-spores that dart in and bounce off */}
          {LIES.map((l, i) => (
            <span
              key={i}
              className="ci-lie"
              style={{ top: l.top, left: l.left, animationDelay: l.delay, ['--bx' as string]: l.bx, ['--by' as string]: l.by, ['--dx' as string]: l.dx, ['--dy' as string]: l.dy }}
            />
          ))}
          {/* syringe entering from the lower-left, needle toward the mind-core */}
          <svg className="ci-syringe" width="128" height="32" viewBox="0 0 128 32" xmlns="http://www.w3.org/2000/svg">
            <line x1="6" y1="16" x2="20" y2="16" stroke="#22e0c8" strokeWidth="4" strokeLinecap="round" />
            <line x1="6" y1="9" x2="6" y2="23" stroke="#22e0c8" strokeWidth="2" strokeLinecap="round" />
            <rect x="20" y="7" width="60" height="18" rx="3" fill="#0a2a25" stroke="#22e0c8" strokeWidth="2" />
            <rect className="ci-syringe-dose" x="24" y="10" width="36" height="12" rx="2" fill="#FF49D8" opacity="0.34" />
            <line x1="80" y1="16" x2="122" y2="16" stroke="#7af0e0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="118" cy="16" r="2.6" fill="#FF49D8" />
          </svg>
          {/* the weakened dose travelling from the needle INTO the mind-core, then blooming */}
          <span className="ci-dose" aria-hidden />
          {/* the antibody bloom the dose triggers */}
          <span className="ci-bloom" aria-hidden />
        </div>

        {/* ── vaccine-label mechanism (3 steps) ── */}
        <div className="ci-steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className="ci-step" style={{ ['--c' as string]: s.col }}>
              <div className="ci-step-n">{s.n}</div>
              <div className="ci-step-t">{s.tEn} <span dir="rtl">· {s.tAr}</span></div>
              <div className="ci-step-d" dir="rtl">{s.dAr}</div>
              <div className="ci-step-de">{s.dEn}</div>
              {i < STEPS.length - 1 && <div className="ci-step-arrow" aria-hidden>→</div>}
            </div>
          ))}
        </div>

        {/* ── the thesis line ── */}
        <div className="ci-tag" dir="rtl">{c.headline.ar}</div>
        <div className="ci-tag-en">{c.headline.en}</div>

        {/* ── caveat + citation ── */}
        <div className="ci-foot">
          <div className="ci-caveat" dir="rtl">{INOCULATION_CAVEAT.ar}</div>
          <div className="ci-cite">Inoculation theory · McGuire 1961 · Roozenbeek 2022</div>
        </div>
      </div>

      {/* ── marquee + framing ── */}
      <div className="ci-marquee" aria-hidden>
        <div className="ci-marquee-row">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>محصّن<i>·</i>IMMUNE<i>·</i></span>
          ))}
        </div>
      </div>
      <div className="ci-corner ci-corner-tl" aria-hidden /><div className="ci-corner ci-corner-tr" aria-hidden />
      <div className="ci-corner ci-corner-bl" aria-hidden /><div className="ci-corner ci-corner-br" aria-hidden />
      <div className="ci-vig" aria-hidden />

      <style>{`
        .ci{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
          padding:clamp(72px,12vh,140px) clamp(18px,5vw,48px);overflow:hidden;isolation:isolate;
          background:#03100d}
        .ci-bg{position:absolute;inset:0;z-index:0;background:
          radial-gradient(130% 90% at 50% 42%,#0a2f28 0%,#061a17 42%,#03100d 72%,#020807 100%)}
        .ci-halftone{position:absolute;inset:0;z-index:0;opacity:.5;mix-blend-mode:screen;
          background-image:radial-gradient(rgba(34,224,200,.16) 1px,transparent 1.4px);background-size:18px 18px;
          -webkit-mask-image:radial-gradient(ellipse 70% 70% at 50% 45%,#000,transparent 75%);
          mask-image:radial-gradient(ellipse 70% 70% at 50% 45%,#000,transparent 75%)}
        .ci-orb{position:absolute;border-radius:50%;filter:blur(60px);z-index:0;opacity:.5;animation:ci-float 16s ease-in-out infinite}
        .ci-orb-a{width:46vw;height:46vw;left:-12vw;top:-8vw;background:radial-gradient(circle,rgba(34,224,200,.5),transparent 64%)}
        .ci-orb-b{width:38vw;height:38vw;right:-10vw;top:8vw;background:radial-gradient(circle,rgba(240,192,48,.34),transparent 64%);animation-delay:-5s}
        .ci-orb-c{width:40vw;height:40vw;right:6vw;bottom:-14vw;background:radial-gradient(circle,rgba(255,73,216,.32),transparent 64%);animation-delay:-9s}
        @keyframes ci-float{50%{transform:translate3d(2vw,-2vw,0) scale(1.08)}}
        .ci-mandala{position:absolute;left:50%;top:48%;width:min(120vh,1100px);aspect-ratio:1;transform:translate(-50%,-50%);
          z-index:0;animation:ci-spin 90s linear infinite}
        @keyframes ci-spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
        .ci-ghost{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:0;pointer-events:none;
          font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;
          font-size:clamp(190px,42vw,560px);line-height:.8;color:transparent;
          -webkit-text-stroke:2px rgba(34,224,200,.10);opacity:.9;white-space:nowrap}

        .ci-in{position:relative;z-index:3;width:100%;max-width:1040px;display:flex;flex-direction:column;align-items:center;
          text-align:center;opacity:0;transform:translateY(30px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .ci-in.is-in{opacity:1;transform:none}

        .ci-kick{display:flex;align-items:center;gap:14px;font-family:var(--font-mono,'Space Mono',monospace);
          font-size:12px;letter-spacing:6px;text-transform:uppercase;color:#22e0c8}
        .ci-flourish{width:48px;height:1px;background:linear-gradient(90deg,transparent,#22e0c8)}
        .ci-flourish:last-child{background:linear-gradient(90deg,#22e0c8,transparent)}

        .ci-title{font-family:'Anton',var(--font-heading-en),sans-serif;font-weight:400;
          font-size:clamp(46px,12vw,138px);line-height:.82;letter-spacing:-.01em;margin-top:14px;
          background:linear-gradient(150deg,#eafffb 0%,#22e0c8 45%,#0fbfae 100%);
          -webkit-background-clip:text;background-clip:text;color:transparent;
          text-shadow:0 0 60px rgba(34,224,200,.28);filter:drop-shadow(0 6px 24px rgba(0,0,0,.5))}
        .ci-title-2{background:linear-gradient(150deg,#7af0e0,#F0C030 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
        .ci-title-ar{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;
          font-size:clamp(26px,5vw,52px);color:#bff5ec;margin-top:6px;text-shadow:0 0 30px rgba(34,224,200,.4)}

        /* ── emblem ── */
        .ci-emblem{position:relative;width:min(340px,80vw);height:min(340px,80vw);margin:clamp(24px,4vh,46px) 0}
        .ci-shield{position:absolute;inset:0;border-radius:50%;margin:auto}
        .ci-shield-1{inset:14%;border:2px solid rgba(34,224,200,.85);box-shadow:0 0 50px rgba(34,224,200,.4),inset 0 0 40px rgba(34,224,200,.25);animation:ci-pulse 3.4s ease-in-out infinite}
        .ci-shield-2{inset:2%;border:1px dashed rgba(122,240,224,.45);animation:ci-rot 26s linear infinite}
        .ci-shield-3{inset:-12%;border:1px solid rgba(34,224,200,.18);animation:ci-rot 40s linear infinite reverse}
        @keyframes ci-pulse{50%{transform:scale(1.04);opacity:.85}}
        @keyframes ci-rot{to{transform:rotate(360deg)}}
        .ci-core{position:absolute;inset:30%;border-radius:50%;margin:auto;
          background:radial-gradient(circle,rgba(34,224,200,.5),rgba(34,224,200,.08) 60%,transparent 72%);filter:blur(6px);animation:ci-pulse 3.4s ease-in-out infinite}
        .ci-mind{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:4;filter:drop-shadow(0 0 16px rgba(34,224,200,.6))}
        .ci-ab{position:absolute;left:50%;top:50%;width:20px;height:20px;margin:-10px;z-index:5;
          transform:rotate(var(--a)) translateY(calc(var(--r) * -1)) rotate(calc(var(--a) * -1));
          animation:ci-ab-pulse 2.6s ease-in-out infinite;filter:drop-shadow(0 0 6px #22e0c8)}
        @keyframes ci-ab-pulse{50%{opacity:.45}}
        .ci-lie{position:absolute;width:10px;height:10px;border-radius:50%;background:#FF5A5A;
          box-shadow:0 0 12px #ff3939,0 0 4px #fff;z-index:3;animation:ci-dart 4s ease-in infinite}
        @keyframes ci-dart{0%{opacity:0}24%{opacity:1}52%{transform:translate(var(--bx),var(--by));opacity:1}
          100%{transform:translate(var(--dx),var(--dy));opacity:0}}
        /* syringe enters from the lower-left and pushes the needle toward the mind-core */
        .ci-syringe{position:absolute;left:50%;top:50%;z-index:6;filter:drop-shadow(0 0 8px rgba(34,224,200,.55));
          transform:translate(-176%,18%) rotate(-30deg);transform-origin:118px 16px;
          animation:ci-inject 4.5s cubic-bezier(.45,0,.2,1) infinite}
        @keyframes ci-inject{0%,100%{transform:translate(-176%,18%) rotate(-30deg)}
          42%,60%{transform:translate(-122%,2%) rotate(-30deg)}}
        .ci-syringe-dose{animation:ci-dose-empty 4.5s ease-in-out infinite}
        @keyframes ci-dose-empty{0%,42%{opacity:.34}60%{opacity:.06}100%{opacity:.34}}
        /* dose pulse: born at the needle tip, travels into the core, then blooms */
        .ci-dose{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;border-radius:50%;z-index:5;
          background:radial-gradient(circle,#ffe1f7,#FF49D8 55%,transparent 74%);opacity:0;pointer-events:none;
          animation:ci-dose-travel 4.5s ease-in-out infinite}
        @keyframes ci-dose-travel{0%,52%{transform:translate(-68px,36px) scale(.5);opacity:0}
          60%{transform:translate(-68px,36px) scale(1);opacity:1}
          74%{transform:translate(0,0) scale(1.15);opacity:1}
          88%,100%{transform:translate(0,0) scale(4.6);opacity:0}}
        /* the antibody bloom the dose triggers in the mind-core */
        .ci-bloom{position:absolute;inset:26%;border-radius:50%;margin:auto;z-index:4;pointer-events:none;
          border:2px solid rgba(255,73,216,0);animation:ci-bloom 4.5s ease-out infinite}
        @keyframes ci-bloom{0%,70%{transform:scale(.6);border-color:rgba(255,73,216,0);opacity:0}
          80%{transform:scale(.95);border-color:rgba(255,209,244,.9);opacity:1;box-shadow:0 0 30px rgba(255,73,216,.5)}
          100%{transform:scale(1.55);border-color:rgba(34,224,200,0);opacity:0;box-shadow:0 0 0 rgba(255,73,216,0)}}

        /* ── vaccine-label steps ── */
        .ci-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:100%;max-width:860px;margin-top:8px}
        .ci-step{position:relative;border:1px solid color-mix(in srgb,var(--c) 45%,transparent);
          border-top:3px solid var(--c);border-radius:14px;padding:18px 16px 16px;text-align:right;
          background:linear-gradient(180deg,rgba(8,30,26,.78),rgba(4,18,15,.6));backdrop-filter:blur(10px);
          box-shadow:0 0 30px color-mix(in srgb,var(--c) 18%,transparent)}
        .ci-step-n{position:absolute;top:10px;left:14px;font-family:'Anton',sans-serif;font-size:30px;line-height:1;color:color-mix(in srgb,var(--c) 80%,transparent);opacity:.6}
        .ci-step-t{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:2px;color:var(--c);font-weight:700;text-align:right}
        .ci-step-t span{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .ci-step-d{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:800;font-size:clamp(15px,1.9vw,19px);color:#eafffb;margin-top:10px;line-height:1.45}
        .ci-step-de{font-size:12.5px;color:#8fb5ad;margin-top:6px;text-align:left}
        .ci-step-arrow{position:absolute;right:-16px;top:50%;transform:translateY(-50%);z-index:6;color:var(--c);font-size:22px;font-weight:700;text-shadow:0 0 10px var(--c)}

        /* ── thesis + foot ── */
        .ci-tag{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900;
          font-size:clamp(22px,3.6vw,40px);color:#fff;line-height:1.4;margin-top:clamp(26px,4vh,44px);max-width:24ch;
          text-shadow:0 0 30px rgba(34,224,200,.3)}
        .ci-tag-en{font-size:clamp(14px,1.8vw,18px);color:#bff5ec;margin-top:10px;max-width:60ch;font-weight:500}
        .ci-foot{margin-top:20px;display:flex;flex-direction:column;align-items:center;gap:10px}
        .ci-caveat{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-size:12.5px;color:#7fa89f;max-width:52ch;line-height:1.6}
        .ci-cite{font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1.5px;color:#22e0c8;
          border:1px solid rgba(34,224,200,.4);border-radius:999px;padding:5px 14px;background:rgba(8,30,26,.5)}

        /* ── marquee + corners + vignette ── */
        .ci-marquee{position:absolute;left:0;right:0;bottom:18px;z-index:2;overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
          mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
        .ci-marquee-row{display:flex;gap:0;white-space:nowrap;width:max-content;animation:ci-march 26s linear infinite;
          font-family:'Anton',sans-serif;font-size:15px;letter-spacing:5px;color:rgba(34,224,200,.22)}
        .ci-marquee-row span{display:inline-flex;align-items:center}
        .ci-marquee-row i{font-style:normal;margin:0 18px;color:rgba(240,192,48,.4)}
        @keyframes ci-march{to{transform:translateX(-50%)}}
        .ci-corner{position:absolute;width:46px;height:46px;z-index:2;border:2px solid rgba(34,224,200,.35)}
        .ci-corner-tl{top:22px;left:22px;border-right:0;border-bottom:0}
        .ci-corner-tr{top:22px;right:22px;border-left:0;border-bottom:0}
        .ci-corner-bl{bottom:22px;left:22px;border-right:0;border-top:0}
        .ci-corner-br{bottom:22px;right:22px;border-left:0;border-top:0}
        .ci-vig{position:absolute;inset:0;z-index:1;pointer-events:none;box-shadow:inset 0 0 220px 60px rgba(2,8,7,.85)}

        @media (max-width:720px){
          .ci-steps{grid-template-columns:1fr}
          .ci-step{text-align:right}
          .ci-step-arrow{display:none}
          .ci-ghost{font-size:42vw}
        }
        @media (prefers-reduced-motion:reduce){
          .ci-orb,.ci-mandala,.ci-shield-1,.ci-shield-2,.ci-shield-3,.ci-core,.ci-ab,.ci-lie,.ci-syringe,.ci-syringe-dose,.ci-dose,.ci-bloom,.ci-marquee-row{animation:none}
          .ci-in{transition:none}
        }
      `}</style>
    </section>
  );
}
export default ImmunitySection;
