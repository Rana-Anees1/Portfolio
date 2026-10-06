import { motion } from 'motion/react';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../hooks/useTheme';

/** Liquid-glass switch: a glass knob slides between sun and moon. */
export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  function handleClick(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleClick}
      className={`glass relative flex h-10 w-[72px] shrink-0 items-center rounded-full p-1 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-between px-[11px] text-mist">
        <LuSun className="size-4" />
        <LuMoon className="size-4" />
      </span>
      <motion.span
        aria-hidden="true"
        layout
        transition={{ type: 'spring', stiffness: 520, damping: 34 }}
        className={`relative z-10 grid size-8 place-items-center rounded-full bg-dusk text-iris shadow-[0_6px_14px_-6px_rgb(40_20_90/0.6),inset_0_1px_0_rgb(255_255_255/0.35)] ring-1 ring-fg/10 ${
          isDark ? 'ml-auto' : ''
        }`}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          className="grid place-items-center"
        >
          {isDark ? <LuMoon className="size-4" /> : <LuSun className="size-4" />}
        </motion.span>
      </motion.span>
    </button>
  );
}
