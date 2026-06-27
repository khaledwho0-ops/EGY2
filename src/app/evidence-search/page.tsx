"use client";

/**
 * /evidence-search — Evidence Aggregator page
 * Thin route wrapper around EvidenceAggregatorPanel.
 * Follows the same pattern as other pages on this platform:
 *   - paddingTop: var(--navbar-height) to clear the fixed nav
 *   - container + space-xl/lg padding
 *   - PageNavigation at the bottom
 *   - useRTL for direction
 */

import { EvidenceAggregatorPanel } from "@/components/evidence/EvidenceAggregatorPanel";
import { PageNavigation } from "@/components/shared/page-navigation";
import { useRTL } from "@/components/shared/rtl-provider";

export default function EvidenceSearchPage() {
  const { isRTL } = useRTL();

  return (
    <div
      style={{
        paddingTop: "var(--navbar-height)",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        className="container"
        style={{ padding: "var(--space-xl) var(--space-lg)" }}
      >
        <EvidenceAggregatorPanel />
        <PageNavigation currentPath="/evidence-search" />
      </div>
    </div>
  );
}
