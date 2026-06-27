import { NextResponse } from "next/server";
import { kvStore } from "@/lib/db/kv-store";
import { ERR, apiError } from "@/lib/api/api-error";
import { hashParticipantId } from "@/lib/research/anonymization";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

/**
 * Assessment Data Persistence API
 * 
 * Implements the Day 0 → Day 15 comparative metrics required by the
 * N=84 research protocol (§5.3, §16.2).
 *
 * GET  — Retrieve all assessment records for a participant
 * POST — Submit a new assessment completion record
 *
 * Data is persisted via kvStore.
 */

interface AssessmentRecord {
  instrumentId: string;
  phase: "pre" | "post";
  completedAt: string;
  scores: Record<string, number>;
  duration: number;
  participantHash: string;
  metadata?: {
    language: string;
    userAgent?: string;
  };
}

interface ParticipantAssessmentFile {
  participantHash: string;
  records: AssessmentRecord[];
  createdAt: string;
  updatedAt: string;
}

async function readParticipantFile(hash: string): Promise<ParticipantAssessmentFile> {
  const data = await kvStore.get<ParticipantAssessmentFile>(`assessment:${hash}`);
  if (data) {
    return data;
  }
  return {
    participantHash: hash,
    records: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

async function writeParticipantFile(data: ParticipantAssessmentFile) {
  data.updatedAt = new Date().toISOString();
  await kvStore.set(`assessment:${data.participantHash}`, data);
}

// ─── GET: Retrieve assessment records ───────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");

  if (!pid) {
    return ERR.invalidPayload();
  }

  const hash = hashParticipantId(pid);
  const file = await readParticipantFile(hash);

  // Build Day 0 vs Day 15 comparison if both pre and post exist
  const preRecords = file.records.filter((r) => r.phase === "pre");
  const postRecords = file.records.filter((r) => r.phase === "post");

  const comparison: Record<string, { pre?: Record<string, number>; post?: Record<string, number>; delta?: Record<string, number> }> = {};

  for (const pre of preRecords) {
    comparison[pre.instrumentId] = { pre: pre.scores };
  }
  for (const post of postRecords) {
    if (!comparison[post.instrumentId]) {
      comparison[post.instrumentId] = {};
    }
    comparison[post.instrumentId].post = post.scores;

    // Calculate deltas if pre exists
    const preScores = comparison[post.instrumentId].pre;
    if (preScores) {
      const delta: Record<string, number> = {};
      for (const key of Object.keys(post.scores)) {
        if (key in preScores) {
          delta[key] = Number((post.scores[key] - preScores[key]).toFixed(2));
        }
      }
      comparison[post.instrumentId].delta = delta;
    }
  }

  return NextResponse.json({
    ok: true,
    participantHash: hash,
    recordCount: file.records.length,
    records: file.records,
    comparison,
    createdAt: file.createdAt,
    updatedAt: file.updatedAt,
  });
}

// ─── POST: Submit assessment record ─────────────────────────────
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      pid?: string;
      instrumentId?: string;
      phase?: "pre" | "post";
      scores?: Record<string, number>;
      duration?: number;
      language?: string;
    };

    if (!body.pid || !body.instrumentId || !body.phase || !body.scores || body.duration === undefined) {
      return ERR.invalidPayload();
    }

    const VALID_PHASES = new Set(["pre", "post"]);
    if (!VALID_PHASES.has(body.phase)) {
      return apiError(400, "INVALID_PHASE", "المرحلة غير صالحة. اختر قبلي أو بعدي.", "Invalid phase. Choose pre or post.");
    }

    const VALID_INSTRUMENTS = new Set(["mist20", "mhls", "brief-rcope", "ghsq", "sus", "mc-sds"]);
    if (!VALID_INSTRUMENTS.has(body.instrumentId)) {
      return apiError(400, "UNKNOWN_INSTRUMENT", "أداة القياس غير معروفة.", "Unknown assessment instrument.");
    }

    const hash = hashParticipantId(body.pid);
    const file = await readParticipantFile(hash);

    const record: AssessmentRecord = {
      instrumentId: body.instrumentId,
      phase: body.phase,
      completedAt: new Date().toISOString(),
      scores: body.scores,
      duration: body.duration,
      participantHash: hash,
      metadata: {
        language: body.language ?? "english",
      },
    };

    // Replace existing record for same instrument+phase, or append
    const existingIndex = file.records.findIndex(
      (r) => r.instrumentId === body.instrumentId && r.phase === body.phase
    );

    if (existingIndex >= 0) {
      file.records[existingIndex] = record;
    } else {
      file.records.push(record);
    }

    await writeParticipantFile(file);

    // Maintain a participant index so the Efficacy Engine can aggregate the
    // cohort (kvStore.keys() can't match ":" patterns in local-FS dev mode).
    const participantIndex = (await kvStore.get<string[]>("assessment:participants")) || [];
    if (!participantIndex.includes(hash)) {
      participantIndex.push(hash);
      await kvStore.set("assessment:participants", participantIndex);
    }

    // ── NVIDIA NIM Personalized Feedback ──
    const scoresSummary = Object.entries(body.scores)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    const { data: aiFeedback } = await nvidiaFirstGenerateJSON(
      `A user completed the "${body.instrumentId}" cognitive assessment (${body.phase} phase).
Scores: ${scoresSummary}
Instrument: ${body.instrumentId === "mist20" ? "Misinformation Susceptibility Test (MIST-20)" :
              body.instrumentId === "ghsq" ? "General Help-Seeking Questionnaire" :
              body.instrumentId === "sus" ? "System Usability Scale" : body.instrumentId}

Generate personalized feedback. Return ONLY valid JSON:
{
  "overallLevel": "Beginner|Developing|Proficient|Advanced|Expert",
  "overallLevelAr": "مبتدئ|في طور النمو|متمكن|متقدم|خبير",
  "strengths": ["strength1", "strength2"],
  "strengthsAr": ["نقطة قوة 1", "نقطة قوة 2"],
  "areasToImprove": ["area1", "area2"],
  "areasToImproveAr": ["مجال تحسين 1", "مجال تحسين 2"],
  "nextSteps": ["specific action the user should take next", "second action"],
  "nextStepsAr": ["الخطوة التالية المحددة", "الخطوة الثانية"],
  "motivationalMessage_en": "Encouraging 1-2 sentence message",
  "motivationalMessage_ar": "رسالة تحفيزية بالعربية",
  "recommendedModules": ["module1", "module2"],
  "effectSizeEstimate": 0.0,
  "bloomsLevel": 1-6
}`,
      { systemPrompt: "You are an educational psychologist and cognitive training expert. Give personalized, actionable feedback.", temperature: 0.4, maxTokens: 800 }
    );

    return NextResponse.json({
      ok: true,
      participantHash: hash,
      instrumentId: body.instrumentId,
      phase: body.phase,
      recordCount: file.records.length,
      message: "تم حفظ نتيجة التقييم بنجاح.",
      messageEn: "Assessment result saved successfully.",
      aiFeedback,
      aiProvider: "NVIDIA NIM",
    });
  } catch (err) {
    console.error("[Assessment POST Error]", err);
    return apiError(500, "ASSESSMENT_SAVE_FAILED", "حدث خطأ أثناء حفظ نتيجة التقييم.", "Failed to save assessment result.", "RETRY");
  }
}

