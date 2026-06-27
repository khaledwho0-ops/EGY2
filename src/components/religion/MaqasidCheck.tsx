export const QUESTIONS = [
  { code: "DIN", q: "Does this practice strengthen or weaken authentic faith (not just outward form)?" },
  { code: "NAFS", q: "Does it preserve or endanger human life and bodily integrity?" },
  { code: "AQL", q: "Does it cultivate or impair the intellect?" },
  { code: "NASL", q: "Does it support or harm family and lineage relationships?" },
  { code: "MAL", q: "Does it preserve or exploit wealth and property?" },
];

export function MaqasidReasoningCheck({ impacts }: { impacts: { code: string, effect: string, explanation: string }[] }) {
  // We classify the technique, not the practitioner.
  return (
    <div className="maqasid-check bg-slate-50 border p-4 rounded">
      <h3 className="font-bold text-lg mb-4">Maqāṣid al-Sharīʿah Analysis</h3>
      <p className="text-sm text-gray-600 mb-4">
        This tool surfaces the structural intent behind religious rulings to protect against exploitation.
      </p>
      <ul className="space-y-4">
        {impacts.map((i) => {
          const q = QUESTIONS.find(q => q.code === i.code);
          return (
            <li key={i.code} className="border-l-4 border-indigo-500 pl-4">
              <span className="font-semibold block">{i.code}: {q?.q}</span>
              <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${i.effect === 'harms' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                Result: {i.effect.toUpperCase()}
              </span>
              <p className="mt-1 text-sm">{i.explanation}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
