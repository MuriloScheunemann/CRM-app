import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
  demoSignIn: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se existe usuário demo no session storage
    const demoUser = sessionStorage.getItem('aiox_demo_user')
    if (demoUser) {
      setUser(JSON.parse(demoUser))
      setLoading(false)
      return
    }

    // Verificar sessão inicial do Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) setUser(session.user)
      setLoading(false)
    })

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) setUser(session.user)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    sessionStorage.removeItem('aiox_demo_user')
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
  }

  const demoSignIn = () => {
    const fakeUser = {
      id: 'demo-123',
      email: 'admin@demo.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as any
    sessionStorage.setItem('aiox_demo_user', JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const value = {
    user,
    session,
    loading,
    signOut,
    demoSignIn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
