import { useRef } from 'react';
import VariableProximity from '../components/reactbits/VariableProximity/VariableProximity';
import { gsap, useGSAP } from '../lib/motion';
import type { Profile } from '../content';
import FloatingGlyphs from '../components/visuals/FloatingGlyphs';
import './Hero.css';

interface Props {
  profile: Profile;
  ready: boolean;
  reduced: boolean;
  fine: boolean;
}

const FROM = "'wght' 520, 'wdth' 56";
const TO = "'wght' 900, 'wdth' 150";

export default function Hero({ profile, ready, reduced, fine }: Props) {
  const root = useRef<HTMLElement>(null);
  const finePointer = fine;
  const [first, ...rest] = profile.displayName.split(' ');
  const last = rest.join(' ');

  // Estado inicial escondido desde a montagem, para a página não "piscar" antes da entrada.
  useGSAP(
    () => {
      if (reduced) return;
      gsap.set('.hero__line-in', { yPercent: 105 });
      gsap.set('.hero__photo', { clipPath: 'inset(100% 0 0 0)' });
      gsap.set('.hero__photo img', { scale: 1.25 });
      gsap.set('.hero__meta > *', { opacity: 0, y: 18 });
    },
    { scope: root, dependencies: [reduced] },
  );

  // Entrada: roda uma vez, por baixo da cortina do preloader.
  useGSAP(
    () => {
      if (!ready || reduced) return;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.hero__line-in', { yPercent: 0, duration: 1.2, stagger: 0.12 })
        .to('.hero__photo', { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' }, 0.05)
        .to('.hero__photo img', { scale: 1, duration: 1.6 }, 0.05)
        .to('.hero__meta > *', { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.55);
    },
    { scope: root, dependencies: [ready, reduced] },
  );

  // Ao rolar: as duas linhas do nome se afastam e o retrato sobe devagar.
  useGSAP(
    () => {
      if (reduced) return;
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__line:nth-child(1)', { xPercent: -9, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__line:nth-child(2)', { xPercent: 9, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__stage', { yPercent: -14, ease: 'none', scrollTrigger: st });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="inicio" className="hero" aria-labelledby="hero-title">
      <FloatingGlyphs reduced={reduced} fine={fine} ready={ready} />

      <div className="hero__stage">
        <figure className="hero__photo">
          <img src={profile.photo} alt={`Retrato de ${profile.displayName}`} width={900} height={1200} fetchPriority="high" />
        </figure>
      </div>

      <h1 id="hero-title" className="hero__name">
        <span className="hero__line">
          <span className="hero__line-in">
            <VariableProximity
              label={first}
              fromFontVariationSettings={FROM}
              toFontVariationSettings={TO}
              containerRef={root}
              radius={finePointer ? 260 : 160}
              falloff="gaussian"
              smoothing={0.25}
              idleWave={!finePointer && !reduced}
            />
          </span>
        </span>
        <span className="hero__line">
          <span className="hero__line-in">
            <VariableProximity
              label={last}
              fromFontVariationSettings={FROM}
              toFontVariationSettings={TO}
              containerRef={root}
              radius={finePointer ? 260 : 160}
              falloff="gaussian"
              smoothing={0.25}
              idleWave={!finePointer && !reduced}
            />
          </span>
        </span>
      </h1>

      <div className="hero__meta">
        <p className="hero__role">{profile.role}</p>
        <p className="hero__tagline">{profile.tagline}</p>
        <p className="hero__place muted">{profile.location}</p>
      </div>
    </section>
  );
}
