import React from 'react';
import { HelpSeekingWizard } from './HelpSeekingWizard';

export const MythAutopsy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Myth Autopsy: "Depression is just laziness"</h1>
        <p className="text-lg text-slate-600 mt-2">Deconstructing stigmatizing heuristics using logic and Emotional Intelligence.</p>
      </header>

      <section className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">1. Emotional Intelligence (EI) Activation</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800">Competency #1: Self-emotion identification</h3>
            <p className="text-slate-600 mt-1">Recognize the guilt or shame triggered by the word "laziness" when experiencing executive dysfunction.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800">Competency #19: Cognitive reappraisal</h3>
            <p className="text-slate-600 mt-1">Reframing the physiological inability to initiate tasks as a neurological symptom of depression (decreased dopaminergic signaling), rather than a moral failing.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">2. Logical Positives Activation</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800">Positive #11: Base-rate application</h3>
            <p className="text-slate-600 mt-1">Applying the WHO statistic: Over 280 million people suffer from depression globally. This is a population-level epidemiological phenomenon, not an isolated character defect.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800">Positive #15: Falsifiability test</h3>
            <p className="text-slate-600 mt-1">"If depression was just laziness, patients wouldn't show altered fMRI activity in the prefrontal cortex." The "laziness" hypothesis is falsified by neuroimaging data.</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">3. Next Step: GHSQ Validation</h2>
        <p className="text-slate-600 mb-6">Now that we have dismantled the cognitive distortion, evaluate your current readiness to seek structural support.</p>
        
        {/* Integrating the HelpSeekingWizard as explicitly mandated by the curriculum */}
        <HelpSeekingWizard userId="session-user-123" />
      </section>
    </div>
  );
};
