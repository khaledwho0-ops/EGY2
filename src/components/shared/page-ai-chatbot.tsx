"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PageAIChatbotProps {
  pageTitle: string;
  pageContext: string; // Page-specific context for system prompt
  systemPrompt: string; // Full system prompt
  suggestedQuestions?: string[];
  accentColor?: string;
  accentColorRgb?: string;
}

export function PageAIChatbot({
  pageTitle,
  pageContext,
  systemPrompt,
  suggestedQuestions = [],
  accentColor = "#6366f1",
  accentColorRgb = "99,102,241",
}: PageAIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
      if (!hasOpened) {
        setHasOpened(true);
        // Auto-greeting
        setMessages([
          {
            role: "assistant",
            content: `مرحباً! أنا مساعد الذكاء الاصطناعي المتخصص في **${pageTitle}**.\n\nيمكنني الإجابة على أي سؤال يتعلق بهذا الموضوع بدقة علمية وإسلامية عالية. كيف يمكنني مساعدتك؟\n\n---\n\nHello! I'm the specialized AI assistant for **${pageTitle}**.\n\nI can answer any question with high scientific and Islamic precision. How can I help you?`,
          },
        ]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: messageText },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Build history from all prior messages (exclude last user message)
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          mode: "general",
          history,
          systemPromptOverride: systemPrompt,
          pageContext,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const responseText = data.text || data.content || data.message;
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText || "عذراً، حدث خطأ. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "عذراً، لم أتمكن من الاتصال بالخادم. يرجى المحاولة مرة أخرى.\n\nSorry, I couldn't connect. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            aria-label="Open AI assistant chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 9999,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 32px rgba(${accentColorRgb},0.5), 0 0 0 0 rgba(${accentColorRgb},0.4)`,
              animation: "pulse-ring 2s infinite",
            }}
          >
            <MessageSquare size={26} color="#fff" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              zIndex: 9999,
              width: 400,
              maxWidth: "calc(100vw - 48px)",
              height: 560,
              maxHeight: "calc(100vh - 100px)",
              background: "rgba(10,12,24,0.97)",
              border: `1px solid rgba(${accentColorRgb},0.3)`,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(${accentColorRgb},0.1)`,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 18px",
                background: `linear-gradient(135deg, rgba(${accentColorRgb},0.2), rgba(${accentColorRgb},0.05))`,
                borderBottom: `1px solid rgba(${accentColorRgb},0.2)`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bot size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>
                  AI Assistant — {pageTitle}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: accentColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Sparkles size={10} />
                  مدعوم بنظام الذكاء الاصطناعي المتخصص
                </div>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: 6,
                  color: "#94a3b8",
                  display: "flex",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "88%",
                      padding: "10px 14px",
                      borderRadius:
                        msg.role === "user"
                          ? "18px 18px 4px 18px"
                          : "18px 18px 18px 4px",
                      background:
                        msg.role === "user"
                          ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`
                          : "rgba(255,255,255,0.05)",
                      border:
                        msg.role === "user"
                          ? "none"
                          : "1px solid rgba(255,255,255,0.08)",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#e2e8f0",
                      whiteSpace: "pre-wrap",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/---/g, "<hr style='border-color:rgba(255,255,255,0.1);margin:8px 0'>")
                        .replace(/\n/g, "<br>"),
                    }}
                  />
                </motion.div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "18px 18px 18px 4px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    <Loader2 size={14} className="animate-spin" />
                    يفكر المساعد...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && messages.length <= 1 && (
              <div
                style={{
                  padding: "0 12px 8px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {suggestedQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 12,
                      background: `rgba(${accentColorRgb},0.1)`,
                      border: `1px solid rgba(${accentColorRgb},0.2)`,
                      color: accentColor,
                      fontSize: 11,
                      cursor: "pointer",
                      textAlign: "left",
                      lineHeight: 1.3,
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: "12px 14px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك... / Type your question..."
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                aria-label="Send message"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: input.trim()
                    ? `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`
                    : "rgba(255,255,255,0.06)",
                  border: "none",
                  cursor: input.trim() ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
              >
                <Send size={16} color={input.trim() ? "#fff" : "#475569"} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 8px 32px rgba(${accentColorRgb},0.5), 0 0 0 0 rgba(${accentColorRgb},0.4); }
          70% { box-shadow: 0 8px 32px rgba(${accentColorRgb},0.5), 0 0 0 12px rgba(${accentColorRgb},0); }
          100% { box-shadow: 0 8px 32px rgba(${accentColorRgb},0.5), 0 0 0 0 rgba(${accentColorRgb},0); }
        }
      `}</style>
    </>
  );
}
