import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#120b1f', light: '#f5f3fa' };

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Light / dark theme with persistence.
 * - First visit: follows the operating-system preference (and keeps following it).
 * - After the visitor toggles: the choice is saved in localStorage.
 * The initial theme is applied by an inline script in index.html before React loads,
 * so there is no flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || storedTheme() || systemTheme());

  // Follow OS changes until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (storedTheme()) return;
      const next = media.matches ? 'light' : 'dark';
      applyTheme(next);
      setTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Keep several toggles (navbar + mobile) in sync.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.dataset.theme;
      if (current) setTheme(current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  /** Switch theme. `origin` ({x, y}) is where the circular reveal starts, e.g. the toggle button. */
  const toggleTheme = useCallback(
    (origin) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable (private mode); theme still changes for this visit */
      }

      if (prefersReducedMotion()) {
        applyTheme(next);
        return;
      }

      if (document.startViewTransition && origin) {
        const transition = document.startViewTransition(() => applyTheme(next));
        const radius = Math.hypot(
          Math.max(origin.x, window.innerWidth - origin.x),
          Math.max(origin.y, window.innerHeight - origin.y),
        );
        transition.ready
          .then(() => {
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
              { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
            );
          })
          .catch(() => {});
        return;
      }

      // Fallback: cross-fade colours.
      const root = document.documentElement;
      root.classList.add('theme-changing');
      applyTheme(next);
      window.setTimeout(() => root.classList.remove('theme-changing'), 650);
    },
    [theme],
  );

  return { theme, toggleTheme };
}
