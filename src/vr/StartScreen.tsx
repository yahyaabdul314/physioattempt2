/**
 * VR Start Screen
 * Initial interface with button to begin assessment
 */

import { Text } from '@react-three/drei';
import { VRButton } from './VRButton';
import { useAssessmentStore } from '../store/assessmentStore';

export function StartScreen() {
  const startAssessment = useAssessmentStore((state) => state.startAssessment);

  const handleStartTests = () => {
    // For demo purposes, using a default patient ID
    // In production, this would come from authentication/patient selection
    startAssessment(`patient-${Date.now()}`);
  };

  return (
    <group>
      {/* Title */}
      <Text
        position={[0, 1.8, -2]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        VR Concussion Recovery Platform
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 1.6, -2]}
        fontSize={0.06}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        Evidence-Based Assessment & Rehabilitation
      </Text>

      {/* Description */}
      <Text
        position={[0, 1.3, -2]}
        fontSize={0.045}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        This platform implements VOMS (Vestibular/Ocular Motor Screening)
        and other validated assessment protocols for concussion recovery.
      </Text>

      {/* Available Tests Info */}
      <Text
        position={[0, 1.05, -2]}
        fontSize={0.04}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        Tests: Smooth Pursuits • Saccades • VOR • Convergence
      </Text>

      {/* Start Button */}
      <VRButton
        position={[0, 0.7, -2]}
        onClick={handleStartTests}
        text="START TESTS"
        scale={1.5}
      />

      {/* Instructions */}
      <Text
        position={[0, 0.4, -2]}
        fontSize={0.035}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        Click the button or point your controller and pull the trigger
      </Text>

      {/* Clinical Note */}
      <Text
        position={[0, 0.1, -2]}
        fontSize={0.03}
        color="#555555"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        For use by qualified healthcare professionals.
        Grounded in clinical research (VOMS, King-Devick, VR therapy RCTs).
      </Text>

      {/* Floor reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
