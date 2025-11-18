/**
 * VOMS Saccades Test
 *
 * Evidence base:
 * - Tests rapid eye movements between targets
 * - Research: Intersaccadic intervals 13% longer in concussed individuals
 * - Horizontal and vertical components
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { VRButton } from '../VRButton';
import { useAssessmentStore } from '../../store/assessmentStore';
import * as THREE from 'three';

export function SaccadesTest() {
  const leftTargetRef = useRef<THREE.Mesh>(null);
  const rightTargetRef = useRef<THREE.Mesh>(null);
  const [activeTarget, setActiveTarget] = useState<'left' | 'right'>('left');
  const [switchCount, setSwitchCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState<'horizontal' | 'vertical' | 'complete'>('horizontal');
  const completeTest = useAssessmentStore((state) => state.completeTest);

  const maxSwitches = 20; // 10 cycles per direction

  useFrame((_state, delta) => {
    setElapsed((prev) => prev + delta);

    // Auto-switch targets every 1 second for saccadic movement
    if (Math.floor(elapsed) % 1 === 0 && elapsed > 0) {
      if (switchCount < maxSwitches) {
        setActiveTarget((prev) => prev === 'left' ? 'right' : 'left');
        setSwitchCount((prev) => prev + 1);
      } else if (phase === 'horizontal') {
        setPhase('vertical');
        setSwitchCount(0);
        setElapsed(0);
      } else if (phase === 'vertical') {
        setPhase('complete');
      }
    }
  });

  const handleComplete = () => {
    completeTest();
  };

  // Position targets based on phase
  const getTargetPositions = (): { left: [number, number, number], right: [number, number, number] } => {
    const baseZ = -2;
    const separation = 0.6;

    if (phase === 'horizontal') {
      return {
        left: [-separation, 1.6, baseZ],
        right: [separation, 1.6, baseZ],
      };
    } else {
      return {
        left: [0, 1.6 - separation, baseZ],
        right: [0, 1.6 + separation, baseZ],
      };
    }
  };

  const positions = getTargetPositions();

  return (
    <group>
      {/* Instructions */}
      <Text
        position={[0, 2.1, -2]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Saccades Test
      </Text>

      <Text
        position={[0, 1.95, -2]}
        fontSize={0.045}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        Look quickly between the highlighted targets.
        Keep your head still.
      </Text>

      {/* Phase indicator */}
      <Text
        position={[0, 1.15, -2]}
        fontSize={0.04}
        color="#88aaff"
        anchorX="center"
        anchorY="middle"
      >
        {phase === 'complete' ? 'Complete!' : `Direction: ${phase}`}
      </Text>

      {/* Left/Top target */}
      <mesh
        ref={leftTargetRef}
        position={positions.left}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={activeTarget === 'left' ? '#00ff00' : '#004400'}
          emissive={activeTarget === 'left' ? '#00ff00' : '#002200'}
          emissiveIntensity={activeTarget === 'left' ? 0.8 : 0.2}
        />
      </mesh>

      {/* Right/Bottom target */}
      <mesh
        ref={rightTargetRef}
        position={positions.right}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={activeTarget === 'right' ? '#00ff00' : '#004400'}
          emissive={activeTarget === 'right' ? '#00ff00' : '#002200'}
          emissiveIntensity={activeTarget === 'right' ? 0.8 : 0.2}
        />
      </mesh>

      {/* Progress indicator */}
      <Text
        position={[0, 0.9, -2]}
        fontSize={0.035}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        Switches: {switchCount} / {maxSwitches}
      </Text>

      {/* Complete button */}
      {phase === 'complete' && (
        <>
          <Text
            position={[0, 0.7, -2]}
            fontSize={0.04}
            color="#66ff66"
            anchorX="center"
            anchorY="middle"
          >
            Test complete! Click below to rate symptoms.
          </Text>
          <VRButton
            position={[0, 0.45, -2]}
            onClick={handleComplete}
            text="RATE SYMPTOMS"
            scale={1.2}
          />
        </>
      )}

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
