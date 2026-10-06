import { useId } from 'react';

export function LogoMark({ className = 'size-9' }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--iris-soft)" />
          <stop offset="1" stopColor="var(--iris)" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" className="fill-fg/[0.06] stroke-fg/10" />
      <path
        d="M22 46V18h11a8 8 0 0 1 0 16H22m11 0 11 12"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
