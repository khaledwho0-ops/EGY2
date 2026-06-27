import { NextResponse } from "next/server";
import { z } from "zod";
import { rotatingGenerateObject } from "@/lib/debunking/gemini-rotator";
import { ALL_FALLACIES } from "@/lib/debunking/fallacies-data";
import { nvidiaFirstGenerate } from "@/lib/ai/nvidia-first";

export const runtime = "nodejs";

const DebateSchema = z.object({
  response: z.string().describe("Your counter-argument to the user's claim. Employ the requested fallacy. Do NOT name the fallacy in this text."),
  fallacyUsed: z.string().describe("The name of the fallacy you used.")
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Missing conversation history" }, { status: 400 });
    }

    // Pick a random fallacy to employ
    const selectedFallacy = ALL_FALLACIES[Math.floor(Math.random() * ALL_FALLACIES.length)];

    // Construct chat transcript context
    const transcript = messages.map(m => `${m.role === 'user' ? 'User' : 'Devil\'s Advocate'}: ${m.content}`).join("\n");

    const systemPrompt = `You are a Socratic opponent ("Devil's Advocate") trained in the art of debate and cognitive manipulation.
Your task is to counter the user's latest claim. You must employ a specific logical fallacy: "${selectedFallacy.name}" (${selectedFallacy.description}).

BANS & CONSTRAINTS:
1. Do NOT explicitly name, define, or explain the fallacy in the "response" text. Let the user find it.
2. Keep your response sharp, concise (1-2 paragraphs), and conversational.
3. Respond in the same language as the user's latest message (Arabic/Egyptian dialect or English).
4. Do NOT say "I am using the X fallacy" or anything similar.
5. Return ONLY valid JSON in this format: {"response":"your counter-argument","fallacyUsed":"${selectedFallacy.name}"}`;

    const userPrompt = `Here is the conversation history:
${transcript}

Employ the "${selectedFallacy.name}" fallacy to counter-argue the user's latest claim.`;

    // ── NVIDIA NIM (PRIMARY) ──────────────────────────────────────
    try {
      const { text, provider } = await nvidiaFirstGenerate(userPrompt, {
        systemPrompt,
        maxTokens: 512,
        temperature: 0.8,
      });

      if (text.trim()) {
        // Parse the JSON response from NVIDIA
        try {
          const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json({
            response: parsed.response || text,
            fallacyUsed: selectedFallacy.name,
            fallacyDescription: selectedFallacy.description,
            provider,
          });
        } catch {
          // If JSON parse fails, use raw text as response
          return NextResponse.json({
            response: text,
            fallacyUsed: selectedFallacy.name,
            fallacyDescription: selectedFallacy.description,
            provider,
          });
        }
      }
    } catch (nvidiaError) {
      console.warn("[Debate Sim] NVIDIA failed, falling back to Gemini:", nvidiaError);
    }

    // ── GEMINI (FALLBACK) ─────────────────────────────────────────
    const prompt = `You are a Socratic opponent ("Devil's Advocate") trained in the art of debate and cognitive manipulation.
Your task is to counter the user's latest claim. You must employ a specific logical fallacy: "${selectedFallacy.name}" (${selectedFallacy.description}).

BANS & CONSTRAINTS:
1. Do NOT explicitly name, define, or explain the fallacy in the "response" text. Let the user find it.
2. Keep your response sharp, concise (1-2 paragraphs), and conversational.
3. Respond in the same language as the user's latest message (Arabic/Egyptian dialect or English).
4. Do NOT say "I am using the X fallacy" or anything similar.

Here is the conversation history:
${transcript}

Employ the "${selectedFallacy.name}" fallacy to counter-argue the user's latest claim.`;

    const { object: result } = await rotatingGenerateObject({
      schema: DebateSchema,
      prompt,
    });

    return NextResponse.json({
      response: result.response,
      fallacyUsed: selectedFallacy.name,
      fallacyDescription: selectedFallacy.description,
      provider: "Gemini",
    });

  } catch (error: any) {
    console.error("[Debate Sim API Error]", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
