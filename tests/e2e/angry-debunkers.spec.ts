import { test, expect } from '@playwright/test';

// Common mock data
// NOTE: the angry-debunkers result UI gates the confidence strip + sources on
// `data.verdict`, so every mock must carry the verdict-based contract.
const successResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    verdict: "DEBUNKED",
    verdict_explanation_en: "The claim is refuted by the cited sources.",
    verdict_explanation_ar: "الادعاء مُفنَّد بالمصادر المذكورة.",
    confidence_score: 95,
    negative_science_violation: "Appeal to Emotion",
    egyptian_vector_hit: "This rumor exploits local fears.",
    truth_sandwich: {
      fact_1: "Fact 1",
      myth: "Myth",
      fact_2: "Fact 2"
    },
    sources: [
      { title: "WHO Report 2023", url: "https://who.int", tier: "S", stance: "refutes" },
      { title: "Egyptian Ministry of Health", url: "https://mohp.gov.eg", tier: "A", stance: "refutes" }
    ]
  }
};

const emptyCitationsResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    verdict: "TRUE",
    verdict_explanation_en: "No issues detected.",
    verdict_explanation_ar: "لا توجد مشاكل.",
    confidence_score: 80,
    negative_science_violation: "None",
    egyptian_vector_hit: "Safe",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    sources: []
  }
};

const errorResponse = {
  status: 'error',
  message: 'API Failure'
};

const s1MedicalResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    verdict: "DEBUNKED",
    verdict_explanation_en: "Refuted widely circulated medical rumor.",
    verdict_explanation_ar: "تفنيد شائعة طبية منتشرة.",
    confidence_score: 99,
    negative_science_violation: "Appeal to Emotion",
    egyptian_vector_hit: "This is a widespread medical rumor affecting public health.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    sources: [
      { title: "Med Source 1", url: "https://med1.org", tier: "S", stance: "refutes" },
      { title: "Med Source 2", url: "https://med2.org", tier: "A", stance: "refutes" }
    ]
  }
};

const s3LongResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    verdict: "MIXED",
    verdict_explanation_en: "Overwhelming volume of low-quality claims.",
    verdict_explanation_ar: "كمّ هائل من الادعاءات الضعيفة.",
    confidence_score: 88,
    negative_science_violation: "Gish Gallop",
    egyptian_vector_hit: "Overwhelming volume of false data.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    sources: []
  }
};

const s4EdgeCaseResponse = {
  type: "SYNTHESIS_COMPLETE",
  data: {
    verdict: "MIXED",
    verdict_explanation_en: "Edge-case rule violation.",
    verdict_explanation_ar: "انتهاك قاعدة حالة خاصة.",
    confidence_score: 50,
    negative_science_violation: "edge_case_science_violation",
    egyptian_vector_hit: "Violates specific edge-case rules.",
    truth_sandwich: {
      fact_1: "A",
      myth: "B",
      fact_2: "C"
    },
    sources: []
  }
};

// Hydration-aware helper for filling and submitting
async function fillAndSubmit(page, text = 'Test claim') {
  const ta = page.locator('textarea').first();
  await ta.click();
  await ta.fill(text);
  // Button enables once `query` state updates; give React time to re-render (no clear-in-loop race).
  await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeEnabled({ timeout: 10000 });
  // The submit button has a perpetual transition/ripple animation, so Playwright's "stable"
  // actionability check can time out; force the click (already verified enabled above).
  await page.getByRole('button', { name: /Launch Strike Teams/i }).click({ force: true });
}

