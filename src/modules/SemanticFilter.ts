import { SemanticFilterMetrics } from '../types';

/**
 * SemanticFilter.ts
 * Inappropriate language detection and filtering engine.
 * Ensures slurs, profanity, and hostility don't register or get sanitized into structural neutrality.
 */

// Profanity and slur pattern dictionaries
const BANNED_PATTERNS = [
  /f+u+c+k+/i, /s+h+i+t+/i, /b+i+t+c+h+/i, /a+s+s+h+o+l+e+/i, /b+a+s+t+a+r+d+/i,
  /c+u+n+t+/i, /d+i+c+k+/i, /p+u+s+s+y+/i, /n+i+g+g+/i, /f+a+g+g+o+t+/i,
  /r+e+t+a+r+d+/i, /k+i+k+e+/i, /s+p+i+c+/i, /c+h+i+n+k+/i, /w+e+t+b+a+c+k+/i
];

const HOSTILE_PHRASES = [
  /you (are|r) (stupid|dumb|idiot|trash|fake|garbage)/i,
  /die/i, /kill yourself/i, /shut up/i, /i hate you/i
];

export class SemanticFilterEngine {
  /**
   * Evaluates input text and returns semantic analysis and sanitized text.
   */
  public static process(input: string): SemanticFilterMetrics {
    let sanitized = input;
    let profanityDetected = false;
    let slursDetected = false;
    const detectedTriggers: string[] = [];

    // Check banned patterns
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(sanitized)) {
        profanityDetected = true;
        slursDetected = true;
        const matches = sanitized.match(pattern);
        if (matches) {
          detectedTriggers.push(matches[0]);
        }
        // Neutralize by replacing with [Filtered Semantic Concept]
        sanitized = sanitized.replace(pattern, '[Filtered]');
      }
    }

    // Check hostile phrases
    let hostileCount = 0;
    for (const pattern of HOSTILE_PHRASES) {
      if (pattern.test(sanitized)) {
        hostileCount++;
        sanitized = sanitized.replace(pattern, '[Neutralized Communication]');
      }
    }

    const hostileToneScore = Math.min(100, (profanityDetected ? 60 : 0) + (slursDetected ? 30 : 0) + (hostileCount * 20));

    let filterActionTaken: SemanticFilterMetrics['filterActionTaken'] = 'PASS_CLEAN';
    if (profanityDetected || slursDetected) {
      filterActionTaken = 'SANITIZED';
    } else if (hostileCount > 0) {
      filterActionTaken = 'NEUTRALIZED';
    }

    return {
      originalText: input,
      sanitizedText: sanitized.trim(),
      profanityDetected,
      slursDetected,
      hostileToneScore,
      filterActionTaken,
      detectedTriggers
    };
  }

  /**
   * Direct sanitization string output.
   */
  public static sanitize(text: string): string {
    return this.process(text).sanitizedText;
  }

  /**
   * Quick boolean check if text contains profanity, slurs, or hostile language.
   */
  public static containsInappropriateContent(text: string): boolean {
    const res = this.process(text);
    return res.profanityDetected || res.slursDetected || res.filterActionTaken !== 'PASS_CLEAN';
  }
}

export const SemanticFilter = SemanticFilterEngine;
