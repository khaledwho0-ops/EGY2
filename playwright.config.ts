import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for the EAL e2e suite (tests/e2e/*.spec.ts).
 * Serves the production build (next start) on :3000 — the a11y/crisis specs
 * hardcode http://localhost:3000, and the others use baseURL-relative paths.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  // Serial + one retry: the app is animation-heavy and stateful, so parallel workers race on
  // the shared dev server and the button's transition. Determinism beats speed for this smoke.
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [["list"]],
  timeout: 30_000,
  expect: { timeout: 7_000 },
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start -- -p 3000",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
