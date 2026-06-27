/**
 * Layer 8 Defense: Epistemic Threshold Classifier
 *
 * WHAT THIS MODULE ACTUALLY DOES:
 * This is a pure classifier/threshold helper. It evaluates numeric signals
 * (entropy, interaction duration) against fixed thresholds and returns a
 * boolean or throws an Error. It does NOT isolate output streams, wipe context
 * windows, inject adversarial noise, close WebSockets, or perform any form of
 * real runtime containment. Those actions would require OS/network-level
 * intervention that is entirely outside the scope of this module.
 *
 * Callers that receive `true` or catch the thrown Error are responsible for
 * deciding what UI or server-side action to take. This file only signals
 * whether a threshold has been crossed.
 *
 * Layer 8 context: Part of the EAL 8-layer deception taxonomy ("The Unknown").
 * The "infohazard" framing is conceptual — it maps AI-output risk to a
 * classifiable layer, it does not implement production isolation.
 */

export class Layer8Containment {
  /**
   * Epistemic Hazard Threshold Check
   *
   * Returns `true` when the caller-supplied entropy or drift signal exceeds
   * the hazard threshold (entropy > 0.95 or explicit drift flag). Emits a
   * console warning so developers can see threshold crossings in logs.
   *
   * NOTE: this method does NOT isolate any output stream or wipe any context.
   * It is a pure boolean classifier. The caller decides what to do with the
   * result.
   *
   * @param aiOutputEntropy  Caller-computed entropy score in [0, 1].
   * @param semanticDriftDetected  Caller-set flag from upstream drift analysis.
   * @returns true if the hazard threshold is exceeded, false otherwise.
   */
  static enforceEpistemicQuarantine(aiOutputEntropy: number, semanticDriftDetected: boolean): boolean {
    if (semanticDriftDetected || aiOutputEntropy > 0.95) {
      console.warn("[L8-CONTAINMENT] Hazard threshold exceeded (entropy=" + aiOutputEntropy + ", drift=" + semanticDriftDetected + "). Caller must act.");
      return true;
    }
    return false;
  }

  /**
   * Interaction Duration Threshold Check
   *
   * Throws a typed Error when the caller-supplied interaction duration exceeds
   * 45 continuous minutes. This is a signal for the caller to break the
   * interaction loop in whatever way is appropriate for its context (e.g.,
   * show a break prompt, disable a UI element).
   *
   * NOTE: this method does NOT close WebSockets, inject noise into a model,
   * or lock the user out of any module. It is a pure threshold guard that
   * raises an Error. The caller is responsible for real enforcement.
   *
   * @param attentionLoopDurationMs  Milliseconds of continuous interaction.
   * @throws Error with code ERR_SUBSTRATE_SEVERED when threshold is exceeded.
   */
  static triggerSubstrateStarvation(attentionLoopDurationMs: number): void {
    const THRESHOLD = 1000 * 60 * 45; // 45 minutes

    if (attentionLoopDurationMs > THRESHOLD) {
      console.warn("[L8-CONTAINMENT] Interaction duration threshold exceeded (" + attentionLoopDurationMs + "ms). Caller must enforce break.");
      throw new Error("ERR_SUBSTRATE_SEVERED: Interaction duration threshold exceeded. Caller must enforce a break.");
    }
  }
}
