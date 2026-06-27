import { describe, it, expect } from "vitest";
import { mindframeAudit } from "@/lib/safety/mindframe";

describe("Mindframe gate", () => {
  it("blocks method-detail content", () => {
    const r = mindframeAudit("She took 50 tablets of paracetamol which will kill you...");
    expect(r.ok).toBe(false);
  });
  
  it("blocks 'committed suicide' glamorization", () => {
    expect(mindframeAudit("He committed suicide last week").ok).toBe(false);
  });
  
  it("requires hotline within 300 chars of any suicide mention", () => {
    expect(mindframeAudit("Suicide is a complex public health concern in Egypt.").ok).toBe(false);
    expect(mindframeAudit("Suicide is a serious concern. If you are struggling call 08008880700.").ok).toBe(true);
  });
});
