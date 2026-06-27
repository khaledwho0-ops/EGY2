'use client';
/* ═══════════════════════════════════════════════════════════════
 * M1.5 · descent-problem — THE THREE THINGS NOBODY TAUGHT YOU
 *
 * Names the exact gap the platform later closes, then states the danger
 * framing. Rebuilt to the design system: EN⇄ع toggle (one language at a
 * time, no interleave), legible flat gap cards, the danger escalation +
 * the pulsing "killed". Reveals via useReveal(); reduced-motion safe.
 * ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { Search, ShieldCheck, Hand } from 'lucide-react';
import { SECTION_COPY } from './descent-data';
import { useReveal } from './dw/useReveal';

type Lang = 'en' | 'ar';

const GAPS: {
  id: string;
  icon: typeof Search;
  gap: { en: string; ar: string };
  answered: { en: string; ar: string };
}[] = [
  {
    id: 'reach',
    icon: Search,
    gap: { en: 'how to reach a source you can trust', ar: 'إزاي توصل لمصدر تثق فيه' },
    answered: { en: 'answered by the tools (Movement One)', ar: 'تجاوب عليها الأدوات (الحركة الأولى)' },
  },
  {
    id: 'verify',
    icon: ShieldCheck,
    gap: { en: "how to check that it's real", ar: 'إزاي تتأكد إنه حقيقي' },
    answered: { en: 'answered by the tools (Movement One)', ar: 'تجاوب عليها الأدوات (الحركة الأولى)' },
  },
  {
    id: 'apply',
    icon: Hand,
    gap: { en: 'how to use it in your life', ar: 'إزاي تطبّقه في حياتك' },
    answered: { en: 'answered by cognition (Movement Two)', ar: 'يجاوب عليها الإدراك (الحركة الثانية)' },
  },
];

export function ProblemSection() {
  const c = SECTION_COPY.problem;
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  const [leadRef, leadIn] = useReveal<HTMLDivElement>();
  const [gapsRef, gapsIn] = useReveal<HTMLOListElement>();
  const [frameRef, frameIn] = useReveal<HTMLDivElement>();

  return (
    <section
      id={c.anchor}
      data-descent-section="M1_5"
      className="dw-section prb"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="dw-orb dw-orb--1" aria-hidden />
      <div className="dw-orb dw-orb--2" aria-hidden />

      <div className="dw-side-label" style={{ left: 'clamp(12px,3vw,40px)' }} aria-hidden>
        01 · THE GAP · الفجوة
      </div>

      <div className="prb-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 800, margin: '0 auto', padding: '0 1.25rem' }}>
        <div ref={leadRef} className={`dw-reveal ${leadIn ? 'is-in' : ''}`}>
          <h2 className="prb-title dw-gradient-text" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.headline)}</h2>
        </div>

        <ol
          ref={gapsRef}
          className={`dw-reveal ${gapsIn ? 'is-in' : ''} prb-gaps`}
        >
          {GAPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <li key={g.id} className="prb-gap" style={{ transitionDelay: `${0.1 + i * 0.12}s` }} dir={rtl ? 'rtl' : 'ltr'}>
                <span className="prb-gap-icon"><Icon size={18} aria-hidden /></span>
                <span className="prb-gap-num">0{i + 1}</span>
                <span className="prb-gap-text" style={{ fontFamily: rtl ? 'var(--font-heading-ar), sans-serif' : undefined }}>{pick(g.gap)}</span>
                <span className="prb-gap-ans" style={{ fontFamily: rtl ? 'var(--font-heading-ar), sans-serif' : undefined }}>{pick(g.answered)}</span>
              </li>
            );
          })}
        </ol>

        <div ref={frameRef} className={`dw-reveal ${frameIn ? 'is-in' : ''}`}>
          <DangerFraming lang={lang} />
        </div>
      </div>

      <style>{`
        .prb { position: relative; font-family: var(--font-body,'Inter',system-ui,sans-serif); }
        .prb-lang { position: absolute; top: clamp(20px,3vh,32px); right: clamp(16px,4vw,40px); z-index: 9;
          display: inline-flex; border: 1px solid rgba(255,46,154,0.4); border-radius: 999px; overflow: hidden; background: rgba(0,0,0,0.4); }
        .prb-lang button { font-family: var(--font-mono,'Space Mono',monospace); font-size: 12px; padding: 5px 13px; color: #d4a3c5; background: transparent; border: 0; cursor: pointer; }
        .prb-lang button[data-on="true"] { color: #1a0510; background: #FF2E9A; font-weight: 700; }

        .prb-title { margin: 0; text-align: center; font-family: 'Anton', var(--font-heading-en), sans-serif; font-weight: 400;
          font-size: clamp(30px, 5vw, 60px); line-height: 1.05; }
        .prb-title[dir=rtl] { font-family: var(--font-heading-ar), 'Tajawal', sans-serif; font-weight: 900; }

        .prb-gaps { list-style: none; margin: clamp(2rem,5vh,3rem) 0 0; padding: 0; display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .prb-gap { display: flex; flex-direction: column; align-items: flex-start; gap: 0.55rem; padding: 1.4rem 1.4rem;
          border-radius: 18px; background: linear-gradient(160deg, rgba(255,46,154,0.07), rgba(20,8,18,0.5));
          border: 1px solid rgba(255,46,154,0.2); backdrop-filter: blur(10px); text-align: start; }
        .prb-gap[dir=rtl] { align-items: flex-end; text-align: right; }
        .prb-gap-icon { display: inline-flex; height: 40px; width: 40px; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,46,154,0.1); color: #ff7ac8; }
        .prb-gap-num { font-family: var(--font-mono,'Space Mono',monospace); font-size: 12px; letter-spacing: 1px; color: #ff7ac8; font-weight: 700; }
        .prb-gap-text { font-size: 16px; font-weight: 600; color: #f3e7ee; line-height: 1.4; }
        .prb-gap-ans { font-family: var(--font-mono,'Space Mono',monospace); font-size: 11.5px; letter-spacing: 0.06em; color: rgba(34,211,238,0.85); line-height: 1.45; }

        .dw-killed { color: var(--dw-magenta-core, #ff2e9a); font-weight: 800; display: inline-block;
          animation: dw-killed-pulse 2.2s ease-in-out infinite; text-shadow: 0 0 18px var(--dw-glow-magenta-soft); }
        @keyframes dw-killed-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); text-shadow: 0 0 34px var(--dw-glow-magenta); } }
        @media (prefers-reduced-motion: reduce) { .dw-killed { animation: none; } }
      `}</style>
    </section>
  );
}

function DangerFraming({ lang }: { lang: Lang }) {
  const rtl = lang === 'ar';
  const chips: { en: string; ar: string }[] = [
    { en: 'Real', ar: 'حقيقة' },
    { en: 'Harmful', ar: 'مضرّة' },
    { en: 'Dangerous', ar: 'خطيرة' },
    { en: 'The single most dangerous thing around you', ar: 'أخطر حاجة حواليك' },
  ];
  return (
    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
      <div
        role="list"
        aria-label="Escalation"
        dir={rtl ? 'rtl' : 'ltr'}
        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'center', gap: '0.45rem 0.9rem', cursor: 'default', userSelect: 'none' }}
      >
        {chips.map((ch, i) => {
          const last = i === chips.length - 1;
          return (
            <span
              key={ch.en}
              role="listitem"
              style={{
                borderInlineStart: `2px solid rgba(255,46,154,${last ? 0.9 : 0.5})`,
                color: last ? 'var(--dw-bone, #E8E2D6)' : '#ff7ac8',
                padding: '0.1rem 0 0.1rem 0.55rem',
                fontSize: '14px',
                fontWeight: last ? 700 : 600,
                fontFamily: rtl ? 'var(--font-heading-ar), sans-serif' : undefined,
              }}
            >
              {lang === 'en' ? ch.en : ch.ar}
            </span>
          );
        })}
      </div>

      {lang === 'en' ? (
        <p className="prb-frame" dir="ltr">
          This isn&apos;t “just information.” It&apos;s real, it&apos;s harmful, it&apos;s dangerous —
          the single most dangerous thing around you — and it has <span className="dw-killed">killed</span>.
        </p>
      ) : (
        <p className="prb-frame" dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
          دي مش «مجرد معلومات». دي حقيقة، ومضرّة، وخطيرة — أخطر حاجة حواليك — و<span className="dw-killed">قتلت</span> بالفعل.
        </p>
      )}

      <style>{`
        .prb-frame { margin: 2rem auto 0; max-width: 54ch; font-size: clamp(1.15rem, 3vw, 1.55rem); font-weight: 500; line-height: 1.6; color: var(--dw-bone, #E8E2D6); }
      `}</style>
    </div>
  );
}

export default ProblemSection;
