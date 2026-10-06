import { motion } from 'motion/react';
import { SiExpress, SiMongodb, SiNodedotjs, SiReact } from 'react-icons/si';
import { profile } from '../data/profile';
import { easeIOS } from '../components/motion';

const mern = [
  { icon: SiMongodb, label: 'MongoDB', color: '#4DB33D' },
  { icon: SiExpress, label: 'Express.js', color: 'var(--ink)' },
  { icon: SiReact, label: 'React', color: '#3FB8DC' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E' },
];

/**
 * Hero visual for large screens: the profile portrait in a liquid-glass frame,
 * a slowly morphing glass shape behind it, and floating iOS-style widgets.
 * Each piece settles into place on load, then drifts gently.
 */
export function HeroWidgets() {
  return (
    <div className="relative hidden h-[560px] lg:block">
      {/* halo + morphing liquid glass shape */}
      <div aria-hidden="true" className="absolute left-[52%] top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--halo),transparent_65%)]" />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: easeIOS, delay: 0.5 }}
        className="absolute left-[18%] top-[8%] size-[380px]"
      >
        <div className="glass liquid-morph size-full" />
      </motion.div>

      {/* portrait */}
      <Widget delay={0.6} float={8} duration={9} position="absolute right-2 top-0 w-[320px]" className="rounded-[40px] p-2.5">
        <figure className="relative overflow-hidden rounded-[32px]">
          <img
            src={profile.photo}
            alt={`${profile.name}, ${profile.role}`}
            width="720"
            height="1485"
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover object-[50%_22%]"
          />
          <figcaption className="absolute inset-x-3 bottom-3">
            <span className="glass flex items-center justify-between gap-3 rounded-[22px] px-4 py-3 text-ink">
            <span>
              <span className="block font-display text-lg font-semibold leading-tight">{profile.name}</span>
              <span className="block text-sm text-mist">{profile.role}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-2.5 py-1 text-xs font-medium text-mint">
              <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
              Available
            </span>
            </span>
          </figcaption>
        </figure>
      </Widget>

      {/* MERN stack pill */}
      <Widget delay={0.9} float={10} duration={7} position="absolute left-0 top-14 z-10" className="rounded-[22px] px-4 py-3">
        <p className="text-xs font-medium text-mist">Primary stack</p>
        <ul className="mt-2 flex gap-2" aria-label="MERN stack">
          {mern.map(({ icon: Icon, label, color }) => (
            <li key={label} title={label} className="grid size-9 place-items-center rounded-xl bg-fg/[0.06] ring-1 ring-fg/[0.06]">
              <Icon aria-hidden="true" className="size-[18px]" style={{ color }} />
              <span className="sr-only">{label}</span>
            </li>
          ))}
        </ul>
      </Widget>

      {/* code card (stays dark in both themes, like an editor) */}
      <Widget
        aria-hidden="true"
        delay={1.05}
        float={12}
        duration={8.5}
        position="absolute bottom-6 left-0 z-10 w-[340px]"
        className="rounded-[24px]"
        surface="glass-code"
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff6b6b]/80" />
          <span className="size-2.5 rounded-full bg-[#ffd166]/80" />
          <span className="size-2.5 rounded-full bg-[#6ee7b7]/80" />
          <span className="ml-2 text-xs text-[#a99fbd]">server.js</span>
        </div>
        <pre className="overflow-hidden px-4 py-4 font-mono text-[12px] leading-[1.75]">
          <code>
            <V>app</V>.<F>get</F>(<S>'/api/projects'</S>, <K>async</K> (<V>req</V>, <V>res</V>) {'=> {'}
            {'\n  '}<K>const</K> <V>projects</V> = <K>await</K> <F>Project</F>.<F>find</F>();
            {'\n  '}<V>res</V>.<F>json</F>(<V>projects</V>);
            {'\n'}{'});'}
          </code>
        </pre>
      </Widget>
    </div>
  );
}

function Widget({ delay, float, duration, position, className, surface = 'glass', children, ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: easeIOS, delay }}
      className={position}
      {...rest}
    >
      <motion.div
        animate={{ y: [0, -float, 0] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
        className={`${surface} ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const K = ({ children }) => <span className="text-[#e08cff]">{children}</span>;
const F = ({ children }) => <span className="text-[#7fb4ff]">{children}</span>;
const V = ({ children }) => <span className="text-[#c9b8ff]">{children}</span>;
const S = ({ children }) => <span className="text-[#6ee7b7]">{children}</span>;
