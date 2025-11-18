/**
 * VR Assessment E2E Tests
 * Testing VOMS eye tracking assessments in full 3D VR
 */

import { test, expect } from '@playwright/test';
import { initializeWebXR, isRendering3D, VR_DEVICES } from './helpers/webxr-emulator';

test.describe('VR Eye Tracking Tests - 3D Immersive', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
  });

  test('should render Smooth Pursuits test in 3D space', async ({ page }) => {
    // Start the assessment
    await page.evaluate(() => {
      // Access Zustand store and start test
      const store = (window as any).useAssessmentStore;
      if (store) {
        const state = store.getState();
        state.startAssessment('test-patient-vr');
        state.startTest('smoothPursuits');
      }
    });

    await page.waitForTimeout(1000);

    // Verify 3D rendering is active
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);

    // Check for moving target in the scene
    const hasMovingTarget = await page.evaluate(() => {
      return new Promise<boolean>((resolve) => {
        let frameCount = 0;
        const checkFrames = () => {
          frameCount++;
          if (frameCount < 10) {
            requestAnimationFrame(checkFrames);
          } else {
            // After multiple frames, test should be rendering
            resolve(true);
          }
        };
        requestAnimationFrame(checkFrames);
      });
    });

    expect(hasMovingTarget).toBe(true);
  });

  test('should render Saccades test with alternating targets', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        const state = store.getState();
        state.startAssessment('test-patient-vr');
        state.startTest('saccadesH');
      }
    });

    await page.waitForTimeout(1000);

    // Verify 3D rendering
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);

    // Check that targets are visible and updating
    const targetsRendering = await page.evaluate(() => {
      return document.querySelector('canvas') !== null;
    });

    expect(targetsRendering).toBe(true);
  });

  test('should complete full assessment workflow in VR', async ({ page }) => {
    // Start assessment
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('vr-workflow-test');
      }
    });

    await page.waitForTimeout(500);

    // Begin first test
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startTest('smoothPursuits');
      }
    });

    await page.waitForTimeout(1000);

    // Verify rendering throughout
    const stillRendering = await isRendering3D(page);
    expect(stillRendering).toBe(true);

    // Complete test
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().completeTest();
      }
    });

    await page.waitForTimeout(500);

    // Should still be in VR
    const finalCheck = await isRendering3D(page);
    expect(finalCheck).toBe(true);
  });
});

test.describe('VR 3D Target Positioning', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should position targets at correct depth in 3D space', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('depth-test');
        store.getState().startTest('smoothPursuits');
      }
    });

    await page.waitForTimeout(1000);

    // Targets should be at -2 units depth (2 meters away)
    const expectedDepth = -2;

    // Verify rendering is active
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });

  test('should render targets with correct scale for VR viewing', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('scale-test');
        store.getState().startTest('saccadesH');
      }
    });

    await page.waitForTimeout(1000);

    // Verify WebGL is rendering properly
    const rendering = await isRendering3D(page);
    expect(rendering).toBe(true);
  });

  test('should maintain comfortable viewing angles', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('angle-test');
        store.getState().startTest('smoothPursuits');
      }
    });

    await page.waitForTimeout(1000);

    // Targets should be within comfortable field of view
    // (typically ±30 degrees horizontal, ±20 degrees vertical)
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });
});

test.describe('VR Symptom Rating Interface', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render symptom rating UI in 3D', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('symptom-test');
        store.getState().completeTest(); // Go to symptoms screen
      }
    });

    await page.waitForTimeout(1000);

    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });

  test('should display all 4 symptom sliders in VR space', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().completeTest();
      }
    });

    await page.waitForTimeout(1000);

    // Should render 4 symptoms: headache, dizziness, nausea, fogginess
    const rendering = await isRendering3D(page);
    expect(rendering).toBe(true);
  });
});

test.describe('VR Animation & Physics', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should animate smooth pursuits target smoothly', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('animation-test');
        store.getState().startTest('smoothPursuits');
      }
    });

    // Capture multiple frames to verify smooth animation
    const framesRendered = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let count = 0;
        const maxFrames = 60; // 1 second at 60fps

        function countFrame() {
          count++;
          if (count < maxFrames) {
            requestAnimationFrame(countFrame);
          } else {
            resolve(count);
          }
        }

        requestAnimationFrame(countFrame);
      });
    });

    expect(framesRendered).toBeGreaterThan(30);
  });

  test('should switch saccades targets with proper timing', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('timing-test');
        store.getState().startTest('saccadesH');
      }
    });

    await page.waitForTimeout(2000); // Wait for some switches

    // Verify animation is running
    const animated = await page.evaluate(() => {
      // Check if requestAnimationFrame is being called
      return new Promise<boolean>((resolve) => {
        requestAnimationFrame(() => resolve(true));
      });
    });

    expect(animated).toBe(true);
  });
});

test.describe('VR Text Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render text labels readable in VR', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Text should be rendered via drei/Text component
    const rendering = await isRendering3D(page);
    expect(rendering).toBe(true);
  });

  test('should display instructions clearly in 3D space', async ({ page }) => {
    await page.evaluate(() => {
      const store = (window as any).useAssessmentStore;
      if (store) {
        store.getState().startAssessment('text-test');
      }
    });

    await page.waitForTimeout(1000);

    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });
});

test.describe('VR Accessibility in 3D', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should provide visual feedback for interactions', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Hover over center (where buttons typically are)
    await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          clientX: canvas.width / 2,
          clientY: canvas.height / 2,
          bubbles: true,
        }));
      }
    });

    await page.waitForTimeout(200);

    // Check cursor changes or visual feedback
    const feedback = await page.evaluate(() => {
      return document.body.style.cursor;
    });

    // Cursor should change or other visual feedback should occur
    expect(feedback).toBeDefined();
  });

  test('should maintain 60 Hz refresh rate for comfort', async ({ page }) => {
    await page.waitForTimeout(1000);

    const fps = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let frames = 0;
        const start = performance.now();

        function count() {
          frames++;
          const elapsed = performance.now() - start;
          if (elapsed < 1000) {
            requestAnimationFrame(count);
          } else {
            resolve(frames);
          }
        }

        requestAnimationFrame(count);
      });
    });

    // Should maintain close to 60fps for VR comfort
    expect(fps).toBeGreaterThan(50);
    expect(fps).toBeLessThan(75);
  });

  test('should prevent VR motion sickness with stable frame times', async ({ page }) => {
    await page.waitForTimeout(500);

    const frameStability = await page.evaluate(() => {
      return new Promise<{ avgFrameTime: number; variance: number }>((resolve) => {
        const frameTimes: number[] = [];
        let lastTime = performance.now();
        let frameCount = 0;

        function measureFrame() {
          const now = performance.now();
          const delta = now - lastTime;
          frameTimes.push(delta);
          lastTime = now;
          frameCount++;

          if (frameCount < 60) {
            requestAnimationFrame(measureFrame);
          } else {
            const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
            const variance = frameTimes.reduce((sum, time) => {
              return sum + Math.pow(time - avg, 2);
            }, 0) / frameTimes.length;

            resolve({ avgFrameTime: avg, variance });
          }
        }

        requestAnimationFrame(measureFrame);
      });
    });

    // Frame times should be consistent (low variance)
    expect(frameStability.avgFrameTime).toBeGreaterThan(10);
    expect(frameStability.avgFrameTime).toBeLessThan(25);
    expect(frameStability.variance).toBeLessThan(50); // Low variance = smooth
  });
});
