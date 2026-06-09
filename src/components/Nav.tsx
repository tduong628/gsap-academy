import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { LESSONS } from '../data/lessons';
import './nav.css';

export function Nav() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <nav className="nav" aria-label="Lessons">
      <div className="nav__progress" ref={bar} aria-hidden="true" />
      <div className="shell nav__row">
        <a className="nav__logo" href="#top">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M26 70 L50 26 L74 70"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          GSAP<span>Academy</span>
        </a>
        <ul className="nav__links">
          {LESSONS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`}>{l.title}</a>
            </li>
          ))}
          <li>
            <a href="#showcase" className="nav__showcase">
              Showcase
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
