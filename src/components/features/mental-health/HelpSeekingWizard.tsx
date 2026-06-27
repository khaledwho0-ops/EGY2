import React, { useState } from 'react';

export interface HelpSeekingWizardProps {
  userId: string;
}

export const HelpSeekingWizard: React.FC<HelpSeekingWizardProps> = ({ userId }) => {
  const [userInput, setUserInput] = useState('');
  const [ghsqScore, setGhsqScore] = useState(0);
  const [rcopeScore, setRcopeScore] = useState(0);
  const [showHotline, setShowHotline] = useState(false);

  // Suicide-risk lexicon strictly tailored to Egyptian/Arabic context + English
  const riskLexicon = ['end it', 'no way out', 'khalas', 'mabqash feeh amal', 'amoot', 'kill myself', 'give up'];

  const handleAssessmentSubmit = () => {
    const lowerInput = userInput.toLowerCase();
    
    // Evaluate for immediate critical threshold
    const isCritical = riskLexicon.some(phrase => lowerInput.includes(phrase));
    
    if (isCritical) {
      setShowHotline(true);
      // Immediate xAPI telemetry dispatch to Supervisor Dashboard would occur here
    } else {
      // Standard GHSQ / Brief-RCOPE matrix evaluation logic
      setShowHotline(false);
      alert(`Assessment Complete. GHSQ: ${ghsqScore}, Brief-RCOPE: ${rcopeScore}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800">General Help-Seeking & Coping Assessment</h2>
      
      {showHotline && (
        <div className="mb-6 p-6 bg-red-100 border-l-4 border-red-600 rounded-r-lg">
          <h3 className="text-xl font-bold text-red-800 mb-2">Immediate Support Available</h3>
          <p className="text-red-700 font-medium">
            Please contact the National Egyptian Mental Health Hotline immediately at <strong className="text-2xl tracking-widest bg-white px-2 py-1 rounded ml-2">16328</strong>
          </p>
          <p className="text-red-600 text-sm mt-2">Available 24/7. Confidential and free.</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">How are you feeling about seeking help today? (GHSQ Assessment)</label>
          <textarea
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Express your thoughts here..."
          />
        </div>
        
        {/* Sliders simulate the matrix evaluation for demonstration */}
        <div className="flex gap-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">GHSQ Intention (0-100)</label>
            <input type="range" min="0" max="100" value={ghsqScore} onChange={(e) => setGhsqScore(Number(e.target.value))} className="w-full" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Brief-RCOPE Reliance (0-100)</label>
            <input type="range" min="0" max="100" value={rcopeScore} onChange={(e) => setRcopeScore(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <button
          onClick={handleAssessmentSubmit}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
};
