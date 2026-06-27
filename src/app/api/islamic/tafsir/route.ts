import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

const EXTERNAL_API_URL = "https://api.quran-tafseer.com/tafseer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const surah = searchParams.get("surah");
  const ayah = searchParams.get("ayah");
  const tafsir = searchParams.get("tafsir") || "1";
  const claim = searchParams.get("claim"); // optional claim to verify against this verse

  if (!surah || !ayah) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `tafsir:${tafsir}:${surah}:${ayah}`,
      1000 * 60 * 60 * 24, // 24 hours
      async () => {
        const res = await fetch(`${EXTERNAL_API_URL}/${tafsir}/${surah}/${ayah}`, {
          headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(8000),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        return [{
          tafsirId: data.tafseer_id,
          tafsirName: data.tafseer_name,
          surahNumber: parseInt(surah, 10),
          ayahNumber: data.ayah_number,
          text: data.text
        }];
      }
    );

    // ── NVIDIA NIM Scholarly Context Analysis ──
    const tafsirText = results[0]?.text || "";
    const { data: scholarlyContext } = await nvidiaFirstGenerateJSON(
      `You are an Islamic scholar specializing in Quranic exegesis. Analyze this Quran verse tafsir (Surah ${surah}, Ayah ${ayah}):

Tafsir text: "${tafsirText.substring(0, 1000)}"
${claim ? `\nClaim to verify: "${claim}"` : ""}

Return ONLY valid JSON:
{
  "surahName_ar": "اسم السورة",
  "surahName_en": "Surah name in English",
  "context": {
    "asbabAlNuzul": "Reason of revelation (سبب النزول) if known",
    "makkiOrMadani": "Makki|Madani",
    "relatedVerses": ["brief mention of thematically related verses"]
  },
  "scholarlyConsensus": "What major scholars (Ibn Kathir, Al-Tabari, Al-Qurtubi) agree on for this verse",
  "commonMisuses": ["common way this verse is misquoted or taken out of context"],
  "correctInterpretation_ar": "التفسير الصحيح بالعربية",
  "correctInterpretation_en": "Correct interpretation in English",
  ${claim ? `"claimAssessment": {
    "isClaimAccurate": true|false,
    "analysisAr": "تحليل الادعاء بالعربية",
    "analysisEn": "Analysis of the claim against this verse",
    "verdict": "ACCURATE|INACCURATE|PARTIALLY_ACCURATE|OUT_OF_CONTEXT"
  },` : ""}
  "educationalNote_ar": "ملاحظة تعليمية للقارئ",
  "educationalNote_en": "Educational note for the reader"
}`,
      {
        systemPrompt: "You are a qualified Islamic scholar with expertise in tafsir, usul al-fiqh, and Arabic linguistics. Respond only with valid JSON.",
        temperature: 0.2,
        maxTokens: 1200,
      }
    );

    return NextResponse.json({
      results,
      scholarlyContext,
      source: "quran-tafseer.com + NVIDIA NIM Scholarly Analysis",
      aiProvider: "NVIDIA NIM → Gemini fallback",
      disclaimer: "Tafsir and scholarly context provided for educational reference. Consult qualified scholars for religious guidance.",
    });
  } catch (error) {
    console.error("[Tafsir API Error]", error);
    return ERR.fetchFailed("Tafsir API");
  }
}
