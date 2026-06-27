"use client";
/* ═══════════════════════════════════════════════════════════════
 * /verify/[id] — PUBLIC certificate verification page.
 * Reads the persisted cert record via /api/certificate/generate?id=<uuid> and
 * shows ONLY the minimal-disclosure set (PRD §6.2): holder name, credential title,
 * issue date, score band, tamper hash, and verified/revoked status.
 *
 * • Unknown ID → honest "no such certificate" (the API returns 404).
 * • Tampered/forged signature → "verification failed".
 * • Optional ?name=<holder> in the URL enforces a name match (anti-impersonation).
 * This is what turns the credential from theatre into a real, checkable trust signal.
 * ═══════════════════════════════════════════════════════════════ */
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

type Status = "loading" | "ok" | "notfound" | "error";

interface VerifyResult {
  verified: boolean;
  revoked?: boolean;
  tamperState?: string;
  nameMatch?: boolean | null;
  holder?: { name: string; nameAr: string };
  title_en?: string;
  title_ar?: string;
  program?: string;
  tier?: string;
  band?: { en: string; ar: string };
  issuedAt?: string;
  curriculumVersion?: string;
  tamperHash?: string;
  subScores?: { mist20?: number; realNewsBias?: number | null };
  note_en?: string;
  note_ar?: string;
}

