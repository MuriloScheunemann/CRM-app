/** Segmentos B2B usados no CRM, campanhas e qualificação por formulário. */
export const CRM_SEGMENTS = [
  'Fintech',
  'Logistica',
  'Saude',
  'Varejo',
  'Manufatura',
  'Cloud',
  'Servicos',
  'Educacao',
  'Agronegocio',
  'Enterprise',
] as const

export type CrmSegment = (typeof CRM_SEGMENTS)[number]
