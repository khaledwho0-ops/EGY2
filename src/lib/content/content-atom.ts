/* ═══════════════════════════════════════════════════════════════
 * CONTENT ONE-LAW GATE (Gap 6) — a confident lesson with no source is the
 * same failure as a confident chatbot with no source. Every authored
 * "content atom" must carry ≥1 admissible (Tier S–C) source, and any
 * Islamic atom must carry an authentic hadith grade (§4: an ungraded /
 * weak hadith is the single worst violation). Reuses the same enforceOneLaw
 * that governs runtime AI output, so content and AI obey one law.
 * ═══════════════════════════════════════════════════════════════ */
import { z } from "zod";
import { enforceOneLaw } from "@/lib/ai/output-enforcer";

export const ContentAtomSchema = z.object({
  id: z.string().min(1),
  claim: z.object({ en: z.string().min(1), ar: z.string().min(1) }),
  sources: z.array(
    z.object({
      url: z.string().min(1),
      title: z.string().optional(),
      tier: z.enum(["S", "A", "B", "C", "U"]).optional(),
    }),
  ),
  layer: z.number().min(1).max(8).optional(),
  islamic: z.object({ hadithGrade: z.string().optional() }).optional(),
});
export type ContentAtom = z.infer<typeof ContentAtomSchema>;

const WEAK_GRADES = new Set(["da'if", "daif", "ضعيف", "mawdu'", "mawdu", "موضوع", "weak", "fabricated"]);

/** Validate one atom against the One Law + the Islamic Authenticity Protocol. */
export function validateAtom(input: unknown): { ok: boolean; reasons: string[] } {
  const parsed = ContentAtomSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, reasons: parsed.error.issues.map((i) => `${i.path.join(".") || "root"}: ${i.message}`) };
  }
  const atom = parsed.data;
  const reasons: string[] = [];

  const enf = enforceOneLaw(atom.sources.map((s) => ({ url: s.url, title: s.title, tier: s.tier })));
  if (enf.status !== "verified") {
    reasons.push("No admissible source (Tier S–C) — fails the One Law.");
  }

  if (atom.islamic) {
    const g = (atom.islamic.hadithGrade || "").trim().toLowerCase();
    if (!g) reasons.push("Islamic atom is missing hadithGrade (§4 — the single worst violation).");
    else if (WEAK_GRADES.has(g)) reasons.push(`Islamic atom cites a weak/fabricated hadith grade ("${atom.islamic.hadithGrade}").`);
  }

  return { ok: reasons.length === 0, reasons };
}
