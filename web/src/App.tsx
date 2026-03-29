import { useMemo, useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LeadSchema, SyncPayloadSchema } from './types/schemas'
import type { Lead, LeadStatus } from './types/schemas'
import { supabase } from './lib/supabase'
import './App.css'

const initialLeads: Lead[] = [
  {
    id: 1,
    company: 'Nova Finance (Demo)',
    contact: 'Bianca Ribeiro',
    segment: 'Fintech',
    value: 92000,
    owner: 'Murilo',
    status: 'Proposta',
    lastTouch: '2026-03-27',
  },
  {
    id: 2,
    company: 'OrbitLog (Demo)',
    contact: 'Rafael Costa',
    segment: 'Logistica',
    value: 51000,
    owner: 'Murilo',
    status: 'Contato',
    lastTouch: '2026-03-26',
  },
]

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(amount)

function Dashboard() {
  const { user, signOut } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [segmentFilter, setSegmentFilter] = useState('Todos')
  const [n8nWebhook, setN8nWebhook] = useState('')
  const [syncMessage, setSyncMessage] = useState('Conecte seu webhook n8n para iniciar automacoes.')

  // Carregar dados reais do Supabase (com proteção RLS)
  useEffect(() => {
    async function loadLeads() {
      // Se for usuário demo, carrega os mocks
      if (user?.id === 'demo-123') {
        setLeads(initialLeads)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setLeads(data || [])
      } catch (err) {
        console.error('Erro ao carregar leads reais:', err)
      } finally {
        setLoading(false)
      }
    }

    loadLeads()
  }, [user])

  const filteredLeads = useMemo(() => {
    if (segmentFilter === 'Todos') return leads
    return leads.filter((lead) => lead.segment === segmentFilter)
  }, [leads, segmentFilter])

  const statuses: LeadStatus[] = ['Lead', 'Contato', 'Proposta', 'Fechado']
  const totalPipeline = filteredLeads.reduce((sum, lead) => sum + lead.value, 0)
  const wonAmount = filteredLeads
    .filter((lead) => lead.status === 'Fechado')
    .reduce((sum, lead) => sum + lead.value, 0)
  const conversionRate = filteredLeads.length
    ? Math.round((filteredLeads.filter((lead) => lead.status === 'Fechado').length / filteredLeads.length) * 100)
    : 0
  const segments = ['Todos', ...new Set(leads.map((lead) => lead.segment))]

  async function handleSyncN8n(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!n8nWebhook.trim()) {
      setSyncMessage('Informe a URL do webhook n8n.')
      return
    }

    try {
      const payload = {
        source: 'crm-n8n-futuristico',
        sentAt: new Date().toISOString(),
        totals: {
          leads: filteredLeads.length,
          pipelineValue: totalPipeline,
          wonValue: wonAmount,
          conversionRate,
        },
        leads: filteredLeads,
      }

      const validation = SyncPayloadSchema.safeParse(payload)
      if (!validation.success) {
        setSyncMessage('Erro de segurança: Dados corrompidos detectados.')
        return
      }

      const response = await fetch(n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      })

      if (!response.ok) throw new Error(`Status ${response.status}`)
      setSyncMessage('Sincronizacao enviada para o n8n com sucesso.')
    } catch (error) {
      setSyncMessage(`Falha ao sincronizar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  if (loading) return <div className="loading-screen">Descriptografando dados...</div>

  return (
    <main className="crm-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AIOX CRM HUB</p>
          <h1>CRM Futuristico + n8n</h1>
        </div>
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="status-pill">{user?.id === 'demo-123' ? 'Modo: Demonstração' : `User: ${user?.email}`}</span>
          <button onClick={signOut} className="btn-secondary">Encerrar Sessão</button>
        </div>
      </header>

      <section className="kpi-grid">
        <article className="card">
          <p>Leads Ativos</p>
          <strong>{filteredLeads.length}</strong>
        </article>
        <article className="card">
          <p>Pipeline Total</p>
          <strong>{formatCurrency(totalPipeline)}</strong>
        </article>
        <article className="card">
          <p>Fechamento</p>
          <strong>{conversionRate}%</strong>
        </article>
        <article className="card">
          <p>Receita Ganha</p>
          <strong>{formatCurrency(wonAmount)}</strong>
        </article>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-head">
            <h2>Pipeline Visual</h2>
            <select value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)}>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment}
                </option>
              ))}
            </select>
          </div>
          <div className="kanban">
            {statuses.map((status) => {
              const statusLeads = filteredLeads.filter((lead) => lead.status === status)
              return (
                <div className="column" key={status}>
                  <h3>{status}</h3>
                  {statusLeads.map((lead) => (
                    <div className="lead-card" key={lead.id}>
                      <p className="company">{lead.company}</p>
                      <p>{lead.contact}</p>
                      <p>{formatCurrency(lead.value)}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </article>

        <article className="panel">
          <h2>Automacao n8n</h2>
          <form className="n8n-form" onSubmit={handleSyncN8n}>
            <label htmlFor="webhook">Webhook URL</label>
            <input
              id="webhook"
              type="url"
              placeholder="https://seu-n8n/webhook/crm-sync"
              value={n8nWebhook}
              onChange={(e) => setN8nWebhook(e.target.value)}
            />
            <button type="submit">Sincronizar com n8n</button>
          </form>
          <p className="sync-message">{syncMessage}</p>
        </article>
      </section>

      <section className="panel">
        <h2>Carteira de Clientes</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Contato</th>
                <th>Segmento</th>
                <th>Dono</th>
                <th>Valor</th>
                <th>Ultimo Toque</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.company}</td>
                  <td>{lead.contact}</td>
                  <td>{lead.segment}</td>
                  <td>{lead.owner}</td>
                  <td>{formatCurrency(lead.value)}</td>
                  <td>{lead.lastTouch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
