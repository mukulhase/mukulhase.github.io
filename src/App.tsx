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
  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false);
  const [needsMotionPermission, setNeedsMotionPermission] = useState(false);

  useEffect(() => {
    const orientationEvent = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof orientationEvent?.requestPermission === 'function') {
      setNeedsMotionPermission(true);
    } else {
      setGyroscopeEnabled(true);
    }
  }, []);

  const enableMotion = async () => {
    const orientationEvent = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    try {
      const permission = await orientationEvent.requestPermission?.();
      setGyroscopeEnabled(permission === 'granted');
    } catch {
      setGyroscopeEnabled(false);
    } finally {
      setNeedsMotionPermission(false);
    }
  };

  return (
    <main className="app">
      <Tilt
        className="canvas"
        tiltEnable={!prefersReducedMotion}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={!prefersReducedMotion}
        glareMaxOpacity={0.08}
        gyroscope={!prefersReducedMotion && gyroscopeEnabled}
        scale={1.005}
        transitionSpeed={800}
      >
        <section className="hero-section" aria-labelledby="page-title">
          <h1 id="page-title" className="visually-hidden">
            Mukul Hase
          </h1>
          <Hero />
        </section>
      </Tilt>
      {needsMotionPermission && !prefersReducedMotion && (
        <button className="motion-permission" type="button" onClick={enableMotion}>
          Enable motion
        </button>
      )}
      <Social />
    </main>
  );
};

export default App;
