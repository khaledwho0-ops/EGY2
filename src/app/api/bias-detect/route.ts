import { NextResponse } from "next/server";
import { detectCognitiveBiases } from "@/lib/cognitive/bias-detector";
import { COGNITIVE_BIASES, type Domain } from "@/lib/cognitive/biases-data";
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
    const biases = await detectCognitiveBiases(text.trim(), domain);

    // ── NVIDIA NIM Enhancement: Deep explanations ──
    let aiEnhancement = null;
    if (biases.length > 0) {
      const biasNames = biases.slice(0, 5).map((b: any) => b.name || b.bias).join(", ");
      // FAIL-FAST: AI enhancement is optional (aiEnhancement stays null on miss); cap the
      // rotator call (NVIDIA-550B last slot can stall ~20s+) so the deterministic bias
      // result still returns promptly instead of hanging.
      const { data } = await Promise.race([
        nvidiaFirstGenerateJSON(
          `Text analyzed: "${text.substring(0, 500)}"\nDetected cognitive biases: ${biasNames}\n\nProvide deep analysis. Return ONLY valid JSON:\n{"overallBiasScore":0.0-1.0,"dominantBias":"most prominent bias","dominantBiasAr":"اسم التحيز","impactAssessment":"how these biases affect reasoning","impactAssessmentAr":"تأثير هذه التحيزات على التفكير","debisingSteps":["step1","step2","step3"],"debisingStepsAr":["خطوة 1","خطوة 2","خطوة 3"],"alternativeInterpretation":"a more balanced way to read this content","alternativeInterpretationAr":"قراءة أكثر توازناً للمحتوى"}`,
          { systemPrompt: "You are a cognitive psychology expert. Return only valid JSON.", temperature: 0.3, maxTokens: 600 }
        ),
        new Promise<{ data: null }>((resolve) => setTimeout(() => resolve({ data: null }), 25_000)),
      ]);
      aiEnhancement = data;
    }

    return NextResponse.json({
      biases,
      aiEnhancement,
      totalDetected: biases.length,
      totalKnown: COGNITIVE_BIASES.length,
      domain,
      processingTimeMs: Date.now() - startTime,
      technology: "regex+vader+wink-nlp + NVIDIA NIM",
      disclaimer: "Cognitive bias detection uses regex pattern matching, VADER sentiment analysis, wink-nlp, and NVIDIA NIM enhancement. Results are educational.",
    });
  } catch (error) {
    console.error("[Bias Detection API Error]", error);
    return NextResponse.json(
      { error: "Bias detection failed." },
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
  const biases = await detectCognitiveBiases(text.trim().slice(0, 5000), domain);

  return NextResponse.json({
    biases,
    totalDetected: biases.length,
    totalKnown: COGNITIVE_BIASES.length,
    domain,
    processingTimeMs: Date.now() - startTime,
    technology: "regex+vader+wink-nlp",
  });
}
