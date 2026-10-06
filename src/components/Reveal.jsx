import { motion } from 'motion/react';
import { fadeUp, staggerParent, viewportOnce } from './motion';

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Reveals its <RevealItem> children one after another. */
export function Stagger({ as = 'div', stagger = 0.09, delay = 0, className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ as = 'div', className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp} {...rest}>
      {children}
    </Component>
  );
}
