import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onEnterVR: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onEnterVR }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#0066CC',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        letterSpacing: '-0.02em'
      }}>
        NeuroRecover VR
      </div>

      <div style={{
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {['About', 'Approach', 'Features', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              transition: 'color 0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0066CC'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
          >
            {item}
          </button>
        ))}

        <button
          onClick={onEnterVR}
          style={{
            padding: '0.75rem 1.75rem',
            background: '#0066CC',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 600,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            transition: 'all 0.3s',
            boxShadow: '0 4px 14px rgba(0, 102, 204, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = '#0052A3';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 204, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = '#0066CC';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 102, 204, 0.3)';
          }}
        >
          Launch VR Mode
        </button>
      </div>
    </nav>
  );
};
