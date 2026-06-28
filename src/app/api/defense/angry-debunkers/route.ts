import { NextResponse } from "next/server";
import { runPreflight } from "@/lib/debunking/preflight";
import { executeApiSwarm } from "@/lib/debunking/workers/api-swarm";
import { CovoRouter as COVORouter } from "@/lib/orchestration/covo-router";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";
import { EgyptianContextVectorSchema, NegativeScienceCategorySchema } from "@/lib/debunking/egy-data";
import { GodSystemAuditSchema, LayerAwareAnalysisSchema } from "@/types/god-system";
import { classifyTier, getLayer, deriveConfidenceLabel, type SourceTier, SourceAdjudicationSchema, buildLogicLayerPrompt, applyAdjudication, unadjudicated, RELEVANCE_THRESHOLD } from "@/lib/standard";

export const runtime = 'nodejs';

/* ══════════════════════════════════════════════════════════
   QUICK MODE SCHEMA (1 API call — Truth Sandwich only)
   Bilingual: Arabic + English  |  Religion-Aware
══════════════════════════════════════════════════════════ */
const QuickSchema = z.object({
  egyptian_vector_hit: EgyptianContextVectorSchema,
  negative_science_violation: NegativeScienceCategorySchema,
  truth_sandwich: z.object({
    fact_1_ar: z.string().describe('First fact in Arabic (Egyptian dialect preferred). If religious claim, cite the actual hadith/verse with correct scholarly context'),
    fact_1_en: z.string().describe('First fact in English'),
    myth_ar: z.string().describe('The myth/lie being debunked in Arabic'),
    myth_en: z.string().describe('The myth/lie being debunked in English'),
    fact_2_ar: z.string().describe('Second reinforcing fact in Arabic. If religious, cite scholars (e.g. Ibn Hajar, Al-Nawawi) and their actual positions'),
    fact_2_en: z.string().describe('Second reinforcing fact in English'),
  }),
  verdict: z.enum(['DEBUNKED', 'MISLEADING', 'PARTIALLY_TRUE', 'UNVERIFIED', 'TRUE']).describe('Overall verdict on the claim'),
  verdict_explanation_ar: z.string().describe('1-2 paragraph explanation of verdict in Arabic, detailed and educational'),
  verdict_explanation_en: z.string().describe('1-2 paragraph explanation of verdict in English, detailed and educational'),
  is_religious_claim: z.boolean().describe('true if the claim involves religion, hadith, Quran, fatwa, or Islamic content'),
  religious_context: z.object({
    hadith_status: z.string().optional().describe('If hadith is cited: Sahih/Hasan/Da\'if/Mawdu\'/Not a hadith'),
    correct_interpretation: z.string().optional().describe('The scholarly consensus interpretation of the religious text cited'),
    scholars_cited: z.string().optional().describe('Which Islamic scholars have addressed this topic (e.g. Al-Albani, Ibn Baz)'),
  }).optional().describe('Only populated if is_religious_claim is true'),
  deception_layer_number: z.number().min(1).max(8).describe('Which of the 8 canonical EAL deception layers best fits this claim: 1=Absolute Fabrication, 2=Biased Lens, 3=Decontextualization, 4=Weaponized Timing, 5=Evil Application, 6=Matrix of Manipulation, 7=The Architects, 8=The Unknown'),
  confidence_score: z.number().min(0).max(100).describe('Model self-reported confidence (0-100). NOTE: the final displayed confidence is DERIVED server-side from source tier + cross-model agreement + grounding critique, not from this number alone.'),
});

/* ══════════════════════════════════════════════════════════
   DEEP MODE SCHEMA (2nd API call — full forensic analysis)
══════════════════════════════════════════════════════════ */
const DeepSchema = z.object({
  god_system_7_layer_audit: GodSystemAuditSchema,
  patient_zero_tracing: z.object({
    origin_year: z.string().describe('The approximate year this myth first emerged'),
    origin_platform: z.string().describe('The platform or context where this myth originated'),
    transmission_vector: z.string().describe('HOW the lie spread specifically into Egyptian/Arab context'),
    why_trending_now: z.string().describe('Why this myth is circulating right now in 2025/2026 Egypt'),
    named_instigator: z.string().optional().describe('The primary spreader if identifiable'),
  }),
  layer_aware_analysis: LayerAwareAnalysisSchema,
});

/* ── EAL Standard §2 — cross-model consensus + adversarial self-critique ── */
const SecondOpinionSchema = z.object({
  verdict: z.enum(['DEBUNKED', 'MISLEADING', 'PARTIALLY_TRUE', 'UNVERIFIED', 'TRUE']),
  one_line_reason: z.string(),
});
const CritiqueSchema = z.object({
  unsupported_claims: z.array(z.string()).describe('Asserted sentences NOT supported by the provided sources'),
  note: z.string().describe('Short note on grounding quality'),
});
const TIER_ORDER: SourceTier[] = ['S', 'A', 'B', 'C', 'U'];

