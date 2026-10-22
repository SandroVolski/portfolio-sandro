import ScrollVelocity from '../components/reactbits/ScrollVelocity/ScrollVelocity';
import { IconInterface, IconDatabase, IconNeural, IconBranch } from '../components/visuals/Glyphs';
import { gsap, useGSAP } from '../lib/motion';
import { useRef } from 'react';
import type { SkillGroup } from '../content';
import './Stack.css';

interface Props {
  skills: SkillGroup[];
  reduced: boolean;
}

const ICONS = [IconInterface, IconDatabase, IconNeural, IconBranch];

export default function Stack({ skills, reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.stk__group').forEach((g) => {
        const dr = g.querySelectorAll('.dr');
        gsap.set(dr, { drawSVG: '0%' });
        gsap.to(dr, { drawSVG: '100%', stagger: 0.05, ease: 'none', scrollTrigger: { trigger: g, start: 'top 85%', end: 'top 35%', scrub: true } });
        gsap.fromTo(g.querySelector('.stk__icon'), { rotate: -12, scale: 0.8 }, { rotate: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: g, start: 'top 90%', end: 'top 40%', scrub: true } });
      });
    },
    { scope: root, dependencies: [reduced] },
  );
  const all = skills.flatMap((s) => s.items);
  const half = Math.ceil(all.length / 2);
  const rows = [all.slice(0, half), all.slice(half)];

  return (
    <section ref={root} id="tecnologias" className="stk" aria-labelledby="stk-title">
      <div className="wrap stk__head">
        <h2 id="stk-title" className="h-section">
          Tecnologias
        </h2>
      </div>

      {/* Faixas decorativas: o conteúdo real está na lista abaixo, que leitores de tela percorrem. */}
      <div className="stk__bands" aria-hidden="true">
        <ScrollVelocity
          texts={[rows[0].join('  /  '), rows[1].join('  /  ')]}
          velocity={reduced ? 0 : 42}
          numCopies={4}
          fontSize="clamp(2.6rem, 7vw, 6.5rem)"
          fontWeight={800}
          className="stk__band"
          outlineAlternate
          skewWithVelocity={reduced ? 0 : 6}
          pauseOnHover={false}
        />
      </div>

      <div className="wrap stk__groups">
        {skills.map((g, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
          <div key={g.group} className="stk__group">
            <Icon className="stk__icon" />
            <h3 className="stk__group-title">{g.group}</h3>
            <ul className="stk__items">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          );
        })}
      </div>
    </section>
  );
}
