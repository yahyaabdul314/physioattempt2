import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #2266cc',
      padding: '3rem 2rem 2rem',
      fontFamily: 'monospace'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* About Column */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              color: '#4488ff',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              NeuroRecover VR
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#b0b0b0',
              lineHeight: '1.7',
              marginBottom: '1rem'
            }}>
              Revolutionizing concussion recovery through evidence-based virtual reality rehabilitation.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <a
                href="#"
                style={{
                  color: '#4488ff',
                  fontSize: '1.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#66aaff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#4488ff'}
              >
                🐦
              </a>
              <a
                href="#"
                style={{
                  color: '#4488ff',
                  fontSize: '1.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#66aaff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#4488ff'}
              >
                💼
              </a>
              <a
                href="#"
                style={{
                  color: '#4488ff',
                  fontSize: '1.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#66aaff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#4488ff'}
              >
                📘
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['About', 'Approach', 'Features', 'Contact'].map((link) => (
                <li key={link} style={{ marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#b0b0b0',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      padding: 0,
                      transition: 'color 0.2s',
                      fontFamily: 'monospace'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Resources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Clinical Research', 'User Guide', 'FAQ', 'Support'].map((link) => (
                <li key={link} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              color: '#e0e0e0',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Legal
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Accessibility'].map((link) => (
                <li key={link} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#b0b0b0',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          borderTop: '1px solid #2266cc',
          paddingTop: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            backgroundColor: '#1a1a2e',
            padding: '1.5rem',
            borderRadius: '4px',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: '#88aaff',
              lineHeight: '1.6',
              margin: 0
            }}>
              <strong>Clinical Disclaimer:</strong> This platform is designed to supplement, not replace,
              professional medical care. VR-based assessments should be conducted under the guidance of
              qualified healthcare providers. Not all users may be suitable for VR therapy. Consult with
              your healthcare provider before beginning any rehabilitation program.
            </p>
          </div>

          {/* Copyright */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: '#b0b0b0',
              margin: 0
            }}>
              © {currentYear} NeuroRecover VR. All rights reserved.
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#b0b0b0',
              margin: 0
            }}>
              Built with React + Three.js + WebXR
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
