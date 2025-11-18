/**
 * King-Devick Test Tests
 * Validates saccadic eye movement assessment functionality
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { KingDevickTestTool } from '../KingDevick';
import type { SymptomScore } from '../../types/clinical';

describe('KingDevickTestTool', () => {
  let kdTool: KingDevickTestTool;

  beforeEach(() => {
    kdTool = new KingDevickTestTool();
  });

  describe('Card Creation', () => {
    it('creates card 1 with correct sequence', () => {
      const card = kdTool.createCard(1);

      expect(card.cardNumber).toBe(1);
      expect(card.numbers).toHaveLength(20);
      expect(card.completionTimeMs).toBe(0);
      expect(card.errors).toBe(0);
    });

    it('creates card 2 with longer sequence', () => {
      const card = kdTool.createCard(2);

      expect(card.cardNumber).toBe(2);
      expect(card.numbers).toHaveLength(23);
    });

    it('creates card 3 with longest sequence', () => {
      const card = kdTool.createCard(3);

      expect(card.cardNumber).toBe(3);
      expect(card.numbers).toHaveLength(25);
    });
  });

  describe('Test Creation', () => {
    it('creates baseline test', () => {
      const test = kdTool.createTest('patient-123', true);

      expect(test.patientId).toBe('patient-123');
      expect(test.isBaseline).toBe(true);
      expect(test.sessionId).toMatch(/^kd-/);
      expect(test.cards).toHaveLength(3);
      expect(test.totalTimeMs).toBe(0);
      expect(test.totalErrors).toBe(0);
    });

    it('creates follow-up test', () => {
      const test = kdTool.createTest('patient-123', false);

      expect(test.isBaseline).toBe(false);
    });
  });

  describe('Card Recording', () => {
    it('records card completion correctly', () => {
      const card = kdTool.createCard(1);
      const completed = kdTool.recordCardCompletion(card, 15000, 2);

      expect(completed.completionTimeMs).toBe(15000);
      expect(completed.errors).toBe(2);
      expect(completed.cardNumber).toBe(1);
    });
  });

  describe('Total Calculation', () => {
    it('calculates totals correctly', () => {
      const test = kdTool.createTest('patient-123');
      test.cards[0] = kdTool.recordCardCompletion(test.cards[0], 12000, 0);
      test.cards[1] = kdTool.recordCardCompletion(test.cards[1], 18000, 1);
      test.cards[2] = kdTool.recordCardCompletion(test.cards[2], 22000, 2);

      const updated = kdTool.calculateTotals(test);

      expect(updated.totalTimeMs).toBe(52000);
      expect(updated.totalErrors).toBe(3);
    });
  });

  describe('Baseline Comparison', () => {
    it('identifies clinically significant time increase', () => {
      const baseline = kdTool.createTest('patient-123', true);
      baseline.totalTimeMs = 45000; // 45 seconds

      const current = kdTool.createTest('patient-123', false);
      current.totalTimeMs = 52000; // 52 seconds (7 second increase)

      const comparison = kdTool.compareToBaseline(baseline, current);

      expect(comparison.timeIncreaseSeconds).toBe(7);
      expect(comparison.isClinicallySignificant).toBe(true);
      expect(comparison.interpretation).toContain('significant time increase');
    });

    it('identifies clinically significant errors', () => {
      const baseline = kdTool.createTest('patient-123', true);
      baseline.totalTimeMs = 45000;
      baseline.totalErrors = 0;

      const current = kdTool.createTest('patient-123', false);
      current.totalTimeMs = 46000; // Only 1 second increase
      current.totalErrors = 2; // But has errors

      const comparison = kdTool.compareToBaseline(baseline, current);

      expect(comparison.isClinicallySignificant).toBe(true);
      expect(comparison.interpretation).toContain('errors present');
    });

    it('identifies both time and error issues', () => {
      const baseline = kdTool.createTest('patient-123', true);
      baseline.totalTimeMs = 45000;
      baseline.totalErrors = 0;

      const current = kdTool.createTest('patient-123', false);
      current.totalTimeMs = 56000; // 11 second increase
      current.totalErrors = 3;

      const comparison = kdTool.compareToBaseline(baseline, current);

      expect(comparison.isClinicallySignificant).toBe(true);
      expect(comparison.interpretation).toContain('significant time increase AND errors');
    });

    it('identifies normal performance', () => {
      const baseline = kdTool.createTest('patient-123', true);
      baseline.totalTimeMs = 45000;
      baseline.totalErrors = 0;

      const current = kdTool.createTest('patient-123', false);
      current.totalTimeMs = 46000; // Only 1 second increase
      current.totalErrors = 0;

      const comparison = kdTool.compareToBaseline(baseline, current);

      expect(comparison.isClinicallySignificant).toBe(false);
      expect(comparison.interpretation).toContain('Normal');
    });

    it('calculates negative time difference (improvement)', () => {
      const baseline = kdTool.createTest('patient-123', true);
      baseline.totalTimeMs = 50000;

      const current = kdTool.createTest('patient-123', false);
      current.totalTimeMs = 45000; // Improved

      const comparison = kdTool.compareToBaseline(baseline, current);

      expect(comparison.timeIncreaseSeconds).toBe(-5);
      expect(comparison.isClinicallySignificant).toBe(false);
    });
  });

  describe('Test Validation', () => {
    it('validates complete test', () => {
      const test = kdTool.createTest('patient-123');
      test.cards[0].completionTimeMs = 12000;
      test.cards[1].completionTimeMs = 18000;
      test.cards[2].completionTimeMs = 22000;
      test.totalTimeMs = 52000;

      expect(kdTool.isTestComplete(test)).toBe(true);
    });

    it('rejects incomplete test', () => {
      const test = kdTool.createTest('patient-123');

      expect(kdTool.isTestComplete(test)).toBe(false);
    });

    it('rejects test with only some cards completed', () => {
      const test = kdTool.createTest('patient-123');
      test.cards[0].completionTimeMs = 12000;
      test.cards[1].completionTimeMs = 18000;
      // Card 2 not completed

      expect(kdTool.isTestComplete(test)).toBe(false);
    });
  });

  describe('Performance Percentile', () => {
    it('calculates excellent performance', () => {
      const result = kdTool.getPerformancePercentile(35000, 25); // 35 seconds

      expect(result.percentile).toBeLessThanOrEqual(16);
      expect(result.interpretation).toBe('Excellent');
    });

    it('calculates average performance', () => {
      const result = kdTool.getPerformancePercentile(45000, 25); // 45 seconds

      expect(result.percentile).toBeGreaterThanOrEqual(30);
      expect(result.percentile).toBeLessThanOrEqual(70);
      expect(result.interpretation).toBe('Average');
    });

    it('calculates concerning performance', () => {
      const result = kdTool.getPerformancePercentile(60000, 25); // 60 seconds

      expect(result.percentile).toBeGreaterThanOrEqual(84);
      expect(result.interpretation).toMatch(/Below average|Concerning/);
    });
  });

  describe('Symptom Recording', () => {
    it('records symptoms after test', () => {
      const test = kdTool.createTest('patient-123');
      const symptoms: SymptomScore[] = [
        { type: 'headache', score: 3 },
        { type: 'dizziness', score: 2 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 1 },
      ];

      const updated = kdTool.recordSymptomsAfter(test, symptoms);

      expect(updated.symptomsAfter).toEqual(symptoms);
    });
  });
});
