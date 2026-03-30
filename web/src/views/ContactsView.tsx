import type { Lead } from '../types/schemas'
import { formatCurrency } from '../lib/format'

type Props = {
  leads: Lead[]
}

export function ContactsView({ leads }: Props) {
  return (
    <main className="crm-shell">
      <article className="panel">
        <div className="panel-head">
          <h2>Contatos</h2>
          <span className="status-pill">{leads.length} pessoas</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Cargo implícito</th>
                <th>Estágio</th>
                <th>Origem</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td>{l.contact}</td>
                  <td>{l.company}</td>
                  <td>Decisor</td>
                  <td>{l.status}</td>
                  <td>{l.leadSource === 'form' ? <span className="status-pill">Formulário</span> : 'CRM'}</td>
                  <td>{formatCurrency(l.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  )
}
