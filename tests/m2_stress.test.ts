import { describe, it, expect, vi } from "vitest";
import { withTimeout } from "../src/lib/debunking/workers/api-swarm";
import { classifyEgyptianContext } from "../src/lib/debunking/classifier";
import { EgyptianContextVectorSchema } from "../src/lib/debunking/egy-data";

// The classifier calls rotatingGenerateObject from ./gemini-rotator (the MegaRotator),
// NOT ai.generateObject — so mock the real dependency to keep this a deterministic,
// network-free unit test.
vi.mock("../src/lib/debunking/gemini-rotator", () => ({
  rotatingGenerateObject: vi.fn().mockResolvedValue({
    object: {
      vector: "State Stability & Economic Rumors"
    }
  })
}));

describe("M2 Backend Orchestrator - Iteration 2 Stress Tests", () => {
  it("should timeout exactly at specified time and not crash", async () => {
    const neverResolvingPromise = new Promise<string>((resolve) => {
      // never resolves
    });

    const start = Date.now();
    try {
      await withTimeout(neverResolvingPromise, 100);
      expect.fail("Should have thrown a timeout error");
    } catch (err: any) {
      const duration = Date.now() - start;
      expect(err.message).toBe("Worker timed out");
      // it should be around 100ms
      expect(duration).toBeGreaterThanOrEqual(90);
      expect(duration).toBeLessThan(500); // giving plenty of margin for CI/local execution
    }
  });

  it("should resolve normally if promise completes before timeout", async () => {
    const fastPromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve("success"), 50);
    });

    const result = await withTimeout(fastPromise, 200);
    expect(result).toBe("success");
  });

  it("should classify an Egyptian claim correctly into a valid vector", async () => {
    const claims = [
      "The government is removing all bread subsidies tomorrow!",
      "A new vaccine for Covid is making people sterile, doctors say.",
      "A mysterious Jinn is causing fires in the village of X.",
      "Fake doctors are selling herbal cures that damage the liver.",
      "Foreign spies are destroying our agriculture.",
      "They are selling our public hospitals to foreign investors."
    ];

    for (const claim of claims) {
      const result = await classifyEgyptianContext(claim);
      // classifyEgyptianContext returns a discriminated union; a successful
      // classification is non-degraded and carries a schema-valid vector.
      expect(result.degraded, `Claim: "${claim}" returned degraded: ${JSON.stringify(result)}`).toBe(false);
      if (!result.degraded) {
        const parsed = EgyptianContextVectorSchema.safeParse(result.vector);
        expect(parsed.success, `Claim: "${claim}" vector did not parse. Received: ${JSON.stringify(result.vector)}`).toBe(true);
      }
    }
  }, 180000); 
});
