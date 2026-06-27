import { NextResponse } from "next/server";
import { killList } from "@/data/research/kill-list";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json({ results: killList });
  } catch (error: any) {
    console.error("[Kill List API Error]", error);
    return NextResponse.json({ error: error.message || "Failed to fetch kill-list claims" }, { status: 500 });
  }
}