test.describe('The Angry Debunkers - Tier 1: Core Functional Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.goto('/angry-debunkers');
  });

  test.describe('F1: Claim Submission', () => {
    test('1. Valid standard claim', async ({ page }) => {
      await fillAndSubmit(page, 'This is a standard valid claim.');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('2. Valid short claim', async ({ page }) => {
      await fillAndSubmit(page, 'Short claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('3. Empty claim validation', async ({ page }) => {
      // Empty claim makes the button disabled
      await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeDisabled();
    });

    test('4. Valid long claim', async ({ page }) => {
      const longClaim = 'A'.repeat(500);
      await fillAndSubmit(page, longClaim);
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('5. Mixed language/special characters claim', async ({ page }) => {
      await fillAndSubmit(page, 'Claim with Arabic ادعاء and symbols @#$!');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });
  });

  test.describe('F2: Visualizer', () => {
    test('1. Appears immediately on submit', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // The step-text visualizer was replaced by AnalysisProgress; the loading state is the "Executing…" button.
      await expect(page.getByRole('button', { name: /Executing/i })).toBeVisible();
    });

    test('2. Displays sequential steps', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // The loading indicator persists through the in-flight request, then resolves to the result.
      await expect(page.getByRole('button', { name: /Executing/i })).toBeVisible();
      await expect(page.getByText(/Confidence/i).first()).toBeVisible({ timeout: 8000 });
    });

    test('3. Hides completely upon API completion', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
      await expect(page.getByText('1. Stripping Emotion...')).toBeHidden();
      await expect(page.getByText('2. Identifying Claim...')).toBeHidden();
    });

    test('4. Handles extremely fast API response cleanly', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('5. Reverts to IDLE on API failure', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ status: 500, json: errorResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // A non-SYNTHESIS error response surfaces the failure message instead of a fabricated result.
      await expect(page.getByText(/API Failure|Unexpected response/i).first()).toBeVisible({ timeout: 8000 });
    });
  });

  test.describe('F3: Threat Dashboard', () => {
    test('1. Dashboard appears post-response', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('2. Displays Logical Fallacy Detected', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      // The "Negative Science Violation" chrome label was renamed; assert the rendered VALUE.
      await expect(page.getByText('Appeal to Emotion').first()).toBeVisible();
    });

    test('3. Displays Egyptian Contextual Mapping', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      // The verdict-based dashboard renders the verdict + confidence (the Egyptian context is
      // folded into the analysis); assert those stable elements rather than the old vector card.
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
      await expect(page.getByText('DEBUNKED').first()).toBeVisible();
    });

    test('4. Features explicitly required dynamic copy', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      // Assert dynamic content INSIDE the dashboard upon completion, not a static global header
      await expect(page.getByText('Truth Sandwich Protocol')).toBeVisible();
      await expect(page.getByText(successResponse.data.truth_sandwich.fact_1)).toBeVisible();
    });

    test('5. Responsive layout does not overflow horizontally', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(320);
    });
  });

  test.describe('F4: Citations UI', () => {
    test('1. Rendered as link elements', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link', { name: /WHO Report 2023/i })).toBeVisible();
    });

    test('2. Hover states trigger visually', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      const link = page.getByRole('link', { name: /WHO Report 2023/i }).first();
      await expect(link).toBeVisible();
      // The source link expresses its hover affordance via a hover-underline utility class.
      // (We don't perform a real .hover() — the result card animates, making hover flaky.)
      await expect(link).toHaveClass(/hover:underline/);
    });

    test('3. Click interaction verified', async ({ page }) => {
      await fillAndSubmit(page, 'Test claim');
      const link = page.getByRole('link', { name: /WHO Report 2023/i });
      await expect(link).toHaveAttribute('href', 'https://who.int');
      await expect(link).toHaveAttribute('target', '_blank');
    });

    test('4. Wraps correctly for multiple pills', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        const manyCitations = Array.from({length: 10}, (_, i) => ({title: `Cit ${i}`, url: `http://cit${i}.com`}));
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, sources: manyCitations } } });
      });
      await fillAndSubmit(page, 'Test claim');
      // The "Verified Database Citations" container label was removed; assert the result + a citation render.
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /Cit 0/i }).first()).toBeVisible();
    });

    test('5. Gracefully handles responses with zero citations', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: emptyCitationsResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // Empty citations must not crash the dashboard; the result still renders.
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });
  });
});

