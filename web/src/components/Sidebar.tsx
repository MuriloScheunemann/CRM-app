import type { ReactNode } from 'react'
import type { CrmPage } from '../types/pages'

type SidebarProps = {
  activePage: CrmPage
  onPageChange: (page: CrmPage) => void
  mobileOpen: boolean
}

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z" />
    </svg>
  )
}
function IconColumns() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  )
}
function IconBuilding() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 21V8l8-4v17M4 21h16M10 21v-4h4v4M8 8h.01M8 12h.01M8 16h.01M12 8h.01M12 12h.01" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    </svg>
  )
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  )
}
function IconZap() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}
function IconMegaphone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 11v4a2 2 0 0 0 2 2h1v-8H5a2 2 0 0 0-2 2zm6-6v12l8 4V1l-8 4z" />
    </svg>
  )
}
function IconClipboard() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-6 9h6m-6 4h6" />
    </svg>
  )
}

const sections: { label: string; items: { id: CrmPage; label: string; icon: ReactNode }[] }[] = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard', label: 'Painel', icon: <IconGrid /> },
      { id: 'pipeline', label: 'Funil', icon: <IconColumns /> },
      { id: 'companies', label: 'Empresas', icon: <IconBuilding /> },
      { id: 'contacts', label: 'Contatos', icon: <IconUser /> },
      { id: 'forms', label: 'Formulários', icon: <IconClipboard /> },
      { id: 'activities', label: 'Atividades', icon: <IconCalendar /> },
    ],
  },
  {
    label: 'Engajamento',
    items: [
      { id: 'campaigns', label: 'Campanhas', icon: <IconMegaphone /> },
      { id: 'email', label: 'E-mail / SMTP', icon: <IconMail /> },
    ],
  },
  {
    label: 'Automação',
    items: [{ id: 'integrations', label: 'n8n & Webhooks', icon: <IconZap /> }],
  },
]

export function Sidebar({ activePage, onPageChange, mobileOpen }: SidebarProps) {
  return (
    <aside className={`sidebar${mobileOpen ? ' is-open' : ''}`} aria-label="Navegação principal">
      <div className="sidebar-logo">
        <div className="logo-icon">A</div>
        <div className="sidebar-brand">
          <span className="sidebar-brand-title">B2B CRM</span>
          <span className="sidebar-brand-tag">n8n ready</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {sections.map((section) => (
          <div key={section.label} className="nav-section">
            <p className="nav-section-label">{section.label}</p>
            {section.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-item${activePage === item.id ? ' active' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="nav-icon" aria-hidden>
                  {item.icon}
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-version">v1.1.0</p>
        <p className="sidebar-footer-hint">B2B CRM · dados demo</p>
      </div>
    </aside>
  )
}
