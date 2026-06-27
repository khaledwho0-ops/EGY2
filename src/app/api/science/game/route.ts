import { NextResponse } from "next/server";
import type { DeepRealGameModeId } from "@/data/research/deepreal-game";
import { answerDeepRealGameRound, getDeepRealGamePayload, resetDeepRealGame } from "@/lib/science/deepreal-game";
import { nvidiaFirstGenerateJSON } from "@/lib/ai/nvidia-first";

const scienceGameSystemPrompt = `[LAYER 1 - ROLE]: You are a gamified science education expert who creates engaging, accurate scientific literacy challenges for Arabic-speaking audiences.

[LAYER 2 - PLATFORM]: EAL Science Game Engine. Makes learning statistical fallacies, research methodology, and scientific thinking fun.

[LAYER 3 - MISSION]: Generate game challenges that teach real statistical concepts through engaging scenarios. Difficulty scales with player level.

[LAYER 4 - CONSTRAINTS]:
- All statistical examples must be REAL (Anscombe's quartet, Simpson's paradox, survivorship bias, etc.)
- Difficulty levels: 1 (p-value basics) → 5 (Bayesian inference, DAGs)
- Egyptian/Arabic cultural context in examples where possible
- ALWAYS include the real-world consequence of getting this wrong
- Immediate feedback: explain WHY the answer is correct

[LAYER 5 - FORMAT]: Return ONLY valid JSON (no markdown, no code fences) with: challenge (string), options (array of 4 strings), correctAnswer (string, must match one of the options exactly), explanation (string in English), explanation_ar (string in Arabic), realWorldExample (string), difficultyScore (1-5 integer), conceptTaught (string), conceptAr (string).

[LAYER 6 - ANTI-HALLUCINATION]: Never invent statistical studies. Only use established, peer-reviewed examples. If unsure about a study, use a clearly hypothetical framing like "Imagine a study where...".`;

interface GameChallengeJSON {
  challenge?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  explanation_ar?: string;
  realWorldExample?: string;
  difficultyScore?: number;
  conceptTaught?: string;
  conceptAr?: string;
}

const MODES = new Set<DeepRealGameModeId>(["classic", "egy", "pov", "immunity-rumors", "immunity-scams", "immunity-tiktok"]);

function errorResponse(
  status: number,
  errorCode: string,
  messageAr: string,
  messageEn: string,
  recoveryAction?: string
) {
  return NextResponse.json(
    {
      ok: false,
      errorCode,
      message: messageAr,
      messageEn,
      recoveryAction: recoveryAction ?? null,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = (searchParams.get("mode") as DeepRealGameModeId | null) ?? "classic";

    if (!MODES.has(mode)) {
      return errorResponse(
        400,
        "UNKNOWN_GAME_MODE",
        "وضع اللعبة غير معروف. الأوضاع المتاحة: كلاسيك، مصري، المنظور الجديد.",
        "Unknown game mode. Available modes: classic, egy, pov.",
        "SHOW_MODE_SELECTOR"
      );
    }

    const payload = await getDeepRealGamePayload(mode);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[Game GET Error]", err);
    return errorResponse(
      500,
      "GAME_LOAD_FAILED",
      "تعذر تحميل الساحة. أعد المحاولة.",
      "Failed to load the arena. Please try again.",
      "RETRY"
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action: "answer" | "reset" | "generate";
      mode: DeepRealGameModeId;
      choiceId?: string;
      difficulty?: number;
      topic?: string;
    };

    // ── NVIDIA CHALLENGE GENERATION (new action type) ──
    if (body.action === "generate") {
      const difficulty = Math.min(5, Math.max(1, body.difficulty ?? 2));
      const topic = body.topic ?? "statistical reasoning";

      const userPrompt = `Generate a science game challenge about: "${topic}"
Difficulty level: ${difficulty}/5
Target audience: Egyptian Arabic speakers learning scientific literacy.

Create an engaging multiple-choice question that teaches a real concept. Return valid JSON only.`;

      const { data: nvidiaData, provider } = await nvidiaFirstGenerateJSON(userPrompt, {
        systemPrompt: scienceGameSystemPrompt,
        maxTokens: 800,
        temperature: 0.6,
      }) as { data: GameChallengeJSON | null; provider: string };

      if (nvidiaData && nvidiaData.challenge && Array.isArray(nvidiaData.options)) {
        return NextResponse.json({
          ok: true,
          type: "ai_generated",
          provider,
          challenge: {
            challenge: nvidiaData.challenge,
            options: nvidiaData.options,
            correctAnswer: nvidiaData.correctAnswer,
            explanation: nvidiaData.explanation,
            explanation_ar: nvidiaData.explanation_ar,
            realWorldExample: nvidiaData.realWorldExample,
            difficultyScore: nvidiaData.difficultyScore ?? difficulty,
            conceptTaught: nvidiaData.conceptTaught,
            conceptAr: nvidiaData.conceptAr,
          },
        });
      }

      // Fallback if NVIDIA fails for generate action
      return NextResponse.json({
        ok: false,
        errorCode: "AI_GENERATION_FAILED",
        message: "تعذر توليد تحدي جديد. جرب وضع اللعبة الكلاسيكي.",
        messageEn: "AI challenge generation failed. Try classic game mode.",
        recoveryAction: "USE_CLASSIC_MODE",
        timestamp: new Date().toISOString(),
      }, { status: 503 });
    }

    if (!body.mode || !MODES.has(body.mode)) {
      return errorResponse(
        400,
        "UNKNOWN_GAME_MODE",
        "وضع اللعبة غير معروف. الأوضاع المتاحة: كلاسيك، مصري، المنظور الجديد.",
        "Unknown game mode.",
        "SHOW_MODE_SELECTOR"
      );
    }

    if (body.action === "reset") {
      const payload = await resetDeepRealGame(body.mode);
      return NextResponse.json(payload);
    }

    if (body.action !== "answer") {
      return errorResponse(
        400,
        "INVALID_ACTION",
        "إجراء غير صالح. الإجراءات المتاحة: answer، reset، generate.",
        "Invalid action. Available actions: answer, reset, generate."
      );
    }

    if (!body.choiceId) {
      return errorResponse(
        400,
        "MISSING_CHOICE",
        "لم يتم تحديد اختيار. اختر إجابة من الخيارات المتاحة.",
        "No choice selected. Pick an answer from the available options.",
        "SHOW_CHOICES"
      );
    }

    const payload = await answerDeepRealGameRound(body.mode, body.choiceId);
    if (!payload) {
      return errorResponse(
        404,
        "GAME_ROUND_NOT_FOUND",
        "تعذر العثور على الجولة الحالية. سنحاول فتح أول جولة متاحة.",
        "Current round not found. We will try to load the first available round.",
        "LOAD_FIRST_AVAILABLE_ROUND"
      );
    }

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[Game POST Error]", err);
    return errorResponse(
      500,
      "GAME_ACTION_FAILED",
      "حدث خطأ أثناء معالجة إجابتك. أعد المحاولة.",
      "An error occurred while processing your answer. Please try again.",
      "RETRY"
    );
  }
}
