"use client";

import { useState, useRef } from "react";
import { Brain, Shield, Microscope, Globe, HeartPulse, ShieldCheck, Cpu, ScanSearch, Flame, Layers, Network, Search, MapPin, FileCheck, BookOpen, AlertTriangle, Fingerprint, MessageSquare, BrainCircuit, GraduationCap, Compass, Sparkles, Map, Rocket, Zap, Trophy, Lightbulb, Wand2, BarChart3 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { NAV_CATS } from "@/data/i18n/site-strings";

interface NavItem {
  id: string;
  labelEn: string;
  labelAr: string;
  icon: React.ReactNode;
  content: { titleEn: string; titleAr: string; descEn: string; descAr: string; href: string; icon: React.ReactNode; isNew?: boolean }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "intelligence",
    labelEn: NAV_CATS.intelligence.en,
    labelAr: NAV_CATS.intelligence.ar,
    icon: <Brain size={15} />,
    content: [
      { titleEn: "SOVO Nexus", titleAr: "عقل SOVO", descEn: "Central intelligence brain", descAr: "العقل المركزي للاستخبارات", href: "/sovo", icon: <ScanSearch size={16} /> },
      { titleEn: "The God System", titleAr: "النظام الشامل", descEn: "7-layer debunking protocol", descAr: "بروتوكول التفنيد السباعي", href: "/god-system", icon: <Globe size={16} /> },
      { titleEn: "DeepReal Core", titleAr: "نواة ديب ريل", descEn: "Deepfake & misinfo detection", descAr: "كشف التزييف العميق", href: "/deepreal", icon: <ShieldCheck size={16} /> },
      { titleEn: "Live OSINT", titleAr: "استخبارات المصادر", descEn: "Real-time threat feeds", descAr: "بث التهديدات الحي", href: "/osint-investigator", icon: <Search size={16} /> },
      { titleEn: "NVIDIA AI Hub", titleAr: "مركز NVIDIA", descEn: "NIM-powered intelligence", descAr: "ذكاء مدعوم بـ NIM", href: "/nvidia-hub", icon: <Zap size={16} />, isNew: true },
      { titleEn: "Swarm Debate", titleAr: "نقاش السرب", descEn: "5 AI debaters simultaneously", descAr: "5 محاورين بالذكاء", href: "/swarm-debate", icon: <Network size={16} />, isNew: true },
    ]
  },
  {
    id: "defense",
    labelEn: NAV_CATS.defense.en,
    labelAr: NAV_CATS.defense.ar,
    icon: <Shield size={15} />,
    content: [
      { titleEn: "Angry Debunkers", titleAr: "المفنّدون الغاضبون", descEn: "Automated AI debunking", descAr: "تفنيد تلقائي بالذكاء", href: "/angry-debunkers", icon: <Flame size={16} /> },
      { titleEn: "Threat Map", titleAr: "خريطة التهديد", descEn: "Patient Zero tracking", descAr: "رسم شبكة المريض صفر", href: "/threat-map", icon: <Map size={16} /> },
      { titleEn: "Rumor Heatmap", titleAr: "الخريطة الحرارية", descEn: "Geospatial spread", descAr: "الانتشار الجغرافي", href: "/rumor-heatmap", icon: <BarChart3 size={16} /> },
      { titleEn: "Misinfo Atlas", titleAr: "أطلس التضليل", descEn: "Egyptian misinformation DB", descAr: "قاعدة بيانات التضليل", href: "/misinfo-atlas", icon: <MapPin size={16} /> },
      { titleEn: "Paper Auditor", titleAr: "مدقق الأبحاث", descEn: "p-hacking & methodology audit", descAr: "كشف التلاعب الإحصائي", href: "/paper-auditor", icon: <FileCheck size={16} /> },
      { titleEn: "Media Forensics", titleAr: "فحص الصور", descEn: "Deepfake & C2PA analysis", descAr: "تحليل التزييف العميق", href: "/forensic-image", icon: <Microscope size={16} /> },
    ]
  },
  {
    id: "curriculum",
    labelEn: NAV_CATS.curriculum.en,
    labelAr: NAV_CATS.curriculum.ar,
    icon: <GraduationCap size={15} />,
    content: [
      { titleEn: "Phase 0: Calibration", titleAr: "المرحلة 0: التهيئة", descEn: "28-day psychological baseline", descAr: "التأسيس النفسي 28 يوماً", href: "/curriculum/phase0", icon: <Lightbulb size={16} />, isNew: true },
      { titleEn: "Phase 1: Cognition", titleAr: "المرحلة 1: الإدراك", descEn: "100 logical fallacies mastery", descAr: "إتقان 100 مغالطة منطقية", href: "/curriculum/phase1", icon: <Brain size={16} />, isNew: true },
      { titleEn: "Phase 2: Science", titleAr: "المرحلة 2: العلم", descEn: "100 scientific fallacies", descAr: "100 مغالطة علمية", href: "/curriculum/phase2", icon: <Microscope size={16} />, isNew: true },
      { titleEn: "Phase 3: Islamic Defense", titleAr: "المرحلة 3: الدفاع الإسلامي", descEn: "100 Islamic fallacies + takhrij", descAr: "100 مغالطة إسلامية + تخريج", href: "/curriculum/phase3", icon: <Sparkles size={16} />, isNew: true },
      { titleEn: "Phase 4: Sovereign", titleAr: "المرحلة 4: السيادة", descEn: "Capstone + live defense", descAr: "التتويج + الدفاع الحي", href: "/curriculum/phase4", icon: <Trophy size={16} />, isNew: true },
      { titleEn: "Competition Demo", titleAr: "العرض التقديمي", descEn: "Judge demo sequence", descAr: "تسلسل العرض للحكام", href: "/competition-demo", icon: <Rocket size={16} />, isNew: true },
    ]
  },
  {
    id: "human",
    labelEn: NAV_CATS.cognitive.en,
    labelAr: NAV_CATS.cognitive.ar,
    icon: <BrainCircuit size={15} />,
    content: [
      { titleEn: "Fallacy Engine", titleAr: "محرك المغالطات", descEn: "3-tier fallacy detection", descAr: "اكتشاف المغالطات ثلاثي", href: "/fallacy-engine", icon: <AlertTriangle size={16} /> },
      { titleEn: "Bias Fingerprint", titleAr: "بصمة التحيز", descEn: "Cognitive vulnerabilities", descAr: "نقاط الضعف المعرفية", href: "/bias-fingerprint", icon: <Fingerprint size={16} /> },
      { titleEn: "Debate Simulator", titleAr: "محاكي المناظرات", descEn: "Multi-agent LLM debates", descAr: "مناظرات الذكاء", href: "/debate-sim", icon: <MessageSquare size={16} /> },
      { titleEn: "Inoculation Passport", titleAr: "جواز التحصين", descEn: "Level 1–5 cognitive immunity", descAr: "حصانة معرفية 1–5", href: "/inoculation-passport", icon: <HeartPulse size={16} /> },
      { titleEn: "Religion Hub", titleAr: "مركز الدين", descEn: "Islamic tools & hadith check", descAr: "أدوات إسلامية + فحص الحديث", href: "/religion-hub", icon: <Sparkles size={16} /> },
      { titleEn: "Mental Health", titleAr: "الصحة النفسية", descEn: "GHSQ + myth-autopsy", descAr: "دعم الصحة النفسية", href: "/mental-health", icon: <HeartPulse size={16} /> },
    ]
  },
  {
    id: "platform",
    labelEn: NAV_CATS.platform.en,
    labelAr: NAV_CATS.platform.ar,
    icon: <Compass size={15} />,
    content: [
      { titleEn: "Explore All Tools", titleAr: "استكشف الأدوات", descEn: "86+ tools in 9 categories", descAr: "86+ أداة في 9 فئات", href: "/explore", icon: <Compass size={16} />, isNew: true },
      { titleEn: "Why Us", titleAr: "لماذا نحن", descEn: "Scientific competitor analysis", descAr: "تحليل علمي للمنافسين", href: "/why-us", icon: <Trophy size={16} />, isNew: true },
      { titleEn: "Philosophy", titleAr: "الفلسفة", descEn: "Cognition power building", descAr: "بناء القوة المعرفية", href: "/philosophy", icon: <Lightbulb size={16} />, isNew: true },
      { titleEn: "Impact", titleAr: "الأثر", descEn: "Real-world impact metrics", descAr: "مقاييس الأثر الحقيقي", href: "/impact", icon: <BarChart3 size={16} />, isNew: true },
      { titleEn: "Platform Guide", titleAr: "دليل المنصة", descEn: "How to use all 86+ tools", descAr: "كيفية استخدام الأدوات", href: "/platform-guide", icon: <BookOpen size={16} />, isNew: true },
      { titleEn: "AI Editor", titleAr: "محرر الذكاء", descEn: "Build with AI — 36 scenarios", descAr: "ابنِ مع الذكاء — 36 سيناريو", href: "/ai-editor", icon: <Wand2 size={16} />, isNew: true },
    ]
  }
];


