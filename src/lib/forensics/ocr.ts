/* ═══════════════════════════════════════════════════════════════
 * OCR — read text out of an image (Tesseract.js, eng + ara).
 * Egypt's #1 misinformation vector is the viral SCREENSHOT. This pulls the
 * claim text out so it can be run through the One-Law verification pipeline.
 * The worker (and its language data) is created once and cached per process.
 * ═══════════════════════════════════════════════════════════════ */
import { createWorker, type Worker } from "tesseract.js";

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    // English + Arabic — EAL is bilingual; lang data downloads once then caches.
    workerPromise = createWorker(["eng", "ara"]);
  }
  return workerPromise;
}

/** Extract text from an image buffer. Returns "" if nothing readable. */
export async function ocrImage(buffer: Buffer): Promise<string> {
  const worker = await getWorker();
  const { data } = await worker.recognize(buffer);
  return (data?.text || "").trim();
}
