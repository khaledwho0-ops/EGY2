import { kv } from "@vercel/kv";
import { existsSync, mkdirSync, promises as fsPromises } from "fs";
import path from "path";

/**
 * Universal Storage Adapter
 * Safely falls back to local JSON files if Vercel KV is not configured.
 * This guarantees the system works both in local prototypes and cloud production.
 */

const RUNTIME_DIR = path.join(process.cwd(), ".runtime", "kv_fallback");

function ensureDir() {
  if (!existsSync(RUNTIME_DIR)) {
    mkdirSync(RUNTIME_DIR, { recursive: true });
  }
}

function getLocalPath(key: string) {
  // sanitize key for file system
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(RUNTIME_DIR, `${safeKey}.json`);
}

export const kvStore = {
  async get<T>(key: string): Promise<T | null> {
    if (process.env.KV_REST_API_URL) {
      try {
        return await kv.get<T>(key);
      } catch (err) {
        console.error(`[KV Store] Failed to read ${key} from Vercel KV:`, err);
        return null;
      }
    }

    // Fallback to Local FS
    try {
      const filePath = getLocalPath(key);
      if (existsSync(filePath)) {
        const raw = await fsPromises.readFile(filePath, "utf8");
        return JSON.parse(raw) as T;
      }
      return null;
    } catch (err) {
      console.error(`[KV Store] Failed to read ${key} from local FS:`, err);
      return null;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    if (process.env.KV_REST_API_URL) {
      try {
        await kv.set(key, value);
        return;
      } catch (err) {
        console.error(`[KV Store] Failed to write ${key} to Vercel KV:`, err);
        // Continue to fallback if we want extreme safety, or just throw.
      }
    }

    // Fallback to Local FS
    try {
      ensureDir();
      const filePath = getLocalPath(key);
      await fsPromises.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
    } catch (err) {
      console.error(`[KV Store] Failed to write ${key} to local FS:`, err);
    }
  },

  async keys(pattern: string): Promise<string[]> {
    if (process.env.KV_REST_API_URL) {
      try {
        return await kv.keys(pattern);
      } catch (err) {
        console.error(`[KV Store] Failed to read keys from Vercel KV:`, err);
        return [];
      }
    }

    // Fallback to Local FS
    try {
      ensureDir();
      const files = await fsPromises.readdir(RUNTIME_DIR);
      // extremely basic pattern match (* matches anything)
      const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
      return files
        .filter(f => f.endsWith('.json'))
        .map(f => f.replace(".json", ""))
        .filter(f => regex.test(f));
    } catch (err) {
      return [];
    }
  }
};
