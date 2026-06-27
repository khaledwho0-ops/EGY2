'use client';
/* ═══════════════════════════════════════════════════════════════
 * DecontextSection — id="layer-3" — DECONTEXTUALIZATION (v5 · the real case).
 * A REAL, documented, sourced quote-mine, made dead-simple for a zero-
 * background reader: Darwin concedes the eye SEEMS absurd to have evolved,
 * then answers his own doubt — quote-miners keep the doubt, delete the
 * answer, so the man who proved evolution sounds like he doubted it.
 * Source: Darwin, On the Origin of Species (1859), ch. 6. EN⇄ع toggle.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { useReveal } from '../useReveal';
import { Sourced } from '../../shared/Sourced';

type Lang = 'en' | 'ar';
const VIOLET = '#A855F7';
const GOLD = '#F0C36A';
const RED = '#FF4646';

const C = {
  plain: {
    en: 'Take a real quote. Keep the doubt. Delete the answer. Now the author says the opposite.',
    ar: 'خُد اقتباس حقيقي. سيب الشك. امسح الإجابة. صاحب الكلام يبقى بيقول العكس.',
  },
  lblTrue: { en: 'What Darwin actually wrote', ar: 'اللي داروين كتبه فعلاً' },
  clauseA: {
    en: '“…the eye being formed by natural selection seems absurd in the highest degree.',
    ar: '«…تكوُّن العين بالانتقاء الطبيعي يبدو عبثًا للدرجة القصوى.',
  },
  clauseB: {
    en: ' Yet reason tells me — if small, useful steps existed — that difficulty can hardly be considered real.”',
    ar: ' لكنّ العقل يقول لي — لو وُجدت خطوات صغيرة نافعة — فإن تلك الصعوبة بالكاد تُعَدّ حقيقية.»',
  },
  lblCut: { en: 'What they quote', ar: 'اللي بيقتبسوه' },
  readsAs: {
    en: '“Even Darwin admitted the eye is too perfect to have evolved.”',
    ar: '«حتى داروين اعترف إن العين أكمل من إنها تكون اتطوّرت.»',
  },
  aha: {
    en: 'Same quote. They deleted the half where he answers his own doubt — so the man who proved evolution sounds like he doubted it.',
    ar: 'نفس الاقتباس. مسحوا النص اللي بيرُدّ فيه على شكّه — فالراجل اللي أثبت التطوّر يبان وكأنه بيشكّك فيه.',
  },
  bridge: {
    en: 'One snip turns an author into a witness against himself. The same scissors clip a doctor, a scholar, a verse.',
    ar: 'قصّة واحدة بتحوّل صاحب الكلام لشاهد ضدّ نفسه. نفس المقص بيقصّ دكتور، وعالِم، وآية.',
  },
  source: 'Charles Darwin, On the Origin of Species (1859), ch. 6',
  techName: { en: 'this trick has a name: quote-mining', ar: 'اللعبة دي ليها اسم: «الاقتطاع من السياق»' },
};

export function DecontextSection() {
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);

  return (
    <section id="layer-3" data-descent-section="layer-3" className="dl3" aria-label="Layer 3 — Decontextualization">
      <div className="dl3-bg" aria-hidden />
      <div className="dl3-grid" aria-hidden />
      <div className="dl3-num" aria-hidden>−3</div>
      <div className="dl3-quote dl3-quote-l" aria-hidden>“</div>
      <div className="dl3-quote dl3-quote-r" aria-hidden>”</div>
      <div className="dl3-lb dl3-lb-top" aria-hidden /><div className="dl3-lb dl3-lb-bot" aria-hidden />
      <div className="dl3-vig" aria-hidden />

      <div className="dl3-lang" role="group" aria-label="Language">
        <button type="button" data-on={lang === 'en'} onClick={() => setLang('en')}>EN</button>
        <button type="button" data-on={lang === 'ar'} onClick={() => setLang('ar')}>ع</button>
      </div>

      <div ref={ref} className={`dl3-in ${shown ? 'is-in' : ''}`}>
        <div className="dl3-kick">الطبقة ٠٣ · Layer 03 · Decontextualization · نزع السياق</div>
        <p className="dl3-plain" dir={rtl ? 'rtl' : 'ltr'}>{pick(C.plain)}</p>

        <div className="dl3-demo">
          {/* CARD 1 · what Darwin actually wrote */}
          <div className="dl3-card dl3-card-true" dir={rtl ? 'rtl' : 'ltr'}>
            <span className="dl3-card-lbl dl3-lbl-true">✓ {pick(C.lblTrue)}</span>
            <p className="dl3-sentence">
              {pick(C.clauseA)}<span className="dl3-key">{pick(C.clauseB)}</span>
            </p>
          </div>

          <div className="dl3-scissor" aria-hidden>
            <span className="dl3-scissor-ic">✂</span>
            <span className="dl3-scissor-line" />
            <span className="dl3-scissor-note">{lang === 'en' ? 'they cut the answer' : 'بيقصّوا الإجابة'}</span>
          </div>

          {/* CARD 2 · what they quote */}
          <div className="dl3-card dl3-card-cut" dir={rtl ? 'rtl' : 'ltr'}>
            <span className="dl3-card-lbl dl3-lbl-cut">✕ {pick(C.lblCut)}</span>
            <p className="dl3-sentence">
              <span className="dl3-frag">{pick(C.clauseA)}”</span><span className="dl3-snip">{pick(C.clauseB)}</span>
            </p>
            <p className="dl3-reads" dir={rtl ? 'rtl' : 'ltr'}>
              {lang === 'en' ? 'reads as: ' : 'بتتقري: '}<b>{pick(C.readsAs)}</b>
            </p>
          </div>
        </div>

        {/* One-Law: the real source */}
        <div className="dl3-src"><Sourced value="Tier A" tier="A" source={C.source} accent={VIOLET} inline /></div>

        <p className="dl3-aha" dir={rtl ? 'rtl' : 'ltr'}>{pick(C.aha)}</p>
        <p className="dl3-bridge" dir={rtl ? 'rtl' : 'ltr'}>{pick(C.bridge)}</p>
        <p className="dl3-tech">{pick(C.techName)}</p>
      </div>

      <style>{`
        .dl3{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;
          padding:clamp(80px,11vh,140px) clamp(18px,5vw,56px);background:#08040f;font-family:var(--font-body,'Inter',system-ui,sans-serif);isolation:isolate}
        .dl3-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(125% 95% at 50% 38%,#2a0f4e 0%,#160a2c 44%,#070310 82%);animation:dl3-kb 24s ease-in-out infinite alternate}
        @keyframes dl3-kb{from{transform:scale(1.02)}to{transform:scale(1.08)}}
        .dl3-grid{position:absolute;inset:0;z-index:0;opacity:.3;background-image:linear-gradient(90deg,${VIOLET}1c 1px,transparent 1px),linear-gradient(${VIOLET}12 1px,transparent 1px);background-size:54px 54px;
          -webkit-mask-image:radial-gradient(ellipse 74% 72% at 50% 46%,#000,transparent 78%);mask-image:radial-gradient(ellipse 74% 72% at 50% 46%,#000,transparent 78%);animation:dl3-drift 28s linear infinite}
        @keyframes dl3-drift{to{background-position:54px 0}}
        .dl3-num{position:absolute;left:-4%;top:50%;transform:translateY(-50%);z-index:0;font-family:'Anton',sans-serif;font-size:clamp(260px,44vw,600px);line-height:.64;color:transparent;-webkit-text-stroke:2.5px rgba(168,85,247,.1)}
        .dl3-quote{position:absolute;z-index:0;font-family:Georgia,serif;font-size:clamp(170px,28vw,400px);line-height:.7;color:rgba(168,85,247,.08)}
        .dl3-quote-l{left:3%;top:4%}.dl3-quote-r{right:3%;bottom:-2%}
        .dl3-lb{position:absolute;left:0;right:0;height:5.5%;background:#000;z-index:6}.dl3-lb-top{top:0}.dl3-lb-bot{bottom:0}
        .dl3-vig{position:absolute;inset:0;z-index:5;pointer-events:none;box-shadow:inset 0 0 240px 60px rgba(4,2,8,.86)}

        .dl3-lang{position:absolute;top:calc(5.5% + 14px);right:clamp(16px,4vw,40px);z-index:9;display:inline-flex;border:1px solid rgba(168,85,247,.4);border-radius:999px;overflow:hidden;background:rgba(0,0,0,.4)}
        .dl3-lang button{font-family:var(--font-mono,'Space Mono',monospace);font-size:12px;padding:5px 13px;color:#c9a9ef;background:transparent;border:0;cursor:pointer}
        .dl3-lang button[data-on="true"]{color:#08040f;background:${VIOLET};font-weight:700}

        .dl3-in{position:relative;z-index:7;width:100%;max-width:760px;text-align:center;display:flex;flex-direction:column;align-items:center;
          opacity:0;transform:translateY(26px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}
        .dl3-in.is-in{opacity:1;transform:none}
        .dl3-kick{font-family:var(--font-mono,'Space Mono',monospace);font-size:11.5px;letter-spacing:3px;text-transform:uppercase;color:#c79eff;line-height:1.6}
        .dl3-plain{font-weight:800;font-size:clamp(20px,3.2vw,34px);color:#fff;margin-top:12px;max-width:26ch;line-height:1.32;text-shadow:0 3px 26px #000}
        .dl3-plain[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}

        .dl3-demo{display:flex;flex-direction:column;gap:12px;width:100%;max-width:640px;margin:clamp(24px,4vh,40px) auto 0}
        .dl3-card{border-radius:16px;padding:16px 20px;text-align:start;backdrop-filter:blur(8px)}
        .dl3-card-true{border:1px solid ${GOLD}55;background:linear-gradient(160deg,${GOLD}12,rgba(20,12,28,.5))}
        .dl3-card-cut{border:1px solid ${RED}66;background:linear-gradient(160deg,${RED}14,rgba(20,8,12,.55));box-shadow:0 0 36px -18px ${RED}}
        .dl3-card-lbl{display:inline-block;font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;margin-bottom:9px}
        .dl3-lbl-true{color:${GOLD}}.dl3-lbl-cut{color:#ff8a8a}
        .dl3-sentence{font-size:clamp(15.5px,2.1vw,20px);font-weight:500;line-height:1.6;color:#efe7d8}
        .dl3-card[dir=rtl] .dl3-sentence{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:600}
        .dl3-key{color:${GOLD};font-weight:800;text-shadow:0 0 16px ${GOLD}55;background:${GOLD}1a;border-radius:4px;padding:0 3px}
        .dl3-frag{color:#fff;font-weight:700}
        .dl3-snip{color:#7a6a66;text-decoration:line-through;text-decoration-color:${RED};text-decoration-thickness:2px;opacity:.6}
        .dl3-reads{margin-top:12px;font-size:clamp(13px,1.7vw,15px);color:#ffd0d0}
        .dl3-reads b{color:#fff;font-weight:800}
        .dl3-card[dir=rtl] .dl3-reads{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dl3-scissor{display:flex;align-items:center;gap:10px;justify-content:center;color:${RED}}
        .dl3-scissor-ic{font-size:18px;animation:dl3-snip 3s ease-in-out infinite}
        @keyframes dl3-snip{0%,100%{transform:rotate(0)}50%{transform:rotate(-18deg)}}
        .dl3-scissor-line{height:2px;width:80px;background:repeating-linear-gradient(90deg,${RED} 0 8px,transparent 8px 16px)}
        .dl3-scissor-note{font-family:var(--font-mono,'Space Mono',monospace);font-size:10.5px;letter-spacing:1px;text-transform:uppercase;color:#ff8a8a}

        .dl3-src{margin-top:14px;display:flex;justify-content:center}
        .dl3-aha{margin-top:clamp(22px,3.5vh,38px);max-width:46ch;font-weight:800;font-size:clamp(17px,2.4vw,24px);color:#fff;line-height:1.45;text-shadow:0 3px 24px #000}
        .dl3-aha[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif;font-weight:900}
        .dl3-bridge{margin-top:14px;max-width:56ch;font-size:clamp(14px,1.9vw,17px);line-height:1.65;color:#cdbce6}
        .dl3-bridge[dir=rtl]{font-family:var(--font-heading-ar),'Tajawal',sans-serif}
        .dl3-tech{margin-top:16px;font-family:var(--font-mono,'Space Mono',monospace);font-size:11px;letter-spacing:1px;color:#9784b3;border:1px solid rgba(168,85,247,.3);border-radius:999px;padding:5px 14px}
        .dl3-tech[dir]{}

        @media (max-width:560px){.dl3-num{font-size:60vw}}
        @media (prefers-reduced-motion:reduce){.dl3-bg,.dl3-grid,.dl3-scissor-ic{animation:none}.dl3-in{transition:none}}
      `}</style>
    </section>
  );
}
export default DecontextSection;
