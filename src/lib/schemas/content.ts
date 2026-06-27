import { z } from "zod";
import { ReligionFrontmatter } from "./religion";

export const SourceTier = z.enum(["S", "1", "2", "3", "4", "5"]);

export const CitationSchema = z.object({
  text: z.string().min(8),
  url: z.string().url(),
  tier: SourceTier,                                   // Pyramid placement
  archivedUrl: z.string().url(),                      // Wayback snapshot — mandatory
  archivedAt: z.string().datetime(),
  accessedAt: z.string().datetime(),
});

export const ReviewerSchema = z.object({
  name: z.string().min(2),
  credentials: z.string(),                            // "MD, Psychiatrist, Egyptian Medical Syndicate #123456"
  affiliation: z.string(),
  reviewedAt: z.string().datetime(),
  scope: z.enum(["editorial", "clinical", "religious", "accessibility", "legal"]),
});

export const ContentFrontmatter = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  engine: z.enum(["deepreal", "mental-health", "religion"]),
  lang: z.enum(["en", "ar"]).default("en"),
  title: z.object({ en: z.string(), ar: z.string() }),  // i18n at the source
  // Standards binding (Part 1 of research)
  standards: z.array(z.enum([
    "IFCN", "UNESCO_MIL", "STANFORD_COR", "SIFT", "FLICC",
    "WHO_MHGAP", "DSM5TR", "ICD11", "MINDFRAME", "SAMARITANS",
    "WASATIYYA", "MAQASID", "AMMAN", "MARRAKESH",
    "C2PA", "PAI_SYNTHETIC", "WCAG22_AA",
  ])),
  // Cognitive metadata
  layersCovered: z.array(z.enum(["L1","L2","L3","L4","L5","L6","L7","UNKNOWN"])),
  competencies: z.array(z.string()),                    // Maps to 12 DeepReal / 10 MH / 6 Religion
  // Engine-specific (discriminated)
  clinical: z.object({
    dsm5trCode: z.string().optional(),
    icd11Code: z.string().optional(),
    mhgapModule: z.enum(["DEP","PSY","BPD","EPI","CMH","DEM","SUB","SUI","OTH"]).optional(),
  }).optional(),
  religious: ReligionFrontmatter.optional(),
  // Quality gates (Parts 3.6 / 4.6 / 5.7 of research)
  reviewers: z.array(ReviewerSchema).min(1),
  citations: z.array(CitationSchema).min(1),
  lastReviewedAt: z.string().datetime(),
  nextReviewDueAt: z.string().datetime(),               // Annual review enforcement
  correctionsLog: z.array(z.object({
    at: z.string().datetime(), by: z.string(), summary: z.string(),
  })).default([]),
}).superRefine((data, ctx) => {
  if (data.engine === "mental-health") {
    if (!data.clinical) {
      ctx.addIssue({ code: "custom", message: "Mental health content requires DSM-5-TR + ICD-11 + mhGAP codes" });
    }
    if (data.reviewers.length < 2) {
      ctx.addIssue({ code: "custom", message: "Mental health content requires at least two named clinicians as reviewers" });
    }
  }
  if (data.engine === "religion" && !data.religious) {
    ctx.addIssue({ code: "custom", message: "Religion content requires madhāhib + Maqāṣid metadata (Three-School Rule)" });
  }
});

export type ContentFrontmatter = z.infer<typeof ContentFrontmatter>;
export const ConditionFrontmatter = ContentFrontmatter;

