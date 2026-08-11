import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

import './App.css';

import Hero from './Hero';
import Social from './Social';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
};

const App = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <main className="app">
      <Tilt
        className="canvas"
        tiltEnable={!prefersReducedMotion}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={!prefersReducedMotion}
        glareMaxOpacity={0.08}
        scale={1.005}
        transitionSpeed={800}
      >
        <section className="hero-section" aria-labelledby="page-title">
          <h1 id="page-title" className="visually-hidden">
            Mukul Hase
          </h1>
          <Hero />
        </section>
        <Social />
      </Tilt>
    </main>
  );
};

export default App;
