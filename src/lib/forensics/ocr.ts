/* ═══════════════════════════════════════════════════════════════
 * OCR — read text out of an image (Tesseract.js, eng + ara).
 * Egypt's #1 misinformation vector is the viral SCREENSHOT. This pulls the
 * claim text out so it can be run through the One-Law verification pipeline.
 * The worker (and its language data) is created once and cached per process.
 * ═══════════════════════════════════════════════════════════════ */
import { createWorker, type Worker } from "tesseract.js";
import { tmpdir } from "os";

// Cold-start on Vercel must download the eng+ara traineddata from the CDN into
// /tmp. The Arabic model is large, so init can take ~30s on a cold function; we
// give it 45s (under the route's 60s maxDuration) before failing loud. Once a
// worker is cached in a warm instance, recognition itself is fast (~a few s).
const OCR_INIT_TIMEOUT_MS = 45_000;
const OCR_RECOGNIZE_TIMEOUT_MS = 20_000;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`OCR_TIMEOUT:${label}`)), ms),
    ),
  ]);
}

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    // On Vercel the only writable dir is os.tmpdir() (/tmp); the default Tesseract
    // cachePath "." is the read-only deployment dir, so the traineddata write
    // hangs → FUNCTION_INVOCATION_TIMEOUT (504). Cache to /tmp (persists within a
    // warm instance) and time-box init so a stuck cold-start download rejects
    // loudly with a structured 503 instead of hanging into a 504.
    workerPromise = withTimeout(
      createWorker(["eng", "ara"], 1, { cachePath: tmpdir() }),
      OCR_INIT_TIMEOUT_MS,
      "worker-init",
    ).catch((e) => {
      workerPromise = null; // allow a later request to retry instead of re-awaiting a rejected promise
      throw e;
    });
  }
  return workerPromise;
}

/** Extract text from an image buffer. Returns "" if nothing readable. */
export async function ocrImage(buffer: Buffer): Promise<string> {
  const worker = await getWorker();
  const { data } = await withTimeout(worker.recognize(buffer), OCR_RECOGNIZE_TIMEOUT_MS, "recognize");
  return (data?.text || "").trim();
}
