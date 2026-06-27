import { NextResponse } from "next/server";
import { kvStore } from "@/lib/db/kv-store";
import { isAdmin } from "@/lib/auth";
import { apiError } from "@/lib/api/api-error";

/**
 * Research Export API — Supervisor Data Pull
 *
 * GET /api/assessment/export
 *
 * Returns aggregated assessment data across all participants
 * for the N=84 pilot study analysis pipeline.
 *
 * Query params:
 *   format=json (default) | csv
 *   instrument=<id> (optional filter)
 */

interface AssessmentRecord {
  instrumentId: string;
  phase: "pre" | "post";
  completedAt: string;
  scores: Record<string, number>;
  duration: number;
  participantHash: string;
  metadata?: {
    language: string;
  };
}

interface ParticipantFile {
  participantHash: string;
  records: AssessmentRecord[];
}

export async function GET(request: Request) {
  try {
    const isAdminUser = await isAdmin();
    if (!isAdminUser) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const instrumentFilter = searchParams.get("instrument");

    const keys = await kvStore.keys("assessment:*");
    
    if (!keys || keys.length === 0) {
      return NextResponse.json({
        ok: true,
        participantCount: 0,
        recordCount: 0,
        data: [],
        message: "لا توجد بيانات تقييم حتى الآن.",
        messageEn: "No assessment data yet.",
      });
    }

    const allRecords: AssessmentRecord[] = [];
    
    // Concurrent non-blocking fetch from KV
    const files = await Promise.all(keys.map(k => kvStore.get<ParticipantFile>(k)));

    for (const content of files) {
      if (!content || !content.records) continue;
      for (const record of content.records) {
        if (instrumentFilter && record.instrumentId !== instrumentFilter) {
          continue;
        }
        allRecords.push(record);
      }
    }

    if (format === "csv") {
      // Generate CSV
      const scoreKeys = new Set<string>();
      for (const r of allRecords) {
        for (const key of Object.keys(r.scores)) {
          scoreKeys.add(key);
        }
      }
      const sortedScoreKeys = Array.from(scoreKeys).sort();

      const header = [
        "participant_hash",
        "instrument_id",
        "phase",
        "completed_at",
        "duration_seconds",
        "language",
        ...sortedScoreKeys,
      ].join(",");

      const rows = allRecords.map((r) => {
        const scoreValues = sortedScoreKeys.map((k) =>
          r.scores[k] !== undefined ? r.scores[k].toString() : ""
        );
        return [
          r.participantHash,
          r.instrumentId,
          r.phase,
          r.completedAt,
          r.duration.toString(),
          r.metadata?.language ?? "unknown",
          ...scoreValues,
        ].join(",");
      });

      const csv = [header, ...rows].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="eal-assessment-export-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    // JSON format
    return NextResponse.json({
      ok: true,
      participantCount: files.length,
      recordCount: allRecords.length,
      exportedAt: new Date().toISOString(),
      data: allRecords,
    });
  } catch (err) {
    console.error("[Assessment Export Error]", err);
    return apiError(
      500,
      "EXPORT_FAILED",
      "حدث خطأ أثناء تصدير بيانات التقييم.",
      "Failed to export assessment data.",
      "RETRY"
    );
  }
}
