/**
 * Recovery Protocol Tests
 * Validates protocol management and progress tracking
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { RecoveryProtocolManager } from '../RecoveryProtocol';
import type {
  VOMSAssessment,
  KingDevickTest,
  VRTherapySession,
} from '../../types/clinical';

describe('RecoveryProtocolManager', () => {
  let protocolManager: RecoveryProtocolManager;

  beforeEach(() => {
    protocolManager = new RecoveryProtocolManager();
  });

  describe('Protocol Creation', () => {
    it('creates new protocol with standard parameters', () => {
      const protocol = protocolManager.createProtocol('patient-123');

      expect(protocol.patientId).toBe('patient-123');
      expect(protocol.protocolId).toMatch(/^protocol-/);
      expect(protocol.durationWeeks).toBe(6);
      expect(protocol.sessionsPerWeek).toBe(2);
      expect(protocol.currentWeek).toBe(1);
      expect(protocol.currentSession).toBe(1);
      expect(protocol.assessments.initial).toBeNull();
      expect(protocol.assessments.weekly).toHaveLength(0);
      expect(protocol.assessments.final).toBeNull();
      expect(protocol.kingDevickBaseline).toBeNull();
      expect(protocol.kingDevickTests).toHaveLength(0);
      expect(protocol.therapySessions).toHaveLength(0);
    });

    it('sets progression criteria', () => {
      const protocol = protocolManager.createProtocol('patient-123');

      expect(protocol.progressionCriteria.maxSymptomIncrease).toBe(2);
      expect(protocol.progressionCriteria.minSuccessRate).toBe(0.75);
    });
  });

  describe('Assessment Management', () => {
    it('sets initial assessment', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const assessment: VOMSAssessment = {
        sessionId: 'voms-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 10,
      };

      const updated = protocolManager.setInitialAssessment(protocol, assessment);

      expect(updated.assessments.initial).toEqual(assessment);
    });

    it('adds weekly assessments', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const assessment1: VOMSAssessment = {
        sessionId: 'voms-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 8,
      };
      const assessment2: VOMSAssessment = {
        sessionId: 'voms-2',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 5,
      };

      let updated = protocolManager.addWeeklyAssessment(protocol, assessment1);
      updated = protocolManager.addWeeklyAssessment(updated, assessment2);

      expect(updated.assessments.weekly).toHaveLength(2);
      expect(updated.assessments.weekly[0]).toEqual(assessment1);
      expect(updated.assessments.weekly[1]).toEqual(assessment2);
    });

    it('sets final assessment', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const assessment: VOMSAssessment = {
        sessionId: 'voms-final',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 0,
      };

      const updated = protocolManager.setFinalAssessment(protocol, assessment);

      expect(updated.assessments.final).toEqual(assessment);
    });
  });

  describe('King-Devick Management', () => {
    it('sets baseline King-Devick test', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const kdTest: KingDevickTest = {
        sessionId: 'kd-baseline',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: true,
        cards: [],
        totalTimeMs: 45000,
        totalErrors: 0,
        symptomsAfter: [],
      };

      const updated = protocolManager.setKingDevickBaseline(protocol, kdTest);

      expect(updated.kingDevickBaseline).toEqual(kdTest);
    });

    it('adds King-Devick tests', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const kdTest1: KingDevickTest = {
        sessionId: 'kd-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: false,
        cards: [],
        totalTimeMs: 48000,
        totalErrors: 1,
        symptomsAfter: [],
      };

      const updated = protocolManager.addKingDevickTest(protocol, kdTest1);

      expect(updated.kingDevickTests).toHaveLength(1);
      expect(updated.kingDevickTests[0]).toEqual(kdTest1);
    });
  });

  describe('Therapy Session Management', () => {
    it('adds therapy session and updates current session/week', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const session: VRTherapySession = {
        sessionId: 'vr-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        therapyType: 'balance',
        difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
        durationMinutes: 15,
        symptomsBeforeSession: [],
        symptomsDuringSession: [],
        symptomsAfterSession: [],
        completedSuccessfully: true,
        adverseEvents: [],
        performanceMetrics: {},
      };

      const updated = protocolManager.addTherapySession(protocol, session);

      expect(updated.therapySessions).toHaveLength(1);
      expect(updated.currentSession).toBe(2); // Next session is 2
      expect(updated.currentWeek).toBe(1);
    });

    it('updates week correctly after multiple sessions', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add 3 sessions (should move to week 2)
      for (let i = 0; i < 3; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      expect(protocol.currentWeek).toBe(2);
      expect(protocol.currentSession).toBe(4);
    });
  });

  describe('Progress Calculation', () => {
    it('calculates progress correctly', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add 4 sessions (out of 12 total)
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      const progress = protocolManager.calculateProgress(protocol);

      expect(progress.totalPlannedSessions).toBe(12); // 6 weeks * 2 sessions
      expect(progress.sessionsCompleted).toBe(4);
      expect(progress.sessionProgress).toBeCloseTo(0.33, 1);
      expect(progress.weekProgress).toBeCloseTo(0.5, 1); // Week 3 of 6
    });
  });

  describe('Success Rate Calculation', () => {
    it('calculates success rate correctly', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add 3 successful and 1 unsuccessful session
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: i < 3, // First 3 successful
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      const successRate = protocolManager.calculateSuccessRate(protocol);

      expect(successRate).toBe(0.75);
    });

    it('returns 0 for empty protocol', () => {
      const protocol = protocolManager.createProtocol('patient-123');
      const successRate = protocolManager.calculateSuccessRate(protocol);

      expect(successRate).toBe(0);
    });
  });

  describe('Progression Readiness', () => {
    it('indicates ready when all criteria met', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add successful sessions
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      // Add good assessments
      const assessment: VOMSAssessment = {
        sessionId: 'voms-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 2,
      };
      protocol = protocolManager.addWeeklyAssessment(protocol, assessment);

      // Add good King-Devick
      const kdBaseline: KingDevickTest = {
        sessionId: 'kd-baseline',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: true,
        cards: [],
        totalTimeMs: 45000,
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.setKingDevickBaseline(protocol, kdBaseline);

      const kdTest: KingDevickTest = {
        sessionId: 'kd-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: false,
        cards: [],
        totalTimeMs: 47000, // Only 2 seconds slower
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.addKingDevickTest(protocol, kdTest);

      const readiness = protocolManager.isReadyToProgress(protocol);

      expect(readiness.ready).toBe(true);
      expect(readiness.reasons).toContain('All progression criteria met');
    });

    it('indicates not ready when success rate too low', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add mostly unsuccessful sessions
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: i === 0, // Only first successful (25%)
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      const readiness = protocolManager.isReadyToProgress(protocol);

      expect(readiness.ready).toBe(false);
      expect(readiness.reasons.some(r => r.includes('Success rate'))).toBe(true);
    });

    it('indicates not ready when symptoms too high', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add successful sessions
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      // Add assessment with high symptoms
      const assessment: VOMSAssessment = {
        sessionId: 'voms-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 15,
      };
      protocol = protocolManager.addWeeklyAssessment(protocol, assessment);

      const readiness = protocolManager.isReadyToProgress(protocol);

      expect(readiness.ready).toBe(false);
      expect(readiness.reasons.some(r => r.includes('significant symptoms'))).toBe(true);
    });

    it('indicates not ready when King-Devick too slow', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Add successful sessions
      for (let i = 0; i < 4; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      const kdBaseline: KingDevickTest = {
        sessionId: 'kd-baseline',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: true,
        cards: [],
        totalTimeMs: 45000,
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.setKingDevickBaseline(protocol, kdBaseline);

      const kdTest: KingDevickTest = {
        sessionId: 'kd-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: false,
        cards: [],
        totalTimeMs: 55000, // 10 seconds slower
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.addKingDevickTest(protocol, kdTest);

      const readiness = protocolManager.isReadyToProgress(protocol);

      expect(readiness.ready).toBe(false);
      expect(readiness.reasons.some(r => r.includes('King-Devick'))).toBe(true);
    });
  });

  describe('Summary Generation', () => {
    it('generates comprehensive summary', () => {
      let protocol = protocolManager.createProtocol('patient-123');

      // Initial assessment
      const initialAssessment: VOMSAssessment = {
        sessionId: 'voms-initial',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 15,
      };
      protocol = protocolManager.setInitialAssessment(protocol, initialAssessment);

      // Weekly assessment
      const weeklyAssessment: VOMSAssessment = {
        sessionId: 'voms-weekly',
        patientId: 'patient-123',
        timestamp: new Date(),
        baselineSymptoms: [],
        tests: [],
        totalSymptomIncrease: 5,
      };
      protocol = protocolManager.addWeeklyAssessment(protocol, weeklyAssessment);

      // King-Devick
      const kdBaseline: KingDevickTest = {
        sessionId: 'kd-baseline',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: true,
        cards: [],
        totalTimeMs: 50000,
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.setKingDevickBaseline(protocol, kdBaseline);

      const kdTest: KingDevickTest = {
        sessionId: 'kd-1',
        patientId: 'patient-123',
        timestamp: new Date(),
        isBaseline: false,
        cards: [],
        totalTimeMs: 48000,
        totalErrors: 0,
        symptomsAfter: [],
      };
      protocol = protocolManager.addKingDevickTest(protocol, kdTest);

      // Sessions
      for (let i = 0; i < 3; i++) {
        const session: VRTherapySession = {
          sessionId: `vr-${i}`,
          patientId: 'patient-123',
          timestamp: new Date(),
          therapyType: 'balance',
          difficulty: { level: 1, visualComplexity: 1, motionIntensity: 1, cognitiveLoad: 1 },
          durationMinutes: 15,
          symptomsBeforeSession: [],
          symptomsDuringSession: [],
          symptomsAfterSession: [],
          completedSuccessfully: true,
          adverseEvents: [],
          performanceMetrics: {},
        };
        protocol = protocolManager.addTherapySession(protocol, session);
      }

      const summary = protocolManager.generateSummary(protocol);

      expect(summary.protocolId).toBe(protocol.protocolId);
      expect(summary.patientId).toBe('patient-123');
      expect(summary.successRate).toBe(1.0);
      expect(summary.assessmentImprovement).not.toBeNull();
      expect(summary.assessmentImprovement?.improvement).toBe(10);
      expect(summary.kingDevickImprovement).not.toBeNull();
      expect(summary.kingDevickImprovement?.improvement).toBe(2);
    });
  });
});
