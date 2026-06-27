"use client";

import { useState } from "react";
import { ROADMAP_DATA } from "@/data/roadmap-data";
import { Copy, Check, ChevronDown, Flag, Crosshair, Terminal, Layers } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function MasterRoadmapPage() {
  const { t, isRTL } = useRTL();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>(
    // Expand first category by default, others collapsed to keep it manageable
    Object.fromEntries(ROADMAP_DATA.map((c, i) => [c.id, i === 0]))
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCategory = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 relative font-sans overflow-hidden pt-20 pb-32 transition-colors duration-500 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Soft Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-24 relative pt-8">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white border border-slate-200 mb-6 shadow-sm">
            <Layers size={40} className="text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900">
            {t({ en: "The Global Roadmap", ar: "خارطة الطريق الشاملة" })}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t({ 
              en: "A highly structured, step-by-step sequence of 136 forensic nodes. Follow this path from core deployment to full systemic orchestration.", 
              ar: "تسلسل منهجي ومهيكل من 136 عقدة تحليلية. اتبع هذا المسار من مرحلة التأسيس إلى القيادة الشاملة للنظام." 
            })}
          </p>
        </div>

        {/* The Timeline Canvas */}
        <div className="relative">
          {/* Main Central Trunk Line */}
          <div className="absolute start-4 md:start-1/2 top-0 bottom-0 w-1 bg-slate-200 transform md:-translate-x-1/2 rounded-full" />

          {/* Categories Iteration */}
          {ROADMAP_DATA.map((category, catIndex) => {
            const isExpanded = expandedCats[category.id];

            return (
              <div key={category.id} className="relative mb-24">
                {/* Category Milestone Node */}
                <div 
                  className="relative z-30 flex flex-col items-center justify-center mb-16 cursor-pointer group"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="w-14 h-14 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-100 transition-all z-20 mb-6">
                    <span className="text-xl font-bold text-blue-600">{catIndex + 1}</span>
                  </div>
                  <div className="bg-white border border-slate-200/60 py-6 px-8 rounded-3xl min-w-[320px] max-w-xl text-center shadow-md hover:shadow-lg transition-all z-20 flex flex-col items-center overflow-hidden w-full box-border">
                    <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-3 mt-0 leading-tight">{t(category.title)}</h2>
                    <p className="text-sm text-slate-500 mb-5 text-center whitespace-normal w-full">{t(category.description)}</p>
                    <div className="text-xs text-blue-500 flex items-center justify-center gap-1 font-medium uppercase tracking-wider bg-blue-50/50 py-1.5 px-3 rounded-full w-max mx-auto">
                      {isExpanded ? t({ en: "Collapse Branch", ar: "طي المسار" }) : t({ en: "Expand Branch", ar: "توسيع المسار" })} <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Items Container */}
                {isExpanded && (
                  <div className="relative pt-4">
                    {category.items.map((item, itemIndex) => {
                      const isEven = itemIndex % 2 === 0;
                      
                      return (
                        <div key={item.id} className={`relative flex items-center mb-10 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                          
                          {/* Point on the line */}
                          <div className="absolute start-4 md:start-1/2 top-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-50 z-10 shadow-sm" />

                          {/* The Connecting Branch Line (Desktop only) */}
                          <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-12 h-[2px] bg-slate-200 ${isEven ? 'end-1/2 me-2' : 'start-1/2 ms-2'}`} />

                          {/* The Card */}
                          <div className={`ms-12 md:ms-0 md:w-[45%] ${isEven ? 'md:pe-12' : 'md:ps-12'}`}>
                            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                              <div className="flex items-start justify-between mb-6">
                                <div>
                                  <div className="text-xs text-blue-500 font-semibold mb-2 tracking-wider uppercase">{t({ en: "NODE", ar: "عقدة" })} {catIndex + 1}.{itemIndex + 1}</div>
                                  <h3 className="text-lg font-bold text-slate-900">{t(item.name)}</h3>
                                </div>
                                <a href={item.href} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0">
                                  <Crosshair size={18} />
                                </a>
                              </div>

                              <div className="space-y-4 mb-6">
                                <div>
                                  <h4 className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Terminal size={12}/> {t({ en: "Scientific Mechanics", ar: "الآلية العلمية" })}</h4>
                                  <p dir="auto" className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-start [unicode-bidi:plaintext]">{t(item.scientificMechanics)}</p>
                                </div>
                                <div>
                                  <h4 className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Flag size={12}/> {t({ en: "Best Use Case", ar: "أفضل حالة استخدام" })}</h4>
                                  <p dir="auto" className="text-sm text-slate-600 leading-relaxed ps-1 text-start [unicode-bidi:plaintext]">{t(item.bestUseCases)}</p>
                                </div>
                              </div>

                              {/* Copy Scenario Block */}
                              <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mt-6">
                                <div className="flex items-center justify-between bg-white/50 px-5 py-3 border-b border-slate-200">
                                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">test_scenario.txt</span>
                                  <button 
                                    onClick={() => handleCopy(item.copyPasteScenario, item.id)}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md"
                                  >
                                    {copiedId === item.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    {copiedId === item.id ? t({ en: "COPIED", ar: "تم النسخ" }) : t({ en: "COPY", ar: "نسخ" })}
                                  </button>
                                </div>
                                <div className="px-6 pb-6 pt-3 text-sm font-mono text-slate-700 whitespace-pre-wrap leading-relaxed text-left" dir="ltr">
                                  {item.copyPasteScenario}
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* End Milestone Node */}
          <div className="relative flex flex-col items-center justify-center mt-32 mb-12">
            <div className="w-20 h-20 bg-blue-50 border-4 border-white rounded-full flex flex-col items-center justify-center shadow-sm z-20">
              <span className="text-sm font-bold text-blue-600 uppercase">{t({ en: "End", ar: "النهاية" })}</span>
            </div>
            <p className="mt-6 text-slate-500 font-medium text-sm text-center max-w-sm">
              {t({ 
                en: "Sequence complete. You are now prepared to navigate the platform.", 
                ar: "اكتمل التسلسل. أنت الآن مستعد لتصفح المنصة." 
              })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Seamless transition to footer */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
      <PageNavigation currentPath="/master-roadmap" />
    </div>
  );
}
