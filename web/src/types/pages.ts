export type CrmPage =
  | 'dashboard'
  | 'pipeline'
  | 'companies'
  | 'contacts'
  | 'forms'
  | 'activities'
  | 'campaigns'
  | 'email'
  | 'integrations'

export const CRM_PAGE_META: Record<CrmPage, { title: string; description: string }> = {
  dashboard: { title: 'Visão geral', description: 'KPIs e resumo operacional' },
  pipeline: { title: 'Funil de vendas', description: 'Board por estágio' },
  companies: { title: 'Empresas', description: 'Carteira B2B' },
  contacts: { title: 'Contatos', description: 'Pessoas-chave' },
  forms: { title: 'Formulários', description: 'Qualificação estilo Typeform' },
  activities: { title: 'Atividades', description: 'Próximos toques' },
  campaigns: { title: 'Campanhas', description: 'Disparos e n8n' },
  email: { title: 'E-mail', description: 'SMTP e protocolos' },
  integrations: { title: 'Integrações n8n', description: 'Webhooks e automação' },
}
