import { z } from "zod";
import { EgyptianContextVectorSchema, EgyptianContextVector } from './egy-data';
import { rotatingGenerateObject } from "./gemini-rotator";

/**
 * Discriminated union so callers can distinguish a real classification from
 * a degraded fallback.  When `degraded` is true the `vector` field is absent
 * and downstream code (e.g. preflight.ts) must branch accordingly rather than
 * silently routing on a mislabelled vector.
 */
export type ClassificationResult =
  | { degraded: false; vector: EgyptianContextVector }
  | { degraded: true; error: string };

export async function classifyEgyptianContext(
  claim: string
): Promise<ClassificationResult> {
  try {
    const { object } = await rotatingGenerateObject({
      schema: z.object({
        vector: EgyptianContextVectorSchema
      }),
      prompt: `Classify the following claim into the most appropriate Egyptian context vector.\nClaim: "${claim}"`,
    });

    return { degraded: false, vector: object.vector };
  } catch (error) {
    console.warn("[Classifier] Classification failed — returning degraded sentinel:", error);
    return {
      degraded: true,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
