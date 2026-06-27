"use client";
import { Joyride, Step } from "react-joyride";
import { useState } from "react";

const STEPS: Step[] = [
  { target: "#mist-card", content: "First — let's see what manipulation techniques you're most vulnerable to. ~2 min." },
  { target: "#pyramid", content: "This is the source pyramid — your mind will internalize it over the next 7 days." },
  { target: "#sift-bar", content: "SIFT — Stop, Investigate, Find, Trace. The four moves of every verification." },
  { target: "#journal", content: "Your Verification Journal — your private log of every claim you've examined." },
];

export function FortressTour() {
  const [run, setRun] = useState(true);
  return (
    <Joyride 
      steps={STEPS} 
      run={run} 
      continuous 
      showProgress 
      showSkipButton
      // @ts-expect-error - react-joyride styles type mismatch
      styles={{ options: { primaryColor: "#0369a1", zIndex: 10000 } }}
      callback={({ status }: { status: string }) => { if (status === "finished" || status === "skipped") setRun(false); }} 
    />
  );
}
