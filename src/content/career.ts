import type { Education, Experience, SkillGroup, Link } from './schema.ts';

export const experience: Experience[] = [
  {
    id: 'autobotize',
    role: 'Desenvolvedor Full-Stack, produtos próprios',
    org: 'Autobotize',
    place: 'Remoto',
    start: 'abr/2026',
    end: 'hoje',
    summary: 'Criação e manutenção de dois SaaS em produção e de um terceiro em desenvolvimento.',
    bullets: [
      'Gestão Musical em operação real: acadêmico, agenda com WhatsApp, financeiro, CRM e Hub de IA.',
      'Gestão de Clínicas: prontuário, anamnese por voz, agenda online e cobrança recorrente com Stripe.',
      'Banco, autenticação e funções no Supabase; interface em React e TypeScript.',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Stripe'],
  },
  {
    id: 'senai',
    role: 'Docente do Curso Técnico em Desenvolvimento de Sistemas',
    org: 'SENAI, Sistema FIEP',
    logo: '/logos/senai.png',
    place: 'Irati, meio período à noite',
    start: 'mai/2025',
    end: 'hoje',
    summary: 'Aulas de desenvolvimento de sistemas, informática e operador de computador, com material didático próprio.',
    bullets: [
      'Metodologia por simulação: os alunos atuam como empresas fictícias, resolvem situações-problema e são avaliados por entregas reais.',
      'Criação de um mini-curso de IA aplicada a prompts.',
    ],
    stack: [],
  },
  {
    id: 'low-cost-onco',
    role: 'Desenvolvedor Full-Stack',
    org: 'Low Cost Onco',
    logo: '/logos/lowcostonco.png',
    place: 'Remoto, prestação de serviço',
    start: 'fev/2025',
    end: 'abr/2026',
    summary: 'Sistema de gestão para serviços de oncologia, do catálogo de medicamentos ao portal de operadoras.',
    bullets: [
      'Catálogo, protocolos de tratamento e calculadora de dose com conferência da prescrição.',
      'Portal para clínicas, operadoras e planos de saúde, com dashboards, relatórios em PDF e chat.',
      'API REST com JWT, controle de glosas TISS e geração automática de PDFs.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PHP', 'MySQL'],
  },
  {
    id: 'estagio',
    role: 'Estagiário em desenvolvimento',
    org: 'Sistema de gestão para escola de música',
    place: 'Estágio supervisionado',
    start: 'set/2024',
    end: 'dez/2024',
    summary: 'Sistema web para trocar planilhas por agendamento de aulas, matrículas e controle de pagamentos.',
    bullets: ['Relatório no formato de artigo científico.'],
    stack: ['React', 'JavaScript', 'Firebase', 'Bootstrap'],
  },
];

export const education: Education[] = [
  {
    id: 'pos-ia',
    title: 'Pós-graduação em Inteligência Artificial',
    org: 'Faculdade Iguaçu',
    logo: '/logos/iguacu.png',
    period: 'ago/2025 a jun/2026',
    detail: '640 horas. Deep Learning, Reinforcement Learning e IA em produção.',
  },
  {
    id: 'pos-cyber',
    title: 'Pós-graduação em Cybersecurity',
    org: 'Faculdade Iguaçu',
    logo: '/logos/iguacu.png',
    period: 'ago/2025 a jun/2026',
    detail: '720 horas. Detecção de ameaças e proteção de sistemas. TCC sobre Disaster Recovery as a Service para PMEs.',
  },
  {
    id: 'graduacao',
    title: 'Bacharelado em Ciência da Computação',
    org: 'Universidade Estadual do Centro-Oeste (Unicentro)',
    logo: '/logos/unicentro.png',
    period: '2021 a 2024',
    detail: 'Duas iniciações científicas: aprendizado de máquina para apoio ao diagnóstico de Parkinson (1.040 h) e IA em jogos educacionais (PROIC).',
  },
];

export const skills: SkillGroup[] = [
  { group: 'Front-end', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Vite', 'GSAP', 'ScrollTrigger', 'Lenis', 'Motion', 'React Bits', 'Angular', 'Ionic', 'Flutter'] },
  { group: 'Back-end e dados', items: ['Node.js', 'PHP', 'Python', 'Flask', 'C', 'C++', 'C#', '.NET', 'SQL', 'MySQL', 'PostgreSQL', 'Supabase', 'Firebase'] },
  { group: 'IA e segurança', items: ['Redes neurais', 'Deep Learning', 'GANs', 'Aprendizado de máquina', 'Cybersecurity'] },
  { group: 'Ferramentas', items: ['Git', 'Docker', 'APIs REST', 'JWT', 'Stripe', 'n8n'] },
];

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/SandroVolski', kind: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sandro-eduardo-p-volski-892652216', kind: 'linkedin' },
  { label: 'Telas dos produtos', href: 'https://github.com/SandroVolski/autobotize-showcase', kind: 'case' },
  { label: 'Trabalhos acadêmicos', href: 'https://github.com/SandroVolski/projetos-academicos', kind: 'github' },
];
