import { useState, type ReactNode } from 'react'
import { AuthProvider } from './context/AuthContext'
import { useCrmLeads } from './context/CrmLeadsContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { CrmLayout } from './layout/CrmLayout'
import type { CrmPage } from './types/pages'
import { DashboardHomeView } from './views/DashboardHomeView'
import { PipelineView } from './views/PipelineView'
import { CompaniesView } from './views/CompaniesView'
import { ContactsView } from './views/ContactsView'
import { FormsPage } from './views/FormsPage'
import { ActivitiesView } from './views/ActivitiesView'
import { CampaignsPage } from './views/CampaignsPage'
import { EmailPage } from './views/EmailPage'
import { N8nIntegrationsView } from './views/N8nIntegrationsView'
import './App.css'

function CrmApp() {
  const { leads } = useCrmLeads()
  const [activePage, setActivePage] = useState<CrmPage>('dashboard')

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
    case 'forms':
      content = <FormsPage />
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
