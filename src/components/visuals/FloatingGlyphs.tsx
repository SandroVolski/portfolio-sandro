import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/motion';
import { IconBraces, IconChip, IconCube, IconBranch, IconDatabase } from './Glyphs';
import './visuals.css';

const ITEMS = [
  { C: IconBraces, cls: 'fg--1', depth: 1.0 },
  { C: IconChip, cls: 'fg--2', depth: 0.6 },
  { C: IconDatabase, cls: 'fg--3', depth: 1.4 },
  { C: IconBranch, cls: 'fg--4', depth: 0.8 },
  { C: IconCube, cls: 'fg--5', depth: 1.2 },
];

interface Props {
  reduced: boolean;
  fine: boolean;
  ready: boolean;
}

/** Ícones de tecnologia que seguem o mouse e sobem em velocidades diferentes ao rolar. */
export default function FloatingGlyphs({ reduced, fine, ready }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.set('.fg', { scale: 0, rotate: -40, opacity: 0 });
    },
    { scope: root, dependencies: [reduced] },
  );

  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap.to('.fg', { scale: 1, rotate: 0, opacity: 0.55, duration: 1.1, ease: 'back.out(1.6)', stagger: 0.1, delay: 0.5 });
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  useGSAP(
    () => {
      if (reduced) return;
      const els = gsap.utils.toArray<HTMLElement>('.fg');
      els.forEach((el, i) => {
        const d = ITEMS[i].depth;
        gsap.to(el.querySelector('.fg__scroll'), {
          yPercent: -60 * d,
          rotate: 25 * (i % 2 ? 1 : -1),
          ease: 'none',
          scrollTrigger: { trigger: root.current!.parentElement, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to(el.querySelector('.fg__bob'), { y: 12 * d, duration: 2.4 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      });
      if (!fine) return;
      const movers = els.map((el) => ({
        x: gsap.quickTo(el.querySelector('.fg__mouse'), 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(el.querySelector('.fg__mouse'), 'y', { duration: 0.8, ease: 'power3' }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m, i) => {
          m.x(-nx * 60 * ITEMS[i].depth);
          m.y(-ny * 60 * ITEMS[i].depth);
        });
      };
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: root, dependencies: [reduced, fine] },
  );

  return (
    <div ref={root} className="fgs" aria-hidden="true">
      {ITEMS.map(({ C, cls }) => (
        <div key={cls} className={`fg ${cls}`}>
          <div className="fg__scroll">
            <div className="fg__mouse">
              <div className="fg__bob">
                <C />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
