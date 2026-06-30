import { NextResponse } from "next/server";
import { detectFallacies } from "@/lib/debunking/fallacy-engine";
import { ALL_FALLACIES, type Domain } from "@/lib/debunking/fallacies-data";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";

/**
 * Extract the first balanced JSON object from a string that may contain prose,
 * markdown fences, or trailing junk around the JSON. Returns null only if no
 * parseable object exists. This is the loud-but-resilient recovery the One-Law
 * requires: we never fabricate, but we DO dig the real model output out of a
 * messy wrapper instead of silently returning null.
 */
function extractFirstJsonObject<T>(raw: string): T | null {
  if (!raw) return null;
  let s = raw.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();
  const start = s.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(s.slice(start, i + 1)) as T;
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body?.text;
    const domain = (body?.domain as Domain) || "both";

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: "Text exceeds maximum length of 10,000 characters" }, { status: 400 });
    }

    const startTime = Date.now();
    const fallacies = await detectFallacies(text.trim(), domain);

    // ── NVIDIA NIM Enhancement: Deep fallacy analysis + Arabic explanations ──
    let aiAnalysis: FallacyAIResponse | null = null;
    const detectedNames = fallacies.slice(0, 6).map((f: any) => f.name || f.fallacy).join(", ");

    interface FallacyAIResponse {
      additionalFallacies?: unknown[];
      overallManipulationScore?: number;
      dominantCategory?: string;
      rhetoricalDevicesUsed?: string[];
      truthSandwich?: { correctFrame_en?: string; correctFrame_ar?: string };
      deconstructionGuide_ar?: string;
      deconstructionGuide_en?: string;
    }

    const { data: rawFallacyData, raw: rawFallacyText } = await nvidiaFirstGenerateJSON(
      `Text to analyze for logical fallacies: "${text.substring(0, 600)}"
Already detected by regex engine: ${detectedNames || "none detected"}

Perform a deep logical fallacy analysis. Return ONLY valid JSON:
{
  "additionalFallacies": [
    {
      "name": "fallacy name",
      "nameAr": "اسم المغالطة بالعربية",
      "category": "logical|rhetorical|statistical|emotional|religious",
      "explanation": "How exactly this fallacy appears in the text",
      "explanationAr": "كيف تظهر هذه المغالطة في النص",
      "severity": "low|medium|high|critical",
      "example": "Quote from the text showing the fallacy",
      "counter": "How to counter this specific fallacy",
      "counterAr": "كيفية الرد على هذه المغالطة"
    }
  ],
  "overallManipulationScore": 0.0-1.0,
  "dominantCategory": "logical|rhetorical|statistical|emotional|religious",
  "rhetoricalDevicesUsed": ["device1", "device2"],
  "truthSandwich": {
    "correctFrame_en": "The correct framing of this topic",
    "correctFrame_ar": "الإطار الصحيح لهذا الموضوع"
  },
  "deconstructionGuide_ar": "دليل تفكيك المغالطات بالعربية في جملتين",
  "deconstructionGuide_en": "2-sentence guide to dismantling these fallacies"
}`,
      {
        systemPrompt: "You are an expert in logic, rhetoric, and Arabic argumentation. Identify ALL fallacies including subtle ones. Return ONLY valid JSON — no prose, no markdown, just the JSON object.",
        temperature: 0.2,
        maxTokens: 1600,
      }
    );
    aiAnalysis = rawFallacyData as FallacyAIResponse | null;

    // ── Robust recovery: the rotator sometimes wraps the JSON in prose or a
    //    partial markdown fence, so nvidiaFirstGenerateJSON's strict parse
    //    returns null even though a valid JSON object is present in the raw
    //    text. Extract the first balanced {...} object and parse that. This is
    //    why Arabic claims previously returned aiAnalysis:null. ──
    if (!aiAnalysis && typeof rawFallacyText === "string" && rawFallacyText.trim()) {
      aiAnalysis = extractFirstJsonObject<FallacyAIResponse>(rawFallacyText);
    }

    // ── Merge AI-found fallacies into the primary `fallacies` list so obvious
    //    fallacies the regex tier misses (e.g. insult-based ad hominem) still
    //    surface as first-class results, not buried in a secondary section. ──
    const aiFallacies = Array.isArray(aiAnalysis?.additionalFallacies)
      ? aiAnalysis!.additionalFallacies
      : [];
    const regexNames = new Set(
      fallacies.map((f: any) => String(f.name || f.fallacy?.name || "").toLowerCase().trim())
    );
    const mergedFallacies = [
      ...fallacies,
      ...aiFallacies
        .filter((af: any) => af && !regexNames.has(String(af.name || "").toLowerCase().trim()))
        .map((af: any) => ({
          fallacy: {
            id: "AI",
            name: af.name,
            nameAr: af.nameAr,
            description: af.explanation,
            descriptionAr: af.explanationAr,
            domain: af.category === "religious" ? "islamic" : "scientific",
            example: af.example,
            counter: af.counter,
            counterAr: af.counterAr,
            category: af.category,
            severity: af.severity,
          },
          confidence: af.severity === "critical" ? 0.9 : af.severity === "high" ? 0.85 : af.severity === "medium" ? 0.7 : 0.6,
          matchedPattern: (af.example || af.explanation || "").toString().substring(0, 150),
          tier: "ai",
        })),
    ];

    // AI fallacies are now first-class entries in `fallacies`; drop them from
    // aiAnalysis so the page's secondary "AI-identified" section does not
    // duplicate them. Keep truthSandwich / deconstruction guides intact.
    const aiAnalysisOut = aiAnalysis
      ? { ...aiAnalysis, additionalFallacies: [] }
      : null;

    return NextResponse.json({
      fallacies: mergedFallacies,
      aiAnalysis: aiAnalysisOut,
      totalDetected: mergedFallacies.length,
      totalFromRegex: fallacies.length,
      totalFromAI: aiFallacies.length,
      totalKnown: ALL_FALLACIES.length,
      domain,
      processingTimeMs: Date.now() - startTime,
      technology: "regex + TF-IDF + AI (Groq-first rotator)",
      disclaimer: "Fallacy detection uses regex pattern matching, TF-IDF similarity, and AI analysis via a multi-provider rotator. Results are educational.",
    });
  } catch (error) {
    console.error("[Fallacy Detection API Error]", error);
    return NextResponse.json(
      { error: "Fallacy detection failed." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || searchParams.get("q");
  const domain = (searchParams.get("domain") as Domain) || "both";

  if (!text) {
    return NextResponse.json({ error: "Missing 'text' or 'q' query parameter" }, { status: 400 });
  }

  const startTime = Date.now();
  const fallacies = await detectFallacies(text.trim().slice(0, 5000), domain);

  return NextResponse.json({
    fallacies,
    totalDetected: fallacies.length,
    totalKnown: ALL_FALLACIES.length,
    domain,
    processingTimeMs: Date.now() - startTime,
    technology: fallacies.length > 0
      ? [...new Set(fallacies.map((f: any) => f.tier))].join("+")
      : "none",
  });
}
