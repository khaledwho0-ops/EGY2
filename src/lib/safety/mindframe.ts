const FORBIDDEN = [
  // Method-detail patterns — Werther-effect risk
  /\b(hanging|hung\s+himself|hung\s+herself|overdose\s+on\s+\w+)\b/i,
  /\b\d+\s*(mg|tablets|pills)\s*(of\s+\w+)?\s*(which\s+)?(can|will)\s*(kill|cause death)\b/i,
  // Glamorization
  /\bcommitted suicide\b/i,                           // use "died by suicide"
  /\b(finally|peaceful|escape|release)\s+from\s+(pain|life|suffering)\b/i,
  // Sensational headlines
  /\bsuicide (epidemic|crisis|wave)\b/i,
];

const REQUIRED_PROXIMITY = {
  // Within ANY page mentioning suicide → must contain hotline within 300 chars
  trigger: /\b(suicide|self\.harm|self-harm|kill myself|انتحار|إيذاء النفس)\b/i,
  required: /\b(08008880700|Befrienders|IASP|hotline|الخط الساخن)\b/i,
};

export type MindframeResult = { ok: boolean; violations: string[]; };

export function mindframeAudit(content: string): MindframeResult {
  const violations: string[] = [];
  for (const rx of FORBIDDEN) if (rx.test(content)) violations.push(`forbidden:${rx.source}`);
  if (REQUIRED_PROXIMITY.trigger.test(content)) {
    // Walk 300 chars on each side of each trigger occurrence
    const idx = content.search(REQUIRED_PROXIMITY.trigger);
    const window = content.slice(Math.max(0, idx - 300), idx + 300);
    if (!REQUIRED_PROXIMITY.required.test(window)) {
      violations.push("missing_hotline_within_300_chars_of_trigger");
    }
  }
  return { ok: violations.length === 0, violations };
}

export class MindframeViolation extends Error {
  constructor(public violations: string[]) {
    super(`Mindframe gate failed: ${violations.join(",")}`);
  }
}
