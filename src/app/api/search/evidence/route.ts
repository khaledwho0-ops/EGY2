import { NextResponse } from "next/server";
import { aggregateEvidence } from "@/lib/evidence/aggregate";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

/**
 * GET /api/search/evidence?q=...&includePaid=0|1
 * Thin wrapper over aggregateEvidence() (src/lib/evidence/aggregate) — the
 * shared retrieval used by both this route and the verification pipeline.
 * 30-min cache; free-first; Cohere-reranked.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const includePaid = searchParams.get("includePaid") === "1";

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `evidence:${query.toLowerCase()}:${includePaid ? "all" : "free"}`,
      1000 * 60 * 30,
      () => aggregateEvidence(query, { includePaid, max: 6 }),
    );

    return NextResponse.json({
      results,
      policy: includePaid ? "free-and-fallback" : "free-first",
    });
  } catch (error) {
    console.error("[Evidence Search Error]", error);
    return ERR.fetchFailed("Evidence APIs");
  }
}
