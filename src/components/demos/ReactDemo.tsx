import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import './demos.css';

/**
 * Demonstrates the useGSAP() hook: a looping animation that is automatically
 * reverted (killed) when the component unmounts — no manual cleanup needed.
 * Toggle the component to prove the animation is torn down with it.
 */
export function ReactDemo() {
  const [mounted, setMounted] = useState(true);

  return (
    <div className="stage">
      <div className="stage__canvas">{mounted ? <Pulse /> : <Empty />}</div>
      <div className="stage__bar">
        <span className="stage__hint">
          {mounted ? 'animation is live & scoped' : 'unmounted → ctx auto-reverted'}
        </span>
        <button className="replay" onClick={() => setMounted((m) => !m)}>
          {mounted ? 'Unmount' : 'Mount'}
        </button>
      </div>
    </div>
  );
}

function Pulse() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reduced motion: no perpetual loop — the ring stays static.
      if (prefersReducedMotion()) return;
      gsap.to('.pulse', {
        scale: 1.18,
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div className="pulse">live</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="pulse" style={{ borderColor: 'var(--surface-line)', color: 'var(--text-faint)' }}>
      gone
    </div>
  );
}
