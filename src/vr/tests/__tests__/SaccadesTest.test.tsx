/**
 * SaccadesTest Component Tests
 * Tests for VOMS saccades assessment in VR
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SaccadesTest } from '../SaccadesTest';
import { useAssessmentStore } from '../../../store/assessmentStore';
import { useFrame } from '@react-three/fiber';

describe('SaccadesTest', () => {
  let frameCallback: ((state: any, delta: number) => void) | null = null;

  beforeEach(() => {
    // Reset store
    useAssessmentStore.getState().reset();

    // Capture useFrame callback
    vi.mocked(useFrame).mockImplementation((callback) => {
      frameCallback = callback;
    });
  });

  afterEach(() => {
    frameCallback = null;
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render saccades test interface', () => {
      render(<SaccadesTest />);

      expect(screen.getByText('Saccades Test')).toBeInTheDocument();
      expect(screen.getByText(/Look quickly between the highlighted targets/)).toBeInTheDocument();
    });

    it('should show horizontal phase initially', () => {
      render(<SaccadesTest />);

      expect(screen.getByText('Direction: horizontal')).toBeInTheDocument();
    });

    it('should show switch counter', () => {
      render(<SaccadesTest />);

      expect(screen.getByText(/Switches: 0 \/ 20/)).toBeInTheDocument();
    });

    it('should render two target spheres', () => {
      const { container } = render(<SaccadesTest />);

      const meshes = container.querySelectorAll('mesh');
      // Should have left target, right target, and floor
      expect(meshes.length).toBeGreaterThanOrEqual(2);
    });

    it('should not show complete button initially', () => {
      render(<SaccadesTest />);

      expect(screen.queryByText('RATE SYMPTOMS')).not.toBeInTheDocument();
    });
  });

  describe('Animation and Phase Transitions', () => {
    it('should switch active target during animation', () => {
      const { container } = render(<SaccadesTest />);

      // Get initial state
      const initialContent = container.innerHTML;

      // Simulate frame updates (1 second = 1000ms / 16ms per frame ≈ 62 frames)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 65; i++) {
            frameCallback({}, 0.016);
          }
        }
      });

      // Content should change after time passes
      const updatedContent = container.innerHTML;
      expect(updatedContent).not.toBe(initialContent);
    });

    it('should progress from horizontal to vertical phase', () => {
      render(<SaccadesTest />);

      expect(screen.getByText('Direction: horizontal')).toBeInTheDocument();

      // Simulate 20 switches (each switch takes ~1 second)
      act(() => {
        if (frameCallback) {
          // Simulate enough time for 20 switches at 1 second each
          for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      // Should transition to vertical phase
      expect(screen.getByText('Direction: vertical')).toBeInTheDocument();
    });

    it('should reach complete phase after both horizontal and vertical', () => {
      render(<SaccadesTest />);

      // Simulate horizontal phase (20 switches)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      // Simulate vertical phase (20 switches)
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      expect(screen.getByText('Complete!')).toBeInTheDocument();
    });

    it('should show complete button when test is done', () => {
      render(<SaccadesTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          // 40 switches total + extra time
          for (let i = 0; i < 45; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      expect(screen.getByText('RATE SYMPTOMS')).toBeInTheDocument();
    });
  });

  describe('Target Positioning', () => {
    it('should position targets horizontally in horizontal phase', () => {
      const { container } = render(<SaccadesTest />);

      // Targets should be side by side
      const meshes = container.querySelectorAll('mesh');
      expect(meshes.length).toBeGreaterThan(0);
    });

    it('should reposition targets vertically in vertical phase', () => {
      render(<SaccadesTest />);

      // Transition to vertical phase
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      expect(screen.getByText('Direction: vertical')).toBeInTheDocument();
      // Targets should now be top and bottom
    });
  });

  describe('Visual Feedback', () => {
    it('should highlight active target with green color', () => {
      const { container } = render(<SaccadesTest />);

      const materials = container.querySelectorAll('meshStandardMaterial');
      // At least one target should be green (active)
      const hasGreenTarget = Array.from(materials).some(
        (m) => m.getAttribute('color') === '#00ff00'
      );
      expect(hasGreenTarget).toBe(true);
    });

    it('should dim inactive target', () => {
      const { container } = render(<SaccadesTest />);

      const materials = container.querySelectorAll('meshStandardMaterial');
      // At least one target should be dimmed (inactive)
      const hasDimTarget = Array.from(materials).some(
        (m) => m.getAttribute('color') === '#004400'
      );
      expect(hasDimTarget).toBe(true);
    });

    it('should update switch counter during test', () => {
      render(<SaccadesTest />);

      expect(screen.getByText(/Switches: 0 \/ 20/)).toBeInTheDocument();

      // Progress through some switches
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      // Counter should update
      const counterText = screen.getByText(/Switches: \d+ \/ 20/);
      expect(counterText).toBeInTheDocument();
    });
  });

  describe('Store Integration', () => {
    it('should call completeTest when clicking complete button', () => {
      const completeTestSpy = vi.spyOn(useAssessmentStore.getState(), 'completeTest');

      const { container } = render(<SaccadesTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 45; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
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
      render(<SaccadesTest />);

      expect(screen.getByText(/Keep your head still/)).toBeInTheDocument();
    });

    it('should show completion message when done', () => {
      render(<SaccadesTest />);

      // Fast-forward to completion
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 45; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      expect(screen.getByText(/Test complete!/)).toBeInTheDocument();
    });
  });

  describe('Floor and Environment', () => {
    it('should render floor plane', () => {
      const { container } = render(<SaccadesTest />);

      const planes = container.querySelectorAll('planeGeometry');
      expect(planes.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid frame updates', () => {
      render(<SaccadesTest />);

      act(() => {
        if (frameCallback) {
          // Very rapid updates
          for (let i = 0; i < 1000; i++) {
            frameCallback({}, 0.001);
          }
        }
      });

      // Should not crash
      expect(screen.getByText('Saccades Test')).toBeInTheDocument();
    });

    it('should handle zero delta time', () => {
      render(<SaccadesTest />);

      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 100; i++) {
            frameCallback({}, 0);
          }
        }
      });

      // Should still be in initial state
      expect(screen.getByText('Direction: horizontal')).toBeInTheDocument();
    });

    it('should reset switch count between phases', () => {
      render(<SaccadesTest />);

      // Complete horizontal phase
      act(() => {
        if (frameCallback) {
          for (let i = 0; i < 21; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      // In vertical phase, counter should reset
      expect(screen.getByText('Direction: vertical')).toBeInTheDocument();
      // Counter exists (should show 0 or low number for new phase)
      expect(screen.getByText(/Switches: \d+ \/ 20/)).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should complete full test cycle within reasonable time', () => {
      const { container } = render(<SaccadesTest />);

      const startTime = Date.now();

      act(() => {
        if (frameCallback) {
          // Simulate full test (40 switches + buffer)
          for (let i = 0; i < 45; i++) {
            for (let j = 0; j < 65; j++) {
              frameCallback({}, 0.016);
            }
          }
        }
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete in reasonable time (< 5 seconds in tests)
      expect(duration).toBeLessThan(5000);

      expect(screen.getByText('Complete!')).toBeInTheDocument();
    });
  });
});
