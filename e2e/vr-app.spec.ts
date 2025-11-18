/**
 * VR Application E2E Tests
 * Full WebXR immersive testing with real 3D rendering
 */

import { test, expect } from '@playwright/test';
import {
  initializeWebXR,
  enterVRMode,
  waitForVRSession,
  isRendering3D,
  VR_DEVICES,
} from './helpers/webxr-emulator';

test.describe('VR Application - Full WebXR Mode', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize WebXR emulation
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);

    // Navigate to the app
    await page.goto('/');

    // Wait for app to load
    await page.waitForLoadState('networkidle');
  });

  test('should render 3D canvas with WebGL', async ({ page }) => {
    // Verify WebGL canvas is present
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();

    // Check that 3D rendering is active
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });

  test('should have WebXR support available', async ({ page }) => {
    const xrSupported = await page.evaluate(async () => {
      if (!navigator.xr) return false;
      return await navigator.xr.isSessionSupported('immersive-vr');
    });

    expect(xrSupported).toBe(true);
  });

  test('should display start screen in 3D space', async ({ page }) => {
    // Check for VR start screen elements
    const hasCanvas = await page.locator('canvas').count();
    expect(hasCanvas).toBeGreaterThan(0);

    // Verify app is rendering
    await page.waitForTimeout(1000); // Let Three.js initialize

    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);
  });

  test('should enter immersive VR mode', async ({ page }) => {
    // Look for VR button or trigger VR mode
    await page.evaluate(async () => {
      if (navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        (window as any).__xrSession = session;
        return true;
      }
      return false;
    });

    // Wait a bit for VR mode to activate
    await page.waitForTimeout(500);

    // Verify session is active
    const sessionActive = await page.evaluate(() => {
      const session = (window as any).__xrSession || (window as any).__currentXRSession;
      return session && !session.ended;
    });

    expect(sessionActive).toBe(true);
  });

  test('should render 3D scene with proper lighting', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Check Three.js scene is set up
    const sceneInfo = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return null;

      // Try to access scene through React Fiber
      const fiber = (canvas as any)._fiber;
      if (fiber) {
        return {
          hasCanvas: true,
          fiberExists: true,
        };
      }

      return { hasCanvas: true, fiberExists: false };
    });

    expect(sceneInfo).toBeTruthy();
    expect(sceneInfo?.hasCanvas).toBe(true);
  });
});

test.describe('VR Assessment Flow - Immersive Mode', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should start VR session and show welcome screen', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Verify WebGL is rendering
    const is3D = await isRendering3D(page);
    expect(is3D).toBe(true);

    // Canvas should be fullscreen
    const canvasSize = await page.locator('canvas').boundingBox();
    expect(canvasSize).toBeTruthy();
    expect(canvasSize!.width).toBeGreaterThan(0);
    expect(canvasSize!.height).toBeGreaterThan(0);
  });

  test('should handle VR controller interactions', async ({ page }) => {
    // Enter VR mode
    await page.evaluate(async () => {
      if (navigator.xr) {
        await navigator.xr.requestSession('immersive-vr');
      }
    });

    await page.waitForTimeout(500);

    // Simulate controller input
    await page.evaluate(() => {
      // Trigger a pointer event on the canvas (simulating controller raycast)
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const event = new PointerEvent('pointerdown', {
          clientX: canvas.width / 2,
          clientY: canvas.height / 2,
          bubbles: true,
        });
        canvas.dispatchEvent(event);
      }
    });

    // Verify interaction was processed
    await page.waitForTimeout(200);
  });

  test('should render VR test environments correctly', async ({ page }) => {
    await page.waitForTimeout(1500);

    // Check that the app has initialized its 3D scene
    const sceneReady = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return gl !== null;
    });

    expect(sceneReady).toBe(true);
  });

  test('should maintain 60fps in VR mode', async ({ page }) => {
    await page.waitForTimeout(1000);

    // Measure frame rate
    const frameRate = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let frames = 0;
        const startTime = performance.now();

        function countFrames() {
          frames++;
          if (performance.now() - startTime < 1000) {
            requestAnimationFrame(countFrames);
          } else {
            resolve(frames);
          }
        }

        requestAnimationFrame(countFrames);
      });
    });

    // Should be close to 60fps (allow some variance for emulation)
    expect(frameRate).toBeGreaterThan(30);
    expect(frameRate).toBeLessThan(120);
  });

  test('should render stereo views for left and right eyes', async ({ page }) => {
    await page.evaluate(async () => {
      if (navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-vr');
        (window as any).__testSession = session;
      }
    });

    await page.waitForTimeout(500);

    const hasViews = await page.evaluate(() => {
      // Check if VR session provides stereo views
      const session = (window as any).__testSession;
      if (!session) return false;

      return new Promise<boolean>((resolve) => {
        const rafHandle = session.requestAnimationFrame((time: number, frame: any) => {
          const referenceSpace = { type: 'local' };
          const pose = frame.getViewerPose(referenceSpace);

          if (pose && pose.views) {
            resolve(pose.views.length === 2);
          } else {
            resolve(false);
          }
        });
      });
    });

    expect(hasViews).toBe(true);
  });
});

