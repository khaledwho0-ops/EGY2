"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Shield, Brain, BookOpen, FlaskConical, Sparkles, LayoutDashboard,
  Users, ChevronRight, ArrowRight, Play, Zap, Eye, Search,
  MessageSquare, Fingerprint, MapPin, Flame, GraduationCap, Beaker,
  AlertTriangle, Award, Gamepad2, Timer, Swords, Layers,
  BookOpenCheck, Scale, UserCheck, Quote, Calculator, Landmark, Banknote,
  Microscope, FileSearch, BarChart3, Database, Stethoscope, HeartPulse,
  Wand2, Cpu, Terminal, Bot, Workflow,
  Target, ClipboardCheck, Medal, ShieldCheck,
  Home, ShieldHalf, Sword, Globe, ExternalLink, Star,
  MousePointerClick, TrendingUp, Lock, Scan
} from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

/* ─────────────────────────────────────────────────────────────────── */
/*  DATA                                                               */
/* ─────────────────────────────────────────────────────────────────── */

interface Feature {
  href: string;
  title: string;
  titleAr: string;
  desc: string;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  emoji: string;
  label: string;
  labelAr: string;
  accent: string;        // tailwind gradient from
  accentGlow: string;    // glow color
  accentBorder: string;  // border hover
  accentBg: string;      // bg tint
  icon: React.ReactNode;
  features: Feature[];
}

