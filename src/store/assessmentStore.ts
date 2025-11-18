/**
 * Assessment State Management
 * Using Zustand for simple, reactive state management in VR
 */

import { create } from 'zustand';
import type { SymptomScore, VOMSAssessment } from '../types/clinical';

export type AssessmentState = 'idle' | 'instructions' | 'testing' | 'symptoms' | 'complete';
export type CurrentTest = 'smoothPursuits' | 'saccadesH' | 'saccadesV' | null;

interface AssessmentStore {
  // State
  state: AssessmentState;
  currentTest: CurrentTest;
  patientId: string;

  // VOMS assessment data
  currentAssessment: VOMSAssessment | null;
  baselineSymptoms: SymptomScore[];
  currentSymptoms: SymptomScore[];

  // Test tracking
  testStartTime: number | null;

  // Actions
  setState: (state: AssessmentState) => void;
  startAssessment: (patientId: string) => void;
  startTest: (testType: CurrentTest) => void;
  completeTest: () => void;
  updateSymptoms: (symptoms: SymptomScore[]) => void;
  reset: () => void;
}

const initialSymptoms: SymptomScore[] = [
  { type: 'headache', score: 0 },
  { type: 'dizziness', score: 0 },
  { type: 'nausea', score: 0 },
  { type: 'fogginess', score: 0 },
];

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  // Initial state
  state: 'idle',
  currentTest: null,
  patientId: '',
  currentAssessment: null,
  baselineSymptoms: [...initialSymptoms],
  currentSymptoms: [...initialSymptoms],
  testStartTime: null,

  // Actions
  setState: (state) => set({ state }),

  startAssessment: (patientId) => {
    set({
      patientId,
      state: 'instructions',
      currentAssessment: {
        sessionId: `voms-${Date.now()}`,
        patientId,
        timestamp: new Date(),
        baselineSymptoms: [...initialSymptoms],
        tests: [],
        totalSymptomIncrease: 0,
      },
      baselineSymptoms: [...initialSymptoms],
      currentSymptoms: [...initialSymptoms],
    });
  },

  startTest: (testType) => {
    set({
      currentTest: testType,
      state: 'testing',
      testStartTime: Date.now(),
    });
  },

  completeTest: () => {
    set({
      state: 'symptoms',
      testStartTime: null,
    });
  },

  updateSymptoms: (symptoms) => {
    set({ currentSymptoms: symptoms });
  },

  reset: () => {
    set({
      state: 'idle',
      currentTest: null,
      patientId: '',
      currentAssessment: null,
      baselineSymptoms: [...initialSymptoms],
      currentSymptoms: [...initialSymptoms],
      testStartTime: null,
    });
  },
}));
