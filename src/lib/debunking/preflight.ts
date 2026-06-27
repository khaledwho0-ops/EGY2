import { classifyEgyptianContext } from "./classifier";
import { EgyptianContextVector } from "./egy-data";
import { isUrl, extractUrlContent } from "./workers/url-extractor";

// Interfaces
export interface PreflightContext {
  originalText: string;
  normalizedText: string;
  /**
   * The Egyptian context vector for this claim.
   * When `vectorDegraded` is true this falls back to a safe default
   * ("WhatsApp Family Medical Panic") — downstream code should check
   * `vectorDegraded` before relying on routing decisions.
   */
  vector: EgyptianContextVector;
  /** True when the classifier could not produce a real result. */
  vectorDegraded: boolean;
  isRedDirectPanic: boolean;
  isUrlInput: boolean;
  extractedTitle?: string;
  sourceUrl?: string;
}

/**
 * 1. Arabic Normalization
 * Translates Egyptian slang to formal MSA/English for API searchability.
 */
function normalizeArabicSlang(text: string): string {
  // Replace common Egyptian slang with MSA equivalents
  const normalized = text
    .replace(/عشان/g, "لأن")
    .replace(/إزاي/g, "كيف")
    .replace(/فين/g, "أين")
    .replace(/إيه/g, "ماذا")
    .replace(/كدة/g, "هكذا")
    .replace(/دلوقتي/g, "الآن")
    .replace(/بكرة/g, "غداً");
    
  // Further NLP normalization would be hooked in here (e.g., AraBERT)
  return normalized;
}

/**
 * 2. Panic / Toxicity Check
 * Detects acute danger indicating immediate intervention (Red-Direct Protocol).
 */
function checkRedDirectPanic(text: string): boolean {
  const panicKeywords = ["أنتحر", "هموت نفسي", "انتحار", "سم", "قتل", "قنبلة", "تفجير"];
  return panicKeywords.some(keyword => text.includes(keyword));
}

/**
 * Main Pre-Flight Routing Pipeline
 */
export async function runPreflight(rawText: string): Promise<PreflightContext> {
  let textForProcessing = rawText;
  let isUrlInput = false;
  let extractedTitle: string | undefined;
  let sourceUrl: string | undefined;

  // URL detection and extraction branch
  if (isUrl(rawText)) {
    isUrlInput = true;
    const extracted = await extractUrlContent(rawText);
    textForProcessing = extracted.content;
    extractedTitle = extracted.title;
    sourceUrl = extracted.sourceUrl;
  }

  // Always run the Arabic normalizer on whatever text we ended up with
  const normalizedText = normalizeArabicSlang(textForProcessing);
  const isRedDirectPanic = checkRedDirectPanic(normalizedText);

  // Use the genuine classifier; branch on degraded sentinel
  const classificationResult = await classifyEgyptianContext(normalizedText);
  // Explicit if/else so TypeScript's discriminant narrowing works on the union
  let vector: EgyptianContextVector;
  let vectorDegraded: boolean;
  if (classificationResult.degraded) {
    // Safe fallback: broad default rather than a misleading specific label
    vector = "WhatsApp Family Medical Panic";
    vectorDegraded = true;
  } else {
    vector = classificationResult.vector;
    vectorDegraded = false;
  }

  return {
    originalText: rawText,
    normalizedText,
    vector,
    vectorDegraded,
    isRedDirectPanic,
    isUrlInput,
    extractedTitle,
    sourceUrl,
  };
}
