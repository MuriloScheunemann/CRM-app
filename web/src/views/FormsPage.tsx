import { useMemo, useState } from 'react'
import { useCrmLeads } from '../context/CrmLeadsContext'
import type { FormDefinition } from '../types/forms'
import { defaultQualificationForm } from '../data/defaultQualificationForm'
import { FormBuilder } from '../components/forms/FormBuilder'

export function FormsPage() {
  const { forms, saveForm, removeForm } = useCrmLeads()
  const [editing, setEditing] = useState<FormDefinition | null>(null)

  const publicBase = useMemo(() => `${window.location.origin}/f/`, [])

  function duplicateNew(): FormDefinition {
    const base = structuredClone(defaultQualificationForm)
    base.id = `form-${Date.now()}`
    base.slug = `formulario-${Date.now().toString(36)}`
    base.title = 'Novo formulário de qualificação'
    base.description = 'Edite o título, perguntas e tema. Publique quando estiver pronto.'
    base.published = false
    return base
  }

  function handleCopyLink(slug: string) {
    const url = `${publicBase}${slug}`
    void navigator.clipboard.writeText(url)
  }

  if (editing) {
    return (
      <main className="crm-shell crm-shell-loose">
        <div className="panel-head" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem' }}>Editor de formulário</h2>
            <p className="page-subtitle" style={{ margin: '0.35rem 0 0' }}>
              Fluxo estilo Typeform no link público; respostas qualificam o segmento do lead.
            </p>
          </div>
        </div>
        <FormBuilder
          key={editing.id}
          form={editing}
          onSave={(f) => {
            saveForm(f)
            setEditing(null)
          }}
          onCancel={() => setEditing(null)}
        />
      </main>
    )
  }

  return (
    <main className="crm-shell crm-shell-loose">
      <div className="panel-head" style={{ marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.15rem' }}>Lista de formulários</h2>
          <p className="page-subtitle" style={{ margin: '0.35rem 0 0' }}>
            Fluxo, tema e link público. Leads qualificados entram no funil — segmente campanhas depois.
          </p>
        </div>
        <button type="button" onClick={() => setEditing(duplicateNew())}>
          Novo formulário
        </button>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Perguntas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((f) => (
                <tr key={f.id}>
                  <td>{f.title}</td>
                  <td>
                    <code className="form-slug-code">/f/{f.slug}</code>
                  </td>
                  <td>{f.published ? <span className="status-pill status-pill-success">Publicado</span> : <span className="status-pill">Rascunho</span>}</td>
                  <td>{f.questions.length}</td>
                  <td>
                    <div className="form-list-actions">
                      <button type="button" className="btn-secondary" onClick={() => setEditing(structuredClone(f))}>
                        Editar
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => handleCopyLink(f.slug)} disabled={!f.published}>
                        Copiar link
                      </button>
                      <button type="button" className="btn-secondary" onClick={() => removeForm(f.id)} disabled={forms.length <= 1}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="chart-caption" style={{ marginTop: '1rem' }}>
          Link público (sem login): <strong>{publicBase}</strong>
          <code>seu-slug</code>
        </p>
      </section>
    </main>
  )
}
