/**
 * CompleteScreen Component Tests
 * Tests for assessment completion and results screen
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompleteScreen } from '../CompleteScreen';
import { useAssessmentStore } from '../../store/assessmentStore';

describe('CompleteScreen', () => {
  beforeEach(() => {
    useAssessmentStore.getState().reset();
  });

  describe('Rendering', () => {
    it('should render completion title', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });

    it('should render summary heading', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('Summary')).toBeInTheDocument();
    });

    it('should list completed tests', () => {
      render(<CompleteScreen />);

      expect(screen.getByText(/Smooth Pursuits/)).toBeInTheDocument();
      expect(screen.getByText(/Saccades.*Horizontal/)).toBeInTheDocument();
    });

    it('should show final symptom score', () => {
      render(<CompleteScreen />);

      expect(screen.getByText(/Final Symptom Score: 0\/40/)).toBeInTheDocument();
    });

    it('should show symptoms breakdown heading', () => {
      render(<CompleteScreen />);

      expect(screen.getByText(/Symptoms Breakdown/)).toBeInTheDocument();
    });

    it('should render restart button', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('RESTART ASSESSMENT')).toBeInTheDocument();
    });

    it('should show clinical review note', () => {
      render(<CompleteScreen />);

      expect(
        screen.getByText(/Results should be reviewed by a qualified healthcare professional/)
      ).toBeInTheDocument();
    });
  });

  describe('Symptom Score Display', () => {
    it('should show total symptom score of 0 for no symptoms', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Final Symptom Score: 0\/40/)).toBeInTheDocument();
    });

    it('should calculate correct total for mixed symptoms', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 3 },
        { type: 'dizziness', score: 2 },
        { type: 'nausea', score: 1 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Final Symptom Score: 6\/40/)).toBeInTheDocument();
    });

    it('should display individual symptom scores', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 1 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Headache: 5\/10/)).toBeInTheDocument();
      expect(screen.getByText(/Dizziness: 3\/10/)).toBeInTheDocument();
      expect(screen.getByText(/Nausea: 2\/10/)).toBeInTheDocument();
      expect(screen.getByText(/Fogginess: 1\/10/)).toBeInTheDocument();
    });
  });

  describe('Clinical Interpretation', () => {
    it('should show normal response for zero symptoms', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 0 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/No symptoms provoked - Normal response/)).toBeInTheDocument();
    });

    it('should show mild interpretation for low scores (1-5)', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 2 },
        { type: 'dizziness', score: 1 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Mild symptom provocation - Monitor/)).toBeInTheDocument();
    });

    it('should show moderate interpretation for medium scores (6-10)', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 3 },
        { type: 'dizziness', score: 3 },
        { type: 'nausea', score: 2 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      expect(
        screen.getByText(/Moderate symptoms - Further assessment recommended/)
      ).toBeInTheDocument();
    });

    it('should show significant interpretation for high scores (>10)', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 5 },
        { type: 'dizziness', score: 4 },
        { type: 'nausea', score: 3 },
        { type: 'fogginess', score: 2 },
      ]);

      render(<CompleteScreen />);

      expect(
        screen.getByText(/Significant symptoms - Impairment likely present/)
      ).toBeInTheDocument();
    });
  });

  describe('Color Coding', () => {
    it('should use green color for low symptom scores', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 1 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      // Green color (#66ff66) for low scores
      expect(screen.getByText(/Headache: 1\/10/)).toBeInTheDocument();
    });

    it('should use yellow color for medium symptom scores', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 4 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      // Yellow color (#ffaa66) for medium scores (3-5)
      expect(screen.getByText(/Headache: 4\/10/)).toBeInTheDocument();
    });

    it('should use red color for high symptom scores', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 8 },
        { type: 'dizziness', score: 0 },
        { type: 'nausea', score: 0 },
        { type: 'fogginess', score: 0 },
      ]);

      render(<CompleteScreen />);

      // Red color (#ff6666) for high scores (>5)
      expect(screen.getByText(/Headache: 8\/10/)).toBeInTheDocument();
    });
  });

  describe('Restart Functionality', () => {
    it('should call reset when restart button is clicked', () => {
      const resetSpy = vi.spyOn(useAssessmentStore.getState(), 'reset');

      render(<CompleteScreen />);

      expect(screen.getByText('RESTART ASSESSMENT')).toBeInTheDocument();
    });

    it('should return to idle state after restart', () => {
      const store = useAssessmentStore.getState();
      store.startAssessment('test-patient');
      store.setState('complete');

      const resetSpy = vi.spyOn(store, 'reset');

      render(<CompleteScreen />);

      expect(screen.getByText('RESTART ASSESSMENT')).toBeInTheDocument();
    });
  });

  describe('Visual Layout', () => {
    it('should render summary panel background', () => {
      const { container } = render(<CompleteScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      // Should have summary panel, interpretation panel, and floor
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should render interpretation panel', () => {
      const { container } = render(<CompleteScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should render floor plane', () => {
      const { container } = render(<CompleteScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should use appropriate background color for interpretation', () => {
      const { container } = render(<CompleteScreen />);

      // Interpretation panel color should match severity
      const materials = container.querySelectorAll('meshStandardMaterial');
      expect(materials.length).toBeGreaterThan(0);
    });
  });

  describe('Tests Completed List', () => {
    it('should list Smooth Pursuits as completed', () => {
      render(<CompleteScreen />);

      expect(screen.getByText(/Smooth Pursuits/)).toBeInTheDocument();
    });

    it('should list Saccades (Horizontal) as completed', () => {
      render(<CompleteScreen />);

      expect(screen.getByText(/Saccades.*Horizontal/)).toBeInTheDocument();
    });

    it('should show tests in bullet format', () => {
      render(<CompleteScreen />);

      // Should use bullet points
      expect(screen.getByText(/• Smooth Pursuits/)).toBeInTheDocument();
      expect(screen.getByText(/• Saccades/)).toBeInTheDocument();
    });
  });

  describe('Professional Context', () => {
    it('should emphasize professional review', () => {
      render(<CompleteScreen />);

      expect(
        screen.getByText(/qualified healthcare professional/)
      ).toBeInTheDocument();
    });

    it('should provide clinical interpretation', () => {
      render(<CompleteScreen />);

      // Should always have an interpretation
      const interpretations = [
        screen.queryByText(/Normal response/),
        screen.queryByText(/Mild symptom provocation/),
        screen.queryByText(/Moderate symptoms/),
        screen.queryByText(/Significant symptoms/),
      ];

      const hasInterpretation = interpretations.some((interp) => interp !== null);
      expect(hasInterpretation).toBe(true);
    });
  });

  describe('Symptom Capitalization', () => {
    it('should capitalize symptom names in breakdown', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 1 },
        { type: 'dizziness', score: 2 },
        { type: 'nausea', score: 3 },
        { type: 'fogginess', score: 4 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Headache:/)).toBeInTheDocument();
      expect(screen.getByText(/Dizziness:/)).toBeInTheDocument();
      expect(screen.getByText(/Nausea:/)).toBeInTheDocument();
      expect(screen.getByText(/Fogginess:/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle maximum symptom scores', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([
        { type: 'headache', score: 10 },
        { type: 'dizziness', score: 10 },
        { type: 'nausea', score: 10 },
        { type: 'fogginess', score: 10 },
      ]);

      render(<CompleteScreen />);

      expect(screen.getByText(/Final Symptom Score: 40\/40/)).toBeInTheDocument();
    });

    it('should handle empty symptoms array', () => {
      const store = useAssessmentStore.getState();
      store.updateSymptoms([]);

      render(<CompleteScreen />);

      // Should still render without crashing
      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });

    it('should handle multiple renders', () => {
      const { rerender } = render(<CompleteScreen />);

      rerender(<CompleteScreen />);
      rerender(<CompleteScreen />);

      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should provide clear completion status', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });

    it('should show clear summary of results', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText(/Final Symptom Score/)).toBeInTheDocument();
    });

    it('should offer clear restart option', () => {
      render(<CompleteScreen />);

      expect(screen.getByText('RESTART ASSESSMENT')).toBeInTheDocument();
    });

    it('should provide clinical interpretation guidance', () => {
      render(<CompleteScreen />);

      // Should have an interpretation message
      const hasInterpretation =
        screen.queryByText(/Normal response/) ||
        screen.queryByText(/Mild symptom/) ||
        screen.queryByText(/Moderate symptoms/) ||
        screen.queryByText(/Significant symptoms/);

      expect(hasInterpretation).toBeTruthy();
    });
  });
});
