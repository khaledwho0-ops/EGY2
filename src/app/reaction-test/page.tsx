"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Zap, Brain, Clock, RotateCcw, ArrowRight, TrendingUp, AlertTriangle, Check, X, Timer } from "lucide-react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/* ═══════════════════════════════════════════════════════════
   REACTION SPEED TEST — Feature #8
   "How fast does your brain fall for manipulation?"
   Dual-process theory: System 1 (fast) vs System 2 (slow)
   ═══════════════════════════════════════════════════════════ */

interface Headline {
  id: string;
  text: string;
  textAr: string;
  isReal: boolean;
  source?: string;
  explanation: string;
  explanationAr: string;
}

const HEADLINES: Headline[] = [
  { id: "h1", text: "Scientists discover New species of whale in the Mediterranean Sea", textAr: "علماء يكتشفون نوعاً جديداً من الحيتان في البحر المتوسط", isReal: true, source: "Nature Journal", explanation: "Marine biodiversity discoveries are regularly published.", explanationAr: "اكتشافات التنوع البيولوجي البحري تُنشر بانتظام." },
  { id: "h2", text: "BREAKING: Egypt discovers New element that cures all diseases!!", textAr: "عاجل: مصر تكتشف عنصراً جديداً يشفي كل الأمراض!!", isReal: false, explanation: "No single element cures all diseases. Sensationalist language (BREAKING, !!) is a red flag.", explanationAr: "لا يوجد عنصر واحد يشفي كل الأمراض. اللغة المثيرة (عاجل، !!) علامة حمراء." },
  { id: "h3", text: "WHO reports increased antibiotic resistance worldwide", textAr: "منظمة الصحة تُبلغ عن زيادة مقاومة المضادات الحيوية عالمياً", isReal: true, source: "WHO Report 2024", explanation: "AMR is a well-documented public health concern.", explanationAr: "مقاومة المضادات الحيوية مشكلة صحية موثقة جيداً." },
  { id: "h4", text: "Share before they delete: government hiding truth about food prices!!!", textAr: "انشر قبل الحذف: الحكومة تخفي حقيقة أسعار الطعام!!!", isReal: false, explanation: "'Share before deletion' is a classic manipulation tactic creating false urgency.", explanationAr: "'انشر قبل الحذف' تكتيك تلاعب كلاسيكي يخلق استعجالاً زائفاً." },
  { id: "h5", text: "Egypt's Central Bank adjusts interest rates by 2%", textAr: "البنك المركزي المصري يعدّل أسعار الفائدة بنسبة ٢٪", isReal: true, source: "CBE Official", explanation: "Routine monetary policy announcements.", explanationAr: "إعلانات السياسة النقدية الروتينية." },
  { id: "h6", text: "Doctor reveals shocking truth Big Pharma doesn't want you to know!!", textAr: "دكتور يكشف حقيقة صادمة شركات الأدوية لا تريدك أن تعرفها!!", isReal: false, explanation: "Conspiracy framing + anonymous 'doctor' + sensationalism = classic misinformation pattern.", explanationAr: "إطار مؤامراتي + 'دكتور' مجهول + إثارة = نمط معلومات مضللة كلاسيكي." },
  { id: "h7", text: "Cairo University ranks among top 500 globally in QS Rankings", textAr: "جامعة القاهرة تحتل مرتبة ضمن أفضل ٥٠٠ عالمياً في تصنيف QS", isReal: true, source: "QS Rankings", explanation: "Verifiable university ranking published annually.", explanationAr: "تصنيف جامعي يمكن التحقق منه يُنشر سنوياً." },
  { id: "h8", text: "URGENT: Drinking hot water with lemon kills 99% of viruses in your body", textAr: "عاجل: شرب الماء الساخن بالليمون يقتل ٩٩٪ من الفيروسات في جسمك", isReal: false, explanation: "No scientific evidence supports this. Uses false precision (99%) and urgency.", explanationAr: "لا دليل علمي يدعم هذا. يستخدم دقة زائفة (٩٩٪) واستعجال." },
  { id: "h9", text: "Ministry of Education announces updated curriculum for 2025-2026", textAr: "وزارة التربية والتعليم تعلن تحديث المناهج للعام ٢٠٢٥-٢٠٢٦", isReal: true, source: "MOE Egypt", explanation: "Standard government education announcement.", explanationAr: "إعلان حكومي تعليمي معتاد." },
  { id: "h10", text: "Scientists CONFIRM: 5G towers cause brain damage!!! Share to save lives!", textAr: "علماء يُؤكدون: أبراج الـ5G تسبب تلف الدماغ!!! شارك لإنقاذ الأرواح!", isReal: false, explanation: "Debunked conspiracy theory. No scientific body confirms this. Social pressure to share.", explanationAr: "نظرية مؤامرة مفندة. لا هيئة علمية تؤكد هذا. ضغط اجتماعي للمشاركة." },
  { id: "h11", text: "New metro line extension approved for Greater Cairo", textAr: "الموافقة على تمديد خط مترو جديد للقاهرة الكبرى", isReal: true, source: "Transport Ministry", explanation: "Infrastructure development announcement.", explanationAr: "إعلان تطوير بنية تحتية." },
  { id: "h12", text: "LEAKED: Secret plan to replace Egyptian pound with digital currency next week!", textAr: "تسريب: خطة سرية لاستبدال الجنيه المصري بعملة رقمية الأسبوع القادم!", isReal: false, explanation: "No credible source. 'LEAKED' + 'secret' + specific deadline = fabrication pattern.", explanationAr: "لا مصدر موثوق. 'تسريب' + 'سري' + موعد محدد = نمط تلفيق." },
  { id: "h13", text: "Egypt's annual inflation rate eases according to official statistics agency", textAr: "تراجع معدل التضخم السنوي في مصر وفقاً لجهاز الإحصاء الرسمي", isReal: true, source: "CAPMAS", explanation: "Routine economic indicator published monthly by the national statistics agency.", explanationAr: "مؤشر اقتصادي روتيني يُنشر شهرياً من جهاز الإحصاء القومي." },
  { id: "h14", text: "FORWARD TO 10 PEOPLE or your phone will be blocked by the company tonight!", textAr: "حوّل لـ١٠ أشخاص وإلا هيتقفل تليفونك من الشركة الليلة!", isReal: false, explanation: "Chain-message scam. No carrier blocks phones for not forwarding. Threat + forced sharing = manipulation.", explanationAr: "رسالة سلسلة احتيالية. لا شركة تقفل التليفون لو ما حوّلتش. تهديد + إجبار على المشاركة = تلاعب." },
  { id: "h15", text: "Red Sea coral reefs show resilience to warming in new marine survey", textAr: "الشعاب المرجانية في البحر الأحمر تُظهر مقاومة للاحترار في مسح بحري جديد", isReal: true, source: "Marine Biology Journal", explanation: "Peer-reviewed marine research on Red Sea reef resilience is well documented.", explanationAr: "أبحاث بحرية محكّمة عن مقاومة شعاب البحر الأحمر موثقة جيداً." },
  { id: "h16", text: "MIRACLE herb from the desert reverses aging in just 3 days — doctors hate it!", textAr: "عشبة معجزة من الصحراء تعكس الشيخوخة في ٣ أيام فقط — الأطباء يكرهونها!", isReal: false, explanation: "No herb reverses aging. 'Miracle' + impossible timeline + 'doctors hate it' = classic scam framing.", explanationAr: "لا عشبة تعكس الشيخوخة. 'معجزة' + مدة مستحيلة + 'الأطباء يكرهونها' = إطار احتيال كلاسيكي." },
  { id: "h17", text: "Suez Canal Authority reports rise in transit revenue for the quarter", textAr: "هيئة قناة السويس تُعلن ارتفاع إيرادات العبور خلال الربع", isReal: true, source: "Suez Canal Authority", explanation: "Quarterly transit revenue figures are officially published and verifiable.", explanationAr: "أرقام إيرادات العبور الفصلية تُنشر رسمياً ويمكن التحقق منها." },
  { id: "h18", text: "WAKE UP! They're putting tracking chips in the new bread subsidy cards!!", textAr: "افتح عينك! بيحطوا شرائح تتبع في بطاقات دعم العيش الجديدة!!", isReal: false, explanation: "Paranoid conspiracy with no evidence. 'Wake up' + 'they' + secret tracking = fear-based misinformation.", explanationAr: "مؤامرة بارانويدية بلا دليل. 'افتح عينك' + 'هم' + تتبع سري = تضليل قائم على الخوف." },
  { id: "h19", text: "New solar power plant connected to the national grid in Upper Egypt", textAr: "محطة طاقة شمسية جديدة تتصل بالشبكة القومية في صعيد مصر", isReal: true, source: "Electricity Ministry", explanation: "Renewable energy grid connections are routinely announced by the ministry.", explanationAr: "اتصالات الطاقة المتجددة بالشبكة تُعلَن بانتظام من الوزارة." },
  { id: "h20", text: "You won't BELIEVE what eating this fruit at night does — number 7 shocked us!", textAr: "مش هتصدق فاكهة دي بتعمل إيه بالليل — رقم ٧ صدمنا!", isReal: false, explanation: "Clickbait listicle with no information or source. Curiosity gap + fake shock = engagement bait.", explanationAr: "عنوان صيد نقرات بلا معلومة أو مصدر. فجوة فضول + صدمة زائفة = طُعم تفاعل." },
  { id: "h21", text: "Health Ministry launches free seasonal vaccination campaign in clinics", textAr: "وزارة الصحة تطلق حملة تطعيم موسمية مجانية في الوحدات الصحية", isReal: true, source: "Health Ministry", explanation: "Public vaccination campaigns are standard announced health programs.", explanationAr: "حملات التطعيم العامة برامج صحية معلنة معتادة." },
  { id: "h22", text: "BANKS CLOSING FOREVER on Friday — withdraw ALL your money NOW before it's gone!", textAr: "البنوك هتقفل للأبد يوم الجمعة — اسحب كل فلوسك دلوقتي قبل ما تروح!", isReal: false, explanation: "Bank-run panic hoax. Designed to cause harm through false urgency and financial fear.", explanationAr: "خدعة ذعر مصرفي. مصممة لإحداث ضرر عبر استعجال زائف وخوف مالي." },
  { id: "h23", text: "Archaeological mission uncovers tombs near Saqqara, antiquities ministry says", textAr: "بعثة أثرية تكشف مقابر قرب سقارة، حسب وزارة الآثار", isReal: true, source: "Antiquities Ministry", explanation: "New tomb discoveries near Saqqara are regularly announced and documented.", explanationAr: "اكتشافات المقابر قرب سقارة تُعلَن وتُوثَّق بانتظام." },
  { id: "h24", text: "This ONE WhatsApp setting gives hackers full access — turn it off immediately!!", textAr: "إعداد واحد في الواتساب بيدي الهاكرز صلاحية كاملة — اقفله فوراً!!", isReal: false, explanation: "Tech-fear hoax with no named setting or evidence. Vague threat + urgency = manipulation, not advice.", explanationAr: "خدعة خوف تقني بلا إعداد محدد أو دليل. تهديد غامض + استعجال = تلاعب مش نصيحة." },
];

