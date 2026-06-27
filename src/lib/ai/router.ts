import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

export type Task =
  | "verify"           // Layer-1/2/3 reasoning → needs depth
  | "fast_classify"    // FLICC technique recognition → needs latency
  | "embed"            // Pinecone embeddings → OpenAI text-embedding-3-small
  | "ar_tafsir"        // Arabic religious context → Google's strong AR
  | "safety";          // Mindframe pre-publish gate → deterministic

export function model(task: Task) {
  switch (task) {
    case "verify":        return openai("gpt-4o-2024-11-20");    // depth
    case "fast_classify": return groq("llama-3.3-70b-versatile"); // <200ms p50
    case "embed":         return openai.embedding("text-embedding-3-small"); // 1536 dims — matches Pinecone default
    case "ar_tafsir":     return google("gemini-2.0-flash-exp"); // strong AR
    case "safety":        return openai("gpt-4o-mini");           // deterministic + cheap
  }
}
