import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', organization: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" style={{
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
            Get In <span style={{
              color: '#0066CC'
            }}>Touch</span>
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#64748B',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Ready to transform concussion recovery at your facility?
            Let's discuss how NeuroRecover VR can help.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Info */}
          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                color: '#1E293B',
                marginBottom: '1.5rem',
                fontWeight: 700,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                Contact Information
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#64748B',
                lineHeight: '1.8',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                marginBottom: '2rem'
              }}>
                Interested in bringing our VR platform to your clinic? We'd love to hear from you.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#0066CC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    📧
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      color: '#1E293B',
                      marginBottom: '0.25rem',
                      fontWeight: 600,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>Email</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#64748B',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>contact@neurorecover-vr.com</p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#0066CC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    📞
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      color: '#1E293B',
                      marginBottom: '0.25rem',
                      fontWeight: 600,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>Phone</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#64748B',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#0066CC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    🏢
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      color: '#1E293B',
                      marginBottom: '0.25rem',
                      fontWeight: 600,
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>Office</h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#64748B',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      lineHeight: '1.6'
                    }}>
                      123 Healthcare Innovation Blvd<br />
                      Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '20px',
              border: '1px solid #E2E8F0'
            }}>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#1E293B',
                marginBottom: '1rem',
                fontWeight: 700,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>Office Hours</h4>
              <p style={{
                fontSize: '1rem',
                color: '#64748B',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.8'
              }}>
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '24px',
            border: '1px solid #E2E8F0'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              color: '#1E293B',
              marginBottom: '1.5rem',
              fontWeight: 700,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Send Us a Message
            </h3>

            {submitted ? (
              <div style={{
                padding: '3rem',
                background: '#43A047',
                borderRadius: '16px',
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '3.5rem',
                  marginBottom: '1rem'
                }}>✓</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  marginBottom: '0.5rem'
                }}>Message Sent!</h4>
                <p style={{
                  fontSize: '1rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  opacity: 0.95
                }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    color: '#1E293B',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      color: '#1E293B',
                      fontSize: '1rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0066CC';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    color: '#1E293B',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      color: '#1E293B',
                      fontSize: '1rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0066CC';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    color: '#1E293B',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Organization
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      color: '#1E293B',
                      fontSize: '1rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0066CC';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    color: '#1E293B',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: '#F8FAFC',
                      border: '2px solid #E2E8F0',
                      borderRadius: '12px',
                      color: '#1E293B',
                      fontSize: '1rem',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0066CC';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#0066CC',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    transition: 'all 0.3s',
                    boxShadow: '0 10px 30px rgba(0, 102, 204, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.backgroundColor = '#0052A3';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 102, 204, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = '#0066CC';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.3)';
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
