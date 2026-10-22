import { useRef } from 'react';
import Magnet from '../components/reactbits/Magnet/Magnet';
import { gsap, useGSAP, scrollToId } from '../lib/motion';
import type { Profile } from '../content';
import './Contact.css';

const YEAR = new Date().getFullYear();

interface Props {
  profile: Profile;
  reduced: boolean;
  fine: boolean;
}

export default function Contact({ profile, reduced, fine }: Props) {
  const root = useRef<HTMLElement>(null);
  const { contact, availability } = profile;
  const whats = `https://wa.me/${contact.phoneE164}?text=${encodeURIComponent('Olá, Sandro! Vi o seu portfólio.')}`;

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.ctc__mail-in', {
        yPercent: 100,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ctc__mail', start: 'top 85%', once: true },
      });
      gsap.from('.ctc__row > *', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ctc__row', start: 'top 90%', once: true },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="contato" className="ctc" aria-labelledby="ctc-title">
      <div className="wrap">
        <h2 id="ctc-title" className="ctc__lead">
          {availability.headline}
        </h2>

        <Magnet magnetStrength={0.12} maxOffset={26} disabled={!fine || reduced}>
          <a href={`mailto:${contact.email}`} className="ctc__mail cursor-target" aria-label={`Enviar e-mail para ${contact.email}`}>
            <span className="ctc__mail-in">{contact.email}</span>
          </a>
        </Magnet>

        <div className="ctc__row">
          <Magnet magnetStrength={0.3} maxOffset={14} disabled={!fine || reduced}>
            <a className="ctc__btn cursor-target" href={contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Magnet>
          <Magnet magnetStrength={0.3} maxOffset={14} disabled={!fine || reduced}>
            <a className="ctc__btn cursor-target" href={contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Magnet>
          <Magnet magnetStrength={0.3} maxOffset={14} disabled={!fine || reduced}>
            <a className="ctc__btn ctc__btn--solid cursor-target" href={whats} target="_blank" rel="noreferrer">
              Conversar no WhatsApp
            </a>
          </Magnet>
        </div>

        <ul className="ctc__details muted">
          {availability.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <footer className="wrap ctc__foot">
        <p className="muted">
          {profile.name}. {YEAR}.
        </p>
        <button type="button" className="ulink cursor-target" onClick={() => scrollToId('inicio')}>
          Voltar ao topo
        </button>
      </footer>
    </section>
  );
}
