import React, { useState } from 'react';
import { TimeFrictionGate } from './time-friction-gate';

export interface CalmRevealProps {
  children: React.ReactNode;
  durationMs?: number;
  message?: string;
  eisScore?: number;
}

export const CalmReveal: React.FC<CalmRevealProps> = ({ children, durationMs = 5000, message, eisScore }) => {
  const [isRevealed, setIsRevealed] = useState(false);

 
  // If EIS > 0.7, we MUST force the time-friction gate.
  // If no EIS is provided, we default to forcing it to be safe.
  const requiresFriction = (eisScore === undefined || eisScore > 0.7);

  if (!requiresFriction) {
    return <>{children}</>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      {!isRevealed ? (
        <TimeFrictionGate
          durationMs={durationMs}
          message={message || "High emotional intent detected. Regulating cognitive pacing..."}
          onComplete={() => setIsRevealed(true)}
        />
      ) : (
        <div className="animate-fadeIn transition-opacity duration-1000 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};
