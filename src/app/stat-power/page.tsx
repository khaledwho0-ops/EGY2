"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Calculator, HelpCircle, ArrowLeft, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, ShieldCheck, BookOpen } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import ToolGuide from '@/components/ToolGuide';

// Standard Normal CDF approximation (highly accurate polynomial approximation)
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.39894228 * Math.exp(-x * x / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

export default function StatPowerPage() {
  const { isRTL, t } = useRTL();
  
  // State for calculation parameters
  const [testType, setTestType] = useState<"independent" | "paired">("independent");
  const [effectSize, setEffectSize] = useState<number>(0.5); // Cohen's d
  const [sampleSize, setSampleSize] = useState<number>(50); // N per group
  const [alpha, setAlpha] = useState<number>(0.05); // Significance level
  const [tails, setTails] = useState<1 | 2>(2);

  // Math-based Power computation
  const stats = useMemo(() => {
    // 1. Calculate non-centrality parameter (delta)
    const factor = testType === "independent" ? Math.sqrt(sampleSize / 2) : Math.sqrt(sampleSize);
    const delta = effectSize * factor;

    // 2. Critical value Z_alpha
    // Using standard Z-values for common alphas
    let zCrit = 1.96; // 2-tailed alpha = 0.05
    if (tails === 2) {
      if (alpha === 0.01) zCrit = 2.576;
      else if (alpha === 0.05) zCrit = 1.96;
      else if (alpha === 0.1) zCrit = 1.645;
    } else {
      if (alpha === 0.01) zCrit = 2.33;
      else if (alpha === 0.05) zCrit = 1.645;
      else if (alpha === 0.1) zCrit = 1.282;
    }

    // 3. Power calculation
    let power = 0;
    if (tails === 2) {
      power = normalCDF(delta - zCrit) + normalCDF(-delta - zCrit);
    } else {
      power = normalCDF(delta - zCrit);
    }

    // Safeguard bounds
    power = Math.max(0.0001, Math.min(0.9999, power));

    // Calculate required N for 80% power (Type II error beta = 0.20)
    // Formula approximation: N = (f(alpha, beta) / d^2) * multiplier
    const za = zCrit; // critical value
    const zb = 0.8416; // Z for 80% power (beta = 0.20)
    const multiplier = testType === "independent" ? 2 : 1;
    const requiredN = Math.ceil(((za + zb) * (za + zb) / (effectSize * effectSize)) * multiplier);

    return {
      power,
      beta: 1 - power,
      requiredN,
      isRobust: power >= 0.80,
    };
  }, [testType, effectSize, sampleSize, alpha, tails]);

  // Load a ready scenario into the real calculator inputs.
  // Scenario format: "n=8;d=0.5;type=paired" (n = sample size, d = Cohen's d).
  // Values are clamped to the live slider ranges (n: 5–300, d: 0.1–1.5).
  const loadScenario = (input: string) => {
    const params = new Map<string, string>();
    input.split(";").forEach((pair) => {
      const [k, v] = pair.split("=");
      if (k && v !== undefined) params.set(k.trim().toLowerCase(), v.trim());
    });

    if (params.has("n")) {
      const n = parseInt(params.get("n")!, 10);
      if (!Number.isNaN(n)) setSampleSize(Math.max(5, Math.min(300, n)));
    }
    if (params.has("d")) {
      const d = parseFloat(params.get("d")!);
      if (!Number.isNaN(d)) setEffectSize(Math.max(0.1, Math.min(1.5, d)));
    }
    if (params.has("type")) {
      const ty = params.get("type")!;
      if (ty === "independent" || ty === "paired") setTestType(ty);
    }

    // Results recompute automatically (useMemo). Scroll to the calculator.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* HEADER SECTION */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            <ArrowLeft size={16} /> {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 20, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-xl)" }}>
            <Calculator size={40} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
              <span className="text-gradient">{t({ en: "Statistical Power Lab", ar: "مختبر القوة الإحصائية" })}</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.1rem" }}>
              {t({ 
                en: "Compute statistical power (1-β) to detect cherry-picked, underpowered, or p-hacked studies.", 
                ar: "احسب القوة الإحصائية (1-β) لكشف الدراسات الانتقائية أو ضعيفة القوة أو المتلاعب بقيمها الاحتمالية." 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>

        {/* HOW-TO-USE GUIDE (zero-knowledge onboarding + ready examples) */}
        <div style={{ gridColumn: "1 / -1" }}>
          <ToolGuide
            titleEn="How to use this — even with zero stats background"
            titleAr="كيفية الاستخدام — حتى بدون أي خلفية إحصائية"
            whoBenefits={{
              en: "Any Egyptian who sees a 'study proves...' claim on Facebook or WhatsApp and wants to know in 10 seconds whether the study was even big enough to mean anything — before sharing it.",
              ar: "أي مصري يرى ادعاء «دراسة تثبت...» على فيسبوك أو واتساب، ويريد أن يعرف خلال 10 ثوانٍ هل العينة أصلاً كبيرة بما يكفي ليكون لها معنى — قبل أن يشاركها.",
            }}
            steps={[
              {
                en: "Find two numbers in the claim: how many people were in the study (the sample size), and how strong the difference is (small = barely noticeable, large = obvious). If the post doesn't say, assume 'medium'.",
                ar: "ابحث عن رقمين في الادعاء: كم عدد الأشخاص في الدراسة (حجم العينة)، وما مدى قوة الفرق (صغير = بالكاد يُلاحظ، كبير = واضح). إذا لم يذكر المنشور ذلك، افترض «متوسط».",
              },
              {
                en: "Drag the 'Sample Size' slider to that number of people, and the 'Effect Size' slider to small / medium / large.",
                ar: "حرّك شريط «حجم العينة» إلى عدد الأشخاص، وشريط «حجم الأثر» إلى صغير / متوسط / كبير.",
              },
              {
                en: "Read the big percentage. It is the study's 'power' — its real chance of catching a true effect. Below 80% (the red zone) the study is too weak to trust a single result from.",
                ar: "اقرأ النسبة الكبيرة. إنها «قوة» الدراسة — فرصتها الحقيقية في رصد أثر حقيقي. أقل من 80٪ (المنطقة الحمراء) تعني أن الدراسة أضعف من أن تثق بنتيجة واحدة منها.",
              },
              {
                en: "Compare the 'Target N' number to the study's real sample. If the study used far fewer people than that target, a single positive headline from it is most likely noise — don't share it as proof.",
                ar: "قارن رقم «العينة المطلوبة» بحجم عينة الدراسة الحقيقي. إذا استخدمت الدراسة أشخاصاً أقل بكثير من هذا الرقم، فإن أي عنوان إيجابي منها غالباً مجرد ضجيج — لا تشاركه كدليل.",
              },
            ]}
            scenarios={[
              {
                label: "Clinic 'cure' tested on 8 patients",
                labelAr: "«علاج» عيادة جُرّب على 8 مرضى",
                input: "n=8;d=0.5;type=paired",
                tag: "health",
              },
              {
                label: "12-person diet that 'went viral'",
                labelAr: "ريجيم انتشر بناءً على 12 شخصاً",
                input: "n=12;d=0.5;type=independent",
                tag: "diet",
              },
              {
                label: "'Herbal mix beats medicine' — 20 vs 20",
                labelAr: "«خلطة أعشاب تتفوق على الدواء» — 20 مقابل 20",
                input: "n=20;d=0.5;type=independent",
                tag: "herbal",
              },
              {
                label: "Properly-sized trial (what 80% needs)",
                labelAr: "تجربة بحجم سليم (ما تتطلبه قوة 80٪)",
                input: "n=64;d=0.5;type=independent",
                tag: "robust",
              },
            ]}
            onTry={loadScenario}
            lang={isRTL ? "ar" : "en"}
            accent="#06b6d4"
          />
        </div>

        {/* INPUT PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            
            <h3 style={{ margin: "0 0 24px 0", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart2 size={20} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "Calculator Parameters", ar: "معايير الحساب" })}
            </h3>

            {/* Test Type Select */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                {t({ en: "Study Design / Test Type", ar: "تصميم الدراسة / نوع الاختبار" })}
              </label>
              <div style={{ display: "flex", gap: 12 }}>
                <button 
                  onClick={() => setTestType("independent")}
                  style={{
                    flex: 1, padding: "12px", border: testType === "independent" ? "2px solid var(--accent-primary)" : "1px solid var(--border)",
                    backgroundColor: testType === "independent" ? "rgba(100,200,255,0.05)" : "transparent",
                    borderRadius: "var(--radius-md)", color: "var(--text-base)", cursor: "pointer", fontWeight: 600, transition: "all 0.2s"
                  }}
                >
                  {t({ en: "Two-Group Independent t-test", ar: "اختبار t لمجموعتين مستقلتين" })}
                </button>
                <button 
                  onClick={() => setTestType("paired")}
                  style={{
                    flex: 1, padding: "12px", border: testType === "paired" ? "2px solid var(--accent-primary)" : "1px solid var(--border)",
                    backgroundColor: testType === "paired" ? "rgba(100,200,255,0.05)" : "transparent",
                    borderRadius: "var(--radius-md)", color: "var(--text-base)", cursor: "pointer", fontWeight: 600, transition: "all 0.2s"
                  }}
                >
                  {t({ en: "Paired / Within-Subject t-test", ar: "اختبار t المرتبط / قياسات متكررة" })}
                </button>
              </div>
            </div>

            {/* Effect Size Cohen's d Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {t({ en: "Effect Size (Cohen's d)", ar: "حجم الأثر (Cohen's d)" })}
                </label>
                <span style={{ fontWeight: 700, color: "var(--accent-primary)", fontFamily: "monospace" }}>{effectSize.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.1" max="1.5" step="0.05" value={effectSize}
                onChange={(e) => setEffectSize(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-primary)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
                <span>{t({ en: "Small (0.2)", ar: "صغير (0.2)" })}</span>
                <span>{t({ en: "Medium (0.5)", ar: "متوسط (0.5)" })}</span>
                <span>{t({ en: "Large (0.8)", ar: "كبير (0.8)" })}</span>
                <span>{t({ en: "Very Large (1.2+)", ar: "كبير جداً (+1.2)" })}</span>
              </div>
            </div>

            {/* Sample Size Slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {testType === "independent" 
                    ? t({ en: "Sample Size per Group (n)", ar: "حجم العينة لكل مجموعة (n)" })
                    : t({ en: "Total Paired Sample Size (N)", ar: "إجمالي حجم العينة المزدوجة (N)" })}
                </label>
                <span style={{ fontWeight: 700, color: "var(--accent-primary)", fontFamily: "monospace" }}>{sampleSize}</span>
              </div>
              <input 
                type="range" min="5" max="300" step="5" value={sampleSize}
                onChange={(e) => setSampleSize(parseInt(e.target.value, 10))}
                style={{ width: "100%", accentColor: "var(--accent-primary)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 4 }}>
                <span>n = 5</span>
                <span>n = 150</span>
                <span>n = 300</span>
              </div>
            </div>

            {/* Alpha & Tails Row */}
            <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  {t({ en: "Significance Level (Alpha α)", ar: "مستوى الدلالة (ألفا α)" })}
                </label>
                <select 
                  value={alpha} 
                  onChange={(e) => setAlpha(parseFloat(e.target.value))}
                  style={{ width: "100%", padding: "12px", backgroundColor: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--text-base)" }}
                >
                  <option value="0.01">0.01 (99% Confidence)</option>
                  <option value="0.05">0.05 (95% Confidence)</option>
                  <option value="0.10">0.10 (90% Confidence)</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: "0.95rem" }}>
                  {t({ en: "Hypothesis Direction (Tails)", ar: "اتجاه الفرضية (Tails)" })}
                </label>
                <select 
                  value={tails} 
                  onChange={(e) => setTails(parseInt(e.target.value) as 1 | 2)}
                  style={{ width: "100%", padding: "12px", backgroundColor: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--text-base)" }}
                >
                  <option value="2">Two-Tailed (Non-directional)</option>
                  <option value="1">One-Tailed (Directional)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS PANEL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Main Power Output Card */}
          <div style={{ 
            backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: `2px solid ${stats.isRobust ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, 
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" 
          }}>
            
            {/* Background glowing indicator */}
            <div style={{ 
              position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", 
              background: stats.isRobust ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", filter: "blur(20px)" 
            }} />

            <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem", color: "var(--text-base)" }}>
              {t({ en: "Calculated Statistical Power", ar: "القوة الإحصائية المحسوبة" })}
            </h3>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: "4.5rem", fontWeight: 900, color: stats.isRobust ? "#10B981" : "#EF4444", lineHeight: 1 }}>
                {(stats.power * 100).toFixed(1)}%
              </span>
              <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-muted)" }}>
                (1 - β)
              </span>
            </div>

            {/* Threshold Notification */}
            <div style={{ 
              display: "flex", alignItems: "center", gap: 12, padding: "16px", borderRadius: "var(--radius-md)", 
              backgroundColor: stats.isRobust ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)", 
              border: `1px solid ${stats.isRobust ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`, marginBottom: 24
            }}>
              {stats.isRobust ? (
                <>
                  <CheckCircle2 size={24} style={{ color: "#10B981", flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "#10B981", fontWeight: 500 }}>
                    {t({ en: "Statistically Robust: Meets the standard 80% power threshold.", ar: "قوة إحصائية قوية: تطابق معيار الـ 80٪ الأدنى المتفق عليه." })}
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangle size={24} style={{ color: "#EF4444", flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "#EF4444", fontWeight: 500 }}>
                    {t({ en: "Statistically Underpowered: High probability of missing a true effect.", ar: "قوة إحصائية ضعيفة: احتمالية عالية لعدم كشف الأثر الحقيقي." })}
                  </p>
                </>
              )}
            </div>

            {/* Detail breakdown grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  {t({ en: "Type II Error Probability (Beta β)", ar: "احتمالية خطأ النوع الثاني (بيتا β)" })}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "monospace" }}>
                  {(stats.beta * 100).toFixed(1)}%
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 4 }}>
                  {t({ en: "Target N for 80% Power", ar: "العينة المطلوبة لقوة 80٪" })}
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "monospace", color: "var(--accent-primary)" }}>
                  {stats.requiredN} {t({ en: "per group", ar: "لكل مجموعة" })}
                </div>
              </div>
            </div>

          </div>

          {/* Educational Insight Card */}
          <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={18} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "How to use this to spot misinformation?", ar: "كيف تستخدم هذا لكشف التضليل؟" })}
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              {t({
                en: "Scientific deniers or sensationalists frequently cite studies with very small sample sizes (e.g., N=15) claiming 'breakthrough findings.' If the effect size is medium (d=0.5) and N=15, the statistical power is less than 30%. This means the study has a 70% chance of failing to detect the effect, and any positive result is highly likely to be a false positive (p-hacked or random noise). Reject underpowered research.",
                ar: "يعمد مروجو الأخبار الزائفة والادعاءات المثيرة إلى الاستشهاد بدراسات ذات عينات صغيرة جداً (مثل 15 شخصاً) ويدعون وجود 'نتائج خارقة'. إذا كان حجم الأثر متوسطاً وعدد الأفراد 15، فإن القوة الإحصائية تقل عن 30٪. هذا يعني أن هناك فرصة 70٪ لفشل التجربة، مما يجعل النتيجة الإيجابية غالباً دلالة كاذبة ناتجة عن صدفة عشوائية أو تلاعب بالبيانات. ارفض الأبحاث ضعيفة القوة."
              })}
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER DISCLAIMER */}
      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-xl)" }}>
        <div style={{ padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.85rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Methodology Disclaimer", ar: "إخلاء مسؤولية منهجية" })}:</strong> {t({
              en: "This calculator implements non-central t-distribution power approximations for t-tests. It is intended for educational audit of published research and methodology auditing. It is not a substitute for peer-reviewed statistical simulation tools like G*Power.",
              ar: "يقوم هذا الحاسب بتطبيق تقديرات توزيع t غير المركزي لحساب القوة الإحصائية. الغرض منه هو التوعية المنهجية والتدقيق التعليمي للدراسات المنشورة، ولا يغني عن البرامج المخصصة للمحاكاة الإحصائية مثل G*Power."
            })}
          </p>
        </div>
      </div>

      <PageNavigation currentPath="/stat-power" />

      <PageAIChatbot
        pageTitle="Statistical Power Lab — مختبر القوة الإحصائية"
        pageContext="Egyptian Awareness Library - Statistical Power Lab: Interactive calculator for statistical power, sample size, effect size, and Type I/II error rates. Helps users evaluate whether research studies have adequate power to detect real effects."
        systemPrompt={`You are the EAL Statistical Methods AI. You help users understand statistical concepts critical for evaluating research quality.

CORE CONCEPTS:
1. STATISTICAL POWER (1-β): Probability of detecting a real effect
   - Minimum acceptable: 0.80 (80% power)
   - Underpowered studies: miss real effects, produce false negatives
   - Rule of thumb: Larger N = more power

2. EFFECT SIZE: How big is the difference?
   - Cohen's d: small=0.2, medium=0.5, large=0.8
   - Odds Ratio (OR): 1.0 = no effect, >1 = increased risk
   - NNT: How many to treat for 1 benefit

3. p-VALUE: Probability of getting results by chance IF null hypothesis is true
   - p<0.05 does NOT mean "95% chance hypothesis is true"
   - p<0.05 + large N = statistically significant but maybe not practically important
   - p-hacking: running multiple tests until p<0.05 appears

4. TYPE I ERROR (α): False positive (finding effect that doesn't exist)
5. TYPE II ERROR (β): False negative (missing real effect)

6. SAMPLE SIZE PLANNING:
   - For proportions: use power analysis before study
   - Egyptian health studies: often underpowered (N<100)
   - Beware: "pilot studies" presented as definitive findings

Explain all concepts with Egyptian health research examples.`}
        suggestedQuestions={[
          'ما هي القوة الإحصائية ولماذا تهم؟',
          'كيف أفسر قيمة p بشكل صحيح؟',
          'What sample size do I need for a reliable study?',
          'What is the difference between statistical and practical significance?',
        ]}
        accentColor="#06b6d4"
        accentColorRgb="6,182,212"
      />
    </div>
  );
}
