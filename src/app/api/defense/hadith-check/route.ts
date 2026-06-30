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

/* ─── Real-corpus grounding ────────────────────────────────────────────
 * Before asking the LLM, search the canonical Arabic hadith collections
 * (fawazahmed0 open dataset, same source the /api/islamic/hadith route uses)
 * for the supplied matn. A real match gives the LLM a verified anchor
 * (collection + number) so it stops defaulting to UNVERIFIABLE for famous,
 * authentic narrations. This NEVER fabricates: the reference returned is a
 * verbatim hit from the published collection, or nothing.
 */
interface CorpusMatch {
  collection: string; // e.g. "Sahih al-Bukhari"
  reference: string; // hadith number
  matnExcerpt: string; // the matched Arabic text (truncated)
  sourceUrl: string;
}

const ARABIC_COLLECTIONS: Array<{ slug: string; name: string; sunnahKey: string }> = [
  { slug: "ara-bukhari", name: "Sahih al-Bukhari", sunnahKey: "bukhari" },
  { slug: "ara-muslim", name: "Sahih Muslim", sunnahKey: "muslim" },
  { slug: "ara-abudawud", name: "Sunan Abu Dawud", sunnahKey: "abudawud" },
  { slug: "ara-tirmidhi", name: "Jami at-Tirmidhi", sunnahKey: "tirmidhi" },
  { slug: "ara-nasai", name: "Sunan an-Nasa'i", sunnahKey: "nasai" },
  { slug: "ara-ibnmajah", name: "Sunan Ibn Majah", sunnahKey: "ibnmajah" },
];

