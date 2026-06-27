import { NextResponse } from 'next/server';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { threatText } = body;

    if (!threatText) {
      return NextResponse.json({ error: 'Provide threatText to analyze' }, { status: 400 });
    }

    const prompt = `You are an expert in theology, historical texts, and trauma-informed care. The user has encountered an existential threat, misinformation, or ontological shock. 
    Provide an authentic, trauma-informed counter-narrative and a grounding truth based on historical or theological baselines.
    Respond ONLY with a JSON object in this exact format:
    {
      "shockLevelDetected": number (0-10),
      "historicalBaseline": "string (a verified historical or theological fact that counters the threat)",
      "groundingTruth": "string (a trauma-informed counter-narrative to calm the user)",
      "suggestedAction": "string"
    }
    
    Threat encountered: "${threatText}"`;

    const { data } = await nvidiaFirstGenerateJSON(prompt, { temperature: 0.3 });

    return NextResponse.json({
      success: true,
      analysis: data,
    });
  } catch (error: any) {
    console.error('Religion Hub API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
