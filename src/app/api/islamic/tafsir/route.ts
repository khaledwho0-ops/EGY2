import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

// NOTE: api.quran-tafseer.com serves the tafsir corpus over plain HTTP only — its
// HTTPS port has no valid certificate, so https:// throws FETCH_FAILED every time.
// Use http:// for this specific upstream. The route still fails loud (500) if the
// host is genuinely down, so the One-Law (never fabricate tafsir) holds.
const EXTERNAL_API_URL = "http://api.quran-tafseer.com/tafseer";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return buildTafsirResponse({
    surah: searchParams.get("surah"),
    ayah: searchParams.get("ayah"),
    tafsir: searchParams.get("tafsir") || "1",
    claim: searchParams.get("claim"),
  });
}

// POST mirrors GET — accepts { surah, ayah, tafsir?, claim? } OR a combined
// { query | verseKey: "surah:ayah" }. Without this handler a POST (e.g. from the
// audit harness or a form) returns an empty body. Real content, same shape as GET.
export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* empty/invalid body → handled by missingQuery below */
  }

  let surah = body.surah != null ? String(body.surah) : null;
  let ayah = body.ayah != null ? String(body.ayah) : null;

  // Allow a combined "1:1" form via query/verseKey.
  const combined = (body.verseKey ?? body.query) as string | undefined;
  if ((!surah || !ayah) && typeof combined === "string" && combined.includes(":")) {
    const [s, a] = combined.split(":");
    surah = surah ?? s?.trim() ?? null;
    ayah = ayah ?? a?.trim() ?? null;
  }

  return buildTafsirResponse({
    surah,
    ayah,
    tafsir: body.tafsir != null ? String(body.tafsir) : "1",
    claim: typeof body.claim === "string" ? body.claim : null,
  });
}

async function buildTafsirResponse(params: {
  surah: string | null;
  ayah: string | null;
  tafsir: string;
  claim: string | null;
}) {
  const { surah, ayah, tafsir, claim } = params;

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
        maxTokens: 1800,
      }
    );

    return NextResponse.json({
      results,
      scholarlyContext,
      source: "quran-tafseer.com + AI Scholarly Analysis",
      aiProvider: "MegaRotator (Groq-first)",
      disclaimer: "Tafsir and scholarly context provided for educational reference. Consult qualified scholars for religious guidance.",
    });
  } catch (error) {
    console.error("[Tafsir API Error]", error);
    return ERR.fetchFailed("Tafsir API");
  }
}
