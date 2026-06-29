import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

const BASE_URL = "https://api.aladhan.com/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const type = searchParams.get("type") || "timings"; // "timings" | "qibla"
  const lat = searchParams.get("lat") || "30.0444"; // Default Cairo
  const lon = searchParams.get("lon") || "31.2357"; // Default Cairo
  
  // Format date as DD-MM-YYYY for AlAdhan API if provided, else it uses current date in API implicitly if we use just /timings without date, 
  // but let's use the explicit endpoint: /timings/{date}
  // If no date provided, we can just use /timings which defaults to today.
  const dateStr = searchParams.get("date") || "";

  try {
    const results = await withSearchCache(
      `prayer:${type}:${lat}:${lon}:${dateStr}`,
      1000 * 60 * 60, // 1 hour
      async () => {
        if (type === "qibla") {
          const res = await fetch(`${BASE_URL}/qibla/${lat}/${lon}`, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(8000),
          });
          if (!res.ok) throw new Error(`AlAdhan Qibla API error: ${res.status}`);
          const data = await res.json();
          return [{
            type: "qibla",
            latitude: data.data.latitude,
            longitude: data.data.longitude,
            direction: data.data.direction,
          }];
        } else {
          // Timings
          const endpoint = dateStr ? `/timings/${dateStr}` : `/timings`;
          const res = await fetch(`${BASE_URL}${endpoint}?latitude=${lat}&longitude=${lon}&method=5`, {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(8000),
          });
          if (!res.ok) throw new Error(`AlAdhan Timings API error: ${res.status}`);
          const data = await res.json();
          
          return [{
            type: "timings",
            timings: {
              Fajr: data.data.timings.Fajr,
              Sunrise: data.data.timings.Sunrise,
              Dhuhr: data.data.timings.Dhuhr,
              Asr: data.data.timings.Asr,
              Maghrib: data.data.timings.Maghrib,
              Isha: data.data.timings.Isha,
            },
            hijri: {
              date: data.data.date.hijri.date,
              day: data.data.date.hijri.day,
              month: data.data.date.hijri.month.en,
              monthAr: data.data.date.hijri.month.ar,
              year: data.data.date.hijri.year,
            },
            gregorian: data.data.date.gregorian.date,
          }];
        }
      }
    );

    return NextResponse.json({
      results,
      source: "aladhan.com",
      disclaimer: "Prayer times and Qibla direction provided for reference. Local mosque observations may vary slightly.",
    });
  } catch (error) {
    console.error("[Prayer API Error]", error);
    return ERR.fetchFailed("Prayer API");
  }
}
