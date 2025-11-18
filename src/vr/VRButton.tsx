/**
 * Interactive VR Button Component
 * Uses raycasting for VR controller interaction
 */

import { useState } from 'react';
import { Text } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';

interface VRButtonProps {
  position: [number, number, number];
  onClick: () => void;
  text: string;
  scale?: number;
  disabled?: boolean;
}

export function VRButton({
  position,
  onClick,
  text,
  scale = 1,
  disabled = false
}: VRButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!disabled) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!disabled) {
      onClick();
    }
  };

  const buttonColor = disabled ? '#666666' : (hovered ? '#4444ff' : '#2222cc');
  const textColor = disabled ? '#999999' : '#ffffff';

  return (
    <group position={position}>
      {/* Button background */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[0.4 * scale, 0.15 * scale, 0.05]} />
        <meshStandardMaterial
          color={buttonColor}
          emissive={buttonColor}
          emissiveIntensity={hovered && !disabled ? 0.3 : 0.1}
        />
      </mesh>

      {/* Button text */}
      <Text
        position={[0, 0, 0.026]}
        fontSize={0.06 * scale}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}
