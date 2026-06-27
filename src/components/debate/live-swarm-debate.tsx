"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/**
 * Live Swarm Debate Component
 * ════════════════════════════════════════════════════
 * 5 AI debater archetypes simultaneously challenge the user
 * in a Socratic Swarm format. Each archetype uses a different
 * manipulation tactic that the user must identify and counter.
 *
 * Archetypes (from 3.txt Block 10):
 *   1. Ad-Hominem Agent — attacks the person, not the argument
 *   2. Cherry-Picker — selects only supporting evidence
 *   3. False-Authority Sheikh — appeals to religious authority
 *   4. Conspiracy Cabal-Framer — frames everything as conspiracy
 *   5. Deepfake Skeptic — casts doubt on all digital evidence
 *
 * Powered by NVIDIA NIM Nemotron-3 Ultra 550B
 */

interface DebaterMessage {
  agentId: number;
  agentName: string;
  agentNameAr: string;
  archetype: string;
  message: string;
  timestamp: number;
  tactic: string;
}

interface UserResponse {
  text: string;
  targetAgentId: number;
  timestamp: number;
  score?: {
    logicalCoherence: number;
    fallacyDetection: number;
    emotionalStability: number;
  };
}

interface SwarmState {
  topic: string;
  round: number;
  maxRounds: number;
  messages: (DebaterMessage | UserResponse)[];
  scores: {
    logicalCoherence: number;
    fallacyDetection: number;
    emotionalStability: number;
    total: number;
  };
  isLoading: boolean;
  isComplete: boolean;
}

const DEBATER_ARCHETYPES = [
  {
    id: 1,
    name: "The Ad-Hominem Agent",
    nameAr: "عميل الهجوم الشخصي",
    archetype: "ad_hominem",
    color: "#ef4444",
    emoji: "🎭",
    systemPrompt: `You are the "Ad-Hominem Agent" in a debate training exercise. Your role is to attack the PERSON making the argument, not the argument itself. Use personal attacks, question credentials, mock background, use sarcasm. You MUST use logical fallacies deliberately. Keep responses under 3 sentences. Be aggressive but not vulgar.`,
  },
  {
    id: 2,
    name: "The Cherry-Picker",
    nameAr: "منتقي الكرز",
    archetype: "cherry_picking",
    color: "#f59e0b",
    emoji: "🍒",
    systemPrompt: `You are the "Cherry-Picker" in a debate training exercise. Your role is to selectively quote data that supports your position while ignoring contradicting evidence. Cite real-sounding but cherry-picked statistics. Always start with "studies show" or "data proves." Keep responses under 3 sentences.`,
  },
  {
    id: 3,
    name: "The False-Authority Sheikh",
    nameAr: "شيخ السلطة الزائفة",
    archetype: "false_authority",
    color: "#8b5cf6",
    emoji: "📿",
    systemPrompt: `You are the "False-Authority Sheikh" in a debate training exercise. Your role is to appeal to religious authority inappropriately — using vague Islamic references to shut down scientific or logical arguments. Misquote hadith vaguely, invoke scholarly consensus without naming scholars. Keep responses under 3 sentences.`,
  },
  {
    id: 4,
    name: "The Conspiracy Cabal-Framer",
    nameAr: "مؤطر مؤامرة الكابال",
    archetype: "conspiracy",
    color: "#06b6d4",
    emoji: "🕵️",
    systemPrompt: `You are the "Conspiracy Cabal-Framer" in a debate training exercise. Your role is to frame everything as a conspiracy — claim powerful groups are hiding the truth, suggest anyone who disagrees is "in on it," use "they don't want you to know" framing. Keep responses under 3 sentences.`,
  },
  {
    id: 5,
    name: "The Deepfake Skeptic",
    nameAr: "متشكك التزييف العميق",
    archetype: "deepfake_skeptic",
    color: "#10b981",
    emoji: "🤖",
    systemPrompt: `You are the "Deepfake Skeptic" in a debate training exercise. Your role is to cast doubt on ALL digital evidence — claim any photo/video/audio could be AI-generated, suggest all online sources could be fake, weaponize distrust in technology. Keep responses under 3 sentences.`,
  },
];

