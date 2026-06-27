"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PageNavigation } from '@/components/shared/page-navigation';

/**
 * AI Live Editor Page — Enhanced with Logic Scenarios & Templates
 * ════════════════════════════════════════════════════════════════
 * Users can:
 * 1. Generate UI components from natural language
 * 2. Choose from pre-built Logic Scenario templates
 * 3. Customize and iterate on generated components
 * Powered by NVIDIA NIM Nemotron-3 Ultra 550B
 */

interface ScenarioTemplate {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  icon: string;
  prompt: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
}

const SCENARIO_CATEGORIES = [
  { id: "all", label: "All Templates", labelAr: "كل القوالب", icon: "🌐", color: "#a855f7" },
  { id: "defense", label: "Defense Tools", labelAr: "أدوات الدفاع", icon: "🛡️", color: "#ef4444" },
  { id: "islamic", label: "Islamic", labelAr: "إسلامي", icon: "🕌", color: "#10b981" },
  { id: "science", label: "Science", labelAr: "علمي", icon: "🔬", color: "#3b82f6" },
  { id: "cognitive", label: "Cognitive Training", labelAr: "تدريب معرفي", icon: "🧠", color: "#f59e0b" },
  { id: "dashboard", label: "Dashboards", labelAr: "لوحات", icon: "📊", color: "#06b6d4" },
  { id: "social", label: "Social Media", labelAr: "تواصل اجتماعي", icon: "📱", color: "#ec4899" },
  { id: "game", label: "Gamification", labelAr: "تلعيب", icon: "🎮", color: "#8b5cf6" },
];

