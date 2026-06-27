"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

import { useState } from "react";
import { Brain, Sparkles, Shield, BookOpen, Zap, AlertTriangle } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ConceptExplainer } from "@/components/shared/concept-explainer";
import AnalysisProgress, { STAGE_SETS } from "@/components/AnalysisProgress";
import Link from "next/link";

const FALLACY_CATEGORIES = [
  {
    id: "formal",
    icon: "🔴",
    en: "Formal Fallacies",
    ar: "المغالطات الشكلية",
    countEn: "structural errors",
    countAr: "أخطاء بنيوية",
    descEn: "Errors in logical structure — affirming the consequent, denying the antecedent, undistributed middle, etc.",
    descAr: "أخطاء في البنية المنطقية — تأكيد التالي، إنكار المقدم، الحد الأوسط غير الموزع، إلخ.",
    exEn: "Egyptian media: 'All terrorists use the internet. He uses the internet. Therefore he is a terrorist.' (Affirming the consequent)",
    exAr: "الإعلام المصري: 'كل الإرهابيين يستخدمون الإنترنت. هو يستخدم الإنترنت. إذن هو إرهابي.' (تأكيد التالي)",
    color: "#EF4444",
  },
  {
    id: "informal",
    icon: "🟡",
    en: "Informal Fallacies",
    ar: "المغالطات غير الشكلية",
    countEn: "reasoning errors",
    countAr: "أخطاء استدلالية",
    descEn: "Errors in reasoning content — ad hominem, straw man, red herring, appeal to emotion, false dichotomy.",
    descAr: "أخطاء في محتوى الاستدلال — مهاجمة الشخص، رجل القش، الرنجة الحمراء، الاستدعاء العاطفي، الثنائية الزائفة.",
    exEn: "Egyptian social media: 'You criticize traditional medicine? Then you hate our heritage!' (Straw man + ad hominem)",
    exAr: "السوشيال ميديا المصرية: 'بتنتقد الطب الشعبي؟ يبقى انت بتكره تراثنا!' (رجل القش + مهاجمة الشخص)",
    color: "#F59E0B",
  },
  {
    id: "statistical",
    icon: "🔵",
    en: "Statistical Fallacies",
    ar: "المغالطات الإحصائية",
    countEn: "data misuse patterns",
    countAr: "أنماط إساءة البيانات",
    descEn: "Misuse of data — base rate neglect, cherry picking, survivorship bias, Simpson's paradox, ecological fallacy.",
    descAr: "إساءة استخدام البيانات — إهمال المعدل الأساسي، انتقاء الكرز، انحياز الناجين، مفارقة سيمبسون.",
    exEn: "Egyptian health claims: 'My uncle smoked for 60 years and lived to 90!' — survivorship bias ignoring CAPMAS mortality data.",
    exAr: "ادعاءات صحية مصرية: 'عمي دخّن 60 سنة وعاش لعمر 90!' — انحياز الناجين مع تجاهل بيانات الوفيات من الجهاز المركزي.",
    color: "#3B82F6",
  },
  {
    id: "rhetorical",
    icon: "🟣",
    en: "Rhetorical Manipulation",
    ar: "التلاعب البلاغي",
    countEn: "manipulation devices",
    countAr: "أدوات التلاعب",
    descEn: "Propaganda devices — loaded language, weasel words, glittering generalities, emotional appeals, repetition.",
    descAr: "أدوات الدعاية — اللغة المشحونة، الكلمات الغامضة، التعميمات البراقة، الاستدعاءات العاطفية، التكرار.",
    exEn: "Viral Egyptian posts: 'BREAKING: Scientists FINALLY admit what we ALL knew!' — loaded language + false authority.",
    exAr: "منشورات فيروسية مصرية: 'عاجل: العلماء أخيراً اعترفوا بما كنا نعرفه جميعاً!' — لغة مشحونة + سلطة زائفة.",
    color: "#8B5CF6",
  },
  {
    id: "religious",
    icon: "🟢",
    en: "Religious Exploitation Fallacies",
    ar: "مغالطات الاستغلال الديني",
    countEn: "exploitation patterns",
    countAr: "أنماط الاستغلال",
    descEn: "Misuse of religious authority — appeal to fatwa without context, selective hadith, misquoting Quran, manufactured ijma.",
    descAr: "إساءة استخدام السلطة الدينية — الاستدعاء بفتوى بدون سياق، انتقاء الأحاديث، تحريف القرآن، الإجماع المصنوع.",
    exEn: "Fraudulent healers: 'The Prophet ﷺ said ruqyah cures all diseases!' — hadith taken out of context to sell expensive treatments.",
    exAr: "المعالجون المزيفون: 'النبي ﷺ قال الرقية تشفي كل الأمراض!' — حديث مأخوذ خارج السياق لبيع علاجات باهظة.",
    color: "#10B981",
  },
];

