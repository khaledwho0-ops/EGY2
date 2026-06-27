'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Step {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

interface Section {
  id: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  timeEst: string;
  steps: Step[];
  proTip: string;
  tags: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: 's1',
    emoji: '🚀',
    titleEn: 'Getting Started',
    titleAr: 'البداية الصحيحة',
    timeEst: '5 min',
    tags: ['start', 'assessment', 'dashboard', 'curriculum', 'onboarding', 'beginning', 'first'],
    steps: [
      {
        id: 's1-1',
        text: 'Take the Initial Assessment to baseline your cognitive immunity score.',
        link: '/assessment',
        linkLabel: 'Open Assessment →',
      },
      {
        id: 's1-2',
        text: 'Start the 144-Day Curriculum — complete Day 1 calibration module.',
        link: '/curriculum/phase0',
        linkLabel: 'Begin Day 1 →',
      },
      {
        id: 's1-3',
        text: 'Set up your Dashboard to see your XP, progress, and badges.',
        link: '/dashboard',
        linkLabel: 'Open Dashboard →',
      },
      {
        id: 's1-4',
        text: 'Complete your Bias Fingerprint to know your cognitive vulnerabilities.',
        link: '/bias-fingerprint',
        linkLabel: 'Bias Fingerprint →',
      },
      {
        id: 's1-5',
        text: 'Join the Inoculation Passport — your evolving immunity record begins here.',
        link: '/inoculation-passport',
        linkLabel: 'Open Passport →',
      },
    ],
    proTip: "Don't skip the assessment — your initial score guides everything else and personalizes your learning path.",
  },
  {
    id: 's2',
    emoji: '🛡️',
    titleEn: 'Daily Defense Routine',
    titleAr: 'الروتين الدفاعي اليومي',
    timeEst: '15 min/day',
    tags: ['daily', 'routine', 'morning', 'evening', 'threat', 'habit', 'defense', 'debunker'],
    steps: [
      {
        id: 's2-1',
        text: 'Morning (5 min): Check the Threat Map for today\'s Egyptian misinformation trends.',
        link: '/threat-map',
        linkLabel: 'Open Threat Map →',
      },
      {
        id: 's2-2',
        text: 'Daily (10 min): Complete one curriculum exercise.',
        link: '/curriculum/phase0',
        linkLabel: 'Today\'s Exercise →',
      },
      {
        id: 's2-3',
        text: 'When you see something suspicious: run it through the Angry Debunkers tool.',
        link: '/angry-debunkers',
        linkLabel: 'Angry Debunkers →',
      },
      {
        id: 's2-4',
        text: 'Evening: Review your progress and streaks.',
        link: '/dashboard',
        linkLabel: 'Evening Check-in →',
      },
      {
        id: 's2-5',
        text: 'Weekend: Practice debate against AI opponents.',
        link: '/swarm-debate',
        linkLabel: 'Swarm Debate →',
      },
    ],
    proTip: 'The 10-second CalmReveal pause BEFORE debunking is not optional — it prevents emotional mistakes that undermine credibility.',
  },
  {
    id: 's3',
    emoji: '🔬',
    titleEn: 'Science Mastery Path',
    titleAr: 'مسار إتقان العلوم',
    timeEst: '2–4 hrs',
    tags: ['science', 'statistics', 'paper', 'research', 'fallacy', 'evidence', 'drug', 'study'],
    steps: [
      {
        id: 's3-1',
        text: 'Start with 33 statistical fallacy exercises: p-hacking, Simpson\'s Paradox, survivorship bias.',
        link: '/science',
        linkLabel: 'Science Module →',
      },
      {
        id: 's3-2',
        text: 'Practice with the Paper Auditor — upload any research paper for AI analysis.',
        link: '/paper-auditor',
        linkLabel: 'Paper Auditor →',
      },
      {
        id: 's3-3',
        text: 'Learn to spot weak studies using the Stat Power calculator.',
        link: '/stat-power',
        linkLabel: 'Stat Power →',
      },
      {
        id: 's3-4',
        text: 'Verify medication claims using the Drug Checker.',
        link: '/drug-checker',
        linkLabel: 'Drug Checker →',
      },
      {
        id: 's3-5',
        text: 'Understand the evidence hierarchy: case report → RCT → Cochrane review.',
        link: '/evidence',
        linkLabel: 'Evidence Hierarchy →',
      },
    ],
    proTip: "The 'survivorship bias' module is the most mind-bending — do it when you're fully awake and alert.",
  },
  {
    id: 's4',
    emoji: '🕌',
    titleEn: 'Islamic Intelligence Toolkit',
    titleAr: 'مجموعة أدوات الذكاء الإسلامي',
    timeEst: '30 min',
    tags: ['islamic', 'hadith', 'fatwa', 'quran', 'sheikh', 'zakat', 'halal', 'sectarian', 'religion'],
    steps: [
      {
        id: 's4-1',
        text: 'Hadith Checker: Paste any hadith → get Sahih/Hasan/Da\'if/Mawdu grading with isnad chain.',
        link: '/religion-hub/tools/hadith-check',
        linkLabel: 'Hadith Checker →',
      },
      {
        id: 's4-2',
        text: 'Fatwa Context: Get full scholarly context for any fatwa — avoid out-of-context citations.',
        link: '/religion-hub/tools/fatwa-context',
        linkLabel: 'Fatwa Context →',
      },
      {
        id: 's4-3',
        text: 'Sectarian Detector: Identify hidden sectarian manipulation in Islamic content.',
        link: '/religion-hub/tools/sectarian-detector',
        linkLabel: 'Sectarian Detector →',
      },
      {
        id: 's4-4',
        text: 'Quran Context: Verify Quranic quotes are accurate and in proper context.',
        link: '/religion-hub/tools/quran-context',
        linkLabel: 'Quran Context →',
      },
      {
        id: 's4-5',
        text: 'Authority Verifier: Check if a \'sheikh\' is actually qualified before sharing their content.',
        link: '/religion-hub/tools/authority-verifier',
        linkLabel: 'Authority Verifier →',
      },
      {
        id: 's4-6',
        text: 'Access Zakat Calculator, Mawarith Inheritance, Halal Finance, and MaqasidCheck.',
        link: '/religion-hub',
        linkLabel: 'Religion Hub →',
      },
    ],
    proTip: 'The Sectarian Detector catches manipulation in 95% of viral Islamic content — always use it first before sharing.',
  },
  {
    id: 's5',
    emoji: '🔍',
    titleEn: 'Advanced Investigation (OSINT)',
    titleAr: 'التحقيق المتقدم والاستخبارات المفتوحة',
    timeEst: '1–2 hrs',
    tags: ['osint', 'investigation', 'whatsapp', 'image', 'forensic', 'deepfake', 'verify', 'fake', 'photo'],
    steps: [
      {
        id: 's5-1',
        text: 'OSINT Investigator: Full investigation workflow with AI-guided step-by-step process.',
        link: '/osint-investigator',
        linkLabel: 'OSINT Investigator →',
      },
      {
        id: 's5-2',
        text: 'WhatsApp Analyzer: Forward suspicious messages for instant AI analysis.',
        link: '/whatsapp-analyzer',
        linkLabel: 'WhatsApp Analyzer →',
      },
      {
        id: 's5-3',
        text: 'Image Forensics: Upload images to detect manipulation and extract hidden metadata.',
        link: '/forensic-image',
        linkLabel: 'Image Forensics →',
      },
      {
        id: 's5-4',
        text: 'DeepReal: Complete multimedia verification suite for video, audio, and images.',
        link: '/deepreal',
        linkLabel: 'DeepReal Suite →',
      },
      {
        id: 's5-5',
        text: 'DeepReal Forensics: Advanced forensic analysis for sophisticated fakes.',
        link: '/deepreal-forensics',
        linkLabel: 'DeepReal Forensics →',
      },
      {
        id: 's5-6',
        text: 'C2PA Verification: Verify content credentials and provenance chains.',
        link: '/forensic-c2pa',
        linkLabel: 'C2PA Verifier →',
      },
    ],
    proTip: 'Always start with reverse image search before anything else — it solves 60% of cases immediately and saves significant time.',
  },
  {
    id: 's6',
    emoji: '⚔️',
    titleEn: 'Combat Training (Debate)',
    titleAr: 'التدريب القتالي على النقاش',
    timeEst: '45 min',
    tags: ['debate', 'swarm', 'combat', 'training', 'argument', 'manipulation', 'bad news', 'peer', 'game'],
    steps: [
      {
        id: 's6-1',
        text: 'Live Swarm Debate: Face 5 simultaneous AI opponents — Ad-Hominem Agent, Cherry-Picker, False-Authority Sheikh, Conspiracy Framer, and Deepfake Skeptic. Score 95/100 for certification.',
        link: '/swarm-debate',
        linkLabel: 'Enter Swarm Debate →',
      },
      {
        id: 's6-2',
        text: 'Debate Simulator: 1-on-1 practice to build fundamental debate skills.',
        link: '/debate-sim',
        linkLabel: 'Debate Simulator →',
      },
      {
        id: 's6-3',
        text: 'Bad News Game: Learn manipulation tactics by playing the manipulator — inoculation by experience.',
        link: '/bad-news',
        linkLabel: 'Bad News Game →',
      },
      {
        id: 's6-4',
        text: 'Peer Challenge: Challenge friends to fact-check competitions and track scores.',
        link: '/peer-challenge',
        linkLabel: 'Peer Challenge →',
      },
    ],
    proTip: 'Do the Bad News Game BEFORE the Swarm Debate — understanding how manipulation works from the inside makes you truly immune to it.',
  },
  {
    id: 's7',
    emoji: '✨',
    titleEn: 'AI Power Tools',
    titleAr: 'أدوات الذكاء الاصطناعي القوية',
    timeEst: '20 min',
    tags: ['ai', 'nvidia', 'editor', 'prompt', 'chatbot', 'agent', 'model', 'generate', 'template'],
    steps: [
      {
        id: 's7-1',
        text: 'AI Live Editor: Describe any UI component in natural language → AI generates it live. Pre-built templates included.',
        link: '/ai-editor',
        linkLabel: 'AI Live Editor →',
      },
      {
        id: 's7-2',
        text: 'AI Hub: Access specialized AI models for different analysis tasks.',
        link: '/nvidia-hub',
        linkLabel: 'AI Hub →',
      },
      {
        id: 's7-3',
        text: 'Prompt Lab: Test, optimize, and save prompt templates for fact-checking.',
        link: '/prompt-lab',
        linkLabel: 'Prompt Lab →',
      },
      {
        id: 's7-4',
        text: 'AI Chatbot: Intelligent fact-checking assistant available 24/7.',
        link: '/chatbot',
        linkLabel: 'Open Chatbot →',
      },
      {
        id: 's7-5',
        text: 'AI Agents: Deploy autonomous investigation agents for complex research.',
        link: '/ai-agents',
        linkLabel: 'AI Agents →',
      },
    ],
    proTip: "In the AI Editor, use the 'Logic Scenarios' tab for pre-built templates that showcase the platform's most powerful features.",
  },
  {
    id: 's8',
    emoji: '📊',
    titleEn: 'Tracking Your Progress',
    titleAr: 'تتبع تقدمك',
    timeEst: '10 min',
    tags: ['progress', 'tracking', 'certificate', 'xp', 'badge', 'score', 'dashboard', 'level', 'analytics'],
    steps: [
      {
        id: 's8-1',
        text: 'Dashboard: Main progress hub with XP, level, streak counter, and badge collection.',
        link: '/dashboard',
        linkLabel: 'Open Dashboard →',
      },
      {
        id: 's8-2',
        text: 'Assessment: Full cognitive immunity test — retake monthly to track improvement.',
        link: '/assessment',
        linkLabel: 'Take Assessment →',
      },
      {
        id: 's8-3',
        text: 'Certificate: Earned when you complete all phases with 90%+ score.',
        link: '/certificate',
        linkLabel: 'View Certificate →',
      },
      {
        id: 's8-4',
        text: 'Self-Test Protocol: Structured monthly re-evaluation of your cognitive immunity.',
        link: '/self-test-protocol',
        linkLabel: 'Self-Test Protocol →',
      },
      {
        id: 's8-5',
        text: 'Inoculation Passport: Your evolving immunity record across all threat categories.',
        link: '/inoculation-passport',
        linkLabel: 'View Passport →',
      },
      {
        id: 's8-6',
        text: 'Effect Dashboard: Visualize your learning effect size — target d ≥ 0.52.',
        link: '/effect-dashboard',
        linkLabel: 'Effect Dashboard →',
      },
    ],
    proTip: 'Certificate requires ALL phases complete + 95/100 Swarm Debate + MIST-20 ≥ 90%. Start the Swarm Debate early in your journey!',
  },
  {
    id: 's9',
    emoji: '👨‍👩‍👧‍👦',
    titleEn: 'For Families & Communities',
    titleAr: 'للعائلات والمجتمعات',
    timeEst: '30 min',
    tags: ['family', 'community', 'children', 'women', 'men', 'arabic', 'global', 'connect', 'kit'],
    steps: [
      {
        id: 's9-1',
        text: 'Family Kit: Complete media literacy tools and activities for the whole family.',
        link: '/family-kit',
        linkLabel: 'Family Kit →',
      },
      {
        id: 's9-2',
        text: "Women's Shield: Gender-specific misinformation defense strategies and tools.",
        link: '/womens-shield',
        linkLabel: "Women's Shield →",
      },
      {
        id: 's9-3',
        text: "Men's Shield: Male-focused critical thinking and manipulation resistance.",
        link: '/mens-shield',
        linkLabel: "Men's Shield →",
      },
      {
        id: 's9-4',
        text: 'Arabic Shield: Language-specific protections for Arabic-language misinformation.',
        link: '/arabic-shield',
        linkLabel: 'Arabic Shield →',
      },
      {
        id: 's9-5',
        text: 'Connect: Community forum for peer support and shared fact-checking.',
        link: '/connect',
        linkLabel: 'Join Community →',
      },
      {
        id: 's9-6',
        text: 'Global Alliance: International partner network for cross-border misinformation tracking.',
        link: '/global-alliance',
        linkLabel: 'Global Alliance →',
      },
    ],
    proTip: 'Use the Family Kit with children aged 12+ — the manipulation cards make critical thinking a fun, competitive game.',
  },
  {
    id: 's10',
    emoji: '🏆',
    titleEn: 'Competition Demo Guide',
    titleAr: 'دليل عرض المسابقة',
    timeEst: '20 min',
    tags: ['competition', 'demo', 'nvidia', 'showcase', 'live', 'presentation', 'judges', 'award', 'ai editor'],
    steps: [
      {
        id: 's10-1',
        text: 'Open the Live AI Demo page — this is your primary competition showcase window.',
        link: '/competition-demo',
        linkLabel: 'Open Live Demo →',
      },
      {
        id: 's10-2',
        text: 'In the AI Live Editor, load the "Full Platform Showcase" template from the Logic Scenarios tab. This generates the most impressive real-time demonstration.',
        link: '/ai-editor',
        linkLabel: 'AI Live Editor →',
      },
      {
        id: 's10-3',
        text: 'For judges: run the Angry Debunkers on a live claim. The multi-layer AI-assisted analysis unfolds in real time — maximum visual impact.',
        link: '/angry-debunkers',
        linkLabel: 'Angry Debunkers →',
      },
      {
        id: 's10-4',
        text: 'Show the Swarm Debate — entering an argument against 5 simultaneous AI archetypes is the most dramatic feature to demonstrate.',
        link: '/swarm-debate',
        linkLabel: 'Swarm Debate →',
      },
      {
        id: 's10-5',
        text: 'Display the Explore page to show judges the full platform scope: multi-source evidence search, AI-assisted analysis tools, and curriculum modules.',
        link: '/explore',
        linkLabel: 'Platform Map →',
      },
      {
        id: 's10-6',
        text: 'End the demo with the God System multi-layer analysis — the most comprehensive verification feature for AI-focused judges.',
        link: '/god-system',
        linkLabel: 'God System →',
      },
    ],
    proTip: 'Demo order matters: Explore (scope) → AI Editor (speed) → Angry Debunkers (depth) → Swarm Debate (power) → God System (wow). Practice this sequence until it runs in under 8 minutes.',
  },
  {
    id: 's11',
    emoji: '🧠',
    titleEn: 'Advanced Cognitive Tools',
    titleAr: 'أدوات التفكير المعرفي المتقدمة',
    timeEst: '1 hr+',
    tags: ['cognitive', 'fallacy', 'bias', 'philosophy', 'reaction', 'epistemology', 'manipulation', 'cards'],
    steps: [
      {
        id: 's10-1',
        text: 'Cognitive Lab: Hands-on critical thinking experiments with real-time feedback.',
        link: '/cognitive-lab',
        linkLabel: 'Cognitive Lab →',
      },
      {
        id: 's10-2',
        text: 'Fallacy Engine: Complete training on 100 logical fallacies with Egyptian examples.',
        link: '/fallacy-engine',
        linkLabel: 'Fallacy Engine →',
      },
      {
        id: 's10-3',
        text: 'Reaction Test: Measure and track your emotional response speed to misinformation triggers.',
        link: '/reaction-test',
        linkLabel: 'Reaction Test →',
      },
      {
        id: 's10-4',
        text: 'Manipulation Cards: Collect all 52 manipulation technique cards — gamified learning.',
        link: '/manipulation-cards',
        linkLabel: 'Manipulation Cards →',
      },
      {
        id: 's10-5',
        text: 'Bias Detector: Real-time bias detection in any text you paste or type.',
        link: '/bias-detector',
        linkLabel: 'Bias Detector →',
      },
      {
        id: 's10-6',
        text: 'Bias Fingerprint: Build and update your personal cognitive bias profile.',
        link: '/bias-fingerprint',
        linkLabel: 'Bias Fingerprint →',
      },
      {
        id: 's10-7',
        text: 'Epistemology: Deep dive into how we know what we know — the foundation of critical thinking.',
        link: '/epistemology',
        linkLabel: 'Epistemology →',
      },
      {
        id: 's10-8',
        text: 'Philosophy: Foundations of rational thought, logic, and argumentation.',
        link: '/philosophy',
        linkLabel: 'Philosophy →',
      },
    ],
    proTip: 'Do the Reaction Test weekly and track how your response times improve over months — measurable cognitive immunity growth!',
  },
  {
    id: 's11b',
    emoji: '🔮',
    titleEn: 'Surveillance & Intelligence Engines',
    titleAr: 'محركات المراقبة والاستخبارات',
    timeEst: '30 min',
    tags: ['sovo', 'god', 'threat', 'surveillance', 'intelligence', 'deception', 'atlas', 'heatmap', 'trend', 'blackbox'],
    steps: [
      {
        id: 's11b-1',
        text: 'SOVO (Scientific Orchestrator Verification Output): Runs ALL verification engines in parallel and synthesizes results.',
        link: '/sovo',
        linkLabel: 'Open SOVO →',
      },
      {
        id: 's11b-2',
        text: 'The God System: Supreme 8-layer verification — sentiment + fallacies + biases + sources + OSINT + forensics in one unified analysis.',
        link: '/god-system',
        linkLabel: 'God System →',
      },
      {
        id: 's11b-3',
        text: 'Daily Threat Briefing: Automatically generated briefing of today\'s misinformation threats targeting Egypt.',
        link: '/threat-briefing',
        linkLabel: 'Today\'s Briefing →',
      },
      {
        id: 's11b-4',
        text: 'Live Deception Monitor: Real-time feed detecting emerging misinformation campaigns as they spread.',
        link: '/live-deception',
        linkLabel: 'Live Monitor →',
      },
      {
        id: 's11b-5',
        text: 'Egyptian Misinfo Atlas: Geographic map of misinformation hotspots across Egyptian governorates.',
        link: '/misinfo-atlas',
        linkLabel: 'Misinfo Atlas →',
      },
      {
        id: 's11b-6',
        text: 'Epidemiological Rumor Heatmap: Track how rumors spread like viruses across social networks.',
        link: '/rumor-heatmap',
        linkLabel: 'Rumor Heatmap →',
      },
      {
        id: 's11b-7',
        text: 'Viral Trend Forensics: Investigate the origin and spread pattern of any viral trend.',
        link: '/trend-hunter',
        linkLabel: 'Trend Hunter →',
      },
      {
        id: 's11b-8',
        text: 'Blackbox Forensic Audit: Transparent AI reasoning — see exactly how the AI reached its verdict.',
        link: '/blackbox',
        linkLabel: 'Blackbox Audit →',
      },
    ],
    proTip: 'For the deepest investigation, use SOVO first (automated), then switch to the OSINT Investigator (manual) for claims that need human judgment.',
  },
  {
    id: 's11c',
    emoji: '💚',
    titleEn: 'Mental Health & Wellbeing',
    titleAr: 'الصحة النفسية والعافية',
    timeEst: '20 min',
    tags: ['mental', 'health', 'depression', 'drug', 'medical', 'wellness', 'comb', 'behavior', 'knowledge'],
    steps: [
      {
        id: 's11c-1',
        text: 'Mental Health Hub: 14-day mental health literacy curriculum with validated assessments.',
        link: '/mental-health',
        linkLabel: 'Mental Health Hub →',
      },
      {
        id: 's11c-2',
        text: 'Mindframe Safety Gate: Depression screening with Egyptian crisis hotlines (08008880700) and safety protocols.',
        link: '/mental-health/depression',
        linkLabel: 'Safety Gate →',
      },
      {
        id: 's11c-3',
        text: 'Drug Checker: Verify medication claims against published evidence — spot health misinformation.',
        link: '/drug-checker',
        linkLabel: 'Drug Checker →',
      },
      {
        id: 's11c-4',
        text: 'Health Data: Egyptian health statistics from WHO EMRO and CAPMAS for evidence-based decisions.',
        link: '/health-data',
        linkLabel: 'Health Data →',
      },
      {
        id: 's11c-5',
        text: 'Medical Life: Evidence-based wellness resources organized by Egyptian medical reality.',
        link: '/medical-life',
        linkLabel: 'Medical Life →',
      },
      {
        id: 's11c-6',
        text: 'Knowledge Graph: Interactive visualization of how cognitive immunity concepts connect to each other.',
        link: '/knowledge-graph',
        linkLabel: 'Knowledge Graph →',
      },
      {
        id: 's11c-7',
        text: 'COM-B Behavior Tracker: Track behavior change using the COM-B model (Capability, Opportunity, Motivation).',
        link: '/comb-tracker',
        linkLabel: 'COM-B Tracker →',
      },
    ],
    proTip: 'If any user shows signs of distress, the Mindframe Safety Gate activates automatically — it includes Egyptian crisis numbers and Behman Hospital contact.',
  },
  {
    id: 's11d',
    emoji: '🌐',
    titleEn: 'Platform Discovery & Vision',
    titleAr: 'اكتشاف المنصة والرؤية',
    timeEst: '15 min',
    tags: ['explore', 'why', 'impact', 'vision', 'philosophy', 'guide', 'layers', 'roadmap', 'discover'],
    steps: [
      {
        id: 's11d-1',
        text: 'Explore All: Full-screen command center listing every tool, page, and engine with live search.',
        link: '/explore',
        linkLabel: 'Explore Hub →',
      },
      {
        id: 's11d-2',
        text: 'Why Us: Scientific comparison proving this is the strongest dual-mandate platform. 12 categories of competitive advantage.',
        link: '/why-us',
        linkLabel: 'Why Us →',
      },
      {
        id: 's11d-3',
        text: 'Impact Metrics: Real-world numbers — users, claims verified, cognitive scores improved.',
        link: '/impact',
        linkLabel: 'Impact Page →',
      },
      {
        id: 's11d-4',
        text: 'Six Layers Deep Dive: The ADDIE-extended pedagogical architecture explained layer by layer.',
        link: '/six-layers',
        linkLabel: 'Six Layers →',
      },
      {
        id: 's11d-5',
        text: 'Master Roadmap: Full 144-day journey map with milestones, psychometric instruments, and checkpoints.',
        link: '/master-roadmap',
        linkLabel: 'Master Roadmap →',
      },
    ],
    proTip: 'Show judges the Why Us page first — it proves the competitive advantage scientifically before they see any feature demo.',
  },
  {
    id: 's12',
    emoji: '🗺️',
    titleEn: '144-Day Curriculum Roadmap',
    titleAr: 'خارطة طريق المنهج 144 يوم',
    timeEst: '~20 weeks',
    tags: ['roadmap', '144', 'curriculum', 'phases', 'addie', 'learning', 'path', 'journey', 'when', 'start', 'sequence'],
    steps: [
      {
        id: 's12-1',
        text: 'Phase 0 (Days 1–28): Psychological Calibration — Baseline assessment, bias fingerprinting, SIFT method, WhatsApp analysis, inoculation theory. Start HERE.',
        link: '/curriculum/phase0',
        linkLabel: 'Start Phase 0 →',
      },
      {
        id: 's12-2',
        text: 'Phase 1 (Days 29–56): Cognitive Immunity — 100 logical fallacies, 100 scientific fallacies, 100 Islamic fallacies. Each with Egyptian examples and real sources.',
        link: '/curriculum/phase1',
        linkLabel: 'Phase 1 →',
      },
      {
        id: 's12-3',
        text: 'Phase 2 (Days 57–84): Scientific Literacy — Evidence hierarchy, p-hacking detection, RCT vs observational, Cochrane review interpretation, drug claim verification.',
        link: '/curriculum/phase2',
        linkLabel: 'Phase 2 →',
      },
      {
        id: 's12-4',
        text: 'Phase 3 (Days 85–112): Islamic Defense — Hadith authentication (ilm al-rijal), Maqasid reasoning, Fatwa context analysis, sectarian rhetoric detection, Quran context verification.',
        link: '/curriculum/phase3',
        linkLabel: 'Phase 3 →',
      },
      {
        id: 's12-5',
        text: 'Phase 4 (Days 113–144): Sovereign Capstone — Swarm Debate mastery, OSINT investigation missions, cross-domain synthesis, defense paper writing, certificate examination.',
        link: '/curriculum/phase4',
        linkLabel: 'Phase 4 →',
      },
      {
        id: 's12-6',
        text: 'Master Roadmap: See the full zoomed-out view of all 144 days, milestones, instruments, and checkpoints in one page.',
        link: '/master-roadmap',
        linkLabel: 'Full Roadmap →',
      },
    ],
    proTip: 'IMPORTANT: Follow phases IN ORDER. Each phase builds on the previous one. Phase 0 calibrates your baseline — skipping it makes all later measurements meaningless.',
  },
  {
    id: 's13',
    emoji: '🪞',
    titleEn: 'Your Before → After Transformation',
    titleAr: 'تحولك: قبل ← بعد',
    timeEst: 'Ongoing',
    tags: ['before', 'after', 'transformation', 'impact', 'why', 'vision', 'philosophy', 'measure', 'change', 'real'],
    steps: [
      {
        id: 's13-1',
        text: 'Before → After: See the measurable transformation the platform creates in cognitive immunity, media literacy, and mental health awareness.',
        link: '/transformation',
        linkLabel: 'View Transformation →',
      },
      {
        id: 's13-2',
        text: 'Why Us: Scientific comparison showing why this is the strongest dual-mandate (Scientific + Islamic) platform ever built.',
        link: '/why-us',
        linkLabel: 'Why Us →',
      },
      {
        id: 's13-3',
        text: 'Impact Metrics: Real-world impact data — number of users protected, claims debunked, and cognitive immunity scores improved.',
        link: '/impact',
        linkLabel: 'Impact Data →',
      },
      {
        id: 's13-4',
        text: 'Philosophy: The cognition power building philosophy — strongest ever tools plus scientific rigor plus Islamic wisdom.',
        link: '/philosophy',
        linkLabel: 'Read Philosophy →',
      },
      {
        id: 's13-5',
        text: 'Certificate: The culmination — cryptographic certificate proving your cognitive immunity mastery, signed with SHA-256.',
        link: '/certificate',
        linkLabel: 'View Certificate →',
      },
    ],
    proTip: 'The "Before vs After" page is your most powerful marketing tool for competitions. Show judges your MIST-20 score change, CIS evolution, and reaction time improvement graphs.',
  },
];

