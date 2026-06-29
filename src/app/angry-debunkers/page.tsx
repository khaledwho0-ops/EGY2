"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Loader2, ShieldAlert, Share2, CheckCircle2, ScanSearch, Send, Bot,
  Shield, Fingerprint, Zap, Link as LinkIcon, Paperclip, X, FileText,
  Clock, Globe, AlertTriangle, Layers, Swords, Star,
  HelpCircle, ChevronRight, ChevronLeft, Sparkles, Target, Brain, BrainCircuit, History, Crosshair
} from "lucide-react";

import HunterMode from "@/components/hunter/HunterMode";
import ThreatMap from "@/components/hunter/ThreatMap";
import AnalysisProgress, { STAGE_SETS } from "@/components/AnalysisProgress";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import { buildSystemPrompt } from '@/lib/standard';

export type HistorySession = {
  id: string;
  timestamp: number;
  query: string;
  result: any;
  deepResult: any;
  messages: { role: string; content: string }[];
};

/* ─────────────────────────────────────────────────────────
   COLOR SYSTEM  (Bloodline × Core Wine × Raspberry Space
                  × Crimson Violet × Amethyst Geode
                  × Steel Azure × Espresso Peony × Icy Gunmetal)
───────────────────────────────────────────────────────── */
const C = {
  // Backgrounds
  bg: "#05010A",              // Carbon void
  surface: "#110818",         // Espresso-dark surface
  surfaceHigh: "#1A0F24",     // Lifted glass panel
  border: "rgba(255,255,255,0.06)",
  borderFocus: "rgba(200,50,120,0.6)",

  // Primary — Bloodline / Core Wine → Raspberry
  primary: "#C2185B",         // Bloodline crimson
  primaryGlow: "rgba(194,24,91,0.35)",
  primaryDeep: "#6B0F1A",     // Core Wine deep

  // Secondary — Amethyst Geode / Crimson Violet
  violet: "#7B1FA2",
  violetGlow: "rgba(123,31,162,0.3)",

  // Accent — Steel Azure / Icy Gunmetal
  azure: "#1976D2",
  ice: "#80DEEA",
  iceGlow: "rgba(128,222,234,0.25)",

  // Status
  success: "#26A69A",         // Teal – truth
  danger: "#E53935",          // High alert
  amber: "#FF8F00",           // Patient Zero

  // Typography
  textPrimary: "#F5EEF8",
  textMuted: "#9E8FA8",
  textSubtle: "#5C4A6B",
};

const GOD_SYSTEM_LAYERS = [
  "1. Stripping Emotion...",
  "2. Identifying Claim...",
  "3. Isolating Variables...",
  "4. Cross-Referencing 10 Global Databases...",
  "5. Verifying Context...",
  "6. Detecting Fallacies...",
  "7. Formatting Truth Sandwich...",
];

const PDF_LAYERS = [
  "1. Parsing Document Pages...",
  "2. Extracting Methodology Claims...",
  "3. Identifying Citation Fraud...",
  "4. Cross-Referencing EuropePMC...",
  "5. Verifying Statistical Claims...",
  "6. Detecting Pseudoscience Markers...",
  "7. Assembling Forensic Report...",
];

