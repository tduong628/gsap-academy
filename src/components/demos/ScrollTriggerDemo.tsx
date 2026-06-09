import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { ReplayButton } from './ReplayButton';
import './demos.css';

const CARDS = ['onEnter →', 'onLeave ←', 'onEnterBack →', 'toggleActions'];

/**
 * Real ScrollTrigger: the cards animate in when the stage scrolls into view
 * and reverse when it leaves — driven by the page's own scroll position.
 */
export function ScrollTriggerDemo() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reduced motion: cards stay visible; no scroll-driven movement.
      if (prefersReducedMotion()) return;
      gsap.from('.reveal-card', {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 75%',
          end: 'bottom 60%',
          toggleActions: 'play reverse play reverse',
        },
      });
    },
    { scope },
  );

  const replay = () => {
    // Nudge the trigger to recompute, then bounce the cards for feedback.
    ScrollTrigger.refresh();
    gsap.fromTo(
      '.reveal-card',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
    );
  };

  return (
    <div className="stage" ref={scope}>
      <div className="stage__canvas">
        <div className="reveal-stack">
          {CARDS.map((c) => (
            <div className="reveal-card" key={c}>
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="stage__bar">
        <span className="stage__hint">scroll this panel past · reverses on exit</span>
        <ReplayButton onClick={replay} />
      </div>
    </div>
  );
}
