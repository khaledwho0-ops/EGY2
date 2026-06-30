import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { CovoRouter as COVORouter } from "@/lib/orchestration/covo-router";

export const runtime = "nodejs";
// Evidence aggregation (5 academic APIs, up to ~22s) + LLM synthesis needs more
// than the 10s Hobby default — give the orchestrator the full 60s budget.
export const maxDuration = 60;

const SovoSchema = z.object({
  verdict: z.enum(['DEBUNKED', 'MISLEADING', 'PARTIALLY_TRUE', 'UNVERIFIED', 'TRUE']),
  verdict_explanation_ar: z.string().describe("Empathetic, clear Arabic explanation of the verdict, blending Fusha and Egyptian dialect."),
  verdict_explanation_en: z.string().describe("Empathetic, clear English explanation of the verdict."),
  truth_sandwich: z.object({
    fact_1_ar: z.string().describe("Absolute truth top sandwich in Arabic."),
    fact_1_en: z.string().describe("Absolute truth top sandwich in English."),
    myth_ar: z.string().describe("The myth/lie exposed in Arabic."),
    myth_en: z.string().describe("The myth/lie exposed in English."),
    fact_2_ar: z.string().describe("Reinforcing truth bottom sandwich in Arabic."),
    fact_2_en: z.string().describe("Reinforcing truth bottom sandwich in English.")
  }),
  scientific_audit: z.object({
    analysis: z.string().describe("Critical review of the scientific evidence, referencing cited studies."),
    sample_size_n: z.number().describe("Typical sample size of studies cited. Put 0 if none."),
    p_value: z.string().describe("Typical p-value or statistical significance (e.g., p < 0.05)."),
    funding_disclosed: z.string().describe("Brief analysis of corporate funding, sponsorships, or conflicts of interest."),
    prisma_compliant: z.boolean().describe("true if standard medical/scientific research methodology is met.")
  }),
  islamic_audit: z.object({
    analysis: z.string().describe("Scholarly explanation of the religious claim, referencing authentic texts."),
    hadith_authenticity: z.string().describe("Authenticity level of cited hadiths (Sahih/Hasan/Da'if/Mawdu'/None)."),
    maqasid_category: z.string().describe("Which of the 5 Maqasid (Religion, Life, Intellect, Lineage, Property) is relevant."),
    authority_check: z.string().describe("Official stance of Al-Azhar or Dar al-Ifta if applicable.")
  }),
  cognitive_defense: z.object({
    detected_fallacy: z.string().describe("Primary logical fallacy identified (e.g., Cherry-Picking, Post Hoc)."),
    detected_bias: z.string().describe("Primary cognitive bias triggered (e.g., Confirmation Bias)."),
    socratic_deconstruction: z.string().describe("Socratic question to defuse the psychological manipulation.")
  })
});

