import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/motion';
import './visuals.css';

/** Trilhas de placa de circuito que se desenham conforme a página rola. */
const TRACES = [
  'M-20 140 H260 l60 60 H620 l40 -40 H980 l50 50 H1640',
  'M-20 330 H180 l50 -50 H430 l70 70 H760 l45 45 H1100 l60 -60 H1640',
  'M-20 560 H340 l70 70 H690 l50 -50 H1010 l60 60 H1300 l40 -40 H1640',
  'M-20 790 H120 l60 -60 H520 l60 60 H900 l50 -50 H1250 l50 50 H1640',
  'M300 -20 V120 l50 50 V420 l60 60 V700 l-40 40 V1020',
  'M820 -20 V210 l-50 50 V470 l50 50 V740 l60 60 V1020',
  'M1340 -20 V160 l60 60 V400 l-50 50 V680 l50 50 V1020',
];
const PADS: Array<[number, number]> = [
  [320, 200],
  [980, 140],
  [500, 350],
  [1160, 290],
  [410, 630],
  [1070, 620],
  [180, 730],
  [900, 740],
  [1300, 450],
  [770, 260],
];

export default function CircuitBackground({ reduced }: { reduced: boolean }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const whole = { trigger: document.body, start: 'top top', end: 'bottom bottom' };
      gsap.utils.toArray<SVGPathElement>('.cb__trace').forEach((t, i) => {
        gsap.fromTo(
          t,
          { drawSVG: '0% 0%' },
          { drawSVG: '0% 100%', ease: 'none', scrollTrigger: { ...whole, scrub: 1 + i * 0.15 } },
        );
      });
      gsap.to(root.current, { yPercent: -6, ease: 'none', scrollTrigger: { ...whole, scrub: true } });
      gsap.fromTo(
        '.cb__pad',
        { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' },
        { opacity: 1, scale: 1, stagger: 0.1, ease: 'none', scrollTrigger: { ...whole, end: '70% bottom', scrub: true } },
      );
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div className={`cb${reduced ? ' cb--static' : ''}`} aria-hidden="true">
      <svg ref={root} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g className="cb__base">
          {TRACES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="cb__lit">
          {TRACES.map((d) => (
            <path key={d} className="cb__trace" d={d} />
          ))}
        </g>
        {PADS.map(([x, y]) => (
          <g key={`${x}${y}`} className="cb__pad">
            <circle cx={x} cy={y} r="9" />
            <circle cx={x} cy={y} r="3" className="cb__pad-dot" />
          </g>
        ))}
      </svg>
    </div>
  );
}
