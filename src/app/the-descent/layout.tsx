/* ═══════════════════════════════════════════════════════════════
 * /the-descent layout — Immersive gateway mode (Server Component).
 *
 * NO 'use client'. Exports bilingual metadata and applies the same
 * chrome-hiding <style> trick as /six-layers so the gateway plays
 * full-bleed with no navbar/footer/explore-hub interference.
 * ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'النزول — كيف تتحوّل رسالة إلى نعش، وكيف تطلع | THE DESCENT',
  description:
    'بوابة المكتبة المصرية للوعي: سقوطٌ عبر ٨ طبقات للخداع قتلت مصريين، ثم صعودٌ بالأدوات والتفكير. كل رقم وكل حالة بمصدر موثّق. — An immersive, sourced fall through the 8-layer architecture of deception that kills, and the climb back out: verification tools first, then cognition.',
};

export default function TheDescentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="the-descent-immersive">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ═══ IMMERSIVE MODE — chrome-hide + full-width (forked from /six-layers) ═══ */
            html { background: #050304 !important; }
            body {
              background: transparent !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              height: auto !important;
              width: 100vw !important;
              max-width: 100vw !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            #main-content,
            main,
            .the-descent-immersive,
            .the-descent-immersive > * {
              width: 100vw !important;
              max-width: 100vw !important;
              display: block !important;
            }

            body > div,
            body > div > div,
            body > div > main {
              width: 100vw !important;
              max-width: 100vw !important;
              display: block !important;
            }

            .the-descent-immersive .max-w-6xl,
            .the-descent-immersive .max-w-5xl,
            .the-descent-immersive .max-w-4xl,
            .the-descent-immersive .max-w-3xl {
              margin-left: auto !important;
              margin-right: auto !important;
              float: none !important;
            }

            /* Hide all global chrome */
            header, nav, footer,
            .navbar, .footer, .skip-to-content,
            [class*="Navbar"], [class*="navbar"],
            [class*="Footer"], [class*="footer"],
            body > div > nav, body > div > header, body > div > footer,
            body > div > div > nav, body > div > div > header, body > div > div > footer {
              display: none !important;
              height: 0 !important;
              overflow: hidden !important;
              pointer-events: none !important;
            }

            /* Kill the ExploreHub button */
            [aria-label="Explore All Pages"],
            [aria-label*="استكشف"],
            button[aria-label*="Explore"] {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
              position: absolute !important;
              z-index: -9999 !important;
            }

            /* Thin scrollbar */
            ::-webkit-scrollbar { width: 3px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

            /* The page-navigation footer (added by GatewayDoor) is allowed back in */
            .the-descent-immersive [data-descent-nav] { display: block !important; }
          `,
        }}
      />
      {children}
    </div>
  );
}
