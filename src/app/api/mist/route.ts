import { NextRequest, NextResponse } from "next/server";
import { kvStore } from "@/lib/db/kv-store";
import { MistSubmission, scoreMIST } from "@/lib/cognition/mist";

export async function POST(req: NextRequest) {
  try {
    const uid = req.headers.get("x-uid") || "anon:unknown";
    const body = MistSubmission.parse(await req.json());
    const score = scoreMIST(body);

    // Persist baseline + history for VCSA (research Part 10).
    // kvStore (KV in prod, local-FS in dev) — no more raw-kv 500 without KV.
    const history = (await kvStore.get<Array<Record<string, unknown>>>(`mist:${uid}`)) || [];
    history.unshift({ ...score, at: body.finishedAt });
    await kvStore.set(`mist:${uid}`, history.slice(0, 100));
    await kvStore.set(`mist:${uid}:latest`, score);

    // Drive personalized path
    const topGap = Object.entries(score.missedByType).sort((a, b) => b[1] - a[1])[0]?.[0];
    const recommendation = topGap
      ? `Start with the FLICC-${topGap} micro-lesson series — that's your largest gap.`
      : "Begin with Stage 1 — Source Pyramid.";

    return NextResponse.json({ score, recommendation });
  } catch (err) {
    return NextResponse.json({ error: "Invalid submission payload" }, { status: 400 });
  }
}
