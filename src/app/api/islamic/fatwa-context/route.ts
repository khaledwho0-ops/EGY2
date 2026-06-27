import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fatwaText } = body;

    if (!fatwaText) {
      return ERR.missingQuery();
    }

    const prompt = `You are an expert in Islamic Jurisprudence (Fiqh), Usul al-Fiqh, and Maqasid al-Shariah.
Analyze the following fatwa or religious ruling: "${fatwaText}".
Return ONLY a JSON object with this exact structure (no markdown tags):
{
  "summary": "Brief objective summary of the fatwa",
  "madhhabComparison": {
    "hanafi": "The Hanafi position on this issue",
    "maliki": "The Maliki position on this issue",
    "shafi": "The Shafi'i position on this issue",
    "hanbali": "The Hanbali position on this issue"
  },
  "maqasidAnalysis": "How this relates to the higher objectives of Shariah (preservation of religion, life, intellect, lineage, wealth)",
  "historicalContext": "Historical background of this ruling (has it changed with time/place?)",
  "iifaRuling": "Does the International Islamic Fiqh Academy (IIFA) have a ruling on this? If yes, summarize it. If no, state 'No explicit IIFA ruling found'."
}`;

    const { data } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3 });

    return NextResponse.json({
      results: data ? [data] : [],
      source: "nvidia-nim-fatwa-context",
      disclaimer: "AI-generated comparative fiqh analysis. For official fatwas, consult certified Dar al-Ifta institutions.",
    });
  } catch (error) {
    console.error("[Fatwa API Error]", error);
    return ERR.fetchFailed("Fatwa Context API");
  }
}
