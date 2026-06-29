"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Brain, AlertTriangle, Fingerprint,
  Globe, BookOpen, Activity, Lock, CheckCircle2,
  ChevronRight, Sparkles, Scale, HeartPulse
} from "lucide-react";
import { SourcePyramid } from "@/components/shared/source-pyramid";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from "@/components/shared/rtl-provider";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MethodologyPage() {
  const { isRTL } = useRTL();

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen font-sans overflow-hidden pb-32"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
    >

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full mix-blend-screen" style={{ background: "var(--accent-emerald-surface, var(--accent-mentalhealth-surface))" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full mix-blend-screen" style={{ background: "var(--accent-deepreal-surface)" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 font-mono text-sm uppercase tracking-widest"
            style={{ background: "var(--accent-emerald-surface, var(--accent-mentalhealth-surface))", border: "1px solid var(--border-secondary)", color: "var(--accent-emerald)" }}
          >
            <Sparkles className="w-4 h-4" />
            {isRTL ? "منهجية المنصة" : "Platform Methodology"}
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            {isRTL ? (
              <>
                هندسة <br/>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--accent-emerald), var(--accent-blue))" }}>
                  الدفاع المعرفي
                </span>
              </>
            ) : (
              <>
                The Architecture of <br/>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, var(--accent-emerald), var(--accent-blue))" }}>
                  Cognitive Defense
                </span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {isRTL
              ? "احنا مابنبنيش أدوات عشان نراجع صحة الإنترنت. احنا بنبني جهاز مناعة معرفي يحمي العقل البشري. ده الأساس العلمي والفلسفي والتشغيلي للمكتبة المصرية للتوعية."
              : "We do not build tools to fact-check the internet. We build a cognitive immune system to protect the human mind. This is the scientific, philosophical, and operational foundation of the Egyptian Awareness Library."}
          </motion.p>
        </div>

        {/* 0.1 The Three Pillars */}
        <section className="mb-40">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--accent-emerald-surface, var(--accent-mentalhealth-surface))", border: "1px solid var(--border-secondary)" }}>
                <Brain className="w-6 h-6" style={{ color: "var(--accent-emerald)" }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                {isRTL ? "الركائز الثلاثة للدفاع المعرفي-أولاً" : "The Three Pillars of Cognition-First Defense"}
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: isRTL ? "أ: نظرية التحصين" : "A: Inoculation Theory",
                subtitle: isRTL ? "(الدحض المُسبق)" : "(Pre-bunking)",
                icon: ShieldCheck,
                text: isRTL
                  ? "تعريض الناس لأسلوب التلاعب قبل وقوعه بيبني مقاومة قوية وقابلة للانتقال. أثبت ده معمل القرار الاجتماعي في كامبريدج: تدخلات التحصين القصيرة بتحسّن بشكل كبير قدرة المستخدمين على كشف أساليب التلاعب قبل ما تترسخ."
                  : "Exposing people to the technique of manipulation in advance produces durable, transferable resistance. Established by Cambridge's Social Decision-Making Lab, brief inoculation interventions significantly improve users' ability to identify manipulation techniques before they take root."
              },
              {
                title: isRTL ? "ب: التأثير المستمر" : "B: Continued Influence",
                subtitle: isRTL ? "(ليه «التصحيح» بيفشل)" : "(Why 'Correction' Fails)",
                icon: AlertTriangle,
                text: isRTL
                  ? "المعلومات المضللة بتفضل تأثر على التفكير حتى بعد ما يتم تصحيحها والاعتراف بالخطأ. لازم العقل يتجهّز مُقدماً؛ مدقق الحقائق اللي بيوصل بعد ما المعتقد الكاذب اترسّخ مش هيقدر يشيله بسهولة من الذاكرة. الاستجابة العاطفية بتكون حصلت خلاص."
                  : "Misinformation continues to influence reasoning even after acknowledged correction. The mind must be prepared in advance; a fact-checker arriving after a false belief is encoded cannot easily remove it from memory. The affective response has already occurred."
              },
              {
                title: isRTL ? "ج: نظرية العملية المزدوجة" : "C: Dual-Process Theory",
                subtitle: isRTL ? "(فين بيعيش الخداع)" : "(Where Deception Lives)",
                icon: Fingerprint,
                text: isRTL
                  ? "تفرقة دانيال كانمان بين النظام الأول (سريع/تلقائي) والنظام التاني (بطيء/متأني) هي بنية الخداع نفسها. كل تلاعب بيهاجم النظام الأول. منصتنا بتبني رد فعل في النظام الأول بيشغّل النظام التاني تلقائياً أول ما تظهر بصمة تلاعب."
                  : "Daniel Kahneman's distinction between System 1 (fast/automatic) and System 2 (slow/deliberate) is the architecture of deception. All manipulation attacks System 1. Our platform builds a System-1 reflex that automatically triggers System 2 when a manipulation signature appears."
              }
            ].map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="h-full p-8 rounded-3xl transition-colors group relative overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] transition-colors" style={{ background: "var(--accent-emerald-surface, var(--accent-mentalhealth-surface))" }} />
                  <pillar.icon className="w-10 h-10 mb-6" style={{ color: "var(--accent-emerald)" }} />
                  <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{pillar.title}</h3>
                  <p className="font-mono text-sm mb-6" style={{ color: "var(--accent-emerald)" }}>{pillar.subtitle}</p>
                  <p className="leading-relaxed text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>{pillar.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Verified Foundations */}
          <FadeIn delay={0.6}>
            <div className="mt-12 p-8 rounded-3xl backdrop-blur-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: "var(--accent-emerald)" }} />
                {isRTL ? "الأسس العلمية المُوثَّقة" : "Verified Scientific Baselines"}
              </h4>
              <ul className="space-y-4 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent-emerald)" }} />
                  <span><strong>MIT (2018):</strong> {isRTL ? "الأخبار الكاذبة بتنتشر بسرعة ~6 أضعاف الأخبار الحقيقية، واحتمال إعادة نشرها أعلى بـ 70%." : "False news spreads ~6× faster than true news, and is 70% more likely to be retweeted."}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent-emerald)" }} />
                  <span><strong>Stanford DIG:</strong> {isRTL ? "القراءة الجانبية (إنك تسيب صفحة المصدر عشان تحقق فيه) هي المهارة التشغيلية الأساسية لمدققي الحقائق المحترفين." : "Lateral Reading (leaving the source page to investigate) is the operational primary skill of professional fact-checkers."}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--accent-emerald)" }} />
                  <span><strong>SIFT & FLICC:</strong> {isRTL ? "نموذج SIFT (قف، حقّق، اعثر، تتبّع) ونموذج FLICC (خبراء مزيفون، مغالطات منطقية، توقعات مستحيلة، انتقاء انتقائي، نظريات مؤامرة) بيشكّلوا العمود الفقري لمهارات المستخدم في DeepReal." : "SIFT (Stop, Investigate, Find, Trace) and FLICC (Fake experts, Logical fallacies, Impossible expectations, Cherry-picking, Conspiracy theories) form our DeepReal user-facing skill spine."}</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* 0.2 Why Tools Cannot Win */}
        <section className="mb-40">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ color: "var(--text-primary)" }}>
                {isRTL ? "ليه «الأدوات» مش هتكسب" : "Why \"Tools\" Cannot Win"}
              </h2>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                {isRTL ? "برهان علمي في 5 خطوات عبر الطبقات السبعة لمنظومة المعلومات." : "A scientific proof in 5 steps across the 7 Layers of the Information Ecosystem."}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { layer: isRTL ? "الطبقة 1 (تلفيق صريح)" : "Layer 1 (Pure Fabrication)", desc: isRTL ? "مدققو الحقائق يقدروا يحطّوا تنبيه — لكن التنبيهات بتوصل بعد الاستجابة العاطفية. تأثير الاستمرار بيفضل موجود." : "Fact-checkers can flag — but flags arrive after the affective response. The continued influence effect remains." },
              { layer: isRTL ? "الطبقة 2 (عدسة منحازة)" : "Layer 2 (Biased Lens)", desc: isRTL ? "كل حقيقة قابلة للتحقق تقنياً. مدققو الحقائق لازم يحكموا بـ«صحيح» في حين إن الإطار بيقلب المعنى سراً." : "Every fact is technically verifiable. Fact-checkers must rule 'true' while the framing secretly inverts meaning." },
              { layer: isRTL ? "الطبقة 3 (نزع السياق)" : "Layer 3 (Decontextualization)", desc: isRTL ? "الاقتباس اتقال فعلاً. مدققو الحقائق بيأكدوه، ومن غير قصد بيصدّقوا الخداع." : "The quote was actually said. Fact-checkers confirm it, accidentally validating the deception." },
              { layer: isRTL ? "الطبقتان 4–5 (التسليح)" : "Layers 4–5 (Weaponization)", desc: isRTL ? "الحقيقة نفسها بتتسلّح عبر التوقيت أو الحجم. مفيش «حقيقة» فردية عشان تتراجع." : "Truth itself is weaponized via timing or scale. There is no individual 'fact' to check." },
              { layer: isRTL ? "الطبقتان 6–7 (الماتريكس)" : "Layers 6–7 (The Matrix)", desc: isRTL ? "المستخدم جوّه ماتريكس خوارزمي وعاطفي. لما تجيب له الحقائق بتهدد هويته، فبيحصل تأثير ارتدادي." : "The user is inside an algorithmic and emotional Matrix. Bringing them facts threatens their identity, causing the backfire effect." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-2xl group transition-colors" style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
                  <div className="px-4 py-2 font-mono text-sm rounded-xl whitespace-nowrap shadow-inner" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", color: "var(--accent-emerald)" }}>
                    {step.layer}
                  </div>
                  <p style={{ color: "var(--text-primary)" }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.6}>
              <div className="mt-8 p-6 rounded-2xl text-center" style={{ backgroundImage: "linear-gradient(to right, var(--accent-emerald-surface, var(--accent-mentalhealth-surface)), var(--accent-blue-surface, var(--accent-deepreal-surface)))", border: "1px solid var(--border-secondary)" }}>
                <p className="text-lg font-medium" style={{ color: "var(--accent-emerald)" }}>
                  {isRTL ? "الخلاصة: الإدراك بس هو اللي يقدر يهزم البنية. الوعي بس هو اللي يبني المناعة." : "Conclusion: Only cognition can defeat the architecture. Only awareness builds immunity."}
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PART 1 - Worldwide Standards */}
        <section>
          <FadeIn>
            <div className="flex items-center justify-between mb-12 pb-8" style={{ borderBottom: "1px solid var(--border-primary)" }}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
                  {isRTL ? "المواءمة مع المعايير العالمية" : "Worldwide Standards Alignment"}
                </h2>
                <p className="max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                  {isRTL ? "دي أقوى البروتوكولات على الأرض كلٌ في مجاله. احنا بنربط منصتنا بيها بشكل علني وتشفيري." : "These are the strongest protocols on Earth in their respective domains. We publicly and cryptographically bind our platform to every one of them."}
                </p>
              </div>
              <Globe className="w-16 h-16 hidden md:block" style={{ color: "var(--accent-emerald)", opacity: 0.2 }} />
            </div>
          </FadeIn>

          <div className="space-y-16">

            {/* Category: Truth & Verification */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                  <SearchIcon className="w-6 h-6" style={{ color: "var(--accent-blue)" }} />
                  {isRTL ? "الحقيقة، التحقق، الصحافة" : "Truth, Verification, Journalism"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="font-mono text-sm uppercase tracking-wider" style={{ borderBottom: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
                        <th className="py-4 px-4 font-medium">{isRTL ? "المعيار" : "Standard"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "الجهة" : "Authority"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "التزام الإنتاج" : "Production Mandate"}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm md:text-base" style={{ color: "var(--text-primary)" }}>
                      <TableRow std="IFCN Code of Principles" auth="Poynter Institute" mandate="Publish annual transparency report; corrections page must be one click from every article." />
                      <TableRow std="UNESCO MIL Framework" auth="UNESCO (2021)" mandate="Every DeepReal module maps to a UNESCO MIL competency code." />
                      <TableRow std="Journalism, Fake News Handbook" auth="UNESCO" mandate="Editorial workflow tied strictly to this handbook's verification practices." />
                      <TableRow std="Stanford COR" auth="Digital Inquiry Group" mandate="Pre/post assessments use the COR lateral reading rubric verbatim." />
                      <TableRow std="Truth Decay Model" auth="RAND Corp." mandate="Editorial training framed against the four trends of Truth Decay." />
                      <TableRow std="Infodemic Management Framework" auth="WHO" mandate="Mental Health engine maps to all five action areas (Listening, translation, etc)." />
                      <TableRow std="BBC Editorial Guidelines" auth="BBC / EBU" mandate="Editorial code is BBC-derived with explicit 'due accuracy' citation." />
                      <TableRow std="Mindframe / Samaritans" auth="AU / UK" mandate="Hard pre-publication audit gate on any mental-health content (no glamorization)." />
                      <TableRow std="C2PA Content Credentials" auth="Adobe, Microsoft, BBC" mandate="All platform-produced video/audio carries cryptographic C2PA signatures." />
                      <TableRow std="Responsible Synthetic Media" auth="Partnership on AI" mandate="Any AI-augmented content disclosed and labeled per PAI guidelines." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Mental Health */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                  <HeartPulse className="w-6 h-6" style={{ color: "var(--accent-red)" }} />
                  {isRTL ? "الصحة النفسية" : "Mental Health"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="font-mono text-sm uppercase tracking-wider" style={{ borderBottom: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
                        <th className="py-4 px-4 font-medium">{isRTL ? "المعيار" : "Standard"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "الجهة" : "Authority"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "التزام الإنتاج" : "Production Mandate"}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm md:text-base" style={{ color: "var(--text-primary)" }}>
                      <TableRow std="WHO mhGAP-IG v2.0" auth="WHO" mandate="Every condition page maps to its corresponding mhGAP module." />
                      <TableRow std="DSM-5-TR (2022)" auth="American Psychiatric Association" mandate="Each condition page explicitly cites its DSM-5-TR code." />
                      <TableRow std="ICD-11 Chapter 06" auth="WHO" mandate="Each condition page explicitly cites its ICD-11 code." />
                      <TableRow std="Mental Health First Aid" auth="MHFA International" mandate="'Mind First-Aid' course is strictly MHFA-aligned." />
                      <TableRow std="Mental Health Atlas" auth="WHO (2020/2024)" mandate="Egyptian baseline numbers cited from the official WHO Atlas." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Religion */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                  <BookOpen className="w-6 h-6" style={{ color: "var(--accent-amber)" }} />
                  {isRTL ? "الدين" : "Religion"}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="font-mono text-sm uppercase tracking-wider" style={{ borderBottom: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}>
                        <th className="py-4 px-4 font-medium">{isRTL ? "المعيار" : "Standard"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "الجهة" : "Authority"}</th>
                        <th className="py-4 px-4 font-medium">{isRTL ? "التزام الإنتاج" : "Production Mandate"}</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm md:text-base" style={{ color: "var(--text-primary)" }}>
                      <TableRow std="Wasatiyya methodology" auth="Al-Azhar al-Sharif" mandate="Mainstream moderation serves as the Religion Hub's philosophical anchor." />
                      <TableRow std="Maqāṣid al-Sharī'ah" auth="Classical Jurisprudence" mandate="Every religiously-sensitive feature is tested against the five higher objectives." />
                      <TableRow std="The Amman Message (2004)" auth="200+ Scholars" mandate="Religion Hub binds to the Three Points (8 madhāhib, restricting takfīr, fatwa conditions)." />
                      <TableRow std="Marrakesh Declaration (2016)" auth="250+ Muslim Leaders" mandate="Inter-religious content anchored to the rights of religious minorities." />
                      <TableRow std="ʿIlm al-Rijāl / Muṣṭalaḥ al-Ḥadīth" auth="Classical Hadith Sciences" mandate="The world's oldest anti-fabrication science is the spine of the anti-Layer-1 module." />
                      <TableRow std="Dar al-Iftāʾ al-Miṣriyya" auth="Egypt's Fatwa House" mandate="Platform refers users to Dar al-Iftāʾ; we NEVER issue fatwas." />
                      <TableRow std="Asbāb al-Nuzūl" auth="Classical Quranic Science" mandate="Occasions of revelation act as the canonical Layer-3 defense (Tafsir Literacy)." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Trust, Privacy, Accessibility */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
                  <Lock className="w-6 h-6" style={{ color: "var(--accent-indigo)" }} />
                  {isRTL ? "الثقة، الخصوصية، إمكانية الوصول" : "Trust, Privacy, Accessibility"}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl" style={{ background: "var(--accent-religionhub-surface)", border: "1px solid var(--border-primary)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>WCAG 2.2 AA (W3C)</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{isRTL ? "الحد الأدنى لإمكانية الوصول؛ إلزامي عبر كل واجهات المستخدم." : "Minimum accessibility baseline; mandatory across all user interfaces."}</p>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: "var(--accent-religionhub-surface)", border: "1px solid var(--border-primary)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>GDPR / ISO/IEC 27001</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{isRTL ? "أنظمة إدارة الخصوصية وأمن المعلومات؛ امتثال إلزامي." : "Privacy and information security management systems; mandatory compliance."}</p>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: "var(--accent-religionhub-surface)", border: "1px solid var(--border-primary)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Cochrane / GRADE</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{isRTL ? "مرجعنا النهائي لترتيب الأدلة العلمية لبيانات الصحة." : "Our definitive scientific evidence ranking authority for health data."}</p>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: "var(--accent-religionhub-surface)", border: "1px solid var(--border-primary)" }}>
                    <h4 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>Cochrane RoB 2</h4>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{isRTL ? "بنستخدمه لأي مراجعات منهجية داخلية لتقييم خطر التحيّز." : "Employed for any in-house systematic reviews to assess risk of bias."}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* PART 2 - The Source Hierarchy */}
        <section className="mt-40 pt-20" style={{ borderTop: "1px solid var(--border-primary)" }}>
          <SourcePyramid />
        </section>

      </div>
      <PageNavigation currentPath="/methodology" />
    </div>
  );
}

// Helpers
function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function TableRow({ std, auth, mandate }: { std: string, auth: string, mandate: string }) {
  return (
    <tr className="transition-colors" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <td className="py-4 px-4 font-semibold" style={{ color: "var(--accent-emerald)" }}>{std}</td>
      <td className="py-4 px-4 text-sm" style={{ color: "var(--text-secondary)" }}>{auth}</td>
      <td className="py-4 px-4" style={{ color: "var(--text-primary)" }}>{mandate}</td>
    </tr>
  );
}
