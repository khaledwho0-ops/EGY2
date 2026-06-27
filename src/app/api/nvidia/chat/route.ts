import { NextResponse } from "next/server";

/**
 * NVIDIA Chat API Route
 * ════════════════════════════════════════════════════
 * POST /api/nvidia/chat
 *
 * Direct chat endpoint using NVIDIA NIM models.
 * Supports model selection: Nemotron-3 Ultra, DeepSeek V4 Flash/Pro, Gemma 4, etc.
 * Uses streaming for real-time responses.
 *
 * Body: { messages: Message[], model?: string, temperature?: number, max_tokens?: number }
 */

import { streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";

// Available NVIDIA models for the chat endpoint
const ALLOWED_MODELS = [
  "nvidia/nemotron-3-ultra-550b-a55b",
  "deepseek-ai/deepseek-v4-flash",
  "deepseek-ai/deepseek-v4-pro",
  "google/gemma-4-31b-it",
  "mistralai/mistral-medium-3.5-128b",
  "moonshotai/kimi-k2.6",
  "z-ai/glm-5.1",
  "minimaxai/minimax-m2.7",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      messages,
      model = "nvidia/nemotron-3-ultra-550b-a55b",
      temperature = 0.7,
      max_tokens = 2048,
      system,
    } = body;

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NVIDIA API key not configured" },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'messages' array" },
        { status: 400 }
      );
    }

    // Validate model is in allowed list
    const selectedModel = ALLOWED_MODELS.includes(model)
      ? model
      : "nvidia/nemotron-3-ultra-550b-a55b";

    const nvidiaProvider = createOpenAICompatible({
      name: "nvidia-nim-chat",
      baseURL: NVIDIA_BASE_URL,
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const result = streamText({
      model: nvidiaProvider(selectedModel),
      messages,
      system: system || undefined,
      temperature,
      maxOutputTokens: max_tokens,
      // Showcase route stays NVIDIA; bound the slow 550B stream so it fails loud instead of hanging.
      abortSignal: AbortSignal.timeout(25000),
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("[NVIDIA Chat Route] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
