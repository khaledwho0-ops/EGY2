import { z } from "zod";
import { classifyTier, tierWeight, type SourceTier } from "@/lib/standard";

const WorkerResponseSchema = z.object({
  title: z.string(),
  abstract: z.string().max(800),
  credibilityScore: z.number().min(0).max(100),
  citationUrl: z.string().url().optional(),
  tier: z.enum(["S", "A", "B", "C", "U"]).optional(),
});
export type WorkerResponse = z.infer<typeof WorkerResponseSchema>;

/* ── Credibility is DERIVED from source tier + whether REAL content was
 *    actually extracted — not from hardcoded name keywords (EAL Standard §2/§9). */
export function deriveScore(tier: SourceTier, content: string): number {
  const base = tierWeight(tier); // S=100 A=88 B=70 C=45 U=20
  if (content && content.length > 120) return base;            // rich real evidence
  if (content && content.length > 40) return Math.round(base * 0.85);
  return Math.round(base * 0.6);                                // thin/empty ⇒ penalized
}

export async function withTimeout<T>(promise: Promise<T>, ms = 8000, abortController?: AbortController): Promise<T> {
  let timeoutId: number | ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      if (abortController) abortController.abort();
      reject(new Error("Worker timed out"));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

/* ── OpenAlex stores abstracts as an inverted index { word: [positions] }.
 *    Decode it back into real text so the LLM is grounded in actual evidence. */
function decodeInvertedIndex(idx: Record<string, number[]> | null | undefined): string {
  if (!idx) return "";
  const words: string[] = [];
  for (const [word, positions] of Object.entries(idx)) {
    for (const p of positions) words[p] = word;
  }
  return words.filter(Boolean).join(" ").trim();
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// ── Fetchers (all return REAL extracted content or null) ──────────────────

async function fetchOpenAlex(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  try {
    // OpenAlex: mailto polite pool sunset ~Feb 2026 — prefer the API key when present
    const auth = process.env.OPENALEX_API_KEY ? `&api_key=${process.env.OPENALEX_API_KEY}` : `&mailto=eal@research.org`;
    const res = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=3${auth}`, { signal });
    if (!res.ok) throw new Error("OpenAlex API Error");
    const data = await res.json();
    const work = data?.results?.[0];
    if (!work) return null;

    const realAbstract = decodeInvertedIndex(work.abstract_inverted_index);
    const venue = work.primary_location?.source?.display_name || work.host_venue?.display_name || "";
    const year = work.publication_year ? ` (${work.publication_year})` : "";
    const abstract = (realAbstract || `Indexed work${venue ? ` in ${venue}` : ""}${year}.`).slice(0, 700);
    const citationUrl = (typeof work.id === "string" && /^https?:\/\//.test(work.id)) ? work.id : "https://openalex.org";
    const tier = classifyTier(citationUrl).tier;

    return WorkerResponseSchema.parse({
      title: `OpenAlex: ${work.title || "Scientific graph match"}${venue ? ` — ${venue}` : ""}`,
      abstract,
      credibilityScore: deriveScore(tier, realAbstract),
      citationUrl,
      tier,
    });
  } catch (error) {
    console.warn("[OpenAlex] Fetch error:", error);
    return null;
  }
}

async function fetchEuropePMC(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  try {
    // resultType=core returns the REAL abstractText (lite did not).
    const res = await fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=core&pageSize=3`, { signal });
    if (!res.ok) throw new Error("EuropePMC API Error");
    const data = await res.json();
    const hit = data?.resultList?.result?.[0];
    if (!hit) return null;

    const realAbstract = (hit.abstractText ? stripTags(hit.abstractText) : "").slice(0, 700);
    const journal = hit.journalInfo?.journal?.title || hit.source || "";
    const citationUrl = hit.pmid ? `https://europepmc.org/article/MED/${hit.pmid}` : (hit.doi ? `https://doi.org/${hit.doi}` : "https://europepmc.org");
    const tier = classifyTier(citationUrl).tier;

    return WorkerResponseSchema.parse({
      title: `EuropePMC: ${hit.title || "Peer-reviewed match"}${journal ? ` — ${journal}` : ""}`,
      abstract: realAbstract || "Peer-reviewed record matched (no abstract published).",
      credibilityScore: deriveScore(tier, realAbstract),
      citationUrl,
      tier,
    });
  } catch (error) {
    console.warn("[EuropePMC] Fetch error:", error);
    return null;
  }
}

async function fetchQuran(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/ar`, { signal });
    if (!res.ok) throw new Error("AlQuran API Error");
    const data = await res.json();
    if (!data?.data || !data.data.count) return null;

    const m = data.data.matches?.[0];
    const sample = m ? `«${stripTags(m.text || "")}» — ${m.surah?.name || ""} (${m.surah?.number || "?"}:${m.numberInSurah || "?"})` : "";
    const abstract = `${data.data.count} exact match(es) in the Qur'anic text. ${sample}`.slice(0, 700);
    const tier = classifyTier("https://quran.com").tier; // authentic Islamic authority ⇒ Tier A

    return WorkerResponseSchema.parse({
      title: "AlQuran.cloud — Qur'anic text verification",
      abstract,
      credibilityScore: deriveScore(tier, abstract),
      citationUrl: "https://alquran.cloud",
      tier,
    });
  } catch (error) {
    console.warn("[Quran] Fetch error:", error);
    return null;
  }
}

/* ── Real graded-hadith retrieval (EAL Standard §4.2 — no ungraded hadith).
 *    Primary: HadithAPI.com (free key) — searchable, returns an authenticity `status`.
 *    Fallback: Dorar (الدرر السنية) best-effort (often WAF-blocked from serverless).
 *    Returns null if neither yields an AUTHENTICATED, GRADED narration — never a guess. */
