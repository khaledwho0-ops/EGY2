"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Brain, AlertOctagon, TrendingUp, ThumbsDown, Zap } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

type GameState = "start" | "playing" | "result";

interface Scenario {
  id: number;
  title: string;
  context: string;
  options: {
    text: string;
    isMisinfo: boolean;
    feedback: string;
    points: number;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "The Viral Artifact",
    context: "A blurry photo is circulating showing what looks like a modern smartphone carved into an ancient temple wall in Luxor. It has 50k retweets.",
    options: [
      { text: "Share it with caption 'Proof of ancient time travel!' to gain followers.", isMisinfo: true, feedback: "You played to people's sense of wonder and conspiracies. It's totally fake, but you went viral!", points: 100 },
      { text: "Reply with a link to a fact-check showing it's a photoshopped carving.", isMisinfo: false, feedback: "You tried to help, but no one likes a buzzkill. Minimal engagement.", points: 10 }
    ]
  },
  {
    id: 2,
    title: "The Crisis Alert",
    context: "A voice note on WhatsApp claims the local water supply in Cairo is poisoned and everyone must stop drinking immediately. It sounds urgent.",
    options: [
      { text: "Forward to all family groups immediately. Better safe than sorry!", isMisinfo: true, feedback: "Classic fear-mongering! You caused a panic. Emotion overrules logic in misinformation.", points: 150 },
      { text: "Check official Ministry of Health statements first.", isMisinfo: false, feedback: "Responsible behavior, but you didn't gain any 'Bad News' clout.", points: 10 }
    ]
  },
  {
    id: 3,
    title: "The Deepfake Leader",
    context: "A video appears showing a political figure making an offensive statement. The lip-sync looks slightly off, but the voice is convincing.",
    options: [
      { text: "Create an angry reaction video and post it everywhere.", isMisinfo: true, feedback: "You capitalized on outrage! Outrage drives the algorithm. You gained massive influence.", points: 200 },
      { text: "Use an OSINT tool to analyze the video and report it as synthetic.", isMisinfo: false, feedback: "You stopped the spread, but lost the game of influence.", points: 20 }
    ]
  }
];

