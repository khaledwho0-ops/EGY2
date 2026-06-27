import { NextResponse } from "next/server";
import { TOTAL_KEY_COUNT } from "@/lib/debunking/gemini-rotator";
import { getCounts } from "@/lib/obs/metrics";
import { loadAllParticipantFiles, computeCohortEfficacy } from "@/lib/cognition/efficacy";

export const runtime = "nodejs";

/**
 * GET /api/health — operational snapshot (Gap 8): rotator capacity, the
 * privacy-safe event counters, and the live cohort efficacy headline.
 */
export async function GET() {
  const [counts, files] = await Promise.all([getCounts(), loadAllParticipantFiles()]);
  const cohort = computeCohortEfficacy(files, "mist20");
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    rotatorSlots: TOTAL_KEY_COUNT,
    counts,
    cohort: { n: cohort.n, headline: cohort.headline },
  });
}
