"use client";

// ─────────────────────────────────────────────────────────────────────────────
// DeepReal Exercise Page — mirrors religion-hub/exercise/[day] (Framework §13.2)
//
// WHY THIS FILE EXISTS: the canonical ExerciseEngine was previously reachable
// ONLY via religion-hub/exercise/[day]. DeepReal's validated 14-day JSON bank
// (src/data/exercises/deepreal/day-01..14.json) had no [day] route, leaving it
// as unreachable dead code. This route loads DeepReal's own JSON exercises into
// the same ExerciseEngine, exactly parallel to the religion-hub route.
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
import day01 from "@/data/exercises/deepreal/day-01.json";
import day02 from "@/data/exercises/deepreal/day-02.json";
import day03 from "@/data/exercises/deepreal/day-03.json";
import day04 from "@/data/exercises/deepreal/day-04.json";
import day05 from "@/data/exercises/deepreal/day-05.json";
import day06 from "@/data/exercises/deepreal/day-06.json";
import day07 from "@/data/exercises/deepreal/day-07.json";
import day08 from "@/data/exercises/deepreal/day-08.json";
import day09 from "@/data/exercises/deepreal/day-09.json";
import day10 from "@/data/exercises/deepreal/day-10.json";
import day11 from "@/data/exercises/deepreal/day-11.json";
import day12 from "@/data/exercises/deepreal/day-12.json";
import day13 from "@/data/exercises/deepreal/day-13.json";
import day14 from "@/data/exercises/deepreal/day-14.json";
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
 * DeepReal Exercise Page — Framework §13.2
 *
 * Dynamic route: /deepreal/exercise/[day]
 * Full 14-day program: source credibility → detection → bias identification (§16.2)
 */
export default function DeepRealExercisePage() {
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
            <Link href="/deepreal" className="btn-primary no-underline">
              <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to DeepReal", ar: "العودة إلى DeepReal", arEG: "العودة إلى DeepReal" })}
            </Link>
            <Link href="/deepreal/exercise/1" className="btn-secondary no-underline">
              {t({ en: "Start from Day 1", ar: "ابدأ من اليوم ١", arEG: "ابدأ من اليوم ١" })}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-md))" }}>
      <div className="container" style={{ marginTop: "var(--space-md)", marginBottom: "var(--space-md)" }}>
        <Link href="/deepreal" className="flex items-center gap-1 no-underline" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to DeepReal", ar: "العودة إلى DeepReal", arEG: "العودة إلى DeepReal" })}
        </Link>
      </div>

      <div className="container" style={{ paddingBottom: "var(--space-3xl)" }}>
        <ExerciseEngine exercise={exercise} onComplete={(result) => {
          recordExerciseCompletion(
            result.exerciseId, "deepreal", Number(dayParam),
            result.score, result.maxScore, result.timeSpentSeconds,
            result.confidencePre, result.confidencePost,
            (exercise as Record<string, unknown>).com_b_target as string | undefined,
            (exercise as Record<string, unknown>).com_b_mechanism as string | undefined,
          );
          syncCurrentParticipantSnapshot();
        }} />
      </div>
      <PageNavigation currentPath="/deepreal/exercise/[day]" />
    </div>
  );
}
