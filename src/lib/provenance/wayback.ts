import { kv } from "@vercel/kv";

const SPN_KEY = process.env.IA_SPN_KEY || "dummy_key";        // archive.org S3-style key
const SPN_SECRET = process.env.IA_SPN_SECRET || "dummy_secret";

export async function saveSnapshot(url: string): Promise<{ url: string; archivedUrl: string; archivedAt: string }> {
  // Idempotency: never re-archive a URL more than once / 24h
  const cacheKey = `archive:${url}`;
  const cached = await kv.get<{ archivedUrl: string; archivedAt: string }>(cacheKey);
  if (cached) return { url, ...cached };

  // If we are missing keys, we shouldn't crash local development unless strictly needed,
  // but for production build, this will attempt the call. If it fails due to auth, it will throw.
  
  // Wayback Save Page Now API — pattern per archive.org SPN API documentation
  const res = await fetch("https://web.archive.org/save", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Authorization": `LOW ${SPN_KEY}:${SPN_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ url, capture_all: "1", skip_first_archive: "1" }),
  });
  
  if (!res.ok) {
     throw new Error(`Wayback API error: ${res.statusText}`);
  }
  
  const data = await res.json();
  const job_id = data.job_id;
  
  if (!job_id) {
     throw new Error("No job_id returned from Wayback Machine");
  }

  // Poll the job
  for (let i = 0; i < 12; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const statusRes = await fetch(`https://web.archive.org/save/status/${job_id}`, { 
      headers: { Authorization: `LOW ${SPN_KEY}:${SPN_SECRET}` } 
    });
    const status = await statusRes.json();
    
    if (status.status === "success") {
      const archivedUrl = `https://web.archive.org/web/${status.timestamp}/${status.original_url}`;
      const result = { archivedUrl, archivedAt: new Date().toISOString() };
      await kv.set(cacheKey, result, { ex: 60 * 60 * 24 * 365 });   // 1-year cache
      return { url, ...result };
    }
    
    if (status.status === "error") {
      throw new Error(`Wayback archival error: ${status.message}`);
    }
  }
  throw new Error("Wayback archival timeout");
}
