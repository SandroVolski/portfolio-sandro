import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/motion';
import { IconBraces, IconChip, IconCube, IconBranch } from './Glyphs';
import './visuals.css';

const ICONS = [IconBraces, IconChip, IconCube, IconBranch];

interface Props {
  rows: [string[], string[]];
  reduced: boolean;
}

/** Duas faixas de texto gigante que correm em sentidos opostos com a rolagem. */
export default function Band({ rows, reduced }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 };
      gsap.fromTo('.band__row--a .band__inner', { xPercent: 0 }, { xPercent: -33.333, ease: 'none', scrollTrigger: st });
      gsap.fromTo('.band__row--b .band__inner', { xPercent: -33.333 }, { xPercent: 0, ease: 'none', scrollTrigger: st });
      gsap.fromTo(root.current, { rotate: -2.5 }, { rotate: 1.5, ease: 'none', scrollTrigger: st });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="band" aria-hidden="true">
      {rows.map((words, r) => (
        <div key={r} className={`band__row band__row--${r ? 'b' : 'a'}`}>
          <div className="band__inner">
            {[0, 1, 2].map((copy) => (
              <div className="band__copy" key={copy}>
                {words.map((w, i) => {
                  const Icon = ICONS[(i + r) % ICONS.length];
                  return (
                    <span className="band__item" key={w}>
                      <span className="band__word">{w}</span>
                      <Icon className="band__icon" />
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
