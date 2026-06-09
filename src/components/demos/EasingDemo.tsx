import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { ReplayButton } from './ReplayButton';
import './demos.css';

const EASES = ['none', 'power2.out', 'back.out(2)', 'elastic.out(1,0.4)', 'bounce.out'];

/** Races identical pucks under different eases so the curves become visible. */
export function EasingDemo() {
  const scope = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!prefersReducedMotion()) play();
    },
    { scope },
  );

  const play = contextSafe(() => {
    EASES.forEach((ease, i) => {
      gsap.fromTo(
        `.puck--${i}`,
        { x: 0 },
        {
          // function value → measured travel in px (track width − puck − padding)
          x: (_idx, el: HTMLElement) =>
            (el.parentElement?.offsetWidth ?? 0) - el.offsetWidth - 8,
          duration: 1.6,
          ease,
        },
      );
    });
  });

  return (
    <div className="stage" ref={scope}>
      <div className="stage__canvas">
        <div className="lanes">
          {EASES.map((ease, i) => (
            <div className="lane" key={ease}>
              <span className="lane__name">{ease.split('(')[0]}</span>
              <div className="lane__track">
                <div className={`lane__puck puck--${i}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="stage__bar">
        <span className="stage__hint">same distance · same duration · 5 eases</span>
        <ReplayButton onClick={play} />
      </div>
    </div>
  );
}
