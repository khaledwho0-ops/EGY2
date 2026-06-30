import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

/* ═══════════════════════════════════════════════════════════════
 * POST /api/islamic/maqasid
 *
 * Reasons a claim/ruling against ONE of the five Maqasid al-Shariah
 * via the mega-rotator (nvidiaFirstGenerateJSON). Returns a real,
 * input-specific verdict — never a canned "Compatible" string.
 * This is AI ijtihad, NOT a fatwa.
 * ═══════════════════════════════════════════════════════════════ */

const MAQASID_NAMES: Record<string, string> = {
  din: "Hifz al-Din (Preservation of Religion)",
  nafs: "Hifz al-Nafs (Preservation of Life)",
  aql: "Hifz al-'Aql (Preservation of Intellect)",
  nasl: "Hifz al-Nasl (Preservation of Lineage)",
  mal: "Hifz al-Mal (Preservation of Property)",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Accept `claim` (original field) OR `query` (what the page/UI actually sends).
    const { claim: claimField, query, maqsadId } = body as {
      claim?: string;
      query?: string;
      maqsadId?: string;
    };
    const claim = (claimField ?? query ?? "").toString();

    if (!claim || claim.trim().length === 0) {
      return ERR.missingQuery();
    }

    const maqsad = MAQASID_NAMES[maqsadId ?? ""] ?? "the five Maqasid al-Shariah collectively";

    const prompt = `You are an expert in Usul al-Fiqh and Maqasid al-Shariah, grounded in
Al-Shatibi's Al-Muwafaqat and Al-Ghazali's Al-Mustasfa. Evaluate the following claim or ruling
specifically against ${maqsad}.

Claim/ruling: "${claim.trim()}"

Reason carefully and specifically about THIS claim. Do not give a generic answer.
Return ONLY a JSON object with this exact structure (no markdown, no code fences):
{
  "maqsad": "${maqsad}",
  "verdict": "One of: Compatible | Tension | Violates | Inconclusive",
  "verdictAr": "Arabic of the verdict: متوافق | يوجد توتر | يخالف | غير حاسم",
  "reasoning": "2-4 sentences of specific reasoning about why this claim relates to the maqsad as judged.",
  "reasoningAr": "Arabic translation of the reasoning (Egyptian-aware where natural).",
  "caveats": ["A short list of scholarly caveats, what is uncertain, and where to verify (e.g., Dar al-Ifta, Al-Azhar)."]
}
If you cannot judge with confidence, use verdict "Inconclusive" and explain why.`;

    const { data, provider } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3 });

    if (!data) {
      return NextResponse.json(
        {
          results: [],
          source: "maqasid-reasoning",
          error:
            "AI reasoning unavailable right now. غير متاح حاليًا — استشر دار الإفتاء أو الأزهر.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      results: [data],
      provider,
      source: "maqasid-reasoning",
      disclaimer:
        "AI reasoning, not a fatwa. اجتهاد بالذكاء وليس فتوى — للأحكام الرسمية راجع دار الإفتاء أو الأزهر.",
    });
  } catch (error) {
    console.error("[Maqasid API Error]", error);
    return ERR.fetchFailed("Maqasid Reasoning API");
  }
}
