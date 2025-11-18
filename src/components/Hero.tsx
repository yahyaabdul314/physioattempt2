import React from 'react';

interface HeroProps {
  onEnterVR: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterVR }) => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '900px',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          color: '#e0e0e0',
          marginBottom: '1rem',
          fontFamily: 'monospace',
          lineHeight: '1.2'
        }}>
          Revolutionary VR-Based
          <br />
          <span style={{ color: '#4488ff' }}>Concussion Recovery</span>
        </h1>

        <p style={{
          fontSize: '1.5rem',
          color: '#b0b0b0',
          marginBottom: '2rem',
          fontFamily: 'monospace',
          lineHeight: '1.6'
        }}>
          Evidence-based vestibular and oculomotor rehabilitation
          <br />
          powered by immersive WebXR technology
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <button
            onClick={onEnterVR}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#2266cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(34, 102, 204, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3377dd';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 102, 204, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2266cc';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(34, 102, 204, 0.4)';
            }}
          >
            LAUNCH VR ASSESSMENT
          </button>

          <button
            onClick={() => {
              const element = document.getElementById('about');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: 'transparent',
              color: '#4488ff',
              border: '2px solid #2266cc',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2266cc';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#4488ff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            LEARN MORE
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#4488ff',
              fontFamily: 'monospace'
            }}>87+</div>
            <div style={{
              fontSize: '1rem',
              color: '#b0b0b0',
              fontFamily: 'monospace'
            }}>Clinical Tests</div>
          </div>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#4488ff',
              fontFamily: 'monospace'
            }}>100%</div>
            <div style={{
              fontSize: '1rem',
              color: '#b0b0b0',
              fontFamily: 'monospace'
            }}>Evidence-Based</div>
          </div>
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#4488ff',
              fontFamily: 'monospace'
            }}>WebXR</div>
            <div style={{
              fontSize: '1rem',
              color: '#b0b0b0',
              fontFamily: 'monospace'
            }}>Powered</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <div style={{
          fontSize: '2rem',
          color: '#4488ff'
        }}>↓</div>
      </div>
    </section>
  );
};
