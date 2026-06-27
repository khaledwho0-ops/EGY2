"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Check,
  Languages,
  Menu,
  X,
  BookOpen,
  Palette,
  Microscope,
  Play,
  Square,
  Bot,
  Search,
  Flame,
  Globe,
  ScanSearch,
  Layers,
  Compass,
  Network,
  Library,
} from "lucide-react";
import { THEME_OPTIONS, useTheme } from "./theme-provider";
import { useRTL } from "./rtl-provider";
import { TrustedQuickAccess } from "@/components/sources/mega-menu";
import { AuthButton } from "./auth-button";
import { MegaNav } from "@/components/ui/mega-nav";
import { NAV, NAV_X, s } from "@/data/i18n/site-strings";
import { GlobalSearch } from "./global-search";
import { getCurrentUser } from "@/lib/auth";
import type { UserProfile } from "@/lib/auth";

/**
 * Sticky Frosted Navbar — DESIGN.txt §4.1
 * 
 * - Transparent at top → frosted glass on scroll (backdrop-filter:blur(12px))
 * - 0.3s transition on background-color + backdrop-filter
 * - Logo left, MVP links center, controls right
 * - Mobile: hamburger → fullscreen overlay (§4.2)
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authUser, setAuthUser] = useState<UserProfile | null>(null);
  const { resolvedTheme, resolvedScheme, contrastMode, isAutoCycling, setTheme, setContrastMode, startAutoCycle, stopAutoCycle } = useTheme();
  const { toggleDirection, isRTL, language, setLanguage } = useRTL();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    async function fetchUser() {
      const user = await getCurrentUser();
      setAuthUser(user);
    }
    fetchUser();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (DESIGN.txt §4.2)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!themePickerOpen) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-theme-picker]")) {
        setThemePickerOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setThemePickerOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [themePickerOpen]);

  const mvpLinks = [
    {
      href: "/sovo",
      label: isRTL ? "عقل SOVO" : "SOVO Nexus",
      icon: <ScanSearch size={18} />,
      accent: "#10b981",
      isPrimary: true,
    },
    {
      href: "/angry-debunkers",
      label: isRTL ? "المفنّدون الغاضبون" : "Angry Debunkers",
      icon: <Flame size={18} />,
      accent: "#C2185B",
    },
    {
      href: "/deepreal",
      label: s(NAV.deepreal, isRTL),
      icon: <ShieldCheck size={18} />,
      accent: "var(--accent-deepreal)",
    },
    {
      href: "/mental-health",
      label: s(NAV.mentalHealth, isRTL),
      icon: <HeartPulse size={18} />,
      accent: "var(--accent-mentalhealth)",
    },
    {
      href: "/religion-hub",
      label: s(NAV.religionHub, isRTL),
      icon: <Sparkles size={18} />,
      accent: "var(--accent-religionhub)",
    },
    {
      href: "/six-layers",
      label: isRTL ? "الطبقات الست" : "Six Layers",
      icon: <Layers size={18} />,
      accent: "#ef4444",
    },
    {
      href: "/explore",
      label: isRTL ? "استكشف الأدوات" : "Explore All",
      icon: <Compass size={18} />,
      accent: "#06b6d4",
    },
  ];

  const utilLinks = [
    { href: "/curriculum/phase0", label: `📚 ${isRTL ? "المرحلة 0: التهيئة" : "Phase 0: Calibration"}` },
    { href: "/curriculum/phase1", label: `🧠 ${isRTL ? "المرحلة 1: الإدراك" : "Phase 1: Cognition"}` },
    { href: "/curriculum/phase2", label: `🔬 ${isRTL ? "المرحلة 2: العلم" : "Phase 2: Science"}` },
    { href: "/curriculum/phase3", label: `🕌 ${isRTL ? "المرحلة 3: الإسلامي" : "Phase 3: Islamic"}` },
    { href: "/curriculum/phase4", label: `🏆 ${isRTL ? "المرحلة 4: السيادة" : "Phase 4: Sovereign"}` },
    { href: "/why-us", label: `🎯 ${isRTL ? "لماذا نحن" : "Why Us"}` },
    { href: "/philosophy", label: `🔮 ${isRTL ? "الفلسفة" : "Philosophy"}` },
    { href: "/impact", label: `📊 ${isRTL ? "الأثر" : "Impact"}` },
    { href: "/platform-guide", label: `📖 ${isRTL ? "دليل المنصة" : "Platform Guide"}` },
    { href: "/ai-editor", label: `🤖 ${isRTL ? "محرر الذكاء" : "AI Editor"}` },
    { href: "/ai-agents", label: `🤖 ${isRTL ? "فريق التحقيق" : "AI Agents"}` },
    { href: "/competition-demo", label: `🚀 ${isRTL ? "العرض التقديمي" : "Competition Demo"}` },
    { href: "/osint-investigator", label: `🔍 ${isRTL ? "محقق المصادر" : "OSINT Investigator"}` },
    { href: "/chatbot", label: `💬 ${isRTL ? "المحادثة الذكية" : "AI Chatbot"}` },
    { href: "/swarm-debate", label: `⚔️ ${isRTL ? "نقاش السرب" : "Swarm Debate"}` },
    { href: "/misinfo-atlas", label: `🗺️ ${isRTL ? "أطلس التضليل" : "Misinfo Atlas"}` },
    { href: "/baseline", label: `🧪 ${s(NAV.baseline, isRTL)}` },
    { href: "/sources", label: `📚 ${s(NAV.sources, isRTL)}` },
    { href: "/evidence", label: `🗂️ ${isRTL ? "الأدلة" : "Evidence"}` },
    { href: "/dashboard", label: `📊 ${s(NAV.dashboard, isRTL)}` },
    { href: "/supervisor", label: `🎓 ${s(NAV.supervisor, isRTL)}` },
    { href: "/about", label: `ℹ️ ${s(NAV.about, isRTL)}` },
    { href: "/guide", label: `🗺️ ${s(NAV.guide, isRTL)}` },
    { href: "/onboarding", label: `🚀 ${s(NAV.tour, isRTL)}` },
    { href: "/paper-auditor", label: `📝 ${isRTL ? "مدقق الأوراق العلمية" : "Paper Auditor"}` },
    { href: "/nvidia-hub", label: `🟢 ${isRTL ? "مركز NVIDIA NIM" : "NVIDIA NIM Hub"}` },
  ];

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "var(--bg-primary)",
          borderBottom: scrolled
            ? `1px solid var(--border-primary)`
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: "var(--navbar-height)" }}>
          {/* Philosophical/Intelligence Logo Design */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline group"
          >
            {/* Apple/Vercel Minimalist Icon Container */}
            <div className="flex items-center justify-center w-9 h-9 bg-[#ffffff0a] border border-[#ffffff1a] rounded-[10px] transition-all duration-300 group-hover:bg-[#ffffff14]">
              <Library size={18} className="text-[#f8fafc]" />
            </div>
            
            <div className="hidden xl:flex flex-col justify-center">
              <span className="flex items-center gap-2" style={{
                color: "#F8FAFC",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
              }}>
                {isRTL ? "مكتبة الوعي المصري" : "Egyptian Awareness Library"}
              </span>
            </div>
            {/* Fallback for smaller screens */}
            <span className="hidden sm:inline xl:hidden font-semibold text-lg" style={{ fontFamily: "-apple-system, sans-serif", color: "#F8FAFC", letterSpacing: "-0.01em" }}>
              EAL
            </span>
          </Link>

          {/* Desktop MVP Links — Replaced by MegaNav */}
          <div className="hidden lg:flex items-center">
            <MegaNav />
          </div>

          {/* Right Controls Hub */}
          <div className="flex items-center gap-3">
            
            {/* Minimalist Primary Action Button */}
            <Link 
              href="/master-roadmap" 
              className="hidden md:flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#0F172A] px-4 h-[34px] rounded-full font-semibold tracking-tight text-[13px] transition-all duration-200 shadow-sm whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
            >
              <Compass size={15} className="flex-shrink-0" />
              <span>{isRTL ? "خارطة الطريق الكاملة" : "Master Roadmap"}</span>
            </Link>

            {/* Apple-Style Utility Island */}
            <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/20 shadow-sm backdrop-blur-xl">
              
              {/* Text & Primary Utils */}
              <div className="hidden xl:flex items-center gap-1 px-1">
                <AuthButton />
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center px-3 rounded-full hover:bg-white/10 text-[13px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                  style={{ height: '30px', fontFamily: "-apple-system, sans-serif" }}
                >
                  {s(NAV_X.dashboard, isRTL)}
                </Link>
                {authUser?.role === "admin" && (
                  <Link
                    href="/supervisor"
                    className="flex items-center justify-center px-3 rounded-full bg-white/5 hover:bg-white/10 text-[13px] font-medium text-[#F8FAFC] transition-colors gap-1.5"
                    style={{ height: '30px', fontFamily: "-apple-system, sans-serif" }}
                  >
                    <ShieldCheck size={14} />
                    {isRTL ? "المشرف" : "Supervisor"}
                  </Link>
                )}
                <div className="flex items-center justify-center h-[30px] px-1">
                  <TrustedQuickAccess />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden xl:block w-[1px] h-4 bg-white/10 mx-1" />

              {/* Icon Utilities */}
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                  style={{ background: searchOpen ? "rgba(255,255,255,0.1)" : "transparent" }}
                  aria-label="Search platform"
                >
                  <Search size={15} />
                </button>

                {/* Theme mode picker */}
                <div style={{ position: "relative" }} data-theme-picker>
                  <button
                    onClick={() => setThemePickerOpen((prev) => !prev)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                    style={{ background: themePickerOpen ? "rgba(255,255,255,0.1)" : "transparent" }}
                    aria-label="Open theme modes"
                    aria-expanded={themePickerOpen}
                  >
                    <Palette size={15} />
                  </button>

              {themePickerOpen && (
                <div
                  className="glass animate-scale-in"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    width: 280,
                    maxHeight: "75vh",
                    overflowY: "auto",
                    padding: 12,
                    borderRadius: "var(--radius-lg)",
                    zIndex: 60,
                    transformOrigin: "top right",
                  }}
                >
                  <div style={{ marginBottom: 8, padding: "4px 6px" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-caption)" }}>
                      {s(NAV_X.visualModes, isRTL)}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {s(NAV_X.modesDesc, isRTL)}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {THEME_OPTIONS.map((option) => {
                      const isActive = resolvedTheme === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            setTheme(option.value);
                            setThemePickerOpen(false);
                          }}
                          style={{
                            width: "100%",
                            display: "grid",
                            gridTemplateColumns: "40px 1fr 20px",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: "var(--radius-md)",
                            border: isActive ? "1px solid var(--accent-cta)" : "1px solid var(--border-primary)",
                            background: isActive ? "var(--accent-cta-glow)" : "transparent",
                            color: "var(--text-primary)",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) e.currentTarget.style.background = "var(--bg-secondary)";
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              width: 40,
                              height: 28,
                              borderRadius: 999,
                              background: ({
                                terracotta: "linear-gradient(135deg, #4E2C23 0%, #E2725B 55%, #FFDAB9 100%)",
                                amethyst: "linear-gradient(135deg, #240A24 0%, #9932CC 55%, #E6E6FA 100%)",
                                bloodline: "linear-gradient(135deg, #240A24 0%, #ff5d95 48%, #ff7d66 78%, #d46aff 100%)",
                                "olive-meadow": "linear-gradient(135deg, #2A2D12 0%, #AEB784 55%, #E8E6D8 100%)",
                                "pearl-slate": "linear-gradient(135deg, #1E2438 0%, #ACBAC4 55%, #E8ECF0 100%)",
                                "core-wine": "linear-gradient(135deg, #121012 0%, #853953 55%, #F5E8EC 100%)",
                                "blush-energy": "linear-gradient(135deg, #FBF6F6 0%, #D96868 55%, #3D1F1F 100%)",
                                "steel-azure": "linear-gradient(135deg, #14161A 0%, #144EA0 55%, #CF98AF 100%)",
                                "crimson-violet": "linear-gradient(135deg, #3A0125 0%, #700143 45%, #CFD78C 100%)",
                                "deep-mocha": "linear-gradient(135deg, #231D1B 0%, #332927 50%, #D6C8DF 100%)",
                                "espresso-peony": "linear-gradient(135deg, #2A1B18 0%, #3E2723 45%, #F4C9D6 100%)",
                                "raspberry-space": "linear-gradient(135deg, #011E33 0%, #012641 40%, #E01858 100%)",
                                "icy-gunmetal": "linear-gradient(135deg, #282C2F 0%, #35393C 50%, #A4D8FF 100%)",
                                "lilac-cream": "linear-gradient(135deg, #FEFBCE 0%, #C8A2C9 55%, #2D1F2E 100%)",
                                light: "linear-gradient(135deg, #fafaf7 0%, #f0ede8 100%)",
                                dark: "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)",
                              } as Record<string, string>)[option.value] || "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)",
                              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16)",
                            }}
                          />
                          <span>
                            <span style={{ display: "block", fontSize: 13, fontWeight: 700 }}>{option.label}</span>
                            <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)" }}>
                              {option.description}
                            </span>
                          </span>
                          <span style={{ color: isActive ? "var(--text-primary)" : "transparent" }}>
                            <Check size={14} />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ═══ TRY ALL — Auto-cycle toggle ═══ */}
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--border-primary)" }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAutoCycling) {
                          stopAutoCycle();
                        } else {
                          startAutoCycle();
                          setThemePickerOpen(false);
                        }
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        border: isAutoCycling ? "1px solid var(--accent-cta)" : "1px solid var(--border-primary)",
                        background: isAutoCycling
                          ? "linear-gradient(135deg, rgba(0,102,255,0.12), rgba(139,92,246,0.12))"
                          : "var(--bg-secondary)",
                        color: isAutoCycling ? "var(--accent-cta)" : "var(--text-primary)",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 700,
                        fontFamily: "'Satoshi', sans-serif",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isAutoCycling ? (
                        <>
                          <span style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: "var(--accent-cta)",
                            animation: "pulse 2s ease-in-out infinite",
                          }} />
                          <Square size={14} />
                          {isRTL ? "إيقاف التجربة" : "Stop Trying"}
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          {isRTL ? "جرّب الكل" : "Try All Themes"}
                        </>
                      )}
                    </button>
                    <div style={{ fontSize: 11, color: "var(--text-caption)", textAlign: "center", marginTop: 6 }}>
                      {isRTL
                        ? "يتنقل ببطء بين جميع الأوضاع بانسيابية"
                        : "Slowly cycles through all modes with gentle fade"}
                    </div>
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--border-primary)" }}>
                    <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-caption)", marginBottom: 8 }}>
                      {isRTL ? "التباين" : "Contrast"}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        className={contrastMode === "normal" ? "btn-primary" : "btn-secondary"}
                        onClick={() => setContrastMode("normal")}
                        style={{ flex: 1 }}
                      >
                        {isRTL ? "عادي" : "Normal"}
                      </button>
                      <button
                        type="button"
                        className={contrastMode === "high" ? "btn-primary" : "btn-secondary"}
                        onClick={() => setContrastMode("high")}
                        style={{ flex: 1 }}
                      >
                        {isRTL ? "عالٍ" : "High"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher — 3 languages */}
            {(() => {
              const langCycle: Array<{ id: "en" | "ar" | "ar-EG"; label: string; short: string }> = [
                { id: "en", label: "English", short: "EN" },
                { id: "ar", label: "العربية الفصحى", short: "عر" },
                { id: "ar-EG", label: "المصري", short: "مص" },
              ];
              const currentLang = (typeof language === "string" && ["en","ar","ar-EG"].includes(language)) ? language : "en";
              const currentIndex = langCycle.findIndex(l => l.id === currentLang);
              const nextIndex = (currentIndex + 1) % langCycle.length;
              const nextLang = langCycle[nextIndex];
              const currentEntry = langCycle[currentIndex >= 0 ? currentIndex : 0];
              return (
                <button
                  onClick={() => setLanguage(nextLang.id)}
                  className="flex items-center justify-center px-2.5 h-8 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors group"
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    gap: 4,
                  }}
                  aria-label={`Switch to ${nextLang.label}`}
                  title={`${currentEntry.label} → ${nextLang.label}`}
                >
                  <Languages size={14} className="transition-colors" />
                  <span className="text-[11px] font-bold tracking-wide">{currentEntry.short}</span>
                </button>
              );
            })()}
            </div>
            </div>

            {/* Mobile hamburger (DESIGN.txt §4.2) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                color: "var(--text-primary)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu (DESIGN.txt §4.2) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: resolvedScheme === "dark" ? "#0A0A0A" : "#FFFFFF",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 p-2"
            style={{
              color: "var(--text-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {mvpLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-2xl font-bold no-underline transition-all duration-300"
              style={{
                color: "var(--text-primary)",
                fontFamily: "'Clash Display', sans-serif",
                opacity: 0,
                animation: `fadeInUp 0.4s ease ${i * 0.05}s forwards`,
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4"
            style={{
              opacity: 0,
              animation: `fadeInUp 0.4s ease 0.2s forwards`,
            }}
          >
            {s(NAV_X.openDash, isRTL)}
          </Link>

          <Link
            href="/science"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 text-xl font-bold no-underline transition-all duration-300"
            style={{
              color: "var(--text-primary)",
              fontFamily: "'Clash Display', sans-serif",
              opacity: 0,
              animation: "fadeInUp 0.4s ease 0.22s forwards",
            }}
          >
            <Microscope size={20} />
            {isRTL ? "مركز العلم" : "Science Hub"}
          </Link>

          <div
            style={{
              display: "grid",
              gap: 8,
              width: "min(320px, 88vw)",
              opacity: 0,
              animation: "fadeInUp 0.4s ease 0.24s forwards",
            }}
          >
            {THEME_OPTIONS.slice(0, 3).map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: resolvedTheme === option.value ? "1px solid var(--accent-cta)" : "1px solid var(--border-primary)",
                  background: "transparent",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Utility Links */}
          <div style={{ display: "flex", gap: 12, opacity: 0, animation: "fadeInUp 0.4s ease 0.25s forwards" }}>
            {utilLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
