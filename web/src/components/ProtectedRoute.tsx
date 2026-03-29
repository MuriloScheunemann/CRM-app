import React from 'react'
import { useAuth } from '../context/AuthContext'
import { AuthForm } from './AuthForm'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Sincronizando com a rede...</div>
  }

  if (!user) {
    return (
      <div className="login-page" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AuthForm />
      </div>
    )
  }

  return <>{children}</>
}
