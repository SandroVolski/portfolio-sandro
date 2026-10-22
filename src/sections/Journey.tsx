import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/motion';
import type { Education, Experience } from '../content';
import './Journey.css';

interface Props {
  experience: Experience[];
  education: Education[];
  reduced: boolean;
}

/** Logo da instituição; sem arquivo, mostra a inicial do nome. */
function Logo({ src, name }: { src?: string; name: string }) {
  return (
    <span className="jny__logo" aria-hidden="true">
      {src ? <img src={src} alt="" loading="lazy" /> : <b>{name.trim()[0]}</b>}
    </span>
  );
}

export default function Journey({ experience, education, reduced }: Props) {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  // Só na Trajetória o fundo de circuito fica bem mais apagado, para não competir com o texto.
  useGSAP(
    () => {
      const bg = document.querySelector('.cb');
      if (!bg) return;
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onToggle: (self) => gsap.to(bg, { opacity: self.isActive ? 0.35 : 1, duration: 0.6, overwrite: true }),
      });
      return () => {
        gsap.set(bg, { opacity: 1 });
      };
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(line.current, { scaleY: 1 });
        return;
      }
      // A linha acompanha a rolagem pelo trecho da trajetória.
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.jny__list', start: 'top 70%', end: 'bottom 60%', scrub: true } },
      );
      // Cada experiência acende quando chega ao centro da tela.
      gsap.utils.toArray<HTMLElement>('.jny__item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.35 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: item, start: 'top 80%', end: 'top 45%', scrub: true },
          },
        );
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="trajetoria" className="jny" aria-labelledby="jny-title">
      <div className="wrap jny__grid">
        <h2 id="jny-title" className="h-section jny__title">
          Trajetória
        </h2>

        <div className="jny__main">
          <ol className="jny__list">
            <span ref={line} className="jny__line" aria-hidden="true" />
            {experience.map((e) => (
              <li key={e.id} className="jny__item">
                <p className="jny__when">
                  {e.start} a {e.end}
                </p>
                <div className="jny__what">
                  <h3 className="jny__role">{e.role}</h3>
                  <p className="jny__org jny__orgline">
                    <Logo src={e.logo} name={e.org} />
                    <span>
                      {e.org}. {e.place}.
                    </span>
                  </p>
                  <p className="jny__summary measure">{e.summary}</p>
                  <ul className="jny__bullets">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {e.stack.length > 0 && (
                    <ul className="chips" aria-label="Tecnologias">
                      {e.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="jny__edu">
            <h3 className="jny__edu-title">Formação</h3>
            <ul>
              {education.map((ed) => (
                <li key={ed.id} className="jny__edu-item">
                  <p className="jny__when">{ed.period}</p>
                  <div>
                    <p className="jny__role">{ed.title}</p>
                    <p className="jny__org jny__orgline">
                      <Logo src={ed.logo} name={ed.org} />
                      <span>{ed.org}</span>
                    </p>
                    {ed.detail && <p className="muted measure jny__detail">{ed.detail}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
