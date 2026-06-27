export interface XapiStatement { // 1
  actor: { // 2
    mbox: string; // 3
    name: string; // 4
  }; // 5
  verb: { // 6
    id: string; // 7
    display: { "en-US": string }; // 8
  }; // 9
  object: { // 10
    id: string; // 11
    definition: { name: { "en-US": string } }; // 12
  }; // 1
  result?: { // 2
    score?: { scaled: number; raw: number; min: number; max: number }; // 3
    success?: boolean; // 4
    completion?: boolean; // 5
  }; // 6
} // 7

export interface ScormPayload { // 8
  "cmi.core.lesson_status": "passed" | "completed" | "failed" | "incomplete" | "browsed" | "not attempted"; // 9
  "cmi.core.score.raw": number; // 10
  "cmi.core.session_time": string; // 11
} // 12

export class TelemetryEngine { // 1
  // Telemetry architecture for robust LRS tracking and Supervisor Dashboard feed // 2
  
  static generateXapiStatement(userId: string, verbId: string, verbDisplay: string, objectId: string, objectName: string, score?: number): XapiStatement { // 3
    return { // 4
      actor: { mbox: `mailto:${userId}@eal-sovereign.local`, name: userId }, // 5
      verb: { id: verbId, display: { "en-US": verbDisplay } }, // 6
      object: { id: objectId, definition: { name: { "en-US": objectName } } }, // 7
      result: score !== undefined ? { // 8
        score: { scaled: score / 100, raw: score, min: 0, max: 100 }, // 9
        success: score >= 80, // 10
        completion: true // 11
      } : undefined // 12
    }; // 1
  } // 2

  static generateScormPayload(score: number, sessionSeconds: number): ScormPayload { // 3
    const formatTime = (sec: number) => { // 4
      const h = Math.floor(sec / 3600).toString().padStart(4, '0'); // 5
      const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0'); // 6
      const s = Math.floor(sec % 60).toString().padStart(2, '0'); // 7
      return `${h}:${m}:${s}`; // 8
    }; // 9

    return { // 10
      "cmi.core.lesson_status": score >= 80 ? "passed" : "failed", // 11
      "cmi.core.score.raw": score, // 12
      "cmi.core.session_time": formatTime(sessionSeconds) // 1
    }; // 2
  } // 3
} // 4
