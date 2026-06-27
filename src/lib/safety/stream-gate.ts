import { streamText } from "ai";
import { mindframeAudit, MindframeViolation } from "./mindframe";

export async function safeStream(opts: Parameters<typeof streamText>[0]) {
  let buffer = "";
  // AI SDK 5 supports onChunk for inspection
  return streamText({
    ...opts,
    experimental_telemetry: { isEnabled: true, functionId: "safe-mental-health-stream" },
    onChunk: (event) => {
      const chunk = event.chunk;
      if (chunk.type !== "text-delta") return;
      buffer += chunk.text || "";
      const audit = mindframeAudit(buffer);
      if (!audit.ok) throw new MindframeViolation(audit.violations);
    },
  });
}
