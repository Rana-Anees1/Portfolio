import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { mernStack, skillGroups, orbitInner, orbitOuter } from '../data/skills';
import { TiltCard } from '../components/TiltCard';
import { Reveal, Stagger, RevealItem } from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { easeIOS } from '../components/motion';

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad relative overflow-hidden">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="skills-title" className="text-[clamp(1.9rem,4.4vw,3.1rem)] font-semibold">
            I'm looking to join a team that builds fast, accessible products people enjoy using.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mist">Built around the MERN stack, plus the tools I use every day.</p>
        </Reveal>

        <Orbit />

        <Stagger className="mt-6 grid gap-5 lg:grid-cols-2">
          <MernCard />
          {skillGroups.map((group) => (
            <RevealItem key={group.title} className="glass flex flex-col rounded-[28px] p-6">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <p className="mt-2 text-[0.95rem] text-mist">{group.description}</p>
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {group.items.map((item) => (
                  <SkillTile key={item.name} skill={item} />
                ))}
              </ul>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Featured, full-width card for the four MERN technologies. */
function MernCard() {
  return (
    <TiltCard reveal max={2.5} lift={4} className="glass rounded-[32px] p-6 sm:p-8 lg:col-span-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold sm:text-[1.75rem]">MERN stack</h3>
          <p className="mt-1 text-mist">My primary stack for building complete web applications.</p>
        </div>
        <span className="w-fit rounded-full bg-iris/15 px-3 py-1 text-sm font-medium text-iris-soft">Used professionally</span>
      </div>
      <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {mernStack.map((item) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.name}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group/tile relative overflow-hidden rounded-[22px] border border-fg/[0.07] bg-fg/[0.035] p-4 transition-colors duration-300 hover:border-fg/15 hover:bg-fg/[0.06] sm:p-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[6.5rem] font-bold leading-none text-fg/[0.05] transition-colors duration-500 group-hover/tile:text-fg/[0.09]"
              >
                {item.letter}
              </span>
              <span
                className="grid size-11 place-items-center rounded-2xl bg-fg/[0.06] transition-shadow duration-300 group-hover/tile:shadow-[0_0_28px_-4px_var(--glow)]"
                style={{ '--glow': item.color }}
              >
                <Icon aria-hidden="true" className="size-[22px]" style={{ color: item.color }} />
              </span>
              <p className="mt-6 font-display text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-mist">{item.role}</p>
            </motion.li>
          );
        })}
      </ul>
    </TiltCard>
  );
}

function SkillTile({ skill }) {
  const Icon = skill.icon;
  return (
    <motion.li
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="group flex items-center gap-3 rounded-2xl border border-fg/[0.07] bg-fg/[0.035] px-3 py-3 transition-colors duration-300 hover:border-fg/15 hover:bg-fg/[0.07]"
    >
      <span
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-fg/[0.06] transition-shadow duration-300 group-hover:shadow-[0_0_24px_-4px_var(--glow)]"
        style={{ '--glow': skill.color }}
      >
        <Icon aria-hidden="true" className="size-[18px]" style={{ color: skill.color }} />
      </span>
      <span className="text-[0.95rem] font-medium">{skill.name}</span>
    </motion.li>
  );
}

/** Centre mark with two slowly counter-rotating rings of tech icons. Paused when off-screen. */
function Orbit() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '120px' });

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: easeIOS }}
      data-paused={!inView}
      className="orbit relative mx-auto my-10 aspect-square w-full max-w-[min(92vw,520px)]"
    >
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,var(--halo),transparent_68%)]" />
      <div className="absolute inset-[4%] rounded-full border border-fg/[0.05] [transform:rotateX(68deg)_rotateZ(-18deg)]" />

      <Ring items={orbitOuter} inset="2%" duration="90s" iconClass="size-11 sm:size-12" reverse />
      <Ring items={orbitInner} inset="20%" duration="60s" iconClass="size-10 sm:size-11" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-5 opacity-70">
          <div className="glass liquid-morph size-full" />
        </div>
        <div className="glass grid size-24 place-items-center rounded-[30px] shadow-[0_0_80px_-10px_color-mix(in_oklab,var(--iris)_70%,transparent)] sm:size-28 sm:rounded-[34px]">
          <LogoMark className="size-14 sm:size-16" />
        </div>
      </div>
    </motion.div>
  );
}

function Ring({ items, inset, duration, iconClass, reverse = false }) {
  return (
    <div
      className={`orbit-ring absolute rounded-full border border-fg/10 ${reverse ? 'reverse' : ''}`}
      style={{ inset, '--orbit-duration': duration }}
    >
      {items.map((skill, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
        const Icon = skill.icon;
        return (
          <div
            key={skill.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
          >
            <span className={`orbit-item glass grid place-items-center rounded-2xl ${iconClass}`}>
              <Icon className="size-5" style={{ color: skill.color }} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
