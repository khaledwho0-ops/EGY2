"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Search, Scale, Microscope, BookOpen, Activity, AlertTriangle, Layers, Database, RefreshCw, CheckCircle } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

export function EngineTwoUI() {
  const { isRTL, t } = useRTL();
  const [activeStage, setActiveStage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- STAGE 2 STATE: COPE Funding Scanner ---
  const [sponsorInput, setSponsorInput] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{ status: "clean" | "conflict" | "idle", details: string }>({ status: "idle", details: "" });

  // --- STAGE 3 STATE: PRISMA Shredder ---
  const [sampleSize, setSampleSize] = useState(100);
  const [studyType, setStudyType] = useState<"mice" | "observational" | "rct" | "meta">("rct");
  const [prismaOutput, setPrismaOutput] = useState<{ status: "pass" | "fail" | "warn" | "idle", details: string }>({ status: "idle", details: "" });
  const [isFiltering, setIsFiltering] = useState(false);

  // --- STAGE 4 STATE: CONSORT Flowchart ---
  const [activeConsortStep, setActiveConsortStep] = useState<string>("enrollment");
  const [attritionRate, setAttritionRate] = useState(5); // 0 to 50%

  // Scroll snapping logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = document.querySelectorAll(".engine-two-stage");
      let currentIdx = 1;
      
      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          currentIdx = idx + 1;
        }
      });
      
      if (currentIdx !== activeStage) setActiveStage(currentIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStage]);

  // COPE Scan trigger
  const runCopeScan = () => {
    if (!sponsorInput.trim()) return;
    setIsScanning(true);
    setScanResult({ status: "idle", details: "" });

    setTimeout(() => {
      const query = sponsorInput.toLowerCase();
      if (query.includes("corp") || query.includes("inc") || query.includes("company") || query.includes("food") || query.includes("sugar") || query.includes("pharma") || query.includes("tobacco")) {
        setScanResult({
          status: "conflict",
          details: t({
            en: "🚨 COPI DETECTED: Corporate funding identified. High risk of publication bias. Study downgraded or flagged under COPE guidelines.",
            ar: "🚨 رصد تعارض مصالح: تمويل تجاري/شركات. خطر انحياز النشر مرتفع. تم خفض تصنيف الدراسة طبقاً لمعايير COPE.",
          })
        });
      } else {
        setScanResult({
          status: "clean",
          details: t({
            en: "✅ CLEAN SOURCE: Public/academic funding verified. No commercial conflict of interest found.",
            ar: "✅ مصدر نظيف: تمويل أكاديمي/حكومي موثق. لا يوجد تعارض مصالح تجاري.",
          })
        });
      }
      setIsScanning(false);
    }, 1500);
  };

  // PRISMA Filter trigger
  const runPrismaFilter = () => {
    setIsFiltering(true);
    setPrismaOutput({ status: "idle", details: "" });

    setTimeout(() => {
      if (studyType === "mice") {
        setPrismaOutput({
          status: "fail",
          details: t({
            en: "❌ DISCARDED: Animal or in-vitro tests cannot prove human clinical efficacy. Shredded under PRISMA standards.",
            ar: "❌ مستبعدة: التجارب الحيوانية أو المعملية لا يمكنها إثبات الفعالية السريرية للبشر. استبعاد فوري بموجب PRISMA.",
          })
        });
      } else if (studyType === "observational") {
        setPrismaOutput({
          status: "warn",
          details: t({
            en: "⚠️ CORRELATION ONLY: Observational studies prove association, not causation. High risk of confounding variables.",
            ar: "⚠️ ارتباط فقط: الدراسات القائمة على الملاحظة تثبت الارتباط لا السببية. احتمالية عالية للمتغيرات الدخيلة.",
          })
        });
      } else if (studyType === "rct" && sampleSize < 100) {
        setPrismaOutput({
          status: "warn",
          details: t({
            en: "⚠️ LOW POWER: Randomized trial but under-powered sample (N < 100). Risk of random error is high.",
            ar: "⚠️ قوة منخفضة: تجربة عشوائية ولكن العينة صغيرة جداً (أقل من 100). احتمالية الخطأ العشوائي مرتفعة.",
          })
        });
      } else if (studyType === "rct" && sampleSize >= 100) {
        setPrismaOutput({
          status: "pass",
          details: t({
            en: "✅ ACCEPTED: Highly powered Randomized Controlled Trial (RCT) with adequate sample size.",
            ar: "✅ مقبولة: تجربة سريرية عشوائية قوية ذات عينة إحصائية كافية.",
          })
        });
      } else if (studyType === "meta") {
        setPrismaOutput({
          status: "pass",
          details: t({
            en: "🌟 GOLD STANDARD: Peer-reviewed systematic review/meta-analysis of multiple randomized trials. Highest tier.",
            ar: "🌟 المعيار الذهبي: مراجعة منهجية وتحليل تلوي محكم لتجارب عشوائية متعددة. أعلى درجات الموثوقية.",
          })
        });
      }
      setIsFiltering(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="engine-two-container font-sans text-white"
      style={{ 
        paddingTop: "var(--navbar-height)", 
        direction: isRTL ? "rtl" : "ltr",
        background: "#05050A", // Very deep midnight void
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Scroll indicator dots */}
      <div 
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
        style={{ right: isRTL ? "6px" : "auto", left: isRTL ? "auto" : "6px" }}
      >
        {[1, 2, 3, 4].map((stage) => (
          <button
            key={stage}
            onClick={() => {
              const el = document.getElementById(`deepreal-stage-${stage}`);
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStage === stage ? 'bg-amber-500 scale-125 shadow-[0_0_12px_#F59E0B]' : 'bg-white/20 hover:bg-white/40'}`}
            title={`Stage ${stage}`}
            aria-label={`Go to Stage ${stage}`}
          />
        ))}
      </div>

      {/* --- STAGE 1: THE GLOBAL STANDARDS ANCHOR --- */}
      <section 
        id="deepreal-stage-1"
        className="engine-two-stage relative min-h-screen flex items-center justify-center py-20 px-4"
        style={{
          background: activeStage === 1 ? "radial-gradient(circle at center, rgba(245,158,11,0.06) 0%, #05050A 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-amber-500/10 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.2)]`}>
            <Scale size={36} className="text-amber-500" />
          </div>
          <h4 className="text-amber-500 font-mono tracking-widest uppercase text-xs mb-3">Verification Framework</h4>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            {isRTL ? "معايير التحقق الصارمة العالمية" : "Global Strict Standards"}
          </h2>
          <p className="text-white/70 mb-16 leading-relaxed font-light text-base md:text-lg max-w-3xl mx-auto">
            {isRTL 
              ? "التحقق من صحة المعلومات ليس رأياً شخصياً. يُلزم هذا المحرك كل ادعاء بمطابقة المعايير الطبية والبحثية واللاهوتية المعتمدة دولياً، لمنع التمرير المغلوط تحت شعارات عاطفية."
              : "Verification is not a matter of opinion. This engine subjects every claim to internationally accepted medical, empirical, and theological criteria to block manipulation packaged in emotional wrappers."}
          </p>

          {/* Standards Cards */}
          <div className="grid md:grid-cols-3 gap-6 text-left" style={{ direction: isRTL ? "rtl" : "ltr" }}>
            {/* Psychiatry (DSM-5-TR, mhGAP) */}
            <div className="glass-card p-6 border-t-4 border-emerald-500 bg-emerald-950/5 hover:-translate-y-2 transition-transform duration-500 rounded-xl relative overflow-hidden">
              <Activity className="text-emerald-500 mb-4" size={28} />
              <h3 className="text-lg font-bold text-white mb-3">{isRTL ? "الصحة النفسية والطب" : "Psychiatry & Medicine"}</h3>
              <ul className="space-y-3 text-xs text-white/70 font-light">
                <li className="flex gap-2">
                  <span className="font-mono text-emerald-400 font-bold">DSM-5-TR:</span>
                  <span>{isRTL ? "المرجع لتصنيف الأمراض وفصل العوارض العارضة عن الاضطرابات." : "Clinical categorization to split temporary distress from clinical disorders."}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-emerald-400 font-bold">mhGAP-IG:</span>
                  <span>{isRTL ? "الدليل الإرشادي لمنظمة الصحة العالمية للتدخل غير المتخصص." : "WHO guidelines for primary care mental health integration."}</span>
                </li>
              </ul>
            </div>

            {/* Empirical Science (COPE, PRISMA, CONSORT) */}
            <div className="glass-card p-6 border-t-4 border-amber-500 bg-amber-950/5 hover:-translate-y-2 transition-transform duration-500 rounded-xl relative overflow-hidden">
              <Microscope className="text-amber-500 mb-4" size={28} />
              <h3 className="text-lg font-bold text-white mb-3">{isRTL ? "العلوم والبحث التجريبي" : "Empirical Research"}</h3>
              <ul className="space-y-3 text-xs text-white/70 font-light">
                <li className="flex gap-2">
                  <span className="font-mono text-amber-400 font-bold">COPE:</span>
                  <span>{isRTL ? "معايير لجنة أخلاق النشر لكشف مصادر التمويل والانحيازات." : "Ethical publication guidelines to expose conflicts of interest."}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-amber-400 font-bold">PRISMA:</span>
                  <span>{isRTL ? "المعيار لتقييم المراجعات المنهجية وإسقاط الأبحاث الضعيفة." : "Rigor filter for systematic reviews and discarding weak studies."}</span>
                </li>
              </ul>
            </div>

            {/* Fiqh & Theology (Al-Azhar, Amman Message, IIFA) */}
            <div className="glass-card p-6 border-t-4 border-blue-500 bg-blue-950/5 hover:-translate-y-2 transition-transform duration-500 rounded-xl relative overflow-hidden">
              <BookOpen className="text-blue-500 mb-4" size={28} />
              <h3 className="text-lg font-bold text-white mb-3">{isRTL ? "الفقه الشرعي واللاهوت" : "Theology & Jurisprudence"}</h3>
              <ul className="space-y-3 text-xs text-white/70 font-light">
                <li className="flex gap-2">
                  <span className="font-mono text-blue-400 font-bold">Al-Azhar:</span>
                  <span>{isRTL ? "المرجعية السنية الوسطية لمنع التطرف الفكري والدجل الطبي." : "Mainstream moderation preventing ideological extremism and pseudo-religious medicine."}</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono text-blue-400 font-bold">Amman Msg:</span>
                  <span>{isRTL ? "بيان عمان الصادر بالإجماع لمنع التكفير الفوضوي والتقسيم." : "Amman Message consensus prohibiting arbitrary takfir."}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- STAGE 2: EMPIRICAL FILTER 1 (COPE) --- */}
      <section 
        id="deepreal-stage-2"
        className="engine-two-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 2 ? "radial-gradient(circle at center, rgba(239,68,68,0.05) 0%, #05050A 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-red-500/10 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <Search size={28} className="text-red-500" />
            </div>
            <h4 className="text-red-500 font-mono tracking-widest uppercase text-xs mb-3">Empirical Filter 01</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-red-500 block text-5xl md:text-6xl font-mono mb-2">COPE</span>
              {isRTL ? "كشف مصادر التمويل والانحياز" : "Funding & Conflict of Interest"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed font-light text-base md:text-lg">
              {isRTL 
                ? "الدراسة المنشورة ليست حقيقة لمجرد أنها تحمل اسم 'دراسة'. يحلل المحرك آلياً مصادر التمويل لتحديد أي تعارض مصالح. بحث عن السكر يموله قطاع المشروبات الغازية هو انحياز تجاري يتم إسقاطه فوراً."
                : "A study is not automatically true. Under COPE standards, the engine scans funding sources. A sugar study funded by soda corporations represents a commercial conflict of interest and is automatically flagged."}
            </p>
          </div>

          {/* Interactive COPE Scanner */}
          <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl">
            <h5 className="text-xs font-mono text-white/50 mb-6 flex justify-between">
              <span>COPE COI SCANNER</span>
              <Activity className={isScanning ? "text-red-500 animate-pulse" : "text-white/40"} size={16} />
            </h5>

            <div className="space-y-4 mb-6">
              <label className="block text-xs text-white/60 mb-1">{isRTL ? "اسم جهة التمويل / الراعي للدراسة:" : "Enter Study Funder/Sponsor name:"}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={sponsorInput}
                  onChange={(e) => setSponsorInput(e.target.value)}
                  placeholder={t({ en: "e.g. SodaCorp, National Science Foundation, PharmaGiant", ar: "مثال: شركة مشروبات، مؤسسة العلوم الأكاديمية..." })}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-red-500/50"
                  disabled={isScanning}
                />
                <button
                  onClick={runCopeScan}
                  disabled={isScanning || !sponsorInput.trim()}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-slate-900 rounded-xl font-bold transition-all text-sm shrink-0"
                >
                  {isRTL ? "فحص" : "Scan"}
                </button>
              </div>
            </div>

            {/* Scanner Visual Effect */}
            <div className="relative h-28 bg-slate-950 rounded-xl border border-white/5 overflow-hidden flex flex-col items-center justify-center p-4">
              {isScanning ? (
                <>
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_#EF4444] animate-[scan_1.5s_ease-in-out_infinite]" />
                  <span className="font-mono text-xs text-red-500 animate-pulse">{isRTL ? "⚡ جاري مسح سجل الشركات وقواعد بيانات COPE..." : "⚡ Scanning corporate registries & COPE database..."}</span>
                </>
              ) : scanResult.status === "idle" ? (
                <span className="font-mono text-xs text-white/30">{isRTL ? "أدخل اسماً للراعي واضغط على فحص لبدء التحليل." : "Enter funder name and run scan to evaluate."}</span>
              ) : (
                <p className={`text-xs font-mono leading-relaxed ${scanResult.status === 'conflict' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {scanResult.details}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- STAGE 3: EMPIRICAL FILTER 2 (PRISMA) --- */}
      <section 
        id="deepreal-stage-3"
        className="engine-two-stage relative min-h-screen flex items-center justify-center py-20 px-4 border-b border-white/5"
        style={{
          background: activeStage === 3 ? "radial-gradient(circle at center, rgba(16,185,129,0.05) 0%, #05050A 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            {/* Interactive PRISMA Filter Console */}
            <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl">
              <h5 className="text-xs font-mono text-white/50 mb-6 flex justify-between">
                <span>PRISMA TRIAL FILTRATION CHAMBER</span>
                <Layers className="text-emerald-500" size={16} />
              </h5>

              {/* Study Type Select */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { id: "mice" as const, label: t({ en: "In-Vitro / Mice", ar: "خلايا معملية / فئران" }) },
                  { id: "observational" as const, label: t({ en: "Observational", ar: "قائم على الملاحظة" }) },
                  { id: "rct" as const, label: t({ en: "RCT (Clinical)", ar: "تجربة عشوائية سريرية" }) },
                  { id: "meta" as const, label: t({ en: "Meta-Analysis", ar: "تحليل تلوي شامل" }) }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setStudyType(type.id); setPrismaOutput({ status: "idle", details: "" }); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${studyType === type.id ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Sample Size Slider (only for relevant studies) */}
              {studyType !== "mice" && studyType !== "meta" && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Sample Size (N-value):</span>
                    <span className="text-emerald-400 font-bold">{sampleSize}</span>
                  </div>
                  <input 
                    type="range" min="10" max="2000" value={sampleSize} 
                    onChange={(e) => { setSampleSize(Number(e.target.value)); setPrismaOutput({ status: "idle", details: "" }); }}
                    className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              )}

              {/* Filter Button */}
              <button
                onClick={runPrismaFilter}
                disabled={isFiltering}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-xl mb-6 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                {isRTL ? "تشغيل مرشح PRISMA لتصفية الدراسة" : "Run PRISMA Filtration"}
              </button>

              {/* Filtration result */}
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 min-h-[80px] flex items-center justify-center">
                {isFiltering ? (
                  <span className="font-mono text-xs text-emerald-500 animate-pulse">{isRTL ? "⌛ جاري تطبيق شروط PRISMA وتصنيف الموثوقية..." : "⌛ Applying PRISMA flow conditions & grading weight..."}</span>
                ) : prismaOutput.status === "idle" ? (
                  <span className="font-mono text-xs text-white/30">{isRTL ? "اختر تصنيف الدراسة واضغط تصفية لبدء الفحص." : "Choose study variables and filter to check."}</span>
                ) : (
                  <p className={`text-xs font-mono leading-relaxed text-center ${prismaOutput.status === 'fail' ? 'text-red-400' : (prismaOutput.status === 'warn' ? 'text-amber-400' : 'text-emerald-400')}`}>
                    {prismaOutput.details}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Layers size={28} className="text-emerald-400" />
            </div>
            <h4 className="text-emerald-500 font-mono tracking-widest uppercase text-xs mb-3">Empirical Filter 02</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-emerald-500 block text-5xl md:text-6xl font-mono mb-2">PRISMA</span>
              {isRTL ? "استبعاد دراسات المعجزات الفردية" : "Shredding Isolated Miracle Claims"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed font-light text-base md:text-lg">
              {isRTL 
                ? "يتم ترويج العلاجات الزائفة بالاعتماد على دراسة يتيمة أجريت على عدد ضئيل من الفئران. بموجب معايير PRISMA، يسقط المحرك الدراسات الفردية وغير المدعومة، ولا يقبل إلا التحليلات التلوية (Meta-analyses) التي تقيس عينات بالآلاف لضمان الدقة."
                : "Manipulators cite isolated 'miracle' studies, often done on tiny groups of rodents. Under PRISMA flow constraints, the engine filters out single, low-sample studies, demanding comprehensive meta-analyses spanning thousands of participants before a fact is accepted."}
            </p>
          </div>
        </div>
      </section>

      {/* --- STAGE 4: EMPIRICAL FILTER 3 (CONSORT) --- */}
      <section 
        id="deepreal-stage-4"
        className="engine-two-stage relative min-h-screen flex items-center justify-center py-20 px-4"
        style={{
          background: activeStage === 4 ? "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, #05050A 80%)" : "transparent",
          transition: "background 1s ease",
        }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-blue-500/10 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <ShieldCheck size={28} className="text-blue-400" />
            </div>
            <h4 className="text-blue-500 font-mono tracking-widest uppercase text-xs mb-3">Empirical Filter 03</h4>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              <span className="text-blue-500 block text-5xl md:text-6xl font-mono mb-2">CONSORT</span>
              {isRTL ? "أخلاقيات التجارب العشوائية السريرية" : "Clinical Trial Rigor Checklist"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed font-light text-base md:text-lg">
              {isRTL 
                ? "لمنع المتلاعبين من ترويج دراسات سريرية مضللة، يقوم فلتر CONSORT بالتحقق التفصيلي من منهجية التوزيع العشوائي ومجموعات المقارنة (Controls)، ونسب المتسربين من التجربة (Attrition Bias)، لضمان عدم التلاعب بالنتائج النهائية."
                : "To prevent manipulators from citing flawed clinical trials, CONSORT criteria verify the randomization process, the control groups, and participant attrition rates. High drop-out rates or selective analysis disqualify the trial."}
            </p>
          </div>

          {/* Interactive CONSORT Checklist Console */}
          <div className="glass-card p-6 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl relative shadow-2xl">
            <h5 className="text-xs font-mono text-white/50 mb-6 flex justify-between">
              <span>CONSORT CHECKLIST & FLOW AUDIT</span>
              <span className="text-blue-400 font-mono">ITT VERIFICATION ACTIVE</span>
            </h5>

            {/* Clickable flowchart tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-3 flex-wrap">
              {[
                { id: "enrollment", label: t({ en: "1. Enrollment", ar: "1. التسجيل" }) },
                { id: "allocation", label: t({ en: "2. Allocation", ar: "2. التوزيع" }) },
                { id: "follow-up", label: t({ en: "3. Follow-up", ar: "3. المتابعة" }) },
                { id: "analysis", label: t({ en: "4. Analysis", ar: "4. التحليل" }) }
              ].map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveConsortStep(step.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-colors ${activeConsortStep === step.id ? 'bg-blue-500 text-slate-900 border-blue-500 font-bold' : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/70'}`}
                >
                  {step.label}
                </button>
              ))}
            </div>

            {/* Flow details display based on active step */}
            <div className="p-4 bg-slate-950 rounded-xl border border-white/5 min-h-[120px] mb-6 flex flex-col justify-center">
              {activeConsortStep === "enrollment" && (
                <div className="text-xs space-y-2">
                  <strong className="text-blue-400 block">{isRTL ? "مرحلة التسجيل والفحص (Enrollment)" : "Enrollment & Eligibility Assessment"}</strong>
                  <p className="text-white/70">{isRTL ? "مراجعة معايير إدراج المشاركين واستبعادهم. يتأكد المحرك من الإبلاغ عن إجمالي المفحوصين الفعليين لضمان عدم انتقاء العينات يدوياً." : "Verify eligibility criteria. The trial must document how many participants were assessed and excluded before randomization to prevent selection bias."}</p>
                </div>
              )}
              {activeConsortStep === "allocation" && (
                <div className="text-xs space-y-2">
                  <strong className="text-blue-400 block">{isRTL ? "مرحلة التوزيع والتعشية (Allocation)" : "Randomized Allocation & Blinding"}</strong>
                  <p className="text-white/70">{isRTL ? "التحقق من تعمية التوزيع (Blinding) لضمان عدم معرفة الطبيب أو المريض بالدواء الوهمي مقارنة بالدواء الحقيقي، مما يبطل الأثر النفسي (Placebo)." : "Check for allocation concealment. Participants and researchers must be blinded to active vs placebo groups to eliminate subjective expectation bias."}</p>
                </div>
              )}
              {activeConsortStep === "follow-up" && (
                <div className="text-xs space-y-2">
                  <strong className="text-blue-400 block">{isRTL ? "مرحلة المتابعة ونسبة التسرب (Follow-up & Attrition)" : "Loss to Follow-up & Attrition"}</strong>
                  <p className="text-white/70 mb-2">{isRTL ? "يقوم المتلاعبون بإخفاء بيانات المرضى الذين ساءت حالتهم أثناء التجربة. يتيح لك شريط التعديل أدناه محاكاة نسبة التسرب لمعرفة أثرها:" : "Manipulators often hide patients whose conditions worsened. Drag the slider to simulate participant drop-out rate and see its bias risk:"}</p>
                  
                  <div className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex justify-between font-mono text-[10px]">
                      <span>{isRTL ? "نسبة التسرب:" : "Attrition Rate:"}</span>
                      <span className={attritionRate > 20 ? "text-red-400 font-bold" : "text-emerald-400"}>{attritionRate}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="50" value={attritionRate}
                      onChange={(e) => setAttritionRate(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="text-[10px] font-semibold text-center mt-1">
                      {attritionRate > 20 ? (
                        <span className="text-red-400">🚨 {isRTL ? "انحياز تسرب مرتفع! الدراسة مشكوك بصحتها (تجاوزت 20%)." : "High attrition bias! Drop-outs > 20% invalidate outcomes."}</span>
                      ) : (
                        <span className="text-emerald-400">✅ {isRTL ? "مقبول: نسبة الفقد ضمن الحدود الآمنة إحصائياً." : "Acceptable attrition level. Risk of bias is low."}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeConsortStep === "analysis" && (
                <div className="text-xs space-y-2">
                  <strong className="text-blue-400 block">{isRTL ? "مرحلة التحليل الإحصائي (Intention-to-Treat)" : "Analysis & Intention-to-Treat (ITT)"}</strong>
                  <p className="text-white/70">{isRTL ? "يجب إجراء التحليل بناءً على مبدأ نية العلاج (ITT). أي مريض يتم استبعاده في منتصف التجربة يظل محسوباً ضمن الإحصاء لمنع تجميل النتائج." : "All randomized patients must be analyzed in their original groups, even if they dropped out or violated protocols. Strict ITT prevents selective data grooming."}</p>
                </div>
              )}
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/50">
              <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> {isRTL ? "عشوائية التوزيع موثقة" : "Sequence Generation Verified"}</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> {isRTL ? "تعمية مزدوجة للمحقق" : "Double-Blind Protocol"}</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> {isRTL ? "تسجيل مسبق للتجربة" : "Pre-Registered Trial Link"}</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={10} className="text-blue-500" /> {isRTL ? "تحليل ITT متكامل" : "Strict ITT Compliance"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}} />
    </div>
  );
}