export default function VerifyCertificatePage() {
  const params = useParams();
  const search = useSearchParams();
  const id = String(params?.id ?? "");
  const nameParam = search?.get("name") ?? "";
  const [data, setData] = useState<VerifyResult | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [lang, setLang] = useState<"en" | "ar">("en");
  const rtl = lang === "ar";
  const t = (en: string, ar: string) => (rtl ? ar : en);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const q = nameParam ? `&name=${encodeURIComponent(nameParam)}` : "";
        const r = await fetch(`/api/certificate/generate?id=${encodeURIComponent(id)}${q}`);
        if (r.status === 404) { setStatus("notfound"); return; }
        setData(await r.json());
        setStatus("ok");
      } catch {
        setStatus("error");
      }
    })();
  }, [id, nameParam]);

  const verified = status === "ok" && data?.verified;
  const accent = verified ? "#3fcb6b" : status === "loading" ? "#64748b" : "#ff6b6b";

  return (
    <main dir={rtl ? "rtl" : "ltr"} style={S.page}>
      <div style={S.wrap}>
        <div style={S.topbar}>
          <span style={S.brand}>EAL · {t("Certificate Verification", "التحقّق من الشهادة")}</span>
          <button style={S.langBtn} onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))}>
            {lang === "en" ? "ع" : "EN"}
          </button>
        </div>

        {status === "loading" && (
          <div style={S.card}><p style={S.muted}>{t("Verifying…", "جارٍ التحقّق…")}</p></div>
        )}

        {status === "notfound" && (
          <div style={{ ...S.card, borderColor: "rgba(255,107,107,0.4)" }}>
            <div style={{ ...S.badge, background: "rgba(255,107,107,0.12)", color: "#ff6b6b" }}>✕ {t("No certificate found", "لا توجد شهادة")}</div>
            <p style={S.lead}>{t("No certificate exists with this ID.", "لا توجد شهادة بهذا المعرّف.")}</p>
            <p style={S.muted}>{t("This ID is not in the registry — the certificate may be forged or mistyped.", "هذا المعرّف غير موجود في السجل — قد تكون الشهادة مزوّرة أو المعرّف خاطئًا.")}</p>
            <code style={S.idCode}>{id}</code>
          </div>
        )}

        {status === "error" && (
          <div style={S.card}><p style={{ color: "#ff6b6b" }}>{t("Could not reach the verification service.", "تعذّر الوصول إلى خدمة التحقّق.")}</p></div>
        )}

        {status === "ok" && data && (
          <div style={{ ...S.card, borderColor: `${accent}55` }}>
            <div style={{ ...S.badge, background: `${accent}1e`, color: accent }}>
              {verified ? `✓ ${t("Verified", "موثّقة")}` : `⚠ ${t("Verification failed", "فشل التحقّق")}`}
            </div>

            {!verified && (
              <p style={{ color: "#ffb04d", fontSize: 13, margin: "0 0 12px" }}>
                {data.revoked
                  ? t("This certificate has been revoked.", "تم إلغاء هذه الشهادة.")
                  : data.nameMatch === false
                  ? t("The name does not match the certificate on record.", "الاسم لا يطابق الشهادة المسجّلة.")
                  : t(`Tamper check: ${data.tamperState}`, `فحص التلاعب: ${data.tamperState}`)}
              </p>
            )}

            <h1 style={S.title}>{rtl ? data.title_ar : data.title_en}</h1>

            <div style={S.grid}>
              <Field label={t("Holder", "صاحب الشهادة")} value={rtl ? data.holder?.nameAr : data.holder?.name} />
              <Field label={t("Result", "النتيجة")} value={`${data.tier ?? ""} · ${rtl ? data.band?.ar : data.band?.en}`} />
              <Field label={t("Issued", "تاريخ الإصدار")} value={data.issuedAt ? new Date(data.issuedAt).toLocaleDateString(rtl ? "ar-EG" : "en-GB") : "—"} />
              <Field label={t("Program", "البرنامج")} value={data.program} />
              {typeof data.subScores?.mist20 === "number" && (
                <Field label={t("MIST-20 (measured)", "اختبار MIST-20 (مقاس)")} value={`${data.subScores.mist20}%`} />
              )}
              {typeof data.subScores?.realNewsBias === "number" && (
                <Field label={t("Real-news bias", "انحياز الأخبار الحقيقية")} value={data.subScores.realNewsBias.toFixed(2)} />
              )}
            </div>

            <div style={S.hashRow}>
              <span style={S.hashLabel}>{t("Tamper hash", "بصمة التلاعب")}</span>
              <code style={S.hash}>{data.tamperHash}</code>
            </div>

            <p style={S.scope}>{rtl ? data.note_ar : data.note_en}</p>
          </div>
        )}

        <p style={S.foot}>{t("Verification reads a server-side record and recomputes the signature. Self-issued credential under the published EAL methodology.", "يقرأ التحقّق سجلًّا على الخادم ويعيد حساب التوقيع. شهادة ذاتية الإصدار وفق منهجية EAL المنشورة.")}</p>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <div style={S.fieldValue}>{value || "—"}</div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "radial-gradient(120% 80% at 50% 0%,#0d1326 0%,#070710 60%)", color: "#e8edf2", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,48px)" },
  wrap: { maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7c8794", fontWeight: 700 },
  langBtn: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1", borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 13, fontWeight: 700 },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px" },
  badge: { display: "inline-block", fontWeight: 800, fontSize: 14, borderRadius: 10, padding: "6px 14px", marginBottom: 14 },
  title: { fontSize: "clamp(20px,3.5vw,26px)", fontWeight: 800, margin: "0 0 16px", color: "#fff" },
  lead: { fontSize: 15, fontWeight: 600, margin: "0 0 6px" },
  muted: { color: "#8a929e", fontSize: 13, margin: 0, lineHeight: 1.6 },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 },
  field: {},
  fieldLabel: { fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", marginBottom: 3, fontWeight: 700 },
  fieldValue: { fontSize: 14, color: "#e8edf2", fontWeight: 600 },
  hashRow: { borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 12, marginBottom: 12 },
  hashLabel: { fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748b", fontWeight: 700, display: "block", marginBottom: 4 },
  hash: { fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: 11, color: "#67e8f9", wordBreak: "break-all", display: "block" },
  scope: { fontSize: 11.5, color: "#7c8794", lineHeight: 1.6, margin: 0, fontStyle: "italic" },
  idCode: { display: "block", marginTop: 10, fontFamily: "var(--font-mono,monospace)", fontSize: 11, color: "#94a3b8", wordBreak: "break-all" },
  foot: { fontSize: 11, color: "#5b6675", textAlign: "center", lineHeight: 1.6, margin: 0 },
};
