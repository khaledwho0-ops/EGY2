import { NextResponse } from "next/server";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query payload" }, { status: 400 });
    }

    const prompt = `You are a certified Shariah Auditor specialized in Islamic Fiqh al-Muamalat and the global AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) standards.
Evaluate the following transaction or investment structure for Shariah compliance:

"${query}"

AUDIT PROTOCOL:
1. Scan for Riba (interest, usury, fixed returns guaranteed on loans).
2. Scan for Gharar (excessive uncertainty, lack of transparency, derivatives, futures contracts without physical possession).
3. Scan for Maysir (gambling, pure speculation, day trading without asset ownership).
4. Reference AAOIFI guidelines specifically if relevant (e.g., AAOIFI Shariah Standard on Sukuk, Murabaha, Gold, or digital assets).
5. Address grey areas like cryptocurrencies, staking, or options trading with nuance and scholarly difference of opinion.`;

    // Fast TEXT path (Groq-first via the rotator) + JSON parse — NOT structured
    // generateObject. Groq/most fast slots don't support strict json_schema mode,
    // which forced this route onto slow structured-only providers (21s → hit the
    // 22s rotator cap → 500). Text + parse keeps it ~5s and never 500s.
    const jsonPrompt = `${prompt}\n\nReturn ONLY a valid JSON object (no markdown, no code fences) with EXACTLY this shape:\n{"isCompliant": true | false | null, "confidence": 0-100, "explanation": "scholarly explanation citing AAOIFI standards / Fiqh al-Muamalat", "issues": ["specific compliance issue", "..."]}`;
    const { data } = await nvidiaFirstGenerateJSON<{ isCompliant: boolean | null; confidence: number; explanation: string; issues: string[] }>(
      jsonPrompt,
      { systemPrompt: "You are a certified Shariah Auditor (AAOIFI). Return ONLY valid JSON.", maxTokens: 700, temperature: 0.2 },
    );

    if (!data) {
      // Graceful — never a 500. One-Law: empty/honest when the model can't ground it.
      return NextResponse.json({
        isCompliant: null,
        confidence: 0,
        explanation: "تعذّر إكمال تدقيق الامتثال الآن — حاول تاني. / The compliance audit could not complete right now — please try again.",
        issues: [],
        note: "ai_unavailable",
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      ...data,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("[Islamic Finance API Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
