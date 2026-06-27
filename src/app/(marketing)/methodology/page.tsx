"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Brain, AlertTriangle, Fingerprint, 
  Globe, BookOpen, Activity, Lock, CheckCircle2, 
  ChevronRight, Sparkles, Scale, HeartPulse
} from "lucide-react";
import { SourcePyramid } from "@/components/shared/source-pyramid";
import { PageNavigation } from '@/components/shared/page-navigation';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden pb-32">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-8 font-mono text-sm uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            Platform Methodology
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8"
          >
            The Architecture of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Cognitive Defense
            </span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
          >
            We do not build tools to fact-check the internet. We build a cognitive immune system to protect the human mind. This is the scientific, philosophical, and operational foundation of the Egyptian Awareness Library.
          </motion.p>
        </div>

        {/* 0.1 The Three Pillars */}
        <section className="mb-40">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Brain className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Three Pillars of Cognition-First Defense</h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "A: Inoculation Theory",
                subtitle: "(Pre-bunking)",
                icon: ShieldCheck,
                text: "Exposing people to the technique of manipulation in advance produces durable, transferable resistance. Established by Cambridge's Social Decision-Making Lab, brief inoculation interventions significantly improve users' ability to identify manipulation techniques before they take root."
              },
              {
                title: "B: Continued Influence",
                subtitle: "(Why 'Correction' Fails)",
                icon: AlertTriangle,
                text: "Misinformation continues to influence reasoning even after acknowledged correction. The mind must be prepared in advance; a fact-checker arriving after a false belief is encoded cannot easily remove it from memory. The affective response has already occurred."
              },
              {
                title: "C: Dual-Process Theory",
                subtitle: "(Where Deception Lives)",
                icon: Fingerprint,
                text: "Daniel Kahneman's distinction between System 1 (fast/automatic) and System 2 (slow/deliberate) is the architecture of deception. All manipulation attacks System 1. Our platform builds a System-1 reflex that automatically triggers System 2 when a manipulation signature appears."
              }
            ].map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="h-full bg-[#0B1120] border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[80px] group-hover:bg-emerald-500/10 transition-colors" />
                  <pillar.icon className="w-10 h-10 text-emerald-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-1">{pillar.title}</h3>
                  <p className="text-emerald-400/80 font-mono text-sm mb-6">{pillar.subtitle}</p>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">{pillar.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Verified Foundations */}
          <FadeIn delay={0.6}>
            <div className="mt-12 p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Verified Scientific Baselines
              </h4>
              <ul className="space-y-4 text-slate-400 text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500/50 shrink-0 mt-0.5" />
                  <span><strong>MIT (2018):</strong> False news spreads ~6× faster than true news, and is 70% more likely to be retweeted.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500/50 shrink-0 mt-0.5" />
                  <span><strong>Stanford DIG:</strong> Lateral Reading (leaving the source page to investigate) is the operational primary skill of professional fact-checkers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500/50 shrink-0 mt-0.5" />
                  <span><strong>SIFT & FLICC:</strong> SIFT (Stop, Investigate, Find, Trace) and FLICC (Fake experts, Logical fallacies, Impossible expectations, Cherry-picking, Conspiracy theories) form our DeepReal user-facing skill spine.</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* 0.2 Why Tools Cannot Win */}
        <section className="mb-40">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">Why "Tools" Cannot Win</h2>
              <p className="text-slate-400 text-lg">A scientific proof in 5 steps across the 7 Layers of the Information Ecosystem.</p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { layer: "Layer 1 (Pure Fabrication)", desc: "Fact-checkers can flag — but flags arrive after the affective response. The continued influence effect remains." },
              { layer: "Layer 2 (Biased Lens)", desc: "Every fact is technically verifiable. Fact-checkers must rule 'true' while the framing secretly inverts meaning." },
              { layer: "Layer 3 (Decontextualization)", desc: "The quote was actually said. Fact-checkers confirm it, accidentally validating the deception." },
              { layer: "Layers 4–5 (Weaponization)", desc: "Truth itself is weaponized via timing or scale. There is no individual 'fact' to check." },
              { layer: "Layers 6–7 (The Matrix)", desc: "The user is inside an algorithmic and emotional Matrix. Bringing them facts threatens their identity, causing the backfire effect." }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 bg-[#0B1120] border border-slate-800 rounded-2xl group hover:bg-slate-900 transition-colors">
                  <div className="px-4 py-2 bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-sm rounded-xl whitespace-nowrap shadow-inner">
                    {step.layer}
                  </div>
                  <p className="text-slate-300">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
            
            <FadeIn delay={0.6}>
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-2xl text-center">
                <p className="text-lg text-emerald-300 font-medium">
                  Conclusion: Only cognition can defeat the architecture. Only awareness builds immunity.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* PART 1 - Worldwide Standards */}
        <section>
          <FadeIn>
            <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Worldwide Standards Alignment</h2>
                <p className="text-slate-400 max-w-2xl">These are the strongest protocols on Earth in their respective domains. We publicly and cryptographically bind our platform to every one of them.</p>
              </div>
              <Globe className="w-16 h-16 text-emerald-500/20 hidden md:block" />
            </div>
          </FadeIn>

          <div className="space-y-16">
            
            {/* Category: Truth & Verification */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <SearchIcon className="w-6 h-6 text-cyan-400" />
                  Truth, Verification, Journalism
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-sm uppercase tracking-wider">
                        <th className="py-4 px-4 font-medium">Standard</th>
                        <th className="py-4 px-4 font-medium">Authority</th>
                        <th className="py-4 px-4 font-medium">Production Mandate</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-sm md:text-base">
                      <TableRow std="IFCN Code of Principles" auth="Poynter Institute" mandate="Publish annual transparency report; corrections page must be one click from every article." />
                      <TableRow std="UNESCO MIL Framework" auth="UNESCO (2021)" mandate="Every DeepReal module maps to a UNESCO MIL competency code." />
                      <TableRow std="Journalism, Fake News Handbook" auth="UNESCO" mandate="Editorial workflow tied strictly to this handbook's verification practices." />
                      <TableRow std="Stanford COR" auth="Digital Inquiry Group" mandate="Pre/post assessments use the COR lateral reading rubric verbatim." />
                      <TableRow std="Truth Decay Model" auth="RAND Corp." mandate="Editorial training framed against the four trends of Truth Decay." />
                      <TableRow std="Infodemic Management Framework" auth="WHO" mandate="Mental Health engine maps to all five action areas (Listening, translation, etc)." />
                      <TableRow std="BBC Editorial Guidelines" auth="BBC / EBU" mandate="Editorial code is BBC-derived with explicit 'due accuracy' citation." />
                      <TableRow std="Mindframe / Samaritans" auth="AU / UK" mandate="Hard pre-publication audit gate on any mental-health content (no glamorization)." />
                      <TableRow std="C2PA Content Credentials" auth="Adobe, Microsoft, BBC" mandate="All platform-produced video/audio carries cryptographic C2PA signatures." />
                      <TableRow std="Responsible Synthetic Media" auth="Partnership on AI" mandate="Any AI-augmented content disclosed and labeled per PAI guidelines." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Mental Health */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <HeartPulse className="w-6 h-6 text-rose-400" />
                  Mental Health
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-sm uppercase tracking-wider">
                        <th className="py-4 px-4 font-medium">Standard</th>
                        <th className="py-4 px-4 font-medium">Authority</th>
                        <th className="py-4 px-4 font-medium">Production Mandate</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-sm md:text-base">
                      <TableRow std="WHO mhGAP-IG v2.0" auth="WHO" mandate="Every condition page maps to its corresponding mhGAP module." />
                      <TableRow std="DSM-5-TR (2022)" auth="American Psychiatric Association" mandate="Each condition page explicitly cites its DSM-5-TR code." />
                      <TableRow std="ICD-11 Chapter 06" auth="WHO" mandate="Each condition page explicitly cites its ICD-11 code." />
                      <TableRow std="Mental Health First Aid" auth="MHFA International" mandate="'Mind First-Aid' course is strictly MHFA-aligned." />
                      <TableRow std="Mental Health Atlas" auth="WHO (2020/2024)" mandate="Egyptian baseline numbers cited from the official WHO Atlas." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Religion */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                  Religion
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-sm uppercase tracking-wider">
                        <th className="py-4 px-4 font-medium">Standard</th>
                        <th className="py-4 px-4 font-medium">Authority</th>
                        <th className="py-4 px-4 font-medium">Production Mandate</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300 text-sm md:text-base">
                      <TableRow std="Wasatiyya methodology" auth="Al-Azhar al-Sharif" mandate="Mainstream moderation serves as the Religion Hub's philosophical anchor." />
                      <TableRow std="Maqāṣid al-Sharī'ah" auth="Classical Jurisprudence" mandate="Every religiously-sensitive feature is tested against the five higher objectives." />
                      <TableRow std="The Amman Message (2004)" auth="200+ Scholars" mandate="Religion Hub binds to the Three Points (8 madhāhib, restricting takfīr, fatwa conditions)." />
                      <TableRow std="Marrakesh Declaration (2016)" auth="250+ Muslim Leaders" mandate="Inter-religious content anchored to the rights of religious minorities." />
                      <TableRow std="ʿIlm al-Rijāl / Muṣṭalaḥ al-Ḥadīth" auth="Classical Hadith Sciences" mandate="The world's oldest anti-fabrication science is the spine of the anti-Layer-1 module." />
                      <TableRow std="Dar al-Iftāʾ al-Miṣriyya" auth="Egypt's Fatwa House" mandate="Platform refers users to Dar al-Iftāʾ; we NEVER issue fatwas." />
                      <TableRow std="Asbāb al-Nuzūl" auth="Classical Quranic Science" mandate="Occasions of revelation act as the canonical Layer-3 defense (Tafsir Literacy)." />
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>

            {/* Category: Trust, Privacy, Accessibility */}
            <FadeIn>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Lock className="w-6 h-6 text-indigo-400" />
                  Trust, Privacy, Accessibility
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl">
                    <h4 className="font-bold text-white mb-2">WCAG 2.2 AA (W3C)</h4>
                    <p className="text-slate-400 text-sm">Minimum accessibility baseline; mandatory across all user interfaces.</p>
                  </div>
                  <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl">
                    <h4 className="font-bold text-white mb-2">GDPR / ISO/IEC 27001</h4>
                    <p className="text-slate-400 text-sm">Privacy and information security management systems; mandatory compliance.</p>
                  </div>
                  <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl">
                    <h4 className="font-bold text-white mb-2">Cochrane / GRADE</h4>
                    <p className="text-slate-400 text-sm">Our definitive scientific evidence ranking authority for health data.</p>
                  </div>
                  <div className="p-6 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl">
                    <h4 className="font-bold text-white mb-2">Cochrane RoB 2</h4>
                    <p className="text-slate-400 text-sm">Employed for any in-house systematic reviews to assess risk of bias.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* PART 2 - The Source Hierarchy */}
        <section className="mt-40 border-t border-slate-800 pt-20">
          <SourcePyramid />
        </section>

      </div>
      <PageNavigation currentPath="/methodology" />
    </div>
  );
}

// Helpers
function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

function TableRow({ std, auth, mandate }: { std: string, auth: string, mandate: string }) {
  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
      <td className="py-4 px-4 font-semibold text-emerald-100">{std}</td>
      <td className="py-4 px-4 text-slate-400 text-sm">{auth}</td>
      <td className="py-4 px-4 text-slate-300">{mandate}</td>
    </tr>
  );
}

