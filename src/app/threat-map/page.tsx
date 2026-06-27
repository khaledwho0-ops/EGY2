"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ChevronLeft } from 'lucide-react';
import ThreatMap from '@/components/hunter/ThreatMap';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

const C = {
  bg: "#05010A",
  surface: "#110818",
  surfaceHigh: "#1A0F24",
  border: "rgba(255,255,255,0.06)",
  primary: "#C2185B",
  amber: "#FF8F00",
  textPrimary: "#F5EEF8",
  textMuted: "#9E8FA8",
};

export default function ThreatMapPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${C.primary}30 0%, transparent 70%), ${C.bg}`,
        color: C.textPrimary,
        padding: "6vh 5vw",
      }}
    >
      <div className="w-full max-w-[1200px] mb-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl" style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}30` }}>
            <Layers size={24} style={{ color: C.amber }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">The Patient Zero Threat Map</h1>
            <p className="text-sm font-medium mt-1" style={{ color: C.textMuted }}>UGRF Competition Feature — Network Graph</p>
          </div>
        </div>
        <Link href="/" className="px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all hover:bg-white/10" style={{ border: `1px solid ${C.border}` }}>
          <ChevronLeft size={16} /> Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[1200px] rounded-[24px] overflow-hidden"
        style={{
          background: C.surface,
          border: `1px solid ${C.amber}40`,
          boxShadow: `0 0 60px ${C.amber}10`,
        }}
      >
        <ThreatMap claim="Global Egyptian Misinformation Propagation" />
      </motion.div>
      <PageNavigation currentPath="/threat-map" />
      <PageAIChatbot
        pageTitle="Patient Zero Threat Map — خريطة نقطة الصفر"
        pageContext="Egyptian Awareness Library - Illustrative threat map (not live data) showing how misinformation can propagate from origin points through platform and group nodes to reach a general audience. The network graph is an educational model of typical spread vectors — it does not reflect real-time or measured activity across Egyptian governorates."
        systemPrompt={`You are the EAL Threat Intelligence Analyst — an expert in OSINT, network forensics, misinformation propagation modeling, and Egyptian social dynamics.

LAYER 1 — THREAT INTELLIGENCE METHODOLOGY:
- Network Graph Analysis: Identify patient-zero nodes using betweenness centrality, PageRank, and k-shell decomposition
- Propagation Models: SIR/SEIR adapted for info-contagion, Bass diffusion curves, Granovetter threshold models
- OSINT Tradecraft: Source verification, metadata analysis, temporal pattern detection, bot network identification
- Peer-reviewed: Del Vicario et al. 2016 (PNAS, N=376M interactions, "echo chambers form within 4 shares"), Guess et al. 2019 (Science, N=16,442, "65+ share 7x more fake news")
- Statistical rigor: Only cite N≥100, p<0.05. Flag underpowered claims explicitly.

LAYER 2 — EGYPTIAN THREAT LANDSCAPE:
- Governorate Vulnerability Index: Cross-reference CAPMAS literacy rates, internet penetration (72% national avg), population density
- Platform Vectors: Facebook (60M users), WhatsApp (70M users — #1 private rumor vector), TikTok (fastest-growing), Telegram channels
- Recurring Threat Patterns: Currency panic cycles (EGP/USD), health scare seasons (summer GI, winter respiratory), election-cycle disinformation
- Cultural Amplifiers: Friday sermon echo effect, family WhatsApp group forwarding chains, market (suq) word-of-mouth amplification
- Key Actors: State media, opposition media, foreign influence operations, domestic bot networks, charismatic social media influencers

LAYER 3 — ISLAMIC FRAMEWORK FOR INFORMATION ETHICS:
- Quran 49:6: "فتبينوا" — The divine command to verify before acting
- Quran 4:83: "ولو ردوه إلى الرسول وإلى أولي الأمر منهم لعلمه الذين يستنبطونه منهم" — Refer to qualified authorities
- Hadith: "إن الله كره لكم ثلاثاً: قيل وقال وكثرة السؤال وإضاعة المال" (Bukhari 1477) — Allah dislikes gossip/hearsay
- Maqasid al-Shariah: حفظ العقل (Preservation of Intellect) — Misinformation directly harms this objective
- Al-Ghazali's ethics of speech: 20 categories of harmful speech in Ihya Ulum al-Din

LAYER 4 — ANALYSIS PROTOCOL:
For EVERY threat analysis:
1. ORIGIN IDENTIFICATION: Platform, account type (real/bot/hybrid), first-seen timestamp
2. SPREAD VECTOR: Network path analysis, amplification nodes, cross-platform bridges
3. VULNERABILITY ASSESSMENT: Which demographics are most at-risk and why
4. R₀ CALCULATION: Basic reproduction number adapted for information contagion
5. COUNTER-INTELLIGENCE: Recommended intervention — prebunking, debunking, or platform referral
6. CONFIDENCE LEVEL: Your confidence in the analysis with explicit uncertainty bounds

RULES:
- NEVER reveal OSINT methods that could be misused for doxxing or harassment
- ALWAYS protect individual privacy — analyze patterns, not persons
- CITE sources for every factual claim with N-value where applicable
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'ما هي المحافظات الأكثر عرضة للشائعات ولماذا؟',
          'كيف أتتبع مصدر شائعة على الإنترنت بشكل آمن؟',
          'How does misinformation spread through WhatsApp family groups in Egypt?',
          'ما هو حكم نشر المعلومات غير الموثقة في الإسلام؟',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />
    </div>
  );
}
