import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/motion';
import { IconDatabase, IconApi, IconInterface, IconNeural } from './Glyphs';
import './visuals.css';

const STAGES = [
  { Icon: IconDatabase, title: 'Banco de dados', line: 'PostgreSQL, MySQL e Supabase' },
  { Icon: IconApi, title: 'API', line: 'Node.js, PHP e Python' },
  { Icon: IconInterface, title: 'Interface', line: 'React, Angular e mobile' },
  { Icon: IconNeural, title: 'IA aplicada', line: 'Redes neurais e automações' },
];

/** Cena fixa: ao rolar, um pacote de dados percorre o caminho do banco até a IA. */
export default function Pipeline({ reduced }: { reduced: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const stages = gsap.utils.toArray<HTMLElement>('.pipe__stage');
        const line = root.current!.querySelector('.pipe__lit')!;
        const packet = root.current!.querySelector('.pipe__packet')!;

        gsap.set(stages, { opacity: 0.25 });
        gsap.set('.pipe__stage .dr', { drawSVG: '0%' });
        gsap.set('.pipe__stage-text', { y: 20, opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', scrub: 0.7, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: STAGES.length - 1 }, 0.2);
        tl.fromTo(packet, { left: '12.5%' }, { left: '87.5%', duration: STAGES.length - 1 }, 0.2);
        stages.forEach((el, i) => {
          const at = i * 0.95;
          tl.to(el, { opacity: 1, duration: 0.3 }, at);
          tl.to(el.querySelectorAll('.dr'), { drawSVG: '100%', duration: 0.8, stagger: 0.04 }, at);
          tl.to(el.querySelector('.pipe__stage-text'), { y: 0, opacity: 1, duration: 0.4 }, at + 0.3);
          tl.to(el.querySelector('.pipe__icon'), { color: '#f0a53a', duration: 0.3 }, at + 0.1);
        });
      });

      // Celular: sem pin. Cada etapa desenha o ícone e sobe conforme entra na tela.
      mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.pipe__stage').forEach((el) => {
          const st = { trigger: el, start: 'top 88%', end: 'top 45%', scrub: 0.6 };
          gsap.set(el.querySelectorAll('.dr'), { drawSVG: '0%' });
          gsap.to(el.querySelectorAll('.dr'), { drawSVG: '100%', stagger: 0.04, ease: 'none', scrollTrigger: st });
          gsap.fromTo(el.querySelector('.pipe__icon'), { scale: 0.7, rotate: -12 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: st });
          gsap.fromTo(el.querySelector('.pipe__stage-text'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: st });
        });
        gsap.fromTo(
          '.pipe__mline',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.pipe__row', start: 'top 70%', end: 'bottom 60%', scrub: true } },
        );
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="pipe" aria-labelledby="pipe-title">
      <h2 id="pipe-title" className="pipe__title h-section">
        Do dado à tela
      </h2>
      <div className="pipe__row">
        <div className="pipe__rail" aria-hidden="true">
          <span className="pipe__base" />
          <span className="pipe__lit" />
        </div>
        <span className="pipe__packet" aria-hidden="true" />
        <span className="pipe__mline" aria-hidden="true" />
        {STAGES.map(({ Icon, title, line }) => (
          <div className="pipe__stage" key={title}>
            <Icon className="pipe__icon" />
            <div className="pipe__stage-text">
              <h3>{title}</h3>
              <p>{line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
