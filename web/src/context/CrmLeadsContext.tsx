import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { z } from 'zod'
import type { FormDefinition } from '../types/forms'
import type { Lead } from '../types/schemas'
import { LeadSchema } from '../types/schemas'
import { seedLeads } from '../data/seedLeads'
import { defaultQualificationForm } from '../data/defaultQualificationForm'
import { computeQualifiedSegment } from '../lib/qualifyFromForm'

const STORAGE_LEADS = 'b2b_crm_leads_v3'
const STORAGE_FORMS = 'b2b_crm_forms_v1'

const LeadsArraySchema = z.array(LeadSchema)

type CrmLeadsContextValue = {
  leads: Lead[]
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>
  forms: FormDefinition[]
  saveForm: (form: FormDefinition) => void
  removeForm: (id: string) => void
  addLeadFromForm: (input: {
    form: FormDefinition
    answers: Record<string, string>
    name: string
    email: string
    company: string
  }) => { segment: string; lead: Lead }
}

const CrmLeadsContext = createContext<CrmLeadsContextValue | undefined>(undefined)

function normalizeSeed(): Lead[] {
  return seedLeads.map((l) => LeadSchema.parse(l))
}

function loadLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_LEADS)
    if (!raw) return normalizeSeed()
    const parsed = JSON.parse(raw) as unknown
    const arr = LeadsArraySchema.safeParse(parsed)
    return arr.success ? arr.data : normalizeSeed()
  } catch {
    return normalizeSeed()
  }
}

function loadForms(): FormDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_FORMS)
    if (!raw) return [defaultQualificationForm]
    const parsed = JSON.parse(raw) as FormDefinition[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [defaultQualificationForm]
  } catch {
    return [defaultQualificationForm]
  }
}

export function CrmLeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(() => loadLeads())
  const [forms, setForms] = useState<FormDefinition[]>(() => loadForms())

  useEffect(() => {
    localStorage.setItem(STORAGE_LEADS, JSON.stringify(leads))
  }, [leads])

  useEffect(() => {
    localStorage.setItem(STORAGE_FORMS, JSON.stringify(forms))
  }, [forms])

  const saveForm = useCallback((form: FormDefinition) => {
    setForms((prev) => {
      const i = prev.findIndex((f) => f.id === form.id)
      if (i === -1) return [...prev, form]
      const next = [...prev]
      next[i] = form
      return next
    })
  }, [])

  const removeForm = useCallback((id: string) => {
    setForms((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const addLeadFromForm = useCallback(
    (input: {
      form: FormDefinition
      answers: Record<string, string>
      name: string
      email: string
      company: string
    }) => {
      const segment = computeQualifiedSegment(input.form, input.answers)
      const today = new Date().toISOString().slice(0, 10)
      const contactLabel = `${input.name} (${input.email})`.slice(0, 100)
      let created!: Lead
      setLeads((prev) => {
        const id = prev.reduce((m, l) => Math.max(m, l.id), 0) + 1
        created = {
          id,
          company: input.company.slice(0, 100),
          contact: contactLabel,
          segment: segment.slice(0, 50),
          value: 0,
          owner: 'Formulario',
          status: 'Lead',
          lastTouch: today,
          leadSource: 'form',
          formSlug: input.form.slug,
          formId: input.form.id,
        }
        return [...prev, created]
      })
      return { segment, lead: created }
    },
    []
  )

  const value = useMemo(
    () => ({
      leads,
      setLeads,
      forms,
      saveForm,
      removeForm,
      addLeadFromForm,
    }),
    [leads, forms, saveForm, removeForm, addLeadFromForm]
  )

  return <CrmLeadsContext.Provider value={value}>{children}</CrmLeadsContext.Provider>
}

export function useCrmLeads() {
  const ctx = useContext(CrmLeadsContext)
  if (!ctx) throw new Error('useCrmLeads must be used within CrmLeadsProvider')
  return ctx
}
