"use client";

import { useState } from "react";
import { Layers, Shield, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';
import ToolGuide from '@/components/ToolGuide';

export default function GodSystemPage() {
  const { isRTL, t } = useRTL();
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/god-system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Failed to connect to The God System." });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", padding: "var(--space-2xl)", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <Layers size={40} color="#E11D48" />
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            {t({ en: "Deception Analysis", ar: "تحليل الخداع" })}
          </h1>
        </div>
        <p style={{ fontSize: 18, color: "var(--text-secondary)", marginBottom: 32 }}>
          {t({
            en: "8-layer analysis: claim to verdict.",
            ar: "تحليل من ٨ طبقات: من الادعاء إلى الحكم."
          })}
        </p>

        <ToolGuide
          titleEn="How to use The God System"
          titleAr="كيفية استخدام نظام التحقق الشامل"
          accent="#E11D48"
          lang={isRTL ? "ar" : "en"}
          whoBenefits={{
            en: "Anyone in Egypt who gets a scary or 'too-good-to-be-true' claim on WhatsApp, Facebook, or a TV talk-show and wants ONE check that runs every engine at once — fallacy, bias, emotion, sources, and Egyptian-dialect manipulation — before they believe it or forward it to family.",
            ar: "أي حد في مصر بيوصله ادعاء مخيف أو 'أحلى من اللازم' على واتساب أو فيسبوك أو برنامج توك شو وعايز فحص واحد بيشغّل كل المحركات مرة واحدة — المغالطات، الانحياز، المشاعر، المصادر، والتلاعب باللهجة المصرية — قبل ما يصدّقه أو يبعته لأهله.",
          }}
          steps={[
            {
              en: "Paste the exact claim you received (a WhatsApp message, a post, or one sentence from a video) into the box below.",
              ar: "الصق الادعاء بالظبط اللي وصلك (رسالة واتساب، أو بوست، أو جملة من فيديو) في الخانة اللي تحت.",
            },
            {
              en: "Or just press one of the ready examples below — it loads a real, recognizable claim straight into the box for you.",
              ar: "أو اضغط على واحد من الأمثلة الجاهزة تحت — هيحط ادعاء حقيقي معروف في الخانة على طول.",
            },
            {
              en: "Press 'Commence God-Level Analysis' and wait a few seconds while all 8 layers run.",
              ar: "اضغط 'بدء التحليل الشامل' واستنى ثواني لحد ما الـ 8 طبقات تخلّص.",
            },
            {
              en: "Read the result: each layer is scored, and every verdict is tied to a real source — no source, no claim.",
              ar: "اقرا النتيجة: كل طبقة بتتسجّل بدرجة، وكل حكم مربوط بمصدر حقيقي — مفيش مصدر، مفيش ادعاء.",
            },
          ]}
          scenarios={[
            {
              label: "'Vaccines cause autism'",
              labelAr: "'التطعيمات بتسبب التوحّد'",
              tag: "health",
              input: "التطعيمات بتسبب التوحّد للأطفال، عشان كده الأم اللي بتحب ابنها لازم تأجّل أو تمنع التطعيم.",
            },
            {
              label: "'Garlic cures cancer'",
              labelAr: "'الثوم بيعالج السرطان'",
              tag: "health",
              input: "الثوم على الريق بيعالج السرطان نهائي من غير كيماوي ولا أدوية، والدكاترة بيخفوا السر ده عنك.",
            },
            {
              label: "Economic-collapse rumor",
              labelAr: "إشاعة انهيار اقتصادي",
              tag: "economy",
              input: "البنوك هتقفل بكرة وفلوسك هتتجمّد، اسحب كل مدخراتك دلوقتي قبل ما الاقتصاد ينهار تماماً.",
            },
            {
              label: "Undated 'official' announcement",
              labelAr: "إعلان 'رسمي' من غير تاريخ",
              tag: "rumor",
              input: "وصلتني صورة قرار رسمي بإجازة عامة مفاجئة بكرة، من غير تاريخ ولا رقم ولا جهة، والناس بتشيره على بعض.",
            },
          ]}
          onTry={(input) => {
            setClaim(input);
            setResult(null);
            requestAnimationFrame(() =>
              document.querySelector('textarea')?.scrollIntoView({ behavior: "smooth", block: "center" })
            );
          }}
        />

        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder={t({ en: "Enter a claim or threat to analyze...", ar: "أدخل ادعاءً أو تهديداً لتحليله..." })}
            style={{ width: "100%", height: 120, padding: 16, borderRadius: 12, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none", resize: "none", fontSize: 16, marginBottom: 16 }}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !claim.trim()}
            style={{ width: "100%", padding: 16, borderRadius: 12, background: "linear-gradient(135deg, #E11D48, #BE123C)", color: "#fff", fontWeight: "bold", fontSize: 16, border: "none", cursor: loading || !claim.trim() ? "not-allowed" : "pointer", opacity: loading || !claim.trim() ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {loading ? <div className="spinner" style={{ width: 20, height: 20, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> : <Sparkles size={20} />}
            {t({ en: "Commence God-Level Analysis", ar: "بدء التحليل الشامل" })}
          </button>
        </div>

        {loading && (
          <div style={{ marginBottom: 32 }}>
            <AnalysisProgress
              running={loading}
              stages={STAGE_SETS.debunk}
              lang={isRTL ? "ar" : "en"}
              expectedMs={13000}
              accent="#E11D48"
              title={{ en: "God-Level analysis running…", ar: "التحليل الشامل قيد التشغيل…" }}
            />
          </div>
        )}

        {result && (
          <div className="glass-card" style={{ padding: 24, animation: "ux-slide-up 0.5s ease" }}>
            <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={24} color="#10B981" /> {t({ en: "Omniscient Analysis Result", ar: "نتيجة التحليل الشامل" })}
            </h3>
            <pre style={{ background: "rgba(0,0,0,0.3)", padding: 16, borderRadius: 8, overflowX: "auto", fontSize: 13, color: "#10B981", border: "1px solid var(--border-primary)" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <PageNavigation currentPath="/god-system" />

      <PageAIChatbot
        pageTitle="GOD-System Omniscient Analyzer — نظام التحقق الشامل"
        pageContext="EAL GOD-System: Orchestrates ALL intelligence engines simultaneously — Fallacy detection, Bias analysis, Sentiment analysis, OSINT, Arabic Dialect analysis. Uses real /api/god-system endpoint."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL GOD-System (Global Omniscient Defense) AI — the master orchestrator that coordinates all intelligence engines for comprehensive claim analysis.

[LAYER 2 - YOUR 8 ANALYSIS LAYERS]:
1. CLAIM PARSING — Extract the core assertion from noise
2. FALLACY DETECTION — FLICC taxonomy (Fake experts, Logical fallacies, Impossible expectations, Cherry-picking, Conspiracy)
3. BIAS ANALYSIS — 24 cognitive biases from Kahneman's dual-process theory
4. SENTIMENT ANALYSIS — Emotional manipulation scoring (fear, urgency, outrage, hope)
5. SOURCE VERIFICATION — OSINT intelligence gathering from 50+ data streams
6. ARABIC DIALECT ANALYSIS — Egyptian Arabic psycholinguistic manipulation detection
7. EVIDENCE SYNTHESIS — Oxford Evidence Hierarchy ranking
8. VERDICT — Final confidence-scored determination

[LAYER 3 - ISLAMIC FOUNDATION]:
- Quran 17:36: 'ولا تقف ما ليس لك به علم' — Do not follow what you have no knowledge of
- Every analysis must meet the standard of 'ilm (knowledge) not zann (conjecture)

[LAYER 4 - RULES]:
1. When analyzing a claim, walk through ALL 8 layers systematically
2. Score each layer independently (0-100%)
3. Provide an aggregate GOD-Score with confidence interval
4. Cite specific evidence for each determination
5. Flag any gaps in analysis where more data is needed
6. Respond in the user's language`}
        suggestedQuestions={[
          'حلل الادعاء: الموز بيعالج السرطان',
          'Analyze: COVID vaccines alter DNA permanently',
          'إيه الطبقات الثمانية للتحليل؟',
          'How does the GOD-Score work?',
        ]}
        accentColor="#e11d48"
        accentColorRgb="225,29,72"
      />
    </div>
  );
}
