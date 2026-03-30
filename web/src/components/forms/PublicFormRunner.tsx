import { useMemo, useState, type FormEvent } from 'react'
import type { FormDefinition } from '../../types/forms'
import { useCrmLeads } from '../../context/CrmLeadsContext'

type Phase = 'welcome' | 'question' | 'contact' | 'done'

type Props = {
  form: FormDefinition
}

export function PublicFormRunner({ form }: Props) {
  const { addLeadFromForm } = useCrmLeads()
  const [phase, setPhase] = useState<Phase>('welcome')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [resultSegment, setResultSegment] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = 1 + form.questions.length + 1
  const progress = useMemo(() => {
    if (phase === 'welcome') return 0
    if (phase === 'done') return 100
    if (phase === 'contact') return Math.round(((1 + form.questions.length) / totalSteps) * 100)
    return Math.round(((1 + qIndex) / totalSteps) * 100)
  }, [phase, qIndex, form.questions.length, totalSteps])

  const currentQuestion = form.questions[qIndex]

  function selectOption(questionId: string, optionId: string) {
    setAnswers((a) => ({ ...a, [questionId]: optionId }))
    setError(null)
    if (qIndex < form.questions.length - 1) {
      setQIndex((i) => i + 1)
    } else {
      setPhase('contact')
    }
  }

  function handleContactSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !company.trim()) {
      setError('Preencha nome, e-mail e empresa.')
      return
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!emailOk) {
      setError('E-mail inválido.')
      return
    }
    const { segment } = addLeadFromForm({
      form,
      answers,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
    })
    setResultSegment(segment)
    setPhase('done')
    setError(null)
  }

  const themeStyle = {
    '--form-accent': form.theme.accent,
    '--form-accent2': form.theme.accent2,
    '--form-bg': form.theme.background,
    '--form-text': form.theme.text,
  } as React.CSSProperties

  return (
    <div className="form-runner" style={themeStyle}>
      <div className="form-runner-glow" aria-hidden />
      <header className="form-runner-top">
        <div className="form-runner-brand">B2B CRM</div>
        <div className="form-runner-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="form-runner-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="form-runner-main">
        {phase === 'welcome' && (
          <section className="form-runner-card form-runner-animate">
            <h1 className="form-runner-title">{form.title}</h1>
            <p className="form-runner-desc">{form.description}</p>
            <button type="button" className="form-runner-cta" onClick={() => setPhase('question')}>
              Começar
            </button>
            <p className="form-runner-hint">Uma pergunta por vez · ~{form.questions.length + 1} min</p>
          </section>
        )}

        {phase === 'question' && currentQuestion && (
          <section className="form-runner-card form-runner-animate">
            <p className="form-runner-step">
              Pergunta {qIndex + 1} de {form.questions.length}
            </p>
            <h2 className="form-runner-qtitle">{currentQuestion.title}</h2>
            {currentQuestion.subtitle ? <p className="form-runner-sub">{currentQuestion.subtitle}</p> : null}
            <div className="form-runner-options">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`form-runner-opt${answers[currentQuestion.id] === opt.id ? ' is-selected' : ''}`}
                  onClick={() => selectOption(currentQuestion.id, opt.id)}
                >
                  <span className="form-runner-opt-label">{opt.label}</span>
                  <span className="form-runner-opt-arrow" aria-hidden>
                    →
                  </span>
                </button>
              ))}
            </div>
            {qIndex > 0 ? (
              <button type="button" className="form-runner-back" onClick={() => setQIndex((i) => Math.max(0, i - 1))}>
                Voltar
              </button>
            ) : (
              <button type="button" className="form-runner-back" onClick={() => setPhase('welcome')}>
                Voltar
              </button>
            )}
          </section>
        )}

        {phase === 'contact' && (
          <section className="form-runner-card form-runner-animate">
            <h2 className="form-runner-qtitle">Seus dados</h2>
            <p className="form-runner-sub">Para qualificar o lead e retornar o contato comercial.</p>
            <form className="form-runner-fields" onSubmit={handleContactSubmit}>
              <label className="form-runner-label">
                Nome completo
                <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
              </label>
              <label className="form-runner-label">
                E-mail corporativo
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </label>
              <label className="form-runner-label">
                Empresa
                <input value={company} onChange={(e) => setCompany(e.target.value)} required autoComplete="organization" />
              </label>
              {error ? (
                <p className="form-runner-error" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="form-runner-cta">
                Enviar e ver resultado
              </button>
            </form>
            <button
              type="button"
              className="form-runner-back"
              onClick={() => {
                setPhase('question')
                setQIndex(form.questions.length - 1)
              }}
            >
              Voltar às perguntas
            </button>
          </section>
        )}

        {phase === 'done' && (
          <section className="form-runner-card form-runner-animate form-runner-done">
            <div className="form-runner-done-icon" aria-hidden>
              ✓
            </div>
            <h2 className="form-runner-title">Obrigado</h2>
            <p className="form-runner-desc">
              Com base nas respostas, o segmento sugerido para priorização é:
            </p>
            <div className="form-runner-segment-pill">{resultSegment}</div>
            <p className="form-runner-hint">Um lead foi criado no B2B CRM com origem &quot;Formulário&quot;. Use Campanhas para atingir este segmento.</p>
          </section>
        )}
      </main>
    </div>
  )
}
