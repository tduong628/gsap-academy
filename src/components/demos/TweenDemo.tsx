import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { ReplayButton } from './ReplayButton';
import './demos.css';

/** Demonstrates gsap.fromTo() — the most explicit tween form. */
export function TweenDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // Auto-play on mount unless the user prefers reduced motion (Replay still works).
      if (!prefersReducedMotion()) play();
    },
    { scope },
  );

  const play = contextSafe(() => {
    gsap.fromTo(
      '.box',
      { x: -120, rotate: -45, opacity: 0, scale: 0.6 },
      {
        x: 120,
        rotate: 360,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
      },
    );
  });

  return (
    <div className="stage" ref={scope}>
      <div className="stage__canvas">
        <div className="box">to</div>
      </div>
      <div className="stage__bar">
        <span className="stage__hint">ease: back.out(1.7) · 1.2s</span>
        <ReplayButton onClick={play} />
      </div>
    </div>
  );
}
