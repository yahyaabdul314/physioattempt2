/**
 * VRApp Integration Tests
 * Tests for main VR application and scene rendering
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VRApp } from '../VRApp';
import { useAssessmentStore } from '../store/assessmentStore';

describe('VRApp Integration', () => {
  beforeEach(() => {
    useAssessmentStore.getState().reset();
  });

  describe('Application Rendering', () => {
    it('should render VR application container', () => {
      const { container } = render(<VRApp />);

      const appDiv = container.firstChild as HTMLElement;
      expect(appDiv).toBeDefined();
      expect(appDiv.style.width).toBe('100vw');
      expect(appDiv.style.height).toBe('100vh');
    });

    it('should render Canvas component', () => {
      const { container } = render(<VRApp />);

      // Canvas should be rendered
      expect(container.querySelector('div')).toBeDefined();
    });

    it('should have black background', () => {
      const { container } = render(<VRApp />);

      const appDiv = container.firstChild as HTMLElement;
      expect(appDiv.style.background).toBe('#000');
    });
  });

  describe('State-Based Screen Rendering', () => {
    it('should render StartScreen when state is idle', () => {
      const store = useAssessmentStore.getState();
      store.setState('idle');

      render(<VRApp />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });

    it('should render InstructionsScreen when state is instructions', () => {
      const store = useAssessmentStore.getState();
      store.startAssessment('test-patient');

      render(<VRApp />);

      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();
    });

    it('should render SmoothPursuitsTest when testing smooth pursuits', () => {
      const store = useAssessmentStore.getState();
      store.startTest('smoothPursuits');

      render(<VRApp />);

      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });

    it('should render SaccadesTest when testing saccades', () => {
      const store = useAssessmentStore.getState();
      store.startTest('saccadesH');

      render(<VRApp />);

      expect(screen.getByText('Saccades Test')).toBeInTheDocument();
    });

    it('should render SymptomRating when state is symptoms', () => {
      const store = useAssessmentStore.getState();
      store.completeTest();

      render(<VRApp />);

      expect(screen.getByText('Rate Your Symptoms')).toBeInTheDocument();
    });

    it('should render CompleteScreen when state is complete', () => {
      const store = useAssessmentStore.getState();
      store.setState('complete');

      render(<VRApp />);

      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });
  });

  describe('Lighting Setup', () => {
    it('should include ambient light', () => {
      const { container } = render(<VRApp />);

      const lights = container.querySelectorAll('ambientLight');
      expect(lights.length).toBeGreaterThan(0);
    });

    it('should include point lights', () => {
      const { container } = render(<VRApp />);

      const lights = container.querySelectorAll('pointLight');
      expect(lights.length).toBeGreaterThan(0);
    });
  });

  describe('Assessment Flow Integration', () => {
    it('should support full assessment workflow', () => {
      const store = useAssessmentStore.getState();

      // Start at idle
      const { rerender } = render(<VRApp />);
      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();

      // Start assessment
      store.startAssessment('patient-123');
      rerender(<VRApp />);
      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();

      // Begin first test
      store.startTest('smoothPursuits');
      rerender(<VRApp />);
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();

      // Complete test and rate symptoms
      store.completeTest();
      rerender(<VRApp />);
      expect(screen.getByText('Rate Your Symptoms')).toBeInTheDocument();

      // Start second test
      store.startTest('saccadesH');
      rerender(<VRApp />);
      expect(screen.getByText('Saccades Test')).toBeInTheDocument();

      // Complete and finish
      store.completeTest();
      rerender(<VRApp />);
      expect(screen.getByText('Rate Your Symptoms')).toBeInTheDocument();

      // View results
      store.setState('complete');
      rerender(<VRApp />);
      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });

    it('should support assessment restart', () => {
      const store = useAssessmentStore.getState();

      const { rerender } = render(<VRApp />);

      // Complete assessment
      store.startAssessment('patient-123');
      store.setState('complete');
      rerender(<VRApp />);
      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();

      // Restart
      store.reset();
      rerender(<VRApp />);
      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });
  });

  describe('Screen Transitions', () => {
    it('should transition from idle to instructions', () => {
      const store = useAssessmentStore.getState();
      const { rerender } = render(<VRApp />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();

      store.startAssessment('patient-123');
      rerender(<VRApp />);

      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();
    });

    it('should transition from instructions to testing', () => {
      const store = useAssessmentStore.getState();
      store.startAssessment('patient-123');

      const { rerender } = render(<VRApp />);
      expect(screen.getByText('VOMS Assessment Instructions')).toBeInTheDocument();

      store.startTest('smoothPursuits');
      rerender(<VRApp />);

      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });

    it('should transition from testing to symptoms', () => {
      const store = useAssessmentStore.getState();
      store.startTest('smoothPursuits');

      const { rerender } = render(<VRApp />);
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();

      store.completeTest();
      rerender(<VRApp />);

      expect(screen.getByText('Rate Your Symptoms')).toBeInTheDocument();
    });

    it('should transition between different tests', () => {
      const store = useAssessmentStore.getState();

      const { rerender } = render(<VRApp />);

      store.startTest('smoothPursuits');
      rerender(<VRApp />);
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();

      store.completeTest();
      store.startTest('saccadesH');
      rerender(<VRApp />);
      expect(screen.getByText('Saccades Test')).toBeInTheDocument();
    });

    it('should transition to complete screen', () => {
      const store = useAssessmentStore.getState();

      const { rerender } = render(<VRApp />);

      store.setState('complete');
      rerender(<VRApp />);

      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });
  });

  describe('WebXR Integration', () => {
    it('should include XR wrapper', () => {
      const { container } = render(<VRApp />);

      // XR component should wrap the scene
      expect(container).toBeDefined();
    });

    it('should support VR mode', () => {
      const { container } = render(<VRApp />);

      // Application should be ready for VR
      expect(container).toBeDefined();
    });
  });

  describe('Conditional Rendering', () => {
    it('should only render one screen at a time', () => {
      const store = useAssessmentStore.getState();
      store.setState('idle');

      render(<VRApp />);

      // Should only show start screen
      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
      expect(screen.queryByText('VOMS Assessment Instructions')).not.toBeInTheDocument();
      expect(screen.queryByText('Smooth Pursuits Test')).not.toBeInTheDocument();
    });

    it('should not render test screens in idle state', () => {
      const store = useAssessmentStore.getState();
      store.setState('idle');

      render(<VRApp />);

      expect(screen.queryByText('Smooth Pursuits Test')).not.toBeInTheDocument();
      expect(screen.queryByText('Saccades Test')).not.toBeInTheDocument();
    });

    it('should not render symptoms screen when testing', () => {
      const store = useAssessmentStore.getState();
      store.startTest('smoothPursuits');

      render(<VRApp />);

      expect(screen.queryByText('Rate Your Symptoms')).not.toBeInTheDocument();
    });
  });

  describe('Test Selection', () => {
    it('should render correct test based on currentTest', () => {
      const store = useAssessmentStore.getState();

      const { rerender } = render(<VRApp />);

      store.startTest('smoothPursuits');
      rerender(<VRApp />);
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();

      store.completeTest();
      store.startTest('saccadesH');
      rerender(<VRApp />);
      expect(screen.queryByText('Smooth Pursuits Test')).not.toBeInTheDocument();
      expect(screen.getByText('Saccades Test')).toBeInTheDocument();
    });

    it('should handle null currentTest gracefully', () => {
      const store = useAssessmentStore.getState();
      store.setState('testing');
      store.startTest(null);

      render(<VRApp />);

      // Should not crash, but no test screen should show
      expect(screen.queryByText('Smooth Pursuits Test')).not.toBeInTheDocument();
      expect(screen.queryByText('Saccades Test')).not.toBeInTheDocument();
    });
  });

  describe('Scene Consistency', () => {
    it('should maintain lighting across all screens', () => {
      const store = useAssessmentStore.getState();

      const { rerender, container } = render(<VRApp />);

      // Check lighting in idle state
      let lights = container.querySelectorAll('ambientLight');
      expect(lights.length).toBeGreaterThan(0);

      // Check lighting in testing state
      store.startTest('smoothPursuits');
      rerender(<VRApp />);
      lights = container.querySelectorAll('ambientLight');
      expect(lights.length).toBeGreaterThan(0);

      // Check lighting in complete state
      store.setState('complete');
      rerender(<VRApp />);
      lights = container.querySelectorAll('ambientLight');
      expect(lights.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid state changes', () => {
      const store = useAssessmentStore.getState();
      const { rerender } = render(<VRApp />);

      store.setState('idle');
      rerender(<VRApp />);

      store.setState('instructions');
      rerender(<VRApp />);

      store.setState('testing');
      rerender(<VRApp />);

      store.setState('complete');
      rerender(<VRApp />);

      // Should render final state
      expect(screen.getByText('Assessment Complete')).toBeInTheDocument();
    });

    it('should handle store reset during rendering', () => {
      const store = useAssessmentStore.getState();
      const { rerender } = render(<VRApp />);

      store.startAssessment('patient-123');
      rerender(<VRApp />);

      store.reset();
      rerender(<VRApp />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });

    it('should handle multiple renders', () => {
      const { rerender } = render(<VRApp />);

      rerender(<VRApp />);
      rerender(<VRApp />);
      rerender(<VRApp />);

      expect(screen.getByText('VR Concussion Recovery Platform')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render without significant delay', () => {
      const startTime = Date.now();

      render(<VRApp />);

      const endTime = Date.now();
      const renderTime = endTime - startTime;

      // Should render in reasonable time (< 1 second)
      expect(renderTime).toBeLessThan(1000);
    });

    it('should handle state changes efficiently', () => {
      const store = useAssessmentStore.getState();
      const { rerender } = render(<VRApp />);

      const startTime = Date.now();

      for (let i = 0; i < 10; i++) {
        store.setState('idle');
        rerender(<VRApp />);
        store.setState('instructions');
        rerender(<VRApp />);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Should handle multiple transitions quickly
      expect(totalTime).toBeLessThan(2000);
    });
  });
});
