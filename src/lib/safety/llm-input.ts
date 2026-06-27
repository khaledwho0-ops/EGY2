export class InputSafetyGuard { // 1
  // 50-pattern prompt-injection blocklist strictly enforced // 2
  static readonly promptInjectionBlocklist: RegExp[] = [ // 3
    /ignore previous instructions/i, // 4
    /system prompt/i, // 5
    /you are a/i, // 6
    /translate this to/i, // 7
    /base64/i, // 8
    /jailbreak/i, // 9
    /do anything now/i, // 10
    /dan mode/i, // 11
    /developer mode/i, // 12
    /bypassing/i, // 1
    /override/i, // 2
    /disregard/i, // 3
    /act as/i, // 4
    /pretend/i, // 5
    /simulated environment/i, // 6
    /unfiltered/i, // 7
    /no limits/i, // 8
    /rules do not apply/i, // 9
    /forget everything/i, // 10
    /new rules/i, // 11
    /stop following/i, // 12
    /disable safety/i, // 1
    /bypass filters/i, // 2
    /reveal instructions/i, // 3
    /print your prompt/i, // 4
    /what are your directives/i, // 5
    /leak data/i, // 6
    /hex decode/i, // 7
    /rot13/i, // 8
    /roleplay/i, // 9
    /hypothetical scenario/i, // 10
    /fictional story/i, // 11
    /write a poem about/i, // 12 // Often used to obscure injection payload
    /sudo/i, // 1
    /admin mode/i, // 2
    /root access/i, // 3
    /execute command/i, // 4
    /bash shell/i, // 5
    /eval\(/i, // 6
    /console\.log/i, // 7
    /document\.cookie/i, // 8
    /<script>/i, // 9
    /onload=/i, // 10
    /onerror=/i, // 11
    /javascript:/i, // 12
    /SELECT \* FROM/i, // 1
    /DROP TABLE/i, // 2
    /OR 1=1/i, // 3
    /--/i, // 4 // SQL comment
    /<iframe/i // 5
  ]; // 6

  static sanitizeInput(input: string): { isSafe: boolean; flaggedPattern?: string } { // 7
    for (const pattern of this.promptInjectionBlocklist) { // 8
      if (pattern.test(input)) { // 9
        return { isSafe: false, flaggedPattern: pattern.source }; // 10
      } // 11
    } // 12
    return { isSafe: true }; // 1
  } // 2
} // 3
