import { classifyClaim } from "@/lib/cognition/flicc-classifier";

export default async function WhatsAppForwardCheck({ pasted }: { pasted: string }) {
  const c = await classifyClaim(pasted);
  return (
    <div className="ws-check">
      <h3>قبل التحويل اسأل نفسك:</h3>
      <ol>
        <li>من المصدر الأصلي؟ {c.signatures.includes("F:vague_authority") && "⚠️ علم تحذير"}</li>
        <li>هل أجده في WHO / Cochrane / وزارة الصحة؟</li>
        <li>ماذا لو كان خطأ — ما أسوأ نتيجة؟</li>
      </ol>
      <p className="affect-alert" hidden={Math.abs(c.affectScore) < 0.6}>
        ⚠️ هذه الرسالة تحمل عاطفة قوية ({c.affectScore.toFixed(2)}) — هذا في حد ذاته إشارة تلاعب.
      </p>
    </div>
  );
}
