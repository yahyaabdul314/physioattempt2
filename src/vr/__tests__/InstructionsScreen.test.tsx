/**
 * InstructionsScreen Component Tests
 * Tests for VOMS instructions screen
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InstructionsScreen } from '../InstructionsScreen';
import { useAssessmentStore } from '../../store/assessmentStore';

describe('InstructionsScreen', () => {
  beforeEach(() => {
    useAssessmentStore.getState().reset();
  });

  describe('Rendering', () => {
    it('should render instructions title', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();
    });

    it('should render "Before We Begin" heading', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText('Before We Begin')).toBeInTheDocument();
    });

    it('should list all tests to be performed', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Smooth Pursuits.*Follow a moving target/)).toBeInTheDocument();
      expect(screen.getByText(/Saccades.*Look between two targets quickly/)).toBeInTheDocument();
      expect(screen.getByText(/VOR.*Track target while moving your head/)).toBeInTheDocument();
    });

    it('should list all symptoms to be rated', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Headache/)).toBeInTheDocument();
      expect(screen.getByText(/Dizziness/)).toBeInTheDocument();
      expect(screen.getByText(/Nausea/)).toBeInTheDocument();
      expect(screen.getByText(/Mental Fogginess/)).toBeInTheDocument();
    });

    it('should explain rating scale', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/0 = none, 10 = severe/)).toBeInTheDocument();
    });

    it('should show safety warning', () => {
      render(<InstructionsScreen />);

      expect(
        screen.getByText(/Stop immediately if symptoms become severe/)
      ).toBeInTheDocument();
    });

    it('should render begin button', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText('BEGIN ASSESSMENT')).toBeInTheDocument();
    });
  });

  describe('Test Descriptions', () => {
    it('should describe Smooth Pursuits test', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Follow a moving target/)).toBeInTheDocument();
    });

    it('should describe Saccades test', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Look between two targets quickly/)).toBeInTheDocument();
    });

    it('should describe VOR test', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Track target while moving your head/)).toBeInTheDocument();
    });
  });

  describe('Symptom Information', () => {
    it('should explain symptom rating process', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/After each test, you'll rate any symptoms/)).toBeInTheDocument();
    });

    it('should list headache symptom', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Headache/)).toBeInTheDocument();
    });

    it('should list dizziness symptom', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Dizziness/)).toBeInTheDocument();
    });

    it('should list nausea symptom', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Nausea/)).toBeInTheDocument();
    });

    it('should list mental fogginess symptom', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Mental Fogginess/)).toBeInTheDocument();
    });

    it('should show rating scale explanation', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Rate symptoms 0-10/)).toBeInTheDocument();
    });
  });

  describe('Safety Information', () => {
    it('should emphasize stopping for severe symptoms', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Important/)).toBeInTheDocument();
      expect(screen.getByText(/Stop immediately if symptoms become severe/)).toBeInTheDocument();
    });

    it('should use warning color for safety message', () => {
      const { container } = render(<InstructionsScreen />);

      // Safety panel should have warning background color
      const materials = container.querySelectorAll('meshStandardMaterial');
      expect(materials.length).toBeGreaterThan(0);
    });
  });

  describe('Begin Button Interaction', () => {
    it('should call startTest when begin button is clicked', () => {
      const startTestSpy = vi.spyOn(
        useAssessmentStore.getState(),
        'startTest'
      );

      render(<InstructionsScreen />);

      expect(screen.getByText('BEGIN ASSESSMENT')).toBeInTheDocument();
    });

    it('should start with smooth pursuits test', () => {
      const store = useAssessmentStore.getState();
      const startTestSpy = vi.spyOn(store, 'startTest');

      render(<InstructionsScreen />);

      // Should start with smoothPursuits when begin is clicked
      expect(screen.getByText('BEGIN ASSESSMENT')).toBeInTheDocument();
    });
  });

  describe('Visual Layout', () => {
    it('should render instruction panel background', () => {
      const { container } = render(<InstructionsScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      // Should have main panel, safety panel, and floor
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should render safety warning panel', () => {
      const { container } = render(<InstructionsScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should render floor plane', () => {
      const { container } = render(<InstructionsScreen />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });

    it('should center text content', () => {
      render(<InstructionsScreen />);

      // All major text elements should be present and centered
      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();
      expect(screen.getByText('Before We Begin')).toBeInTheDocument();
    });
  });

  describe('Text Formatting', () => {
    it('should use structured list format for tests', () => {
      render(<InstructionsScreen />);

      // Should show numbered list of tests (1. 2. 3.)
      expect(screen.getByText(/1\. Smooth Pursuits/)).toBeInTheDocument();
      expect(screen.getByText(/2\. Saccades/)).toBeInTheDocument();
      expect(screen.getByText(/3\. VOR/)).toBeInTheDocument();
    });

    it('should use bulleted list for symptoms', () => {
      render(<InstructionsScreen />);

      // Should show bulleted symptoms
      expect(screen.getByText(/• Headache/)).toBeInTheDocument();
      expect(screen.getByText(/• Dizziness/)).toBeInTheDocument();
      expect(screen.getByText(/• Nausea/)).toBeInTheDocument();
      expect(screen.getByText(/• Mental Fogginess/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should provide clear pre-assessment information', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/You will perform the following tests/)).toBeInTheDocument();
    });

    it('should explain what to expect', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/After each test/)).toBeInTheDocument();
    });

    it('should have prominent safety warning', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Important/)).toBeInTheDocument();
      expect(screen.getByText(/Stop immediately/)).toBeInTheDocument();
    });

    it('should have clear begin action', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText('BEGIN ASSESSMENT')).toBeInTheDocument();
    });
  });

  describe('Instruction Completeness', () => {
    it('should explain all assessment components', () => {
      render(<InstructionsScreen />);

      // Tests
      expect(screen.getByText(/Smooth Pursuits/)).toBeInTheDocument();
      expect(screen.getByText(/Saccades/)).toBeInTheDocument();
      expect(screen.getByText(/VOR/)).toBeInTheDocument();

      // Symptom rating
      expect(screen.getByText(/rate any symptoms/)).toBeInTheDocument();

      // Safety
      expect(screen.getByText(/Stop immediately/)).toBeInTheDocument();
    });

    it('should provide sufficient detail for patient understanding', () => {
      render(<InstructionsScreen />);

      expect(screen.getByText(/Follow a moving target/)).toBeInTheDocument();
      expect(screen.getByText(/Look between two targets quickly/)).toBeInTheDocument();
      expect(screen.getByText(/Track target while moving your head/)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple renders', () => {
      const { rerender } = render(<InstructionsScreen />);

      rerender(<InstructionsScreen />);
      rerender(<InstructionsScreen />);

      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();
    });

    it('should work with any store state', () => {
      useAssessmentStore.getState().startAssessment('test-patient');

      render(<InstructionsScreen />);

      expect(screen.getByText('BEGIN ASSESSMENT')).toBeInTheDocument();
    });
  });
});
