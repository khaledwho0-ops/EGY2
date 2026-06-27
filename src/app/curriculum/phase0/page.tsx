"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { getProgress } from "@/lib/progress/progress-service";
import { PageNavigation } from '@/components/shared/page-navigation';

const DAYS = Array.from({ length: 28 }, (_, i) => {
  const dayNum = i + 1;
  const exercises: Record<number, { name: string; nameAr: string; type: string }> = {
    1: { name: "MIST-20 Baseline", nameAr: "خط أساس MIST-20", type: "Assessment" },
    2: { name: "Trust Battery Sprint", nameAr: "سباق بطارية الثقة", type: "Calibration" },
    3: { name: "Thumbnail Traps", nameAr: "فخاخ الصور المصغرة", type: "Awareness" },
    4: { name: "Emotion vs Evidence", nameAr: "العاطفة مقابل الدليل", type: "Critical Thinking" },
    5: { name: "Calm Breath Protocol", nameAr: "بروتوكول التنفس الهادئ", type: "Self-Regulation" },
    6: { name: "Help-Seeking Intro (GHSQ)", nameAr: "مقدمة طلب المساعدة", type: "Mental Health" },
    7: { name: "DeepReal Teaser", nameAr: "تشويق ديب ريل", type: "Forensics" },
    8: { name: "Bias Fingerprinting", nameAr: "بصمة التحيز", type: "Cognitive Bias" },
    9: { name: "Expert Voice Calibration", nameAr: "معايرة صوت الخبير", type: "Authority" },
    10: { name: "Source Hierarchy Drill", nameAr: "تمرين تسلسل المصادر", type: "Verification" },
    11: { name: "Lateral Reading (SIFT)", nameAr: "القراءة الجانبية", type: "Fact-Checking" },
    12: { name: "Base Rate Neglect", nameAr: "إهمال المعدل الأساسي", type: "Statistics" },
    13: { name: "MIST-20 Retake", nameAr: "إعادة MIST-20", type: "Assessment" },
    14: { name: "Week 2 CIS Score", nameAr: "درجة المناعة المعرفية", type: "Milestone" },
    15: { name: "Reaction Time Test", nameAr: "اختبار زمن الاستجابة", type: "Speed" },
    16: { name: "Anchoring Effect", nameAr: "تأثير الإرساء", type: "Cognitive Bias" },
    17: { name: "Availability Heuristic", nameAr: "الاستدلال بالتوافر", type: "Cognitive Bias" },
    18: { name: "Dunning-Kruger Calibration", nameAr: "معايرة دانينغ-كروغر", type: "Meta-Cognition" },
    19: { name: "In-Group Bias Detection", nameAr: "كشف تحيز المجموعة", type: "Social Bias" },
    20: { name: "Confirmation Bias Sprint", nameAr: "سباق تحيز التأكيد", type: "Cognitive Bias" },
    21: { name: "Mid-Program Assessment", nameAr: "تقييم منتصف البرنامج", type: "Milestone" },
    22: { name: "Inoculation Introduction", nameAr: "مقدمة التلقيح النفسي", type: "Inoculation" },
    23: { name: "WhatsApp Forward Drills", nameAr: "تمارين رسائل واتساب", type: "Practical" },
    24: { name: "DeepReal + OSINT", nameAr: "ديب ريل + OSINT", type: "Forensics" },
    25: { name: "GHSQ Mid-Point", nameAr: "إعادة تقييم GHSQ", type: "Mental Health" },
    26: { name: "SUS Usability Checkpoint", nameAr: "نقطة فحص SUS", type: "Usability" },
    27: { name: "Forward Defense Scripts", nameAr: "نصوص الدفاع الأمامي", type: "Action" },
    28: { name: "Passport Level 1 🎓", nameAr: "جواز المستوى 1 🎓", type: "Ceremony" },
  };
  return { day: dayNum, ...exercises[dayNum] };
});

const WEEK_COLORS = ["#EF4444", "#F59E0B", "#06B6D4", "#10B981"];

