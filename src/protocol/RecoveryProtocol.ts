/**
 * Recovery Protocol Manager
 *
 * Evidence base:
 * - 6-week duration, 2 sessions per week (standard clinical protocol)
 * - Serial assessments to track recovery
 * - Graduated return-to-activity based on symptom response
 * - Objective progress tracking
 */

import type {
  RecoveryProtocol,
  VOMSAssessment,
  KingDevickTest,
  VRTherapySession,
} from '../types/clinical';

export class RecoveryProtocolManager {
  private readonly standardDurationWeeks = 6;
  private readonly standardSessionsPerWeek = 2;

  /**
   * Creates new recovery protocol
   */
  createProtocol(patientId: string): RecoveryProtocol {
    return {
      protocolId: this.generateProtocolId(),
      patientId,
      startDate: new Date(),
      durationWeeks: this.standardDurationWeeks,
      sessionsPerWeek: this.standardSessionsPerWeek,
      currentWeek: 1,
      currentSession: 1,
      assessments: {
        initial: null,
        weekly: [],
        final: null,
      },
      kingDevickBaseline: null,
      kingDevickTests: [],
      therapySessions: [],
      progressionCriteria: {
        maxSymptomIncrease: 2,
        minSuccessRate: 0.75, // 75% of sessions must be successful
      },
    };
  }

  /**
   * Adds initial assessment
   */
  setInitialAssessment(
    protocol: RecoveryProtocol,
    assessment: VOMSAssessment
  ): RecoveryProtocol {
    return {
      ...protocol,
      assessments: {
        ...protocol.assessments,
        initial: assessment,
      },
    };
  }

  /**
   * Adds weekly assessment
   */
  addWeeklyAssessment(
    protocol: RecoveryProtocol,
    assessment: VOMSAssessment
  ): RecoveryProtocol {
    return {
      ...protocol,
      assessments: {
        ...protocol.assessments,
        weekly: [...protocol.assessments.weekly, assessment],
      },
    };
  }

  /**
   * Sets final assessment
   */
  setFinalAssessment(
    protocol: RecoveryProtocol,
    assessment: VOMSAssessment
  ): RecoveryProtocol {
    return {
      ...protocol,
      assessments: {
        ...protocol.assessments,
        final: assessment,
      },
    };
  }

  /**
   * Adds King-Devick baseline
   */
  setKingDevickBaseline(
    protocol: RecoveryProtocol,
    test: KingDevickTest
  ): RecoveryProtocol {
    return {
      ...protocol,
      kingDevickBaseline: test,
    };
  }

  /**
   * Adds King-Devick test
   */
  addKingDevickTest(
    protocol: RecoveryProtocol,
    test: KingDevickTest
  ): RecoveryProtocol {
    return {
      ...protocol,
      kingDevickTests: [...protocol.kingDevickTests, test],
    };
  }

  /**
   * Adds therapy session
   */
  addTherapySession(
    protocol: RecoveryProtocol,
    session: VRTherapySession
  ): RecoveryProtocol {
    const updated = {
      ...protocol,
      therapySessions: [...protocol.therapySessions, session],
    };

    // Update current session and week
    updated.currentSession = updated.therapySessions.length + 1;
    updated.currentWeek = Math.ceil(
      updated.currentSession / protocol.sessionsPerWeek
    );

    return updated;
  }

