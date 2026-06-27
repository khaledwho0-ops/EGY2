import { NextResponse } from "next/server";

/**
 * NVIDIA Content Safety API Route
 * ════════════════════════════════════════════════════
 * POST /api/nvidia/content-safety
 *
 * Provides a REST endpoint for the NVIDIA Nemotron-3.5 Content Safety model.
 * Used by the frontend Content Safety Scanner in the NVIDIA Hub page,
 * and programmatically by internal EAL modules.
 *
 * Body: { text: string, mode?: "input" | "output" }
 * Response: ContentSafetyResult
 */

import { checkContentSafety } from "@/lib/safety/nvidia-content-safety";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, mode = "input" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    if (text.length > 10000) {
      return NextResponse.json(
        { error: "Text exceeds maximum length of 10,000 characters" },
        { status: 400 }
      );
    }

    const result = await checkContentSafety(text, mode as "input" | "output");

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[NVIDIA Content Safety Route] Error:", error.message);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
