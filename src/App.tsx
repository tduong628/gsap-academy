import { type ReactNode } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { LessonSection } from './components/LessonSection';
import { StoryShowcase } from './components/showcase/StoryShowcase';
import { Footer } from './components/Footer';
import { LESSONS, type DemoKey } from './data/lessons';
import { TweenDemo } from './components/demos/TweenDemo';
import { TimelineDemo } from './components/demos/TimelineDemo';
import { EasingDemo } from './components/demos/EasingDemo';
import { StaggerDemo } from './components/demos/StaggerDemo';
import { ScrollTriggerDemo } from './components/demos/ScrollTriggerDemo';
import { ReactDemo } from './components/demos/ReactDemo';

const DEMOS: Record<DemoKey, ReactNode> = {
  tween: <TweenDemo />,
  timeline: <TimelineDemo />,
  easing: <EasingDemo />,
  stagger: <StaggerDemo />,
  scrolltrigger: <ScrollTriggerDemo />,
  react: <ReactDemo />,
};

export default function App() {
  return (
    <>
      <a className="sr-only" href="#tweens">
        Skip to lessons
      </a>
      <span id="top" />
      <Nav />
      <main>
        <Hero />
        <div className="shell">
          {LESSONS.map((lesson, i) => (
            <LessonSection
              key={lesson.id}
              lesson={lesson}
              demo={DEMOS[lesson.demo]}
              flip={i % 2 === 1}
            />
          ))}
        </div>
        <StoryShowcase />
        <Footer />
      </main>
    </>
  );
}
