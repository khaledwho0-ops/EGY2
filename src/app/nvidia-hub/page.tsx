"use client";

import { useRTL } from "@/components/shared/rtl-provider";
import {
  Cpu,
  Shield,
  Eye,
  Zap,
  Activity,
  Server,
  Brain,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/* ─── animation variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ─── model data ───
   HONESTY: The EAL platform is Gemini-first. The MegaRotator order is
   Gemini → Groq → OpenRouter → Cerebras → Together → SambaNova → NVIDIA (LAST).
   So NVIDIA's general-chat model (Nemotron 550B) is the slow last-resort slot,
   NOT the engine that "powers" the tools. The genuinely NVIDIA-specific roles
   are: (1) Content Safety, (2) the deepfake/synthetic-video showcase, and
   (3) the optional 550B last-resort in the rotator. Copy below reflects that. */
const models = [
  {
    name: "Nemotron-3 Ultra 550B",
    provider: "NVIDIA",
    role: { en: "Showcase · last-resort slot", ar: "عرض · خانة الملاذ الأخير" },
    description: {
      en: "A 550B-parameter reasoning model. Strong but slow (~20s+), so on EAL it sits LAST in the rotator — used only if every faster provider is unavailable.",
      ar: "نموذج استدلال بـ 550 مليار معامل. قوي لكنه بطيء (~20 ثانية+)، لذا يأتي أخيرًا في المُدوِّر — يُستخدم فقط إذا تعذّر كل مزوّد أسرع.",
    },
    icon: Brain,
    accent: "#76B900",
  },
  {
    name: "Nemotron-3.5 Content Safety",
    provider: "NVIDIA",
    role: { en: "Active safety scanner", ar: "ماسح أمان نشط" },
    description: {
      en: "Classifies text as safe/unsafe across multiple languages including Arabic. This is the one NVIDIA model the platform calls directly — try it below.",
      ar: "يصنّف النص كآمن/غير آمن عبر عدة لغات منها العربية. هذا هو نموذج NVIDIA الوحيد الذي تستدعيه المنصة مباشرة — جرّبه بالأسفل.",
    },
    icon: Shield,
    accent: "#FF6B35",
  },
  {
    name: "Synthetic Video Detector",
    provider: "NVIDIA",
    role: { en: "Forensic showcase", ar: "عرض الطب الشرعي" },
    description: {
      en: "An enterprise deepfake / AI-video detector showcased here. The DeepReal module's primary forensic pipeline is separate; this is a demonstrated capability, not the default detector.",
      ar: "كاشف فيديو مزيف مؤسسي معروض هنا. خط الطب الشرعي الأساسي في وحدة DeepReal منفصل؛ هذه قدرة مُستعرَضة وليست الكاشف الافتراضي.",
    },
    icon: Eye,
    accent: "#FF3366",
  },
  {
    name: "DeepSeek V4 / Gemma / Mistral (via NIM)",
    provider: { en: "Multiple (hosted on NIM)", ar: "متعددة (مستضافة على NIM)" },
    role: { en: "Catalogue · not platform default", ar: "كتالوج · ليست افتراضية" },
    description: {
      en: "NVIDIA NIM also hosts third-party models (DeepSeek, Gemma, Mistral). They are reachable through the showcase /api/nvidia/chat endpoint but are NOT what runs EAL's tools by default.",
      ar: "تستضيف NVIDIA NIM أيضًا نماذج طرف ثالث (DeepSeek، Gemma، Mistral). يمكن الوصول إليها عبر نقطة العرض /api/nvidia/chat لكنها ليست ما يُشغّل أدوات EAL افتراضيًا.",
    },
    icon: Cpu,
    accent: "#00D4FF",
  },
];

/* ─── stats data — every value below maps to something real in the codebase ─── */
const stats = [
  { value: "7", label: { en: "Rotator Providers", ar: "مزوّدو المُدوِّر" }, icon: Server },
  { value: "#7", label: { en: "NVIDIA's Rank", ar: "ترتيب NVIDIA" }, icon: Activity },
  { value: "550B", label: { en: "Nemotron Params", ar: "معاملات Nemotron" }, icon: Brain },
  { value: "5", label: { en: "Direct NIM Routes", ar: "مسارات NIM مباشرة" }, icon: Cpu },
  { value: "Gemini", label: { en: "Platform Default", ar: "افتراضي المنصة" }, icon: Sparkles },
];

/* ─── benefits / honest roles ─── */
const benefits = [
  {
    title: { en: "Resilient Last Resort", ar: "ملاذ أخير صامد" },
    description: {
      en: "NVIDIA NIM is slot #7 (last) in the MegaRotator. If all faster providers fail, the 550B model still answers — so the cascade never fully runs dry.",
      ar: "NVIDIA NIM هي الخانة السابعة (الأخيرة) في MegaRotator. إذا فشل كل المزوّدين الأسرع، يظل نموذج 550B قادرًا على الرد — فلا تجفّ السلسلة تمامًا.",
    },
    icon: Activity,
    accent: "#76B900",
  },
  {
    title: { en: "Content-Safety Scanner", ar: "ماسح أمان المحتوى" },
    description: {
      en: "Nemotron-3.5 Content Safety is the one NVIDIA model called directly — a multilingual safe/unsafe classifier with a fail-open guard if the key is missing.",
      ar: "Nemotron-3.5 لأمان المحتوى هو نموذج NVIDIA الوحيد المُستدعى مباشرة — مصنّف آمن/غير آمن متعدد اللغات مع حماية تفشل-بالسماح إذا غاب المفتاح.",
    },
    icon: Shield,
    accent: "#FF6B35",
  },
  {
    title: { en: "DeepFake Showcase", ar: "عرض كشف التزييف" },
    description: {
      en: "The Synthetic Video Detector demonstrates NVIDIA's deepfake-detection stack. It is a showcased capability, not the default engine behind every DeepReal scan.",
      ar: "يعرض كاشف الفيديو الاصطناعي حزمة NVIDIA لكشف التزييف. إنها قدرة مُستعرَضة، وليست المحرك الافتراضي خلف كل فحص في DeepReal.",
    },
    icon: Eye,
    accent: "#FF3366",
  },
];

/* ─── architecture flow steps (Gemini-first, NVIDIA-last) ─── */
const flowSteps = [
  { label: { en: "User Input", ar: "إدخال المستخدم" }, accent: "#00D4FF" },
  { label: { en: "Content Safety (NVIDIA)", ar: "أمان المحتوى (NVIDIA)" }, accent: "#FF6B35" },
  { label: { en: "Gemini (primary)", ar: "Gemini (أساسي)" }, accent: "#4285F4" },
  { label: { en: "Groq → … → NVIDIA (last)", ar: "Groq → … → NVIDIA (أخير)" }, accent: "#76B900" },
  { label: { en: "Output", ar: "المخرجات" }, accent: "#9945FF" },
  { label: { en: "User", ar: "المستخدم" }, accent: "#00D4FF" },
];

type SafetyResult = {
  safe: boolean;
  action: string;
  categories: string[];
  reasoning: string;
  confidence: number;
};

/* ═══════════════════════════════════════════════════ */
export default function NvidiaHubPage() {
  const { isRTL, t } = useRTL();

  /* ─── live Content Safety scanner state ─── */
  const [scanText, setScanText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<SafetyResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  async function runSafetyScan() {
    const text = scanText.trim();
    if (!text || scanning) return;
    setScanning(true);
    setScanResult(null);
    setScanError(null);
    try {
      const res = await fetch("/api/nvidia/content-safety", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode: "input" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setScanError(data?.error || `HTTP ${res.status}`);
      } else {
        setScanResult(data as SafetyResult);
      }
    } catch (e: any) {
      setScanError(e?.message || "Network error");
    } finally {
      setScanning(false);
    }
  }

  return (
    <div
      style={{
        direction: isRTL ? "rtl" : "ltr",
        background: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
      className="min-h-screen pt-28 pb-20 overflow-hidden"
    >
      {/* ── animated bg gradient ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px] opacity-15"
          style={{
            background:
              "radial-gradient(circle, #76B900 0%, #10b981 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[140px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, #76B900 0%, #065f46 60%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══════ HEADER ═══════ */}
        <motion.section
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
              style={{
                background: "rgba(118,185,0,0.12)",
                border: "1px solid rgba(118,185,0,0.25)",
                color: "#76B900",
              }}
            >
              <Cpu size={14} />
              {t({ en: "NVIDIA NIM Showcase", ar: "عرض NVIDIA NIM" })}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #76B900 0%, #10b981 50%, #76B900 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t({
                en: "AI Model Hub",
                ar: "مركز نماذج الذكاء الاصطناعي",
              })}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t({
              en: "EAL runs Gemini-first. NVIDIA NIM is a deliberate showcase — content safety, deepfake detection, and the resilient last-resort slot in our provider rotator.",
              ar: "تعمل EAL بـ Gemini أولًا. NVIDIA NIM عرضٌ مقصود — أمان المحتوى، كشف التزييف، وخانة الملاذ الأخير الصامدة في مُدوِّر المزوّدين.",
            })}
          </motion.p>

          {/* honesty note */}
          <motion.div variants={itemVariants} className="mt-5 flex justify-center">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-muted)",
              }}
            >
              <AlertTriangle size={13} style={{ color: "var(--accent-amber)" }} />
              {t({
                en: "Honest scope: NVIDIA does not power every EAL tool. See its real roles below.",
                ar: "نطاق صادق: NVIDIA لا تُشغّل كل أدوات EAL. شاهد أدوارها الحقيقية بالأسفل.",
              })}
            </span>
          </motion.div>
        </motion.section>

        {/* ═══════ MODEL CARDS GRID ═══════ */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-3"
          >
            {t({ en: "What NVIDIA Actually Does Here", ar: "ما تفعله NVIDIA فعليًا هنا" })}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center mb-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {t({
              en: "Accurate roles for each NVIDIA NIM model on the platform — no overclaiming.",
              ar: "أدوار دقيقة لكل نموذج NVIDIA NIM على المنصة — بلا مبالغة.",
            })}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model, idx) => {
              const Icon = model.icon;
              const providerLabel =
                typeof model.provider === "string"
                  ? model.provider
                  : t(model.provider);
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-2xl p-6 cursor-default"
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px circle at 50% 0%, ${model.accent}15, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `${model.accent}18`,
                        boxShadow: `0 0 20px ${model.accent}30`,
                      }}
                    >
                      <Icon size={24} style={{ color: model.accent }} />
                    </div>

                    {/* name + provider + role */}
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {model.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${model.accent}20`,
                          color: model.accent,
                        }}
                      >
                        {providerLabel}
                      </span>
                      <span
                        className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {t(model.role)}
                      </span>
                    </div>

                    {/* description */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(model.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════ LIVE CONTENT SAFETY SCANNER ═══════ */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-3"
          >
            {t({ en: "Try the Content Safety Scanner", ar: "جرّب ماسح أمان المحتوى" })}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center mb-10 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {t({
              en: "A real call to /api/nvidia/content-safety (Nemotron-3.5). If the NVIDIA key is unset it fails open and returns 'allow'.",
              ar: "استدعاء حقيقي لـ /api/nvidia/content-safety (Nemotron-3.5). إذا لم يُضبط مفتاح NVIDIA يفشل بالسماح ويُرجع 'allow'.",
            })}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <textarea
              value={scanText}
              onChange={(e) => setScanText(e.target.value)}
              maxLength={10000}
              rows={4}
              dir={isRTL ? "rtl" : "ltr"}
              placeholder={t({
                en: "Type or paste text to classify as safe / unsafe…",
                ar: "اكتب أو الصق نصًا لتصنيفه كآمن / غير آمن…",
              })}
              className="w-full rounded-xl p-4 text-sm resize-y outline-none transition-colors"
              style={{
                background: "var(--bg-page)",
                border: "1px solid var(--border-secondary)",
                color: "var(--text-primary)",
              }}
            />

            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {scanText.length}/10000
              </span>
              <button
                onClick={runSafetyScan}
                disabled={scanning || !scanText.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: "rgba(118,185,0,0.15)",
                  border: "1px solid rgba(118,185,0,0.4)",
                  color: "#76B900",
                }}
              >
                {scanning ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t({ en: "Scanning…", ar: "جارٍ الفحص…" })}
                  </>
                ) : (
                  <>
                    <Shield size={16} />
                    {t({ en: "Scan with NVIDIA", ar: "افحص بـ NVIDIA" })}
                    <ArrowRight
                      size={15}
                      style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
                    />
                  </>
                )}
              </button>
            </div>

            {/* error */}
            {scanError && (
              <div
                className="mt-5 rounded-xl p-4 text-sm flex items-start gap-2"
                style={{
                  background: "rgba(255,51,102,0.08)",
                  border: "1px solid rgba(255,51,102,0.3)",
                  color: "var(--accent-red)",
                }}
              >
                <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                <span>
                  {t({ en: "Request failed: ", ar: "فشل الطلب: " })}
                  {scanError}
                </span>
              </div>
            )}

            {/* result */}
            {scanResult && (
              <div
                className="mt-5 rounded-xl p-5"
                style={{
                  background: scanResult.safe
                    ? "rgba(74,222,128,0.07)"
                    : "rgba(255,107,53,0.08)",
                  border: `1px solid ${
                    scanResult.safe
                      ? "rgba(74,222,128,0.3)"
                      : "rgba(255,107,53,0.35)"
                  }`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {scanResult.safe ? (
                    <CheckCircle2 size={20} style={{ color: "#4ade80" }} />
                  ) : (
                    <AlertTriangle size={20} style={{ color: "#FF6B35" }} />
                  )}
                  <span
                    className="font-bold text-base"
                    style={{ color: scanResult.safe ? "#4ade80" : "#FF6B35" }}
                  >
                    {scanResult.safe
                      ? t({ en: "Safe", ar: "آمن" })
                      : t({ en: "Flagged", ar: "موسوم" })}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t({ en: "action: ", ar: "الإجراء: " })}
                    {scanResult.action}
                  </span>
                </div>

                {scanResult.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {scanResult.categories.map((c, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(255,107,53,0.15)",
                          color: "#FF6B35",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {scanResult.reasoning && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {scanResult.reasoning}
                  </p>
                )}
                <p
                  className="text-xs mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t({ en: "confidence: ", ar: "الثقة: " })}
                  {Math.round((scanResult.confidence ?? 0) * 100)}%
                </p>
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* ═══════ INTEGRATION ARCHITECTURE ═══════ */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-4"
          >
            {t({
              en: "Where NVIDIA Sits in the Pipeline",
              ar: "موقع NVIDIA في خط المعالجة",
            })}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center mb-12 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {t({
              en: "Gemini leads; NVIDIA's 550B is the last-resort slot. Content Safety can pre-screen input.",
              ar: "Gemini يتصدّر؛ ونموذج NVIDIA 550B هو خانة الملاذ الأخير. ويمكن لأمان المحتوى فحص المُدخل مسبقًا.",
            })}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl p-6 sm:p-8 overflow-x-auto"
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border-primary)",
            }}
          >
            {/* flow */}
            <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-3 min-w-[700px]">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="flex-shrink-0 px-4 py-3 rounded-xl text-center text-xs sm:text-sm font-semibold whitespace-nowrap"
                    style={{
                      background: `${step.accent}15`,
                      border: `1px solid ${step.accent}40`,
                      color: step.accent,
                      minWidth: 80,
                    }}
                  >
                    {t(step.label)}
                  </div>
                  {idx < flowSteps.length - 1 && (
                    <ChevronRight
                      size={18}
                      style={{
                        color: "var(--text-caption)",
                        flexShrink: 0,
                        transform: isRTL ? "rotate(180deg)" : undefined,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════ STATS BAR ═══════ */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <Icon size={20} style={{ color: "#76B900" }} />
                    </div>
                    <div
                      className="text-2xl sm:text-3xl font-extrabold mb-1"
                      style={{ color: "#76B900" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t(stat.label)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>

        {/* ═══════ KEY ROLES ═══════ */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
          >
            {t({ en: "NVIDIA's Real Roles", ar: "أدوار NVIDIA الحقيقية" })}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative rounded-2xl p-6 cursor-default"
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  {/* hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(400px circle at 50% 0%, ${benefit.accent}15, transparent 60%)`,
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `${benefit.accent}18`,
                        boxShadow: `0 0 20px ${benefit.accent}30`,
                      }}
                    >
                      <Icon size={24} style={{ color: benefit.accent }} />
                    </div>

                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t(benefit.title)}
                    </h3>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(benefit.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── footer tagline ── */}
        <motion.div
          className="text-center pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p
            className="text-sm flex items-center justify-center gap-2"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "#76B900" }}
            />
            {t({
              en: "Egyptian Awareness Library — Gemini-first platform · NVIDIA NIM showcase",
              ar: "مكتبة الوعي المصري — منصة Gemini أولًا · عرض NVIDIA NIM",
            })}
          </p>
        </motion.div>
      </div>
      <PageNavigation currentPath="/nvidia-hub" />

      <PageAIChatbot
        pageTitle="NVIDIA NIM Showcase — عرض NVIDIA NIM"
        pageContext="EAL NVIDIA Hub: a SHOWCASE of NVIDIA NIM models. The EAL platform is Gemini-first; the MegaRotator order is Gemini → Groq → OpenRouter → Cerebras → Together → SambaNova → NVIDIA (LAST). NVIDIA's real roles on EAL: (1) Nemotron-3.5 Content Safety, called directly for moderation; (2) Synthetic Video Detector deepfake showcase; (3) Nemotron-3 Ultra 550B as the slow last-resort slot in the rotator. The page exposes a live Content Safety scanner that POSTs to /api/nvidia/content-safety."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL NVIDIA NIM Showcase guide. You explain — honestly — what NVIDIA NIM does on this platform. NEVER claim NVIDIA powers every EAL tool.

