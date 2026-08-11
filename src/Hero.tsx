import logo from './logo.svg';

const Hero = () => (
  <div className="hero-content">
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
  </div>
);

export default Hero;
