"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

import { useState } from "react";
import { Scale, Sparkles, Shield, AlertTriangle, Brain, Eye, Target, TrendingUp } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ConceptExplainer } from "@/components/shared/concept-explainer";
import ToolGuide from "@/components/ToolGuide";
import Link from "next/link";

const COGNITIVE_BIASES = [
  {
    id: "confirmation",
    en: "Confirmation Bias",
    ar: "انحياز التأكيد",
    descEn: "Tendency to search for information that confirms pre-existing beliefs — identified by Wason (1960) and expanded by Nickerson (1998).",
    descAr: "الميل للبحث عن معلومات تؤكد المعتقدات المسبقة — حددها واسون (1960) ووسّعها نيكرسون (1998).",
    egyptEn: "Egyptian social media users share health posts confirming folk remedies while ignoring WHO/CAPMAS clinical data.",
    egyptAr: "مستخدمو السوشيال ميديا في مصر يشاركون منشورات صحية تؤكد العلاجات الشعبية بينما يتجاهلون بيانات منظمة الصحة العالمية والجهاز المركزي.",
    color: "#8B5CF6",
    icon: "🔍",
  },
  {
    id: "anchoring",
    en: "Anchoring Bias",
    ar: "انحياز الإرساء",
    descEn: "Over-relying on the first piece of information encountered — Tversky & Kahneman (1974), Judgment under Uncertainty.",
    descAr: "الاعتماد المفرط على أول معلومة — تفرسكي وكانمان (1974)، الحكم تحت الشك.",
    egyptEn: "A viral WhatsApp claim about food prices sets the 'anchor' — all subsequent corrections feel less believable.",
    egyptAr: "ادعاء فيروسي على واتساب عن أسعار الغذاء يضع 'المرساة' — كل التصحيحات اللاحقة تبدو أقل مصداقية.",
    color: "#3B82F6",
    icon: "⚓",
  },
  {
    id: "availability",
    en: "Availability Heuristic",
    ar: "استدلال التوافر",
    descEn: "Judging probability by how easily examples come to mind — Tversky & Kahneman (1973).",
    descAr: "الحكم على الاحتمالية بناءً على سهولة استرجاع الأمثلة — تفرسكي وكانمان (1973).",
    egyptEn: "After a widely-shared shark attack video in Hurghada, Egyptians massively overestimate shark danger vs. road accidents (12,000+ deaths/yr, CAPMAS 2023).",
    egyptAr: "بعد فيديو هجوم قرش في الغردقة انتشر بشكل واسع، المصريون يبالغون في تقدير خطر القروش مقارنة بحوادث الطرق (12,000+ وفاة/سنة، الجهاز المركزي 2023).",
    color: "#F59E0B",
    icon: "💭",
  },
  {
    id: "dunning-kruger",
    en: "Dunning-Kruger Effect",
    ar: "تأثير دانينج-كروجر",
    descEn: "Low-skilled individuals overestimate their competence — Kruger & Dunning (1999), Journal of Personality and Social Psychology.",
    descAr: "الأشخاص ذوو المهارات المنخفضة يبالغون في تقدير كفاءتهم — كروجر ودانينج (1999).",
    egyptEn: "Self-proclaimed 'health experts' on Egyptian Facebook share medical advice with zero clinical training.",
    egyptAr: "\"خبراء صحة\" مزعومون على فيسبوك مصر يشاركون نصائح طبية بدون أي تدريب سريري.",
    color: "#EF4444",
    icon: "📊",
  },
  {
    id: "bandwagon",
    en: "Bandwagon Effect",
    ar: "تأثير العربة",
    descEn: "Adopting beliefs because many others hold them — Leibenstein (1950), Asch conformity experiments (1951).",
    descAr: "تبني المعتقدات لأن كثيرين يؤمنون بها — ليبنشتاين (1950)، تجارب أش للامتثال (1951).",
    egyptEn: "When a rumor gets 50K shares on Egyptian Twitter, it feels 'true' purely from social proof regardless of evidence.",
    egyptAr: "عندما يحصل إشاعة على 50 ألف مشاركة على تويتر مصر، تبدو 'حقيقية' فقط من الدليل الاجتماعي بغض النظر عن الأدلة.",
    color: "#10B981",
    icon: "🚂",
  },
  {
    id: "framing",
    en: "Framing Effect",
    ar: "تأثير الإطار",
    descEn: "Drawing different conclusions from the same data based on presentation — Tversky & Kahneman (1981), Prospect Theory.",
    descAr: "استخلاص استنتاجات مختلفة من نفس البيانات بناءً على طريقة العرض — تفرسكي وكانمان (1981).",
    egyptEn: "'95% of Egyptian youth are unemployed' vs '5% unemployment rate among graduates' — same data, different emotional impact.",
    egyptAr: "'95% من شباب مصر عاطلون' مقابل 'معدل بطالة 5% بين الخريجين' — نفس البيانات، تأثير عاطفي مختلف.",
    color: "#6366F1",
    icon: "🖼️",
  },
  {
    id: "authority",
    en: "Authority Bias",
    ar: "انحياز السلطة",
    descEn: "Attributing greater accuracy to the opinion of an authority figure — Milgram (1963), Stanley Milgram obedience studies.",
    descAr: "نسب دقة أكبر لرأي شخصية ذات سلطة — ميلجرام (1963).",
    egyptEn: "A self-proclaimed sheikh's medical advice is trusted over actual physicians in Egyptian communities.",
    egyptAr: "نصيحة شيخ مزعوم طبياً تُصدَّق أكثر من الأطباء الحقيقيين في المجتمعات المصرية.",
    color: "#D946EF",
    icon: "👔",
  },
  {
    id: "sunk-cost",
    en: "Sunk Cost Fallacy",
    ar: "مغالطة التكلفة الغارقة",
    descEn: "Continuing a behavior due to previously invested resources — Arkes & Blumer (1985).",
    descAr: "الاستمرار في سلوك بسبب الموارد المستثمرة سابقاً — أركيس وبلومر (1985).",
    egyptEn: "Continuing to visit an expensive 'ruqyah healer' because you already paid — instead of seeking real psychiatric care.",
    egyptAr: "الاستمرار في زيارة 'معالج بالرقية' مكلف لأنك دفعت بالفعل — بدلاً من طلب رعاية نفسية حقيقية.",
    color: "#F97316",
    icon: "💸",
  },
];

