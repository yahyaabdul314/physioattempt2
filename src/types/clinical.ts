/**
 * Core clinical types for concussion assessment and recovery
 * Based on VOMS and King-Devick research protocols
 */

export type SymptomType = 'headache' | 'dizziness' | 'nausea' | 'fogginess';

export interface SymptomScore {
  type: SymptomType;
  score: number; // 0-10 scale
}

export interface SymptomAssessment {
  baseline: SymptomScore[];
  postTest: SymptomScore[];
  timestamp: Date;
}

/**
 * VOMS (Vestibular/Ocular Motor Screening) Test Types
 * Based on research: 5 core components measuring vestibular/ocular function
 */
export type VOMSTestType =
  | 'smoothPursuits'
  | 'saccades'
  | 'convergence'
  | 'vestibularOcularReflex'
  | 'visualMotionSensitivity';

export interface VOMSTest {
  type: VOMSTestType;
  direction?: 'horizontal' | 'vertical'; // for VOR and saccades
  completed: boolean;
  symptomsProvoked: boolean;
  symptomIncrease: number; // change in symptom score
}

export interface VOMSAssessment {
  sessionId: string;
  patientId: string;
  timestamp: Date;
  baselineSymptoms: SymptomScore[];
  tests: VOMSTest[];
  totalSymptomIncrease: number;
  clinicalNotes?: string;
}

/**
 * King-Devick Test Types
 * Based on research: rapid number naming to assess saccadic eye movements
 */
export interface KingDevickCard {
  cardNumber: 1 | 2 | 3; // progressive difficulty
  numbers: number[];
  completionTimeMs: number;
  errors: number;
}

export interface KingDevickTest {
  sessionId: string;
  patientId: string;
  timestamp: Date;
  isBaseline: boolean;
  cards: KingDevickCard[];
  totalTimeMs: number;
  totalErrors: number;
  symptomsAfter: SymptomScore[];
  // Comparison to baseline (if not baseline test)
  timeIncreaseMs?: number;
  errorIncrease?: number;
}

/**
 * VR Therapy Session Types
 * Based on research: vestibular/balance rehabilitation protocols
 */
export type TherapyType =
  | 'balance'
  | 'vestibular'
  | 'dualTask'
  | 'gradedExertion';

export interface TherapyDifficulty {
  level: number; // 1-10
  visualComplexity: number; // 1-10
  motionIntensity: number; // 1-10
  cognitiveLoad: number; // 1-10
}

export interface VRTherapySession {
  sessionId: string;
  patientId: string;
  timestamp: Date;
  therapyType: TherapyType;
  difficulty: TherapyDifficulty;
  durationMinutes: number;
  symptomsBeforeSession: SymptomScore[];
  symptomsDuringSession: SymptomScore[];
  symptomsAfterSession: SymptomScore[];
  completedSuccessfully: boolean;
  adverseEvents: string[];
  performanceMetrics: {
    accuracy?: number;
    balanceScore?: number;
    reactionTimeMs?: number;
  };
}

/**
 * Patient Recovery Protocol
 * Based on research: 6-week, 2x/week clinical protocols
 */
export interface RecoveryProtocol {
  protocolId: string;
  patientId: string;
  startDate: Date;
  durationWeeks: number;
  sessionsPerWeek: number;
  currentWeek: number;
  currentSession: number;
  assessments: {
    initial: VOMSAssessment | null;
    weekly: VOMSAssessment[];
    final: VOMSAssessment | null;
  };
  kingDevickBaseline: KingDevickTest | null;
  kingDevickTests: KingDevickTest[];
  therapySessions: VRTherapySession[];
  progressionCriteria: {
    maxSymptomIncrease: number; // max allowed symptom increase before regression
    minSuccessRate: number; // % of successful sessions before progression
  };
}
