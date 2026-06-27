import { z } from "zod";

export const SunniSchools = z.enum(["HANAFI", "MALIKI", "SHAFII", "HANBALI"]);
export const ShiaSchools  = z.enum(["JAFARI", "ZAYDI"]);
export const OtherSchools = z.enum(["IBADI", "ZAHIRI", "ASHARI", "MATURIDI", "ATHARI", "SUFI"]);
export const Madhab = z.union([SunniSchools, ShiaSchools, OtherSchools]);

export const ReligionFrontmatter = z.object({
  madhahibConsulted: z.array(Madhab).min(3),
  // Per Amman Message: takfīr restricted across these schools
  ammanAlignment: z.literal(true),
  marrakeshAlignment: z.boolean().optional(),
  maqasidImpact: z.object({
    DIN: z.enum(["preserves","neutral","harms"]),     // faith
    NAFS: z.enum(["preserves","neutral","harms"]),    // life
    AQL: z.enum(["preserves","neutral","harms"]),     // intellect
    NASL: z.enum(["preserves","neutral","harms"]),    // lineage
    MAL: z.enum(["preserves","neutral","harms"]),     // wealth
  }),
  // Hadith pieces require chain grading
  hadith: z.object({
    isnadGrade: z.enum(["SAHIH","HASAN","DAIF","MAWDU"]).optional(),
    matnAnalysis: z.string().optional(),
    sources: z.array(z.object({ collection: z.string(), number: z.string() })).optional(),
  }).optional(),
  // We never issue fatwas
  fatwaWarning: z.literal(true),
  darAlIftaReferral: z.string().url().default("https://www.dar-alifta.org/en"),
});
