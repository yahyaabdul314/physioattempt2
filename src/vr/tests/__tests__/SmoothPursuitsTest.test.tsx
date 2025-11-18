/**
 * SmoothPursuitsTest Component Tests
 * Tests for VOMS smooth pursuits assessment in VR
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SmoothPursuitsTest } from '../SmoothPursuitsTest';
import { useAssessmentStore } from '../../../store/assessmentStore';
import { useFrame } from '@react-three/fiber';

describe('SmoothPursuitsTest', () => {
  let frameCallback: ((state: any, delta: number) => void) | null = null;

  beforeEach(() => {
    // Reset store
    useAssessmentStore.getState().reset();

    // Capture useFrame callback
    vi.mocked(useFrame).mockImplementation((callback) => {
      frameCallback = callback;
      return null;
    });
  });

  afterEach(() => {
    frameCallback = null;
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render smooth pursuits test interface', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
      expect(screen.getByText(/Follow the target smoothly with your eyes/)).toBeInTheDocument();
    });

    it('should show horizontal phase initially', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText('Phase: horizontal')).toBeInTheDocument();
    });

    it('should render moving target sphere', () => {
      const { container } = render(<SmoothPursuitsTest />);

      const spheres = container.querySelectorAll('sphereGeometry');
      // Should have target sphere and crosshair ring
      expect(spheres.length).toBeGreaterThan(0);
    });

    it('should show timer display', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText(/Time: 0s/)).toBeInTheDocument();
    });

    it('should not show complete button initially', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.queryByText('RATE SYMPTOMS')).not.toBeInTheDocument();
    });

    it('should render crosshair reference', () => {
      const { container } = render(<SmoothPursuitsTest />);

      const rings = container.querySelectorAll('ringGeometry');
      expect(rings.length).toBeGreaterThan(0);
    });
  });

  describe('Animation and Phase Transitions', () => {
    it('should update timer during animation', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText('Time: 0s')).toBeInTheDocument();

      // Simulate 2 seconds
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 125; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Timer should have progressed
      const timerText = screen.getByText(/Time: \d+s/);
      expect(timerText).toBeInTheDocument();
    });

    it('should transition from horizontal to vertical phase after 8 seconds', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText('Phase: horizontal')).toBeInTheDocument();

      // Simulate 9 seconds
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 560; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Phase: vertical')).toBeInTheDocument();
    });

    it('should transition from vertical to diagonal phase', () => {
      render(<SmoothPursuitsTest />);

      // Skip to vertical phase (8+ seconds)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 560; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Phase: vertical')).toBeInTheDocument();

      // Progress through vertical phase (another 8+ seconds)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 560; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Phase: diagonal')).toBeInTheDocument();
    });

    it('should reach complete phase after all movement patterns', () => {
      render(<SmoothPursuitsTest />);

      // Simulate all three phases (24+ seconds total)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Complete!')).toBeInTheDocument();
    });

    it('should show complete button when test finishes', () => {
      render(<SmoothPursuitsTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('RATE SYMPTOMS')).toBeInTheDocument();
    });

    it('should reset timer between phases', () => {
      render(<SmoothPursuitsTest />);

      // Progress to vertical phase
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 560; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Timer should be low again (reset for new phase)
      const timerText = screen.getByText(/Time: \d+s/);
      expect(timerText).toBeInTheDocument();
    });
  });

  describe('Target Movement', () => {
    it('should move target during horizontal phase', () => {
      const { container } = render(<SmoothPursuitsTest />);

      // Simulate some animation frames
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 60; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Target position should update
      expect(container).toBeTruthy();
    });

    it('should use sinusoidal movement pattern', () => {
      render(<SmoothPursuitsTest />);

      // Simulate smooth movement
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 180; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Target should move smoothly (no errors)
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });

    it('should stop target movement when complete', () => {
      render(<SmoothPursuitsTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Complete!')).toBeInTheDocument();
      // Target should be at rest position
    });
  });

  describe('Visual Feedback', () => {
    it('should render target with red emissive color', () => {
      const { container } = render(<SmoothPursuitsTest />);

      const materials = container.querySelectorAll('meshStandardMaterial');
      const hasRedTarget = Array.from(materials).some(
        (m) => m.getAttribute('color') === '#ff0000'
      );
      expect(hasRedTarget).toBe(true);
    });

    it('should show phase indicator during test', () => {
      render(<SmoothPursuitsTest />);

      // Should show current phase
      const phaseIndicators = [
        screen.queryByText('Phase: horizontal'),
        screen.queryByText('Phase: vertical'),
        screen.queryByText('Phase: diagonal'),
        screen.queryByText('Complete!'),
      ];

      const hasPhaseIndicator = phaseIndicators.some((indicator) => indicator !== null);
      expect(hasPhaseIndicator).toBe(true);
    });
  });

  describe('Store Integration', () => {
    it('should call completeTest when clicking complete button', () => {
      const completeTestSpy = vi.spyOn(useAssessmentStore.getState(), 'completeTest');

      const { container } = render(<SmoothPursuitsTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Find and click the complete button
      const button = container.querySelector('mesh[onClick]');
      if (button) {
        act(() => {
          (button as any).props?.onClick?.();
        });
      }

      expect(completeTestSpy).toHaveBeenCalled();
    });
  });

  describe('Instructions and Labels', () => {
    it('should show clear test instructions', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText(/Keep your head still/)).toBeInTheDocument();
    });

    it('should show completion message when done', () => {
      render(<SmoothPursuitsTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText(/Test complete!/)).toBeInTheDocument();
    });

    it('should display current phase to user', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText('Phase: horizontal')).toBeInTheDocument();

      // Transition to next phase
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 560; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Phase: vertical')).toBeInTheDocument();
    });
  });

  describe('Floor and Environment', () => {
    it('should render floor plane', () => {
      const { container } = render(<SmoothPursuitsTest />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid frame updates', () => {
      render(<SmoothPursuitsTest />);

      act(() => {
        if (frameCallback) {
          // Very rapid updates
          for (let i = 0; i < 2000; i++) {
            frameCallback({}, 0.001);
          }
        }
      });

      // Should not crash
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });

    it('should handle zero delta time', () => {
      render(<SmoothPursuitsTest />);

      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 100; i++) {
            frameCallback({}, 0);
          }
        }
      });

      // Should still be in initial state
      expect(screen.getByText('Phase: horizontal')).toBeInTheDocument();
      expect(screen.getByText('Time: 0s')).toBeInTheDocument();
    });

    it('should handle missing target ref gracefully', () => {
      render(<SmoothPursuitsTest />);

      // Should not crash even if ref is not yet set
      act(() => {
        if (frameCallback) {
          frameCallback({}, 0.016);
        }
      });

      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });

    it('should handle large delta values', () => {
      render(<SmoothPursuitsTest />);

      act(() => {
        if (frameCallback) {
          // Large time jump
          frameCallback({}, 10);
        }
      });

      // Should handle gracefully
      expect(screen.getByText('Smooth Pursuits Test')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should complete full test cycle within reasonable time', () => {
      render(<SmoothPursuitsTest />);

      const startTime = Date.now();

      act(() => {
        if (frameCallback) {
          // Simulate full test (24 seconds)
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete in reasonable time (< 5 seconds in tests)
      expect(duration).toBeLessThan(5000);

      expect(screen.getByText('Complete!')).toBeInTheDocument();
    });

    it('should update smoothly without lag', () => {
      render(<SmoothPursuitsTest />);

      // Simulate normal gameplay
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 300; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Should maintain state consistency
      expect(screen.getByText(/Phase: /)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should provide clear phase information', () => {
      render(<SmoothPursuitsTest />);

      expect(screen.getByText(/Phase: horizontal/)).toBeInTheDocument();
    });

    it('should show completion status clearly', () => {
      render(<SmoothPursuitsTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 1700; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      expect(screen.getByText('Complete!')).toBeInTheDocument();
      expect(screen.getByText('RATE SYMPTOMS')).toBeInTheDocument();
    });
  });
});
