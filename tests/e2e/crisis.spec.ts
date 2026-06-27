import { test, expect } from "@playwright/test";

test("Depression page surfaces the verified Egyptian crisis hotline (Mindframe safety)", async ({ page }) => {
  await page.goto("http://localhost:3000/mental-health/depression");

  // The Mindframe safety rule requires the Egyptian crisis hotline to be present on any
  // self-harm-adjacent surface. This page presents it prominently (crisis banner + severe-result
  // action) rather than via a search-triggered card, so assert the hotline itself is visible.
  await expect(page.getByText("08008880700").first()).toBeVisible();
});
