"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useTheme, THEME_OPTIONS } from '@/components/shared/theme-provider';
import { DECEPTION_LAYERS } from '@/lib/standard';

/**
 * PHILOSOPHY PAGE — Premium, theme-reactive manifesto for EAL.
 * Route: /philosophy
 * Styled entirely with theme tokens (var(--…)) so it re-grades LIVE with the
 * 16 art-directed grades + contrast control. Real grain (--surface-noise),
 * Playfair display typography, eased reveals, reduced-motion safe.
 */

const SECTIONS = [
  {
    id: "factcheck",
    num: "01",
    icon: "🔍",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    title: "The Problem with Fact-Checking Alone",
    titleAr: "مشكلة التحقق من الحقائق وحده",
    body: `Fact-checking is reactive. It tackles individual claims after they've already spread. For every debunked myth, ten new ones emerge. Traditional fact-checking platforms (Snopes, AFP, Misbar) play whack-a-mole with an infinite stream of misinformation.

The deeper problem is the cognitive soil — the mental architecture that makes people susceptible to misinformation in the first place. If someone shares a false vaccine claim, fact-checking that claim leaves their underlying belief patterns unchanged. They'll be equally susceptible to the next false claim.

Research shows that debunking can even backfire (the "backfire effect") — strengthening false beliefs when directly contradicted in certain psychological contexts (Lewandowsky et al., 2012).`,
    bodyAr: `التحقق من الحقائق هو نهج رد الفعل. يتناول الادعاءات الفردية بعد انتشارها. لكل أسطورة مفنّدة، تظهر عشر أساطير جديدة. المنصات التقليدية تلعب "ضرب الخلد" مع تدفق لا نهاية له من المعلومات المضللة.

المشكلة الأعمق هي التربة المعرفية — البنية الذهنية التي تجعل الناس عرضة للمعلومات المضللة في المقام الأول.`,
    citation: "Lewandowsky, S., et al. (2012). Misinformation and its correction. Psychological Science in the Public Interest, 13(3), 106-131.",
  },
  {
    id: "inoculation",
    num: "02",
    icon: "💉",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    title: "Inoculation Theory: The Science Behind Our Method",
    titleAr: "نظرية التلقيح: العلم وراء منهجنا",
    body: `Inoculation Theory, developed by William McGuire in 1961 and significantly advanced by Compton (2013), draws on the medical analogy of vaccination. Just as vaccines expose the immune system to a weakened pathogen to build resistance, cognitive inoculation exposes people to weakened forms of manipulative arguments — "prebunking" — building mental antibodies before the real misinformation arrives.

Key findings:
• Roozenbeek et al. (2022): Psychological inoculation reduces vaccine misinformation sharing by 52%
• Van der Linden et al. (2017): "Inoculation against misinformation" — pre-emptive exposure outperforms post-hoc debunking
• Cook et al. (2017): "Neutralizing misinformation through inoculation" — reducing climate science denial

EAL's 144-day curriculum is structured as a graduated inoculation sequence — each phase exposing learners to progressively stronger forms of manipulation with guided analysis tools.`,
    bodyAr: `نظرية التلقيح، طورها ماكغواير عام 1961، تشبه لقاح الجسم: التعرض لشكل ضعيف من المعلومات المضللة يبني مناعة معرفية ضد الأشكال الأقوى.

المنهج الدراسي لمنصة الوعي المصري هو تسلسل تلقيح متدرج — كل مرحلة تعرض المتعلمين لأشكال أقوى من التلاعب مع أدوات التحليل الإرشادي.`,
    citation: "Roozenbeek, J., et al. (2022). Psychological inoculation improves resilience against misinformation on social media. Science Advances, 8(12). | Compton, J. (2013). Inoculation Theory. SAGE Handbook of Persuasion.",
  },
  {
    id: "immunity",
    num: "03",
    icon: "🧠",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    title: "Cognitive Immunity vs. Content Moderation",
    titleAr: "المناعة المعرفية مقابل إدارة المحتوى",
    body: `Content moderation is a top-down, centralized approach that treats citizens as passive recipients of curated information. It requires constant surveillance, raises censorship concerns, and creates single points of failure.

Cognitive immunity is bottom-up, distributed, and permanent. It builds internal capacity for critical evaluation — empowering individuals to identify manipulation regardless of topic, platform, or language.

The distinction matters at scale:
• Content moderation of 40M Egyptian WhatsApp users is logistically impossible
• Cognitive immunity training reaches every citizen's mind — and stays there
• Bloom's Taxonomy (1956): Deep learning (analysis, evaluation, synthesis) vs. surface knowledge
• Cognitive Behavioral frameworks show that targeting underlying thought patterns yields permanent behavior change

Our platform doesn't remove bad content — it makes citizens impervious to it.`,
    bodyAr: `إدارة المحتوى نهج مركزي من الأعلى للأسفل — يعامل المواطنين كمستقبلين سلبيين. المناعة المعرفية نهج موزع من الأسفل للأعلى يبني قدرة داخلية دائمة.

منصتنا لا تزيل المحتوى السيئ — تجعل المواطنين محصنين ضده.`,
    citation: "Bloom, B.S. (1956). Taxonomy of Educational Objectives. | Cognitive Behavioral Therapy frameworks — Beck (1979), Ellis (1962).",
  },
  {
    id: "dual",
    num: "04",
    icon: "⚖️",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    title: "The Dual-Mandate Philosophy",
    titleAr: "فلسفة التفويض المزدوج",
    body: `Egypt's information environment is unique. It is simultaneously shaped by global digital networks AND deep religious epistemological frameworks. Any platform that ignores either dimension fails to reach half the population.

The secular failure: Western fact-checking platforms (Snopes, AFP) have near-zero penetration in religious Egyptian communities because they speak a purely secular language of "evidence" that doesn't resonate with Islamic epistemological frameworks of trust (ijaza chains, hadith authentication, scholarly consensus).

The religious failure: Islamic platforms focus on text verification without systematic critical thinking training, leaving users vulnerable to secular manipulation techniques.

EAL bridges both:
• Scientific pillar: ASA statistical guidelines, peer-reviewed citations, psychometric instruments (MIST-20)
• Islamic pillar: Maqasid al-Shariah (protecting العقل — intellect), Usul al-Fiqh methodology, 9 scholarly tools

Protecting the mind (العقل) is the 3rd of the 5 objectives of Islamic law — cognitive literacy is not just civic, it is a religious duty.`,
    bodyAr: `بيئة المعلومات في مصر فريدة: تتشكل بالشبكات الرقمية العالمية والأطر المعرفية الدينية العميقة معاً. أي منصة تتجاهل أياً من البُعدين تفشل في الوصول إلى نصف السكان.

حماية العقل هي ثالث المقاصد الخمس للشريعة الإسلامية — ثقافة المعلومات ليست مدنية فقط، بل واجب ديني.`,
    citation: "Ibn Ashur — Maqasid al-Shariah al-Islamiyya. | Al-Ghazali — Al-Mustasfa fi Usul al-Fiqh. | Dar al-Ifta al-Missriyya — contemporary positions on information ethics.",
  },
  {
    id: "arabic",
    num: "05",
    icon: "🌍",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    title: "Arabic-First Design Philosophy",
    titleAr: "فلسفة التصميم العربي أولاً",
    body: `Most Arabic technology is a translation afterthought — English-first systems with RTL text bolted on. EAL is different: it is Arabic-first by architecture.

What Arabic-first means in practice:
• Cairo Egyptian dialect detection via NLP — not just Modern Standard Arabic
• RTL-native UX patterns — not mirrored LTR layouts
• Egyptian cultural context built in: WhatsApp group dynamics, CAPMAS data, Ministry of Health references
• Islamic scholarly voice integrated into the core — not as a module, but as a first-class citizen
• Egyptian examples throughout: real misinformation circulated in Egyptian WhatsApp groups

The linguistic dimension is critical: research shows people process information more deeply in their native dialect (Bourhis & Marshall, 1999). Critical thinking skills built in Modern Standard Arabic may not transfer to WhatsApp dialect contexts.`,
    bodyAr: `معظم التكنولوجيا العربية هي ترجمة لاحقة — أنظمة تُفكر بالإنجليزية وتُترجم للعربية. منصة الوعي المصري عربية أولاً في بنيتها المعمارية.

البحث يُظهر أن الناس يعالجون المعلومات بعمق أكبر في لهجتهم الأصلية — مهارات التفكير النقدي المبنية باللغة الفصحى قد لا تنتقل لسياقات لهجة واتساب.`,
    citation: "Bourhis, R.Y., & Marshall, D.E. (1999). The United States and Canada. In J. Fishman (Ed.), Handbook of Language and Ethnic Identity.",
  },
  {
    id: "ethics",
    num: "06",
    icon: "🛡️",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
    title: "Our Ethical Framework",
    titleAr: "إطارنا الأخلاقي",
    body: `EAL operates under a clear ethical framework that distinguishes us from surveillance-based content moderation:

1. Empowerment, not surveillance: We build internal capacity, not external control. No user content is stored, analyzed, or reported.

2. Transparency: Our AI models are named, our citations are real, our methodology is documented. No black-box judgments.

3. Epistemological pluralism: We respect that scientific and Islamic epistemological frameworks are both legitimate systems for evaluating truth claims. We teach critical thinking within both frameworks, not replacement of one by the other.

4. Access equity: The platform is free to use. Cognitive immunity should not be a privilege of the educated elite.

5. Anti-manipulation commitment: Our OSINT and forensic tools are strictly for truth-seeking. We explicitly reject weaponization for disinformation campaigns.

The GDPR-inspired principle: Users are data subjects with rights, not data sources for optimization.`,
    bodyAr: `الإطار الأخلاقي لمنصة الوعي المصري:
١. التمكين لا المراقبة — نبني قدرة داخلية، لا نراقب المحتوى
٢. الشفافية — نماذجنا مُسماة، استشهاداتنا حقيقية، منهجيتنا موثقة
٣. التعددية المعرفية — نحترم الأطر العلمية والإسلامية كليهما
٤. عدالة الوصول — المنصة مجانية الاستخدام
٥. الالتزام بمكافحة التلاعب — أدواتنا للبحث عن الحقيقة حصراً`,
    citation: "General Data Protection Regulation (GDPR) — EU 2016/679. | UNESCO Recommendation on the Ethics of Artificial Intelligence, 2021.",
  },
  {
    id: "vision",
    num: "07",
    icon: "🔭",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.15)",
    title: "The Vision: 2030",
    titleAr: "الرؤية: 2030",
    body: `بناء مناعة معرفية — Building Cognitive Immunity.

By 2030, EAL aims to:
• Reach 10 million Egyptians through the 144-day cognitive immunity curriculum
• Partner with Egyptian Ministry of Education to integrate media literacy into school curricula
• Publish peer-reviewed research on Arabic inoculation theory effectiveness
• Expand the Arabic-first model to 22 Arab League nations
• Train 100,000 community "Cognitive Immunity Ambassadors" — citizens who can train their communities
• Develop the first validated Arabic-language psychometric instrument for misinformation susceptibility

The UN calls information literacy a human right (Resolution A/75/592). We intend to make that right a reality for every Arabic speaker.

This is not a startup. This is a civilization project.`,
    bodyAr: `بحلول 2030، تهدف منصة الوعي المصري إلى:
• الوصول إلى 10 ملايين مصري عبر منهج المناعة المعرفية
• الشراكة مع وزارة التعليم المصرية لدمج ثقافة الإعلام في المناهج المدرسية
• نشر أبحاث محكّمة حول فعالية نظرية التلقيح بالعربية
• التوسع في النموذج العربي الأصيل إلى دول جامعة الدول العربية الـ22

هذا ليس شركة ناشئة. هذا مشروع حضاري.`,
    citation: "UN General Assembly Resolution A/75/592. | UNESCO — Media and Information Literacy. | Egyptian Vision 2030 — Knowledge Society pillar.",
  },
];

