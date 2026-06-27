import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/passport";
import { kvStore } from "@/lib/db/kv-store";
import { sm2, type Card } from "@/lib/cognition/sm2";

/* Spaced-Repetition Scheduler — now REAL (Keystone 1). The pure SM-2 in
 * lib/cognition/sm2.ts existed but nothing called it; this wires it to the
 * passport userId via kvStore so inoculation boosters are actually scheduled
 * (one-shot inoculation decays — the cognition science requires re-tests). */

export const runtime = "nodejs";

const srsKey = (userId: string) => `srs:${userId}`;

async function uid(req: NextRequest): Promise<string | null> {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

function freshCard(cardId: string): Card {
  return { cardId, ease: 2.5, interval: 0, repetitions: 0, due: new Date().toISOString() };
}

/** GET /api/srs → cards due for review now. */
export async function GET(req: NextRequest) {
  const userId = await uid(req);
  if (!userId) return NextResponse.json({ error: "no_passport" }, { status: 401 });
  const cards = (await kvStore.get<Record<string, Card>>(srsKey(userId))) || {};
  const now = Date.now();
  const due = Object.values(cards).filter((c) => new Date(c.due).getTime() <= now);
  return NextResponse.json({ userId, total: Object.keys(cards).length, dueCount: due.length, due });
}

/** POST /api/srs {cardId, quality 0-5} → run SM-2, persist, return next review. */
export async function POST(req: NextRequest) {
  const userId = await uid(req);
  if (!userId) return NextResponse.json({ error: "no_passport" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const cardId = body?.cardId;
  const quality = body?.quality;
  if (typeof cardId !== "string" || typeof quality !== "number" || quality < 0 || quality > 5) {
    return NextResponse.json({ error: "invalid", required: "cardId (string), quality (0-5)" }, { status: 400 });
  }

  const cards = (await kvStore.get<Record<string, Card>>(srsKey(userId))) || {};
  const card = cards[cardId] || freshCard(cardId);
  const updated = sm2(card, Math.round(quality) as 0 | 1 | 2 | 3 | 4 | 5);
  cards[cardId] = updated;
  await kvStore.set(srsKey(userId), cards);

  return NextResponse.json({ ok: true, card: updated, nextReview: updated.due });
}
