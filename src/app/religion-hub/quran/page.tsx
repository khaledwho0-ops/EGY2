"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import { BookOpen, Search, Loader2, ArrowLeft, ArrowRight, PlayCircle, Info, AlertCircle } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

type Surah = {
  id: number;
  name_simple: string;
  name_arabic: string;
  translated_name: { name: string };
  verses_count: number;
  revelation_place: string;
};

type Verse = {
  id: number;
  verse_key: string;
  text_uthmani: string;
};

export default function QuranBrowserPage() {
  const { isRTL } = useRTL();

  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [errorList, setErrorList] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [errorVerses, setErrorVerses] = useState<string | null>(null);

  useEffect(() => {
    fetchSurahs();
  }, []);

  async function fetchSurahs() {
    try {
      setLoadingList(true);
      const res = await fetch("https://api.quran.com/api/v4/chapters?language=en");
      if (!res.ok) throw new Error("Failed to fetch surahs");
      const data = await res.json();
      setSurahs(data.chapters);
    } catch (err: any) {
      setErrorList(err.message || "An error occurred");
    } finally {
      setLoadingList(false);
    }
  }

  const fetchVerses = async (surahId: number) => {
    try {
      setLoadingVerses(true);
      setErrorVerses(null);
      // Fetch text_uthmani
      const res = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`);
      if (!res.ok) throw new Error("Failed to fetch verses");
      const data = await res.json();
      setVerses(data.verses);
    } catch (err: any) {
      setErrorVerses(err.message || "An error occurred");
    } finally {
      setLoadingVerses(false);
    }
  };

  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    fetchVerses(surah.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSurahs = surahs.filter((s) => 
    s.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name_arabic.includes(searchQuery) ||
    s.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen bg-[#FDFBF7] dark:bg-slate-950 p-4 md:p-8 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation Bar / Header */}
        <header className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-2">
            <BookOpen className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 font-serif">
            {isRTL ? "القرآن الكريم" : "The Noble Quran"}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            {isRTL 
              ? "تصفح واقرأ سور القرآن الكريم بالرسم العثماني." 
              : "Read and explore the Holy Quran in Uthmani script."}
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!selectedSurah ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'}`}>
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? "ابحث باسم السورة (عربي أو إنجليزي)..." : "Search surah by name..."}
                  className={`w-full p-4 ${isRTL ? 'pr-12' : 'pl-12'} rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-lg shadow-sm`}
                />
              </div>

              {/* Grid of Surahs */}
              {loadingList ? (
                <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
                  <Loader2 className="w-12 h-12 animate-spin mb-4" />
                  <p>{isRTL ? "جاري تحميل قائمة السور..." : "Loading Surahs..."}</p>
                </div>
              ) : errorList ? (
                <div className="text-center text-red-500 p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl">
                  <p>{isRTL ? "حدث خطأ أثناء التحميل." : "Error loading data."}</p>
                  <p className="text-sm mt-2">{errorList}</p>
                  <button onClick={fetchSurahs} className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-lg font-medium hover:bg-red-200 transition-colors">
                    {isRTL ? "إعادة المحاولة" : "Try Again"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSurahs.map((surah) => (
                    <motion.button
                      key={surah.id}
                      onClick={() => handleSelectSurah(surah)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                          <span className="font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {surah.id}
                          </span>
                        </div>
                        <div className={isRTL ? "text-right" : "text-left"}>
                          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-lg">{surah.name_simple}</h3>
                          <p className="text-xs text-slate-500 uppercase tracking-wider">{surah.translated_name.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h3 className="font-arabic text-2xl text-emerald-700 dark:text-emerald-400">{surah.name_arabic}</h3>
                        <p className="text-xs text-slate-400 mt-1">{surah.verses_count} {isRTL ? "آيات" : "Verses"}</p>
                      </div>
                    </motion.button>
                  ))}
                  {filteredSurahs.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500">
                      {isRTL ? "لم يتم العثور على نتائج." : "No surahs found."}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="reader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              {/* Reader Header */}
              <div className="bg-emerald-700 dark:bg-slate-800 text-white p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <BookOpen className="w-64 h-64" />
                </div>
                
                <button 
                  onClick={() => setSelectedSurah(null)}
                  className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors mb-6 font-medium bg-emerald-800/50 dark:bg-slate-700/50 w-fit px-4 py-2 rounded-xl"
                >
                  {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                  {isRTL ? "العودة للفهرس" : "Back to Index"}
                </button>

                <div className="text-center relative z-10 space-y-4">
                  <h2 className="text-5xl md:text-7xl font-arabic leading-relaxed pb-2">
                    {selectedSurah.name_arabic}
                  </h2>
                  <div className="flex items-center justify-center gap-4 text-emerald-100 text-sm font-medium tracking-widest uppercase">
                    <span>{selectedSurah.name_simple}</span>
                    <span>•</span>
                    <span>{selectedSurah.revelation_place === "makkah" ? (isRTL ? "مكية" : "Meccan") : (isRTL ? "مدنية" : "Medinan")}</span>
                    <span>•</span>
                    <span>{selectedSurah.verses_count} {isRTL ? "آيات" : "Verses"}</span>
                  </div>
                </div>
              </div>

              {/* Reader Body */}
              <div className="p-6 md:p-12">
                {/* Bismillah (except Surah At-Tawbah ID 9) */}
                {selectedSurah.id !== 9 && (
                  <div className="text-center mb-12">
                    <p className="text-3xl md:text-4xl font-arabic text-slate-800 dark:text-slate-200">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                  </div>
                )}

                {loadingVerses ? (
                  <div className="flex flex-col items-center justify-center py-32 text-emerald-600">
                    <Loader2 className="w-12 h-12 animate-spin mb-4" />
                    <p>{isRTL ? "جاري تحميل الآيات..." : "Loading verses..."}</p>
                  </div>
                ) : errorVerses ? (
                  <div className="text-center text-red-500 py-20">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{errorVerses}</p>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto" dir="rtl">
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 leading-loose">
                      {verses.map((verse) => (
                        <span key={verse.id} className="inline font-arabic text-2xl md:text-4xl text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-text">
                          {verse.text_uthmani}
                          <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 mx-2 text-sm md:text-base border-2 border-emerald-200 dark:border-emerald-800 rounded-full text-emerald-700 dark:text-emerald-500 font-sans mx-1 align-middle">
                            {verse.verse_key.split(":")[1]}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <PageNavigation currentPath="/religion-hub/quran" />
    </div>
  );
}
