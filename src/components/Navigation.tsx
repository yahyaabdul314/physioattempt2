import React from 'react';

interface NavigationProps {
  onEnterVR: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onEnterVR }) => {
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
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      borderBottom: '1px solid #2266cc'
    }}>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#4488ff',
        fontFamily: 'monospace'
      }}>
        NeuroRecover VR
      </div>

      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <button
          onClick={() => scrollToSection('about')}
          style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'monospace',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}
        >
          About
        </button>

        <button
          onClick={() => scrollToSection('approach')}
          style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'monospace',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}
        >
          Approach
        </button>

        <button
          onClick={() => scrollToSection('features')}
          style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'monospace',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}
        >
          Features
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          style={{
            background: 'none',
            border: 'none',
            color: '#e0e0e0',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'monospace',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#4488ff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#e0e0e0'}
        >
          Contact
        </button>

        <button
          onClick={onEnterVR}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2266cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3377dd'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2266cc'}
        >
          ENTER VR MODE
        </button>
      </div>
    </nav>
  );
};
