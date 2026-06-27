import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth/passport";
import { appendDefense, getLedger, deriveMeters, type DefenseOutcome } from "@/lib/cognition/ledger";

export const runtime = "nodejs";

const OUTCOMES: DefenseOutcome[] = ["caught", "missed", "reviewed"];

async function uid(req: NextRequest): Promise<string | null> {
  return verifySession(req.cookies.get(SESSION_COOKIE)?.value);
}

/** GET /api/ledger → the user's immunity meters + recent events. */
export async function GET(req: NextRequest) {
  const userId = await uid(req);
  if (!userId) return NextResponse.json({ error: "no_passport" }, { status: 401 });
  const events = await getLedger(userId);
  return NextResponse.json({
    userId,
    count: events.length,
    meters: deriveMeters(events),
    recent: events.slice(-20),
  });
}

/** POST /api/ledger {surface, layer, outcome, technique?, confidenceBefore?, confidenceAfter?, sources?} */
export async function POST(req: NextRequest) {
  const userId = await uid(req);
  if (!userId) return NextResponse.json({ error: "no_passport" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (
    !body ||
    typeof body.surface !== "string" ||
    typeof body.layer !== "number" ||
    !OUTCOMES.includes(body.outcome)
  ) {
    return NextResponse.json(
      { error: "invalid_event", required: "surface (string), layer (1-8 number), outcome (caught|missed|reviewed)" },
      { status: 400 },
    );
  }

  const event = await appendDefense(userId, {
    surface: body.surface,
    layer: body.layer,
    technique: typeof body.technique === "string" ? body.technique : undefined,
    outcome: body.outcome,
    confidenceBefore: typeof body.confidenceBefore === "number" ? body.confidenceBefore : undefined,
    confidenceAfter: typeof body.confidenceAfter === "number" ? body.confidenceAfter : undefined,
    sources: Array.isArray(body.sources) ? body.sources.map(String) : undefined,
  });

  const events = await getLedger(userId);
  return NextResponse.json({ ok: true, event, meters: deriveMeters(events) });
}