export function MegaNav() {
  const { isRTL } = useRTL();
  const dir = isRTL ? "rtl" : "ltr";
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [dropdownStyle, setDropdownStyle] = useState<{ left: number; opacity: number; pointerEvents: "none" | "auto" }>({ left: 0, opacity: 0, pointerEvents: "none" });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number, el: HTMLElement) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const navRect = navRef.current?.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    
    if (navRect) {
      setPillStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
        opacity: 1
      });
      // Center dropdown under item, clamp to viewport
      const dropW = 620;
      let targetLeft = elRect.left - navRect.left + (elRect.width / 2) - (dropW / 2);
      const maxLeft = navRect.width - dropW;
      targetLeft = Math.max(0, Math.min(targetLeft, maxLeft));
      setDropdownStyle({
        left: targetLeft,
        opacity: 1,
        pointerEvents: "auto"
      });
    }
    setHoveredIndex(index);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
      setActiveIndex(null);
      setPillStyle(p => ({ ...p, opacity: 0 }));
      setDropdownStyle(p => ({ ...p, opacity: 0, pointerEvents: "none" }));
    }, 200);
  };

  return (
    <div style={{ position: "relative", zIndex: 100, display: "flex", alignItems: "center", direction: dir }}>
      <div 
        ref={navRef}
        style={{ 
          position: "relative", 
          display: "flex", 
          gap: 2, 
          background: "transparent", 
          padding: "4px 4px", 
        }}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover Pill */}
        <div 
          style={{
            position: "absolute",
            top: 4,
            height: "calc(100% - 8px)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
            ...pillStyle,
            opacity: hoveredIndex !== null ? 1 : 0
          }}
        />

        {/* Nav Items */}
        {NAV_ITEMS.map((item, i) => (
          <div 
            key={item.id}
            onMouseEnter={(e) => handleMouseEnter(i, e.currentTarget)}
            style={{
              position: "relative",
              padding: "6px 12px",
              cursor: "default",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: activeIndex === i ? "#F8FAFC" : "#94A3B8",
              fontWeight: 500,
              fontSize: 13,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease",
              zIndex: 1
            }}
          >
            <span style={{ display: "flex", alignItems: "center", opacity: activeIndex === i ? 1 : 0.8, transition: "opacity 0.2s" }}>
              {item.icon}
            </span>
            <span>{isRTL ? item.labelAr : item.labelEn}</span>
          </div>
        ))}

        {/* Dropdown Panel */}
        <div 
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            width: 620,
            background: "rgba(10, 15, 30, 0.92)",
            backdropFilter: "blur(24px) saturate(200%)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 64px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
            padding: 20,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            transformOrigin: "top center",
            transform: dropdownStyle.opacity ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
            opacity: dropdownStyle.opacity,
            pointerEvents: dropdownStyle.pointerEvents,
            left: dropdownStyle.left,
          }}
        >
          {activeIndex !== null && NAV_ITEMS[activeIndex].content.map((child, idx) => (
            <a 
              key={idx} 
              href={child.href}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 10px",
                borderRadius: "10px",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.2s ease",
                backgroundColor: "transparent",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ 
                padding: 8, 
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))", 
                borderRadius: "10px", 
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E2E8F0",
                flexShrink: 0,
              }}>
                {child.icon}
              </div>
              <div style={{ flex: 1, paddingTop: 1, minWidth: 0 }}>
                <div style={{ 
                  color: "#F8FAFC", 
                  fontWeight: 600, 
                  fontSize: 13, 
                  marginBottom: 2, 
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  {isRTL ? child.titleAr : child.titleEn}
                  {child.isNew && (
                    <span style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      background: "linear-gradient(135deg, #10b981, #06b6d4)",
                      color: "#fff",
                      padding: "1px 5px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                      lineHeight: 1.5,
                      flexShrink: 0,
                    }}>NEW</span>
                  )}
                </div>
                <div style={{ 
                  color: "#64748B", 
                  fontSize: 11.5, 
                  lineHeight: 1.35, 
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {isRTL ? child.descAr : child.descEn}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
