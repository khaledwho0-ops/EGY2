"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import { Users, User, ArrowRight, PieChart, ShieldAlert } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function MawarithCalculatorPage() {
  const { isRTL } = useRTL();

  const [estateValue, setEstateValue] = useState<number | "">("");
  const [deceasedGender, setDeceasedGender] = useState<"male" | "female">("male");
  const [spouseCount, setSpouseCount] = useState<number>(0);
  const [sonsCount, setSonsCount] = useState<number>(0);
  const [daughtersCount, setDaughtersCount] = useState<number>(0);
  const [fatherAlive, setFatherAlive] = useState<boolean>(false);
  const [motherAlive, setMotherAlive] = useState<boolean>(false);

  const calculateShares = () => {
    if (!estateValue || estateValue <= 0) return null;
    
    let remainingEstate = Number(estateValue);
    const shares: { heir: string; fraction: string; amount: number; percentage: number }[] = [];
    
    const hasChildren = sonsCount > 0 || daughtersCount > 0;
    const hasMaleChildren = sonsCount > 0;

    // 1. Spouses
    if (deceasedGender === "male" && spouseCount > 0) {
      // Wives get 1/8 if children, 1/4 if no children
      const shareFraction = hasChildren ? 1/8 : 1/4;
      const totalWivesShare = Number(estateValue) * shareFraction;
      const sharePerWife = totalWivesShare / spouseCount;
      for (let i = 0; i < spouseCount; i++) {
        shares.push({ heir: isRTL ? `الزوجة ${i+1}` : `Wife ${i+1}`, fraction: hasChildren ? "1/8" : "1/4", amount: sharePerWife, percentage: shareFraction * 100 / spouseCount });
      }
      remainingEstate -= totalWivesShare;
    } else if (deceasedGender === "female" && spouseCount === 1) {
      // Husband gets 1/4 if children, 1/2 if no children
      const shareFraction = hasChildren ? 1/4 : 1/2;
      const husbandShare = Number(estateValue) * shareFraction;
      shares.push({ heir: isRTL ? "الزوج" : "Husband", fraction: hasChildren ? "1/4" : "1/2", amount: husbandShare, percentage: shareFraction * 100 });
      remainingEstate -= husbandShare;
    }

    // 2. Parents
    if (fatherAlive) {
      // Father gets 1/6 if male children, 1/6 + residue if female only or no children
      const fatherShare = Number(estateValue) * (1/6);
      shares.push({ heir: isRTL ? "الأب" : "Father", fraction: "1/6", amount: fatherShare, percentage: 16.66 });
      remainingEstate -= fatherShare;
    }
    if (motherAlive) {
      // Mother gets 1/6 if children or siblings, 1/3 otherwise
      // Simplifying to 1/6 if children, else 1/3
      const shareFraction = hasChildren ? 1/6 : 1/3;
      const motherShare = Number(estateValue) * shareFraction;
      shares.push({ heir: isRTL ? "الأم" : "Mother", fraction: hasChildren ? "1/6" : "1/3", amount: motherShare, percentage: shareFraction * 100 });
      remainingEstate -= motherShare;
    }

    // 3. Children (Residue)
    if (hasChildren) {
      if (sonsCount > 0) {
        // Sons and daughters split the residue. Son gets 2x daughter.
        const totalShares = (sonsCount * 2) + daughtersCount;
        const sharePerUnit = remainingEstate / totalShares;
        
        for (let i = 0; i < sonsCount; i++) {
          shares.push({ heir: isRTL ? `ابن ${i+1}` : `Son ${i+1}`, fraction: "Residue (2x)", amount: sharePerUnit * 2, percentage: ((sharePerUnit * 2) / Number(estateValue)) * 100 });
        }
        for (let i = 0; i < daughtersCount; i++) {
          shares.push({ heir: isRTL ? `ابنة ${i+1}` : `Daughter ${i+1}`, fraction: "Residue (1x)", amount: sharePerUnit, percentage: (sharePerUnit / Number(estateValue)) * 100 });
        }
        remainingEstate = 0;
      } else if (daughtersCount > 0) {
        // Only daughters
        let daughterShare = 0;
        let fractionStr = "";
        let percentage = 0;

        if (daughtersCount === 1) {
          daughterShare = Number(estateValue) * (1/2);
          fractionStr = "1/2";
          percentage = 50;
          shares.push({ heir: isRTL ? "ابنة" : "Daughter", fraction: fractionStr, amount: daughterShare, percentage });
          remainingEstate -= daughterShare;
        } else {
          const totalDaughtersShare = Number(estateValue) * (2/3);
          daughterShare = totalDaughtersShare / daughtersCount;
          fractionStr = "2/3 Total";
          percentage = (totalDaughtersShare / Number(estateValue)) * 100 / daughtersCount;
          for (let i = 0; i < daughtersCount; i++) {
            shares.push({ heir: isRTL ? `ابنة ${i+1}` : `Daughter ${i+1}`, fraction: fractionStr, amount: daughterShare, percentage });
          }
          remainingEstate -= totalDaughtersShare;
        }
      }
    }

    // Distribute remaining back to father if alive and no sons (Ta'seeb)
    if (remainingEstate > 0.01 && fatherAlive && sonsCount === 0) {
      const fatherIdx = shares.findIndex(s => s.heir === (isRTL ? "الأب" : "Father"));
      if (fatherIdx !== -1) {
        shares[fatherIdx].amount += remainingEstate;
        shares[fatherIdx].fraction += " + Residue";
        shares[fatherIdx].percentage += (remainingEstate / Number(estateValue)) * 100;
        remainingEstate = 0;
      }
    }

    return { shares, remainingEstate };
  };

  const result = calculateShares();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
            <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
            {isRTL ? "نظام المواريث الشرعي" : "Islamic Inheritance (Mawarith)"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            {isRTL 
              ? "حاسبة دقيقة لتوزيع التركات والمواريث وفقاً للأنصبة الشرعية المقررة."
              : "Accurate calculator for estate distribution based on fixed Quranic shares."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xl shadow-indigo-900/5 border border-slate-100 dark:border-slate-800"
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-4">
              {isRTL ? "بيانات التركة" : "Estate Details"}
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {isRTL ? "إجمالي التركة (بعد سداد الديون والوصايا)" : "Total Estate Value (After debts & bequests)"}
                </label>
                <input 
                  type="number"
                  value={estateValue}
                  onChange={(e) => setEstateValue(e.target.value ? Number(e.target.value) : "")}
                  placeholder="0.00"
                  className="w-full text-xl p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {isRTL ? "جنس المتوفى" : "Gender of Deceased"}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setDeceasedGender("male"); setSpouseCount(0); }}
                    className={`p-3 rounded-xl border-2 transition-all font-medium ${deceasedGender === "male" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600"}`}
                  >
                    {isRTL ? "ذكر" : "Male"}
                  </button>
                  <button
                    onClick={() => { setDeceasedGender("female"); setSpouseCount(0); }}
                    className={`p-3 rounded-xl border-2 transition-all font-medium ${deceasedGender === "female" ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300" : "border-slate-200 dark:border-slate-700 text-slate-600"}`}
                  >
                    {isRTL ? "أنثى" : "Female"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {deceasedGender === "male" ? (isRTL ? "عدد الزوجات على قيد الحياة" : "Surviving Wives") : (isRTL ? "الزوج على قيد الحياة" : "Surviving Husband")}
                </label>
                <div className="flex items-center gap-4">
                  {deceasedGender === "male" ? (
                    [0, 1, 2, 3, 4].map(n => (
                      <button 
                        key={n}
                        onClick={() => setSpouseCount(n)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${spouseCount === n ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}
                      >
                        {n}
                      </button>
                    ))
                  ) : (
                    <div className="flex gap-4 w-full">
                      <button onClick={() => setSpouseCount(1)} className={`flex-1 p-2 rounded-lg border-2 ${spouseCount === 1 ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'}`}>{isRTL ? "نعم" : "Yes"}</button>
                      <button onClick={() => setSpouseCount(0)} className={`flex-1 p-2 rounded-lg border-2 ${spouseCount === 0 ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200'}`}>{isRTL ? "لا" : "No"}</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{isRTL ? "عدد الأبناء (ذكور)" : "Sons"}</label>
                  <input type="number" min="0" value={sonsCount} onChange={e => setSonsCount(Number(e.target.value) || 0)} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{isRTL ? "عدد البنات (إناث)" : "Daughters"}</label>
                  <input type="number" min="0" value={daughtersCount} onChange={e => setDaughtersCount(Number(e.target.value) || 0)} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{isRTL ? "الوالدان" : "Parents Alive?"}</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input type="checkbox" checked={fatherAlive} onChange={e => setFatherAlive(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                    <span>{isRTL ? "الأب على قيد الحياة" : "Father is alive"}</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input type="checkbox" checked={motherAlive} onChange={e => setMotherAlive(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
                    <span>{isRTL ? "الأم على قيد الحياة" : "Mother is alive"}</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <PieChart className="w-64 h-64" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 z-10 flex items-center gap-3">
              <User className="w-6 h-6 text-indigo-400" />
              {isRTL ? "توزيع الأنصبة" : "Shares Distribution"}
            </h3>

            {!estateValue ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 z-10">
                <ShieldAlert className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg text-center max-w-sm">
                  {isRTL ? "الرجاء إدخال قيمة التركة والورثة لحساب الأنصبة بدقة." : "Please enter the estate value and heirs to calculate shares."}
                </p>
              </div>
            ) : (
              <div className="space-y-4 z-10 flex-1 overflow-y-auto pr-2 scrollbar-hide">
                {result?.shares.length === 0 ? (
                  <p className="text-slate-400">{isRTL ? "لا يوجد ورثة مستحقين في هذه الحالة." : "No eligible heirs in this scenario."}</p>
                ) : (
                  result?.shares.map((share, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center font-bold">
                          {Math.round(share.percentage)}%
                        </div>
                        <div>
                          <p className="font-bold text-lg text-white">{share.heir}</p>
                          <p className="text-indigo-300 text-sm">{isRTL ? "النصيب الشرعي:" : "Legal Share:"} {share.fraction}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">{share.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className="text-slate-400 text-sm">EGP</p>
                      </div>
                    </motion.div>
                  ))
                )}

                {result && result.remainingEstate > 0.01 && (
                  <div className="bg-red-900/30 border border-red-500/30 p-4 rounded-2xl mt-6">
                    <p className="text-red-300 font-bold mb-1">{isRTL ? "الباقي (رد للخزانة أو الأقارب)" : "Remaining Residue (Baitul Mal / Extended Family)"}</p>
                    <p className="text-xl font-black text-white">{result.remainingEstate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

        </div>
      </div>
      <PageNavigation currentPath="/religion-hub/tools/mawarith" />
    </div>
  );
}
