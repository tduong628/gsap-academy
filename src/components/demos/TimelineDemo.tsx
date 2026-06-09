import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { ReplayButton } from './ReplayButton';
import './demos.css';

/** Demonstrates a timeline sequencing three bars with overlap. */
export function TimelineDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!prefersReducedMotion()) play();
    },
    { scope },
  );

  const play = contextSafe(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.5 } });
    tl.from('.bar--1', { height: 0, opacity: 0 })
      .from('.bar--2', { height: 0, opacity: 0 }, '-=0.3')
      .from('.bar--3', { height: 0, opacity: 0 }, '-=0.3')
      .to('.trio', { y: -8, duration: 0.3, yoyo: true, repeat: 1 });
  });

  return (
    <div className="stage" ref={scope}>
      <div className="stage__canvas">
        <div className="trio">
          <div className="bar bar--1" style={{ height: 70 }} />
          <div className="bar bar--2" style={{ height: 120 }} />
          <div className="bar bar--3" style={{ height: 90 }} />
        </div>
      </div>
      <div className="stage__bar">
        <span className="stage__hint">3 tweens · overlapped with "-=0.3"</span>
        <ReplayButton onClick={play} />
      </div>
    </div>
  );
}
