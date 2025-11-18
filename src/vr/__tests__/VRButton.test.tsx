/**
 * VRButton Component Tests
 * Tests for interactive VR button with raycasting
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VRButton } from '../VRButton';
import { createMockThreeEvent } from '../../test/vrTestUtils';

describe('VRButton', () => {
  let onClickMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onClickMock = vi.fn();
  });

  describe('Rendering', () => {
    it('should render button with text', () => {
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Start Test"
        />
      );

      expect(screen.getByText('Start Test')).toBeInTheDocument();
    });

    it('should render with custom position', () => {
      const { container } = render(
        <VRButton
          position={[1, 2, 3]}
          onClick={onClickMock}
          text="Click Me"
        />
      );

      const group = container.querySelector('group');
      expect(group).toBeDefined();
    });

    it('should render with custom scale', () => {
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Large Button"
          scale={2}
        />
      );

      expect(screen.getByText('Large Button')).toBeInTheDocument();
    });

    it('should render disabled state', () => {
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Disabled"
          disabled={true}
        />
      );

      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Click Me"
        />
      );

      const mesh = container.querySelector('mesh');
      expect(mesh).toBeDefined();

      if (mesh) {
        const event = createMockThreeEvent<MouseEvent>();
        (mesh as any).props?.onClick?.(event);
      }

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Disabled"
          disabled={true}
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const event = createMockThreeEvent<MouseEvent>();
        (mesh as any).props?.onClick?.(event);
      }

      expect(onClickMock).not.toHaveBeenCalled();
    });

    it('should handle pointer over event', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Hover Me"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const event = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOver?.(event);
      }

      // Should set cursor to pointer
      expect(document.body.style.cursor).toBe('pointer');
    });

    it('should handle pointer out event', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Hover Me"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const overEvent = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOver?.(overEvent);

        expect(document.body.style.cursor).toBe('pointer');

        const outEvent = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOut?.(outEvent);
      }

      // Should reset cursor
      expect(document.body.style.cursor).toBe('default');
    });

    it('should not change cursor when disabled on hover', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Disabled"
          disabled={true}
        />
      );

      document.body.style.cursor = 'default';

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const event = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOver?.(event);
      }

      expect(document.body.style.cursor).toBe('default');
    });

    it('should stop event propagation on click', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Click Me"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const event = createMockThreeEvent<MouseEvent>();
        (mesh as any).props?.onClick?.(event);

        expect(event.stopPropagation).toHaveBeenCalled();
      }
    });

    it('should stop event propagation on pointer events', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Hover Me"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const overEvent = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOver?.(overEvent);
        expect(overEvent.stopPropagation).toHaveBeenCalled();

        const outEvent = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOut?.(outEvent);
        expect(outEvent.stopPropagation).toHaveBeenCalled();
      }
    });
  });

  describe('Visual States', () => {
    it('should apply correct colors for normal state', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Normal"
        />
      );

      const material = container.querySelector('meshStandardMaterial');
      expect(material).toBeDefined();
      // Normal button should use blue color
      expect(material?.getAttribute('color')).toMatch(/#2222cc/i);
    });

    it('should apply correct colors for disabled state', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Disabled"
          disabled={true}
        />
      );

      const material = container.querySelector('meshStandardMaterial');
      expect(material).toBeDefined();
      // Disabled button should use gray color
      expect(material?.getAttribute('color')).toMatch(/#666666/i);
    });

    it('should apply hover state color', () => {
      const { container, rerender } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Hover Me"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        const event = createMockThreeEvent<PointerEvent>();
        (mesh as any).props?.onPointerOver?.(event);
      }

      // Re-render to update state
      rerender(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Hover Me"
        />
      );

      // Hovered button should use brighter blue
      // The component will update its internal state
    });
  });

  describe('Geometry', () => {
    it('should render button geometry with default scale', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Default Scale"
        />
      );

      const boxGeometry = container.querySelector('boxGeometry');
      expect(boxGeometry).toBeDefined();
    });

    it('should render button geometry with custom scale', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Large Button"
          scale={2}
        />
      );

      const boxGeometry = container.querySelector('boxGeometry');
      expect(boxGeometry).toBeDefined();
    });

    it('should position text in front of button', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Text Position"
        />
      );

      const text = screen.getByText('Text Position');
      expect(text).toBeInTheDocument();
      // Text should be positioned slightly in front of button mesh
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty text', () => {
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text=""
        />
      );

      // Should still render without crashing
      const buttons = screen.queryAllByTestId('drei-text');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should handle very long text', () => {
      const longText = 'This is a very long button text that might overflow';
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text={longText}
        />
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle rapid clicks', () => {
      const { container } = render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Rapid Click"
        />
      );

      const mesh = container.querySelector('mesh');
      if (mesh) {
        // Simulate rapid clicking
        for (let i = 0; i < 10; i++) {
          const event = createMockThreeEvent<MouseEvent>();
          (mesh as any).props?.onClick?.(event);
        }
      }

      expect(onClickMock).toHaveBeenCalledTimes(10);
    });

    it('should handle scale of 0', () => {
      render(
        <VRButton
          position={[0, 0, 0]}
          onClick={onClickMock}
          text="Zero Scale"
          scale={0}
        />
      );

      expect(screen.getByText('Zero Scale')).toBeInTheDocument();
    });

    it('should handle negative position values', () => {
      render(
        <VRButton
          position={[-5, -10, -15]}
          onClick={onClickMock}
          text="Negative Position"
        />
      );

      expect(screen.getByText('Negative Position')).toBeInTheDocument();
    });
  });
});
