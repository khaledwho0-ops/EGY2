"use client";
import { PageNavigation } from '@/components/shared/page-navigation';

import { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Eye, Brain, RefreshCw, Zap, Check, X, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { getProgress } from "@/lib/progress/progress-service";

/* ═══════════════════════════════════════════════════════════
   BEFORE / AFTER TRANSFORMATION — Feature #11
   "Visual proof your thinking changed"
   ═══════════════════════════════════════════════════════════ */

interface TransformationScenario {
  id: string;
  scenario: string;
  scenarioAr: string;
  day1Response: string;
  day1ResponseAr: string;
  day1Behavior: string;
  day1BehaviorAr: string;
  day14Response: string;
  day14ResponseAr: string;
  day14Behavior: string;
  day14BehaviorAr: string;
  skillLearned: string;
  skillLearnedAr: string;
  track: "deepreal" | "mental-health" | "religion-hub";
  color: string;
}

const SCENARIOS: TransformationScenario[] = [
  {
    id: "s1", track: "deepreal", color: "#3B82F6",
    scenario: "A WhatsApp message says: 'URGENT: Toxic chemicals found in popular Egyptian food brand!!!'",
    scenarioAr: "رسالة واتساب بتقول: 'عاجل: مواد كيماوية سامة في ماركة أكل مصرية مشهورة!!!'",
    day1Response: "Share immediately to warn family and friends",
    day1ResponseAr: "أشاركها فوراً عشان أحذر العيلة والأصحاب",
    day1Behavior: "Panic → Share → Spread unverified claim",
    day1BehaviorAr: "ذعر ← مشاركة ← نشر ادعاء غير موثق",
    day14Response: "Stop. Check the source. Search on Google and fact-check sites. Ask: who created this?",
    day14ResponseAr: "توقف. اتحقق من المصدر. دور في جوجل ومواقع التحقق. اسأل: مين عمل ده؟",
    day14Behavior: "Pause → Verify → Protect family with facts",
    day14BehaviorAr: "توقف ← تحقق ← احمِ العيلة بالحقائق",
    skillLearned: "SIFT Method (Stop, Investigate, Find, Trace)",
    skillLearnedAr: "طريقة SIFT (توقف، حقق، ابحث، تتبع)",
  },
  {
    id: "s2", track: "mental-health", color: "#EC4899",
    scenario: "You feel overwhelmed by negative news and can't stop scrolling",
    scenarioAr: "حاسس إنك مغمور بالأخبار السلبية ومش قادر تبطل سكرولينج",
    day1Response: "Keep scrolling. It's important to stay informed at all costs.",
    day1ResponseAr: "كمل سكرولينج. لازم تفضل متابع مهما كان.",
    day1Behavior: "Doom-scrolling → Anxiety → Sleep disruption",
    day1BehaviorAr: "سكرولينج سلبي ← قلق ← اضطراب نوم",
    day14Response: "Set a 15-minute news limit. Practice grounding. Separate news time from rest time.",
    day14ResponseAr: "حدد ١٥ دقيقة للأخبار. مارس تقنيات التهدئة. افصل وقت الأخبار عن الراحة.",
    day14Behavior: "Boundaries → Mindful consumption → Better sleep",
    day14BehaviorAr: "حدود ← استهلاك واعي ← نوم أفضل",
    skillLearned: "Digital Wellbeing & News Hygiene",
    skillLearnedAr: "الرفاهية الرقمية ونظافة الأخبار",
  },
  {
    id: "s3", track: "religion-hub", color: "#F59E0B",
    scenario: "Someone quotes a hadith you've never heard to support a political position",
    scenarioAr: "حد بيستشهد بحديث عمرك ما سمعت عنه عشان يدعم موقف سياسي",
    day1Response: "Accept it because it sounds Islamic and I don't want to question religion",
    day1ResponseAr: "اقبله عشان شكله إسلامي ومش عايز أشكك في الدين",
    day1Behavior: "Blind trust → Spread unverified quote → Manipulation victim",
    day1BehaviorAr: "ثقة عمياء ← نشر اقتباس غير موثق ← ضحية تلاعب",
    day14Response: "Check hadith authenticity on IslamWeb/Dorar. Distinguish between religion and political use of religion.",
    day14ResponseAr: "تحقق من صحة الحديث على إسلام ويب/الدرر. فرّق بين الدين والاستخدام السياسي للدين.",
    day14Behavior: "Verify → Protect faith from exploitation → Informed belief",
    day14BehaviorAr: "تحقق ← احمِ الإيمان من الاستغلال ← إيمان مستنير",
    skillLearned: "Positive Religious Coping (Brief RCOPE)",
    skillLearnedAr: "التكيف الديني الإيجابي (Brief RCOPE)",
  },
  {
    id: "s4", track: "deepreal", color: "#3B82F6",
    scenario: "A viral video shows a 'miracle cure' endorsed by a famous doctor",
    scenarioAr: "فيديو منتشر بيعرض 'علاج معجزة' بتأييد دكتور مشهور",
    day1Response: "It must be true — a doctor said it and millions watched it",
    day1ResponseAr: "لازم يكون صح — دكتور قاله وملايين شافوه",
    day1Behavior: "Authority bias + Bandwagon → Buy product → Health risk",
    day1BehaviorAr: "انحياز السلطة + تأثير القطيع ← شراء المنتج ← خطر صحي",
    day14Response: "Popularity ≠ truth. Check if the doctor is real, if the claim is peer-reviewed, if the product is FDA-approved.",
    day14ResponseAr: "الشعبية ≠ الحقيقة. تحقق إن الدكتور حقيقي، الادعاء محكّم علمياً، المنتج معتمد.",
    day14Behavior: "Question authority → Verify credentials → Evidence-based decisions",
    day14BehaviorAr: "شكك في السلطة ← تحقق من المؤهلات ← قرارات مبنية على الأدلة",
    skillLearned: "Authority Bias Recognition",
    skillLearnedAr: "التعرف على انحياز السلطة",
  },
];

export default function Transformation() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const progress = (() => { try { return getProgress(); } catch { return null; } })();
  const completedCount = progress?.exercises?.length ?? 0;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(16,185,129,0.15))",
            border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <ArrowLeftRight size={36} style={{ color: "#10B981" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Before →", ar: "قبل ←", arEG: "قبل ←" })} <span className="text-gradient">{t({ en: "After", ar: "بعد", arEG: "بعد" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "See how the 14-day program transforms your thinking. Real scenarios, real behavioral change.",
              ar: "شوف إزاي البرنامج بيغير تفكيرك في ١٤ يوم. سيناريوهات حقيقية، تغيير سلوكي حقيقي.",
              arEG: "شوف إزاي البرنامج بيغير تفكيرك في ١٤ يوم. سيناريوهات حقيقية، تغيير سلوكي حقيقي.",
            })}
          </p>
        </div>

        {/* Scenario Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(i)}
              className="glass-card"
              style={{
                padding: "8px 18px", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", fontFamily: ff,
                border: activeScenario === i ? `2px solid ${s.color}` : "1px solid var(--border-primary)",
                background: activeScenario === i ? `${s.color}08` : "var(--bg-secondary)",
                color: activeScenario === i ? s.color : "var(--text-secondary)",
                fontWeight: activeScenario === i ? 700 : 400,
              }}
            >
              {t({ en: `Scenario ${i + 1}`, ar: `سيناريو ${i + 1}`, arEG: `سيناريو ${i + 1}` })}
            </button>
          ))}
        </div>

        {/* Active Scenario */}
        {SCENARIOS[activeScenario] && (() => {
          const s = SCENARIOS[activeScenario];
          return (
            <div>
              {/* Scenario Description */}
              <div className="glass-card" style={{ padding: 24, marginBottom: 20, borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
                  {s.track.replace("-", " ")}
                </div>
                <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.7, margin: 0, fontFamily: ff }}>
                  {a ? s.scenarioAr : s.scenario}
                </p>
              </div>

              {/* Split Screen */}
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {/* DAY 1 — Before */}
                <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #EF4444", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700,
                    background: "rgba(239,68,68,0.1)", color: "#EF4444",
                  }}>
                    {t({ en: "DAY 1", ar: "اليوم ١", arEG: "اليوم ١" })}
                  </div>
                  <X size={28} style={{ color: "#EF4444", marginBottom: 12 }} />
                  <h3 style={{ fontSize: 15, marginBottom: 10, color: "#EF4444", fontFamily: ff }}>
                    {t({ en: "Your Response", ar: "ردك", arEG: "ردك" })}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontFamily: ff, color: "var(--text-secondary)" }}>
                    "{a ? s.day1ResponseAr : s.day1Response}"
                  </p>
                  <div style={{
                    padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.12)", fontSize: 13, fontFamily: ff, color: "var(--text-muted)",
                  }}>
                    <strong>{t({ en: "Behavior:", ar: "السلوك:", arEG: "السلوك:" })}</strong><br />
                    {a ? s.day1BehaviorAr : s.day1Behavior}
                  </div>
                </div>

                {/* DAY 14 — After */}
                <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #10B981", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700,
                    background: "rgba(16,185,129,0.1)", color: "#10B981",
                  }}>
                    {t({ en: "DAY 14", ar: "اليوم ١٤", arEG: "اليوم ١٤" })}
                  </div>
                  <Check size={28} style={{ color: "#10B981", marginBottom: 12 }} />
                  <h3 style={{ fontSize: 15, marginBottom: 10, color: "#10B981", fontFamily: ff }}>
                    {t({ en: "Your Response", ar: "ردك", arEG: "ردك" })}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 16px", fontFamily: ff, color: "var(--text-secondary)" }}>
                    "{a ? s.day14ResponseAr : s.day14Response}"
                  </p>
                  <div style={{
                    padding: "10px 14px", borderRadius: 10, background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.12)", fontSize: 13, fontFamily: ff, color: "var(--text-muted)",
                  }}>
                    <strong>{t({ en: "Behavior:", ar: "السلوك:", arEG: "السلوك:" })}</strong><br />
                    {a ? s.day14BehaviorAr : s.day14Behavior}
                  </div>
                </div>
              </div>

              {/* Skill Learned */}
              <div className="glass-card" style={{ padding: 20, marginTop: 16, textAlign: "center", background: `${s.color}06` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontFamily: ff }}>
                  <Zap size={16} style={{ color: s.color }} />
                  <strong>{t({ en: "Skill Learned:", ar: "المهارة المكتسبة:", arEG: "المهارة المكتسبة:" })}</strong>
                  <span style={{ color: s.color }}>{a ? s.skillLearnedAr : s.skillLearned}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ═══ QUANTITATIVE PROOF SECTION ═══ */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, textAlign: "center", marginBottom: 8, fontFamily: ff }}>
            {t({ en: "📊 Illustrative Target Trajectory", ar: "📊 مسار مستهدف توضيحي", arEG: "📊 مسار مستهدف توضيحي" })}
          </h2>
          <p style={{ color: "#f59e0b", textAlign: "center", fontSize: 14, marginBottom: 28, fontFamily: ff }}>
            {t({ en: "⚠ Illustrative target trajectory — NOT measured data. No Egyptian effect size has been measured yet (pilot N=84 pending).", ar: "⚠ مسار مستهدف توضيحي — وليست بيانات مقاسة. لم يُقَس أي حجم أثر مصري بعد (الدراسة التجريبية N=84 قيد الإعداد).", arEG: "⚠ مسار مستهدف توضيحي — مش بيانات مقاسة. لسه مفيش حجم أثر مصري متقاس (التجربة N=84 لسه جاية)." })}
          </p>

          {/* Sample User Journey Table */}
          <div className="glass-card" style={{ padding: 0, marginBottom: 24, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-primary)", display: "flex", alignItems: "center", gap: 10 }}>
              <TrendingUp size={18} style={{ color: "#10B981" }} />
              <span style={{ fontWeight: 700, fontSize: 15, fontFamily: ff }}>
                {t({ en: "Hypothetical Example Journey (illustrative — not a real participant)", ar: "رحلة مثال افتراضي (توضيحية — وليست مشاركًا حقيقيًا)", arEG: "رحلة مثال افتراضي (توضيحية — مش مشارك حقيقي)" })}
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "rgba(99,102,241,0.08)" }}>
                    <th style={{ padding: "10px 16px", textAlign: a ? "right" : "left", fontWeight: 700, color: "var(--text-primary)", fontFamily: ff }}>{t({ en: "Metric", ar: "المقياس", arEG: "المقياس" })}</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: "#EF4444" }}>{t({ en: "Day 1", ar: "اليوم ١", arEG: "اليوم ١" })}</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: "#F59E0B" }}>{t({ en: "Day 28", ar: "اليوم ٢٨", arEG: "اليوم ٢٨" })}</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: "#06B6D4" }}>{t({ en: "Day 84", ar: "اليوم ٨٤", arEG: "اليوم ٨٤" })}</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: "#10B981" }}>{t({ en: "Day 144", ar: "اليوم ١٤٤", arEG: "اليوم ١٤٤" })}</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: "#10B981" }}>{t({ en: "Change", ar: "التغيير", arEG: "التغيير" })}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "MIST-20 Score", metricAr: "نتيجة MIST-20", d1: "11/20", d28: "14/20", d84: "17/20", d144: "19/20", change: "+72%", color: "#6366f1" },
                    { metric: "CIS (Cognitive Immunity)", metricAr: "مؤشر المناعة المعرفية", d1: "34/100", d28: "48/100", d84: "71/100", d144: "89/100", change: "+162%", color: "#10B981" },
                    { metric: "Reaction Time (claims)", metricAr: "زمن الاستجابة (الادعاءات)", d1: "1.2s", d28: "3.8s", d84: "6.1s", d144: "8.4s", change: "+600%", color: "#3B82F6" },
                    { metric: "Source Verification Rate", metricAr: "معدل التحقق من المصادر", d1: "12%", d28: "38%", d84: "67%", d144: "91%", change: "+658%", color: "#F59E0B" },
                    { metric: "Fallacy Detection", metricAr: "اكتشاف المغالطات", d1: "2/15", d28: "6/15", d84: "11/15", d144: "14/15", change: "+600%", color: "#EC4899" },
                    { metric: "GHSQ (Help-Seeking)", metricAr: "مقياس طلب المساعدة", d1: "18/42", d28: "24/42", d84: "31/42", d144: "36/42", change: "+100%", color: "#8B5CF6" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--border-primary)" }}>
                      <td style={{ padding: "10px 16px", fontWeight: 600, fontFamily: ff, color: row.color }}>{a ? row.metricAr : row.metric}</td>
                      <td style={{ padding: "10px 16px", textAlign: "center", color: "#EF4444", fontWeight: 500 }}>{row.d1}</td>
                      <td style={{ padding: "10px 16px", textAlign: "center", color: "#F59E0B", fontWeight: 500 }}>{row.d28}</td>
                      <td style={{ padding: "10px 16px", textAlign: "center", color: "#06B6D4", fontWeight: 500 }}>{row.d84}</td>
                      <td style={{ padding: "10px 16px", textAlign: "center", color: "#10B981", fontWeight: 700 }}>{row.d144}</td>
                      <td style={{ padding: "10px 16px", textAlign: "center" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 700, background: "rgba(16,185,129,0.12)", color: "#10B981" }}>{row.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MIST-20 Improvement Visual */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 4, fontFamily: ff }}>
              {t({ en: "📈 MIST-20 Score Progression (Misinformation Susceptibility)", ar: "📈 تطور نتيجة MIST-20 (القابلية للمعلومات المضللة)", arEG: "📈 تطور نتيجة MIST-20 (القابلية للمعلومات المضللة)" })}
            </h3>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16, fontFamily: ff }}>
              {t({ en: "مسار مستهدف توضيحي / Illustrative target trajectory — not measured data", ar: "مسار مستهدف توضيحي — ليست بيانات مقاسة", arEG: "مسار مستهدف توضيحي — ليست بيانات مقاسة" })}
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160, padding: "0 8px" }}>
              {[
                { day: 1, score: 55, label: "Baseline" },
                { day: 7, score: 58, label: "" },
                { day: 14, score: 63, label: "" },
                { day: 21, score: 66, label: "" },
                { day: 28, score: 70, label: "Phase 0 ✓" },
                { day: 42, score: 73, label: "" },
                { day: 56, score: 78, label: "Phase 1 ✓" },
                { day: 70, score: 81, label: "" },
                { day: 84, score: 85, label: "Phase 2 ✓" },
                { day: 98, score: 87, label: "" },
                { day: 112, score: 90, label: "Phase 3 ✓" },
                { day: 126, score: 92, label: "" },
                { day: 144, score: 95, label: "Sovereign ★" },
              ].map((point, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: point.label ? 700 : 400, whiteSpace: "nowrap" }}>
                    {point.label || `D${point.day}`}
                  </span>
                  <div style={{
                    width: "100%",
                    height: `${(point.score / 100) * 140}px`,
                    background: `linear-gradient(to top, ${point.score > 85 ? '#10B981' : point.score > 70 ? '#06B6D4' : point.score > 60 ? '#F59E0B' : '#EF4444'}80, ${point.score > 85 ? '#10B981' : point.score > 70 ? '#06B6D4' : point.score > 60 ? '#F59E0B' : '#EF4444'}20)`,
                    borderRadius: "6px 6px 2px 2px",
                    transition: "height 0.5s ease",
                    position: "relative",
                    minWidth: 20,
                  }}>
                    <span style={{
                      position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)",
                      fontSize: 10, fontWeight: 700, color: "var(--text-primary)",
                    }}>{point.score}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, color: "var(--text-muted)" }}>
              <span>{t({ en: "Vulnerable", ar: "عُرضة", arEG: "عُرضة" })}</span>
              <span>{t({ en: "→ Target Effect Size: d = 0.73 (illustrative) →", ar: "→ حجم الأثر المستهدف: d = 0.73 (توضيحي) →", arEG: "→ حجم الأثر المستهدف: d = 0.73 (توضيحي) →" })}</span>
              <span>{t({ en: "Sovereign", ar: "محصّن", arEG: "محصّن" })}</span>
            </div>
          </div>

          {/* Effect Size Explanation */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 24, borderLeft: "4px solid #8B5CF6" }}>
            <h3 style={{ fontSize: 16, marginBottom: 12, fontFamily: ff, color: "#8B5CF6" }}>
              {t({ en: "🔬 Scientific Methodology", ar: "🔬 المنهجية العلمية", arEG: "🔬 المنهجية العلمية" })}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13 }}>
              <div>
                <strong style={{ display: "block", marginBottom: 6, fontFamily: ff }}>{t({ en: "Instruments Used:", ar: "الأدوات المستخدمة:", arEG: "الأدوات المستخدمة:" })}</strong>
                <ul style={{ margin: 0, paddingLeft: a ? 0 : 20, paddingRight: a ? 20 : 0, lineHeight: 2, color: "var(--text-secondary)", fontFamily: ff }}>
                  <li><strong>MIST-20</strong> — {t({ en: "Misinformation Susceptibility Test (Maertens et al., 2023)", ar: "اختبار القابلية للمعلومات المضللة (Maertens et al., 2023)", arEG: "اختبار القابلية للمعلومات المضللة" })}</li>
                  <li><strong>CIS</strong> — {t({ en: "Cognitive Immunity Score (Platform composite)", ar: "مؤشر المناعة المعرفية (مركّب المنصة)", arEG: "مؤشر المناعة المعرفية" })}</li>
                  <li><strong>GHSQ</strong> — {t({ en: "General Help-Seeking Questionnaire (Wilson et al., 2005)", ar: "استبيان طلب المساعدة العام (Wilson et al., 2005)", arEG: "استبيان طلب المساعدة العام" })}</li>
                  <li><strong>Brief-RCOPE</strong> — {t({ en: "Religious Coping Scale (Pargament et al., 2011)", ar: "مقياس التكيف الديني (Pargament et al., 2011)", arEG: "مقياس التكيف الديني" })}</li>
                  <li><strong>SUS</strong> — {t({ en: "System Usability Scale (Brooke, 1996)", ar: "مقياس قابلية الاستخدام (Brooke, 1996)", arEG: "مقياس قابلية الاستخدام" })}</li>
                </ul>
              </div>
              <div>
                <strong style={{ display: "block", marginBottom: 6, fontFamily: ff }}>{t({ en: "Effect Size Benchmarks:", ar: "معايير حجم الأثر:", arEG: "معايير حجم الأثر:" })}</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: ff }}>
                  {[
                    { label: "d = 0.2 — Small effect", labelAr: "d = 0.2 — أثر صغير", w: "20%", color: "#F59E0B" },
                    { label: "d = 0.5 — Medium effect", labelAr: "d = 0.5 — أثر متوسط", w: "50%", color: "#06B6D4" },
                    { label: "d = 0.73 — Illustrative target ★", labelAr: "d = 0.73 — هدف توضيحي ★", w: "73%", color: "#10B981" },
                    { label: "d = 0.8 — Large effect", labelAr: "d = 0.8 — أثر كبير", w: "80%", color: "#8B5CF6" },
                  ].map((b, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 12, marginBottom: 3, color: b.color, fontWeight: i === 2 ? 700 : 400 }}>{a ? b.labelAr : b.label}</div>
                      <div style={{ height: 6, background: "var(--bg-tertiary)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: b.w, background: b.color, borderRadius: 3, transition: "width 1s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10, lineHeight: 1.6 }}>
                  {t({ en: "Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences. Lawrence Erlbaum Associates.", ar: "Cohen, J. (1988). تحليل القوة الإحصائية للعلوم السلوكية.", arEG: "Cohen, J. (1988). تحليل القوة الإحصائية للعلوم السلوكية." })}
                </p>
              </div>
            </div>
          </div>

          {/* Key Facts */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { value: "d = 0.73", label: "Effect Size (target)", labelAr: "حجم الأثر (هدف)", sublabel: "illustrative — not measured", color: "#10B981" },
              { value: "+72%", label: "MIST-20 Improvement (target)", labelAr: "تحسن MIST-20 (هدف)", sublabel: "illustrative — not measured", color: "#6366f1" },
              { value: "8.4s", label: "Avg. Pause Time (target)", labelAr: "وقت التوقف (هدف)", sublabel: "illustrative — not measured", color: "#F59E0B" },
              { value: "91%", label: "Source Check Rate (target)", labelAr: "معدل التحقق (هدف)", sublabel: "illustrative — not measured", color: "#3B82F6" },
            ].map((stat, i) => (
              <div key={i} className="glass-card" style={{ padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, fontFamily: ff }}>{a ? stat.labelAr : stat.label}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/dashboard" className="btn-primary no-underline" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
            {t({ en: "Start Your Transformation", ar: "ابدأ تحولك", arEG: "ابدأ تحولك" })} <ArrowRight size={16} style={{ marginLeft: 8, transform: a ? "rotate(180deg)" : "none" }} />
          </Link>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 16 }}>
            <Link href="/assessment" style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {t({ en: "Take Baseline Assessment →", ar: "ابدأ التقييم الأساسي →", arEG: "ابدأ التقييم الأساسي →" })}
            </Link>
            <Link href="/platform-guide" style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {t({ en: "Platform Guide →", ar: "دليل المنصة →", arEG: "دليل المنصة →" })}
            </Link>
          </div>
        </div>

        <PageNavigation currentPath="/transformation" />
      </div>
    </div>
  );
}
