import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';
import { STORY } from '../../data/story';
import './story.css';

/** Split a string into word <span>s for staggered reveals (diacritic-safe). */
function Words({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span className="word-wrap" key={i}>
          <span className={`word ${className ?? ''}`}>{w}</span>{' '}
        </span>
      ))}
    </>
  );
}

const STATUS_GLYPH: Record<string, string> = {
  partial: '◐',
  ran: '✓',
  untouched: '○',
};

/**
 * Showcase: a real Vietnamese journal entry animated with everything the
 * lessons teach — timelines, ScrollTrigger reveals, word stagger, a scrubbed
 * SVG draw, and a pinned scale moment.
 */
export function StoryShowcase() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const reveal = (target: gsap.TweenTarget, vars: gsap.TweenVars = {}) =>
        gsap.from(target, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          ...vars,
        });

      // 1) Opening — words rise in sequence, the "turn" line lands with weight
      gsap.from('.story-open .word', {
        yPercent: 110,
        opacity: 0,
        duration: 0.7,
        ease: 'power4.out',
        stagger: 0.04,
        scrollTrigger: { trigger: '.story-open', start: 'top 70%' },
      });

      // 2) Scrubbed thread line down the left rail
      gsap.fromTo(
        '.story-thread__draw',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.4,
          },
        },
      );

      // 3) Generic paragraph + heading reveals
      gsap.utils.toArray<HTMLElement>('[data-beat]').forEach((el) => {
        reveal(el, {
          scrollTrigger: { trigger: el, start: 'top 78%' },
        });
      });

      // 4) Morning timestamps count/slide in
      gsap.from('.story-time', {
        x: -24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.story-times', start: 'top 80%' },
      });

      // 5) The three goals — cards stagger, then status chips pop
      gsap.from('.goal', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.18,
        scrollTrigger: { trigger: '.story-goals', start: 'top 75%' },
      });
      gsap.from('.goal__chip', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2.2)',
        stagger: 0.18,
        delay: 0.35,
        scrollTrigger: { trigger: '.story-goals', start: 'top 75%' },
      });

      // 6) Pull quote — pinned, scales up as it crosses centre
      const q = gsap.timeline({
        scrollTrigger: {
          trigger: '.story-quote',
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
        },
      });
      q.from('.story-quote__text', { scale: 0.78, opacity: 0.15, ease: 'none' });

      // 7) Closing line — slow, deliberate word reveal ("chậm, nhưng đang học")
      gsap.from('.story-close .word', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.story-close', start: 'top 75%' },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope },
  );

  return (
    <section className="story" id="showcase" ref={scope} aria-label="Showcase: scrollytelling case study">
      {/* Intro / framing */}
      <div className="shell story-intro">
        <span className="eyebrow">{STORY.kicker}</span>
        <h2 className="story-intro__title" data-beat>
          Everything you learned, <span>in the wild.</span>
        </h2>
        <p className="story-intro__lede" data-beat>
          One real journal entry — a Monday reflection on running two nail salons —
          animated with the exact toolkit from the lessons above: a timeline, a
          handful of ScrollTriggers, a word-by-word stagger, a scrubbed draw, and a
          single pinned scale. Scroll slowly.
        </p>
      </div>

      {/* The piece */}
      <div className="shell story-body">
        <div className="story-thread" aria-hidden="true">
          <span className="story-thread__draw" />
        </div>

        <div className="story-flow">
          <p className="story-date mono-num" data-beat>
            {STORY.date}
          </p>

          <p className="story-open story-lead">
            <Words text={STORY.openLead} />
          </p>
          <p className="story-open story-turn">
            <Words text={STORY.openTurn} className="word--accent" />
          </p>

          {STORY.openBody.map((p, i) => (
            <p className="story-p" data-beat key={i}>
              {p}
            </p>
          ))}

          <div className="story-times" data-beat>
            {STORY.morningTimes.map((t) => (
              <div className="story-time" key={t.place}>
                <span className="story-time__time mono-num">{t.time}</span>
                <span className="story-time__place">{t.place}</span>
              </div>
            ))}
          </div>
          {STORY.morning.map((p, i) => (
            <p className="story-p" data-beat key={i}>
              {p}
            </p>
          ))}

          <h3 className="story-h" data-beat>
            {STORY.section1}
          </h3>
          <div className="story-goals">
            {STORY.goals.map((g) => (
              <article className={`goal goal--${g.status}`} key={g.text}>
                <span className="goal__chip">
                  <span className="goal__glyph">{STATUS_GLYPH[g.status]}</span>
                  {g.statusLabel}
                </span>
                <p className="goal__text">{g.text}</p>
                <p className="goal__note">{g.note}</p>
              </article>
            ))}
          </div>

          {STORY.insight.map((p, i) => (
            <p className="story-p" data-beat key={i}>
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* Pinned pull quote */}
      <div className="story-quote">
        <blockquote className="story-quote__text shell">{STORY.pullQuote}</blockquote>
      </div>

      <div className="shell story-body">
        <div className="story-thread" aria-hidden="true">
          <span className="story-thread__draw story-thread__draw--2" />
        </div>
        <div className="story-flow">
          <h3 className="story-h" data-beat>
            {STORY.section2}
          </h3>
          {STORY.experiment.map((p, i) => (
            <p className="story-p" data-beat key={i}>
              {p}
            </p>
          ))}
          <p className="story-lavie" data-beat>
            “{STORY.lavieQuote}”
            <span className="story-lavie__by">— Lavie</span>
          </p>
          <p className="story-p story-p--accent" data-beat>
            {STORY.appointment}
          </p>

          <p className="story-p story-close-lead" data-beat>
            {STORY.closeLead}
          </p>
          <p className="story-close">
            <Words text={STORY.closeFinal} className="word--accent" />
          </p>
        </div>
      </div>
    </section>
  );
}
