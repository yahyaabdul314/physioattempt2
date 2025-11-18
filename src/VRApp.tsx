/**
 * Main VR Application
 * Integrates all VR screens and WebXR functionality
 */

import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';
import { useAssessmentStore } from './store/assessmentStore';
import { StartScreen } from './vr/StartScreen';
import { InstructionsScreen } from './vr/InstructionsScreen';
import { SmoothPursuitsTest } from './vr/tests/SmoothPursuitsTest';
import { SaccadesTest } from './vr/tests/SaccadesTest';
import { SymptomRating } from './vr/SymptomRating';
import { CompleteScreen } from './vr/CompleteScreen';

const store = createXRStore();

function VRScene() {
  const state = useAssessmentStore((s) => s.state);
  const currentTest = useAssessmentStore((s) => s.currentTest);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Render appropriate screen based on state */}
      {state === 'idle' && <StartScreen />}
      {state === 'instructions' && <InstructionsScreen />}
      {state === 'testing' && currentTest === 'smoothPursuits' && <SmoothPursuitsTest />}
      {state === 'testing' && currentTest === 'saccadesH' && <SaccadesTest />}
      {state === 'symptoms' && <SymptomRating />}
      {state === 'complete' && <CompleteScreen />}
    </>
  );
}

export function VRApp() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas>
        <XR store={store}>
          <VRScene />
        </XR>
      </Canvas>
    </div>
  );
}
