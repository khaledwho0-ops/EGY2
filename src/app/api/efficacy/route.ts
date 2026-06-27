import { NextResponse } from "next/server";
import { loadAllParticipantFiles, computeCohortEfficacy } from "@/lib/cognition/efficacy";

export const runtime = "nodejs";

/**
 * GET /api/efficacy → the cohort pre/post MIST-20 efficacy report (the fundable
 * number). Anonymized aggregate only (N + means + effect size + distrust-drift
 * guard) — no per-person data, so it is safe to surface. Raw per-participant
 * export remains behind /api/assessment/export (admin-gated).
 */
export async function GET() {
  const files = await loadAllParticipantFiles();
  const report = computeCohortEfficacy(files, "mist20");
  return NextResponse.json({ ok: true, ...report, generatedAt: new Date().toISOString() });
}
