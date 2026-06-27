import { Pinecone } from "@pinecone-database/pinecone";
import { embed } from "ai";
import { model } from "@/lib/ai/router";
import { rerankBy } from "@/lib/ai/cohere-rerank";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || "dummy_key" });
const index = pc.index("cognitive-fortress", process.env.PINECONE_HOST);

// NOTE: BM25 sparse indexing is NOT implemented.  A real implementation would
// use @pinecone-database/text (server-side tokenisation) or a dedicated sparse
// index.  Until then, retrieval is dense-only so results are actually meaningful.

// Enforce namespaces by strict union type
export type EngineNamespace = "deepreal-cases" | "mhgap-modules" | "religion-tafsir";

export async function upsertCase(
  caseDoc: { id: string; text: string; metadata: any },
  namespace: EngineNamespace
) {
  const { embedding } = await embed({ model: model("embed") as any, value: caseDoc.text });
  const nsIndex = index.namespace(namespace);

  // Dense-only upsert — no sparseValues because BM25 is not implemented
  await nsIndex.upsert([{
    id: caseDoc.id,
    values: embedding,
    metadata: { ...caseDoc.metadata, indexedAt: new Date().toISOString() },
  }] as any);
}

export async function retrieveSimilarCases(
  query: string,
  namespace: EngineNamespace,
  _alpha = 0.6, // kept for API compatibility; unused until sparse is implemented
  topK = 6
) {
  const { embedding } = await embed({ model: model("embed") as any, value: query });

  const nsIndex = index.namespace(namespace);

  // Dense-only query — sparseVector omitted because BM25 is not implemented
  // Over-fetch, then Cohere-rerank to topK by true relevance to the query.
  const res = await nsIndex.query({
    topK: Math.max(topK, 12),
    vector: embedding,
    includeMetadata: true,
  });

  // FAILS SAFE: rerank only when matches carry text metadata; otherwise keep
  // Pinecone's dense order. rerankBy returns the original order if Cohere is down.
  const matches = res.matches ?? [];
  const hasText = matches.some((m) => typeof (m.metadata as { text?: unknown } | undefined)?.text === "string");
  if (!hasText) return { ...res, matches: matches.slice(0, topK) };
  const reranked = await rerankBy(query, matches, (m) => String((m.metadata as { text?: unknown })?.text ?? ""), { topN: topK });
  return { ...res, matches: reranked.slice(0, topK) };
}
