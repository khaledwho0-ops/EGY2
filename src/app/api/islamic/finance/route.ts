import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";

export const runtime = "nodejs";

const FinanceSchema = z.object({
  isCompliant: z.boolean().nullable().describe("true if fully compliant with AAOIFI, false if non-compliant, null if a grey/debated area."),
  confidence: z.number().min(0).max(100).describe("Confidence score of the compliance audit (0-100)."),
  explanation: z.string().describe("Scholarly explanation citing specific AAOIFI standards or classic Fiqh al-Muamalat principles."),
  issues: z.array(z.string()).describe("List of specific compliance issues (e.g., presence of Riba, excessive Gharar, speculative Maysir).")
});

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

    const { object: result } = await rotatingGenerateObject({
      schema: FinanceSchema,
      prompt,
    });

    return NextResponse.json({
      ...result,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("[Islamic Finance API Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
