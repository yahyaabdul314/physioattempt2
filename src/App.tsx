/**
 * VR Concussion Recovery Platform
 * Main application entry point with VR/non-VR modes
 */

import { useState } from 'react';
import { VRApp } from './VRApp';

function App() {
  const [vrMode, setVrMode] = useState(false);

  // If in VR mode, show the VR app
  if (vrMode) {
    return <VRApp />;
  }

  // Otherwise show landing page with VR entry button
  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      background: '#0a0a0a',
      color: '#e0e0e0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#4488ff' }}>VR-Based Concussion Recovery Platform</h1>

      <section style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#1a1a1a',
        borderLeft: '4px solid #4488ff',
        borderRadius: '4px'
      }}>
        <h2 style={{ marginTop: 0, color: '#66aaff' }}>WebXR Assessment Available</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          This platform now includes interactive VR assessment modules using WebXR.
          Click the button below to enter VR mode and begin VOMS testing.
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setVrMode(true)}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              background: '#2266cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#3377dd'}
            onMouseOut={(e) => e.currentTarget.style.background = '#2266cc'}
          >
            🥽 ENTER VR MODE
          </button>
        </div>

        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
          Note: For full VR experience, use a WebXR-compatible browser (Chrome/Edge) with a VR headset.
          Desktop mode available for testing without headset.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#66aaff' }}>VR Assessment Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ <strong>Interactive Start Screen</strong> - "START TESTS" button in VR</li>
          <li>✅ <strong>VOMS Smooth Pursuits</strong> - Follow moving target with eyes</li>
          <li>✅ <strong>VOMS Saccades</strong> - Rapid eye movements between targets</li>
          <li>✅ <strong>Symptom Rating</strong> - 0-10 scale for headache, dizziness, nausea, fogginess</li>
          <li>✅ <strong>Results Summary</strong> - Clinical interpretation of symptom scores</li>
          <li>✅ <strong>VR Controller Support</strong> - Point and click with VR controllers</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#66aaff' }}>Evidence-Based Components</h2>

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ color: '#88aaff' }}>Assessment Modules</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>
              <strong>VOMS</strong> (Vestibular/Ocular Motor Screening)
              <ul>
                <li>5 core tests: Smooth Pursuits, Saccades, Convergence, VOR, VMS</li>
                <li>Symptom provocation testing (0-10 scale)</li>
                <li>Baseline and serial assessments</li>
              </ul>
            </li>
            <li>
              <strong>King-Devick Test</strong>
              <ul>
                <li>Rapid number naming (3 progressive cards)</li>
                <li>Saccadic eye movement assessment</li>
                <li>95.8% sensitivity, 96.1% specificity</li>
              </ul>
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ color: '#88aaff' }}>VR Therapy Modules</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Balance Training</strong>: Static and dynamic challenges</li>
            <li><strong>Vestibular Rehabilitation</strong>: Graded visual motion exposure</li>
            <li><strong>Dual-Task Training</strong>: Cognitive + motor tasks</li>
            <li><strong>Graded Exertion</strong>: Progressive physical activity</li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ color: '#88aaff' }}>Recovery Protocol</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>6-week duration (clinical standard)</li>
            <li>2 sessions per week</li>
            <li>Conservative progression criteria (75% success rate)</li>
            <li>Automated readiness assessment</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#66aaff' }}>Platform Status</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ Core clinical types and data structures</li>
          <li>✅ VOMS assessment implementation</li>
          <li>✅ King-Devick test implementation</li>
          <li>✅ VR therapy management (Balance, Vestibular, Dual-Task)</li>
          <li>✅ Recovery protocol management</li>
          <li>✅ Comprehensive test suite (87 tests)</li>
          <li>✅ <strong>WebXR VR interface with interactive tests</strong></li>
          <li>⏳ Eye tracking integration</li>
          <li>⏳ Data visualization dashboard</li>
        </ul>
      </section>

      <section style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#1a1a1a',
        borderRadius: '4px'
      }}>
        <h2 style={{ color: '#66aaff' }}>Getting Started</h2>
        <p>This platform prioritizes function over aesthetics, with all core clinical logic implemented and tested.</p>
        <p><strong>Run tests:</strong> <code>npm test</code></p>
        <p><strong>View documentation:</strong> See README.md and CLINICAL_RATIONALE.md</p>
        <p><strong>Clinical workflow:</strong> See README.md for code examples</p>
      </section>

      <section style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
        <p>
          <strong>Clinical Disclaimer:</strong> This platform is designed for use by qualified
          healthcare professionals. All clinical decisions should be made by licensed practitioners.
        </p>
      </section>
    </div>
  );
}

export default App;