export async function POST(req: Request) {
  try {
    const { query, mode = "universal" } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const { origin } = new URL(req.url);

    // Run the structural heuristic parser
    const baseAnalysis = await COVORouter.analyzeQuery(query);

    // Call external evidence APIs in parallel. Each call is bounded by a timeout
    // so a single slow/blocked sub-route can never hang the whole orchestrator.
    // BUG FIX: the old 8s cap was BELOW the evidence aggregator's real latency
    // (it fans out to 5 academic APIs and routinely takes 12-14s), so EVERY run
    // timed out → results:[] → citations:[] even though real Tier-A/B journal
    // hits existed. Raised to 22s (route maxDuration is 60s — plenty of budget)
    // so genuine sources are actually retrieved and shown.
    const evFetch = (path: string) =>
      fetch(`${origin}${path}?q=${encodeURIComponent(query)}`, { signal: AbortSignal.timeout(22000) })
        .then(r => r.json())
        .catch(() => ({ results: [] }));
    const [evidenceData, factcheckData, hadithData] = await Promise.all([
      evFetch('/api/search/evidence'),
      evFetch('/api/search/factcheck'),
      evFetch('/api/islamic/hadith'),
    ]);

    // Compile citations context for the LLM
    const citationsText = [
      ...(evidenceData.results || []).map((w: any) => `[Science] Title: ${w.title} | Source: ${w.sourceName} | Summary: ${w.summary} | Access: ${w.accessTier}`),
      ...(factcheckData.results || []).map((w: any) => `[FactCheck] Title: ${w.title} | Publisher: ${w.sourceName} | Verdict: ${w.summary}`),
      ...(hadithData.results || []).map((w: any) => `[Hadith] Collection: ${w.collection} | Grade: ${w.grade} | Text: ${w.englishText}`)
    ].join("\n\n");

    const systemPrompt = `You are SOVO Nexus (Scientific Objective Verification Orchestrator), the elite central brain of the Egyptian Awareness Library. 
Your task is to analyze claims, filter out manipulation, and synthesize truth from empirical and textual API evidence.

CLAIM: "${query}"
DOMAINS CLASSIFIED: ${baseAnalysis?.route ?? "general"}
EMOTION BIAS RISK: ${baseAnalysis?.eis ?? "n/a"}${baseAnalysis?.highEmotionalManipulation ? " (HIGH emotional-manipulation risk)" : ""}

REAL-TIME API DATA RETURNED:
${citationsText || "No matching API results found. Perform analysis using pre-existing scientific consensus and classical Islamic scholarship."}

CRITICAL RULES:
1. Provide a Truth Sandwich (Fact -> Myth -> Fact).
2. If this is a medical or health claim, evaluate the statistical power (N value) and p-value.
3. If this is a religious claim, check Hadith authenticity and verify it aligns with Al-Azhar / Dar al-Ifta moderation.
4. Detect cognitive fallacies and biases.
5. Socratic Deconstruction: Give the user a clear question to expose the lie's internal contradiction.
`;

    // ══ Schema-bound rotator (Groq-first) PRIMARY → free-text JSON fallback ══
    // PRIMARY is the Zod-validated path so the response ALWAYS matches the exact
    // SovoSchema the page renders (truth_sandwich / scientific_audit /
    // islamic_audit / cognitive_defense). The old free-text-JSON primary
    // returned a DIFFERENT, looser shape ({conclusion, analysis:{...}}) that the
    // page can't fully consume — that's why fields looked stubby/partial.
    let result: unknown = null;
    let aiProvider = 'Groq';
    try {
      const obj = await rotatingGenerateObject({ schema: SovoSchema, prompt: systemPrompt });
      const { provider, ...object } = obj as Record<string, unknown>;
      result = object;
      if (typeof provider === 'string') aiProvider = provider;
    } catch {
      // FALLBACK: free-text JSON (handles slots without structured-output support)
      try {
        const { nvidiaFirstGenerateJSON } = await import('@/lib/ai/nvidia-first');
        const { data, provider } = await nvidiaFirstGenerateJSON(systemPrompt, {
          systemPrompt: "You are SOVO Nexus, the world's most advanced dual-mandate (scientific + Islamic) fact-checking AI. Return ONLY valid JSON matching the full schema.",
          maxTokens: 2500,
          temperature: 0.15,
        });
        if (data) {
          result = data;
          aiProvider = provider || 'Rotator';
        }
      } catch { /* result stays null → handled below */ }
    }

    // Never spread null — if every provider failed, return a One-Law-safe
    // UNVERIFIED skeleton (no fabricated sources) rather than crashing.
    const safeResult: Record<string, unknown> = (result && typeof result === 'object')
      ? (result as Record<string, unknown>)
      : {
          verdict: 'UNVERIFIED',
          verdict_explanation_ar: 'تعذّر إكمال التحليل من مزوّدي الذكاء الاصطناعي في الوقت المتاح. يُرجى المحاولة مرة أخرى.',
          verdict_explanation_en: 'AI synthesis could not be completed in the available time. Please try again.',
        };

    return NextResponse.json({
      type: "SYNTHESIS_COMPLETE",
      aiProvider,
      data: {
        ...safeResult,
        covoAnalysis: baseAnalysis,
        citations: [
          ...(evidenceData.results || []).map((w: any) => ({ title: w.title, url: w.url, type: 'science' })),
          ...(factcheckData.results || []).map((w: any) => ({ title: w.title, url: w.url, type: 'factcheck' })),
          ...(hadithData.results || []).map((w: any) => ({ title: `${w.collection} (Ref: ${w.reference || "N/A"})`, url: w.sourceUrl, type: 'hadith' }))
        ]
      }
    });

  } catch (error: any) {
    console.error("[SOVO API Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
