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
    // In a real application, this would send data to a backend
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
          Get In <span style={{ color: '#4488ff' }}>Touch</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: '1.75rem',
              color: '#e0e0e0',
              marginBottom: '1.5rem',
              fontFamily: 'monospace'
            }}>
              Contact Information
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#b0b0b0',
              lineHeight: '1.8',
              fontFamily: 'monospace',
              marginBottom: '2rem'
            }}>
              Interested in implementing our VR concussion recovery platform at your clinic
              or healthcare facility? Have questions about our technology? We'd love to hear from you.
            </p>

            <div style={{
              marginBottom: '4rem'
            }}>
              <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'start',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '1.5rem'
                }}>📧</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: '#4488ff',
                    marginBottom: '0.25rem',
                    fontFamily: 'monospace'
                  }}>Email</h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    fontFamily: 'monospace'
                  }}>info@neurorecover-vr.com</p>
                </div>
              </div>

              <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'start',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '1.5rem'
                }}>📞</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: '#4488ff',
                    marginBottom: '0.25rem',
                    fontFamily: 'monospace'
                  }}>Phone</h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    fontFamily: 'monospace'
                  }}>+1 (555) 123-4567</p>
                </div>
              </div>

              <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'start',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '1.5rem'
                }}>🏢</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: '#4488ff',
                    marginBottom: '0.25rem',
                    fontFamily: 'monospace'
                  }}>Office</h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    fontFamily: 'monospace',
                    lineHeight: '1.6'
                  }}>
                    123 Healthcare Innovation Blvd<br />
                    Suite 400<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '1.25rem',
                color: '#e0e0e0',
                marginBottom: '1rem',
                fontFamily: 'monospace'
              }}>Office Hours</h4>
              <p style={{
                fontSize: '1rem',
                color: '#b0b0b0',
                fontFamily: 'monospace',
                lineHeight: '1.8'
              }}>
                Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                Saturday - Sunday: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            backgroundColor: '#0a0a0a',
            padding: '2.5rem',
            borderRadius: '8px',
            border: '1px solid #2266cc'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              color: '#e0e0e0',
              marginBottom: '1.5rem',
              fontFamily: 'monospace'
            }}>
              Send us a message
            </h3>

            {submitted ? (
              <div style={{
                padding: '2rem',
                backgroundColor: '#1a4d1a',
                borderRadius: '4px',
                border: '1px solid #2d8b2d',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>✓</div>
                <h4 style={{
                  fontSize: '1.25rem',
                  color: '#4ade80',
                  fontFamily: 'monospace'
                }}>Message Sent!</h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#a3e6a3',
                  fontFamily: 'monospace',
                  marginTop: '0.5rem'
                }}>We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
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
                      padding: '0.75rem',
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #2266cc',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#4488ff'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#2266cc'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
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
                      padding: '0.75rem',
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #2266cc',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#4488ff'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#2266cc'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
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
                      padding: '0.75rem',
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #2266cc',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#4488ff'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#2266cc'}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '1rem',
                    color: '#b0b0b0',
                    marginBottom: '0.5rem',
                    fontFamily: 'monospace'
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
                      padding: '0.75rem',
                      backgroundColor: '#1a1a2e',
                      border: '1px solid #2266cc',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#4488ff'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#2266cc'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#2266cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3377dd'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2266cc'}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
