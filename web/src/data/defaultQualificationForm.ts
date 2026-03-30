import type { FormDefinition } from '../types/forms'

export const DEFAULT_FORM_ID = 'form-qualificacao-b2b-v1'

export const defaultQualificationForm: FormDefinition = {
  id: DEFAULT_FORM_ID,
  slug: 'qualificacao-b2b',
  title: 'Diagnóstico B2B',
  description:
    'Responda em poucos passos. Usamos suas respostas para qualificar o melhor segmento e priorizar o follow-up comercial.',
  published: true,
  theme: {
    accent: '#22d3ee',
    accent2: '#a78bfa',
    background: 'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(34, 211, 238, 0.25), transparent 55%), #030712',
    text: '#f1f5f9',
  },
  questions: [
    {
      id: 'q-vertical',
      type: 'choice',
      title: 'Qual vertical melhor descreve sua operação hoje?',
      subtitle: 'Isso ajuda a direcionar conteúdo e cases.',
      options: [
        {
          id: 'opt-fin',
          label: 'Serviços financeiros / pagamentos',
          segmentPoints: { Fintech: 4, Enterprise: 1 },
        },
        {
          id: 'opt-log',
          label: 'Cadeia de suprimentos / logística',
          segmentPoints: { Logistica: 4, Manufatura: 1 },
        },
        {
          id: 'opt-cloud',
          label: 'Software / infraestrutura em nuvem',
          segmentPoints: { Cloud: 4, Servicos: 1 },
        },
        {
          id: 'opt-varejo',
          label: 'Varejo / e-commerce B2B',
          segmentPoints: { Varejo: 4, Enterprise: 1 },
        },
      ],
    },
    {
      id: 'q-maturidade',
      type: 'choice',
      title: 'Como está a automação dos seus processos comerciais?',
      subtitle: 'Sem julgamento — só contexto.',
      options: [
        {
          id: 'opt-manual',
          label: 'Ainda muito manual (planilhas, e-mail solto)',
          segmentPoints: { Servicos: 2, Educacao: 1 },
        },
        {
          id: 'opt-misto',
          label: 'Misto: algumas ferramentas, pouca integração',
          segmentPoints: { Cloud: 3, Fintech: 1 },
        },
        {
          id: 'opt-orch',
          label: 'Já uso orquestração (ex.: n8n) em partes do fluxo',
          segmentPoints: { Cloud: 4, Enterprise: 2 },
        },
      ],
    },
    {
      id: 'q-ticket',
      type: 'choice',
      title: 'Faixa de ticket médio dos seus contratos B2B?',
      options: [
        { id: 'opt-smb', label: 'Até ~R$ 50 mil', segmentPoints: { Educacao: 1, Servicos: 2 } },
        { id: 'opt-mid', label: 'R$ 50 mil a R$ 500 mil', segmentPoints: { Manufatura: 2, Varejo: 2, Saude: 2 } },
        { id: 'opt-ent', label: 'Acima de R$ 500 mil / enterprise', segmentPoints: { Enterprise: 5, Fintech: 2 } },
      ],
    },
  ],
}
