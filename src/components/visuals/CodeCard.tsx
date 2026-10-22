import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/motion';
import './visuals.css';

interface Props {
  role: string;
  place: string;
  products: number;
  reduced: boolean;
}

/** Janela de código que "digita" o perfil conforme a seção Sobre passa. */
export default function CodeCard({ role, place, products, reduced }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>('.code__line');
      if (reduced) return;
      gsap.set(lines, { clipPath: 'inset(0 100% 0 0)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current!.closest('.about'), start: 'top 45%', end: 'bottom 80%', scrub: 0.6 },
      });
      lines.forEach((l) => tl.to(l, { clipPath: 'inset(0 0% 0 0)', duration: 1 }));
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="code" aria-hidden="true">
      <div className="code__bar">
        <i />
        <i />
        <i />
        <span>sandro.ts</span>
      </div>
      <pre className="code__body">
        <div className="code__line"><b className="k">const</b> sandro = {'{'}</div>
        <div className="code__line">  papel: <b className="s">'{role}'</b>,</div>
        <div className="code__line">  local: <b className="s">'{place}'</b>,</div>
        <div className="code__line">  produtos: <b className="n">{products}</b>,</div>
        <div className="code__line">  stack: [<b className="s">'React'</b>, <b className="s">'TypeScript'</b>,</div>
        <div className="code__line">          <b className="s">'Node.js'</b>, <b className="s">'Supabase'</b>],</div>
        <div className="code__line">  ia: <b className="s">'aplicada'</b>,</div>
        <div className="code__line">  aberto: <b className="k">true</b>,</div>
        <div className="code__line">{'}'}<span className="code__caret" /></div>
      </pre>
    </div>
  );
}
