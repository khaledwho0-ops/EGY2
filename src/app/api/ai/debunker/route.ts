import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import exifr from "exifr";
import { search } from "duck-duck-scrape";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { saveSnapshot } from "@/lib/provenance/wayback";
import { classifyTier } from "@/lib/standard/sources"; // canonical governed tier classifier — single source of truth

export const runtime = "nodejs"; // cheerio is not edge-safe; this is intentional
export const maxDuration = 60;   // give cheerio + DNS resolution time

const Body = z.object({
  claim: z.string().min(8).max(2000),
  evidenceUrl: z.string().url().optional(),
  imageBase64: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = Body.parse(json);
    const sanitized = DOMPurify.sanitize(body.claim);   // prompt-injection defense — see B.5

    // ── Step 1: Lateral search (best-effort — DDG often blocks scrapers) ──
    // A scraper block must degrade to "no sources → UNVERIFIED", never 400.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let top: any[] = [];
    try {
      const lateral = await search(`"${sanitized}" -site:facebook.com -site:twitter.com -site:x.com`);
      top = (lateral.results || []).slice(0, 6).filter((r) => /^https?:\/\//.test(r.url));
    } catch (e) {
      console.warn("[debunker] lateral search unavailable (DDG block?):", (e as Error)?.message);
      top = [];
    }

    // ── Step 2: Fetch + parse each candidate ───────────────────
    const sources = await Promise.allSettled(top.map(async (r) => {
      const html = await fetch(r.url, {
        headers: { "User-Agent": "CognitiveFortressBot/1.0 (+https://yourdomain/about-bot)" },
        signal: AbortSignal.timeout(8000),
      }).then(res => res.text());

      const $ = cheerio.load(html);
      return {
        url: r.url,
        title: $("title").text().trim(),
        author: $('meta[name="author"]').attr("content") || $('[itemprop="author"]').text().trim() || null,
        published: $('meta[property="article:published_time"]').attr("content") ||
                   $("time[datetime]").attr("datetime") || null,
        corrections: $('a[href*="corrections"], a[href*="correction-policy"]').length > 0,
        tier: classifyTier(r.url).tier,                  // canonical "S"|"A"|"B"|"C"|"U" (lib/standard/sources)
      };
    }));

    // ── Step 3: EXIF forensics (if image provided) ─────────────
    let imageForensics = null;
    if (body.imageBase64) {
      // Basic validation for base64
      const parts = body.imageBase64.split(",");
      const b64Data = parts.length === 2 ? parts[1] : parts[0];
      const buf = Buffer.from(b64Data, "base64");
      const exif = await exifr.parse(buf, { gps: true, exif: true } as any);
      imageForensics = {
        hasGps: Boolean(exif?.latitude),
        capturedAt: exif?.DateTimeOriginal ?? null,
        software: exif?.Software ?? null,        // "Adobe Photoshop" / "Midjourney" = signal
        gps: exif?.latitude ? { lat: exif.latitude, lon: exif.longitude } : null,
        // C2PA verification handled separately via @contentauth/c2pa — see B.6
      };
    }

    // ── Step 4: Archive snapshots of every cited source (Prohibition #4) ──
    const archived = await Promise.all(top.map(t => saveSnapshot(t.url)));

    // ═══ Step 6: AI VERDICT SYNTHESIS (rotator-backed) ═══
    const fulfilledSources = sources.filter(s => s.status === 'fulfilled').map((s: any) => s.value);

    // Reliable academic/fact sources (these never block) — the real evidence
    // backbone, alongside any best-effort web results from the lateral search.
    const { aggregateEvidence } = await import("@/lib/evidence/aggregate");
    const academic = await aggregateEvidence(sanitized, { max: 6, rerank: false }).catch(() => []);
    const academicSources = academic.map((r) => ({ title: r.title, url: r.url, tier: r.trustBand as string }));

    const sourcesSummary = [
      ...academicSources.map((s) => `- ${s.title} (Tier ${s.tier}) at ${s.url}`),
      ...fulfilledSources.slice(0, 4).map((s: any) => `- ${s.title} (Tier ${s.tier}) at ${s.url}`),
    ].join('\n');

    const { nvidiaFirstGenerateJSON } = await import('@/lib/ai/nvidia-first');
    const { data: verdict } = await nvidiaFirstGenerateJSON(
      `Claim to analyze: "${sanitized}"\n\nSources found:\n${sourcesSummary || 'No sources found'}\n\nReturn JSON: {"verdict":"DEBUNKED|MISLEADING|PARTIALLY_TRUE|UNVERIFIED|TRUE","confidence":0.0-1.0,"summary_en":"2-3 sentence verdict","summary_ar":"ملخص الحكم","truthSandwich":{"fact1":"First corrective fact","myth":"The claim restated","fact2":"Second corrective fact"},"topSource":{"url":"best source URL","tier":"tier level"},"fallaciesDetected":["fallacy1","fallacy2"]}`,
      { systemPrompt: 'You are a fact-checking AI. Analyze claims against sources and return ONLY valid JSON.', temperature: 0.2, maxTokens: 800 }
    );

    // ── Step 6b: ONE LAW — the AI verdict is only admissible if a real,
    //    whitelisted source (Tier S–C, canonical classifier) that we actually
    //    fetched backs it. Otherwise it is downgraded to UNVERIFIED and shown
    //    as such — never presented as fact. (src/lib/ai/output-enforcer) ──
    const { enforceOneLaw, applyVerdictEnforcement } = await import("@/lib/ai/output-enforcer");
    const enforcement = enforceOneLaw([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...academicSources.map((s) => ({ title: s.title, url: s.url, tier: s.tier as any })),
      ...fulfilledSources.map((s: any) => ({ title: s.title, url: s.url })),
    ]);
    const aiVerdict = applyVerdictEnforcement(verdict as Record<string, unknown> | null, enforcement);

    // Observability + Defense Ledger (passport users only; fire-and-forget).
    import("@/lib/obs/metrics").then(({ incr }) => incr("debunk")).catch(() => {});
    const { verifySession, SESSION_COOKIE } = await import("@/lib/auth/passport");
    const dbkUid = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
    if (dbkUid) {
      import("@/lib/cognition/ledger")
        .then(({ appendDefense }) =>
          appendDefense(dbkUid, {
            surface: "debunker",
            layer: 1,
            technique: "debunk",
            outcome: enforcement.status === "verified" ? "caught" : "reviewed",
            sources: enforcement.sources.map((s) => s.url),
          }),
        )
        .catch(() => {});
    }

    // ── Step 5: Return the EVIDENCE PACKET + AI Verdict ───────
    return NextResponse.json({
      sift: { stop: "Pause. What emotion did this claim trigger?",
              investigate: sources.filter(s => s.status === "fulfilled").map((s: any) => s.value),
              find: top.map(t => t.url),
              trace: archived,
              imageForensics },
      archivedAt: new Date().toISOString(),
      aiVerdict,
      enforcement: {
        status: enforcement.status,
        tier: enforcement.tierFloor,
        admissibleSources: enforcement.sources.length,
        reason: enforcement.reason,
        sources: enforcement.sources.slice(0, 6),
      },
    });
  } catch (error) {
    console.error("[debunker] error:", error);
    return NextResponse.json(
      { error: "Invalid payload or internal error", detail: String((error as Error)?.message ?? error).slice(0, 240) },
      { status: 400 },
    );
  }
}
