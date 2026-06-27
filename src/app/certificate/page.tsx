"use client";

import { useState, useEffect, useRef } from "react";
import { Award, Download, Share2, Calendar, Star, Shield, Brain, Heart, Check, Sparkles } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { getCurrentUser } from "@/lib/auth";
import { getProgress } from "@/lib/progress/progress-service";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/* ═══════════════════════════════════════════════════════════
   AWARENESS CERTIFICATE — Feature #9
   "Shareable proof of completion"
   ═══════════════════════════════════════════════════════════ */

export default function Certificate() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const user = null as any; // Removed getCurrentUser from client component
  const progress = (() => { try { return getProgress(); } catch { return null; } })();
  const completedExercises = progress?.exercises?.length ?? 0;
  const totalExercises = 42;
  const completionPct = Math.round((completedExercises / totalExercises) * 100);
  const isComplete = completionPct >= 80;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // Compute strengths per track
  const drCount = progress?.exercises?.filter((e: any) => (e.context || "").includes("deepreal")).length ?? 0;
  const mhCount = progress?.exercises?.filter((e: any) => (e.context || "").includes("mental")).length ?? 0;
  const rhCount = progress?.exercises?.filter((e: any) => (e.context || "").includes("religion")).length ?? 0;
  const strongest = drCount >= mhCount && drCount >= rhCount ? "DeepReal" : mhCount >= rhCount ? "Mental Health" : "Religion Hub";

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 800, textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
          {t({ en: "Your Awareness", ar: "شهادة", arEG: "شهادة" })} <span className="text-gradient">{t({ en: "Certificate", ar: "الوعي", arEG: "الوعي" })}</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28, fontFamily: ff }}>
          {isComplete
            ? t({ en: "Congratulations! You've completed the program.", ar: "تهانينا! أكملت البرنامج.", arEG: "تهانينا! أكملت البرنامج." })
            : t({ en: `Complete ${80 - completionPct}% more to unlock your full certificate.`, ar: `أكمل ${80 - completionPct}% أكثر لفتح شهادتك الكاملة.`, arEG: `أكمل ${80 - completionPct}% أكثر لفتح شهادتك الكاملة.` })}
        </p>

        {/* Certificate Card */}
        <div
          ref={certRef}
          style={{
            background: "linear-gradient(135deg, #0F172A, #1E293B)",
            borderRadius: 20, padding: "48px 40px", position: "relative", overflow: "hidden",
            border: "2px solid rgba(245,158,11,0.3)", maxWidth: 600, margin: "0 auto 28px",
          }}
        >
          {/* Gold corner ornaments */}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              position: "absolute",
              top: i < 2 ? 12 : "auto", bottom: i >= 2 ? 12 : "auto",
              left: i % 2 === 0 ? 12 : "auto", right: i % 2 === 1 ? 12 : "auto",
              width: 40, height: 40,
              borderTop: i < 2 ? "2px solid rgba(245,158,11,0.4)" : "none",
              borderBottom: i >= 2 ? "2px solid rgba(245,158,11,0.4)" : "none",
              borderLeft: i % 2 === 0 ? "2px solid rgba(245,158,11,0.4)" : "none",
              borderRight: i % 2 === 1 ? "2px solid rgba(245,158,11,0.4)" : "none",
            }} />
          ))}

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
            <Award size={24} style={{ color: "#F59E0B" }} />
            <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "#F59E0B", fontWeight: 700, textTransform: "uppercase" }}>
              CERTIFICATE OF AWARENESS
            </span>
            <Award size={24} style={{ color: "#F59E0B" }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(245,158,11,0.6)", letterSpacing: "0.15em", marginBottom: 28 }}>
            شهادة الوعي
          </div>

          {/* Title */}
          <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 6 }}>
            This is to certify that
          </div>
          <div style={{
            fontSize: 28, fontWeight: 800, fontFamily: "'Clash Display', sans-serif",
            color: "#F8FAFC", marginBottom: 6,
            borderBottom: "2px solid rgba(245,158,11,0.3)", paddingBottom: 8,
            display: "inline-block", minWidth: 200,
          }}>
            {user?.name || "Participant"}
          </div>
          <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 16, lineHeight: 1.8, maxWidth: 420, margin: "16px auto" }}>
            has successfully completed the <strong style={{ color: "#F8FAFC" }}>Egyptian Awareness Library</strong> program,
            demonstrating proficiency in misinformation resilience, mental health literacy,
            and positive religious coping.
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, margin: "24px 0" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F59E0B" }}>{completedExercises}</div>
              <div style={{ fontSize: 10, color: "#64748B" }}>EXERCISES</div>
            </div>
            <div style={{ width: 1, background: "rgba(245,158,11,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F59E0B" }}>{completionPct}%</div>
              <div style={{ fontSize: 10, color: "#64748B" }}>COMPLETE</div>
            </div>
            <div style={{ width: 1, background: "rgba(245,158,11,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F59E0B" }}>{strongest}</div>
              <div style={{ fontSize: 10, color: "#64748B" }}>STRONGEST</div>
            </div>
          </div>

          {/* Three pillars */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#94A3B8" }}>
              <Shield size={14} style={{ color: "#3B82F6" }} /> DeepReal
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#94A3B8" }}>
              <Heart size={14} style={{ color: "#EC4899" }} /> Mental Health
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#94A3B8" }}>
              <Sparkles size={14} style={{ color: "#F59E0B" }} /> Religion Hub
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: 20 }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11, color: "#64748B" }}>Date Issued</div>
              <div style={{ fontSize: 13, color: "#94A3B8" }}>{today}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: "#F59E0B", letterSpacing: "0.05em" }}>
                EAL
              </div>
              <div style={{ fontSize: 9, color: "#64748B" }}>Egyptian Awareness Library</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#64748B" }}>ID</div>
              <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "monospace" }}>
                {(user?.id || "anon").slice(0, 8).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Progress to unlock */}
        {!isComplete && (
          <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, fontFamily: ff }}>
              <span>{t({ en: "Progress to full certificate", ar: "التقدم نحو الشهادة الكاملة", arEG: "التقدم نحو الشهادة الكاملة" })}</span>
              <span style={{ fontWeight: 700 }}>{completionPct}% / 80%</span>
            </div>
            <div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--bg-primary)" }}>
              <div style={{ width: `${Math.min(100, (completionPct / 80) * 100)}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #F59E0B, #EF4444)", transition: "width 0.5s" }} />
            </div>
          </div>
        )}
      </div>
      <PageNavigation currentPath="/certificate" />

      <PageAIChatbot
        pageTitle="Awareness Certificate — شهادة الوعي"
        pageContext="Egyptian Awareness Library - Awareness Certificate page. Users earn certificates by completing modules across cognitive training, verification, Islamic tools, and mental health. 80% completion required for full certificate. Based on mastery learning pedagogy."
        systemPrompt={`You are the EAL Certificate & Learning Path Advisor — an expert in educational psychology, mastery learning, and the EAL platform's complete module architecture.

LAYER 1 — PEDAGOGICAL FRAMEWORK:
- Mastery Learning Model: Based on Bloom's (1968) mastery learning and Khan Academy's progressive disclosure
- COM-B Model: Capability × Opportunity × Motivation → Behavior change (Michie et al. 2011, Lancet)
- Competency Levels: Aware (Level 0) → Practiced (Level 1) → Proficient (Level 2) → Master (Level 3)
- Assessment Types: Pre-test (baseline), formative (exercises), summative (certification exam)
- Learning Science: Spaced repetition, interleaving, retrieval practice — all evidence-based (Dunlosky et al. 2013, Psychological Science in the Public Interest)

LAYER 2 — COMPLETE MODULE ARCHITECTURE:
COGNITIVE TRAINING (8 modules):
  - Fallacy Engine (300+ fallacies with Egyptian examples)
  - Critical Thinking Ladder (6 levels: Knowledge→Comprehension→Application→Analysis→Synthesis→Evaluation)
  - Bias Detector, Cognitive Bias Fingerprint, Socratic Debate Simulator
  - Reaction Speed Test, Cognitive Lab, Swarm Debate

VERIFICATION & FORENSICS (8 modules):
  - GOD System (7-Layer verification pipeline)
  - SOVO Orchestrator, DeepReal Dashboard
  - Forensic Image Analysis, C2PA Provenance Check
  - Black Box Audit, OSINT Investigator, Paper Auditor

LIVE INTELLIGENCE (6 modules):
  - Trend Hunter, Live Deception Tracker, Misinfo Atlas
  - Threat Map, Rumor Heatmap, Daily Threat Briefing

ISLAMIC HUB (10 modules):
  - Hadith Checker, Fatwa Context, Sectarian Detector
  - Maqasid Check, WhatsApp Checker, Quran Study
  - Mawarith Calculator, Halal Finance, Authority Verifier

MENTAL HEALTH (5 modules):
  - Mental Health Hub, Depression Program, Drug Checker
  - Women's Psychographic Shield, Men's Crisis Shield

LAYER 3 — ISLAMIC ENCOURAGEMENT FOR LEARNING:
- Hadith: "طلب العلم فريضة على كل مسلم" (Ibn Majah 224, Hasan) — Seeking knowledge is obligatory
- Hadith: "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة" (Muslim 2699, Sahih)
- Quran 39:9: "هل يستوي الذين يعلمون والذين لا يعلمون" — Are those who know equal to those who do not?
- Quran 58:11: "يرفع الله الذين آمنوا منكم والذين أوتوا العلم درجات" — Allah elevates those with knowledge
- Maqasid: حفظ العقل — Preservation of Intellect is one of 5 supreme objectives

LAYER 4 — CERTIFICATION PROTOCOL:
1. PROGRESS TRACKING: Show completion percentage per category with visual progress bars
2. FASTEST PATH: Recommend modules based on user's weakest areas (adaptive learning)
3. CELEBRATION: Acknowledge milestones with culturally appropriate encouragement
4. SHARING: Guide on sharing certificate on LinkedIn, Facebook, WhatsApp
5. CONTINUOUS LEARNING: After certification, recommend advanced modules and real-world application

RULES:
- ALWAYS be encouraging and supportive — never judgmental about slow progress
- CITE the exact module names and paths when recommending next steps
- Provide time estimates for each module (approximate minutes)
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'كيف أحصل على الشهادة بأسرع طريق ممكن؟',
          'ما هي الوحدات المطلوبة في كل فئة بالتفصيل؟',
          'What modules should I prioritize based on beginner level?',
          'ما فضل طلب العلم في الإسلام وكيف يرتبط بالشهادة؟',
        ]}
        accentColor="#f59e0b"
        accentColorRgb="245,158,11"
      />
    </div>
  );
}
