import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/motion';
import './visuals.css';

interface Props {
  /** Seletor do elemento onde o fio termina (o título "Sobre"). */
  endSelector: string;
  reduced: boolean;
}

/**
 * Um fio de dados que nasce no hero e desce acompanhando a rolagem,
 * por baixo da faixa, até ligar no título "Sobre". Na ponta, um pacote de luz.
 */
export default function ScrollWire({ endSelector, reduced }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState({ w: 0, h: 0, d: '', ex: 0, ey: 0 });

  // Mede a zona e o título final para desenhar o caminho em pixels reais.
  useLayoutEffect(() => {
    const measure = () => {
      const el = box.current?.parentElement;
      const end = document.querySelector<HTMLElement>(endSelector);
      if (!el || !end) return;
      const z = el.getBoundingClientRect();
      const e = end.getBoundingClientRect();
      const w = z.width;
      const h = z.height;
      const x = w * 0.6;
      const ex = e.right - z.left + 24;
      const ey = e.top - z.top + e.height / 2;
      const vh = window.innerHeight;
      const d = [
        `M ${x} ${vh * 0.12}`,
        `V ${vh * 0.45}`,
        `l 40 40`,
        `V ${vh * 0.9}`,
        `l -40 40`,
        `V ${vh * 1.3}`,
        `l 40 40`,
        `V ${ey - 110}`,
        `l -40 40`,
        `H ${ex + 40}`,
        `l -40 40`,
      ].join(' ');
      if (w < 900) {
        // Celular: o fio vira uma linha reta na borda esquerda, até o título.
        setGeo({ w, h, d: `M 10 ${vh * 0.12} V ${e.top - z.top + 20}`, ex: 10, ey: e.top - z.top + 20 });
        return;
      }
      setGeo({ w, h, d, ex, ey: ey - 30 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box.current!.parentElement!);
    return () => ro.disconnect();
  }, [endSelector]);

  useGSAP(
    () => {
      if (!geo.d || !path.current) return;
      const len = path.current.getTotalLength();
      if (reduced) {
        gsap.set(path.current, { drawSVG: '100%' });
        gsap.set(dot.current, { attr: { cx: geo.ex, cy: geo.ey } });
        return;
      }
      gsap.set(path.current, { drawSVG: '0%' });
      // A ponta fica sempre a ~72% da altura da tela: o fio acompanha a rolagem, sem ficar para trás.
      const N = 600;
      const ys: number[] = [];
      for (let i = 0; i <= N; i++) ys.push(path.current.getPointAtLength((len * i) / N).y);
      const zone = box.current!.parentElement!;
      const update = () => {
        const target = -zone.getBoundingClientRect().top + window.innerHeight * 0.72;
        let i = ys.findIndex((y) => y >= target);
        if (i < 0) i = N;
        const p = i / N;
        const pt = path.current!.getPointAtLength(len * p);
        gsap.set(path.current, { drawSVG: `0% ${p * 100}%` });
        gsap.set(dot.current, { attr: { cx: pt.x, cy: pt.y } });
      };
      update();
      const st = ScrollTrigger.create({ trigger: zone, start: 'top bottom', end: 'bottom top', onUpdate: update, onRefresh: update });
      return () => st.kill();
    },
    { scope: box, dependencies: [geo.d, reduced], revertOnUpdate: true },
  );

  return (
    <div ref={box} className="wire" aria-hidden="true">
      {geo.d && (
        <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
          <path d={geo.d} className="wire__base" />
          <path ref={path} d={geo.d} className="wire__lit" />
          <circle ref={dot} r="7" className="wire__dot" />
        </svg>
      )}
    </div>
  );
}
