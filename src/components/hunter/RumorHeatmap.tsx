'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, AlertTriangle } from 'lucide-react';

const C = {
  bg: '#05010A',
  surface: '#110818',
  surfaceHigh: '#1A0F24',
  primary: '#C2185B',
  primaryDeep: '#6B0F1A',
  violet: '#7B1FA2',
  azure: '#1976D2',
  amber: '#FF8F00',
  danger: '#E53935',
  textPrimary: '#F5EEF8',
  textMuted: '#9E8FA8',
  border: 'rgba(255,255,255,0.06)',
};

const REGIONS = [
  { id: 'cairo', name: 'Cairo', x: 55, y: 30, severity: 'high', radius: 40 },
  { id: 'alex', name: 'Alexandria', x: 30, y: 20, severity: 'medium', radius: 30 },
  { id: 'delta', name: 'Delta (Tanta/Mansoura)', x: 45, y: 25, severity: 'critical', radius: 50 },
  { id: 'upper1', name: 'Minya / Assiut', x: 50, y: 55, severity: 'low', radius: 25 },
  { id: 'upper2', name: 'Luxor / Aswan', x: 65, y: 75, severity: 'medium', radius: 30 },
  { id: 'canal', name: 'Suez Canal', x: 70, y: 35, severity: 'high', radius: 35 },
];

export default function RumorHeatmap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setKey(k => k + 1), 5000);
    return () => clearInterval(iv);
  }, []);

  const getSeverityColor = (sev: string) => {
    if (sev === 'critical') return C.primary;
    if (sev === 'high') return C.danger;
    if (sev === 'medium') return C.amber;
    return C.azure;
  };

  return (
    <div className="w-full h-[400px] sm:h-[500px] relative rounded-[24px] overflow-hidden flex flex-col" style={{ background: C.surface, border: `1px solid ${C.azure}30`, boxShadow: `0 0 40px ${C.azure}10` }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-6 sm:p-8" style={{ borderBottom: `1px solid ${C.border}`, zIndex: 20 }}>
        <Map size={24} style={{ color: C.azure }} />
        <h3 className="text-xl font-bold" style={{ color: C.textPrimary }}>Epidemiological Heatmap</h3>
        <div className="ml-auto text-[10px] font-bold uppercase px-2 py-1 rounded-md flex items-center gap-1" style={{ background: `${C.azure}20`, color: C.azure }}>
          مثال توضيحي — ليست بيانات حية / illustrative — not live data
        </div>
      </div>

      <div className="flex-1 relative w-full h-full p-4 overflow-hidden">
        {/* Abstract Dot Grid Map Background */}
        <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center pointer-events-none p-10">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full m-2" style={{ background: C.textPrimary }} />
          ))}
        </div>

        {/* Radar Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            transformOrigin: "center center",
            background: `conic-gradient(from 0deg, transparent 70%, ${C.azure}10 90%, ${C.azure}40 100%)`,
            marginTop: -400,
            marginLeft: -400,
            zIndex: 10,
          }}
        />

        {/* Heatmap Zones */}
        <div className="relative w-full h-full" key={key}>
          {REGIONS.map((r, i) => {
            const color = getSeverityColor(r.severity);
            const isHovered = activeRegion === r.id;
            
            return (
              <motion.div
                key={r.id}
                className="absolute flex items-center justify-center cursor-pointer z-20"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
                onMouseEnter={() => setActiveRegion(r.id)}
                onMouseLeave={() => setActiveRegion(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                {/* Pulsing Aura */}
                <motion.div
                  className="absolute rounded-full"
                  animate={{ scale: [1, 2, 3], opacity: [0.6, 0.2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  style={{ width: r.radius, height: r.radius, background: color }}
                />
                
                {/* Core Node */}
                <div 
                  className="rounded-full shadow-lg transition-transform"
                  style={{ width: 12, height: 12, background: color, boxShadow: `0 0 15px ${color}`, transform: isHovered ? 'scale(1.5)' : 'scale(1)' }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-6 whitespace-nowrap p-3 rounded-xl z-50 shadow-2xl pointer-events-none"
                      style={{ background: C.surfaceHigh, border: `1px solid ${color}50` }}
                    >
                      <div className="font-bold text-sm mb-1" style={{ color: C.textPrimary }}>{r.name}</div>
                      <div className="text-xs flex items-center gap-1 uppercase tracking-wider font-bold" style={{ color }}>
                        <AlertTriangle size={12} /> Severity: {r.severity}
                      </div>
                      <div className="text-[10px] mt-2 opacity-70" style={{ color: C.textMuted }}>
                        مثال توضيحي / illustrative only
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
