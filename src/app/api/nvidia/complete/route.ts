import { NextResponse } from "next/server";

/**
 * NVIDIA NIM Chat Completions (Non-Streaming)
 * Used by: Live Swarm Debate, Angry Debunkers, etc.
 * Returns JSON { content, model, provider } instead of streaming.
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, temperature = 0.7, maxTokens = 1024 } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const nvidiaKey = process.env.NVIDIA_API_KEY;

    // Primary: NVIDIA NIM
    if (nvidiaKey) {
      try {
        // Showcase route stays NVIDIA-first; add an 8s timeout so the slow 550B fails fast to the Gemini fallback instead of hanging 30s+.
        const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${nvidiaKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-3-ultra-550b-a55b",
            messages,
            max_tokens: maxTokens,
            temperature,
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content || "";
          return NextResponse.json({
            content,
            model: "nvidia/nemotron-3-ultra-550b-a55b",
            provider: "nvidia-nim",
          });
        }
      } catch (nvidiaErr) {
        console.error("[NVIDIA Complete] NIM error:", nvidiaErr);
      }
    }

    // Fallback: Gemini
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const systemMsg = messages.find((m: any) => m.role === "system")?.content || "";
        const userMsg = messages.find((m: any) => m.role === "user")?.content || "";
        const fullPrompt = systemMsg ? `${systemMsg}\n\n${userMsg}` : userMsg;

        const result = await model.generateContent(fullPrompt);
        const content = result.response.text();

        return NextResponse.json({
          content,
          model: "gemini-2.0-flash",
          provider: "google-gemini-fallback",
        });
      } catch (geminiErr) {
        console.error("[NVIDIA Complete] Gemini fallback error:", geminiErr);
      }
    }

    // Final fallback: the platform MegaRotator (Gemini → Groq → … → NVIDIA).
    // The single GEMINI_API_KEY read above is frequently absent on Vercel (the
    // keys feeding the rotator are GEMINI_API_KEY_2..7 etc.), which caused a
    // false 503 even though healthy provider slots existed. One-Law: the rotator
    // returns 503 (fail loud, no fabrication) only if EVERY provider is down.
    try {
      const { rotatingGenerateText } = await import("@/lib/debunking/gemini-rotator");
      const systemMsg = messages.find((m: any) => m.role === "system")?.content || "";
      const userMsg = messages.find((m: any) => m.role === "user")?.content || "";
      const { text, provider } = await rotatingGenerateText({
        prompt: userMsg,
        system: systemMsg || undefined,
        temperature,
      });
      if (text && text.trim()) {
        return NextResponse.json({ content: text, model: "rotator", provider });
      }
    } catch (rotatorErr) {
      console.error("[NVIDIA Complete] Rotator fallback error:", rotatorErr);
    }

    return NextResponse.json({ error: "No AI provider available" }, { status: 503 });
  } catch (error) {
    console.error("[NVIDIA Complete API Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
