/* ═══════════════════════════════════════════════════════════════
 * CONTENT ONE-LAW CI GATE — makes shipping an unsourced lesson impossible.
 * Scans for *.atoms.json under src/content and src/data, validates every
 * atom against the One Law + the Islamic protocol, and exits non-zero on any
 * failure. Wire into prebuild/CI. Run: npx tsx scripts/verify-content-atoms.ts
 * ═══════════════════════════════════════════════════════════════ */
import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { validateAtom } from "../src/lib/content/content-atom";

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (entry.endsWith(".atoms.json")) out.push(p);
  }
  return out;
}

const files = ["src/content", "src/data"].flatMap((root) => walk(root));

if (files.length === 0) {
  console.log("0 content atoms found (One-Law gate ready — drops in the moment any *.atoms.json ships).");
  process.exit(0);
}

let failures = 0;
let checked = 0;
for (const f of files) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(f, "utf8"));
  } catch (e) {
    failures++;
    console.error(`✗ ${f}: invalid JSON — ${(e as Error).message}`);
    continue;
  }
  const list = Array.isArray(parsed) ? parsed : [parsed];
  for (const atom of list) {
    checked++;
    const { ok, reasons } = validateAtom(atom);
    if (!ok) {
      failures++;
      console.error(`✗ ${f} [${(atom as { id?: string })?.id ?? "?"}]: ${reasons.join("; ")}`);
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} of ${checked} content atom(s) FAILED the One-Law gate.`);
  process.exit(1);
}
console.log(`✓ All ${checked} content atom(s) pass the One-Law gate.`);
