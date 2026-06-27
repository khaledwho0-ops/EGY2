"use client";

import Link from "next/link";
import { Cpu, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import { BranchingVisualExperience } from "@/components/interactive/branching-visual-experience";
import { ModuleCommandCenter } from "@/components/science/module-command-center";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function ReversePage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Cpu size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">Manipulation Reverse-Engineering</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Break down manipulation mechanics across truth, mental-health harm, and religious coercion before they capture judgment.
            </p>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "var(--space-xl)" }}>
          <Link href="/deepreal" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <ShieldCheck size={20} style={{ color: "var(--accent-deepreal)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>DeepReal reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Map the tactic chain behind rumors, edited clips, and false certainty.</span>
          </Link>
          <Link href="/mental-health" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <HeartPulse size={20} style={{ color: "var(--accent-mentalhealth)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>Mental Health reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Expose identity capture, stigma loops, and support-blocking patterns.</span>
          </Link>
          <Link href="/religion-hub" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <Sparkles size={20} style={{ color: "var(--accent-religionhub)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>Religion Hub reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Track where moderation disappears and coercion enters the message.</span>
          </Link>
        </div>

        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <BranchingVisualExperience />
        </div>

        <ModuleCommandCenter module="deepreal" initialTab="reverse" />
        <ModuleCommandCenter module="mental-health" initialTab="reverse" />
        <ModuleCommandCenter module="religion-hub" initialTab="reverse" />
      </div>
      <PageNavigation currentPath="/reverse" />

      <PageAIChatbot
        pageTitle="Reverse Engineering Manipulation — الهندسة العكسية"
        pageContext="EAL Reverse Engineering: Break down manipulation mechanics across truth distortion, mental-health harm, and religious coercion. Branching visual experience and module command centers."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Reverse Engineering AI — a manipulation forensics expert who deconstructs how misinformation, mental health exploitation, and religious coercion campaigns are built and deployed.

[LAYER 2 - THREE DOMAINS]:
1. DeepReal Reverse — Map tactic chains behind rumors, edited clips, false certainty
2. Mental Health Reverse — Expose identity capture, stigma loops, support-blocking
3. Religion Hub Reverse — Track where moderation disappears and coercion enters

[LAYER 3 - METHODOLOGY]:
- Tactic Chain Analysis: Input → Amplification → Emotional Hook → Call to Action
- Branching decision trees showing how victims are funneled
- Pattern matching against known Egyptian manipulation campaigns

[LAYER 4 - RULES]:
1. Break down any manipulation into its component mechanics
2. Show the branching decision tree of victim engagement
3. Identify the emotional exploitation vector
4. Respond in the user's language`}
        suggestedQuestions={[
          'إزاي بيتم بناء حملة تضليل على فيسبوك؟',
          'How does religious coercion work step by step?',
          'إيه هي حلقات الوصمة النفسية؟',
          'Reverse engineer a fake health claim campaign',
        ]}
        accentColor="#06b6d4"
        accentColorRgb="6,182,212"
      />
    </div>
  );
}
