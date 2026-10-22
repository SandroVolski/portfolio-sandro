import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/motion';
import './Preloader.css';

interface Props {
  name: string;
  role: string;
  reduced: boolean;
  onDone: () => void;
}

/** Contagem de 0 a 100 e uma cortina que sobe. Só roda uma vez por visita. */
export default function Preloader({ name, role, reduced, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (reduced) {
        onDone();
        setGone(true);
        return;
      }
      const state = { n: 0 };
      gsap
        .timeline({
          onComplete: () => setGone(true),
        })
        .to(state, {
          n: 100,
          duration: 1.7,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(state.n)).padStart(3, '0');
          },
        })
        .to('.pre__out', { yPercent: -110, duration: 0.55, ease: 'power3.in', stagger: 0.06 }, '>0.1')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.95, ease: 'power4.inOut' }, '<0.15')
        // A entrada do hero começa junto com a cortina, então a página já aparece animando por baixo dela.
        .call(onDone, [], '<0.25');
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="pre" role="status" aria-label="Carregando o portfólio">
      <div className="pre__top">
        <span className="pre__mask">
          <span className="pre__out">{name}</span>
        </span>
        <span className="pre__mask">
          <span className="pre__out">{role}</span>
        </span>
      </div>
      <div className="pre__count" aria-hidden="true">
        <span className="pre__mask">
          <span ref={counter} className="pre__out">
            000
          </span>
        </span>
      </div>
    </div>
  );
}