/* ─── Material Design Ripple Button ─── */
function RippleButton({ children, onClick, className, disabled, type = "button", style }: any) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(p => [...p, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 700);
    if (onClick) onClick(e);
  };
  return (
    <motion.button
      type={type as any}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      onClick={addRipple}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {children}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span
            key={r.id}
            initial={{ top: r.y, left: r.x, width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 500, height: 500, top: r.y - 250, left: r.x - 250, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Animated gradient border wrapper ─── */
function GlowCard({ children, className, accent = C.primary, style }: any) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`relative rounded-[22px] overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${C.surfaceHigh}, ${C.surface}ee)`,
        border: `1px solid ${accent}20`,
        boxShadow: `0 0 0 1px ${C.border}, 0 8px 32px rgba(0,0,0,0.5), 0 0 80px ${accent}08, inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(20px)',
        ...style,
      }}
    >
      {/* Top edge shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${accent}40, transparent 90%)` }} />
      {/* Subtle ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}08, transparent 70%)` }} />
      {children}
    </motion.div>
  );
}

/* ── History Modal ── */
function HistoryModal({ history, onClose, onLoad }: { history: HistorySession[], onClose: () => void, onLoad: (h: HistorySession) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(5, 1, 10, 0.85)', backdropFilter: 'blur(10px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[85vh] rounded-[24px] flex flex-col overflow-hidden"
        style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: `0 0 60px rgba(0,0,0,0.5)` }}
      >
        <div className="p-5 flex justify-between items-center" style={{ borderBottom: `1px solid ${C.border}` }}>
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: C.textPrimary }}><History size={20} /> Session History</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors"><X size={20} style={{ color: C.textMuted }} /></button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-3">
          {history.length === 0 ? (
            <div className="text-center p-10 text-sm" style={{ color: C.textMuted }}>No saved sessions yet.</div>
          ) : (
            history.map((h) => (
              <button
                key={h.id}
                onClick={() => { onLoad(h); onClose(); }}
                className="w-full text-left p-4 rounded-xl flex flex-col gap-2 transition-all hover:scale-[1.01]"
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
                dir="auto"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: `${C.primary}20`, color: C.primary }}>
                    {new Date(h.timestamp).toLocaleDateString()}
                  </span>
                  {h.result?.data?.verdict && (
                    <span className="text-xs font-bold" style={{ color: h.result.data.verdict === 'TRUE' ? C.success : C.danger }}>
                      {h.result.data.verdict}
                    </span>
                  )}
                </div>
                <div className="font-medium text-sm line-clamp-2" style={{ color: C.textPrimary }}>"{h.query}"</div>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function AngryDebunkersWarRoom() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "SYNTHESIZING" | "COMPLETE">("IDLE");
  const [result, setResult] = useState<any>(null);
  const [deepResult, setDeepResult] = useState<any>(null);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHunterMode, setIsHunterMode] = useState(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isUrlInput = /^https?:\/\/[^\s]{2,}$/i.test(query.trim());

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // ── History & Sessions ──
  const [history, setHistory] = useState<HistorySession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("angry-debunkers-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (currentSessionId && result) {
      setHistory(prev => {
        const existing = prev.find(h => h.id === currentSessionId);
        let updated;
        if (existing) {
          updated = prev.map(h => h.id === currentSessionId ? { ...h, result, deepResult, messages, query } : h);
        } else {
          updated = [{ id: currentSessionId, timestamp: Date.now(), query, result, deepResult, messages }, ...prev];
        }
        localStorage.setItem("angry-debunkers-history", JSON.stringify(updated));
        return updated;
      });
    }
  }, [result, deepResult, messages, currentSessionId, query]);

  // ── AI Agents Integration ──
  const [agentResults, setAgentResults] = useState<any>(null);
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentExpanded, setAgentExpanded] = useState(false);

  const runAgentInvestigation = async () => {
    if (!query || agentLoading) return;
    setAgentLoading(true);
    setAgentExpanded(true);
    try {
      const res = await fetch('/api/agents/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: query }),
      });
      const data = await res.json();
      setAgentResults(data);
    } catch (e) { console.error('[Agents]', e); }
    setAgentLoading(false);
  };

  // ── Guide/Tutorial Popup ──
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("angry-debunkers-guide-seen");
    if (!seen) {
      setTimeout(() => setShowGuide(true), 1500);
    }
  }, []);

  const dismissGuide = () => {
    setShowGuide(false);
    setGuideStep(0);
    localStorage.setItem("angry-debunkers-guide-seen", "true");
  };

  const GUIDE_SLIDES = [
    {
      icon: <ShieldAlert size={40} />,
      title: "Welcome to The Angry Debunkers",
      titleAr: "مرحباً في المُفنِّدون الغاضبون",
      body: "The most powerful Arabic misinformation defense system ever built. Paste any claim, URL, or upload a PDF — and watch the truth emerge.",
      bodyAr: "أقوى نظام دفاع ضد المعلومات المضللة بالعربية. الصق أي ادعاء أو رابط أو ارفع PDF — وشاهد الحقيقة تظهر.",
      color: C.primary,
    },
    {
      icon: <Layers size={40} />,
      title: "8-Layer Deception Detection",
      titleAr: "كشف 8 طبقات من الخداع",
      body: "Every claim is analyzed against 8 layers of deception — from absolute fabrication to the unknown. The system identifies exactly WHICH layer your enemy is using.",
      bodyAr: "كل ادعاء يتم تحليله عبر 8 طبقات من الخداع — من الكذب المطلق إلى المجهول. النظام يحدد بالضبط أي طبقة يستخدمها عدوك.",
      color: C.violet,
    },
    {
      icon: <Swords size={40} />,
      title: "Counter-Weapons Arsenal",
      titleAr: "ترسانة الأسلحة المضادة",
      body: "For each detected layer, the system deploys specific counter-weapons with effectiveness ratings. Like a military response — each weapon targets the exact type of deception.",
      bodyAr: "لكل طبقة مكتشفة، النظام ينشر أسلحة مضادة محددة مع تقييم الفعالية. مثل الاستجابة العسكرية — كل سلاح يستهدف نوع الخداع بالضبط.",
      color: C.amber,
    },
    {
      icon: <Target size={40} />,
      title: "Patient Zero Tracing",
      titleAr: "تتبع المريض صفر",
      body: "We trace every lie back to its ORIGIN — who created it, which platform, when it first appeared, and HOW it spread into Egyptian WhatsApp groups and Facebook.",
      bodyAr: "نتتبع كل كذبة إلى أصلها — من أنشأها، على أي منصة، متى ظهرت لأول مرة، وكيف انتشرت في مجموعات واتساب وفيسبوك المصرية.",
      color: C.danger,
    },
    {
      icon: <CheckCircle2 size={40} />,
      title: "Truth Sandwich Protocol",
      titleAr: "بروتوكول ساندويتش الحقيقة",
      body: "Results are presented as Fact → Myth → Fact — the scientifically proven format to fight misinformation. The truth comes first and last, sandwiching the lie.",
      bodyAr: "النتائج تُقدم كـ حقيقة ← خرافة ← حقيقة — الصيغة المثبتة علمياً لمحاربة المعلومات المضللة. الحقيقة تأتي أولاً وأخيراً.",
      color: C.success,
    },
    {
      icon: <Bot size={40} />,
      title: "AI Interrogation Chat",
      titleAr: "استجواب الذكاء الاصطناعي",
      body: "After results appear, use the AI chat to dig deeper. Ask about specific evidence, demand sources, or challenge the findings. The AI remembers everything.",
      bodyAr: "بعد ظهور النتائج، استخدم الدردشة الذكية للتعمق أكثر. اسأل عن أدلة محددة، اطلب مصادر، أو تحدَّ النتائج.",
      color: C.azure,
    },
    {
      icon: <Target size={40} />,
      title: "Try It — A Real Scenario",
      titleAr: "جرّبها — سيناريو حقيقي",
      body: "Paste a real claim like \"الثوم على الريق يعالج كورونا\" or \"مصر اكتشفت علاج فيروس سي نهائياً\". The engine grounds it in OpenAlex + EuropePMC + WHO (and graded hadith via Dorar for religious claims), then shows the verdict, the deception layer, your defense move, and every source with its trust tier (S/A/B/C).",
      bodyAr: "الصق ادعاءً حقيقياً مثل «الثوم على الريق يعالج كورونا» أو «مصر اكتشفت علاج فيروس سي نهائياً». المحرك يستند إلى OpenAlex و EuropePMC و WHO (وتخريج الحديث المُصنَّف عبر الدرر السنية للادعاءات الدينية)، ثم يعرض الحكم وطبقة الخداع وحركتك الدفاعية وكل مصدر مع درجة الثقة (S/A/B/C).",
      color: C.success,
    },
  ];

  useEffect(() => {
    if (status === "SCANNING" || status === "SYNTHESIZING") {
      setCurrentLayer(0);
      const iv = setInterval(() => setCurrentLayer(p => p < 6 ? p + 1 : p), 480);
      return () => clearInterval(iv);
    }
  }, [status]);

  const handlePdfSelect = (file: File) => {
    if (!file.type.includes("pdf")) return;
    if (file.size > 10 * 1024 * 1024) { alert("PDF must be under 10MB"); return; }
    setPdfFile(file);
    const reader = new FileReader();
    reader.onload = e => setPdfBase64((e.target?.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  };

  const handleStrike = async () => {
    if (!query && !pdfFile) return;
    setStatus("SCANNING");
    setResult(null);
    setDeepResult(null);
    setMessages([]);
    setAgentResults(null);
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    // Reflect the real request phase (no fake timers) — flip to SYNTHESIZING once
    // the request is actually in flight; AnalysisProgress drives the honest bar.
    setStatus("SYNTHESIZING");
    try {
      const res = await fetch("/api/defense/angry-debunkers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(55000), // 55s — matches the route's maxDuration:60s with 5s buffer. 20s was too tight: the route runs an AI swarm (Quran + scientific aggregator + Cohere rerank + verdict synthesis) which legitimately takes 30–45s on a complex claim, and a too-short client timeout aborted before the server finished → "signal timed out" in dev overlay.
        body: JSON.stringify({
          query: query || (pdfFile ? `Analyze this document: ${pdfFile.name}` : ""),
          pdfBase64: pdfBase64 || null,
          pdfMimeType: pdfFile?.type || null,
          mode: 'quick',
        }),
      });
      const data = await res.json();
      // Render the result the instant the real response arrives — no artificial delay.
      setResult(data);
      setStatus("COMPLETE");
    } catch (e) { console.error(e); setStatus("IDLE"); }
  };

  // ── Deep Analysis (2nd API call) ──
  const [deepLoading, setDeepLoading] = useState(false);

  const handleGoDeeper = async () => {
    if (!query || deepLoading) return;
    setDeepLoading(true);
    try {
      const res = await fetch("/api/defense/angry-debunkers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query || "",
          pdfBase64: pdfBase64 || null,
          pdfMimeType: pdfFile?.type || null,
          mode: 'deep',
        }),
      });
      const data = await res.json();
      setDeepResult(data?.data?.deep || null);
    } catch (e) { console.error(e); }
    setDeepLoading(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isChatLoading) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsChatLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, data: { factCheckContext: result?.data || null } }),
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let msg = "";
      setMessages(p => [...p, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        msg += decoder.decode(value, { stream: true });
        setMessages(p => { const n = [...p]; n[n.length - 1].content = msg; return n; });
      }
    } catch (err) { console.error(err); }
    finally { setIsChatLoading(false); }
  };

  const resetAll = () => {
    setStatus("IDLE"); setQuery(""); setResult(null); setDeepResult(null);
    setMessages([]); setPdfFile(null); setPdfBase64(null); setCurrentSessionId(null);
  };

  /* ── Animation Variants ── */
  const stagger: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
  };
  // NOTE: NO filter:blur — it causes invisible elements on Windows/Chrome GPU compositor
  const pop: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 22 } },
  };
  const ringV = {
    hidden: { strokeDasharray: "0, 100" },
    visible: (s: number) => ({ strokeDasharray: `${s}, 100`, transition: { duration: 2.2, ease: "easeOut" } }),
  };

  /* ── Font helpers ── */
  const fBase = { fontFamily: "'Inter', system-ui, sans-serif" };
  const fHeader = { fontFamily: "'Clash Display', 'Inter', sans-serif" };
  const fArabic = { fontFamily: "'IBM Plex Sans Arabic', 'Cairo', sans-serif" };

  const activeLayers = pdfFile ? PDF_LAYERS : GOD_SYSTEM_LAYERS;

  /* ── Security: only ever render http(s) source URLs as clickable links.
       A javascript:/data: URL from the model/API must NEVER become an <a href> (XSS). ── */
  const isHttpUrl = (u?: string): boolean => typeof u === "string" && /^https?:\/\//i.test(u.trim());

  /* ── Confidence: prefer the DERIVED score/label (EAL Standard §2) over model self-report ── */
  const confScore = Math.round(Number(result?.data?.confidence_derived ?? result?.data?.confidence_score) || 0);
  const confLabel: string = result?.data?.confidence_label || '';
  const confColor = confLabel === 'HIGH' ? C.success : confLabel === 'CONTESTED' ? C.amber : confLabel === 'UNVERIFIED' ? C.danger : C.azure;

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden relative flex flex-col items-center"
      style={{
        ...fBase,
        background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${C.primaryDeep}55 0%, transparent 70%), ${C.bg}`,
        paddingTop: "7vh",
        paddingBottom: "140px",
        color: C.textPrimary,
      }}
    >
      {/* ── Fixed Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[15%] w-[60vw] h-[60vw] max-w-[900px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.primaryDeep}, transparent 70%)`, filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.violet}, transparent 70%)`, filter: "blur(100px)" }}
        />
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] left-[50%] w-[30vw] h-[30vw] max-w-[400px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.azure}, transparent 70%)`, filter: "blur(120px)", transform: "translateX(-50%)" }}
        />
      </div>

      <AnimatePresence>
        {showHistory && (
          <HistoryModal
            history={history}
            onClose={() => setShowHistory(false)}
            onLoad={(h) => {
              setQuery(h.query);
              setResult(h.result);
              setDeepResult(h.deepResult);
              setMessages(h.messages || []);
              setStatus("COMPLETE");
              setCurrentSessionId(h.id);
            }}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-[1140px] px-5 lg:px-8 flex flex-col gap-10 relative z-10 items-center text-center">

        {/* ══ HERO ══ */}
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${C.primaryDeep}80, ${C.violet}60)`,
              border: `1px solid ${C.primary}40`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 24px ${C.primaryGlow}`,
            }}
          >
            <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <ShieldAlert size={16} style={{ color: C.primary }} />
            </motion.div>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: C.ice }}>
              Global Threat Defense Network
            </span>
          </motion.div>

          {/* Title */}
          <div className="relative">
            <h1
              className="text-5xl sm:text-7xl md:text-[88px] font-extrabold leading-none"
              style={{ ...fHeader, letterSpacing: "-0.04em",
                background: `linear-gradient(135deg, ${C.textPrimary} 0%, ${C.primary} 40%, ${C.violet} 70%, ${C.ice} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: `drop-shadow(0 0 40px ${C.primaryGlow})`,
              }}
            >
              Claim Debunker
            </h1>
            {/* Underline shimmer */}
            <motion.div
              animate={{ scaleX: [0, 1, 0], x: ["-50%", "50%", "-50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 right-0 h-px mx-auto w-3/4"
              style={{ background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.violet}, transparent)` }}
            />
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            dir="rtl"
            style={{ ...fArabic, color: `${C.textPrimary}90` }}
          >
            مُفنِّد الادعاءات{" "}
            <span style={{ color: `${C.textSubtle}`, margin: "0 16px", fontWeight: 300 }}>|</span>
            <span className="font-light" style={{ ...fHeader, color: C.textMuted }}>truth-sandwich + 8-layer</span>
          </h2>

          {/* Help Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowGuide(true); setGuideStep(0); }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full z-20 cursor-pointer"
            style={{
              background: `${C.violet}25`,
              border: `1px solid ${C.violet}35`,
              color: C.violet,
              backdropFilter: 'blur(12px)',
            }}
            title="How to use The Angry Debunkers"
          >
            <HelpCircle size={20} />
          </motion.button>

          {/* History Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHistory(true)}
            className="absolute top-4 right-[60px] sm:top-6 sm:right-[72px] p-3 rounded-full z-20 cursor-pointer"
            style={{
              background: `${C.azure}25`,
              border: `1px solid ${C.azure}35`,
              color: C.azure,
              backdropFilter: 'blur(12px)',
            }}
            title="View Chat History"
          >
            <History size={20} />
          </motion.button>

          {/* Hunter Mode Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsHunterMode(!isHunterMode)}
            className="absolute top-4 right-[110px] sm:top-6 sm:right-[120px] p-3 rounded-full z-20 cursor-pointer"
            style={{
              background: isHunterMode ? `${C.danger}40` : `${C.danger}15`,
              border: `1px solid ${C.danger}35`,
              color: isHunterMode ? '#fff' : C.danger,
              boxShadow: isHunterMode ? `0 0 20px ${C.danger}40` : 'none',
              backdropFilter: 'blur(12px)',
            }}
            title="Toggle HUNTER Mode"
          >
            <Crosshair size={20} />
          </motion.button>
        </motion.header>

        {isHunterMode ? (
          <HunterMode onExit={() => setIsHunterMode(false)} />
        ) : (
          <>
            {/* ══ APPLE STYLE INPUT CONSOLE ══ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: status === "IDLE" ? 1 : 0.975, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-20"
            >
              <div
                className="relative w-full overflow-hidden transition-all duration-500"
                style={{
                  borderRadius: "36px",
                  background: isFocused
                    ? `linear-gradient(160deg, ${C.surfaceHigh} 0%, #180D22 100%)`
                    : `linear-gradient(160deg, ${C.surface} 0%, #0F0515 100%)`,
                  border: isFocused
                    ? `1px solid ${C.primary}70`
                    : `1px solid ${C.border}`,
                  backdropFilter: "blur(60px)",
                  WebkitBackdropFilter: "blur(60px)",
                  boxShadow: isFocused
                    ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 4px ${C.primaryGlow}, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)`,
                }}
              >
                {/* Top shimmer when focused */}
                <AnimatePresence>
                  {isFocused && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute top-0 left-0 right-0 h-px z-10"
                      style={{ background: `linear-gradient(90deg, transparent 0%, ${C.primary}90 30%, ${C.violet}90 70%, transparent 100%)` }}
                    />
                  )}
                </AnimatePresence>

                {/* URL lock badge */}
                <AnimatePresence>
                  {isUrlInput && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-5 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ background: `${C.azure}25`, border: `1px solid ${C.azure}50`, backdropFilter: "blur(12px)" }}
                    >
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: C.ice, boxShadow: `0 0 6px ${C.ice}` }} />
                      </motion.div>
                      <Globe size={13} style={{ color: C.ice }} />
                      <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.ice }}>
                        Target Locked · Link Extraction Ready
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* PDF badge */}
                <AnimatePresence>
                  {pdfFile && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-5 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ background: `${C.amber}20`, border: `1px solid ${C.amber}40` }}
                    >
                      <FileText size={13} style={{ color: C.amber }} />
                      <span className="text-[11px] font-bold tracking-widest truncate max-w-[180px]" style={{ color: C.amber }}>{pdfFile.name}</span>
                      <button onClick={() => { setPdfFile(null); setPdfBase64(null); }} style={{ color: C.amber }} className="ml-1 hover:opacity-70 transition-opacity">
                        <X size={13} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text area zone */}
                <div className="relative flex flex-col justify-center min-h-[220px] px-8 sm:px-14 pt-14 pb-6">
                  <motion.div
                    animate={{ y: isFocused || query || pdfFile ? -18 : 0, opacity: isFocused || query || pdfFile ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center px-14 pointer-events-none text-xl sm:text-2xl font-medium"
                    style={{ color: C.textSubtle, ...fBase }}
                  >
                    {pdfFile ? "Document loaded — add context or launch directly..." : "Paste the rumor, URL, medical myth, or fabrication..."}
                  </motion.div>

                  <textarea
                    className="w-full bg-transparent resize-none focus:outline-none font-semibold leading-snug relative z-10 custom-scrollbar"
                    rows={3}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    dir="auto"
                    style={{
                      fontFamily: query.match(/[\u0600-\u06FF]/) ? "'IBM Plex Sans Arabic', 'Cairo', sans-serif" : "'Inter', sans-serif",
                      fontSize: "clamp(22px, 3.5vw, 42px)",
                      letterSpacing: "-0.02em",
                      color: C.textPrimary,
                      // Soft, eye-easy glow: warm white bloom + faint rose halo — no harsh neon
                      textShadow: query
                        ? `0 0 12px rgba(245,238,248,0.35), 0 0 28px rgba(194,24,91,0.18), 0 0 48px rgba(123,31,162,0.10)`
                        : "none",
                      transition: "text-shadow 0.3s ease",
                    }}
                  />
                </div>

                {/* ── Apple-style footer bar ── */}
                <div
                  className="flex flex-col sm:flex-row justify-between items-center gap-5 px-8 sm:px-10 py-5 sm:py-6"
                  style={{
                    background: `linear-gradient(135deg, ${C.surface}CC 0%, rgba(10,3,20,0.9) 100%)`,
                    borderTop: `1px solid ${C.border}`,
                    backdropFilter: "blur(40px)",
                  }}
                >
                  {/* Left status + attach */}
                  <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
                    <div className="flex items-center gap-2.5 text-[13px] font-semibold" style={{ color: C.textMuted }}>
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full"
                        style={{ background: C.success, boxShadow: `0 0 8px ${C.success}` }}
                      />
                      <span style={{ color: C.textSubtle }}>Live:</span>
                      <span style={{ color: C.textPrimary }}>OpenAlex · EuropePMC · AlQuran</span>
                    </div>

                    <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden"
                      onChange={e => e.target.files?.[0] && handlePdfSelect(e.target.files[0])} />
                    <RippleButton
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors"
                      style={{ background: `${C.surfaceHigh}`, border: `1px solid ${C.border}`, color: C.textMuted }}
                    >
                      <Paperclip size={14} />
                      <span>Attach PDF</span>
                    </RippleButton>
                  </div>

                  {/* Launch / Clear button */}
                  {status === "COMPLETE" ? (
                    <RippleButton
                      onClick={resetAll}
                      className="font-bold py-4 px-10 rounded-full text-sm sm:text-base w-full sm:w-auto"
                      style={{
                        background: `linear-gradient(135deg, ${C.surface}, ${C.surfaceHigh})`,
                        border: `1px solid ${C.border}`,
                        color: C.textMuted,
                      }}
                    >
                      Clear Console
                    </RippleButton>
                  ) : (
                    <RippleButton
                      onClick={handleStrike}
                      disabled={status !== "IDLE" || (!query && !pdfFile)}
                      className="font-bold py-4 px-12 rounded-full flex items-center justify-center gap-3 text-base w-full sm:w-auto transition-all duration-300"
                      style={{
                        background: status !== "IDLE" || (!query && !pdfFile)
                          ? C.surfaceHigh
                          : `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDeep} 50%, ${C.violet} 100%)`,
                        color: status !== "IDLE" || (!query && !pdfFile) ? C.textSubtle : "#fff",
                        border: "1px solid transparent",
                        boxShadow: status !== "IDLE" || (!query && !pdfFile)
                          ? "none"
                          : `0 4px 20px ${C.primaryGlow}, 0 0 40px ${C.violetGlow}`,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {status === "IDLE" ? (
                        <><span>Launch Strike Teams</span><Zap size={20} className="fill-current" /></>
                      ) : (
                        <><Loader2 className="animate-spin w-5 h-5" /><span>Executing...</span></>
                      )}
                    </RippleButton>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ══ SUGGESTED PROMPTS ══ */}
            {status === "IDLE" && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full flex overflow-x-auto sm:flex-wrap sm:justify-center gap-3 sm:gap-4 pb-4 sm:pb-0 hide-scrollbar"
              >
                {[
                  "Vaccines contain microchips to track citizens.",
                  "A new Hadith claims the world ends next Friday.",
                  "Drinking boiled garlic cures all viruses.",
                ].map((ex, i) => (
                  <RippleButton
                    key={i}
                    onClick={() => setQuery(ex)}
                    className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl flex-shrink-0 transition-all duration-300 text-sm font-medium"
                    style={{
                      background: `linear-gradient(135deg, ${C.surface}DD, ${C.surfaceHigh}BB)`,
                      border: `1px solid ${C.border}`,
                      color: C.textMuted,
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <span style={fBase}>"{ex}"</span>
                    <span
                      className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: C.primary }}
                    >→</span>
                  </RippleButton>
                ))}
              </motion.div>
            )}

            {/* ══ LOADING MATRIX ══ */}
            <AnimatePresence>
              {(status === "SCANNING" || status === "SYNTHESIZING") && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="w-full p-10 sm:p-16 flex flex-col items-center gap-10 rounded-[36px]"
                  style={{
                    background: `linear-gradient(160deg, ${C.surface} 0%, ${C.bg} 100%)`,
                    border: `1px solid ${C.primary}30`,
                    boxShadow: `0 0 80px ${C.primaryGlow}, 0 0 40px ${C.violetGlow}`,
                  }}
                >
                  {/* Spinning rings */}
                  <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px dashed ${C.primary}50` }} />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full"
                      style={{ border: `1px solid ${C.violet}40` }} />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 rounded-full"
                      style={{ border: `1px dashed ${C.azure}30` }} />
                    <ScanSearch className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: C.primary }} />
                  </div>

                  {isUrlInput && (
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full"
                      style={{ background: `${C.azure}15`, border: `1px solid ${C.azure}30` }}>
                      <Globe size={15} style={{ color: C.ice }} />
                      <span className="text-sm font-semibold" style={{ color: C.ice }}>Extracting content via Jina Reader...</span>
                    </div>
                  )}

                  {/* Honest staged progress — tied to the REAL request lifecycle (no fake timers) */}
                  <AnalysisProgress
                    running={status === "SCANNING" || status === "SYNTHESIZING"}
                    stages={STAGE_SETS.debunk}
                    lang="en"
                    expectedMs={18000}
                    accent={C.primary}
                    title={{ en: "God-System uplink — debunking in progress…", ar: "اتصال نظام-الإله — التفنيد قيد التشغيل…" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ══ RESULTS GRID ══ */}
            <AnimatePresence>
              {status === "COMPLETE" && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Fallback: show raw error if type is unexpected */}
                  {result.type !== "SYNTHESIS_COMPLETE" && (
                    <div className="w-full p-8 rounded-[28px] text-center text-sm"
                      style={{ background: C.surfaceHigh, border: `1px solid ${C.danger}40`, color: C.danger }}>
                      {result.error || result.message || "Unexpected response. Check API key in .env.local."}
                    </div>
                  )}

                  {result.type === "SYNTHESIS_COMPLETE" && (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-6 max-w-4xl mx-auto w-full"
                  >

                    {/* ═══ 1. SOURCE URL CARD (if URL input) ═══ */}
                    {result.data?.isUrlInput && result.data?.sourceUrl && (
                      <motion.div variants={pop}>
                        <GlowCard accent={C.azure} className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.azure}20`, border: `1px solid ${C.azure}30` }}>
                              <Globe size={18} style={{ color: C.ice }} />
                            </div>
                            <div className="text-left min-w-0">
                              <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: C.ice }}>Source Extracted</div>
                              <p className="text-sm font-bold truncate" style={{ color: C.textPrimary }}>{result.data?.extractedTitle || 'Unknown source'}</p>
                              <a href={result.data?.sourceUrl} target="_blank" rel="noopener noreferrer"
                                className="text-[11px] truncate block mt-1 hover:underline transition-all" style={{ color: `${C.azure}90` }}>
                                {result.data?.sourceUrl}
                              </a>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ═══ 2. VERDICT BANNER ═══ */}
                    {result.data?.verdict && (
                      <motion.div variants={pop}>
                        <div className="rounded-[22px] p-5 sm:p-6 text-center" style={{
                          background: result.data?.verdict === 'DEBUNKED' ? `${C.danger}12`
                            : result.data?.verdict === 'TRUE' ? `${C.success}12`
                            : `${C.amber}12`,
                          border: `1px solid ${result.data?.verdict === 'DEBUNKED' ? C.danger
                            : result.data?.verdict === 'TRUE' ? C.success : C.amber}30`,
                        }}>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{
                            color: result.data?.verdict === 'DEBUNKED' ? C.danger
                              : result.data?.verdict === 'TRUE' ? C.success : C.amber
                          }}>Verdict / الحكم</div>
                          <div className="text-2xl sm:text-3xl font-black mb-3" style={{
                            color: result.data?.verdict === 'DEBUNKED' ? C.danger
                              : result.data?.verdict === 'TRUE' ? C.success : C.amber
                          }}>{result.data?.verdict}</div>
                          <p className="text-[13px] leading-[1.7] mb-2" style={{ color: `${C.textPrimary}cc` }}>{result.data?.verdict_explanation_en || 'Analysis complete.'}</p>
                          <p className="text-[13px] leading-[1.8]" dir="rtl" style={{ color: `${C.textPrimary}99`, ...fArabic }}>{result.data?.verdict_explanation_ar || ''}</p>
                        </div>
                      </motion.div>
                    )}

                    {/* ═══ EAL STANDARD COMPLIANCE STRIP — confidence label, deception layer, tiered provenance, consensus ═══ */}
                    {result.data?.verdict && (
                      <motion.div variants={pop}>
                        <div className="rounded-[22px] p-5 text-left" style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}>
                          <div className="flex flex-wrap items-center gap-3 justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: C.textMuted }}>Confidence (derived)</span>
                              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider"
                                style={{ background: `${confColor}18`, border: `1px solid ${confColor}40`, color: confColor }}>
                                {confLabel || 'UNVERIFIED'} · {confScore}%
                              </span>
                            </div>
                            {result.data?.consensus && (
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: C.textMuted }}>Cross-Model</span>
                                <span className="px-3 py-1 rounded-full text-[11px] font-bold"
                                  style={{
                                    background: result.data.consensus.agreement ? `${C.success}15` : `${C.amber}15`,
                                    border: `1px solid ${result.data.consensus.agreement ? C.success : C.amber}40`,
                                    color: result.data.consensus.agreement ? C.success : C.amber,
                                  }}>
                                  {result.data.consensus.agreement ? 'Consensus ✓' : `Contested — 2nd: ${result.data.consensus.secondOpinionVerdict || '—'}`}
                                </span>
                              </div>
                            )}
                          </div>

                          {result.data?.deception_layer && (
                            <div className="mt-4 p-3 rounded-xl" style={{ background: `${C.violet}10`, border: `1px solid ${C.violet}25` }}>
                              <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: C.violet }}>
                                Deception Layer {result.data.deception_layer.number}: {result.data.deception_layer.name} · {result.data.deception_layer.nameAr}
                              </div>
                              <div className="text-[12px] leading-[1.6]" style={{ color: `${C.textPrimary}cc` }}>
                                🛡️ Defense: {result.data.deception_layer.defense}
                              </div>
                            </div>
                          )}

                          {Array.isArray(result.data?.sources) && result.data.sources.length > 0 && (
                            <div className="mt-4">
                              <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: C.textMuted }}>
                                Evidence — relevance-checked ({result.data.relevantCount ?? result.data.sources.length}/{result.data.sources.length} relevant)
                              </div>
                              <div className="flex flex-col gap-2.5">
                                {result.data.sources.map((s: any, i: number) => {
                                  const good = s.tier === 'S' || s.tier === 'A';
                                  const tColor = good ? C.success : s.tier === 'U' ? C.danger : C.amber;
                                  const stance = s.stance || 'neutral';
                                  const sColor = stance === 'supports' ? C.success : stance === 'refutes' ? C.danger : stance === 'unrelated' ? C.textMuted : C.amber;
                                  const irrelevant = s.relevant === false;
                                  return (
                                    <div key={i} className="flex items-start gap-2 text-[12px]" style={{ opacity: irrelevant ? 0.5 : 1 }}>
                                      <span className="px-2 py-0.5 rounded-md font-black shrink-0"
                                        style={{ background: `${tColor}18`, border: `1px solid ${tColor}40`, color: tColor }}>
                                        {s.tier}
                                      </span>
                                      <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {isHttpUrl(s.url) ? (
                                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: C.ice }}>{s.title}</a>
                                          ) : (
                                            <span className="font-bold" style={{ color: C.textPrimary }}>{s.title}</span>
                                          )}
                                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0"
                                            style={{ background: `${sColor}18`, border: `1px solid ${sColor}40`, color: sColor }}>
                                            {irrelevant ? 'not relevant' : stance}
                                          </span>
                                        </div>
                                        {s.why && <p className="text-[11px] mt-1 italic" style={{ color: `${C.textPrimary}aa` }}>↳ {s.why}</p>}
                                        {s.snippet && <p className="text-[11px] mt-0.5" style={{ color: `${C.textPrimary}66` }}>{String(s.snippet).slice(0, 140)}</p>}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {result.data?.critique?.unsupportedClaims?.length > 0 && (
                            <div className="mt-4 p-3 rounded-xl" style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}30` }}>
                              <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: C.amber }}>
                                ⚠ Grounding audit flagged {result.data.critique.unsupportedClaims.length} unsupported claim(s)
                              </div>
                              <ul className="text-[11px] leading-[1.6] list-disc pl-4" style={{ color: `${C.textPrimary}aa` }}>
                                {result.data.critique.unsupportedClaims.slice(0, 3).map((c: string, i: number) => <li key={i}>{c}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* ═══ 3. QUICK STATS ROW — replaces massive confidence ring ═══ */}
                    <motion.div variants={pop}>
                      <div className="quick-stats-row grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                        {/* Card 1: Confidence % with compact ring */}
                        <GlowCard accent={C.primary} className="p-4 sm:p-5 flex items-center gap-4">
                          <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                              <motion.path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={`url(#quickStatsGradient)`}
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                variants={ringV as any}
                                custom={confScore}
                                initial="hidden"
                                animate="visible"
                                style={{ filter: `drop-shadow(0 0 6px ${C.primary})` }}
                              />
                              <defs>
                                <linearGradient id="quickStatsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor={C.primary} />
                                  <stop offset="50%" stopColor={C.violet} />
                                  <stop offset="100%" stopColor={C.ice} />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <div className="text-left min-w-0">
                            <div className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5" style={{ color: C.textMuted }}>Confidence</div>
                            <div className="text-2xl font-black leading-none" style={{ color: C.textPrimary }}>
                              {confScore}<span className="text-sm font-semibold" style={{ color: C.textMuted }}>%</span>
                            </div>
                          </div>
                        </GlowCard>

                        {/* Card 2: Science Violation Status */}
                        <GlowCard accent={C.danger} className="p-4 sm:p-5 flex items-center gap-4">
                          <div className="p-2 rounded-xl shrink-0" style={{ background: `${C.danger}15`, border: `1px solid ${C.danger}25` }}>
                            <Shield size={18} style={{ color: C.danger }} />
                          </div>
                          <div className="text-left min-w-0">
                            <div className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5" style={{ color: C.textMuted }}>Science Violation</div>
                            <p className="text-[13px] font-bold leading-snug truncate" style={{ color: C.textPrimary }}>
                              {result.data?.negative_science_violation || result.data?.logical_fallacy_detected || 'Not detected'}
                            </p>
                          </div>
                        </GlowCard>

                        {/* Card 3: Egyptian Vector Hit */}
                        <GlowCard accent={C.success} className="p-4 sm:p-5 flex items-center gap-4">
                          <div className="p-2 rounded-xl shrink-0" style={{ background: `${C.success}15`, border: `1px solid ${C.success}25` }}>
                            <Fingerprint size={18} style={{ color: C.success }} />
                          </div>
                          <div className="text-left min-w-0">
                            <div className="text-[9px] font-black uppercase tracking-[0.15em] mb-0.5" style={{ color: C.textMuted }}>Egyptian Vector</div>
                            <p className="text-[13px] font-bold leading-snug truncate" style={{ color: C.textPrimary }}>
                              {result.data?.egyptian_vector_hit || result.data?.egyptian_contextual_mapping || 'Not applicable'}
                            </p>
                          </div>
                        </GlowCard>
                      </div>
                    </motion.div>

                    {/* ═══ 3.5. COVO JUDGMENT LOG ═══ */}
                    {result.data?.covoAnalysis && (
                      <motion.div variants={pop}>
                        <GlowCard accent={C.violet} className="p-6 sm:p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                            <ScanSearch size={250} />
                          </div>
                          
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl" style={{ background: `${C.violet}15`, border: `1px solid ${C.violet}30` }}>
                              <BrainCircuit size={20} style={{ color: C.violet }} />
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.violet }}>COVO Orchestration Engine</div>
                              <div className="text-xl font-bold" style={{ color: C.textPrimary }}>Judgment Log</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-[16px]" style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}` }}>
                              <div className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: C.azure }}>Domain</div>
                              <div className="text-lg font-bold capitalize" style={{ color: C.textPrimary }}>{result.data.covoAnalysis.domain}</div>
                            </div>
                            
                            <div className="p-4 rounded-[16px]" style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}` }}>
                              <div className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: C.danger }}>Manipulation Risk</div>
                              <div className="text-lg font-bold" style={{ color: C.danger }}>
                                {Math.round(result.data.covoAnalysis.emotional_intent_score?.total_manipulation_risk * 100 || 0)}%
                              </div>
                            </div>

                            <div className="p-4 rounded-[16px] sm:col-span-2" style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}` }}>
                              <div className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: C.amber }}>Detected Logical Fallacies & Biases</div>
                              {result.data.covoAnalysis.detected_fallacies?.length > 0 || result.data.covoAnalysis.detected_biases?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {result.data.covoAnalysis.detected_fallacies?.map((f: any, i: number) => (
                                    <span key={`f-${i}`} className="px-2.5 py-1 text-xs font-bold rounded-md" style={{ background: `${C.amber}15`, color: C.amber }}>
                                      {f.name}
                                    </span>
                                  ))}
                                  {result.data.covoAnalysis.detected_biases?.map((b: any, i: number) => (
                                    <span key={`b-${i}`} className="px-2.5 py-1 text-xs font-bold rounded-md" style={{ background: `${C.danger}15`, color: C.danger }}>
                                      {b.name}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-sm font-medium" style={{ color: C.textMuted }}>None detected</div>
                              )}
                            </div>
                          </div>
                          
                          {result.data.covoAnalysis.socratic_intervention && (
                             <div className="mt-4 p-4 rounded-[16px]" style={{ background: `${C.danger}10`, border: `1px solid ${C.danger}30` }}>
                               <div className="flex gap-3">
                                 <AlertTriangle size={18} style={{ color: C.danger }} className="shrink-0 mt-0.5" />
                                 <p className="text-sm font-semibold leading-relaxed" style={{ color: `${C.textPrimary}e6` }}>
                                   {result.data.covoAnalysis.socratic_intervention}
                                 </p>
                               </div>
                             </div>
                          )}
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ═══ 4. TRUTH SANDWICH — BILINGUAL ═══ */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.violet} className="p-6 sm:p-10">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.025] pointer-events-none">
                          <CheckCircle2 size={300} />
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-4" style={{ ...fBase, color: C.textPrimary }}>
                          <div className="p-3 rounded-2xl" style={{ background: `${C.violet}20`, border: `1px solid ${C.violet}30` }}>
                            <CheckCircle2 size={26} style={{ color: C.violet }} />
                          </div>
                          Truth Sandwich Protocol
                        </h2>

                        <div className="space-y-4 relative z-10">
                          {/* Fact 1 — Bilingual */}
                          <motion.div
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                            className="p-5 sm:p-6 rounded-[20px]"
                            style={{ background: `${C.success}12`, border: `1px solid ${C.success}25` }}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: C.success }}>✅ FACT / الحقيقة</span>
                            <p className="text-base sm:text-lg font-bold leading-relaxed mb-2" dir="rtl" style={{ color: C.textPrimary, ...fArabic }}>
                              {result.data?.truth_sandwich?.fact_1_ar || result.data?.truth_sandwich?.fact_1 || 'Analysis not available'}
                            </p>
                            <p className="text-[13px] leading-[1.7]" style={{ color: `${C.textPrimary}aa` }}>
                              {result.data?.truth_sandwich?.fact_1_en || ''}
                            </p>
                          </motion.div>

                          {/* Myth — Bilingual */}
                          <motion.div
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35, type: "spring", stiffness: 120 }}
                            className="p-5 sm:p-6 rounded-[20px]"
                            style={{ background: `${C.danger}10`, border: `1px solid ${C.danger}25` }}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: C.danger }}>❌ MYTH / الخرافة</span>
                            <p className="text-base sm:text-lg font-medium leading-relaxed line-through mb-2" dir="rtl" style={{ color: `${C.textPrimary}50`, textDecorationColor: C.danger, textDecorationThickness: "2px", ...fArabic }}>
                              {result.data?.truth_sandwich?.myth_ar || result.data?.truth_sandwich?.myth || 'Analysis not available'}
                            </p>
                            <p className="text-[13px] leading-[1.7] line-through" style={{ color: `${C.textPrimary}40`, textDecorationColor: `${C.danger}60` }}>
                              {result.data?.truth_sandwich?.myth_en || ''}
                            </p>
                          </motion.div>

                          {/* Fact 2 — Bilingual */}
                          <motion.div
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
                            className="p-5 sm:p-6 rounded-[20px]"
                            style={{ background: `${C.success}12`, border: `1px solid ${C.success}25` }}
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: C.success }}>✅ FACT / التأكيد</span>
                            <p className="text-base sm:text-lg font-bold leading-relaxed mb-2" dir="rtl" style={{ color: C.textPrimary, ...fArabic }}>
                              {result.data?.truth_sandwich?.fact_2_ar || result.data?.truth_sandwich?.fact_2 || 'Analysis not available'}
                            </p>
                            <p className="text-[13px] leading-[1.7]" style={{ color: `${C.textPrimary}aa` }}>
                              {result.data?.truth_sandwich?.fact_2_en || ''}
                            </p>
                          </motion.div>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* ═══ 5. RELIGIOUS CONTEXT (when Islamic claim detected) ═══ */}
                    {result.data?.is_religious_claim && result.data?.religious_context && (
                      <motion.div variants={pop}>
                        <GlowCard accent="#d4a843" className="p-0 overflow-hidden">
                          <div className="flex">
                            <div className="w-[5px] shrink-0 rounded-l-[22px]"
                              style={{ background: `linear-gradient(180deg, #d4a843, #10b981)` }} />
                            <div className="flex-1 p-6 sm:p-7">
                              <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 rounded-xl" style={{ background: '#d4a84318', border: '1px solid #d4a84328' }}>
                                  <span className="text-lg">🕌</span>
                                </div>
                                <div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: '#d4a843cc' }}>Islamic Verification / التحقق الإسلامي</div>
                                  <div className="text-[15px] font-bold" style={{ color: C.textPrimary }}>Religious Scholarly Analysis</div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                {result.data?.religious_context?.hadith_status && (
                                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}` }}>
                                    <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#d4a843' }}>Hadith Status</div>
                                    <p className="text-[14px] font-bold" style={{ color: C.textPrimary }}>{result.data?.religious_context?.hadith_status}</p>
                                  </div>
                                )}
                                {result.data?.religious_context?.correct_interpretation && (
                                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}` }}>
                                    <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: '#10b981' }}>Correct Interpretation</div>
                                    <p className="text-[13px] leading-[1.7]" style={{ color: `${C.textPrimary}cc` }}>{result.data?.religious_context?.correct_interpretation}</p>
                                  </div>
                                )}
                                {result.data?.religious_context?.scholars_cited && (
                                  <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}` }}>
                                    <div className="text-[9px] font-black uppercase tracking-wider mb-1" style={{ color: C.azure }}>Scholars Cited</div>
                                    <p className="text-[13px] leading-[1.7]" style={{ color: `${C.textPrimary}cc` }}>{result.data?.religious_context?.scholars_cited}</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-4">
                                <a href="/religion-hub/tools/hadith-check" className="px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: '#d4a84318', border: '1px solid #d4a84330', color: '#d4a843' }}>
                                  📜 Deep Hadith Check
                                </a>
                                <a href="/religion-hub/tools" className="px-4 py-2 rounded-xl text-[11px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.textMuted }}>
                                  All Religious Tools →
                                </a>
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ═══ 6. AI CHAT — Fixed height, suggested chips ═══ */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.azure} className="overflow-hidden flex flex-col" style={{ minHeight: "400px", maxHeight: "60vh" }}>
                        {/* Chat header */}
                        <div className="p-5 sm:p-6 flex items-center gap-4"
                          style={{ background: `linear-gradient(135deg, ${C.surface}, ${C.surfaceHigh})`, borderBottom: `1px solid ${C.border}` }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg shrink-0"
                            style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.violet})`, boxShadow: `0 4px 16px ${C.primaryGlow}` }}>
                            <Bot className="text-white" size={20} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-base" style={{ color: C.textPrimary, ...fBase }}>AI Interrogation</h3>
                            <p className="text-xs font-medium mt-0.5" style={{ color: C.textMuted }}>
                              {result.data?.isUrlInput ? `Analyzing: ${result.data?.extractedTitle || 'source'}` : "Debate the evidence directly."}
                            </p>
                          </div>
                          {/* Live dot */}
                          <div className="ml-auto flex items-center gap-2">
                            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-2 h-2 rounded-full" style={{ background: C.success }} />
                            <span className="text-[11px] font-semibold" style={{ color: C.success }}>LIVE</span>
                          </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-5 custom-scrollbar"
                          style={{ background: `linear-gradient(180deg, ${C.bg}90 0%, ${C.surface}60 100%)` }}>
                          {messages.length === 0 && (
                            <div className="flex flex-col items-center gap-5 mt-6">
                              <div className="text-center text-sm font-medium" style={{ color: C.textSubtle }}>
                                {result.data?.patient_zero_tracing
                                  ? "Ask me about the origin of this lie. I have the forensic trace."
                                  : "System Online. Awaiting input."}
                              </div>
                              {/* Suggested question chips */}
                              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                                {[
                                  "What's the strongest evidence against this claim?",
                                  "Who benefits from spreading this?",
                                  "Is there any truth hidden in this claim?",
                                ].map((q, qi) => (
                                  <motion.button
                                    key={qi}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + qi * 0.1 }}
                                    onClick={() => { setInput(q); }}
                                    className="px-4 py-2 rounded-full text-[12px] font-medium transition-all hover:scale-105 cursor-pointer"
                                    style={{
                                      background: `${C.azure}12`,
                                      border: `1px solid ${C.azure}25`,
                                      color: C.ice,
                                    }}
                                  >
                                    <Sparkles size={12} className="inline mr-1.5" style={{ color: C.azure }} />
                                    {q}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          )}
                          {messages.map((m, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 16, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, damping: 24 }}
                              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className="max-w-[85%] px-6 py-4 shadow-lg"
                                style={{
                                  borderRadius: m.role === "user" ? "24px 24px 6px 24px" : "24px 24px 24px 6px",
                                  background: m.role === "user"
                                    ? `linear-gradient(135deg, ${C.primary}, ${C.violet})`
                                    : `linear-gradient(135deg, ${C.surface}, ${C.surfaceHigh})`,
                                  border: m.role === "user" ? "none" : `1px solid ${C.border}`,
                                  boxShadow: m.role === "user" ? `0 4px 20px ${C.primaryGlow}` : "none",
                                }}
                                dir={m.role === "user" ? "auto" : "rtl"}
                              >
                                <p className="whitespace-pre-wrap text-base leading-relaxed font-medium"
                                  style={{ color: C.textPrimary, ...(m.role === "assistant" ? fArabic : fBase) }}>
                                  {m.content.replace(/\[SYSTEM:.*?\]/g, "").trim()}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                          {isChatLoading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                              <div className="px-6 py-4 rounded-[24px] rounded-bl-md flex items-center gap-3"
                                style={{ background: `${C.surfaceHigh}`, border: `1px solid ${C.border}` }}>
                                {[0, 1, 2].map(i => (
                                  <motion.div key={i} animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                    className="w-2 h-2 rounded-full" style={{ background: C.primary }} />
                                ))}
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>

                        {/* Chat input */}
                        <div className="p-5 sm:p-6" style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
                          <form onSubmit={handleChatSubmit} className="flex gap-3 relative">
                            <input
                              value={input}
                              onChange={e => setInput(e.target.value)}
                              placeholder="Ask about the evidence, origin, or instigator..."
                              className="flex-1 rounded-full pl-6 pr-16 py-4 text-base font-medium focus:outline-none transition-all"
                              dir="auto"
                              style={{
                                background: `${C.surfaceHigh}`,
                                border: `1px solid ${input ? C.primary + "50" : C.border}`,
                                color: C.textPrimary,
                                ...fBase,
                                boxShadow: input ? `0 0 0 3px ${C.primaryGlow}` : "none",
                              }}
                            />
                            <RippleButton
                              type="submit"
                              disabled={isChatLoading || !input}
                              className="absolute right-2 top-2 bottom-2 w-11 rounded-full flex items-center justify-center transition-all"
                              style={{
                                background: input && !isChatLoading
                                  ? `linear-gradient(135deg, ${C.primary}, ${C.violet})`
                                  : C.surfaceHigh,
                                opacity: isChatLoading || !input ? 0.5 : 1,
                                boxShadow: input && !isChatLoading ? `0 4px 16px ${C.primaryGlow}` : "none",
                              }}
                            >
                              <Send size={17} className="text-white ml-0.5" />
                            </RippleButton>
                          </form>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* ═══ 7. GO DEEPER BUTTON ═══ */}
                    {!deepResult && (
                      <motion.div variants={pop} className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleGoDeeper}
                          disabled={deepLoading}
                          className="px-8 py-4 rounded-2xl text-[14px] font-bold uppercase tracking-wider flex items-center gap-3 cursor-pointer"
                          style={{
                            background: deepLoading ? `${C.violet}10` : `linear-gradient(135deg, ${C.primary}30, ${C.violet}30)`,
                            border: `1px solid ${deepLoading ? C.violet : C.primary}30`,
                            color: deepLoading ? C.textMuted : C.textPrimary,
                            boxShadow: deepLoading ? 'none' : `0 4px 24px ${C.primaryGlow}`,
                          }}
                        >
                          {deepLoading ? (
                            <><Loader2 size={18} className="animate-spin" /> Analyzing deeper... (uses 1 more API call)</>
                          ) : (
                            <><Layers size={18} /> 🔍 Go Deeper — Full Forensic Analysis</>
                          )}
                        </motion.button>
                      </motion.div>
                    )}

                    {/* ═══ 8. DEEP RESULTS — Only show after 'Go Deeper' ═══ */}
                    {deepResult && (<>

                    {/* Science Violation — Full Width Card */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.danger} className="p-0 overflow-hidden">
                        <div className="flex">
                          <div className="w-[5px] shrink-0 rounded-l-[22px]"
                            style={{ background: `linear-gradient(180deg, ${C.primary}, ${C.danger})` }} />
                          <div className="flex items-center gap-4 p-5 sm:p-6 min-w-0">
                            <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.danger}15`, border: `1px solid ${C.danger}25` }}>
                              <Shield size={20} style={{ color: C.danger }} />
                            </div>
                            <div className="text-left min-w-0">
                              <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: `${C.danger}cc` }}>Science Violation</div>
                              <p className="text-[15px] font-bold leading-snug break-words" style={{ color: C.textPrimary }}>
                                {result.data?.negative_science_violation || result.data?.logical_fallacy_detected || 'No violation detected'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* Egyptian Vector Hit — Full Width */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.success} className="p-0 overflow-hidden">
                        <div className="flex">
                          <div className="w-[5px] shrink-0 rounded-l-[22px]"
                            style={{ background: `linear-gradient(180deg, ${C.success}, ${C.azure})` }} />
                          <div className="flex items-center gap-4 p-5 sm:p-6 min-w-0">
                            <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.success}15`, border: `1px solid ${C.success}25` }}>
                              <Fingerprint size={20} style={{ color: C.success }} />
                            </div>
                            <div className="text-left min-w-0">
                              <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: `${C.success}cc` }}>Egyptian Vector Hit</div>
                              <p className="text-[15px] font-bold leading-snug break-words" style={{ color: C.textPrimary }}>
                                {result.data?.egyptian_vector_hit || result.data?.egyptian_contextual_mapping || 'Not applicable'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* Patient Zero — Full Width */}
                    {result.data?.patient_zero_tracing && (
                      <motion.div variants={pop}>
                        <GlowCard accent={C.amber} className="p-0 overflow-hidden">
                          <div className="flex">
                            <div className="w-[5px] shrink-0 rounded-l-[22px]"
                              style={{ background: `linear-gradient(180deg, ${C.amber}, ${C.primary})` }} />
                            <div className="flex-1 p-6 sm:p-7">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}25` }}>
                                  <AlertTriangle size={18} style={{ color: C.amber }} />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: C.amber }}>Patient Zero Trace</div>
                              </div>

                              {/* One-Law: this trace is AI inference, not a sourced forensic fact */}
                              <div className="rounded-xl px-4 py-3 mb-5" style={{ background: `${C.danger}10`, border: `1px solid ${C.danger}30` }}>
                                <p className="text-[12px] font-bold leading-[1.5] break-words" style={{ color: C.danger }} dir="rtl">
                                  ⚠ استنتاج بالذكاء الاصطناعي — غير موثّق
                                </p>
                                <p className="text-[11px] font-semibold leading-[1.5] break-words mt-0.5" style={{ color: `${C.textPrimary}cc` }}>
                                  AI inference — not a sourced fact. Treat year/platform as hypotheses unless a cited source confirms them.
                                </p>
                              </div>

                              <div className="space-y-5 relative z-10">
                                {[
                                  { icon: <Clock size={14} />, label: "Origin Year", val: result.data?.patient_zero_tracing?.origin_year },
                                  { icon: <Globe size={14} />, label: "Origin Platform", val: result.data?.patient_zero_tracing?.origin_platform },
                                  { icon: <LinkIcon size={14} />, label: "Transmission Vector", val: result.data?.patient_zero_tracing?.transmission_vector },
                                ].map(({ icon, label, val }) => (
                                  <div key={label} className="flex gap-4 items-start min-w-0">
                                    <span className="mt-1 shrink-0 opacity-60" style={{ color: C.amber }}>{icon}</span>
                                    <div className="min-w-0 flex-1">
                                      <div className="text-[9px] font-black uppercase tracking-[0.15em] mb-1" style={{ color: `${C.amber}90` }}>{label}</div>
                                      <p className="text-[14px] font-semibold leading-[1.6] break-words" style={{ color: C.textPrimary }}>{val || 'Unknown'}</p>
                                    </div>
                                  </div>
                                ))}

                                <div className="rounded-2xl p-5 mt-2"
                                  style={{ background: `${C.amber}08`, border: `1px solid ${C.amber}15` }}>
                                  <div className="text-[9px] font-black uppercase tracking-[0.15em] mb-2" style={{ color: C.amber }}>Why Trending Now</div>
                                  <p className="text-[14px] font-medium leading-[1.7] break-words"
                                    style={{ color: `${C.textPrimary}dd` }}>
                                    {result.data?.patient_zero_tracing?.why_trending_now || 'Analysis not available'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* ── THREAT MAP ── */}
                          <div className="w-full border-t" style={{ borderColor: `${C.amber}30` }}>
                            <ThreatMap claim={result.data?.extractedTitle || query} />
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ══ LAYER-AWARE DETECTION ══ */}
                    {result.data?.layer_aware_analysis && (
                      <motion.div variants={pop}>
                        <GlowCard accent={C.violet} className="p-0 overflow-hidden">
                          <div className="flex">
                            <div className="w-[5px] shrink-0 rounded-l-[22px]"
                              style={{ background: `linear-gradient(180deg, ${C.violet}, ${C.primary}, ${C.amber})` }} />
                            <div className="flex-1 p-6 sm:p-7">
                              <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.violet}18`, border: `1px solid ${C.violet}28` }}>
                                  <Layers size={18} style={{ color: C.violet }} />
                                </div>
                                <div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `${C.violet}cc` }}>8-Layer Deception Detection</div>
                                  <div className="text-[17px] font-black mt-0.5" style={{ color: C.textPrimary }}>
                                    Layer {result.data?.layer_aware_analysis?.deception_layer?.detected_layer}: {result.data?.layer_aware_analysis?.deception_layer?.layer_name || 'Unknown'}
                                  </div>
                                </div>
                              </div>

                              <div className="text-[14px] font-bold mb-3" dir="rtl" style={{ color: C.ice, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
                                {result.data?.layer_aware_analysis?.deception_layer?.layer_name_ar || ''}
                              </div>

                              <div className="rounded-2xl p-4 mb-5"
                                style={{ background: `${C.violet}08`, border: `1px solid ${C.violet}15` }}>
                                <p className="text-[13px] font-medium leading-[1.7]" style={{ color: `${C.textPrimary}dd` }}>
                                  {result.data?.layer_aware_analysis?.deception_layer?.layer_explanation || 'Analysis not available'}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 mb-4">
                                <Swords size={15} style={{ color: C.amber }} />
                                <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: C.amber }}>Counter-Weapons Deployed</div>
                              </div>

                              <div className="space-y-3">
                                {(result.data?.layer_aware_analysis?.counter_weapons || []).map((w: any, i: number) => (
                                  <div key={i} className="rounded-xl p-4 flex items-start gap-3"
                                    style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}` }}>
                                    <div className="shrink-0 mt-0.5">
                                      <Swords size={14} style={{ color: C.ice }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[13px] font-bold" style={{ color: C.textPrimary }}>{w?.weapon_name || 'Unknown'}</span>
                                        <span className="text-[11px] font-medium" dir="rtl" style={{ color: C.textMuted, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{w?.weapon_name_ar || ''}</span>
                                      </div>
                                      <p className="text-[12px] leading-[1.6] break-words" style={{ color: `${C.textPrimary}bb` }}>{w?.result || ''}</p>
                                      <div className="flex items-center gap-1 mt-2">
                                        {Array.from({ length: 5 }).map((_, s) => (
                                          <Star key={s} size={12} fill={s < (w?.effectiveness || 0) ? C.amber : 'transparent'}
                                            style={{ color: s < (w?.effectiveness || 0) ? C.amber : `${C.textMuted}40` }} />
                                        ))}
                                        <span className="text-[10px] font-bold ml-1" style={{ color: C.textMuted }}>{w?.effectiveness || 0}/5</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <a href={`/layers/${result.data?.layer_aware_analysis?.deception_layer?.detected_layer || 1}/fight`}
                                className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                                style={{ background: `${C.violet}20`, color: C.violet, border: `1px solid ${C.violet}30` }}>
                                <Swords size={14} />
                                Fight This Layer
                              </a>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ══ GOD-SYSTEM AUDIT BARS — Pill Progress ══ */}
                    {result.data?.god_system_audit && (
                      <motion.div variants={pop}>
                        <GlowCard accent={C.violet} className="p-6 sm:p-8">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl shrink-0" style={{ background: `${C.violet}18`, border: `1px solid ${C.violet}28` }}>
                              <Brain size={18} style={{ color: C.violet }} />
                            </div>
                            <div>
                              <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `${C.violet}cc` }}>God-System Audit</div>
                              <div className="text-[15px] font-bold" style={{ color: C.textPrimary }}>Verification Layer Scores</div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            {(Array.isArray(result.data?.god_system_audit) ? result.data.god_system_audit : Object.entries(result.data?.god_system_audit || {}).map(([k, v]: [string, any]) => ({ label: k, score: typeof v === 'number' ? v : (v?.score ?? 0) }))).map((item: any, idx: number) => {
                              const label = item?.label || item?.name || `Layer ${idx + 1}`;
                              const score = Math.round(Number(item?.score ?? item?.value ?? 0));
                              const passed = score >= 60;
                              return (
                                <div key={idx} className="flex items-center gap-3">
                                  <span className="text-[12px] font-semibold whitespace-nowrap min-w-[120px] sm:min-w-[160px] text-left truncate" style={{ color: C.textPrimary }}>{label}</span>
                                  <div className="progress-pill flex-1">
                                    <motion.div
                                      className="progress-pill-fill"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(score, 100)}%` }}
                                      transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                                      style={{
                                        background: passed
                                          ? `linear-gradient(90deg, ${C.success}, ${C.azure})`
                                          : `linear-gradient(90deg, ${C.danger}, ${C.amber})`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-[12px] font-bold min-w-[42px] text-right" style={{ color: passed ? C.success : C.danger }}>{score}%</span>
                                  <span className="text-sm">{passed ? '✅' : '❌'}</span>
                                </div>
                              );
                            })}
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ══ AI AGENTS INVESTIGATION ══ */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.azure} className="p-0 overflow-hidden">
                        <div className="flex">
                          <div className="w-[5px] shrink-0 rounded-l-[22px]"
                            style={{ background: `linear-gradient(180deg, ${C.azure}, ${C.violet}, ${C.primary})` }} />
                          <div className="flex-1 p-6 sm:p-7">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl" style={{ background: `${C.azure}18`, border: `1px solid ${C.azure}28` }}>
                                  <Bot size={18} style={{ color: C.azure }} />
                                </div>
                                <div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `${C.azure}cc` }}>AI Agents Investigation</div>
                                  <div className="text-[15px] font-bold" style={{ color: C.textPrimary }}>5 Autonomous Agents</div>
                                </div>
                              </div>
                              {!agentResults && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={runAgentInvestigation}
                                  disabled={agentLoading}
                                  className="px-5 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                                  style={{
                                    background: agentLoading ? `${C.azure}10` : `linear-gradient(135deg, ${C.azure}, ${C.violet})`,
                                    color: 'white',
                                    boxShadow: agentLoading ? 'none' : `0 4px 16px ${C.azure}30`,
                                  }}
                                >
                                  {agentLoading ? <><Loader2 size={14} className="animate-spin" /> Investigating...</> : <><Swords size={14} /> Investigate Deeper</>}
                                </motion.button>
                              )}
                            </div>

                            {(agentLoading || agentResults) && (
                              <div className="space-y-3">
                                {['🔍 Source Hunter', '⚖️ Bias Detector', '📝 Arabic Linguist', '📊 Timeline Builder', '🛡️ Counter-Narrative'].map((name, i) => {
                                  const agentData = agentResults?.agents?.[i];
                                  return (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.15 }}
                                      className="rounded-xl p-4 flex items-start gap-3"
                                      style={{ background: `rgba(255,255,255,0.02)`, border: `1px solid ${C.border}` }}
                                    >
                                      <span className="text-xl shrink-0">{name.slice(0, 2)}</span>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-[13px] font-bold mb-1" style={{ color: C.textPrimary }}>{name.slice(3)}</div>
                                        {agentLoading && !agentData ? (
                                          <div className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                              <Loader2 size={12} style={{ color: C.azure }} />
                                            </motion.div>
                                            <span className="text-[11px]" style={{ color: C.textMuted }}>Analyzing...</span>
                                          </div>
                                        ) : agentData ? (
                                          <>
                                            <p className="text-[12px] leading-[1.6] break-words" style={{ color: `${C.textPrimary}bb` }}>{agentData?.findings || ''}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${(agentData?.confidence ?? 0) > 70 ? C.success : C.amber}20`, color: (agentData?.confidence ?? 0) > 70 ? C.success : C.amber }}>
                                                {agentData?.confidence ?? 0}% confidence
                                              </span>
                                              {(agentData?.sources?.length ?? 0) > 0 && (
                                                <span className="text-[10px]" style={{ color: C.textMuted }}>{agentData?.sources?.length} sources</span>
                                              )}
                                            </div>
                                          </>
                                        ) : null}
                                      </div>
                                    </motion.div>
                                  );
                                })}

                                {agentResults?.overallVerdict && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-xl p-4 mt-3 text-center"
                                    style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.violet}15)`, border: `1px solid ${C.primary}25` }}
                                  >
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: C.primary }}>Final Agent Verdict</div>
                                    <p className="text-[13px] font-bold leading-[1.6]" style={{ color: C.textPrimary }}>{agentResults?.overallVerdict}</p>
                                  </motion.div>
                                )}
                              </div>
                            )}

                            <a href="/ai-agents" className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all hover:opacity-80" style={{ color: C.azure }}>
                              <Globe size={12} /> Open Full Agents Dashboard →
                            </a>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* ══ ISLAMIC CONTENT DETECTION ══ */}
                    {result.data?.egyptian_vector_hit && /religious|fatwa|hadith|quran|islamic|دين|حديث|فتوى|قرآن|إسلام/i.test(
                      `${result.data?.egyptian_vector_hit || ''} ${query}`
                    ) && (
                      <motion.div variants={pop}>
                        <GlowCard accent="#d4a843" className="p-0 overflow-hidden">
                          <div className="flex">
                            <div className="w-[5px] shrink-0 rounded-l-[22px]"
                              style={{ background: `linear-gradient(180deg, #d4a843, #10b981)` }} />
                            <div className="flex-1 p-6 sm:p-7">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl" style={{ background: `#d4a84318`, border: `1px solid #d4a84328` }}>
                                  <span className="text-lg">🕌</span>
                                </div>
                                <div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: '#d4a843cc' }}>Islamic Content Detected</div>
                                  <div className="text-[15px] font-bold" style={{ color: C.textPrimary }}>Religious Verification Available</div>
                                </div>
                              </div>
                              <p className="text-[13px] leading-[1.7] mb-4" style={{ color: `${C.textPrimary}bb` }}>
                                This claim involves Islamic/religious content. Use our specialized tools for deeper verification:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                <a href="/religion-hub/tools/hadith-check" className="px-4 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: '#d4a84318', border: '1px solid #d4a84330', color: '#d4a843' }}>
                                  📜 Hadith Checker
                                </a>
                                <a href="/religion-hub/tools/fatwa-context" className="px-4 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: '#10b98118', border: '1px solid #10b98130', color: '#10b981' }}>
                                  ⚖️ Fatwa Analyzer
                                </a>
                                <a href="/religion-hub/tools/quran-context" className="px-4 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: '#3b82f618', border: '1px solid #3b82f630', color: '#3b82f6' }}>
                                  📖 Quran Context
                                </a>
                                <a href="/religion-hub/tools" className="px-4 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.textMuted }}>
                                  All Tools →
                                </a>
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </motion.div>
                    )}

                    {/* ══ GLOBAL ALLIANCE ORGANIZATIONS ══ */}
                    <motion.div variants={pop}>
                      <GlowCard accent={C.success} className="p-0 overflow-hidden">
                        <div className="flex">
                          <div className="w-[5px] shrink-0 rounded-l-[22px]"
                            style={{ background: `linear-gradient(180deg, ${C.success}, ${C.azure})` }} />
                          <div className="flex-1 p-6 sm:p-7">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl" style={{ background: `${C.success}18`, border: `1px solid ${C.success}28` }}>
                                  <Globe size={18} style={{ color: C.success }} />
                                </div>
                                <div>
                                  <div className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `${C.success}cc` }}>Verified By Global Alliance</div>
                                  <div className="text-[15px] font-bold" style={{ color: C.textPrimary }}>Trusted Fact-Checking Organizations</div>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                              {[
                                { name: 'Matsda2sh', flag: '🇪🇬', type: 'Egyptian Fact-Check' },
                                { name: 'AFP Fact Check', flag: '🌍', type: 'Global Wire' },
                                { name: 'Full Fact', flag: '🇬🇧', type: 'UK Fact-Check' },
                                { name: 'Snopes', flag: '🇺🇸', type: 'US Fact-Check' },
                                { name: 'Africa Check', flag: '🌍', type: 'Africa-wide' },
                                { name: 'Bellingcat', flag: '🌍', type: 'OSINT' },
                              ].map((org, i) => (
                                <div key={i} className="rounded-lg p-3 flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}` }}>
                                  <span className="text-lg">{org.flag}</span>
                                  <div>
                                    <div className="text-[11px] font-bold" style={{ color: C.textPrimary }}>{org.name}</div>
                                    <div className="text-[9px]" style={{ color: C.textMuted }}>{org.type}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <a href="/global-alliance" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all hover:opacity-80" style={{ color: C.success }}>
                              <Globe size={12} /> Explore All 55+ Organizations →
                            </a>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>

                    {/* Share button */}
                    <motion.div variants={pop}>
                      <RippleButton
                        onClick={() => {
                          const url = new URL(window.location.href);
                          url.searchParams.set("q", btoa(encodeURIComponent(query)));
                          navigator.clipboard.writeText(url.toString());
                          alert("Viral Counter-Attack Link Copied!");
                        }}
                        className="w-full flex items-center justify-center gap-3 py-5 px-6 rounded-[22px] text-sm font-bold transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${C.surface}, ${C.surfaceHigh})`,
                          border: `1px solid ${C.border}`,
                          color: C.textMuted,
                        }}
                      >
                        <Share2 size={18} /><span>Copy Viral Defense Link</span>
                      </RippleButton>
                    </motion.div>
                    </>)}

                </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* ══ HISTORY OVERLAY ══ */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-end"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)" }}
            onClick={() => setShowHistory(false)}
          >
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full sm:w-[400px] h-full overflow-y-auto"
              style={{ background: C.surface, borderLeft: `1px solid ${C.border}` }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 flex justify-between items-center" style={{ borderBottom: `1px solid ${C.border}` }}>
                <h3 className="text-xl font-bold" style={{ color: C.textPrimary }}>Session History</h3>
                <button onClick={() => setShowHistory(false)}><X size={18} style={{ color: C.textMuted }} /></button>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {history.length === 0 ? (
                  <div className="text-center p-8" style={{ color: C.textMuted }}>No history yet.</div>
                ) : (
                  <>
                    <button onClick={() => { setHistory([]); localStorage.removeItem("angry-debunkers-history"); }} className="text-xs text-red-400 hover:underline self-end mb-2">Clear All</button>
                    {history.map(h => (
                      <div key={h.id} onClick={() => {
                        setQuery(h.query);
                        setResult(h.result);
                        setDeepResult(h.deepResult);
                        setMessages(h.messages || []);
                        setCurrentSessionId(h.id);
                        setStatus("COMPLETE");
                        setShowHistory(false);
                      }} className="p-4 rounded-xl cursor-pointer hover:opacity-80 transition-opacity" style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}>
                        <div className="text-xs mb-1" style={{ color: C.textSubtle }}>{new Date(h.timestamp).toLocaleString()}</div>
                        <div className="text-sm font-bold line-clamp-2" style={{ color: C.textPrimary }}>{h.query || "No query text"}</div>
                        <div className="text-xs mt-2" style={{ color: C.textMuted }}>{h.messages?.length || 0} Chat Messages</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          GUIDE / TUTORIAL POPUP MODAL
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(5,1,10,0.85)', backdropFilter: 'blur(16px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) dismissGuide(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-[28px] overflow-hidden"
              style={{
                background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface})`,
                border: `1px solid ${GUIDE_SLIDES[guideStep].color}30`,
                boxShadow: `0 0 0 1px ${C.border}, 0 24px 80px rgba(0,0,0,0.7), 0 0 120px ${GUIDE_SLIDES[guideStep].color}15`,
              }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: `linear-gradient(90deg, transparent 10%, ${GUIDE_SLIDES[guideStep].color}50, transparent 90%)` }} />

              {/* Close button */}
              <button
                onClick={dismissGuide}
                className="absolute top-4 right-4 p-2 rounded-full z-20 transition-colors cursor-pointer"
                style={{ background: `rgba(255,255,255,0.06)`, color: C.textMuted }}
              >
                <X size={18} />
              </button>

              {/* Step counter */}
              <div className="absolute top-5 left-5 text-[10px] font-black uppercase tracking-[0.2em] z-10"
                style={{ color: `${GUIDE_SLIDES[guideStep].color}90` }}>
                {guideStep + 1} / {GUIDE_SLIDES.length}
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 pt-14 flex flex-col items-center text-center">
                {/* Icon with glow */}
                <motion.div
                  key={guideStep}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-20 h-20 rounded-[22px] flex items-center justify-center mb-6"
                  style={{
                    background: `${GUIDE_SLIDES[guideStep].color}15`,
                    border: `1px solid ${GUIDE_SLIDES[guideStep].color}30`,
                    color: GUIDE_SLIDES[guideStep].color,
                    boxShadow: `0 0 40px ${GUIDE_SLIDES[guideStep].color}20`,
                  }}
                >
                  {GUIDE_SLIDES[guideStep].icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  key={`title-${guideStep}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[22px] sm:text-[26px] font-black mb-2"
                  style={{ color: C.textPrimary, ...fBase }}
                >
                  {GUIDE_SLIDES[guideStep].title}
                </motion.h3>

                {/* Arabic title */}
                <motion.p
                  key={`titleAr-${guideStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-[16px] font-bold mb-5"
                  dir="rtl"
                  style={{ color: GUIDE_SLIDES[guideStep].color, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
                >
                  {GUIDE_SLIDES[guideStep].titleAr}
                </motion.p>

                {/* Body text */}
                <motion.p
                  key={`body-${guideStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] leading-[1.8] mb-3 max-w-md"
                  style={{ color: `${C.textPrimary}cc` }}
                >
                  {GUIDE_SLIDES[guideStep].body}
                </motion.p>

                {/* Arabic body */}
                <motion.p
                  key={`bodyAr-${guideStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-[13px] leading-[1.9] mb-8 max-w-md"
                  dir="rtl"
                  style={{ color: `${C.textPrimary}88`, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
                >
                  {GUIDE_SLIDES[guideStep].bodyAr}
                </motion.p>

                {/* Progress dots */}
                <div className="flex items-center gap-2 mb-6">
                  {GUIDE_SLIDES.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setGuideStep(i)}
                      className="rounded-full transition-all cursor-pointer"
                      animate={{
                        width: i === guideStep ? 28 : 8,
                        height: 8,
                        background: i === guideStep ? GUIDE_SLIDES[guideStep].color : `${C.textMuted}30`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  ))}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center gap-3 w-full max-w-xs">
                  {guideStep > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setGuideStep(s => s - 1)}
                      className="flex-1 py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      style={{ background: `rgba(255,255,255,0.04)`, border: `1px solid ${C.border}`, color: C.textMuted }}
                    >
                      <ChevronLeft size={16} />
                      Back
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (guideStep < GUIDE_SLIDES.length - 1) {
                        setGuideStep(s => s + 1);
                      } else {
                        dismissGuide();
                      }
                    }}
                    className="flex-1 py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${GUIDE_SLIDES[guideStep].color}, ${C.violet})`,
                      color: 'white',
                      boxShadow: `0 4px 20px ${GUIDE_SLIDES[guideStep].color}40`,
                    }}
                  >
                    {guideStep < GUIDE_SLIDES.length - 1 ? (
                      <>Next <ChevronRight size={16} /></>
                    ) : (
                      <>Start Fighting! <Swords size={16} /></>
                    )}
                  </motion.button>
                </div>

                {/* Skip link */}
                {guideStep < GUIDE_SLIDES.length - 1 && (
                  <button
                    onClick={dismissGuide}
                    className="mt-4 text-[11px] font-medium cursor-pointer transition-colors"
                    style={{ color: `${C.textMuted}80` }}
                  >
                    Skip tutorial
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PageNavigation currentPath="/angry-debunkers" />

      <PageAIChatbot
        pageTitle="Hostile Debunking Engine — المُفنِّدون الغاضبون"
        pageContext="EAL Angry Debunkers: 8-layer deception detection with adversarial resilience testing. Powered by NVIDIA NIM. Features Hunter Mode, Patient Zero tracing, Truth Sandwich Protocol, and PDF forensic analysis."
        systemPrompt={buildSystemPrompt({
          role: 'You are the EAL Hostile Debunking Engine — a senior misinformation-forensics analyst specializing in adversarial fact-checking and the Truth Sandwich method (Fact → Myth → Fact, Lewandowsky et al. 2012).',
          roleAr: 'مُحلِّل أول في الطب الشرعي للمعلومات المضللة بمكتبة الوعي المصرية',
          sourcePreferences: ['OpenAlex', 'EuropePMC', 'Cochrane', 'WHO', 'Google Fact Check', 'Reuters', 'CAPMAS', 'Dar al-Iftāʾ', 'Al-Azhar', 'Sunnah.com / Dorar (graded hadith)'],
          islamic: true,
          extraRules: [
            'Use the Truth Sandwich: lead with truth, expose the myth once, reinforce with truth — never repeat the lie without immediate correction.',
            'When origin is traceable, flag Patient Zero: year, platform, transmission vector, and why-now.',
            'Be aggressive in pursuing truth — but every aggressive claim still needs a real, named source. Assertiveness never replaces citation.',
          ],
        })}
        suggestedQuestions={[
          'إزاي أفند ادعاء صحي منتشر على فيسبوك؟',
          'What is the truth sandwich protocol?',
          'إيه هي الطبقات الثمانية للخداع؟',
          'How does Patient Zero tracing work?',
        ]}
        accentColor="#c2185b"
        accentColorRgb="194,24,91"
      />
    </div>
  );
}
