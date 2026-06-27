import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `authority:${query.toLowerCase()}`,
      1000 * 60 * 60 * 24, // 24 hours
      async () => {
        const prompt = `You are an expert in Islamic scholarship and academic credentials verification.
Analyze the following Islamic figure/scholar: "${query}".
Return ONLY a JSON object with this exact structure (no markdown tags):
{
  "qualifications": "Brief summary of formal education, Ijazahs, or lack thereof",
  "institution": "Primary institutional affiliations (e.g., Al-Azhar, Islamic University of Madinah, independent)",
  "methodology": "Brief description of their Usul/methodology (e.g., Ash'ari, Salafi, Traditionalist, Modernist)",
  "knownPositions": ["key position 1", "key position 2", "key position 3"],
  "alignmentScore": number (0-100 representing alignment with mainstream orthodox consensus like Al-Azhar/Amman Message),
  "redFlags": ["any notable controversies or deviations from consensus", or empty array if none]
}`;

        const { data } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3 });
        return data ? [data] : [];
      }
    );

    return NextResponse.json({
      results,
      source: "nvidia-nim-authority",
      disclaimer: "AI-generated authority analysis based on public data. For critical rulings, consult verified institutional bodies.",
    });
  } catch (error) {
    console.error("[Authority API Error]", error);
    return ERR.fetchFailed("Authority API");
  }
}

