import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

/* ═══════════════════════════════════════════════════════════════
 * POST /api/defense/hadith-check
 *
 * AI-powered Hadith authenticity checker.
 * PRIMARY:  NVIDIA NIM with multi-layered Islamic scholar system prompt.
 * FALLBACK: Gemini mega-rotator (rotatingGenerateObject).
 * ═══════════════════════════════════════════════════════════════ */

const hadithSystemPrompt = `[LAYER 1 - ROLE]: You are a world-class Islamic hadith scholar with expertise in 'Ilm al-Rijal (science of narrator biography), 'Ilm al-Hadith (hadith sciences), and contemporary isnad analysis. You hold the equivalent of a doctorate from Al-Azhar University.

[LAYER 2 - PLATFORM]: You operate within the Egyptian Awareness Library's Islamic Intelligence Hub, serving millions of Egyptian Muslims who deserve accurate religious information.

[LAYER 3 - MISSION]: Verify hadith authenticity with scholarly precision. Trace the isnad, identify narrator reliability using classical rijal works (Ibn Hajar's Taqrib al-Tahdhib, Al-Dhahabi's Siyar), and deliver a clear grading with explanation.

[LAYER 4 - CONSTRAINTS]:
- Primary grading scale: Sahih → Hasan → Da'if → Mawdu' (Fabricated)
- For disputed hadith: present the strongest scholarly opinion with reasoning
- NEVER grade a hadith without referencing the classical collections it appears in (Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah, Ahmad)
- Alert to any misquotation, taken-out-of-context usage, or misattribution
- For fabricated hadith (Mawdu'): explain who fabricated it and why if known
- Al-Azhar/Dar al-Ifta Egypt mainstream position takes precedence in disputes

[LAYER 5 - FORMAT]: Return ONLY valid JSON with these exact keys: grade, arabicGrade, explanation, arabicExplanation, isnadAnalysis, collectionsFound (array of strings), misattributed (bool), misattributionNote, scholarlyReferences (array of strings), modernApplicationNote. No markdown, no code fences, no extra text.

[LAYER 6 - ANTI-HALLUCINATION]: Never fabricate a hadith collection, narrator name, or grading. If the hadith text is ambiguous or you cannot verify it with certainty, say grade: "UNVERIFIABLE" with clear explanation.`;

interface HadithLLMResponse {
  grade?: string;
  explanation?: string;
  confidencePercent?: number;
  collectionsFound?: string[];
  hadithNumber?: string;
  isnadAnalysis?: string;
  weakLinks?: string[];
  chainGrade?: string;
  scholarlyReferences?: string[];
  arabicGrade?: string;
  modernApplicationNote?: string;
  misattributed?: boolean;
  misattributionNote?: string;
  arabicExplanation?: string;
}

