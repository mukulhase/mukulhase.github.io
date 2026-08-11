import { render, screen } from '@testing-library/react';
import { beforeAll, expect, test, vi } from 'vitest';

import App from './App';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

test('uses an HTTPS-safe root-relative résumé link', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /résumé/i })).toHaveAttribute(
    'href',
    '/Mukul_Hase_Resume/main.pdf',
  );
});

test('gives every navigation link an accessible name', () => {
  render(<App />);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(7);
  links.forEach((link) => expect(link).toHaveAccessibleName());
});
