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
      padding: '8rem 2rem 4rem',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 102, 204, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(0, 150, 199, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />

      <div style={{
        maxWidth: '1100px',
        zIndex: 1
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1.25rem',
          backgroundColor: 'rgba(0, 102, 204, 0.08)',
          border: '1px solid rgba(0, 102, 204, 0.2)',
          borderRadius: '50px',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: '#0066CC',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <span style={{
            fontSize: '1.2rem'
          }}>🎯</span>
          Evidence-Based Medical Technology
        </div>

        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 800,
          color: '#1E293B',
          marginBottom: '1.5rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: '1.1',
          letterSpacing: '-0.03em'
        }}>
          The Future of
          <br />
          <span style={{
            color: '#0066CC'
          }}>
            Concussion Recovery
          </span>
        </h1>

        <p style={{
          fontSize: '1.35rem',
          color: '#64748B',
          marginBottom: '3rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: '1.7',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          fontWeight: 400
        }}>
          Transform concussion rehabilitation with immersive VR technology.
          <br />
          Clinically validated assessments meet cutting-edge WebXR innovation.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.25rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '4rem'
        }}>
          <button
            onClick={onEnterVR}
            style={{
              padding: '1.1rem 2.75rem',
              background: '#0066CC',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.3s',
              boxShadow: '0 10px 30px rgba(0, 102, 204, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.backgroundColor = '#0052A3';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 102, 204, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#0066CC';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.25)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>🥽</span>
            Start VR Assessment
          </button>

          <button
            onClick={() => {
              const element = document.getElementById('about');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              padding: '1.1rem 2.75rem',
              backgroundColor: 'white',
              color: '#0066CC',
              border: '2px solid #E2E8F0',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0066CC';
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
            }}
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginTop: '5rem',
          padding: '3rem',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E2E8F0'
        }}>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#0066CC',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              marginBottom: '0.5rem'
            }}>87+</div>
            <div style={{
              fontSize: '1rem',
              color: '#64748B',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>Clinical Tests</div>
          </div>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#0066CC',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              marginBottom: '0.5rem'
            }}>100%</div>
            <div style={{
              fontSize: '1rem',
              color: '#64748B',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>Evidence-Based</div>
          </div>
          <div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#0066CC',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              marginBottom: '0.5rem'
            }}>WebXR</div>
            <div style={{
              fontSize: '1rem',
              color: '#64748B',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>Powered Platform</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <div style={{
          fontSize: '2rem',
          color: '#0066CC',
          opacity: 0.6
        }}>↓</div>
      </div>
    </section>
  );
};
