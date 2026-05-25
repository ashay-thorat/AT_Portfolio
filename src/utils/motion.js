// ===== Core Variants (backward-compatible) =====

export const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.75) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

export const slideIn = (direction = 'left', type = 'tween', delay = 0, duration = 0.75) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const textVariant = (delay = 0) => ({
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      delay,
    },
  },
});

export const zoomIn = (delay = 0, duration = 0.6) => ({
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay,
    },
  },
});

// ===== New Premium Variants =====

/** Blur-in effect — element transitions from blurred to clear */
export const blurIn = (delay = 0, duration = 0.8) => ({
  hidden: {
    opacity: 0,
    filter: 'blur(12px)',
    y: 20,
  },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: [0.25, 0.4, 0, 1],
    },
  },
});

/** Clip reveal — slides content out of a clipping mask */
export const clipReveal = (direction = 'up', delay = 0, duration = 0.7) => {
  const clipPaths = {
    up: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'],
    down: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
    left: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
    right: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
  };
  return {
    hidden: {
      clipPath: clipPaths[direction]?.[0] || clipPaths.up[0],
      opacity: 0,
    },
    show: {
      clipPath: clipPaths[direction]?.[1] || clipPaths.up[1],
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: [0.25, 0.4, 0, 1],
      },
    },
  };
};

/** Spring up — bouncy entrance from below */
export const springUp = (delay = 0) => ({
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      delay,
    },
  },
});

/** Elastic scale — playful scale-in with overshoot */
export const elasticScale = (delay = 0) => ({
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 12,
      delay,
    },
  },
});

/** Rotate in — subtle rotation entrance */
export const rotateIn = (delay = 0, duration = 0.7) => ({
  hidden: { rotate: -5, opacity: 0, y: 30 },
  show: {
    rotate: 0,
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      delay,
      duration,
      ease: [0.25, 0.4, 0, 1],
    },
  },
});

/** Draw line — for SVG path animations */
export const drawLine = (delay = 0, duration = 1) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: 'tween', delay, duration, ease: 'easeInOut' },
      opacity: { delay, duration: 0.2 },
    },
  },
});
