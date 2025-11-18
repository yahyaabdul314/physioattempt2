/**
 * VR Symptom Rating Interface
 *
 * Allows patient to rate symptoms 0-10 after each test
 * Evidence: VOMS uses 4 core symptoms on 0-10 scale
 */

import { useState } from 'react';
import { Text } from '@react-three/drei';
import { VRButton } from './VRButton';
import { useAssessmentStore } from '../store/assessmentStore';
import type { SymptomScore, SymptomType } from '../types/clinical';

export function SymptomRating() {
  const currentTest = useAssessmentStore((state) => state.currentTest);
  const updateSymptoms = useAssessmentStore((state) => state.updateSymptoms);
  const startTest = useAssessmentStore((state) => state.startTest);
  const setState = useAssessmentStore((state) => state.setState);

  const [symptoms, setSymptoms] = useState<SymptomScore[]>([
    { type: 'headache', score: 0 },
    { type: 'dizziness', score: 0 },
    { type: 'nausea', score: 0 },
    { type: 'fogginess', score: 0 },
  ]);

  const handleSymptomChange = (type: SymptomType, delta: number) => {
    setSymptoms((prev) =>
      prev.map((s) =>
        s.type === type
          ? { ...s, score: Math.max(0, Math.min(10, s.score + delta)) }
          : s
      )
    );
  };

  const handleContinue = () => {
    updateSymptoms(symptoms);

    // Progress to next test
    if (currentTest === 'smoothPursuits') {
      startTest('saccadesH');
    } else if (currentTest === 'saccadesH') {
      setState('complete');
    } else {
      setState('complete');
    }
  };

  const getSymptomLabel = (type: SymptomType): string => {
    switch (type) {
      case 'headache': return 'Headache';
      case 'dizziness': return 'Dizziness';
      case 'nausea': return 'Nausea';
      case 'fogginess': return 'Mental Fogginess';
    }
  };

  return (
    <group>
      {/* Title */}
      <Text
        position={[0, 2.1, -2.5]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Rate Your Symptoms
      </Text>

      <Text
        position={[0, 1.95, -2.5]}
        fontSize={0.045}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
      >
        How do you feel right now? (0 = none, 10 = severe)
      </Text>

      {/* Symptom rating controls */}
      {symptoms.map((symptom, index) => {
        const yPos = 1.6 - index * 0.28;

        return (
          <group key={symptom.type}>
            {/* Background panel */}
            <mesh position={[0, yPos, -2.5]}>
              <planeGeometry args={[2, 0.24]} />
              <meshStandardMaterial color="#222222" opacity={0.8} transparent />
            </mesh>

            {/* Symptom label */}
            <Text
              position={[-0.85, yPos, -2.48]}
              fontSize={0.045}
              color="#dddddd"
              anchorX="left"
              anchorY="middle"
            >
              {getSymptomLabel(symptom.type)}
            </Text>

            {/* Minus button */}
            <VRButton
              position={[0.3, yPos, -2.48]}
              onClick={() => handleSymptomChange(symptom.type, -1)}
              text="-"
              scale={0.6}
              disabled={symptom.score === 0}
            />

            {/* Score display */}
            <Text
              position={[0.55, yPos, -2.48]}
              fontSize={0.055}
              color={symptom.score > 5 ? '#ff6666' : symptom.score > 2 ? '#ffaa66' : '#66ff66'}
              anchorX="center"
              anchorY="middle"
            >
              {symptom.score}
            </Text>

            {/* Plus button */}
            <VRButton
              position={[0.8, yPos, -2.48]}
              onClick={() => handleSymptomChange(symptom.type, 1)}
              text="+"
              scale={0.6}
              disabled={symptom.score === 10}
            />
          </group>
        );
      })}

      {/* Total score */}
      <Text
        position={[0, 0.35, -2.5]}
        fontSize={0.05}
        color="#ffaa00"
        anchorX="center"
        anchorY="middle"
      >
        Total Symptom Score: {symptoms.reduce((sum, s) => sum + s.score, 0)}
      </Text>

      {/* Warning if high symptoms */}
      {symptoms.reduce((sum, s) => sum + s.score, 0) > 15 && (
        <Text
          position={[0, 0.2, -2.5]}
          fontSize={0.04}
          color="#ff4444"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="center"
        >
          High symptom score detected. Consider stopping assessment.
        </Text>
      )}

      {/* Continue button */}
      <VRButton
        position={[0, -0.1, -2.5]}
        onClick={handleContinue}
        text={currentTest === 'saccadesH' ? 'FINISH ASSESSMENT' : 'NEXT TEST'}
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
