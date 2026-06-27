import { NextRequest, NextResponse } from "next/server";
import { kvStore } from "@/lib/db/kv-store";
import { AbuseLogEntry } from "@/lib/safety/abuse-logger";

/**
 * POST /api/safety/alert
 *
 * Receives a critical AbuseLogEntry from the client (triggerAdminAlert) and
 * persists it server-side under the 'safety:alerts' key in kvStore so a
 * supervisor can retrieve it.  No analytics, no public counters.
 */

export const runtime = "nodejs"; // NOT edge — we want auditable server logs
export const dynamic = "force-dynamic";

const KV_KEY = "safety:alerts";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const entry: AbuseLogEntry = await req.json();

    // Validate minimum required fields before persisting
    if (!entry?.id || !entry?.severity || !entry?.violationType) {
      return NextResponse.json({ error: "Invalid alert payload" }, { status: 400 });
    }

    // Append to existing alerts list stored in kvStore
    const existing: AbuseLogEntry[] = (await kvStore.get<AbuseLogEntry[]>(KV_KEY)) ?? [];
    existing.push(entry);
    // Retain last 500 critical alerts maximum to bound storage
    const trimmed = existing.length > 500 ? existing.slice(existing.length - 500) : existing;
    await kvStore.set<AbuseLogEntry[]>(KV_KEY, trimmed);

    console.log(`[SAFETY ALERT STORED] id=${entry.id} severity=${entry.severity} type=${entry.violationType}`);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[Safety Alert Route] Failed to persist alert:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
