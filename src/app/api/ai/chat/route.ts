import { NextRequest, NextResponse } from "next/server";
import { analyzeClaimWithAI, mentalHealthAI, analyzeSentiment, aiGenerate } from "@/lib/ai/providers";
import { EAL_KNOWLEDGE, EAL_KNOWLEDGE_SHORT } from "@/lib/ai/eal-knowledge";
import { CovoRouter as COVORouter } from "@/lib/orchestration/covo-router";
import { nvidiaFirstGenerate } from "@/lib/ai/nvidia-first";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/passport";

interface HistoryMsg {
  role: "user" | "assistant";
  content: string;
}

/** Extended shape of the COVO analysis object — core fields are always present;
 *  optional fields reflect richer routing data that may be populated by future
 *  router versions or upstream middleware. */
interface CovoAnalysis {
  eis: number;
  vectors: import("@/lib/orchestration/covo-router").TextMetrics;
  route: string;
  highEmotionalManipulation: boolean;
  /** A pre-generated Socratic rebuttal injected before the main LLM reply. */
  socratic_intervention?: string;
  /** Semantic domain of the query (e.g. "health", "religion", "politics"). */
  domain?: string;
  /** Structured emotional-intent scoring with sub-dimensions. */
  emotional_intent_score?: { total_manipulation_risk: number; [key: string]: unknown };
  /** List of detected logical fallacies in the query. */
  detected_fallacies?: Array<{ name: string; [key: string]: unknown }>;
  /** Ordered list of recommended processing routes. */
  routing_decision?: string[];
}

const VALID_MODES = new Set(["claim", "mental-health", "sentiment", "general", "translation", "academic"]);

function errorResponse(
  status: number,
  errorCode: string,
  messageAr: string,
  messageEn: string
) {
  return NextResponse.json(
    { ok: false, errorCode, message: messageAr, messageEn },
    { status }
  );
}

/**
 * Detect whether text is primarily Arabic, English, or mixed
 */
function detectLanguage(text: string): "ar" | "en" | "mixed" {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
  const total = arabicChars + latinChars;
  if (total === 0) return "en";
  if (arabicChars / total > 0.7) return "ar";
  if (latinChars / total > 0.7) return "en";
  return "mixed";
}

