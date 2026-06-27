import { NextResponse } from "next/server";
import { detectFallacies } from "@/lib/debunking/fallacy-engine";
import { ALL_FALLACIES, type Domain } from "@/lib/debunking/fallacies-data";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";

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

    const { data: rawFallacyData } = await nvidiaFirstGenerateJSON(
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
        systemPrompt: "You are an expert in logic, rhetoric, and Arabic argumentation. Identify ALL fallacies including subtle ones. Return ONLY valid JSON.",
        temperature: 0.2,
        maxTokens: 1000,
      }
    );
    aiAnalysis = rawFallacyData as FallacyAIResponse | null;

    return NextResponse.json({
      fallacies,
      aiAnalysis,
      totalDetected: fallacies.length + (aiAnalysis?.additionalFallacies?.length || 0),
      totalFromRegex: fallacies.length,
      totalFromAI: aiAnalysis?.additionalFallacies?.length || 0,
      totalKnown: ALL_FALLACIES.length,
      domain,
      processingTimeMs: Date.now() - startTime,
      technology: "regex+TF-IDF + NVIDIA NIM",
      disclaimer: "Fallacy detection uses regex pattern matching, TF-IDF similarity, and NVIDIA NIM AI analysis. Results are educational.",
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
