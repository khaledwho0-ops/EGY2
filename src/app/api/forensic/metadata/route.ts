import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Requires multipart/form-data ('file' or 'url'). A non-multipart body
    // (e.g. JSON) makes formData() throw — that is a CLIENT error, so return a
    // structured 400 instead of falling through to a generic 500.
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Expected multipart/form-data with a 'file' or 'url' field." },
        { status: 400 }
      );
    }
    const file = formData.get("file");
    const url = formData.get("url");

    let buffer: ArrayBuffer | null = null;

    if (file instanceof File) {
      buffer = await file.arrayBuffer();
    } else if (typeof url === "string" && url.trim()) {
      const res = await fetch(url, {
        headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0" },
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: `Failed to fetch image from URL: ${res.status}` },
          { status: 400 }
        );
      }
      buffer = await res.arrayBuffer();
    }

    if (!buffer || buffer.byteLength === 0) {
      return NextResponse.json(
        { error: "No file or URL provided" },
        { status: 400 }
      );
    }

    // Dynamic import exifr to avoid bundling issues
    const exifr = await import("exifr");

    // Parse ALL available metadata: EXIF, IPTC, XMP, GPS, ICC
    const [exifData, gpsData, iptcData, xmpData] = await Promise.all([
      exifr.parse(Buffer.from(buffer), true).catch(() => null),
      exifr.gps(Buffer.from(buffer)).catch(() => null),
      exifr.parse(Buffer.from(buffer), { iptc: true }).catch(() => null),
      exifr.parse(Buffer.from(buffer), { xmp: true }).catch(() => null),
    ]);

    // Build structured findings
    const findings: Array<{
      category: string;
      description: string;
      severity: "info" | "warning" | "critical";
      data?: Record<string, unknown>;
    }> = [];

    // --- Camera / Device Info ---
    const make = exifData?.Make || exifData?.make || null;
    const model = exifData?.Model || exifData?.model || null;
    const software = exifData?.Software || exifData?.software || null;

    if (make || model) {
      findings.push({
        category: "Capture Device",
        description: `Captured with: ${[make, model].filter(Boolean).join(" ")}`,
        severity: "info",
        data: { make, model },
      });
    } else {
      findings.push({
        category: "Capture Device",
        description: "No camera/device information found. This may indicate the metadata was stripped — common in screenshots, social media re-uploads, or deliberately sanitized images.",
        severity: "warning",
      });
    }

    // --- Software / Editing Detection ---
    if (software) {
      const editingTools = /photoshop|gimp|lightroom|snapseed|canva|pixlr|affinity|capture one|darktable|rawtherapee/i;
      const isEdited = editingTools.test(software);
      findings.push({
        category: "Editing Software",
        description: isEdited
          ? `EDITING SOFTWARE DETECTED: "${software}". This image has been processed with professional editing tools.`
          : `Software: "${software}"`,
        severity: isEdited ? "warning" : "info",
        data: { software, isEdited },
      });
    }

    // --- Timestamps ---
    const dateOriginal = exifData?.DateTimeOriginal || exifData?.CreateDate || null;
    const dateModified = exifData?.ModifyDate || exifData?.DateTime || null;

    if (dateOriginal || dateModified) {
      const original = dateOriginal ? new Date(dateOriginal).toISOString() : null;
      const modified = dateModified ? new Date(dateModified).toISOString() : null;

      let timeSeverity: "info" | "warning" = "info";
      let timeNote = "";

      if (original && modified) {
        const diffMs = Math.abs(new Date(modified).getTime() - new Date(original).getTime());
        const diffHours = diffMs / (1000 * 60 * 60);
        if (diffHours > 24) {
          timeSeverity = "warning";
          timeNote = ` — Modified ${Math.round(diffHours / 24)} days after original capture. This gap may indicate post-processing.`;
        }
      }

      findings.push({
        category: "Timestamps",
        description: `Original: ${original || "N/A"} | Modified: ${modified || "N/A"}${timeNote}`,
        severity: timeSeverity,
        data: { dateOriginal: original, dateModified: modified },
      });
    } else {
      findings.push({
        category: "Timestamps",
        description: "No timestamp information found in metadata.",
        severity: "info",
      });
    }

    // --- GPS / Location ---
    if (gpsData && gpsData.latitude && gpsData.longitude) {
      findings.push({
        category: "GPS Location",
        description: `GPS coordinates found: ${gpsData.latitude.toFixed(6)}, ${gpsData.longitude.toFixed(6)}`,
        severity: "info",
        data: {
          latitude: gpsData.latitude,
          longitude: gpsData.longitude,
          altitude: (gpsData as unknown as Record<string, unknown>).altitude || null,
        },
      });
    }

    // --- Image Dimensions ---
    const width = exifData?.ImageWidth || exifData?.ExifImageWidth || exifData?.PixelXDimension || null;
    const height = exifData?.ImageHeight || exifData?.ExifImageHeight || exifData?.PixelYDimension || null;
    const orientation = exifData?.Orientation || null;

    if (width && height) {
      findings.push({
        category: "Image Dimensions",
        description: `${width} × ${height} pixels${orientation ? ` (Orientation: ${orientation})` : ""}`,
        severity: "info",
        data: { width, height, orientation },
      });
    }

    // --- Color Space / Compression ---
    const colorSpace = exifData?.ColorSpace || null;
    const compression = exifData?.Compression || null;
    const bitsPerSample = exifData?.BitsPerSample || null;

    if (colorSpace || compression) {
      findings.push({
        category: "Color & Compression",
        description: `Color space: ${colorSpace || "Unknown"} | Compression: ${compression || "Unknown"} | Bits: ${bitsPerSample || "Unknown"}`,
        severity: "info",
        data: { colorSpace, compression, bitsPerSample },
      });
    }

    // --- IPTC (Caption, Copyright, Creator) ---
    if (iptcData) {
      const caption = iptcData.caption || iptcData.ObjectName || null;
      const copyright = iptcData.CopyrightNotice || iptcData.copyright || null;
      const creator = iptcData.creator || iptcData["By-line"] || null;

      if (caption || copyright || creator) {
        findings.push({
          category: "IPTC Metadata",
          description: [
            caption ? `Caption: "${caption}"` : null,
            creator ? `Creator: ${creator}` : null,
            copyright ? `Copyright: ${copyright}` : null,
          ].filter(Boolean).join(" | "),
          severity: "info",
          data: { caption, copyright, creator },
        });
      }
    }

    // --- Manipulation Risk Assessment ---
    let manipulationRisk = 0;
    if (!make && !model) manipulationRisk += 20; // No device info = stripped
    if (software && /photoshop|gimp/i.test(software)) manipulationRisk += 35;
    if (!dateOriginal && !dateModified) manipulationRisk += 15; // No timestamps = stripped
    if (dateOriginal && dateModified) {
      const diffMs = Math.abs(new Date(dateModified).getTime() - new Date(dateOriginal).getTime());
      if (diffMs > 86400000) manipulationRisk += 15; // Modified > 24h after capture
    }
    manipulationRisk = Math.min(manipulationRisk, 95);

    findings.push({
      category: "Manipulation Risk Assessment",
      description: `Overall metadata manipulation risk: ${manipulationRisk}%. ${
        manipulationRisk >= 50
          ? "Multiple metadata indicators suggest this image may have been edited or had its metadata deliberately stripped."
          : manipulationRisk >= 25
          ? "Some metadata indicators are missing, but this is common in social media re-uploads."
          : "Metadata appears largely intact and consistent."
      }`,
      severity: manipulationRisk >= 50 ? "warning" : "info",
      data: { manipulationRisk },
    });

    return NextResponse.json({
      type: "metadata_extraction",
      confidence: Math.max(100 - manipulationRisk, 5),
      isManipulated: manipulationRisk >= 50,
      findings,
      processingTimeMs: 0,
      model: "exifr-server",
      disclaimer: "Metadata analysis powered by exifr. Metadata can be modified or stripped; absence of metadata does not prove manipulation.",
      rawExif: exifData || {},
      rawGps: gpsData || null,
    });
  } catch (error) {
    console.error("Forensic metadata route error:", error);
    return NextResponse.json(
      { error: "Metadata extraction failed." },
      { status: 500 }
    );
  }
}
