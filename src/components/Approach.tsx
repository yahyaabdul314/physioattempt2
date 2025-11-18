import React from 'react';

export const Approach: React.FC = () => {
  return (
    <section id="approach" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '6rem 2rem',
      backgroundColor: '#1a1a2e'
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
          Our <span style={{ color: '#4488ff' }}>Approach</span>
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
          Our methodology combines established clinical protocols with innovative VR technology
          to deliver a comprehensive, patient-centered recovery experience.
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Step 1 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2rem',
            backgroundColor: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #2266cc',
            alignItems: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2266cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'monospace',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                Initial Assessment
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                fontFamily: 'monospace'
              }}>
                Patients complete standardized VOMS (Vestibular/Ocular Motor Screening) assessments
                to establish baseline measurements. This includes smooth pursuit tracking, saccadic
                movements, and vestibulo-ocular reflex testing.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2rem',
            backgroundColor: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #2266cc',
            alignItems: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2266cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'monospace',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                Personalized Protocol
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                fontFamily: 'monospace'
              }}>
                Based on assessment results, our system generates a customized recovery protocol
                tailored to each patient's specific deficits and symptoms. Protocols adapt in
                real-time based on patient response and symptom reporting.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2rem',
            backgroundColor: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #2266cc',
            alignItems: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2266cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'monospace',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                VR Rehabilitation
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                fontFamily: 'monospace'
              }}>
                Patients engage in immersive VR therapy sessions targeting vestibular and oculomotor
                function. Exercises include gaze stabilization, dynamic visual acuity training, and
                balance rehabilitation in safe, controlled virtual environments.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2rem',
            backgroundColor: '#0a0a0a',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #2266cc',
            alignItems: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2266cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'monospace',
              flexShrink: 0
            }}>
              4
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                Progress Monitoring
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: '#b0b0b0',
                lineHeight: '1.7',
                fontFamily: 'monospace'
              }}>
                Continuous data collection tracks improvements in oculomotor function, symptom severity,
                and overall recovery progress. Clinicians receive detailed analytics to inform treatment
                adjustments and return-to-activity decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Foundation */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: '#0a0a0a',
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
            Clinical Foundation
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                VOMS Assessment
              </h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Validated screening tool for vestibular and oculomotor impairments
                following concussion, used by healthcare professionals worldwide.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                King-Devick Test
              </h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Rapid number naming test that assesses saccadic eye movements
                and attention, proven to identify concussion-related deficits.
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#4488ff',
                marginBottom: '0.75rem',
                fontFamily: 'monospace'
              }}>
                VR Therapy Protocols
              </h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Evidence-based rehabilitation exercises adapted for immersive VR,
                providing engaging and effective therapy sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
