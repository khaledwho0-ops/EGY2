import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/forensic/ocr — multipart form, field "file" = an image.
 * OCRs the image (eng+ara), then runs the extracted claim text through the
 * One-Law verification pipeline. The flagship "check the screenshot" feature:
 * paste/upload a viral image → real cited verdict, or UNVERIFIED.
 */
export async function POST(req: Request) {
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json({ ok: false, error: "Send multipart/form-data with a 'file' field (an image)." }, { status: 415 });
    }
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No image provided (field 'file')." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Image exceeds 10MB." }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const { ocrImage } = await import("@/lib/forensics/ocr");
    const text = await ocrImage(buffer);

    if (!text) {
      return NextResponse.json({ ok: true, text: "", note: "No readable text detected in the image." });
    }

    // Run the extracted claim through the One-Law pipeline.
    const { runVerificationPipeline } = await import("@/lib/pipeline/verify");
    const v = await runVerificationPipeline(text.slice(0, 600), { max: 6 });

    return NextResponse.json({
      ok: true,
      text,
      enforcement: {
        status: v.enforcement.status,
        tier: v.enforcement.tierFloor,
        admissibleSources: v.admissible.length,
        reason: v.enforcement.reason,
      },
      sources: v.admissible.slice(0, 6).map((s) => ({ url: s.url, tier: s.tier, title: s.title })),
    });
  } catch (e) {
    const msg = (e as Error)?.message || "OCR failed";
    // Cold-start init/recognition timed out → fail loud with a structured 503
    // instead of hanging into a 504. One-Law: never fabricate OCR text.
    if (msg.startsWith("OCR_TIMEOUT")) {
      return NextResponse.json(
        { ok: false, error: "OCR_UNAVAILABLE", detail: "OCR engine could not initialize in time. Please try again." },
        { status: 503 }
      );
    }
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
