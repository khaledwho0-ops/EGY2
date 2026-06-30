import { NextResponse } from 'next/server';
import { CovoRouter } from '@/lib/orchestration/covo-router';
import { InputSafetyGuard } from '@/lib/safety/llm-input';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { claim, lang = 'ar' } = await req.json();
    if (!claim || typeof claim !== 'string') {
      return NextResponse.json({ error: 'Claim required' }, { status: 400 });
    }

    // Layer 1: Safety Gate
    const safetyResult = InputSafetyGuard.sanitizeInput(claim);
    if (!safetyResult.isSafe) {
      return NextResponse.json({ error: `Security: ${safetyResult.flaggedPattern}` }, { status: 400 });
    }

    // Layer 2: Emotional Intent Score
    const intentResult = CovoRouter.computeEmotionalIntentScore(claim);
    const routingAction = CovoRouter.determineRoute(intentResult.eis);
    const needsCalmReveal = intentResult.eis > 0.75;

    // Layers 3-8: NVIDIA NIM Full Analysis
    const systemPrompt = `You are the GOD-System — the world's most advanced misinformation analysis engine for Arabic and Egyptian content. You perform an 8-layer cognitive immunity analysis. Always respond with valid JSON only, no markdown.

Analysis layers:
- Layer 3: Source Triangulation (assess claim verifiability, evidence pyramid level 1-6)
- Layer 4: Fallacy Detection (identify ALL logical/rhetorical/statistical fallacies)
- Layer 5: Constructive Positive (recommend the counter-reasoning framework)
- Layer 6: Truth Sandwich (Fact → Myth → Fact structure in both Arabic and English)
- Layer 7: Socratic Question (one Socratic question to prompt critical thinking)
- Layer 8: Forward Defense (a ready-to-share rebuttal script in Arabic for WhatsApp/social media)`;

    const userPrompt = `Analyze this claim: "${claim}"

Return ONLY this JSON structure:
{
  "layer3": {
    "evidencePyramidLevel": 1-6,
    "pyramidLevelName": "Expert Opinion|Case Report|Cohort Study|RCT|Systematic Review|WHO/UN Authority",
    "verifiability": "verifiable|unverifiable|partially_verifiable",
    "confidence": 0.0-1.0,
    "keySourcesNeeded": ["source1", "source2"]
  },
  "layer4": {
    "fallacies": [
      {"name": "fallacy name", "nameAr": "Arabic name", "explanation": "how it applies here", "severity": "low|medium|high"}
    ],
    "overallManipulationScore": 0.0-1.0
  },
  "layer5": {
    "recommendedConstruct": "Base-rate|Bayesian|Likelihood-ratio|Steel-man|Modus-Tollens",
    "applicationNote": "how to apply this construct to counter the claim"
  },
  "layer6": {
    "fact1_en": "First corrective fact in English",
    "fact1_ar": "الحقيقة الأولى بالعربية",
    "myth_en": "The myth/false claim restated",
    "myth_ar": "الادعاء الخاطئ",
    "fact2_en": "Second reinforcing fact in English",
    "fact2_ar": "الحقيقة الثانية بالعربية"
  },
  "layer7": {
    "socraticQuestion_en": "A Socratic question in English",
    "socraticQuestion_ar": "سؤال سقراطي بالعربية"
  },
  "layer8": {
    "forwardDefenseScript_ar": "Ready-to-share WhatsApp rebuttal in Arabic (2-3 sentences, no jargon)",
    "forwardDefenseScript_en": "English version of the rebuttal",
    "hashtags": ["#FactCheck", "#فحص_الحقيقة"]
  },
  "verdict": "DEBUNKED|MISLEADING|PARTIALLY_TRUE|UNVERIFIED|TRUE",
  "verdictScore": 0.0-1.0,
  "verdictExplanation_ar": "شرح الحكم بالعربية",
  "verdictExplanation_en": "Verdict explanation in English",
  "isReligiousClaim": true/false,
  "religiousContext": {
    "hadithStatus": "Sahih|Hasan|Daif|Mawdu|Not a hadith|N/A",
    "scholarlyConsensus": "Brief scholarly position"
  }
}`;

    // FAIL-FAST: cap the rotator call so the route degrades to the graceful !data
    // path below instead of hanging. The MegaRotator already enforces a 15s internal
    // ceiling (NVIDIA removed), so a 25s race just added dead slack — tighten to 14s
    // to keep the whole route under the ~15s demo budget. maxTokens lowered 2000→1400:
    // the 8-layer JSON fits comfortably and shorter generations return faster.
    const { data, provider, raw } = await Promise.race([
      nvidiaFirstGenerateJSON(userPrompt, {
        systemPrompt,
        // The full 8-layer JSON (bilingual fact-sandwich + fallacies array +
        // verdict + religious context) can run long; 1400 risked truncating the
        // tail (layer8 hashtags / religiousContext) into an unparseable blob →
        // empty fallback. 2000 gives safe headroom while still returning fast.
        maxTokens: 2000,
        temperature: 0.2,
      }),
      new Promise<{ data: null; provider: string; raw: string }>((resolve) =>
        setTimeout(() => resolve({ data: null, provider: 'timeout', raw: '' }), 20_000)
      ),
    ]);

    // If JSON parse failed, return structured error with raw text
    if (!data) {
      return NextResponse.json({
        layer1_Safety: safetyResult,
        layer2_EmotionalIntent: { eis: intentResult.eis, vectors: intentResult.vectors, routingAction, needsCalmReveal },
        layer3: { evidencePyramidLevel: 3, verifiability: 'unverifiable', confidence: 0.5, pyramidLevelName: 'Analysis Pending', keySourcesNeeded: [] },
        layer4: { fallacies: [], overallManipulationScore: 0 },
        layer5: { recommendedConstruct: 'Steel-man', applicationNote: 'Analyze further' },
        layer6: { fact1_en: '', fact1_ar: '', myth_en: claim, myth_ar: claim, fact2_en: '', fact2_ar: '' },
        layer7: { socraticQuestion_en: 'What evidence supports this claim?', socraticQuestion_ar: 'ما الدليل على هذا الادعاء؟' },
        layer8: { forwardDefenseScript_ar: 'يرجى التحقق من المصادر الموثوقة قبل المشاركة.', forwardDefenseScript_en: 'Please verify from reliable sources before sharing.', hashtags: ['#FactCheck'] },
        verdict: 'UNVERIFIED',
        verdictScore: 0.5,
        verdictExplanation_ar: raw.substring(0, 200),
        verdictExplanation_en: 'Analysis completed with partial data.',
        isReligiousClaim: false,
        provider,
        parseError: true,
      });
    }

    return NextResponse.json({
      layer1_Safety: safetyResult,
      layer2_EmotionalIntent: { eis: intentResult.eis, vectors: intentResult.vectors, routingAction, needsCalmReveal },
      ...data,
      provider,
    });
  } catch (error: any) {
    console.error('[GOD-System API Error]', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
