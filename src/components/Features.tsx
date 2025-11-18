import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: '👁️',
      title: 'Oculomotor Assessment',
      description: 'Comprehensive testing of smooth pursuits, saccades, convergence, and vestibulo-ocular reflex function with real-time tracking.',
      gradient: '#0066CC',
      details: ['Real-time eye tracking', 'Automated symptom recording', 'Baseline comparison analytics']
    },
    {
      icon: '⚖️',
      title: 'Vestibular Rehabilitation',
      description: 'Evidence-based exercises for balance, gaze stabilization, and spatial orientation recovery in immersive environments.',
      gradient: '#00897B',
      details: ['Dynamic visual acuity', 'Gaze stabilization', 'Balance training modules']
    },
    {
      icon: '📈',
      title: 'Progress Analytics',
      description: 'Detailed tracking and visualization of recovery metrics with exportable clinical reports for healthcare providers.',
      gradient: '#0096C7',
      details: ['Session tracking', 'Symptom trend analysis', 'Clinical report generation']
    },
    {
      icon: '🎮',
      title: 'Immersive VR Therapy',
      description: 'Engaging virtual environments make rehabilitation exercises more enjoyable and clinically effective.',
      gradient: '#43A047',
      details: ['WebXR compatibility', 'Adjustable difficulty', 'Safe virtual environments']
    },
    {
      icon: '🔐',
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security with encrypted data storage ensuring complete patient privacy and regulatory compliance.',
      gradient: '#FB8C00',
      details: ['Encrypted storage', 'Secure authentication', 'Privacy-first design']
    },
    {
      icon: '🌐',
      title: 'Web-Based Platform',
      description: 'No downloads required. Instant access from any VR-capable device with a modern web browser.',
      gradient: '#5E35B1',
      details: ['Cross-platform support', 'Instant accessibility', 'Regular updates']
    }
  ];

  return (
    <section id="features" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '6rem 2rem',
      backgroundColor: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#1E293B',
            marginBottom: '1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Platform <span style={{
              color: '#0066CC'
            }}>Features</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#64748B',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            A comprehensive suite of clinically validated tools designed for
            effective concussion assessment and rehabilitation.
          </p>
        </div>

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
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '24px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.4s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 102, 204, 0.2)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                background: feature.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1E293B',
                marginBottom: '1rem',
                fontWeight: 700,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#64748B',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {feature.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {feature.details.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: '0.95rem',
                      color: '#0066CC',
                      fontWeight: 500,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      fontWeight: 700
                    }}>✓</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          padding: '4rem',
          background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
          borderRadius: '24px',
          textAlign: 'center',
          border: '1px solid #E2E8F0'
        }}>
          <h3 style={{
            fontSize: '2rem',
            color: '#1E293B',
            marginBottom: '1.5rem',
            fontWeight: 800,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Trusted by Healthcare Professionals
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748B',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Our platform implements clinical protocols validated through peer-reviewed research.
            Every assessment and therapy module is grounded in evidence-based medicine.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#0066CC',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                marginBottom: '0.5rem'
              }}>VOMS</div>
              <div style={{
                fontSize: '0.95rem',
                color: '#64748B',
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>Assessment Protocol</div>
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#0066CC',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                marginBottom: '0.5rem'
              }}>King-Devick</div>
              <div style={{
                fontSize: '0.95rem',
                color: '#64748B',
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>Rapid Eye Test</div>
            </div>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#0066CC',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                marginBottom: '0.5rem'
              }}>WebXR</div>
              <div style={{
                fontSize: '0.95rem',
                color: '#64748B',
                fontWeight: 500,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>VR Technology</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
