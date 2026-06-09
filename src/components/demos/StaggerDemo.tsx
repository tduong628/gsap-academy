import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { ReplayButton } from './ReplayButton';
import './demos.css';

const CELLS = Array.from({ length: 28 });

/** Demonstrates a grid-aware stagger rippling from the centre. */
export function StaggerDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!prefersReducedMotion()) play();
    },
    { scope },
  );

  const play = contextSafe(() => {
    gsap.fromTo(
      '.grid span',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: { each: 0.04, grid: [4, 7], from: 'center' },
      },
    );
  });

  return (
    <div className="stage" ref={scope}>
      <div className="stage__canvas">
        <div className="grid">
          {CELLS.map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <div className="stage__bar">
        <span className="stage__hint">stagger.grid [4,7] · from: "center"</span>
        <ReplayButton onClick={play} />
      </div>
    </div>
  );
}
