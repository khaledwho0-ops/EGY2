import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';

// Schema for the generated feed post
const generatedPostSchema = z.object({
  author: z.string().describe("Name of the account publishing the post, e.g. 'The Deep Truth' or 'كاشف الأسرار'"),
  handle: z.string().describe("Social media handle, e.g. '@truthseeker_eg' or '@awakened_egy'"),
  content: z.string().describe("The generated post content. Should be more extreme, manipulative, or conspiratorial than the last liked post to simulate a radicalizing rabbit hole. If language is 'ar', write in natural Egyptian Arabic dialect. Otherwise, write in English."),
  manipulationTags: z.array(z.string()).describe("2-3 tags identifying the manipulation techniques/layers used, e.g. ['Layer 1: Complete Fabrication', 'Fear Vector']"),
  analysis: z.string().describe("Brief analysis of the post's manipulation technique and why the algorithm generated it"),
  targetBrainArea: z.string().describe("Brain area targeted by this manipulation (e.g. 'Amygdala (Fear Center)', 'Nucleus Accumbens (Reward/Greed)', 'Prefrontal Cortex Override')"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { rabbitHoleLevel, lastLikedPost, language = 'en' } = body;

    const depth = typeof rabbitHoleLevel === 'number' ? rabbitHoleLevel : 0;
    const lastContent = typeof lastLikedPost === 'string' ? lastLikedPost : '';

    const systemPrompt = `You are a simulated social media feed recommendation algorithm. Your goal is to maximize user engagement by driving them down a radicalizing "rabbit hole".
Based on the post the user just "liked" and their current depth in the rabbit hole (Level ${depth}), generate the NEXT post for their feed.

The next post MUST escalate the narrative of the last liked post:
- If the last post was about health/medical topics, escalate to medical conspiracies, bioweapons, or population control.
- If it was about economy/finance, escalate to financial cartels, collapse conspiracies, or get-rich-quick scams.
- If it was about politics/news, escalate to hidden controllers, false flags, or media censorship.

Format the post content exactly in the requested language:
- If language is 'ar', use natural, convincing Egyptian Arabic dialect/colloquial text (لهجة مصرية عامية مقنعة).
- If language is 'en', use English.

Make the post highly engaging, sensational, and manipulative. Include realistic tags, target brain areas, and a secret algorithmic analysis.`;

    // Try NVIDIA first — better at Egyptian Arabic dialect
    let post: Record<string, unknown> | null = null;
    try {
      const { nvidiaFirstGenerateJSON } = await import('@/lib/ai/nvidia-first');
      const prompt = `Last Liked Post: "${lastContent}"\nCurrent Rabbit Hole Level: ${depth}\nLanguage: ${language}\n\nYou are simulating a radicalizing social media algorithm. Generate the NEXT post. Return ONLY valid JSON:\n{"author":"Account name (Arabic or English based on language)","handle":"@handle","content":"Post content in ${language === 'ar' ? 'natural Egyptian Arabic colloquial (لهجة مصرية عامية مقنعة)' : 'English'}. MUST escalate from previous post.","manipulationTags":["Layer X: ...", "vector"],"analysis":"Brief algorithmic analysis of manipulation technique used","targetBrainArea":"Brain area targeted e.g. Amygdala (Fear Center)","psychologicalHook":"The specific psychological vulnerability being exploited","arabicDialectAuthenticity":"${language === 'ar' ? 'Rate your Egyptian dialect authenticity 0-10' : 'N/A'}"}`;
      const { data } = await nvidiaFirstGenerateJSON(prompt, { systemPrompt, maxTokens: 800, temperature: 0.8 });
      if (data) post = data as Record<string, unknown>;
    } catch { /* fall through to Gemini */ }

    // Fallback: rotatingGenerateObject (Gemini)
    if (!post) {
      const result = await rotatingGenerateObject({
        system: systemPrompt,
        prompt: `Last Liked Post: "${lastContent}"\n\nCurrent Rabbit Hole Level: ${depth}\nLanguage: ${language}`,
        schema: generatedPostSchema,
      });
      post = result.object as Record<string, unknown>;
    }

    return NextResponse.json({
      success: true,
      post: {
        id: Date.now(),
        time: 'Just now',
        // synthetic: true — these counts are randomly generated for educational simulation only.
        // UI MUST NOT display them as real engagement metrics.
        synthetic: true,
        syntheticEngagement: {
          likes: Math.floor(Math.random() * 90000) + 10000,
          shares: Math.floor(Math.random() * 50000) + 5000,
          comments: Math.floor(Math.random() * 20000) + 2000,
        },
        ...post,
      }
    });
  } catch (error: any) {
    console.error('[Live Deception Generator Error]', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate algorithm feed item.' },
      { status: 500 }
    );
  }
}
