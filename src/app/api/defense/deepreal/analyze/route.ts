import { NextResponse } from 'next/server';
import exifr from 'exifr';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

export const runtime = 'nodejs';

/* DeepReal forensic analysis.
 * ALWAYS-real layer: EXIF metadata via exifr (no key needed).
 * Optional layer: Sightengine deepfake detection (needs SIGHTENGINE keys) — a WEAK
 * signal (open/commercial detectors are unreliable on compressed in-the-wild media),
 * so it is reported as a signal, never an absolute verdict. No fabricated scores. */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'File exceeds 10MB limit.' }, { status: 400 });

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!validMimeTypes.includes(file.type)) return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });

    // ── REAL metadata layer (exifr) — always runs, no key required ──
    const buffer = Buffer.from(await file.arrayBuffer());
    let exif: any = null;
    try { exif = await exifr.parse(buffer, { gps: true, exif: true, ifd0: true } as any); } catch { exif = null; }
    const metadata = exif
      ? {
          hasExif: true,
          make: exif.Make ?? null,
          model: exif.Model ?? null,
          software: exif.Software ?? null,         // "Adobe Photoshop"/"Midjourney" = edit/AI signal
          dateTimeOriginal: exif.DateTimeOriginal ? String(exif.DateTimeOriginal) : null,
          gps: exif.latitude ? { lat: exif.latitude, lon: exif.longitude } : null,
        }
      : { hasExif: false };
    // Honest interpretation of the real metadata (no fabrication)
    const metadataSignals: string[] = [];
    if (!metadata.hasExif) metadataSignals.push('No EXIF metadata — stripped by a platform, a screenshot, or AI-generated. Neutral, not proof of fakery.');
    if (metadata.hasExif && metadata.software && /photoshop|gimp|lightroom|snapseed|facetune|midjourney|dall|stable|firefly/i.test(metadata.software)) metadataSignals.push(`Editing/AI software in metadata: ${metadata.software}.`);
    if (metadata.hasExif && metadata.gps) metadataSignals.push(`GPS present: ${metadata.gps.lat?.toFixed?.(4)}, ${metadata.gps.lon?.toFixed?.(4)}.`);
    if (metadata.hasExif && metadata.make) metadataSignals.push(`Camera: ${[metadata.make, metadata.model].filter(Boolean).join(' ')}.`);

    // ── Optional deepfake layer (Sightengine) ──
    const apiUser = process.env.SIGHTENGINE_API_USER;
    const apiSecret = process.env.SIGHTENGINE_API_SECRET;

    if (!apiUser || !apiSecret) {
      // HONEST fallback — no fabricated scores. Real EXIF still returned.
      return NextResponse.json({
        success: true,
        deepfakeAvailable: false,
        metadata,
        metadataSignals,
        note: 'AI/deepfake detection is offline (no SIGHTENGINE key). EXIF metadata above is real; treat absence of detection as inconclusive, never as "authentic".',
      });
    }

    const se = new FormData();
    se.append('media', file);
    se.append('models', 'deepfake,genai');
    se.append('api_user', apiUser);
    se.append('api_secret', apiSecret);
    // Hard timeout so the external multimodal detector fails loud instead of hanging the route.
    const response = await fetch('https://api.sightengine.com/1.0/check.json', { method: 'POST', body: se, signal: AbortSignal.timeout(12000) });
    if (!response.ok) {
      const errorText = await response.text();
      let msg = errorText;
      try { const p = JSON.parse(errorText); msg = p.message || p.error?.message || errorText; } catch {}
      throw new Error(`Sightengine Error (${response.status}): ${msg}`);
    }
    const data = await response.json();

    const deepfakeScore = data?.type?.deepfake ?? 0;
    const syntheticScore = data?.type?.ai_generated ?? data?.type?.synthetic ?? 0;
    const { data: aiAnalysis } = await nvidiaFirstGenerateJSON(
      `A media file was analyzed. Real EXIF metadata signals: ${metadataSignals.join(' ') || 'none'}.
Deepfake detection scores (NOTE: these detectors are unreliable on compressed in-the-wild media — treat as a weak signal, not proof):
- Deepfake: ${(deepfakeScore * 100).toFixed(1)}%
- AI-generated/synthetic: ${(syntheticScore * 100).toFixed(1)}%

Return ONLY valid JSON:
{
  "verdict": "AUTHENTIC|INCONCLUSIVE|SUSPICIOUS|LIKELY_FAKE",
  "verdictAr": "أصيل|غير حاسم|مشبوه|مزيف على الأرجح",
  "confidence": 0.0-1.0,
  "explanation_en": "2-3 sentences combining the EXIF signals and the (weak) detection score. Be honest about uncertainty — never claim certainty from the detector alone.",
  "explanation_ar": "شرح بالعربية في جملتين أو ثلاث، صادق بشأن عدم اليقين",
  "actionItems": ["concrete next step like reverse-image search or check C2PA"],
  "riskLevel": "low|medium|high"
}`,
      { systemPrompt: 'You are a careful media-forensics analyst. Deepfake detectors are weak signals; never assert certainty from them. Return ONLY valid JSON.', temperature: 0.15, maxTokens: 600 },
    );

    return NextResponse.json({
      success: true,
      deepfakeAvailable: true,
      detection: data?.type ?? null,
      metadata,
      metadataSignals,
      aiIntelligence: aiAnalysis,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
