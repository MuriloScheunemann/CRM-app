import { useState } from 'react'
import type { FormDefinition, FormQuestion, FormOption } from '../../types/forms'
import { CRM_SEGMENTS } from '../../constants/segments'

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

function emptyQuestion(): FormQuestion {
  return {
    id: newId('q'),
    type: 'choice',
    title: 'Nova pergunta',
    subtitle: '',
    options: [
      {
        id: newId('opt'),
        label: 'Opção A',
        segmentPoints: { [CRM_SEGMENTS[0]]: 10 },
      },
    ],
  }
}

type Props = {
  form: FormDefinition
  onSave: (form: FormDefinition) => void
  onCancel: () => void
}

export function FormBuilder({ form: initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<FormDefinition>(initial)
  const [slugError, setSlugError] = useState<string | null>(null)

  function updateTheme(partial: Partial<FormDefinition['theme']>) {
    setForm((f) => ({ ...f, theme: { ...f.theme, ...partial } }))
  }

  function updateQuestion(id: string, partial: Partial<FormQuestion>) {
    setForm((f) => ({
      ...f,
      questions: f.questions.map((q) => (q.id === id ? { ...q, ...partial } : q)),
    }))
  }

  function addQuestion() {
    setForm((f) => ({ ...f, questions: [...f.questions, emptyQuestion()] }))
  }

  function removeQuestion(id: string) {
    setForm((f) => (f.questions.length <= 1 ? f : { ...f, questions: f.questions.filter((q) => q.id !== id) }))
  }

  function updateOption(qid: string, oid: string, partial: Partial<FormOption>) {
    setForm((f) => ({
      ...f,
      questions: f.questions.map((q) => {
        if (q.id !== qid) return q
        return {
          ...q,
          options: q.options.map((o) => (o.id === oid ? { ...o, ...partial } : o)),
        }
      }),
    }))
  }

  function addOption(qid: string) {
    setForm((f) => ({
      ...f,
      questions: f.questions.map((q) => {
        if (q.id !== qid) return q
        return {
          ...q,
          options: [
            ...q.options,
            {
              id: newId('opt'),
              label: 'Nova opção',
              segmentPoints: { [CRM_SEGMENTS[0]]: 10 },
            },
          ],
        }
      }),
    }))
  }

  function removeOption(qid: string, oid: string) {
    setForm((f) => ({
      ...f,
      questions: f.questions.map((q) => {
        if (q.id !== qid || q.options.length <= 1) return q
        return { ...q, options: q.options.filter((o) => o.id !== oid) }
      }),
    }))
  }

  function setOptionPrimarySegment(qid: string, oid: string, segment: string, weight: number) {
    const w = Math.max(1, Math.min(30, weight))
    updateOption(qid, oid, { segmentPoints: { [segment]: w } })
  }

  function handleSave() {
    if (!SLUG_RE.test(form.slug)) {
      setSlugError('Slug: apenas minúsculas, números e hífens (ex: qualificacao-leads).')
      return
    }
    setSlugError(null)
    onSave(form)
  }

  return (
    <div className="form-builder">
      <div className="form-builder-grid">
        <section className="panel form-builder-section">
          <h3>Identidade</h3>
          <label className="campaign-label">Título público</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          <label className="campaign-label campaign-label-spaced">Slug (URL /f/...)</label>
          <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().trim() }))} placeholder="qualificacao-b2b" />
          {slugError ? <p className="campaign-error">{slugError}</p> : null}
          <label className="campaign-label campaign-label-spaced">Descrição (intro)</label>
          <textarea className="campaign-textarea" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <label className="campaign-check" style={{ marginTop: '1rem' }}>
            <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Publicado (acessível pelo link)
          </label>
        </section>

        <section className="panel form-builder-section">
          <h3>Tema futurista</h3>
          <div className="form-builder-theme-row">
            <label>
              Accent
              <input type="color" value={form.theme.accent} onChange={(e) => updateTheme({ accent: e.target.value })} />
            </label>
            <label>
              Accent 2
              <input type="color" value={form.theme.accent2} onChange={(e) => updateTheme({ accent2: e.target.value })} />
            </label>
            <label>
              Texto
              <input type="color" value={form.theme.text} onChange={(e) => updateTheme({ text: e.target.value })} />
            </label>
          </div>
          <label className="campaign-label campaign-label-spaced">Fundo (CSS)</label>
          <textarea
            className="campaign-textarea"
            rows={2}
            value={form.theme.background}
            onChange={(e) => updateTheme({ background: e.target.value })}
            placeholder="gradiente ou #hex"
          />
          <p className="chart-caption">O respondente vê o formulário em tela cheia com essas cores.</p>
        </section>
      </div>

      <section className="panel form-builder-section">
        <div className="panel-head">
          <h3>Perguntas (tipo escolha)</h3>
          <button type="button" className="btn-secondary" onClick={addQuestion}>
            + Pergunta
          </button>
        </div>
        <p className="chart-caption">Cada opção pontua segmentos para qualificação. Maior soma vence.</p>

        {form.questions.map((q, qi) => (
          <div key={q.id} className="form-builder-q card">
            <div className="panel-head">
              <span className="status-pill">#{qi + 1}</span>
              <button type="button" className="btn-secondary" onClick={() => removeQuestion(q.id)}>
                Remover
              </button>
            </div>
            <label className="campaign-label">Título</label>
            <input value={q.title} onChange={(e) => updateQuestion(q.id, { title: e.target.value })} />
            <label className="campaign-label campaign-label-spaced">Subtítulo (opcional)</label>
            <input value={q.subtitle ?? ''} onChange={(e) => updateQuestion(q.id, { subtitle: e.target.value })} />
            <p className="campaign-label campaign-label-spaced">Opções</p>
            {q.options.map((o) => {
              const entries = Object.entries(o.segmentPoints)
              const primary = entries[0]?.[0] ?? CRM_SEGMENTS[0]
              const weight = entries[0]?.[1] ?? 10
              return (
                <div key={o.id} className="form-builder-opt">
                  <input
                    value={o.label}
                    onChange={(e) => updateOption(q.id, o.id, { label: e.target.value })}
                    placeholder="Texto da opção"
                  />
                  <select
                    value={primary}
                    onChange={(e) => setOptionPrimarySegment(q.id, o.id, e.target.value, weight)}
                    aria-label="Segmento principal"
                  >
                    {CRM_SEGMENTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={weight}
                    onChange={(e) => setOptionPrimarySegment(q.id, o.id, primary, Number(e.target.value))}
                    aria-label="Peso"
                  />
                  <button type="button" className="btn-secondary" onClick={() => removeOption(q.id, o.id)}>
                    ×
                  </button>
                </div>
              )
            })}
            <button type="button" className="btn-secondary" style={{ marginTop: '0.5rem' }} onClick={() => addOption(q.id)}>
              + Opção
            </button>
          </div>
        ))}
      </section>

      <div className="form-builder-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="button" onClick={handleSave}>
          Salvar formulário
        </button>
      </div>
    </div>
  )
}
