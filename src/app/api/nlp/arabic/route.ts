import { NextResponse } from "next/server";
import { analyzeArabicText } from "@/lib/nlp/arabic-analysis";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body?.text;
    const deep = body?.deep !== false; // default true

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: "Text exceeds maximum length of 10,000 characters" }, { status: 400 });
    }

    const result = await analyzeArabicText(text);

    // ── NVIDIA NIM Egyptian Dialect & Manipulation Analysis ──
    let deepAnalysis = null;
    if (deep) {
      const { data } = await nvidiaFirstGenerateJSON(
        `Analyze this Arabic/Egyptian text for misinformation manipulation signals:
"${text.substring(0, 600)}"

Return ONLY valid JSON:
{
  "dialect": "Modern Standard Arabic|Egyptian|Gulf|Levantine|Moroccan|Mixed",
  "registeredEmotion": "fear|anger|joy|disgust|sadness|surprise|neutral",
  "emotionIntensity": 0.0-1.0,
  "manipulationTechniques": [
    {"technique": "technique name", "techniqueAr": "اسم الأسلوب", "evidence": "quote from text showing this"}
  ],
  "egyptianContextRisks": ["risk specific to Egyptian societal context"],
  "viralPotential": 0.0-1.0,
  "readabilityLevel": "elementary|secondary|university|academic",
  "urgencyManipulation": "Does text use false urgency? true/false",
  "authorityAppeal": "Does text misuse authority? true/false",
  "recommendedResponse_ar": "التوصية المقترحة للمستخدم",
  "recommendedResponse_en": "Recommended action for the user"
}`,
        {
          systemPrompt: "You are an expert in Arabic linguistics and Egyptian media manipulation. Analyze text for manipulation signals. Return ONLY valid JSON.",
          temperature: 0.2,
          maxTokens: 800,
        }
      );
      deepAnalysis = data;
    }

    const response = NextResponse.json({
      ...result,
      deepAnalysis,
      aiProvider: "NVIDIA NIM",
    });

    // If risk flags are detected, add urgent header for client-side crisis panel
    if (result.riskFlags && result.riskFlags.length > 0) {
      response.headers.set("X-Risk-Detected", "true");
    }

    return response;
  } catch (error) {
    console.error("Arabic NLP route error:", error);
    return NextResponse.json({ error: "Arabic NLP analysis failed." }, { status: 500 });
  }
}
