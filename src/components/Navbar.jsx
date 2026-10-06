import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { navItems, observedSections } from '../data/navigation';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { LogoMark } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { easeIOS } from './motion';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(observedSections);
  const scrolled = useScrolled();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easeIOS, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full py-2 pl-2 pr-2 transition-[background-color,box-shadow,border-color] duration-500 sm:pl-3 ${
          scrolled || open ? 'glass-strong' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="flex items-center gap-3 rounded-full pr-2" aria-label={`${profile.name}, back to top`}>
          <LogoMark />
          <span className="hidden font-display text-[1.05rem] font-semibold tracking-tight sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-mist hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,color-mix(in_oklab,var(--fg)_14%,transparent),color-mix(in_oklab,var(--fg)_6%,transparent))] shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_6px_16px_-8px_rgb(60_30_140/0.45)] ring-1 ring-fg/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle className="mr-1" />
          <SocialIcon href={profile.socials.github} label="GitHub" icon={FaGithub} />
          <SocialIcon href={profile.socials.linkedin} label="LinkedIn" icon={FaLinkedin} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        <button
          type="button"
          className="relative grid size-11 place-items-center rounded-full text-ink"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <motion.span
            className="absolute h-[2px] w-5 rounded-full bg-current"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            transition={{ duration: 0.35, ease: easeIOS }}
          />
          <motion.span
            className="absolute h-[2px] w-5 rounded-full bg-current"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            transition={{ duration: 0.35, ease: easeIOS }}
          />
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.4, ease: easeIOS }}
            style={{ transformOrigin: 'top center' }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-[28px] border border-fg/10 bg-[var(--menu-bg)] p-2 shadow-[0_24px_50px_-24px_rgb(30_15_70/0.45)] backdrop-blur-2xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.35, ease: easeIOS }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors ${
                      active === item.id ? 'bg-fg/10 text-ink' : 'text-mist hover:bg-fg/5 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {active === item.id && <span className="size-1.5 rounded-full bg-iris" aria-hidden="true" />}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-2 flex gap-2 border-t border-fg/10 px-2 pb-1 pt-3">
              <SocialIcon href={profile.socials.github} label="GitHub" icon={FaGithub} />
              <SocialIcon href={profile.socials.linkedin} label="LinkedIn" icon={FaLinkedin} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SocialIcon({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className="grid size-10 place-items-center rounded-full text-mist transition-colors duration-300 hover:bg-fg/10 hover:text-ink"
    >
      <Icon aria-hidden="true" className="size-[18px]" />
    </a>
  );
}
