/* ═══════════════════════════════════════════════════════════════
 * COGNITIVE PASSPORT — privacy-preserving durable identity (Keystone 3).
 *
 * No email, no password, no PII. On first visit a user gets a random userId +
 * a one-time recovery key; a signed JWT session cookie (jose HS256, matching
 * the existing middleware) keeps them stable across sessions. Entering the
 * recovery key on another device restores the same passport. This honors the
 * BLACKBOX/no-logging ethos while giving every downstream feature (the Defense
 * Ledger, SRS, the 30-day efficacy re-test, certificates) a STABLE owner.
 *
 * Storage via kvStore (Vercel KV in prod, local-FS fallback in dev). No new deps.
 * ═══════════════════════════════════════════════════════════════ */

import { SignJWT, jwtVerify } from "jose";
import { createHash, randomBytes, randomUUID } from "crypto";
import { kvStore } from "@/lib/db/kv-store";

export const SESSION_COOKIE = "auth";

function secret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_dev");
}

function hashKey(k: string): string {
  return createHash("sha256").update(k).digest("hex");
}

export interface PassportRecord {
  userId: string;
  createdAt: string;
  recoveryKeyHash: string;
}

/** Sign a 180-day session JWT (sub = userId) — verified by middleware.ts. */
export async function signSession(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(secret());
}

/** Verify a session token → userId, or null. Never throws. */
export async function verifySession(token?: string | null): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    return (payload.sub as string) || null;
  } catch {
    return null;
  }
}

/** Mint a fresh anonymous passport. Returns the recovery key ONCE. */
export async function createPassport(): Promise<{ userId: string; recoveryKey: string; token: string }> {
  const userId = randomUUID();
  const recoveryKey = randomBytes(18).toString("base64url"); // ~24 chars, URL-safe
  const record: PassportRecord = {
    userId,
    createdAt: new Date().toISOString(),
    recoveryKeyHash: hashKey(recoveryKey),
  };
  await kvStore.set(`passport:${userId}`, record);
  await kvStore.set(`recovery:${record.recoveryKeyHash}`, userId);
  return { userId, recoveryKey, token: await signSession(userId) };
}

/** Restore a passport on another device via its recovery key. */
export async function restorePassport(recoveryKey: string): Promise<{ userId: string; token: string } | null> {
  const userId = await kvStore.get<string>(`recovery:${hashKey(recoveryKey)}`);
  if (!userId) return null;
  return { userId, token: await signSession(userId) };
}

/** Cookie options — env-gated `secure` so the session works on localhost http in dev. */
export function sessionCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  };
}
