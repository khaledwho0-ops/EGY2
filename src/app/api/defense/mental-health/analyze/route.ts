import { NextResponse } from 'next/server';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Provide text to analyze' }, { status: 400 });
    }

    const prompt = `You are a clinical psychology API expert fluent in Arabic (including Egyptian dialect) and English. Analyze the text below for emotional distress, manipulative sentiment, cognitive bias, and dark persuasion patterns. The text may be in Arabic — read it carefully; never claim it is empty if characters are present.
    Respond ONLY with a JSON object in this exact format (no markdown, no code fences):
    {
      "cognitiveLoadScore": number (0-100),
      "manipulationDetected": boolean,
      "detectedBiases": ["string"],
      "darkPatterns": ["string"],
      "emotionalDistress": boolean,
      "analysisSummary": "string (2-3 sentences, in the same language as the input)"
    }

    Text to analyze:
    """
    ${text}
    """`;

    const { data } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3, maxTokens: 700 });

    return NextResponse.json({
      success: true,
      analysis: data,
    });
  } catch (error: any) {
    console.error('Mental Health API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
