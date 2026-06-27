import { z } from "zod";

// Use the published 20-item MIST set under the article's CC license.
// Each item: { id, headline, isReal: boolean, distractorType?: "F"|"L"|"I"|"C"|"Cn" }
import MIST_ITEMS from "./mist-items-2023.json";    // canonical set, version-locked

export const MistAnswer = z.object({ id: z.string(), answer: z.enum(["real","fake","unsure"]) });
export const MistSubmission = z.object({
  answers: z.array(MistAnswer).length(20),
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime(),
});

export function scoreMIST(submission: z.infer<typeof MistSubmission>) {
  let real_hits = 0, fake_hits = 0, real_total = 0, fake_total = 0;
  
  for (const item of MIST_ITEMS) {
    const ans = submission.answers.find(a => a.id === item.id);
    if (!ans) continue;
    if (item.isReal) { 
      real_total++; 
      if (ans.answer === "real") real_hits++; 
    } else { 
      fake_total++; 
      if (ans.answer === "fake") fake_hits++; 
    }
  }
  
  const veracityDiscernment = real_hits + fake_hits;       // 0-20
  const realNewsBias   = (real_total > 0 && fake_total > 0) ? (real_hits / real_total - fake_hits / fake_total) : 0;  // distrust vs naïveté
  const fakeNewsAccept = fake_total > 0 ? ((fake_total - fake_hits) / fake_total) : 0;            // gullibility
  
  // Vulnerability profile: which FLICC category did they miss most?
  const missedByType: Record<string, number> = {};
  for (const item of MIST_ITEMS) {
    if (!item.isReal && item.distractorType) {
      const ans = submission.answers.find(a => a.id === item.id);
      if (ans?.answer !== "fake") missedByType[item.distractorType] = (missedByType[item.distractorType] ?? 0) + 1;
    }
  }
  
  return { veracityDiscernment, realNewsBias, fakeNewsAccept, missedByType };
}