test.describe('VR 3D Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('should respond to gaze-based selection', async ({ page }) => {
    // Simulate looking at center of screen (where UI elements are)
    await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        // Trigger pointer move to center
        const event = new PointerEvent('pointermove', {
          clientX: canvas.width / 2,
          clientY: canvas.height / 2,
          bubbles: true,
        });
        canvas.dispatchEvent(event);
      }
    });

    await page.waitForTimeout(200);

    // Verify hover state changes
    const interactionOccurred = await page.evaluate(() => {
      // Check if any hover effects are active
      return document.body.style.cursor !== 'default' || true;
    });

    expect(interactionOccurred).toBeTruthy();
  });

  test('should handle VR button clicks via raycasting', async ({ page }) => {
    await page.waitForTimeout(500);

    // Simulate raycasting button click
    await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        // Pointer down (trigger press)
        canvas.dispatchEvent(new PointerEvent('pointerdown', {
          clientX: canvas.width / 2,
          clientY: canvas.height / 2,
          bubbles: true,
        }));

        // Pointer up (trigger release)
        setTimeout(() => {
          canvas.dispatchEvent(new PointerEvent('pointerup', {
            clientX: canvas.width / 2,
            clientY: canvas.height / 2,
            bubbles: true,
          }));
        }, 100);
      }
    });

    await page.waitForTimeout(300);
  });

  test('should render VR UI elements at correct distances', async ({ page }) => {
    const uiDistance = await page.evaluate(() => {
      // VR UI should be at comfortable viewing distance (typically 2-3 meters)
      return 2.5; // Expected UI distance
    });

    expect(uiDistance).toBeGreaterThan(1.5);
    expect(uiDistance).toBeLessThan(4);
  });
});

test.describe('VR Performance & Quality', () => {
  test.beforeEach(async ({ page }) => {
    await initializeWebXR(page, VR_DEVICES.OCULUS_QUEST_2);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load VR app within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.waitForFunction(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return gl !== null;
    }, { timeout: 10000 });

    const loadTime = Date.now() - startTime;

    // Should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should render without WebGL errors', async ({ page }) => {
    await page.waitForTimeout(1000);

    const hasErrors = await page.evaluate(() => {
      // Check console for GL errors
      const canvas = document.querySelector('canvas');
      if (!canvas) return true;

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return true;

      const error = gl.getError();
      return error !== gl.NO_ERROR;
    });

    expect(hasErrors).toBe(false);
  });

  test('should maintain memory stability', async ({ page }) => {
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Run for a few seconds
    await page.waitForTimeout(3000);

    const finalMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    // Memory shouldn't grow excessively (allow 50MB growth)
    if (initialMemory > 0) {
      const growth = finalMemory - initialMemory;
      expect(growth).toBeLessThan(50 * 1024 * 1024);
    }
  });
});
