/* ═══════════════════════════════════════════════════════════════
 * /deepreal/game — the DeepReal inoculation game arena.
 *
 * Thin route wrapper that mounts <DeepRealGameArena/>, the self-contained
 * client component which drives the game off /api/science/game. This route
 * was referenced by the nav search, roadmap, pages-map, and the science
 * smoke test, but the page file was missing (→ 404). This restores it.
 * ═══════════════════════════════════════════════════════════════ */
import { DeepRealGameArena } from "@/components/science/deepreal-game-arena";
import { PageNavigation } from "@/components/shared/page-navigation";

export default function DeepRealGamePage() {
  return (
    <main style={{ paddingTop: "var(--navbar-height)" }}>
      <DeepRealGameArena />
      <PageNavigation currentPath="/deepreal/game" />
    </main>
  );
}