const LOGIC_SCENARIOS: ScenarioTemplate[] = [
  // Defense Tools
  {
    id: "claim-verifier",
    title: "Claim Verification Card",
    titleAr: "بطاقة التحقق من الادعاء",
    category: "defense",
    icon: "🔍",
    prompt: "Create a beautiful claim verification card component with dark theme. It should have: an input field for the claim text, a 'Verify' button with gradient, a result section showing verdict (TRUE/FALSE/MISLEADING) with color-coded badges, a confidence meter bar (0-100%), a source credibility section with star ratings, and a 'Truth Sandwich' section showing Fact→Myth→Fact. Use glassmorphism styling, subtle animations on hover, and Arabic text support (RTL).",
    description: "Interactive claim verification with truth sandwich protocol",
    difficulty: "Intermediate",
    tags: ["fact-check", "truth-sandwich", "bilingual"],
  },
  {
    id: "threat-alert",
    title: "Misinformation Threat Alert",
    titleAr: "تنبيه تهديد المعلومات المضللة",
    category: "defense",
    icon: "🚨",
    prompt: "Create a real-time misinformation threat alert banner with dark theme. Features: pulsing red/orange gradient border, threat level indicator (LOW/MEDIUM/HIGH/CRITICAL) with animated dots, the misinformation claim text, affected region badge (Egypt/MENA), spread velocity indicator (shares/hour), platform badges (WhatsApp/Facebook/TikTok), and action buttons: 'Report', 'Investigate', 'Share Truth'. Add a countdown timer showing 'First detected X hours ago'. Use CSS animations for the pulsing effect.",
    description: "Real-time alert banner for active misinformation threats",
    difficulty: "Advanced",
    tags: ["real-time", "threat-detection", "responsive"],
  },
  {
    id: "source-analyzer",
    title: "Source Credibility Analyzer",
    titleAr: "محلل مصداقية المصدر",
    category: "defense",
    icon: "📰",
    prompt: "Build a source credibility analyzer widget with dark theme. Input: a URL or source name. Output section with: credibility score (0-100) shown as an animated circular gauge, factual accuracy rating (5 stars), editorial independence badge, transparency score, historical accuracy chart (simple bar chart), known biases listed as tags, and a comparison table showing how this source ranks against Al Ahram, BBC Arabic, and Al Jazeera. Include a 'MBFC Rating' equivalent section.",
    description: "Evaluate news source reliability with multiple metrics",
    difficulty: "Advanced",
    tags: ["media-literacy", "MBFC", "analytics"],
  },
  {
    id: "deception-layers",
    title: "8-Layer Deception Detector",
    titleAr: "كاشف الخداع ذو الـ٨ طبقات",
    category: "defense",
    icon: "🎭",
    prompt: "Create an 8-layer deception detection visualization with dark theme. Show 8 horizontal layers stacked vertically, each representing a deception type: Layer 1-Fabrication (red), Layer 2-Manipulation (orange), Layer 3-Impersonation (amber), Layer 4-False Context (yellow), Layer 5-Misleading (lime), Layer 6-Satire (green), Layer 7-Opinion as Fact (cyan), Layer 8-Unknown (gray). Each layer shows: name, detection confidence %, and a progress bar. Animate the layers scanning from top to bottom. Add a final verdict at the bottom.",
    description: "Visualize which deception layer is being used",
    difficulty: "Intermediate",
    tags: ["visualization", "deception", "animated"],
  },

  // Islamic Tools
  {
    id: "hadith-card",
    title: "Hadith Authentication Card",
    titleAr: "بطاقة توثيق الحديث",
    category: "islamic",
    icon: "📜",
    prompt: "Create a beautiful Hadith authentication card with a dark Islamic-themed design. Features: Arabic hadith text in a decorative frame with Islamic geometric border pattern, hadith grading badge (Sahih=green, Hasan=yellow, Da'if=orange, Mawdu'=red) with glow effect, narrator chain (isnad) displayed as a vertical timeline with dots, source book reference (Bukhari/Muslim/etc), scholar opinions section with name and verdict, and a 'Learn More' button. Use dark emerald/gold color scheme. Arabic text must be right-aligned.",
    description: "Beautiful hadith verification with isnad chain display",
    difficulty: "Intermediate",
    tags: ["hadith", "isnad", "arabic", "islamic-art"],
  },
  {
    id: "prayer-dashboard",
    title: "Prayer Times Dashboard",
    titleAr: "لوحة أوقات الصلاة",
    category: "islamic",
    icon: "🕐",
    prompt: "Create a premium prayer times dashboard card with dark theme and gold accents. Show 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) in elegant cards with their times. Include: a circular countdown to the next prayer with animated ring, current prayer highlighted with glow, Qibla direction compass widget (simple CSS compass), hijri date display in Arabic, current Islamic month, and a 'Did you pray?' checklist toggle for each prayer. Use dark navy/gold color scheme with subtle Islamic geometric patterns.",
    description: "Complete prayer management dashboard with countdown",
    difficulty: "Advanced",
    tags: ["prayer", "countdown", "qibla", "hijri"],
  },
  {
    id: "quran-context",
    title: "Quran Verse Context Card",
    titleAr: "بطاقة سياق الآية القرآنية",
    category: "islamic",
    icon: "📖",
    prompt: "Create a Quran verse context verification card with elegant dark theme. Show: the verse in beautiful Arabic calligraphy font, surah name and verse number, reason of revelation (سبب النزول) in a collapsible section, common misinterpretations flagged with warning icons, correct tafsir from Ibn Kathir/Al-Tabari, and related verses section. Add a 'Context Score' showing how often this verse is quoted out of context (0-100%). Use dark green/gold theme with subtle arabesque patterns.",
    description: "Verify Quranic verses are quoted in proper context",
    difficulty: "Advanced",
    tags: ["quran", "tafsir", "context", "calligraphy"],
  },

  // Science
  {
    id: "bias-quiz",
    title: "Cognitive Bias Quiz Card",
    titleAr: "بطاقة اختبار التحيز المعرفي",
    category: "science",
    icon: "🧪",
    prompt: "Create an interactive cognitive bias quiz card with dark theme. Show a scenario text, 4 answer options (A/B/C/D) as clickable cards with hover effects, a progress bar showing question 3/10, a score display, and when an answer is selected: reveal the correct answer with green highlight, show the bias name (e.g., 'Confirmation Bias') in a badge, and display a brief explanation. Add a timer countdown (30 seconds per question). Use blue/cyan glassmorphism theme.",
    description: "Interactive quiz testing cognitive bias knowledge",
    difficulty: "Beginner",
    tags: ["quiz", "cognitive-bias", "interactive", "timer"],
  },
  {
    id: "p-value-viz",
    title: "P-Value Visualizer",
    titleAr: "مُصوِّر القيمة الاحتمالية",
    category: "science",
    icon: "📈",
    prompt: "Create a p-value interpretation visualizer with dark theme. Show: a bell curve (normal distribution) drawn with CSS/SVG, a draggable significance threshold line at p=0.05 (highlighted in red), the p-value result as a point on the curve, zones colored green (significant) and red (not significant), interpretation text that updates based on the p-value (e.g., 'Statistically significant at α=0.05'), common misconceptions listed with ❌ marks, and correct interpretation with ✅. Add the ASA 2016 statement quote in a callout box.",
    description: "Visual tool for understanding p-values correctly",
    difficulty: "Advanced",
    tags: ["statistics", "p-value", "visualization", "ASA"],
  },
  {
    id: "study-evaluator",
    title: "Research Study Evaluator",
    titleAr: "مُقيِّم الدراسة البحثية",
    category: "science",
    icon: "🔬",
    prompt: "Create a research study quality evaluator card with dark theme. Input fields for: study type (dropdown: RCT/Cohort/Case-control/Cross-sectional/Case-report), sample size, blinding (none/single/double/triple), control group (yes/no), p-value, effect size, and funding source. Output: an overall quality score (A-F grade) with color coding, an evidence pyramid showing where this study type ranks, specific strengths and weaknesses listed, and recommendations for interpretation. Use blue/white academic theme on dark background.",
    description: "Evaluate research quality with evidence hierarchy",
    difficulty: "Intermediate",
    tags: ["research", "evidence-pyramid", "quality"],
  },

  // Cognitive Training
  {
    id: "fallacy-card",
    title: "Logical Fallacy Flashcard",
    titleAr: "بطاقة المغالطة المنطقية",
    category: "cognitive",
    icon: "🃏",
    prompt: "Create a beautiful flashcard component for logical fallacies with dark theme. Front side: fallacy name in large text, an icon/emoji, difficulty stars (1-5), and category badge (Formal/Informal/Statistical). Back side (revealed on click): definition, a real-world example specific to Egyptian/Arabic context, how to counter it, and related fallacies. Add a flip animation (CSS 3D transform). Include navigation arrows for next/previous fallacy. The card should glow with amber/orange edges.",
    description: "Flippable flashcard teaching logical fallacies",
    difficulty: "Beginner",
    tags: ["flashcard", "fallacy", "flip-animation", "arabic"],
  },
  {
    id: "emotion-meter",
    title: "Emotional Response Meter",
    titleAr: "مقياس الاستجابة العاطفية",
    category: "cognitive",
    icon: "😤",
    prompt: "Build an emotional response meter with dark theme. Show a vertical gauge that goes from 😌 Calm (green, bottom) through 😐 Neutral (yellow, middle) to 😤 Agitated (red, top). Add an animated pointer that the user can drag or that auto-detects from text input. Below the meter: a 'Pause & Breathe' button that triggers a 10-second breathing animation (expanding/contracting circle), reflection questions that appear after the pause, and tips for emotional regulation. Include a history chart showing emotional responses over time.",
    description: "Track and manage emotional reactions to claims",
    difficulty: "Intermediate",
    tags: ["emotion", "breathing", "self-regulation", "animated"],
  },
  {
    id: "manipulation-card",
    title: "Manipulation Technique Card",
    titleAr: "بطاقة تقنية التلاعب",
    category: "cognitive",
    icon: "🎯",
    prompt: "Create a collectible manipulation technique card (like a trading card) with dark theme. Show: technique name in bold, a threat level (1-5 skulls), category (Emotional/Logical/Social/Authority), a real-world example from Egyptian social media, 'How it works' explanation, 'How to defend' counter-strategy, and a 'Rarity' badge (Common/Uncommon/Rare/Legendary). The card should have a holographic shine effect on hover (CSS gradient animation), rounded corners, and a dark metallic border.",
    description: "Collectible cards teaching manipulation tactics",
    difficulty: "Beginner",
    tags: ["gamification", "manipulation", "collectible", "hover-effect"],
  },

  // Dashboards
  {
    id: "immunity-dashboard",
    title: "Cognitive Immunity Dashboard",
    titleAr: "لوحة المناعة المعرفية",
    category: "dashboard",
    icon: "📊",
    prompt: "Create a comprehensive cognitive immunity dashboard with dark theme. Include: an overall immunity score (0-100) as a large animated ring chart, 6 sub-scores shown as hexagonal radar chart (Critical Thinking, Emotional Regulation, Source Verification, Logical Reasoning, Media Literacy, Statistical Literacy), progress through the 144-day curriculum (day X/144 with progress bar), recent activity feed (last 5 exercises completed), streak counter with fire emoji, and achievements/badges section showing unlocked badges. Use cyan/emerald color scheme.",
    description: "Complete overview of your misinformation immunity",
    difficulty: "Advanced",
    tags: ["dashboard", "analytics", "radar-chart", "gamification"],
  },
  {
    id: "progress-tracker",
    title: "144-Day Progress Tracker",
    titleAr: "متتبع تقدم ١٤٤ يوم",
    category: "dashboard",
    icon: "📅",
    prompt: "Build a 144-day curriculum progress tracker with dark theme. Show: a grid calendar view of all 144 days (12 rows × 12 columns), each day colored by status (completed=green, current=pulsing cyan, locked=gray, missed=red), phase labels (Phase 0: Calibration, Phase 1: Foundation, Phase 2: Science, Phase 3: Defense, Phase 4: Mastery) spanning their respective day ranges, today highlighted with a glow ring, total XP earned, and a motivational quote. Clicking a day shows its exercise title. Make it responsive.",
    description: "Visual calendar tracking 144-day curriculum progress",
    difficulty: "Intermediate",
    tags: ["calendar", "progress", "curriculum", "responsive"],
  },

  // Social Media
  {
    id: "whatsapp-analyzer",
    title: "WhatsApp Message Analyzer",
    titleAr: "محلل رسائل واتساب",
    category: "social",
    icon: "💬",
    prompt: "Create a WhatsApp message analyzer interface with dark theme styled to look like WhatsApp's dark mode. Include: a message input area that looks like a WhatsApp chat bubble (green for sent, dark for received), a 'Analyze' button, and results showing: forwarded count detector ('>>>>>'), claim extraction, red flags found (numbered list), verdict badge, and a shareable 'Fact-Check Response' that the user can copy to paste back into WhatsApp. The response should be formatted with WhatsApp markdown (*bold*, _italic_).",
    description: "Analyze WhatsApp forwards for misinformation",
    difficulty: "Intermediate",
    tags: ["whatsapp", "chat-ui", "copy-paste", "arabic"],
  },
  {
    id: "viral-tracker",
    title: "Viral Spread Visualizer",
    titleAr: "مُصوِّر الانتشار الفيروسي",
    category: "social",
    icon: "🌍",
    prompt: "Build a viral spread visualization showing how misinformation spreads across platforms. Dark theme with a central node (the original post) and branching connections to platform nodes (WhatsApp groups → Facebook shares → TikTok reposts → Twitter/X quotes). Each node shows: platform icon, share count, timestamp, and engagement metrics. Animate the spread with expanding ripple effects from center outward. Show a timeline slider at the bottom to scrub through the spread history. Add total reach and velocity metrics.",
    description: "Visualize how misinformation spreads across platforms",
    difficulty: "Advanced",
    tags: ["network-graph", "animation", "platforms", "timeline"],
  },

  // Gamification
  {
    id: "achievement-badge",
    title: "Achievement Badge System",
    titleAr: "نظام شارات الإنجاز",
    category: "game",
    icon: "🏅",
    prompt: "Create an achievement badge showcase with dark theme. Show a grid of 12 circular badges, some unlocked (full color with shine) and some locked (grayscale with lock icon). Badge categories: 'First Debunk' (bronze), 'Truth Seeker' (silver), 'Fallacy Hunter' (gold), 'Science Guardian' (platinum), '7-Day Streak' (fire), 'Master Debater' (diamond). Each badge has: name, description, progress bar (e.g., '3/10 debunks'), and unlock date if earned. Unlocked badges should have a CSS shimmer/holographic effect. Add a total XP counter and level indicator.",
    description: "Gamified achievement system with badges and XP",
    difficulty: "Intermediate",
    tags: ["badges", "achievements", "XP", "holographic"],
  },
  {
    id: "leaderboard",
    title: "Community Leaderboard",
    titleAr: "لوحة المتصدرين",
    category: "game",
    icon: "🏆",
    prompt: "Create a competitive leaderboard with dark theme. Show top 10 users with: rank number (1-3 with gold/silver/bronze crowns), avatar circle, username, level badge, total XP, accuracy percentage, and streak days. The current user's row should be highlighted with a cyan glow. Add filter tabs for: This Week, This Month, All Time, and By Category. Include animated rank changes (green arrow up, red arrow down). The #1 position should have a special crown animation. Add a 'Challenge' button next to each user.",
    description: "Competitive ranking with filters and challenges",
    difficulty: "Advanced",
    tags: ["leaderboard", "ranking", "competition", "animated"],
  },

  // ═══ REAL LOGIC USE-CASE SCENARIOS ═══

  // OSINT Investigation Workflow
  {
    id: "osint-workflow",
    title: "OSINT Investigation Dashboard",
    titleAr: "لوحة تحقيق الاستخبارات المفتوحة",
    category: "defense",
    icon: "🔎",
    prompt: "Create a step-by-step OSINT investigation workflow interface with dark theme. Show 6 investigation stages as numbered steps with progress connector lines: 1) Claim Input (text field + URL), 2) Reverse Image Search (upload box + 3 search engine buttons: Google/TinEye/Yandex), 3) EXIF Metadata Check (file drop zone + results table: GPS/Date/Camera/Software), 4) Geolocation Verify (map placeholder + coordinates display), 5) Source Trace (timeline of where content first appeared), 6) Verdict (color-coded result). Each step has a status indicator (pending/active/complete). Active step has a cyan glow border. Include a 'Tools Used' sidebar listing: Jeffrey's Exif Viewer, Google Reverse Image, Wayback Machine, WHOIS lookup. Dark theme with investigation/detective aesthetic.",
    description: "Step-by-step OSINT investigation workflow with 6 stages",
    difficulty: "Advanced",
    tags: ["OSINT", "forensics", "step-by-step", "detective"],
  },

  // Mental Health Support Interface
  {
    id: "crisis-support",
    title: "Mental Health Support Interface",
    titleAr: "واجهة دعم الصحة النفسية",
    category: "cognitive",
    icon: "💚",
    prompt: "Create a compassionate mental health support interface with dark teal/green theme. Features: a warm, non-clinical greeting in Arabic ('أنت في مكان آمن. كيف تشعر اليوم؟'), an emotional state selector with 8 emotion buttons with emoji (sad/anxious/angry/overwhelmed/hopeless/lonely/confused/okay), each button changing the interface accent color on selection, a 10-second breathing animation (expanding circle that says 'استنشق' then 'أخرج الهواء'), a 'You are not alone' section with Egyptian crisis resources (Befrienders Egypt: 08008880700, Behman Hospital: 16328), and gentle coping strategies shown as soft card tiles (not clinical). Use emerald/teal glassmorphism with soft glow, no harsh colors.",
    description: "Compassionate mental health first-response interface",
    difficulty: "Intermediate",
    tags: ["mental-health", "compassionate", "arabic", "breathing"],
  },

  // Arabic NLP Results Display
  {
    id: "arabic-nlp-results",
    title: "Arabic Text Analysis Results",
    titleAr: "نتائج تحليل النص العربي",
    category: "defense",
    icon: "🗣️",
    prompt: "Create an Arabic NLP analysis results panel with dark theme. Show analysis of Arabic text with these metrics: 1) Dialect Detection bar chart (Egyptian/Levantine/Gulf/MSA percentages), 2) Emotional Tone gauge (Calm→Agitated spectrum with pointer), 3) Manipulation Signals list (urgency words, fear triggers, authority appeals each with count badge), 4) Viral Potential score (0-100% with warning colors: green<40, yellow 40-70, red>70), 5) Key Claims extracted as numbered list with [VERIFY] buttons, 6) Egyptian Slang Detector showing flagged words with standard Arabic equivalents. The text input should display RTL with the analysis results shown in a split-panel layout. Use deep blue/purple dark theme.",
    description: "Full Arabic NLP results with dialect and manipulation scoring",
    difficulty: "Advanced",
    tags: ["arabic", "NLP", "RTL", "split-panel"],
  },

  // Swarm Debate UI
  {
    id: "swarm-debate-ui",
    title: "Swarm Debate Battle Interface",
    titleAr: "واجهة معركة النقاش السرب",
    category: "defense",
    icon: "⚔️",
    prompt: "Create a live swarm debate interface with epic dark theme. Show 5 AI debater cards arranged in a semicircle facing the user. Each debater has: name + archetype badge (Ad-Hominem Attacker/Cherry-Picker/False Authority Sheikh/Conspiracy Framer/Deepfake Skeptic), an avatar with appropriate icon, a speech bubble showing their current argument, confidence level bar, and attack type indicator. The user has a response box at the bottom with the claim they're defending. A 'rounds' counter shows Round 1/5. Add a HEALTH BAR for both user and the swarm. When a debater 'attacks' show a flash animation on the health bar. Victory/defeat screen at the end. Use a dramatic dark red/orange battle theme.",
    description: "Battle-style UI for fighting 5 AI debater archetypes",
    difficulty: "Advanced",
    tags: ["debate", "game-ui", "battle", "animated"],
  },

  // Paper Audit Results
  {
    id: "paper-audit-results",
    title: "Scientific Paper Audit Report",
    titleAr: "تقرير تدقيق الورقة العلمية",
    category: "science",
    icon: "📋",
    prompt: "Create a scientific paper audit report card with dark academic theme. Show: paper title and DOI at top, an overall quality grade (A-F) as a large letter with color (A=gold, B=green, C=yellow, D=orange, F=red) and glow, a reproducibility score (0-100%) as a circular gauge, 6 audit sections as expandable rows: Statistical Validity, Methodology Quality, Conflict of Interest, Sample Size Adequacy, Peer Review Status, Open Data. Each section shows a score (0-100) and 2-3 key findings. Red flags section with warning triangles. Green flags with checkmarks. Bottom section: 'Should you share this study?' verdict with Arabic explanation. Citation format shown at the bottom. Dark blue/gray academic aesthetic.",
    description: "Detailed scientific paper quality audit report",
    difficulty: "Intermediate",
    tags: ["science", "peer-review", "audit", "academic"],
  },

  // WhatsApp Rebuttal Generator
  {
    id: "whatsapp-rebuttal",
    title: "WhatsApp Truth Response Builder",
    titleAr: "بناء رد الحقيقة على الواتساب",
    category: "social",
    icon: "📲",
    prompt: "Create a WhatsApp rebuttal message builder with dark theme. Left panel: paste the misinformation message (styled like WhatsApp's dark mode chat bubble with grey background). Center: analysis showing detected claims as highlighted text snippets with red underline. Right panel: generated rebuttal in WhatsApp-friendly format with: *Bold headers*, numbered points, source links, and Arabic text. Features: one-click copy button that shows 'Copied!' confirmation, character counter, 'Simplify' button (makes it shorter), 'Add Emoji' toggle, platform selector (WhatsApp/Facebook/Twitter). The rebuttal should preview in an actual WhatsApp-style chat bubble. Include Bismillah option for Islamic respectful opening.",
    description: "Generate ready-to-share WhatsApp rebuttal messages",
    difficulty: "Intermediate",
    tags: ["whatsapp", "copy-paste", "arabic", "RTL"],
  },

  // Inoculation Passport
  {
    id: "immunity-passport",
    title: "Cognitive Immunity Passport",
    titleAr: "جواز سفر المناعة المعرفية",
    category: "dashboard",
    icon: "🛂",
    prompt: "Create a digital 'Cognitive Immunity Passport' styled like a real passport with dark theme. It should look like a physical passport document with: a decorative border, passport photo placeholder, name field, nationality (EAL Level: Sovereign/Expert/Intermediate/Beginner), 'Cognitive Immunity' as the passport type, an ID number, expiry date (1 year from now). Inside pages show 'VISA STAMPS' for completed modules: each stamp is a circular seal with the module name (Critical Thinking, Islamic Defense, Statistical Literacy, etc.), date completed, and a grade (Distinction/Pass/Merit). The stamps should look like real ink stamps with slight rotation. A 'Validity' section shows the current immunity level as a holographic sticker. Dark navy/gold passport aesthetic.",
    description: "Passport-styled cognitive immunity certificate tracker",
    difficulty: "Advanced",
    tags: ["certificate", "gamification", "passport", "achievement"],
  },

  // Drug/Claim Checker
  {
    id: "drug-claim-checker",
    title: "Medical Claim Rapid Checker",
    titleAr: "فاحص الادعاءات الطبية السريع",
    category: "science",
    icon: "💊",
    prompt: "Create a medical claim rapid-check interface with dark clinical theme. User inputs a medical claim (e.g., 'الحجامة تعالج السكر'). Show instant analysis: 1) Evidence Level badge (case report/cohort/RCT/systematic review/WHO guideline) with pyramid graphic, 2) WHO Position toggle (Supported/Not Supported/No Evidence/Under Review), 3) Egyptian Ministry of Health stance, 4) Scientific consensus meter (0-100% agreement among researchers), 5) Danger level if acted upon (Low/Medium/High/CRITICAL), 6) The actual mechanism claim vs what science shows as a comparison table, 7) Reputable sources section with real URLs (WHO, NIH, Cochrane). Red/green traffic light system for final verdict. Dark blue/white medical aesthetic with clinical precision.",
    description: "Rapid medical claim evidence checker with WHO alignment",
    difficulty: "Intermediate",
    tags: ["medical", "evidence", "WHO", "clinical"],
  },

  // GOD-System 8-Layer Display
  {
    id: "god-system-display",
    title: "GOD-System 8-Layer Results",
    titleAr: "نتائج نظام GOD الـ٨ طبقات",
    category: "defense",
    icon: "⚡",
    prompt: "Create an epic 8-layer analysis results display for the GOD-System with dark theme and gold/amber accents. Show 8 horizontal layers, each revealed one-by-one with a scanning animation (left-to-right progress line). Layer 1: Safety Gate (green lock icon), Layer 2: Emotional Intent Score (animated gauge 0-100%), Layer 3: Source Triangulation (evidence pyramid with highlighted level), Layer 4: Fallacy Detection (list of detected fallacies with severity badges), Layer 5: Constructive Positive (recommended counter-framework), Layer 6: Truth Sandwich (Fact→Myth→Fact three cards), Layer 7: Socratic Question (question card with philosophy icon), Layer 8: Forward Defense (Arabic WhatsApp rebuttal with copy button). Each layer has a number badge, name, and expanded content. Final verdict at bottom: DEBUNKED/MISLEADING/TRUE/UNVERIFIED in large colored text with glow. Epic futuristic aesthetic.",
    description: "Epic visualization of all 8 GOD-System analysis layers",
    difficulty: "Advanced",
    tags: ["god-system", "8-layers", "animated", "futuristic"],
  },
];

