import { motion } from 'motion/react';
import { LuArrowDown, LuBadgeCheck, LuLayoutGrid, LuMail, LuDownload } from 'react-icons/lu';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profile } from '../data/profile';
import { Avatar } from '../components/Avatar';
import { Button, IconLink } from '../components/Button';
import { easeIOS } from '../components/motion';
import { HeroWidgets } from './HeroWidgets';

const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: easeIOS } },
};

export function Hero() {
  const { tagline, currentExperience } = profile;

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center pb-24 pt-32 sm:pt-36">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={sequence} initial="hidden" animate="show" className="flex flex-col">
          <motion.p variants={rise} className="glass mb-8 inline-flex w-fit items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-sm text-mist">
            <span className="relative flex size-6 items-center justify-center rounded-full bg-mint/15">
              <span className="size-2 rounded-full bg-mint" />
              <span className="absolute size-2 animate-ping rounded-full bg-mint/70 motion-reduce:hidden" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.div variants={rise} className="flex items-center gap-4 sm:gap-6">
            <Avatar size="xl" className="lg:hidden" />
            <div>
              <p className="text-[0.95rem] text-mist">
                {profile.greeting} <span className="font-medium text-iris-soft">{profile.name}</span>
              </p>
              <p className="mt-1 max-w-sm font-display text-[clamp(1.35rem,3vw,1.9rem)] font-medium leading-[1.2] text-ink">
                {tagline.before} <CircledWord>{tagline.circled}</CircledWord> {tagline.after}
              </p>
              <p className="mt-1 font-hand text-xl text-mist">{tagline.note}</p>
            </div>
          </motion.div>

          <motion.h1
            id="hero-title"
            variants={rise}
            className="mt-10 text-[clamp(2.6rem,7.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] lg:mt-12"
          >
            <span className="sr-only">{profile.name}, </span>
            <span className="text-gradient">I'm a {profile.role}.</span>
            <span className="caret" aria-hidden="true" />
          </motion.h1>

          <motion.p variants={rise} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-mist">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[0.95rem] font-medium text-ink">
              <LuBadgeCheck aria-hidden="true" className="size-4 text-iris" />
              {profile.secondaryRole}
            </span>
            <span>
              {currentExperience.duration} at <span className="font-medium text-ink">{currentExperience.company}</span>
            </span>
          </motion.p>

          <motion.p variants={rise} className="mt-4 max-w-[34rem] text-lg leading-relaxed text-ink/85">
            {profile.intro}
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={LuLayoutGrid}>
              View projects
            </Button>
            <Button href="#contact" variant="glass" icon={LuMail}>
              Contact me
            </Button>
            {profile.resumeUrl && (
              <Button href={profile.resumeUrl} variant="glass" icon={LuDownload} download>
                Download CV
              </Button>
            )}
            <div className="flex gap-2 sm:ml-2">
              <IconLink href={profile.socials.github} label="GitHub" icon={FaGithub} />
              <IconLink href={profile.socials.linkedin} label="LinkedIn" icon={FaLinkedin} />
            </div>
          </motion.div>
        </motion.div>

        <HeroWidgets />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-sm text-mist transition-colors hover:text-ink sm:flex"
      >
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <LuArrowDown aria-hidden="true" className="size-4" />
        </motion.span>
        Scroll
      </motion.a>
    </section>
  );
}

/** Hand-drawn loop around a word, drawn once after the hero settles. */
function CircledWord({ children }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-1 text-iris-soft">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 70"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -left-1.5 -top-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)] overflow-visible"
      >
        <motion.path
          d="M28 14 C 80 0, 172 4, 192 30 C 206 56, 140 68, 92 66 C 36 64, 2 50, 7 32 C 12 14, 64 4, 124 7"
          fill="none"
          stroke="var(--iris)"
          strokeWidth="2.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeIOS, delay: 1.4 }}
        />
      </svg>
    </span>
  );
}
