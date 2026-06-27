import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

const EXTERNAL_API_URL = "https://api.fda.gov/drug/event.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `medical:openfda:${query.toLowerCase()}`,
      1000 * 60 * 60 * 24,
      async () => {
        try {
          const res = await fetch(`${EXTERNAL_API_URL}?search=patient.drug.medicinalproduct:"${encodeURIComponent(query)}"&limit=10`, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 86400 },
          });

          if (res.ok) {
            const data = await res.json();
            return (data.results || []).map((event: any) => ({
              receiptdate: event.receiptdate,
              serious: event.serious,
              reactions: (event.patient?.reaction || []).map((r: any) => r.reactionmeddrapt),
              patientAge: event.patient?.patientonsetage,
              patientSex: event.patient?.patientsex === "1" ? "Male" : event.patient?.patientsex === "2" ? "Female" : "Unknown"
            }));
          }
        } catch (e) {
          console.warn("[openFDA API Error]", e);
        }

        // Upstream unavailable — throw so the outer catch returns a fail-loud error.
        throw new Error("openFDA upstream unavailable");
      }
    );

    return NextResponse.json({
      results,
      source: "openFDA",
      disclaimer: "Adverse event reports provided by the FDA. This data alone does not prove the drug caused the event. Consult a physician for medical advice.",
    });
  } catch (error) {
    console.error("[openFDA API Error]", error);
    return NextResponse.json(
      {
        results: [],
        degraded: true,
        source: null,
        error: "openFDA unavailable",
        errorAr: "بيانات openFDA غير متاحة حالياً. حاول مرة أخرى.",
        errorEn: "openFDA data is currently unavailable. Please retry.",
      },
      { status: 503 }
    );
  }
}