[LAYER 2 - THE TRUTH ABOUT NVIDIA ON EAL]:
- EAL is GEMINI-FIRST. NVIDIA is NOT the primary engine.
- The MegaRotator order is: Gemini → Groq → OpenRouter → Cerebras → Together → SambaNova → NVIDIA (LAST, slot #7).
- NVIDIA's Nemotron-3 Ultra 550B is strong but slow (~20s+), so it is the deliberate LAST-RESORT slot — used only when every faster provider is unavailable.

[LAYER 3 - NVIDIA'S REAL ROLES]:
1. Nemotron-3.5 Content Safety — the ONE NVIDIA model called directly, for multilingual safe/unsafe moderation (fail-open if the key is missing).
2. Synthetic Video Detector — a deepfake-detection SHOWCASE (not the default DeepReal engine).
3. Nemotron-3 Ultra 550B — the last-resort slot in the rotator.
NVIDIA NIM also HOSTS third-party models (DeepSeek, Gemma, Mistral) reachable via /api/nvidia/chat, but these are not the platform default.

[LAYER 4 - RULES]:
1. Be accurate. If asked "does NVIDIA power the chatbot / GOD-System?", answer NO — Gemini leads, NVIDIA is last-resort.
2. Explain the live Content Safety scanner on this page when relevant.
3. Never invent latency, partnership, or "powers everything" claims.
4. Respond in the user's language (English or Egyptian Arabic).`}
        suggestedQuestions={[
          'هل NVIDIA هي اللي بتشغّل كل أدوات EAL؟',
          'Why is NVIDIA last in the rotator?',
          'ماسح أمان المحتوى ده بيشتغل إزاي؟',
          'Which NVIDIA model is actually called directly?',
        ]}
        accentColor="#76b900"
        accentColorRgb="118,185,0"
      />
    </div>
  );
}
