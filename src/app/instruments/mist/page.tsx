import { redirect } from "next/navigation";

/**
 * /instruments/mist was a phantom route (no page existed) → hard 404 ("fully down"),
 * dead-linked from /curriculum/phase1 and /demo. The MIST-20 instrument is actually
 * implemented by the /assessment route (config id "mist20", backed by /api/mist).
 * Redirect here so the URL resolves to the real, working instrument.
 */
export default function MistInstrumentRedirect() {
  redirect("/assessment");
}
