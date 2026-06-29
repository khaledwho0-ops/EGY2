import { NextResponse } from "next/server";
import type { ForensicFinding } from "@/lib/ai/forensic-analysis";

export async function POST(request: Request) {
  try {
    // Requires multipart/form-data. A non-multipart body (e.g. JSON) makes
    // formData() throw — return a structured 400 rather than a generic 500.
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { error: "Expected multipart/form-data with a 'file' or 'url' field." },
        { status: 400 }
      );
    }
    const file = formData.get("file");
    const url = formData.get("url");

    let buffer: ArrayBuffer | null = null;
    let filename = "unknown";

    if (file instanceof File) {
      buffer = await file.arrayBuffer();
      filename = file.name;
    } else if (typeof url === "string" && url.trim()) {
      // FIX (Pattern B): bound the self-initiated URL fetch so a slow/hanging remote host fails fast instead of stalling the route.
      const res = await fetch(url, {
        headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        return NextResponse.json({ error: `Failed to fetch image: ${res.status}` }, { status: 400 });
      }
      buffer = await res.arrayBuffer();
      filename = url.split("/").pop() || "url-image";
    }

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
    }

    const start = Date.now();
    const findings: ForensicFinding[] = [];
    let manipulationScore = 0;

    // ─── LAYER 1: Metadata Analysis via exifr ───
    const exifr = await import("exifr");
    const exifData = await exifr.parse(Buffer.from(buffer), true).catch(() => null);

    const software = exifData?.Software || exifData?.software || null;
    const make = exifData?.Make || exifData?.make || null;
    const model = exifData?.Model || exifData?.model || null;

    if (software && /photoshop|gimp|lightroom|snapseed|canva|pixlr|affinity|paint\.net/i.test(software)) {
      findings.push({
        category: "Editing Software Detected",
        description: `Image was processed with "${software}". Professional editing tools can alter visual content significantly.`,
        severity: "warning",
      });
      manipulationScore += 30;
    }

    if (!make && !model) {
      findings.push({
        category: "Missing Device Info",
        description: "No camera/device information found in EXIF data. Metadata may have been stripped, which is common in screenshots, social media re-uploads, or deliberately sanitized images.",
        severity: "warning",
      });
      manipulationScore += 15;
    } else {
      findings.push({
        category: "Device Identified",
        description: `Captured with: ${[make, model].filter(Boolean).join(" ")}`,
        severity: "info",
      });
    }

    const dateOriginal = exifData?.DateTimeOriginal || exifData?.CreateDate || null;
    const dateModified = exifData?.ModifyDate || exifData?.DateTime || null;

    if (dateOriginal && dateModified) {
      const diffMs = Math.abs(new Date(dateModified).getTime() - new Date(dateOriginal).getTime());
      const diffDays = Math.round(diffMs / 86400000);
      if (diffDays > 1) {
        findings.push({
          category: "Timestamp Gap",
          description: `Image was modified ${diffDays} days after original capture. This may indicate post-processing edits.`,
          severity: "warning",
        });
        manipulationScore += 15;
      }
    }

    // ─── LAYER 2: File Structure Analysis ───
    const bytes = new Uint8Array(buffer);

    // Check JPEG markers
    const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8;
    const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
    const isWebP = bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;

    const detectedFormat = isJPEG ? "JPEG" : isPNG ? "PNG" : isWebP ? "WebP" : "Unknown";

    findings.push({
      category: "File Format",
      description: `Detected format: ${detectedFormat} (${(buffer.byteLength / 1024).toFixed(1)} KB)`,
      severity: "info",
    });

    // JPEG quality estimation via quantization table analysis
    if (isJPEG) {
      // Search for DQT marker (0xFF 0xDB)
      let compressionNote = "";
      for (let i = 0; i < Math.min(bytes.length - 2, 1000); i++) {
        if (bytes[i] === 0xFF && bytes[i + 1] === 0xDB) {
          // Found quantization table — check first few values
          const tableStart = i + 5; // Skip marker + length + table ID
          if (tableStart + 10 < bytes.length) {
            const avgQuant = (bytes[tableStart] + bytes[tableStart + 1] + bytes[tableStart + 2] + bytes[tableStart + 3] + bytes[tableStart + 4]) / 5;
            if (avgQuant > 10) {
              compressionNote = `High compression detected (avg quantization: ${avgQuant.toFixed(0)}). Multiple re-saves degrade quality.`;
              manipulationScore += 10;
            } else {
              compressionNote = `Low compression (avg quantization: ${avgQuant.toFixed(0)}). Image likely close to original quality.`;
            }
          }
          break;
        }
      }

      if (compressionNote) {
        findings.push({
          category: "JPEG Compression Analysis",
          description: compressionNote,
          severity: manipulationScore > 25 ? "warning" : "info",
        });
      }

      // Double JPEG detection: check for multiple SOI markers
      let soiCount = 0;
      for (let i = 0; i < bytes.length - 1; i++) {
        if (bytes[i] === 0xFF && bytes[i + 1] === 0xD8) soiCount++;
      }
      if (soiCount > 1) {
        findings.push({
          category: "Double JPEG Detected",
          description: `Found ${soiCount} JPEG start-of-image markers. This indicates the image was re-saved or re-compressed, which can mask editing artifacts.`,
          severity: "warning",
        });
        manipulationScore += 20;
      }
    }

    // ─── LAYER 3: Filename Heuristics ───
    const suspiciousFilename = /edit|photoshop|modified|fake|viral|breaking|urgent|deepfake/i.test(filename);
    if (suspiciousFilename) {
      findings.push({
        category: "Filename Alert",
        description: `The filename "${filename}" contains terms associated with edited or viral content.`,
        severity: "warning",
      });
      manipulationScore += 10;
    }

    // ─── LAYER 4: AI Vision Analysis (NVIDIA NIM → Gemini fallback) ───
    const nvidiaKey = process.env.NVIDIA_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    let aiVisionUsed = false;

    // Try NVIDIA NIM first (primary provider)
    if (nvidiaKey && buffer.byteLength < 4 * 1024 * 1024 && !aiVisionUsed) {
      try {
        const base64 = Buffer.from(buffer).toString("base64");
        const mimeType = isJPEG ? "image/jpeg" : isPNG ? "image/png" : isWebP ? "image/webp" : "image/jpeg";

        // FIX (Pattern A/B): NVIDIA 550B streams slowly and can hang 30s+; bound it with a hard timeout so it fails loud and the Gemini multimodal fallback path can run. Model is NOT swapped — this is a text-only metadata call and the vision fallback below stays intact.
        const nvidiaRes = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: "POST",
          signal: AbortSignal.timeout(8000),
          headers: {
            Authorization: `Bearer ${nvidiaKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "nvidia/nemotron-3-ultra-550b-a55b",
            messages: [
              {
                role: "user",
                content: `You are a forensic image analysis expert. An image named "${filename}" (${detectedFormat}, ${(buffer.byteLength / 1024).toFixed(1)} KB) has the following metadata:
- Software: ${software || "none"}
- Device: ${[make, model].filter(Boolean).join(" ") || "unknown"}
- Date Original: ${dateOriginal || "unknown"}
- Date Modified: ${dateModified || "unknown"}
- Current manipulation score: ${manipulationScore}/100

Analyze these metadata patterns and provide your forensic assessment.

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_manipulated|ai_generated"
}`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.3,
          }),
        });

        if (nvidiaRes.ok) {
          const nvidiaData = await nvidiaRes.json();
          const nvidiaText = (nvidiaData.choices?.[0]?.message?.content || "").replace(/```json|```/g, "").trim();
          const nvidiaResult = JSON.parse(nvidiaText);

          if (nvidiaResult.findings && Array.isArray(nvidiaResult.findings)) {
            for (const f of nvidiaResult.findings) {
              findings.push({
                category: `[NVIDIA AI] ${f.category}`,
                description: f.description,
                severity: f.severity === "critical" ? "critical" : f.severity === "warning" ? "warning" : "info",
              });
            }
          }

          if (typeof nvidiaResult.manipulationProbability === "number") {
            manipulationScore = Math.round((manipulationScore + nvidiaResult.manipulationProbability) / 2);
          }
          aiVisionUsed = true;
        }
      } catch (nvidiaError) {
        console.error("[Forensic Image] NVIDIA NIM analysis failed, falling back to Gemini:", nvidiaError);
      }
    }

    // Fallback to Gemini Vision if NVIDIA didn't work
    if (geminiKey && buffer.byteLength < 4 * 1024 * 1024 && !aiVisionUsed) {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiKey);
        const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const base64 = Buffer.from(buffer).toString("base64");
        const mimeType = isJPEG ? "image/jpeg" : isPNG ? "image/png" : isWebP ? "image/webp" : "image/jpeg";

        const result = await visionModel.generateContent([
          {
            inlineData: { data: base64, mimeType },
          },
          `You are a forensic image analysis expert. Analyze this image for signs of manipulation, deepfakes, or AI generation.

Check for:
1. Inconsistent lighting or shadows
2. Unnatural skin texture or features (deepfake indicators)
3. AI-generation artifacts (extra fingers, text distortion, pattern inconsistencies)
4. Copy-paste or clone stamp artifacts
5. Inconsistent compression across regions
6. Background inconsistencies (warped lines, misaligned patterns)
7. Text or watermark tampering

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_manipulated|ai_generated"
}`,
        ]);

        const aiText = result.response.text().replace(/```json|```/g, "").trim();
        const aiResult = JSON.parse(aiText);

        if (aiResult.findings && Array.isArray(aiResult.findings)) {
          for (const f of aiResult.findings) {
            findings.push({
              category: `[AI Vision] ${f.category}`,
              description: f.description,
              severity: f.severity === "critical" ? "critical" : f.severity === "warning" ? "warning" : "info",
            });
          }
        }

        if (typeof aiResult.manipulationProbability === "number") {
          manipulationScore = Math.round((manipulationScore + aiResult.manipulationProbability) / 2);
        }
        aiVisionUsed = true;
      } catch (aiError) {
        console.error("[Forensic Image] Gemini Vision analysis failed:", aiError);
        findings.push({
          category: "AI Vision Unavailable",
          description: "Both NVIDIA NIM and Gemini Vision analysis failed. Results are based on metadata and file structure analysis only.",
          severity: "info",
        });
      }
    } else if (!geminiKey && !nvidiaKey) {
      findings.push({
        category: "AI Vision Unavailable",
        description: "No NVIDIA or Gemini API key configured. Results are based on metadata and file structure analysis only.",
        severity: "info",
      });
    }

    manipulationScore = Math.min(manipulationScore, 95);

    return NextResponse.json({
      type: "deepfake_image",
      confidence: manipulationScore,
      isManipulated: manipulationScore >= 45,
      findings,
      processingTimeMs: Date.now() - start,
      model: geminiKey ? "exifr+jpeg-analysis+gemini-vision" : "exifr+jpeg-analysis",
      disclaimer: "Forensic analysis uses metadata extraction (exifr), file structure analysis, and optionally Gemini Vision AI. No single analysis method is definitive — always cross-reference findings.",
    });
  } catch (error) {
    console.error("Forensic image route error:", error);
    return NextResponse.json({ error: "Image forensic analysis failed." }, { status: 500 });
  }
}
