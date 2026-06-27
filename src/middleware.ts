import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { limits, enforce } from "@/lib/kv/ratelimit";

export const config = { matcher: ["/api/ai/:path*", "/api/mist", "/api/srs", "/((?!_next|favicon).*)"] };

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_local_dev_only");

export async function middleware(req: NextRequest) {
  // 1) i18n — RTL/LTR direction based on accept-language and cookie
  const lang = req.cookies.get("lang")?.value || (req.headers.get("accept-language")?.startsWith("ar") ? "ar" : "en");
  const res = NextResponse.next();
  res.headers.set("x-lang", lang);
  res.headers.set("x-dir", lang === "ar" ? "rtl" : "ltr");

  // 2) JWT verify (jose — only Web-Crypto JWT lib that runs on Edge) — pattern per Next.js 15 auth guide
  const token = req.cookies.get("auth")?.value;
  let userId = "anon:" + (req.headers.get("x-forwarded-for") ?? "0.0.0.0");
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET, { algorithms: ["HS256"] });
      userId = `u:${payload.sub}`;
    } catch { /* invalid token → treat as anon */ }
  }

  // 3) Per-route rate-limit dispatch
  const path = req.nextUrl.pathname;
  let limiter = null;
  if (path.startsWith("/api/ai/chat")) limiter = limits.chat;
  else if (path.startsWith("/api/ai/debunker")) limiter = limits.debunker;
  else if (path.startsWith("/api/mist")) limiter = limits.mist;

  if (limiter) {
    const { ok, remaining, reset } = await enforce(limiter, userId);
    res.headers.set("x-ratelimit-remaining", String(remaining));
    res.headers.set("x-ratelimit-reset", String(reset));
    if (!ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  res.headers.set("x-uid", userId);
  return res;
}
