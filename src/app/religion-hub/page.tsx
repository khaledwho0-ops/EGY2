"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

const TOOLS = [
  { emoji: "🔍", name: "Hadith Checker", nameAr: "مدقق الأحاديث", desc: "Verify hadith authenticity via Fawazahmed0 API. Cross-reference with Bukhari, Muslim, Tirmidhi, and 5 more collections.", descAr: "تحقق من صحة الأحاديث عبر واجهة Fawazahmed0. مرجعية مع البخاري ومسلم والترمذي و5 مجموعات أخرى.", href: "/religion-hub/tools/hadith-check", color: "#10B981" },
  { emoji: "⚖️", name: "Fatwa Context", nameAr: "سياق الفتوى", desc: "Analyze fatwas with proper scholarly context. Cross-reference with Dar Al-Ifta official rulings.", descAr: "حلل الفتاوى بسياقها العلمي الصحيح. مرجعية مع دار الإفتاء.", href: "/religion-hub/tools/fatwa-context", color: "#6366f1" },
  { emoji: "📖", name: "Quran Context", nameAr: "سياق القرآن", desc: "Tafsir bi-l-ma'thur with asbab al-nuzul, makki-madani gating, and muhkam-mutashabih classification.", descAr: "تفسير بالمأثور مع أسباب النزول والتصنيف المكي-المدني.", href: "/religion-hub/tools/quran-context", color: "#F59E0B" },
  { emoji: "🛡️", name: "Sectarian Detector", nameAr: "كاشف الطائفية", desc: "Identify sectarian manipulation, takfir rhetoric, and political instrumentalization of religion.", descAr: "اكتشف التلاعب الطائفي وخطاب التكفير والاستغلال السياسي للدين.", href: "/religion-hub/tools/sectarian-detector", color: "#EF4444" },
  { emoji: "👤", name: "Authority Verifier", nameAr: "محقق السلطة الدينية", desc: "Verify Islamic authority credentials. Distinguish real scholars from social media 'sheikhs'.", descAr: "تحقق من مؤهلات السلطة الدينية. فرّق بين العلماء الحقيقيين ومشايخ السوشيال ميديا.", href: "/religion-hub/tools/authority-verifier", color: "#8B5CF6" },
  { emoji: "💰", name: "Zakat Calculator", nameAr: "حاسبة الزكاة", desc: "Precise zakat computation following Hanafi, Maliki, Shafi'i, and Hanbali methodologies.", descAr: "حساب الزكاة الدقيق وفق المذاهب الأربعة.", href: "/religion-hub/tools/zakat-calculator", color: "#06B6D4" },
  { emoji: "📜", name: "Mawarith", nameAr: "المواريث", desc: "Islamic inheritance calculation per Quran 4:11-12. Covers all 25+ heir categories.", descAr: "حساب المواريث الإسلامية وفق القرآن. يغطي 25+ فئة من الورثة.", href: "/religion-hub/tools/mawarith", color: "#EC4899" },
  { emoji: "🏦", name: "Halal Finance", nameAr: "التمويل الحلال", desc: "Scrutinize financial products for riba, gharar, and maysir. Distinguish murabaha from disguised loans.", descAr: "فحص المنتجات المالية من الربا والغرر والميسر.", href: "/religion-hub/tools/halal-finance", color: "#F97316" },
  { emoji: "🎯", name: "Maqasid Check", nameAr: "فحص المقاصد", desc: "Test if a ruling aligns with Maqasid al-Shariah: preservation of religion, life, intellect, lineage, property.", descAr: "اختبر إذا كان الحكم يتوافق مع مقاصد الشريعة.", href: "/religion-hub/maqasid", color: "#14B8A6" },
];

