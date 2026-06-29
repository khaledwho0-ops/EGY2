import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

const EXTERNAL_API_URL = "https://rxnav.nlm.nih.gov/REST/drugs.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `medical:rxnorm:${query.toLowerCase()}`,
      1000 * 60 * 60 * 24,
      async () => {
        try {
          const res = await fetch(`${EXTERNAL_API_URL}?name=${encodeURIComponent(query)}`, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 86400 },
            signal: AbortSignal.timeout(8000),
          });

          if (res.ok) {
            const data = await res.json();
            const conceptGroup = data.drugGroup?.conceptGroup || [];
            const foundDrugs: any[] = [];
            
            conceptGroup.forEach((group: any) => {
              if (group.conceptProperties) {
                group.conceptProperties.forEach((prop: any) => {
                  foundDrugs.push({
                    rxcui: prop.rxcui,
                    name: prop.name,
                    synonym: prop.synonym,
                    tty: prop.tty
                  });
                });
              }
            });
            return foundDrugs.slice(0, 10);
          }
        } catch (e) {
          console.warn("[RxNorm API Error]", e);
        }

        // Upstream unavailable — throw so the outer catch returns a fail-loud error.
        throw new Error("RxNorm upstream unavailable");
      }
    );

    return NextResponse.json({
      results,
      source: "RxNorm",
      disclaimer: "Normalized names for clinical drugs. RxNorm is provided by the National Library of Medicine.",
    });
  } catch (error) {
    console.error("[RxNorm API Error]", error);
    return NextResponse.json(
      {
        results: [],
        degraded: true,
        source: null,
        error: "RxNorm unavailable",
        errorAr: "بيانات RxNorm غير متاحة حالياً. حاول مرة أخرى.",
        errorEn: "RxNorm drug database is currently unavailable. Please retry.",
      },
      { status: 503 }
    );
  }
}
