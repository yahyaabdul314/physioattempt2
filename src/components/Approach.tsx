import React from 'react';

export const Approach: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Initial Assessment',
      description: 'Comprehensive VOMS testing establishes baseline measurements for vestibular and oculomotor function, including smooth pursuits, saccades, and VOR assessments.',
      icon: '📋'
    },
    {
      number: '02',
      title: 'Personalized Protocol',
      description: 'AI-powered analysis generates customized recovery protocols based on assessment results, symptom patterns, and individual patient needs.',
      icon: '🎯'
    },
    {
      number: '03',
      title: 'VR Rehabilitation',
      description: 'Immersive therapy sessions target specific deficits with gaze stabilization, balance training, and progressive difficulty adaptation.',
      icon: '🥽'
    },
    {
      number: '04',
      title: 'Progress Monitoring',
      description: 'Real-time analytics track improvements, inform treatment adjustments, and guide return-to-activity decisions with clinical precision.',
      icon: '📊'
    }
  ];

  return (
    <section id="approach" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '6rem 2rem',
      backgroundColor: '#F8FAFC'
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
            Our <span style={{
              color: '#6B9080'
            }}>Methodology</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#64748B',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            A systematic, evidence-based approach combining clinical protocols
            with cutting-edge VR technology for optimal recovery outcomes.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gap: '2rem'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '2rem',
                alignItems: 'start',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(107, 144, 128, 0.15)';
                e.currentTarget.style.borderColor = '#6B9080';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '2.5rem'
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#6B9080',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {step.number}
                </div>
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.75rem',
                  color: '#1E293B',
                  marginBottom: '0.75rem',
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  color: '#64748B',
                  lineHeight: '1.8',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '5rem',
          padding: '3rem',
          background: '#6B9080',
          borderRadius: '24px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Clinical Foundation
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem',
            marginTop: '2rem'
          }}>
            <div>
              <h4 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                VOMS Protocol
              </h4>
              <p style={{
                fontSize: '1rem',
                opacity: 0.95,
                lineHeight: '1.7',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Validated screening tool for vestibular and oculomotor impairments,
                used by healthcare professionals worldwide.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                King-Devick Test
              </h4>
              <p style={{
                fontSize: '1rem',
                opacity: 0.95,
                lineHeight: '1.7',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Rapid assessment of saccadic eye movements with 95.8% sensitivity
                for concussion-related deficits.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                VR Therapy
              </h4>
              <p style={{
                fontSize: '1rem',
                opacity: 0.95,
                lineHeight: '1.7',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Evidence-based rehabilitation exercises adapted for immersive VR,
                delivering engaging and effective therapy sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
