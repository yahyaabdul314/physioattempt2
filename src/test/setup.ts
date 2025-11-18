import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock @react-three/fiber
vi.mock('@react-three/fiber', async () => {
  const actual = await vi.importActual('@react-three/fiber');
  return {
    ...actual,
    useFrame: vi.fn((callback) => {
      // Store callback for manual triggering in tests
      (globalThis as any).__useFrameCallback = callback;
      return null;
    }),
    useThree: vi.fn(() => ({
      camera: { position: { x: 0, y: 0, z: 5 } },
      scene: {},
      gl: { domElement: document.createElement('canvas') },
    })),
  };
});

// Mock @react-three/xr
vi.mock('@react-three/xr', () => ({
  XR: ({ children }: any) => children,
  Controllers: () => null,
  Hands: () => null,
  useXR: vi.fn(() => ({
    isPresenting: false,
    session: null,
  })),
  useController: vi.fn(() => null),
  createXRStore: vi.fn(() => ({
    getState: () => ({ session: null, isPresenting: false }),
    subscribe: vi.fn(),
  })),
}));

// Mock @react-three/drei
vi.mock('@react-three/drei', async () => {
  const React = await import('react');
  return {
    Text: ({ children, ...props }: any) =>
      React.createElement('div', { 'data-testid': 'drei-text', ...props }, children),
    OrbitControls: () => null,
    useGLTF: vi.fn(() => ({ scene: {}, nodes: {}, materials: {} })),
  };
});

// Mock Three.js mesh for refs
(globalThis as any).mockThreeMesh = () => ({
  position: {
    set: vi.fn(),
    x: 0,
    y: 0,
    z: 0,
  },
  rotation: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
});

// Mock requestAnimationFrame for testing
(globalThis as any).requestAnimationFrame = vi.fn((callback: (time: number) => void) => {
  callback(0);
  return 0;
});

(globalThis as any).cancelAnimationFrame = vi.fn();
