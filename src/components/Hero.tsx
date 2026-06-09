import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import './hero.css';

const TITLE = 'Learn GSAP by\nwatching it run.';

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reduced motion: skip the reveal — chars/orb sit in their natural state.
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero__char', {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.025,
      })
        .from(
          '.hero__sub, .hero__cta, .hero__meta',
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 },
          '-=0.4',
        )
        .from('.hero__orb', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, '-=0.9');

      // perpetual float on the orb (compositor-only props)
      gsap.to('.hero__orb', {
        y: -22,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
    { scope },
  );

  // Split title into spans for the char stagger (custom, no paid plugin needed)
  const lines = TITLE.split('\n');

  return (
    <header className="hero" ref={scope}>
      <div className="hero__orb" aria-hidden="true" />
      <div className="shell hero__grid">
        <div>
          <span className="hero__meta eyebrow">GSAP Academy · v3.13</span>
          <h1 className="hero__title" aria-label={TITLE.replace('\n', ' ')}>
            {lines.map((line, li) => (
              <span className="hero__line" key={li} aria-hidden="true">
                {Array.from(line).map((ch, ci) => (
                  <span className="hero__char-wrap" key={ci}>
                    <span className="hero__char">{ch === ' ' ? ' ' : ch}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero__sub">
            Six core concepts — tweens, timelines, easing, stagger, ScrollTrigger
            and the React hook — each one sitting beside a live, replayable demo.
            Read the code on the left, watch it animate on the right.
          </p>
          <div className="hero__cta">
            <a className="btn btn--accent" href="#tweens">
              Start with tweens ↓
            </a>
            <a
              className="btn btn--ghost"
              href="https://gsap.com/docs/v3/"
              target="_blank"
              rel="noreferrer"
            >
              Official docs ↗
            </a>
          </div>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>scroll</span>
        <i />
      </div>
    </header>
  );
}