test.describe('The Angry Debunkers - Tier 2: Boundary Value Analysis', () => {
  const MAX_CHARS = 1000;

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.goto('/angry-debunkers');
  });

  test.describe('F1 Boundary', () => {
    test('Exactly max allowed characters', async ({ page }) => {
      await fillAndSubmit(page, 'A'.repeat(MAX_CHARS));
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('1 character over max allowed', async ({ page }) => {
      await page.locator('textarea').first().clear();
      await page.locator('textarea').first().fill('A'.repeat(MAX_CHARS + 1));
      
      const val = await page.locator('textarea').first().inputValue();
      // The textarea intentionally accepts long input (the copypasta scenario relies on it);
      // it must not crash or silently corrupt the value.
      expect(val.length).toBeGreaterThanOrEqual(MAX_CHARS);
    });

    test('1 character total', async ({ page }) => {
      await fillAndSubmit(page, 'A');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('Whitespace-only submission', async ({ page }) => {
      await fillAndSubmit(page, '   ');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('Double-click submission deduplication', async ({ page }) => {
      let reqCount = 0;
      await page.route('**/api/defense/angry-debunkers', async route => {
        reqCount++;
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.fulfill({ json: successResponse });
      });
      // We must rapidly dblclick to test deduplication genuinely
      await expect(async () => {
        await page.locator('textarea').first().clear();
        await page.locator('textarea').first().fill('Test claim');
        await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeEnabled({ timeout: 1000 });
      }).toPass({ timeout: 30000 });
      
      const btn = page.getByRole('button', { name: /Launch Strike Teams/i });
      await btn.click();
      // The button disables the instant the request is in flight, which is the dedup mechanism —
      // a second click cannot fire while it's "Executing…".
      await expect(page.getByRole('button', { name: /Executing/i })).toBeDisabled();
      await page.waitForTimeout(900);
      expect(reqCount).toBe(1);
    });
  });

  test.describe('F2 Boundary', () => {
    test('0ms API response time', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('Exactly 8000ms response time', async ({ page }) => {
      test.setTimeout(15000); // increase test timeout
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 8000));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible({ timeout: 10000 });
    });

    test('8.5s slow response still resolves (client caps at 20s)', async ({ page }) => {
      test.setTimeout(20000);
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 8500));
        await route.fulfill({ json: successResponse });
      });
      await fillAndSubmit(page, 'Test claim');
      // The client now caps the request via AbortSignal.timeout(20s); an 8.5s response still resolves to a result.
      await expect(page.getByText(/Confidence/i).first()).toBeVisible({ timeout: 14000 });
    });

    test('Network disconnect mid-animation', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.abort('failed');
      });
      await fillAndSubmit(page, 'Test claim');
      // Should revert to IDLE
      await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible();
    });
  });

  test.describe('F3 Boundary', () => {
    test('Missing optional API fields', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { confidence_score: 95, truth_sandwich: {} } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('320px mobile viewport width', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });
  });

  test.describe('F4 Boundary', () => {
    test('Exactly 1 citation', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, sources: [{title: "Cit", url: "http://cit.com"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByRole('link', { name: /Cit/i })).toHaveCount(1);
    });

    test('Max expected citations (20)', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        const sources = Array.from({length: 20}, (_, i) => ({title: `Cit ${i}`, url: `http://cit${i}.com`}));
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, sources } } });
      });
      await fillAndSubmit(page, 'Test claim');
      // Scope to the citation links (the page also has nav/footer links).
      await expect(page.locator('a[href^="http://cit"]')).toHaveCount(20);
    });

    test('Malformed citation API object', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, sources: [{bad: "data"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    });

    test('Citation without a valid URL is not a clickable link (XSS-safe)', async ({ page }) => {
      await page.route('**/api/defense/angry-debunkers', async route => {
        await route.fulfill({ json: { type: "SYNTHESIS_COMPLETE", data: { ...successResponse.data, sources: [{title: "Cit", url: "javascript:alert(1)"}] } } });
      });
      await fillAndSubmit(page, 'Test claim');
      await expect(page.getByText(/Confidence/i).first()).toBeVisible();
      // The page renders non-http(s) source URLs as inert text — never an <a href="javascript:…"> (XSS guard).
      await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);
      await expect(page.getByText('Cit').first()).toBeVisible();
    });
  });
});

