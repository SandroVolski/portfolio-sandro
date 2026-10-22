import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/motion';
import type { Project, Link } from '../content';
import { IconDatabase, IconNeural, IconChip, IconInterface, IconApi } from '../components/visuals/Glyphs';
import './Projects.css';

interface Props {
  projects: Project[];
  github: Link;
}

const BG = [IconDatabase, IconInterface, IconNeural, IconApi, IconChip];

function Media({ project }: { project: Project }) {
  // `order` guarda a ordem das telas; a primeira é a grande. Clicar numa miniatura troca de lugar com a grande.
  const [order, setOrder] = useState(() => project.images.map((_, i) => i));
  if (project.images.length === 0) {
    return (
      <div className="proj__media proj__media--text" aria-hidden="true">
        <span className="proj__ghost">{project.name}</span>
      </div>
    );
  }
  const main = project.images[order[0]];
  const swap = (pos: number) =>
    setOrder((o) => {
      const next = [...o];
      [next[0], next[pos]] = [next[pos], next[0]];
      return next;
    });

  return (
    <div className="proj__media">
      <div className="proj__window">
        <div className="proj__chrome" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <img key={main.src} className="proj__shot proj__shot--main" src={main.src} alt={main.alt} loading="lazy" width={1568} height={705} />
      </div>
      {order.length > 1 && (
        <div className="proj__thumbs" style={{ ['--n' as string]: order.length - 1 }}>
          {order.slice(1).map((imgIdx, i) => {
            const img = project.images[imgIdx];
            return (
              <button
                key={img.src}
                type="button"
                className="proj__thumb cursor-target"
                onClick={() => swap(i + 1)}
                aria-label={`Ver em destaque: ${img.alt}`}
              >
                <img className="proj__shot proj__shot--thumb" src={img.src} alt="" loading="lazy" width={1568} height={705} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Projects({ projects, github }: Props) {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current;
        if (!el || !pin.current) return;
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);

        const move = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(bar.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        });

        // Cada tela entra inclinada e se endireita ao cruzar o centro; o ícone de fundo gira devagar.
        gsap.utils.toArray<HTMLElement>('.proj__window').forEach((win) => {
          gsap.fromTo(
            win,
            { rotate: 5, scale: 0.92, transformPerspective: 900, rotateY: -14 },
            {
              rotate: -2,
              scale: 1,
              rotateY: 6,
              ease: 'none',
              scrollTrigger: { trigger: win.closest('.proj__panel'), containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>('.proj__bgglyph').forEach((g) => {
          gsap.fromTo(
            g,
            { rotate: -20, xPercent: 20 },
            {
              rotate: 25,
              xPercent: -20,
              ease: 'none',
              scrollTrigger: { trigger: g.closest('.proj__panel'), containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });

        // As telas andam um pouco mais devagar que o painel: dá profundidade ao arrasto.
        gsap.utils.toArray<HTMLElement>('.proj__media').forEach((media) => {
          gsap.fromTo(
            media,
            { xPercent: 9 },
            {
              xPercent: -9,
              ease: 'none',
              scrollTrigger: {
                trigger: media.closest('.proj__panel'),
                containerAnimation: move,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
      });

      mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
        gsap.utils.toArray<HTMLElement>('.proj__panel').forEach((panel) => {
          gsap.from(panel.querySelector('.proj__info'), {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel.querySelector('.proj__info'), start: 'top 88%', once: true },
          });
          const win = panel.querySelector('.proj__window');
          if (win) {
            gsap.fromTo(
              win,
              { rotate: 4, scale: 0.92, y: 40 },
              { rotate: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: win, start: 'top 95%', end: 'top 45%', scrub: 0.6 } },
            );
          }
          const bg = panel.querySelector('.proj__bgglyph');
          if (bg) {
            gsap.fromTo(
              bg,
              { rotate: -25, yPercent: 20 },
              { rotate: 25, yPercent: -20, ease: 'none', scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true } },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projetos" className="proj" aria-labelledby="proj-title">
      <div ref={pin} className="proj__pin">
        <div ref={track} className="proj__track">
          <header className="proj__intro">
            <h2 id="proj-title" className="h-section">
              Projetos
            </h2>
            <p className="lead">
              Três produtos próprios e o que vem do trabalho com clientes. As telas são de contas de desenvolvimento, com dados fictícios.
            </p>
            <p className="proj__hint muted" aria-hidden="true">
              Role para o lado
            </p>
          </header>

          {projects.map((p, idx) => {
            const Bg = BG[idx % BG.length];
            return (
            <article key={p.id} className="proj__panel" aria-labelledby={`proj-${p.id}`}>
              <Bg className="proj__bgglyph" />
              <div className="proj__info">
                <p className="proj__kind muted">{p.kind}</p>
                <h3 id={`proj-${p.id}`} className="proj__name">
                  {p.name}
                </h3>
                <p className="proj__status">
                  <span className="proj__dot" aria-hidden="true" />
                  {p.status}
                  {p.period !== p.status ? `, ${p.period}` : ''}
                </p>
                <p className="proj__summary">{p.summary}</p>
                <ul className="proj__list">
                  {p.highlights.slice(0, 2).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <ul className="chips" aria-label="Tecnologias">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.links.length > 0 && (
                  <p className="proj__links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ulink cursor-target">
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
                {p.note && <p className="proj__note muted">{p.note}</p>}
              </div>
              <Media project={p} />
            </article>
            );
          })}

          <footer className="proj__outro">
            <p className="proj__outro-title">Tem mais no GitHub.</p>
            <a href={github.href} target="_blank" rel="noreferrer" className="proj__outro-link cursor-target">
              {github.label}
            </a>
          </footer>
        </div>
        <div className="proj__bar" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
