/**
 * King-Devick Test Implementation
 *
 * Evidence base:
 * - Rapid number naming task assessing saccadic eye movements
 * - Three progressive difficulty cards
 * - Measures time and errors
 * - Research shows avg intersaccadic intervals 324.4ms vs 286.1ms (concussed vs control)
 * - Combined sensitivity 95.8%, specificity 96.1% within 7-10 days post-concussion
 *
 * Clinical use:
 * - Baseline testing pre-season/pre-injury
 * - Sideline assessment post-injury
 * - Serial testing during recovery
 * - Significant if time increase >5 seconds or errors increase
 */

import type {
  KingDevickTest,
  KingDevickCard,
  SymptomScore,
} from '../types/clinical';

export class KingDevickTestTool {
  /**
   * Standard number sequences for each card
   * Card 1: Simple left-to-right
   * Card 2: More complex spacing
   * Card 3: Most complex, variable spacing
   */
  private readonly cardSequences = {
    1: [5, 2, 4, 1, 8, 6, 3, 9, 7, 4, 2, 5, 8, 1, 6, 3, 9, 7, 4, 2],
    2: [1, 7, 3, 9, 4, 2, 8, 5, 6, 3, 7, 1, 9, 4, 2, 8, 6, 5, 1, 7, 3, 9, 4],
    3: [2, 6, 3, 8, 1, 9, 5, 7, 4, 6, 2, 8, 1, 9, 3, 5, 7, 4, 2, 6, 8, 1, 9, 3, 5],
  };

  /**
   * Creates a test card with number sequence
   */
  createCard(cardNumber: 1 | 2 | 3): KingDevickCard {
    return {
      cardNumber,
      numbers: this.cardSequences[cardNumber],
      completionTimeMs: 0,
      errors: 0,
    };
  }

  /**
   * Creates complete King-Devick test
   */
  createTest(
    patientId: string,
    isBaseline: boolean = false
  ): KingDevickTest {
    return {
      sessionId: this.generateSessionId(),
      patientId,
      timestamp: new Date(),
      isBaseline,
      cards: [this.createCard(1), this.createCard(2), this.createCard(3)],
      totalTimeMs: 0,
      totalErrors: 0,
      symptomsAfter: [],
    };
  }

  /**
   * Records card completion
   */
  recordCardCompletion(
    card: KingDevickCard,
    completionTimeMs: number,
    errors: number
  ): KingDevickCard {
    return {
      ...card,
      completionTimeMs,
      errors,
    };
  }

  /**
   * Calculates total test time and errors
   */
  calculateTotals(test: KingDevickTest): KingDevickTest {
    const totalTimeMs = test.cards.reduce(
      (sum, card) => sum + card.completionTimeMs,
      0
    );
    const totalErrors = test.cards.reduce(
      (sum, card) => sum + card.errors,
      0
    );

    return {
      ...test,
      totalTimeMs,
      totalErrors,
    };
  }

  /**
   * Compares test to baseline
   * Research: >5 second increase or any errors is clinically significant
   */
  compareToBaseline(
    baseline: KingDevickTest,
    current: KingDevickTest
  ): {
    timeIncreaseMs: number;
    timeIncreaseSeconds: number;
    errorIncrease: number;
    isClinicallySignificant: boolean;
    interpretation: string;
  } {
    const timeIncreaseMs = current.totalTimeMs - baseline.totalTimeMs;
    const timeIncreaseSeconds = timeIncreaseMs / 1000;
    const errorIncrease = current.totalErrors - baseline.totalErrors;

    // Clinical significance criteria from research
    const significantTimeIncrease = timeIncreaseSeconds > 5;
    const newErrors = errorIncrease > 0;
    const isClinicallySignificant = significantTimeIncrease || newErrors;

    let interpretation = 'Normal - comparable to baseline';
    if (significantTimeIncrease && newErrors) {
      interpretation = 'Abnormal - significant time increase AND errors present';
    } else if (significantTimeIncrease) {
      interpretation = 'Abnormal - significant time increase (>5s)';
    } else if (newErrors) {
      interpretation = 'Abnormal - errors present';
    }

    return {
      timeIncreaseMs,
      timeIncreaseSeconds,
      errorIncrease,
      isClinicallySignificant,
      interpretation,
    };
  }

  /**
   * Validates test completion
   */
  isTestComplete(test: KingDevickTest): boolean {
    return (
      test.cards.length === 3 &&
      test.cards.every((card) => card.completionTimeMs > 0) &&
      test.totalTimeMs > 0
    );
  }

  /**
   * Generates performance percentile based on normative data
   * Research shows average completion time varies by age
   * Adult average: ~45-50 seconds
   */
  getPerformancePercentile(
    totalTimeMs: number,
    age: number
  ): {
    percentile: number;
    interpretation: string;
  } {
    const totalSeconds = totalTimeMs / 1000;

    // Simplified normative data (would use detailed age-stratified norms in production)
    const expectedMean = age < 18 ? 50 : 45; // seconds
    const expectedSD = 5;

    const zScore = (totalSeconds - expectedMean) / expectedSD;

    // Approximate percentile from z-score
    let percentile = 50;
    if (zScore < -2) percentile = 2;
    else if (zScore < -1) percentile = 16;
    else if (zScore < 0) percentile = 30;
    else if (zScore < 1) percentile = 70;
    else if (zScore < 2) percentile = 84;
    else percentile = 98;

    let interpretation = 'Average';
    if (percentile <= 16) interpretation = 'Excellent';
    else if (percentile <= 30) interpretation = 'Above average';
    else if (percentile >= 84) interpretation = 'Below average';
    else if (percentile >= 98) interpretation = 'Concerning';

    return { percentile, interpretation };
  }

  /**
   * Records symptoms after test completion
   */
  recordSymptomsAfter(
    test: KingDevickTest,
    symptoms: SymptomScore[]
  ): KingDevickTest {
    return {
      ...test,
      symptomsAfter: symptoms,
    };
  }

  private generateSessionId(): string {
    return `kd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
