import React, { useState, useEffect } from 'react';

export interface TimeFrictionGateProps {
  durationMs?: number;
  onComplete: () => void;
  message?: string;
}

export const TimeFrictionGate: React.FC<TimeFrictionGateProps> = ({ durationMs = 5000, onComplete, message = "Regulating cognitive pacing..." }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (durationMs / 100));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 100);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  // Breathing circle animation lowering sympathetic nervous system arousal
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-900 text-slate-100 rounded-xl shadow-2xl">
      <div className="relative w-32 h-32 flex items-center justify-center mb-6">
        {/* Outer expanding/contracting breathing ring */}
        <div
          className="absolute w-full h-full border-4 border-emerald-500 rounded-full opacity-50 transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${1 + Math.sin((progress / 100) * Math.PI * 2) * 0.2})` }}
        />
        {/* Inner static ring */}
        <div className="absolute w-24 h-24 border-2 border-slate-600 rounded-full" />
        {/* Percentage text */}
        <span className="text-xl font-mono">{Math.floor(progress)}%</span>
      </div>
      <p className="text-lg font-light tracking-widest text-emerald-300 animate-pulse">{message}</p>
    </div>
  );
};
