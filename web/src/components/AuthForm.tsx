import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { demoSignIn } = useAuth()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Verifique seu e-mail para confirmar o cadastro!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="eyebrow">B2B CRM · ACESSO</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem' }}>
          {isSignUp ? 'Criar Conta' : 'Conectar ao Hub'}
        </h2>
      </div>

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>E-MAIL</label>
          <input 
            type="email" 
            placeholder="exemplo@hub.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SENHA</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? 'Sincronizando...' : isSignUp ? 'Registrar no Sistema' : 'Entrar no CRM'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <button 
          onClick={demoSignIn} 
          className="btn-secondary" 
          style={{ width: '100%', border: '1px solid var(--accent)', color: 'var(--accent)' }}
        >
          Acesso Temporário (Demonstração)
        </button>
        
        <button 
          onClick={() => setIsSignUp(!isSignUp)} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {isSignUp ? 'Já possui credenciais? Entrar' : 'Novo terminal? Solicitar acesso'}
        </button>
      </div>

      {message && (
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '0.8rem', 
          borderRadius: '8px', 
          background: 'rgba(6, 182, 212, 0.1)', 
          border: '1px solid var(--accent)',
          fontSize: '0.85rem',
          color: 'var(--accent)',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
    </div>
  )
}
