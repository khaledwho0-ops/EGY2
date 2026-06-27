"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

import React, { useState } from "react";
import Link from "next/link";
import { Brain, ArrowLeft, Beaker, CheckCircle2, ChevronRight, Search, Zap, Shield, Microscope } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { COGNITIVE_BIASES } from "@/lib/cognitive/biases-data";
import ToolGuide from "@/components/ToolGuide";

export default function CognitiveLabPage() {
  const { isRTL, t } = useRTL();
  const [activeBiasId, setActiveBiasId] = useState<string>(COGNITIVE_BIASES[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [testText, setTestText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const activeBias = COGNITIVE_BIASES.find(b => b.id === activeBiasId);

  const runAnalysis = async (claim: string) => {
    if (!claim.trim()) return;
    setIsAnalyzing(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/bias-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: claim })
      });
      const data = await res.json();
      setTestResult(data.biases || []);
    } catch (e) {
      console.error(e);
    }
    setIsAnalyzing(false);
  };

  const filteredBiases = COGNITIVE_BIASES.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* Header */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/six-layers" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Architecture", ar: "العودة إلى المعمارية" })}
          </Link>
        </nav>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ padding: 16, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-lg)" }}>
            <Brain size={36} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h1)", margin: 0 }}>
              <span className="text-gradient">{t({ en: "Cognitive Bias Lab", ar: "مختبر الانحياز المعرفي" })}</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "8px 0 0 0", fontSize: "1.1rem", maxWidth: 600 }}>
              {t({ 
                en: "Interactive experiments proving how cognitive biases manipulate our perception in both scientific analysis and religious interpretation.", 
                ar: "تجارب تفاعلية تثبت كيف تتلاعب الانحيازات المعرفية بإدراكنا في كل من التحليل العلمي والتفسير الديني." 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: 32, alignItems: "start" }}>

        {/* How-to / who-benefits / ready examples — wired to the bias-detection input */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ToolGuide
            titleEn="How to use the Cognitive Bias Lab"
            titleAr="كيفية استخدام مختبر الانحياز المعرفي"
            whoBenefits={{
              en: "Anyone in Egypt who gets a forwarded WhatsApp claim, a viral health 'tip', or a screenshot that 'feels' true — and wants to see which mental shortcut is being exploited before they believe or reshare it.",
              ar: "أي شخص في مصر يصله ادعاء على واتساب أو 'نصيحة' صحية منتشرة أو سكرين شوت 'يبدو' صحيحًا — ويريد أن يرى أي اختصار ذهني يُستغل قبل أن يصدّقه أو يعيد نشره."
            }}
            steps={[
              { en: "Pick a bias from the list on the side (or just start with the one already open) to read how it hijacks both science and religious reasoning.", ar: "اختر انحيازًا من القائمة الجانبية (أو ابدأ بالمفتوح حاليًا) لتقرأ كيف يختطف كلًا من العلم والتفكير الديني." },
              { en: "Scroll to 'Run Experiment' and paste a real claim you actually received — a WhatsApp forward, a Facebook post, a TikTok 'fact'.", ar: "انزل إلى 'إجراء التجربة' والصق ادعاءً حقيقيًا وصلك بالفعل — رسالة واتساب أو منشور فيسبوك أو 'معلومة' تيك توك." },
              { en: "Press 'Start Simulation' and read the Detection Results: which biases fired, their confidence, and how to neutralise each one.", ar: "اضغط 'بدء المحاكاة' واقرأ نتائج الاكتشاف: أي انحيازات ظهرت، ودرجة الثقة، وكيف تبطل كلًا منها." },
              { en: "No claim of your own? Tap a ready example below — it loads a real, name-free Egyptian claim and runs the detector for you.", ar: "ليس لديك ادعاء خاص بك؟ اضغط مثالًا جاهزًا بالأسفل — يحمّل ادعاءً مصريًا حقيقيًا بدون أسماء ويشغّل الكاشف نيابةً عنك." }
            ]}
            scenarios={[
              { label: "'Garlic cures cancer' WhatsApp forward", labelAr: "رسالة واتساب: الثوم يعالج السرطان", input: "Garlic on an empty stomach cures cancer in 3 days — doctors hide this because it would end the pharma business.", tag: "health" },
              { label: "'Insulin is a lie' diet claim", labelAr: "ادعاء الدايت: الأنسولين كذبة", input: "Diabetes is a myth and insulin is a lie sold by companies — just cut carbs and herbs will cure it completely, no medicine needed.", tag: "health" },
              { label: "Undated fatwa screenshot, no chain", labelAr: "سكرين شوت فتوى بلا سند", input: "Forwarding this screenshot of a fatwa to 10 people before midnight is obligatory, and everyone who ignores it is sinful — thousands already shared it.", tag: "religion" },
              { label: "'Only 2% can solve this' viral test", labelAr: "اختبار منتشر: 2% فقط يحلونه", input: "Only 2% of geniuses can solve this puzzle — if you get it right it proves your IQ is above average and you're smarter than everyone who shared it.", tag: "viral" }
            ]}
            onTry={(input) => {
              setTestText(input);
              runAnalysis(input);
            }}
            lang={isRTL ? "ar" : "en"}
            accent="#8b5cf6"
          />
        </div>

        {/* Sidebar */}
        <div style={{ position: "sticky", top: "calc(var(--navbar-height) + 32px)", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: isRTL ? "auto" : 16, right: isRTL ? 16 : "auto", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input 
              type="text" 
              placeholder={t({ en: "Search biases...", ar: "ابحث عن الانحيازات..." })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: isRTL ? "12px 48px 12px 16px" : "12px 16px 12px 48px",
                backgroundColor: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)", color: "var(--text-base)", fontSize: "0.95rem"
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "calc(100vh - 300px)", overflowY: "auto", paddingRight: isRTL ? 0 : 8, paddingLeft: isRTL ? 8 : 0 }}>
            {filteredBiases.map(bias => (
              <button
                key={bias.id}
                onClick={() => setActiveBiasId(bias.id)}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  padding: "16px",
                  backgroundColor: activeBiasId === bias.id ? "rgba(100,200,255,0.1)" : "var(--bg-card)",
                  border: "1px solid",
                  borderColor: activeBiasId === bias.id ? "var(--accent-primary)" : "var(--border)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                    {bias.id}
                  </span>
                  <span style={{ fontWeight: activeBiasId === bias.id ? 700 : 500, color: activeBiasId === bias.id ? "var(--accent-primary)" : "var(--text-base)" }}>
                    {bias.name}
                  </span>
                </div>
                <ChevronRight size={18} style={{ color: activeBiasId === bias.id ? "var(--accent-primary)" : "var(--text-muted)", transform: isRTL ? "rotate(180deg)" : "none" }} />
              </button>
            ))}
            {filteredBiases.length === 0 && (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 24 }}>
                {t({ en: "No biases found.", ar: "لم يتم العثور على انحيازات." })}
              </p>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        {activeBias && (
          <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.05)" }}>
            
            <div style={{ padding: "48px 48px 32px 48px", borderBottom: "1px solid var(--border)", backgroundColor: "rgba(0,0,0,0.2)", position: "relative" }}>
              <div style={{ position: "absolute", top: 24, right: isRTL ? "auto" : 24, left: isRTL ? 24 : "auto", padding: "6px 12px", backgroundColor: "rgba(100,200,255,0.15)", color: "var(--accent-primary)", borderRadius: 20, fontSize: "0.85rem", fontWeight: 700 }}>
                {activeBias.id}
              </div>
              <h2 style={{ fontSize: "2.5rem", margin: "0 0 16px 0", lineHeight: 1.2 }}>{activeBias.name}</h2>
              <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.6, maxWidth: 800 }}>
                {activeBias.description}
              </p>
            </div>

            <div style={{ padding: 48 }}>
              
              <div style={{ marginBottom: 48 }}>
                <h3 style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 12, marginBottom: 24, borderBottom: "2px solid var(--border)", paddingBottom: 12 }}>
                  <Zap style={{ color: "var(--accent-warning)" }} /> 
                  {t({ en: "How It Hijacks Us", ar: "كيف يختطفنا" })}
                </h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {/* Scientific Application */}
                  <div style={{ padding: 24, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-primary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <Microscope size={20} style={{ color: "var(--accent-primary)" }} />
                      <h4 style={{ margin: 0, color: "var(--text-base)", fontSize: "1.1rem" }}>{t({ en: "Scientific Context", ar: "السياق العلمي" })}</h4>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                      {activeBias.scientificApplication}
                    </p>
                  </div>

                  {/* Islamic Application */}
                  <div style={{ padding: 24, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", borderLeft: "4px solid #d4a843" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <Shield size={20} style={{ color: "#d4a843" }} />
                      <h4 style={{ margin: 0, color: "var(--text-base)", fontSize: "1.1rem" }}>{t({ en: "Islamic Context", ar: "السياق الإسلامي" })}</h4>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                      {activeBias.islamicApplication}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: 32, backgroundColor: "rgba(100,200,100,0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--accent-success)" }}>
                <h3 style={{ margin: "0 0 16px 0", color: "var(--accent-success)", display: "flex", alignItems: "center", gap: 12 }}>
                  <CheckCircle2 size={24} />
                  {t({ en: "Active Detection Protocol", ar: "بروتوكول الاكتشاف النشط" })}
                </h3>
                <p style={{ fontSize: "1.1rem", color: "var(--text-base)", lineHeight: 1.6, margin: 0 }}>
                  <strong>{t({ en: "How the EAL God-System detects this:", ar: "كيف يكتشف نظام EAL God هذا:" })}</strong> {activeBias.detectionMethod}
                </p>
              </div>

              {/* Interactive Demo */}
              <div style={{ marginTop: 48, padding: 48, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <Beaker size={48} style={{ margin: "0 auto 16px", color: "var(--accent-primary)" }} />
                <h3 style={{ fontSize: "1.5rem", marginBottom: 12, textAlign: "center" }}>{t({ en: "Run Experiment", ar: "إجراء التجربة" })}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 24px", textAlign: "center" }}>
                  {t({ en: "Enter a statement to see if our engine detects this bias.", ar: "أدخل عبارة لترى ما إذا كان محركنا يكتشف هذا الانحياز." })}
                </p>
                
                <textarea 
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder={t({ en: "Type a controversial or emotional claim here...", ar: "اكتب ادعاء مثير للجدل أو عاطفي هنا..." })}
                  style={{ width: "100%", height: 100, padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border)", backgroundColor: "var(--bg-card)", color: "var(--text-base)", marginBottom: 16, fontSize: "1rem", fontFamily: "inherit" }}
                />

                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={() => runAnalysis(testText)}
                    disabled={isAnalyzing || !testText.trim()}
                    style={{ padding: "12px 32px", backgroundColor: "var(--accent-primary)", color: "#000", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1.05rem", cursor: isAnalyzing ? "wait" : "pointer", opacity: isAnalyzing ? 0.7 : 1 }}
                  >
                    {isAnalyzing ? t({ en: "Analyzing...", ar: "جاري التحليل..." }) : t({ en: "Start Simulation", ar: "بدء المحاكاة" })}
                  </button>
                </div>

                {testResult && (
                  <div style={{ marginTop: 24, padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                    <h4 style={{ margin: "0 0 16px 0", color: "var(--text-base)" }}>{t({ en: "Detection Results", ar: "نتائج الاكتشاف" })}</h4>
                    {testResult.length === 0 ? (
                      <p style={{ color: "var(--text-muted)", margin: 0 }}>{t({ en: "No biases detected in this statement.", ar: "لم يتم اكتشاف أي انحيازات في هذه العبارة." })}</p>
                    ) : (
                      <ul style={{ margin: 0, padding: "0 0 0 20px", color: "var(--text-base)", display: "flex", flexDirection: "column", gap: 12 }}>
                        {testResult.map((bias: any, idx: number) => (
                          <li key={idx}>
                            <strong>{bias.biasName}</strong> 
                            {bias.biasId === activeBias.id ? <span style={{ marginLeft: 8, padding: "2px 8px", backgroundColor: "var(--accent-success)", color: "#000", borderRadius: 12, fontSize: "0.8rem", fontWeight: "bold" }}>TARGET FOUND</span> : null}
                            <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", color: "var(--text-muted)" }}>{bias.mitigation}</p>
                            <div style={{ marginTop: 4, fontSize: "0.85rem", color: "var(--accent-primary)" }}>Tier: {bias.tier} | Confidence: {(bias.confidence * 100).toFixed(0)}%</div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-xl)" }}>
        <PageNavigation currentPath="/cognitive-lab" />

        <PageAIChatbot
          pageTitle="Cognitive Immunology Lab — مختبر المناعة المعرفية"
          pageContext="EAL Cognitive Lab: Experimental reasoning challenges using dual-process theory (Kahneman System 1/System 2). Interactive exercises testing cognitive biases in real-time."
          systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Cognitive Immunology Lab AI — a cognitive scientist specializing in dual-process theory (Kahneman, 2011), cognitive bias research, and inoculation theory.

[LAYER 2 - COGNITIVE SCIENCE FRAMEWORK]:
- System 1 (Fast): Automatic, intuitive, emotional, error-prone
- System 2 (Slow): Deliberate, analytical, logical, effort-intensive
- Cognitive biases exploit System 1 shortcuts to bypass rational analysis
- Inoculation theory: Pre-exposure to weakened manipulation builds resistance

[LAYER 3 - EXERCISES YOU GUIDE]:
1. Base Rate Neglect — Probability reasoning under uncertainty
2. Anchoring Effects — How initial information skews judgment
3. Framing Effects — Same data, different presentation, different conclusions
4. Availability Heuristic — Overweighting vivid/recent events
5. Confirmation Bias — Seeking evidence that confirms existing beliefs
6. Dunning-Kruger — Metacognitive awareness assessment

[LAYER 4 - RULES]:
1. Explain cognitive phenomena with real Egyptian examples
2. Cite academic sources (Kahneman, Tversky, Stanovich, West)
3. Connect Islamic epistemology: 'ilm vs zann, tathabbut (verification)
4. Respond in the user's language`}
          suggestedQuestions={[
            'إيه الفرق بين System 1 و System 2؟',
            'Give me a base rate neglect exercise',
            'إزاي أتغلب على الانحياز التأكيدي؟',
            'What is the Dunning-Kruger effect?',
          ]}
          accentColor="#8b5cf6"
          accentColorRgb="139,92,246"
        />
      </div>
    </div>
  );
}