const categories: Category[] = [
  {
    id: "defense",
    emoji: "🛡️",
    label: "Defense Arsenal",
    labelAr: "ترسانة الدفاع",
    accent: "from-red-500 to-orange-500",
    accentGlow: "shadow-red-500/20",
    accentBorder: "hover:border-red-500/50",
    accentBg: "bg-red-500/5",
    icon: <Shield className="w-5 h-5" />,
    features: [
      { href: "/angry-debunkers", title: "The Angry Debunkers", titleAr: "المفنّدون الغاضبون", desc: "8-Layer deception detection with Truth Sandwich protocol. AI claim analysis & PDF forensics.", icon: <Flame className="w-6 h-6" /> },
      { href: "/swarm-debate", title: "Live Swarm Debate", titleAr: "مناظرة السرب الحيّة", desc: "Face 5 AI debater archetypes simultaneously — from Ad-Hominem to Deepfake Skeptic.", icon: <Swords className="w-6 h-6" /> },
      { href: "/debate-sim", title: "Debate Simulator", titleAr: "محاكي المناظرات", desc: "Practice debating against adaptive AI opponents in real-time.", icon: <MessageSquare className="w-6 h-6" /> },
      { href: "/forensic-image", title: "Image Forensics", titleAr: "تحليل الصور الجنائي", desc: "AI-powered deepfake detection, EXIF analysis & C2PA verification.", icon: <Scan className="w-6 h-6" /> },
      { href: "/deepreal-forensics", title: "DeepReal Forensics", titleAr: "تحليل DeepReal", desc: "Full multimedia verification suite for video, audio & images.", icon: <Eye className="w-6 h-6" /> },
      { href: "/osint-investigator", title: "OSINT Investigator", titleAr: "محقق OSINT", desc: "Open-source intelligence gathering and analysis toolkit.", icon: <Search className="w-6 h-6" /> },
      { href: "/whatsapp-analyzer", title: "WhatsApp Analyzer", titleAr: "محلل واتساب", desc: "Analyze forwarded messages for misinformation patterns.", icon: <MessageSquare className="w-6 h-6" /> },
      { href: "/bias-detector", title: "Bias Detector", titleAr: "كاشف التحيّز", desc: "Identify cognitive biases lurking in any text or article.", icon: <AlertTriangle className="w-6 h-6" /> },
      { href: "/bias-fingerprint", title: "Bias Fingerprint", titleAr: "بصمة التحيّز", desc: "Your personal bias profile — know your cognitive blind spots.", icon: <Fingerprint className="w-6 h-6" /> },
      { href: "/threat-map", title: "Live Threat Map", titleAr: "خريطة التهديدات الحيّة", desc: "Real-time misinformation tracking across the globe.", icon: <MapPin className="w-6 h-6" /> },
      { href: "/rumor-heatmap", title: "Rumor Heatmap", titleAr: "خريطة حرارة الشائعات", desc: "Geographic spread visualization of viral misinformation.", icon: <TrendingUp className="w-6 h-6" /> },
    ],
  },
  {
    id: "cognitive",
    emoji: "🧠",
    label: "Cognitive Training",
    labelAr: "التدريب المعرفي",
    accent: "from-violet-500 to-purple-500",
    accentGlow: "shadow-violet-500/20",
    accentBorder: "hover:border-violet-500/50",
    accentBg: "bg-violet-500/5",
    icon: <Brain className="w-5 h-5" />,
    features: [
      { href: "/curriculum/phase0", title: "144-Day Sovereign Curriculum", titleAr: "منهج ١٤٤ يوماً", desc: "Structured misinformation immunity training — from novice to sovereign thinker.", icon: <GraduationCap className="w-6 h-6" /> },
      { href: "/cognitive-lab", title: "Cognitive Lab", titleAr: "المختبر المعرفي", desc: "Hands-on experiments in critical thinking and reasoning.", icon: <Beaker className="w-6 h-6" /> },
      { href: "/fallacy-engine", title: "Fallacy Engine", titleAr: "محرك المغالطات", desc: "100+ logical fallacies with interactive exercises and real examples.", icon: <AlertTriangle className="w-6 h-6" /> },
      { href: "/inoculation-passport", title: "Inoculation Passport", titleAr: "جواز التلقيح المعرفي", desc: "Track your cognitive immunity progress with verifiable milestones.", icon: <Award className="w-6 h-6" /> },
      { href: "/bad-news", title: "Bad News Game", titleAr: "لعبة الأخبار السيئة", desc: "Learn manipulation tactics by playing as the manipulator.", icon: <Gamepad2 className="w-6 h-6" /> },
      { href: "/reaction-test", title: "Reaction Test", titleAr: "اختبار ردّ الفعل", desc: "Measure your emotional response speed to claims and headlines.", icon: <Timer className="w-6 h-6" /> },
      { href: "/peer-challenge", title: "Peer Challenge", titleAr: "تحدّي الأقران", desc: "Challenge friends to fact-check competitions and earn rankings.", icon: <Swords className="w-6 h-6" /> },
      { href: "/manipulation-cards", title: "Manipulation Cards", titleAr: "بطاقات التلاعب", desc: "Collectible cards teaching 50+ manipulation tactics used in media.", icon: <Layers className="w-6 h-6" /> },
    ],
  },
  {
    id: "islamic",
    emoji: "🕌",
    label: "Islamic Intelligence",
    labelAr: "الذكاء الإسلامي",
    accent: "from-emerald-500 to-teal-500",
    accentGlow: "shadow-emerald-500/20",
    accentBorder: "hover:border-emerald-500/50",
    accentBg: "bg-emerald-500/5",
    icon: <BookOpen className="w-5 h-5" />,
    features: [
      { href: "/religion-hub", title: "Islamic Defense Hub", titleAr: "مركز الدفاع الإسلامي", desc: "Complete Islamic verification toolkit — your scholarly companion.", icon: <BookOpenCheck className="w-6 h-6" /> },
      { href: "/religion-hub/tools/hadith-check", title: "Hadith Checker", titleAr: "مدقق الأحاديث", desc: "Verify hadith authenticity with chain-of-narration analysis.", icon: <ShieldCheck className="w-6 h-6" /> },
      { href: "/religion-hub/tools/fatwa-context", title: "Fatwa Context", titleAr: "سياق الفتوى", desc: "Analyze fatwa with full scholarly context and methodology.", icon: <Scale className="w-6 h-6" /> },
      { href: "/religion-hub/tools/sectarian-detector", title: "Sectarian Detector", titleAr: "كاشف الطائفية", desc: "Identify sectarian manipulation in religious discourse.", icon: <AlertTriangle className="w-6 h-6" /> },
      { href: "/religion-hub/tools/authority-verifier", title: "Authority Verifier", titleAr: "مُحقّق المرجعية", desc: "Check Islamic scholar credentials and institutional backing.", icon: <UserCheck className="w-6 h-6" /> },
      { href: "/religion-hub/tools/quran-context", title: "Quran Context", titleAr: "سياق القرآن", desc: "Verify Quranic citation accuracy with tafsir cross-reference.", icon: <Quote className="w-6 h-6" /> },
      { href: "/religion-hub/tools/zakat-calculator", title: "Zakat Calculator", titleAr: "حاسبة الزكاة", desc: "Precise zakat computation across all wealth categories.", icon: <Calculator className="w-6 h-6" /> },
      { href: "/religion-hub/tools/mawarith", title: "Mawarith", titleAr: "المواريث", desc: "Islamic inheritance calculator following Quranic rules.", icon: <Landmark className="w-6 h-6" /> },
      { href: "/religion-hub/tools/halal-finance", title: "Halal Finance", titleAr: "التمويل الحلال", desc: "Islamic finance compliance checker for investments & banking.", icon: <Banknote className="w-6 h-6" /> },
    ],
  },
  {
    id: "science",
    emoji: "🔬",
    label: "Science & Evidence",
    labelAr: "العلوم والأدلة",
    accent: "from-cyan-500 to-blue-500",
    accentGlow: "shadow-cyan-500/20",
    accentBorder: "hover:border-cyan-500/50",
    accentBg: "bg-cyan-500/5",
    icon: <FlaskConical className="w-5 h-5" />,
    features: [
      { href: "/science", title: "Science Hub", titleAr: "مركز العلوم", desc: "33 statistical fallacy exercises with real published research.", icon: <Microscope className="w-6 h-6" /> },
      { href: "/paper-auditor", title: "Paper Auditor", titleAr: "مدقق الأوراق البحثية", desc: "AI analysis of scientific papers for methodology & bias.", icon: <FileSearch className="w-6 h-6" /> },
      { href: "/stat-power", title: "Statistical Power", titleAr: "القوة الإحصائية", desc: "Learn to evaluate research quality and sample sizes.", icon: <BarChart3 className="w-6 h-6" /> },
      { href: "/evidence", title: "Evidence Engine", titleAr: "محرك الأدلة", desc: "Evaluate claims against the full evidence hierarchy.", icon: <Database className="w-6 h-6" /> },
      { href: "/epistemology", title: "Epistemology", titleAr: "نظرية المعرفة", desc: "How we know what we know — foundations of knowledge.", icon: <BookOpen className="w-6 h-6" /> },
      { href: "/drug-checker", title: "Drug Checker", titleAr: "مدقق الأدوية", desc: "Verify medication claims against clinical evidence.", icon: <Stethoscope className="w-6 h-6" /> },
      { href: "/health-data", title: "Health Data", titleAr: "البيانات الصحية", desc: "Evidence-based health information you can trust.", icon: <HeartPulse className="w-6 h-6" /> },
    ],
  },
  {
    id: "ai",
    emoji: "✨",
    label: "AI-Powered Tools",
    labelAr: "أدوات الذكاء الاصطناعي",
    accent: "from-amber-500 to-yellow-500",
    accentGlow: "shadow-amber-500/20",
    accentBorder: "hover:border-amber-500/50",
    accentBg: "bg-amber-500/5",
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      { href: "/ai-editor", title: "AI Live Editor", titleAr: "محرر AI المباشر", desc: "Generate UI components with natural language — powered by NVIDIA NIM.", icon: <Wand2 className="w-6 h-6" /> },
      { href: "/nvidia-hub", title: "NVIDIA AI Hub", titleAr: "مركز NVIDIA AI", desc: "Access multiple cutting-edge AI models in one interface.", icon: <Cpu className="w-6 h-6" /> },
      { href: "/prompt-lab", title: "Prompt Lab", titleAr: "مختبر الأوامر", desc: "Test, refine & master AI prompts for maximum output.", icon: <Terminal className="w-6 h-6" /> },
      { href: "/chatbot", title: "AI Chatbot", titleAr: "روبوت المحادثة", desc: "Intelligent fact-checking assistant available 24/7.", icon: <Bot className="w-6 h-6" /> },
      { href: "/ai-agents", title: "AI Agents", titleAr: "وكلاء AI", desc: "Autonomous investigation agents for deep analysis.", icon: <Workflow className="w-6 h-6" /> },
    ],
  },
  {
    id: "dashboard",
    emoji: "📊",
    label: "Personal Dashboard",
    labelAr: "لوحة التحكم الشخصية",
    accent: "from-indigo-500 to-blue-600",
    accentGlow: "shadow-indigo-500/20",
    accentBorder: "hover:border-indigo-500/50",
    accentBg: "bg-indigo-500/5",
    icon: <LayoutDashboard className="w-5 h-5" />,
    features: [
      { href: "/dashboard", title: "Main Dashboard", titleAr: "لوحة التحكم الرئيسية", desc: "Your progress, scores, achievements & learning analytics.", icon: <Target className="w-6 h-6" /> },
      { href: "/assessment", title: "Assessment", titleAr: "التقييم", desc: "Comprehensive cognitive immunity test — know your level.", icon: <ClipboardCheck className="w-6 h-6" /> },
      { href: "/certificate", title: "Certificate", titleAr: "الشهادة", desc: "Earn verifiable completion certificates with blockchain proof.", icon: <Medal className="w-6 h-6" /> },
      { href: "/self-test-protocol", title: "Self-Test Protocol", titleAr: "بروتوكول الاختبار الذاتي", desc: "Regular self-evaluation to track your growth over time.", icon: <ShieldCheck className="w-6 h-6" /> },
    ],
  },
  {
    id: "community",
    emoji: "👨‍👩‍👧‍👦",
    label: "Community",
    labelAr: "المجتمع",
    accent: "from-pink-500 to-rose-500",
    accentGlow: "shadow-pink-500/20",
    accentBorder: "hover:border-pink-500/50",
    accentBg: "bg-pink-500/5",
    icon: <Users className="w-5 h-5" />,
    features: [
      { href: "/family-kit", title: "Family Kit", titleAr: "حقيبة الأسرة", desc: "Tools for family media literacy — protect your loved ones.", icon: <Home className="w-6 h-6" /> },
      { href: "/womens-shield", title: "Women's Shield", titleAr: "درع المرأة", desc: "Gender-specific misinformation defense strategies.", icon: <ShieldHalf className="w-6 h-6" /> },
      { href: "/mens-shield", title: "Men's Shield", titleAr: "درع الرجل", desc: "Male-focused critical thinking and resilience tools.", icon: <Sword className="w-6 h-6" /> },
      { href: "/connect", title: "Connect", titleAr: "تواصل", desc: "Community forum for sharing findings & discussions.", icon: <Users className="w-6 h-6" /> },
      { href: "/global-alliance", title: "Global Alliance", titleAr: "التحالف العالمي", desc: "International network fighting misinformation worldwide.", icon: <Globe className="w-6 h-6" /> },
    ],
  },
];

