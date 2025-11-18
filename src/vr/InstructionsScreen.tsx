/**
 * VOMS Instructions Screen
 * Explains assessment procedure before starting
 */

import { Text } from '@react-three/drei';
import { VRButton } from './VRButton';
import { useAssessmentStore } from '../store/assessmentStore';

export function InstructionsScreen() {
  const startTest = useAssessmentStore((state) => state.startTest);

  const handleBeginTest = () => {
    startTest('smoothPursuits');
  };

  return (
    <group>
      {/* Title */}
      <Text
        position={[0, 1.9, -2.5]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        VOMS Assessment Instructions
      </Text>

      {/* Instructions Panel */}
      <mesh position={[0, 1.2, -2.5]}>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial color="#222222" opacity={0.9} transparent />
      </mesh>

      <Text
        position={[0, 1.7, -2.48]}
        fontSize={0.05}
        color="#ffaa00"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        Before We Begin
      </Text>

      <Text
        position={[0, 1.5, -2.48]}
        fontSize={0.04}
        color="#dddddd"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="left"
        lineHeight={1.4}
      >
        {`You will perform the following tests:

1. Smooth Pursuits - Follow a moving target
2. Saccades - Look between two targets quickly
3. VOR - Track target while moving your head

After each test, you'll rate any symptoms:
• Headache
• Dizziness
• Nausea
• Mental Fogginess

Rate symptoms 0-10 (0 = none, 10 = severe)`}
      </Text>

      {/* Important Note */}
      <mesh position={[0, 0.5, -2.5]}>
        <planeGeometry args={[2.2, 0.35]} />
        <meshStandardMaterial color="#443300" opacity={0.9} transparent />
      </mesh>

      <Text
        position={[0, 0.55, -2.48]}
        fontSize={0.035}
        color="#ffcc66"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        Important: Stop immediately if symptoms become severe
      </Text>

      {/* Begin Button */}
      <VRButton
        position={[0, 0.15, -2.5]}
        onClick={handleBeginTest}
        text="BEGIN ASSESSMENT"
        scale={1.3}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
