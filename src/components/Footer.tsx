import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#1E293B',
      padding: '4rem 2rem 2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
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
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#6B9080',
              marginBottom: '1rem'
            }}>
              NeuroRecover VR
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#94A3B8',
              lineHeight: '1.7',
              marginBottom: '1.5rem'
            }}>
              Transforming concussion recovery through evidence-based virtual reality rehabilitation.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#6B9080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = '#5A7C6F';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(107, 144, 128, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#6B9080';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🐦
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#6B9080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = '#5A7C6F';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(107, 144, 128, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#6B9080';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                💼
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#6B9080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = '#5A7C6F';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(107, 144, 128, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = '#6B9080';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                📘
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.1rem',
              color: 'white',
              marginBottom: '1rem',
              fontWeight: 700
            }}>
              Quick Links
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {['About', 'Approach', 'Features', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.toLowerCase());
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      padding: 0,
                      transition: 'color 0.2s',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#6B9080'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
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
              color: 'white',
              marginBottom: '1rem',
              fontWeight: 700
            }}>
              Resources
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {['Clinical Research', 'Documentation', 'FAQ', 'Support'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#6B9080'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
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
              color: 'white',
              marginBottom: '1rem',
              fontWeight: 700
            }}>
              Legal & Compliance
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Accessibility'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#6B9080'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
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
          borderTop: '1px solid #334155',
          paddingTop: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            backgroundColor: '#0F172A',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid #334155',
            marginBottom: '2rem'
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: '#94A3B8',
              lineHeight: '1.7',
              margin: 0
            }}>
              <strong style={{ color: '#6B9080' }}>Clinical Disclaimer:</strong> This platform is designed to supplement, not replace,
              professional medical care. VR-based assessments should be conducted under the guidance of
              qualified healthcare providers. Not all users may be suitable for VR therapy. Always consult
              with your healthcare provider before beginning any rehabilitation program.
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
              color: '#64748B',
              margin: 0
            }}>
              © {currentYear} NeuroRecover VR. All rights reserved.
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#64748B',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Built with</span>
              <span style={{
                color: '#6B9080',
                fontWeight: 600
              }}>React + Three.js + WebXR</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
