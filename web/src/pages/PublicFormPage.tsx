import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { useCrmLeads } from '../context/CrmLeadsContext'
import { PublicFormRunner } from '../components/forms/PublicFormRunner'

export function PublicFormPage() {
  const { slug } = useParams<{ slug: string }>()
  const { forms } = useCrmLeads()

  const form = useMemo(() => forms.find((f) => f.slug === slug && f.published), [forms, slug])

  if (!slug) {
    return (
      <div className="form-runner form-runner-missing">
        <p>Formulário não encontrado.</p>
        <Link to="/">Ir ao CRM</Link>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="form-runner form-runner-missing">
        <h1>Formulário indisponível</h1>
        <p>O link pode estar incorreto ou o formulário foi despublicado.</p>
        <Link to="/">Ir ao B2B CRM</Link>
      </div>
    )
  }

  return <PublicFormRunner form={form} />
}