/** Time-box a promise; resolve null if it exceeds ms (keeps best-effort meta-checks from hanging the request). */
function withCap<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([p, new Promise<null>((res) => setTimeout(() => res(null), ms))]);
}

export async function POST(req: Request) {
  try {
    const { query, pdfBase64, pdfMimeType, mode = 'quick' } = await req.json();
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

    // PHASE 1: Pre-Flight & Routing
    const preflight = await runPreflight(query);

    // Red-Direct Panic Check has been removed per user request to remove limitations.

    // PHASE 2: API Swarm (free external APIs — no AI credits used)
    const workerData = await executeApiSwarm(preflight.normalizedText);

    const citationsText = workerData.map(w => `Title: ${w.title}\nAbstract: ${w.abstract}\nCredibility: ${w.credibilityScore}`).join('\n\n');

    // EAL Standard §2/§3 — tiered provenance from REAL extracted evidence
    const sources = workerData.map((w) => {
      const tier = (w.tier ?? classifyTier(w.citationUrl).tier) as SourceTier;
      return { title: w.title, url: w.citationUrl ?? null, tier, snippet: w.abstract };
    });
    // ═══ RELEVANCE LOGIC LAYER (EAL Standard §6 stage 1.5) ═══
    // Keyword search ≠ evidence. Judge each source from its ABSTRACT (not the title):
    // is it actually about THIS claim, what is its stance, and WHY. Drop the irrelevant.
    let relevanceAdjudicated = false;
    let adjudicated = unadjudicated(sources);
    if (sources.length) {
      try {
        const logic = await withCap(
          rotatingGenerateObject({ schema: SourceAdjudicationSchema, prompt: buildLogicLayerPrompt(query, sources) }).then((r) => r.object),
          22000,
        );
        if (logic?.adjudications?.length) {
          adjudicated = applyAdjudication(sources, logic.adjudications);
          relevanceAdjudicated = true;
        }
      } catch { /* degrade: relevance unknown, never faked */ }
    }
    const relevantSources = relevanceAdjudicated
      ? adjudicated.filter((s) => s.relevant && s.relevanceScore >= RELEVANCE_THRESHOLD)
      : adjudicated;
    const topTier = TIER_ORDER.find((t) => relevantSources.some((s) => s.tier === t)) ?? null;

    // Grounding = ONLY relevance-checked sources, carrying their stance + WHY
    const groundingText = relevantSources.length
      ? relevantSources.map((s) => `Title: ${s.title}\nTier: ${s.tier}\nStance vs claim: ${s.stance}\nWhy relevant: ${s.why}\nContent: ${s.snippet}`).join('\n\n')
      : 'No retrieved source passed the relevance check — treat the claim as UNVERIFIED unless general knowledge is decisive.';
    const groundingForMeta = groundingText.slice(0, 1600);

    // Strategy 3 — INDEPENDENT cross-model second opinion, in parallel + time-boxed (best-effort)
    const secondOpinionPromise = withCap(
      rotatingGenerateObject({
        schema: SecondOpinionSchema,
        prompt: `Independently judge this claim using ONLY the relevance-checked evidence below. Do not assume any prior verdict.\nCLAIM: "${query}"\nEVIDENCE:\n${groundingForMeta}\n\nReturn your own verdict and a one-line reason.`,
      }).then((r) => r.object).catch(() => null),
      22000,
    );

    let urlMetadataBlock = "";
    if (preflight.isUrlInput && preflight.sourceUrl) {
      urlMetadataBlock = `Source URL: ${preflight.sourceUrl}\nArticle Title: ${preflight.extractedTitle ?? "Unknown"}\n`;
    }

    // --- COVO MASTER ORCHESTRATION ---
    const covoAnalysis = await COVORouter.analyzeQuery(query);

    /* ════════════════════════════════════════════════════
       QUICK MODE — Truth Sandwich + Verdict (1 API call)
    ════════════════════════════════════════════════════ */
    const quickPrompt = `You are the NO-MERCY Truth Sandwich Engine. Analyze this claim with ZERO tolerance for misinformation.

CLAIM: "${query}"
CONTEXT VECTOR: "${preflight.vector}"
${urlMetadataBlock}
RELEVANCE-CHECKED EVIDENCE (only sources that genuinely address the claim — each with its stance + why):
${groundingText}

CRITICAL INSTRUCTIONS:
1. Generate a BILINGUAL Truth Sandwich (Arabic + English). Arabic should use Egyptian dialect where appropriate.
2. RELIGIOUS AWARENESS: If this claim cites hadith, Quran, fatwa, or Islamic scholars:
   - Grade hadith authenticity (Sahih/Hasan/Da'if/Mawdu') ONLY from the retrieved WORKER DATA. If the WORKER DATA contains no authenticated, graded narration for this hadith, set hadith_status to "Unverified — no authenticated source retrieved" and DO NOT assert a grade from memory.
   - Cite the actual scholars and their positions (Ibn Hajar, Al-Albani, Al-Nawawi, etc.) only when supported by the evidence.
   - Distinguish between the ACTUAL religious text and the MISUSE of it
   - Set is_religious_claim to true and populate religious_context
3. The Truth Sandwich format: FACT → MYTH → FACT. Lead with truth, expose the lie, reinforce with more truth.
4. Be specific with evidence. Do NOT be generic. Name sources, dates, studies.
5. The verdict explanation must be educational — teach the reader WHY this is false.

Generate the response adhering strictly to the schema.`;

    const pdfMessages = pdfBase64 ? [{
      role: 'user' as const,
      content: [
        { type: 'file' as const, data: pdfBase64, mimeType: (pdfMimeType || 'application/pdf') as string },
        { type: 'text' as const, text: quickPrompt }
      ] as any,
    }] as any[] : undefined;

    console.log(`[Angry Debunkers] Mode: ${mode} | Vector: ${preflight.vector}`);

    // ══ Quick structured analysis ══
    // Schema-validated Gemini rotator is PRIMARY (fast gemini-2.0-flash + zod = correct AND fast).
    // NVIDIA NIM is a TIMEBOXED, schema-validated fallback — its 550B model is too slow/unvalidated to lead.
    let quickResult: any = null;
    let quickProvider = 'Gemini MegaRotator';
    try {
      const { object } = await rotatingGenerateObject({
        schema: QuickSchema,
        ...(pdfMessages ? { messages: pdfMessages as any } : { prompt: quickPrompt }),
      });
      quickResult = object;
    } catch (e) {
      console.warn('[Angry Debunkers] Gemini primary failed, trying NVIDIA NIM:', e);
    }

    if (!quickResult && !pdfBase64) {
      quickProvider = 'NVIDIA NIM';
      try {
        const nvidiaCall = nvidiaFirstGenerateJSON(quickPrompt, {
          systemPrompt: 'You are the NO-MERCY Truth Sandwich Engine for the Egyptian Awareness Library. Perform bilingual Arabic/English fact-checking with Islamic scholarly context. Return ONLY valid JSON matching the exact schema.',
          maxTokens: 2000,
          temperature: 0.15,
        });
        // 30s hard cap so the slow 550B NVIDIA model can't hang the request
        const timeout = new Promise<{ data: any }>((resolve) => setTimeout(() => resolve({ data: null }), 30000));
        const { data: nvidiaQuick } = await Promise.race([nvidiaCall, timeout]);
        const parsed = nvidiaQuick ? QuickSchema.safeParse(nvidiaQuick) : null;
        if (parsed?.success) quickResult = parsed.data; // only accept schema-compliant NVIDIA output
      } catch { /* handled below */ }
    }

    if (!quickResult) {
      // Both providers failed or produced non-compliant output — FAIL LOUD, never fake (Standard §0)
      return NextResponse.json({ error: 'All AI providers failed to produce a valid, schema-compliant analysis.' }, { status: 502 });
    }

    // Strategy 3 + 5 — await the independent second opinion, then adversarial self-critique
    const secondOpinion = await secondOpinionPromise;
    const agreement = secondOpinion ? secondOpinion.verdict === quickResult.verdict : true;

    let critique: { unsupported_claims: string[]; note: string } | null = null;
    try {
      const assertions = [
        quickResult?.truth_sandwich?.fact_1_en,
        quickResult?.truth_sandwich?.fact_2_en,
        quickResult?.verdict_explanation_en,
      ].filter(Boolean).join(' ');
      const object = await withCap(
        rotatingGenerateObject({
          schema: CritiqueSchema,
          prompt: `You are a strict grounding auditor. Below are ASSERTIONS and the ONLY permitted SOURCES.\nASSERTIONS: ${assertions}\nSOURCES:\n${groundingForMeta}\n\nList any assertion sentence NOT supported by these sources. If all are supported, return an empty array.`,
        }).then((r) => r.object),
        22000,
      );
      critique = object;
    } catch { critique = null; }

    // Confidence is DERIVED (never the model's self-report alone) — EAL Standard §2-③
    const derivedConfidence = deriveConfidenceLabel({
      agreement,
      topTier,
      sourceCount: relevantSources.length,
      unsupportedCount: critique?.unsupported_claims?.length ?? 0,
      modelScore: typeof quickResult?.confidence_score === 'number' ? quickResult.confidence_score : undefined,
    });

    const responseData: any = {
      ...quickResult,
      citations: adjudicated.map(s => ({ title: s.title, url: s.url, tier: s.tier, snippet: s.snippet, relevant: s.relevant, stance: s.stance, why: s.why })),
      isUrlInput: preflight.isUrlInput ?? false,
      extractedTitle: preflight.extractedTitle,
      sourceUrl: preflight.sourceUrl,
      covoAnalysis, // Pass orchestration metadata to the frontend
      // ── EAL Standard compliance fields ──
      sources: adjudicated,
      relevantCount: relevantSources.length,
      relevanceAdjudicated,
      deception_layer: getLayer(quickResult?.deception_layer_number),
      consensus: {
        secondOpinionVerdict: secondOpinion?.verdict ?? null,
        secondOpinionReason: secondOpinion?.one_line_reason ?? null,
        agreement,
      },
      critique: { unsupportedClaims: critique?.unsupported_claims ?? [], note: critique?.note ?? '' },
      confidence_label: derivedConfidence.label,
      confidence_derived: derivedConfidence.score,
    };

    /* ════════════════════════════════════════════════════
       DEEP MODE — Full forensic analysis (2nd API call)
       Only triggered when user clicks "Go Deeper"
    ════════════════════════════════════════════════════ */
    if (mode === 'deep') {
      console.log(`[Angry Debunkers] DEEP MODE — Running full forensic analysis...`);

      const deepPrompt = `You are the God-System forensic engine. Perform DEEP ANALYSIS on this claim:

CLAIM: "${query}"
CONTEXT VECTOR: "${preflight.vector}"
QUICK VERDICT: ${quickResult.verdict}

${urlMetadataBlock}RELEVANCE-CHECKED EVIDENCE:
${groundingText}

MISSIONS:
1. GOD-SYSTEM 7-LAYER AUDIT: Score each of the 7 audit layers with brutal honesty.
2. PATIENT ZERO TRACING: Trace origin year, platform, transmission vector, why trending now, named instigator.
3. 8-LAYER DECEPTION DETECTION: Identify which of the 8 Layers of Deception:
   Layer 1: THE ABSOLUTE FABRICATION (الكذب المطلق)
   Layer 2: THE BIASED LENS (العدسة المنحازة)
   Layer 3: DECONTEXTUALIZATION (اقتطاع السياق)
   Layer 4: WEAPONIZED TIMING (التوقيت المسلّح)
   Layer 5: THE EVIL APPLICATION (التطبيق الشرير)
   Layer 6: THE MATRIX OF MANIPULATION (مصفوفة التلاعب)
   Layer 7: THE MEGA-MACHINE (المهندسون)
   Layer 8: THE UNKNOWN (المجهول)
   Deploy 3-6 counter-weapons with Arabic names and effectiveness ratings.

Generate strictly per schema.`;

      // ══ NVIDIA Primary for Deep Analysis ══
      let deepResult: any = null;
      let deepProvider = 'NVIDIA NIM';
      try {
        const { data: nvidiaDeep } = await nvidiaFirstGenerateJSON(deepPrompt, {
          systemPrompt: 'You are the GOD-System forensic engine. Perform deep 8-layer deception analysis. Return ONLY valid JSON.',
          maxTokens: 2500,
          temperature: 0.1,
        });
        if (nvidiaDeep) deepResult = nvidiaDeep;
      } catch { /* fall through */ }

      if (!deepResult) {
        deepProvider = 'Gemini';
        const { object } = await rotatingGenerateObject({
          schema: DeepSchema,
          prompt: deepPrompt,
        });
        deepResult = object;
      }

      // Guard against missing field — under quota / rate limit failover the AI
      // can return a deepResult shaped slightly different from the Zod schema
      // (NVIDIA path is unvalidated). Without this guard Object.values(undefined)
      // throws a TypeError that aborts the entire POST with 500.
      const auditObj = (deepResult as Record<string, unknown> | undefined)?.god_system_7_layer_audit;
      const auditLayers = (auditObj && typeof auditObj === 'object') ? Object.values(auditObj) : [];
      const deepConfidence = auditLayers.length
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? auditLayers.reduce((acc: number, layer: any) => acc + (typeof layer?.confidence === 'number' ? layer.confidence : 0), 0) / auditLayers.length
        : 0;

      responseData.deep = {
        ...deepResult,
        deep_confidence_score: deepConfidence,
        deepProvider,
      };
    }

    return NextResponse.json({
      type: "SYNTHESIS_COMPLETE",
      mode,
      hasPdfInput: Boolean(pdfBase64),
      quickProvider,
      data: responseData,
    });

  } catch (error: any) {
    console.error("[Angry Debunkers API] Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
