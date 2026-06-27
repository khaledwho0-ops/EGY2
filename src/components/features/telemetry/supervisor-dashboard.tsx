"use client";
import React, { useState } from 'react';
import { PremiumCharts } from '../../ui/premium-charts';
import { AdaptiveProfile } from '../../../lib/scoring/xp-engine';

export const SupervisorDashboard: React.FC = () => {
  // Simulated xAPI LRS connection payload
  const [profile] = useState<AdaptiveProfile>({
    currentDifficultyTier: 3,
    xpTotal: 4500,
    xpMax: 10000,
    consecutiveHighEisCount: 2,
    consecutiveHighAccuracyDays: 4
  });

  const eisHistory = [0.2, 0.4, 0.85, 0.9, 0.82];
  const accuracyHistory = [80, 85, 96, 97, 98];
  const labels = ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'];

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-slate-200">
      <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-mono text-emerald-400 font-bold tracking-widest">Supervisor Dashboard</h1>
          <p className="text-slate-500 mt-1 text-sm uppercase">SCORM 1.2 / 2004 + xAPI LRS Telemetry</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Current Cohort Difficulty Tier</p>
          <p className="text-4xl font-bold text-blue-500">Tier {profile.currentDifficultyTier}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PremiumCharts
          title="Emotional Intent Score (EIS) History [Danger Threshold > 0.8]"
          dataPoints={eisHistory.map(v => Math.round(v * 100))}
          labels={labels}
          color="#ef4444"
        />
        <PremiumCharts
          title="Engine Accuracy % [Mastery Threshold > 95%]"
          dataPoints={accuracyHistory}
          labels={labels}
          color="#10b981"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h4 className="text-slate-400 text-sm mb-2">Frustration Loop Risk</h4>
          <p className="text-2xl font-bold text-red-400">{profile.consecutiveHighEisCount} / 3 Sessions</p>
          <p className="text-xs text-slate-500 mt-2">Mitigation triggers tier-drop on 3/3</p>
        </div>
        
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h4 className="text-slate-400 text-sm mb-2">Mastery Progression</h4>
          <p className="text-2xl font-bold text-emerald-400">{profile.consecutiveHighAccuracyDays} / 5 Days</p>
          <p className="text-xs text-slate-500 mt-2">Promotion triggers tier-up on 5/5</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
          <h4 className="text-slate-400 text-sm mb-2">Curriculum XP</h4>
          <p className="text-2xl font-bold text-blue-400">{profile.xpTotal} / {profile.xpMax}</p>
          <div className="w-full bg-slate-800 h-2 mt-4 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(profile.xpTotal / profile.xpMax) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
