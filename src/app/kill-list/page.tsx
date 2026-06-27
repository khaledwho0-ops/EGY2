'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Search, Globe, AlertTriangle, AlertOctagon, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { killList, DebunkedClaim } from '@/data/research/kill-list';
import { PageNavigation } from '@/components/shared/page-navigation';

type Lang = 'en' | 'ar';

export default function KillListPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [claims, setClaims] = useState<DebunkedClaim[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/kill-list");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setClaims(data.results || []);
        setError(null);
      } catch (err) {
        setError(lang === 'en' ? 'Failed to load claims.' : 'فشل تحميل الادعاءات.');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const filteredClaims = claims.filter(claim => 
    claim.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.claim[lang].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isRtl = lang === 'ar';

  const translations = {
    title: { en: 'Active Threats Registry', ar: 'سجل التهديدات النشطة' },
    subtitle: { en: 'A verified database of permanently debunked claims and persistent falsehoods.', ar: 'قاعدة بيانات موثقة للادعاءات المفندة بشكل دائم والأكاذيب المستمرة.' },
    search: { en: 'Search debunked claims...', ar: 'ابحث في الادعاءات المفندة...' },
    loading: { en: 'Loading verified intelligence...', ar: 'جاري تحميل الاستخبارات الموثقة...' },
    error: { en: 'Error loading data. Please try again.', ar: 'خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.' },
    noResults: { en: 'No matching claims found.', ar: 'لم يتم العثور على ادعاءات مطابقة.' },
    fact: { en: 'THE FACT', ar: 'الحقيقة' },
    claim: { en: 'THE CLAIM', ar: 'الادعاء' },
    source: { en: 'Source', ar: 'المصدر' },
    date: { en: 'Date', ar: 'التاريخ' },
    threatLevel: { en: 'Threat Level', ar: 'مستوى التهديد' }
  };

  const getThreatColor = (level: string) => {
    switch(level) {
      case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getThreatIcon = (level: string) => {
    switch(level) {
      case 'Low': return <ShieldCheck className="w-4 h-4" />;
      case 'Medium': return <Shield className="w-4 h-4" />;
      case 'High': return <ShieldAlert className="w-4 h-4" />;
      case 'Critical': return <AlertOctagon className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-4">
              <ShieldAlert className="w-10 h-10 text-red-500" />
              {translations.title[lang]}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              {translations.subtitle[lang]}
            </p>
          </div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            <Globe className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{lang === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </header>

        {/* Controls */}
        <div className="relative">
          <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center pointer-events-none`}>
            <Search className="w-5 h-5 text-slate-500" />
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={translations.search[lang]}
            className={`w-full bg-slate-900 border border-slate-800 rounded-xl py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all`}
          />
        </div>

        {/* Main Content */}
        <div className="min-h-[400px] relative">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin"></div>
              <p className="text-slate-400 animate-pulse">{translations.loading[lang]}</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" />
                <p>{error}</p>
              </div>
            </div>
          ) : filteredClaims.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-slate-500 text-lg">{translations.noResults[lang]}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredClaims.map((claim, index) => {
                  const isExpanded = expandedId === claim.id;
                  
                  return (
                    <motion.div 
                      key={claim.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors"
                    >
                      <div 
                        className="p-6 cursor-pointer flex justify-between items-center group"
                        onClick={() => setExpandedId(isExpanded ? null : claim.id)}
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit ${getThreatColor(claim.threatLevel)}`}>
                              {getThreatIcon(claim.threatLevel)}
                              {claim.threatLevel}
                            </span>
                            <span className="text-slate-500 text-sm">{claim.category}</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                            {claim.title[lang]}
                          </h3>
                        </div>
                        <div className="text-slate-500 ml-4 shrink-0">
                          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 border-t border-slate-800/50 space-y-6">
                              <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-5 mt-4">
                                <h4 className="text-red-400 font-bold text-sm tracking-wider mb-2 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  {translations.claim[lang]}
                                </h4>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                  "{claim.claim[lang]}"
                                </p>
                              </div>

                              <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-5">
                                <h4 className="text-emerald-400 font-bold text-sm tracking-wider mb-2 flex items-center gap-2">
                                  <ShieldCheck className="w-4 h-4" />
                                  {translations.fact[lang]}
                                </h4>
                                <p className="text-slate-200 leading-relaxed text-lg font-medium">
                                  {claim.fact[lang]}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-6 text-sm text-slate-500 bg-slate-950/50 p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Info className="w-4 h-4" />
                                  <span className="font-medium text-slate-400">{translations.source[lang]}:</span>
                                  {claim.source}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4" />
                                  <span className="font-medium text-slate-400">{translations.date[lang]}:</span>
                                  {claim.date}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      <PageNavigation currentPath="/kill-list" />
    </div>
  );
}
