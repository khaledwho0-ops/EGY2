import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";

const blackboxSystemPrompt = `[LAYER 1 - ROLE]: You are the anonymous intelligence analyst of the Egyptian Awareness Library. When citizens submit claims they're afraid to ask about openly, you provide honest, judgment-free analysis.

[LAYER 2 - PLATFORM]: EAL Blackbox - Anonymous claim submission. Users may be testing claims that are socially sensitive (religious, political, health).

[LAYER 3 - MISSION]: Provide honest analysis without social pressure. A user afraid to ask about a claim publicly can find truth here. No claim is too sensitive.

[LAYER 4 - CONSTRAINTS]:
- Absolute non-judgmental stance
- Be especially rigorous about religious claims (many users fear being judged for questioning)
- Health claims: always cite WHO/NIH as anchors
- Political claims: present multiple perspectives, avoid advocacy
- Never refuse to analyze a claim on grounds of sensitivity alone

[LAYER 5 - FORMAT]: Return ONLY valid JSON (no markdown, no code fences) with: results (array of objects, each with: type string, risk "High"/"Medium"/"Low", desc string), verdict (string), confidence (string), explanation_ar (string), explanation_en (string), sensitivityNote_ar (string), truthSandwich (string), sources (array of strings).

[LAYER 6 - ANTI-HALLUCINATION]: Extra caution here. Blackbox users are often vulnerable. Wrong information can cause serious harm. Flag uncertainty explicitly. Never fabricate citations.`;

const BlackboxSchema = z.object({
  results: z.array(z.object({
    type: z.string().describe("Anomaly type (e.g., Hidden Corporate Funding, Non-FAIR Data Practice, Ghostwriting Stylometric Clues)."),
    risk: z.enum(['High', 'Medium', 'Low']),
    desc: z.string().describe("A 1-2 sentence detailed explanation of the forensic finding.")
  }))
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // Fetch evidence papers DIRECTLY — the previous self-HTTP call,
    // fetch(`${origin}/api/search/evidence`), deadlocked the single-process dev
    // server. aggregateEvidence is the same retrieval (Cohere-reranked), in-process.
    const { aggregateEvidence } = await import("@/lib/evidence/aggregate");
    const papers = await aggregateEvidence(query, { max: 6 }).catch(() => []);

    const papersContext = papers.map((p: { title?: string; sourceName?: string; summary?: string; url?: string; accessTier?: string }) =>
      `Title: ${p.title}\nJournal/Source: ${p.sourceName}\nSummary: ${p.summary}\nURL: ${p.url}\nAccess Tier: ${p.accessTier}`
    ).join("\n\n");

    // ── ONE LAW: the audit is only admissible if real, whitelisted sources
    //    (the fetched evidence papers, Tier S–C) back it. ──
    const { enforceOneLaw, applyVerdictEnforcement } = await import("@/lib/ai/output-enforcer");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enforcement = enforceOneLaw(papers.map((p: any) => ({ title: p.title, url: p.url, tier: p.trustBand })));
    const enforcementOut = {
      status: enforcement.status,
      tier: enforcement.tierFloor,
      admissibleSources: enforcement.sources.length,
      reason: enforcement.reason,
    };

    const nvidiaUserPrompt = `Perform a forensic audit for this anonymous claim submission.

User Query / DOI: "${query}"

RESEARCH PAPERS METADATA FOUND:
${papersContext || "No exact papers found. Perform a forensic topic-level bias audit on typical papers dealing with this topic."}

Audit for: conflicts of interest, corporate funding bias, ghostwriting signatures, non-FAIR data practices, and claim veracity.
Return JSON with: results (array with type/risk/desc), verdict, confidence, explanation_ar, explanation_en, sensitivityNote_ar, truthSandwich, sources.`;

    // ── PRIMARY: NVIDIA NIM with multi-layered anonymous analyst system prompt ──
    const { data: nvidiaData, provider } = await nvidiaFirstGenerateJSON(nvidiaUserPrompt, {
      systemPrompt: blackboxSystemPrompt,
      maxTokens: 1500,
      temperature: 0.2,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nd = nvidiaData as any;
    if (nd && Array.isArray(nd.results) && nd.results.length > 0) {
      // Apply One Law: downgrade verdict to UNVERIFIED when no admissible source backs it
      const enforcedVerdict = applyVerdictEnforcement(
        { verdict: nd.verdict ?? null, confidence: nd.confidence ?? null },
        enforcement,
      );
      return NextResponse.json({
        results: nd.results,
        verdict: enforcedVerdict.verdict ?? null,
        confidence: enforcedVerdict.confidence ?? null,
        unverifiedReason: enforcedVerdict.unverifiedReason ?? null,
        explanation_ar: enforcement.status === 'verified' ? (nd.explanation_ar ?? null) : null,
        explanation_en: enforcement.status === 'verified' ? (nd.explanation_en ?? null) : null,
        sensitivityNote_ar: nd.sensitivityNote_ar ?? null,
        truthSandwich: enforcement.status === 'verified' ? (nd.truthSandwich ?? null) : null,
        sources: nd.sources ?? [],
        auditedPapersCount: papers.length,
        enforcement: enforcementOut,
        provider,
      });
    }

    // ── FALLBACK: Gemini mega-rotator ──
    const fallbackPrompt = `You are the BLACKBOX Forensic Audit Engine.
Your mission is to audit academic research papers for conflicts of interest (COI), industry funding bias, ghostwriting signatures, and non-FAIR data practices.

User Search Query / DOI: "${query}"

RESEARCH PAPERS METADATA FOUND:
${papersContext || "No exact papers found. Perform a forensic topic-level bias audit on typical papers dealing with this topic."}

INSTRUCTIONS:
1. Examine the paper metadata.
2. Flag conflicts of interest: Check if research is funded by interested corporate parties (e.g., soft drink giants funding sugar research, oil firms funding climate papers).
3. Flag ghostwriting patterns: If authors seem to have corporate PR affiliations or if abstract reads like marketing copy.
4. Flag non-FAIR data: If the access tier is not fully open/free, or if there is no linked public dataset repository.
5. Return 2-4 distinct audit items in the results array conforming to the schema. Make the audit feel extremely realistic, tracing known industry lobbying and academic integrity guidelines (COPE, PRISMA).`;

    const { object: result } = await rotatingGenerateObject({
      schema: BlackboxSchema,
      prompt: fallbackPrompt,
    });

    // Apply One Law to Gemini fallback as well
    const fallbackEnforcedVerdict = applyVerdictEnforcement(null, enforcement);
    return NextResponse.json({
      results: result.results,
      verdict: fallbackEnforcedVerdict.verdict ?? null,
      unverifiedReason: fallbackEnforcedVerdict.unverifiedReason ?? null,
      auditedPapersCount: papers.length,
      enforcement: enforcementOut,
      provider: 'Gemini (fallback)',
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error("[Blackbox API Error]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
