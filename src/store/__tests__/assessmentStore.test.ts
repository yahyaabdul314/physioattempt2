/**
 * Assessment Store Tests
 * Tests for Zustand assessment state management
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useAssessmentStore } from '../assessmentStore';
import type { SymptomScore } from '../../types/clinical';

describe('AssessmentStore', () => {
  beforeEach(() => {
    useAssessmentStore.getState().reset();
  });

  describe('Initial State', () => {
    it('should have idle state initially', () => {
      const { state } = useAssessmentStore.getState();
      expect(state).toBe('idle');
    });

    it('should have null current test initially', () => {
      const { currentTest } = useAssessmentStore.getState();
      expect(currentTest).toBeNull();
    });

    it('should have empty patient ID initially', () => {
      const { patientId } = useAssessmentStore.getState();
      expect(patientId).toBe('');
    });

    it('should have null assessment initially', () => {
      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment).toBeNull();
    });

    it('should have baseline symptoms at zero', () => {
      const { baselineSymptoms } = useAssessmentStore.getState();

      expect(baselineSymptoms).toHaveLength(4);
      expect(baselineSymptoms.every(s => s.score === 0)).toBe(true);
    });

    it('should have current symptoms at zero', () => {
      const { currentSymptoms } = useAssessmentStore.getState();

      expect(currentSymptoms).toHaveLength(4);
      expect(currentSymptoms.every(s => s.score === 0)).toBe(true);
    });

    it('should initialize all four symptom types', () => {
      const { baselineSymptoms } = useAssessmentStore.getState();

      const types = baselineSymptoms.map(s => s.type);
      expect(types).toContain('headache');
      expect(types).toContain('dizziness');
      expect(types).toContain('nausea');
      expect(types).toContain('fogginess');
    });

    it('should have null test start time initially', () => {
      const { testStartTime } = useAssessmentStore.getState();
      expect(testStartTime).toBeNull();
    });
  });

  describe('setState Action', () => {
    it('should update state to instructions', () => {
      const { setState } = useAssessmentStore.getState();

      setState('instructions');

      expect(useAssessmentStore.getState().state).toBe('instructions');
    });

    it('should update state to testing', () => {
      const { setState } = useAssessmentStore.getState();

      setState('testing');

      expect(useAssessmentStore.getState().state).toBe('testing');
    });

    it('should update state to symptoms', () => {
      const { setState } = useAssessmentStore.getState();

      setState('symptoms');

      expect(useAssessmentStore.getState().state).toBe('symptoms');
    });

    it('should update state to complete', () => {
      const { setState } = useAssessmentStore.getState();

      setState('complete');

      expect(useAssessmentStore.getState().state).toBe('complete');
    });
  });

  describe('startAssessment Action', () => {
    it('should set patient ID', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      expect(useAssessmentStore.getState().patientId).toBe('patient-123');
    });

    it('should transition to instructions state', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      expect(useAssessmentStore.getState().state).toBe('instructions');
    });

    it('should create new assessment object', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment).not.toBeNull();
      expect(currentAssessment?.patientId).toBe('patient-123');
    });

    it('should generate unique session ID', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment?.sessionId).toMatch(/^voms-\d+$/);
    });

    it('should initialize assessment with empty tests array', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment?.tests).toEqual([]);
    });

    it('should set baseline symptoms to zero', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment?.baselineSymptoms.every(s => s.score === 0)).toBe(true);
    });

    it('should initialize total symptom increase to zero', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      expect(currentAssessment?.totalSymptomIncrease).toBe(0);
    });

    it('should set timestamp', () => {
      const { startAssessment } = useAssessmentStore.getState();
      const beforeTime = new Date();

      startAssessment('patient-123');

      const { currentAssessment } = useAssessmentStore.getState();
      const afterTime = new Date();

      expect(currentAssessment?.timestamp).toBeInstanceOf(Date);
      expect(currentAssessment?.timestamp.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(currentAssessment?.timestamp.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });
  });

  describe('startTest Action', () => {
    it('should set current test to smooth pursuits', () => {
      const { startTest } = useAssessmentStore.getState();

      startTest('smoothPursuits');

      expect(useAssessmentStore.getState().currentTest).toBe('smoothPursuits');
    });

    it('should set current test to horizontal saccades', () => {
      const { startTest } = useAssessmentStore.getState();

      startTest('saccadesH');

      expect(useAssessmentStore.getState().currentTest).toBe('saccadesH');
    });

    it('should set current test to vertical saccades', () => {
      const { startTest } = useAssessmentStore.getState();

      startTest('saccadesV');

      expect(useAssessmentStore.getState().currentTest).toBe('saccadesV');
    });

    it('should transition to testing state', () => {
      const { startTest } = useAssessmentStore.getState();

      startTest('smoothPursuits');

      expect(useAssessmentStore.getState().state).toBe('testing');
    });

    it('should set test start time', () => {
      const { startTest } = useAssessmentStore.getState();
      const beforeTime = Date.now();

      startTest('smoothPursuits');

      const { testStartTime } = useAssessmentStore.getState();
      const afterTime = Date.now();

      expect(testStartTime).not.toBeNull();
      expect(testStartTime!).toBeGreaterThanOrEqual(beforeTime);
      expect(testStartTime!).toBeLessThanOrEqual(afterTime);
    });
  });

  describe('completeTest Action', () => {
    it('should transition to symptoms state', () => {
      const { completeTest } = useAssessmentStore.getState();

      completeTest();

      expect(useAssessmentStore.getState().state).toBe('symptoms');
    });

    it('should clear test start time', () => {
      const { startTest, completeTest } = useAssessmentStore.getState();

      startTest('smoothPursuits');
      expect(useAssessmentStore.getState().testStartTime).not.toBeNull();

      completeTest();

      expect(useAssessmentStore.getState().testStartTime).toBeNull();
    });

    it('should maintain current test reference', () => {
      const { startTest, completeTest } = useAssessmentStore.getState();

      startTest('smoothPursuits');
      completeTest();

      // Current test should still be set for symptom rating
      expect(useAssessmentStore.getState().currentTest).toBe('smoothPursuits');
    });
  });

  describe('updateSymptoms Action', () => {
    it('should update current symptoms', () => {
      const { updateSymptoms } = useAssessmentStore.getState();

      const newSymptoms: SymptomScore[] = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 1 },
      ];

      updateSymptoms(newSymptoms);

      expect(useAssessmentStore.getState().currentSymptoms).toEqual(newSymptoms);
    });

    it('should preserve symptom types', () => {
      const { updateSymptoms } = useAssessmentStore.getState();

      const newSymptoms: SymptomScore[] = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 5 },
        { type: 'nausea', score: 5 },
        { type: 'fogginess', score: 5 },
      ];

      updateSymptoms(newSymptoms);

      const types = useAssessmentStore.getState().currentSymptoms.map(s => s.type);
      expect(types).toContain('headache');
      expect(types).toContain('dizziness');
      expect(types).toContain('nausea');
      expect(types).toContain('fogginess');
    });
  });

  describe('reset Action', () => {
    it('should reset state to idle', () => {
      const { startAssessment, reset } = useAssessmentStore.getState();

      startAssessment('patient-123');
      reset();

      expect(useAssessmentStore.getState().state).toBe('idle');
    });

    it('should clear current test', () => {
      const { startTest, reset } = useAssessmentStore.getState();

      startTest('smoothPursuits');
      reset();

      expect(useAssessmentStore.getState().currentTest).toBeNull();
    });

    it('should clear patient ID', () => {
      const { startAssessment, reset } = useAssessmentStore.getState();

      startAssessment('patient-123');
      reset();

      expect(useAssessmentStore.getState().patientId).toBe('');
    });

    it('should clear current assessment', () => {
      const { startAssessment, reset } = useAssessmentStore.getState();

      startAssessment('patient-123');
      reset();

      expect(useAssessmentStore.getState().currentAssessment).toBeNull();
    });

    it('should reset baseline symptoms to zero', () => {
      const { startAssessment, reset } = useAssessmentStore.getState();

      startAssessment('patient-123');
      reset();

      const { baselineSymptoms } = useAssessmentStore.getState();
      expect(baselineSymptoms.every(s => s.score === 0)).toBe(true);
    });

    it('should reset current symptoms to zero', () => {
      const { updateSymptoms, reset } = useAssessmentStore.getState();

      updateSymptoms([
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 5 },
        { type: 'nausea', score: 5 },
        { type: 'fogginess', score: 5 },
      ]);

      reset();

      const { currentSymptoms } = useAssessmentStore.getState();
      expect(currentSymptoms.every(s => s.score === 0)).toBe(true);
    });

    it('should clear test start time', () => {
      const { startTest, reset } = useAssessmentStore.getState();

      startTest('smoothPursuits');
      reset();

      expect(useAssessmentStore.getState().testStartTime).toBeNull();
    });
  });

  describe('Assessment Workflow', () => {
    it('should support complete assessment flow', () => {
      const store = useAssessmentStore.getState();

      // Start assessment
      store.startAssessment('patient-123');
      expect(store.state).toBe('idle'); // Need to get fresh state
      expect(useAssessmentStore.getState().state).toBe('instructions');

      // Start first test
      store.startTest('smoothPursuits');
      expect(useAssessmentStore.getState().state).toBe('testing');
      expect(useAssessmentStore.getState().currentTest).toBe('smoothPursuits');

      // Complete test
      store.completeTest();
      expect(useAssessmentStore.getState().state).toBe('symptoms');

      // Update symptoms
      store.updateSymptoms([
        { type: 'headache', score: 2 },
        { type: 'dizziness', score: 1 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      // Start second test
      store.startTest('saccadesH');
      expect(useAssessmentStore.getState().state).toBe('testing');

      // Complete second test
      store.completeTest();
      expect(useAssessmentStore.getState().state).toBe('symptoms');

      // Finish assessment
      store.setState('complete');
      expect(useAssessmentStore.getState().state).toBe('complete');
    });

    it('should support restart after completion', () => {
      const store = useAssessmentStore.getState();

      // Complete full assessment
      store.startAssessment('patient-123');
      store.startTest('smoothPursuits');
      store.completeTest();
      store.setState('complete');

      // Reset
      store.reset();

      // Should be able to start fresh
      expect(useAssessmentStore.getState().state).toBe('idle');
      expect(useAssessmentStore.getState().currentTest).toBeNull();
      expect(useAssessmentStore.getState().patientId).toBe('');
    });
  });

  describe('State Transitions', () => {
    it('should transition from idle to instructions', () => {
      const { startAssessment } = useAssessmentStore.getState();

      expect(useAssessmentStore.getState().state).toBe('idle');

      startAssessment('patient-123');

      expect(useAssessmentStore.getState().state).toBe('instructions');
    });

    it('should transition from instructions to testing', () => {
      const { startAssessment, startTest } = useAssessmentStore.getState();

      startAssessment('patient-123');
      startTest('smoothPursuits');

      expect(useAssessmentStore.getState().state).toBe('testing');
    });

    it('should transition from testing to symptoms', () => {
      const { startTest, completeTest } = useAssessmentStore.getState();

      startTest('smoothPursuits');
      completeTest();

      expect(useAssessmentStore.getState().state).toBe('symptoms');
    });

    it('should transition from symptoms to complete', () => {
      const { completeTest, setState } = useAssessmentStore.getState();

      completeTest();
      setState('complete');

      expect(useAssessmentStore.getState().state).toBe('complete');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple startAssessment calls', () => {
      const { startAssessment } = useAssessmentStore.getState();

      startAssessment('patient-1');
      expect(useAssessmentStore.getState().patientId).toBe('patient-1');
      expect(useAssessmentStore.getState().currentAssessment).not.toBeNull();

      startAssessment('patient-2');
      expect(useAssessmentStore.getState().patientId).toBe('patient-2');
      expect(useAssessmentStore.getState().currentAssessment).not.toBeNull();
      expect(useAssessmentStore.getState().currentAssessment?.patientId).toBe('patient-2');
    });

    it('should handle empty symptoms array', () => {
      const { updateSymptoms } = useAssessmentStore.getState();

      updateSymptoms([]);

      expect(useAssessmentStore.getState().currentSymptoms).toEqual([]);
    });

    it('should handle null test type', () => {
      const { startTest } = useAssessmentStore.getState();

      startTest(null);

      expect(useAssessmentStore.getState().currentTest).toBeNull();
    });
  });
});
