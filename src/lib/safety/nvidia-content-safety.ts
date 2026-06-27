"use server";

/**
 * NVIDIA Content Safety Module
 * ════════════════════════════════════════════════════
 * Uses Nemotron-3.5 Content Safety (4B parameter model)
 * for real-time Arabic + multilingual content moderation.
 *
 * Capabilities:
 *   - Real-time text + image moderation (sub-5ms)
 *   - 12 language support including Arabic
 *   - Categorization: hate, harassment, violence, self-harm, sexual, etc.
 *   - Action recommendations: allow / rewrite / block / flag
 *
 * Integration points in EAL:
 *   - Pre-screen user inputs before GOD-System
 *   - Post-screen LLM outputs before reaching user
 *   - Feed safety scores to Supervisor Dashboard
 *   - Trigger Epistemic Quarantine on critical violations
 *
 * @see https://build.nvidia.com/nvidia/nemotron-3.5-content-safety
 */

export interface ContentSafetyResult {
  safe: boolean;
  action: "allow" | "rewrite" | "block" | "flag";
  categories: string[];
  reasoning: string;
  confidence: number;
  rawResponse?: string;
}

const NVIDIA_SAFETY_BASE = "https://integrate.api.nvidia.com/v1";

/**
 * Checks content safety using NVIDIA Nemotron-3.5 Content Safety
 * Returns a structured safety assessment with action recommendation.
 */
export async function checkContentSafety(
  text: string,
  mode: "input" | "output" = "input"
): Promise<ContentSafetyResult> {
  const apiKey = process.env.NVIDIA_API_KEY;

  // Graceful fallback if NVIDIA key not configured
  if (!apiKey) {
    console.warn("[NVIDIA Safety] No NVIDIA_API_KEY configured. Skipping content safety check.");
    return {
      safe: true,
      action: "allow",
      categories: [],
      reasoning: "NVIDIA Content Safety not configured — skipped.",
      confidence: 0,
    };
  }

  try {
    const systemPrompt = mode === "input"
      ? `You are a content safety classifier. Analyze the following USER INPUT for harmful content. Classify it as safe or unsafe. If unsafe, categorize the type of harm (hate_speech, harassment, violence, self_harm, sexual, dangerous_content, misinformation, religious_hate). Respond ONLY in JSON format: { "safe": boolean, "action": "allow"|"block"|"flag"|"rewrite", "categories": string[], "reasoning": string, "confidence": number }`
      : `You are a content safety classifier. Analyze the following AI OUTPUT for harmful content before it reaches the user. Classify it as safe or unsafe. If unsafe, categorize the type of harm. Respond ONLY in JSON format: { "safe": boolean, "action": "allow"|"block"|"flag"|"rewrite", "categories": string[], "reasoning": string, "confidence": number }`;

    const response = await fetch(`${NVIDIA_SAFETY_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3.5-content-safety",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
        temperature: 0.1,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[NVIDIA Safety] API error ${response.status}: ${errorText}`);
      // Fail-open: don't block content if safety check itself fails
      return {
        safe: true,
        action: "allow",
        categories: [],
        reasoning: `Safety API returned ${response.status}. Fail-open applied.`,
        confidence: 0,
      };
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content ?? "";

    try {
      // Try to parse the JSON response
      const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return {
        safe: parsed.safe ?? true,
        action: parsed.action ?? "allow",
        categories: parsed.categories ?? [],
        reasoning: parsed.reasoning ?? "",
        confidence: parsed.confidence ?? 0.5,
        rawResponse: raw,
      };
    } catch {
      // If response isn't valid JSON, treat as safe with flag
      return {
        safe: true,
        action: "allow",
        categories: [],
        reasoning: `Could not parse safety response. Raw: ${raw.slice(0, 200)}`,
        confidence: 0.3,
        rawResponse: raw,
      };
    }
  } catch (error: any) {
    console.error("[NVIDIA Safety] Network error:", error.message);
    return {
      safe: true,
      action: "allow",
      categories: [],
      reasoning: `Network error: ${error.message}. Fail-open applied.`,
      confidence: 0,
    };
  }
}

/**
 * Quick safety check — returns true if content is safe, false if blocked.
 * Designed for inline use in API routes.
 */
export async function isContentSafe(text: string): Promise<boolean> {
  const result = await checkContentSafety(text, "input");
  return result.safe && result.action !== "block";
}

/**
 * Batch safety check — checks multiple texts in parallel.
 */
export async function batchCheckSafety(
  texts: string[],
  mode: "input" | "output" = "input"
): Promise<ContentSafetyResult[]> {
  return Promise.all(texts.map(text => checkContentSafety(text, mode)));
}