const stats = [
  { value: "50+", label: "Tools", labelAr: "أداة" },
  { value: "33", label: "Science Exercises", labelAr: "تمرين علمي" },
  { value: "9", label: "Islamic Tools", labelAr: "أداة إسلامية" },
  { value: "5", label: "AI Models", labelAr: "نماذج ذكاء اصطناعي" },
  { value: "144", label: "Day Curriculum", labelAr: "يوم تدريب" },
];

/* ─────────────────────────────────────────────────────────────────── */
/*  COMPONENTS                                                         */
/* ─────────────────────────────────────────────────────────────────── */

function FloatingOrb({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none ${className}`} />
  );
}

function FeatureCard({ feature, accent, accentGlow, accentBorder, index }: {
  feature: Feature;
  accent: string;
  accentGlow: string;
  accentBorder: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={feature.href} className="group block h-full">
        <div className={`
          relative h-full rounded-2xl border border-white/[0.06] p-5
          bg-white/[0.02] backdrop-blur-xl
          transition-all duration-500 ease-out
          hover:bg-white/[0.06] hover:border-white/[0.12]
          hover:scale-[1.02] hover:-translate-y-1
          hover:${accentGlow}
          ${accentBorder}
        `}>
          {/* Glow line at top */}
          <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-full`} />

          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`
              flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl
              bg-gradient-to-br ${accent} bg-opacity-10
              text-white/80 group-hover:text-white
              transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg
            `} style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))` }}>
              <div className={`bg-gradient-to-br ${accent} bg-clip-text`}>
                {feature.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors truncate">
                  {feature.title}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-all duration-300 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-[13px] text-white/40 group-hover:text-white/55 transition-colors leading-relaxed line-clamp-2">
                {feature.desc}
              </p>
            </div>
          </div>

          {/* Arabic title */}
          <p className="mt-3 text-[12px] text-white/20 font-medium text-right" dir="rtl" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
            {feature.titleAr}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  MAIN PAGE                                                          */
/* ─────────────────────────────────────────────────────────────────── */

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("defense");
  const [count, setCount] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  // Animated counter
  useEffect(() => {
    const total = 50;
    const step = Math.ceil(total / 40);
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= total) {
        current = total;
        clearInterval(interval);
      }
      setCount(current);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for sticky nav active state
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach((cat) => {
      const el = document.getElementById(`section-${cat.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(cat.id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const totalFeatures = categories.reduce((sum, c) => sum + c.features.length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ─── HERO ─── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden"
      >
        {/* Animated background orbs */}
        <FloatingOrb className="w-[600px] h-[600px] bg-red-600 -top-40 -left-40" />
        <FloatingOrb className="w-[500px] h-[500px] bg-violet-600 top-20 right-[-10%]" />
        <FloatingOrb className="w-[400px] h-[400px] bg-emerald-600 bottom-10 left-[20%]" />
        <FloatingOrb className="w-[350px] h-[350px] bg-cyan-600 bottom-[-5%] right-[30%]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-sm text-white/60 font-medium">{totalFeatures} Features Live</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 leading-[0.95]">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Every Tool You Need
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              To Fight Lies
            </span>
          </h1>

          {/* Arabic tagline */}
          <p
            className="text-xl sm:text-2xl text-white/30 font-medium mt-3 mb-6"
            dir="rtl"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            كل الأدوات التي تحتاجها لمحاربة الأكاذيب
          </p>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            The world&apos;s most comprehensive misinformation defense platform.{" "}
            <span className="text-white/70 font-semibold">{count}+ tools</span> spanning
            AI forensics, cognitive training, Islamic scholarship, and scientific literacy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/curriculum/phase0"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-violet-500 to-cyan-500 text-white font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 hover:scale-105"
            >
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#features-grid"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 font-medium text-lg hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
            >
              <MousePointerClick className="w-5 h-5" />
              Explore All Features
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-white/50"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ─── STATISTICS BAR ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-6xl px-4 -mt-8 mb-20"
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-white/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center py-6 px-3"
              >
                <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-sm text-white/50 mt-1 font-medium">{stat.label}</span>
                <span className="text-xs text-white/25 mt-0.5" dir="rtl" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
                  {stat.labelAr}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── STICKY NAV + FEATURES GRID ─── */}
      <section id="features-grid" className="relative z-10 max-w-7xl mx-auto px-4 pb-32">

        {/* Sticky Category Navigation */}
        <div className="sticky top-0 z-40 py-3 -mx-4 px-4 bg-slate-950/80 backdrop-blur-2xl border-b border-white/[0.04]">
          <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide max-w-7xl mx-auto" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => {
                  const el = document.getElementById(`section-${cat.id}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
                  transition-all duration-300 flex-shrink-0
                  ${activeCategory === cat.id
                    ? "bg-white/10 text-white shadow-lg"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                  }
                `}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Category Sections */}
        {categories.map((cat, catIndex) => (
          <section
            key={cat.id}
            id={`section-${cat.id}`}
            className="pt-20 scroll-mt-20"
          >
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.accent} shadow-lg`}>
                  <span className="text-2xl">{cat.emoji}</span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {cat.label}
                  </h2>
                  <p
                    className="text-base text-white/30 font-medium"
                    dir="rtl"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {cat.labelAr}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${cat.accent} text-white`}>
                    {cat.features.length} tools
                  </span>
                </div>
              </div>
              <div className={`h-[2px] bg-gradient-to-r ${cat.accent} opacity-20 rounded-full`} />
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.features.map((feature, i) => (
                <FeatureCard
                  key={feature.href}
                  feature={feature}
                  accent={cat.accent}
                  accentGlow={cat.accentGlow}
                  accentBorder={cat.accentBorder}
                  index={i}
                />
              ))}
            </div>
          </section>
        ))}
      </section>

      {/* ─── POWER FEATURES ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Why This Platform is{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Different</span>
            </h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">
              Built on peer-reviewed research. Powered by cutting-edge AI. Designed for the Arabic-speaking world.
            </p>
            <p className="text-base text-white/25 mt-2" dir="rtl" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>
              مبنيّة على أبحاث محكّمة. مدعومة بأحدث تقنيات الذكاء الاصطناعي.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Lock className="w-7 h-7" />, title: "Evidence-Based", titleAr: "مبنيّة على الأدلة", desc: "N=84 quasi-experimental pilot study with validated instruments (MIST-20, MHLS, Brief RCOPE)." },
              { icon: <Zap className="w-7 h-7" />, title: "AI-Powered", titleAr: "مدعومة بالذكاء الاصطناعي", desc: "NVIDIA NIM, GPT-4, Gemini, and custom models working in concert for real-time analysis." },
              { icon: <Globe className="w-7 h-7" />, title: "Bilingual Arabic-English", titleAr: "ثنائية اللغة", desc: "Full RTL support with cultural context — designed for Egyptian university students." },
              { icon: <Star className="w-7 h-7" />, title: "Gamified Learning", titleAr: "تعلّم بالألعاب", desc: "Collectible cards, peer challenges, inoculation passports, and achievement certificates." },
              { icon: <Shield className="w-7 h-7" />, title: "Inoculation Theory", titleAr: "نظرية التلقيح", desc: "Based on psychological inoculation — building antibodies against misinformation." },
              { icon: <Workflow className="w-7 h-7" />, title: "COM-B Framework", titleAr: "إطار COM-B", desc: "Capability, Opportunity, Motivation — behavior change science at every step." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="text-white/50 group-hover:text-white/80 transition-colors mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-white/25 mb-3" dir="rtl" style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}>{item.titleAr}</p>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-violet-600/20 to-cyan-600/20" />
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-3xl" />

          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-red-500/20 via-violet-500/20 to-cyan-500/20 blur-xl opacity-40" />

          <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-sm text-white/60 mb-6">
                <Zap className="w-4 h-4 text-amber-400" />
                Begin in 2 minutes
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Ready to Become
                <br />
                <span className="bg-gradient-to-r from-red-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Misinformation-Proof?
                </span>
              </h2>

              <p
                className="text-xl text-white/30 mb-4 font-medium"
                dir="rtl"
                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
              >
                هل أنت مستعد لتصبح محصّناً ضد التضليل؟
              </p>

              <p className="text-lg text-white/40 max-w-xl mx-auto mb-10">
                Start the 144-Day Sovereign Curriculum and transform how you process information forever.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/curriculum/phase0"
                  className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-950 font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl border border-white/15 text-white/80 font-semibold text-lg hover:bg-white/[0.06] transition-all duration-300"
                >
                  View Dashboard
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Global CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      <PageNavigation currentPath="/features" />
    </div>
  );
}
