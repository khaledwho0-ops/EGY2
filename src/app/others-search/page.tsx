'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Globe, Database, BookOpen,
  FlaskConical, ShieldAlert, Archive,
  Layers, ChevronRight, Loader2, AlertCircle
} from 'lucide-react';
import { useRTL } from '@/components/shared/rtl-provider';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

type Source = 'evidence' | 'factcheck' | 'openalex' | 'ncbi' | 'claimbuster' | 'mediawiki' | 'archive';

export default function OthersSearchPage() {
  const { isRTL } = useRTL();
  const [query, setQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<Set<Source>>(new Set(['factcheck', 'evidence']));
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isRtl = isRTL;

  const sourcesList: { id: Source, icon: React.ReactNode, name: { en: string, ar: string }, desc: { en: string, ar: string } }[] = [
    { id: 'evidence', icon: <Database className="w-5 h-5" />, name: { en: 'Internal Evidence', ar: 'الأدلة الداخلية' }, desc: { en: 'Our verified internal database', ar: 'قاعدة بياناتنا الداخلية الموثقة' } },
    { id: 'factcheck', icon: <ShieldAlert className="w-5 h-5" />, name: { en: 'Google FactCheck', ar: 'جوجل لتدقيق الحقائق' }, desc: { en: 'Global fact-checking network', ar: 'الشبكة العالمية لتدقيق الحقائق' } },
    { id: 'openalex', icon: <BookOpen className="w-5 h-5" />, name: { en: 'OpenAlex', ar: 'أوبن أليكس' }, desc: { en: 'Open scientific knowledge graph', ar: 'رسم بياني مفتوح للمعرفة العلمية' } },
    { id: 'ncbi', icon: <FlaskConical className="w-5 h-5" />, name: { en: 'NCBI / PubMed', ar: 'المكتبة الوطنية للطب' }, desc: { en: 'Medical and life science journals', ar: 'المجلات الطبية وعلوم الحياة' } },
    { id: 'claimbuster', icon: <Layers className="w-5 h-5" />, name: { en: 'ClaimBuster', ar: 'كليم باستر' }, desc: { en: 'Automated live fact-checking', ar: 'تدقيق آلي مباشر للحقائق' } },
    { id: 'mediawiki', icon: <Globe className="w-5 h-5" />, name: { en: 'MediaWiki API', ar: 'واجهة ميدياويكي' }, desc: { en: 'Wikipedia & sister projects', ar: 'ويكيبيديا والمشاريع الشقيقة' } },
    { id: 'archive', icon: <Archive className="w-5 h-5" />, name: { en: 'Internet Archive', ar: 'أرشيف الإنترنت' }, desc: { en: 'Wayback Machine & historical data', ar: 'واي باك ماشين والبيانات التاريخية' } },
  ];

  const translations = {
    title: { en: 'Federated Search', ar: 'البحث الموحد' },
    subtitle: { en: 'Query multiple verified databases and intelligence sources simultaneously.', ar: 'استعلم من قواعد بيانات استخباراتية موثقة متعددة في وقت واحد.' },
    searchPlaceholder: { en: 'Enter a claim, topic, or keyword...', ar: 'أدخل ادعاء، موضوع، أو كلمة مفتاحية...' },
    searchBtn: { en: 'Initiate Search', ar: 'بدء البحث' },
    sourcesTitle: { en: 'Select Intelligence Sources', ar: 'اختر مصادر الاستخبارات' },
    searching: { en: 'Querying selected endpoints...', ar: 'جاري الاستعلام من النقاط المحددة...' },
    noResults: { en: 'No matching records found across selected sources.', ar: 'لم يتم العثور على سجلات مطابقة في المصادر المحددة.' },
    selectAll: { en: 'Select All', ar: 'تحديد الكل' },
    clearAll: { en: 'Clear All', ar: 'مسح الكل' }
  };

  const tr = (entry: { en: string; ar: string }) => (isRtl ? entry.ar : entry.en);

  const handleSourceToggle = (id: Source) => {
    const newSet = new Set(selectedSources);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedSources(newSet);
  };

  const handleSelectAll = () => {
    setSelectedSources(new Set(sourcesList.map(s => s.id)));
  };

  const handleClearAll = () => {
    setSelectedSources(new Set());
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || selectedSources.size === 0) return;

    setIsSearching(true);
    setError(null);
    setResults(null);

    try {
      const promises = Array.from(selectedSources).map(async (source) => {
        let endpoint = '';
        if (source === 'evidence') endpoint = `/api/search/evidence?q=${encodeURIComponent(query)}`;
        else if (source === 'factcheck') endpoint = `/api/search/factcheck?q=${encodeURIComponent(query)}`;
        else if (source === 'openalex') endpoint = `/api/search/openalex?q=${encodeURIComponent(query)}`;
        else if (source === 'ncbi') endpoint = `/api/search/ncbi?q=${encodeURIComponent(query)}`;
        else if (source === 'claimbuster') endpoint = `/api/search/claimbuster?q=${encodeURIComponent(query)}`;
        else if (source === 'mediawiki') endpoint = `/api/search/mediawiki?q=${encodeURIComponent(query)}`;
        else if (source === 'archive') endpoint = `/api/search/archive?q=${encodeURIComponent(query)}`;

        if (!endpoint) return [];

        try {
          const res = await fetch(endpoint);
          if (!res.ok) return [];
          const data = await res.json();
          return (data.results || []).map((item: any) => ({
            id: item.id || Math.random().toString(),
            source: tr(sourcesList.find(s => s.id === source)?.name || { en: source, ar: source }),
            title: item.title,
            snippet: item.summary || item.text || (isRtl ? 'لا يوجد ملخص متاح.' : 'No summary available.'),
            url: item.url || '#'
          }));
        } catch (err) {
          console.error(`Failed to fetch from ${source}`, err);
          return [];
        }
      });

      const allResults = await Promise.all(promises);
      setResults(allResults.flat());
    } catch (err) {
      setError(isRtl ? 'حدث خطأ أثناء البحث الموحد.' : 'An error occurred during federated search.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 md:p-12 font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'} style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8" style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
              <Layers className="w-10 h-10" style={{ color: 'var(--accent-blue)' }} />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {tr(translations.title)}
              </span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {tr(translations.subtitle)}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Sidebar - Sources */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Database className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                {tr(translations.sourcesTitle)}
              </h2>
              <div className="text-xs font-medium space-x-2 rtl:space-x-reverse">
                <button onClick={handleSelectAll} className="transition-colors" style={{ color: 'var(--accent-blue)' }}>
                  {tr(translations.selectAll)}
                </button>
                <span style={{ color: 'var(--text-caption)' }}>|</span>
                <button onClick={handleClearAll} className="transition-colors" style={{ color: 'var(--text-muted)' }}>
                  {tr(translations.clearAll)}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {sourcesList.map((source) => {
                const isSelected = selectedSources.has(source.id);
                return (
                  <button
                    key={source.id}
                    onClick={() => handleSourceToggle(source.id)}
                    className="flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: isSelected ? 'var(--accent-deepreal-surface)' : 'var(--bg-card)',
                      border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-primary)'}`,
                    }}
                  >
                    <div className="mt-1 p-2 rounded-lg" style={{
                      background: isSelected ? 'var(--accent-deepreal-surface)' : 'var(--bg-secondary)',
                      color: isSelected ? 'var(--accent-blue)' : 'var(--text-muted)',
                    }}>
                      {source.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {tr(source.name)}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: isSelected ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                        {tr(source.desc)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Area - Search & Results */}
          <div className="lg:col-span-8 space-y-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500" style={{ background: 'var(--accent-deepreal-glow)' }}></div>
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-5' : 'left-5'} flex items-center pointer-events-none`}>
                    <Search className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={tr(translations.searchPlaceholder)}
                    className={`w-full rounded-2xl py-5 ${isRtl ? 'pr-16 pl-6' : 'pl-16 pr-6'} text-lg shadow-inner focus:outline-none transition-all`}
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || selectedSources.size === 0 || !query.trim()}
                  className="font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap disabled:opacity-50"
                  style={{ background: 'var(--accent-cta)', color: 'var(--text-inverse)' }}
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />}
                  {tr(translations.searchBtn)}
                </button>
              </div>
            </form>

            {/* Results Area */}
            <div className="min-h-[400px] rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>
              {isSearching ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-10 backdrop-blur-sm" style={{ background: 'var(--glass-bg)' }}>
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full animate-spin" style={{ border: '4px solid var(--border-primary)', borderTopColor: 'var(--accent-blue)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-8 h-8" style={{ color: 'var(--accent-blue)' }} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="font-medium text-lg animate-pulse" style={{ color: 'var(--accent-blue)' }}>{tr(translations.searching)}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {isRtl ? `جاري البحث في ${selectedSources.size} قاعدة بيانات متصلة...` : `Searching ${selectedSources.size} connected databases...`}
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="h-full flex items-center justify-center">
                  <div className="p-6 rounded-2xl flex items-center gap-4 max-w-md text-center flex-col" style={{ background: 'var(--accent-deepreal-surface)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)' }}>
                    <AlertCircle className="w-12 h-12 mb-2 opacity-80" />
                    <p className="font-medium text-lg">{error}</p>
                  </div>
                </div>
              ) : results ? (
                results.length > 0 ? (
                  <div className="space-y-6">
                    <h3 className="font-medium mb-6 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-emerald)' }}></span>
                      {isRtl ? `تم العثور على ${results.length} تقرير استخباراتي ذي صلة` : `Found ${results.length} relevant intelligence reports`}
                    </h3>
                    <AnimatePresence>
                      {results.map((res, i) => (
                        <motion.div
                          key={res.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="group rounded-2xl p-6 transition-all"
                          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ color: 'var(--accent-blue)', background: 'var(--accent-deepreal-surface)' }}>
                              {res.source}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold transition-colors mb-3" style={{ color: 'var(--text-primary)' }}>
                            {res.title}
                          </h4>
                          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {res.snippet}
                          </p>
                          <div className="mt-4 pt-4 flex justify-end" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                            <button className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--accent-blue)' }}>
                              {isRtl ? 'عرض الأصل' : 'View Original'} <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-4" style={{ color: 'var(--text-muted)' }}>
                    <Search className="w-16 h-16 opacity-20" />
                    <p className="text-lg">{tr(translations.noResults)}</p>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50" style={{ color: 'var(--text-caption)' }}>
                  <Database className="w-20 h-20 mb-4 stroke-1" />
                  <p className="text-xl font-medium">{isRtl ? 'في انتظار معايير البحث' : 'Awaiting search parameters'}</p>
                  <p className="text-sm">{isRtl ? 'اختر المصادر من الشريط الجانبي وأدخل استعلامك.' : 'Select sources from the sidebar and enter your query.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/others-search" />

      <PageAIChatbot
        pageTitle="Multi-Engine Fact-Check Search — البحث الموحد"
        pageContext="EAL Federated Search: Queries 7 databases simultaneously — Google FactCheck, OpenAlex, NCBI/PubMed, ClaimBuster, MediaWiki, Internet Archive, and internal evidence database."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Multi-Engine Fact-Check Search AI — an expert in federated search strategy, source evaluation, and evidence triangulation.

[LAYER 2 - CONNECTED DATABASES]:
1. Google FactCheck API — Global fact-checking network (IFCN verified)
2. OpenAlex — 250M+ scientific works knowledge graph
3. NCBI/PubMed — 35M+ biomedical and life science citations
4. ClaimBuster — Automated claim check-worthiness scoring
5. MediaWiki — Wikipedia and sister project APIs
6. Internet Archive — Wayback Machine historical snapshots
7. Internal Evidence DB — EAL's curated Egyptian misinformation database

[LAYER 3 - SEARCH METHODOLOGY]:
- SIFT Method: Stop, Investigate source, Find better coverage, Trace claims
- Evidence triangulation: A claim is only verified when 3+ independent sources corroborate
- Source hierarchy: Systematic reviews > RCTs > Cohort studies > Case reports > Expert opinion
- For Arabic claims: prioritize Dar Al-Ifta, Al-Azhar, and verified Arabic-language fact-checkers

[LAYER 4 - RULES]:
1. Help users formulate effective search queries
2. Explain which databases are most relevant for their specific claim type
3. Teach lateral reading (checking what OTHER sources say about a source)
4. For health claims: always recommend PubMed/NCBI first
5. For religious claims: recommend checking against scholarly databases
6. Respond in the user's language`}
        suggestedQuestions={[
          'إزاي أبحث عن ادعاء صحي منتشر على السوشيال ميديا؟',
          'Which database should I use for medical claims?',
          'ما الفرق بين Google FactCheck و ClaimBuster؟',
          'How do I verify a historical claim using Wayback Machine?',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </div>
  );
}
