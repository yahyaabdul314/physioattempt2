/**
 * VOMS Assessment Tests
 * Validates clinical assessment functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { VOMSAssessmentTool } from '../VOMS';
import type { SymptomScore, VOMSTest } from '../../types/clinical';

describe('VOMSAssessmentTool', () => {
  let vomsTool: VOMSAssessmentTool;

  beforeEach(() => {
    vomsTool = new VOMSAssessmentTool();
  });

  describe('Symptom Management', () => {
    it('creates baseline symptoms with all zeros', () => {
      const baseline = vomsTool.createBaselineSymptoms();

      expect(baseline).toHaveLength(4);
      expect(baseline.every((s) => s.score === 0)).toBe(true);
      expect(baseline.map((s) => s.type)).toEqual([
        'headache',
        'dizziness',
        'nausea',
        'fogginess',
      ]);
    });

    it('validates symptom scores correctly', () => {
      const validScores: SymptomScore[] = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 10 },
      ];

      expect(vomsTool.validateSymptomScores(validScores)).toBe(true);
    });

    it('rejects invalid symptom scores (out of range)', () => {
      const invalidScores: SymptomScore[] = [
        { type: 'headache', score: 11 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 5 },
      ];

      expect(vomsTool.validateSymptomScores(invalidScores)).toBe(false);
    });

    it('rejects invalid symptom scores (negative)', () => {
      const invalidScores: SymptomScore[] = [
        { type: 'headache', score: -1 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 5 },
      ];

      expect(vomsTool.validateSymptomScores(invalidScores)).toBe(false);
    });

    it('calculates symptom increase correctly', () => {
      const baseline: SymptomScore[] = [
        { type: 'headache', score: 2 },
        { type: 'dizziness', score: 1 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 1 },
      ];

      const postTest: SymptomScore[] = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 4 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 1 },
      ];

      const increase = vomsTool.calculateSymptomIncrease(baseline, postTest);
      expect(increase).toBe(8); // (5-2) + (4-1) + (2-0) + (1-1) = 3+3+2+0 = 8
    });

    it('ignores symptom decreases in calculation', () => {
      const baseline: SymptomScore[] = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 4 },
      ];

      const postTest: SymptomScore[] = [
        { type: 'headache', score: 3 },
        { type: 'dizziness', score: 1 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 2 },
      ];

      const increase = vomsTool.calculateSymptomIncrease(baseline, postTest);
      expect(increase).toBe(0); // All decreased, so 0
    });
  });

  describe('Test Creation', () => {
    it('creates smooth pursuits test correctly', () => {
      const test = vomsTool.createTest('smoothPursuits');

      expect(test.type).toBe('smoothPursuits');
      expect(test.completed).toBe(false);
      expect(test.symptomsProvoked).toBe(false);
      expect(test.symptomIncrease).toBe(0);
      expect(test.direction).toBeUndefined();
    });

    it('creates saccades test with direction', () => {
      const test = vomsTool.createTest('saccades', 'horizontal');

      expect(test.type).toBe('saccades');
      expect(test.direction).toBe('horizontal');
    });

    it('creates complete test battery with 7 tests', () => {
      const battery = vomsTool.createTestBattery();

      expect(battery).toHaveLength(7);
      expect(battery[0].type).toBe('smoothPursuits');
      expect(battery[1].type).toBe('saccades');
      expect(battery[1].direction).toBe('horizontal');
      expect(battery[2].type).toBe('saccades');
      expect(battery[2].direction).toBe('vertical');
      expect(battery[3].type).toBe('convergence');
      expect(battery[4].type).toBe('vestibularOcularReflex');
      expect(battery[4].direction).toBe('horizontal');
      expect(battery[5].type).toBe('vestibularOcularReflex');
      expect(battery[5].direction).toBe('vertical');
      expect(battery[6].type).toBe('visualMotionSensitivity');
    });
  });

  describe('Test Recording', () => {
    it('records test result with symptom provocation', () => {
      const test = vomsTool.createTest('smoothPursuits');
      const baseline = vomsTool.createBaselineSymptoms();
      const postTest: SymptomScore[] = [
        { type: 'headache', score: 3 },
        { type: 'dizziness', score: 5 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 0 },
      ];

      const result = vomsTool.recordTestResult(test, baseline, postTest);

      expect(result.completed).toBe(true);
      expect(result.symptomsProvoked).toBe(true);
      expect(result.symptomIncrease).toBe(10);
    });

    it('records test result without symptom provocation', () => {
      const test = vomsTool.createTest('convergence');
      const baseline = vomsTool.createBaselineSymptoms();
      const postTest = vomsTool.createBaselineSymptoms();

      const result = vomsTool.recordTestResult(test, baseline, postTest);

      expect(result.completed).toBe(true);
      expect(result.symptomsProvoked).toBe(false);
      expect(result.symptomIncrease).toBe(0);
    });
  });

  describe('Assessment Management', () => {
    it('creates new assessment with patient ID', () => {
      const assessment = vomsTool.createAssessment('patient-123');

      expect(assessment.patientId).toBe('patient-123');
      expect(assessment.sessionId).toMatch(/^voms-/);
      expect(assessment.baselineSymptoms).toHaveLength(4);
      expect(assessment.tests).toHaveLength(7);
      expect(assessment.totalSymptomIncrease).toBe(0);
    });

    it('calculates total symptom increase across all tests', () => {
      const tests: VOMSTest[] = [
        {
          type: 'smoothPursuits',
          completed: true,
          symptomsProvoked: true,
          symptomIncrease: 5,
        },
        {
          type: 'saccades',
          direction: 'horizontal',
          completed: true,
          symptomsProvoked: true,
          symptomIncrease: 3,
        },
        {
          type: 'convergence',
          completed: true,
          symptomsProvoked: false,
          symptomIncrease: 0,
        },
      ];

      const total = vomsTool.calculateTotalSymptomIncrease(tests);
      expect(total).toBe(8);
    });

    it('identifies significant impairment when symptoms provoked', () => {
      const assessment = vomsTool.createAssessment('patient-123');
      assessment.tests[0].symptomsProvoked = true;

      expect(vomsTool.hasSignificantImpairment(assessment)).toBe(true);
    });

    it('identifies no impairment when no symptoms provoked', () => {
      const assessment = vomsTool.createAssessment('patient-123');

      expect(vomsTool.hasSignificantImpairment(assessment)).toBe(false);
    });

    it('gets positive tests correctly', () => {
      const assessment = vomsTool.createAssessment('patient-123');
      assessment.tests[0].symptomsProvoked = true;
      assessment.tests[2].symptomsProvoked = true;

      const positiveTests = vomsTool.getPositiveTests(assessment);

      expect(positiveTests).toHaveLength(2);
      expect(positiveTests[0].type).toBe('smoothPursuits');
      expect(positiveTests[1].type).toBe('saccades');
    });
  });

  describe('Assessment Comparison', () => {
    it('identifies improvement between assessments', () => {
      const baseline = vomsTool.createAssessment('patient-123');
      baseline.tests[0].symptomsProvoked = true;
      baseline.tests[0].symptomIncrease = 8;
      baseline.tests[1].symptomsProvoked = true;
      baseline.tests[1].symptomIncrease = 5;
      baseline.totalSymptomIncrease = 13;

      const followUp = vomsTool.createAssessment('patient-123');
      followUp.tests[0].symptomsProvoked = true;
      followUp.tests[0].symptomIncrease = 3;
      followUp.totalSymptomIncrease = 3;

      const comparison = vomsTool.compareAssessments(baseline, followUp);

      expect(comparison.improved).toBe(true);
      expect(comparison.symptomReduction).toBe(10);
      expect(comparison.fewerPositiveTests).toBe(true);
    });

    it('identifies no improvement when symptoms same', () => {
      const baseline = vomsTool.createAssessment('patient-123');
      baseline.totalSymptomIncrease = 5;

      const followUp = vomsTool.createAssessment('patient-123');
      followUp.totalSymptomIncrease = 5;

      const comparison = vomsTool.compareAssessments(baseline, followUp);

      expect(comparison.improved).toBe(false);
      expect(comparison.symptomReduction).toBe(0);
    });
  });
});
