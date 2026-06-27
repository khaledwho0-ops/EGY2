"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PageNavigation } from '@/components/shared/page-navigation';

/* ─── Animated Counter ─── */
interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}
function AnimatedCounter({ target, duration = 2000, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Data ─── */
const PROBLEM_DATA = [
  {
    stat: "87%",
    label: "من المصريين",
    desc: "يتعرضون لمعلومات صحية مضللة أسبوعياً",
    en: "of Egyptians encounter health misinformation weekly",
    source: "WHO Egypt 2022",
    color: "#ef4444",
    icon: "🦠",
  },
  {
    stat: "54%",
    label: "من المصريين",
    desc: "يشاركون محتوى غير موثق خلال 24 ساعة من استلامه",
    en: "share unverified content within 24hrs of receiving it",
    source: "Reuters Institute 2023",
    color: "#f97316",
    icon: "📲",
  },
  {
    stat: "40M+",
    label: "مستخدم واتساب",
    desc: "في مصر — الناقل الأول للمعلومات المضللة",
    en: "Egyptian WhatsApp users — the #1 misinformation vector",
    source: "Meta 2023",
    color: "#eab308",
    icon: "💬",
  },
  {
    stat: "3",
    label: "حوادث عنف",
    desc: "تسببت فيها المعلومات الطائفية المضللة (2019–2023)",
    en: "major incidents of violence caused by sectarian misinformation",
    source: "Cairo 24 Report",
    color: "#dc2626",
    icon: "⚠️",
  },
  {
    stat: "40%",
    label: "تردد على التطعيم",
    desc: "مرتبط بوسائل التواصل الاجتماعي",
    en: "vaccine hesitancy linked to social media misinformation",
    source: "Egyptian Ministry of Health",
    color: "#a855f7",
    icon: "💉",
  },
  {
    stat: "0",
    label: "منصة أخرى",
    desc: "تعالج هذا بتفويض علمي + إسلامي مزدوج",
    en: "other platforms address this with scientific + Islamic dual-mandate",
    source: "EAL Analysis",
    color: "#3b82f6",
    icon: "🚫",
  },
];

const ADVANTAGES = [
  {
    num: "01",
    icon: "🎓",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    title: "Proven Pedagogical System",
    titleAr: "نظام تربوي مُثبت علمياً",
    subtitle: "ADDIE Framework",
    points: [
      "144-day structured curriculum based on ADDIE (Analyze, Design, Develop, Implement, Evaluate)",
      "Phase-based cognitive immunity progression via Piaget's cognitive development stages",
      "Inoculation Theory (Compton 2013): Pre-emptive exposure reduces misinformation susceptibility by 23%",
      "Psychological inoculation reduces vaccine misinformation sharing by 52% (Roozenbeek et al. 2022)",
      "33 statistical fallacy exercises based on ASA guidelines + real retractions",
    ],
    citation: "Maertens et al. 2023 — MIST-20 instrument (PMC10991074)",
  },
  {
    num: "02",
    icon: "🔬",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    title: "Dual-Mandate: Scientific + Islamic",
    titleAr: "التفويض المزدوج: علمي + إسلامي",
    subtitle: "Unique in the World",
    points: [
      "All competitors are EITHER secular (Snopes, AFP) OR religious — we are BOTH",
      "1.9 billion Muslims trust scholars — our Islamic tools speak their language",
      "Maqasid al-Shariah alignment: protects عقل (intellect) — 3rd of the 5 objectives",
      "9 Islamic tools backed by classical Usul al-Fiqh + Dar al-Ifta Egypt positions",
      "Arabic-first bilingual with Egyptian dialect support (Cairo dialect NLP detection)",
    ],
    citation: "Ibn Hajar al-Asqalani, Al-Nawawi — classical hadith authentication methodology",
  },
  {
    num: "03",
    icon: "🤖",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    title: "NVIDIA NIM Primary",
    titleAr: "NVIDIA NIM أساسي",
    subtitle: "vs Basic GPT Wrappers",
    points: [
      "NVIDIA Nemotron-Ultra 550B: largest open-source reasoning model available",
      "5-model AI fallback cascade: NVIDIA → Gemini → DeepSeek → Groq → HuggingFace",
      "31 API routes powered by NVIDIA NIM (competitors use 1–2 models)",
      "Live Swarm Debate: 5 AI debater archetypes running simultaneously",
      "Real OSINT integration (DuckDuckGo, Wikipedia, CrossRef, OpenAlex)",
    ],
    citation: "NVIDIA NIM microservices — enterprise AI inference platform",
  },
  {
    num: "04",
    icon: "🛡️",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    title: "Real-Time Defense Infrastructure",
    titleAr: "بنية تحتية دفاعية في الوقت الفعلي",
    subtitle: "78 API Routes",
    points: [
      "Healthcare AI platform: ~5–10 endpoints | Mental health app: ~8–15 | EAL: 78",
      "8-Layer GOD-System deception detection (proprietary architecture)",
      "Patient Zero tracing: traces viral misinformation to its origin",
      "C2PA content credentials verification (Adobe + Microsoft standard)",
      "Real-time deepfake forensics with confidence scoring",
    ],
    citation: "C2PA Coalition for Content Provenance and Authenticity — Industry Standard",
  },
  {
    num: "05",
    icon: "🇪🇬",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    title: "National Security Impact",
    titleAr: "أثر الأمن القومي",
    subtitle: "Egypt-Scale Mission",
    points: [
      "WHO: Health misinformation is a 'global infodemic' causing preventable deaths",
      "UN Resolution A/75/592: Calls for information literacy as a human right",
      "40% vaccine hesitancy linked to social media (Egyptian Ministry of Health)",
      "Only platform addressing this at national scale with proper methodology",
      "Serving 100M+ Egyptians with context-aware, dialectal Arabic content",
    ],
    citation: "UN General Assembly Resolution A/75/592 — Information and Communications",
  },
];

const COMPARISON_ROWS = [
  { feature: "Dual-Mandate (Science + Islam)", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "144-Day ADDIE Curriculum", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "NVIDIA NIM Primary", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Arabic / Egyptian Dialect", eal: true, snopes: false, claimbuster: false, healthApp: "partial", islamicApp: "partial" },
  { feature: "78 API Routes", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "OSINT Integration", eal: true, snopes: "partial", claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Psychometric Instruments", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Inoculation Theory Applied", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Swarm AI Debate", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Deepfake Forensics", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
];

const COLS = [
  { key: "eal", label: "EAL", labelAr: "م.و.م", highlight: true, color: "#10b981" },
  { key: "snopes", label: "Snopes", highlight: false, color: "#6b7280" },
  { key: "claimbuster", label: "ClaimBuster", highlight: false, color: "#6b7280" },
  { key: "healthApp", label: "Health App", highlight: false, color: "#6b7280" },
  { key: "islamicApp", label: "Islamic App", highlight: false, color: "#6b7280" },
];

function Cell({ val }: { val: boolean | string }) {
  if (val === true) return (
    <span style={{ color: "#10b981", fontSize: 20, fontWeight: 900 }}>✓</span>
  );
  if (val === "partial") return (
    <span style={{ color: "#f59e0b", fontSize: 12, fontWeight: 700, background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 6 }}>Partial</span>
  );
  return <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 20 }}>—</span>;
}

/* ─── Page ─── */
export default function WhyUsPage() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activeAdvantage, setActiveAdvantage] = useState(0);

  // Auto-cycle advantages
  useEffect(() => {
    const iv = setInterval(() => setActiveAdvantage((p) => (p + 1) % ADVANTAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
  };

  return (
    <div style={pageStyle}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;
500;600;700;800;900&family=Cairo:wght@400;600;700;900&display=swap');
        .cairo { font-family: 'Cairo', sans-serif; }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .adv-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .adv-card:hover { transform: translateY(-4px); }
        .cite { font-size: 11px; color: rgba(255,255,255,0.35); font-style: italic; border-left: 2px solid rgba(255,255,255,0.1); padding-left: 8px; margin-top: 12px; }
        sup { font-size: 10px; color: rgba(255,255,255,0.4); vertical-align: super; }
      `}</style>

      {/* Animated Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", bottom: "-5%", left: "30%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 12s ease-in-out infinite 4s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ═══ HERO ═══ */}
        <section style={{ padding: "100px 0 80px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 100,
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.25)",
            marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.05em" }}>
              Backed by Science | مدعوم بالعلم
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
            <span style={{
              background: "linear-gradient(135deg, #fff 0%, #93c5fd 40%, #34d399 70%, #fbbf24 100%)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 6s ease infinite",
            }}>
              Why Egyptian Awareness Library
            </span>
            <br />
            <span style={{ color: "#fff" }}>is </span>
            <span style={{
              background: "linear-gradient(90deg, #34d399, #22d3ee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>#1</span>
          </h1>

          <p className="cairo" dir="rtl" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "rgba(255,255,255,0.6)", marginBottom: 48, fontWeight: 700 }}>
            لماذا منصة الوعي المصري هي الأقوى
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/curriculum/phase0" style={{
              padding: "14px 32px", borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none",
              boxShadow: "0 0 30px rgba(59,130,246,0.35)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              🚀 Start Your Journey
            </Link>
            <Link href="/competition-demo" style={{
              padding: "14px 32px", borderRadius: 14,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none",
            }}>
              🎬 See Live Demo
            </Link>
          </div>
        </section>

        {/* ═══ THE PROBLEM ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
              marginBottom: 16,
            }}>CRISIS DATA — بيانات الأزمة</div>
            <h2 className="cairo" dir="rtl" style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
              مصر تواجه حرباً معلوماتية
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17 }}>
              Egypt Faces an Information War — The Data Is Undeniable
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {PROBLEM_DATA.map((item, i) => (
              <div key={i} className="adv-card" style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${item.color}25`,
                borderRadius: 20, padding: 28,
                backdropFilter: "blur(10px)",
                boxShadow: `0 0 40px ${item.color}08`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: 8 }}>
                  {item.stat}
                </div>
                <div className="cairo" dir="rtl" style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>
                  {item.label} — {item.desc}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{item.en}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", padding: "4px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 6, display: "inline-block" }}>
                  📚 {item.source}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ OUR ADVANTAGES ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", letterSpacing: "0.12em", marginBottom: 14 }}>EVIDENCE-BASED ADVANTAGES</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
              Why We Win — <span style={{ color: "#34d399" }}>With Citations</span>
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {ADVANTAGES.map((adv, i) => (
              <button key={i} onClick={() => setActiveAdvantage(i)} style={{
                padding: "8px 18px", borderRadius: 10,
                background: activeAdvantage === i ? adv.color : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeAdvantage === i ? adv.color : "rgba(255,255,255,0.1)"}`,
                color: activeAdvantage === i ? "#000" : "rgba(255,255,255,0.5)",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                transition: "all 0.3s",
              }}>
                {adv.icon} {adv.num}
              </button>
            ))}
          </div>

          {/* Active Advantage Card */}
          {ADVANTAGES.map((adv, i) => (
            <div key={i} style={{
              display: i === activeAdvantage ? "block" : "none",
              background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, ${adv.glow} 100%)`,
              border: `1px solid ${adv.color}30`,
              borderRadius: 24, padding: "40px 48px",
              boxShadow: `0 0 60px ${adv.glow}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 auto" }}>
                  <div style={{ fontSize: 56 }}>{adv.icon}</div>
                  <div style={{ fontSize: 64, fontWeight: 900, color: adv.color, opacity: 0.15, lineHeight: 1, marginTop: -10 }}>{adv.num}</div>
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: adv.color, letterSpacing: "0.1em", marginBottom: 8 }}>{adv.subtitle}</div>
                  <h3 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: "#fff", marginBottom: 6 }}>{adv.title}</h3>
                  <p className="cairo" dir="rtl" style={{ fontSize: 18, color: adv.color, marginBottom: 24, fontWeight: 700 }}>{adv.titleAr}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {adv.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                        <span style={{ color: adv.color, fontWeight: 900, marginTop: 2, flexShrink: 0 }}>▸</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="cite">📚 {adv.citation}</p>
                </div>
              </div>
            </div>
          ))}

          {/* All 5 cards in a grid below */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className="adv-card" onClick={() => setActiveAdvantage(i)} style={{
                background: i === activeAdvantage ? `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${adv.glow} 100%)` : "rgba(255,255,255,0.025)",
                border: `1px solid ${i === activeAdvantage ? adv.color + "50" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 16, padding: "20px 22px", cursor: "pointer",
                boxShadow: i === activeAdvantage ? `0 0 30px ${adv.glow}` : "none",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{adv.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: i === activeAdvantage ? adv.color : "rgba(255,255,255,0.7)", marginBottom: 4 }}>{adv.num}. {adv.title}</div>
                <div className="cairo" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{adv.titleAr}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ COMPARISON TABLE ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399", letterSpacing: "0.12em", marginBottom: 14 }}>COMPETITIVE LANDSCAPE</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, color: "#fff" }}>
              The Comparison Table — <span style={{ color: "#34d399" }}>We Win Every Row</span>
            </h2>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, overflow: "hidden",
            boxShadow: "0 0 80px rgba(16,185,129,0.05)",
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <th style={{ textAlign: "left", padding: "18px 24px", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>FEATURE</th>
                    {COLS.map((col) => (
                      <th key={col.key} style={{
                        padding: "18px 16px", textAlign: "center",
                        fontSize: col.highlight ? 14 : 12,
                        fontWeight: 900,
                        color: col.highlight ? "#10b981" : "rgba(255,255,255,0.3)",
                        background: col.highlight ? "rgba(16,185,129,0.06)" : "transparent",
                        minWidth: 90,
                      }}>
                        {col.highlight && <div style={{ fontSize: 20, marginBottom: 4 }}>🏆</div>}
                        {col.label}
                        {col.labelAr && <div className="cairo" style={{ fontSize: 10, color: "#34d399", fontWeight: 700 }}>{col.labelAr}</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        background: hoveredRow === i ? "rgba(255,255,255,0.025)" : "transparent",
                        transition: "background 0.2s",
                      }}>
                      <td style={{ padding: "14px 24px", fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{row.feature}</td>
                      {COLS.map((col) => (
                        <td key={col.key} style={{
                          padding: "14px 16px", textAlign: "center",
                          background: col.highlight ? "rgba(16,185,129,0.04)" : "transparent",
                        }}>
                          <Cell val={(row as Record<string, boolean | string>)[col.key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Score summary */}
          <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            {COLS.map((col) => {
              const score = COMPARISON_ROWS.filter((r) => (r as Record<string, boolean | string>)[col.key] === true).length;
              const pct = Math.round((score / COMPARISON_ROWS.length) * 100);
              return (
                <div key={col.key} style={{
                  flex: 1, minWidth: 120,
                  background: col.highlight ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${col.highlight ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: 14, padding: "16px 20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: col.highlight ? "#10b981" : "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                    {score}/{COMPARISON_ROWS.length}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{col.label}</div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: col.highlight ? "#10b981" : "rgba(255,255,255,0.2)", borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ PHILOSOPHY ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="cairo" dir="rtl" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
              فلسفتنا
            </h2>
            <p style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "#60a5fa", fontWeight: 700, marginBottom: 12 }}>
              Our Philosophy
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, maxWidth: 700, margin: "0 auto" }}>
              We don't fact-check. We build immune systems.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              {
                icon: "🧠",
                color: "#3b82f6",
                title: "Inoculation Theory",
                titleAr: "نظرية التلقيح",
                body: "Pre-emptive exposure to weakened forms of misinformation builds cognitive antibodies. Like vaccines for the mind. Compton (2013), Roozenbeek et al. (2022).",
                bodyAr: "التعرض المسبق لأشكال ضعيفة من المعلومات المضللة يبني مناعة معرفية — كاللقاحات للعقل",
              },
              {
                icon: "🎯",
                color: "#10b981",
                title: "Cognitive Immunity",
                titleAr: "المناعة المعرفية",
                body: "Target: Not individual claims — the cognitive patterns that make you susceptible to ALL misinformation. Inspired by Bloom's Taxonomy & CBT frameworks.",
                bodyAr: "هدفنا ليس الادعاءات الفردية — بل الأنماط المعرفية التي تجعلك عرضة لكل المعلومات المضللة",
              },
              {
                icon: "🕌",
                color: "#f59e0b",
                title: "Islamic Epistemology",
                titleAr: "المعرفة الإسلامية",
                body: "Maqasid al-Shariah places عقل (intellect) as the 3rd of 5 protected objectives. Protecting the mind is a religious duty — not just a civic one.",
                bodyAr: "المقاصد الشرعية تضع العقل ثالث المقاصد الخمس — حماية العقل واجب ديني وليس مدنياً فقط",
              },
              {
                icon: "📊",
                color: "#8b5cf6",
                title: "Psychometric Rigor",
                titleAr: "الصرامة النفسية القياسية",
                body: "MIST-20 instrument for misinformation susceptibility. Pre/post testing with validated scales. Paired t-tests. Falsifiable hypotheses. Real science.",
                bodyAr: "أدوات قياسية محققة — اختبار MIST-20 مع تحليل إحصائي حقيقي قبل وبعد التدخل",
              },
              {
                icon: "🌍",
                color: "#ef4444",
                title: "Arabic-First Design",
                titleAr: "تصميم عربي أولاً",
                body: "Cairo Egyptian dialect detection. RTL-native UX. Egyptian social context. Not translated from English — built for Arabic speakers from day zero.",
                bodyAr: "كشف اللهجة المصرية القاهرية — تجربة مستخدم عربية أصيلة — بُنيت للعرب من اليوم الأول",
              },
              {
                icon: "🔭",
                color: "#06b6d4",
                title: "Vision 2030",
                titleAr: "رؤية 2030",
                body: "بناء مناعة معرفية — Building Cognitive Immunity for 100M Egyptians. Scaling Arabic media literacy across the Arab world by 2030.",
                bodyAr: "بناء مناعة معرفية لـ 100 مليون مصري — نشر ثقافة وسائل الإعلام العربية عبر العالم العربي بحلول 2030",
              },
            ].map((item, i) => (
              <div key={i} className="adv-card" style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                border: `1px solid ${item.color}20`,
                borderRadius: 20, padding: 28,
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.title}</h3>
                <p className="cairo" dir="rtl" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 12, fontWeight: 600 }}>{item.titleAr}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 12 }}>{item.body}</p>
                <p className="cairo" dir="rtl" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{item.bodyAr}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.08) 50%, rgba(245,158,11,0.08) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28, padding: "48px 40px",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32,
            textAlign: "center",
          }}>
            {[
              { val: 78, suffix: "", label: "API Routes", color: "#3b82f6" },
              { val: 31, suffix: "", label: "NVIDIA NIM Routes", color: "#f59e0b" },
              { val: 91, suffix: "", label: "Data Exercise Files", color: "#10b981" },
              { val: 119, suffix: "", label: "Platform Pages", color: "#8b5cf6" },
              { val: 33, suffix: "", label: "Science Exercises", color: "#06b6d4" },
              { val: 9, suffix: "", label: "Islamic Tools", color: "#34d399" },
              { val: 144, suffix: "", label: "Day Curriculum", color: "#f97316" },
              { val: 5, suffix: "", label: "AI Model Cascade", color: "#ec4899" },
              { val: 8, suffix: "", label: "GOD-System Layers", color: "#ef4444" },
              { val: 5, suffix: "", label: "Immunity Phases", color: "#a78bfa" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                  <AnimatedCounter target={s.val} suffix={s.suffix} duration={2000 + i * 100} />
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 50%, rgba(245,158,11,0.05) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 32, padding: "60px 40px",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 900, color: "#fff", marginBottom: 12 }}>
              Ready to Experience the Difference?
            </h2>
            <p className="cairo" dir="rtl" style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", marginBottom: 40, fontWeight: 700 }}>
              ابدأ رحلتك نحو المناعة المعرفية
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/curriculum/phase0" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none",
                boxShadow: "0 0 40px rgba(59,130,246,0.4)",
              }}>
                🚀 Start Your Journey
              </Link>
              <Link href="/competition-demo" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none",
                boxShadow: "0 0 40px rgba(16,185,129,0.3)",
              }}>
                🎬 See Live Demo
              </Link>
              <Link href="/explore" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none",
              }}>
                🗂️ Explore All Tools
              </Link>
            </div>

            {/* Citation footnotes */}
            <div style={{ marginTop: 48, textAlign: "left", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 2, fontStyle: "italic" }}>
                ¹ WHO Egypt Country Report 2022 — Health Misinformation Data<br />
                ² Reuters Institute Digital News Report 2023 — Egypt Chapter<br />
                ³ Roozenbeek, J., et al. (2022). Psychological inoculation improves resilience against misinformation. <em>Science Advances</em>, 8(12).<br />
                ⁴ Compton, J. (2013). Inoculation Theory. In J. Dillard & L. Shen (Eds.), <em>The SAGE Handbook of Persuasion</em>.<br />
                ⁵ Maertens, R., et al. (2023). The Misinformation Susceptibility Test (MIST-20). PMC10991074<br />
                ⁶ UN General Assembly Resolution A/75/592 — Information and Communications Technologies for Sustainable Development<br />
                ⁷ Egyptian Ministry of Health — COVID-19 Vaccine Hesitancy Report 2021
              </p>
            </div>
          </div>
        </section>

      </div>
      <PageNavigation currentPath="/why-us" />
    </div>
  );
}
