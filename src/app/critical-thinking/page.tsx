"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { ListFilter, Search, Database, ShieldAlert, ArrowRight, ArrowLeft, Brain, Microscope, CheckCircle2 } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

const STEPS = [
  {
    id: 1,
    title: { en: "The Claim", ar: "الادعاء" },
    icon: <Search size={24} />,
    desc: { en: "Deconstruct the claim into its simplest falsifiable form.", ar: "تفكيك الادعاء إلى أبسط شكل قابل للدحض." },
    questions: [
      "What exactly is being claimed?",
      "Is it a statement of fact, an opinion, or a prediction?",
      "Can this claim be tested or proven false?"
    ]
  },
  {
    id: 2,
    title: { en: "The Source", ar: "المصدر" },
    icon: <Brain size={24} />,
    desc: { en: "Verify the credentials and potential biases of the origin.", ar: "التحقق من المؤهلات والتحيزات المحتملة للمصدر." },
    questions: [
      "Who is making this claim?",
      "Do they have relevant domain expertise (e.g., PhD in the specific field, Ijazah)?",
      "Do they have a financial or ideological conflict of interest?"
    ]
  },
  {
    id: 3,
    title: { en: "The Methodology", ar: "المنهجية" },
    icon: <ListFilter size={24} />,
    desc: { en: "Examine HOW they arrived at this claim.", ar: "فحص كيف توصلوا إلى هذا الادعاء." },
    questions: [
      "Was this a randomized controlled trial (RCT) or just an anecdote?",
      "Is the isnad chain unbroken? Are the narrators reliable?",
      "Did they use a rigorous framework (PRISMA, CONSORT)?"
    ]
  },
  {
    id: 4,
    title: { en: "The Data", ar: "البيانات" },
    icon: <Database size={24} />,
    desc: { en: "Audit the actual evidence provided.", ar: "تدقيق الأدلة الفعلية المقدمة." },
    questions: [
      "What is the sample size (N)? Is it statistically powerful?",
      "Is the historical text authentic and unmodified?",
      "Is the data cherry-picked or does it represent the full context?"
    ]
  },
  {
    id: 5,
    title: { en: "The Logic", ar: "المنطق" },
    icon: <ShieldAlert size={24} />,
    desc: { en: "Check for logical fallacies or cognitive biases.", ar: "التحقق من المغالطات المنطقية أو الانحيازات المعرفية." },
    questions: [
      "Does the conclusion logically follow from the premises?",
      "Are there any fallacies present (e.g., Post Hoc, Straw Man)?",
      "Is emotional manipulation or fear-mongering being used?"
    ]
  },
  {
    id: 6,
    title: { en: "The Conclusion", ar: "الاستنتاج" },
    icon: <CheckCircle2 size={24} />,
    desc: { en: "Formulate a probability-based verdict.", ar: "صياغة حكم مبني على الاحتمالات." },
    questions: [
      "What is the confidence level in this claim (e.g., 90% true, 10% likely)?",
      "What new evidence would change my mind?",
      "Is it necessary to act on this claim immediately?"
    ]
  }
];

