import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CrmLeadsProvider } from './context/CrmLeadsContext'
import './index.css'
import App from './App.tsx'
import { PublicFormPage } from './pages/PublicFormPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CrmLeadsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/f/:slug" element={<PublicFormPage />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </CrmLeadsProvider>
  </StrictMode>,
)
