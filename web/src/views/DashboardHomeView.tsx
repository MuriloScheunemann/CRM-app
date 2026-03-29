import { useMemo } from 'react'
import type { Lead } from '../types/schemas'
import { formatCurrency } from '../lib/format'
import { DashboardCharts } from '../components/DashboardCharts'

type Props = {
  leads: Lead[]
}

export function DashboardHomeView({ leads }: Props) {
  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0)
  const wonAmount = leads.filter((l) => l.status === 'Fechado').reduce((sum, l) => sum + l.value, 0)
  const conversionRate = leads.length
    ? Math.round((leads.filter((l) => l.status === 'Fechado').length / leads.length) * 100)
    : 0

  const topDeals = useMemo(
    () => [...leads].sort((a, b) => b.value - a.value).slice(0, 5),
    [leads]
  )

  return (
    <main className="crm-shell">
      <section className="kpi-grid">
        <article className="card">
          <p>Oportunidades</p>
          <strong>{leads.length}</strong>
        </article>
        <article className="card">
          <p>Pipeline</p>
          <strong>{formatCurrency(totalPipeline)}</strong>
        </article>
        <article className="card">
          <p>Taxa ganho</p>
          <strong>{conversionRate}%</strong>
        </article>
        <article className="card">
          <p>Ganho (Fechado)</p>
          <strong>{formatCurrency(wonAmount)}</strong>
        </article>
      </section>

      <DashboardCharts leads={leads} />

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-head">
            <h2>Principais negócios</h2>
            <span className="status-pill">ordenado por valor</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Estágio</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {topDeals.map((l) => (
                  <tr key={l.id}>
                    <td>{l.company}</td>
                    <td>{l.status}</td>
                    <td>{formatCurrency(l.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel panel-accent">
          <h2>Próximos passos</h2>
          <ul className="checklist">
            <li>Otimize o funil com regras n8n após cada mudança de estágio.</li>
            <li>Use campanhas segmentadas para reativar leads em “Contato”.</li>
            <li>Sincronize o pipeline via webhook na área Integrações.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}
