/**
 * VR Therapy Tests
 * Validates therapy session management and progression logic
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  VRTherapyManager,
  BalanceTherapy,
  VestibularTherapy,
  DualTaskTherapy,
} from '../VRTherapy';
import type { SymptomScore, VRTherapySession } from '../../types/clinical';

describe('VRTherapyManager', () => {
  let therapyManager: VRTherapyManager;

  beforeEach(() => {
    therapyManager = new VRTherapyManager();
  });

  describe('Difficulty Management', () => {
    it('creates initial difficulty at conservative levels', () => {
      const difficulty = therapyManager.createInitialDifficulty();

      expect(difficulty.level).toBe(1);
      expect(difficulty.visualComplexity).toBe(1);
      expect(difficulty.motionIntensity).toBe(1);
      expect(difficulty.cognitiveLoad).toBe(1);
    });

    it('progresses difficulty incrementally', () => {
      const initial = therapyManager.createInitialDifficulty();
      const progressed = therapyManager.progressDifficulty(initial, 'motionIntensity');

      expect(progressed.motionIntensity).toBe(2);
      expect(progressed.visualComplexity).toBe(1);
      expect(progressed.cognitiveLoad).toBe(1);
    });

    it('progresses next parameter when priority at max', () => {
      const difficulty = {
        level: 10,
        visualComplexity: 5,
        motionIntensity: 10,
        cognitiveLoad: 3,
      };

      const progressed = therapyManager.progressDifficulty(difficulty, 'motionIntensity');

      expect(progressed.motionIntensity).toBe(10);
      expect(progressed.visualComplexity).toBe(6);
    });

    it('regresses difficulty after unsuccessful session', () => {
      const difficulty = {
        level: 5,
        visualComplexity: 6,
        motionIntensity: 5,
        cognitiveLoad: 4,
      };

      const regressed = therapyManager.regressDifficulty(difficulty);

      expect(regressed.visualComplexity).toBe(5);
      expect(regressed.motionIntensity).toBe(4);
      expect(regressed.cognitiveLoad).toBe(3);
    });

    it('does not regress below minimum', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const regressed = therapyManager.regressDifficulty(difficulty);

      expect(regressed.visualComplexity).toBe(1);
      expect(regressed.motionIntensity).toBe(1);
      expect(regressed.cognitiveLoad).toBe(1);
    });

    it('updates level based on parameter average', () => {
      const difficulty = {
        level: 1,
        visualComplexity: 6,
        motionIntensity: 6,
        cognitiveLoad: 6,
      };

      const progressed = therapyManager.progressDifficulty(difficulty);

      expect(progressed.level).toBe(6); // (6+7+6)/3 = 6.33 -> 6
    });
  });

  describe('Session Creation', () => {
    it('creates new therapy session', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      expect(session.patientId).toBe('patient-123');
      expect(session.therapyType).toBe('balance');
      expect(session.difficulty).toEqual(difficulty);
      expect(session.sessionId).toMatch(/^vr-/);
      expect(session.completedSuccessfully).toBe(false);
      expect(session.adverseEvents).toHaveLength(0);
    });
  });

  describe('Symptom Tracking', () => {
    it('calculates symptom increase during session', () => {
      const before: SymptomScore[] = [
        { type: 'headache', score: 1 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 2 },
      ];

      const during: SymptomScore[] = [
        { type: 'headache', score: 4 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 1 },
        { type: 'fogginess', score: 2 },
      ];

      const increase = therapyManager.calculateSymptomIncrease(before, during);

      expect(increase).toBe(7); // (4-1) + (3-0) + (1-0) + (2-2) = 3+3+1+0 = 7
    });
  });

  describe('Session Success Evaluation', () => {
    it('marks session as successful when symptoms within threshold', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      session.symptomsBeforeSession = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.symptomsDuringSession = [
        { type: 'headache', score: 1 },
        { type: 'dizziness', score: 1 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.performanceMetrics = { balanceScore: 0.8 };

      const success = therapyManager.evaluateSessionSuccess(session);

      expect(success).toBe(true);
    });

    it('marks session as unsuccessful when symptoms exceed threshold', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      session.symptomsBeforeSession = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.symptomsDuringSession = [
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 4 },
        { type: 'nausea', score: 3 },
        { type: 'fogginess', score: 2 },
      ];

      const success = therapyManager.evaluateSessionSuccess(session);

      expect(success).toBe(false);
    });

    it('marks session as unsuccessful when adverse events occurred', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      session.adverseEvents = ['Patient reported severe dizziness'];

      const success = therapyManager.evaluateSessionSuccess(session);

      expect(success).toBe(false);
    });

    it('marks session as unsuccessful when performance below threshold', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      session.symptomsBeforeSession = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.symptomsDuringSession = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.performanceMetrics = { balanceScore: 0.5 }; // Below 0.7 threshold

      const success = therapyManager.evaluateSessionSuccess(session);

      expect(success).toBe(false);
    });
  });

  describe('Progression Logic', () => {
    it('requires minimum sessions before progression', () => {
      const sessions: VRTherapySession[] = [];
      const shouldProgress = therapyManager.shouldProgressDifficulty(sessions);

      expect(shouldProgress).toBe(false);
    });

    it('progresses after 3 successful sessions', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const sessions: VRTherapySession[] = [];

      for (let i = 0; i < 3; i++) {
        const session = therapyManager.createSession(
          'patient-123',
          'balance',
          difficulty
        );
        session.symptomsBeforeSession = [
          { type: 'headache', score: 0 },
          { type: 'dizziness', score: 0 },
          { type: 'nausea', score: 0 },
          { type: 'fogginess', score: 0 },
        ];
        session.symptomsDuringSession = [
          { type: 'headache', score: 0 },
          { type: 'dizziness', score: 1 },
          { type: 'nausea', score: 0 },
          { type: 'fogginess', score: 0 },
        ];
        session.performanceMetrics = { balanceScore: 0.8 };
        sessions.push(session);
      }

      const shouldProgress = therapyManager.shouldProgressDifficulty(sessions);

      expect(shouldProgress).toBe(true);
    });

    it('does not progress if any recent session unsuccessful', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const sessions: VRTherapySession[] = [];

      // 2 successful sessions
      for (let i = 0; i < 2; i++) {
        const session = therapyManager.createSession(
          'patient-123',
          'balance',
          difficulty
        );
        session.symptomsBeforeSession = [
          { type: 'headache', score: 0 },
          { type: 'dizziness', score: 0 },
          { type: 'nausea', score: 0 },
          { type: 'fogginess', score: 0 },
        ];
        session.symptomsDuringSession = [
          { type: 'headache', score: 1 },
          { type: 'dizziness', score: 0 },
          { type: 'nausea', score: 0 },
          { type: 'fogginess', score: 0 },
        ];
        session.performanceMetrics = { balanceScore: 0.8 };
        sessions.push(session);
      }

      // 1 unsuccessful session
      const failedSession = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );
      failedSession.adverseEvents = ['Symptoms too severe'];
      sessions.push(failedSession);

      const shouldProgress = therapyManager.shouldProgressDifficulty(sessions);

      expect(shouldProgress).toBe(false);
    });
  });

  describe('Therapy Recommendations', () => {
    it('recommends vestibular therapy for VOR issues', () => {
      const positiveTests = ['vestibularOcularReflex'];
      const recommendations = therapyManager.recommendTherapyType(positiveTests);

      expect(recommendations).toContain('vestibular');
    });

    it('recommends dual-task for saccade issues', () => {
      const positiveTests = ['saccades'];
      const recommendations = therapyManager.recommendTherapyType(positiveTests);

      expect(recommendations).toContain('dualTask');
    });

    it('recommends balance for convergence issues', () => {
      const positiveTests = ['convergence'];
      const recommendations = therapyManager.recommendTherapyType(positiveTests);

      expect(recommendations).toContain('balance');
    });

    it('defaults to balance when no specific issues', () => {
      const positiveTests: string[] = [];
      const recommendations = therapyManager.recommendTherapyType(positiveTests);

      expect(recommendations).toContain('balance');
      expect(recommendations).toHaveLength(1);
    });
  });

  describe('Session Duration Recommendations', () => {
    it('starts with conservative duration', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const duration = therapyManager.recommendSessionDuration(1, difficulty);

      expect(duration).toBe(10);
    });

    it('increases duration over sessions', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const duration = therapyManager.recommendSessionDuration(9, difficulty);

      expect(duration).toBeGreaterThan(10);
    });

    it('caps duration at maximum', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const duration = therapyManager.recommendSessionDuration(100, difficulty);

      expect(duration).toBeLessThanOrEqual(30);
    });

    it('reduces duration for high difficulty', () => {
      const difficulty = {
        level: 9,
        visualComplexity: 9,
        motionIntensity: 9,
        cognitiveLoad: 9,
      };
      const duration = therapyManager.recommendSessionDuration(9, difficulty);

      expect(duration).toBeLessThanOrEqual(20);
    });
  });

  describe('Adverse Event Recording', () => {
    it('records adverse event and marks session unsuccessful', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      const updated = therapyManager.recordAdverseEvent(
        session,
        'Patient experienced severe vertigo'
      );

      expect(updated.adverseEvents).toContain('Patient experienced severe vertigo');
      expect(updated.completedSuccessfully).toBe(false);
    });
  });

  describe('Session Completion', () => {
    it('completes session successfully', () => {
      const difficulty = therapyManager.createInitialDifficulty();
      const session = therapyManager.createSession(
        'patient-123',
        'balance',
        difficulty
      );

      session.symptomsBeforeSession = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      session.symptomsDuringSession = [
        { type: 'headache', score: 1 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      const symptomsAfter: SymptomScore[] = [
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ];

      const completed = therapyManager.completeSession(session, symptomsAfter, {
        balanceScore: 0.85,
      });

      expect(completed.symptomsAfterSession).toEqual(symptomsAfter);
      expect(completed.performanceMetrics.balanceScore).toBe(0.85);
      expect(completed.completedSuccessfully).toBe(true);
    });
  });
});

describe('BalanceTherapy', () => {
  let balanceTherapy: BalanceTherapy;

  beforeEach(() => {
    balanceTherapy = new BalanceTherapy();
  });

  describe('Challenge Generation', () => {
    it('generates easy challenge for low difficulty', () => {
      const difficulty = {
        level: 1,
        visualComplexity: 1,
        motionIntensity: 1,
        cognitiveLoad: 1,
      };

      const challenge = balanceTherapy.generateBalanceChallenge(difficulty);

      expect(challenge.surfaceType).toBe('stable');
      expect(challenge.visualComplexity).toBe('simple');
      expect(challenge.dualTask).toBe(false);
    });

    it('generates harder challenge for higher difficulty', () => {
      const difficulty = {
        level: 8,
        visualComplexity: 8,
        motionIntensity: 8,
        cognitiveLoad: 8,
      };

      const challenge = balanceTherapy.generateBalanceChallenge(difficulty);

      expect(challenge.surfaceType).toBe('moving');
      expect(challenge.visualComplexity).toBe('complex');
      expect(challenge.dualTask).toBe(true);
    });
  });

  describe('Balance Scoring', () => {
    it('calculates high score for stable performance', () => {
      const score = balanceTherapy.calculateBalanceScore(10, 5, 90, 100);

      expect(score).toBeGreaterThan(0.8);
    });

    it('calculates low score for unstable performance', () => {
      const score = balanceTherapy.calculateBalanceScore(80, 40, 30, 100);

      expect(score).toBeLessThan(0.5);
    });
  });
});

describe('VestibularTherapy', () => {
  let vestibularTherapy: VestibularTherapy;

  beforeEach(() => {
    vestibularTherapy = new VestibularTherapy();
  });

  describe('Challenge Generation', () => {
    it('generates rotation challenge for low level', () => {
      const difficulty = {
        level: 1,
        visualComplexity: 1,
        motionIntensity: 3,
        cognitiveLoad: 1,
      };

      const challenge = vestibularTherapy.generateVestibularChallenge(difficulty);

      expect(challenge.motionType).toBe('rotation');
      expect(challenge.speed).toBe(30);
    });

    it('generates complex challenge for high level', () => {
      const difficulty = {
        level: 9,
        visualComplexity: 8,
        motionIntensity: 8,
        cognitiveLoad: 8,
      };

      const challenge = vestibularTherapy.generateVestibularChallenge(difficulty);

      expect(challenge.motionType).toBe('optokinetic');
      expect(challenge.speed).toBeGreaterThan(50);
    });
  });
});

describe('DualTaskTherapy', () => {
  let dualTaskTherapy: DualTaskTherapy;

  beforeEach(() => {
    dualTaskTherapy = new DualTaskTherapy();
  });

  describe('Challenge Generation', () => {
    it('generates simple dual-task for low difficulty', () => {
      const difficulty = {
        level: 1,
        visualComplexity: 1,
        motionIntensity: 1,
        cognitiveLoad: 1,
      };

      const challenge = dualTaskTherapy.generateDualTaskChallenge(difficulty);

      expect(challenge.motorTask).toBe('standing balance');
      expect(challenge.cognitiveTask).toBe('counting backwards');
      expect(challenge.taskSwitching).toBe(false);
    });

    it('generates complex dual-task for high difficulty', () => {
      const difficulty = {
        level: 8,
        visualComplexity: 8,
        motionIntensity: 9,
        cognitiveLoad: 9,
      };

      const challenge = dualTaskTherapy.generateDualTaskChallenge(difficulty);

      expect(challenge.motorTask).toBe('reaching tasks');
      expect(challenge.cognitiveTask).toBe('spatial memory');
      expect(challenge.taskSwitching).toBe(true);
    });
  });
});
