"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Microscope } from "lucide-react";
import { EvidenceCommandBoard } from "@/components/science/evidence-command-board";
import { ScientificIntelligenceCenter } from "@/components/research/scientific-intelligence-center";
import { ScienceExerciseTracker } from "@/components/science/science-exercise-tracker";
import ToolGuide from "@/components/ToolGuide";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function SciencePage() {
  // Brief highlight pulse on the exercise tracker when a ready scenario is launched,
  // so a zero-knowledge user can SEE where to press ▶ Start after the scroll.
  const [pulse, setPulse] = useState(false);

  function jumpToTracker() {
    if (typeof document === "undefined") return;
    document.getElementById("exercise-tracker")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 2000);
  }

  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <Microscope size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
              <span className="text-gradient">Science Hub</span>
              <span style={{ color: "var(--text-muted)", fontSize: "var(--font-body)", fontWeight: 600, marginInlineStart: 10 }} dir="rtl">
                مركز الثقافة العلمية
              </span>
            </h1>
            <p style={{ color: "var(--text-secondary)", margin: "4px 0 0", lineHeight: 1.6 }}>
              Tools to weigh evidence, spot statistical tricks, and stop a bad claim before you forward it — plus 33 hands-on
              exercises that train you to read research like a skeptic.
            </p>
            <p style={{ color: "var(--text-muted)", margin: "4px 0 0", lineHeight: 1.7 }} dir="rtl">
              أدوات تساعدك توزن الدليل، وتكشف الحيل الإحصائية، وتوقف الادعاء الغلط قبل ما تعمله شير — وكمان 33 تمرين عملي
              يدرّبوك تقرأ الأبحاث بعقل ناقد.
            </p>
          </div>
        </div>

        {/* ── Why this page exists — the point, stated plainly in both languages ── */}
        <div
          style={{
            marginBottom: 20,
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid color-mix(in srgb, var(--accent-cta) 22%, transparent)",
            background: "color-mix(in srgb, var(--accent-cta) 7%, transparent)",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>🎯</span>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>The point:</strong> most viral health, religion, and
            money claims fall apart the moment you ask <em>“what is the evidence, and how strong is it?”</em> This page
            gives you the habit and the drills. <span dir="rtl" style={{ display: "inline-block", marginInlineStart: 4 }}>
            الفكرة إن أغلب الادعاءات المنتشرة بتقع أول ما تسأل: «إيه الدليل، وقده إيه؟».</span>
          </p>
        </div>

        <section
          style={{
            marginBottom: 24,
            border: "1px solid var(--border-primary)",
            borderRadius: 24,
            padding: 24,
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-cta) 14%, transparent) 0%, transparent 32%), linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 95%, white 5%) 0%, color-mix(in srgb, var(--bg-card) 98%, transparent) 100%)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <BrainCircuit size={22} style={{ color: "var(--accent-cta)" }} />
            <strong>Project Vision & Cognition Framework</strong>
          </div>
          <p style={{ margin: "0 0 14px", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            The full CHUNK 7 route now lives here: 14 named cognitive biases, Egyptian misinformation patterns, and
            the verified quote set used to frame the project's awareness logic.
          </p>
          <Link
            href="/project-vision"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              background: "var(--accent-cta)",
              color: "var(--text-inverse)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open the framework
          </Link>
        </section>

        <EvidenceCommandBoard />
        <ScientificIntelligenceCenter />

        {/* ── How to use the 33 statistical-literacy exercises ── */}
        <div style={{ marginTop: 32, marginBottom: 4 }}>
          <ToolGuide
            accent="#eab308"
            titleEn="How to use the 33 statistical-literacy exercises"
            titleAr="إزاي تستخدم الـ 33 تمرين للثقافة الإحصائية"
            whoBenefits={{
              en: "Anyone in Egypt who reads news, health advice, or research summaries and wants to tell a solid finding from a statistical trick — students, journalists, doctors, teachers, and curious sharers.",
              ar: "أي حد في مصر بيقرأ أخبار أو نصايح صحية أو ملخّصات أبحاث وعايز يفرّق بين نتيجة قوية وحيلة إحصائية — طلبة وصحفيين ودكاترة ومدرّسين وأي حد بيعمل شير وعايز يتأكد.",
            }}
            steps={[
              { en: "Scroll to the “Statistical Literacy Exercises” tracker below. Each row is one short, self-contained drill (Day 3 → Day 35).", ar: "انزل لمتتبّع «تمارين الثقافة الإحصائية» تحت. كل صف تمرين قصير ومستقل بذاته (يوم 3 ← يوم 35)." },
              { en: "Pick a level with the filter tabs (Beginner / Intermediate / Advanced), then press ▶ Start on any exercise.", ar: "اختار مستوى من تابات الفلتر (مبتدئ / متوسّط / متقدّم)، وبعدين اضغط ▶ ابدأ على أي تمرين." },
              { en: "Answer each multiple-choice question. After you pick, the correct answer and a sourced explanation appear — read the 💡 note, that is where the learning is.", ar: "جاوب على كل سؤال اختيارات. بعد ما تختار، بيظهر الإجابة الصح وشرح بمصدر — اقرأ ملاحظة 💡، دي مكان التعلّم." },
              { en: "Finish a drill to mark it ✅. Your progress is saved on this device, so you can come back and continue any time.", ar: "خلّص التمرين عشان يتعلّم ✅. تقدّمك بيتحفظ على الجهاز ده، فتقدر ترجع وتكمّل في أي وقت." },
            ]}
            scenarios={[
              { label: "I keep seeing “p < 0.05 = proven”", labelAr: "بشوف دايمًا «p أقل من 0.05 = مثبت»", input: "tracker", tag: "p-values" },
              { label: "A chart “proved” a cause", labelAr: "رسم بياني «أثبت» سبب", input: "tracker", tag: "causation" },
              { label: "“9 out of 10 people improved”", labelAr: "«٩ من ١٠ اتحسّنوا»", input: "tracker", tag: "sampling" },
            ]}
            onTry={jumpToTracker}
          />
        </div>

        <div
          id="exercise-tracker"
          style={{
            borderRadius: 22,
            transition: "box-shadow 0.4s, outline-color 0.4s",
            outline: pulse ? "2px solid rgba(234,179,8,0.7)" : "2px solid transparent",
            boxShadow: pulse ? "0 0 0 6px rgba(234,179,8,0.14)" : "none",
          }}
        >
          <ScienceExerciseTracker />
        </div>
      </div>
      <PageNavigation currentPath="/science" />

      <PageAIChatbot
        pageTitle="Scientific Literacy Command — مركز الثقافة العلمية"
        pageContext="EAL Science Hub: Evidence hierarchy, trust logic, risk audiences, Egyptian misinformation patterns, 14 named cognitive biases, and awareness standard framework."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Scientific Literacy AI — an expert in evidence-based reasoning, Oxford Evidence Hierarchy, and Egyptian scientific misinformation patterns.

[LAYER 2 - EVIDENCE HIERARCHY]:
1. Systematic Reviews & Meta-Analyses (highest)
2. Randomized Controlled Trials (RCTs)
3. Cohort Studies
4. Case-Control Studies
5. Case Series / Case Reports
6. Expert Opinion (lowest)
7. Anecdotal Evidence (NOT evidence)

[LAYER 3 - SCIENTIFIC METHOD]:
- Hypothesis → Prediction → Experiment → Observation → Analysis → Peer Review
- Falsifiability (Popper): if it can't be proven wrong, it's not science
- Reproducibility: must be repeated by independent labs
- P-value literacy: p<0.05 ≠ "proof", it means <5% chance of random occurrence

[LAYER 4 - RULES]:
1. Explain evidence quality for any health or science claim
2. Identify pseudoscience markers (unfalsifiable, no peer review, appeals to nature)
3. Use Egyptian examples when possible
4. Respond in the user's language`}
        suggestedQuestions={[
          'إيه الفرق بين الدراسة العلمية والرأي الشخصي؟',
          'What makes a study "peer-reviewed"?',
          'إزاي أعرف إن المنتج دا علم زايف؟',
          'Explain p-values in simple terms',
        ]}
        accentColor="#8b5cf6"
        accentColorRgb="139,92,246"
      />
    </div>
  );
}
