/**
 * VR Therapy Module
 *
 * Evidence base:
 * - 6-week protocols, 2 sessions per week
 * - Progressive difficulty based on symptom response
 * - Target vestibular, balance, and cognitive deficits
 * - Symptom provocation <5% in research (safe threshold)
 *
 * Therapy types:
 * 1. Balance training: Static and dynamic balance challenges
 * 2. Vestibular rehabilitation: Gradual exposure to visual motion
 * 3. Dual-task training: Cognitive + motor tasks simultaneously
 * 4. Graded exertion: Progressive physical activity in VR
 */

import type {
  VRTherapySession,
  TherapyType,
  TherapyDifficulty,
  SymptomScore,
} from '../types/clinical';

export interface ProgressionRules {
  maxSymptomIncrease: number; // Max total symptom increase to progress
  minSessionsAtLevel: number; // Min successful sessions before progression
  successThreshold: number; // Min performance score to count as success
}

export class VRTherapyManager {
  private readonly defaultProgressionRules: ProgressionRules = {
    maxSymptomIncrease: 2, // Conservative: limit symptom increase to 2 points
    minSessionsAtLevel: 3, // Require 3 successful sessions before progression
    successThreshold: 0.7, // 70% performance threshold
  };

  /**
   * Creates initial difficulty settings (conservative start)
   */
  createInitialDifficulty(): TherapyDifficulty {
    return {
      level: 1,
      visualComplexity: 1,
      motionIntensity: 1,
      cognitiveLoad: 1,
    };
  }

  /**
   * Creates a new therapy session
   */
  createSession(
    patientId: string,
    therapyType: TherapyType,
    difficulty: TherapyDifficulty
  ): VRTherapySession {
    return {
      sessionId: this.generateSessionId(),
      patientId,
      timestamp: new Date(),
      therapyType,
      difficulty,
      durationMinutes: 0,
      symptomsBeforeSession: [],
      symptomsDuringSession: [],
      symptomsAfterSession: [],
      completedSuccessfully: false,
      adverseEvents: [],
      performanceMetrics: {},
    };
  }

  /**
   * Calculates symptom increase during session
   */
  calculateSymptomIncrease(
    before: SymptomScore[],
    during: SymptomScore[]
  ): number {
    let totalIncrease = 0;
    for (let i = 0; i < before.length; i++) {
      const increase = Math.max(0, during[i].score - before[i].score);
      totalIncrease += increase;
    }
    return totalIncrease;
  }

  /**
   * Determines if session was successful based on symptoms and performance
   */
  evaluateSessionSuccess(
    session: VRTherapySession,
    progressionRules: ProgressionRules = this.defaultProgressionRules
  ): boolean {
    // Check for adverse events
    if (session.adverseEvents.length > 0) {
      return false;
    }

    // Check symptom increase
    const symptomIncrease = this.calculateSymptomIncrease(
      session.symptomsBeforeSession,
      session.symptomsDuringSession
    );

    if (symptomIncrease > progressionRules.maxSymptomIncrease) {
      return false;
    }

    // Check performance metrics (if available)
    const performanceScore =
      session.performanceMetrics.accuracy ||
      session.performanceMetrics.balanceScore ||
      0;

    if (
      performanceScore > 0 &&
      performanceScore < progressionRules.successThreshold
    ) {
      return false;
    }

    return true;
  }

  /**
   * Determines if difficulty should progress
   * Based on research: gradual progression based on symptom tolerance
   */
  shouldProgressDifficulty(
    recentSessions: VRTherapySession[],
    progressionRules: ProgressionRules = this.defaultProgressionRules
  ): boolean {
    if (recentSessions.length < progressionRules.minSessionsAtLevel) {
      return false;
    }

    // Check last N sessions at current difficulty level
    const lastNSessions = recentSessions.slice(
      -progressionRules.minSessionsAtLevel
    );

    const allSuccessful = lastNSessions.every((session) =>
      this.evaluateSessionSuccess(session, progressionRules)
    );

    return allSuccessful;
  }