export default function BadNewsGamePage() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [followers, setFollowers] = useState(10);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastFeedback, setLastFeedback] = useState("");
  const [credibility, setCredibility] = useState(100);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setFollowers(10);
    setCredibility(100);
    setCurrentScenario(0);
    setShowFeedback(false);
  };

  const handleOption = (option: Scenario["options"][0]) => {
    setLastFeedback(option.feedback);
    setShowFeedback(true);
    
    if (option.isMisinfo) {
      setScore(s => s + option.points);
      setFollowers(f => Math.floor(f * 2.5));
      setCredibility(c => Math.max(0, c - 20));
    } else {
      setScore(s => s + option.points);
      setFollowers(f => f + 5);
      setCredibility(c => Math.min(100, c + 5));
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(s => s + 1);
      setShowFeedback(false);
    } else {
      setGameState("result");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent flex justify-center items-center gap-4">
            <AlertOctagon className="w-10 h-10 text-red-500" />
            Bad News: Egypt
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience inoculation theory. Play the bad guy, learn the tactics of misinformation, 
            and build your immunity against real-world manipulation.
          </p>
        </header>

        {/* Game Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
          
          {/* Top Bar for Game Stats */}
          {gameState !== "start" && (
            <div className="bg-slate-950 px-6 py-4 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <TrendingUp className="w-5 h-5" />
                  <span>{followers.toLocaleString()} Followers</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                  <Zap className="w-5 h-5" />
                  <span>{score} Chaos Score</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 uppercase tracking-wider">Credibility</span>
                <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${credibility > 50 ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${credibility}%` }} 
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              
              {/* Start Screen */}
              {gameState === "start" && (
                <motion.div 
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-xl"
                >
                  <Brain className="w-20 h-20 text-purple-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">Become the Disinformation Mastermind</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    To defeat misinformation, you must understand how it's created. In this interactive simulation, 
                    your goal is to gain as many followers as possible using deceptive tactics like impersonation, 
                    emotion, polarization, and conspiracy.
                  </p>
                  <button 
                    onClick={startGame}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-red-600/30 transition-transform hover:scale-105 active:scale-95"
                  >
                    Start Campaign
                  </button>
                </motion.div>
              )}

              {/* Playing Screen */}
              {gameState === "playing" && (
                <motion.div 
                  key="playing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-2xl"
                >
                  <div className="mb-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Scenario {currentScenario + 1} of {scenarios.length}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {scenarios[currentScenario].title}
                  </h2>
                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-8 text-left text-lg text-slate-300">
                    {scenarios[currentScenario].context}
                  </div>

                  {!showFeedback ? (
                    <div className="space-y-4">
                      {scenarios[currentScenario].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOption(option)}
                          className="w-full p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-left transition-colors flex items-center gap-4 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-700 group-hover:bg-blue-500 flex items-center justify-center font-bold text-sm transition-colors">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-slate-200 group-hover:text-white">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-800 p-8 rounded-2xl border border-slate-600 shadow-2xl"
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">Analysis</h3>
                      <p className="text-xl text-slate-300 mb-8">{lastFeedback}</p>
                      <button 
                        onClick={nextScenario}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
                      >
                        {currentScenario < scenarios.length - 1 ? "Next Scenario" : "See Final Results"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Result Screen */}
              {gameState === "result" && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-xl"
                >
                  <Shield className="w-24 h-24 text-green-500 mx-auto mb-6" />
                  <h2 className="text-4xl font-black text-white mb-4">Simulation Complete</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                      <p className="text-slate-400 text-sm font-bold uppercase mb-2">Followers Gained</p>
                      <p className="text-4xl font-black text-blue-400">{followers.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                      <p className="text-slate-400 text-sm font-bold uppercase mb-2">Final Credibility</p>
                      <p className="text-4xl font-black text-yellow-400">{credibility}%</p>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-2xl mb-8 text-left">
                    <h3 className="text-xl font-bold text-green-400 mb-2">Inoculation Successful</h3>
                    <p className="text-slate-300">
                      By learning how bad actors use emotion, outrage, and impersonation to spread false information, 
                      you are now better equipped to recognize these tactics in the wild. This "psychological vaccine" 
                      helps protect our digital ecosystem.
                    </p>
                  </div>

                  <button 
                    onClick={startGame}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
                  >
                    Play Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/bad-news" />

      <PageAIChatbot
        pageTitle="Bad News Game — لعبة الأخبار السيئة"
        pageContext="Egyptian Awareness Library - Bad News Game: Players become a fake news producer to understand manipulation tactics from the inside. Based on inoculation theory (van der Linden 2017) — experiencing manipulation firsthand builds resistance to it."
        systemPrompt={`You are the EAL Bad News Game Debrief AI. You explain the psychology behind the manipulation tactics used in the game.

INOCULATION THEORY (van der Linden 2017):
- Exposing people to weakened doses of misinformation techniques builds immunity
- Like a vaccine: small exposure = protection against real thing
- Meta-analysis (N=30,000 participants): 20-25% reduction in susceptibility

GAME MECHANICS YOU EXPLAIN:
1. Emotional Content: Why fear/outrage spreads faster than facts
2. Impersonation: How fake authority builds false trust
3. Polarization: How divisive content creates tribal in-group/out-group dynamics
4. Conspiracy Theories: How unfalsifiable claims trap people in belief systems
5. Trolling: How disruptive tactics undermine genuine discourse
6. Discrediting: How credibility attacks shift attention from evidence

EGYPTIAN CONTEXT: Apply each tactic to real Egyptian social media examples.`}
        suggestedQuestions={[
          'لماذا تنتشر الأخبار العاطفية أسرع من الحقيقة؟',
          'ما هي نظرية التحصين للمعلومات؟',
          'How does playing this game make me more resistant to fake news?',
          'What is the most dangerous tactic used in fake news?',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />
    </div>
  );
}
