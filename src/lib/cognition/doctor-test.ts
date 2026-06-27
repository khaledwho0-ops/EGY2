// lib/cognition/doctor-test.ts — pure client check
export const DOCTOR_TEST = {
  must: [
    { id: "specialty", q_en: "Do they state a specific specialty (e.g., Psychiatry, Cardiology)?",
                       q_ar: "هل يحدد التخصص بدقة؟" },
    { id: "syndicate", q_en: "Are they listed in the Egyptian Medical Syndicate registry?",
                       q_ar: "هل اسمه في سجل نقابة الأطباء المصرية؟" },
    { id: "affiliation", q_en: "Public-hospital or university affiliation visible?",
                          q_ar: "هل ينتمي لمستشفى حكومي أو جامعة؟" },
    { id: "publications", q_en: "Peer-reviewed publications under their name?",
                          q_ar: "هل له أبحاث محكَّمة؟" },
    { id: "society", q_en: "Member of relevant professional society (e.g., Egyptian Psychiatric Association)?",
                     q_ar: "عضو في جمعية مهنية؟" }
  ]
};
