import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = {
  viewBox: '0 0 100 100',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke',
  'aria-hidden': true,
};

export const IconDatabase = (p: P) => (
  <svg {...base} {...p}>
    <ellipse className="dr" cx="50" cy="22" rx="28" ry="10" />
    <path className="dr" d="M22 22v56c0 5.5 12.5 10 28 10s28-4.5 28-10V22" />
    <path className="dr" d="M22 50c0 5.5 12.5 10 28 10s28-4.5 28-10" />
    <path className="dr" d="M22 36c0 5.5 12.5 10 28 10s28-4.5 28-10" />
  </svg>
);

export const IconApi = (p: P) => (
  <svg {...base} {...p}>
    <polyline className="dr" points="30,28 8,50 30,72" />
    <polyline className="dr" points="70,28 92,50 70,72" />
    <line className="dr" x1="56" y1="20" x2="44" y2="80" />
  </svg>
);

export const IconInterface = (p: P) => (
  <svg {...base} {...p}>
    <rect className="dr" x="8" y="14" width="84" height="72" rx="6" />
    <line className="dr" x1="8" y1="30" x2="92" y2="30" />
    <circle className="dr" cx="18" cy="22" r="1.5" />
    <circle className="dr" cx="26" cy="22" r="1.5" />
    <rect className="dr" x="18" y="40" width="26" height="36" rx="3" />
    <line className="dr" x1="54" y1="44" x2="82" y2="44" />
    <line className="dr" x1="54" y1="56" x2="76" y2="56" />
    <line className="dr" x1="54" y1="68" x2="80" y2="68" />
  </svg>
);

export const IconNeural = (p: P) => (
  <svg {...base} {...p}>
    {[22, 50, 78].flatMap((y1) =>
      [14, 38, 62, 86].map((y2) => <line className="dr" key={`${y1}-${y2}`} x1="20" y1={y1} x2="80" y2={y2} />),
    )}
    {[22, 50, 78].map((y) => (
      <circle className="dr" key={`a${y}`} cx="20" cy={y} r="6" />
    ))}
    {[14, 38, 62, 86].map((y) => (
      <circle className="dr" key={`b${y}`} cx="80" cy={y} r="6" />
    ))}
  </svg>
);

export const IconBranch = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="28" cy="20" r="8" />
    <circle cx="28" cy="80" r="8" />
    <circle cx="72" cy="36" r="8" />
    <line x1="28" y1="28" x2="28" y2="72" />
    <path d="M72 44c0 20-44 10-44 28" />
  </svg>
);

export const IconChip = (p: P) => (
  <svg {...base} {...p}>
    <rect x="26" y="26" width="48" height="48" rx="5" />
    <rect x="40" y="40" width="20" height="20" rx="2" />
    {[36, 50, 64].map((v) => (
      <g key={v}>
        <line x1={v} y1="10" x2={v} y2="26" />
        <line x1={v} y1="74" x2={v} y2="90" />
        <line x1="10" y1={v} x2="26" y2={v} />
        <line x1="74" y1={v} x2="90" y2={v} />
      </g>
    ))}
  </svg>
);

export const IconBraces = (p: P) => (
  <svg {...base} {...p}>
    <path d="M36 14c-12 0-12 6-12 16s0 12-12 20c12 8 12 10 12 20s0 16 12 16" />
    <path d="M64 14c12 0 12 6 12 16s0 12 12 20c-12 8-12 10-12 20s0 16-12 16" />
  </svg>
);

export const IconCube = (p: P) => (
  <svg {...base} {...p}>
    <polygon points="50,10 88,30 88,70 50,90 12,70 12,30" />
    <polyline points="12,30 50,50 88,30" />
    <line x1="50" y1="50" x2="50" y2="90" />
  </svg>
);
