import { useMemo } from 'react'
import type { Lead } from '../types/schemas'
import { formatCurrency } from '../lib/format'

type Props = {
  leads: Lead[]
}

export function CompaniesView({ leads }: Props) {
  const rows = useMemo(() => {
    const byCompany = new Map<string, { segment: string; deals: number; value: number; owner: string }>()
    for (const l of leads) {
      const cur = byCompany.get(l.company)
      if (cur) {
        cur.deals += 1
        cur.value += l.value
      } else {
        byCompany.set(l.company, {
          segment: l.segment,
          deals: 1,
          value: l.value,
          owner: l.owner,
        })
      }
    }
    return [...byCompany.entries()].map(([name, v]) => ({ name, ...v }))
  }, [leads])

  return (
    <main className="crm-shell">
      <article className="panel">
        <div className="panel-head">
          <h2>Carteira de empresas</h2>
          <span className="status-pill">{rows.length} contas</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Segmento</th>
                <th>Oportunidades</th>
                <th>Pipeline</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.segment}</td>
                  <td>{r.deals}</td>
                  <td>{formatCurrency(r.value)}</td>
                  <td>{r.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  )
}
