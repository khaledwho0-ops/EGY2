import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

// CRITICAL: this route is NOT behind the AI gateway for hard-coded resources.
// NVIDIA enrichment is additive only — the verified static resources are ALWAYS returned.
// No analytics that could leak the help-seeking event.

const crisisSystemPrompt = `[LAYER 1 - ROLE]: You are a compassionate mental health first responder trained in Egyptian cultural context, Motivational Interviewing, and Crisis Intervention. You understand the stigma around mental health in Egyptian society and navigate it with expertise.

[LAYER 2 - PLATFORM]: Egyptian Awareness Library Mental Health Module. Users reaching this endpoint may be in emotional distress. Your response can save a life.

[LAYER 3 - MISSION]: Assess emotional risk, provide immediate compassionate support, connect to real Egyptian resources, and NEVER leave a person feeling judged or alone.

[LAYER 4 - CONSTRAINTS]:
- Egyptian hotlines to always mention: 08008880700 (Befrienders Egypt), Behman Hospital: 16328
- NEVER use clinical jargon without explaining it
- Recognize cultural barriers: "الولد العسكر مابيديش" type responses
- If any suicidal ideation is detected: immediately provide hotlines + safety planning
- Religious framing is acceptable and often helpful: "الإسلام يعتبر طلب المساعدة قوة"
- 3-step response: Validate → Psychoeducate → Connect to resources

[LAYER 5 - FORMAT]: Return ONLY valid JSON (no markdown, no code fences) with: emotionalValidation_ar, psychoeducation_ar, egyptianResources (array with name, phone, url), safetyPlan_ar, followUpSuggestion_ar, riskLevel (low/medium/high/crisis).

[LAYER 6 - ANTI-HALLUCINATION]: NEVER invent phone numbers or resources. Only use verified Egyptian resources: 08008880700 and 16328.`;

const Body = z.object({
  trigger: z.enum(["self_harm_keyword", "explicit_request", "screening_score_red"]),
  lang: z.enum(["ar", "en"]),
  context: z.string().optional(), // Optional user message context for AI enrichment
});

const RESOURCES = {
  ar: {
    egypt: [
      { name: "الخط الساخن للصحة النفسية - وزارة الصحة المصرية", phone: "08008880700", hours: "24/7" },
      { name: "Befrienders Cairo", phone: "+20 27621602", hours: "19:00–21:00" },
    ],
    international: [{ name: "IASP Crisis Centres", url: "https://www.iasp.info/resources/Crisis_Centres/" }],
    safety: "أنت لست وحدك. ما تشعر به الآن مؤلم لكنه يمكن أن يتغير. اتصل بأحد الأرقام في الأعلى.",
  },
  en: {
    egypt: [
      { name: "Mental Health Hotline - Egyptian Ministry of Health", phone: "08008880700", hours: "24/7" },
      { name: "Befrienders Cairo", phone: "+20 27621602", hours: "19:00–21:00" },
    ],
    international: [{ name: "IASP Crisis Centres", url: "https://www.iasp.info/resources/Crisis_Centres/" }],
    safety: "You are not alone. What you are feeling right now is painful, but it can change. Please call one of the numbers above.",
  },
};

export const runtime = "nodejs"; // NOT edge — we want auditable logs
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = Body.parse(json);

    // We log the trigger to a sealed audit table, NOT to analytics.
    // Per Mindframe: no public counters of suicide-related interactions.
    console.log(`[SEALED_AUDIT] Crisis Trigger: ${body.trigger} | IP: ${req.headers.get("x-forwarded-for") || "unknown"}`);

    // ── CORE: Always return verified static resources immediately ──
    const baseResources = RESOURCES[body.lang];

    // ── NVIDIA ENRICHMENT (additive, never replaces static resources) ──
    let aiEnrichment: Record<string, unknown> | null = null;
    if (body.context) {
      try {
        const userPrompt = `A user triggered a crisis alert with type: "${body.trigger}". Their message context: "${body.context}". Language preference: "${body.lang}".

Provide compassionate, culturally-aware mental health support in JSON format. The verified Egyptian hotlines are already being shown to the user (08008880700 and 16328). Your job is to add emotional validation and psychoeducation — not replace the hotlines.`;

        interface CrisisAIResponse {
          emotionalValidation_ar?: string;
          psychoeducation_ar?: string;
          egyptianResources?: unknown[];
          safetyPlan_ar?: string;
          followUpSuggestion_ar?: string;
          riskLevel?: string;
        }

        const { data: rawData, provider } = await nvidiaFirstGenerateJSON(userPrompt, {
          systemPrompt: crisisSystemPrompt,
          maxTokens: 1200,
          temperature: 0.4,
        });
        const data = rawData as CrisisAIResponse | null;

        if (data && data.emotionalValidation_ar) {
          aiEnrichment = { ...data, provider };
        }
      } catch (aiError) {
        // AI enrichment is optional — never let it block crisis resource delivery
        console.warn("[Crisis API] AI enrichment failed (non-blocking):", aiError);
      }
    }

    return NextResponse.json(
      {
        resources: baseResources,
        updatedAt: "2025-quarter-reviewed",
        ...(aiEnrichment ? { aiSupport: aiEnrichment } : {}),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