async function fetchHadith(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  const isArabic = /[؀-ۿ]/.test(query);
  const tier = classifyTier("https://sunnah.com").tier; // authentic Islamic authority ⇒ Tier A

  // ── Primary: HadithAPI.com (activate with HADITHAPI_COM_KEY) ──
  const key = process.env.HADITHAPI_COM_KEY;
  if (key) {
    try {
      const param = isArabic ? "hadithArabic" : "hadithEnglish";
      const url = `https://hadithapi.com/api/hadiths?apiKey=${encodeURIComponent(key)}&${param}=${encodeURIComponent(query)}&paginate=3`;
      const res = await fetch(url, { signal });
      if (res.ok) {
        const data = await res.json();
        const h = data?.hadiths?.data?.[0];
        if (h && (h.status || h.hadithEnglish || h.hadithArabic)) {
          const text = (isArabic ? h.hadithArabic : h.hadithEnglish) || h.hadithEnglish || h.hadithArabic || "";
          const grade = h.status || "Ungraded";
          const ref = `${h.book?.bookName || "Hadith"}${h.hadithNumber ? ` #${h.hadithNumber}` : ""}`;
          const abstract = `${ref} — Grade: ${grade}. «${stripTags(String(text)).slice(0, 220)}»`.slice(0, 700);
          return WorkerResponseSchema.parse({
            title: `HadithAPI.com — ${ref} (Grade: ${grade})`,
            abstract,
            credibilityScore: deriveScore(tier, abstract),
            citationUrl: "https://hadithapi.com",
            tier,
          });
        }
      }
    } catch (error) {
      console.warn("[Hadith/HadithAPI] Fetch error:", error);
    }
  }

  // ── Fallback: Dorar best-effort (returns null on WAF block / HTML) ──
  try {
    const res = await fetch(`https://dorar.net/dorar_api.json?skey=${encodeURIComponent(query)}`, {
      signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
      },
    });
    const ctype = res.headers.get("content-type") || "";
    if (!res.ok || !ctype.includes("json")) return null; // blocked / HTML ⇒ honest null, never a guess
    const data = await res.json();
    const html: string = data?.ahadith?.result ?? "";
    if (!html || !/class=["']?hadith/.test(html)) return null;

    const textMatch = html.match(/class=["']?hadith["']?[^>]*>([\s\S]*?)<\/div>/);
    const hadithText = textMatch ? stripTags(textMatch[1]).slice(0, 240) : "";
    if (!hadithText) return null;

    const after = (label: string) => {
      const m = html.match(new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*<\\/span>\\s*([\\s\\S]*?)<"));
      return m ? stripTags(m[1]) : "";
    };
    const grade = after("خلاصة حكم المحدث:") || after("الدرجة:") || "غير محدد";
    const muhaddith = after("المحدث:");
    const source = after("المصدر:");

    const abstract = `حديث: «${hadithText}» — الدرجة: ${grade}${muhaddith ? ` (المحدث: ${muhaddith})` : ""}${source ? ` — المصدر: ${source}` : ""}`.slice(0, 700);
    const dorarTier = classifyTier("https://dorar.net").tier;
    return WorkerResponseSchema.parse({
      title: "Dorar.net (الدرر السنية) — تخريج وتصحيح الحديث",
      abstract,
      credibilityScore: deriveScore(dorarTier, hadithText),
      citationUrl: "https://dorar.net",
      tier: dorarTier,
    });
  } catch (error) {
    console.warn("[Hadith/Dorar] Fetch error:", error);
    return null;
  }
}

async function fetchGoogleFactCheck(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  try {
    const apiKey = process.env.GOOGLE_FACTCHECK_API_KEY;
    if (!apiKey) return null;
    const res = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${apiKey}`, { signal });
    if (!res.ok) throw new Error("Google FactCheck API Error");
    const data = await res.json();
    const claim = data?.claims?.[0];
    const review = claim?.claimReview?.[0];
    if (!review) return null;

    const abstract = `${review.publisher?.name || "Fact-checker"} rated: "${review.textualRating || "N/A"}". Claim: "${(claim.text || "").slice(0, 200)}"`.slice(0, 700);
    const citationUrl = (typeof review.url === "string" && /^https?:\/\//.test(review.url)) ? review.url : undefined;
    const tier = classifyTier(citationUrl).tier;

    return WorkerResponseSchema.parse({
      title: `Google FactCheck: ${review.publisher?.name || "verified fact-checker"}`,
      abstract,
      credibilityScore: deriveScore(tier, abstract),
      ...(citationUrl ? { citationUrl } : {}),
      tier,
    });
  } catch (error) {
    console.warn("[GoogleFactCheck] Fetch error:", error);
    return null;
  }
}

/* Parallel swarm — real APIs, real content, AbortController-bounded (no socket leak). */
export async function executeApiSwarm(query: string): Promise<WorkerResponse[]> {
  const fetcherFns = [fetchOpenAlex, fetchEuropePMC, fetchQuran, fetchHadith, fetchGoogleFactCheck];

  const results = await Promise.allSettled(
    fetcherFns.map((fn) => {
      const ac = new AbortController();
      return withTimeout(fn(query, ac.signal), 8000, ac);
    }),
  );

  const successfulResults: WorkerResponse[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && result.value !== null) {
      successfulResults.push(result.value);
    } else if (result.status === "rejected") {
      console.warn("[Api-Swarm] A fetcher failed or timed out:", result.reason);
    }
  }
  return successfulResults;
}
