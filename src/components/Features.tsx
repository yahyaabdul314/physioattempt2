import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: '👁️',
      title: 'Oculomotor Assessment',
      description: 'Comprehensive testing of smooth pursuits, saccades, convergence, and vestibulo-ocular reflex (VOR) function.',
      details: [
        'Real-time eye tracking',
        'Automated symptom recording',
        'Baseline comparison'
      ]
    },
    {
      icon: '⚖️',
      title: 'Vestibular Rehabilitation',
      description: 'Evidence-based exercises targeting balance, gaze stabilization, and spatial orientation recovery.',
      details: [
        'Dynamic visual acuity',
        'Gaze stabilization exercises',
        'Balance training modules'
      ]
    },
    {
      icon: '📈',
      title: 'Progress Analytics',
      description: 'Detailed tracking and visualization of recovery metrics over time with exportable clinical reports.',
      details: [
        'Session-by-session tracking',
        'Symptom trend analysis',
        'Clinical report generation'
      ]
    },
    {
      icon: '🎮',
      title: 'Immersive VR Therapy',
      description: 'Engaging virtual environments make rehabilitation exercises more enjoyable and effective.',
      details: [
        'WebXR compatibility',
        'Adjustable difficulty levels',
        'Safe virtual environments'
      ]
    },
    {
      icon: '🔐',
      title: 'HIPAA Compliant',
      description: 'Secure data handling and storage ensuring patient privacy and regulatory compliance.',
      details: [
        'Encrypted data storage',
        'Secure authentication',
        'Privacy-first design'
      ]
    },
    {
      icon: '🌐',
      title: 'Web-Based Platform',
      description: 'No downloads required. Access from any VR-capable device with a web browser.',
      details: [
        'Cross-platform support',
        'Instant accessibility',
        'Regular updates'
      ]
    }
  ];

  return (
    <section id="features" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '6rem 2rem',
      backgroundColor: '#0a0a0a'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#e0e0e0',
          marginBottom: '3rem',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}>
          Platform <span style={{ color: '#4488ff' }}>Features</span>
        </h2>

        <p style={{
          fontSize: '1.25rem',
          color: '#b0b0b0',
          lineHeight: '1.8',
          fontFamily: 'monospace',
          textAlign: 'center',
          marginBottom: '4rem',
          maxWidth: '800px',
          margin: '0 auto 4rem'
        }}>
          A comprehensive suite of tools designed for effective concussion assessment and rehabilitation.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#1a1a2e',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #2266cc',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#4488ff';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 102, 204, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#2266cc';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4488ff',
                marginBottom: '1rem',
                fontFamily: 'monospace',
                textAlign: 'center'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                fontFamily: 'monospace',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {feature.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {feature.details.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.95rem',
                      color: '#88aaff',
                      fontFamily: 'monospace',
                      marginBottom: '0.5rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#4488ff'
                    }}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div style={{
          backgroundColor: '#1a1a2e',
          padding: '3rem',
          borderRadius: '8px',
          border: '1px solid #2266cc',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            color: '#e0e0e0',
            marginBottom: '1.5rem',
            fontFamily: 'monospace'
          }}>
            Built on Proven Science
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#b0b0b0',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            Our platform implements clinical protocols validated through peer-reviewed research
            and used by healthcare professionals worldwide. Every assessment and therapy module
            is grounded in evidence-based medicine.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#4488ff',
                fontFamily: 'monospace'
              }}>VOMS</div>
              <div style={{
                fontSize: '0.9rem',
                color: '#b0b0b0',
                fontFamily: 'monospace'
              }}>Assessment Protocol</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#4488ff',
                fontFamily: 'monospace'
              }}>King-Devick</div>
              <div style={{
                fontSize: '0.9rem',
                color: '#b0b0b0',
                fontFamily: 'monospace'
              }}>Rapid Eye Test</div>
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#4488ff',
                fontFamily: 'monospace'
              }}>WebXR</div>
              <div style={{
                fontSize: '0.9rem',
                color: '#b0b0b0',
                fontFamily: 'monospace'
              }}>VR Technology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
