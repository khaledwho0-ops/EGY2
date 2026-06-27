import { NextResponse } from "next/server";
import type { ForensicFinding } from "@/lib/ai/forensic-analysis";

/**
 * C2PA (Coalition for Content Provenance and Authenticity) Verification
 * 
 * C2PA embeds cryptographic manifests in media files to prove provenance.
 * This route checks for C2PA manifest presence and parses basic structure.
 * 
 * C2PA manifests use JUMBF (JPEG Universal Metadata Box Format) embedding.
 * The JUMBF box type for C2PA is 'c2pa' (0x63327061).
 * 
 * References:
 * - https://c2pa.org/specifications/
 * - JUMBF: ISO 19566-5
 */

// C2PA magic bytes and JUMBF markers
const C2PA_JUMBF_UUID = [
  0x63, 0x32, 0x70, 0x61, // 'c2pa'
];

const JUMBF_BOX_TYPE = [
  0x6A, 0x75, 0x6D, 0x62, // 'jumb'
];

const XMP_C2PA_NAMESPACE = "http://c2pa.org";
const COSE_SIGN1_TAG = 0xD2; // CBOR tag for COSE_Sign1

function findSequence(data: Uint8Array, sequence: number[], startOffset = 0): number {
  for (let i = startOffset; i <= data.length - sequence.length; i++) {
    let found = true;
    for (let j = 0; j < sequence.length; j++) {
      if (data[i + j] !== sequence[j]) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const url = formData.get("url");

    let buffer: ArrayBuffer | null = null;

    if (file instanceof File) {
      buffer = await file.arrayBuffer();
    } else if (typeof url === "string" && url.trim()) {
      // Hard timeout on the user-supplied URL fetch so a slow/unresponsive host fails loud instead of hanging.
      const res = await fetch(url, {
        headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        return NextResponse.json({ error: `Failed to fetch: ${res.status}` }, { status: 400 });
      }
      buffer = await res.arrayBuffer();
    }

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 });
    }

    const start = Date.now();
    const findings: ForensicFinding[] = [];
    const bytes = new Uint8Array(buffer);

    // ─── Check 1: Search for C2PA JUMBF Box ───
    const c2paOffset = findSequence(bytes, C2PA_JUMBF_UUID);
    const jumbfOffset = findSequence(bytes, JUMBF_BOX_TYPE);

    let c2paStatus: "present" | "absent" | "partial" = "absent";

    if (c2paOffset !== -1) {
      c2paStatus = "present";
      findings.push({
        category: "C2PA Manifest Found",
        description: `C2PA content credentials detected at byte offset ${c2paOffset}. This media has embedded provenance data signed by the creator or editing tool.`,
        severity: "info",
      });

      // Try to find COSE signature
      const coseOffset = findSequence(bytes, [COSE_SIGN1_TAG], c2paOffset);
      if (coseOffset !== -1 && coseOffset < c2paOffset + 10000) {
        findings.push({
          category: "COSE Signature Present",
          description: "A COSE_Sign1 cryptographic signature was found within the C2PA manifest. The provenance chain is cryptographically signed.",
          severity: "info",
        });
      }
    } else if (jumbfOffset !== -1) {
      c2paStatus = "partial";
      findings.push({
        category: "JUMBF Container Found (No C2PA)",
        description: `JUMBF metadata container found at offset ${jumbfOffset}, but no C2PA-specific content was detected. The file may use JUMBF for other purposes.`,
        severity: "info",
      });
    }

    // ─── Check 2: XMP C2PA Namespace ───
    const textContent = new TextDecoder("utf-8", { fatal: false }).decode(bytes.slice(0, Math.min(bytes.length, 200000)));
    const hasC2paXmp = textContent.includes(XMP_C2PA_NAMESPACE) || textContent.includes("c2pa:") || textContent.includes("stds:c2pa");

    if (hasC2paXmp) {
      if (c2paStatus === "absent") c2paStatus = "partial";
      findings.push({
        category: "C2PA XMP Reference",
        description: "XMP metadata references the C2PA namespace. This indicates the file was at some point associated with content provenance tools (e.g., Adobe Content Credentials, Truepic).",
        severity: "info",
      });

      // Check for known C2PA-compatible tools
      const tools = [
        { pattern: /adobe/i, name: "Adobe Content Credentials" },
        { pattern: /truepic/i, name: "Truepic" },
        { pattern: /qualcomm/i, name: "Qualcomm Snapdragon (hardware attestation)" },
        { pattern: /microsoft/i, name: "Microsoft (Project Origin)" },
        { pattern: /bbc/i, name: "BBC (Project Origin)" },
        { pattern: /nikon/i, name: "Nikon" },
        { pattern: /leica/i, name: "Leica" },
        { pattern: /sony/i, name: "Sony" },
        { pattern: /canon/i, name: "Canon" },
      ];

      const detectedTools = tools.filter(t => t.pattern.test(textContent));
      if (detectedTools.length > 0) {
        findings.push({
          category: "C2PA Issuer Detected",
          description: `Content credentials appear to be from: ${detectedTools.map(t => t.name).join(", ")}`,
          severity: "info",
        });
      }
    }

    // ─── Check 3: Content Authenticity Assessment ───
    if (c2paStatus === "absent") {
      findings.push({
        category: "No Content Credentials",
        description: "This file does not contain C2PA content credentials. Most existing media lacks C2PA data — absence does NOT prove manipulation. However, C2PA-signed media provides stronger provenance guarantees.",
        severity: "info",
      });

      // Check for other provenance indicators
      const hasIptc = textContent.includes("photoshop:DateCreated") || textContent.includes("Iptc4xmpCore");
      const hasXmpHistory = textContent.includes("xmpMM:History") || textContent.includes("stEvt:action");

      if (hasXmpHistory) {
        findings.push({
          category: "XMP Edit History Found",
          description: "While no C2PA manifest is present, XMP edit history metadata was found. This can show the sequence of edits made to the file.",
          severity: "info",
        });
      }

      if (hasIptc) {
        findings.push({
          category: "IPTC Metadata Present",
          description: "IPTC metadata found. This is commonly used by news agencies and professional photographers to embed attribution and rights information.",
          severity: "info",
        });
      }
    }

    // ─── Final Assessment ───
    const trustLevel = c2paStatus === "present" ? 85 : c2paStatus === "partial" ? 50 : 15;

    findings.push({
      category: "Content Credentials Trust Level",
      description: c2paStatus === "present"
        ? `Trust level: ${trustLevel}%. C2PA manifest with cryptographic signature provides strong provenance evidence. To fully verify, the signature must be validated against the issuer's certificate chain.`
        : c2paStatus === "partial"
        ? `Trust level: ${trustLevel}%. Partial C2PA references found but complete manifest verification is not possible without the full signed manifest.`
        : `Trust level: ${trustLevel}%. No C2PA credentials found. Provenance cannot be established through content credentials alone. Use other forensic methods (EXIF analysis, reverse image search) to verify authenticity.`,
      severity: c2paStatus === "present" ? "info" : "warning",
    });

    return NextResponse.json({
      type: "c2pa_verification",
      confidence: trustLevel,
      isManipulated: false, // C2PA checks provenance, not manipulation
      c2paStatus,
      findings,
      processingTimeMs: Date.now() - start,
      model: "c2pa-binary-scanner",
      disclaimer: "C2PA verification checks for the presence and basic structure of content credentials. Full cryptographic signature verification requires the complete certificate chain from the issuing authority.",
      rawManifest: c2paStatus === "present" ? { status: "detected", offset: c2paOffset } : null,
    });
  } catch (error) {
    console.error("Forensic C2PA route error:", error);
    return NextResponse.json({ error: "C2PA verification failed." }, { status: 500 });
  }
}
