"use client";

import { useState, useEffect, useMemo } from "react";
import { Brain, ShieldCheck, AlertTriangle, TrendingUp, Eye, Zap, Users, Target, Fingerprint, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";

import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/* ═══════════════════════════════════════════════════════════
   COGNITIVE BIAS FINGERPRINT — Feature #1
   "You can't fix what you can't see"

   REAL DATA: the vulnerability percentage for every bias is
   computed deterministically from the user's OWN answers to a
   real behavioural self-assessment. Each bias has a NAME-FREE
   scenario question answered on a 0–4 Likert scale; the answer
   maps directly to a 0–100% vulnerability score. There are NO
   hardcoded/fabricated percentages. Answers persist in
   localStorage so the fingerprint reflects real interactions.
   ═══════════════════════════════════════════════════════════ */

const ANSWERS_STORAGE_KEY = "eal-bias-fingerprint-answers";

/** A real self-assessment item — one scenario question per bias. */
interface BiasItem {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  descriptionAr: string;
  /** The behavioural scenario the user rates honestly. */
  question: string;
  questionAr: string;
  exercises: string[];
  tip: string;
  tipAr: string;
}

/** The bias self-assessment — definitions, scenario questions, tips.
 *  Static metadata ONLY. No percentages live here. */
const BIAS_ITEMS: BiasItem[] = [
  {
    id: "confirmation",
    name: "Confirmation Bias",
    nameAr: "انحياز التأكيد",
    icon: <Eye size={20} />,
    color: "#EF4444",
    description: "Tendency to search for information that confirms existing beliefs",
    descriptionAr: "الميل للبحث عن معلومات تؤكد المعتقدات الحالية",
    question: "When I see a claim that matches what I already believe, I tend to accept it without checking the source.",
    questionAr: "لما أشوف ادعاء بيتفق مع اللي أنا مصدقه أصلاً، بميل أصدقه من غير ما أتأكد من المصدر.",
    exercises: ["DeepReal Day 1-3", "Source verification"],
    tip: "Practice the SIFT method: Stop, Investigate, Find better coverage, Trace claims.",
    tipAr: "مارس طريقة SIFT: توقف، حقق، ابحث عن تغطية أفضل، تتبع الادعاءات.",
  },
  {
    id: "anchoring",
    name: "Anchoring Effect",
    nameAr: "تأثير الإرساء",
    icon: <Target size={20} />,
    color: "#F59E0B",
    description: "Over-relying on the first piece of information encountered",
    descriptionAr: "الاعتماد المفرط على أول معلومة تصادفها",
    question: "The first number, price, or figure I hear strongly shapes the judgement I end up making.",
    questionAr: "أول رقم أو سعر أو معلومة بسمعها بتأثر بقوة على الحكم اللي بطلع بيه في الآخر.",
    exercises: ["DeepReal Day 4-5"],
    tip: "Always seek multiple independent sources before forming an opinion.",
    tipAr: "ابحث دائماً عن مصادر مستقلة متعددة قبل تكوين رأي.",
  },
  {
    id: "authority",
    name: "Authority Bias",
    nameAr: "انحياز السلطة",
    icon: <ShieldCheck size={20} />,
    color: "#8B5CF6",
    description: "Blindly trusting information from perceived authority figures",
    descriptionAr: "الثقة العمياء بالمعلومات من شخصيات ذات سلطة مفترضة",
    question: "If a title, credential, or official-looking account makes a claim, I am much less likely to question it.",
    questionAr: "لو حد بلقب أو شهادة أو حساب شكله رسمي قال حاجة، بقل احتمال إني أشكك فيها كتير.",
    exercises: ["Religion Hub Day 1-7"],
    tip: "Credentials don't guarantee correctness. Verify claims regardless of source status.",
    tipAr: "الشهادات لا تضمن الصحة. تحقق من الادعاءات بغض النظر عن مكانة المصدر.",
  },
  {
    id: "emotional",
    name: "Emotional Reasoning",
    nameAr: "التفكير العاطفي",
    icon: <Zap size={20} />,
    color: "#EC4899",
    description: "Believing something is true because it 'feels' right",
    descriptionAr: "الاعتقاد بأن شيئاً صحيح لأنه 'يشعر' بالصواب",
    question: "When a post makes me feel angry or moved, I am more likely to share it before verifying it.",
    questionAr: "لما بوست يخليني أتعصب أو أتأثر، بزيد احتمال إني أشيره قبل ما أتأكد منه.",
    exercises: ["Mental Health Day 1-5"],
    tip: "When content triggers strong emotion, that's when you need to slow down the most.",
    tipAr: "عندما يثير المحتوى مشاعر قوية، هذا هو الوقت الذي تحتاج فيه للتباطؤ أكثر.",
  },
  {
    id: "bandwagon",
    name: "Bandwagon Effect",
    nameAr: "تأثير العربة",
    icon: <Users size={20} />,
    color: "#06B6D4",
    description: "Adopting beliefs because many others hold them",
    descriptionAr: "تبني المعتقدات لأن كثيرين يعتقدون بها",
    question: "If something has thousands of likes or shares, I treat it as more likely to be true.",
    questionAr: "لو حاجة عليها آلاف اللايكات أو الشيرات، ببقى بعاملها على إنها أرجح إنها صح.",
    exercises: ["DeepReal Day 6-10"],
    tip: "Popularity is not proof. Millions can share something false.",
    tipAr: "الشعبية ليست دليلاً. الملايين يمكنهم مشاركة شيء كاذب.",
  },
  {
    id: "dunningKruger",
    name: "Dunning-Kruger",
    nameAr: "تأثير دانينج-كروجر",
    icon: <Brain size={20} />,
    color: "#10B981",
    description: "Overestimating one's own knowledge in unfamiliar domains",
    descriptionAr: "المبالغة في تقدير المعرفة الشخصية في مجالات غير مألوفة",
    question: "I often feel confident giving an opinion on topics I have not actually studied in depth.",
    questionAr: "كتير بحس بثقة وأنا بدّي رأي في مواضيع أنا مدرستهاش بعمق في الحقيقة.",
    exercises: ["All tracks — self-assessment"],
    tip: "The more you learn, the more you realize how much you don't know.",
    tipAr: "كلما تعلمت أكثر، أدركت أكثر كم لا تعرف.",
  },
  {
    id: "availability",
    name: "Availability Heuristic",
    nameAr: "استدلال التوافر",
    icon: <AlertTriangle size={20} />,
    color: "#F97316",
    description: "Judging likelihood by how easily examples come to mind",
    descriptionAr: "الحكم على الاحتمالية بمدى سهولة تذكر الأمثلة",
    question: "If I have seen something a lot on social media lately, I assume it is common or widespread in reality.",
    questionAr: "لو شفت حاجة كتير على السوشيال ميديا مؤخراً، بفترض إنها منتشرة أو شائعة في الواقع.",
    exercises: ["Mental Health Day 6-10"],
    tip: "Just because you saw it on social media doesn't mean it's common.",
    tipAr: "مجرد رؤيتك لشيء على وسائل التواصل لا يعني أنه شائع.",
  },
  {
    id: "sunkCost",
    name: "Sunk Cost Fallacy",
    nameAr: "مغالطة التكلفة الغارقة",
    icon: <TrendingUp size={20} />,
    color: "#6366F1",
    description: "Continuing to believe something because you've invested in it",
    descriptionAr: "الاستمرار في تصديق شيء لأنك استثمرت فيه",
    question: "Once I have publicly defended a position, I find it hard to change my mind even after seeing strong counter-evidence.",
    questionAr: "بعد ما أكون دافعت عن رأي قدام الناس، بصعب عليّ أغيّره حتى لو شفت دليل قوي ضده.",
    exercises: ["Religion Hub Day 8-14"],
    tip: "It's okay to change your mind. That's growth, not weakness.",
    tipAr: "لا بأس بتغيير رأيك. هذا نمو وليس ضعفاً.",
  },
];

/** The 5-point Likert scale. Index 0..4 maps to 0%, 25%, 50%, 75%, 100%. */
const SCALE = [
  { en: "Never / Strongly disagree", ar: "أبداً / لا أوافق بشدة" },
  { en: "Rarely", ar: "نادراً" },
  { en: "Sometimes", ar: "أحياناً" },
  { en: "Often", ar: "غالباً" },
  { en: "Always / Strongly agree", ar: "دائماً / أوافق بشدة" },
];

/** Map a 0..4 answer to a 0..100 vulnerability percentage. Deterministic, no fabrication. */
function answerToVulnerability(answer: number): number {
  return Math.round((answer / (SCALE.length - 1)) * 100);
}

type AnswerMap = Record<string, number>; // biasId -> 0..4

/** Read persisted answers from localStorage (real prior interactions). */
function loadAnswers(): AnswerMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ANSWERS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      // Keep only valid 0..4 integers for known biases
      const clean: AnswerMap = {};
      for (const item of BIAS_ITEMS) {
        const v = parsed[item.id];
        if (typeof v === "number" && v >= 0 && v <= SCALE.length - 1) clean[item.id] = Math.round(v);
      }
      return clean;
    }
  } catch { /* corrupted — ignore */ }
  return {};
}

