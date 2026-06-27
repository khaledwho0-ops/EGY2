"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, HeartPulse, Shield, Activity, Target, Flame, Database, Crosshair, RefreshCw, Sliders, Zap, CheckCircle2 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

export function EngineOneUI() {
  const { isRTL, t } = useRTL();
  const [activeStage, setActiveStage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- STAGE 1 STATE: Amygdala Hijack ---
  const [threatLevel, setThreatLevel] = useState(30);
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootStep, setRebootStep] = useState(0);

  // --- STAGE 2 STATE: Somatic Mapping ---
  const [activeSomaticCard, setActiveSomaticCard] = useState<string | null>(null);
  const [rewrittenCards, setRewrittenCards] = useState<string[]>([]);

  // --- STAGE 3 STATE: Cultural Firewall ---
  const [extractedNodes, setExtractedNodes] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // --- STAGE 4 STATE: Ego Decoupling ---
  const [egoMode, setEgoMode] = useState<"defensive" | "decoupled">("defensive");
  const [activeAttack, setActiveAttack] = useState<string | null>(null);
  const [gaugeValue, setGaugeValue] = useState(0);

  // --- STAGE 5 STATE: Math Solver ---
  const [triggerVal, setTriggerVal] = useState(5);
  const [biologyVal, setBiologyVal] = useState(6);
  const [cultureVal, setCultureVal] = useState(7);
  const [awarenessVal, setAwarenessVal] = useState(2);

  // --- Scroll Snapping and Detection ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = document.querySelectorAll(".engine-stage");
      let currentIdx = 1;
      
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          currentIdx = idx + 1;
        }
      });
      
      if (currentIdx !== activeStage) {
        setActiveStage(currentIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStage]);

  // --- Amygdala Reboot Animation ---
  const triggerReboot = () => {
    if (isRebooting) return;
    setIsRebooting(true);
    setRebootStep(1); // Inhale
    
    setTimeout(() => {
      setRebootStep(2); // Hold
      setTimeout(() => {
        setRebootStep(3); // Exhale
        setTimeout(() => {
          setThreatLevel(0);
          setIsRebooting(false);
          setRebootStep(0);
        }, 3000);
      }, 3000);
    }, 3000);
  };

  // --- Ego Gauge Physics ---
  useEffect(() => {
    if (activeAttack) {
      if (egoMode === "defensive") {
        setGaugeValue(100);
      } else {
        setGaugeValue(0);
      }
    } else {
      setGaugeValue(0);
    }
  }, [activeAttack, egoMode]);

  // --- Math distress calculation ---
  const emotionalDistress = Math.max(
    0.1,
    Math.round(((triggerVal * (biologyVal + cultureVal)) / awarenessVal) * 10) / 10
  );

  return (
    <div 
      ref={containerRef}
      className="engine-one-container font-sans text-white"
      style={{ 
        paddingTop: "var(--navbar-height)", 
        direction: isRTL ? "rtl" : "ltr",
        background: "#08080C", // Deep premium dark background
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Dynamic Nav Indicator */}
      <div 
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
        style={{ right: isRTL ? "6px" : "auto", left: isRTL ? "auto" : "6px" }}
      >
        {[1, 2, 3, 4, 5].map((stage) => (
          <button
            key={stage}
            onClick={() => {
              const el = document.getElementById(`mental-stage-${stage}`);
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStage === stage ? 'bg-emerald-500 scale-125 shadow-[0_0_12px_#10B981]' : 'bg-white/20 hover:bg-white/40'}`}
            title={`Stage ${stage}`}
            aria-label={`Go to Stage ${stage}`}
          />
        ))}
      </div>

      {/* --- STAGE 1: DIAGNOSTIC (The Amygdala Hijack) --- */}
      <section 
        id="mental-stage-1"
        className="engine-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 1 ? "radial-gradient(circle at center, rgba(239,68,68,0.06) 0%, #08080C 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-red-500/10 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]`}>
              <Flame size={28} className="text-red-500 animate-pulse" />
            </div>
            <h4 className="text-red-500 font-mono tracking-widest uppercase text-xs mb-3">Stage 01: Diagnostic</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              {isRTL ? "تشخيص تحت الصفر: اختطاف اللوزة الدماغية" : "Below Zero Diagnostic: The Amygdala Hijack"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed font-light text-base md:text-lg">
              {isRTL 
                ? "عندما يواجه الإنسان تهديداً نفسياً أو تعنيفاً روحياً، تتولى اللوزة الدماغية (مركز الخوف البدائي) القيادة المطلقة. تنشط استجابة الكر والفر البيولوجية، مما يؤدي إلى إغلاق القشرة الجبهية المسؤولة عن المنطق والنقد كلياً."
                : "When exposed to a psychological threat or spiritual coercion, the Amygdala (the brain's primal fear center) takes absolute control. A biological fight-or-flight response initiates, completely shutting down the Prefrontal Cortex (PFC) responsible for logic and critique."}
            </p>

            <div className="glass-card p-5 border-l-4 border-red-500 bg-red-950/10 rounded-r-xl">
              <h5 className="text-red-400 font-bold mb-1.5 flex items-center gap-2">
                <Zap size={16} />
                {isRTL ? "قاعدة الفهم الأساسية" : "The Core Axiom"}
              </h5>
              <p className="text-sm text-white/80 leading-relaxed">
                {isRTL 
                  ? "أنت لا تفكر عندما تكون خائفاً؛ أنت تنفذ فقط ما تشعر أنه يضمن نجاتك. هدفنا الأول هو تدريبك على استشعار هذا الاختطاف بيولوجياً ثم إعادة تشغيل منطقك يدوياً."
                  : "You do not think when you are terrified; you simply react to survive. Our first goal is to train you to physically sense this hijack, and manually reboot your logic center."}
              </p>
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3">
              <span className="font-mono text-xs text-white/50">COGNITIVE BIOMETRICS SIMULATOR</span>
              <Activity className={threatLevel > 60 ? "text-red-500 animate-pulse" : "text-emerald-500"} size={16} />
            </div>

            {/* Interactive Brain Map (SVG) */}
            <div className="flex justify-center mb-6 relative">
              <svg viewBox="0 0 200 120" className="w-full max-w-[280px]">
                {/* Brain Outline */}
                <path 
                  d="M50,60 C40,40 60,10 100,10 C140,10 160,30 160,50 C175,60 170,80 155,90 C150,105 130,110 100,110 C60,110 40,90 50,60 Z" 
                  fill="none" 
                  stroke={threatLevel > 60 ? "rgba(239, 68, 68, 0.4)" : "rgba(16, 185, 129, 0.4)"} 
                  strokeWidth="2"
                  className="transition-colors duration-500"
                />
                
                {/* Prefrontal Cortex (PFC) */}
                <circle 
                  cx="145" 
                  cy="50" 
                  r={isRebooting && rebootStep === 1 ? "14" : "10"} 
                  fill={isRebooting ? "rgba(16, 185, 129, 0.6)" : (threatLevel > 60 ? "rgba(107, 114, 128, 0.3)" : "rgba(59, 130, 246, 0.6)")}
                  className="transition-all duration-500 cursor-help"
                />
                <text x="145" y="52" fill="#fff" fontSize="6" fontWeight="bold" textAnchor="middle">PFC</text>

                {/* Amygdala */}
                <circle 
                  cx="95" 
                  cy="65" 
                  r={threatLevel > 60 ? "12" : "7"} 
                  fill={threatLevel > 60 ? "rgba(239, 68, 68, 0.8)" : "rgba(245, 158, 11, 0.6)"}
                  className={`transition-all duration-500 ${threatLevel > 60 ? 'animate-ping' : ''}`}
                  style={{ transformOrigin: "95px 65px" }}
                />
                <circle 
                  cx="95" 
                  cy="65" 
                  r="7" 
                  fill={threatLevel > 60 ? "rgba(239, 68, 68, 0.9)" : "rgba(245, 158, 11, 0.8)"}
                  className="transition-all duration-500"
                />
                <text x="95" y="77" fill="rgba(255,255,255,0.7)" fontSize="6" fontWeight="mono" textAnchor="middle">
                  {isRTL ? "اللوزة" : "Amygdala"}
                </text>

                {/* Coercion / Threat wave lines */}
                {threatLevel > 30 && (
                  <path 
                    d="M 95,65 Q 120,55 145,50" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="2" 
                    strokeDasharray="4 4"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                )}
              </svg>

              {/* Status Banner overlay */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 rounded border border-white/10 text-xs font-mono text-center min-w-[200px]">
                {isRebooting ? (
                  <span className="text-emerald-400">
                    {rebootStep === 1 && (isRTL ? "💨 شهيق عميق... (3 ثوان)" : "💨 Inhale Deeply... (3s)")}
                    {rebootStep === 2 && (isRTL ? "🛑 احبس النفس... (3 ثوان)" : "🛑 Hold Breath... (3s)")}
                    {rebootStep === 3 && (isRTL ? "💨 زفير بطيء... (3 ثوان)" : "💨 Exhale Slowly... (3s)")}
                  </span>
                ) : threatLevel > 60 ? (
                  <span className="text-red-400 animate-pulse">{isRTL ? "🔴 اختطاف! التفكير العقلاني متوقف" : "🔴 HIJACKED! LOGIC SYSTEM OFFLINE"}</span>
                ) : (
                  <span className="text-emerald-400">{isRTL ? "🟢 مستقر: القشرة الجبهية نشطة" : "🟢 STABLE: LOGIC SYSTEM ONLINE"}</span>
                )}
              </div>
            </div>

            {/* Slider to adjust trigger level */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span>{isRTL ? "حجم التهديد الخارجي:" : "Manipulator Threat Intensity:"}</span>
                <span className={threatLevel > 60 ? "text-red-400 font-bold" : "text-white/70"}>{threatLevel}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={threatLevel} 
                onChange={(e) => setThreatLevel(Number(e.target.value))}
                disabled={isRebooting}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Manual reboot trigger */}
            <button
              onClick={triggerReboot}
              disabled={isRebooting || threatLevel === 0}
              className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${threatLevel === 0 ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]'}`}
            >
              <RefreshCw size={16} className={isRebooting ? "animate-spin" : ""} />
              {isRTL ? "تفعيل بروتوكول التنفس لإعادة التشغيل" : "Manually Reboot PFC (Breathing Protocol)"}
            </button>
          </div>
        </div>
      </section>

      {/* --- STAGE 2: COGNITIVE REWRITE I (Biological Literacy vs. Spiritual Gaslighting) --- */}
      <section 
        id="mental-stage-2"
        className="engine-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 2 ? "radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, #08080C 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Interactive Somatic Mapping Chamber */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "chest", label: t({ en: "Chest Tightness", ar: "ضيق الصدر" }), emoji: "🫁", gas: t({ en: "Punishment from God / Lack of faith", ar: "غضب وعقاب من الله بسبب تقصيرك" }), somatic: t({ en: "Cortisol spike / Sympathetic nerve activation", ar: "ارتفاع الكورتيزول وتنشيط الجهاز العصب الودّي" }) },
                { id: "dopamine", label: t({ en: "Dopamine Crash", ar: "خمول الدوبامين" }), emoji: "💤", gas: t({ en: "Spiritual hypocrisy (Nifaq)", ar: "علامة على النفاق وضعف الإرادة" }), somatic: t({ en: "Neurochemical depletion / Rest needed", ar: "استنفاد النواقل العصبية / أمانة الجسد تتطلب الراحة" }) },
                { id: "heart", label: t({ en: "Rapid Heart Rate", ar: "خفقان سريع" }), emoji: "💓", gas: t({ en: "Devil possession / Jinn threat", ar: "مس شيطاني أو تلبس جن" }), somatic: t({ en: "Adrenaline response to stressful triggers", ar: "استجابة الأدرينالين للمثيرات الضاغطة" }) },
                { id: "sweat", label: t({ en: "Cold Sweats", ar: "عرق بارد" }), emoji: "🥶", gas: t({ en: "Evil eye (Hasad) effect", ar: "تأثير عين حاسدة أصابتك" }), somatic: t({ en: "Vasoconstriction during panic surge", ar: "انقباض الأوعية الدموية أثناء نوبة الهلع" }) }
              ].map((card) => {
                const isSelected = activeSomaticCard === card.id;
                const isRewritten = rewrittenCards.includes(card.id);
                return (
                  <button
                    key={card.id}
                    onClick={() => setActiveSomaticCard(card.id)}
                    className={`glass-card p-5 text-center transition-all duration-300 rounded-2xl border flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer ${isSelected ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : (isRewritten ? 'border-emerald-900 bg-emerald-950/5' : 'border-white/10 bg-black/20')}`}
                  >
                    <span className="text-3xl">{card.emoji}</span>
                    <strong className="block text-sm">{card.label}</strong>
                    {isRewritten && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {isRTL ? "تمت إعادة الصياغة" : "REWRITTEN"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Rewriting Interface Panel */}
            {activeSomaticCard && (
              <div className="glass-card mt-6 p-5 border border-emerald-500/20 bg-emerald-950/10 rounded-2xl animate-fadeIn">
                {(() => {
                  const cardData = [
                    { id: "chest", label: t({ en: "Chest Tightness", ar: "ضيق الصدر" }), gas: t({ en: "Punishment from God / Lack of faith", ar: "غضب وعقاب من الله بسبب تقصيرك" }), somatic: t({ en: "Cortisol spike / Sympathetic nerve activation. This body is an Amanah; treat it clinically, not superstitiously.", ar: "ارتفاع الكورتيزول وتنشيط الجهاز العصب الودّي. هذا الجسد أمانة، تعامل معه طبياً لا بخرافة." }) },
                    { id: "dopamine", label: t({ en: "Dopamine Crash", ar: "خمول الدوبامين" }), gas: t({ en: "Spiritual hypocrisy (Nifaq)", ar: "علامة على النفاق وضعف الإرادة" }), somatic: t({ en: "Neurochemical depletion. Rest is a form of worship (Ibadah). Neutralize fake sheikhs who tell you to 'pray away' clinical conditions.", ar: "استنفاد النواقل العصبية. الراحة هي شكل من العبادة. أبطل حجج أدعياء الرقية الذين يمنعون العلاج الطبي." }) },
                    { id: "heart", label: t({ en: "Rapid Heart Rate", ar: "خفقان سريع" }), gas: t({ en: "Devil possession / Jinn threat", ar: "مس شيطاني أو تلبس جن" }), somatic: t({ en: "Adrenaline response to stressful triggers. A physiological defense mechanism, not a metaphysical entity.", ar: "استجابة الأدرينالين للمثيرات الضاغطة. آليات دفاع فسيولوجية طبيعية، وليست كياناً غيبياً." }) },
                    { id: "sweat", label: t({ en: "Cold Sweats", ar: "عرق بارد" }), gas: t({ en: "Evil eye (Hasad) effect", ar: "تأثير عين حاسدة أصابتك" }), somatic: t({ en: "Vasoconstriction during panic surge. Your nervous system is recalibrating. Ground yourself and breathe.", ar: "انقباض الأوعية الدموية أثناء الهلع. جهازك العصبي يعيد التوازن. ركّز في محيطك وتنفس." }) }
                  ].find(c => c.id === activeSomaticCard)!;

                  const isRewritten = rewrittenCards.includes(activeSomaticCard);

                  return (
                    <div>
                      <h5 className="text-emerald-400 font-bold mb-3 flex items-center justify-between">
                        <span>{cardData.label}</span>
                        <span className="text-xs font-mono text-white/40">COGNITIVE REWRITE LAB</span>
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                        <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl">
                          <strong className="text-red-400 block mb-1">{isRTL ? "❌ التفسير الخرافي/المُقهر:" : "❌ Spiritual Gaslighting:"}</strong>
                          <p className="text-white/60">{cardData.gas}</p>
                        </div>
                        <div className={`p-3 rounded-xl border transition-all duration-500 ${isRewritten ? 'bg-emerald-950/40 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                          <strong className="text-emerald-400 block mb-1">{isRTL ? "✅ التفسير العلمي/البيولوجي:" : "✅ Somatic Rewiring:"}</strong>
                          <p className={isRewritten ? "text-white" : "text-white/40"}>
                            {isRewritten ? cardData.somatic : (isRTL ? "اضغط على زر إعادة الهيكلة للدمج..." : "Click rewrite below to integrate...")}
                          </p>
                        </div>
                      </div>
                      {!isRewritten && (
                        <button
                          onClick={() => {
                            setRewrittenCards([...rewrittenCards, activeSomaticCard]);
                          }}
                          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-xl font-bold transition-all"
                        >
                          {isRTL ? "إعادة كتابة المسار العصبي 🧠" : "Rewrite Neural Pathway 🧠"}
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="order-1 md:order-2">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]`}>
              <HeartPulse size={28} className="text-emerald-400" />
            </div>
            <h4 className="text-emerald-500 font-mono tracking-widest uppercase text-xs mb-3">Stage 02: Somatic Literacy</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              {isRTL ? "محو الأمية البيولوجية ضد التلاعب الروحي" : "Biological Literacy vs. Spiritual Gaslighting"}
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed font-light text-base md:text-lg">
              <p>
                {isRTL 
                  ? "المتلاعبون بالرموز الدينية يستغلون جهلك ببيولوجيتك. إذا أصابك ضيق تنفس أو نوبة هلع، يخبرونك بأن هذا بسبب قلة خشوعك أو غضب الله عليك. هذا الخلط يدمر الصحة النفسية ويزرع شعوراً ساحقاً بالذنب."
                  : "Manipulators exploit somatic ignorance. When you experience anxiety or a dopamine crash, they frame it as a spiritual failure or divine punishment. This toxic conflation creates deep existential shame."}
              </p>
              <p>
                {isRTL 
                  ? "عندما تدرك بيولوجيتك، تفصل الروحاني عن المرض العضوي. علاج الدوبامين أو القلق يصبح عملاً من أعمال عبادة الله والمحافظة على أمانة الجسد، وتتبدد قوة المدعين."
                  : "By learning somatic literacy, you decouple biology from spirituality. Restoring your neurochemistry becomes a clinical duty and an act of worship (preserving the trust of the body), stripping fake healers of their authority."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STAGE 3: COGNITIVE REWRITE II (The Cultural Firewall) --- */}
      <section 
        id="mental-stage-3"
        className="engine-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 3 ? "radial-gradient(circle at center, rgba(245,158,11,0.05) 0%, #08080C 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-amber-500/10 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]`}>
              <Shield size={28} className="text-amber-500" />
            </div>
            <h4 className="text-amber-500 font-mono tracking-widest uppercase text-xs mb-3">Stage 03: Cultural Firewall</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              {isRTL ? "جدار الحماية الثقافي: استئصال العرف السام" : "The Cultural Firewall: Extracting Toxic Custom"}
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed font-light text-base md:text-lg">
              <p>
                {isRTL 
                  ? "أعظم اختراق نفسي في المجتمعات الشرقية هو دمج العيب المجتمعي بالحرام الإلهي. يُقمع الأفراد باسم الدين بينما الحافز الحقيقي هو العادات والتقاليد المتوارثة بشكل أعمى."
                  : "The greatest cognitive vulnerability is fusing societal custom ('Urf/Ayb) with divine prohibition (Haram). Manipulators package cultural control in religious labels to prevent rebellion."}
              </p>
              <p>
                {isRTL 
                  ? "يبني المحرك جدار حماية يجبرك على التمييز: هل هذا التحكم نابع من نصوص الوحي الموثقة، أم أنه مجرد خوف على الهوية الجمعية وتكريس لسلطة الآباء؟"
                  : "The Cultural Firewall filters inputs: Is this demand rooted in authentic, documented scripture, or is it a mechanism of social conformity and parental ownership?"}
              </p>
            </div>
          </div>

          {/* Interactive Extraction Panel */}
          <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl">
            <h5 className="text-sm font-mono text-white/50 mb-6 flex justify-between">
              <span>SURGICAL CULTURAL EXTRACTOR</span>
              <span>{extractedNodes.length} / 3 EXTRACTED</span>
            </h5>

            <div className="grid gap-4 mb-6">
              {[
                { id: "ayb", label: t({ en: "Social Shame ('Ayb) wrapped in Fatawa", ar: "خلط 'العيب المجتمعي' بالحرام الديني لفرض السيطرة" }), clean: t({ en: "Core Dignity & Free Will. Religion demands personal integrity, not fear of people.", ar: "حرية الاختيار والكرامة الإنسانية. الدين يحاسب الفرد أمام ربه، لا خوفاً من الناس." }) },
                { id: "taqleed", label: t({ en: "Blind Forefather Imitation ('This is how we found them')", ar: "التقليد الأعمى للآباء والمشايخ دون دليل علمي" }), clean: t({ en: "Epistemic duty of Aql (Reason). The Quran actively condemns blind imitation.", ar: "الفريضة العقلية والتفكير النقدي. القرآن يذم صراحةً مقولة 'هذا ما وجدنا عليه آباءنا'." }) },
                { id: "conformity", label: t({ en: "Compulsory Conformity / Group Identity Pressure", ar: "الضغط الجمعي القسري للموافقة على آراء الجماعة" }), clean: t({ en: "Individual Accountability. Every soul is responsible solely for its own actions.", ar: "المسؤولية الفردية. كل نفس بما كسبت رهينة، ولا تزر وازرة وزر أخرى." }) }
              ].map((node) => {
                const isExtracted = extractedNodes.includes(node.id);
                return (
                  <div 
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`p-4 rounded-xl border transition-all duration-500 ${isExtracted ? 'border-amber-500/30 bg-amber-950/5' : 'border-white/10 bg-white/5'}`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 text-sm">
                        <strong className={isExtracted ? "text-amber-500 line-through opacity-50" : "text-white"}>
                          {node.label}
                        </strong>
                        {isExtracted && (
                          <p className="mt-2 text-xs text-white/80 animate-fadeIn pl-2 border-l border-amber-500/50">
                            ✨ {node.clean}
                          </p>
                        )}
                      </div>
                      {!isExtracted && (
                        <button
                          onClick={() => setExtractedNodes([...extractedNodes, node.id])}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg text-xs transition-colors shrink-0"
                        >
                          {isRTL ? "استئصال ✂️" : "Extract ✂️"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {extractedNodes.length === 3 && (
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-sm text-center rounded-xl animate-fadeIn">
                🏆 {isRTL ? "اكتمل بناء جدار الحماية! العقل محمي من ضغوط الأعراف السامة." : "Firewall Complete! Mind isolated from toxic custom."}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- STAGE 4: COGNITIVE REWRITE III (The Ego-Decoupling Protocol) --- */}
      <section 
        id="mental-stage-4"
        className="engine-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 4 ? "radial-gradient(circle at center, rgba(59,130,246,0.05) 0%, #08080C 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Interactive Ego-Decoupling Console */}
            <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-xs text-white/50">EGO BIAS MONITOR</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${egoMode === "decoupled" ? 'bg-blue-950 text-blue-400 border border-blue-500/20' : 'bg-red-950 text-red-400 border border-red-500/20'}`}>
                  {egoMode === "decoupled" ? (isRTL ? "تزكية النفس" : "Tazkiyat al-Nafs") : (isRTL ? "أنا دفاعي" : "Defensive Ego")}
                </span>
              </div>

              {/* Mode Toggle Switch */}
              <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  onClick={() => { setEgoMode("defensive"); setActiveAttack(null); }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${egoMode === "defensive" ? 'bg-red-500 text-slate-900 shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  {isRTL ? "وضع الأنا الأمارة" : "Defensive Ego"}
                </button>
                <button
                  onClick={() => { setEgoMode("decoupled"); setActiveAttack(null); }}
                  className={`py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${egoMode === "decoupled" ? 'bg-blue-500 text-slate-900 shadow-md' : 'text-white/60 hover:text-white'}`}
                >
                  {isRTL ? "وضع التواجد المعرفي" : "Ego-Decoupled"}
                </button>
              </div>

              {/* Threat Attack Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setActiveAttack("sectarian")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${activeAttack === "sectarian" ? 'border-red-500 bg-red-950/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                >
                  {isRTL ? "💥 هجوم طائفي مضلل" : "💥 Sectarian Outrage"}
                </button>
                <button
                  onClick={() => setActiveAttack("intellectual")}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${activeAttack === "intellectual" ? 'border-red-500 bg-red-950/20' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                >
                  {isRTL ? "🔬 تشكيك علمي مغلوط" : "🔬 Pseudo-science Claim"}
                </button>
              </div>

              {/* Gauge and Log */}
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-mono">
                  <span>{isRTL ? "إجهاد الأنا والتعصب العاطفي:" : "Ego Defense Tension:"}</span>
                  <span className={gaugeValue > 50 ? "text-red-400 font-bold" : "text-blue-400"}>{gaugeValue}%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full transition-all duration-700 ${egoMode === "defensive" ? 'bg-red-500 shadow-[0_0_10px_#EF4444]' : 'bg-blue-500 shadow-[0_0_10px_#3B82F6]'}`}
                    style={{ width: `${gaugeValue}%` }}
                  />
                </div>

                {/* Simulated Log Output */}
                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 font-mono text-[11px] leading-relaxed min-h-[90px] text-white/70">
                  {activeAttack === null ? (
                    <span className="text-white/40">{isRTL ? "بانتظار وصول ادعاء أو هجوم خارجي..." : "Waiting for external claim or attack..."}</span>
                  ) : egoMode === "defensive" ? (
                    <div>
                      <span className="text-red-400 font-bold">[EGO ALARM] 🔴 Threat detected!</span><br />
                      <span>{isRTL ? "تم رصد تعارض بالآراء. الهوية تحت الخطر. تفعيل آلية الغضب والدفاع الجمعي. التفكير العقلاني متوقف." : "Opinion mismatch. Identity threat high. Initiating anger response, shouting match. Logic blocked."}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-blue-400 font-bold">[COGNITIVE AUDIT] 🔵 Clinical Observation</span><br />
                      <span>{isRTL ? "تم رصد ادعاء مضلل. الأنا في وضع استقرار (Tazkiyah). عزل كامل للأنا عن الهوية. ولاء مطلق للحق وحده." : "Attack observed clinically. Ego decoupled. 0% emotional threat. Focus on Al-Haqq (Objective Truth)."}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]`}>
              <Crosshair size={28} className="text-blue-400" />
            </div>
            <h4 className="text-blue-500 font-mono tracking-widest uppercase text-xs mb-3">Stage 04: Ego Decoupling</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              {isRTL ? "بروتوكول عزل الأنا (تزكية النفس)" : "The Ego-Decoupling Protocol"}
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed font-light text-base md:text-lg">
              <p>
                {isRTL 
                  ? "المتلاعبون يربطون هويتك بآرائك الشخصية. عندما يعارضك أحد، تشعر وكأن بقاءك في خطر، فتثور دفاعاً عن الأنا الخاصة بك بدلاً من الدفاع عن الحق."
                  : "Manipulators link your personal opinions to your identity. When challenged, your ego flares up to survive, making you defend your beliefs rather than seeking objective truth."}
              </p>
              <p>
                {isRTL 
                  ? "يتدرب عقلك هنا على 'تزكية النفس' - ترويض الأنا وعزلها عن التهديد. أنت تلاحظ الهجوم أو الكذبة المضللة سريرياً، تماماً مثل عالم يلاحظ فأراً في مختبر، لتظل مخلصاً للحق فقط."
                  : "Here you train in Tazkiyat al-Nafs—taming and decoupling the ego from the threat. You observe the manipulator or lie clinically, like a scientist observing a lab rat, remaining loyal only to Al-Haqq."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- STAGE 5: THE MATHEMATICAL EQUATION --- */}
      <section 
        id="mental-stage-5"
        className="engine-stage relative min-h-screen flex items-center justify-center py-20 px-4"
        style={{
          background: activeStage === 5 ? "radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, #08080C 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]`}>
              <Sliders size={28} className="text-emerald-400" />
            </div>
            <h4 className="text-emerald-400 font-mono tracking-widest uppercase text-xs mb-3">Stage 05: Mathematical Stabilization</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              {isRTL ? "معادلة الاستقرار المعرفي" : "The Equation of Cognitive Stability"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed font-light text-base md:text-lg">
              {isRTL 
                ? "العقل 'تحت الصفر' يظن أن استجابته العاطفية مساوية تماماً للمحفز الخارجي. نحن نصيغ ذلك رياضياً لإثبات أن الوعي بمحيطك وثقافتك وجسدك يقلل الأثر العاطفي إلى الصفر تقريباً."
                : "The untrained mind believes their emotional distress is directly caused by the trigger. We express this defense mathematically to show that increasing Awareness divides and shrinks the trigger's emotional impact."}
            </p>

            <div className="glass-card p-6 border border-emerald-500/20 bg-emerald-950/10 rounded-2xl">
              <h5 className="text-emerald-400 font-bold mb-3">{isRTL ? "تفسير المتغيرات" : "Variables Legend"}</h5>
              <ul className="space-y-2 text-xs text-white/80 font-mono">
                <li><span className="text-emerald-400">E:</span> {isRTL ? "الاضطراب العاطفي (Emotional Distress)" : "Emotional Distress"}</li>
                <li><span className="text-emerald-400">T:</span> {isRTL ? "المحفّز / ادعاء المتلاعب (Trigger)" : "Trigger / Manipulator claim"}</li>
                <li><span className="text-emerald-400">B:</span> {isRTL ? "الحالة البيولوجية / إجهاد الجسد (Biology)" : "Biological state (sleep, stress)"}</li>
                <li><span className="text-emerald-400">C:</span> {isRTL ? "الضغط الثقافي والمجتمعي (Culture)" : "Cultural/societal pressure"}</li>
                <li><span className="text-emerald-400">Awareness:</span> {isRTL ? "الوعي الذاتي واليقظة العقلية" : "Self-Awareness / Mindfulness"}</li>
              </ul>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="glass-card p-6 border border-emerald-500/20 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl flex flex-col justify-center">
            {/* Glowing LaTeX-style CSS equation display */}
            <div 
              className="p-6 bg-slate-950/80 rounded-2xl border border-emerald-500/30 text-center mb-8 shadow-inner"
              dir="ltr"
            >
              <div 
                className="text-4xl md:text-5xl font-mono tracking-widest"
                style={{
                  color: "#10B981",
                  textShadow: "0 0 20px rgba(16,185,129,0.5)"
                }}
              >
                E = f(T) × <span className="inline-flex flex-col items-center justify-center align-middle">
                  <span className="border-b border-emerald-500/50 px-2 pb-0.5">B + C</span>
                  <span className="pt-0.5 text-2xl">Awareness</span>
                </span>
              </div>
            </div>

            {/* Calculations Result */}
            <div className="flex justify-between items-center mb-6 p-4 bg-emerald-950/20 border border-emerald-500/10 rounded-xl">
              <span className="text-sm font-semibold">{isRTL ? "الاضطراب العاطفي الناتج (E):" : "Calculated Distress (E):"}</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">{emotionalDistress}</span>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              {/* Trigger */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span>f(T) - Trigger Intensity</span>
                  <span>{triggerVal}</span>
                </div>
                <input 
                  type="range" min="1" max="10" value={triggerVal} 
                  onChange={(e) => setTriggerVal(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Biology */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span>B - Biological Vulnerability</span>
                  <span>{biologyVal}</span>
                </div>
                <input 
                  type="range" min="1" max="10" value={biologyVal} 
                  onChange={(e) => setBiologyVal(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Culture */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span>C - Cultural Pressure</span>
                  <span>{cultureVal}</span>
                </div>
                <input 
                  type="range" min="1" max="10" value={cultureVal} 
                  onChange={(e) => setCultureVal(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Awareness */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono text-emerald-400 font-bold">
                  <span>Awareness (Denominator)</span>
                  <span>{awarenessVal}</span>
                </div>
                <input 
                  type="range" min="1" max="20" value={awarenessVal} 
                  onChange={(e) => setAwarenessVal(Number(e.target.value))}
                  className="w-full h-1.5 bg-emerald-950 rounded appearance-none cursor-pointer accent-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                />
              </div>
            </div>

            {/* Explanatory summary text based on values */}
            <p className="mt-6 text-xs text-white/50 italic leading-relaxed text-center">
              {awarenessVal > 12 
                ? (isRTL ? "💡 رائع! ارتفاع الوعي يقسّم المحفز ويهدئ الكورتيزول ويحد من ألم التلاعب تماماً." : "💡 Excellent! High awareness mathematically divides the trigger, neutralizing distress.")
                : (isRTL ? "⚠️ انتبه! انخفاض الوعي يضخم تأثير المحفز الخارجي ويترك الكيمياء والضغوط تسيطر." : "⚠️ Caution! Low awareness leaves you highly vulnerable, magnifying the trigger's power.")}
            </p>
          </div>
        </div>
      </section>

      {/* Global CSS keyframes for dashboard custom wave movement */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
