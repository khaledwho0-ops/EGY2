import { NextResponse } from "next/server";
import type { ForensicFinding } from "@/lib/ai/forensic-analysis";

export async function POST(request: Request) {
  try {
    // This endpoint requires a multipart/form-data upload (file or url field).
    // If the body is not multipart (e.g. JSON), formData() throws a TypeError —
    // that is a CLIENT error, so surface a structured 400, not a generic 500.
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Send the audio as multipart/form-data with a 'file' or 'url' field." },
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
        return NextResponse.json({ error: `Failed to fetch audio: ${res.status}` }, { status: 400 });
      }
      buffer = await res.arrayBuffer();
      filename = url.split("/").pop() || "url-audio";
    }

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
    }

    const start = Date.now();
    const findings: ForensicFinding[] = [];
    let manipulationScore = 0;
    const bytes = new Uint8Array(buffer);

    // ─── LAYER 1: Format Detection ───
    const isMP3 = (bytes[0] === 0xFF && (bytes[1] & 0xE0) === 0xE0) || // Sync word
                  (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33); // ID3 tag
    const isWAV = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
    const isOGG = bytes[0] === 0x4F && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53;
    const isFLAC = bytes[0] === 0x66 && bytes[1] === 0x4C && bytes[2] === 0x61 && bytes[3] === 0x43;
    const isAAC = bytes[0] === 0xFF && (bytes[1] & 0xF0) === 0xF0;
    const isM4A = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;

    const detectedFormat = isMP3 ? "MP3" : isWAV ? "WAV" : isOGG ? "OGG" : isFLAC ? "FLAC" : isAAC ? "AAC" : isM4A ? "M4A/AAC" : "Unknown";

    findings.push({
      category: "Audio Format",
      description: `Detected format: ${detectedFormat} (${(buffer.byteLength / 1024).toFixed(1)} KB)`,
      severity: "info",
    });

    // ─── LAYER 2: MP3 ID3 Tag Analysis ───
    if (isMP3) {
      // Check for ID3v2 tag
      if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) {
        const id3Version = `2.${bytes[3]}.${bytes[4]}`;
        findings.push({
          category: "ID3 Metadata",
          description: `ID3v${id3Version} tag found. Audio file contains embedded metadata.`,
          severity: "info",
        });

        // Search for common ID3 frames in the first 10KB
        const headerText = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, Math.min(bytes.length, 10000)));

        const encoders = ["lame", "ffmpeg", "audacity", "adobe audition", "sox", "libmp3lame"];
        const foundEncoders = encoders.filter(e => headerText.toLowerCase().includes(e));

        if (foundEncoders.length > 0) {
          findings.push({
            category: "Encoder Detected",
            description: `Audio processing tool signature found: ${foundEncoders.join(", ")}. This audio has been encoded or re-processed.`,
            severity: "info",
          });
        }
      } else {
        findings.push({
          category: "No ID3 Tag",
          description: "No ID3 metadata tag found. Audio may have been stripped of metadata.",
          severity: "warning",
        });
        manipulationScore += 10;
      }

      // Check bitrate consistency (CBR vs VBR)
      // In CBR MP3, frame headers should be evenly spaced
      let frameCount = 0;
      const frameSizes: number[] = [];

      for (let i = 0; i < Math.min(bytes.length - 4, 50000); i++) {
        if (bytes[i] === 0xFF && (bytes[i + 1] & 0xE0) === 0xE0) {
          frameCount++;
          // Extract bitrate index from header
          const bitrateIndex = (bytes[i + 2] >> 4) & 0x0F;
          if (bitrateIndex > 0 && bitrateIndex < 15) {
            frameSizes.push(bitrateIndex);
          }
          if (frameCount >= 20) break;
        }
      }

      if (frameSizes.length > 5) {
        const uniqueRates = new Set(frameSizes);
        if (uniqueRates.size > 3) {
          findings.push({
            category: "Variable Bitrate",
            description: "Audio uses Variable Bit Rate (VBR) encoding with multiple bitrate levels. This is normal but can indicate re-encoding.",
            severity: "info",
          });
        } else if (uniqueRates.size === 1) {
          findings.push({
            category: "Constant Bitrate",
            description: "Audio uses Constant Bit Rate (CBR) encoding. Consistent encoding throughout.",
            severity: "info",
          });
        }
      }
    }

    // ─── LAYER 3: WAV Analysis ───
    if (isWAV) {
      // Parse WAV header
      const dataView = new DataView(buffer);
      const audioFormat = dataView.getUint16(20, true);
      const numChannels = dataView.getUint16(22, true);
      const sampleRate = dataView.getUint32(24, true);
      const bitsPerSample = dataView.getUint16(34, true);

      findings.push({
        category: "WAV Properties",
        description: `${numChannels === 1 ? "Mono" : numChannels === 2 ? "Stereo" : `${numChannels}ch`} | ${sampleRate} Hz | ${bitsPerSample}-bit | Format: ${audioFormat === 1 ? "PCM" : audioFormat === 3 ? "IEEE Float" : `Code ${audioFormat}`}`,
        severity: "info",
      });

      if (sampleRate < 16000) {
        findings.push({
          category: "Low Sample Rate",
          description: `Sample rate is only ${sampleRate} Hz. Phone-quality audio may indicate recording from a call or low-quality source.`,
          severity: "warning",
        });
      }
    }

    // ─── LAYER 4: Filename Heuristics ───
    const suspiciousFilename = /deepfake|fake|clone|synthesiz|voice.?ai|edit|modified|11labs|elevenlabs/i.test(filename);
    if (suspiciousFilename) {
      findings.push({
        category: "Filename Alert",
        description: `The filename "${filename}" contains terms associated with synthetic or edited audio.`,
        severity: "warning",
      });
      manipulationScore += 15;
    }

    // ─── LAYER 5: AI Audio Analysis (NVIDIA NIM → Gemini fallback) ───
    const nvidiaKey = process.env.NVIDIA_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const MAX_SIZE = 10 * 1024 * 1024;
    let aiAudioUsed = false;

    // Try NVIDIA NIM for metadata-based audio analysis first
    if (nvidiaKey && !aiAudioUsed) {
      try {
        // FIX (Pattern A/B): NVIDIA 550B streams slowly and can hang 30s+; bound it with a hard timeout so it fails loud and the Gemini multimodal fallback path can run. Model is NOT swapped — this is a text-only metadata call and the audio fallback below stays intact.
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
              content: `You are a forensic audio analysis expert. Analyze this audio file metadata:
- Filename: "${filename}"
- Format: ${detectedFormat}
- Size: ${(buffer.byteLength / 1024).toFixed(1)} KB
- Current manipulation indicators: ${findings.map(f => f.category).join(", ")}
- Current manipulation score: ${manipulationScore}/100

Based on the metadata patterns and filename, provide a forensic assessment.

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_cloned|ai_generated|spliced"
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
          aiAudioUsed = true;
        }
      } catch (nvidiaError) {
        console.error("[Forensic Audio] NVIDIA NIM analysis failed:", nvidiaError);
      }
    }

    // Fallback to Gemini multimodal audio analysis
    if (geminiKey && buffer.byteLength < MAX_SIZE && !aiAudioUsed) {
      try {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiKey);
        const audioModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const base64 = Buffer.from(buffer).toString("base64");
        const mimeType = isMP3 ? "audio/mpeg" : isWAV ? "audio/wav" : isOGG ? "audio/ogg" : isM4A ? "audio/mp4" : "audio/mpeg";

        const result = await audioModel.generateContent([
          { inlineData: { data: base64, mimeType } },
          `You are a forensic audio analysis expert. Analyze this audio for signs of manipulation, voice cloning, AI-generated speech, or editing.

Check for:
1. Unnatural speech patterns (robotic cadence, inconsistent prosody)
2. Voice cloning artifacts (metallic quality, breathing pattern inconsistencies)
3. Splicing artifacts (abrupt tonal changes, unnatural pauses, audio jumps)
4. Background noise inconsistencies (changing ambient sound indicating different recording locations)
5. Spectral anomalies (unnaturally clean audio, missing frequency bands)

Return ONLY a JSON object (no markdown):
{
  "manipulationProbability": number (0-100),
  "findings": [
    { "category": "string", "description": "string", "severity": "info|warning|critical" }
  ],
  "verdict": "authentic|suspicious|likely_cloned|ai_generated|spliced"
}`,
        ]);

        const aiText = result.response.text().replace(/```json|```/g, "").trim();
        const aiResult = JSON.parse(aiText);

        if (aiResult.findings && Array.isArray(aiResult.findings)) {
          for (const f of aiResult.findings) {
            findings.push({
              category: `[AI Audio] ${f.category}`,
              description: f.description,
              severity: f.severity === "critical" ? "critical" : f.severity === "warning" ? "warning" : "info",
            });
          }
        }

        if (typeof aiResult.manipulationProbability === "number") {
          manipulationScore = Math.round((manipulationScore + aiResult.manipulationProbability) / 2);
        }
      } catch (aiError) {
        console.error("[Forensic Audio] Gemini audio analysis failed:", aiError);
        findings.push({
          category: "AI Audio Analysis Unavailable",
          description: "Both NVIDIA NIM and Gemini audio analysis failed. Results are based on file structure analysis only.",
          severity: "info",
        });
      }
    }

    manipulationScore = Math.min(manipulationScore, 95);

    return NextResponse.json({
      type: "audio_analysis",
      confidence: manipulationScore,
      isManipulated: manipulationScore >= 45,
      findings,
      processingTimeMs: Date.now() - start,
      model: geminiKey && buffer.byteLength < MAX_SIZE ? "format-analysis+gemini-audio" : "format-analysis",
      disclaimer: "Audio forensic analysis uses file structure analysis and optionally Gemini AI. Deep spectral analysis requires a dedicated forensic backend with librosa/PyDub.",
    });
  } catch (error) {
    console.error("Forensic audio route error:", error);
    return NextResponse.json({ error: "Audio forensic analysis failed." }, { status: 500 });
  }
}