function saveAnswers(answers: AnswerMap): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  } catch { /* storage full — ignore */ }
}

/** A bias enriched with its REAL computed vulnerability (only for answered biases). */
interface ScoredBias extends BiasItem {
  vulnerability: number;
}

function RadarCanvas({ biases, isRTL }: { biases: ScoredBias[]; isRTL: boolean }) {
  const size = 320;
  const center = size / 2;
  const maxR = size / 2 - 40;
  const count = biases.length;

  if (count < 3) return null; // a radar needs at least a triangle

  const points = biases.map((b, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const r = (b.vulnerability / 100) * maxR;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle), angle, b };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", maxWidth: 400, margin: "0 auto", display: "block" }}>
      {/* Grid circles */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={Array.from({ length: count }, (_, i) => {
            const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
            const r = (level / 100) * maxR;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(148,163,184,0.15)"
          strokeWidth={1}
        />
      ))}

      {/* Axis lines */}
      {points.map((p, i) => (
        <line key={i} x1={center} y1={center} x2={center + maxR * Math.cos(p.angle)} y2={center + maxR * Math.sin(p.angle)} stroke="rgba(148,163,184,0.1)" strokeWidth={1} />
      ))}

      {/* Data polygon */}
      <polygon points={polygon} fill="rgba(239,68,68,0.15)" stroke="#EF4444" strokeWidth={2} />

      {/* Data points + labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={5} fill={p.b.color} stroke="#fff" strokeWidth={1.5} />
          <text
            x={center + (maxR + 24) * Math.cos(p.angle)}
            y={center + (maxR + 24) * Math.sin(p.angle)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--text-secondary)"
            fontSize={9}
            fontWeight={600}
            fontFamily={isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit"}
          >
            {isRTL ? p.b.nameAr.split(" ").slice(0, 2).join(" ") : p.b.name.split(" ")[0]}
          </text>
          <text
            x={center + (maxR + 24) * Math.cos(p.angle)}
            y={center + (maxR + 24) * Math.sin(p.angle) + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={p.b.color}
            fontSize={10}
            fontWeight={800}
          >
            {p.b.vulnerability}%
          </text>
        </g>
      ))}

      {/* Center score */}
      <text x={center} y={center - 8} textAnchor="middle" fill="var(--text-primary)" fontSize={22} fontWeight={800} fontFamily="'Clash Display', sans-serif">
        {Math.round(biases.reduce((s, b) => s + b.vulnerability, 0) / biases.length)}%
      </text>
      <text x={center} y={center + 12} textAnchor="middle" fill="var(--text-muted)" fontSize={10}>
        {isRTL ? "متوسط الهشاشة" : "AVG VULNERABILITY"}
      </text>
    </svg>
  );
}

