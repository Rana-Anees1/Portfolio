import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { fadeUp } from './motion';

/**
 * Card that tilts a few degrees toward the pointer and shows a soft light
 * following the cursor. Mouse only; touch and reduced-motion users get a static card.
 * Pass `reveal` to make it animate in as part of a <Stagger>.
 */
export function TiltCard({ as = 'div', max = 5, lift = 6, reveal = false, className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const Component = motion[as];

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const lightX = useTransform(px, (v) => `${v * 100}%`);
  const lightY = useTransform(py, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(520px circle at ${lightX} ${lightY}, rgb(157 124 255 / 0.15), transparent 55%)`;

  function handleMove(event) {
    if (reduce || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={reduce ? undefined : { y: -lift }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      {...(reveal ? { variants: fadeUp } : {})}
      className={`group relative isolate transition-[border-color,box-shadow] duration-500 hover:border-fg/20 hover:shadow-[0_30px_60px_-30px_rgb(124_77_255/0.45)] ${className}`}
      {...rest}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: light }}
      />
      {children}
    </Component>
  );
}
