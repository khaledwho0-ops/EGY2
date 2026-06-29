import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

const EXTERNAL_API_URL = "https://ghoapi.azureedge.net/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // "indicators" or "data"
  const query = searchParams.get("q");

  if (!type) {
    return ERR.missingQuery();
  }

  try {
    const cacheKey = `medical:who:${type}:${query ? query.toLowerCase() : 'all'}`;
    const results = await withSearchCache(
      cacheKey,
      1000 * 60 * 60 * 24 * 7, // 1 week cache for WHO data as it changes infrequently
      async () => {
        let url = "";
        
        if (type === "indicators") {
          url = query 
            ? `${EXTERNAL_API_URL}/Indicator?$filter=contains(IndicatorName,'${encodeURIComponent(query)}')`
            : `${EXTERNAL_API_URL}/Indicator?$top=50`; // Default top 50 if no query
        } else if (type === "data") {
          // If type is data, query should be the IndicatorCode (e.g., WHOSIS_000001)
          if (!query) throw new Error("Indicator code required for data query");
          // Fetch data for the indicator, top 100 recent entries
          url = `${EXTERNAL_API_URL}/${query}?$top=100&$orderby=TimeDim%20desc`;
        } else {
          throw new Error("Invalid WHO query type");
        }

        try {
          const res = await fetch(url, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 604800 },
            signal: AbortSignal.timeout(8000),
          });

          if (res.ok) {
            const data = await res.json();
            return data.value || [];
          }
        } catch (e) {
          console.warn("[WHO API Error]", e);
        }

        // Upstream unavailable — throw so the outer catch returns a fail-loud error.
        throw new Error("WHO GHO upstream unavailable");
      }
    );

    return NextResponse.json({
      results,
      source: "WHO GHO",
      disclaimer: "Data provided by the World Health Organization (WHO) Global Health Observatory. Not for individual clinical diagnosis.",
    });
  } catch (error) {
    console.error("[WHO API Error]", error);
    return NextResponse.json(
      {
        results: [],
        degraded: true,
        source: null,
        error: "WHO GHO unavailable",
        errorAr: "بيانات منظمة الصحة العالمية غير متاحة حالياً. حاول مرة أخرى.",
        errorEn: "WHO Global Health Observatory data is currently unavailable. Please retry.",
      },
      { status: 503 }
    );
  }
}
