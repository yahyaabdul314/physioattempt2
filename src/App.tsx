import React from 'react';

/**
 * VR Concussion Recovery Platform
 *
 * This is a minimal entry point demonstrating the platform structure.
 * The core functionality is implemented in the assessment, therapy, and protocol modules.
 *
 * See README.md for usage examples and clinical workflow.
 */

function App() {
  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>VR-Based Concussion Recovery Platform</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Evidence-Based Components</h2>

        <div style={{ marginTop: '1rem' }}>
          <h3>Assessment Modules</h3>
          <ul>
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
          <h3>VR Therapy Modules</h3>
          <ul>
            <li><strong>Balance Training</strong>: Static and dynamic challenges</li>
            <li><strong>Vestibular Rehabilitation</strong>: Graded visual motion exposure</li>
            <li><strong>Dual-Task Training</strong>: Cognitive + motor tasks</li>
            <li><strong>Graded Exertion</strong>: Progressive physical activity</li>
          </ul>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h3>Recovery Protocol</h3>
          <ul>
            <li>6-week duration (clinical standard)</li>
            <li>2 sessions per week</li>
            <li>Conservative progression criteria (75% success rate)</li>
            <li>Automated readiness assessment</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Platform Status</h2>
        <ul>
          <li>✅ Core clinical types and data structures</li>
          <li>✅ VOMS assessment implementation</li>
          <li>✅ King-Devick test implementation</li>
          <li>✅ VR therapy management (Balance, Vestibular, Dual-Task)</li>
          <li>✅ Recovery protocol management</li>
          <li>✅ Comprehensive test suite (120+ tests)</li>
          <li>⏳ VR interface (WebXR integration pending)</li>
          <li>⏳ Eye tracking integration</li>
          <li>⏳ Data visualization dashboard</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h2>Getting Started</h2>
        <p>This platform prioritizes function over aesthetics, with all core clinical logic implemented and tested.</p>
        <p><strong>Run tests:</strong> <code>npm test</code></p>
        <p><strong>View documentation:</strong> See README.md and CLINICAL_RATIONALE.md</p>
        <p><strong>Clinical workflow:</strong> See README.md for code examples</p>
      </section>

      <section style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>
          <strong>Clinical Disclaimer:</strong> This platform is designed for use by qualified
          healthcare professionals. All clinical decisions should be made by licensed practitioners.
        </p>
      </section>
    </div>
  );
}

export default App;
