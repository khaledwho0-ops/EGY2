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
import { aiGenerate, translateText } from "@/lib/ai/providers";

/** Does the text contain Arabic script? */
function hasArabic(text: string): boolean {
  return /[؀-ۿݐ-ݿ]/.test(text);
}

/**
 * Build the set of search queries used against the English-first academic
 * APIs (OpenAlex / Semantic Scholar / Europe PMC / DOAJ / arXiv / CORE).
 *
 * THE BUG THIS FIXES: a verbatim Arabic claim (e.g. "الليمون على الريق يعالج
 * السرطان") returns ZERO hits from these English-keyword databases, so the
 * One-Law enforcer saw 0 admissible sources and labelled EVERY real false
 * health claim "UNVERIFIED" — even though real Tier-A debunking papers exist
 * (search "lemon cancer" → 6 Tier-A journal hits).
 *
 * Fix: when the claim is Arabic, derive English search keywords first (LLM
 * rotator, Groq/Gemini-first; HF opus-mt translation as a fallback), and
 * search with BOTH the English keywords AND the original text. This invents
 * NO sources — it only lets the retriever FIND the genuine ones. Pure best
 * effort: every step fails safe to the original claim.
 */
async function buildSearchQueries(claim: string): Promise<string[]> {
  const queries = new Set<string>([claim]);
  if (!hasArabic(claim)) return [...queries];

  // (1) Preferred: LLM extracts concise English search keywords (subject +
  //     intervention + outcome), which match academic-DB indexing far better
  //     than a literal machine translation of a whole sentence.
  try {
    const { text } = await aiGenerate(
      `Extract 3-6 concise ENGLISH search keywords (scientific/medical terms preferred) that capture the SUBJECT of this claim so it can be looked up in English academic databases. Output ONLY the keywords on one line, space-separated, no punctuation, no quotes, no explanation.\n\nClaim: "${claim}"`,
      "You convert a claim in any language into English database search keywords. Output keywords only.",
    );
    const keywords = text
      .replace(/["'`#*\-\n\r]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter((w) => /[a-zA-Z]/.test(w))
      .slice(0, 8)
      .join(" ")
      .trim();
    if (keywords.length >= 3) queries.add(keywords);
  } catch {
    /* fall through to translation */
  }

  // (2) Fallback: direct AR→EN machine translation of the claim.
  if (queries.size < 2) {
    try {
      const translated = await translateText(claim, "ar-en");
      if (translated && /[a-zA-Z]/.test(translated) && translated.trim().length >= 3) {
        queries.add(translated.trim());
      }
    } catch {
      /* keep original-only */
    }
  }

  return [...queries];
}

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
  //     Search with English keywords too (Arabic claims otherwise 0-hit the
  //     English-first academic APIs → false "UNVERIFIED"). See buildSearchQueries.
  const queries = await buildSearchQueries(claim).catch(() => [claim]);
  const academicBatches = await Promise.all(
    queries.map((q) => aggregateEvidence(q, { max, rerank: false }).catch(() => [])),
  );
  // Merge across queries, dedup by URL (keep the first/strongest occurrence).
  const seen = new Set<string>();
  const academic = academicBatches.flat().filter((r) => {
    if (!r.url || seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
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