const SAMPLE_TOPICS = [
  {
    topic: "Does social media cause depression in teenagers?",
    topicAr: "هل وسائل التواصل الاجتماعي تسبب الاكتئاب عند المراهقين؟",
  },
  {
    topic: "Should Egypt ban plastic bags?",
    topicAr: "هل يجب على مصر حظر الأكياس البلاستيكية؟",
  },
  {
    topic: "Is artificial intelligence a threat to employment in Egypt?",
    topicAr: "هل الذكاء الاصطناعي تهديد للتوظيف في مصر؟",
  },
  {
    topic: "Is traditional medicine as effective as modern medicine?",
    topicAr: "هل الطب التقليدي فعال كالطب الحديث؟",
  },
  {
    topic: "Should cryptocurrency be regulated in Egypt?",
    topicAr: "هل يجب تنظيم العملات المشفرة في مصر؟",
  },
];

export default function LiveSwarmDebate() {
  const [state, setState] = useState<SwarmState>({
    topic: "",
    round: 0,
    maxRounds: 5,
    messages: [],
    scores: { logicalCoherence: 0, fallacyDetection: 0, emotionalStability: 0, total: 0 },
    isLoading: false,
    isComplete: false,
  });
  const [userInput, setUserInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, scrollToBottom]);

  const startDebate = async (topicIndex: number) => {
    const topic = SAMPLE_TOPICS[topicIndex];
    setSelectedTopic(topicIndex);
    setHasStarted(true);
    setState((prev) => ({
      ...prev,
      topic: topic.topic,
      round: 1,
      isLoading: true,
      messages: [],
    }));

    // Generate opening statements from all 5 agents
    try {
      const responses = await Promise.allSettled(
        DEBATER_ARCHETYPES.map(async (agent) => {
          const res = await fetch("/api/nvidia/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                { role: "system", content: agent.systemPrompt },
                { role: "user", content: `The debate topic is: "${topic.topic}". Give your opening argument using your assigned manipulation tactic.` },
              ],
            }),
          });

          if (!res.ok) throw new Error(`Agent ${agent.id} failed`);
          const data = await res.json();
          return {
            agentId: agent.id,
            agentName: agent.name,
            agentNameAr: agent.nameAr,
            archetype: agent.archetype,
            message: data.content || data.text || "...",
            timestamp: Date.now(),
            tactic: agent.archetype,
          } as DebaterMessage;
        })
      );

      const messages = responses
        .filter((r): r is PromiseFulfilledResult<DebaterMessage> => r.status === "fulfilled")
        .map((r) => r.value);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, ...messages],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Swarm debate error:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const submitResponse = async () => {
    if (!userInput.trim() || state.isLoading) return;

    const userMsg: UserResponse = {
      text: userInput,
      targetAgentId: 0, // responding to all
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
      round: prev.round + 1,
    }));
    setUserInput("");

    if (state.round >= state.maxRounds) {
      // Derive scores from actual transcript rather than fabricating random numbers.
      // Count user responses already in state (messages without agentId).
      const userRoundsCompleted = state.messages.filter(
        (m): m is UserResponse => !("agentId" in m),
      ).length + 1; // +1 for the response just submitted (not yet appended to state)
      const totalRounds = state.maxRounds;

      // Participation score: proportional to rounds completed out of total.
      // Capped at totalRounds to reflect honest engagement only.
      const participationScore = Math.min(userRoundsCompleted, totalRounds);

      setState((prev) => ({
        ...prev,
        isComplete: true,
        isLoading: false,
        scores: {
          // Scores are participation-based, not randomly fabricated.
          // Each dimension gets participationScore points (max = totalRounds = 5).
          logicalCoherence: participationScore,
          fallacyDetection: participationScore,
          emotionalStability: participationScore,
          total: participationScore * 3,
        },
      }));
      return;
    }

    // Get counter-arguments from agents
    try {
      const activeAgents = DEBATER_ARCHETYPES.slice(0, Math.min(3, DEBATER_ARCHETYPES.length));
      const responses = await Promise.allSettled(
        activeAgents.map(async (agent) => {
          const res = await fetch("/api/nvidia/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                { role: "system", content: agent.systemPrompt },
                { role: "user", content: `Topic: "${state.topic}". The human argued: "${userInput}". Counter their argument using your assigned manipulation tactic. Be brief (2-3 sentences max).` },
              ],
            }),
          });

          if (!res.ok) throw new Error(`Agent ${agent.id} failed`);
          const data = await res.json();
          return {
            agentId: agent.id,
            agentName: agent.name,
            agentNameAr: agent.nameAr,
            archetype: agent.archetype,
            message: data.content || data.text || "...",
            timestamp: Date.now(),
            tactic: agent.archetype,
          } as DebaterMessage;
        })
      );

      const messages = responses
        .filter((r): r is PromiseFulfilledResult<DebaterMessage> => r.status === "fulfilled")
        .map((r) => r.value);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, ...messages],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Counter-argument error:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent mb-4">
              ⚔️ Live Swarm Debate
            </h1>
            <p className="text-white/60 text-lg">
              Face 5 AI debater archetypes simultaneously. Each uses a different manipulation tactic.
              <br />
              Your mission: identify and counter every fallacy.
            </p>
          </div>

          {/* Archetype Cards */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {DEBATER_ARCHETYPES.map((agent) => (
              <div
                key={agent.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center"
                style={{ borderColor: agent.color + "40" }}
              >
                <div className="text-3xl mb-2">{agent.emoji}</div>
                <div className="text-sm font-semibold" style={{ color: agent.color }}>
                  {agent.name}
                </div>
              </div>
            ))}
          </div>

          {/* Topic Selection */}
          <h2 className="text-xl font-semibold text-white/80 mb-4">Choose Your Debate Topic:</h2>
          <div className="space-y-3">
            {SAMPLE_TOPICS.map((topic, i) => (
              <button
                key={i}
                onClick={() => startDebate(i)}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-5 transition-all duration-300"
              >
                <div className="font-semibold text-white/90">{topic.topic}</div>
                <div className="text-sm text-white/40 mt-1 font-arabic" dir="rtl">
                  {topic.topicAr}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-emerald-400">⚔️ Live Swarm Debate</h1>
            <p className="text-white/40 text-sm">{state.topic}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              Round {state.round}/{state.maxRounds}
            </span>
            <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all"
                style={{ width: `${(state.round / state.maxRounds) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {state.messages.map((msg, i) => {
            if ("agentId" in msg) {
              const agent = DEBATER_ARCHETYPES.find((a) => a.id === msg.agentId);
              return (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: (agent?.color || "#666") + "20", border: `1px solid ${agent?.color || "#666"}40` }}
                  >
                    {agent?.emoji}
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl rounded-tl-sm p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold" style={{ color: agent?.color }}>
                        {agent?.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/40">
                        {msg.tactic.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className="flex gap-3 justify-end">
                  <div className="max-w-[80%] bg-emerald-500/10 border border-emerald-500/20 rounded-xl rounded-tr-sm p-4">
                    <div className="text-sm font-semibold text-emerald-400 mb-1">You</div>
                    <p className="text-white/80 text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg shrink-0">
                    🧠
                  </div>
                </div>
              );
            }
          })}
          {state.isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                ⚔️
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Completion Screen */}
      {state.isComplete && (
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">🏆 Debate Complete!</h2>
            {/* Scores reflect rounds participated — not a psychometric instrument. */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-cyan-400">
                  {state.scores.logicalCoherence}/{state.maxRounds}
                </div>
                <div className="text-sm text-white/40">Rounds Responded</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-emerald-400">
                  {state.scores.fallacyDetection}/{state.maxRounds}
                </div>
                <div className="text-sm text-white/40">Rounds Engaged</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-3xl font-bold text-amber-400">
                  {state.scores.emotionalStability}/{state.maxRounds}
                </div>
                <div className="text-sm text-white/40">Rounds Completed</div>
              </div>
            </div>
            <div className="text-lg text-white/60">
              {state.scores.logicalCoherence} of {state.maxRounds} rounds completed
              {state.scores.logicalCoherence >= state.maxRounds && (
                <span className="ml-2 text-emerald-400">✅ Full session</span>
              )}
            </div>
            <p className="text-sm text-white/30 mt-2">
              Skill scoring requires instructor review — participation counts shown above.
              / التقييم المهاري يتطلب مراجعة المدرب — يُعرض هنا عدد الجولات المكتملة.
            </p>
          </div>
        </div>
      )}

      {/* Input */}
      {!state.isComplete && (
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitResponse()}
              placeholder="Counter their arguments... identify the fallacies..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/50"
              disabled={state.isLoading}
            />
            <button
              onClick={submitResponse}
              disabled={state.isLoading || !userInput.trim()}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-white disabled:opacity-30 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
            >
              Counter ⚡
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