/* The Truth Stack — the 4 anti-hallucination strategies from the Scientific Standard §2 */
const TRUTH_STACK = [
  { n: "01", name: "Grounding", ar: "التأصيل", desc: "The engine never answers from memory. Every claim is retrieved first — OpenAlex, EuropePMC, WHO, and authentic Islamic sources. No retrieval, no answer." },
  { n: "02", name: "Provenance", ar: "الإسناد", desc: "Cite or abstain. No source means no claim. Every fact carries a resolvable, tiered citation — and “I don’t know” is a correct answer; fabrication never is." },
  { n: "03", name: "Consensus", ar: "الإجماع", desc: "A single model’s confidence is worthless. Independent models cross-check; disagreement is surfaced as CONTESTED, never silently resolved to one side." },
  { n: "04", name: "Self-Critique", ar: "النقد الذاتي", desc: "The system attacks its own answer — flagging every sentence the sources do not support, before a single word reaches you." },
];

/* The 4 colour-grading disciplines behind the 16 grades */
const GRADING = [
  { name: "Filmic Contrast Curve", desc: "Lift–gamma–gain tone mapping. The Normal / High control below is a real grade applied to the whole surface — not a filter." },
  { name: "Split-Toning", desc: "Shadows and highlights pulled toward complementary hues for depth. It is the fingerprint of every named grade." },
  { name: "Complementary Harmony", desc: "Teal-and-orange cinematic balance keeps foreground type legible against graded depth." },
  { name: "LUT Palettes", desc: "Sixteen art-directed look-up tables — Bloodline, Amethyst Geode, Core Wine — each a full remap of the surface, switchable live." },
];

