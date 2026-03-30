import { useMemo, useState } from 'react'
import { CRM_SEGMENTS } from '../constants/segments'

const SEGMENTS = ['Todos', ...CRM_SEGMENTS] as const

type ChannelId = 'email' | 'omni'

const CHANNELS: { id: ChannelId; label: string; hint: string }[] = [
  { id: 'email', label: 'E-mail', hint: 'SMTP ou node Mail no n8n' },
  { id: 'omni', label: 'Multicanal', hint: 'Orquestração completa no n8n' },
]

const STEPS = [
  { n: 1, title: 'Planejamento', desc: 'Nome, público e canal' },
  { n: 2, title: 'Mensagem', desc: 'Assunto e corpo' },
  { n: 3, title: 'Revisão & envio', desc: 'Conferir e disparar' },
] as const

type Template = {
  id: string
  name: string
  subject: string
  body: string
  gradient: string
}

const TEMPLATES: Template[] = [
  {
    id: 'b2b-natal',
    name: 'Natal B2B 2026',
    subject: 'Condições especiais de fechamento — {{empresa}}',
    body:
      'Olá, equipe {{empresa}}.\n\nPreparamos condições comerciais alinhadas ao seu volume para encerrarmos o ano com ROI claro.\n\nPodemos agendar 20 min esta semana?\n\nAbraço,\nTime comercial',
    gradient: 'linear-gradient(45deg, #06b6d4, #6366f1)',
  },
  {
    id: 'follow-enterprise',
    name: 'Follow-up enterprise',
    subject: 'Próximos passos — {{empresa}}',
    body:
      'Olá,\n\nSeguindo nossa última conversa, organizei um resumo do que falta para avançarmos para proposta formal.\n\n1) Escopo técnico\n2) Janela de rollout\n3) SLA validado\n\nQual horário funciona para você?',
    gradient: 'linear-gradient(45deg, #f43f5e, #fb923c)',
  },
  {
    id: 'novidade-produto',
    name: 'Nova funcionalidade',
    subject: 'Novidade que impacta {{segmento}}',
    body:
      'Querido cliente,\n\nLançamos melhorias focadas em integração e automação (incluindo n8n). Vale um walkthrough de 15 minutos?\n\nSe preferir, envio um vídeo curto.',
    gradient: 'linear-gradient(45deg, #10b981, #3b82f6)',
  },
]

