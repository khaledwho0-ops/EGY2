import { NextResponse } from "next/server";
import { streamText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * NVIDIA AI Live Editor API Route
 * ════════════════════════════════════════════════════
 * POST /api/nvidia/live-editor
 *
 * 🔥 CRAZY FEATURE: Users describe what they want to see on the page,
 * and the AI generates a live React component that renders in real-time.
 *
 * Use cases:
 *   - "Add a chart showing the top 10 fallacies"
 *   - "Create a comparison table of Sunni vs Shia hadith methodology"
 *   - "Show me a visual of how the GOD-System works"
 *   - "Generate a quiz about cognitive biases"
 *   - "Make a prayer times widget for Cairo"
 *   - "Create a summary card for this research paper"
 *
 * The AI generates valid JSX/HTML that renders safely in a sandboxed container.
 *
 * Body: { prompt: string, context?: string, language?: "ar" | "en" }
 * Response: Streaming text with HTML/JSX component code
 */

const EDITOR_SYSTEM_PROMPT = `You are the NVIDIA-powered AI Live Editor for the Egyptian Awareness Library (EAL).

The user will describe a UI element, widget, card, chart, table, quiz, or interactive component they want to see. 
You MUST generate ONLY valid HTML with inline Tailwind CSS classes that can be safely rendered inside a div container.

DESIGN RULES:
1. Use a dark theme: backgrounds should be dark (bg-slate-900, bg-gray-900, bg-zinc-900)
2. Use vibrant accent colors: emerald-400, cyan-400, amber-400, rose-400
3. Use glassmorphism: bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
4. Use modern typography: font-semibold, text-sm, tracking-tight
5. Always include proper padding (p-6) and spacing (space-y-4)
6. Make it responsive
7. Support RTL for Arabic content (use dir="rtl" when Arabic text is present)
8. Use Unicode emoji where helpful for visual enhancement
9. For charts/data visualization, generate styled HTML tables or CSS bar charts (no JavaScript libraries)
10. For quizzes, generate radio buttons with proper styling

BANNED:
- No <script> tags
- No onclick handlers  
- No external resources or URLs
- No iframes
- No JavaScript at all — pure HTML + Tailwind CSS only
- No placeholder images

OUTPUT: Return ONLY the HTML. No markdown fences, no explanation, no comments. Just pure HTML.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, context, language = "en" } = body;

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NVIDIA API key not configured" },
        { status: 500 }
      );
    }

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt'" },
        { status: 400 }
      );
    }

    const nvidiaProvider = createOpenAICompatible({
      name: "nvidia-live-editor",
      baseURL: "https://integrate.api.nvidia.com/v1",
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const fullPrompt = context
      ? `Context: ${context}\n\nUser Request: ${prompt}\n\nLanguage: ${language === "ar" ? "Arabic (RTL)" : "English (LTR)"}`
      : `User Request: ${prompt}\n\nLanguage: ${language === "ar" ? "Arabic (RTL)" : "English (LTR)"}`;

    const result = streamText({
      model: nvidiaProvider("nvidia/nemotron-3-ultra-550b-a55b"),
      system: EDITOR_SYSTEM_PROMPT,
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.8,
      maxOutputTokens: 4096,
      // Showcase route stays NVIDIA; bound the slow 550B stream so it fails loud instead of hanging.
      abortSignal: AbortSignal.timeout(25000),
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("[NVIDIA Live Editor] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
