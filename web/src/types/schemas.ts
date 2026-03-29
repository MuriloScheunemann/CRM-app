import { z } from 'zod'

export const LeadStatusSchema = z.enum(['Lead', 'Contato', 'Proposta', 'Fechado'])

export const LeadSchema = z.object({
  id: z.number(),
  company: z.string().min(1).max(100).trim(),
  contact: z.string().min(1).max(100).trim(),
  segment: z.string().min(1).max(50).trim(),
  value: z.number().nonnegative(),
  owner: z.string().min(1).max(50).trim(),
  status: LeadStatusSchema,
  lastTouch: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido (YYYY-MM-DD)')
})

export const SyncPayloadSchema = z.object({
  source: z.literal('b2b-crm'),
  sentAt: z.string().datetime(),
  totals: z.object({
    leads: z.number().nonnegative(),
    pipelineValue: z.number().nonnegative(),
    wonValue: z.number().nonnegative(),
    conversionRate: z.number().min(0).max(100)
  }),
  leads: z.array(LeadSchema)
})

export type Lead = z.infer<typeof LeadSchema>
export type LeadStatus = z.infer<typeof LeadStatusSchema>
