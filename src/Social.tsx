import { SocialIcon } from 'react-social-icons';

const profiles = [
  { label: 'Facebook', url: 'https://www.facebook.com/mukul.hase' },
  { label: 'GitHub', url: 'https://github.com/mukulhase' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mukul-hase-42069/' },
  { label: 'Spotify', url: 'https://open.spotify.com/user/213i4eofdg43qmfvheiso7tza' },
  { label: 'Instagram', url: 'https://www.instagram.com/mkhase/' },
];

const Social = () => (
  <footer className="social-links" aria-label="Social profiles">
    {profiles.map(({ label, url }) => (
      <SocialIcon
        key={url}
        url={url}
        label={label}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
      />
    ))}
  </footer>
);

export default Social;
