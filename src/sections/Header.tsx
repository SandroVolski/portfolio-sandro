import { useEffect, useState } from 'react';
import { scrollToId } from '../lib/motion';
import './Header.css';

const NAV = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'contato', label: 'Contato' },
];

export default function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <header className="hdr">
      <a href="#inicio" className="hdr__brand cursor-target" onClick={go('inicio')} aria-label={`${name}, ir ao início`}>
        {name}
      </a>
      <button
        type="button"
        className="hdr__burger cursor-target"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="menu-principal"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`hdr__scrim${open ? ' is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="menu-principal" aria-label="Principal" className={`hdr__nav${open ? ' is-open' : ''}`}>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className="hdr__link cursor-target">
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
