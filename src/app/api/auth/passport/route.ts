import { NextRequest, NextResponse } from "next/server";
import {
  createPassport,
  restorePassport,
  verifySession,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth/passport";

export const runtime = "nodejs";

/**
 * GET  /api/auth/passport         → { authenticated, userId }
 * POST /api/auth/passport {}      → create a new anonymous passport
 *                                   (returns recoveryKey ONCE, sets session cookie)
 * POST /api/auth/passport {recoveryKey} → restore an existing passport
 */
export async function GET(req: NextRequest) {
  const userId = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ authenticated: Boolean(userId), userId });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as Record<string, unknown>));

  // ── Restore path ──
  if (body && typeof body.recoveryKey === "string" && body.recoveryKey.trim()) {
    const restored = await restorePassport(body.recoveryKey.trim());
    if (!restored) {
      return NextResponse.json({ ok: false, error: "invalid_recovery_key" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true, restored: true, userId: restored.userId });
    res.cookies.set(SESSION_COOKIE, restored.token, sessionCookieOptions());
    return res;
  }

  // ── Create path ──
  const { userId, recoveryKey, token } = await createPassport();
  import("@/lib/obs/metrics").then(({ incr }) => incr("passport.create")).catch(() => {});
  const res = NextResponse.json({
    ok: true,
    created: true,
    userId,
    recoveryKey,
    note: "Save this recovery key — it restores your passport on another device. It is shown only once.",
  });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