  /**
   * Progresses difficulty to next level
   * Increments one parameter at a time for safety
   */
  progressDifficulty(
    currentDifficulty: TherapyDifficulty,
    priorityParameter: keyof Omit<TherapyDifficulty, 'level'> = 'motionIntensity'
  ): TherapyDifficulty {
    const newDifficulty = { ...currentDifficulty };

    // Increment priority parameter if not at max
    if (newDifficulty[priorityParameter] < 10) {
      newDifficulty[priorityParameter] += 1;
    } else {
      // If priority at max, increment next lowest parameter
      const params: (keyof Omit<TherapyDifficulty, 'level'>)[] = [
        'visualComplexity',
        'motionIntensity',
        'cognitiveLoad',
      ];

      for (const param of params) {
        if (newDifficulty[param] < 10) {
          newDifficulty[param] += 1;
          break;
        }
      }
    }

    // Update overall level (average of parameters)
    newDifficulty.level = Math.round(
      (newDifficulty.visualComplexity +
        newDifficulty.motionIntensity +
        newDifficulty.cognitiveLoad) /
        3
    );

    return newDifficulty;
  }

  /**
   * Regresses difficulty after unsuccessful session
   */
  regressDifficulty(currentDifficulty: TherapyDifficulty): TherapyDifficulty {
    const newDifficulty = { ...currentDifficulty };

    // Reduce all parameters by 1 (minimum 1)
    newDifficulty.visualComplexity = Math.max(
      1,
      newDifficulty.visualComplexity - 1
    );
    newDifficulty.motionIntensity = Math.max(
      1,
      newDifficulty.motionIntensity - 1
    );
    newDifficulty.cognitiveLoad = Math.max(
      1,
      newDifficulty.cognitiveLoad - 1
    );

    newDifficulty.level = Math.round(
      (newDifficulty.visualComplexity +
        newDifficulty.motionIntensity +
        newDifficulty.cognitiveLoad) /
        3
    );

    return newDifficulty;
  }

  /**
   * Recommends therapy type based on assessment results
   * Balance issues → balance training
   * Vestibular issues → vestibular rehab
   * Cognitive issues → dual-task
   */
  recommendTherapyType(
    vomsPositiveTests: string[]
  ): TherapyType[] {
    const recommendations: TherapyType[] = [];

    if (
      vomsPositiveTests.includes('vestibularOcularReflex') ||
      vomsPositiveTests.includes('visualMotionSensitivity')
    ) {
      recommendations.push('vestibular');
    }

    if (
      vomsPositiveTests.includes('smoothPursuits') ||
      vomsPositiveTests.includes('saccades')
    ) {
      recommendations.push('dualTask');
    }

    if (vomsPositiveTests.includes('convergence')) {
      recommendations.push('balance');
    }

    // If no specific recommendations, start with balance (safest)
    if (recommendations.length === 0) {
      recommendations.push('balance');
    }

    return recommendations;
  }

  /**
   * Calculates session duration recommendation
   * Based on research: start conservative, increase as tolerated
   */
  recommendSessionDuration(
    sessionNumber: number,
    difficulty: TherapyDifficulty
  ): number {
    // Start with short sessions
    const baseDuration = 10; // minutes
    const maxDuration = 30; // minutes

    // Gradually increase duration
    const duration = Math.min(
      baseDuration + Math.floor(sessionNumber / 3) * 5,
      maxDuration
    );

    // Reduce if difficulty is high
    if (difficulty.level >= 8) {
      return Math.max(baseDuration, duration - 5);
    }

    return duration;
  }

  /**
   * Records adverse event
   */
  recordAdverseEvent(
    session: VRTherapySession,
    event: string
  ): VRTherapySession {
    return {
      ...session,
      adverseEvents: [...session.adverseEvents, event],
      completedSuccessfully: false,
    };
  }