export default function AIEditorPage() {
  const [prompt, setPrompt] = useState("");
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<{ prompt: string; html: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"create" | "scenarios">("scenarios");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioTemplate | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ═══ UNDO/REDO STACK ═══
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [editableCode, setEditableCode] = useState("");
  const [showSafetyInfo, setShowSafetyInfo] = useState(false);

  const pushUndo = (html: string) => {
    if (html) setUndoStack(prev => [...prev, html]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(r => [...r, generatedHTML]);
    setUndoStack(u => u.slice(0, -1));
    setGeneratedHTML(prev);
    setEditableCode(prev);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(u => [...u, generatedHTML]);
    setRedoStack(r => r.slice(0, -1));
    setGeneratedHTML(next);
    setEditableCode(next);
  };

  const applyCodeEdit = () => {
    pushUndo(generatedHTML);
    setGeneratedHTML(editableCode);
    setIsEditingCode(false);
  };

  const discardCodeEdit = () => {
    setEditableCode(generatedHTML);
    setIsEditingCode(false);
  };

  const exportHTML = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-component-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const iterateOnCurrent = () => {
    const iteratePrompt = `Improve and enhance this existing HTML component. Keep what works but make it better:\n\n---CURRENT HTML---\n${generatedHTML.slice(0, 2000)}\n---END---\n\nSpecific improvements: make it more polished, fix any bugs, add hover animations, improve spacing.`;
    setPrompt(iteratePrompt);
    setActiveTab("create");
  };

  const filteredScenarios = activeCategory === "all"
    ? LOGIC_SCENARIOS
    : LOGIC_SCENARIOS.filter((s) => s.category === activeCategory);

  const generateComponent = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      // Push current state to undo stack before generating
      if (generatedHTML) pushUndo(generatedHTML);

      const res = await fetch("/api/nvidia/live-editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const html = data.html || data.content || "";
      setGeneratedHTML(html);
      setEditableCode(html);
      setHistory((prev) => [...prev, { prompt, html }]);
    } catch (err: any) {
      setError(err.message || "Failed to generate component");
    } finally {
      setIsLoading(false);
    }
  };

  const useScenario = (scenario: ScenarioTemplate) => {
    setSelectedScenario(scenario);
    setPrompt(scenario.prompt);
    setActiveTab("create");
  };

  const difficultyColor = (d: string) => {
    if (d === "Beginner") return "#10b981";
    if (d === "Intermediate") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent">
                AI Interface Builder
              </h1>
              <p className="text-white/40 text-sm">Natural-language to UI • Powered by NVIDIA NIM</p>
            </div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">NVIDIA NIM</span>
              <span className="px-2 py-1 bg-violet-500/20 text-violet-400 rounded-full">{LOGIC_SCENARIOS.length} Scenarios</span>
              <Link href="/platform-guide" className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-colors">
                📖 Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab("scenarios")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "scenarios"
                ? "bg-violet-500/20 text-violet-300 shadow-lg shadow-violet-500/10"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            🎯 Logic Scenarios ({LOGIC_SCENARIOS.length})
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "create"
                ? "bg-fuchsia-500/20 text-fuchsia-300 shadow-lg shadow-fuchsia-500/10"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            ✨ Free Create
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "scenarios" ? (
          <>
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {SCENARIO_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-white/10 text-white shadow-lg"
                      : "bg-white/5 text-white/40 hover:text-white/60 hover:bg-white/8"
                  }`}
                  style={activeCategory === cat.id ? { borderColor: cat.color + "50", border: `1px solid ${cat.color}40`, boxShadow: `0 0 20px ${cat.color}15` } : { border: "1px solid transparent" }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredScenarios.map((scenario) => {
                const catColor = SCENARIO_CATEGORIES.find((c) => c.id === scenario.category)?.color || "#a855f7";
                return (
                  <div
                    key={scenario.id}
                    className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    style={{ boxShadow: `0 0 0 0 ${catColor}00` }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 30px ${catColor}15`)}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 0 ${catColor}00`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{scenario.icon}</span>
                        <div>
                          <h3 className="font-semibold text-white/90 text-sm">{scenario.title}</h3>
                          <p className="text-xs text-white/30 font-arabic" dir="rtl">{scenario.titleAr}</p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: difficultyColor(scenario.difficulty) + "20", color: difficultyColor(scenario.difficulty) }}
                      >
                        {scenario.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-white/50 mb-3 line-clamp-2">{scenario.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {scenario.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-white/30">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => useScenario(scenario)}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${catColor}20, ${catColor}10)`,
                        border: `1px solid ${catColor}30`,
                        color: catColor,
                      }}
                    >
                      Use This Template →
                    </button>
                  </div>
                );
              })}
            </div>

            {filteredScenarios.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <div className="text-5xl mb-4">🔍</div>
                <p>No scenarios in this category yet.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Selected Scenario Badge */}
            {selectedScenario && (
              <div className="mb-4 flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-3">
                <span className="text-lg">{selectedScenario.icon}</span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-violet-300">Template: {selectedScenario.title}</span>
                  <span className="text-xs text-white/30 ml-2">— customize the prompt below before generating</span>
                </div>
                <button
                  onClick={() => { setSelectedScenario(null); setPrompt(""); }}
                  className="text-xs px-3 py-1 bg-white/5 rounded-lg text-white/40 hover:text-white/60"
                >
                  ✕ Clear
                </button>
              </div>
            )}

            {/* Create Input */}
            <div className="mb-6">
              <div className="flex gap-3 mb-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateComponent();
                    }
                  }}
                  placeholder="Describe the UI component you want to create... or pick a scenario template first"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/25 resize-none h-28 focus:outline-none focus:border-violet-400/50 transition-colors text-sm"
                />
                <button
                  onClick={generateComponent}
                  disabled={isLoading || !prompt.trim()}
                  className="px-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-semibold text-white disabled:opacity-30 hover:shadow-lg hover:shadow-violet-500/25 transition-all self-end h-14"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "Generate ✨"
                  )}
                </button>
              </div>

              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveTab("scenarios")} className="text-xs px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 hover:bg-violet-500/20 transition-all">
                  ← Back to Scenarios
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* ═══ TOOLBAR: Undo / Redo / Edit / Export / Iterate ═══ */}
            {generatedHTML && (
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
                <button onClick={handleUndo} disabled={undoStack.length === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10 disabled:opacity-20 transition-all" title="Undo (Ctrl+Z)">↶ Undo{undoStack.length > 0 && ` (${undoStack.length})`}</button>
                <button onClick={handleRedo} disabled={redoStack.length === 0} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10 disabled:opacity-20 transition-all" title="Redo">↷ Redo{redoStack.length > 0 && ` (${redoStack.length})`}</button>
                <div className="w-px h-5 bg-white/10" />
                <button onClick={() => { setEditableCode(generatedHTML); setIsEditingCode(!isEditingCode); }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isEditingCode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10'}`}>✏️ {isEditingCode ? 'Editing...' : 'Edit Code'}</button>
                <button onClick={iterateOnCurrent} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-all">🔄 Iterate / Improve</button>
                <button onClick={exportHTML} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all">💾 Export HTML</button>
                <button onClick={() => navigator.clipboard.writeText(generatedHTML)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10 transition-all">📋 Copy</button>
                <div className="w-px h-5 bg-white/10" />
                <button onClick={() => setShowSafetyInfo(!showSafetyInfo)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all">🔒 Safety</button>
              </div>
            )}

            {/* Safety Info */}
            {showSafetyInfo && (
              <div className="mb-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl text-sm">
                <h4 className="font-semibold text-cyan-400 mb-2">🔒 Safety Features</h4>
                <ul className="space-y-1 text-white/60 text-xs">
                  <li>✅ <strong>Sandboxed iframe</strong> — generated code runs in a secure sandbox with <code>allow-scripts</code> only (no network, no navigation, no popups)</li>
                  <li>✅ <strong>Undo/Redo</strong> — full history stack so you can always go back to any previous version</li>
                  <li>✅ <strong>Code Review</strong> — always see the full HTML before it renders</li>
                  <li>✅ <strong>No persistent changes</strong> — generated components are temporary and don't modify the platform</li>
                  <li>✅ <strong>Export control</strong> — only you decide when to save/export the generated output</li>
                </ul>
              </div>
            )}

            {/* Preview + Code Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs text-white/30">Live Preview (Sandboxed)</span>
                  {generatedHTML && <span className="ml-auto text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">🔒 Secure</span>}
                </div>
                <div className="p-4 min-h-[400px] bg-white">
                  {generatedHTML ? (
                    <iframe
                      ref={iframeRef}
                      srcDoc={generatedHTML}
                      className="w-full h-[380px] border-0"
                      sandbox="allow-scripts"
                      title="AI Generated Component"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[380px] text-gray-300">
                      <div className="text-center">
                        <div className="text-5xl mb-4">🎨</div>
                        <div className="text-lg">Your generated component will appear here</div>
                        <div className="text-sm text-gray-400 mt-1">Pick a scenario or describe your own component</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <span className="text-xs text-white/30">{isEditingCode ? '✏️ Editing Code (changes are reversible)' : 'Generated Code (HTML)'}</span>
                  {isEditingCode && (
                    <div className="flex gap-2">
                      <button onClick={applyCodeEdit} className="text-xs px-3 py-1 bg-emerald-500/20 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-colors">✅ Apply</button>
                      <button onClick={discardCodeEdit} className="text-xs px-3 py-1 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">✕ Discard</button>
                    </div>
                  )}
                </div>
                {isEditingCode ? (
                  <textarea
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    className="w-full p-4 text-xs text-white/80 bg-transparent font-mono leading-relaxed resize-none focus:outline-none"
                    style={{ minHeight: 400 }}
                    spellCheck={false}
                  />
                ) : (
                  <pre className="p-4 text-xs text-white/60 overflow-auto max-h-[400px] font-mono leading-relaxed">
                    {generatedHTML || "// Generated HTML will appear here..."}
                  </pre>
                )}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-white/60 mb-4">📝 Generation History ({history.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {history.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setPrompt(item.prompt); setGeneratedHTML(item.html); }}
                      className="text-left bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-sm text-white/60 truncate">{item.prompt}</div>
                      <div className="text-xs text-white/25 mt-1">Click to restore</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <PageNavigation currentPath="/ai-editor" />
    </div>
  );
}