const QUICK_START_STEPS = [
  { step: 1, label: 'Take Assessment', desc: 'Get your baseline score', link: '/assessment', color: 'from-cyan-500 to-blue-600' },
  { step: 2, label: 'Start Curriculum', desc: 'Day 1 — 5 minutes', link: '/curriculum/phase0', color: 'from-violet-500 to-purple-600' },
  { step: 3, label: 'See Dashboard', desc: 'Your XP & progress', link: '/dashboard', color: 'from-emerald-500 to-teal-600' },
  { step: 4, label: 'Check Threat Map', desc: 'Today\'s misinformation', link: '/threat-map', color: 'from-orange-500 to-amber-600' },
  { step: 5, label: 'Join Passport', desc: 'Build your immunity', link: '/inoculation-passport', color: 'from-rose-500 to-pink-600' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PlatformGuidePage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [readSections, setReadSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // ─── LocalStorage ────────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    try {
      const storedSteps = localStorage.getItem('egy-guide-steps');
      const storedSections = localStorage.getItem('egy-guide-sections');
      if (storedSteps) setCompletedSteps(new Set(JSON.parse(storedSteps)));
      if (storedSections) setReadSections(new Set(JSON.parse(storedSections)));
    } catch {
      // ignore
    }
  }, []);

  const saveSteps = useCallback((steps: Set<string>) => {
    try {
      localStorage.setItem('egy-guide-steps', JSON.stringify(Array.from(steps)));
    } catch { /* ignore */ }
  }, []);

  const saveSections = useCallback((sections: Set<string>) => {
    try {
      localStorage.setItem('egy-guide-sections', JSON.stringify(Array.from(sections)));
    } catch { /* ignore */ }
  }, []);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Mark section as read when opened
        setReadSections(rs => {
          const nrs = new Set(rs);
          nrs.add(id);
          saveSections(nrs);
          return nrs;
        });
      }
      return next;
    });
  };

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      saveSteps(next);
      return next;
    });
  };

  // ─── Search / Filter ─────────────────────────────────────────────────────
  const q = searchQuery.toLowerCase().trim();
  const filteredSections = q
    ? SECTIONS.filter(s =>
        s.titleEn.toLowerCase().includes(q) ||
        s.titleAr.includes(q) ||
        s.tags.some(t => t.includes(q)) ||
        s.steps.some(step => step.text.toLowerCase().includes(q)) ||
        s.proTip.toLowerCase().includes(q)
      )
    : SECTIONS;

  const completedSectionCount = readSections.size;
  const progressPct = Math.round((completedSectionCount / SECTIONS.length) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #020617; }

        .pg-root {
          min-height: 100vh;
          background: #020617;
          color: #e2e8f0;
          font-family: 'Inter', system-ui, sans-serif;
          padding-bottom: 6rem;
        }

        /* ── Header ── */
        .pg-header {
          position: relative;
          overflow: hidden;
          padding: 5rem 1.5rem 3rem;
          text-align: center;
        }
        .pg-header-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%);
          z-index: 0;
        }
        .pg-header-glow {
          position: absolute; inset: 0; z-index: 1;
          background:
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(99,102,241,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6,182,212,0.15) 0%, transparent 60%);
        }
        .pg-header-grid {
          position: absolute; inset: 0; z-index: 1;
          background-image: linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .pg-header-content { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .pg-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4);
          color: #a5b4fc; padding: 0.35rem 1rem; border-radius: 999px;
          font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; margin-bottom: 1.5rem;
        }
        .pg-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900; line-height: 1.1;
          background: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #7dd3fc 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin-bottom: 0.75rem;
        }
        .pg-subtitle {
          font-size: 1rem; color: #94a3b8; margin-bottom: 0.5rem; font-weight: 400;
        }
        .pg-subtitle-ar {
          font-family: 'Cairo', 'Segoe UI', sans-serif;
          font-size: 1.1rem; color: #7dd3fc; opacity: 0.8; margin-bottom: 2rem;
          direction: rtl;
        }

        /* ── Progress Bar ── */
        .pg-progress-wrap {
          max-width: 680px; margin: 0 auto 0; padding: 0 1.5rem;
          position: relative; z-index: 2;
        }
        .pg-progress-labels {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem;
        }
        .pg-progress-pct { color: #7dd3fc; font-weight: 700; font-size: 0.9rem; }
        .pg-progress-bar-track {
          height: 8px; background: rgba(255,255,255,0.06);
          border-radius: 999px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .pg-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #06b6d4);
          border-radius: 999px;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 0 12px rgba(99,102,241,0.5);
        }

        /* ── Main container ── */
        .pg-main { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.25rem; }

        /* ── Search ── */
        .pg-search-wrap {
          position: relative; margin-bottom: 2.5rem;
        }
        .pg-search-icon {
          position: absolute; left: 1rem; top: 50%; transform: translateY(-50%);
          color: #475569; font-size: 1rem; pointer-events: none;
        }
        .pg-search {
          width: 100%; padding: 0.85rem 1rem 0.85rem 2.75rem;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(148,163,184,0.12);
          border-radius: 12px;
          color: #e2e8f0; font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          backdrop-filter: blur(12px);
          font-family: 'Inter', sans-serif;
        }
        .pg-search::placeholder { color: #475569; }
        .pg-search:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .pg-search-clear {
          position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
          background: rgba(99,102,241,0.2); border: none; color: #a5b4fc;
          border-radius: 6px; padding: 0.2rem 0.5rem; cursor: pointer;
          font-size: 0.75rem; transition: background 0.15s;
        }
        .pg-search-clear:hover { background: rgba(99,102,241,0.35); }

        /* ── Quick Start ── */
        .qs-card {
          background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,27,75,0.6) 100%);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 20px; padding: 2rem;
          margin-bottom: 2.5rem;
          position: relative; overflow: hidden;
        }
        .qs-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #a855f7);
        }
        .qs-title {
          font-size: 1rem; font-weight: 700; color: #e2e8f0;
          margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;
        }
        .qs-title-ar {
          font-family: 'Cairo', sans-serif;
          font-size: 0.85rem; color: #7dd3fc; opacity: 0.7;
          margin-bottom: 1.25rem; direction: rtl;
        }
        .qs-steps {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.75rem;
        }
        .qs-step {
          border-radius: 12px; overflow: hidden; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          display: block;
        }
        .qs-step:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .qs-step-inner {
          padding: 0.9rem; height: 100%;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          transition: border-color 0.2s;
        }
        .qs-step:hover .qs-step-inner { border-color: rgba(255,255,255,0.18); }
        .qs-step-num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 800;
          margin-bottom: 0.6rem;
          color: #fff;
        }
        .qs-step-label { font-size: 0.82rem; font-weight: 700; color: #e2e8f0; margin-bottom: 0.25rem; }
        .qs-step-desc { font-size: 0.72rem; color: #64748b; }

        /* ── Accordion ── */
        .acc-list { display: flex; flex-direction: column; gap: 0.85rem; }
        .acc-item {
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(148,163,184,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
          backdrop-filter: blur(12px);
        }
        .acc-item.open {
          border-color: rgba(99,102,241,0.3);
          box-shadow: 0 0 0 1px rgba(99,102,241,0.1), 0 8px 32px rgba(0,0,0,0.3);
        }
        .acc-item.read { border-left: 3px solid rgba(16,185,129,0.5); }

        .acc-header {
          width: 100%; display: flex; align-items: center; gap: 0.75rem;
          padding: 1.1rem 1.25rem;
          background: transparent; border: none; cursor: pointer;
          text-align: left; transition: background 0.15s;
          color: #e2e8f0;
        }
        .acc-header:hover { background: rgba(255,255,255,0.03); }

        .acc-emoji {
          font-size: 1.4rem; flex-shrink: 0;
          width: 2.2rem; text-align: center;
        }
        .acc-titles { flex: 1; min-width: 0; }
        .acc-title-en {
          font-size: 0.95rem; font-weight: 700; color: #e2e8f0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .acc-title-ar {
          font-family: 'Cairo', sans-serif;
          font-size: 0.8rem; color: #7dd3fc; opacity: 0.65;
          direction: rtl;
        }
        .acc-meta { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
        .acc-time {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc; font-size: 0.7rem; font-weight: 600;
          padding: 0.2rem 0.55rem; border-radius: 999px;
          white-space: nowrap;
        }
        .acc-check {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; flex-shrink: 0;
          transition: all 0.2s;
        }
        .acc-check.done {
          background: rgba(16,185,129,0.2);
          border: 1px solid rgba(16,185,129,0.5);
          color: #34d399;
        }
        .acc-check.pending {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: transparent;
        }
        .acc-chevron {
          color: #475569; font-size: 0.75rem; flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .acc-chevron.open { transform: rotate(180deg); }

        /* Accordion body with CSS height transition */
        .acc-body-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .acc-body-wrap.open { grid-template-rows: 1fr; }
        .acc-body-inner { overflow: hidden; }
        .acc-body {
          padding: 0 1.25rem 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: 0;
        }
        .acc-body-top { height: 1rem; }

        /* ── Steps ── */
        .step-list { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem; }
        .step-item {
          display: flex; align-items: flex-start; gap: 0.75rem;
          padding: 0.75rem 0.9rem;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          text-align: left;
          width: 100%;
        }
        .step-item:hover { background: rgba(255,255,255,0.045); border-color: rgba(255,255,255,0.1); }
        .step-item.done { background: rgba(16,185,129,0.04); border-color: rgba(16,185,129,0.2); }

        .step-cb {
          width: 18px; height: 18px; border-radius: 4px;
          border: 2px solid rgba(99,102,241,0.4);
          flex-shrink: 0; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .step-item.done .step-cb {
          background: #6366f1; border-color: #6366f1; color: white;
          font-size: 0.65rem;
        }
        .step-content { flex: 1; min-width: 0; }
        .step-text {
          font-size: 0.85rem; color: #cbd5e1; line-height: 1.5;
          margin-bottom: 0.3rem;
          transition: color 0.2s;
        }
        .step-item.done .step-text { color: #64748b; text-decoration: line-through; text-decoration-color: rgba(100,116,139,0.5); }
        .step-link {
          display: inline-flex; align-items: center; gap: 0.3rem;
          color: #7dd3fc; font-size: 0.78rem; font-weight: 600;
          text-decoration: none;
          padding: 0.2rem 0.5rem;
          background: rgba(6,182,212,0.1);
          border: 1px solid rgba(6,182,212,0.25);
          border-radius: 6px;
          transition: background 0.15s, border-color 0.15s;
        }
        .step-link:hover { background: rgba(6,182,212,0.2); border-color: rgba(6,182,212,0.45); }

        /* ── Pro Tip ── */
        .pro-tip {
          display: flex; gap: 0.75rem; align-items: flex-start;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 10px; padding: 0.85rem 1rem;
        }
        .pro-tip-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 0.05rem; }
        .pro-tip-label {
          font-size: 0.72rem; font-weight: 800; color: #fbbf24;
          text-transform: uppercase; letter-spacing: 0.07em; display: block;
          margin-bottom: 0.2rem;
        }
        .pro-tip-text { font-size: 0.83rem; color: #fde68a; line-height: 1.5; }

        /* ── No results ── */
        .no-results {
          text-align: center; padding: 3rem 1rem; color: #475569;
        }
        .no-results-emoji { font-size: 3rem; margin-bottom: 1rem; }
        .no-results-text { font-size: 0.95rem; }

        /* ── Responsive ── */
        @media (max-width: 600px) {
          .pg-header { padding: 3.5rem 1rem 2.5rem; }
          .acc-title-ar { display: none; }
          .acc-time { display: none; }
          .qs-steps { grid-template-columns: repeat(2, 1fr); }
          .pg-main { padding: 1.5rem 0.85rem; }
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      <div className="pg-root">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="pg-header">
          <div className="pg-header-bg" />
          <div className="pg-header-grid" />
          <div className="pg-header-glow" />
          <div className="pg-header-content">
            <div className="pg-badge">📚 Interactive Platform Guide</div>
            <h1 className="pg-title">Egyptian Awareness Library</h1>
            <p className="pg-subtitle">Your complete roadmap to cognitive immunity</p>
            <p className="pg-subtitle-ar">دليلك الشامل للحصانة المعرفية</p>
          </div>

          {/* Progress Bar */}
          {mounted && (
            <div className="pg-progress-wrap">
              <div className="pg-progress-labels">
                <span>{completedSectionCount} of {SECTIONS.length} sections explored</span>
                <span className="pg-progress-pct">{progressPct}%</span>
              </div>
              <div className="pg-progress-bar-track">
                <div
                  className="pg-progress-bar-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}
        </header>

        {/* ── Main ────────────────────────────────────────────────────────── */}
        <main className="pg-main">

          {/* Search */}
          <div className="pg-search-wrap">
            <span className="pg-search-icon">🔎</span>
            <input
              className="pg-search"
              type="text"
              placeholder="Search sections, tools, topics… (e.g. 'hadith', 'debate', 'image')"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search platform guide"
            />
            {searchQuery && (
              <button className="pg-search-clear" onClick={() => setSearchQuery('')}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Quick Start Card — only show when not searching */}
          {!q && (
            <div className="qs-card">
              <div className="qs-title">⚡ Quick Start — for impatient users</div>
              <div className="qs-title-ar">للمستخدمين المتعجلين — ابدأ هنا</div>
              <div className="qs-steps">
                {QUICK_START_STEPS.map(s => (
                  <Link key={s.step} href={s.link} className="qs-step">
                    <div className="qs-step-inner">
                      <div
                        className="qs-step-num"
                        style={{ background: `linear-gradient(135deg, ${s.color.replace('from-','').replace('to-','')})` }}
                      >
                        {s.step}
                      </div>
                      <div className="qs-step-label">{s.label}</div>
                      <div className="qs-step-desc">{s.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Accordion Sections */}
          {filteredSections.length === 0 ? (
            <div className="no-results">
              <div className="no-results-emoji">🔍</div>
              <div className="no-results-text">No sections match &quot;<strong>{searchQuery}</strong>&quot;. Try a different keyword.</div>
            </div>
          ) : (
            <div className="acc-list">
              {filteredSections.map((section) => {
                const isOpen = openSections.has(section.id);
                const isRead = readSections.has(section.id);
                return (
                  <div
                    key={section.id}
                    className={`acc-item${isOpen ? ' open' : ''}${isRead ? ' read' : ''}`}
                  >
                    {/* Header */}
                    <button
                      className="acc-header"
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="acc-emoji">{section.emoji}</span>
                      <span className="acc-titles">
                        <span className="acc-title-en">{section.titleEn}</span>
                        <span className="acc-title-ar">{section.titleAr}</span>
                      </span>
                      <span className="acc-meta">
                        <span className="acc-time">⏱ {section.timeEst}</span>
                        <span className={`acc-check ${isRead ? 'done' : 'pending'}`}>
                          {isRead ? '✓' : ''}
                        </span>
                      </span>
                      <span className={`acc-chevron${isOpen ? ' open' : ''}`}>▼</span>
                    </button>

                    {/* Animated Body */}
                    <div className={`acc-body-wrap${isOpen ? ' open' : ''}`}>
                      <div className="acc-body-inner">
                        <div className="acc-body">
                          <div className="acc-body-top" />

                          {/* Steps */}
                          <div className="step-list">
                            {section.steps.map((step) => {
                              const done = completedSteps.has(step.id);
                              return (
                                <button
                                  key={step.id}
                                  className={`step-item${done ? ' done' : ''}`}
                                  onClick={() => toggleStep(step.id)}
                                  title="Click to mark as complete"
                                >
                                  <span className="step-cb">{done ? '✓' : ''}</span>
                                  <span className="step-content">
                                    <span className="step-text">{step.text}</span>
                                    {step.link && (
                                      <Link
                                        href={step.link}
                                        className="step-link"
                                        onClick={e => e.stopPropagation()}
                                      >
                                        {step.linkLabel || `${step.link} →`}
                                      </Link>
                                    )}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Pro Tip */}
                          <div className="pro-tip">
                            <span className="pro-tip-icon">⚡</span>
                            <span>
                              <span className="pro-tip-label">Pro Tip</span>
                              <span className="pro-tip-text">{section.proTip}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <PageNavigation currentPath="/platform-guide" />

          {/* Footer note */}
          {!q && (
            <p style={{
              textAlign: 'center', marginTop: '3rem',
              fontSize: '0.78rem', color: '#334155', lineHeight: 1.6
            }}>
              ✅ Click any step to mark it complete &nbsp;•&nbsp; Progress saves automatically to your browser &nbsp;•&nbsp; Refresh any time
            </p>
          )}
        </main>
      </div>
    </>
  );
}
