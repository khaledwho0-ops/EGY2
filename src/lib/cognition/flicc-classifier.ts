import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";
import vader from "vader-sentiment";
import { generateObject } from "ai";
import { model as routedModel } from "@/lib/ai/router";
import { z } from "zod";
import { kv } from "@vercel/kv";

const nlp = winkNLP(model);
const its = nlp.its;

const ClassificationSchema = z.object({
  flicc: z.array(z.enum(["F","L","I","C","Cn","NONE"])),
  layer: z.enum(["L1","L2","L3","L4","L5","L6","L7","NONE"]),
  confidence: z.number().min(0).max(1),
  signatures: z.array(z.string()),
  redFlags: z.array(z.string()),
  affectScore: z.number().min(-1).max(1),
  readabilityFres: z.number(),
});

type ClassificationResult = z.infer<typeof ClassificationSchema> & { source: "deterministic" | "llm" | "cache" };

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function classifyClaim(text: string): Promise<ClassificationResult> {
  // ───── KV Cache Check (24h) ─────
  const textHash = await sha256(text);
  const cacheKey = `flicc:cache:${textHash}`;
  const cached = await kv.get<ClassificationResult>(cacheKey);
  
  if (cached) {
    return { ...cached, source: "cache" };
  }

  // ───── Pass 1: deterministic ─────
  const doc = nlp.readDoc(text);
  const fres = (doc.out(its.readabilityStats) as any).fres ?? 60;
  const sentiment = (vader.SentimentIntensityAnalyzer as any).polarity_scores(text);
  // tokens computation available for extension if needed
  // const tokens = doc.tokens().out();

  // Heuristic signatures (extend in production with a YAML lexicon reviewed by editors)
  const signatures: string[] = [];
  if (/\bthey don'?t want you to know\b/i.test(text)) signatures.push("Cn:self_sealing");
  if (/\b(100%|never|always|all|every)\b/i.test(text) && fres < 30) signatures.push("F:absolutism");
  if (/\b(study|research|scientists)\b/i.test(text) && !/\b(doi|journal|published|peer.?reviewed)\b/i.test(text))
    signatures.push("F:vague_authority");
  if (sentiment.compound < -0.6 || sentiment.compound > 0.8) signatures.push("L:affect_loaded");

  // If deterministic pass is confident enough, skip LLM
  if (signatures.length >= 2) {
    const result: ClassificationResult = {
      flicc: signatures.map(s => s.split(":")[0]) as any,
      layer: signatures.includes("Cn:self_sealing") ? "L6" : "L2",
      confidence: 0.75,
      signatures, 
      redFlags: signatures,
      affectScore: sentiment.compound,
      readabilityFres: fres,
      source: "deterministic",
    };
    
    await kv.set(cacheKey, result, { ex: 86400 });
    return result;
  }

  // ───── Pass 2: LLM structured-object call (only when needed) ─────
  const { object } = await generateObject({
    model: routedModel("fast_classify") as any,
    schema: ClassificationSchema,
    prompt: `Classify the following claim using the FLICC taxonomy by John Cook
and the 7-layer deception model. Be conservative. Only flag layers you have evidence for.

Claim: """${text}"""

Pre-computed signals:
- Readability FRES: ${fres}
- VADER compound sentiment: ${sentiment.compound}
- Deterministic signatures: ${signatures.join(", ") || "none"}
`,
  });

  const finalResult: ClassificationResult = { ...object, source: "llm" };
  await kv.set(cacheKey, finalResult, { ex: 86400 });
  
  return finalResult;
}