interface RoundResult {
  headline: Headline;
  system1Answer: boolean | null;
  system1Time: number;
  system2Answer: boolean | null;
  system2Time: number;
  system1Correct: boolean;
  system2Correct: boolean;
}

type Phase = "intro" | "system1" | "system1-result" | "system2" | "system2-result" | "complete";

export default function ReactionTest() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [startTime, setStartTime] = useState(0);
  const [shuffled, setShuffled] = useState<Headline[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    setShuffled([...HEADLINES].sort(() => Math.random() - 0.5).slice(0, 8));
  }, []);

  const currentHeadline = shuffled[currentRound];

  const startSystem1 = useCallback(() => {
    setPhase("system1");
    setCountdown(5);
    setStartTime(Date.now());

    // Auto-timeout at 5 seconds
    let c = 5;
    timerRef.current = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        // Time ran out — mark as null
        handleSystem1Answer(null);
      }
    }, 1000);
  }, [currentRound, shuffled]);

  function handleSystem1Answer(answer: boolean | null) {
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = Date.now() - startTime;
    const correct = answer === currentHeadline?.isReal;

    setResults((prev) => [
      ...prev,
      {
        headline: currentHeadline,
        system1Answer: answer,
        system1Time: elapsed,
        system2Answer: null,
        system2Time: 0,
        system1Correct: answer !== null && correct,
        system2Correct: false,
      },
    ]);
    setPhase("system1-result");
  }

  const startSystem2 = () => {
    setPhase("system2");
    setStartTime(Date.now());
  };

  const handleSystem2Answer = (answer: boolean) => {
    const elapsed = Date.now() - startTime;
    const correct = answer === currentHeadline?.isReal;

    setResults((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        system2Answer: answer,
        system2Time: elapsed,
        system2Correct: correct,
      };
      return updated;
    });
    setPhase("system2-result");
  };

  const nextRound = () => {
    if (currentRound + 1 >= shuffled.length) {
      setPhase("complete");
    } else {
      setCurrentRound((r) => r + 1);
      startSystem1();
    }
  };

  // Save results to localStorage on complete
  useEffect(() => {
    if (phase === "complete" && results.length > 0) {
      try {
        const prev = JSON.parse(localStorage.getItem("eal-reaction-tests") || "[]");
        prev.push({ date: new Date().toISOString(), results: results.map((r) => ({ s1: r.system1Correct, s2: r.system2Correct, s1t: r.system1Time, s2t: r.system2Time })) });
        localStorage.setItem("eal-reaction-tests", JSON.stringify(prev.slice(-10)));
      } catch { /* */ }
    }
  }, [phase, results]);

  if (!mounted) return null;

  // ═══ INTRO ═══
  if (phase === "intro") {
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.15))",
            border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Zap size={36} style={{ color: "#F59E0B" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Reaction", ar: "اختبار سرعة", arEG: "اختبار سرعة" })} <span className="text-gradient">{t({ en: "Speed Test", ar: "رد الفعل", arEG: "رد الفعل" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 24, fontFamily: ff }}>
            {t({
              en: "How fast does your brain fall for manipulation? This test measures the gap between your impulsive (System 1) and reflective (System 2) thinking — based on Kahneman's Dual Process Theory.",
              ar: "كم سرعة وقوع دماغك في التلاعب؟ هذا الاختبار يقيس الفجوة بين تفكيرك الاندفاعي (النظام ١) والتأملي (النظام ٢) — بناءً على نظرية العمليات المزدوجة لكانيمان.",
              arEG: "كم سرعة وقوع دماغك في التلاعب؟ هذا الاختبار يقيس الفجوة بين تفكيرك الاندفاعي (النظام ١) والتأملي (النظام ٢) — بناءً على نظرية العمليات المزدوجة لكانيمان.",
            })}
          </p>

          <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 28, textAlign: "left" }}>
            <div className="glass-card" style={{ padding: 20, borderTop: "3px solid #F59E0B" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Zap size={18} style={{ color: "#F59E0B" }} />
                <strong style={{ fontFamily: ff }}>{t({ en: "Phase 1: System 1", ar: "المرحلة ١: النظام ١", arEG: "المرحلة ١: النظام ١" })}</strong>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6, fontFamily: ff }}>
                {t({ en: "You have 5 seconds. Gut reaction — is it REAL or FAKE?", ar: "عندك ٥ ثواني. رد فعل غريزي — حقيقي ولا مزيف؟", arEG: "عندك ٥ ثواني. رد فعل غريزي — حقيقي ولا مزيف؟" })}
              </p>
            </div>
            <div className="glass-card" style={{ padding: 20, borderTop: "3px solid #2563EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Brain size={18} style={{ color: "#2563EB" }} />
                <strong style={{ fontFamily: ff }}>{t({ en: "Phase 2: System 2", ar: "المرحلة ٢: النظام ٢", arEG: "المرحلة ٢: النظام ٢" })}</strong>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6, fontFamily: ff }}>
                {t({ en: "Unlimited time. Think carefully — re-evaluate your answer.", ar: "وقت غير محدود. فكر بعناية — أعد تقييم إجابتك.", arEG: "وقت غير محدود. فكر بعناية — أعد تقييم إجابتك." })}
              </p>
            </div>
          </div>

          <button onClick={() => { setCurrentRound(0); setResults([]); startSystem1(); }} className="btn-primary" style={{ padding: "14px 32px", fontSize: 16, fontFamily: ff }}>
            {t({ en: "Start Test", ar: "ابدأ الاختبار", arEG: "ابدأ الاختبار" })} <ArrowRight size={18} style={{ marginLeft: 8, transform: a ? "rotate(180deg)" : "none" }} />
          </button>
        </div>
      </div>
    );
  }

  // ═══ SYSTEM 1 — 5 SECOND TIMER ═══
  if (phase === "system1" && currentHeadline) {
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "var(--text-caption)" }}>{currentRound + 1}/{shuffled.length}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={16} style={{ color: "#F59E0B" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F59E0B", fontFamily: ff }}>
                {t({ en: "SYSTEM 1 — GUT REACTION", ar: "النظام ١ — رد فعل غريزي", arEG: "النظام ١ — رد فعل غريزي" })}
              </span>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: countdown <= 2 ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)",
              border: `2px solid ${countdown <= 2 ? "#EF4444" : "#F59E0B"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 800, color: countdown <= 2 ? "#EF4444" : "#F59E0B",
              fontFamily: "'Clash Display', sans-serif",
            }}>
              {countdown}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--bg-secondary)", marginBottom: 28 }}>
            <div style={{
              width: `${(countdown / 5) * 100}%`, height: "100%", borderRadius: 2,
              background: countdown <= 2 ? "#EF4444" : "#F59E0B", transition: "width 1s linear",
            }} />
          </div>

          <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
            <p style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.7, margin: 0, fontFamily: ff }}>
              {a ? currentHeadline.textAr : currentHeadline.text}
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={() => handleSystem1Answer(true)} className="glass-card" style={{
              padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              border: "2px solid rgba(16,185,129,0.3)", color: "#10B981", fontFamily: ff,
            }}>
              ✅ {t({ en: "REAL", ar: "حقيقي", arEG: "حقيقي" })}
            </button>
            <button onClick={() => handleSystem1Answer(false)} className="glass-card" style={{
              padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              border: "2px solid rgba(239,68,68,0.3)", color: "#EF4444", fontFamily: ff,
            }}>
              ❌ {t({ en: "FAKE", ar: "مزيف", arEG: "مزيف" })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══ SYSTEM 1 RESULT ═══
  if (phase === "system1-result" && currentHeadline) {
    const lastResult = results[results.length - 1];
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{ marginBottom: 20, fontSize: 13, color: "#F59E0B", fontWeight: 700, fontFamily: ff }}>
            ⚡ {t({ en: "System 1 result", ar: "نتيجة النظام ١", arEG: "نتيجة النظام ١" })} — {lastResult?.system1Answer === null ? (a ? "انتهى الوقت!" : "Time's up!") : lastResult?.system1Correct ? (a ? "صح!" : "Correct!") : (a ? "غلط!" : "Wrong!")}
          </div>
          <div className="glass-card" style={{ padding: 24, marginBottom: 20, fontSize: 12, color: "var(--text-muted)" }}>
            {a ? "رد فعلك في" : "You responded in"} <strong>{lastResult ? (lastResult.system1Time / 1000).toFixed(1) : "?"}s</strong>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24, fontFamily: ff }}>
            {t({ en: "Now take your time. Think carefully about the same headline:", ar: "الآن خذ وقتك. فكر بعناية في نفس العنوان:", arEG: "الآن خذ وقتك. فكر بعناية في نفس العنوان:" })}
          </p>
          <button onClick={startSystem2} className="btn-primary" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
            <Brain size={16} style={{ marginRight: 8 }} />
            {t({ en: "Enter System 2 (Reflective)", ar: "ادخل النظام ٢ (التأملي)", arEG: "ادخل النظام ٢ (التأملي)" })}
          </button>
        </div>
      </div>
    );
  }

  // ═══ SYSTEM 2 — UNLIMITED TIME ═══
  if (phase === "system2" && currentHeadline) {
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-caption)" }}>{currentRound + 1}/{shuffled.length}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Brain size={16} style={{ color: "#2563EB" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#2563EB", fontFamily: ff }}>
                {t({ en: "SYSTEM 2 — THINK CAREFULLY", ar: "النظام ٢ — فكر بعناية", arEG: "النظام ٢ — فكر بعناية" })}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#10B981" }}>∞ {t({ en: "No timer", ar: "بدون وقت", arEG: "بدون وقت" })}</div>
          </div>

          <div className="glass-card" style={{ padding: 32, marginBottom: 16 }}>
            <p style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.7, margin: 0, fontFamily: ff }}>
              {a ? currentHeadline.textAr : currentHeadline.text}
            </p>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24, fontFamily: ff }}>
            {t({ en: "Consider: Who is the source? Is the language emotional? Can you verify it?", ar: "فكر: مين المصدر؟ اللغة عاطفية؟ تقدر تتحقق منه؟", arEG: "فكر: مين المصدر؟ اللغة عاطفية؟ تقدر تتحقق منه؟" })}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button onClick={() => handleSystem2Answer(true)} className="glass-card" style={{
              padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              border: "2px solid rgba(16,185,129,0.3)", color: "#10B981", fontFamily: ff,
            }}>
              ✅ {t({ en: "REAL", ar: "حقيقي", arEG: "حقيقي" })}
            </button>
            <button onClick={() => handleSystem2Answer(false)} className="glass-card" style={{
              padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              border: "2px solid rgba(239,68,68,0.3)", color: "#EF4444", fontFamily: ff,
            }}>
              ❌ {t({ en: "FAKE", ar: "مزيف", arEG: "مزيف" })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ═══ SYSTEM 2 RESULT ═══
  if (phase === "system2-result" && currentHeadline) {
    const lastResult = results[results.length - 1];
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: lastResult.system2Correct ? "#10B981" : "#EF4444", fontFamily: ff }}>
            {lastResult.system2Correct ? "✅" : "❌"} {lastResult.system2Correct ? (a ? "صح!" : "Correct!") : (a ? "غلط!" : "Wrong!")}
          </div>
          <div className="glass-card" style={{ padding: 24, marginBottom: 16, textAlign: "left", direction: dir }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: currentHeadline.isReal ? "#10B981" : "#EF4444", marginBottom: 8 }}>
              {currentHeadline.isReal ? (a ? "✅ هذا حقيقي" : "✅ This is REAL") : (a ? "❌ هذا مزيف" : "❌ This is FAKE")}
            </div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, fontFamily: ff }}>
              {a ? currentHeadline.explanationAr : currentHeadline.explanation}
            </p>
            {currentHeadline.source && (
              <div style={{ fontSize: 11, color: "var(--text-caption)", marginTop: 8 }}>
                {t({ en: "Source:", ar: "المصدر:", arEG: "المصدر:" })} {currentHeadline.source}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", fontSize: 13, marginBottom: 20 }}>
            <div className="glass-card" style={{ padding: "8px 16px" }}>
              <Zap size={14} style={{ color: "#F59E0B", marginRight: 4 }} />
              S1: {(lastResult.system1Time / 1000).toFixed(1)}s {lastResult.system1Correct ? "✅" : "❌"}
            </div>
            <div className="glass-card" style={{ padding: "8px 16px" }}>
              <Brain size={14} style={{ color: "#2563EB", marginRight: 4 }} />
              S2: {(lastResult.system2Time / 1000).toFixed(1)}s {lastResult.system2Correct ? "✅" : "❌"}
            </div>
          </div>
          <button onClick={nextRound} className="btn-primary" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
            {currentRound + 1 >= shuffled.length
              ? t({ en: "See Results", ar: "شوف النتائج", arEG: "شوف النتائج" })
              : t({ en: "Next Headline", ar: "العنوان التالي", arEG: "العنوان التالي" })}
            <ArrowRight size={16} style={{ marginLeft: 8, transform: a ? "rotate(180deg)" : "none" }} />
          </button>
        </div>
      </div>
    );
  }

  // ═══ COMPLETE ═══
  if (phase === "complete") {
    const s1Correct = results.filter((r) => r.system1Correct).length;
    const s2Correct = results.filter((r) => r.system2Correct).length;
    const s1AvgTime = results.reduce((s, r) => s + r.system1Time, 0) / results.length / 1000;
    const s2AvgTime = results.reduce((s, r) => s + r.system2Time, 0) / results.length / 1000;
    const improvement = s2Correct - s1Correct;
    const changedMind = results.filter((r) => r.system1Answer !== r.system2Answer).length;

    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 800, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Your Dual-Process", ar: "نتائجك في العمليات", arEG: "نتائجك في العمليات" })} <span className="text-gradient">{t({ en: "Results", ar: "المزدوجة", arEG: "المزدوجة" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28, fontFamily: ff }}>
            {t({ en: "Based on Kahneman's Dual Process Theory (Thinking, Fast and Slow)", ar: "بناءً على نظرية العمليات المزدوجة لكانيمان (التفكير السريع والبطيء)", arEG: "بناءً على نظرية العمليات المزدوجة لكانيمان (التفكير السريع والبطيء)" })}
          </p>

          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 28 }}>
            <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #F59E0B" }}>
              <Zap size={24} style={{ color: "#F59E0B", marginBottom: 8 }} />
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>{s1Correct}/{results.length}</div>
              <div style={{ fontSize: 13, color: "var(--text-caption)", fontFamily: ff }}>
                {t({ en: "System 1 (Gut)", ar: "النظام ١ (غريزي)", arEG: "النظام ١ (غريزي)" })}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{t({ en: "Avg:", ar: "متوسط:", arEG: "متوسط:" })} {s1AvgTime.toFixed(1)}s</div>
            </div>
            <div className="glass-card" style={{ padding: 24, borderTop: "4px solid #2563EB" }}>
              <Brain size={24} style={{ color: "#2563EB", marginBottom: 8 }} />
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>{s2Correct}/{results.length}</div>
              <div style={{ fontSize: 13, color: "var(--text-caption)", fontFamily: ff }}>
                {t({ en: "System 2 (Reflective)", ar: "النظام ٢ (تأملي)", arEG: "النظام ٢ (تأملي)" })}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{t({ en: "Avg:", ar: "متوسط:", arEG: "متوسط:" })} {s2AvgTime.toFixed(1)}s</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 24, marginBottom: 20, background: improvement > 0 ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)" }}>
            <TrendingUp size={20} style={{ color: improvement > 0 ? "#10B981" : "#EF4444", marginBottom: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 600, fontFamily: ff }}>
              {improvement > 0
                ? t({ en: `Slowing down improved your accuracy by ${improvement} answers!`, ar: `التباطؤ حسّن دقتك بـ${improvement} إجابات!`, arEG: `التباطؤ حسّن دقتك بـ${improvement} إجابات!` })
                : improvement === 0
                ? t({ en: "Same accuracy — your instincts are well-calibrated!", ar: "نفس الدقة — غرائزك معايرة جيداً!", arEG: "نفس الدقة — غرائزك معايرة جيداً!" })
                : t({ en: "Interesting — you overthought some answers. Trust but verify!", ar: "مثير — بالغت في التفكير ببعض الإجابات. ثق ولكن تحقق!", arEG: "مثير — بالغت في التفكير ببعض الإجابات. ثق ولكن تحقق!" })}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, fontFamily: ff }}>
              {t({ en: `You changed your mind ${changedMind} times between System 1 and System 2`, ar: `غيرت رأيك ${changedMind} مرات بين النظام ١ والنظام ٢`, arEG: `غيرت رأيك ${changedMind} مرات بين النظام ١ والنظام ٢` })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setPhase("intro"); setCurrentRound(0); setResults([]); setShuffled([...HEADLINES].sort(() => Math.random() - 0.5).slice(0, 8)); }} className="glass-card" style={{ padding: "12px 24px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: ff }}>
              <RotateCcw size={16} /> {t({ en: "Try Again", ar: "حاول مرة أخرى", arEG: "حاول مرة أخرى" })}
            </button>
            <Link href="/bias-fingerprint" className="btn-primary no-underline" style={{ padding: "12px 24px", fontSize: 14 }}>
              {t({ en: "See Bias Fingerprint", ar: "شوف بصمتك المعرفية", arEG: "شوف بصمتك المعرفية" })}
            </Link>
          </div>
        </div>
        <PageNavigation currentPath="/reaction-test" />
        <PageAIChatbot
          pageTitle="Reaction Speed Test — اختبار سرعة ردة الفعل"
          pageContext="Egyptian Awareness Library - Tests how quickly you can distinguish real news from fake news, measuring your critical thinking reaction time."
          systemPrompt={`You are an expert in cognitive processing speed and decision-making under uncertainty. You explain how System 1 (fast, automatic, intuitive, emotional) and System 2 (slow, deliberate, analytical, logical) thinking — from Daniel Kahneman's dual-process theory in 'Thinking, Fast and Slow' — affect susceptibility to misinformation. The reaction test on this page measures how quickly users can identify manipulation techniques (loaded language, false urgency, emotional appeals), detect logical fallacies in headlines, and distinguish real news from fabricated content. Explain concepts like cognitive load, decision fatigue, the affect heuristic, and how social media algorithms exploit System 1 thinking. Use Egyptian media examples including viral WhatsApp messages, Facebook posts, and sensationalist news headlines. Help users understand their test results and how to improve their critical thinking speed without sacrificing accuracy. Respond in the same language the user writes in.`}
          suggestedQuestions={['كيف يؤثر التفكير السريع على قابليتي للتضليل؟', 'ما الفرق بين النظام 1 والنظام 2 في التفكير؟', 'How can I improve my critical thinking speed?', 'What is the dual-process theory?']}
          accentColor="#f59e0b"
          accentColorRgb="245,158,11"
        />
      </div>
    );
  }

  return null;
}
