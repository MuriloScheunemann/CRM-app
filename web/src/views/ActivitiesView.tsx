const activities = [
  { id: 'a1', title: 'Call de discovery — Nova Finance', when: '2026-03-30 10:00', type: 'Ligação', owner: 'Murilo' },
  { id: 'a2', title: 'Enviar proposta OrbitLog', when: '2026-03-30 15:30', type: 'Tarefa', owner: 'Murilo' },
  { id: 'a3', title: 'Demo técnica Pulse Health', when: '2026-03-31 09:00', type: 'Reunião', owner: 'Patricia' },
  { id: 'a4', title: 'Follow-up pós-fechamento Aether', when: '2026-04-01 11:00', type: 'Sucesso', owner: 'Patricia' },
]

export function ActivitiesView() {
  return (
    <main className="crm-shell">
      <article className="panel">
        <div className="panel-head">
          <h2>Agenda e atividades</h2>
          <span className="status-pill">demo</span>
        </div>
        <ul className="activity-timeline">
          {activities.map((a) => (
            <li key={a.id} className="activity-row">
              <span className="activity-dot" aria-hidden />
              <div className="activity-body">
                <p className="activity-title">{a.title}</p>
                <p className="activity-meta">
                  {a.when} · {a.type} · {a.owner}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}
