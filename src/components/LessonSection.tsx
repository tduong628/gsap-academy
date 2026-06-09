import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { CodeBlock } from './CodeBlock';
import type { Lesson } from '../data/lessons';
import './lesson.css';

export function LessonSection({
  lesson,
  demo,
  flip,
}: {
  lesson: Lesson;
  demo: ReactNode;
  flip: boolean;
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reduced motion: leave content in its resting state, no scroll reveal.
      if (prefersReducedMotion()) return;
      gsap.from(scope.current!.querySelectorAll('[data-reveal]'), {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 72%',
        },
      });
    },
    { scope },
  );

  return (
    <section
      className={`lesson ${flip ? 'lesson--flip' : ''}`}
      id={lesson.id}
      ref={scope}
      aria-labelledby={`${lesson.id}-title`}
    >
      <div className="lesson__text">
        <span className="eyebrow" data-reveal>
          {lesson.num} — {lesson.tag}
        </span>
        <h2 className="lesson__title" id={`${lesson.id}-title`} data-reveal>
          {lesson.title}
        </h2>
        <p className="lesson__lede" data-reveal>
          {lesson.lede}
        </p>
        {lesson.body.map((para, i) => (
          <p className="lesson__para" data-reveal key={i}>
            {para}
          </p>
        ))}
        <ul className="lesson__points" data-reveal>
          {lesson.points.map((pt) => (
            <li key={pt}>
              <span aria-hidden="true">▹</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      <div className="lesson__demo">
        <div className="lesson__demo-inner" data-reveal>
          {demo}
        </div>
        <div data-reveal>
          <CodeBlock code={lesson.code} label={lesson.codeLabel} />
        </div>
      </div>
    </section>
  );
}