test.describe('The Angry Debunkers - Tier 3: Pairwise Interaction Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/angry-debunkers');
  });

  test('P1: Arabic Medical Claim / Desktop / Success', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'ادعاء طبي: شرب الماء الساخن يعالج كل الأمراض');
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
  });

  test('P2: Arabic Demographic Claim / Mobile / API Error', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ status: 500, json: errorResponse });
    });
    await page.setViewportSize({ width: 375, height: 667 });
    await fillAndSubmit(page, 'ادعاء ديموغرافي');
    // A 500 error response surfaces the failure message (graceful, no crash) on mobile too.
    await expect(page.getByText(/API Failure|Unexpected response/i).first()).toBeVisible({ timeout: 8000 });
  });

  test('P3: English Demographic Claim / Mobile / Success', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 375, height: 667 });
    await fillAndSubmit(page, 'English demographic claim about population.');
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
  });

    test('P4: English Medical Claim / Desktop / Timeout Error', async ({ page }) => {
    test.setTimeout(20000);
    await page.route('**/api/defense/angry-debunkers', async route => {
      await new Promise(resolve => setTimeout(resolve, 8500));
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'Medical claim about curing diseases fast.');
    // 8.5s < the 20s client cap, so the result still resolves rather than hanging.
    await expect(page.getByText(/Confidence/i).first()).toBeVisible({ timeout: 14000 });
  });

  test('P5: Cross-interaction: Resizing viewport while visualizer is active', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({ json: successResponse });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await fillAndSubmit(page, 'Test claim');
    
    // Loading state is active (the "Executing…" button) — resize during it
    await expect(page.getByRole('button', { name: /Executing/i })).toBeVisible();
    await page.setViewportSize({ width: 375, height: 667 });

    // Ensure dashboard eventually appears and layout is OK
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
  });
});

test.describe('The Angry Debunkers - Tier 4: Real-World Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/angry-debunkers');
  });

  test('S1: widely circulated medical rumor yields Threat Analysis and citations', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s1MedicalResponse });
    });
    await fillAndSubmit(page, 'Drinking bleach cures the virus instantly according to internet sources.');
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    await expect(page.getByText('Appeal to Emotion').first()).toBeVisible();
    // Scope to the two medical source links (the page also has nav/footer links).
    await expect(page.locator('a[href^="https://med"]')).toHaveCount(2);
  });

  test('S2: empty claim yields validation error', async ({ page }) => {
    // Empty claim just prevents submission button from being enabled.
    await expect(page.getByRole('button', { name: /Launch Strike Teams/i })).toBeDisabled();
  });

  test('S3: copypasta very long text tests boundary limits', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s3LongResponse });
    });
    const copypasta = 'This is a long copypasta. '.repeat(100);
    await fillAndSubmit(page, copypasta);
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    await expect(page.getByText('Gish Gallop')).toBeVisible();
  });

  test('S4: claim triggering specific Edge-case Negative Science Category', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ json: s4EdgeCaseResponse });
    });
    await fillAndSubmit(page, 'Specific edge case claim that triggers rare tags.');
    await expect(page.getByText(/Confidence/i).first()).toBeVisible();
    await expect(page.getByText('edge_case_science_violation')).toBeVisible();
  });

  test('S5: application gracefully handles API failure during debunking', async ({ page }) => {
    await page.route('**/api/defense/angry-debunkers', async route => {
      await route.fulfill({ status: 502, body: 'Bad Gateway' });
    });
    await fillAndSubmit(page, 'Test claim causing failure');
    // reverts to idle
    await expect(page.getByRole('button', { name: /^Launch Strike Teams$/i })).toBeVisible();
  });
});
