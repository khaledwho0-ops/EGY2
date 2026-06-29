"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Scale, BookOpen, Microscope, Brain, AlertTriangle } from "lucide-react";
import { EVIDENCE_PYRAMID } from "@/data/keyhunter/evidence-pyramid";
import { SCIENTIFIC_GUIDELINES, ISLAMIC_GUIDELINES, LOGICAL_GUIDELINES } from "@/lib/debunking/guidelines";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function EpistemologyPage() {
  const { isRTL, t } = useRTL();
  const [activeTab, setActiveTab] = useState<'science' | 'islam' | 'logic'>('science');

  // Reusable "Applied in EAL →" link pointing each principle to the live tool/exercise that uses it.
  const appliedLink = (href: string, label: { en: string; ar: string }, color: string) => (
    <Link
      href={href}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginTop: 12, fontSize: "0.85rem", fontWeight: 600,
        color, textDecoration: "none",
        padding: "6px 12px", borderRadius: "var(--radius-full)",
        border: `1px solid ${color}`, backgroundColor: "transparent",
      }}
    >
      {t({ en: "Applied in EAL", ar: "مُطبَّق في المكتبة" })} {isRTL ? "←" : "→"}
      <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{t(label)}</span>
    </Link>
  );

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-page)", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/six-layers" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Architecture", ar: "العودة إلى المعمارية" })}
          </Link>
        </nav>

        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 48px auto" }}>
          <Scale size={48} style={{ color: "var(--accent-blue)", marginBottom: 16 }} />
          <h1 style={{ fontSize: "2.5rem", marginBottom: 16, color: "var(--text-primary)" }}>{t({ en: "Epistemology Dashboard", ar: "لوحة تحكم نظرية المعرفة" })}</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t({ 
              en: "How do we KNOW something is true? Explore the side-by-side methodologies used by scientists, Islamic scholars, and logicians to verify reality.", 
              ar: "كيف نعرف أن شيئًا ما حقيقي؟ استكشف المنهجيات جنبًا إلى جنب التي يستخدمها العلماء، وعلماء الإسلام، وعلماء المنطق للتحقق من الواقع." 
            })}
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 48 }}>
          <button 
            onClick={() => setActiveTab('science')}
            style={{ 
              padding: "16px 32px", display: "flex", alignItems: "center", gap: 12,
              backgroundColor: activeTab === 'science' ? "var(--bg-secondary)" : "var(--bg-card)",
              border: "1px solid", borderColor: activeTab === 'science' ? "var(--accent-blue)" : "var(--border-primary)",
              borderRadius: "var(--radius-full)", cursor: "pointer", transition: "all 0.2s",
              color: activeTab === 'science' ? "var(--accent-blue)" : "var(--text-muted)",
              fontWeight: activeTab === 'science' ? 700 : 500, fontSize: "1.1rem"
            }}
          >
            <Microscope size={20} />
            {t({ en: "Scientific Method", ar: "المنهج العلمي" })}
          </button>

          <button 
            onClick={() => setActiveTab('islam')}
            style={{ 
              padding: "16px 32px", display: "flex", alignItems: "center", gap: 12,
              backgroundColor: activeTab === 'islam' ? "var(--bg-secondary)" : "var(--bg-card)",
              border: "1px solid", borderColor: activeTab === 'islam' ? "var(--accent-amber)" : "var(--border-primary)",
              borderRadius: "var(--radius-full)", cursor: "pointer", transition: "all 0.2s",
              color: activeTab === 'islam' ? "var(--accent-amber)" : "var(--text-muted)",
              fontWeight: activeTab === 'islam' ? 700 : 500, fontSize: "1.1rem"
            }}
          >
            <BookOpen size={20} />
            {t({ en: "Islamic Usul", ar: "أصول الفقه والحديث" })}
          </button>

          <button 
            onClick={() => setActiveTab('logic')}
            style={{ 
              padding: "16px 32px", display: "flex", alignItems: "center", gap: 12,
              backgroundColor: activeTab === 'logic' ? "var(--bg-secondary)" : "var(--bg-card)",
              border: "1px solid", borderColor: activeTab === 'logic' ? "var(--accent-red)" : "var(--border-primary)",
              borderRadius: "var(--radius-full)", cursor: "pointer", transition: "all 0.2s",
              color: activeTab === 'logic' ? "var(--accent-red)" : "var(--text-muted)",
              fontWeight: activeTab === 'logic' ? 700 : 500, fontSize: "1.1rem"
            }}
          >
            <Brain size={20} />
            {t({ en: "Logical Proof", ar: "البرهان المنطقي" })}
          </button>
        </div>

        {/* Content Area */}
        <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-primary)", overflow: "hidden" }}>

          {activeTab === 'science' && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ padding: 48, borderRight: isRTL ? "none" : "1px solid var(--border-primary)", borderLeft: isRTL ? "1px solid var(--border-primary)" : "none" }}>
                <h2 style={{ fontSize: "2rem", color: "var(--accent-blue)", marginBottom: 24 }}>{isRTL ? "هرم الأدلة" : "Evidence Pyramid"}</h2>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
                  {isRTL ? "من الأضعف (الحكايات الفردية) إلى الأقوى (التحليل التلوي)." : "From weakest (anecdotes) to strongest (meta-analysis)."}
                </p>
                <div style={{ display: "flex", flexDirection: "column-reverse", gap: 12 }}>
                  {EVIDENCE_PYRAMID.map((level) => (
                    <div key={level.id} style={{ display: "flex", gap: 16, backgroundColor: "var(--bg-secondary)", padding: 16, borderRadius: "var(--radius-md)", borderLeft: `4px solid ${level.color}` }}>
                      <div style={{ fontSize: "1.5rem" }}>{level.emoji}</div>
                      <div>
                        <strong style={{ display: "block", fontSize: "1.1rem", color: level.color, marginBottom: 4 }}>
                          {isRTL ? level.levelAr : level.level}
                        </strong>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                          {isRTL ? level.descriptionAr : level.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {appliedLink("/evidence", { en: "Rank a claim's evidence in the Evidence Engine", ar: "رتّب أدلة أي ادعاء في محرك الأدلة" }, "var(--accent-blue)")}
              </div>
              <div style={{ padding: 48, backgroundColor: "var(--bg-secondary)" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: 24, color: "var(--text-primary)" }}>{isRTL ? "إرشادات علمية" : "Scientific Guidelines"}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {SCIENTIFIC_GUIDELINES.slice(0, 5).map((guide) => (
                    <div key={guide.id} style={{ padding: 16, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-blue)" }}>
                      <strong className="block mb-2" style={{ color: "var(--text-primary)" }}>{guide.name}</strong>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{guide.description}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {appliedLink("/science", { en: "Falsifiability & correlation≠causation in the Science Lab", ar: "القابلية للتكذيب والارتباط لا يعني السببية في مختبر العلوم" }, "var(--accent-blue)")}
                  {appliedLink("/stat-power", { en: "Catch p-hacking & weak samples in Stat Power", ar: "اكشف التلاعب بالـ p والعينات الضعيفة في قوة الإحصاء" }, "var(--accent-blue)")}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'islam' && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ padding: 48, borderRight: isRTL ? "none" : "1px solid var(--border-primary)", borderLeft: isRTL ? "1px solid var(--border-primary)" : "none" }}>
                <h2 style={{ fontSize: "2rem", color: "var(--accent-amber)", marginBottom: 24 }}>{isRTL ? "طريق الشهادة" : "The Testimonial Path"}</h2>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
                  {isRTL
                    ? "تعتمد نظرية المعرفة الإسلامية بشكل كبير على النقل عالي التوثيق (التواتر) والاستنباط الفقهي المنظَّم (الأصول). إنه علم التحقق من شهادة البشر."
                    : "Islamic epistemology relies heavily on highly authenticated transmission (Tawatur) and structured legal derivation (Usul). It is the science of verifying human testimony."}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { step: { en: "1. Sanad Verification", ar: "١. التحقق من السند" }, desc: { en: "Checking the unbroken chain of narrators.", ar: "فحص سلسلة الرواة غير المنقطعة." } },
                    { step: { en: "2. Rijal Grading", ar: "٢. تقييم الرجال" }, desc: { en: "Auditing the memory and character of each narrator.", ar: "تدقيق حفظ وعدالة كل راوٍ." } },
                    { step: { en: "3. Matn Analysis", ar: "٣. تحليل المتن" }, desc: { en: "Ensuring the text doesn't contradict stronger texts.", ar: "التأكد أن النص لا يعارض نصوصًا أقوى." } },
                    { step: { en: "4. Asbab al-Nuzul", ar: "٤. أسباب النزول" }, desc: { en: "Determining the historical context of revelation.", ar: "تحديد السياق التاريخي للنزول." } },
                    { step: { en: "5. Nasikh & Mansukh", ar: "٥. الناسخ والمنسوخ" }, desc: { en: "Checking if a ruling was later abrogated.", ar: "فحص ما إذا كان الحكم قد نُسخ لاحقًا." } },
                    { step: { en: "6. Qiyas & Ijma", ar: "٦. القياس والإجماع" }, desc: { en: "Analogical deduction and scholarly consensus.", ar: "الاستنباط بالقياس وإجماع العلماء." } }
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "var(--accent-amber)", color: "var(--text-inverse)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: 4, color: "var(--text-primary)" }}>{isRTL ? item.step.ar : item.step.en}</strong>
                        <span style={{ color: "var(--text-muted)" }}>{isRTL ? item.desc.ar : item.desc.en}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {appliedLink("/religion-hub/tools/hadith-check", { en: "Verify a narration's chain (Sanad) in the Hadith Checker", ar: "تحقّق من سند الرواية في فاحص الحديث" }, "var(--accent-amber)")}
              </div>
              <div style={{ padding: 48, backgroundColor: "var(--bg-secondary)" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: 24, color: "var(--text-primary)" }}>{isRTL ? "إرشادات إسلامية" : "Islamic Guidelines"}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {ISLAMIC_GUIDELINES.slice(0, 5).map((guide) => (
                    <div key={guide.id} style={{ padding: 16, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-amber)" }}>
                      <strong className="block mb-2" style={{ color: "var(--text-primary)" }}>{guide.name}</strong>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{guide.description}</p>
                    </div>
                  ))}
                </div>
                {appliedLink("/religion-hub", { en: "Apply these source-grading rules in the Religion Hub", ar: "طبّق قواعد تدريج المصادر في مركز الأديان" }, "var(--accent-amber)")}
              </div>
            </div>
          )}

          {activeTab === 'logic' && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div style={{ padding: 48, borderRight: isRTL ? "none" : "1px solid var(--border-primary)", borderLeft: isRTL ? "1px solid var(--border-primary)" : "none" }}>
                <h2 style={{ fontSize: "2rem", color: "var(--accent-red)", marginBottom: 24 }}>{isRTL ? "الطريق العقلي" : "The Rational Path"}</h2>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 32 }}>
                  {isRTL
                    ? "يتعامل المنطق مع بنية الحجج بغض النظر عن المحتوى. يضمن أنه إذا كانت المقدمات صحيحة، فإن النتيجة تتبعها منطقيًا بالضرورة."
                    : "Logic deals with the structure of arguments regardless of content. It ensures that if the premises are true, the conclusion must logically follow."}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 24 }}>
                  {[
                    { step: { en: "1. Deductive Reasoning", ar: "١. الاستدلال الاستنباطي" }, desc: { en: "General to specific. Certain conclusions.", ar: "من العام إلى الخاص. نتائج يقينية." } },
                    { step: { en: "2. Inductive Reasoning", ar: "٢. الاستدلال الاستقرائي" }, desc: { en: "Specific to general. Probable conclusions.", ar: "من الخاص إلى العام. نتائج احتمالية." } },
                    { step: { en: "3. Abductive Reasoning", ar: "٣. الاستدلال التفسيري" }, desc: { en: "Inference to the best explanation.", ar: "الاستدلال على أفضل تفسير." } },
                    { step: { en: "4. Syllogism", ar: "٤. القياس المنطقي" }, desc: { en: "Premise 1 + Premise 2 = Conclusion.", ar: "مقدمة ١ + مقدمة ٢ = نتيجة." } },
                    { step: { en: "5. Principle of Non-Contradiction", ar: "٥. مبدأ عدم التناقض" }, desc: { en: "A cannot be both B and non-B.", ar: "لا يمكن أن يكون (أ) هو (ب) ولا (ب) في آنٍ واحد." } },
                    { step: { en: "6. Modus Ponens/Tollens", ar: "٦. وضع المقدّم ورفع التالي" }, desc: { en: "Formal structures of affirming or denying.", ar: "بنى شكلية للإثبات أو النفي." } }
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 16 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "var(--accent-red)", color: "var(--text-inverse)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div>
                        <strong style={{ display: "block", fontSize: "1.1rem", marginBottom: 4, color: "var(--text-primary)" }}>{isRTL ? item.step.ar : item.step.en}</strong>
                        <span style={{ color: "var(--text-muted)" }}>{isRTL ? item.desc.ar : item.desc.en}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {appliedLink("/god-system", { en: "Break a claim into premises in the God-System", ar: "فكّك أي ادعاء إلى مقدّمات في نظام-جود" }, "var(--accent-red)")}
                  {appliedLink("/sovo", { en: "Separate fact from opinion in SOVO", ar: "افصل الحقيقة عن الرأي في سوفو" }, "var(--accent-red)")}
                </div>
              </div>
              <div style={{ padding: 48, backgroundColor: "var(--bg-secondary)" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: 24, color: "var(--text-primary)" }}>{isRTL ? "إرشادات منطقية" : "Logical Guidelines"}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {LOGICAL_GUIDELINES.slice(0, 5).map((guide) => (
                    <div key={guide.id} style={{ padding: 16, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--accent-red)" }}>
                      <strong className="block mb-2" style={{ color: "var(--text-primary)" }}>{guide.name}</strong>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{guide.description}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {appliedLink("/fallacy-engine", { en: "Spot logical fallacies in the Fallacy Engine", ar: "اكتشف المغالطات المنطقية في محرك المغالطات" }, "var(--accent-red)")}
                  {appliedLink("/bias-detector", { en: "Detect cognitive biases in the Bias Detector", ar: "اكتشف الانحيازات المعرفية في كاشف التحيّز" }, "var(--accent-red)")}
                  {appliedLink("/bias-fingerprint", { en: "Map your own bias profile in Bias Fingerprint", ar: "ارسم بصمة تحيّزك في بصمة التحيّز" }, "var(--accent-red)")}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Method Mapper Callout */}
        <div style={{ marginTop: 48, padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.5rem", color: "var(--text-primary)" }}>{t({ en: "The Universal Language of Verification", ar: "لغة التحقق العالمية" })}</h3>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "1.1rem" }}>
              {t({ en: "Notice the parallels? Peer Review is the scientific equivalent of Mustalah al-Hadith. Meta-Analysis is the equivalent of Ijma.", ar: "هل تلاحظ أوجه التشابه؟ مراجعة الأقران هي المكافئ العلمي لمصطلح الحديث. التحليل التلوي هو المكافئ للإجماع." })}
            </p>
          </div>
        </div>

      </div>
      <PageNavigation currentPath="/epistemology" />
    </div>
  );
}
