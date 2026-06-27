'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Crosshair, TrendingUp, Search, Activity, UserX, UserCheck, AlertTriangle, Loader2 } from 'lucide-react';
import RumorHeatmap from './RumorHeatmap';

const C = {
  bg: '#0a0310',
  surface: '#150920',
  surfaceHigh: '#1c0c2b',
  primary: '#ff3366',
  primaryDeep: '#8a0030',
  primaryGlow: 'rgba(255,51,102,0.4)',
  violet: '#9d4edd',
  azure: '#00f5d4',
  amber: '#ffb703',
  danger: '#e63946',
  success: '#2a9d8f',
  ice: '#e0fbfc',
  textPrimary: '#ffffff',
  textMuted: '#a098b0',
  border: '#2a163d',
};

const pop: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 140, damping: 20 } },
};

export default function HunterMode({ onExit }: { onExit: () => void }) {
  const [activeTab, setActiveTab] = useState<'EG' | 'US'>('EG');
  const [trends, setTrends] = useState<any[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(true);

  // Medical Hunter state
  const [medName, setMedName] = useState('');
  const [medResults, setMedResults] = useState<any[] | null>(null);
  const [medLoading, setMedLoading] = useState(false);

  useEffect(() => {
    setLoadingTrends(true);
    setTrends([]);
    fetch(`/api/hunter/trends?geo=${activeTab}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setTrends(d.data.slice(0, 15));
        setLoadingTrends(false);
      })
      .catch(() => setLoadingTrends(false));
  }, [activeTab]);

  const handleMedSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName) return;
    setMedLoading(true);
    setMedResults(null);
    try {
      const res = await fetch('/api/hunter/medical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: medName })
      });
      const data = await res.json();
      if (data.success) {
        setMedResults(data.results);
      } else {
        setMedResults([]);
      }
    } catch (e) {
      setMedResults([]);
    }
    setMedLoading(false);
  };

  return (
    <motion.div
      initial="hidden" animate="show" exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="w-full flex flex-col gap-8"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <motion.div variants={pop} className="flex justify-between items-end mb-4">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <Crosshair size={28} style={{ color: C.danger }} />
            <h2 className="text-4xl font-black uppercase tracking-widest" style={{ color: C.textPrimary }}>HUNTER</h2>
          </div>
          <p className="text-sm font-medium" style={{ color: C.textMuted }}>PROACTIVE OSINT & TREND RADAR</p>
        </div>
        <button
          onClick={onExit}
          className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:opacity-80 cursor-pointer"
          style={{ background: `${C.surfaceHigh}`, border: `1px solid ${C.border}`, color: C.textMuted }}
        >
          Exit Hunter Mode
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ══ TREND RADAR ══ */}
        <motion.div variants={pop} className="p-6 sm:p-8 rounded-[24px] flex flex-col" style={{ background: C.surface, border: `1px solid ${C.danger}30`, boxShadow: `0 0 40px ${C.danger}10` }}>
          <div className="flex items-center gap-3 mb-6" style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: '16px' }}>
            <TrendingUp size={24} style={{ color: C.amber }} />
            <h3 className="text-xl font-bold" style={{ color: C.textPrimary }}>Live Trend Radar</h3>
            {loadingTrends && <Loader2 size={16} className="animate-spin ml-auto" style={{ color: C.textMuted }} />}
          </div>
          
          <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}>
            <button
              onClick={() => setActiveTab('EG')}
              className="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
              style={{
                background: activeTab === 'EG' ? `${C.danger}20` : 'transparent',
                color: activeTab === 'EG' ? C.textPrimary : C.textMuted,
                border: `1px solid ${activeTab === 'EG' ? C.danger + '40' : 'transparent'}`,
              }}
            >
              Egypt
            </button>
            <button
              onClick={() => setActiveTab('US')}
              className="flex-1 py-2 text-sm font-bold rounded-lg transition-all"
              style={{
                background: activeTab === 'US' ? `${C.azure}20` : 'transparent',
                color: activeTab === 'US' ? C.textPrimary : C.textMuted,
                border: `1px solid ${activeTab === 'US' ? C.azure + '40' : 'transparent'}`,
              }}
            >
              Worldwide
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-3 pr-2 max-h-[500px] overflow-y-auto custom-scrollbar">
            {trends.length === 0 && !loadingTrends && (
              <div className="text-center p-8 text-sm" style={{ color: C.textMuted }}>No active trends detected for {activeTab === 'EG' ? 'Egypt' : 'Worldwide'}.</div>
            )}
            {trends.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                key={i} 
                className="flex items-center justify-between p-4 rounded-xl group transition-all" 
                style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors group-hover:bg-amber-500/20" style={{ background: `${C.amber}10`, color: C.amber }}>
                    #{i + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm" style={{ color: C.textPrimary }} dir="auto">{t.title}</div>
                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>Volume: {t.traffic || 'Surging'}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══ OSINT TOOLKIT: MEDICAL HUNTER ══ */}
        <motion.div variants={pop} className="p-6 sm:p-8 rounded-[24px] flex flex-col" style={{ background: C.surface, border: `1px solid ${C.azure}30`, boxShadow: `0 0 40px ${C.azure}10` }}>
          <div className="flex items-center gap-3 mb-6 pb-6" style={{ borderBottom: `1px solid ${C.border}` }}>
            <Activity size={24} style={{ color: C.azure }} />
            <h3 className="text-xl font-bold" style={{ color: C.textPrimary }}>Medical Credentials Hunter</h3>
            <div className="ml-auto text-[10px] font-bold uppercase px-2 py-1 rounded-md" style={{ background: `${C.azure}20`, color: C.azure }}>
              EMS Database
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: C.textMuted }} dir="auto">
            Search the Egyptian Medical Syndicate database to verify a doctor's credentials. 
            The system automatically injects wildcards (%) to bypass strict ID name requirements.
          </p>

          <form onSubmit={handleMedSearch} className="flex gap-3 mb-8 relative">
            <input
              value={medName}
              onChange={e => setMedName(e.target.value)}
              placeholder="e.g. اسماعيل اللمعي"
              className="flex-1 rounded-xl px-5 py-3 text-sm font-medium focus:outline-none transition-all"
              dir="auto"
              style={{
                background: C.surfaceHigh,
                border: `1px solid ${medName ? C.azure + "50" : C.border}`,
                color: C.textPrimary,
                fontFamily: "'IBM Plex Sans Arabic', sans-serif"
              }}
            />
            <button
              type="submit"
              disabled={medLoading || !medName}
              className="px-6 rounded-xl flex items-center justify-center transition-all cursor-pointer font-bold"
              style={{
                background: medName && !medLoading ? `linear-gradient(135deg, ${C.azure}, ${C.success})` : C.surfaceHigh,
                color: medName && !medLoading ? '#000' : C.textMuted,
              }}
            >
              {medLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </button>
          </form>

          {/* Results */}
          <div className="flex-1 flex flex-col gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {medResults && medResults.length === 0 && (
              <div className="text-center p-8 rounded-xl" style={{ background: `${C.danger}10`, border: `1px dashed ${C.danger}30` }}>
                <UserX size={32} className="mx-auto mb-3" style={{ color: C.danger }} />
                <div className="font-bold text-sm" style={{ color: C.textPrimary }}>No registered doctor found.</div>
                <div className="text-xs mt-2" style={{ color: C.danger }}>Warning: Potential imposter.</div>
              </div>
            )}
            
            {medResults && medResults.map((r, i) => {
              const isWarning = r.status.includes('تحذير') || r.title.includes('غير مسجل');
              const color = isWarning ? C.danger : C.success;
              const Icon = isWarning ? AlertTriangle : UserCheck;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl border flex gap-4 items-center"
                  dir="rtl"
                  style={{ background: `${color}08`, borderColor: `${color}30` }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: C.textPrimary, fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>{r.name}</div>
                    <div className="text-sm mt-1 font-medium" style={{ color }}>{r.title}</div>
                    <div className="text-xs mt-1" style={{ color: C.textMuted }}>الحالة: {r.status}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* ══ EPIDEMIOLOGICAL HEATMAP ══ */}
      <div className="w-full mt-4">
        <RumorHeatmap />
      </div>
    </motion.div>
  );
}
