import React from 'react';

export const About: React.FC = () => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Precision Tracking',
      description: 'Advanced eye and head tracking with WebXR technology provides millisecond-accurate measurements for clinical assessment and progress monitoring.'
    },
    {
      icon: '🏠',
      title: 'Accessible Care',
      description: 'Complete professional-grade assessments from home, eliminating travel barriers and enabling higher therapy frequency for faster recovery.'
    },
    {
      icon: '📊',
      title: 'Data-Driven Insights',
      description: 'Comprehensive analytics and visualization help clinicians make informed decisions with real-time progress tracking and outcome measures.'
    },
    {
      icon: '🔬',
      title: 'Evidence-Based',
      description: 'Built on peer-reviewed protocols including VOMS and King-Devick assessments, trusted by healthcare professionals worldwide.'
    }
  ];

  return (
    <section id="about" style={{
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
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#1E293B',
            marginBottom: '1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            About <span style={{
              color: '#6B9080'
            }}>NeuroRecover VR</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#64748B',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Pioneering the intersection of clinical neuroscience and virtual reality
            to revolutionize concussion recovery and rehabilitation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#F8FAFC',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(107, 144, 128, 0.15)';
                e.currentTarget.style.borderColor = '#6B9080';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.25rem'
              }}>
                {benefit.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                color: '#1E293B',
                marginBottom: '0.75rem',
                fontWeight: 700,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {benefit.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#64748B',
                lineHeight: '1.7',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '3rem'
        }}>
          <div style={{
            backgroundColor: '#F8FAFC',
            padding: '3rem',
            borderRadius: '20px',
            border: '1px solid #E2E8F0'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              color: '#1E293B',
              marginBottom: '1rem',
              fontWeight: 700,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#64748B',
              lineHeight: '1.8',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              To transform concussion recovery through evidence-based virtual reality technology.
              We combine clinically validated assessments with immersive VR experiences to provide
              comprehensive, accessible, and effective rehabilitation for patients recovering from
              concussions and traumatic brain injuries.
            </p>
          </div>

          <div style={{
            backgroundColor: '#F8FAFC',
            padding: '3rem',
            borderRadius: '20px',
            border: '1px solid #E2E8F0'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              color: '#1E293B',
              marginBottom: '1rem',
              fontWeight: 700,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Our Vision
            </h3>
            <p style={{
              fontSize: '1.05rem',
              color: '#64748B',
              lineHeight: '1.8',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              A future where world-class concussion rehabilitation is accessible to everyone, everywhere.
              We envision patients receiving professional-grade vestibular and oculomotor therapy from
              home, guided by scientifically validated protocols with real-time progress tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