/* 12 UI/UX disciplines embodied on this page */
const CRAFT = [
  "Modular type scale", "8pt vertical rhythm", "Fluid clamp() sizing", "WCAG-AA contrast",
  "Optical alignment", "Film-grain texture", "Layered depth", "Eased motion",
  "Reduced-motion safe", "Gestalt grouping", "Focus-visible states", "Progressive disclosure",
];

/* Representative dot colour per grade (the page itself shows the true grade on click) */
const SWATCH: Record<string, string> = {
  bloodline: "#e11d48", terracotta: "#e2725b", amethyst: "#8b5cf6", dark: "#334155",
  light: "#e7e2d8", "olive-meadow": "#7c8a4f", "pearl-slate": "#94a3b8", "core-wine": "#7b2d3a",
  "blush-energy": "#f08a7a", "steel-azure": "#3b6ea5", "crimson-violet": "#b5179e", "deep-mocha": "#6b5648",
  "espresso-peony": "#7a5a4a", "raspberry-space": "#e0306e", "icy-gunmetal": "#64748b", "lilac-cream": "#c8a8d8",
};

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function PhilosophyPage() {
  const { resolvedTheme, contrastMode, setTheme, setContrastMode } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      setScrollProgress(h > 0 ? (el.scrollTop / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      }}
    >
      <style>{`
        @keyframes drift { 0%,100%{transform:translate3d(0,0,0) scale(1);} 50%{transform:translate3d(0,-18px,0) scale(1.04);} }
        @keyframes lineGrow { from{transform:scaleX(0);} to{transform:scaleX(1);} }
        .ph-serif { font-family:'Playfair Display', Georgia, serif; }
        .ph-arabic { font-family:'Cairo', sans-serif; }
        .ph-prose { font-size:clamp(15px,1.05vw,16.5px); line-height:1.9; color:var(--text-secondary); white-space:pre-wrap; letter-spacing:.005em; }
        .ph-cite { font-size:12px; color:var(--text-muted); font-style:italic; border-inline-start:2px solid var(--border-secondary); padding:10px 14px; margin-top:18px; line-height:1.7; }
        .ph-card { background:var(--bg-card); border:1px solid var(--border-primary); border-radius:20px; transition:transform .35s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .35s; }
        .ph-card:hover { transform:translateY(-3px); border-color:var(--border-secondary); box-shadow:var(--shadow-lg); }
        .ph-chip:focus-visible, .ph-link:focus-visible { outline:2px solid var(--accent-cta); outline-offset:3px; border-radius:10px; }
        .ph-grain { position:fixed; inset:0; pointer-events:none; z-index:2; opacity:.5; mix-blend-mode:soft-light; background-image:var(--surface-noise); background-size:180px 180px; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation:none !important; transition:none !important; }
          .reveal { opacity:1 !important; transform:none !important; }
        }
      `}</style>

      {/* Real grain texture (theme-defined) */}
      <div className="ph-grain" aria-hidden />

      {/* Scroll progress — graded by the active theme accent */}
      <div style={{ position: "fixed", top: 0, insetInline: 0, height: 3, zIndex: 1000, background: "var(--border-subtle)" }}>
        <div style={{ height: "100%", width: `${scrollProgress}%`, background: "var(--accent-cta)", boxShadow: "0 0 12px var(--accent-cta-glow)", transition: "width .1s linear" }} />
      </div>

      {/* Ambient depth — accent-token blobs that re-grade with the theme */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }} aria-hidden>
        <div style={{ position: "absolute", top: "-8%", insetInlineStart: "-6%", width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-cta-glow), transparent 70%)", filter: "blur(40px)", animation: "drift 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "4%", insetInlineEnd: "-8%", width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(circle, var(--accent-indigo, #8b5cf6)22, transparent 70%)", filter: "blur(50px)", animation: "drift 21s ease-in-out infinite 4s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 3, maxWidth: 1080, margin: "0 auto", padding: "0 24px 120px" }}>

        {/* ═══════════ HERO ═══════════ */}
        <header style={{ padding: "clamp(72px,11vh,128px) 0 clamp(40px,7vh,72px)", textAlign: "center" }}>
          <Reveal>
            <div className="ph-chip" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 18px", borderRadius: 100, background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", marginBottom: 30 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-cta)", boxShadow: "0 0 10px var(--accent-cta-glow)" }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Platform Manifesto · بيان المنصة</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="ph-serif" style={{ fontSize: "clamp(40px,7vw,86px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.02em", margin: 0 }}>
              The Architecture<br />of <span className="ph-serif" style={{ fontStyle: "italic", color: "var(--accent-cta)" }}>Awareness</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="ph-arabic" dir="rtl" style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 700, color: "var(--text-secondary)", margin: "18px 0 0" }}>
              نحن لا نُصحّح الأكاذيب — نبني عقولاً لا تُخدَع
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="ph-prose" style={{ maxWidth: 640, margin: "26px auto 0", textAlign: "center", color: "var(--text-secondary)" }}>
              A cognitive defense system, not a fact-checking site. Built on eight peer-reviewed behavioral theories to make a mind resistant to manipulation — before the lie ever arrives.
            </p>
          </Reveal>
        </header>

        {/* ═══════════ THE ONE LAW ═══════════ */}
        <Reveal>
          <section style={{ margin: "8px 0 64px" }}>
            <div className="ph-card" style={{ padding: "clamp(28px,4vw,48px)", textAlign: "center", borderColor: "var(--border-secondary)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>The One Law</div>
              <p className="ph-serif" style={{ fontSize: "clamp(22px,3.4vw,38px)", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.01em", margin: 0, color: "var(--text-primary)" }}>
                “No claim reaches the user without a real, resolvable source behind it.”
              </p>
              <p className="ph-prose" style={{ maxWidth: 560, margin: "20px auto 0", textAlign: "center" }}>
                Mock data, placeholder content, and confident-but-ungrounded AI text are the same failure: an unsourced claim. They are forbidden. <strong style={{ color: "var(--text-primary)" }}>Fail loud, never fake.</strong>
              </p>
            </div>
          </section>
        </Reveal>

        {/* ═══════════ THE FORMULA ═══════════ */}
        <Reveal>
          <section style={{ margin: "0 0 72px", textAlign: "center" }}>
            <div style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(10px,2vw,22px)" }}>
              <span className="ph-serif" style={{ fontSize: "clamp(16px,2.2vw,24px)", fontWeight: 700, color: "var(--text-primary)" }}>Strongest Real Tools</span>
              <span style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--accent-cta)" }}>⊗</span>
              <span className="ph-serif" style={{ fontSize: "clamp(16px,2.2vw,24px)", fontWeight: 700, color: "var(--text-primary)" }}>Concatenation Building</span>
            </div>
            <p className="ph-prose" style={{ maxWidth: 600, margin: "16px auto 0", textAlign: "center" }}>
              Every feature chains the best primary source for its domain into a real pipeline — retrieve → cross-verify → ground → guard → diagnose → defend. Never one weak call dressed as truth.
            </p>
          </section>
        </Reveal>

        {/* ═══════════ THE TRUTH STACK ═══════════ */}
        <SectionHeading kicker="Epistemic Guarantee" title="The Truth Stack" titleAr="مكدّس الحقيقة" sub="Four nets against hallucination. A false claim has to beat all four to reach you." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(248px,1fr))", gap: 18, marginBottom: 80 }}>
          {TRUTH_STACK.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div className="ph-card" style={{ padding: 26, height: "100%" }}>
                <div className="ph-serif" style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, color: "var(--accent-cta)", opacity: 0.85 }}>{s.n}</div>
                <h3 style={{ fontSize: 19, fontWeight: 800, margin: "14px 0 2px", letterSpacing: "-0.01em" }}>{s.name}</h3>
                <div className="ph-arabic" dir="rtl" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-muted)", marginBottom: 12 }}>{s.ar}</div>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-secondary)", margin: 0 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ═══════════ THE 8 LAYERS (from the executable standard) ═══════════ */}
        <SectionHeading kicker="Diagnostic Spine" title="The Eight Layers of Deception" titleAr="طبقات الخداع الثماني" sub="Every analyzed claim is classified into one of these — and answered with its defense." />
        <div style={{ display: "grid", gap: 12, marginBottom: 84 }}>
          {DECEPTION_LAYERS.map((l, i) => (
            <Reveal key={l.number} delay={Math.min(i * 45, 270)}>
              <div className="ph-card" style={{ padding: "18px 22px", display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div className="ph-serif" style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, color: "var(--text-muted)", minWidth: 44 }}>{String(l.number).padStart(2, "0")}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 14px" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "0.01em" }}>{l.name}</h3>
                    <span className="ph-arabic" dir="rtl" style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-cta)" }}>{l.nameAr}</span>
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)", margin: "7px 0 0" }}>{l.definition}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)", margin: "8px 0 0" }}><span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>🛡 Defense — </span>{l.defense}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ═══════════ THE 7 PHILOSOPHY SECTIONS ═══════════ */}
        <SectionHeading kicker="The Manifesto" title="Why We Build This Way" titleAr="لماذا نبني هكذا" sub="Seven convictions, each grounded in the literature." />
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 90 }}>
          {SECTIONS.map((sec, i) => (
            <Reveal key={sec.id} delay={i % 2 === 0 ? 0 : 60}>
              <article className="ph-card" style={{ padding: "clamp(24px,3.4vw,40px)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", insetInlineStart: 0, top: 0, bottom: 0, width: 3, background: sec.color, opacity: 0.7 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <span className="ph-serif" style={{ fontSize: 28, fontWeight: 800, color: sec.color }}>{sec.num}</span>
                  <span style={{ fontSize: 22 }}>{sec.icon}</span>
                </div>
                <h3 className="ph-serif" style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, lineHeight: 1.18, letterSpacing: "-0.01em", margin: "0 0 4px" }}>{sec.title}</h3>
                <div className="ph-arabic" dir="rtl" style={{ fontSize: 17, fontWeight: 700, color: "var(--text-muted)", marginBottom: 18 }}>{sec.titleAr}</div>
                <p className="ph-prose">{sec.body}</p>
                <p className="ph-arabic ph-prose" dir="rtl" style={{ marginTop: 14, color: "var(--text-muted)" }}>{sec.bodyAr}</p>
                <p className="ph-cite">{sec.citation}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ═══════════ COLOR GRADING LAB (live) ═══════════ */}
        <SectionHeading kicker="Real-Time Application" title="The Colour-Grading Lab" titleAr="معمل تدرّج الألوان" sub="This entire page re-grades the instant you pick a look. Four disciplines, sixteen LUTs, one live surface." />

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 26 }}>
            {GRADING.map((g, i) => (
              <div key={g.name} className="ph-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent-cta)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")}</div>
                <h4 style={{ fontSize: 15, fontWeight: 800, margin: "8px 0 6px" }}>{g.name}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Contrast curve toggle */}
        <Reveal>
          <div className="ph-card" style={{ padding: 22, marginBottom: 18, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>Filmic Contrast Curve</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Lift–gamma–gain · live on this surface</div>
            </div>
            <div style={{ display: "inline-flex", gap: 6, padding: 5, background: "var(--bg-secondary)", borderRadius: 12, border: "1px solid var(--border-primary)" }}>
              {(["normal", "high"] as const).map((m) => {
                const active = contrastMode === m;
                return (
                  <button key={m} className="ph-chip" onClick={() => setContrastMode(m)} aria-pressed={active}
                    style={{ padding: "9px 22px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 800, textTransform: "capitalize",
                      background: active ? "var(--accent-cta)" : "transparent", color: active ? "#fff" : "var(--text-secondary)", transition: "background .25s, color .25s" }}>
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* LUT palette grid */}
        <Reveal>
          <div className="ph-card" style={{ padding: 22 }}>
            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>LUT Palettes</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Sixteen art-directed grades — tap one and watch the whole page remap.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(168px,1fr))", gap: 10 }}>
              {THEME_OPTIONS.map((t) => {
                const active = resolvedTheme === t.value;
                return (
                  <button key={t.value} className="ph-chip" onClick={() => setTheme(t.value)} aria-pressed={active}
                    style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", textAlign: "start", cursor: "pointer", borderRadius: 13,
                      background: active ? "var(--bg-elevated)" : "var(--bg-secondary)",
                      border: `1px solid ${active ? "var(--accent-cta)" : "var(--border-primary)"}`,
                      boxShadow: active ? "0 0 0 1px var(--accent-cta), 0 8px 22px var(--accent-cta-glow)" : "none",
                      transition: "border-color .25s, background .25s, box-shadow .25s" }}>
                    <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg, ${SWATCH[t.value] || "#888"}, ${SWATCH[t.value] || "#888"}66)`, border: "1px solid var(--border-secondary)" }} />
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 800, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}</span>
                      <span style={{ display: "block", fontSize: 10.5, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.scheme}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ═══════════ CLOSING ═══════════ */}
        <Reveal>
          <section style={{ margin: "92px 0 0", textAlign: "center" }}>
            <p className="ph-serif" style={{ fontSize: "clamp(24px,3.6vw,40px)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0, color: "var(--text-primary)" }}>
              This is not a startup.<br />It is a civilization project.
            </p>
            <div style={{ height: 2, width: 120, margin: "30px auto 0", background: "var(--accent-cta)", transformOrigin: "center", animation: "lineGrow 1s cubic-bezier(.16,1,.3,1)" }} />
            <Link href="/" className="ph-link" style={{ display: "inline-block", marginTop: 34, padding: "13px 30px", borderRadius: 12, background: "var(--accent-cta)", color: "#fff", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 10px 30px var(--accent-cta-glow)" }}>
              Enter the Library →
            </Link>
          </section>
        </Reveal>

        {/* ═══════════ CRAFT CREDITS ═══════════ */}
        <Reveal>
          <footer style={{ marginTop: 70, paddingTop: 28, borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Crafted with 12 UI/UX disciplines</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {CRAFT.map((c) => (
                <span key={c} style={{ fontSize: 11.5, padding: "5px 12px", borderRadius: 100, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>{c}</span>
              ))}
            </div>
          </footer>
        </Reveal>
      </div>

      <PageNavigation currentPath="/philosophy" />
    </div>
  );
}

function SectionHeading({ kicker, title, titleAr, sub }: { kicker: string; title: string; titleAr: string; sub: string }) {
  return (
    <Reveal>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 34px" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent-cta)", marginBottom: 12 }}>{kicker}</div>
        <h2 className="ph-serif" style={{ fontSize: "clamp(28px,4.4vw,46px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>{title}</h2>
        <div className="ph-arabic" dir="rtl" style={{ fontSize: "clamp(17px,2.4vw,22px)", fontWeight: 700, color: "var(--text-muted)", marginTop: 6 }}>{titleAr}</div>
        <p className="ph-prose" style={{ marginTop: 14, textAlign: "center" }}>{sub}</p>
      </div>
    </Reveal>
  );
}
