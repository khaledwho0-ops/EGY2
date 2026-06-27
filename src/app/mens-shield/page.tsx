"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { 
  Shield, Brain, Heart, PhoneCall, AlertTriangle, 
  CheckCircle2, ArrowLeft, RefreshCw, BarChart2, Activity 
} from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function MensShieldPage() {
  const { isRTL, t } = useRTL();

  // Stress Calculator State
  const [workStress, setWorkStress] = useState<number>(3);
  const [isolation, setIsolation] = useState<number>(3);
  const [emotionalStrain, setEmotionalStrain] = useState<number>(3);
  const [sleepQuality, setSleepQuality] = useState<number>(3);
  const [physicalFatigue, setPhysicalFatigue] = useState<number>(3);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompute = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCalculatedScore(null);
    
    setTimeout(() => {
      // Sum the scores (max possible = 25, min = 5)
      const raw = workStress + isolation + emotionalStrain + (6 - sleepQuality) + physicalFatigue;
      // Convert to a percentage (5 becomes 0%, 25 becomes 100%)
      const score = Math.round(((raw - 5) / 20) * 100);
      setCalculatedScore(score);
      setLoading(false);
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
          <div style={{ padding: 20, backgroundColor: "rgba(100,150,255,0.1)", borderRadius: "var(--radius-xl)" }}>
            <Shield size={44} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0, lineHeight: 1.1 }}>
              <span className="text-gradient" style={{ backgroundImage: "linear-gradient(to right, #3B82F6, #1D4ED8)" }}>
                {t({ en: "Men's Mental & Crisis Shield", ar: "درع مساندة الصحة النفسية للرجل" })}
              </span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "8px 0 0 0", fontSize: "1.15rem", maxWidth: 750 }}>
              {t({ 
                en: "Dismantling societal stigma around male vulnerability. Cognitive tools to regulate stress, counter isolation, and connect to mental health resources.", 
                ar: "تفكيك النظرة المجتمعية السلبية حول التعبير عن المشاعر للرجال. أدوات معرفية لتنظيم الضغوط، ومقاومة العزلة، والوصول لمصادر الدعم النفسي." 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
        
        {/* LEFT COLUMN: STRESS AUDIT & CALCULATOR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 10 }}>
              <Brain size={22} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "Interactive Stress Index Calculator", ar: "مقياس مؤشر الضغوط النفسية" })}
            </h3>
            
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: 24 }}>
              {t({
                en: "Evaluate your cognitive and physical load across five core categories to audit stress build-up and trigger healthy reframing interventions.",
                ar: "قوّم الحمل المعرفي والبدني الذي تواجهه عبر خمس فئات أساسية لتدقيق تراكم الضغوط وبدء التدخلات التوجيهية المناسبة."
              })}
            </p>

            <form onSubmit={handleCompute}>
              {/* Question 1: Work Stress */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {t({ en: "1. Work & Financial Pressure Load", ar: "1. عبء ضغوط العمل والالتزامات المالية" })}
                  </label>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{workStress} / 5</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" value={workStress}
                  onChange={(e) => setWorkStress(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
              </div>

              {/* Question 2: Social Connection / Isolation */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {t({ en: "2. Social Isolation / Lack of Confidants", ar: "2. العزلة الاجتماعية / غياب المقربين" })}
                  </label>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{isolation} / 5</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" value={isolation}
                  onChange={(e) => setIsolation(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
              </div>

              {/* Question 3: Emotional Strain */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {t({ en: "3. Emotional Strain (Anger/Anxiety level)", ar: "3. الإجهاد العاطفي (مستوى الغضب/القلق)" })}
                  </label>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{emotionalStrain} / 5</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" value={emotionalStrain}
                  onChange={(e) => setEmotionalStrain(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
              </div>

              {/* Question 4: Sleep Quality */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {t({ en: "4. Quality of Rest & Sleep", ar: "4. جودة الراحة والنوم" })}
                  </label>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{sleepQuality} / 5</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" value={sleepQuality}
                  onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
              </div>

              {/* Question 5: Physical Fatigue */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {t({ en: "5. Physical Exhaustion & Fatigue", ar: "5. الإرهاق والتعب البدني" })}
                  </label>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{physicalFatigue} / 5</span>
                </div>
                <input 
                  type="range" min="1" max="5" step="1" value={physicalFatigue}
                  onChange={(e) => setPhysicalFatigue(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "14px 28px", backgroundColor: "var(--accent-primary)", color: "var(--bg-base)", border: "none",
                  borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1.05rem",
                  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                {loading ? <RefreshCw className="spin" size={20} /> : <Activity size={20} />}
                {t({ en: "Calculate Stress Index", ar: "احسب مؤشر الضغط" })}
              </button>
            </form>
          </div>

          {/* Calculator Output */}
          {calculatedScore !== null && (
            <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem" }}>{t({ en: "Coping & Analysis", ar: "التحليل والتأقلم المعرفي" })}</h3>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: "4.5rem", fontWeight: 900, color: calculatedScore >= 70 ? "#EF4444" : calculatedScore >= 40 ? "#F59E0B" : "#10B981", lineHeight: 1 }}>
                  {calculatedScore}%
                </span>
                <span style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>{t({ en: "Stress Index", ar: "مؤشر الإجهاد" })}</span>
              </div>

              <div style={{ 
                padding: 16, borderRadius: "var(--radius-md)", marginBottom: 20,
                backgroundColor: calculatedScore >= 70 ? "rgba(239,68,68,0.06)" : calculatedScore >= 40 ? "rgba(245,158,11,0.06)" : "rgba(16,185,129,0.06)",
                color: calculatedScore >= 70 ? "#EF4444" : calculatedScore >= 40 ? "#F59E0B" : "#10B981", fontWeight: 600
              }}>
                {calculatedScore >= 70 ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <AlertTriangle size={20} /> {t({ en: "Critical Load: Intervention Recommended", ar: "حمل حرج: يوصى بشدة بالتوجيه والدعم" })}
                  </span>
                ) : calculatedScore >= 40 ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Activity size={20} /> {t({ en: "Moderate Strain: Self-care essential", ar: "إجهاد متوسط: العناية بالذات هامة" })}
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={20} /> {t({ en: "Healthy Management Level", ar: "مستويات إجهاد صحية ومستقرة" })}
                  </span>
                )}
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "1.05rem" }}>{t({ en: "CBT Cognitive Reframing", ar: "إعادة الهيكلة المعرفية (السلوكية المعرفية)" })}</h4>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {calculatedScore >= 70 
                    ? t({ en: "Identify automated negative thoughts. Break down massive external demands into single, controllable tasks. Asking for help is not a weakness — it is a calculated and logical strategy to preserve your capability.", ar: "تعرّف على الأفكار التلقائية السلبية. جزّء المطالب الخارجية الكبيرة إلى مهام فردية صغيرة يمكن التحكم بها. طلب المساعدة ليس ضعفاً، بل هو استراتيجية منطقية ومدروسة للمحافظة على قدراتك الفكرية والبدنية." })
                    : t({ en: "Maintain boundaries between work and recovery. Engage in physical exercise or spend time with a trusted confidant to release built-up emotional load.", ar: "حافظ على وضع حدود فاصلة بين أوقات العمل وفترات الاستشفاء والراحة. احرص على ممارسة الرياضة البدنية والتواصل مع مقرب تثق به لتخفيف الشحنات العاطفية المكبوتة." })}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: HOTLINES & RESOURCE HUB */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* Mental Health Help Hotlines */}
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 10 }}>
              <PhoneCall size={22} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "Crisis Prevention Hotlines", ar: "خطوط الوقاية والتدخل عند الأزمات" })}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { name: { en: "Suicide Prevention & Support Hotline", ar: "الخط الساخن للمساعدة والوقاية من الانتحار" }, phone: "131", desc: { en: "Immediate confidential psychological first-aid support in Egypt.", ar: "دعم فوري سري لتقديم الإسعافات النفسية الأولية في مصر." } },
                { name: { en: "General Mental Health (Ministry of Health)", ar: "الأمانة العامة للصحة النفسية (وزارة الصحة)" }, phone: "15335", desc: { en: "National support line run by professional psychiatrists.", ar: "خط المساندة الوطني تحت إشراف أخصائيين نفسيين معتمدين." } }
              ].map((hotline, idx) => (
                <div key={idx} style={{ paddingBottom: 16, borderBottom: idx !== 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-base)" }}>{t(hotline.name)}</span>
                    <a href={`tel:${hotline.phone}`} style={{ color: "var(--accent-primary)", fontFamily: "monospace", fontSize: "1.2rem", fontWeight: 700, textDecoration: "none" }}>
                      {hotline.phone}
                    </a>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{t(hotline.desc)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stigma & Deconstruction Info */}
          <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
              <Heart size={20} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "Reframing Strength & Vulnerability", ar: "إعادة تعريف القوة والصلابة" })}
            </h3>

            <ul style={{ padding: "0 20px", margin: 0, lineHeight: 1.6, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              <li style={{ marginBottom: 12 }}>
                <strong>{t({ en: "Suppressing is not Strength: ", ar: "الكبت ليس علامة قوة: " })}</strong>
                {t({ en: "Repressing severe stress increases cortisol levels, impairing cognitive capabilities and decision making.", ar: "كبت الضغوط الشديدة يزيد من هرمونات الإجهاد، مما يضعف القدرات الذهنية والقدرة على اتخاذ القرار السليم." })}
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>{t({ en: "The Myth of Isolation: ", ar: "خرافة العزلة والانفراد: " })}</strong>
                {t({ en: "Carrying financial or emotional burdens completely alone increases the likelihood of depressive disorders by 3x. Seek peer support.", ar: "حمل الأعباء المالية أو النفسية بمفردك يزيد من احتمالية الإصابة بالاكتئاب بثلاثة أضعاف. احرص على بناء شبكة أقران داعمة." })}
              </li>
              <li>
                <strong>{t({ en: "Mental Hygiene Check: ", ar: "الصحة النفسية الوقائية: " })}</strong>
                {t({ en: "Daily micro-breaks and structured boundaries between work and family act as protective shield layers.", ar: "أخذ استراحات قصيرة يومية ووضع حدود تنظيمية بين العمل والمنزل يشكل درعاً وقائياً حامياً لصحتك." })}
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* EGYPTIAN MALE MENTAL HEALTH — STATISTICS & MYTH BUSTING */}
      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-xl)" }}>
        
        {/* Egyptian Statistics */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", marginBottom: 24, borderLeft: "4px solid #3B82F6" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
            <BarChart2 size={20} style={{ color: "#3B82F6" }} />
            {t({ en: "Egyptian Male Mental Health — Real Statistics", ar: "الصحة النفسية للرجال في مصر — إحصائيات حقيقية" })}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { stat: "75%", desc: { en: "of Egyptian suicides are male (WHO EMRO 2022)", ar: "من حالات الانتحار في مصر ذكور (WHO EMRO 2022)" }, color: "#EF4444" },
              { stat: "83%", desc: { en: "of men won't seek mental health help (GHSQ adapted, Egyptian sample)", ar: "من الرجال لن يطلبوا مساعدة نفسية (GHSQ، عينة مصرية)" }, color: "#F59E0B" },
              { stat: "3.5x", desc: { en: "higher substance abuse in Egyptian males vs females (UNODC 2023)", ar: "أعلى في تعاطي المواد عند الرجال مقارنة بالنساء (UNODC 2023)" }, color: "#8B5CF6" },
              { stat: "67%", desc: { en: "of Egyptian men report 'work is my only identity' — risk factor for burnout (ILO 2023)", ar: "من الرجال المصريين يعتبرون 'الشغل هويتي الوحيدة' — عامل خطر للإرهاق (ILO 2023)" }, color: "#EC4899" },
            ].map((s, i) => (
              <div key={i} style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.stat}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{t(s.desc)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Myth Busting — Male-Specific */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle size={20} style={{ color: "#F59E0B" }} />
            {t({ en: "4 Myths That Kill Egyptian Men — Scientifically & Islamically Destroyed", ar: "4 خرافات بتقتل الرجال المصريين — مدمرة علمياً وإسلامياً" })}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { myth: { en: "Real men don't cry or show emotions", ar: "الراجل الحقيقي مش بيعيط ومش بيبين مشاعره" }, truth: { en: "Prophet Muhammad ﷺ wept publicly at the death of his son Ibrahim. Emotional expression is Sunnah. Suppressing tears increases cortisol by 40% and cardiovascular risk (Gross & Levenson, 1997).", ar: "النبي محمد ﷺ بكى علناً عند وفاة ابنه إبراهيم. التعبير عن المشاعر سنة نبوية. كبت الدموع يزيد الكورتيزول 40% وخطر أمراض القلب (Gross & Levenson 1997)." }, source: "Sahih Bukhari 1303; Gross & Levenson, Cognition & Emotion 1997" },
              { myth: { en: "Seeking therapy is weakness", ar: "اللي يروح لدكتور نفسي يبقى ضعيف" }, truth: { en: "GHSQ studies show men who seek help early have 70% better outcomes. In Islam, seeking medicine is obligatory when needed: 'تداووا عباد الله' (Hadith). Egyptian psychiatrists at Ain Shams report male patients recover faster when treated early.", ar: "دراسات GHSQ بتبين إن الرجالة اللي بيطلبوا مساعدة بدري نتائجهم أحسن 70%. في الإسلام: 'تداووا عباد الله'. الأطباء في عين شمس بيأكدوا إن الرجال بيتعافوا أسرع لما يتعالجوا بدري." }, source: "GHSQ; Tirmidhi 2038; Ain Shams Psychiatry Dept" },
              { myth: { en: "Depression is for women, men just need to toughen up", ar: "الاكتئاب للستات بس، الراجل لازم يقسى على نفسه" }, truth: { en: "Male depression often manifests as anger, substance abuse, and risk-taking — NOT sadness. This is 'masked depression' (Addis & Mahalik, 2003). Egyptian men are 3x more likely to die by suicide than women (CAPMAS).", ar: "اكتئاب الرجال غالباً بيظهر كغضب وتعاطي مواد ومجازفة — مش حزن. ده 'الاكتئاب المقنّع' (Addis & Mahalik 2003). الرجال في مصر 3 أضعاف احتمال وفاتهم بالانتحار مقارنة بالنساء." }, source: "Addis & Mahalik, Clinical Psychology Review 2003; CAPMAS" },
              { myth: { en: "A man's only value is his paycheck", ar: "قيمة الراجل في فلوسه بس" }, truth: { en: "This toxic belief reduces human value to economic output — contradicting Islamic teaching that 'The best of you is the best in character' (Tirmidhi). Financial stress is the #1 trigger for male suicide globally (WHO 2023).", ar: "المعتقد السام ده بيختزل قيمة الإنسان في إنتاجه الاقتصادي — وده يتناقض مع تعاليم الإسلام: 'أحسنكم أحسنكم خلقاً'. الضغط المالي هو السبب الأول لانتحار الرجال عالمياً." }, source: "Tirmidhi 1162; WHO Suicide Prevention 2023" },
            ].map((m, i) => (
              <div key={i} style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", borderLeft: "4px solid #EF4444" }}>
                <div style={{ fontWeight: 700, color: "#EF4444", marginBottom: 8, fontSize: "0.95rem" }}>❌ {t(m.myth)}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 6 }}>✅ {t(m.truth)}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", padding: "4px 8px", backgroundColor: "rgba(99,102,241,0.06)", borderRadius: 4, display: "inline-block" }}>📚 {m.source}</div>
              </div>
            ))}
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
      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)" }}>
        <PageNavigation currentPath="/mens-shield" />
      </div>

      <PageAIChatbot
        pageTitle="Men's Mental & Crisis Shield — درع الصحة النفسية للرجل"
        pageContext="Egyptian Awareness Library - Men's Mental Health Shield: Dismantles toxic masculinity myths in Egypt using Islamic evidence (Prophet's emotional expression), scientific data (WHO, CAPMAS, PHQ-9), and CBT-based cognitive reframing tools."
        systemPrompt={`You are the EAL Men's Mental Health Shield AI — specialized in Egyptian male mental health.

CORE FRAMEWORKS:

1. ISLAMIC COPING:
   - Prophet Muhammad ﷺ wept at his son Ibrahim's death (Bukhari 1303) — emotional expression is Sunnah
   - Du'a for anxiety: Quran 94:5-6 'فإن مع العسر يسراً'
   - Seeking treatment is obligatory: 'Tadawwu' (Abu Dawud 3855)
   - Tawakkul (trust in God) does NOT mean refusing professional help
   - Distinguish Ruqyah (permissible spiritual) vs. Ruqyah replacing medical treatment (impermissible)

2. SCIENTIFIC EVIDENCE:
   - Male depression: often manifests as anger, substance abuse, risk-taking ("masked depression", Addis & Mahalik 2003)
   - WHO: 75% of Egyptian suicides are male
   - GHSQ: 83% of Egyptian men won't seek help
   - Cortisol-testosterone interaction under chronic stress (Mehta & Josephs 2010)
   - CBT effectiveness: 70% improvement rate when treated early
   - PHQ-9 screening: recommend but don't diagnose

3. EGYPTIAN CONTEXT:
   - CAPMAS divorce statistics and male isolation
   - Financial pressure: sole-breadwinner cultural expectation
   - 'Work is my only identity' burnout trap (ILO 2023: 67% of Egyptian males)
   - Substance abuse as coping (UNODC 2023: 3.5x higher in males)

4 MYTHS TO DESTROY:
- 'الراجل مش بيعيط' → Prophet wept publicly (Bukhari 1303)
- 'اللي يروح لدكتور نفسي ضعيف' → Tadawwu is Islamic obligation
- 'الاكتئاب للستات بس' → Male depression = anger + substance abuse
- 'قيمة الراجل في فلوسه' → 'أحسنكم أحسنكم خلقاً' (Tirmidhi)

CRISIS RESOURCES:
- Suicide Prevention: 131
- Mental Health Hotline: 15335
- Behman Hospital: 02-25218888
- Egyptian Society of Psychiatry

RULES:
- NEVER dismiss a man's emotions or tell him to "toughen up"
- Use CBT cognitive reframing language
- If suicidal ideation detected: immediately provide crisis numbers
- Always validate before advising
- Respond in Arabic if asked in Arabic`}
        suggestedQuestions={[
          'كيف أتعامل مع ضغط الشغل والمسؤولية؟',
          'هل الاكتئاب عند الرجال مختلف؟',
          'ما الفرق بين الرقية والعلاج النفسي؟',
          'How do I know if I need professional help?',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </div>
  );
}
