// Single registration point for GSAP + plugins.
// Importing from here (instead of "gsap" directly) guarantees ScrollTrigger
// is registered exactly once and survives tree-shaking.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** True when the user has asked the OS to minimise non-essential motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