export default function BiasFingerprint() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [selectedBias, setSelectedBias] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>({});

  // Hydrate from localStorage AFTER mount (avoids SSR/client mismatch + reflects real prior answers)
  useEffect(() => {
    setAnswers(loadAnswers());
    setMounted(true);
  }, []);

  const answeredCount = Object.keys(answers).length;
  const totalItems = BIAS_ITEMS.length;
  const allAnswered = answeredCount === totalItems;

  /** REAL computed fingerprint — only includes biases the user actually answered. */
  const scoredBiases = useMemo<ScoredBias[]>(() => {
    return BIAS_ITEMS.filter((b) => answers[b.id] !== undefined).map((b) => ({
      ...b,
      vulnerability: answerToVulnerability(answers[b.id]),
    }));
  }, [answers]);

  function setAnswer(biasId: string, value: number) {
    setAnswers((prev) => {
      const next = { ...prev, [biasId]: value };
      saveAnswers(next);
      return next;
    });
  }

  function resetAssessment() {
    setAnswers({});
    saveAnswers({});
    setSelectedBias(null);
  }

  if (!mounted) return null;

  const hasResults = scoredBiases.length >= 3; // enough signal to render a fingerprint
  const avgVulnerability = hasResults
    ? Math.round(scoredBiases.reduce((s, b) => s + b.vulnerability, 0) / scoredBiases.length)
    : 0;
  const strongestDefense = hasResults ? scoredBiases.reduce((x, b) => (x.vulnerability < b.vulnerability ? x : b)) : null;
  const weakestDefense = hasResults ? scoredBiases.reduce((x, b) => (x.vulnerability > b.vulnerability ? x : b)) : null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(139,92,246,0.15))",
            border: "2px solid rgba(239,68,68,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Fingerprint size={36} style={{ color: "#EF4444" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Bias", ar: "ملف", arEG: "ملف" })} <span className="text-gradient">{t({ en: "Profile", ar: "التحيّز", arEG: "التحيّز" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "Answer 8 honest self-assessment questions. Your fingerprint is computed directly from YOUR answers — no fabricated numbers, no averages from other people.",
              ar: "جاوب على 8 أسئلة تقييم ذاتي بصدق. بصمتك بتتحسب مباشرة من إجاباتك إنت — من غير أرقام ملفقة، ومن غير متوسطات من ناس تانية.",
              arEG: "جاوب على 8 أسئلة تقييم ذاتي بصدق. بصمتك بتتحسب مباشرة من إجاباتك إنت — من غير أرقام ملفقة، ومن غير متوسطات من ناس تانية.",
            })}
          </p>
          {/* Progress indicator */}
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--text-caption)", fontFamily: ff }}>
            {t({ en: "Answered", ar: "تمت الإجابة على", arEG: "تمت الإجابة على" })}: <strong>{answeredCount} / {totalItems}</strong>
          </div>
        </div>

        {/* ── RESULTS (only after ≥3 real answers) ── */}
        {hasResults && strongestDefense && weakestDefense && (
          <>
            <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(300px, 1fr) minmax(280px, 1fr)", marginBottom: 32 }}>
              <div className="glass-card" style={{ padding: 24 }}>
                <RadarCanvas biases={scoredBiases} isRTL={a} />
                {!allAnswered && (
                  <p style={{ fontSize: 11, color: "var(--text-caption)", textAlign: "center", marginTop: 8, fontFamily: ff }}>
                    {t({
                      en: `Based on ${answeredCount} of ${totalItems} answers. Complete all for the full fingerprint.`,
                      ar: `محسوبة من ${answeredCount} من ${totalItems} إجابة. أكمل الكل للبصمة الكاملة.`,
                      arEG: `محسوبة من ${answeredCount} من ${totalItems} إجابة. كمّل الكل عشان البصمة الكاملة.`,
                    })}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="glass-card" style={{ padding: 20, borderLeft: "4px solid #10B981" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                    {t({ en: "Strongest Defense", ar: "أقوى دفاع", arEG: "أقوى دفاع" })}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#10B981", fontFamily: ff }}>
                    {a ? strongestDefense.nameAr : strongestDefense.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{strongestDefense.vulnerability}% {t({ en: "vulnerability", ar: "هشاشة", arEG: "هشاشة" })}</div>
                </div>
                <div className="glass-card" style={{ padding: 20, borderLeft: "4px solid #EF4444" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                    {t({ en: "Biggest Blind Spot", ar: "أكبر نقطة ضعف", arEG: "أكبر نقطة ضعف" })}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#EF4444", fontFamily: ff }}>
                    {a ? weakestDefense.nameAr : weakestDefense.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{weakestDefense.vulnerability}% {t({ en: "vulnerability", ar: "هشاشة", arEG: "هشاشة" })}</div>
                </div>
                <div className="glass-card" style={{ padding: 20, background: avgVulnerability > 60 ? "rgba(239,68,68,0.06)" : avgVulnerability > 40 ? "rgba(245,158,11,0.06)" : "rgba(16,185,129,0.06)" }}>
                  <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                    {t({ en: "Overall Resilience Level", ar: "مستوى المرونة الكلي", arEG: "مستوى المرونة الكلي" })}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: avgVulnerability > 60 ? "#EF4444" : avgVulnerability > 40 ? "#F59E0B" : "#10B981" }}>
                    {100 - avgVulnerability}%
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: ff }}>
                    {avgVulnerability > 60
                      ? t({ en: "Needs significant work — start with exercises!", ar: "يحتاج عمل كبير — ابدأ بالتمارين!", arEG: "يحتاج عمل كبير — ابدأ بالتمارين!" })
                      : avgVulnerability > 40
                      ? t({ en: "Good progress — keep training your defenses", ar: "تقدم جيد — استمر في تدريب دفاعاتك", arEG: "تقدم جيد — استمر في تدريب دفاعاتك" })
                      : t({ en: "Excellent! Your cognitive armor is strong", ar: "ممتاز! درعك المعرفي قوي", arEG: "ممتاز! درعك المعرفي قوي" })}
                  </div>
                </div>
                <button
                  onClick={resetAssessment}
                  className="glass-card"
                  style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: ff, color: "var(--text-secondary)", border: "1px solid var(--border-primary)" }}
                >
                  <RefreshCw size={15} /> {t({ en: "Retake assessment", ar: "إعادة التقييم", arEG: "إعادة التقييم" })}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── SELF-ASSESSMENT — the real input mechanism ── */}
        <h2 style={{ fontSize: 20, marginBottom: 8, fontFamily: ff }}>
          {hasResults
            ? t({ en: "Adjust your answers", ar: "عدّل إجاباتك", arEG: "عدّل إجاباتك" })
            : t({ en: "Bias self-assessment", ar: "تقييم ذاتي للانحياز", arEG: "تقييم ذاتي للانحياز" })}
        </h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, fontFamily: ff }}>
          {t({
            en: "Rate how true each statement is for you. Each answer sets that bias's vulnerability score directly.",
            ar: "قيّم مدى صحة كل عبارة بالنسبة لك. كل إجابة بتحدد نسبة الهشاشة لهذا الانحياز مباشرة.",
            arEG: "قيّم كل عبارة بتنطبق عليك قد إيه. كل إجابة بتحدد نسبة الهشاشة للانحياز ده على طول.",
          })}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {BIAS_ITEMS.map((item, idx) => {
            const current = answers[item.id];
            const answered = current !== undefined;
            const vuln = answered ? answerToVulnerability(current) : null;
            return (
              <div
                key={item.id}
                className="glass-card"
                style={{
                  padding: 20, direction: dir,
                  border: answered ? `1px solid ${item.color}55` : "1px solid var(--border-primary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <div style={{ color: item.color, marginTop: 2 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <strong style={{ fontSize: 14, fontFamily: ff }}>{idx + 1}. {a ? item.nameAr : item.name}</strong>
                      {answered && (
                        <span style={{
                          padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                          background: vuln! > 60 ? "rgba(239,68,68,0.12)" : vuln! > 40 ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                          color: vuln! > 60 ? "#EF4444" : vuln! > 40 ? "#F59E0B" : "#10B981",
                        }}>
                          {vuln}%
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: "6px 0 0", fontFamily: ff }}>
                      {a ? item.questionAr : item.question}
                    </p>
                  </div>
                </div>

                {/* Likert scale buttons — the real input */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {SCALE.map((opt, val) => {
                    const isSel = current === val;
                    return (
                      <button
                        key={val}
                        onClick={() => setAnswer(item.id, val)}
                        style={{
                          flex: "1 1 0", minWidth: 90, padding: "8px 6px", borderRadius: 8, cursor: "pointer",
                          fontSize: 11.5, fontWeight: isSel ? 700 : 500, fontFamily: ff, lineHeight: 1.3,
                          textAlign: "center", transition: "all 0.15s",
                          border: isSel ? `2px solid ${item.color}` : "1px solid var(--border-primary)",
                          background: isSel ? `${item.color}1a` : "var(--bg-secondary)",
                          color: isSel ? item.color : "var(--text-muted)",
                        }}
                      >
                        {t(opt)}
                      </button>
                    );
                  })}
                </div>

                {/* Vulnerability bar + tip (only once answered) */}
                {answered && (
                  <>
                    <div style={{ width: "100%", height: 6, borderRadius: 3, background: "var(--bg-primary)", margin: "12px 0 0" }}>
                      <div style={{
                        width: `${vuln}%`, height: "100%", borderRadius: 3,
                        background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                        transition: "width 0.4s ease",
                      }} />
                    </div>
                    <button
                      onClick={() => setSelectedBias(selectedBias === item.id ? null : item.id)}
                      style={{ marginTop: 10, background: "transparent", border: "none", padding: 0, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--accent-cta)", fontFamily: ff }}
                    >
                      {selectedBias === item.id
                        ? t({ en: "Hide tip", ar: "إخفاء النصيحة", arEG: "إخفاء النصيحة" })
                        : t({ en: "How to strengthen this", ar: "كيف تقوي هذا", arEG: "إزاي تقوي ده" })}
                    </button>
                    {selectedBias === item.id && (
                      <div style={{ marginTop: 10, padding: "12px 14px", borderRadius: 10, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
                        <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, fontFamily: ff }}>
                          {a ? item.tipAr : item.tip}
                        </p>
                        <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
                          {t({ en: "Related exercises:", ar: "تمارين ذات صلة:", arEG: "تمارين ذات صلة:" })} {item.exercises.join(", ")}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="glass-card" style={{ padding: 32, marginTop: 8, textAlign: "center", background: "linear-gradient(135deg, rgba(239,68,68,0.05), rgba(139,92,246,0.05))" }}>
          <h3 style={{ marginBottom: 8, fontFamily: ff }}>
            {allAnswered
              ? t({ en: "Want to reduce your vulnerability?", ar: "تريد تقليل هشاشتك؟", arEG: "تريد تقليل هشاشتك؟" })
              : t({ en: "Finish the assessment to see your full fingerprint", ar: "أكمل التقييم لرؤية بصمتك الكاملة", arEG: "كمّل التقييم عشان تشوف بصمتك الكاملة" })}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16, fontFamily: ff }}>
            {t({
              en: "Your fingerprint comes straight from your own answers. Complete training exercises, then retake it to see your real shift over time.",
              ar: "بصمتك بتيجي مباشرة من إجاباتك إنت. أكمل تمارين التدريب، وبعدين أعد التقييم لتشوف تغيرك الحقيقي مع الوقت.",
              arEG: "بصمتك بتيجي على طول من إجاباتك إنت. كمّل تمارين التدريب، وبعدين أعد التقييم عشان تشوف تغيّرك الحقيقي مع الوقت.",
            })}
          </p>
          <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "12px 28px", fontSize: 14 }}>
            {t({ en: "Go to Exercises", ar: "اذهب للتمارين", arEG: "اذهب للتمارين" })} <ArrowRight size={16} style={{ marginLeft: 6, transform: a ? "rotate(180deg)" : "none" }} />
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/bias-fingerprint" />
      <PageAIChatbot
        pageTitle="Cognitive Bias Fingerprint — بصمة التحيز المعرفي"
        pageContext="Egyptian Awareness Library - Personal cognitive bias assessment tool that creates a unique 'fingerprint' of your most active biases."
        systemPrompt={`You are an expert in cognitive psychology and behavioral economics. You help users understand and overcome their personal cognitive biases. The biases you assess include: Confirmation Bias (انحياز التأكيد), Anchoring Bias (تأثير الإرساء), Dunning-Kruger Effect (تأثير دانينج-كروجر), Availability Heuristic (استدلال التوافر), Authority Bias (انحياز السلطة), In-Group Bias (انحياز المجموعة الداخلية), Sunk Cost Fallacy (مغالطة التكلفة الغارقة), Bandwagon Effect (تأثير العربة), and Emotional Reasoning (التفكير العاطفي). For each bias, provide: a clear definition, its Arabic name, a real Egyptian example from daily life or media, and a practical debiasing technique drawn from Daniel Kahneman's 'Thinking, Fast and Slow' and Dan Ariely's 'Predictably Irrational'. Explain how biases interact and compound in Egyptian social media contexts. Respond in the same language the user writes in.`}
        suggestedQuestions={['ما هو تحيز التأكيد وكيف يؤثر علي؟', 'كيف أعرف تحيزاتي المعرفية؟', 'What is the Dunning-Kruger effect?', 'How can I debias my thinking?']}
        accentColor="#8b5cf6"
        accentColorRgb="139,92,246"
      />
    </div>
  );
}
