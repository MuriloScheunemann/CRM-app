import { useState, type ReactNode } from 'react'
import type { CrmPage } from '../types/pages'
import { CRM_PAGE_META } from '../types/pages'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

type CrmLayoutProps = {
  activePage: CrmPage
  onPageChange: (page: CrmPage) => void
  children: ReactNode
}

export function CrmLayout({ activePage, onPageChange, children }: CrmLayoutProps) {
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const meta = CRM_PAGE_META[activePage]

  return (
    <div className="app-container">
      {mobileOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <Sidebar
        activePage={activePage}
        onPageChange={(p) => {
          onPageChange(p)
          setMobileOpen(false)
        }}
        mobileOpen={mobileOpen}
      />

      <div className="main-content">
        <header className="content-topbar">
          <div className="content-topbar-left">
            <button
              type="button"
              className="mobile-menu-btn"
              aria-expanded={mobileOpen}
              aria-label="Abrir menu"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
            <div>
              <p className="eyebrow">B2B CRM</p>
              <h1 className="page-title">{meta.title}</h1>
              <p className="page-subtitle">{meta.description}</p>
            </div>
          </div>
          <div className="content-topbar-right">
            {user ? (
              <>
                <span className="status-pill content-user-pill">{user.email}</span>
                <button type="button" className="btn-secondary" onClick={() => signOut()}>
                  Sair
                </button>
              </>
            ) : (
              <span className="status-pill">Modo convidado</span>
            )}
          </div>
        </header>

        <div className="page-scroll">{children}</div>
      </div>
    </div>
  )
}
