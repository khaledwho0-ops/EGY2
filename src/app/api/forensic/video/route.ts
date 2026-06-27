import { NextResponse } from "next/server";
import type { ForensicFinding } from "@/lib/ai/forensic-analysis";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
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
        return NextResponse.json({ error: `Failed to fetch video: ${res.status}` }, { status: 400 });
      }
      buffer = await res.arrayBuffer();
      filename = url.split("/").pop() || "url-video";
    }

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
    }

    const start = Date.now();
    const findings: ForensicFinding[] = [];
    let manipulationScore = 0;
    const bytes = new Uint8Array(buffer);

    // ─── LAYER 1: Container Detection ───
    const isMP4 = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
    const isWebM = bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3;
    const isAVI = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;

    const detectedFormat = isMP4 ? "MP4/MOV" : isWebM ? "WebM/MKV" : isAVI ? "AVI" : "Unknown";

    findings.push({
      category: "Container Format",
      description: `Detected: ${detectedFormat} (${(buffer.byteLength / (1024 * 1024)).toFixed(2)} MB)`,
      severity: "info",
    });

    // ─── LAYER 2: MP4 Atom Parsing ───
    if (isMP4) {
      // Parse MP4 atoms/boxes for metadata
      let offset = 0;
      const atoms: string[] = [];
      while (offset < Math.min(bytes.length, 50000)) {
        if (offset + 8 > bytes.length) break;
        const size = (bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
        const type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
        atoms.push(type);
        if (size <= 0 || size > bytes.length) break;
        offset += size;
      }

      // Check for 'udta' (user data) and 'meta' atoms
      const hasUserData = atoms.includes("udta");
      const hasMeta = atoms.includes("meta");
      const hasMoov = atoms.includes("moov");

      if (!hasUserData && !hasMeta) {
        findings.push({
          category: "Metadata Stripped",
          description: "No user data (udta) or metadata (meta) atoms found. This video's metadata may have been deliberately removed.",
          severity: "warning",
        });
        manipulationScore += 15;
      }

      // Check for editing tool signatures in the file
      const textContent = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, Math.min(bytes.length, 100000)));
      const editTools = ["premiere", "davinci", "final cut", "ffmpeg", "handbrake", "after effects", "vegas", "capcut", "kinemaster", "inshot"];
      const foundTools = editTools.filter(t => textContent.toLowerCase().includes(t));

      if (foundTools.length > 0) {
        findings.push({
          category: "Editing Tool Detected",
          description: `Video editing tool signature found: ${foundTools.join(", ")}. This video has been processed or re-encoded.`,
          severity: "warning",
        });
        manipulationScore += 20;
      }

      findings.push({
        category: "MP4 Structure",
        description: `Found atoms: ${atoms.slice(0, 10).join(", ")}${atoms.length > 10 ? `... (${atoms.length} total)` : ""}`,
        severity: "info",
      });
    }

    // ─── LAYER 3: Filename Heuristics ───
    const suspiciousFilename = /deepfake|fake|edit|modified|viral|breaking|ai.?generat/i.test(filename);
    if (suspiciousFilename) {
      findings.push({
        category: "Filename Alert",
        description: `The filename "${filename}" contains terms associated with manipulated or viral content.`,
        severity: "warning",
      });
      manipulationScore += 10;
    }

    // ─── LAYER 4: AI Video Analysis (NVIDIA NIM → Gemini fallback) ───
    const nvidiaKey = process.env.NVIDIA_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const MAX_GEMINI_SIZE = 10 * 1024 * 1024; // 10MB limit for inline
    let aiVideoUsed = false;

    // Try NVIDIA NIM for metadata-based video analysis
    if (nvidiaKey && !aiVideoUsed) {
      try {
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
            messages: [{
              role: "user",
              content: `You are a forensic video analysis expert. Analyze this video file metadata:
- Filename: "${filename}"
- Format: ${detectedFormat}
- Size: ${(buffer.byteLength / (1024 * 1024)).toFixed(2)} MB
- Current findings: ${findings.map(f => f.category + ": " + f.description).join("; ")}
- Current manipulation score: ${manipulationScore}/100

Based on the metadata patterns, container structure, and filename, provide a forensic assessment.

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_deepfake|ai_generated"
}`,
            }],
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
          aiVideoUsed = true;
        }
      } catch (nvidiaError) {
        console.error("[Forensic Video] NVIDIA NIM analysis failed:", nvidiaError);
      }
    }

    // Fallback to Gemini Vision for multimodal video analysis
    if (geminiKey && buffer.byteLength < MAX_GEMINI_SIZE && !aiVideoUsed) {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiKey);
        const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const base64 = Buffer.from(buffer).toString("base64");
        const mimeType = isMP4 ? "video/mp4" : isWebM ? "video/webm" : "video/mp4";

        const result = await visionModel.generateContent([
          {
            inlineData: { data: base64, mimeType },
          },
          `You are a forensic video analysis expert. Analyze this video for signs of deepfakes, AI generation, or manipulation.

Check for:
1. Face consistency across frames (warping, flickering, boundary artifacts)
2. Lip-sync anomalies (audio doesn't match mouth movements)
3. Temporal inconsistencies (jump cuts, frame drops, speed changes)
4. Background consistency (warped edges, morphing objects)
5. Lighting consistency (shadows changing unnaturally)
6. AI-generation artifacts (unnatural smoothness, texture inconsistencies)

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_deepfake|ai_generated"
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
      } catch (aiError) {
        console.error("[Forensic Video] Gemini Vision analysis failed:", aiError);
        findings.push({
          category: "AI Vision Unavailable",
          description: "Both NVIDIA NIM and Gemini Vision analysis failed. Results are based on container and metadata analysis only.",
          severity: "info",
        });
      }
    } else if (buffer.byteLength >= MAX_GEMINI_SIZE && !aiVideoUsed) {
      findings.push({
        category: "File Too Large for AI",
        description: `Video is ${(buffer.byteLength / (1024 * 1024)).toFixed(1)} MB — exceeds the 10 MB limit for AI visual analysis. Results are based on container and metadata analysis only.`,
        severity: "info",
      });
    }

    manipulationScore = Math.min(manipulationScore, 95);

    return NextResponse.json({
      type: "deepfake_video",
      confidence: manipulationScore,
      isManipulated: manipulationScore >= 45,
      findings,
      processingTimeMs: Date.now() - start,
      model: geminiKey && buffer.byteLength < MAX_GEMINI_SIZE ? "mp4-analysis+gemini-vision" : "mp4-analysis",
      disclaimer: "Video forensic analysis uses container structure analysis and optionally Gemini Vision AI. Deep frame-by-frame analysis requires a dedicated forensic backend.",
    });
  } catch (error) {
    console.error("Forensic video route error:", error);
    return NextResponse.json({ error: "Video forensic analysis failed." }, { status: 500 });
  }
}
