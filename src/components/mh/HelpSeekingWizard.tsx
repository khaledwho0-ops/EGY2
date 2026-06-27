"use client";
import { useState } from "react";

const PATHWAYS_EG = [
  { code: "PUBLIC", name: { en: "Public Hospital — General Secretariat for Mental Health",
                            ar: "مستشفى حكومي - الأمانة العامة للصحة النفسية" },
    when: ["financial_constraint", "moderate_severe", "psychiatric_referral_needed"],
    contact: "Ministry of Health Mental Health Hotline 08008880700",
    verifiedAt: "2025-quarterly" },
  { code: "OKASHA", name: { en: "Okasha Institute of Psychiatry — Ain Shams University",
                            ar: "معهد الشيخ زايد للطب النفسي - جامعة عين شمس" },
    when: ["specialist_referral", "complex_diagnosis", "research_setting"] },
  { code: "PRIVATE_VERIFIED", name: { en: "Private specialist (verify in Egyptian Medical Syndicate registry)",
                                      ar: "طبيب خاص (تأكد من نقابة الأطباء)" },
    when: ["financial_capacity", "fast_access"] },
  { code: "PRIMARY_CARE", name: { en: "Primary care + mhGAP-trained GP",
                                  ar: "طبيب أسرة مُدرَّب على mhGAP" },
    when: ["mild_to_moderate", "first_episode", "rural"] },
];

export function HelpSeekingWizard({ country }: { country: string }) {
  // Render decision tree map matching mhGAP thresholds to non-diagnostic pathways
  return (
    <div className="help-seeking-wizard">
      <h3>Help-Seeking Pathways ({country})</h3>
      <ul>
        {PATHWAYS_EG.map(p => (
          <li key={p.code}>
            <strong>{p.name.en}</strong> / <span dir="rtl">{p.name.ar}</span>
            {p.contact && <div>Contact: {p.contact}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
