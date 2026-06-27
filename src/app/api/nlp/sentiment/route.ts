import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

async function analyze(text: string) {
  const { analyzeSentiment, getSentimentBadge } = await import("@/lib/nlp/sentiment-engine");
  const result = analyzeSentiment(text.trim().slice(0, 2000));
  const badge = getSentimentBadge(result);
  return { sentiment: result, badge };
}

const NEUTRAL_FALLBACK = {
  sentiment: {
    label: "neutral" as const, compound: 0, positive: 0, negative: 0, neutral: 1,
    manipulationScore: 0, vIntentScore: 0, emotionalTriggers: [], persuasionPatterns: [],
    topContributors: [], entities: [], tokenCount: 0, readabilityGrade: 0,
    crisisDetected: false, crisisConfidence: 0,
  },
  badge: { label: "Low emotional load", color: "var(--color-success)", bg: "rgba(16,185,129,0.12)", icon: "=" },
};

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }
    return NextResponse.json(await analyze(text));
  } catch (err) {
    console.error("[sentiment-api] POST error:", err);
    return NextResponse.json(NEUTRAL_FALLBACK);
  }
}

export async function GET(request: NextRequest) {
  try {
    const text = request.nextUrl.searchParams.get("text") || request.nextUrl.searchParams.get("q");
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text or q query parameter required" }, { status: 400 });
    }
    return NextResponse.json(await analyze(text));
  } catch (err) {
    console.error("[sentiment-api] GET error:", err);
    return NextResponse.json(NEUTRAL_FALLBACK);
  }
}
