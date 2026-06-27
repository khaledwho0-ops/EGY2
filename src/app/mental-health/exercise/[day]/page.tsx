"use client";

// ─────────────────────────────────────────────────────────────────────────────
// Mental-Health Exercise Page — mirrors religion-hub/exercise/[day] (Framework §13.2)
//
// WHY THIS FILE EXISTS: the canonical ExerciseEngine was previously reachable
// ONLY via religion-hub/exercise/[day]. Mental-Health's validated 14-day JSON
// bank (src/data/exercises/mental-health/day-01..14.json) had no [day] route,
// leaving it as unreachable dead code. This route loads Mental-Health's own JSON
// exercises into the same ExerciseEngine, exactly parallel to the religion-hub route.
// ─────────────────────────────────────────────────────────────────────────────

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ExerciseEngine } from "@/components/exercises/exercise-engine";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Exercise } from "@/types";
import { recordExerciseCompletion } from "@/lib/progress/progress-service";
import { syncCurrentParticipantSnapshot } from "@/lib/research/research-ops";
import { useRTL } from "@/components/shared/rtl-provider";

// ─── JSON-first exercise imports (full JSON pipeline, identical to religion-hub) ───
import day01 from "@/data/exercises/mental-health/day-01.json";
import day02 from "@/data/exercises/mental-health/day-02.json";
import day03 from "@/data/exercises/mental-health/day-03.json";
import day04 from "@/data/exercises/mental-health/day-04.json";
import day05 from "@/data/exercises/mental-health/day-05.json";
import day06 from "@/data/exercises/mental-health/day-06.json";
import day07 from "@/data/exercises/mental-health/day-07.json";
import day08 from "@/data/exercises/mental-health/day-08.json";
import day09 from "@/data/exercises/mental-health/day-09.json";
import day10 from "@/data/exercises/mental-health/day-10.json";
import day11 from "@/data/exercises/mental-health/day-11.json";
import day12 from "@/data/exercises/mental-health/day-12.json";
import day13 from "@/data/exercises/mental-health/day-13.json";
import day14 from "@/data/exercises/mental-health/day-14.json";
import { PageNavigation } from '@/components/shared/page-navigation';

// All 14 days loaded directly from validated JSON files with COM-B metadata
const EXERCISES: Record<string, Exercise> = {
  "1": day01 as unknown as Exercise,
  "2": day02 as unknown as Exercise,
  "3": day03 as unknown as Exercise,
  "4": day04 as unknown as Exercise,
  "5": day05 as unknown as Exercise,
  "6": day06 as unknown as Exercise,
  "7": day07 as unknown as Exercise,
  "8": day08 as unknown as Exercise,
  "9": day09 as unknown as Exercise,
  "10": day10 as unknown as Exercise,
  "11": day11 as unknown as Exercise,
  "12": day12 as unknown as Exercise,
  "13": day13 as unknown as Exercise,
  "14": day14 as unknown as Exercise,
};

/**
 * Mental-Health Exercise Page — Framework §13.2
 *
 * Dynamic route: /mental-health/exercise/[day]
 * Full 14-day program: emotional awareness → stigma reduction → mixed (§16.2)
 *
 * Safety: educational content only, NOT diagnostic. Crisis line surfaced up front.
 */
export default function MentalHealthExercisePage() {
  const params = useParams();
  const dayParam = params.day as string;
  // Accept both "1" and "day-01" formats
  const dayKey = dayParam.startsWith("day-") ? String(parseInt(dayParam.replace("day-", ""), 10)) : dayParam;
  const exercise = useMemo(() => EXERCISES[dayKey], [dayKey]);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  if (!exercise) {
    return (
      <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-xl))" }}>
        <div className="container" style={{ textAlign: "center", padding: "var(--space-3xl) var(--space-lg)" }}>
          <h2>{t({ en: "Exercise Not Available", ar: "التمرين غير متاح", arEG: "التمرين غير متاح" })}</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 12 }}>
            {a
              ? `اليوم ${dayParam} غير موجود ضمن البرنامج. البرنامج يتكون من 14 يوماً (اليوم 1 إلى اليوم 14).`
              : `Day ${dayParam} is not available. The program consists of 14 days (Day 1 to Day 14).`}
          </p>
          <p style={{ color: "var(--text-caption)", marginBottom: 24, fontSize: 14 }}>
            {t({ en: "Choose a day from the list below or return to the main page.", ar: "اختر يوماً من القائمة أدناه أو عُد إلى الصفحة الرئيسية.", arEG: "اختر يوماً من القائمة أدناه أو عُد إلى الصفحة الرئيسية." })}
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/mental-health" className="btn-primary no-underline">
              <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to Mental Health", ar: "العودة إلى الصحة النفسية", arEG: "العودة إلى الصحة النفسية" })}
            </Link>
            <Link href="/mental-health/exercise/1" className="btn-secondary no-underline">
              {t({ en: "Start from Day 1", ar: "ابدأ من اليوم ١", arEG: "ابدأ من اليوم ١" })}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-md))" }}>
      {/* Educational / crisis disclaimer — parallels religion-hub's neutrality bar */}
      <div style={{ margin: "0 var(--space-lg)", padding: "8px 16px", background: "rgba(16,185,129,0.08)", borderRadius: "var(--radius-md)", border: "1px solid rgba(16,185,129,0.2)", fontSize: "12px", color: "var(--text-muted)", direction: a ? "rtl" : "ltr", fontFamily: a ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
        {t({ en: "ℹ️ Educational content from mental-health literacy research. NOT a diagnosis. If you need support, Egypt crisis line: 16328.", ar: "ℹ️ محتوى تعليمي من أبحاث التثقيف بالصحة النفسية. ليس تشخيصاً. إذا كنت بحاجة للدعم، خط الأزمات في مصر: 16328.", arEG: "ℹ️ محتوى تعليمي من أبحاث التثقيف بالصحة النفسية. ليس تشخيصاً. إذا كنت بحاجة للدعم، خط الأزمات في مصر: 16328." })}
      </div>

      <div className="container" style={{ marginTop: "var(--space-md)", marginBottom: "var(--space-md)" }}>
        <Link href="/mental-health" className="flex items-center gap-1 no-underline" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to Mental Health", ar: "العودة إلى الصحة النفسية", arEG: "العودة إلى الصحة النفسية" })}
        </Link>
      </div>

      <div className="container" style={{ paddingBottom: "var(--space-3xl)" }}>
        <ExerciseEngine exercise={exercise} onComplete={(result) => {
          recordExerciseCompletion(
            result.exerciseId, "mental-health", Number(dayParam),
            result.score, result.maxScore, result.timeSpentSeconds,
            result.confidencePre, result.confidencePost,
            (exercise as Record<string, unknown>).com_b_target as string | undefined,
            (exercise as Record<string, unknown>).com_b_mechanism as string | undefined,
          );
          syncCurrentParticipantSnapshot();
        }} />
      </div>
      <PageNavigation currentPath="/mental-health/exercise/[day]" />
    </div>
  );
}