// Strip Arabic diacritics + tatweel + punctuation so a clean user matn matches
// the fully-vocalised corpus text.
function normalizeArabic(s: string): string {
  return s
    .replace(/[ً-ْٰـ]/g, "")
    .replace(/[^ء-ي\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Build a few significant phrases (4+ consecutive words) from the user's matn
// to use as substring probes — robust to leading isnad the user may omit.
function buildProbes(matn: string): string[] {
  const words = normalizeArabic(matn).split(" ").filter((w) => w.length > 1);
  if (words.length < 3) return words.length ? [words.join(" ")] : [];
  const probes: string[] = [];
  const span = Math.min(6, words.length);
  for (let i = 0; i + span <= words.length && probes.length < 4; i += span) {
    probes.push(words.slice(i, i + span).join(" "));
  }
  // also the whole thing
  probes.push(words.join(" "));
  return probes;
}

async function groundInCorpus(matn: string): Promise<CorpusMatch[]> {
  if (!/[ء-ي]/.test(matn)) return []; // Arabic-only grounding
  const probes = buildProbes(matn);
  if (probes.length === 0) return [];

  const matches: CorpusMatch[] = [];

  await Promise.all(
    ARABIC_COLLECTIONS.map(async (col) => {
      try {
        const res = await fetch(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${col.slug}.min.json`,
          {
            headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
            next: { revalidate: 86400 },
            signal: AbortSignal.timeout(9000),
          },
        );
        if (!res.ok) return;
        const data = (await res.json()) as {
          hadiths?: Array<{ hadithnumber?: number; text?: string }>;
        };
        for (const h of data.hadiths ?? []) {
          if (!h.text) continue;
          const norm = normalizeArabic(h.text);
          if (probes.some((p) => p.length > 8 && norm.includes(p))) {
            matches.push({
              collection: col.name,
              reference: String(h.hadithnumber ?? ""),
              matnExcerpt: h.text.slice(0, 200),
              sourceUrl: `https://sunnah.com/${col.sunnahKey}:${h.hadithnumber ?? ""}`,
            });
            break; // one hit per collection is enough to anchor
          }
        }
      } catch {
        /* collection unreachable — skip, never fabricate */
      }
    }),
  );

  return matches;
}

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
  // Hoisted so the catch-block safety net can reuse them without re-reading the body.
  let hadithText = '';
  let corpusMatches: CorpusMatch[] = [];
  try {
    const body = await req.json();
    hadithText = typeof body.hadithText === 'string' ? body.hadithText : '';

    if (!hadithText || hadithText.trim().length === 0) {
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

    // ── Ground against the real Arabic corpus BEFORE the LLM ──
    // A verified match stops the model from defaulting to UNVERIFIABLE on famous,
    // authentic narrations, and gives the user a resolvable sunnah.com reference.
    corpusMatches = await groundInCorpus(hadithText.trim());
    const groundingBlock = corpusMatches.length
      ? `\n\nVERIFIED CORPUS MATCHES (found by exact matn lookup in the published collections — treat these as authoritative anchors, cite them, do NOT contradict their existence):\n${corpusMatches
          .map((m) => `- ${m.collection} #${m.reference} (${m.sourceUrl}) :: "${m.matnExcerpt}"`)
          .join("\n")}`
      : "";

    const userPrompt = `Analyze the following hadith text for authenticity and return ONLY a valid JSON object (no markdown, no code fences):

"""
${hadithText.trim()}
"""
${groundingBlock}

Provide a detailed authenticity analysis including: grade, arabicGrade, explanation, arabicExplanation, isnadAnalysis, collectionsFound (array), misattributed (bool), misattributionNote, scholarlyReferences (array), modernApplicationNote.${
      corpusMatches.length
        ? " The hadith WAS located in the canonical collection(s) listed above, so it is NOT UNVERIFIABLE on grounds of being unfindable — grade it on its merits and include those collections in collectionsFound."
        : ""
    }`;

    // ── PRIMARY: NVIDIA NIM with multi-layered system prompt ──
    const { data: nvidiaData, provider } = await nvidiaFirstGenerateJSON(userPrompt, {
      systemPrompt: hadithSystemPrompt,
      maxTokens: 1800,
      temperature: 0.15,
    });

    // Real, resolvable references derived from the corpus lookup — always shown.
    const corpusCollections = corpusMatches.map((m) => `${m.collection} #${m.reference}`);
    const corpusRefs = corpusMatches.map((m) => `${m.collection} #${m.reference} — ${m.sourceUrl}`);
    const mergedCollections = (extra: string[] = []) =>
      Array.from(new Set([...corpusCollections, ...extra]));
    const mergedRefs = (extra: string[] = []) =>
      Array.from(new Set([...corpusRefs, ...extra]));

    // Bukhari & Muslim enjoy scholarly consensus of authenticity (Sahihayn);
    // the four Sunan contain graded material, so locating a matn there confirms
    // existence but NOT a grade — we say "located in" without asserting Sahih.
    const inSahihayn = corpusMatches.some(
      (m) => m.collection === 'Sahih al-Bukhari' || m.collection === 'Sahih Muslim',
    );
    const groundedClassification = inSahihayn
      ? 'Sahih (in the Sahihayn)'
      : corpusMatches.length
        ? `Located in ${corpusMatches[0].collection} — see grade`
        : null;

    const nd = (nvidiaData ?? {}) as HadithLLMResponse;
    if (nvidiaData && (nd.grade || nd.explanation)) {
      // Map response to our enhanced format
      return NextResponse.json({
        success: true,
        provider,
        corpusMatches,
        analysis: {
          // If the corpus verified the matn, never downgrade to UNVERIFIABLE.
          classification:
            groundedClassification && (!nd.grade || nd.grade === 'UNVERIFIABLE')
              ? groundedClassification
              : nd.grade ?? 'UNVERIFIABLE',
          confidencePercent: corpusMatches.length ? Math.max(nd.confidencePercent ?? 70, 90) : nd.confidencePercent ?? 70,
          sourceBook: corpusMatches[0]?.collection ?? nd.collectionsFound?.[0] ?? 'See collectionsFound',
          hadithNumber: corpusMatches[0]?.reference ?? nd.hadithNumber ?? 'Unknown',
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
          // Extended fields — corpus-verified references merged in first.
          collectionsFound: mergedCollections(nd.collectionsFound ?? []),
          misattributed: nd.misattributed ?? false,
          misattributionNote: nd.misattributionNote ?? '',
          scholarlyReferences: mergedRefs(nd.scholarlyReferences ?? []),
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
${groundingBlock}

Provide a detailed authenticity analysis including classification, source book, narrator chain analysis, and scholar opinions.`,
      schema: HadithCheckSchema,
    });

    // Merge corpus-verified anchors into the fallback object too.
    const obj = result.object as z.infer<typeof HadithCheckSchema>;
    if (corpusMatches.length) {
      obj.sourceBook = corpusMatches[0].collection;
      obj.hadithNumber = corpusMatches[0].reference;
    }

    return NextResponse.json({
      success: true,
      provider: 'Gemini (fallback)',
      corpusMatches,
      analysis: obj,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[Hadith Check API] Error:', errorMessage);

    // Last-resort safety net: if both LLM paths failed but the matn WAS located in
    // the real corpus, still return that verified reference rather than a hard error.
    try {
      // Re-run grounding only if we never got to it (e.g. body parsed but LLM threw early).
      if (corpusMatches.length === 0 && hadithText.trim().length > 0) {
        corpusMatches = await groundInCorpus(hadithText.trim());
      }
      if (corpusMatches.length) {
        const inSahihayn = corpusMatches.some(
          (m) => m.collection === 'Sahih al-Bukhari' || m.collection === 'Sahih Muslim',
        );
        return NextResponse.json({
          success: true,
          provider: 'corpus-lookup (AI unavailable)',
          corpusMatches,
          analysis: {
            classification: inSahihayn ? 'Sahih (in the Sahihayn)' : `Located in ${corpusMatches[0].collection}`,
            confidencePercent: inSahihayn ? 95 : 75,
            sourceBook: corpusMatches[0].collection,
            hadithNumber: corpusMatches[0].reference,
            narratorChainAnalysis: { chainSummary: '', weakLinks: [], chainGrade: 'Unknown' },
            scholarOpinions: [],
            textAnalysis: 'AI grading temporarily unavailable; the text was located verbatim in the canonical collection(s) below.',
            arabicClassification: inSahihayn ? 'صحيح' : '',
            recommendation: 'Confirmed to exist in the cited collection. For a formal grade, consult Dar al-Ifta or Al-Azhar.',
            collectionsFound: corpusMatches.map((m) => `${m.collection} #${m.reference}`),
            misattributed: false,
            misattributionNote: '',
            scholarlyReferences: corpusMatches.map((m) => `${m.collection} #${m.reference} — ${m.sourceUrl}`),
            arabicExplanation: '',
            modernApplicationNote: '',
          },
        });
      }
    } catch {
      /* fall through to error */
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