/**
 * POST /api/ai/chat
 * 
 * Universal AI endpoint for EAL.
 * Supports modes: "claim", "mental-health", "sentiment", "general", "translation", "academic"
 * Automatically falls through Gemini → Groq → GitHub → HuggingFace.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, mode = "general", history = [], systemPromptOverride, pageContext } = body as {
      message: string;
      mode?: string;
      history?: HistoryMsg[];
      systemPromptOverride?: string;
      pageContext?: string;
    };

    // Build conversation context string from history
    const contextStr = history.length > 0
      ? history.map(h => `${h.role === "user" ? "User" : "Assistant"}: ${h.content}`).join("\n\n") + "\n\nUser: " + message
      : message;

    if (!message?.trim()) {
      return errorResponse(
        400,
        "MISSING_MESSAGE",
        "الرسالة مطلوبة. اكتب سؤالك أو الادعاء اللي عايز تتحقق منه.",
        "Message is required. Type your question or claim."
      );
    }

    if (!VALID_MODES.has(mode)) {
      return errorResponse(
        400,
        "INVALID_MODE",
        "وضع غير صالح. الأوضاع المتاحة: claim، mental-health، sentiment، general، translation، academic.",
        "Invalid mode. Available: claim, mental-health, sentiment, general, translation, academic."
      );
    }

    const lang = detectLanguage(message);
    let result;
    let sources: { title: string; url?: string; type?: string }[] | undefined;
    let enforcement: { status: string; tier?: string; reason?: string } | undefined;

    // --- COVO MASTER ORCHESTRATION INTERCEPTION ---
    const covoAnalysis = COVORouter.analyzeQuery(message) as CovoAnalysis;
    let socraticPrefix = "";

    // If the orchestrator detects a fallacy, bias, or emotional manipulation, it intervenes BEFORE the main LLM.
    if (covoAnalysis.socratic_intervention) {
      socraticPrefix = covoAnalysis.socratic_intervention + "\n\n---\n\n";
    }

    switch (mode) {
      case "claim": {
        // ── ONE LAW: retrieve REAL evidence first, ground the verdict in it,
        //    and fail loud (UNVERIFIED) if no admissible Tier S-C source backs
        //    it. No more fabricated "sources". (src/lib/pipeline/verify) ──
        const { runVerificationPipeline } = await import("@/lib/pipeline/verify");
        const verification = await runVerificationPipeline(message, { max: 6 });
        const sourcesSummary =
          verification.admissible
            .slice(0, 4)
            .map((s) => `- ${s.title} (Tier ${s.tier}) ${s.url}`)
            .join("\n") || "No admissible source was found.";

        // ── NVIDIA NIM Primary for Claim Analysis (grounded in retrieved sources) ──
        let nvidiaUsed = false;
        try {
          const { text: nvidiaText, provider: nvidiaProvider } = await nvidiaFirstGenerate(
            `${socraticPrefix ? `[Socratic Intervention]: ${socraticPrefix}\n\n` : ''}CLAIM TO ANALYZE: "${message}"\n\nRETRIEVED SOURCES (use ONLY these as evidence; never invent a citation):\n${sourcesSummary}\n\nRespond in ${lang === 'ar' ? 'Arabic (Egyptian-friendly Modern Standard Arabic)' : 'English'} with:\n1. VERDICT (DEBUNKED/MISLEADING/PARTIALLY TRUE/UNVERIFIED/TRUE) — if the sources above do not support a confident verdict, answer UNVERIFIED\n2. Evidence summary grounded in those sources\n3. Truth Sandwich (Fact → Myth → Fact)\n4. One Socratic question to expose the claim's flaw\n5. WhatsApp-ready rebuttal (if claim is false)\n\nBe concise, educational, and empathetic.`,
            {
              systemPrompt: `You are the Egyptian Awareness Library's fact-checking AI. You help Egyptians identify misinformation in Arabic and English. NEVER fabricate a source or a citation. Be accurate, empathetic, and culturally aware.\n\n${EAL_KNOWLEDGE_SHORT}`,
              maxTokens: 1500,
              temperature: 0.25,
            }
          );
          result = { text: nvidiaText, provider: nvidiaProvider };
          // nvidiaFirstGenerate never throws — it returns provider:"none"/empty
          // text on total failure. Only count it "used" if it actually produced
          // text, otherwise fall through to the rotator-backed fallback below.
          nvidiaUsed = Boolean(nvidiaText && nvidiaText.trim() && nvidiaProvider !== "none");
        } catch { /* fall through */ }

        if (!nvidiaUsed) {
          result = await analyzeClaimWithAI(message);
          if (socraticPrefix && result.text) result.text = socraticPrefix + result.text;
        }

        // Attach ONLY real, resolvable, admissible (Tier S-C) sources.
        sources = verification.admissible.map((s) => ({ title: s.title, url: s.url, type: `tier-${s.tier}` }));
        enforcement = {
          status: verification.enforcement.status,
          tier: verification.enforcement.tierFloor,
          reason: verification.enforcement.reason,
        };
        // Fail loud: if nothing admissible backs the claim, label it UNVERIFIED.
        if (verification.enforcement.status === "unverified" && result?.text) {
          const banner =
            lang === "ar"
              ? "⚠️ غير مُتحقَّق: لم أعثر على مصدر موثوق يمكن الرجوع إليه لهذا الادعاء. اعتبر ما يلي تحليلًا، وليس حقيقة مؤكدة.\n\n"
              : "⚠️ UNVERIFIED — I could not find a resolvable, trusted source for this claim. Treat the following as analysis, not established fact.\n\n";
          result.text = banner + result.text;
        }
        break;
      }

      case "mental-health":
        result = await mentalHealthAI(message);
        sources = [
          { title: "EAL Mental Health Literacy", url: "/mental-health", type: "module" },
          { title: "WHO Mental Health Resources", url: "https://www.who.int/health-topics/mental-health", type: "external" },
        ];
        break;

      case "sentiment": {
        const sentiment = await analyzeSentiment(message);
        return NextResponse.json({
          ok: true,
          sentiment,
          provider: "HuggingFace",
          model: "twitter-roberta-base-sentiment",
        });
      }

      case "translation":
        result = await aiGenerate(contextStr,
          `You are a professional Arabic↔English translator for the Egyptian Awareness Library.

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

CRITICAL RULES:
1. Detect the source language automatically.
2. If the user writes in Arabic (فصحى أو عامية مصرية), translate to natural, fluent English.
3. If the user writes in English, translate to natural, fluent Arabic (Modern Standard Arabic by default).
4. If mixed Arabic-English input: translate the ENTIRE message to whichever language the user requests. If no specific request, translate to Arabic.
5. NEVER do literal word-by-word translation. Always preserve:
   - Original meaning and intent
   - Tone (formal, casual, academic, emotional)
   - Context and cultural nuances
   - Egyptian Arabic expressions should be translated to their English equivalents, not transliterated
6. For technical/academic terms, provide BOTH:
   - The natural translation
   - The original term in parentheses, e.g.: "التنافر المعرفي (Cognitive Dissonance)"
7. Support Egyptian Arabic (العامية المصرية) — understand expressions like "عايز", "مش", "ده", "بتاع"
8. Format output clearly:
   - Translation first
   - Then any notes about terminology or cultural context
   - If the source text contains idioms, explain the idiomatic meaning
9. Handle common mixed-language patterns:
   - "عايز أعمل fact-check" → Understand as requesting fact-checking
   - "The wellness بتاعي" → Understand mixing
   - Technical terms in English within Arabic text → Preserve and translate context
10. Quality standard: The translation should read as if a native speaker wrote it originally.`
        );
        sources = [{ title: "EAL Translation Engine", type: "engine" }];
        break;

      case "academic":
        result = await aiGenerate(contextStr,
          `You are an academic research assistant for the Egyptian Awareness Library (EAL).

PLATFORM CONTEXT:
${EAL_KNOWLEDGE_SHORT}

CRITICAL RULES:
1. Provide research-grade answers with proper citations and original sources.
2. ALWAYS cite the original source for EVERY claim:
   - Author(s), year, title, journal/publisher
   - DOI or URL when available
   - Use APA 7th Edition format
3. Distinguish clearly between:
   - Peer-reviewed evidence (mark with ✓)
   - General knowledge (mark with ℹ️)
   - EAL-specific frameworks (mark with 🔬)
4. If the topic relates to misinformation, mental health, or religious coping, reference EAL's frameworks:
   - Inoculation Theory (McGuire, 1964; Roozenbeek & van der Linden, 2019)
   - COM-B Model (Michie et al., 2011)
   - MHLS (O'Connor & Casey, 2015)
   - Brief RCOPE (Pargament et al., 2011)
   - MIST-20 (Maertens et al., 2023)
5. Support both Arabic and English queries — respond in the language of the query.
6. For mixed Arabic-English queries, understand terms like "wellness", "fact-check" within Arabic text.
7. END every answer with a clearly formatted "📚 Sources / المصادر" section listing ALL references used.
8. If you are uncertain about a fact, say so explicitly with: "⚠️ Unverified" rather than fabricating.
9. For each source, when possible include:
   - Full citation
   - Relevance to the question
   - Whether it's from the EAL knowledge base or external
10. Structure long answers with clear headings and numbered points.`
        );
        // Parse sources from the response if present
        sources = [
          { title: "Academic Sources — see answer", url: "/sources", type: "academic" },
          { title: "EAL Research Library", url: "/evidence", type: "internal" },
        ];
        break;

      default: {
        // Use page-specific system prompt if provided by PageAIChatbot, else generic
        const pageSpecificSystem = systemPromptOverride
          ? `${systemPromptOverride}\n\n--- PAGE CONTEXT ---\n${pageContext || ''}\n\nCOVO ORCHESTRATION DATA FOR THIS QUERY:\n- Domain: ${covoAnalysis.domain}\n- Emotional Manipulation Risk: ${((covoAnalysis.emotional_intent_score?.total_manipulation_risk ?? 0) * 100).toFixed(0)}%\n- Detected Fallacies: ${(covoAnalysis.detected_fallacies ?? []).map((f: any) => f.name).join(", ") || "None"}\n\nRULES:\n1. Respond in the language the user writes in. Arabic → Arabic. English → English.\n2. Understand Egyptian Arabic expressions (عايز, مش, ده, بتاع, إزاي).\n3. For EVERY scientific claim: cite Author (Year), Journal, N=X, p-value.\n4. For EVERY Islamic reference: cite Quran [Surah:Ayah] or Hadith [Book, Number, Grade].\n5. Be concise, empathetic, and culturally aware of Egyptian context.\n6. NEVER hallucinate. If uncertain, say so explicitly.\n7. Structure answers with clear formatting and use markdown.`
          : `You are the AI assistant for the Egyptian Awareness Library (EAL), a cognitive defense platform.\n\nCOVO ORCHESTRATION DATA FOR THIS QUERY:\n- Domain: ${covoAnalysis.domain}\n- Emotional Manipulation Risk: ${((covoAnalysis.emotional_intent_score?.total_manipulation_risk ?? 0) * 100).toFixed(0)}%\n- Detected Fallacies: ${(covoAnalysis.detected_fallacies ?? []).map((f: any) => f.name).join(", ") || "None"}\n- Recommended Routing: ${(covoAnalysis.routing_decision ?? []).join(", ")}\n\nCOMPLETE PLATFORM KNOWLEDGE:\n${EAL_KNOWLEDGE}\n\nRULES:\n1. Be concise, helpful, and scientifically grounded.\n2. Language handling:\n   - If the user writes in Arabic, respond in Arabic.\n   - If the user writes in English, respond in English.\n   - If the message mixes Arabic and English, respond in whichever language dominates.\n   - ALWAYS understand mixed Arabic-English input correctly.\n3. For Egyptian Arabic (عامية): Understand expressions like "عايز", "مش", "ده", "بتاع", "إزاي"\n4. Always be culturally aware of Egyptian context when relevant.\n5. Keep responses well-structured with clear formatting.`;

        result = await aiGenerate(contextStr, pageSpecificSystem);
        break;
      }
    }

    // Prepend socratic intervention to general responses if needed
    if (mode !== "claim" && socraticPrefix && result?.text) {
      result.text = socraticPrefix + result.text;
    }

    // ── Defense Ledger: log the claim-check as a defensive act (passport
    //    users only; fire-and-forget so it never blocks/breaks the response). ──
    if (mode === "claim") {
      // Observability counters (privacy-safe: counts, not content).
      import("@/lib/obs/metrics")
        .then(({ incr }) => {
          incr("chat.claim");
          incr(enforcement?.status === "verified" ? "verified" : "unverified");
        })
        .catch(() => {});
      const sessionUid = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
      if (sessionUid) {
        import("@/lib/cognition/ledger")
          .then(({ appendDefense }) =>
            appendDefense(sessionUid, {
              surface: "chat",
              layer: covoAnalysis?.detected_fallacies?.length ? 3 : 1,
              technique: "claim-check",
              outcome: "reviewed",
              sources: (sources || []).map((s) => s.url).filter(Boolean) as string[],
            }),
          )
          .catch(() => {});
      }
    }

    if (!result) {
      return errorResponse(
        500,
        "AI_GENERATION_FAILED",
        "حصل خطأ أثناء معالجة طلبك. حاول تاني.",
        "An error occurred processing your request. Please try again."
      );
    }

    return NextResponse.json({
      ok: true,
      text: result.text,
      provider: result.provider,
      model: result.model,
      latencyMs: result.latencyMs,
      sources,
      enforcement, // One-Law status for this answer (claim mode)
      covoAnalysis // Pass orchestration metadata to the frontend
    });
  } catch (err) {
    console.error("[AI Chat Error]", err);
    const isRateLimit = err instanceof Error && err.message.includes("rate");
    return errorResponse(
      isRateLimit ? 429 : 500,
      isRateLimit ? "RATE_LIMITED" : "AI_GENERATION_FAILED",
      isRateLimit
        ? "تم تجاوز حد الطلبات. حاول تاني بعد شوية."
        : "حصل خطأ أثناء معالجة طلبك. حاول تاني.",
      isRateLimit
        ? "Rate limit exceeded. Try again shortly."
        : "An error occurred processing your request. Please try again."
    );
  }
}
