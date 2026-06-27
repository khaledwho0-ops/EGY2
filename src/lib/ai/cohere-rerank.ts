/* ═══════════════════════════════════════════════════════════════
 * COHERE RERANK — semantic reordering of retrieved documents.
 *
 * Fetch-based (no SDK dependency). Model: rerank-v3.5 (MULTILINGUAL —
 * handles Arabic + English, required for EAL). Used to reorder evidence /
 * retrieved sources by true relevance to the user's query, on top of the
 * rule-based trust/access scoring.
 *
 * FAILS SAFE: returns null / the original order on any error, missing key,
 * timeout, or empty input — so a caller's existing ranking (and any live
 * count derived from it) NEVER breaks because of the reranker.
 * ═══════════════════════════════════════════════════════════════ */

const COHERE_RERANK_URL = 'https://api.cohere.com/v2/rerank';
const DEFAULT_MODEL = 'rerank-v3.5';

export interface RerankHit {
  index: number;
  relevanceScore: number;
}

/**
 * Low-level rerank: returns Cohere's scored ordering, or null if unavailable.
 * `documents` are plain strings; results reference them by original index.
 */
export async function cohereRerank(
  query: string,
  documents: string[],
  opts: { topN?: number; model?: string; signal?: AbortSignal } = {},
): Promise<RerankHit[] | null> {
  const key = process.env.COHERE_API_KEY;
  if (!key || !query?.trim() || !Array.isArray(documents) || documents.length === 0) {
    return null;
  }
  try {
    const res = await fetch(COHERE_RERANK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_MODEL,
        query,
        documents,
        top_n: opts.topN ?? documents.length,
      }),
      signal: opts.signal ?? AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data?.results)) return null;
    return data.results
      .filter((r: unknown) => r && typeof (r as RerankHit).index === 'number')
      .map((r: { index: number; relevance_score: number }) => ({
        index: r.index,
        relevanceScore: r.relevance_score,
      }));
  } catch {
    return null; // network/abort/parse — fall back to caller's order
  }
}

/**
 * Reorder a typed array by Cohere relevance to `query`. `toText` extracts the
 * comparable string per item. FAILS SAFE: returns the original array unchanged
 * when rerank is unavailable, so this is always safe to drop into a pipeline.
 * `minScore` optionally drops items Cohere scores below a relevance floor.
 */
export async function rerankBy<T>(
  query: string,
  items: T[],
  toText: (item: T) => string,
  opts: { topN?: number; minScore?: number; signal?: AbortSignal } = {},
): Promise<T[]> {
  if (!Array.isArray(items) || items.length <= 1) return items;
  const hits = await cohereRerank(query, items.map(toText), {
    topN: opts.topN,
    signal: opts.signal,
  });
  if (!hits || hits.length === 0) return items;
  const ordered = hits
    .filter((h) => (opts.minScore == null ? true : h.relevanceScore >= opts.minScore))
    .map((h) => items[h.index])
    .filter((x): x is T => x != null);
  return ordered.length ? ordered : items;
}
