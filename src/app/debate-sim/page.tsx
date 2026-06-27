"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Swords, Send, Bot, User, ShieldAlert, Sparkles, RefreshCcw } from "lucide-react";
import AnalysisProgress from "@/components/AnalysisProgress";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  fallacyUsed?: string;
}

export default function DebateSimulatorPage() {
  const { isRTL, t } = useRTL();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: t({
        en: "Welcome to the Socratic Debate Simulator (Devil's Advocate). Present any claim or belief. I will counter-argue using a secret logical fallacy. Try to spot it! What is your claim?",
        ar: "مرحبًا بك في محاكي المناظرة السقراطية (محامي الشيطان). قدم أي ادعاء أو معتقد. سأقوم بالرد بحجة مضادة توظف مغالطة منطقية خفية. حاول اكتشافها! ما هو ادعاؤك؟"
      })
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/debate-sim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      });

      if (!res.ok) throw new Error("Failed to debate.");
      const data = await res.json();

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.response,
        fallacyUsed: data.fallacyUsed
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: t({
          en: "I had trouble generating a counter-argument. Let's try again.",
          ar: "واجهت مشكلة في توليد حجة مضادة. دعنا نحاول مجدداً."
        })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", height: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr", display: "flex", flexDirection: "column" }}>
      
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: 0, flexShrink: 0 }}>
        <nav style={{ marginBottom: 16 }}>
          <Link href="/six-layers" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Architecture", ar: "العودة إلى المعمارية" })}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ padding: 12, backgroundColor: "rgba(255,100,100,0.1)", borderRadius: "var(--radius-lg)" }}>
            <Swords size={32} style={{ color: "var(--accent-warning)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>{t({ en: "Debate Practice", ar: "تدريب المناظرة" })}</h1>
            <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.1rem" }}>
              {t({ en: "Train against 50 different logical fallacies.", ar: "تدرب ضد 50 مغالطة منطقية مختلفة." })}
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ flex: 1, padding: "0 var(--space-lg) var(--space-xl) var(--space-lg)", display: "flex", flexDirection: "column", minHeight: 0 }}>
        
        {/* Chat Area */}
        <div style={{ flex: 1, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? (isRTL ? "flex-start" : "flex-end") : (isRTL ? "flex-end" : "flex-start") }}>
              <div style={{ 
                maxWidth: "80%", padding: 20, borderRadius: "var(--radius-lg)",
                backgroundColor: msg.role === "user" ? "var(--accent-primary)" : "var(--bg-base)",
                color: msg.role === "user" ? "var(--bg-base)" : "var(--text-base)",
                border: msg.role === "ai" ? "1px solid var(--border)" : "none",
                position: "relative"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, opacity: 0.8, fontSize: "0.9rem", fontWeight: 600 }}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  {msg.role === "user" ? t({ en: "You", ar: "أنت" }) : t({ en: "Devil's Advocate", ar: "محامي الشيطان" })}
                </div>
                <div style={{ lineHeight: 1.6, fontSize: "1.05rem", whiteSpace: "pre-wrap" }}>
                  {msg.content}
                </div>
                
                {msg.fallacyUsed && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed rgba(128,128,128,0.3)", display: "flex", alignItems: "center", gap: 8, color: "var(--accent-warning)", fontSize: "0.9rem" }}>
                    <ShieldAlert size={16} />
                    <span><strong>{t({ en: "Hidden Fallacy Used:", ar: "المغالطة الخفية المستخدمة:" })}</strong> {msg.fallacyUsed}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <div style={{ padding: 16, backgroundColor: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", color: "var(--text-muted)" }}>
                <Sparkles size={16} className="spin" style={{ animation: "spin 2s linear infinite" }} />
              </div>
              <AnalysisProgress
                running={isTyping}
                stages={[
                  { en: "Reading your argument", ar: "قراءة حُجّتك" },
                  { en: "Choosing a rhetorical tactic", ar: "اختيار أسلوب بلاغي" },
                  { en: "Picking a hidden fallacy", ar: "انتقاء مغالطة خفية" },
                  { en: "Composing the counter", ar: "صياغة الردّ المضاد" },
                ]}
                lang={isRTL ? "ar" : "en"}
                expectedMs={22000}
                accent="var(--accent-warning)"
                title={{ en: "Devil's Advocate is thinking…", ar: "محامي الشيطان يفكّر…" }}
              />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 var(--radius-lg) var(--radius-lg)", padding: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t({ en: "Type your counter-argument... (Shift+Enter for new line)", ar: "اكتب حجتك المضادة... (Shift+Enter لسطر جديد)" })}
              style={{
                flex: 1, padding: "16px", backgroundColor: "var(--bg-base)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)", color: "var(--text-base)", fontSize: "1rem", resize: "none", height: 80
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{
                width: 80, backgroundColor: "var(--accent-primary)", border: "none", borderRadius: "var(--radius-md)",
                color: "var(--bg-base)", cursor: "pointer", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center",
                opacity: (!input.trim() || isTyping) ? 0.5 : 1
              }}
            >
              <Send size={24} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
            </button>
          </div>
        </div>

        {/* STRESS-TESTED SCENARIOS */}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>
            {t({ en: "Quick Scenarios:", ar: "سيناريوهات سريعة:" })}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button 
              onClick={() => {
                setInput(isRTL ? "أنا لا أصدق الأبحاث العلمية، جارتي جربت هذه العشبة وشُفيت تماماً." : "The earth must be flat because it looks flat when I walk outside.");
              }}
              style={{ padding: "6px 12px", backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 16, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              {t({ en: "Anecdotal Evidence Fallacy", ar: "مغالطة الأدلة القولية (تجربة شخصية)" })}
            </button>
            <button 
              onClick={() => {
                setInput(isRTL ? "كيف تنصحني بالصحة وأنت تدخن؟ هذا يثبت أن كلامك خطأ." : "How can you tell me to eat healthy when you just ate a burger? Your argument is invalid.");
              }}
              style={{ padding: "6px 12px", backgroundColor: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 16, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              {t({ en: "Ad Hominem (Tu Quoque)", ar: "مغالطة الشخصنة (وأنت أيضاً)" })}
            </button>
            <button 
              onClick={() => {
                setInput(isRTL ? "بما أننا لم نثبت وجود الفضائيين، فهم بالضرورة غير موجودين." : "Since we haven't proven aliens exist, they definitely don't exist.");
              }}
              style={{ padding: "6px 12px", backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 16, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s" }}
            >
              {t({ en: "Appeal to Ignorance", ar: "مغالطة الاحتكان إلى الجهل" })}
            </button>
          </div>
        </div>

        <PageNavigation currentPath="/debate-sim" />

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
      <PageAIChatbot
        pageTitle="Socratic Debate Simulator — محاكي المناظرة"
        pageContext="Egyptian Awareness Library - AI-powered Socratic debate simulator where users practice defending claims against logical scrutiny."
        systemPrompt={`You are a Socratic debate partner who challenges claims through questioning. Use the Socratic Method: ask probing questions that reveal hidden assumptions, internal inconsistencies, and logical gaps in the user's arguments. Never directly tell the user they are wrong — instead, guide them to discover flaws in their reasoning themselves through carefully crafted questions. Cover topics relevant to Egypt: health claims (alternative medicine vs evidence-based medicine), economic predictions (currency, inflation), religious interpretations (hadith authentication, scholarly consensus), political narratives, and social media misinformation. Use logical reasoning frameworks including modus ponens, modus tollens, reductio ad absurdum, and categorical syllogisms. When the user makes a strong argument, acknowledge it and raise the difficulty. Respond in the same language the user writes in.`}
        suggestedQuestions={['ناقشني في: هل الطب البديل أفضل من الطب الحديث؟', 'تحداني في موضوع اقتصادي مصري', 'Challenge me on a health claim', 'Help me practice defending a scientific position']}
        accentColor="#06b6d4"
        accentColorRgb="6,182,212"
      />
    </div>
  );
}