export default function FallacyEnginePage() {
  const { isRTL, t } = useRTL();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/fallacy-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Failed to connect to Fallacy Engine." });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", padding: "var(--space-2xl)", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <Brain size={40} color="#F43F5E" />
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
            {t({ en: "Fallacy Engine 🧠", ar: "محرك المغالطات 🧠" })}
          </h1>
        </div>
        <p style={{ fontSize: 18, color: "var(--text-secondary)", marginBottom: 12 }}>
          {t({
            en: "Detects common logical fallacies, rhetorical tricks, and manipulation patterns across 5 families using TF-IDF vectorization, regex pattern matching, and AI analysis.",
            ar: "يكتشف المغالطات المنطقية الشائعة والحيل البلاغية وأنماط التلاعب عبر 5 عائلات باستخدام خوارزميات TF-IDF ومطابقة الأنماط وتحليل الذكاء الاصطناعي.",
          })}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          <ConceptExplainer term="TF-IDF" explanation={t({ en: "Term Frequency–Inverse Document Frequency — a statistical measure from information retrieval (Spärck Jones, 1972) that evaluates how important a word is to a document in a corpus. Used here to weight fallacy-indicator keywords.", ar: "تكرار المصطلح–معكوس تكرار المستند — مقياس إحصائي من استرجاع المعلومات (سبارك جونز، 1972) يقيّم أهمية كلمة في مستند ضمن مجموعة. يُستخدم هنا لتوزين الكلمات المؤشرة على المغالطات." })} type="scientific" />
          <ConceptExplainer term={t({ en: "Logical Fallacy", ar: "المغالطة المنطقية" })} explanation={t({ en: "An error in reasoning that renders an argument invalid. Catalogued extensively by Aristotle in Sophistical Refutations (c. 350 BCE) and expanded by modern logicians. Over 300 distinct fallacies have been identified.", ar: "خطأ في الاستدلال يجعل الحجة غير صالحة. صنّفها أرسطو بشكل مفصل في 'الأغاليط السفسطائية' (حوالي 350 ق.م) ووسّعها المناطقة المعاصرون. تم تحديد أكثر من 300 مغالطة متميزة." })} type="scientific" />
        </div>

        {/* Fallacy Scanner */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={20} color="#F43F5E" />
            {t({ en: "Live Fallacy Scanner", ar: "ماسح المغالطات المباشر" })}
          </h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t({ en: "Enter a statement to check for fallacies...\n\nExample: 'Either you support our candidate or you're against Egypt. Everyone I know is voting for him.'", ar: "أدخل عبارة للتحقق من المغالطات...\n\nمثال: 'يا إنك مع مرشحنا يا إنك ضد مصر. كل اللي أعرفهم هيصوتوله.'" })}
            style={{ width: "100%", height: 120, padding: 16, borderRadius: 12, background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-primary)", outline: "none", resize: "none", fontSize: 16, marginBottom: 16 }}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            style={{ width: "100%", padding: 16, borderRadius: 12, background: "linear-gradient(135deg, #F43F5E, #E11D48)", color: "#fff", fontWeight: "bold", fontSize: 16, border: "none", cursor: loading || !text.trim() ? "not-allowed" : "pointer", opacity: loading || !text.trim() ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            {loading ? <div className="spinner" style={{ width: 20, height: 20, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> : <Sparkles size={20} />}
            {t({ en: "Scan for Fallacies", ar: "البحث عن المغالطات" })}
          </button>
        </div>

        {loading && (
          <div style={{ marginBottom: 32 }}>
            <AnalysisProgress
              running={loading}
              stages={STAGE_SETS.fallacy}
              lang={isRTL ? "ar" : "en"}
              expectedMs={20000}
              accent="#F43F5E"
              title={{ en: "Deep fallacy analysis running…", ar: "تحليل المغالطات العميق قيد التشغيل…" }}
            />
          </div>
        )}

        {result && (
          <div className="glass-card" style={{ padding: 24, animation: "ux-slide-up 0.5s ease", marginBottom: 32 }}>
            <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              {result.error ? <AlertTriangle size={24} color="#EF4444" /> : <Shield size={24} color="#10B981" />}
              {t({ en: "Fallacy Report", ar: "تقرير المغالطات" })}
            </h3>

            {result.error ? (
              <p style={{ color: "#EF4444", margin: 0 }}>{result.error}</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Summary row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ padding: "10px 18px", borderRadius: 10, background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.3)" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#F43F5E" }}>{result.totalDetected ?? 0}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t({ en: "fallacies found", ar: "مغالطة مكتشفة" })}</div>
                  </div>
                  {typeof result.aiAnalysis?.overallManipulationScore === "number" && (
                    <div style={{ padding: "10px 18px", borderRadius: 10, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#F59E0B" }}>
                        {Math.round(result.aiAnalysis.overallManipulationScore * 100)}%
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t({ en: "manipulation score", ar: "درجة التلاعب" })}</div>
                    </div>
                  )}
                  {result.aiAnalysis?.dominantCategory && (
                    <div style={{ padding: "10px 18px", borderRadius: 10, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#8B5CF6" }}>{result.aiAnalysis.dominantCategory}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t({ en: "dominant type", ar: "النوع السائد" })}</div>
                    </div>
                  )}
                </div>

                {/* Regex-detected fallacies */}
                {Array.isArray(result.fallacies) && result.fallacies.length > 0 && (
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      {t({ en: "Pattern-matched fallacies", ar: "المغالطات المكتشفة بالأنماط" })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {result.fallacies.map((item: any, i: number) => {
                        const f = item.fallacy || item;
                        const name = f.name || item.name || "";
                        const description = f.description || item.description || "";
                        const confidence = item.confidence != null ? Math.round(item.confidence * 100) : null;
                        const tier = item.tier || "";
                        return (
                          <div key={i} style={{ padding: 14, borderRadius: 10, background: "rgba(244,63,94,0.07)", border: "1px solid rgba(244,63,94,0.2)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                              <strong style={{ color: "#F43F5E", fontSize: 15 }}>{name}</strong>
                              <div style={{ display: "flex", gap: 6 }}>
                                {confidence != null && (
                                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "rgba(244,63,94,0.15)", color: "#F43F5E" }}>
                                    {confidence}% {t({ en: "confidence", ar: "ثقة" })}
                                  </span>
                                )}
                                {tier && (
                                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "var(--bg-secondary)", color: "var(--text-muted)" }}>
                                    {tier}
                                  </span>
                                )}
                              </div>
                            </div>
                            {description && <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{description}</p>}
                            {(f.example || item.matchedPattern) && (
                              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, marginBottom: 0, fontStyle: "italic" }}>
                                {t({ en: "Trigger: ", ar: "المثال: " })}{f.example || item.matchedPattern}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI-detected additional fallacies */}
                {Array.isArray(result.aiAnalysis?.additionalFallacies) && result.aiAnalysis.additionalFallacies.length > 0 && (
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 10 }}>
                      {t({ en: "AI-identified fallacies", ar: "مغالطات اكتشفها الذكاء الاصطناعي" })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {result.aiAnalysis.additionalFallacies.map((f: any, i: number) => (
                        <div key={i} style={{ padding: 14, borderRadius: 10, background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                            <strong style={{ color: "#8B5CF6", fontSize: 15 }}>
                              {isRTL && f.nameAr ? f.nameAr : f.name}
                            </strong>
                            {f.severity && (
                              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "rgba(139,92,246,0.15)", color: "#8B5CF6" }}>
                                {f.severity}
                              </span>
                            )}
                          </div>
                          {(isRTL ? f.explanationAr || f.explanation : f.explanation) && (
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                              {isRTL ? f.explanationAr || f.explanation : f.explanation}
                            </p>
                          )}
                          {f.example && (
                            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6, marginBottom: 0, fontStyle: "italic" }}>
                              &ldquo;{f.example}&rdquo;
                            </p>
                          )}
                          {(isRTL ? f.counterAr || f.counter : f.counter) && (
                            <p style={{ fontSize: 12, color: "#10B981", marginTop: 6, marginBottom: 0 }}>
                              {t({ en: "Counter: ", ar: "الرد: " })}{isRTL ? f.counterAr || f.counter : f.counter}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Truth sandwich / deconstruction guide */}
                {(result.aiAnalysis?.truthSandwich || result.aiAnalysis?.deconstructionGuide_en) && (
                  <div style={{ padding: 16, borderRadius: 10, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981", marginBottom: 8 }}>
                      {t({ en: "How to reframe this", ar: "كيف تُعيد صياغة هذا" })}
                    </div>
                    {result.aiAnalysis.truthSandwich && (
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                        {isRTL ? result.aiAnalysis.truthSandwich.correctFrame_ar || result.aiAnalysis.truthSandwich.correctFrame_en : result.aiAnalysis.truthSandwich.correctFrame_en}
                      </p>
                    )}
                    {(result.aiAnalysis.deconstructionGuide_en || result.aiAnalysis.deconstructionGuide_ar) && (
                      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
                        {isRTL ? result.aiAnalysis.deconstructionGuide_ar || result.aiAnalysis.deconstructionGuide_en : result.aiAnalysis.deconstructionGuide_en}
                      </p>
                    )}
                  </div>
                )}

                {/* Clean result: no fallacies */}
                {result.totalDetected === 0 && (
                  <p style={{ color: "#10B981", fontWeight: 600, margin: 0 }}>
                    {t({ en: "No fallacies detected in this text.", ar: "لم تُكتشف أي مغالطات في هذا النص." })}
                  </p>
                )}

                {/* Disclaimer */}
                {result.disclaimer && (
                  <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, borderTop: "1px solid var(--border-primary)", paddingTop: 12 }}>
                    {result.disclaimer}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* 300 Fallacies by Category */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <BookOpen size={28} color="#F43F5E" />
            {t({ en: "Fallacy Families — 5 Categories", ar: "عائلات المغالطات — 5 فئات" })}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
            {t({
              en: "Five illustrative families covering formal logic, informal reasoning, statistical misuse, rhetorical manipulation, and religious exploitation — with Egyptian examples in each.",
              ar: "خمس عائلات توضيحية تغطي المنطق الشكلي والاستدلال غير الشكلي وإساءة استخدام البيانات والتلاعب البلاغي والاستغلال الديني — مع أمثلة مصرية في كل فئة.",
            })}
          </p>

          <div style={{ display: "grid", gap: 16 }}>
            {FALLACY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                  padding: 20,
                  borderRadius: 16,
                  background: expandedCat === cat.id ? `${cat.color}12` : "var(--bg-secondary)",
                  border: `1px solid ${expandedCat === cat.id ? cat.color + "50" : "var(--border-primary)"}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: "var(--text-primary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{cat.icon}</span>
                    <strong style={{ color: cat.color, fontSize: 17 }}>{t({ en: cat.en, ar: cat.ar })}</strong>
                  </div>
                  <span style={{ fontSize: 13, padding: "4px 12px", borderRadius: 20, background: `${cat.color}20`, color: cat.color, fontWeight: 600 }}>
                    {t({ en: cat.countEn, ar: cat.countAr })}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  {t({ en: cat.descEn, ar: cat.descAr })}
                </p>
                {expandedCat === cat.id && (
                  <div style={{ marginTop: 12, padding: 14, borderRadius: 12, background: `${cat.color}08`, border: `1px dashed ${cat.color}30` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: cat.color, marginBottom: 6 }}>
                      🇪🇬 {t({ en: "Egyptian Example", ar: "مثال مصري" })}
                    </div>
                    <p style={{ fontSize: 13, margin: 0, color: "var(--text-secondary)", lineHeight: 1.6, fontStyle: "italic" }}>
                      {t({ en: cat.exEn, ar: cat.exAr })}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            {t({ en: "Related Tools", ar: "أدوات ذات صلة" })}
          </h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/bias-detector" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              ⚖️ {t({ en: "Bias Detector", ar: "كاشف التحيز" })}
            </Link>
            <Link href="/god-system" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              🏛️ {t({ en: "GOD System", ar: "نظام التحقق الشامل" })}
            </Link>
            <Link href="/six-layers" style={{ padding: "10px 18px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              🛡️ {t({ en: "Six Layers", ar: "الطبقات الست" })}
            </Link>
          </div>
        </div>

        <PageNavigation currentPath="/fallacy-engine" />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <PageAIChatbot
        pageTitle="Fallacy Engine — محرك المغالطات"
        pageContext="Egyptian Awareness Library - Fallacy detection tool covering common logical fallacies across 5 families (formal, informal, statistical, rhetorical, religious exploitation) with real Egyptian examples, Arabic names, and counter-arguments."
        systemPrompt={`You are an expert in formal and informal logic, covering a broad range of logical fallacies. For each fallacy the user asks about, provide: the Latin name, Arabic name (الاسم العربي), precise definition, a real Egyptian example from media or social media, and a step-by-step method to counter it. Your fallacy categories include: Appeal to Authority (argumentum ad verecundiam / حجة السلطة), Ad Hominem (مهاجمة الشخص), Straw Man (رجل القش), False Dilemma (الثنائية الزائفة), Appeal to Tradition (الاحتكام للتقليد), Appeal to Emotion (الاستدعاء العاطفي), Circular Reasoning (الاستدلال الدائري), Red Herring (الرنجة الحمراء), and many more. You also draw from the Islamic logic tradition (علم المنطق) of Al-Farabi and Ibn Sina. Always give practical, Egypt-specific examples. Respond in the same language the user writes in.`}
        suggestedQuestions={['ما هي مغالطة رجل القش؟', 'ما أكثر المغالطات شيوعاً في مصر؟', 'How do I identify an appeal to authority?', 'What is the difference between correlation and causation?']}
        accentColor="#f59e0b"
        accentColorRgb="245,158,11"
      />
    </div>
  );
}
