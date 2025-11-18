/**
 * VOMS (Vestibular/Ocular Motor Screening) Implementation
 *
 * Evidence base:
 * - Assesses vestibular and ocular motor function in concussion patients
 * - 5 core components: smooth pursuits, saccades, convergence, VOR, VMS
 * - Symptom provocation scored 0-10 for headache, dizziness, nausea, fogginess
 *
 * Clinical use:
 * - Baseline assessment within 24-72 hours post-injury
 * - Serial assessments to track recovery
 * - Guides return-to-activity decisions
 */

import type {
  SymptomScore,
  SymptomType,
  VOMSTest,
  VOMSTestType,
  VOMSAssessment,
} from '../types/clinical';

export class VOMSAssessmentTool {
  private readonly symptomTypes: SymptomType[] = [
    'headache',
    'dizziness',
    'nausea',
    'fogginess',
  ];

  /**
   * Creates baseline symptom scores (all zeros)
   */
  createBaselineSymptoms(): SymptomScore[] {
    return this.symptomTypes.map((type) => ({
      type,
      score: 0,
    }));
  }

  /**
   * Validates symptom scores are within 0-10 range
   */
  validateSymptomScores(scores: SymptomScore[]): boolean {
    if (scores.length !== 4) return false;
    return scores.every(
      (s) =>
        s.score >= 0 &&
        s.score <= 10 &&
        this.symptomTypes.includes(s.type)
    );
  }

  /**
   * Calculates total symptom score change
   */
  calculateSymptomIncrease(
    baseline: SymptomScore[],
    postTest: SymptomScore[]
  ): number {
    let totalIncrease = 0;
    for (let i = 0; i < baseline.length; i++) {
      totalIncrease += Math.max(0, postTest[i].score - baseline[i].score);
    }
    return totalIncrease;
  }

  /**
   * Creates a VOMS test instance
   */
  createTest(
    type: VOMSTestType,
    direction?: 'horizontal' | 'vertical'
  ): VOMSTest {
    return {
      type,
      direction,
      completed: false,
      symptomsProvoked: false,
      symptomIncrease: 0,
    };
  }

  /**
   * Creates complete VOMS test battery
   * Based on clinical protocol: 5 core tests
   */
  createTestBattery(): VOMSTest[] {
    return [
      this.createTest('smoothPursuits'),
      this.createTest('saccades', 'horizontal'),
      this.createTest('saccades', 'vertical'),
      this.createTest('convergence'),
      this.createTest('vestibularOcularReflex', 'horizontal'),
      this.createTest('vestibularOcularReflex', 'vertical'),
      this.createTest('visualMotionSensitivity'),
    ];
  }

  /**
   * Updates test with results
   */
  recordTestResult(
    test: VOMSTest,
    baselineSymptoms: SymptomScore[],
    postTestSymptoms: SymptomScore[]
  ): VOMSTest {
    const symptomIncrease = this.calculateSymptomIncrease(
      baselineSymptoms,
      postTestSymptoms
    );

    return {
      ...test,
      completed: true,
      symptomsProvoked: symptomIncrease > 0,
      symptomIncrease,
    };
  }

  /**
   * Creates new VOMS assessment
   */
  createAssessment(patientId: string): VOMSAssessment {
    return {
      sessionId: this.generateSessionId(),
      patientId,
      timestamp: new Date(),
      baselineSymptoms: this.createBaselineSymptoms(),
      tests: this.createTestBattery(),
      totalSymptomIncrease: 0,
    };
  }

  /**
   * Calculates total symptom increase across all tests
   */
  calculateTotalSymptomIncrease(tests: VOMSTest[]): number {
    return tests.reduce((sum, test) => sum + test.symptomIncrease, 0);
  }

  /**
   * Determines if assessment indicates significant impairment
   * Based on research: symptom provocation in any test is clinically significant
   */
  hasSignificantImpairment(assessment: VOMSAssessment): boolean {
    return assessment.tests.some((test) => test.symptomsProvoked);
  }

  /**
   * Gets tests that provoked symptoms
   */
  getPositiveTests(assessment: VOMSAssessment): VOMSTest[] {
    return assessment.tests.filter((test) => test.symptomsProvoked);
  }

  /**
   * Compares two assessments to track recovery
   */
  compareAssessments(
    baseline: VOMSAssessment,
    followUp: VOMSAssessment
  ): {
    improved: boolean;
    symptomReduction: number;
    fewerPositiveTests: boolean;
  } {
    const symptomReduction =
      baseline.totalSymptomIncrease - followUp.totalSymptomIncrease;

    const baselinePositiveCount = this.getPositiveTests(baseline).length;
    const followUpPositiveCount = this.getPositiveTests(followUp).length;

    return {
      improved: symptomReduction > 0,
      symptomReduction,
      fewerPositiveTests: followUpPositiveCount < baselinePositiveCount,
    };
  }

  private generateSessionId(): string {
    return `voms-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