export default function CriticalThinkingPage() {
  const { isRTL, t } = useRTL();
  const [activeStep, setActiveStep] = useState(1);
  const [claim, setClaim] = useState("");

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/six-layers" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Architecture", ar: "العودة إلى المعمارية" })}
          </Link>
        </nav>

        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 48px auto" }}>
          <Microscope size={48} style={{ color: "var(--accent-primary)", marginBottom: 16 }} />
          <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>{t({ en: "Critical Thinking Ladder", ar: "سلم التفكير النقدي" })}</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t({ 
              en: "A 6-step framework to manually deconstruct any claim, whether scientific or religious. Climb the ladder to reach the truth.", 
              ar: "إطار عمل من 6 خطوات لتفكيك أي ادعاء يدويًا، سواء كان علميًا أو دينيًا. تسلق السلم للوصول إلى الحقيقة." 
            })}
          </p>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto 48px auto" }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>{t({ en: "Enter a claim to run through the God-System Analysis:", ar: "أدخل ادعاء لتمريره عبر تحليل نظام God:" })}</label>
          <GodSystemTester isRTL={isRTL} t={t} claim={claim} setClaim={setClaim} />
        </div>

        {/* The Ladder */}
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: isRTL ? "3fr 1fr" : "1fr 3fr", gap: 32 }}>
          
          {/* Steps Navigation */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, order: isRTL ? 2 : 1 }}>
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 24px",
                  backgroundColor: activeStep === step.id ? "var(--accent-primary)" : "var(--bg-card)",
                  color: activeStep === step.id ? "var(--bg-base)" : "var(--text-muted)",
                  border: "1px solid", borderColor: activeStep === step.id ? "var(--accent-primary)" : "var(--border)",
                  borderRadius: "var(--radius-md)", cursor: "pointer", transition: "all 0.2s",
                  textAlign: isRTL ? "right" : "left", fontWeight: activeStep === step.id ? 700 : 500
                }}
              >
                <div style={{ flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: 2 }}>{t({ en: `Step ${step.id}`, ar: `الخطوة ${step.id}` })}</div>
                  <div style={{ fontSize: "1.1rem" }}>{step.title[isRTL ? 'ar' : 'en']}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div style={{ order: isRTL ? 1 : 2, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 48, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, color: "var(--accent-primary)" }}>
              {STEPS[activeStep - 1].icon}
              <h2 style={{ margin: 0, fontSize: "2rem", color: "var(--text-base)" }}>{STEPS[activeStep - 1].title[isRTL ? 'ar' : 'en']}</h2>
            </div>
            
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
              {STEPS[activeStep - 1].desc[isRTL ? 'ar' : 'en']}
            </p>

            <div style={{ backgroundColor: "var(--bg-base)", padding: 32, borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-primary)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem" }}>{t({ en: "Key Questions to Ask:", ar: "أسئلة رئيسية يجب طرحها:" })}</h3>
              <ul style={{ margin: 0, padding: isRTL ? "0 24px 0 0" : "0 0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
                {STEPS[activeStep - 1].questions.map((q, idx) => (
                  <li key={idx} style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {claim && (
              <div style={{ marginTop: 32, padding: 32, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: "var(--radius-md)", border: "1px dashed var(--accent-primary)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem", color: "var(--accent-primary)" }}>{t({ en: "Apply to your claim:", ar: "طبق على ادعائك:" })}</h3>
                <textarea 
                  placeholder={t({ en: "Write your analysis for this step here...", ar: "اكتب تحليلك لهذه الخطوة هنا..." })}
                  style={{ 
                    width: "100%", padding: 16, backgroundColor: "var(--bg-base)", border: "1px solid var(--border)", 
                    borderRadius: "var(--radius-sm)", color: "var(--text-base)", fontSize: "1rem", minHeight: 120,
                    resize: "vertical"
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
              <button 
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                style={{ padding: "12px 24px", backgroundColor: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--text-base)", cursor: activeStep === 1 ? "not-allowed" : "pointer", opacity: activeStep === 1 ? 0.5 : 1 }}
              >
                {t({ en: "Previous Step", ar: "الخطوة السابقة" })}
              </button>
              <button 
                onClick={() => setActiveStep(Math.min(6, activeStep + 1))}
                disabled={activeStep === 6}
                style={{ padding: "12px 24px", backgroundColor: "var(--accent-primary)", border: "none", borderRadius: "var(--radius-md)", color: "var(--bg-base)", cursor: activeStep === 6 ? "not-allowed" : "pointer", fontWeight: 600, opacity: activeStep === 6 ? 0.5 : 1 }}
              >
                {t({ en: "Next Step", ar: "الخطوة التالية" })}
              </button>
            </div>
          </div>

        </div>
      </div>
      <PageAIChatbot
        pageTitle="Critical Thinking Ladder — سلم التفكير النقدي"
        pageContext="Egyptian Awareness Library - Progressive critical thinking skills ladder from basic claim verification to advanced epistemological reasoning."
        systemPrompt={`You are an expert in critical thinking pedagogy based on Bloom's Taxonomy, the Paul-Elder Critical Thinking Framework, and the Socratic Method. Guide users through progressive levels of critical thinking: Level 1 (Identify claims and distinguish fact from opinion), Level 2 (Check sources — who said it, what are their credentials and conflicts of interest), Level 3 (Evaluate evidence — sample size, methodology, peer review status), Level 4 (Detect fallacies — ad hominem, straw man, false dilemma, appeal to authority), Level 5 (Construct counter-arguments — steel-manning, logical rebuttals), Level 6 (Metacognitive awareness — thinking about your own thinking, recognizing personal biases). Use Egyptian examples from media, social media, religious discourse, and health claims. Reference real Egyptian institutions like CAPMAS, Dar al-Ifta, Al-Azhar when relevant. Respond in the same language the user writes in.`}
        suggestedQuestions={['كيف أبدأ في تعلم التفكير النقدي؟', 'ما الفرق بين الرأي والحقيقة؟', 'How do I evaluate the quality of evidence?', 'What is metacognitive awareness?']}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
    </div>
  );
}

function GodSystemTester({ isRTL, t, claim, setClaim }: { isRTL: boolean, t: any, claim: string, setClaim: any }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!claim.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch('/api/god-system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim, intensity: 'firm' })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setIsAnalyzing(false);
  };

  return (
    <div>
      <textarea 
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder={t({ en: "Type or paste a claim here...", ar: "اكتب أو ألصق ادعاء هنا..." })}
        style={{ width: "100%", height: 120, padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-base)", marginBottom: 16, fontSize: "1rem", fontFamily: "inherit" }}
      />
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <button 
          onClick={handleTest}
          disabled={isAnalyzing || !claim.trim()}
          style={{ padding: "12px 32px", backgroundColor: "var(--accent-primary)", color: "#000", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1.05rem", cursor: isAnalyzing ? "wait" : "pointer", opacity: isAnalyzing ? 0.7 : 1 }}
        >
          {isAnalyzing ? t({ en: "Processing 6-Layer Engine...", ar: "جاري معالجة المحرك السداسي..." }) : t({ en: "Run Full Analysis", ar: "تشغيل التحليل الشامل" })}
        </button>
      </div>

      {result && (
        <div style={{ padding: 24, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", textAlign: "left" }}>
          {/* Remapped to the real /api/god-system schema (verdict, verdictExplanation_*,
              layer4.fallacies, layer2_EmotionalIntent.eis, layer7.socraticQuestion_*).
              The old fields (layers[0], overallVerdict, fallaciesDestroyed…) did not exist
              and crashed the render with a TypeError. Optional chaining throughout. */}
          <h4 style={{ margin: "0 0 12px 0", color: "var(--text-base)", fontSize: "1.2rem", textAlign: isRTL ? "right" : "left" }}>
            {t({ en: "Verdict: ", ar: "الحكم: " })}
            <span style={{ color: (result.verdict === 'DEBUNKED' || result.verdict === 'MISLEADING') ? 'var(--accent-warning)' : 'var(--accent-primary)' }}>
              {result.verdict || 'UNVERIFIED'}
            </span>
          </h4>
          {(isRTL ? result.verdictExplanation_ar : result.verdictExplanation_en) && (
            <p style={{ margin: "0 0 16px 0", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6, textAlign: isRTL ? "right" : "left" }}>
              {isRTL ? result.verdictExplanation_ar : result.verdictExplanation_en}
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, direction: isRTL ? "rtl" : "ltr" }}>
            <div style={{ padding: 16, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: 8 }}>
              <strong>{t({ en: "Fallacies Found:", ar: "المغالطات المكتشفة:" })}</strong> {result.layer4?.fallacies?.length ?? 0}
            </div>
            <div style={{ padding: 16, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: 8 }}>
              <strong>{t({ en: "Manipulation Score:", ar: "درجة التلاعب:" })}</strong> {Math.round((result.layer4?.overallManipulationScore ?? 0) * 100)}%
            </div>
            <div style={{ padding: 16, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: 8 }}>
              <strong>{t({ en: "Emotional-Intent:", ar: "شحنة الانفعال:" })}</strong> {Math.round((result.layer2_EmotionalIntent?.eis ?? 0) * 100)}/100
            </div>
            <div style={{ padding: 16, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: 8 }}>
              <strong>{t({ en: "Confidence:", ar: "الثقة:" })}</strong> {Math.round((result.verdictScore ?? 0) * 100)}%
            </div>
          </div>
          {(isRTL ? result.layer7?.socraticQuestion_ar : result.layer7?.socraticQuestion_en) && (
            <div style={{ marginTop: 24, fontSize: "0.95rem", color: "var(--text-muted)", textAlign: isRTL ? "right" : "left" }}>
              <strong>{t({ en: "Socratic Question:", ar: "سؤال سقراطي:" })}</strong> {isRTL ? result.layer7?.socraticQuestion_ar : result.layer7?.socraticQuestion_en}
            </div>
          )}
        </div>
      )}
      <PageNavigation currentPath="/critical-thinking" />
    </div>
  );
}
