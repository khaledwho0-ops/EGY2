/**
 * E2E TEST SUITE — critical user flows.
 * Run: npx playwright test (see playwright.config.ts).
 *
 * Rewritten to assert the platform's STRUCTURAL health (routes render, the three engine
 * cards are present, the primary CTA navigates, every core page has a heading) rather than
 * exact marketing copy, which churns. This keeps the smoke durable across redesigns.
 */
import { test, expect } from '@playwright/test';

test.describe('Egyptian Awareness Library — Critical Flows', () => {

  test.describe('Landing Page', () => {
    test('loads with a hero heading and the three engine cards', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.getByText('DeepReal').first()).toBeVisible();
      await expect(page.getByText(/Mental Health|الصحة النفسية/).first()).toBeVisible();
      await expect(page.getByText(/Religion|الدين|المحور/).first()).toBeVisible();
    });

    test('exposes a primary call-to-action to the dashboard', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('link', { name: /Start Now|ابدأ الآن/i }).first()).toBeVisible();
    });

    test('primary CTA navigates to the dashboard', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('link', { name: /Start Now|ابدأ الآن/i }).first().click();
      await expect(page).toHaveURL(/\/dashboard/);
    });
  });

  test.describe('Navigation', () => {
    test('a navigation landmark is present', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('nav').first()).toBeVisible();
    });

    test('the document carries a theme (next-themes)', async ({ page }) => {
      await page.goto('/');
      const html = page.locator('html');
      const theme = await html.getAttribute('data-theme');
      const cls = await html.getAttribute('class');
      expect(Boolean(theme) || Boolean(cls)).toBeTruthy();
    });
  });

  test.describe('Core pages render with a heading', () => {
    for (const route of ['/dashboard', '/sources', '/baseline', '/deepreal', '/mental-health', '/religion-hub', '/supervisor']) {
      test(`${route}`, async ({ page }) => {
        await page.goto(route);
        await expect(page.locator('h1, h2').first()).toBeVisible();
      });
    }
  });

  test.describe('Exercise Engine', () => {
    test('DeepReal Day 1 exercise loads', async ({ page }) => {
      await page.goto('/deepreal/exercise/1');
      await expect(page.locator('h1, h2').first()).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('core pages each expose at least one h1', async ({ page }) => {
      const routes = ['/', '/dashboard', '/deepreal', '/mental-health', '/religion-hub'];
      for (const route of routes) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        // Assert the h1 exists in the DOM (some headings animate in, so don't require immediate visibility).
        await expect(page.locator('h1').first()).toBeAttached({ timeout: 10000 });
      }
    });
  });
});
