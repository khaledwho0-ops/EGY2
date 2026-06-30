import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

/**
 * ALQURAN.CLOUD API ROUTE — Chunk 4.1
 *
 * FREE, NO AUTH — Highest uptime Islamic text API.
 * Maintained by Islamic Network. Used by Quran.com.
 *
 * Endpoints used:
 * - /surah/{number} — Full surah text
 * - /ayah/{surah}:{ayah}/editions/en.asad,ar — Specific verse with translation
 * - /search/{keyword}/all/en — Keyword search across entire Quran
 *
 * Integration: Religion Hub exercises can verify Quranic references
 * by fetching actual verse text + scholarly English translation.
 *
 * Expert basis: Pargament (2007) positive religious coping requires
 * accurate scriptural knowledge — misquotation fuels exploitation.
 */

const BASE_URL = "https://api.alquran.cloud/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "search"; // "search" | "ayah" | "surah"
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `quran:${type}:${query.toLowerCase()}`,
      1000 * 60 * 60 * 24, // 24 hour cache (Quran text doesn't change)
      async () => {
        const tafsirId = searchParams.get("tafsir") || "16"; // 16 = Ibn Kathir
        let url: string;

        switch (type) {
          case "tafsir": {
            // q = "2:255"
            const tafsirUrl = `https://api.quran.com/api/v4/quran/tafsirs/${tafsirId}?verse_key=${query}`;
            const tafsirRes = await fetch(tafsirUrl, {
              headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
              next: { revalidate: 86400 },
              signal: AbortSignal.timeout(8000),
            });
            if (!tafsirRes.ok) throw new Error(`Quran.com API error: ${tafsirRes.status}`);
            const tafsirData = await tafsirRes.json();

            const ayahUrl = `${BASE_URL}/ayah/${query}/editions/quran-uthmani,en.asad`;
            const ayahRes = await fetch(ayahUrl, {
              headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
              next: { revalidate: 86400 },
              signal: AbortSignal.timeout(8000),
            });
            if (!ayahRes.ok) throw new Error(`AlQuran API error: ${ayahRes.status}`);
            const ayahData = await ayahRes.json();

            return {
              type: "tafsir",
              tafsir: tafsirData.tafsirs?.[0]?.text || "Tafsir not found",
              tafsirId,
              verseKey: query,
              ayah: ayahData.data?.[0]?.text,
              translation: ayahData.data?.[1]?.text,
            };
          }
          case "ayah": {
            // q = "2:255" (surah:ayah)
            url = `${BASE_URL}/ayah/${query}/editions/quran-uthmani,en.asad`;
            break;
          }
          case "surah": {
            // q = "1" (surah number)
            url = `${BASE_URL}/surah/${query}/editions/quran-uthmani,en.asad`;
            break;
          }
          default: {
            // search by keyword. AlQuran's en.asad edition only matches English
            // text, so an Arabic query (e.g. "الرحمن") returns nothing. Route
            // Arabic queries to the Arabic edition (ar.muyassar) which carries the
            // verse-level Arabic text/explanation, and keep English for the rest.
            const isArabic = /[؀-ۿ]/.test(query);
            const searchEdition = isArabic ? "ar" : "en.asad";
            url = `${BASE_URL}/search/${encodeURIComponent(query)}/all/${searchEdition}`;
            break;
          }
        }

        const res = await fetch(url, {
          headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(8000),
        });

        // AlQuran returns 404 "NOT FOUND" for a search with zero matches. That is a
        // valid empty result, NOT an upstream failure — surface empty results instead
        // of throwing FETCH_FAILED (which the page renders as a hard error).
        if (res.status === 404 && type !== "ayah" && type !== "surah" && type !== "tafsir") {
          return { type: "search", count: 0, results: [] };
        }
        if (!res.ok) throw new Error(`AlQuran API error: ${res.status}`);
        const data = await res.json();

        if (type === "ayah" || type === "surah") {
          // Returns array of editions
          const editions = data.data || [];
          return {
            type,
            editions: editions.map((edition: {
              edition: { identifier: string; language: string; name: string };
              ayahs?: Array<{ numberInSurah: number; text: string }>;
              text?: string;
              surah?: { number: number; englishName: string; name: string };
              numberInSurah?: number;
            }) => ({
              identifier: edition.edition?.identifier,
              language: edition.edition?.language,
              name: edition.edition?.name,
              ayahs: edition.ayahs?.map((a) => ({
                number: a.numberInSurah,
                text: a.text,
              })),
              // Single ayah mode
              text: edition.text,
              surah: edition.surah ? {
                number: edition.surah.number,
                englishName: edition.surah.englishName,
                arabicName: edition.surah.name,
              } : undefined,
            })),
          };
        }

        // Search mode
        const matches = data.data?.matches || [];
        return {
          type: "search",
          count: data.data?.count || 0,
          results: matches.slice(0, 10).map((match: {
            text: string;
            surah: { number: number; englishName: string; name: string };
            numberInSurah: number;
            edition: { identifier: string };
          }) => ({
            text: match.text,
            surahNumber: match.surah?.number,
            surahName: match.surah?.englishName,
            surahArabic: match.surah?.name,
            ayahNumber: match.numberInSurah,
            reference: `${match.surah?.number}:${match.numberInSurah}`,
            edition: match.edition?.identifier,
          })),
        };
      }
    );

    return NextResponse.json({
      results,
      source: "alquran.cloud",
      disclaimer: "Quranic text provided via AlQuran.cloud API. For scholarly interpretation, consult qualified scholars. This platform does not issue religious rulings.",
    });
  } catch (error) {
    console.error("[Quran API Error]", error);
    return ERR.fetchFailed("Quran API");
  }
}
