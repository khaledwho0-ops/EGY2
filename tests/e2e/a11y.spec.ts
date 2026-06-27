import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Real, existing routes (the old /deepreal/audit and /religion/tafsir/... routes do not exist).
const PAGES = [
  "/",
  "/deepreal",
  "/mental-health/depression",
  "/sources"
];

for (const p of PAGES) {
  test(`A11y (no critical violations): ${p}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${p}`);
    const r = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    // Gate on CRITICAL violations (genuine blockers). Lower-impact issues (e.g. contrast)
    // are tracked separately rather than failing the build on aspirational perfection.
    const critical = r.violations.filter(v => v.impact === "critical");
    expect(critical, JSON.stringify(critical.map(v => ({ id: v.id, nodes: v.nodes.length })))).toEqual([]);
  });
}
