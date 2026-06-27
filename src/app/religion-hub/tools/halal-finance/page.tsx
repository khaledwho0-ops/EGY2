"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import { ShieldCheck, ShieldAlert, Bot, Send, Loader2, Info, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

type AnalysisResult = {
  isCompliant: boolean | null;
  confidence: number;
  explanation: string;
  issues: string[];
};

export default function HalalFinancePage() {
  const { isRTL } = useRTL();

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/islamic/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Failed to analyze:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (isCompliant: boolean | null) => {
    if (isCompliant === true) return "from-emerald-500 to-teal-600";
    if (isCompliant === false) return "from-red-500 to-rose-600";
    return "from-amber-500 to-orange-600";
  };

  const getStatusBgColor = (isCompliant: boolean | null) => {
    if (isCompliant === true) return "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/50";
    if (isCompliant === false) return "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50";
    return "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50";
  };

  const sampleQueries = isRTL ? [
    "شراء سيارة عن طريق البنك بتمويل مرابحة بفائدة ثابتة 5%",
    "تداول العملات المشفرة (البيتكوين) على منصات التداول",
    "صكوك إسلامية مدعومة بأصول عقارية ذات عائد سنوي",
    "الحصول على قرض شخصي لشراء منزل مع سداد زيادة 10%"
  ] : [
    "Buying a car through a bank with Murabaha at a fixed 5% profit rate",
    "Trading cryptocurrencies (Bitcoin) on margin",
    "Islamic Sukuk backed by real estate assets with annual returns",
    "Taking a personal loan to buy a house with a 10% interest rate"
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-4 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500">
            {isRTL ? "المدقق المالي الإسلامي (AAOIFI)" : "Halal Finance Checker"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {isRTL 
              ? "مدعوم بالذكاء الاصطناعي لتحليل المعاملات المالية والتأكد من مطابقتها لمعايير هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية."
              : "AI-powered checker to analyze financial transactions and contracts for compliance with AAOIFI standards."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl shadow-teal-900/5 border border-slate-100 dark:border-slate-800"
          >
            <form onSubmit={handleAnalyze} className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  {isRTL ? "وصف المعاملة المالية" : "Describe the Financial Transaction"}
                </label>
                <div className="relative">
                  <textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={isRTL ? "اكتب تفاصيل المعاملة هنا... (مثال: أريد الاستثمار في صندوق مؤشرات يعتمد على شركات التكنولوجيا)" : "Enter transaction details here... (e.g., I want to invest in an index fund tracking tech companies)"}
                    className="w-full h-40 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none resize-none transition-all"
                  />
                  <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                    <button
                      type="submit"
                      disabled={isLoading || !query.trim()}
                      className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-lg transition-all flex items-center justify-center"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-500 mb-3">{isRTL ? "أمثلة للبحث:" : "Try these examples:"}</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((sq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuery(sq)}
                      className="text-left text-sm bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Result Section */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-slate-900 rounded-3xl p-8 flex flex-col items-center justify-center text-white min-h-[400px]"
                >
                  <Bot className="w-16 h-16 text-teal-400 mb-6 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">{isRTL ? "جاري التحليل..." : "Analyzing Transaction..."}</h3>
                  <p className="text-slate-400 text-center text-sm">
                    {isRTL ? "يتم مراجعة المعاملة وفق معايير AAOIFI الشرعية" : "Cross-referencing with AAOIFI Shariah standards"}
                  </p>
                </motion.div>
              )}

              {!isLoading && !result && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-slate-500 min-h-[400px]"
                >
                  <ShieldCheck className="w-16 h-16 mb-4 opacity-50 text-slate-400" />
                  <p className="text-center">
                    {isRTL ? "أدخل تفاصيل المعاملة المالية للحصول على تحليل شرعي فوري." : "Enter transaction details to receive an instant Shariah compliance analysis."}
                  </p>
                </motion.div>
              )}

              {!isLoading && result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`h-full rounded-3xl p-6 md:p-8 border-2 shadow-xl flex flex-col ${getStatusBgColor(result.isCompliant)}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full bg-gradient-to-br text-white shadow-lg ${getStatusColor(result.isCompliant)}`}>
                        {result.isCompliant === true ? <CheckCircle2 className="w-6 h-6" /> : 
                         result.isCompliant === false ? <ShieldAlert className="w-6 h-6" /> : 
                         <AlertTriangle className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                          {result.isCompliant === true ? (isRTL ? "متوافق" : "Compliant") : 
                           result.isCompliant === false ? (isRTL ? "غير متوافق" : "Non-Compliant") : 
                           (isRTL ? "شبهة / بحاجة لمزيد من التفاصيل" : "Grey Area / Needs Details")}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1 flex items-center gap-2">
                          <Bot className="w-4 h-4" /> 
                          {isRTL ? `مستوى الثقة: ${result.confidence}%` : `Confidence: ${result.confidence}%`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 mb-6 shadow-sm border border-slate-100 dark:border-slate-800 flex-1">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                      {isRTL ? "التعليل الشرعي" : "Shariah Reasoning"}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>

                  {result.issues && result.issues.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        {isRTL ? "المحاذير الشرعية المكتشفة" : "Identified Shariah Issues"}
                      </h4>
                      {result.issues.map((issue, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-xl">
                          <AlertTriangle className="w-5 h-5 shrink-0" />
                          <span className="font-medium text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-xs text-slate-500 flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>
                      {isRTL 
                        ? "إخلاء مسؤولية: هذا التحليل آلي بغرض التوعية ولا يغني عن الفتوى الرسمية من جهات الاختصاص أو اللجان الشرعية المعتمدة." 
                        : "Disclaimer: This is an automated analysis for educational purposes. It does not replace a formal Fatwa from certified Shariah boards."}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
      <PageNavigation currentPath="/religion-hub/tools/halal-finance" />
    </div>
  );
}