export default function ReligionHubPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1100 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(16,185,129,0.15))", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>🕌</div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Islamic Verification Hub", ar: "مركز التحقق الإسلامي", arEG: "مركز التحقق الإسلامي" })}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "Maqasid al-Shariah", ar: "مقاصد الشريعة", arEG: "مقاصد الشريعة" })}
          </p>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { v: "9", l: "Tools", lAr: "أدوات", c: "#10B981" },
            { v: "100", l: "Islamic Fallacies", lAr: "مغالطة إسلامية", c: "#F59E0B" },
            { v: "50", l: "Fundamentals", lAr: "أساسيات", c: "#6366f1" },
            { v: "8", l: "Hadith Collections", lAr: "مجموعات أحاديث", c: "#EC4899" },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: ff }}>{a ? s.lAr : s.l}</div>
            </div>
          ))}
        </div>
        {/* Tools Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 32 }}>
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="glass-card no-underline" style={{ padding: 20, color: "inherit", transition: "transform 0.2s, box-shadow 0.2s", borderLeft: `4px solid ${tool.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>{tool.emoji}</span>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: ff, color: tool.color }}>{a ? tool.nameAr : tool.name}</div>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.7, fontFamily: ff }}>
                {a ? tool.descAr : tool.desc}
              </p>
            </Link>
          ))}
        </div>
        {/* Quick Links */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, marginBottom: 16, fontFamily: ff }}>{t({ en: "📱 More Islamic Tools", ar: "📱 أدوات إسلامية إضافية", arEG: "📱 أدوات إسلامية إضافية" })}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Link href="/religion-hub/exercise/1" className="glass-card no-underline" style={{ padding: 16, textAlign: "center", color: "inherit" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: ff }}>{t({ en: "Daily Islamic Exercise", ar: "التمرين الإسلامي اليومي", arEG: "التمرين الإسلامي اليومي" })}</div>
            </Link>
            <Link href="/religion-hub/whatsapp" className="glass-card no-underline" style={{ padding: 16, textAlign: "center", color: "inherit" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: ff }}>{t({ en: "WhatsApp Message Checker", ar: "فاحص رسائل واتساب", arEG: "فاحص رسائل واتساب" })}</div>
            </Link>
            <Link href="/religion-hub/quran" className="glass-card no-underline" style={{ padding: 16, textAlign: "center", color: "inherit" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📖</div>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: ff }}>{t({ en: "Quran Study", ar: "دراسة القرآن", arEG: "دراسة القرآن" })}</div>
            </Link>
          </div>
        </div>
        {/* Scholarly Standards */}
        <div className="glass-card" style={{ padding: 24, borderLeft: "4px solid #F59E0B" }}>
          <h3 style={{ fontSize: 16, marginBottom: 12, fontFamily: ff, color: "#F59E0B" }}>
            {t({ en: "📚 Islamic Scholarship Standards", ar: "📚 معايير العلم الإسلامي", arEG: "📚 معايير العلم الإسلامي" })}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, fontFamily: ff }}>
            <div>
              <strong style={{ color: "var(--text-primary)" }}>{t({ en: "Sources:", ar: "المصادر:", arEG: "المصادر:" })}</strong>
              <ul style={{ margin: "8px 0 0", paddingInlineStart: 20 }}>
                <li>Sahih al-Bukhari, Sahih Muslim, Sunan al-Tirmidhi</li>
                <li>Dar Al-Ifta al-Misriyyah (Official Egyptian Fatwa House)</li>
                <li>Al-Azhar Al-Sharif (Islamic Research Academy)</li>
                <li>IslamWeb.net (Qatari Ministry of Awqaf)</li>
                <li>Al-Dorar Al-Saniyyah (الدرر السنية)</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: "var(--text-primary)" }}>{t({ en: "Methods:", ar: "المناهج:", arEG: "المناهج:" })}</strong>
              <ul style={{ margin: "8px 0 0", paddingInlineStart: 20 }}>
                <li>{t({ en: "Tahqiq — Verification of attribution", ar: "تحقيق — التثبت من النسبة", arEG: "تحقيق — التثبت من النسبة" })}</li>
                <li>{t({ en: "Takhrij — Locating hadith in primary collections", ar: "تخريج — تحديد موقع الحديث", arEG: "تخريج — تحديد موقع الحديث" })}</li>
                <li>{t({ en: "Usul al-Tafsir — Rules of exegesis", ar: "أصول التفسير — قواعد التفسير", arEG: "أصول التفسير — قواعد التفسير" })}</li>
                <li>{t({ en: "Jarh wa Ta'dil — Narrator criticism", ar: "جرح وتعديل — نقد الرواة", arEG: "جرح وتعديل — نقد الرواة" })}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/religion-hub" />

      <PageAIChatbot
        pageTitle="Islamic Epistemological Defense Hub — مركز الذكاء الإسلامي"
        pageContext="EAL Islamic Intelligence Hub: 9 verification tools backed by real Islamic scholarship. Hadith authentication, Fatwa context analysis, Quran tafsir, sectarian detection, authority verification, zakat, mawarith, halal finance, maqasid."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Islamic Epistemological Defense AI — a scholar-grade Islamic knowledge assistant trained in tahqiq (verification), takhrij (source tracing), usul al-tafsir (exegesis methodology), and maqasid al-shariah (objectives of Islamic law).

[LAYER 2 - SCHOLARLY SOURCES YOU REFERENCE]:
- Sahih al-Bukhari, Sahih Muslim, Sunan al-Tirmidhi, Sunan Abu Dawud, Sunan Ibn Majah, Sunan al-Nasa'i
- Al-Azhar Al-Sharif Islamic Research Academy
- Dar Al-Ifta al-Misriyyah (Official Egyptian Fatwa House)
- Al-Dorar Al-Saniyyah, IslamWeb.net
- Classical scholars: Ibn Hajar, Al-Nawawi, Al-Dhahabi, Ibn Taymiyyah, Al-Ghazali, Al-Shatibi

[LAYER 3 - METHODOLOGY]:
1. Tahqiq — Verify attribution to original source
2. Takhrij — Locate hadith in primary collections with grade
3. Usul al-Tafsir — Apply proper exegetical rules
4. Jarh wa Ta'dil — Narrator criticism and authentication
5. Maqasid al-Shariah — 5 objectives: religion, life, intellect, lineage, property

[LAYER 4 - RULES]:
1. ALWAYS cite: Quran [Surah:Ayah], Hadith [Book, Hadith Number, Grade]
2. Distinguish between sahih, hasan, da'if, mawdu' classifications
3. For fatwas: specify the madhhab (Hanafi/Maliki/Shafi'i/Hanbali) and scholar
4. NEVER give personal fatwa — always reference established scholarly positions
5. Flag potential sectarian manipulation or misquotation
6. Respond in the user's language (Arabic or English)
7. For Egyptian context: reference Dar Al-Ifta and Al-Azhar positions`}
        suggestedQuestions={[
          'كيف أتحقق من صحة حديث في الواتساب؟',
          'How do I verify if a fatwa is authentic?',
          'إزاي أعرف إن الشيخ دا مؤهل ولا لا؟',
          'ما هي مقاصد الشريعة الخمسة؟',
          'How does Jarh wa Ta\'dil work?',
        ]}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
    </div>
  );
}
