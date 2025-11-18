/**
 * WebXR Emulator Utilities
 * Injects WebXR Device API for E2E testing
 */

import { Page } from '@playwright/test';

export interface VRDevice {
  name: string;
  hasControllers: boolean;
  hasHandTracking: boolean;
}

export const VR_DEVICES = {
  OCULUS_QUEST_2: {
    name: 'Oculus Quest 2',
    hasControllers: true,
    hasHandTracking: true,
  },
  VALVE_INDEX: {
    name: 'Valve Index',
    hasControllers: true,
    hasHandTracking: false,
  },
  HTC_VIVE: {
    name: 'HTC Vive',
    hasControllers: true,
    hasHandTracking: false,
  },
} as const;

/**
 * Initialize WebXR emulation on the page
 */
export async function initializeWebXR(page: Page, device: VRDevice = VR_DEVICES.OCULUS_QUEST_2) {
  await page.addInitScript((deviceConfig) => {
    // Polyfill WebXR if not available
    if (!('xr' in navigator)) {
      console.log('[WebXR Emulator] Injecting XR polyfill...');

      // Mock XRSystem
      class XRSystemMock {
        async isSessionSupported(mode: string): Promise<boolean> {
          return mode === 'immersive-vr' || mode === 'inline';
        }

        async requestSession(mode: string, options?: any): Promise<any> {
          console.log(`[WebXR Emulator] Requesting ${mode} session`);

          if (mode !== 'immersive-vr' && mode !== 'inline') {
            throw new Error('Unsupported XR mode');
          }

          // Create mock XR session
          const session = new XRSessionMock(mode, deviceConfig);
          (window as any).__currentXRSession = session;

          return session;
        }
      }

      // Mock XRSession
      class XRSessionMock extends EventTarget {
        renderState: any;
        inputSources: any[] = [];
        mode: string;
        ended = false;

        constructor(mode: string, deviceConfig: any) {
          super();
          this.mode = mode;
          this.renderState = {
            baseLayer: null,
            depthNear: 0.1,
            depthFar: 1000,
          };

          console.log(`[WebXR Emulator] Created ${mode} session with ${deviceConfig.name}`);
        }

        async requestReferenceSpace(type: string) {
          console.log(`[WebXR Emulator] Requesting reference space: ${type}`);
          return new XRReferenceSpaceMock(type);
        }

        updateRenderState(state: any) {
          this.renderState = { ...this.renderState, ...state };
        }

        requestAnimationFrame(callback: (time: number, frame: any) => void): number {
          const rafId = requestAnimationFrame((time) => {
            if (!this.ended) {
              const frame = new XRFrameMock(this);
              callback(time, frame);
            }
          });
          return rafId;
        }

        cancelAnimationFrame(handle: number) {
          cancelAnimationFrame(handle);
        }

        async end() {
          this.ended = true;
          this.dispatchEvent(new Event('end'));
          console.log('[WebXR Emulator] Session ended');
        }
      }

      // Mock XRFrame
      class XRFrameMock {
        session: any;

        constructor(session: any) {
          this.session = session;
        }

        getViewerPose(referenceSpace: any) {
          // Return a basic viewer pose for testing
          return {
            transform: {
              position: { x: 0, y: 1.6, z: 0 },
              orientation: { x: 0, y: 0, z: 0, w: 1 },
              matrix: new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 1.6, 0, 1
              ]),
            },
            views: [
              {
                eye: 'left',
                projectionMatrix: new Float32Array(16).fill(0),
                transform: {
                  position: { x: -0.032, y: 1.6, z: 0 },
                  orientation: { x: 0, y: 0, z: 0, w: 1 },
                  matrix: new Float32Array(16),
                },
              },
              {
                eye: 'right',
                projectionMatrix: new Float32Array(16).fill(0),
                transform: {
                  position: { x: 0.032, y: 1.6, z: 0 },
                  orientation: { x: 0, y: 0, z: 0, w: 1 },
                  matrix: new Float32Array(16),
                },
              },
            ],
          };
        }

        getPose(space: any, baseSpace: any) {
          return {
            transform: {
              position: { x: 0, y: 0, z: 0 },
              orientation: { x: 0, y: 0, z: 0, w: 1 },
              matrix: new Float32Array(16),
            },
          };
        }
      }

      // Mock XRReferenceSpace
      class XRReferenceSpaceMock extends EventTarget {
        type: string;

        constructor(type: string) {
          super();
          this.type = type;
        }

        getOffsetReferenceSpace(transform: any) {
          return new XRReferenceSpaceMock(this.type);
        }
      }

      // Inject XR into navigator
      Object.defineProperty(navigator, 'xr', {
        value: new XRSystemMock(),
        configurable: true,
        writable: true,
      });

      console.log('[WebXR Emulator] WebXR API injected successfully');
    }
  }, device);
}

/**
 * Enter VR mode
 */
export async function enterVRMode(page: Page): Promise<void> {
  await page.evaluate(() => {
    const vrButton = document.querySelector('button[aria-label*="VR"]');
    if (vrButton) {
      (vrButton as HTMLButtonElement).click();
    } else {
      // Trigger VR session programmatically
      if (navigator.xr) {
        navigator.xr.requestSession('immersive-vr').then((session) => {
          console.log('[WebXR Emulator] VR session started');
        });
      }
    }
  });
}

/**
 * Wait for VR session to be active
 */
export async function waitForVRSession(page: Page, timeout = 5000): Promise<void> {
  await page.waitForFunction(
    () => {
      return (window as any).__currentXRSession !== undefined;
    },
    { timeout }
  );
}

/**
 * Simulate VR controller input
 */
export async function simulateControllerInput(
  page: Page,
  button: 'trigger' | 'grip' | 'thumbstick' | 'a' | 'b'
): Promise<void> {
  await page.evaluate((btn) => {
    console.log(`[WebXR Emulator] Simulating ${btn} press`);
    // Emit controller input event
    const session = (window as any).__currentXRSession;
    if (session) {
      const event = new Event('inputsourceschange');
      session.dispatchEvent(event);
    }
  }, button);
}

/**
 * Check if page is rendering in 3D
 */
export async function isRendering3D(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    const canvases = document.querySelectorAll('canvas');
    if (canvases.length === 0) return false;

    // Check if WebGL context exists
    for (const canvas of canvases) {
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      if (gl) {
        return true;
      }
    }
    return false;
  });
}

/**
 * Get Three.js scene info
 */
export async function getSceneInfo(page: Page): Promise<{
  objects: number;
  lights: number;
  cameras: number;
}> {
  return await page.evaluate(() => {
    // Access Three.js scene if available
    const scene = (window as any).__THREE_SCENE;
    if (!scene) {
      return { objects: 0, lights: 0, cameras: 0 };
    }

    let objects = 0;
    let lights = 0;
    let cameras = 0;

    scene.traverse((child: any) => {
      objects++;
      if (child.isLight) lights++;
      if (child.isCamera) cameras++;
    });

    return { objects, lights, cameras };
  });
}

/**
 * Take VR screenshot (captures canvas)
 */
export async function takeVRScreenshot(page: Page, name: string): Promise<void> {
  const canvas = await page.locator('canvas').first();
  await canvas.screenshot({ path: `e2e/screenshots/${name}.png` });
}
