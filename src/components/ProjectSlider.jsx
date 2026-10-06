import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { easeIOS } from './motion';

const INTERVAL = 3800; // ms each screenshot stays on screen

// The new screenshot slides in over the previous one, which drifts back slightly (iOS "push").
const slide = {
  enter: (direction) => ({ x: `${direction * 100}%`, zIndex: 1 }),
  center: { x: '0%', zIndex: 1 },
  exit: (direction) => ({ x: `${direction * -28}%`, opacity: 0.5, zIndex: 0 }),
};

/**
 * Small auto-playing screenshot carousel used inside a project card.
 * - Images keep their aspect ratio (object-cover, anchored to the top of the page).
 * - Auto-advances only while the card is on screen; pauses on hover / keyboard focus.
 * - With "reduce motion" it does not auto-advance; the dots still switch images.
 * - `delay` staggers the first change so cards don't all slide at the same moment.
 */
export function ProjectSlider({ images, name, delay = 0 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const inView = useInView(ref, { amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [[index, direction], setSlide] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  // Warm the cache once the card is visible so every slide appears instantly.
  useEffect(() => {
    if (!inView) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [inView, images]);

  useEffect(() => {
    if (count < 2 || reduceMotion || paused || !inView) return undefined;
    const wait = started.current ? INTERVAL : INTERVAL + delay;
    const timer = window.setTimeout(() => {
      started.current = true;
      setSlide(([current]) => [(current + 1) % count, 1]);
    }, wait);
    return () => window.clearTimeout(timer);
  }, [index, count, reduceMotion, paused, inView, delay]);

  function goTo(next) {
    if (next === index) return;
    started.current = true;
    setSlide([next, next > index ? 1 : -1]);
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
      className="relative size-full overflow-hidden bg-fg/[0.04]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`${name} screenshot ${index + 1} of ${count}`}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.85, ease: easeIOS }}
          draggable={false}
          decoding="async"
          className="absolute inset-0 size-full select-none object-cover object-top"
        />
      </AnimatePresence>

      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-full bg-black/35 px-1.5 py-0.5 ring-1 ring-white/15 backdrop-blur-md">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show screenshot ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              className="grid h-4 place-items-center px-[3px]"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-ios)] ${
                  i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/85'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
