import { useReducedMotion } from 'framer-motion';

// Premium easing – smooth, no bounce
export const EASE_OUT = [0.25, 0.1, 0.25, 1];

// Viewport config: animate once when ~15% visible
export const viewportOnce = { once: false, amount: 0.15 };

// ---- Base variants ----

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/** Curtain wipe – reveals an element left-to-right via clip-path */
export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const clipRevealReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

/** Stagger parent – wrap a group of fadeUp children */
export const staggerContainer = (stagger = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Hero entrance sequence */
export const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
};

/** Headline lines animate one after another */
export const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

export const headlineLine = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/** Mobile menu items */
export const menuContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const menuItem = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_OUT },
  },
};

// ---- Reduced-motion fallbacks (opacity only, no movement) ----

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const fadeDownReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const scaleInReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const slideInReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const menuItemReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

/** Pick motion-safe variant based on reduced-motion preference */
export function motionVariant(reduced, full, reducedFallback = fadeUpReduced) {
  return reduced ? reducedFallback : full;
}

/** Hook: returns reduced-motion flag + pre-resolved variants */
export function useMotionSafe() {
  const reduced = useReducedMotion();

  return {
    reduced,
    fadeUp: motionVariant(reduced, fadeUp),
    fadeIn: motionVariant(reduced, fadeIn),
    fadeDown: motionVariant(reduced, fadeDown),
    scaleIn: motionVariant(reduced, scaleIn),
    slideInLeft: motionVariant(reduced, slideInLeft, slideInReduced),
    slideInRight: motionVariant(reduced, slideInRight, slideInReduced),
    headlineLine: motionVariant(reduced, headlineLine),
    menuItem: motionVariant(reduced, menuItem, menuItemReduced),
    // Hover props – disabled when reduced motion is on
    hoverLift: reduced ? undefined : { y: -4, transition: { duration: 0.25, ease: EASE_OUT } },
    hoverScale: reduced ? undefined : { scale: 1.03, transition: { duration: 0.25, ease: EASE_OUT } },
    hoverScaleSubtle: reduced ? undefined : { scale: 1.02, transition: { duration: 0.25, ease: EASE_OUT } },
    tapScale: reduced ? undefined : { scale: 0.98 },
  };
}

/** Subtle infinite float — y + micro-rotate + breathe (disabled when user prefers reduced motion) */
export const floatAnimation = {
  y: [0, -12, 0],
  rotate: [-0.8, 0.8, -0.8],
  scale: [1, 1.015, 1],
  transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
};

/** Continuous 360° spin for hero dumbbell — tweak duration to change speed */
export const spinAnimation = {
  duration: 22,
  ease: 'linear',
  repeat: Infinity,
};