  /**
   * Calculates overall protocol progress
   */
  calculateProgress(protocol: RecoveryProtocol): {
    weekProgress: number; // 0-1
    sessionProgress: number; // 0-1
    daysElapsed: number;
    sessionsCompleted: number;
    totalPlannedSessions: number;
  } {
    const totalPlannedSessions =
      protocol.durationWeeks * protocol.sessionsPerWeek;

    const daysElapsed = Math.floor(
      (new Date().getTime() - protocol.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      weekProgress: protocol.currentWeek / protocol.durationWeeks,
      sessionProgress:
        protocol.therapySessions.length / totalPlannedSessions,
      daysElapsed,
      sessionsCompleted: protocol.therapySessions.length,
      totalPlannedSessions,
    };
  }

  /**
   * Calculates success rate
   */
  calculateSuccessRate(protocol: RecoveryProtocol): number {
    if (protocol.therapySessions.length === 0) return 0;

    const successfulSessions = protocol.therapySessions.filter(
      (s) => s.completedSuccessfully
    ).length;

    return successfulSessions / protocol.therapySessions.length;
  }

  /**
   * Determines if patient is ready to progress to next phase
   */
  isReadyToProgress(protocol: RecoveryProtocol): {
    ready: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];
    let ready = true;

    // Check success rate
    const successRate = this.calculateSuccessRate(protocol);
    if (successRate < protocol.progressionCriteria.minSuccessRate) {
      ready = false;
      reasons.push(
        `Success rate (${(successRate * 100).toFixed(1)}%) below threshold (${(protocol.progressionCriteria.minSuccessRate * 100).toFixed(1)}%)`
      );
    }

    // Check if recent assessments show improvement
    if (protocol.assessments.weekly.length > 0) {
      const recentAssessment =
        protocol.assessments.weekly[protocol.assessments.weekly.length - 1];

      if (recentAssessment.totalSymptomIncrease > 5) {
        ready = false;
        reasons.push(
          `Recent assessment shows significant symptoms (score: ${recentAssessment.totalSymptomIncrease})`
        );
      }
    }

    // Check King-Devick improvement
    if (
      protocol.kingDevickBaseline &&
      protocol.kingDevickTests.length > 0
    ) {
      const recentKD =
        protocol.kingDevickTests[protocol.kingDevickTests.length - 1];

      // Should be within 5 seconds of baseline
      const timeDiff =
        (recentKD.totalTimeMs - protocol.kingDevickBaseline.totalTimeMs) /
        1000;

      if (timeDiff > 5) {
        ready = false;
        reasons.push(
          `King-Devick time still ${timeDiff.toFixed(1)}s above baseline`
        );
      }
    }

    if (ready) {
      reasons.push('All progression criteria met');
    }

    return { ready, reasons };
  }

  /**
   * Generates protocol summary report
   */
  generateSummary(protocol: RecoveryProtocol): {
    protocolId: string;
    patientId: string;
    progress: ReturnType<typeof this.calculateProgress>;
    successRate: number;
    readyToProgress: ReturnType<typeof this.isReadyToProgress>;
    assessmentImprovement: {
      initialSymptoms: number;
      currentSymptoms: number;
      improvement: number;
    } | null;
    kingDevickImprovement: {
      baselineTime: number;
      currentTime: number;
      improvement: number;
    } | null;
  } {
    const progress = this.calculateProgress(protocol);
    const successRate = this.calculateSuccessRate(protocol);
    const readyToProgress = this.isReadyToProgress(protocol);

    let assessmentImprovement = null;
    if (
      protocol.assessments.initial &&
      protocol.assessments.weekly.length > 0
    ) {
      const recentAssessment =
        protocol.assessments.weekly[protocol.assessments.weekly.length - 1];

      assessmentImprovement = {
        initialSymptoms: protocol.assessments.initial.totalSymptomIncrease,
        currentSymptoms: recentAssessment.totalSymptomIncrease,
        improvement:
          protocol.assessments.initial.totalSymptomIncrease -
          recentAssessment.totalSymptomIncrease,
      };
    }

    let kingDevickImprovement = null;
    if (
      protocol.kingDevickBaseline &&
      protocol.kingDevickTests.length > 0
    ) {
      const recentKD =
        protocol.kingDevickTests[protocol.kingDevickTests.length - 1];

      kingDevickImprovement = {
        baselineTime: protocol.kingDevickBaseline.totalTimeMs / 1000,
        currentTime: recentKD.totalTimeMs / 1000,
        improvement:
          (protocol.kingDevickBaseline.totalTimeMs - recentKD.totalTimeMs) /
          1000,
      };
    }

    return {
      protocolId: protocol.protocolId,
      patientId: protocol.patientId,
      progress,
      successRate,
      readyToProgress,
      assessmentImprovement,
      kingDevickImprovement,
    };
  }

  private generateProtocolId(): string {
    return `protocol-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