export default function Phase0Page() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const progress = (() => { try { return getProgress(); } catch { return null; } })();
  const completedExercises = progress?.exercises?.map((e: any) => e.exerciseId) ?? [];
  const currentDay = completedExercises.length + 1;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(16,185,129,0.15))", border: "2px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>🧠</div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Phase 0: Psychological Calibration", ar: "المرحلة 0: المعايرة النفسية", arEG: "المرحلة 0: المعايرة النفسية" })}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "14 active days of baseline assessment, bias fingerprinting, SIFT method, and cognitive calibration. Days 15–28 are coming soon.", ar: "14 يومًا نشطًا من التقييم الأساسي وبصمة التحيز وطريقة SIFT والمعايرة المعرفية. الأيام 15-28 قريبًا.", arEG: "14 يوم نشط من التقييم الأساسي وبصمة التحيز وطريقة SIFT والمعايرة المعرفية. الأيام 15-28 قريبًا." })}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="glass-card" style={{ padding: 16, marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, fontFamily: ff }}>
              <span>{t({ en: `Day ${Math.min(currentDay, 14)} of 14`, ar: `اليوم ${Math.min(currentDay, 14)} من 14`, arEG: `اليوم ${Math.min(currentDay, 14)} من 14` })}</span>
              <span>{Math.round((Math.min(completedExercises.length, 14) / 14) * 100)}%</span>
            </div>
            <div style={{ height: 8, background: "var(--bg-tertiary)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(Math.min(completedExercises.length, 14) / 14) * 100}%`, background: "linear-gradient(90deg, #EF4444, #F59E0B, #06B6D4, #10B981)", borderRadius: 4, transition: "width 0.5s ease" }} />
            </div>
          </div>
        </div>

        {/* Week Headers + Day Grid */}
        {[0, 1, 2, 3].map((weekIdx) => (
          <div key={weekIdx} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, marginBottom: 12, fontFamily: ff, color: WEEK_COLORS[weekIdx], display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: WEEK_COLORS[weekIdx], display: "inline-block" }} />
              {t({ en: `Week ${weekIdx + 1}`, ar: `الأسبوع ${weekIdx + 1}`, arEG: `الأسبوع ${weekIdx + 1}` })}
              {weekIdx === 0 && " — Baseline Assessment"}
              {weekIdx === 1 && " — Bias Fingerprinting"}
              {weekIdx === 2 && " — Cognitive Drills"}
              {weekIdx === 3 && " — Inoculation & Passport"}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
              {DAYS.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day) => {
                const isCompleted = completedExercises.includes(`day${day.day}`);
                const isCurrent = day.day === currentDay;
                // Only days 1-14 have real religion-hub exercise routes; days 15-28 are not yet live
                const hasLiveRoute = day.day <= 14;
                return hasLiveRoute ? (
                  <Link
                    key={day.day}
                    href={`/religion-hub/exercise/${day.day}`}
                    className="glass-card no-underline"
                    style={{
                      padding: 12, textAlign: "center", color: "inherit",
                      border: isCurrent ? `2px solid ${WEEK_COLORS[weekIdx]}` : "1px solid var(--border-primary)",
                      background: isCompleted ? `${WEEK_COLORS[weekIdx]}10` : isCurrent ? `${WEEK_COLORS[weekIdx]}05` : "var(--bg-secondary)",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 900, color: isCompleted ? WEEK_COLORS[weekIdx] : isCurrent ? WEEK_COLORS[weekIdx] : "var(--text-muted)", marginBottom: 4 }}>
                      {isCompleted ? "✓" : day.day}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.3, fontFamily: ff, color: "var(--text-secondary)" }}>
                      {a ? day.nameAr : day.name}
                    </div>
                    <div style={{ fontSize: 9, marginTop: 4, padding: "2px 6px", borderRadius: 4, background: `${WEEK_COLORS[weekIdx]}15`, color: WEEK_COLORS[weekIdx], display: "inline-block" }}>
                      {day.type}
                    </div>
                  </Link>
                ) : (
                  <div
                    key={day.day}
                    className="glass-card"
                    style={{
                      padding: 12, textAlign: "center",
                      opacity: 0.4,
                      border: "1px solid var(--border-primary)",
                      background: "var(--bg-secondary)",
                      cursor: "default",
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 900, color: "var(--text-muted)", marginBottom: 4 }}>
                      {day.day}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.3, fontFamily: ff, color: "var(--text-secondary)" }}>
                      {a ? day.nameAr : day.name}
                    </div>
                    <div style={{ fontSize: 9, marginTop: 4, padding: "2px 6px", borderRadius: 4, background: "rgba(100,116,139,0.15)", color: "#64748b", display: "inline-block" }}>
                      {a ? "قريبًا" : "Coming Soon"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/curriculum" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            ← {t({ en: "Back to Full Curriculum", ar: "العودة للمنهج الكامل", arEG: "الرجوع للمنهج الكامل" })}
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/curriculum/phase0" />
    </div>
  );
}
