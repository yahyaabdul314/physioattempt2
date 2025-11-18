/**
 * VOMS Smooth Pursuits Test
 *
 * Evidence base:
 * - Tests ability to track slowly moving objects
 * - Impairment indicates central vestibular or oculomotor dysfunction
 * - Target moves in horizontal, vertical, and diagonal patterns
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { VRButton } from '../VRButton';
import { useAssessmentStore } from '../../store/assessmentStore';
import * as THREE from 'three';

export function SmoothPursuitsTest() {
  const targetRef = useRef<THREE.Mesh>(null);
  const [phase, setPhase] = useState<'horizontal' | 'vertical' | 'diagonal' | 'complete'>('horizontal');
  const [elapsed, setElapsed] = useState(0);
  const completeTest = useAssessmentStore((state) => state.completeTest);

  useFrame((_state, delta) => {
    if (!targetRef.current) return;

    setElapsed((prev) => prev + delta);
    const time = elapsed;

    // Target movement based on phase
    const baseZ = -2;
    const amplitude = 0.4;
    const speed = 0.5; // Slow movement for smooth pursuit

    switch (phase) {
      case 'horizontal':
        targetRef.current.position.set(
          Math.sin(time * speed) * amplitude,
          1.6,
          baseZ
        );
        if (time > 8) {
          setPhase('vertical');
          setElapsed(0);
        }
        break;

      case 'vertical':
        targetRef.current.position.set(
          0,
          1.6 + Math.sin(time * speed) * amplitude,
          baseZ
        );
        if (time > 8) {
          setPhase('diagonal');
          setElapsed(0);
        }
        break;

      case 'diagonal':
        targetRef.current.position.set(
          Math.sin(time * speed) * amplitude,
          1.6 + Math.cos(time * speed) * amplitude,
          baseZ
        );
        if (time > 8) {
          setPhase('complete');
        }
        break;

      case 'complete':
        targetRef.current.position.set(0, 1.6, baseZ);
        break;
    }
  });

  const handleComplete = () => {
    completeTest();
  };

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
        Smooth Pursuits Test
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
        Follow the target smoothly with your eyes.
        Keep your head still.
      </Text>

      {/* Phase indicator */}
      <Text
        position={[0, 1.1, -2]}
        fontSize={0.04}
        color="#88aaff"
        anchorX="center"
        anchorY="middle"
      >
        {phase === 'complete' ? 'Complete!' : `Phase: ${phase}`}
      </Text>

      {/* Moving target */}
      <mesh ref={targetRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Crosshair reference (optional) */}
      <mesh position={[0, 1.6, -2.01]}>
        <ringGeometry args={[0.02, 0.025, 16]} />
        <meshBasicMaterial color="#444444" />
      </mesh>

      {/* Complete button (only shown when done) */}
      {phase === 'complete' && (
        <>
          <Text
            position={[0, 0.85, -2]}
            fontSize={0.04}
            color="#66ff66"
            anchorX="center"
            anchorY="middle"
          >
            Test complete! Click below to rate symptoms.
          </Text>
          <VRButton
            position={[0, 0.6, -2]}
            onClick={handleComplete}
            text="RATE SYMPTOMS"
            scale={1.2}
          />
        </>
      )}

      {/* Timer display */}
      <Text
        position={[0, 0.3, -2]}
        fontSize={0.035}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Time: {Math.floor(elapsed)}s
      </Text>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
