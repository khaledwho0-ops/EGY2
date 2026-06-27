"use client";
import React, { useState } from 'react';

export interface ForensicLayer {
  id: string;
  name: string;
  description: string;
}

export const SixLayersVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('pixel-noise');
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const layers: ForensicLayer[] = [
    { id: 'pixel-noise', name: '1. Pixel Noise Analysis', description: 'Detects invisible spatial inconsistencies introduced by GAN/Diffusion upscaling.' },
    { id: 'c2pa-manifest', name: '2. C2PA Provenance Manifest', description: 'Cryptographically verifies content credentials (C2PA) and camera-hardware origin signatures.' },
    { id: 'gan-artifacts', name: '3. GAN-Artifact Detection', description: 'Highlights asymmetrical rendering, especially around eyes, teeth, and background physics.' },
    { id: 'audio-spectrogram', name: '4. Audio Spectrogram Match', description: 'Identifies deepfake voice cloning by scanning for unnatural respiratory phase alignment.' },
    { id: 'context-match', name: '5. Context Match Search', description: 'Runs reverse-image cross-referencing against the Wayback Machine and primary news archives.' },
    { id: 'prompt-origin', name: '6. Prompt-Origin Heuristics', description: 'Analyzes visual tropes to estimate the generative prompt used (e.g., Midjourney v6 aesthetics).' }
  ];

  const handleLayerScan = (layerId: string) => {
    setActiveLayer(layerId);
    setAnalysisProgress(prev => Math.min(prev + 16.66, 100));
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 p-8">
      <header className="max-w-5xl mx-auto mb-10 border-b border-slate-800 pb-6">
        <h1 className="text-4xl font-mono text-emerald-400 font-bold">DeepReal: 6-Layer WebGL Forensics</h1>
        <p className="text-slate-400 mt-2 text-lg">Systematic structural dismantling of synthetic media cases.</p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Synthetic Media Viewport (Simulated WebGL Canvas) */}
        <div className="lg:col-span-2 bg-black rounded-xl border border-slate-700 aspect-video relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 opacity-50" />
          <div className="z-10 text-center">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-mono text-emerald-500 uppercase tracking-widest">Applying Filter: {activeLayer}</p>
          </div>
          
          {/* Progress Overlay */}
          <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-500" style={{ width: `${analysisProgress}%` }} />
        </div>

        {/* Forensic Control Panel */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold text-slate-200 mb-6">Forensic Layer Stack</h2>
          <div className="space-y-4">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => handleLayerScan(layer.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  activeLayer === layer.id
                    ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                <h3 className="font-mono font-bold text-sm mb-1">{layer.name}</h3>
                <p className="text-xs opacity-80">{layer.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Confidence Score</p>
            <div className="text-3xl font-mono font-bold text-emerald-400">{Math.round(analysisProgress)}% Fake</div>
          </div>
        </div>
      </div>
    </div>
  );
};
