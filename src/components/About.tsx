import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" style={{
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
          About <span style={{ color: '#4488ff' }}>Us</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#4488ff',
              marginBottom: '1rem',
              fontFamily: 'monospace'
            }}>
              Our Mission
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#b0b0b0',
              lineHeight: '1.8',
              fontFamily: 'monospace'
            }}>
              We're revolutionizing concussion recovery through cutting-edge virtual reality technology.
              Our platform combines evidence-based clinical assessments with immersive VR experiences
              to provide comprehensive, accessible, and effective rehabilitation for patients recovering
              from concussions and traumatic brain injuries.
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#4488ff',
              marginBottom: '1rem',
              fontFamily: 'monospace'
            }}>
              Our Vision
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#b0b0b0',
              lineHeight: '1.8',
              fontFamily: 'monospace'
            }}>
              To make world-class concussion rehabilitation accessible to everyone, anywhere.
              We envision a future where patients can receive professional-grade vestibular and
              oculomotor therapy from the comfort of their homes, guided by scientifically validated
              protocols and real-time progress tracking.
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#1a1a2e',
          padding: '3rem',
          borderRadius: '8px',
          border: '1px solid #2266cc'
        }}>
          <h3 style={{
            fontSize: '1.75rem',
            color: '#e0e0e0',
            marginBottom: '1.5rem',
            fontFamily: 'monospace',
            textAlign: 'center'
          }}>
            Why Virtual Reality?
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🎯</div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>Precision Tracking</h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Advanced eye and head tracking provides precise measurements
                for accurate assessment and progress monitoring.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🏠</div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>Accessible</h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Complete clinical-grade assessments from home,
                eliminating travel barriers and increasing therapy frequency.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>📊</div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>Data-Driven</h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Comprehensive data collection and analytics help clinicians
                make informed decisions about recovery protocols.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🔬</div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>Evidence-Based</h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Built on validated clinical protocols including VOMS
                and King-Devick assessments used by professionals worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
