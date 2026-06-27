"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Users, Trophy, Target, Award, Star, Activity, Plus, ShieldAlert } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function ConnectPage() {
  const { isRTL, t } = useRTL();

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* Header */}
      <div style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "var(--space-xl) 0" }}>
        <div className="container" style={{ padding: "0 var(--space-lg)" }}>
          <nav style={{ marginBottom: 24 }}>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
              {isRTL ? "→" : "←"} {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
            </Link>
          </nav>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ padding: 20, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-xl)" }}>
                <Users size={48} style={{ color: "var(--accent-primary)" }} />
              </div>
              <div>
                <h1 style={{ fontSize: "2.5rem", margin: 0, lineHeight: 1.1 }}>{t({ en: "EAL Network", ar: "شبكة EAL" })}</h1>
                <p style={{ color: "var(--text-muted)", margin: "8px 0 0 0", fontSize: "1.1rem" }}>
                  {t({ en: "Defend the truth together. Earn XP, rank up, and challenge peers.", ar: "دافع عن الحقيقة معًا. اكسب نقاط الخبرة (XP)، وارتقِ في التصنيف، وتحدى أقرانك." })}
                </p>
              </div>
            </div>
            
            {/* User Stats Card */}
            <div style={{ display: "flex", gap: 32, padding: 24, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: 4 }}>Level 4</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Rank</div>
              </div>
              <div style={{ width: 1, backgroundColor: "var(--border)" }}></div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-base)", marginBottom: 4 }}>4,250</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Total XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
        
        {/* Main Feed / Challenges */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h2 style={{ fontSize: "1.5rem", margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
              <Target size={24} style={{ color: "var(--accent-warning)" }} />
              {t({ en: "Active Peer Challenges", ar: "التحديات النشطة للأقران" })}
            </h2>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "var(--accent-primary)", color: "var(--bg-base)", border: "none", borderRadius: "var(--radius-full)", fontWeight: 600, cursor: "pointer" }}>
              <Plus size={16} /> {t({ en: "Create Challenge", ar: "إنشاء تحدي" })}
            </button>
          </div>

          {[
            { id: 1, title: "Dismantle this medical claim", user: "Ahmed T.", xp: 500, time: "2 hours left" },
            { id: 2, title: "Find the missing context in this video", user: "Sarah K.", xp: 300, time: "5 hours left" },
            { id: 3, title: "Identify the 3 fallacies in this debate snippet", user: "Omar M.", xp: 450, time: "1 day left" }
          ].map(challenge => (
            <div key={challenge.id} style={{ padding: 24, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>
                    {challenge.user.charAt(0)}
                  </div>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Posted by {challenge.user} • {challenge.time}</span>
                </div>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.2rem" }}>{challenge.title}</h3>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700, padding: "4px 12px", backgroundColor: "rgba(100,200,255,0.1)", borderRadius: 20 }}>
                    +{challenge.xp} XP
                  </span>
                </div>
              </div>
              <button style={{ padding: "12px 24px", backgroundColor: "var(--text-base)", color: "var(--bg-base)", border: "none", borderRadius: "var(--radius-md)", fontWeight: 600, cursor: "pointer" }}>
                Accept
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar / Leaderboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          
          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
            <h2 style={{ fontSize: "1.3rem", margin: "0 0 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
              <Trophy size={20} style={{ color: "#d4a843" }} />
              {t({ en: "Top Debunkers (Weekly)", ar: "أفضل المفندين (أسبوعياً)" })}
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { rank: 1, name: "Youssef H.", score: "12,400" },
                { rank: 2, name: "Salma N.", score: "11,250" },
                { rank: 3, name: "Karim W.", score: "9,800" },
                { rank: 14, name: "You", score: "4,250" }
              ].map((user, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: idx !== 3 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ 
                      width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700,
                      backgroundColor: user.rank === 1 ? "#d4a843" : user.rank === 2 ? "#c0c0c0" : user.rank === 3 ? "#cd7f32" : "var(--bg-base)",
                      color: user.rank <= 3 ? "#000" : "var(--text-muted)"
                    }}>
                      {user.rank}
                    </div>
                    <span style={{ fontWeight: user.name === "You" ? 700 : 500, color: user.name === "You" ? "var(--accent-primary)" : "var(--text-base)" }}>
                      {user.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "1rem" }}>{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
            <h2 style={{ fontSize: "1.3rem", margin: "0 0 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
              <Award size={20} style={{ color: "var(--accent-primary)" }} />
              {t({ en: "Your Badges", ar: "شاراتك" })}
            </h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ textAlign: "center", padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border)" }}>
                <Star size={32} style={{ color: "#d4a843", margin: "0 auto 8px" }} />
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>Fact Finder</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border)" }}>
                <ShieldAlert size={32} style={{ color: "var(--accent-primary)", margin: "0 auto 8px" }} />
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>Fallacy Slayer</div>
              </div>
              <div style={{ textAlign: "center", padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px dashed var(--border)", opacity: 0.3 }}>
                <Activity size={32} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>OSINT Master</div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <PageNavigation currentPath="/connect" />
    </div>
  );
}
