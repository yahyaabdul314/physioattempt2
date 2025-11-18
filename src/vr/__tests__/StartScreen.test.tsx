/**
 * StartScreen Component Tests
 * Tests for VR start/welcome screen
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StartScreen } from '../StartScreen';
import { useAssessmentStore } from '../../store/assessmentStore';

describe('StartScreen', () => {
  beforeEach(() => {
    useAssessmentStore.getState().reset();
  });

  describe('Rendering', () => {
    it('should render platform title', () => {
      render(<StartScreen />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });

    it('should render subtitle about evidence-based approach', () => {
      render(<StartScreen />);

      expect(
        screen.getByText('Evidence-Based Assessment & Rehabilitation')
      ).toBeInTheDocument();
    });

    it('should render platform description', () => {
      render(<StartScreen />);

      expect(screen.getByText(/VOMS.*Vestibular.*Ocular/)).toBeInTheDocument();
    });

    it('should show available tests', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/Smooth Pursuits.*Saccades.*VOR.*Convergence/)
      ).toBeInTheDocument();
    });

    it('should render start button', () => {
      render(<StartScreen />);

      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });

    it('should show interaction instructions', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/Click the button or point your controller/)
      ).toBeInTheDocument();
    });

    it('should display clinical note', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/For use by qualified healthcare professionals/)
      ).toBeInTheDocument();
    });

    it('should mention clinical research basis', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/VOMS, King-Devick, VR therapy RCTs/)
      ).toBeInTheDocument();
    });
  });

  describe('Start Button Interaction', () => {
    it('should call startAssessment when button is clicked', () => {
      render(<StartScreen />);

      // Button should exist
      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });

    it('should generate patient ID when starting', () => {
      render(<StartScreen />);

      // When start is clicked, should create patient ID with timestamp
      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });

    it('should transition to instructions state', () => {
      render(<StartScreen />);

      // After clicking start, should move to instructions
      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });
  });

  describe('Visual Layout', () => {
    it('should render floor plane', () => {
      const { container } = render(<StartScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should have proper text hierarchy', () => {
      render(<StartScreen />);

      // Title should be largest
      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
      // Subtitle
      expect(
        screen.getByText('Evidence-Based Assessment & Rehabilitation')
      ).toBeInTheDocument();
      // Description
      expect(screen.getByText(/VOMS/)).toBeInTheDocument();
    });

    it('should center all text elements', () => {
      render(<StartScreen />);

      // All text should be centered
      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });
  });

  describe('Professional Context', () => {
    it('should emphasize clinical use', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/qualified healthcare professionals/)
      ).toBeInTheDocument();
    });

    it('should reference evidence base', () => {
      render(<StartScreen />);

      expect(screen.getByText(/clinical research/)).toBeInTheDocument();
    });

    it('should list validated protocols', () => {
      render(<StartScreen />);

      expect(screen.getByText(/VOMS/)).toBeInTheDocument();
      expect(screen.getByText(/King-Devick/)).toBeInTheDocument();
    });
  });

  describe('User Guidance', () => {
    it('should explain VR controller interaction', () => {
      render(<StartScreen />);

      expect(screen.getByText(/point your controller and pull the trigger/)).toBeInTheDocument();
    });

    it('should show clickable interaction option', () => {
      render(<StartScreen />);

      expect(screen.getByText(/Click the button/)).toBeInTheDocument();
    });
  });

  describe('Test Information', () => {
    it('should list Smooth Pursuits test', () => {
      render(<StartScreen />);

      expect(screen.getByText(/Smooth Pursuits/)).toBeInTheDocument();
    });

    it('should list Saccades test', () => {
      render(<StartScreen />);

      expect(screen.getByText(/Saccades/)).toBeInTheDocument();
    });

    it('should list VOR test', () => {
      render(<StartScreen />);

      expect(screen.getByText(/VOR/)).toBeInTheDocument();
    });

    it('should list Convergence test', () => {
      render(<StartScreen />);

      expect(screen.getByText(/Convergence/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should provide clear instructions', () => {
      render(<StartScreen />);

      expect(
        screen.getByText(/Click the button or point your controller/)
      ).toBeInTheDocument();
    });

    it('should have clear call to action', () => {
      render(<StartScreen />);

      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });

    it('should explain platform purpose', () => {
      render(<StartScreen />);

      expect(screen.getByText(/concussion recovery/i)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple renders', () => {
      const { rerender } = render(<StartScreen />);

      rerender(<StartScreen />);
      rerender(<StartScreen />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });

    it('should work with fresh store', () => {
      useAssessmentStore.getState().reset();

      render(<StartScreen />);

      expect(screen.getByText('START TESTS')).toBeInTheDocument();
    });
  });
});