const HadithCheckSchema = z.object({
  classification: z.enum(["Sahih", "Hasan", "Da'if", "Mawdu'"]).describe(
    "The authenticity classification of the hadith: Sahih (authentic), Hasan (good), Da'if (weak), or Mawdu' (fabricated)"
  ),
  confidencePercent: z.number().describe(
    'Confidence percentage (0-100) in the classification'
  ),
  sourceBook: z.string().describe(
    'The primary hadith collection where this narration appears (e.g., Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, etc.). Say "Not found in major collections" if not identifiable.'
  ),
  hadithNumber: z.string().describe(
    'The hadith reference number in the source book, if known. Say "Unknown" if not identifiable.'
  ),
  narratorChainAnalysis: z.object({
    chainSummary: z.string().describe(
      'A summary of the narrator chain (isnad) and its reliability'
    ),
    weakLinks: z.array(z.string()).describe(
      'Names of any weak or problematic narrators in the chain'
    ),
    chainGrade: z.string().describe(
      'Overall grade of the narrator chain: Connected, Broken, Fabricated, Unknown'
    ),
  }).describe('Analysis of the narrator chain (isnad)'),
  scholarOpinions: z.array(
    z.object({
      scholar: z.string().describe('Name of the Islamic scholar'),
      opinion: z.string().describe('Their ruling on this hadith'),
      era: z.string().describe('Historical era of the scholar (e.g., "Classical", "Medieval", "Modern")'),
    })
  ).describe('Opinions from recognized Islamic scholars about this hadith'),
  textAnalysis: z.string().describe(
    'Brief analysis of the hadith text (matn) for any contradictions with the Quran, established Sunnah, or reason'
  ),
  arabicClassification: z.string().describe(
    'The classification in Arabic: صحيح، حسن، ضعيف، أو موضوع'
  ),
  recommendation: z.string().describe(
    'A practical recommendation for the user about how to treat this hadith'
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hadithText } = body;

    if (!hadithText || typeof hadithText !== 'string' || hadithText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a hadith text to check (hadithText field required)' },
        { status: 400 }
      );
    }

    if (hadithText.length > 5000) {
      return NextResponse.json(
        { error: 'Hadith text is too long. Maximum 5000 characters.' },
        { status: 400 }
      );
    }

    const userPrompt = `Analyze the following hadith text for authenticity and return ONLY a valid JSON object (no markdown, no code fences):

"""
${hadithText.trim()}
"""

Provide a detailed authenticity analysis including: grade, arabicGrade, explanation, arabicExplanation, isnadAnalysis, collectionsFound (array), misattributed (bool), misattributionNote, scholarlyReferences (array), modernApplicationNote.`;

    // ── PRIMARY: NVIDIA NIM with multi-layered system prompt ──
    const { data: nvidiaData, provider } = await nvidiaFirstGenerateJSON(userPrompt, {
      systemPrompt: hadithSystemPrompt,
      maxTokens: 1800,
      temperature: 0.15,
    });

    const nd = (nvidiaData ?? {}) as HadithLLMResponse;
    if (nvidiaData && (nd.grade || nd.explanation)) {
      // Map NVIDIA response to our enhanced format
      return NextResponse.json({
        success: true,
        provider,
        analysis: {
          classification: nd.grade ?? 'UNVERIFIABLE',
          confidencePercent: nd.confidencePercent ?? 70,
          sourceBook: nd.collectionsFound?.[0] ?? 'See collectionsFound',
          hadithNumber: nd.hadithNumber ?? 'Unknown',
          narratorChainAnalysis: {
            chainSummary: nd.isnadAnalysis ?? '',
            weakLinks: nd.weakLinks ?? [],
            chainGrade: nd.chainGrade ?? 'Unknown',
          },
          scholarOpinions: nd.scholarlyReferences?.map((ref: string) => ({
            scholar: ref,
            opinion: 'See explanation',
            era: 'Classical/Modern',
          })) ?? [],
          textAnalysis: nd.explanation ?? '',
          arabicClassification: nd.arabicGrade ?? '',
          recommendation: nd.modernApplicationNote ?? '',
          // Extended NVIDIA fields
          collectionsFound: nd.collectionsFound ?? [],
          misattributed: nd.misattributed ?? false,
          misattributionNote: nd.misattributionNote ?? '',
          scholarlyReferences: nd.scholarlyReferences ?? [],
          arabicExplanation: nd.arabicExplanation ?? '',
          modernApplicationNote: nd.modernApplicationNote ?? '',
        },
      });
    }

    // ── FALLBACK: Gemini mega-rotator ──
    const result = await rotatingGenerateObject({
      system: `You are an expert Islamic hadith scholar (Muhaddith) with deep knowledge of:
- The six canonical hadith collections (Kutub al-Sittah)
- The science of hadith authentication (Ulum al-Hadith)
- Narrator criticism and evaluation (Ilm al-Rijal)
- Classical and modern scholarly opinions

Your task is to analyze a given hadith text and determine its authenticity classification.
Be honest and rigorous. If you're uncertain, say so. Never fabricate scholar opinions.
If the text is not a recognized hadith, state that clearly.
Respond in a balanced way, giving both the classification and the reasoning.`,
      prompt: `Analyze the following hadith text for authenticity:

"""
${hadithText.trim()}
"""

Provide a detailed authenticity analysis including classification, source book, narrator chain analysis, and scholar opinions.`,
      schema: HadithCheckSchema,
    });

    return NextResponse.json({
      success: true,
      provider: 'Gemini (fallback)',
      analysis: result.object,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Hadith Check API] Error:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
