import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { SyncPayloadSchema, type Lead } from '../types/schemas'
import { formatCurrency } from '../lib/format'

type Props = {
  leads: Lead[]
}

export function N8nIntegrationsView({ leads }: Props) {
  const [n8nWebhook, setN8nWebhook] = useState('')
  const [syncMessage, setSyncMessage] = useState('Cole a URL do node Webhook (POST) do seu fluxo n8n.')

  const totals = useMemo(() => {
    const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0)
    const wonValue = leads.filter((l) => l.status === 'Fechado').reduce((sum, l) => sum + l.value, 0)
    const conversionRate = leads.length
      ? Math.round((leads.filter((l) => l.status === 'Fechado').length / leads.length) * 100)
      : 0
    return {
      leads: leads.length,
      pipelineValue: totalPipeline,
      wonValue,
      conversionRate,
    }
  }, [leads])

  async function handleSyncN8n(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!n8nWebhook.trim()) {
      setSyncMessage('Informe a URL do webhook n8n.')
      return
    }

    try {
      const payload = {
        source: 'b2b-crm' as const,
        sentAt: new Date().toISOString(),
        totals,
        leads,
      }

      const validation = SyncPayloadSchema.safeParse(payload)
      if (!validation.success) {
        setSyncMessage('Validação Zod: ajuste datas ou tamanhos dos campos.')
        return
      }

      const response = await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setSyncMessage('Payload aceito pelo n8n.')
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Erro desconhecido'
      setSyncMessage(`Falha: ${detail}`)
    }
  }

  return (
    <main className="crm-shell">
      <section className="panel-grid">
        <article className="panel panel-accent">
          <div className="panel-head">
            <h2>Webhook CRM → n8n</h2>
            <span className="status-pill">POST JSON</span>
          </div>
          <p className="panel-lead">
            Envie o snapshot do pipeline para acionar workflows: notas no Slack, criação de tarefas, e-mails, etc.
          </p>
          <form className="n8n-form" onSubmit={handleSyncN8n}>
            <label htmlFor="webhook">URL do webhook</label>
            <input
              id="webhook"
              type="url"
              autoComplete="off"
              placeholder="https://seu-dominio/webhook/crm-sync"
              value={n8nWebhook}
              onChange={(e) => setN8nWebhook(e.target.value)}
            />
            <button type="submit">Sincronizar agora</button>
          </form>
          <p className="sync-message">{syncMessage}</p>
        </article>

        <article className="panel">
          <h2>Resumo do payload</h2>
          <ul className="payload-preview">
            <li>
              <span>Leads</span> <strong>{totals.leads}</strong>
            </li>
            <li>
              <span>Pipeline</span> <strong>{formatCurrency(totals.pipelineValue)}</strong>
            </li>
            <li>
              <span>Ganho</span> <strong>{formatCurrency(totals.wonValue)}</strong>
            </li>
            <li>
              <span>Conversão</span> <strong>{totals.conversionRate}%</strong>
            </li>
          </ul>
        </article>
      </section>
    </main>
  )
}
