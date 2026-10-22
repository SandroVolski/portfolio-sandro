import type { Project } from './schema.ts';

const showcase = 'https://github.com/SandroVolski/autobotize-showcase';

export const projects: Project[] = [
  {
    id: 'autobotize-musical',
    name: 'Autobotize Gestão Musical',
    kind: 'SaaS para escolas de música',
    period: 'abr/2026 até hoje',
    status: 'em operação real',
    summary:
      'Sistema completo de gestão para escolas de música, em uso por um cliente real. Cobre a rotina acadêmica, a agenda, o financeiro e o contato com alunos e responsáveis.',
    highlights: [
      'Acadêmico: alunos, turmas, matrículas, presença, planos de aula e avaliações.',
      'Agenda com reposições e confirmação de aula pelo WhatsApp: o aluno responde na própria conversa.',
      'Financeiro com contratos, cobranças, contas a pagar e vendas, mais CRM de leads.',
      'Hub de IA: previsão de evasão, repertório, horários, planos de estudo e chatbot.',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'Edge Functions', 'TanStack Query', 'Zod'],
    images: [
      { src: '/images/musical-dashboard.jpg', alt: 'Painel inicial do Autobotize Gestão Musical, com alunos, pagamentos da semana e insights de IA' },
      { src: '/images/musical-hub-ia.jpg', alt: 'Hub de Inteligência Artificial com seis recursos para a escola' },
      { src: '/images/musical-financeiro.jpg', alt: 'Tela financeira com recebimentos, inadimplência e ticket médio' },
      { src: '/images/musical-confirmacoes.jpg', alt: 'Confirmação de aulas por WhatsApp' },
      { src: '/images/musical-agenda.jpg', alt: 'Agenda semanal de aulas da escola de música' },
    ],
    links: [{ label: 'Ver telas e módulos', href: showcase, kind: 'case' }],
    note: 'Código privado. As telas são de uma conta de desenvolvimento, com dados fictícios.',
  },
  {
    id: 'autobotize-clinicas',
    name: 'Autobotize Gestão de Clínicas',
    kind: 'SaaS para clínicas e consultórios',
    period: 'jun/2026 até hoje',
    status: 'em produção',
    summary:
      'Gestão de clínicas com agenda online, prontuário e financeiro, com IA aplicada ao registro clínico.',
    highlights: [
      'Anamnese por perfil profissional, como a Fisioterapia, com captura de conversa por voz.',
      'Evoluções, prescrições, exames e relatórios por paciente.',
      'Agendamento online com lembretes e confirmação pelo WhatsApp.',
      'Cobrança recorrente com Stripe, checkout e tratamento de falhas de pagamento.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Recharts'],
    images: [
      { src: '/images/clinicas-prontuario.jpg', alt: 'Prontuário com anamnese inteligente e captura de conversa por voz' },
      { src: '/images/clinicas-agenda.jpg', alt: 'Agenda semanal por profissional, com filtros e visões de dia, semana e mês' },
      { src: '/images/clinicas-financeiro.jpg', alt: 'Financeiro com receitas, despesas, saldo, valores a receber e a pagar' },
      { src: '/images/clinicas-ia.jpg', alt: 'Área de Inteligência Artificial com insights do painel, de clientes e previsão financeira' },
    ],
    links: [{ label: 'Ver telas e módulos', href: showcase, kind: 'case' }],
    note: 'Código privado. As telas são de uma conta de desenvolvimento, com dados fictícios.',
  },
  {
    id: 'vita',
    name: 'Vita',
    kind: 'Organização pessoal de rotina e finanças',
    period: 'em desenvolvimento',
    status: 'em desenvolvimento',
    summary:
      'Um só lugar para agenda, tarefas, rotinas, contas, orçamentos e investimentos, com um assistente de IA sobre os seus próprios dados.',
    highlights: [
      'Painel com saldo, entradas, saídas e meta da semana.',
      'Rotina e finanças no mesmo fluxo: tarefas críticas, agenda e orçamento.',
      'Assistente e insights de IA sobre a rotina e as finanças.',
    ],
    stack: ['React 19', 'TypeScript', 'TanStack Start', 'TanStack Query', 'Tailwind 4', 'Supabase', 'Drizzle'],
    images: [
      { src: '/images/vita-dashboard.jpg', alt: 'Painel do Vita com saldo, entradas e saídas do mês e meta da semana' },
      { src: '/images/vita-orcamento.jpg', alt: 'Orçamento mensal com total orçado, gasto até agora e valor disponível' },
      { src: '/images/vita-caixinhas.jpg', alt: 'Caixinhas de objetivos, com valor guardado e progresso da meta' },
      { src: '/images/vita-relatorios.jpg', alt: 'Relatórios financeiros com gastos, receitas e patrimônio no período' },
      { src: '/images/vita-assistente.jpg', alt: 'Assistente de IA do Vita para perguntas sobre gastos, orçamento e investimentos' },
    ],
    links: [{ label: 'Ver telas e módulos', href: showcase, kind: 'case' }],
    note: 'Produto em construção. A tela é de uma conta de desenvolvimento.',
  },
  {
    id: 'low-cost-onco',
    name: 'Low Cost Onco',
    kind: 'Sistema de gestão em oncologia',
    period: 'fev/2025 a abr/2026',
    status: 'privado',
    summary:
      'Sistema para serviços de oncologia, com catálogo de medicamentos, protocolos de tratamento e portal para clínicas e operadoras. Atuação como desenvolvedor Full-Stack, remoto.',
    highlights: [
      'Catálogo com TUSS, princípio ativo, via, fracionamento e tempo de infusão, e protocolos com ciclos e CID.',
      'Calculadora de dose por superfície corporal, AUC e peso, com conferência da dose prescrita.',
      'Análise prévia de solicitações, com anexos e parecer técnico.',
      'API REST com JWT, controle de glosas TISS e geração automática de PDFs.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PHP', 'MySQL', 'Puppeteer', 'JWT'],
    images: [],
    links: [],
    note: 'Projeto de cliente, sem imagens públicas.',
  },
  {
    id: 'imagewizardai',
    name: 'ImageWizardAI',
    kind: 'TCC da graduação',
    period: 'abr a jul/2024',
    status: 'concluído',
    summary:
      'Protótipo web para restaurar fotos antigas com redes adversariais generativas, usando o modelo GFPGAN.',
    highlights: [
      'API em Flask exposta com Ngrok; imagens originais e restauradas no Firebase, com galeria do usuário.',
      'Front-end em Angular e Ionic, com tradução de idiomas.',
      'Desenvolvimento iterativo com casos de uso, fluxograma e protótipo de telas.',
    ],
    stack: ['Python', 'Flask', 'GFPGAN', 'Angular', 'Ionic', 'Firebase'],
    images: [],
    links: [{ label: 'Código no GitHub', href: 'https://github.com/SandroVolski/ImageWizardAI', kind: 'github' }],
  },
];
