"use client";
import React, { useState } from 'react';

export const MaqasidCheck: React.FC = () => {
  const [fatwaText, setFatwaText] = useState('');

  const maqasid = [
    { id: 'din', name: 'Hifz al-Din (Religion)', active: false },
    { id: 'nafs', name: 'Hifz al-Nafs (Life)', active: true },
    { id: 'aql', name: 'Hifz al-\'Aql (Intellect)', active: false },
    { id: 'nasl', name: 'Hifz al-Nasl (Lineage/Progeny)', active: true },
    { id: 'mal', name: 'Hifz al-Mal (Property/Wealth)', active: true }
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto bg-slate-50 rounded-xl shadow border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Maqasid al-Shari'ah Verification Matrix</h2>
      <p className="text-slate-600 mb-6">Deconstruct contemporary fatwas (e.g., cryptocurrency) by forcing alignment with the 5 foundational objectives.</p>
      
      <textarea
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        placeholder="Input ruling or fatwa to evaluate..."
        value={fatwaText}
        onChange={(e) => setFatwaText(e.target.value)}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {maqasid.map((maqsad) => (
          <div
            key={maqsad.id}
            className={`p-4 rounded-lg border-2 transition-colors ${
              maqsad.active ? 'bg-blue-50 border-blue-500' : 'bg-slate-100 border-slate-300 opacity-60'
            }`}
          >
            <h3 className={`font-bold ${maqsad.active ? 'text-blue-800' : 'text-slate-500'}`}>{maqsad.name}</h3>
            <p className="text-xs mt-1 text-slate-600">
              {maqsad.active ? 'Vector engaged in current fatwa' : 'Not engaged'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
