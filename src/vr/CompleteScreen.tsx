/**
 * Assessment Complete Screen
 * Shows summary and allows restart
 */

import { Text } from '@react-three/drei';
import { VRButton } from './VRButton';
import { useAssessmentStore } from '../store/assessmentStore';

export function CompleteScreen() {
  const reset = useAssessmentStore((state) => state.reset);
  const currentSymptoms = useAssessmentStore((state) => state.currentSymptoms);

  const totalSymptoms = currentSymptoms.reduce((sum, s) => sum + s.score, 0);

  const handleRestart = () => {
    reset();
  };

  return (
    <group>
      {/* Title */}
      <Text
        position={[0, 2.1, -2.5]}
        fontSize={0.1}
        color="#66ff66"
        anchorX="center"
        anchorY="middle"
      >
        Assessment Complete
      </Text>

      {/* Summary panel */}
      <mesh position={[0, 1.3, -2.5]}>
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial color="#222222" opacity={0.9} transparent />
      </mesh>

      <Text
        position={[0, 1.75, -2.48]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Summary
      </Text>

      <Text
        position={[0, 1.55, -2.48]}
        fontSize={0.045}
        color="#dddddd"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
        lineHeight={1.5}
      >
        {`Tests Completed:
• Smooth Pursuits
• Saccades (Horizontal)

Final Symptom Score: ${totalSymptoms}/40

Symptoms Breakdown:`}
      </Text>

      {/* Individual symptoms */}
      {currentSymptoms.map((symptom, index) => (
        <Text
          key={symptom.type}
          position={[0, 1.05 - index * 0.12, -2.48]}
          fontSize={0.04}
          color={symptom.score > 5 ? '#ff6666' : symptom.score > 2 ? '#ffaa66' : '#66ff66'}
          anchorX="center"
          anchorY="middle"
        >
          {symptom.type.charAt(0).toUpperCase() + symptom.type.slice(1)}: {symptom.score}/10
        </Text>
      ))}

      {/* Clinical interpretation */}
      <mesh position={[0, 0.35, -2.5]}>
        <planeGeometry args={[2.2, 0.3]} />
        <meshStandardMaterial
          color={totalSymptoms > 10 ? '#442222' : totalSymptoms > 5 ? '#443322' : '#224422'}
          opacity={0.9}
          transparent
        />
      </mesh>

      <Text
        position={[0, 0.35, -2.48]}
        fontSize={0.04}
        color={totalSymptoms > 10 ? '#ff6666' : totalSymptoms > 5 ? '#ffaa66' : '#66ff66'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {totalSymptoms === 0
          ? 'No symptoms provoked - Normal response'
          : totalSymptoms <= 5
          ? 'Mild symptom provocation - Monitor'
          : totalSymptoms <= 10
          ? 'Moderate symptoms - Further assessment recommended'
          : 'Significant symptoms - Impairment likely present'}
      </Text>

      {/* Next steps */}
      <Text
        position={[0, 0.0, -2.48]}
        fontSize={0.035}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        Results should be reviewed by a qualified healthcare professional.
      </Text>

      {/* Restart button */}
      <VRButton
        position={[0, -0.4, -2.5]}
        onClick={handleRestart}
        text="RESTART ASSESSMENT"
        scale={1.2}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