export default function BiasDetectorPage() {
  const { isRTL, t } = useRTL();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [expandedBias, setExpandedBias] = useState<string | null>(null);

  const handleAnalyze = async (override?: string) => {
    const payloadText = typeof override === "string" ? override : text;
    if (!payloadText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/bias-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payloadText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Failed to connect to Bias Detector." });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", padding: "var(--space-2xl)", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <Scale size={40} color="#8B5CF6" />
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            {t({ en: "Bias Detector ⚖️", ar: "كاشف التحيز ⚖️" })}
          </h1>
        </div>
        <p style={{ fontSize: 18, color: "var(--text-secondary)", marginBottom: 16 }}>
          {t({
            en: "Detect 15+ cognitive biases using VADER sentiment analysis and NLP pattern matching, based on Kahneman & Tversky's heuristics framework.",
            ar: "اكتشاف أكثر من 15 انحيازاً معرفياً باستخدام تحليل المشاعر VADER ومعالجة اللغة الطبيعية، استناداً إلى إطار كانمان وتفرسكي للاستدلالات.",
          })}
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <ConceptExplainer term={t({ en: "Cognitive Bias", ar: "الانحياز المعرفي" })} explanation={t({ en: "Systematic pattern of deviation from rational judgment, as catalogued in Kahneman's 'Thinking, Fast and Slow' (2011). Over 180 biases have been identified in psychological literature.", ar: "نمط منهجي من الانحراف عن الحكم العقلاني، كما صنّفه كانمان في 'التفكير، السريع والبطيء' (2011). تم تحديد أكثر من 180 انحيازاً في الأدبيات النفسية." })} type="scientific" />
          <ConceptExplainer term="VADER" explanation={t({ en: "Valence Aware Dictionary and sEntiment Reasoner — a lexicon and rule-based sentiment analysis tool by Hutto & Gilbert (2014), specifically attuned to social media expressions.", ar: "أداة تحليل مشاعر قائمة على القاموس والقواعد من هوتو وجيلبرت (2014)، مضبوطة خصيصاً لتعبيرات وسائل التواصل الاجتماعي." })} type="scientific" />
        </p>

        {/* How to use — guide + ready Egyptian examples wired to the scanner */}
        <ToolGuide
          titleEn="How to use the Bias Detector"
          titleAr="كيفية استخدام كاشف التحيز"
          lang={isRTL ? "ar" : "en"}
          accent="#8B5CF6"
          whoBenefits={{
            en: "Anyone who gets forwarded a 'convincing' WhatsApp argument and wants to see WHY it feels true even when it isn't — students, parents checking health claims, and anyone arguing with a relative who 'just knows'.",
            ar: "أي حد بيوصله كلام مقنع على واتساب وعايز يفهم ليه بيبان صح حتى لما يكون غلط — طلبة، وأهل بيتأكدوا من ادعاءات صحية، وأي حد بيتناقش مع قريب «هو عارف وبس».",
          }}
          steps={[
            {
              en: "Copy the argument or claim you received (a WhatsApp message, a Facebook comment, a forwarded voice-note transcript) and paste it into the box below.",
              ar: "انسخ الحجة أو الادعاء اللي وصلك (رسالة واتساب، تعليق فيسبوك، نص فويس نوت) والصقه في الصندوق تحت.",
            },
            {
              en: "Press 'Scan for Biases'. The tool reads the wording and flags which cognitive biases the argument leans on.",
              ar: "اضغط «البحث عن الانحيازات». الأداة تقرأ الصياغة وتحدد الانحيازات المعرفية اللي الحجة بتعتمد عليها.",
            },
            {
              en: "Read the report: each detected bias is named in Arabic and English so you can see the trick instead of the feeling.",
              ar: "اقرأ التقرير: كل انحياز متكشف بيتسمى بالعربي والإنجليزي عشان تشوف الحيلة مش الإحساس.",
            },
            {
              en: "Not sure where to start? Tap a ready example below — it loads a real Egyptian argument and runs the scan for you.",
              ar: "مش عارف تبدأ منين؟ اضغط مثال جاهز تحت — هيحمّل حجة مصرية حقيقية ويشغّل الفحص لك.",
            },
          ]}
          scenarios={[
            {
              label: "'Natural is always safer' herbal claim",
              labelAr: "ادعاء «الطبيعي دايمًا أأمن»",
              tag: "health",
              input:
                "الأعشاب الطبيعية أأمن من الأدوية الكيميائية دايمًا، لأنها من ربنا ومن الأرض. جدتي عاشت 90 سنة على الأعشاب من غير ما تروح لدكتور ولا مرة. الكيماويات بس هي اللي بتعمل سرطان. أي حاجة طبيعية مستحيل تضر.",
            },
            {
              label: "Confirmation-bias health rant",
              labelAr: "كلام انحياز التأكيد الصحي",
              tag: "health",
              input:
                "أنا متأكد إن الأكل اللي في السوبر ماركت كله مسرطن. كل ما أشوف بوست بيقول كده بشيره فورًا، وأي دكتور بيقول العكس يبقى مدفوع من الشركات. مش هصدق أي دراسة بتطمّن، دي كلها مدفوعة، بس البوستات اللي بتحذر دي هي الصح.",
            },
            {
              label: "Sunk-cost 'I already paid the healer'",
              labelAr: "تكلفة غارقة «أنا دفعت للمعالج»",
              tag: "money",
              input:
                "أنا صرفت أكتر من عشرة آلاف جنيه على جلسات المعالج الشعبي ده لحد دلوقتي، فمش معقول أوقف وأروح لدكتور نفسي. لو وقفت يبقى الفلوس اللي دفعتها راحت على الفاضي، فالأحسن أكمل معاه لحد ما يشفيني حتى لو مفيش أي تحسن لغاية دلوقتي.",
            },
            {
              label: "Bandwagon '50K shares = true'",
              labelAr: "عربة «50 ألف مشاركة = حقيقة»",
              tag: "viral",
              input:
                "الخبر ده اتشارك أكتر من 50 ألف مرة على فيسبوك والكل بيقوله، يبقى أكيد حقيقي. مش معقول كل الناس دي تكون غلطانة. لو كان كذب كانوا حذفوه زمان. طالما منتشر كده يبقى لازم نصدقه وننشره إحنا كمان.",
            },
          ]}
          onTry={(input) => {
            setText(input);
            handleAnalyze(input);
          }}
        />

        {/* Bias Analysis Tool */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={20} color="#8B5CF6" />
            {t({ en: "Live Bias Scanner", ar: "ماسح الانحياز المباشر" })}
          </h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t({ en: "Enter a statement to check for cognitive biases...\n\nExample: 'Everyone knows that natural remedies are always better than medicine — my grandmother lived to 90 without ever seeing a doctor!'", ar: "أدخل عبارة للتحقق من الانحياز المعرفي...\n\nمثال: 'الكل يعرف إن العلاجات الطبيعية أحسن من الأدوية — جدتي عاشت 90 سنة من غير ما تروح دكتور!'" })}
            style={{ width: "100%", height: 120, padding: 16, borderRadius: 12, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none", resize: "none", fontSize: 16, marginBottom: 16 }}
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !text.trim()}
            style={{ width: "100%", padding: 16, borderRadius: 12, background: "linear-gradient(135deg, #8B5CF6, #6D28D9)", color: "#fff", fontWeight: "bold", fontSize: 16, border: "none", cursor: loading || !text.trim() ? "not-allowed" : "pointer", opacity: loading || !text.trim() ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {loading ? <div className="spinner" style={{ width: 20, height: 20, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> : <Sparkles size={20} />}
            {t({ en: "Scan for Biases", ar: "البحث عن الانحيازات" })}
          </button>
        </div>

        {result && (
          <div className="glass-card" style={{ padding: 24, animation: "ux-slide-up 0.5s ease", marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Shield size={24} color="#10B981" /> {t({ en: "Bias Report", ar: "تقرير الانحياز" })}
            </h3>
            <pre style={{ background: "rgba(0,0,0,0.3)", padding: 16, borderRadius: 8, overflowX: "auto", fontSize: 13, color: "#10B981", border: "1px solid var(--border-primary)" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* Cognitive Biases Encyclopedia */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <Brain size={28} color="#8B5CF6" />
            {t({ en: "Cognitive Bias Encyclopedia — Egyptian Context", ar: "موسوعة الانحيازات المعرفية — السياق المصري" })}
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: 14 }}>
            {t({
              en: "Based on Kahneman & Tversky's foundational research. Each bias includes real Egyptian examples from CAPMAS data and local misinformation patterns.",
              ar: "مبني على أبحاث كانمان وتفرسكي التأسيسية. كل انحياز يتضمن أمثلة مصرية حقيقية من بيانات الجهاز المركزي وأنماط المعلومات المضللة المحلية.",
            })}
          </p>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {COGNITIVE_BIASES.map((bias) => (
              <button
                key={bias.id}
                onClick={() => setExpandedBias(expandedBias === bias.id ? null : bias.id)}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  padding: 20,
                  borderRadius: 16,
                  background: expandedBias === bias.id ? `${bias.color}15` : "var(--bg-secondary)",
                  border: `1px solid ${expandedBias === bias.id ? bias.color + "50" : "var(--border-primary)"}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: "100%",
                  color: "var(--text-primary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>{bias.icon}</span>
                  <strong style={{ color: bias.color, fontSize: 16 }}>
                    {t({ en: bias.en, ar: bias.ar })}
                  </strong>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  {t({ en: bias.descEn, ar: bias.descAr })}
                </p>
                {expandedBias === bias.id && (
                  <div style={{ marginTop: 12, padding: 12, borderRadius: 10, background: `${bias.color}10`, border: `1px dashed ${bias.color}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: bias.color, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                      <Target size={14} /> {t({ en: "🇪🇬 Egyptian Example", ar: "🇪🇬 مثال مصري" })}
                    </div>
                    <p style={{ fontSize: 13, margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      {t({ en: bias.egyptEn, ar: bias.egyptAr })}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            {t({ en: "Related Tools", ar: "أدوات ذات صلة" })}
          </h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/fallacy-engine" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Brain size={16} color="#F43F5E" /> {t({ en: "Fallacy Engine", ar: "محرك المغالطات" })}
            </Link>
            <Link href="/god-system" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Eye size={16} color="#E11D48" /> {t({ en: "GOD System", ar: "نظام التحقق الشامل" })}
            </Link>
            <Link href="/sources" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <TrendingUp size={16} color="#10B981" /> {t({ en: "Sources", ar: "المصادر" })}
            </Link>
          </div>
        </div>

        <PageNavigation currentPath="/bias-detector" />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <PageAIChatbot
        pageTitle="Bias Detector — كاشف التحيز"
        pageContext="Egyptian Awareness Library - Bias Detector: AI-powered tool that identifies cognitive biases in text. Analyzes arguments and content for confirmation bias, anchoring, authority bias, and 20+ other cognitive distortions."
        systemPrompt={`You are the EAL Bias Detector AI. You identify and explain cognitive biases in text and reasoning.

BIASES YOU DETECT:
1. Confirmation Bias (Wason 1960, Nickerson 1998): Favoring info that confirms existing beliefs
2. Anchoring Bias: Over-relying on first piece of information
3. Authority Bias: Accepting claims because of who said them
4. In-Group Bias: Favoriting members of own group
5. Availability Heuristic (Tversky & Kahneman 1973): Judging frequency by ease of recall
6. Dunning-Kruger Effect: Overestimating own competence
7. Sunk Cost Fallacy: Continuing bad decisions due to past investment
8. Bandwagon Effect: Believing things because many others do

EGYPTIAN EXAMPLES FOR EACH BIAS.

DEBIASING TECHNIQUES:
- Perspective-taking
- Seeking disconfirming evidence
- Pre-mortem analysis
- Slow thinking (System 2 activation)

For each bias detected: name it in Arabic and English, explain the mechanism, provide an Egyptian example.`}
        suggestedQuestions={[
          'ما هو التحيز الأكثر تأثيراً في مصر؟',
          'كيف أقلل من تحيز التأكيد؟',
          'What is the most dangerous bias for misinformation spread?',
          'How do I detect bias in news articles?',
        ]}
        accentColor="#8b5cf6"
        accentColorRgb="139,92,246"
      />
    </div>
  );
}
