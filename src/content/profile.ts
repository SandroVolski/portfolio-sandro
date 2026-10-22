import type { Profile, Stat } from './schema.ts';

export const profile: Profile = {
  name: 'Sandro Eduardo Prado Volski',
  displayName: 'Sandro Volski',
  role: 'Desenvolvedor Full-Stack',
  tagline: 'Do banco de dados à interface, para web e mobile, com IA aplicada.',
  location: 'Irati, Paraná, Brasil',
  photo: '/images/sandro.jpg',
  intro: [
    'Sou desenvolvedor de software e construo produtos inteiros: modelagem do banco, API, interface e automações.',
    'Tenho dois SaaS no ar, o Autobotize Gestão Musical, já em operação real com cliente, e o Autobotize Gestão de Clínicas. O terceiro produto, o Vita, está em desenvolvimento.',
    'Formado em Ciência da Computação, com pós-graduação em Inteligência Artificial e em Cybersecurity, e docente do Curso Técnico em Desenvolvimento de Sistemas do SENAI.',
  ],
  availability: {
    headline: 'Aberto a oportunidades como pessoa desenvolvedora Full-Stack, Back-end ou Front-end.',
    details: [
      'Remoto ou presencial, em qualquer cidade.',
      'Início imediato no remoto. Em outra cidade, até 15 dias para a mudança.',
      'Preferência por manhã e tarde.',
    ],
  },
  contact: {
    email: 'sandroeduardopradovolski@gmail.com',
    phoneDisplay: '(42) 99800-5326',
    phoneE164: '5542998005326',
    linkedin: 'https://www.linkedin.com/in/sandro-eduardo-p-volski-892652216',
    github: 'https://github.com/SandroVolski',
  },
  site: {
    title: 'Sandro Volski, desenvolvedor Full-Stack',
    description:
      'Portfólio de Sandro Volski, desenvolvedor Full-Stack em Irati/PR. React, TypeScript, Node.js, Supabase e IA aplicada. SaaS Autobotize e Vita.',
    url: 'https://sandroeduardo.autobotize.com',
    language: 'pt-BR',
  },
};

export const stats: Stat[] = [
  { value: 3, label: 'produtos próprios', detail: 'Autobotize Musical, Autobotize Clínicas e Vita' },
  { value: 14, label: 'meses em sistemas de oncologia', detail: 'Low Cost Onco, de fev/2025 a abr/2026' },
  { value: 2, label: 'pós-graduações', detail: 'Inteligência Artificial e Cybersecurity' },
  { value: 2, label: 'iniciações científicas', detail: 'Parkinson e jogos educacionais com IA' },
];
