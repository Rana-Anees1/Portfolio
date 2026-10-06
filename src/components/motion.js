// Shared motion presets so every reveal feels like part of one system.
export const easeIOS = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: easeIOS, delay },
  }),
};

export const staggerParent = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const viewportOnce = { once: true, amount: 0.2 };
