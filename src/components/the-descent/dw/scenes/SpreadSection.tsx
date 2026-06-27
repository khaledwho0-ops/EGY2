'use client';
/* ═══════════════════════════════════════════════════════════════
 * SpreadSection — id="spread" — one lie, every platform. Name-free.
 * EN⇄ع toggle (single language), legible platform tiles, single-language
 * sourced stat. Cinematic.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';
import { SECTION_COPY } from '../../descent-data';

type Lang = 'en' | 'ar';

const PLATFORMS = [
  { name: 'FACEBOOK', color: '#1877F2' },
  { name: 'TIKTOK', color: '#ff2d55' },
  { name: 'X', color: '#cfd2d6' },
  { name: 'YOUTUBE', color: '#ff3b3b' },
  { name: 'WHATSAPP', color: '#25D366' },
] as const;

export function SpreadSection() {
  const c = SECTION_COPY.spread;
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b?: { en: string; ar: string }) => (b ? (lang === 'en' ? b.en : b.ar) : '');

  return (
    <section id="spread" data-descent-section="spread" className="dws" aria-label="The lie on every platform">
      <div className="dws-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dws-in ${shown ? 'is-in' : ''}`}>
        <div className="dws-head">
          {c.kicker && (
            <div className="dws-kick">{c.kicker.en} · <span dir="rtl">{c.kicker.ar}</span></div>
          )}
          <h2 className="dws-title" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.headline)}</h2>
          {c.sub && <p className="dws-sub" dir={rtl ? 'rtl' : 'ltr'}>{pick(c.sub)}</p>}
        </div>

        <div className="dws-grid">
          {PLATFORMS.map((p, i) => (
            <div
              key={p.name}
              className="dws-p"
              style={{ borderColor: `${p.color}66`, color: p.color, animationDelay: `${i * 0.32}s` }}
            >
              <span className="dws-pn">{p.name}</span>
              <span className="dws-stamp" dir="rtl">كذبة</span>
            </div>
          ))}
        </div>

        <div className="dws-stat">
          <Sourced
            value="14.5%"
            tier="A"
            source="Egyptian Cabinet Media Centre, 2025"
            labelEn={lang === 'en' ? 'of everything read in Egypt is false — and anyone can believe it. Not stupidity: design.' : undefined}
            labelAr={lang === 'ar' ? 'من كل اللي بيتقري في مصر… كذب. وأي حد ممكن يصدّقه — مش غباء، ده تصميم.' : undefined}
            accent="#FF4D9E"
          />
        </div>
      </div>

      <style>{`
        .dws{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
          padding:clamp(64px,12vh,120px) clamp(20px,5vw,48px);overflow:hidden;font-family:var(--font-body,'Inter',system-ui,sans-serif)}
        .dws-lang{position:absolute;top:clamp(20px,3vh,32px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;
          border:1px solid rgba(255,77,158,0.4);border-radius:999px;overflow:hidden;background:rgba(0,0,0,0.4)}
        .dws-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#d4a3c5;background:transparent;border:0;cursor:pointer}
        .dws-lang button[data-on="true"]{color:#1a0510;background:#FF4D9E;font-weight:700}
        .dws-in{position:relative;z-index:2;width:100%;max-width:760px;text-align:center;
          opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)}
        .dws-in.is-in{opacity:1;transform:none}
        .dws-kick{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;letter-spacing:3px;
          text-transform:uppercase;color:#9a8aa0}
        .dws-title{font-weight:800;font-size:clamp(24px,4.4vw,42px);line-height:1.3;color:#fff;margin:.6rem 0 0;text-shadow:0 0 30px rgba(255,46,154,.3)}
        .dws-title[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal','Cairo',sans-serif;font-weight:900}
        .dws-sub{font-size:15px;color:#bdb2bf;margin:.7rem 0 0}
        .dws-sub[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dws-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin:2.2rem auto 0;max-width:560px}
        .dws-p{aspect-ratio:1;border-radius:16px;display:flex;flex-direction:column;align-items:center;
          justify-content:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid;position:relative;
          animation:dws-pulse 3s ease-in-out infinite}
        .dws-pn{font-size:11px;font-weight:700;font-family:var(--font-mono,'Space Mono',monospace);letter-spacing:.5px}
        .dws-stamp{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-size:11px;color:rgba(255,77,158,.75);font-weight:700}
        @keyframes dws-pulse{0%,100%{transform:translateY(0);box-shadow:0 0 0 rgba(255,46,154,0)}
          50%{transform:translateY(-5px);box-shadow:0 10px 30px rgba(255,46,154,.16)}}
        .dws-stat{margin:2.4rem auto 0;display:flex;justify-content:center}
        @media (max-width:600px){.dws-grid{grid-template-columns:repeat(2,1fr);max-width:300px}}
        @media (prefers-reduced-motion:reduce){.dws-p{animation:none}.dws-in{transition:none}}
      `}</style>
    </section>
  );
}
export default SpreadSection;
