'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Smartphone, Database, AlertOctagon, Share2, Target, ScanEye } from 'lucide-react';

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

type Node = { id: string; label: string; type: 'origin' | 'platform' | 'group' | 'target'; x: number; y: number; delay: number };
type Edge = { source: string; target: string; delay: number };

const NODES: Node[] = [
  { id: 'n1', label: 'Patient Zero (Anon Board)', type: 'origin', x: 50, y: 50, delay: 0 },
  { id: 'n2', label: 'Telegram Channel X', type: 'platform', x: 25, y: 150, delay: 0.5 },
  { id: 'n3', label: 'Twitter Bot Farm', type: 'platform', x: 75, y: 150, delay: 0.8 },
  { id: 'n4', label: 'Family WhatsApp Grp', type: 'group', x: 25, y: 280, delay: 1.5 },
  { id: 'n5', label: 'Facebook Local Page', type: 'group', x: 75, y: 280, delay: 1.8 },
  { id: 'n6', label: 'General Public (Egypt)', type: 'target', x: 50, y: 400, delay: 2.5 },
];

const EDGES: Edge[] = [
  { source: 'n1', target: 'n2', delay: 0.5 },
  { source: 'n1', target: 'n3', delay: 0.8 },
  { source: 'n2', target: 'n4', delay: 1.5 },
  { source: 'n3', target: 'n5', delay: 1.8 },
  { source: 'n4', target: 'n6', delay: 2.5 },
  { source: 'n5', target: 'n6', delay: 2.6 },
  { source: 'n3', target: 'n4', delay: 2.0 },
];

export default function ThreatMap({ claim, title = "Patient Zero Propagation Map" }: { claim?: string, title?: string }) {
  const [key, setKey] = useState(0);

  // Restart animation every 8 seconds
  useEffect(() => {
    const iv = setInterval(() => setKey(prev => prev + 1), 8000);
    return () => clearInterval(iv);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'origin': return <AlertOctagon size={24} color={C.danger} />;
      case 'platform': return <Database size={20} color={C.violet} />;
      case 'group': return <Smartphone size={20} color={C.amber} />;
      case 'target': return <Target size={28} color={C.primary} />;
      default: return <Share2 size={20} color={C.textMuted} />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'origin': return C.danger;
      case 'platform': return C.violet;
      case 'group': return C.amber;
      case 'target': return C.primary;
      default: return C.textMuted;
    }
  };

  return (
    <div className="w-full h-[500px] relative rounded-[24px] overflow-hidden" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Header */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <ScanEye size={20} style={{ color: C.danger }} />
          <h3 className="font-bold text-lg tracking-wide uppercase" style={{ color: C.textPrimary }}>{title}</h3>
        </div>
        {claim && <p className="text-sm font-medium opacity-80" style={{ color: C.textMuted }}>Tracking: "{claim}"</p>}
      </div>

      {/* Illustrative disclaimer — visible below the header */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4">
        <div style={{
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid rgba(255,200,0,0.35)',
          borderRadius: 8,
          padding: '5px 14px',
          fontSize: 11,
          color: '#FFD54F',
          textAlign: 'center',
          backdropFilter: 'blur(4px)',
          lineHeight: 1.5,
        }}>
          مثال توضيحي — ليست بيانات حية &nbsp;/&nbsp; Illustrative — not live data
        </div>
      </div>

      {/* Graph Area */}
      <div className="absolute inset-0 mt-16 mb-12" key={key}>
        {/* Draw Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {EDGES.map((e, i) => {
            const s = NODES.find(n => n.id === e.source)!;
            const t = NODES.find(n => n.id === e.target)!;
            return (
              <motion.path
                key={`edge-${i}`}
                d={`M ${s.x}% ${s.y} Q 50% ${(s.y + t.y) / 2} ${t.x}% ${t.y}`}
                fill="none"
                stroke={C.primary}
                strokeWidth={2}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.5, delay: e.delay, ease: "easeInOut" }}
              />
            );
          })}
          {/* Animated data packets */}
          {EDGES.map((e, i) => {
            const s = NODES.find(n => n.id === e.source)!;
            const t = NODES.find(n => n.id === e.target)!;
            return (
              <motion.circle
                key={`packet-${i}`}
                r={4}
                fill={C.danger}
                style={{ filter: `drop-shadow(0 0 6px ${C.danger})` }}
                initial={{ cx: `${s.x}%`, cy: s.y, opacity: 0 }}
                animate={{ cx: `${t.x}%`, cy: t.y, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: e.delay + 0.2, repeat: Infinity, repeatDelay: 1 }}
              />
            );
          })}
        </svg>

        {/* Draw Nodes */}
        {NODES.map((n, i) => {
          const color = getNodeColor(n.type);
          return (
            <motion.div
              key={n.id}
              className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: n.y, zIndex: 10 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: n.delay }}
            >
              {/* Node Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: n.delay }}
                style={{ background: `radial-gradient(circle, ${color}, transparent 70%)`, width: 80, height: 80, left: -40 + 24, top: -40 + 24, zIndex: -1 }}
              />
              {/* Node Icon Container */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: C.surfaceHigh, border: `2px solid ${color}`, boxShadow: `0 0 15px ${color}40` }}
              >
                {getNodeIcon(n.type)}
              </div>
              {/* Node Label */}
              <div
                className="mt-2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                style={{ background: `${color}15`, color: color, border: `1px solid ${color}30`, backdropFilter: 'blur(4px)' }}
              >
                {n.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
