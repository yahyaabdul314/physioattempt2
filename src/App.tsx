/**
 * VR Concussion Recovery Platform
 * Main application entry point with VR/non-VR modes
 */

import { useState } from 'react';
import { VRApp } from './VRApp';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Approach } from './components/Approach';
import { Features } from './components/Features';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [vrMode, setVrMode] = useState(false);

  const handleEnterVR = () => {
    setVrMode(true);
  };

  // If in VR mode, show the VR app
  if (vrMode) {
    return <VRApp />;
  }

  // Otherwise show landing page with VR entry button
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#FFFFFF',
      color: '#1E293B',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <Navigation onEnterVR={handleEnterVR} />
      <Hero onEnterVR={handleEnterVR} />
      <About />
      <Approach />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
