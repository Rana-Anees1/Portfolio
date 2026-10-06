import { LuArrowUp } from 'react-icons/lu';
import { profile } from '../data/profile';
import { LogoMark } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-fg/[0.07]">
      <div className="shell flex flex-col items-center justify-between gap-6 py-10 text-sm text-mist sm:flex-row">
        <div className="flex items-center gap-3">
          <LogoMark className="size-8" />
          <p>
            © {year} {profile.name}. Built with React, Tailwind CSS and Motion.
          </p>
        </div>
        <a
          href="#home"
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-ink transition-colors hover:border-fg/20"
        >
          <LuArrowUp aria-hidden="true" className="size-4" />
          Back to top
        </a>
      </div>
    </footer>
  );
}