export function CampaignManager() {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState('')
  const [selectedSegment, setSelectedSegment] = useState<(typeof SEGMENTS)[number]>('Todos')
  const [channel, setChannel] = useState<ChannelId>('email')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [sendMode, setSendMode] = useState<'now' | 'schedule'>('now')
  const [scheduleAt, setScheduleAt] = useState('')
  const [confirmedLegal, setConfirmedLegal] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const contentStats = useMemo(
    () => ({ chars: content.length, lines: content.split(/\r?\n/).filter(Boolean).length }),
    [content]
  )

  function applyTemplate(t: Template) {
    let sub = t.subject.replace('{{segmento}}', selectedSegment)
    let body = t.body.replace('{{segmento}}', selectedSegment)
    sub = sub.replace('{{empresa}}', 'sua empresa')
    body = body.replace(/\{\{empresa\}\}/g, 'sua empresa')
    setSubject(sub)
    setContent(body)
    setFormError(null)
  }

  function goNext() {
    setFormError(null)
    if (step === 1) {
      if (campaignName.trim().length < 3) {
        setFormError('Informe um nome de campanha com pelo menos 3 caracteres.')
        return
      }
      setStep(2)
      return
    }
    if (step === 2) {
      if (subject.trim().length < 4) {
        setFormError('O assunto precisa de pelo menos 4 caracteres.')
        return
      }
      if (content.trim().length < 20) {
        setFormError('O corpo da mensagem deve ter pelo menos 20 caracteres (use um template se quiser).')
        return
      }
      setStep(3)
    }
  }

  function goBack() {
    setFormError(null)
    setStep((s) => Math.max(1, s - 1))
  }

  function resetFlow() {
    setStep(1)
    setCampaignName('')
    setSelectedSegment('Todos')
    setChannel('email')
    setSubject('')
    setContent('')
    setSendMode('now')
    setScheduleAt('')
    setConfirmedLegal(false)
    setFormError(null)
    setDone(false)
  }

  function submitCampaign() {
    setFormError(null)
    if (!confirmedLegal) {
      setFormError('Confirme a base legal / consentimento para prosseguir.')
      return
    }
    if (sendMode === 'schedule' && !scheduleAt.trim()) {
      setFormError('Defina data e hora para o envio agendado.')
      return
    }
    setDone(true)
  }

  return (
    <div className="campaign-wizard">
      <section className="panel campaign-panel-main">
        <div className="panel-head">
          <h2>Campanhas B2B</h2>
          {done ? (
            <div className="status-pill status-pill-success">Enviado para fila</div>
          ) : (
            <div className="status-pill">
              Etapa {step} de {STEPS.length}
            </div>
          )}
        </div>

        <div className="campaign-stepper" role="tablist" aria-label="Etapas do fluxo">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`campaign-step${step === s.n ? ' campaign-step--active' : ''}${step > s.n ? ' campaign-step--done' : ''}`}
            >
              <span className="campaign-step-num">{done && step === 3 && s.n === 3 ? '✓' : s.n}</span>
              <div className="campaign-step-text">
                <strong>{s.title}</strong>
                <span>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {formError ? (
          <p className="campaign-error" role="alert">
            {formError}
          </p>
        ) : null}

        {done ? (
          <div className="campaign-success">
            <h3 className="campaign-success-title">Campanha enfileirada</h3>
            <p className="campaign-success-meta">
              <strong>{campaignName}</strong> · público <strong>{selectedSegment}</strong> ·{' '}
              <strong>{CHANNELS.find((c) => c.id === channel)?.label}</strong>
            </p>
            <p className="campaign-success-meta">
              {sendMode === 'now'
                ? 'O workflow n8n pode processar o disparo imediato assim que o node receber o payload.'
                : `Agendado para: ${scheduleAt} (simulação — conecte ao Cron do n8n).`}
            </p>
            <div className="campaign-actions">
              <button type="button" className="btn-secondary" onClick={resetFlow}>
                Nova campanha
              </button>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="campaign-step-body">
                <label className="campaign-label" htmlFor="camp-name">
                  Nome interno da campanha
                </label>
                <input
                  id="camp-name"
                  type="text"
                  placeholder="Ex.: Q1 — reativação Logística"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  autoComplete="off"
                />

                <p className="campaign-label campaign-label-spaced">Público-alvo (segmento)</p>
                <div className="campaign-segment-grid">
                  {SEGMENTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={selectedSegment === s ? 'btn-primary' : 'btn-secondary'}
                      onClick={() => setSelectedSegment(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="chart-caption" style={{ marginTop: '0.75rem' }}>
                  Leads qualificados pelos <strong>Formulários</strong> já entram com segmento definido — use o mesmo segmento aqui para campanhas direcionadas.
                </p>

                <p className="campaign-label campaign-label-spaced">Canal de saída</p>
                <div className="campaign-channel-row">
                  {CHANNELS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={channel === c.id ? 'btn-primary' : 'btn-secondary campaign-channel-card'}
                      onClick={() => setChannel(c.id)}
                    >
                      <span className="campaign-channel-title">{c.label}</span>
                      <span className="campaign-channel-hint">{c.hint}</span>
                    </button>
                  ))}
                </div>

                <div className="campaign-actions">
                  <button type="button" onClick={goNext}>
                    Continuar para mensagem
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="campaign-step-body">
                <label className="campaign-label" htmlFor="camp-subject">
                  Assunto
                </label>
                <input
                  id="camp-subject"
                  type="text"
                  placeholder="Linha de assunto profissional"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <div className="campaign-label-row">
                  <label className="campaign-label campaign-label-spaced" htmlFor="camp-body">
                    Corpo
                  </label>
                  <span className="campaign-stats">
                    {contentStats.chars} caracteres · {contentStats.lines} blocos
                  </span>
                </div>
                <textarea
                  id="camp-body"
                  placeholder="Mensagem em texto (ou HTML se enviar via n8n)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="campaign-textarea"
                />

                <div className="campaign-actions campaign-actions-split">
                  <button type="button" className="btn-secondary" onClick={goBack}>
                    Voltar
                  </button>
                  <button type="button" onClick={goNext}>
                    Revisar envio
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="campaign-step-body">
                <div className="campaign-summary card">
                  <p>
                    <span className="campaign-summary-k">Campanha</span> {campaignName}
                  </p>
                  <p>
                    <span className="campaign-summary-k">Segmento</span> {selectedSegment}
                  </p>
                  <p>
                    <span className="campaign-summary-k">Canal</span> {CHANNELS.find((c) => c.id === channel)?.label}
                  </p>
                  <p>
                    <span className="campaign-summary-k">Assunto</span> {subject}
                  </p>
                  <p className="campaign-summary-preview">
                    <span className="campaign-summary-k">Prévia</span> {content.slice(0, 160)}
                    {content.length > 160 ? '…' : ''}
                  </p>
                </div>

                <fieldset className="campaign-fieldset">
                  <legend className="campaign-label">Quando enviar</legend>
                  <label className="campaign-radio">
                    <input
                      type="radio"
                      name="send"
                      checked={sendMode === 'now'}
                      onChange={() => setSendMode('now')}
                    />
                    Enviar agora (fila n8n)
                  </label>
                  <label className="campaign-radio">
                    <input
                      type="radio"
                      name="send"
                      checked={sendMode === 'schedule'}
                      onChange={() => setSendMode('schedule')}
                    />
                    Agendar
                  </label>
                  {sendMode === 'schedule' ? (
                    <input
                      type="datetime-local"
                      className="campaign-schedule-input"
                      value={scheduleAt}
                      onChange={(e) => setScheduleAt(e.target.value)}
                      aria-label="Data e hora agendada"
                    />
                  ) : null}
                </fieldset>

                <label className="campaign-check">
                  <input
                    type="checkbox"
                    checked={confirmedLegal}
                    onChange={(e) => setConfirmedLegal(e.target.checked)}
                  />
                  Confirmo que o público possui base legal para contato (opt-in / legítimo interesse conforme política da empresa).
                </label>

                <div className="campaign-actions campaign-actions-split">
                  <button type="button" className="btn-secondary" onClick={goBack}>
                    Ajustar mensagem
                  </button>
                  <button type="button" onClick={submitCampaign}>
                    Enviar para n8n
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <section className="panel campaign-templates">
        <div className="panel-head">
          <h2>Templates de partida</h2>
          <span className="status-pill">clique para aplicar</span>
        </div>
        <p className="chart-caption">Substituem assunto e corpo; você ainda pode editar antes de revisar.</p>
        <div className="campaign-template-grid">
          {TEMPLATES.map((t) => (
            <button key={t.id} type="button" className="campaign-template-card" onClick={() => applyTemplate(t)}>
              <div className="campaign-template-swatch" style={{ background: t.gradient }} />
              <strong>{t.name}</strong>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
