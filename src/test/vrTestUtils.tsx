/**
 * VR Test Utilities
 * Mocks and helpers for testing Three.js and WebXR components
 */

import { ReactNode } from 'react';
import { vi } from 'vitest';

// Mock Three.js objects
export const createMockThreeEvent = <T extends Event>(
  nativeEvent: Partial<T> = {}
): any => ({
  ...nativeEvent,
  stopPropagation: vi.fn(),
  preventDefault: vi.fn(),
  nativeEvent: nativeEvent as T,
  delta: 0,
  unprojectedPoint: { x: 0, y: 0, z: 0 },
  ray: { origin: { x: 0, y: 0, z: 0 }, direction: { x: 0, y: 0, z: 1 } },
  camera: {},
  intersections: [],
  point: { x: 0, y: 0, z: 0 },
  distance: 1,
  object: {},
});

// Mock useFrame hook
export const mockUseFrame = vi.fn();

// Mock Canvas wrapper for testing
export const MockCanvas = ({ children }: { children: ReactNode }) => {
  return <div data-testid="mock-canvas">{children}</div>;
};

// Mock XR context
export const mockXRStore = {
  getState: () => ({
    session: null,
    isPresenting: false,
    isHandTracking: false,
    controllers: [],
  }),
  subscribe: vi.fn(),
};

// Mock Text component from drei
export const MockText = ({ children, ...props }: any) => {
  return <div data-testid="mock-text" {...props}>{children}</div>;
};

// Mock mesh and geometry components
export const MockMesh = ({ children, ...props }: any) => {
  return <div data-testid="mock-mesh" {...props}>{children}</div>;
};

// Helper to render VR components in test environment
export const renderInVR = (component: ReactNode) => {
  return component;
};

// Helper to simulate VR controller interaction
export const simulateVRClick = (element: HTMLElement) => {
  const event = createMockThreeEvent<MouseEvent>({
    clientX: 0,
    clientY: 0,
    button: 0,
  } as any);

  const clickHandler = (element as any).onClick;
  if (clickHandler) {
    clickHandler(event);
  }
};

// Helper to simulate pointer hover
export const simulateVRHover = (element: HTMLElement, isHovering: boolean) => {
  const event = createMockThreeEvent<PointerEvent>({
    clientX: 0,
    clientY: 0,
  } as any);

  const handler = isHovering
    ? (element as any).onPointerOver
    : (element as any).onPointerOut;

  if (handler) {
    handler(event);
  }
};

// Mock animation frame
export const mockAnimationFrame = (callback: (delta: number) => void, duration: number = 1000) => {
  const steps = Math.floor(duration / 16); // ~60fps
  for (let i = 0; i < steps; i++) {
    callback(0.016); // 16ms per frame
  }
};

// Helper to get store state snapshot
export const getStoreSnapshot = (store: any) => {
  return JSON.parse(JSON.stringify(store.getState()));
};
