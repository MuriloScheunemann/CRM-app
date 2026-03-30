import type { CrmSegment } from '../constants/segments'

export type FormQuestionType = 'choice'

/** Cada opção soma pontos por segmento; o segmento com maior pontuação vence. */
export type FormOption = {
  id: string
  label: string
  /** Pontos por segmento (ex.: { Fintech: 3, Cloud: 1 }) */
  segmentPoints: Partial<Record<CrmSegment | string, number>>
}

export type FormQuestion = {
  id: string
  type: FormQuestionType
  title: string
  subtitle?: string
  options: FormOption[]
}

export type FormTheme = {
  accent: string
  accent2: string
  /** Cor de fundo (gradiente ou sólida) */
  background: string
  text: string
}

export type FormDefinition = {
  id: string
  slug: string
  title: string
  description: string
  theme: FormTheme
  questions: FormQuestion[]
  /** Ativo para exibição pública */
  published: boolean
}
