import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";
export const maxDuration = 60;

const WhatsappSchema = z.object({
  score: z.number().min(0).max(100).describe("Total manipulation probability (0-100)."),
  botPatterns: z.array(z.string()).describe("List of detected bot patterns or chain-message syntax styles."),
  emotionalFraming: z.array(z.string()).describe("List of emotional hooks used (outrage, fear, conspiratorial)."),
  urgencyIndicators: z.array(z.string()).describe("List of time pressure markers (urgent, share now, forward)."),
  summary: z.object({
    en: z.string().describe("English diagnostic report summary."),
    ar: z.string().describe("Arabic diagnostic report summary.")
  })
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Missing text payload" }, { status: 400 });
    }

    // ═══ NVIDIA NIM — ADVANCED WHATSAPP ANALYSIS ═══
    const systemPrompt = `You are an expert NLP forensics engine specializing in WhatsApp rumor transmission, bot pattern detection, and Arabic disinformation analysis. Always respond with valid JSON only, no markdown.`;

    const nvidiaPrompt = `Analyze this WhatsApp message for manipulation, disinformation, and emotional triggers:

"${text}"

Return ONLY this JSON structure:
{
  "claims": [
    {
      "text": "extracted claim text",
      "rating": "verified|false|misleading|unverified",
      "confidence": 0.0-1.0,
      "explanation": "why this rating"
    }
  ],
  "score": 0-100,
  "botPatterns": ["pattern1", "pattern2"],
  "emotionalFraming": ["hook1", "hook2"],
  "urgencyIndicators": ["indicator1", "indicator2"],
  "emotionalManipulationTriggers": [
    {
      "trigger": "trigger name",
      "triggerAr": "اسم المشغل",
      "severity": "low|medium|high",
      "description": "how it manipulates"
    }
  ],
  "arabicRebuttal": "جاهز للصق في واتساب: رد قصير ومقنع بالعربية (2-3 جمل بدون مصطلحات تقنية)",
  "englishRebuttal": "Ready-to-paste WhatsApp rebuttal in English (2-3 sentences, no jargon)",
  "overallVerdict": "SAFE|SUSPICIOUS|DANGEROUS",
  "summary": {
    "en": "English diagnostic report summary (2-3 sentences)",
    "ar": "ملخص التقرير التشخيصي بالعربية (2-3 جمل)"
  }
}`;

    const { data: nvidiaResult, provider } = await nvidiaFirstGenerateJSON(nvidiaPrompt, {
      systemPrompt,
      maxTokens: 1200,
      temperature: 0.2,
    });

    if (nvidiaResult) {
      return NextResponse.json({
        ...nvidiaResult,
        provider,
      });
    }

    // ── GEMINI (FALLBACK) ──────────────────────────────────────────
    console.warn("[WhatsApp Analyzer] NVIDIA failed, falling back to Gemini");

    const geminiPrompt = `You are an expert NLP forensics engine specializing in WhatsApp rumor transmission and bot pattern detection.
Analyze the following message for manipulation, coordinated spam patterns, emotional framing, and artificial urgency:

"${text}"

AUDIT REQUIREMENTS:
1. Identify bot patterns: Check for standard forward headers, signature chain-letter templates, copy-paste artifacts, tracking URLs, and coordination.
2. Identify emotional framing: Analyze for fear-mongering, moral outrage, spiritual gaslighting, or conspiratorial "secret truth" hooks.
3. Identify urgency indicators: Analyze for artificial time constraints ("share within 5 minutes", "forward before it is deleted").
4. Compute a total manipulation probability score (0-100).
5. Conform strictly to the JSON schema.`;

    const { object: result } = await rotatingGenerateObject({
      schema: WhatsappSchema,
      prompt: geminiPrompt,
    });

    return NextResponse.json({
      ...result,
      claims: [],
      emotionalManipulationTriggers: [],
      arabicRebuttal: "يرجى التحقق من المصادر الموثوقة قبل المشاركة.",
      englishRebuttal: "Please verify from reliable sources before sharing.",
      overallVerdict: result.score > 70 ? "DANGEROUS" : result.score > 40 ? "SUSPICIOUS" : "SAFE",
      provider: "Gemini",
    });

  } catch (error: any) {
    console.error("[WhatsApp Analyzer API Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
