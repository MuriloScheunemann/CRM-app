import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import type { Lead, LeadStatus } from '../types/schemas'
import { formatCurrency } from '../lib/format'

const STAGE_ORDER: LeadStatus[] = ['Lead', 'Contato', 'Proposta', 'Fechado']

const PIE_COLORS = ['#00bfff', '#7c3aed', '#22d3ee', '#a78bfa', '#38bdf8', '#c084fc']

type CurrencyTipProps = {
  active?: boolean
  payload?: ReadonlyArray<{ value?: number; name?: string }>
  label?: string
}

function CurrencyTooltip({ active, payload, label }: CurrencyTipProps) {
  if (!active || !payload?.length) return null
  const v = payload[0]?.value
  if (typeof v !== 'number') return null
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{label}</span>
      <strong>{formatCurrency(v)}</strong>
    </div>
  )
}

type SegmentTipProps = {
  active?: boolean
  payload?: ReadonlyArray<{ name?: string; value?: number }>
}

function SegmentTooltip({ active, payload }: SegmentTipProps) {
  if (!active || !payload?.length) return null
  const row = payload[0]
  const name = row?.name
  const v = row?.value
  if (typeof v !== 'number' || !name) return null
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{name}</span>
      <strong>{formatCurrency(v)}</strong>
    </div>
  )
}

type Props = {
  leads: Lead[]
}

export function DashboardCharts({ leads }: Props) {
  const byStage = useMemo(() => {
    const sums = new Map<LeadStatus, number>()
    for (const s of STAGE_ORDER) sums.set(s, 0)
    for (const l of leads) {
      sums.set(l.status, (sums.get(l.status) ?? 0) + l.value)
    }
    return STAGE_ORDER.map((name) => ({
      nome: name,
      valor: sums.get(name) ?? 0,
      qtd: leads.filter((x) => x.status === name).length,
    }))
  }, [leads])

  const bySegment = useMemo(() => {
    const sums = new Map<string, number>()
    for (const l of leads) {
      sums.set(l.segment, (sums.get(l.segment) ?? 0) + l.value)
    }
    return [...sums.entries()].map(([name, valor]) => ({ name, valor }))
  }, [leads])

  const topAccounts = useMemo(() => {
    return [...leads]
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((l) => ({
        nome:
          l.company.length > 18 ? `${l.company.slice(0, 16)}…` : l.company,
        valor: l.value,
      }))
  }, [leads])

  const tickK = (n: number) => {
    if (n === 0) return '0'
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1000) return `${Math.round(n / 1000)}k`
    return `${Math.round(n)}`
  }

  if (leads.length === 0) {
    return (
      <section className="charts-grid">
        <article className="panel chart-panel chart-panel--empty">
          <p>Nenhum dado para exibir gráficos. Adicione oportunidades ao pipeline.</p>
        </article>
      </section>
    )
  }

  return (
    <section className="charts-grid">
      <article className="panel chart-panel">
        <div className="panel-head">
          <h2>Valor por estágio</h2>
          <span className="status-pill">pipeline</span>
        </div>
        <p className="chart-caption">Soma (R$) das oportunidades em cada coluna do funil.</p>
        <div className="chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStage} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00bfff" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
              <XAxis dataKey="nome" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: 'rgba(148,163,184,0.2)' }} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={tickK}
              />
              <Tooltip content={<CurrencyTooltip />} cursor={{ fill: 'rgba(0,191,255,0.08)' }} />
              <Bar dataKey="valor" name="Valor" fill="url(#fillBar)" radius={[8, 8, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="panel chart-panel">
        <div className="panel-head">
          <h2>Mix por segmento</h2>
          <span className="status-pill">B2B</span>
        </div>
        <p className="chart-caption">Participação do valor total do pipeline por vertical.</p>
        <div className="chart-area chart-area--pie">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bySegment}
                dataKey="valor"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
                stroke="rgba(15,23,42,0.9)"
                strokeWidth={2}
              >
                {bySegment.map((seg, i) => (
                  <Cell key={seg.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<SegmentTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="chart-legend-text">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="panel chart-panel">
        <div className="panel-head">
          <h2>Top contas</h2>
          <span className="status-pill">top 5</span>
        </div>
        <p className="chart-caption">Maiores oportunidades por valor estimado.</p>
        <div className="chart-area">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topAccounts}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillHoriz" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#00bfff" stopOpacity={0.75} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="nome"
                width={100}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CurrencyTooltip />} cursor={{ fill: 'rgba(124,58,237,0.08)' }} />
              <Bar dataKey="valor" fill="url(#fillHoriz)" radius={[0, 8, 8, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}
