export type DemoKey =
  | 'tween'
  | 'timeline'
  | 'easing'
  | 'stagger'
  | 'scrolltrigger'
  | 'react';

export interface Lesson {
  id: string;
  num: string;
  title: string;
  tag: string;
  lede: string;
  body: string[];
  points: string[];
  code: string;
  codeLabel: string;
  demo: DemoKey;
}

export const LESSONS: Lesson[] = [
  {
    id: 'tweens',
    num: '01',
    title: 'Tweens',
    tag: 'The atom of GSAP',
    lede: 'A tween animates properties on a target over time. Everything in GSAP is built on it.',
    body: [
      'There are three ways to create one. gsap.to() animates from the current state to the values you give. gsap.from() does the reverse — it animates in from those values to the current state, which is perfect for reveals. gsap.fromTo() lets you state both ends explicitly so nothing is left to chance.',
      'GSAP exposes shorthands like x and y that map to performant CSS transforms (translateX / translateY) instead of layout-bound left / top — so motion stays on the compositor and runs at 60fps.',
    ],
    points: [
      'x / y → translate, rotate → rotate(deg), scale → scale',
      'fromTo() is the most explicit and the most predictable',
      'duration is in seconds, not milliseconds',
    ],
    code: `import { gsap } from "gsap";

// from one explicit state → another
gsap.fromTo(".box",
  { x: -120, rotate: -45, opacity: 0, scale: 0.6 },
  {
    x: 120,
    rotate: 360,
    opacity: 1,
    scale: 1,
    duration: 1.2,
    ease: "back.out(1.7)",
  }
);`,
    codeLabel: 'tween.js',
    demo: 'tween',
  },
  {
    id: 'timelines',
    num: '02',
    title: 'Timelines',
    tag: 'Sequencing without math',
    lede: 'A timeline is a container that sequences tweens so you never juggle delays by hand.',
    body: [
      'Add tweens with .to() / .from() and they queue one after another automatically. The position parameter is the superpower: a number is an absolute time, "+=0.5" adds a gap, and "-=0.3" overlaps the previous tween for a fluid, staged feel.',
      'Set defaults once on the timeline and every child inherits them. The whole sequence is one object you can play, pause, reverse, or scrub.',
    ],
    points: [
      'Children queue end-to-end by default',
      'Position param "-=0.3" overlaps; "+=0.5" gaps',
      'defaults: {} cascades to every tween',
    ],
    code: `const tl = gsap.timeline({
  defaults: { ease: "power3.out", duration: 0.5 },
});

tl.from(".bar--1", { height: 0, opacity: 0 })
  .from(".bar--2", { height: 0, opacity: 0 }, "-=0.3")
  .from(".bar--3", { height: 0, opacity: 0 }, "-=0.3")
  .to(".trio", { y: -8, yoyo: true, repeat: 1 });`,
    codeLabel: 'timeline.js',
    demo: 'timeline',
  },
  {
    id: 'easing',
    num: '03',
    title: 'Easing',
    tag: 'Where the feel lives',
    lede: 'Easing shapes how a value travels between two points. It is the difference between mechanical and alive.',
    body: [
      'GSAP ships a rich ease library. power1–power4 give increasingly aggressive acceleration; back overshoots and settles; elastic springs; bounce lands like a ball. Each takes an .in, .out, or .inOut variant.',
      'Watch the lanes below: every puck travels the same distance in the same duration. Only the ease differs — and yet they feel like completely different objects.',
    ],
    points: [
      '.out for entrances, .in for exits, .inOut for moves',
      'back.out(n) and elastic.out(amp,period) are tunable',
      'Avoid "none" (linear) for UI — it feels robotic',
    ],
    code: `// same distance, same duration — only the ease changes
const eases = [
  "none",
  "power2.out",
  "back.out(2)",
  "elastic.out(1, 0.4)",
  "bounce.out",
];

eases.forEach((ease, i) => {
  gsap.to(\`.puck--\${i}\`, { x: 300, duration: 1.6, ease });
});`,
    codeLabel: 'easing.js',
    demo: 'easing',
  },
  {
    id: 'stagger',
    num: '04',
    title: 'Stagger',
    tag: 'Many targets, one line',
    lede: 'Stagger offsets the start time of each target in a set — turning a flat group into a wave.',
    body: [
      'Pass a number for a simple per-item delay, or an object for real control: each sets the gap between items, from picks the origin ("start", "center", "edges", or an index), and grid: [rows, cols] makes the stagger spatially aware so a ripple radiates correctly across a 2D layout.',
      'It is the highest impact-to-effort tool in GSAP — one property turns a dull reveal into something choreographed.',
    ],
    points: [
      'stagger: 0.05 → simple sequential offset',
      'from: "center" radiates outward from the middle',
      'grid: [rows, cols] makes it 2D-aware',
    ],
    code: `gsap.fromTo(".grid span",
  { scale: 0, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(2)",
    stagger: {
      each: 0.04,
      grid: [4, 7],
      from: "center",
    },
  }
);`,
    codeLabel: 'stagger.js',
    demo: 'stagger',
  },
  {
    id: 'scrolltrigger',
    num: '05',
    title: 'ScrollTrigger',
    tag: 'The scroll becomes the timeline',
    lede: 'ScrollTrigger binds any animation to scroll position — for reveals, pinning, parallax and scrubbing.',
    body: [
      'Attach a scrollTrigger config to any tween or timeline. trigger is the element to watch; start and end define when it activates using the "element viewport" syntax (e.g. "top 75%"). toggleActions controls what happens on the four edges: onEnter, onLeave, onEnterBack, onLeaveBack.',
      'Add scrub: true to tie progress directly to the scrollbar, or pin: true to lock a section while its animation plays. The panel on the right reverses as it leaves the viewport — scroll it past to see.',
    ],
    points: [
      'start / end use "element viewport" pairs',
      'toggleActions: "play reverse play reverse"',
      'scrub ties progress to the scrollbar; pin locks the section',
    ],
    code: `import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.from(".reveal-card", {
  x: -40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.12,
  scrollTrigger: {
    trigger: ".panel",
    start: "top 75%",
    end: "bottom 60%",
    toggleActions: "play reverse play reverse",
  },
});`,
    codeLabel: 'scroll-trigger.js',
    demo: 'scrolltrigger',
  },
  {
    id: 'react',
    num: '06',
    title: 'useGSAP() in React',
    tag: 'Animations that clean up after themselves',
    lede: 'The official @gsap/react hook scopes selectors and reverts every animation on unmount — automatically.',
    body: [
      'useGSAP(fn, { scope }) runs your GSAP code inside a context bound to the scope ref. Two things fall out for free: selector text like ".box" is scoped to that subtree (no leaking into the rest of the page), and when the component unmounts the context is reverted, killing every tween and ScrollTrigger it created.',
      'For animations created inside event handlers, wrap them in contextSafe() so they are tracked by the same context. Toggle the demo on the right — unmounting tears the looping animation down cleanly, no stray timers.',
    ],
    points: [
      'npm i @gsap/react — then import { useGSAP }',
      '{ scope } scopes selectors AND auto-reverts on unmount',
      'contextSafe() tracks event-handler animations too',
    ],
    code: `import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function Pulse() {
  const scope = useRef(null);

  useGSAP(() => {
    gsap.to(".pulse", {
      scale: 1.18,
      duration: 0.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, { scope }); // ← reverts automatically on unmount

  return <div ref={scope}><div className="pulse" /></div>;
}`,
    codeLabel: 'use-gsap.tsx',
    demo: 'react',
  },
];
