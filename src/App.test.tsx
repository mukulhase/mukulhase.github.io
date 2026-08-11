import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('uses an HTTPS-safe root-relative work link', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /my work/i })).toHaveAttribute(
    'href',
    '/Mukul_Hase_Resume/main.pdf',
  );
});

test('gives every navigation link an accessible name', () => {
  render(<App />);

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(8);
  links.forEach((link) => expect(link).toHaveAccessibleName());
});

test('links to the thoughts blog', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /my thoughts/i })).toHaveAttribute(
    'href',
    'https://blog.mukulhase.com',
  );
});

test('keeps social links outside the tilting canvas', () => {
  render(<App />);

  const socialLinks = screen.getByRole('contentinfo', { name: /social profiles/i });
  expect(socialLinks.closest('.canvas')).toBeNull();
});

test('requests device-orientation permission on iOS', async () => {
  const requestPermission = vi.fn().mockResolvedValue('granted');
  Object.defineProperty(window, 'DeviceOrientationEvent', {
    configurable: true,
    value: { requestPermission },
  });

  render(<App />);
  fireEvent.click(await screen.findByRole('button', { name: /enable motion/i }));

  await waitFor(() => expect(requestPermission).toHaveBeenCalledOnce());
});
