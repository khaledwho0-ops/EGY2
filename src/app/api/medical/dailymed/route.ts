import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

const EXTERNAL_API_URL = "https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `medical:dailymed:${query.toLowerCase()}`,
      1000 * 60 * 60 * 24,
      async () => {
        try {
          const res = await fetch(`${EXTERNAL_API_URL}?drug_name=${encodeURIComponent(query)}&pagesize=5`, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 86400 },
          });

          if (res.ok) {
            const data = await res.json();
            return (data.data || []).map((item: any) => ({
              title: item.title,
              setid: item.setid,
              publishedDate: item.published_date,
              link: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${item.setid}`
            }));
          }
        } catch (e) {
          console.warn("[DailyMed API Error]", e);
        }

        // Upstream unavailable — throw so the outer catch returns a fail-loud error.
        throw new Error("DailyMed upstream unavailable");
      }
    );

    return NextResponse.json({
      results,
      source: "DailyMed",
      disclaimer: "Official drug labels from the National Library of Medicine. Not a substitute for professional medical advice.",
    });
  } catch (error) {
    console.error("[DailyMed API Error]", error);
    return NextResponse.json(
      {
        results: [],
        degraded: true,
        source: null,
        error: "DailyMed unavailable",
        errorAr: "بيانات DailyMed غير متاحة حالياً. حاول مرة أخرى.",
        errorEn: "DailyMed drug label data is currently unavailable. Please retry.",
      },
      { status: 503 }
    );
  }
}
