import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return ERR.missingQuery();
    }

    const prompt = `You are an expert in Islamic theology, counter-extremism, and the Amman Message.
Analyze the following text for sectarianism, extremism, and Takfir (excommunication):
"${text}"

Return ONLY a JSON object with this exact structure (no markdown tags):
{
  "takfirDetection": {
    "detected": boolean,
    "explanation": "Explanation of any Takfir or exclusionary rhetoric found"
  },
  "ammanMessageCompliance": {
    "compliant": boolean,
    "violations": ["list of ways it violates the 3 points of the Amman Message", or empty array]
  },
  "extremismIndicators": {
    "level": "Low" | "Medium" | "High" | "Critical",
    "indicators": ["specific psychological or linguistic markers of extremism found"]
  },
  "deradicalizationResources": ["2-3 specific orthodox concepts or verses that counter this specific rhetoric"]
}`;

    const { data } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3 });

    return NextResponse.json({
      results: data ? [data] : [],
      source: "nvidia-nim-sectarian-detector",
      disclaimer: "AI-generated text analysis for sectarian rhetoric based on the Amman Message consensus. If you suspect imminent danger, contact local authorities.",
    });
  } catch (error) {
    console.error("[Sectarian API Error]", error);
    return ERR.fetchFailed("Sectarian Detector API");
  }
}
