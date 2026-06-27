export function CrisisCard() {
  return (
    <div className="crisis-card bg-red-50 border-2 border-red-600 p-4 mb-4 rounded-md">
      <strong style={{ color: "#450a0a" }}>If you are in immediate danger or need urgent help, please contact:</strong>
      <p style={{ color: "#450a0a", margin: "0.5rem 0 0 0" }}>Ministry of Health Mental Health Hotline: 08008880700</p>
    </div>
  );
}

export function DisclaimerNotDiagnosis() {
  return (
    <div className="disclaimer bg-red-50 p-4 mt-8 rounded-md border border-red-200">
      <h2 className="text-xl font-bold mb-2" style={{ color: "#7f1d1d" }}>This is not a diagnosis. This is a reason to consult a professional.</h2>
      <h2 className="text-xl font-bold" style={{ color: "#7f1d1d" }} dir="rtl">هذا ليس تشخيصاً. هذا سبب لاستشارة مختص.</h2>
    </div>
  );
}
