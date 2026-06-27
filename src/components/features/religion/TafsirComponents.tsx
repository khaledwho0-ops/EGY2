import React from 'react';

export const TafsirComponents: React.FC = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-slate-50 rounded-xl shadow border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Usul al-Tafsir Enforcement Engine</h2>
      <p className="text-slate-600 mb-6">Strict gating requiring 'Tafsir bi-l-ma'thur' (transmission-based) prior to 'Tafsir bi-l-ra'y' (reason-based).</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded flex justify-between items-center">
          <div>
            <h3 className="font-bold text-emerald-800">Primary: Tafsir bi-l-ma'thur</h3>
            <p className="text-sm text-emerald-700">Tafsir al-Tabari, Tafsir Ibn Kathir</p>
          </div>
          <span className="px-3 py-1 bg-emerald-200 text-emerald-800 font-bold rounded-full text-xs">UNLOCKED</span>
        </div>

        <div className="p-4 bg-slate-100 border-l-4 border-slate-400 rounded flex justify-between items-center opacity-70">
          <div>
            <h3 className="font-bold text-slate-700">Secondary: Tafsir bi-l-ra'y</h3>
            <p className="text-sm text-slate-600">Al-Razi, Al-Zamakhshari</p>
          </div>
          <span className="px-3 py-1 bg-slate-300 text-slate-600 font-bold rounded-full text-xs">LOCKED UNTIL PRIMARY CLEARED</span>
        </div>
      </div>
    </div>
  );
};
