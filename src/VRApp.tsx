/**
 * Main VR Application
 * Integrates all VR screens and WebXR functionality
 */

import { Canvas } from '@react-three/fiber';
import { XR, createXRStore, XRButton } from '@react-three/xr';
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

      {/* Enhanced Lighting for VR */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffffff" />
      <hemisphereLight args={['#87ceeb', '#444444', 0.6]} />

      {/* Subtle Environment */}
      <fog attach="fog" args={['#000000', 10, 50]} />

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
    <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
      {/* VR Entry Button - Click to enter immersive VR */}
      <XRButton
        mode="immersive-vr"
        store={store}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#fff',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
        }}
      >
        {(state) => {
          if (state === 'unsupported') {
            return '❌ VR Not Supported';
          }
          if (state === 'exited') {
            return '🎮 ENTER VR MODE';
          }
          if (state === 'entered') {
            return '✅ VR Active - Look Around!';
          }
          return '⏳ Loading VR...';
        }}
      </XRButton>

      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 75 }}
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <XR store={store}>
          <VRScene />
        </XR>
      </Canvas>
    </div>
  );
}