  /**
   * Completes session with final metrics
   */
  completeSession(
    session: VRTherapySession,
    symptomsAfter: SymptomScore[],
    performanceMetrics: VRTherapySession['performanceMetrics']
  ): VRTherapySession {
    const completed = {
      ...session,
      symptomsAfterSession: symptomsAfter,
      performanceMetrics,
    };

    completed.completedSuccessfully = this.evaluateSessionSuccess(completed);

    return completed;
  }

  private generateSessionId(): string {
    return `vr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Balance Training Module
 * Targets static and dynamic balance deficits
 */
export class BalanceTherapy {
  /**
   * Generates balance challenge based on difficulty
   */
  generateBalanceChallenge(difficulty: TherapyDifficulty): {
    surfaceType: 'stable' | 'unstable' | 'moving';
    visualComplexity: 'simple' | 'moderate' | 'complex';
    dualTask: boolean;
    duration: number;
  } {
    let surfaceType: 'stable' | 'unstable' | 'moving' = 'stable';
    if (difficulty.motionIntensity >= 4) surfaceType = 'unstable';
    if (difficulty.motionIntensity >= 7) surfaceType = 'moving';

    let visualComplexity: 'simple' | 'moderate' | 'complex' = 'simple';
    if (difficulty.visualComplexity >= 4) visualComplexity = 'moderate';
    if (difficulty.visualComplexity >= 7) visualComplexity = 'complex';

    const dualTask = difficulty.cognitiveLoad >= 5;
    const duration = 30 + difficulty.level * 10; // seconds

    return {
      surfaceType,
      visualComplexity,
      dualTask,
      duration,
    };
  }

  /**
   * Calculates balance score based on sway and stability
   */
  calculateBalanceScore(
    swayAmplitude: number,
    swayVelocity: number,
    timeInZone: number,
    totalTime: number
  ): number {
    // Lower sway is better (invert)
    const swayScore = Math.max(0, 1 - swayAmplitude / 100);
    const velocityScore = Math.max(0, 1 - swayVelocity / 50);
    const stabilityScore = timeInZone / totalTime;

    return (swayScore * 0.3 + velocityScore * 0.3 + stabilityScore * 0.4);
  }
}

/**
 * Vestibular Rehabilitation Module
 * Gradual exposure to visual motion and VOR training
 */
export class VestibularTherapy {
  /**
   * Generates vestibular challenge
   */
  generateVestibularChallenge(difficulty: TherapyDifficulty): {
    motionType: 'rotation' | 'translation' | 'optokinetic';
    speed: number;
    complexity: number;
    duration: number;
  } {
    const motionTypes: ('rotation' | 'translation' | 'optokinetic')[] = [
      'rotation',
      'translation',
      'optokinetic',
    ];
    const motionType =
      motionTypes[Math.min(Math.floor(difficulty.level / 4), 2)];

    const speed = difficulty.motionIntensity * 10; // degrees/second or cm/second
    const complexity = difficulty.visualComplexity;
    const duration = 20 + difficulty.level * 5; // seconds

    return {
      motionType,
      speed,
      complexity,
      duration,
    };
  }
}

/**
 * Dual-Task Training Module
 * Combines cognitive and motor tasks
 */
export class DualTaskTherapy {
  /**
   * Generates dual-task challenge
   */
  generateDualTaskChallenge(difficulty: TherapyDifficulty): {
    motorTask: string;
    cognitiveTask: string;
    taskSwitching: boolean;
    duration: number;
  } {
    const motorTasks = [
      'standing balance',
      'walking',
      'obstacle navigation',
      'reaching tasks',
    ];
    const cognitiveTasks = [
      'counting backwards',
      'word recall',
      'arithmetic',
      'spatial memory',
    ];

    const motorIndex = Math.min(
      Math.floor(difficulty.motionIntensity / 3),
      motorTasks.length - 1
    );
    const cognitiveIndex = Math.min(
      Math.floor(difficulty.cognitiveLoad / 3),
      cognitiveTasks.length - 1
    );

    return {
      motorTask: motorTasks[motorIndex],
      cognitiveTask: cognitiveTasks[cognitiveIndex],
      taskSwitching: difficulty.level >= 7,
      duration: 30 + difficulty.level * 10,
    };
  }
}
