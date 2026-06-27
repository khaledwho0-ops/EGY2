"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import { Calculator, Coins, Briefcase, Gem, Info, AlertCircle, ChevronRight, Check } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function ZakatCalculatorPage() {
  const { isRTL } = useRTL();
  
  const [activeTab, setActiveTab] = useState("cash");
  const [cashAmount, setCashAmount] = useState<number | "">("");
  const [goldGrams, setGoldGrams] = useState<number | "">("");
  const [goldPurity, setGoldPurity] = useState<24 | 21 | 18>(21);
  const [silverGrams, setSilverGrams] = useState<number | "">("");
  const [businessInventory, setBusinessInventory] = useState<number | "">("");
  const [businessCash, setBusinessCash] = useState<number | "">("");
  const [businessDebts, setBusinessDebts] = useState<number | "">("");
  
  // Market prices (mocked for demo, realistically fetched)
  const GOLD_PRICE_24K_EGP = 3800; // EGP per gram
  const SILVER_PRICE_EGP = 45; // EGP per gram
  
  // Nisab calculations (AAOIFI standards)
  const nisabGold = 85 * GOLD_PRICE_24K_EGP;
  const nisabSilver = 595 * SILVER_PRICE_EGP;
  // Usually cash nisab is based on gold or silver. AAOIFI often allows either; conservative approach uses silver.
  const cashNisab = nisabSilver;

  const calculateZakat = () => {
    let zakatTotal = 0;
    let isEligible = false;
    let details = [];

    // Cash Zakat
    const cash = Number(cashAmount) || 0;
    if (cash >= cashNisab) {
      zakatTotal += cash * 0.025;
      isEligible = true;
      details.push({ type: "Cash", amount: cash * 0.025 });
    }

    // Gold Zakat
    const gold = Number(goldGrams) || 0;
    let gold24Equivalent = gold;
    if (goldPurity === 21) gold24Equivalent = gold * (21 / 24);
    if (goldPurity === 18) gold24Equivalent = gold * (18 / 24);
    
    if (gold24Equivalent >= 85) {
      const goldValue = gold24Equivalent * GOLD_PRICE_24K_EGP;
      zakatTotal += goldValue * 0.025;
      isEligible = true;
      details.push({ type: "Gold", amount: goldValue * 0.025 });
    }

    // Silver Zakat
    const silver = Number(silverGrams) || 0;
    if (silver >= 595) {
      const silverValue = silver * SILVER_PRICE_EGP;
      zakatTotal += silverValue * 0.025;
      isEligible = true;
      details.push({ type: "Silver", amount: silverValue * 0.025 });
    }

    // Business Zakat (Inventory + Cash - Debts)
    const inventory = Number(businessInventory) || 0;
    const bCash = Number(businessCash) || 0;
    const debts = Number(businessDebts) || 0;
    const netBusinessAssets = inventory + bCash - debts;
    
    if (netBusinessAssets >= cashNisab) {
      zakatTotal += netBusinessAssets * 0.025;
      isEligible = true;
      details.push({ type: "Business", amount: netBusinessAssets * 0.025 });
    }

    return { zakatTotal, isEligible, details };
  };

  const results = calculateZakat();

  const tabs = [
    { id: "cash", icon: Coins, label: isRTL ? "النقدية" : "Cash" },
    { id: "gold", icon: Gem, label: isRTL ? "الذهب والفضة" : "Gold & Silver" },
    { id: "business", icon: Briefcase, label: isRTL ? "عروض التجارة" : "Business" },
  ];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
            {isRTL ? "حاسبة الزكاة الذكية" : "Smart Zakat Calculator"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {isRTL 
              ? "احسب زكاتك بدقة وفقاً لمعايير هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية (AAOIFI)."
              : "Calculate your Zakat accurately according to AAOIFI standards."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Calculator Panel */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-emerald-900/5 border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-100 dark:border-slate-800 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 p-4 text-sm md:text-base font-medium transition-colors ${
                    activeTab === tab.id 
                      ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/10" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "cash" && (
                  <motion.div
                    key="cash"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? "المبالغ النقدية والمدخرات (ج.م)" : "Cash & Savings (EGP)"}
                      </label>
                      <input 
                        type="number"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value ? Number(e.target.value) : "")}
                        placeholder="0.00"
                        className="w-full text-2xl p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 text-blue-700 dark:text-blue-300">
                      <Info className="w-6 h-6 shrink-0" />
                      <p className="text-sm">
                        {isRTL 
                          ? "يشمل ذلك الأموال في الحسابات البنكية، والودائع، والنقد السائل."
                          : "This includes money in bank accounts, deposits, and liquid cash."}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "gold" && (
                  <motion.div
                    key="gold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{isRTL ? "الذهب" : "Gold"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {isRTL ? "الوزن (جرام)" : "Weight (Grams)"}
                          </label>
                          <input 
                            type="number"
                            value={goldGrams}
                            onChange={(e) => setGoldGrams(e.target.value ? Number(e.target.value) : "")}
                            placeholder="0"
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {isRTL ? "العيار" : "Purity"}
                          </label>
                          <select 
                            value={goldPurity}
                            onChange={(e) => setGoldPurity(Number(e.target.value) as 24|21|18)}
                            className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                          >
                            <option value={24}>{isRTL ? "عيار 24" : "24K"}</option>
                            <option value={21}>{isRTL ? "عيار 21" : "21K"}</option>
                            <option value={18}>{isRTL ? "عيار 18" : "18K"}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{isRTL ? "الفضة" : "Silver"}</h3>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          {isRTL ? "الوزن (جرام)" : "Weight (Grams)"}
                        </label>
                        <input 
                          type="number"
                          value={silverGrams}
                          onChange={(e) => setSilverGrams(e.target.value ? Number(e.target.value) : "")}
                          placeholder="0"
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "business" && (
                  <motion.div
                    key="business"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? "قيمة البضائع المتوفرة" : "Value of Inventory"}
                      </label>
                      <input 
                        type="number"
                        value={businessInventory}
                        onChange={(e) => setBusinessInventory(e.target.value ? Number(e.target.value) : "")}
                        placeholder="0.00"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? "السيولة النقدية للنشاط" : "Business Cash/Bank Balance"}
                      </label>
                      <input 
                        type="number"
                        value={businessCash}
                        onChange={(e) => setBusinessCash(e.target.value ? Number(e.target.value) : "")}
                        placeholder="0.00"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        {isRTL ? "الخصوم/الديون المستحقة قريباً" : "Short-term Liabilities/Debts"}
                      </label>
                      <input 
                        type="number"
                        value={businessDebts}
                        onChange={(e) => setBusinessDebts(e.target.value ? Number(e.target.value) : "")}
                        placeholder="0.00"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-emerald-900/20 flex flex-col h-full"
          >
            <div className="flex-1 space-y-6">
              <h3 className="text-xl font-bold opacity-90">{isRTL ? "ملخص الزكاة" : "Zakat Summary"}</h3>
              
              <div className="space-y-2">
                <p className="text-emerald-100 text-sm uppercase tracking-wider">
                  {isRTL ? "إجمالي الزكاة المستحقة" : "Total Zakat Payable"}
                </p>
                <div className="text-5xl font-extrabold tracking-tight">
                  {results.zakatTotal > 0 ? results.zakatTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                  <span className="text-2xl ml-2 font-normal opacity-70">EGP</span>
                </div>
              </div>

              {results.details.length > 0 && (
                <div className="pt-6 border-t border-emerald-500/50 space-y-3">
                  <p className="text-sm opacity-80 mb-4">{isRTL ? "التفاصيل:" : "Breakdown:"}</p>
                  {results.details.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                      <span className="font-medium">{item.type}</span>
                      <span className="font-bold">{item.amount.toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>
              )}

              {!results.isEligible && (cashAmount || goldGrams || silverGrams || businessInventory) ? (
                <div className="bg-amber-500/20 border border-amber-500/50 p-4 rounded-xl flex items-start gap-3 mt-6">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-200 mt-0.5" />
                  <p className="text-sm text-amber-50 leading-relaxed">
                    {isRTL 
                      ? "الممتلكات الحالية لم تبلغ النصاب. لا تجب الزكاة في الوقت الحالي." 
                      : "Current assets have not reached the Nisab threshold. No Zakat is due at this time."}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/50">
              <div className="flex justify-between text-sm opacity-80 mb-2">
                <span>{isRTL ? "نصاب الذهب (24 قيراط)" : "Gold Nisab (24K)"}</span>
                <span>85 {isRTL ? "جرام" : "Grams"}</span>
              </div>
              <div className="flex justify-between text-sm opacity-80">
                <span>{isRTL ? "نصاب الفضة / النقد" : "Silver / Cash Nisab"}</span>
                <span>595 {isRTL ? "جرام" : "Grams"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <PageNavigation currentPath="/religion-hub/tools/zakat-calculator" />
    </div>
  );
}
