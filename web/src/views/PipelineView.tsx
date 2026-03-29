import { useMemo, useState } from 'react'
import type { Lead, LeadStatus } from '../types/schemas'
import { formatCurrency } from '../lib/format'

type Props = {
  leads: Lead[]
}

export function PipelineView({ leads }: Props) {
  const [segmentFilter, setSegmentFilter] = useState('Todos')
  const filtered = useMemo(() => {
    if (segmentFilter === 'Todos') return leads
    return leads.filter((l) => l.segment === segmentFilter)
  }, [leads, segmentFilter])

  const segments = ['Todos', ...new Set(leads.map((l) => l.segment))]
  const statuses: LeadStatus[] = ['Lead', 'Contato', 'Proposta', 'Fechado']

  return (
    <main className="crm-shell">
      <article className="panel panel-wide">
        <div className="panel-head">
          <h2>Board</h2>
          <select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)} aria-label="Filtrar segmento">
            {segments.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="kanban">
          {statuses.map((status) => {
            const inCol = filtered.filter((l) => l.status === status)
            return (
              <div className="column" key={status}>
                <h3>
                  {status} <span className="column-count">{inCol.length}</span>
                </h3>
                {inCol.map((lead) => (
                  <div className="lead-card" key={lead.id}>
                    <p className="company">{lead.company}</p>
                    <p className="lead-meta">{lead.contact}</p>
                    <p className="lead-value">{formatCurrency(lead.value)}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </article>
    </main>
  )
}
