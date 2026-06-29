/* ═══════════════════════════════════════════════════════════════
 * OCR — read text out of an image (Tesseract.js, eng + ara).
 * Egypt's #1 misinformation vector is the viral SCREENSHOT. This pulls the
 * claim text out so it can be run through the One-Law verification pipeline.
 * The worker (and its language data) is created once and cached per process.
 * ═══════════════════════════════════════════════════════════════ */
import { createWorker, type Worker } from "tesseract.js";
import { tmpdir } from "os";

const OCR_TIMEOUT_MS = 25_000; // fail loud before Vercel's 60s wall, never hang

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
    // hangs → FUNCTION_INVOCATION_TIMEOUT (504). Cache to /tmp and time-box init
    // so a stuck cold-start download rejects loudly instead of hanging.
    workerPromise = withTimeout(
      createWorker(["eng", "ara"], 1, { cachePath: tmpdir() }),
      OCR_TIMEOUT_MS,
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
  const { data } = await withTimeout(worker.recognize(buffer), OCR_TIMEOUT_MS, "recognize");
  return (data?.text || "").trim();
}
