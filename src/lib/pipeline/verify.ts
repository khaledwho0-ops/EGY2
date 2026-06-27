/* ═══════════════════════════════════════════════════════════════
 * runVerificationPipeline — the shared One-Law verification chain.
 *
 * Retrieves real evidence for a claim from TWO sources, then enforces the
 * One Law over the combined, Cohere-reranked pool:
 *   (a) RELIABLE academic/fact APIs via aggregateEvidence (OpenAlex, Europe PMC,
 *       DOAJ, Semantic Scholar, arXiv, CORE) — these never block; their vetted
 *       trustBand is TRUSTED as the tier.
 *   (b) BEST-EFFORT general web via a lateral search (DuckDuckGo often blocks
 *       scrapers, so it is wrapped — a block degrades to "no web sources",
 *       never a thrown request); these are classified by URL.
 *
 * Every chatbot / fact-check surface calls this so no answer ships fabricated
 * or unsourced authority. Node-only (cheerio); callers must run on nodejs.
 * ═══════════════════════════════════════════════════════════════ */

import * as cheerio from "cheerio";
import { search } from "duck-duck-scrape";
import { classifyTier, type SourceTier } from "@/lib/standard/sources";
import {
  enforceOneLaw,
  type EnforcementResult,
  type ClassifiedSource,
  type CandidateSource,
} from "@/lib/ai/output-enforcer";
import { aggregateEvidence } from "@/lib/evidence/aggregate";
import { rerankBy } from "@/lib/ai/cohere-rerank";

export interface PipelineSource {
  url: string;
  title: string;
  tier: SourceTier;
}

export interface VerificationResult {
  /** every candidate considered, classified */
  sources: PipelineSource[];
  /** Tier S-C only, strongest first */
  admissible: ClassifiedSource[];
  /** the One-Law verdict over the candidates */
  enforcement: EnforcementResult;
}

export async function runVerificationPipeline(
  claim: string,
  opts: { max?: number; timeoutMs?: number } = {},
): Promise<VerificationResult> {
  const max = opts.max ?? 6;
  const timeoutMs = opts.timeoutMs ?? 8000;

  // (a) Reliable academic/fact sources — trust their vetted trustBand as tier.
  const academic = await aggregateEvidence(claim, { max, rerank: false }).catch(() => []);
  const academicCandidates: CandidateSource[] = academic.map((r) => ({
    title: r.title,
    url: r.url,
    tier: r.trustBand as SourceTier,
    evidence: r.summary,
  }));

  // (b) Best-effort general web (wrapped — a scraper block must not throw).
  let webCandidates: CandidateSource[] = [];
  try {
    const lateral = await search(`"${claim}" -site:facebook.com -site:twitter.com -site:x.com`);
    const top = (lateral.results || [])
      .slice(0, max)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((r: any) => /^https?:\/\//.test(r.url));
    webCandidates = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      top.map(async (r: any) => {
        try {
          const html = await fetch(r.url, {
            headers: { "User-Agent": "CognitiveFortressBot/1.0 (+https://egyptianawareness.local/about-bot)" },
            signal: AbortSignal.timeout(timeoutMs),
          }).then((res) => res.text());
          const title = cheerio.load(html)("title").text().trim();
          return { url: r.url as string, title: title || r.title || r.url } as CandidateSource;
        } catch {
          return { url: r.url as string, title: (r.title as string) || r.url } as CandidateSource;
        }
      }),
    );
  } catch {
    webCandidates = [];
  }

  // (c) Combine → Cohere-rerank by relevance to the claim → enforce the One Law.
  const all: CandidateSource[] = [...academicCandidates, ...webCandidates];
  const reranked =
    all.length > 1
      ? await rerankBy(claim, all, (c) => `${c.title ?? ""}. ${c.evidence ?? ""}`, { topN: max * 2 })
      : all;

  const enforcement = enforceOneLaw(reranked);
  const sources: PipelineSource[] = reranked.map((c) => ({
    url: c.url,
    title: c.title || c.url,
    tier: c.tier ?? classifyTier(c.url).tier,
  }));

  return { sources, admissible: enforcement.sources, enforcement };
}
