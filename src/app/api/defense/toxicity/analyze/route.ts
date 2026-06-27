import { NextResponse } from 'next/server';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

const toxicitySystemPrompt = `[LAYER 1 - ROLE]: You are an Arabic computational linguistics expert specializing in hate speech detection, online harassment patterns, and psychological manipulation in Egyptian social media content.

[LAYER 2 - PLATFORM]: EAL Toxicity Analyzer. Used to protect users from harmful content and identify manipulation tactics.

[LAYER 3 - MISSION]: Analyze Arabic text for: hate speech, incitement, sectarian language, gender-based violence language, manipulation tactics, and emotional coercion. Provide actionable classification.

[LAYER 4 - CONSTRAINTS]:
- Egyptian Arabic dialect awareness required
- Distinguish between: critique (halal), insult (haram), incitement (illegal)
- Sectarian language: detect Sunni-Shia, Muslim-Christian dog whistles
- Common Egyptian manipulation: "الدولة عايزا تردكم", "الغرب عايز يدمر الإسلام"
- Rate severity: 0.0-1.0 scale
- Include counter-speech recommendation

[LAYER 5 - FORMAT]: Return ONLY valid JSON (no markdown, no code fences) with: toxicityScore (0-1), categories (array of strings), hateSpeech (bool), incitement (bool), manipulationTactics (array of strings), severity ("low"/"medium"/"high"/"extreme"), counterSpeech_ar (string), reportRecommendation (bool), emotions (array with label and confidence).

[LAYER 6 - ANTI-HALLUCINATION]: Do not over-label political criticism as hate speech. Context matters enormously in Arabic. If text is clearly benign, return toxicityScore: 0 and say so explicitly.`;

interface ToxicityAnalysisJSON {
  toxicityScore?: number;
  categories?: string[];
  hateSpeech?: boolean;
  incitement?: boolean;
  manipulationTactics?: string[];
  severity?: string;
  counterSpeech_ar?: string;
  reportRecommendation?: boolean;
  emotions?: { label: string; confidence: number }[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Provide text to analyze' }, { status: 400 });
    }

    const userPrompt = `Analyze the following Arabic text for toxicity, hate speech, manipulation, and emotional content. Return ONLY a valid JSON object:

Text to analyze:
"""
${text}
"""

Return JSON with: toxicityScore (0.0-1.0), categories (array), hateSpeech (bool), incitement (bool), manipulationTactics (array), severity (low/medium/high/extreme), counterSpeech_ar, reportRecommendation (bool), emotions (array with label and confidence).`;

    // ── PRIMARY: NVIDIA NIM with multi-layered Arabic NLP system prompt ──
    const { data: nvidiaData, provider } = await nvidiaFirstGenerateJSON(userPrompt, {
      systemPrompt: toxicitySystemPrompt,
      maxTokens: 1000,
      temperature: 0.1,
    }) as { data: ToxicityAnalysisJSON | null; provider: string };

    if (nvidiaData && typeof nvidiaData.toxicityScore === 'number') {
      return NextResponse.json({
        success: true,
        provider,
        analysis: {
          toxicityScore: nvidiaData.toxicityScore,
          categories: nvidiaData.categories ?? [],
          hateSpeech: nvidiaData.hateSpeech ?? false,
          incitement: nvidiaData.incitement ?? false,
          manipulationTactics: nvidiaData.manipulationTactics ?? [],
          severity: nvidiaData.severity ?? 'low',
          counterSpeech_ar: nvidiaData.counterSpeech_ar ?? '',
          reportRecommendation: nvidiaData.reportRecommendation ?? false,
          // Backwards-compatible emotion format for existing UI
          topEmotions: (nvidiaData.emotions ?? []).slice(0, 3).map((e: { label: string; confidence: number }) => ({
            emotion: e.label,
            confidence: typeof e.confidence === 'number' ? Math.round(e.confidence * 100) + '%' : e.confidence,
          })),
          rawResults: nvidiaData.emotions ?? [],
        },
      });
    }

    // ── FALLBACK: Hugging Face emotion model ──
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'AI providers unavailable' }, { status: 500 });
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', errorText);
      throw new Error(`Hugging Face responded with status ${response.status}`);
    }

    const data = await response.json();

    // The model returns an array of arrays containing objects like { label: 'joy', score: 0.9 }
    const predictions = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];

    // Sort by score descending and take the top 3
    const topEmotions = predictions
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 3)
      .map((p: { label: string; score: number }) => ({
        emotion: p.label,
        confidence: Math.round(p.score * 100) + '%',
      }));

    return NextResponse.json({
      success: true,
      provider: 'HuggingFace (fallback)',
      analysis: {
        topEmotions,
        rawResults: topEmotions,
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Toxicity Analysis API Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
