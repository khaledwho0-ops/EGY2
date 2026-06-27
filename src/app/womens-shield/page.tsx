"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { 
  Heart, Shield, AlertTriangle, MessageSquare, PhoneCall, 
  CheckCircle, ArrowLeft, Brain, Landmark, Key, HelpCircle,
  RefreshCw
} from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

interface ManipulationPattern {
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  severity: "High" | "Medium";
  matches: string[];
}

const MANIPULATION_RULES: ManipulationPattern[] = [
  {
    name: { en: "Gaslighting", ar: "التلاعب العقلي (الغازلايتنغ)" },
    description: { 
      en: "Attempts to make you doubt your own memory, perception, or sanity.", 
      ar: "محاولات لجعلكِ تشكين في ذاكرتكِ أو إدراككِ أو قواكِ العقلية." 
    },
    severity: "High",
    matches: [
      "crazy", "imagining", "never said", "forget", "paranoid", "sensitive", "exaggerating",
      "مجنونة", "تتوهمين", "لم أقل", "تنسين", "حساسة", "تبالغين", "تهيؤات"
    ]
  },
  {
    name: { en: "Guilt Tripping", ar: "الابتزاز بالذنب" },
    description: { 
      en: "Using guilt to manipulate your actions and make you feel responsible for their feelings.", 
      ar: "استخدام الشعور بالذنب لإجباركِ على تصرفات معينة وجعلكِ مسؤولة عن مشاعرهم." 
    },
    severity: "Medium",
    matches: [
      "after all I did", "selfish", "disappoint", "hurt me", "sacrifice", "ruined",
      "بعد كل ما فعلت", "أنانية", "خيبت", "تؤذينني", "تضحيتي", "خربت", "دمّرت"
    ]
  },
  {
    name: { en: "Isolation Attempt", ar: "محاولة العزل الاجتماعي" },
    description: { 
      en: "Encouraging you to distance yourself from friends, family, or support networks.", 
      ar: "تشجيعكِ على الابتعاد عن الصديقات، العائلة، أو شبكات الدعم." 
    },
    severity: "High",
    matches: [
      "don't talk to", "family doesn't", "friends are", "only need me", "stay home", "influence",
      "لا تتحدثي مع", "أهلك لا", "صديقاتكِ", "تحتاجينني فقط", "ابقِ في البيت", "تأثير"
    ]
  },
  {
    name: { en: "Intimidation / Coercion", ar: "الترهيب والإكراه" },
    description: { 
      en: "Threatening negative consequences if you do not comply with demands.", 
      ar: "التهديد بعواقب وخيمة أو عقاب إذا لم تستجيبي للمطالب." 
    },
    severity: "High",
    matches: [
      "regret", "otherwise", "dare", "or else", "consequences", "leave you",
      "ستندمين", "وإلا", "تجرؤين", "عواقب", "سأترككِ", "الطلاق"
    ]
  }
];

