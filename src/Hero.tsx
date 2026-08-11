import Signature from './Signature';

const MusicIcon = () => (
  <svg
    className="link-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M9.25 19.25a2.75 2.75 0 1 1-2.75-2.75h2.75v2.75Z" />
    <path d="M18.25 16.75a2.75 2.75 0 1 1-2.75-2.75h2.75v2.75Z" />
    <path d="M9.25 16.5V6.25l9-2v9.75M9.25 9.25l9-2" />
  </svg>
);

const PdfIcon = () => (
  <svg
    className="link-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7.25 2.75h6.5l4.5 4.5v14H7.25a1.5 1.5 0 0 1-1.5-1.5V4.25a1.5 1.5 0 0 1 1.5-1.5Z" />
    <path d="M13.75 2.75v4.5h4.5" />
    <path d="M8.4 17.7c1.75-1.95 3.15-5.35 3.55-7.9.14-.9.02-1.55-.3-1.55-.48 0-.34 1.8.35 3.8.78 2.25 1.95 3.9 3.25 4.35.8.28 1.35.04 1.35-.34 0-.63-1.56-.95-3.72-.76-2.45.22-4.82.96-5.5 1.72-.48.54-.36 1.08.04 1.2.34.1.7-.1.98-.52Z" />
  </svg>
);

const ThoughtsIcon = () => (
  <svg
    className="link-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.25 11.5a8.25 8.25 0 0 1-11.8 7.45L4 20.5l1.55-4.45A8.25 8.25 0 1 1 20.25 11.5Z" />
    <path d="M8.25 11.75h.01M12 11.75h.01M15.75 11.75h.01" strokeWidth="2.5" />
  </svg>
);

const Hero = () => (
  <div className="hero-content">
    <Signature />
    <nav className="featured-links" aria-label="Featured links">
      <a className="featured-link" href="https://music.mukulhase.com">
        <span>My Music</span>
        <MusicIcon />
      </a>
      <a
        className="featured-link"
        href="/Mukul_Hase_Resume/main.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>My Work</span>
        <PdfIcon />
      </a>
      <a className="featured-link" href="https://blog.mukulhase.com">
        <span>My Thoughts</span>
        <ThoughtsIcon />
      </a>
    </nav>
  </div>
);

export default Hero;
