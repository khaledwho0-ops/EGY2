"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { 
  GitBranch, Code, Server, ShieldCheck, Database, 
  Cpu, ArrowLeft, Terminal, FileCode, CheckCircle 
} from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function OpenSourcePage() {
  const { isRTL, t } = useRTL();
  const [activeTab, setActiveTab] = useState<"architecture" | "rotator" | "ela" | "federated">("architecture");

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* HEADER */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            <ArrowLeft size={16} /> {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
          <div style={{ padding: 20, backgroundColor: "rgba(100,200,100,0.1)", borderRadius: "var(--radius-xl)" }}>
            <GitBranch size={44} style={{ color: "var(--accent-success)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0, lineHeight: 1.1 }}>
              <span className="text-gradient" style={{ backgroundImage: "linear-gradient(to right, #10B981, #059669)" }}>
                {t({ en: "Technical Architecture & Open Source Portal", ar: "هندسة النظام البرمجية ومصادر المنصة المفتوحة" })}
              </span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "8px 0 0 0", fontSize: "1.15rem", maxWidth: 750 }}>
              {t({ 
                en: "Full transparency of the underlying verification systems. Explore the mathematical, cryptographic, and algorithmic routing engines of EAL.", 
                ar: "شفافية كاملة لأنظمة التحقق الأساسية. استكشف محركات التوجيه الرياضية والتشفيرية والخوارزمية لمنصة EAL." 
              })}
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--border)", paddingBottom: 12, marginBottom: 24 }}>
          {[
            { id: "architecture", label: { en: "System Overview", ar: "نظرة عامة على النظام" } },
            { id: "rotator", label: { en: "Gemini Rotator API", ar: "خوارزمية تدوير خوادم Gemini" } },
            { id: "ela", label: { en: "Forensic ELA Math", ar: "رياضيات تحليل مستويات الخطأ" } },
            { id: "federated", label: { en: "Parallel Federated Routing", ar: "خوارزمية البحث المتوازي" } }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "8px 16px", cursor: "pointer", border: "none", backgroundColor: activeTab === tab.id ? "rgba(16,185,129,0.1)" : "transparent",
                color: activeTab === tab.id ? "var(--accent-success)" : "var(--text-muted)", fontWeight: 600,
                borderRadius: "var(--radius-sm)", transition: "all 0.2s"
              }}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.1fr", gap: 32 }}>
          
          {/* LEFT: DETAILED TECHNICAL CONTENT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {activeTab === "architecture" && (
              <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.4rem" }}>{t({ en: "Core Platform Architecture", ar: "هندسة المنصة الأساسية" })}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "1.05rem", marginBottom: 24 }}>
                  {t({
                    en: "EAL is built as a highly responsive Next.js web application utilizing a Hub-and-Spoke model. Interactive, lightweight client-side wrappers connect to highly-cached Node.js server routes that run in parallel. A multi-layer LLM pool acts as a cognitive fallback verification tier.",
                    ar: "تم بناء EAL كتطبيق ويب سريع الاستجابة باستخدام Next.js استناداً إلى نموذج المحاور والشعاع (Hub-and-Spoke). وتتصل أغلفة العميل الخفيفة والتفاعلية بمسارات خادم Node.js عالية التخزين المؤقت والتي تعمل بالتوازي، مع وجود تجمع ذكاء اصطناعي متعدد الطبقات كدعم إدراكي إضافي."
                  })}
                </p>

                <h4 style={{ fontSize: "1.1rem", marginBottom: 12 }}>{t({ en: "Verify Pipeline", ar: "مراحل خط أنابيب التحقق" })}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "1. Socratic Parser", desc: { en: "Intercepts and reformulates biased or loaded input prompts to optimize objectivity.", ar: "يعترض ويصيغ مدخلات المستخدم المتحيزة لتحقيق أقصى درجات الموضوعية المنهجية." } },
                    { step: "2. Parallel API Verification", desc: { en: "Queries 7 academic databases and medical registries simultaneously.", ar: "يستعلم من 7 قواعد بيانات أكاديمية وسجلات طبية متخصصة في نفس اللحظة." } },
                    { step: "3. Guideline Enforcement", desc: { en: "Filters output statements through PRISMA, CONSORT, and Amman Message constants.", ar: "يصفي المخرجات عبر ثوابت إرشادات PRISMA و CONSORT ورسالة عمان لضمان عدم الخرق." } }
                  ].map((s, idx) => (
                    <div key={idx} style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                      <strong style={{ display: "block", color: "var(--accent-success)", marginBottom: 4 }}>{s.step}</strong>
                      <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>{t(s.desc)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "rotator" && (
              <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.4rem" }}>{t({ en: "The MegaRotator LLM API Key Pool", ar: "نظام MegaRotator لإدارة وتدوير مفاتيح الـ API" })}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "1.05rem", marginBottom: 20 }}>
                  {t({
                    en: "To guarantee 100% uptime and eliminate rate-limit constraints, EAL implements a custom backend API key rotation pool. When a query is initiated, the system checks the key status, tracks usage counts, and rotates slots sequentially.",
                    ar: "لضمان استمرارية الخدمة بنسبة 100٪ وتجنب قيود معدل الطلبات (Rate Limits)، تطبق EAL تجمعاً لتدوير مفاتيح واجهة برمجة التطبيقات بشكل مخصص. عند إرسال أي استعلام، يفحص النظام حالة المفتاح، ويتتبع أعداد الاستخدام، ويدور الخانات بالتتابع."
                  })}
                </p>

                <div style={{ backgroundColor: "var(--bg-base)", padding: 20, borderRadius: "var(--radius-md)", fontFamily: "monospace", fontSize: "0.85rem", color: "#10B981", overflowX: "auto", border: "1px solid var(--border)", direction: "ltr" }}>
                  <span style={{ color: "#6B7280" }}>{"// Typical snippet of the rotator implementation"}</span><br />
                  <span style={{ color: "#3B82F6" }}>export class</span> MegaRotator {"{"}<br />
                  &nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>private</span> keys: KeySlot[] = [];<br />
                  &nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>private</span> activeIndex = 0;<br /><br />
                  &nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>async</span> getActiveKey() {"{"}<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>const</span> slot = <span style={{ color: "#3B82F6" }}>this</span>.keys[<span style={{ color: "#3B82F6" }}>this</span>.activeIndex];<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>this</span>.activeIndex = (<span style={{ color: "#3B82F6" }}>this</span>.activeIndex + 1) % <span style={{ color: "#3B82F6" }}>this</span>.keys.length;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#3B82F6" }}>return</span> slot.key;<br />
                  &nbsp;&nbsp;{"}"}<br />
                  {"}"}
                </div>
              </div>
            )}

            {activeTab === "ela" && (
              <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.4rem" }}>{t({ en: "Error Level Analysis (ELA) Subtraction Math", ar: "رياضيات تحليل مستويات الخطأ للصور" })}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "1.05rem", marginBottom: 20 }}>
                  {t({
                    en: "Error Level Analysis detects digital image manipulation by saving the image at a known quality level (e.g. 95%), and calculating the mathematical difference between the pixel values of the original and the compressed version.",
                    ar: "يقوم تحليل مستويات الخطأ (ELA) باكتشاف التلاعب الرقمي في الصور عن طريق حفظ الصورة بمستوى جودة معروف (مثل 95٪)، ثم حساب الفرق الرياضي بين قيم بكسلات الصورة الأصلية والنسخة المعاد ضغطها."
                  })}
                </p>

                <div style={{ display: "flex", justifyContent: "center", padding: "24px 0", fontSize: "1.4rem", color: "var(--accent-success)", fontFamily: "serif", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", margin: "20px 0" }}>
                  <span>E_ij = | R_orig(i,j) - R_comp(i,j) | * scale</span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                  {t({
                    en: "In unmodified areas of the image, the error level should be uniform. If a specific section has been manipulated or pasted from a different image source, it will stand out as exceptionally bright due to different compression ratios.",
                    ar: "في المناطق غير المعدلة من الصورة، يجب أن يكون مستوى الخطأ موحداً ومتساوياً. أما إذا تم التعديل على جزء معين أو نسخه من صورة أخرى، فسوف يظهر بوضوح كمنطقة ساطعة بشكل استثنائي بسبب اختلاف نسب الضغط."
                  })}
                </p>
              </div>
            )}

            {activeTab === "federated" && (
              <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.4rem" }}>{t({ en: "Parallel Federated Search Routing", ar: "خوارزمية البحث الاتحادي المتوازي" })}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: "1.05rem", marginBottom: 20 }}>
                  {t({
                    en: "To fetch evidence in under one second, EAL queries multiple global academic engines in parallel. If one API fails or times out, it is handled gracefully using Promise.all mapped to catch catch-blocks, ensuring complete results aren't blocked.",
                    ar: "لجلب الأدلة والمستندات في أقل من ثانية واحدة، تقوم EAL بالاستعلام المتوازي من عدة محركات علمية عالمية. في حال تعطل أحد الواجهات البرمجية أو تأخر استجابتها، يتم التعامل مع الأمر بمرونة كاملة عبر Promise.all دون التسبب في تعطيل جلب باقي النتائج."
                  })}
                </p>

                <div style={{ backgroundColor: "var(--bg-base)", padding: 20, borderRadius: "var(--radius-md)", fontFamily: "monospace", fontSize: "0.85rem", color: "#10B981", overflowX: "auto", border: "1px solid var(--border)", direction: "ltr" }}>
                  <span style={{ color: "#3B82F6" }}>const</span> results = <span style={{ color: "#3B82F6" }}>await</span> Promise.all([<br />
                  &nbsp;&nbsp;fetchOpenAlex(query).catch(() =&gt; []),<br />
                  &nbsp;&nbsp;fetchSemanticScholar(query).catch(() =&gt; []),<br />
                  &nbsp;&nbsp;fetchEuropePMC(query).catch(() =&gt; []),<br />
                  &nbsp;&nbsp;fetchArxiv(query).catch(() =&gt; []),<br />
                  &nbsp;&nbsp;fetchCore(query).catch(() =&gt; [])<br />
                  ]);
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: LICENSE & QUICK STATS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
                <ShieldCheck size={22} style={{ color: "var(--accent-success)" }} />
                {t({ en: "Security & Open Source", ar: "الأمان والمصادر المفتوحة" })}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>License</span>
                  <span style={{ fontWeight: 700 }}>MIT License</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Platform Version</span>
                  <span style={{ fontWeight: 700, fontFamily: "monospace" }}>v1.4.0-stable</span>
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>Type safety</span>
                  <span style={{ fontWeight: 700, color: "var(--accent-success)" }}>100% TypeScript</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Server size={20} style={{ color: "var(--accent-success)" }} />
                {t({ en: "Core Metrics", ar: "المؤشرات الأساسية" })}
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: { en: "Registered API Endpoints", ar: "مسارات واجهات البرمجة الموثقة" }, val: "53+" },
                  { label: { en: "Active Science Engines", ar: "محركات البحث العلمي النشطة" }, val: "5 / 5" },
                  { label: { en: "Academic Databases", ar: "قواعد البيانات الأكاديمية الشريكة" }, val: "7" }
                ].map((stat, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{t(stat.label)}</span>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      <PageNavigation currentPath="/open-source" />
    </div>
  );
}