export default function WomensShieldPage() {
  const { isRTL, t } = useRTL();
  
  // Analyzer state
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[] | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Run client-side pattern analysis
    setTimeout(() => {
      const detected: any[] = [];
      const loweredText = text.toLowerCase();

      MANIPULATION_RULES.forEach(rule => {
        const foundMatches = rule.matches.filter(keyword => loweredText.includes(keyword));
        if (foundMatches.length > 0) {
          detected.push({
            name: t(rule.name),
            description: t(rule.description),
            severity: rule.severity,
            keywordsMatched: foundMatches
          });
        }
      });

      setAnalysisResult(detected);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* HEADER */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            <ArrowLeft size={16} /> {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
          <div style={{ padding: 20, backgroundColor: "rgba(255,100,150,0.1)", borderRadius: "var(--radius-xl)" }}>
            <Heart size={44} style={{ color: "#EC4899" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0, lineHeight: 1.1 }}>
              <span className="text-gradient" style={{ backgroundImage: "linear-gradient(to right, #EC4899, #F43F5E)" }}>
                {t({ en: "Women's Psychographic Shield", ar: "درع الحماية النفسية للمرأة" })}
              </span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "8px 0 0 0", fontSize: "1.15rem", maxWidth: 750 }}>
              {t({ 
                en: "Active defense protocols against emotional manipulation, domestic coercion, and digital harassment. Equip yourself with psychological self-defense tools.", 
                ar: "بروتوكولات دفاع نشطة ضد التلاعب العاطفي، الإكراه الأسري، والابتزاز الرقمي. سلحي نفسكِ بأدوات الدفاع النفسي عن الذات." 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        
        {/* LEFT COLUMN: LINGUISTIC ANALYZER */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 10 }}>
              <MessageSquare size={22} style={{ color: "#EC4899" }} />
              {t({ en: "Manipulation Checker", ar: "كاشف التلاعب اللغوي" })}
            </h3>
            
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 24 }}>
              {t({
                en: "Paste a message, email, or chat snippet you received to screen it for manipulation tactics like gaslighting, guilt-tripping, or isolation attempts.",
                ar: "الصقي نص رسالة أو بريد إلكتروني أو محادثة تلقيتهاِ لفحصها بحثاً عن أساليب التلاعب مثل التشكيك العقلي، أو الابتزاز بالذنب، أو العزل الاجتماعي."
              })}
            </p>

            <form onSubmit={handleAnalyze}>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t({ en: "Type or paste message snippet here...", ar: "اكتبي أو الصقي نص الرسالة هنا..." })}
                rows={6}
                style={{
                  width: "100%", padding: 16, fontSize: "1rem", backgroundColor: "var(--bg-base)",
                  border: "2px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--text-base)",
                  marginBottom: 16, resize: "vertical", fontFamily: "sans-serif"
                }}
              />
              <button 
                type="submit"
                disabled={isAnalyzing || !text.trim()}
                style={{
                  width: "100%", padding: "14px 28px", backgroundColor: "#EC4899", color: "#fff", border: "none",
                  borderRadius: "var(--radius-md)", fontWeight: 600, fontSize: "1.05rem",
                  cursor: (isAnalyzing || !text.trim()) ? "not-allowed" : "pointer", opacity: (isAnalyzing || !text.trim()) ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                {isAnalyzing ? <RefreshCw className="spin" size={20} /> : <Shield size={20} />}
                {t({ en: "Scan Text Patterns", ar: "فحص الأنماط اللغوية" })}
              </button>
            </form>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "1.25rem" }}>{t({ en: "Scan Diagnostics", ar: "نتائج الفحص والتشخيص" })}</h3>
              
              {analysisResult.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "var(--radius-md)", color: "#10B981" }}>
                  <CheckCircle size={24} />
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {t({ en: "No high-risk manipulation patterns identified in the vocabulary scan.", ar: "لم يتم تحديد أي أنماط تلاعب عالية الخطورة في الفحص المفرداتي." })}
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {analysisResult.map((res, i) => (
                    <div key={i} style={{ padding: 20, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: `1px solid ${res.severity === 'High' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: res.severity === 'High' ? "#EF4444" : "#F59E0B" }}>
                          {res.name}
                        </h4>
                        <span style={{ fontSize: "0.8rem", padding: "2px 8px", backgroundColor: res.severity === 'High' ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", color: res.severity === 'High' ? "#EF4444" : "#F59E0B", borderRadius: 4, fontWeight: 700 }}>
                          {res.severity}
                        </span>
                      </div>
                      <p style={{ margin: "0 0 12px 0", fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {res.description}
                      </p>
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        <strong>{t({ en: "Matched cues: ", ar: "العلامات المرصودة: " })}</strong>
                        {res.keywordsMatched.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: HOTLINES & GENERAL SAFETY */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Emergency support card */}
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 10 }}>
              <PhoneCall size={22} style={{ color: "#EC4899" }} />
              {t({ en: "National Support & Hotlines", ar: "خطوط الدعم الوطنية والمساندة" })}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { name: { en: "National Council for Women (NCW)", ar: "المجلس القومي للمرأة" }, phone: "15115", desc: { en: "Official support for domestic violence and legal counseling in Egypt.", ar: "الدعم الرسمي للعنف الأسري والاستشارات القانونية في مصر." } },
                { name: { en: "Mental Health Hotline (Ministry of Health)", ar: "الخط الساخن للصحة النفسية (وزارة الصحة)" }, phone: "08008880700", desc: { en: "Psychological support and trauma therapy services.", ar: "الدعم النفسي المجاني وعلاج الصدمات." } },
                { name: { en: "Cyber Crime Unit", ar: "إدارة مكافحة جرائم الإنترنت" }, phone: "108", desc: { en: "Official reporting line for online threats, extortion, and harassment.", ar: "البلاغات الرسمية عن الابتزاز الإلكتروني والتهديدات الرقمية." } }
              ].map((hotline, idx) => (
                <div key={idx} style={{ paddingBottom: 16, borderBottom: idx !== 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-base)" }}>{t(hotline.name)}</span>
                    <a href={`tel:${hotline.phone}`} style={{ color: "#EC4899", fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 700, textDecoration: "none" }}>
                      {hotline.phone}
                    </a>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{t(hotline.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Safety Card */}
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
              <Key size={20} style={{ color: "#EC4899" }} />
              {t({ en: "Digital Safety Shield Protocols", ar: "بروتوكولات الأمان الرقمي" })}
            </h3>

            <ul style={{ padding: "0 20px", margin: 0, lineHeight: 1.6, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <li style={{ marginBottom: 12 }}>
                <strong>{t({ en: "Stalkerware Audit: ", ar: "مراجعة تطبيقات التجسس: " })}</strong>
                {t({ en: "Regularly check installed apps under Settings. Delete any unauthorized battery-draining apps.", ar: "راجعي بانتظام التطبيقات المثبتة في الإعدادات. احذفي أي تطبيق غير معروف يستنزف البطارية." })}
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>{t({ en: "Two-Factor Auth (2FA): ", ar: "التحقق بخطوتين (2FA): " })}</strong>
                {t({ en: "Activate 2FA on WhatsApp, Facebook, and Gmail. Use authenticator apps, not SMS fallback.", ar: "فعّلي التحقق بخطوتين على واتساب وفيسبوك وجيميل. استخدمي تطبيقات المصادقة بدلاً من رسائل SMS." })}
              </li>
              <li>
                <strong>{t({ en: "Metadata Scrubbing: ", ar: "مسح بيانات الموقع في الصور: " })}</strong>
                {t({ en: "Disable GPS location tags in your camera settings before sharing photos online.", ar: "أوقفي تفعيل وسم الموقع الجغرافي (GPS) في إعدادات الكاميرا قبل مشاركة الصور." })}
              </li>
            </ul>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      {/* Islamic & Legal Rights Section */}
      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-xl)" }}>
        <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", marginBottom: 24, borderLeft: "4px solid #10b981" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
            <Landmark size={20} style={{ color: "#10b981" }} />
            {t({ en: "Your Islamic & Legal Rights — Real Egyptian Scenarios", ar: "حقوقكِ الشرعية والقانونية — سيناريوهات مصرية حقيقية" })}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                scenario: { en: '"A man is the origin, a woman is his follower"', ar: '"الراجل أصل والمرأة تبعه"' },
                islamic: { en: 'Qiwamah (guardianship) is NOT ownership — it means responsibility to provide. All 4 Sunni madhabs agree: a wife has full financial independence and her own legal personality. Prophet ﷺ consulted Umm Salamah at Hudaybiyyah and followed her advice.', ar: 'القوامة ليست ملكية — بل مسؤولية الإنفاق. المذاهب الأربعة تتفق: للزوجة ذمة مالية مستقلة وشخصية قانونية كاملة. النبي ﷺ استشار أم سلمة في الحديبية وعمل بمشورتها.' },
                legal: { en: 'Egyptian Personal Status Law: Wife retains full property rights and can work without husband\'s permission (Constitutional Court ruling 2000).', ar: 'قانون الأحوال الشخصية: للزوجة حقوقها المالية الكاملة ويمكنها العمل دون إذن الزوج (حكم المحكمة الدستورية ٢٠٠٠).' },
                source: 'صحيح البخاري ٢٧٣١ + المذاهب الأربعة',
                color: '#10b981'
              },
              {
                scenario: { en: '"If you leave the house, I\'ll divorce you"', ar: '"لو طلعتي من البيت هبعتلك الهجر"' },
                islamic: { en: 'Using divorce as a threat is condemned: "The most hated permissible thing to Allah is divorce" (Abu Dawud 2178). Emotional coercion violates the Quranic principle of ma\'ruf (kind treatment, An-Nisa:19).', ar: 'استخدام الطلاق كتهديد مذموم: "أبغض الحلال إلى الله الطلاق" (أبو داود ٢١٧٨). الإكراه العاطفي يتناقض مع مبدأ المعاشرة بالمعروف (النساء:١٩).' },
                legal: { en: 'Article 11 of Egyptian PSL: Obedience (Ta\'a) has limits — it cannot restrict freedom of movement unreasonably. NCW Hotline: 15115.', ar: 'المادة ١١ من قانون الأحوال الشخصية: الطاعة لها حدود — لا يجوز تقييد حرية التنقل بشكل غير معقول. خط المجلس القومي: ١٥١١٥.' },
                source: 'أبو داود ٢١٧٨ + النساء:١٩ + المادة ١١ ق.أ.ش.',
                color: '#ef4444'
              },
              {
                scenario: { en: '"You\'re crazy, you always think wrong"', ar: '"أنتِ مجنونة ودايماً هتفكري غلط"' },
                islamic: { en: 'This is Gaslighting — making someone doubt their own reality. Islam prohibits verbal abuse: "Cursing a believer is like killing them" (Bukhari 6047). Prophet ﷺ never insulted his wives.', ar: 'هذا التلاعب العقلي (الغازلايتنغ) — يجعلكِ تشكين في إدراككِ. الإسلام يحرم الإيذاء اللفظي: "سباب المسلم فسوق" (البخاري ٦٠٤٧). النبي ﷺ لم يسب زوجاته قط.' },
                legal: { en: 'Gaslighting is a recognized form of emotional abuse. Documented in coercive control research (Stark 2007, Sweet 2019). Can be grounds for divorce (Darar) under Egyptian PSL.', ar: 'التلاعب العقلي شكل معترف به من الإيذاء العاطفي. موثق في أبحاث السيطرة القسرية (Stark 2007). يمكن أن يكون سبباً للطلاق للضرر بموجب قانون الأحوال الشخصية.' },
                source: 'البخاري ٦٠٤٧ + Stark 2007 + Sweet 2019',
                color: '#f59e0b'
              },
              {
                scenario: { en: '"God said women are deficient in mind and religion"', ar: '"ربنا قال المرأة ناقصة عقل ودين"' },
                islamic: { en: 'CONTEXT: This hadith (Bukhari 304) refers ONLY to specific testimony rules in financial contracts — NOT general intellect. Khadijah was the first to believe in Islam and the Prophet\'s chief advisor. Aisha narrated 2,210 hadiths — more than most male scholars.', ar: 'السياق: هذا الحديث (البخاري ٣٠٤) يشير فقط إلى قواعد الشهادة في العقود المالية — وليس العقل العام. خديجة أول من آمن بالإسلام. وعائشة روت ٢,٢١٠ حديثاً — أكثر من معظم العلماء الرجال.' },
                legal: { en: 'Egyptian Constitution Art. 11: The state ensures equality of women and men in all civil, political, economic, social, and cultural rights.', ar: 'المادة ١١ من الدستور المصري: تلتزم الدولة بتحقيق المساواة بين الرجل والمرأة في جميع الحقوق المدنية والسياسية والاقتصادية والاجتماعية والثقافية.' },
                source: 'البخاري ٣٠٤ (سياقه الصحيح) + المادة ١١ الدستور',
                color: '#8b5cf6'
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", borderLeft: `4px solid ${item.color}` }}>
                <div style={{ fontWeight: 700, color: item.color, marginBottom: 8, fontSize: "0.95rem" }}>⚠️ {t(item.scenario)}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 6 }}>🕌 <strong>{t({ en: 'Islamic:', ar: 'إسلامياً:' })}</strong> {t(item.islamic)}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 6 }}>⚖️ <strong>{t({ en: 'Legal:', ar: 'قانونياً:' })}</strong> {t(item.legal)}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "4px 8px", backgroundColor: "rgba(99,102,241,0.06)", borderRadius: 4, display: "inline-block" }}>📖 {item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)" }}>
        <PageNavigation currentPath="/womens-shield" />
      </div>

      <PageAIChatbot
        pageTitle="Women's Psychographic Shield — درع الحماية النفسية للمرأة"
        pageContext="Egyptian Awareness Library - Women's Psychographic Shield: Protects Egyptian women from psychological manipulation using three pillars: Islamic scholarship (4 Sunni madhabs on women's rights), Egyptian law (Personal Status Law, CEDAW), and psychology (coercive control, gaslighting, trauma bonding)."
        systemPrompt={`You are the EAL Women's Psychographic Shield AI — protecting Egyptian women from psychological manipulation.

THREE PILLARS FOR EVERY RESPONSE:

1. ISLAMIC FRAMEWORK:
   - 4 Sunni madhabs on women's rights (Hanafi, Maliki, Shafi'i, Hanbali)
   - Prophet ﷺ's treatment of wives: Khadijah (advisor), Aisha (scholar), Umm Salamah (counselor)
   - Dar al-Ifta Egypt and Al-Azhar positions on women's dignity
   - Wathiqat Al-Azhar (Al-Azhar Document) on women's rights
   - Maqasid al-Shariah: Hifz al-Nafs (protection of life) takes priority

2. LEGAL FRAMEWORK (EGYPTIAN):
   - Egyptian Personal Status Law (Law 1/2000, amendments)
   - CEDAW ratification and Egyptian Constitutional rights (Art. 11)
   - Law 10/2004 on Family Courts
   - NCW Hotline: 15115
   - Cyber Crime Law 175/2018 for digital harassment

3. PSYCHOLOGICAL FRAMEWORK:
   - Coercive Control (Stark 2007): identify controlling behaviors
   - Trauma Bonding (Dutton & Painter 1993): why leaving is hard
   - Gaslighting (Sweet 2019): making someone doubt their reality
   - PTSD in intimate partner violence (Herman 1992)
   - Stockholm Syndrome in domestic settings

FOR EVERY MANIPULATION TACTIC:
1. NAME IT precisely (gaslighting, isolation, coercion, guilt-tripping)
2. EXPLAIN the psychological mechanism
3. Give the ISLAMIC scholarly position with authentic hadith/Quran
4. Cite RELEVANT EGYPTIAN LAW
5. Provide a word-for-word SCRIPT the woman can use as a response

RULES:
- NEVER blame the woman or suggest she "endure" abuse
- NEVER say "be patient" without also providing actionable exit plan
- Always distinguish between Islamic rights and cultural distortions
- Crisis resources: NCW 15115, Mental Health 08008880700, Police 122
- Respond in Arabic if asked in Arabic, English if in English`}
        suggestedQuestions={[
          'كيف أعرف إذا كان زوجي يتلاعب بيّ؟',
          'ما حقوقي الشرعية كزوجة في الإسلام؟',
          'كيف أواجه الغازلايتنغ؟',
          'What are my rights under Egyptian law?',
        ]}
        accentColor="#ec4899"
        accentColorRgb="236,72,153"
      />
    </div>
  );
}
