"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from '@/components/shared/rtl-provider';

export default function PricingPresentationPage() {
  const { isRTL } = useRTL();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.min(prev + 1, 2));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slide1 = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <h1 style={{ color: "var(--accent-religionhub)", fontSize: "3rem", marginBottom: "3rem", fontWeight: "bold" }}>{isRTL ? "الباقات والخدمات" : "Packages & Services"}</h1>
      <div style={{ display: "flex", gap: "2rem", width: "100%", maxWidth: "1200px" }}>
        {[
          {
            id: "large",
            title: isRTL ? "مشروع كبير" : "Large Project",
            bg: "var(--accent-amber)",
            color: "var(--text-inverse)",
            price: "50,000-70,000 جنيه",
            bullets: ["تحليل سوق شامل", "دراسة مالية متكاملة", "تقييم تقني متقدم", "نموذج أولي كامل (MVP)", "مراجعة قانونية", "دعم وصيانة 4 شهور", "3 تعديلات مجانية", "تحسينات ضمن النطاق"]
          },
          {
            id: "medium",
            title: isRTL ? "مشروع متوسط" : "Medium Project",
            bg: "var(--accent-religionhub)",
            color: "var(--text-inverse)",
            price: "30,000-35,000 جنيه",
            bullets: ["تحليل سوق متقدم", "دراسة مالية تفصيلية", "تقييم تقني شامل", "نموذج أولي متوسط", "مراجعة قانونية", "دعم وصيانة شهرين", "تعديلين مجانيين"]
          },
          {
            id: "small",
            title: isRTL ? "مشروع صغير" : "Small Project",
            bg: "var(--text-muted)",
            color: "var(--text-inverse)",
            price: "15,000-17,000 جنيه",
            bullets: ["تحليل سوق أساسي", "دراسة مالية مبدئية", "تقييم تقني للفكرة", "نموذج أولي مصغر", "مراجعة قانونية أولية", "تعديل واحد مجاني"]
          }
        ].map(pkg => (
          <div key={pkg.id} style={{ flex: 1, backgroundColor: "var(--bg-card)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ backgroundColor: pkg.bg, color: pkg.color, padding: "1.5rem", textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}>{pkg.title}</div>
            <div style={{ padding: "2rem" }}>
              <div style={{ color: "var(--accent-amber)", fontSize: "1.8rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem", direction: "ltr" }}>{pkg.price}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: isRTL ? "right" : "left", color: "var(--text-primary)", fontSize: "1.1rem", lineHeight: "1.8" }}>
                {pkg.bullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem" }}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const slide2 = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <h1 style={{ color: "var(--accent-religionhub)", fontSize: "3rem", marginBottom: "3rem", fontWeight: "bold" }}>{isRTL ? "نموذج التسعير" : "Pricing Model"}</h1>

      <div style={{ display: "flex", gap: "3rem", width: "100%", maxWidth: "1200px", alignItems: "center" }}>

        {/* Right Half: Additional Services & Payment Policy */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          <div>
            <h2 style={{ color: "var(--accent-religionhub)", fontSize: "1.8rem", marginBottom: "1.5rem", textAlign: isRTL ? "right" : "left" }}>{isRTL ? "خدمات إضافية" : "Additional Services"}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { price: "1,500", text: "تعديل صغير (نصوص / أرقام / تحسينات بسيطة)" },
                { price: "3,000", text: "تعديل متوسط (جزئي في النظام أو التصميم)" },
                { price: "5,000", text: "تعديل كبير (إعادة جزء من العمل)" }
              ].map(item => (
                <div key={item.price} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "var(--bg-card)", padding: "1.2rem 1.5rem", borderRadius: "12px", boxShadow: "var(--shadow-sm)", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ color: "var(--text-primary)", fontWeight: "bold", fontSize: "1.1rem" }}>{item.text}</div>
                  <div style={{ color: "var(--accent-amber)", fontWeight: "bold", fontSize: "1.3rem", direction: "ltr" }}>{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "var(--accent-religionhub)", borderRadius: "20px", padding: "2rem", position: "relative", boxShadow: "var(--shadow-lg)" }}>
             <div style={{ position: "absolute", top: "1.2rem", right: "1.5rem", color: "var(--accent-amber)", fontWeight: "bold", fontSize: "1.2rem" }}>{isRTL ? "سياسة الدفع" : "Payment Policy"}</div>
             <div style={{ color: "var(--text-inverse)", textAlign: "center", fontSize: "1.4rem", marginTop: "1rem", lineHeight: "1.8", fontWeight: "bold" }}>
               مقدماً <span style={{ color: "var(--accent-amber)", fontSize: "1.6rem" }}>50%</span> + <span style={{ color: "var(--accent-amber)", fontSize: "1.6rem" }}>30%</span> عند المسودة + <span style={{ color: "var(--accent-amber)", fontSize: "1.6rem" }}>20%</span> عند التسليم
             </div>
          </div>
        </div>

        {/* Left Half: Bar Chart */}
        <div style={{ flex: 1, backgroundColor: "var(--bg-card)", borderRadius: "20px", padding: "2.5rem", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)" }}>
          <h2 style={{ textAlign: "center", color: "var(--accent-religionhub)", marginBottom: "2rem", fontSize: "1.8rem" }}>{isRTL ? "نموذج تسعير طبقي" : "Tiered Pricing Model"}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", color: "var(--text-primary)" }}><div style={{ width: 16, height: 16, backgroundColor: "var(--accent-religionhub)", borderRadius: 4 }} /> {isRTL ? "السعر الأساسي" : "Base Price"}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", color: "var(--text-primary)" }}><div style={{ width: 16, height: 16, backgroundColor: "var(--accent-amber)", borderRadius: 4 }} /> {isRTL ? "الحد الأقصى" : "Maximum"}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { label: isRTL ? "كبير" : "Large", base: 50, max: 70 },
              { label: isRTL ? "متوسط" : "Medium", base: 30, max: 35 },
              { label: isRTL ? "صغير" : "Small", base: 15, max: 17 }
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "60px", textAlign: isRTL ? "right" : "left", fontWeight: "bold", color: "var(--accent-religionhub)", fontSize: "1.2rem" }}>{item.label}</div>
                <div style={{ flex: 1, position: "relative", height: "45px", backgroundColor: "var(--bg-secondary)", borderRadius: "25px", border: "1px solid var(--border-primary)" }}>
                  {/* Max Bar (Gold) */}
                  <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: `${(item.max / 80) * 100}%`, backgroundColor: "var(--accent-amber)", borderRadius: "25px", transition: "width 1s ease-out" }} />
                  {/* Base Bar (Purple) */}
                  <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: `${(item.base / 80) * 100}%`, backgroundColor: "var(--accent-religionhub)", borderRadius: "25px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "1rem", color: "var(--text-inverse)", fontSize: "1.1rem", fontWeight: "bold", transition: "width 1s ease-out", zIndex: 2 }} >{item.base}k</div>
                  {/* Max Text */}
                  <div style={{ position: "absolute", top: 0, right: `${(item.max / 80) * 100}%`, height: "100%", display: "flex", alignItems: "center", paddingRight: "0.8rem", color: "var(--accent-religionhub)", fontSize: "1.1rem", fontWeight: "bold", direction: "ltr", zIndex: 1 }}>{item.max}k</div>
                </div>
              </div>
            ))}
          </div>

          {/* Axis line */}
          <div style={{ display: "flex", paddingRight: "76px", flexDirection: "row", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "1rem", marginTop: "1rem", fontWeight: "bold", direction: "rtl" }}>
            <span>0</span>
            <span>20k</span>
            <span>40k</span>
            <span>60k</span>
            <span>80k</span>
          </div>
        </div>
      </div>
    </div>
  );

  const slide3 = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <h1 style={{ color: "var(--accent-religionhub)", fontSize: "3rem", marginBottom: "3rem", fontWeight: "bold" }}>{isRTL ? "القنوات والترويج" : "Channels & Promotion"}</h1>
      <div style={{ display: "flex", gap: "3rem", width: "100%", maxWidth: "1200px" }}>

        {/* Right Box (Promotion) */}
        <div style={{ flex: 1, backgroundColor: "var(--bg-card)", borderRadius: "20px", padding: "3rem", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)" }}>
          <h2 style={{ color: "var(--accent-religionhub)", fontSize: "2rem", marginBottom: "2rem", borderBottom: "2px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>الوصول (Promotion) الترويج</h2>

          <h3 style={{ color: "var(--accent-amber)", fontSize: "1.4rem", marginBottom: "1.2rem" }}>القنوات التسويقية</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0", color: "var(--text-primary)", fontSize: "1.2rem", lineHeight: "2" }}>
            <li>• وسائل التواصل الاجتماعي</li>
            <li>• (محتوى تعليمي) Content Marketing</li>
            <li>• حملات إعلانية رقمية مدفوعة</li>
            <li>• الإحالات من العملاء السابقين</li>
            <li>• الندوات التعريفية عبر الإنترنت</li>
          </ul>

          <h3 style={{ color: "var(--accent-religionhub)", fontSize: "1.4rem", marginBottom: "1.2rem" }}>الشراكات الاستراتيجية:</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-primary)", fontSize: "1.2rem", lineHeight: "2" }}>
            <li>• الجامعات وورش ريادة الأعمال</li>
            <li>• حاضنات الأعمال (TIEC / GrEEK Campus)</li>
            <li>• شركات برمجة واستشارات</li>
          </ul>
        </div>

        {/* Left Box (Place) */}
        <div style={{ flex: 1, backgroundColor: "var(--bg-card)", borderRadius: "20px", padding: "3rem", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-subtle)" }}>
          <h2 style={{ color: "var(--accent-religionhub)", fontSize: "2rem", marginBottom: "2rem", borderBottom: "2px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>توصيل الخدمة — (Place) المكان</h2>

          <h3 style={{ color: "var(--accent-amber)", fontSize: "1.4rem", marginBottom: "1.2rem" }}>نموذج Digital Service Delivery</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem 0", color: "var(--text-primary)", fontSize: "1.2rem", lineHeight: "2" }}>
            <li>• الموقع الإلكتروني الرسمي</li>
            <li>• الاجتماعات أونلاين</li>
            <li>• البريد الإلكتروني والمنصات الرقمية</li>
            <li>• التسويق المباشر للعملاء</li>
          </ul>

          <h3 style={{ color: "var(--accent-religionhub)", fontSize: "1.4rem", marginBottom: "1.2rem" }}>طريقة التقديم:</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--text-primary)", fontSize: "1.2rem", lineHeight: "2" }}>
            <li>• خدمة بالكامل عن بُعد (online)</li>
            <li>• لا يوجد مقر فعلي في البداية</li>
            <li>• قابلية التوسع لاحقاً لمنصة أو تطبيق</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg-page)",
      fontFamily: "'Noto Kufi Arabic', 'Cairo', 'Tajawal', sans-serif",
      direction: isRTL ? "rtl" : "ltr",
      position: "relative",
      overflow: "hidden",
      margin: 0,
      padding: 0
    }}>
      {/* Slides Container */}
      <div style={{
        display: "flex",
        width: "300%",
        height: "100vh",
        transform: `translateX(${currentSlide * 33.333}%)`,
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      }}>
        <div style={{ width: "33.333%", height: "100%" }}>{slides[0]}</div>
        <div style={{ width: "33.333%", height: "100%" }}>{slides[1]}</div>
        <div style={{ width: "33.333%", height: "100%" }}>{slides[2]}</div>
      </div>

      {/* Navigation Controls */}
      <div style={{ position: "absolute", bottom: "2rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "1rem", alignItems: "center", direction: "rtl" }}>

        {/* Prev Slide (moves right in RTL) */}
        <button
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
          title={isRTL ? "السابق" : "Previous"}
          style={{
            background: currentSlide === 0 ? "var(--bg-secondary)" : "var(--accent-religionhub)",
            color: "var(--text-inverse)",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          <ChevronRight size={24} />
        </button>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[0, 1, 2].map(idx => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: currentSlide === idx ? "var(--accent-amber)" : "var(--border-secondary)",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
            />
          ))}
        </div>

        {/* Next Slide (moves left in RTL) */}
        <button
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, 2))}
          disabled={currentSlide === 2}
          title={isRTL ? "التالي" : "Next"}
          style={{
            background: currentSlide === 2 ? "var(--bg-secondary)" : "var(--accent-religionhub)",
            color: "var(--text-inverse)",
            border: "none",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: currentSlide === 2 ? "not-allowed" : "pointer",
            transition: "all 0.2s"
          }}
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <PageNavigation currentPath="/pricing-presentation" />
    </div>
  );
}
