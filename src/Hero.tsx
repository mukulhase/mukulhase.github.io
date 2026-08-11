import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';

import logo from './logo.svg';

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

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Tilt
      className="hero-card"
      tiltEnable={!prefersReducedMotion}
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={!prefersReducedMotion}
      glareMaxOpacity={0.08}
      scale={1.01}
      transitionSpeed={800}
    >
      <img className="signature" src={logo} alt="Mukul Hase" draggable={false} />
      <nav className="featured-links" aria-label="Featured links">
        <a className="featured-link" href="https://music.mukulhase.com">
          <span>My Music</span>
          <span aria-hidden="true">♫</span>
        </a>
        <a
          className="featured-link"
          href="/Mukul_Hase_Resume/main.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>My Résumé</span>
          <span className="link-icon" aria-hidden="true">PDF</span>
        </a>
      </nav>
    </Tilt>
  );
};

export default Hero;
