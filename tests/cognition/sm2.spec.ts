import { describe, it, expect } from "vitest";
import { sm2 } from "@/lib/cognition/sm2";

describe("SM-2 spaced repetition", () => {
  it("schedules to 1 day on first correct response", () => {
    const c = { cardId: "a", ease: 2.5, interval: 0, repetitions: 0, due: "2025-01-01T00:00:00Z" };
    const next = sm2(c, 5);
    expect(next.interval).toBe(1);
    expect(next.repetitions).toBe(1);
  });
  
  it("resets on failure (q<3)", () => {
    const c = { cardId: "a", ease: 2.5, interval: 21, repetitions: 4, due: "x" };
    const next = sm2(c, 2);
    expect(next.repetitions).toBe(0);
    expect(next.interval).toBe(1);
  });
  
  it("clamps E-factor at 1.3 floor", () => {
    const c = { cardId: "a", ease: 1.31, interval: 1, repetitions: 1, due: "x" };
    const next = sm2(c, 0);
    expect(next.ease).toBeGreaterThanOrEqual(1.3);
  });
});
