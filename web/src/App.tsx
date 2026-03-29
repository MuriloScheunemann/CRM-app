import { useState, type ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CrmLayout } from './layout/CrmLayout'
import type { CrmPage } from './types/pages'
import type { Lead } from './types/schemas'
import { seedLeads } from './data/seedLeads'
import { DashboardHomeView } from './views/DashboardHomeView'
import { PipelineView } from './views/PipelineView'
import { CompaniesView } from './views/CompaniesView'
import { ContactsView } from './views/ContactsView'
import { ActivitiesView } from './views/ActivitiesView'
import { CampaignsPage } from './views/CampaignsPage'
import { EmailPage } from './views/EmailPage'
import { N8nIntegrationsView } from './views/N8nIntegrationsView'
import './App.css'

function CrmApp() {
  const [activePage, setActivePage] = useState<CrmPage>('dashboard')
  const [leads] = useState<Lead[]>(seedLeads)

  let content: ReactNode
  switch (activePage) {
    case 'dashboard':
      content = <DashboardHomeView leads={leads} />
      break
    case 'pipeline':
      content = <PipelineView leads={leads} />
      break
    case 'companies':
      content = <CompaniesView leads={leads} />
      break
    case 'contacts':
      content = <ContactsView leads={leads} />
      break
    case 'activities':
      content = <ActivitiesView />
      break
    case 'campaigns':
      content = <CampaignsPage />
      break
    case 'email':
      content = <EmailPage />
      break
    case 'integrations':
      content = <N8nIntegrationsView leads={leads} />
      break
    default:
      content = <DashboardHomeView leads={leads} />
  }

  return (
    <CrmLayout activePage={activePage} onPageChange={setActivePage}>
      {content}
    </CrmLayout>
  )
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <CrmApp />
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
