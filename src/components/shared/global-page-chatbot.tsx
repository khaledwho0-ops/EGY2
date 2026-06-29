"use client";

/**
 * GLOBAL PAGE-AWARE CHATBOT — mounted once in layout.tsx, appears on EVERY page.
 * Reads the current route, looks up its entry in PAGE_GUIDES (src/data/page-guides.ts)
 * for a page-specific `chatbotContext`, and falls back to a One-Law-bound default for
 * any route not yet in the registry — so the assistant works site-wide today, and gets
 * sharper per page as the registry fills.
 *
 * The underlying <PageAIChatbot> calls the real /api/ai/chat (Gemini-first MegaRotator).
 * No mock — if the model can't ground an answer it must say "غير موثّق / Unverified".
 */

import { usePathname } from "next/navigation";
import { PAGE_GUIDES, type PageGuide } from "@/data/page-guides";
import { PageAIChatbot } from "@/components/shared/page-ai-chatbot";

// The One-Law constitution the assistant operates under on every page.
const BASE_SYSTEM = `You are the assistant for موثوق (Mawthooq) — the Egyptian Awareness Library, a scientific, evidence-based, Islamic-aware platform that defends people against misinformation.

GOVERNING LAW (The One-Law — non-negotiable):
- Never state a claim as fact without a real, resolvable source. If you don't have one, say so plainly: "غير موثّق / Unverified" — never fabricate a source, statistic, study, date, or named person.
- Religion: never assert a hadith grade without its collection + number + grading scholar; never issue a fatwa — point to qualified scholars (Dar al-Iftaa, al-Azhar). A fabricated narration may only be mentioned to WARN, clearly labelled.
- Health/crisis: you are not a doctor. For someone in distress, give the verified Egyptian lines — MoHP Mental-Health hotline 08008880700, emergency 123 — and urge real human help.
- Be honest about uncertainty and limits. Prefer "I don't know / let me show you how to verify" over a confident guess.

STYLE: Reply in the user's language (Egyptian Arabic or English, mirror them). Be concise, warm, and practical. When relevant, tell the user which tool on this site to use and how.`;

function prettifyRoute(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean).pop() || "home";
  return seg.replace(/\[.*?\]/g, "").replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim() || "Home";
}

export function GlobalPageChatbot() {
  const pathname = usePathname() || "/";

  // The dedicated /chatbot page already hosts a full assistant — don't double it up.
  if (pathname === "/chatbot") return null;

  const guide: PageGuide | undefined = PAGE_GUIDES[pathname];
  const title = guide?.title || prettifyRoute(pathname);
  const context =
    guide?.chatbotContext ||
    `The user is on the "${title}" page (${pathname}). Help them understand what this page/tool does and how to use it, and answer their questions under the One-Law.`;

  const systemPrompt = `${BASE_SYSTEM}\n\nPAGE CONTEXT: ${context}`;

  // Seed a few suggested questions from the page's example scenarios when present.
  const suggested = (guide?.scenarios || [])
    .map((s) => s.paste)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <PageAIChatbot
      pageTitle={title}
      pageContext={context}
      systemPrompt={systemPrompt}
      suggestedQuestions={suggested}
    />
  );
}
