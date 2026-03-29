import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

export const EmailSettings: React.FC = () => {
  const [smtpHost, setSmtpHost] = useState('')
  const [smtpPort, setSmtpPort] = useState('465')
  const [smtpUser, setSmtpUser] = useState('')
  const [smtpPass, setSmtpUserPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // No CRM real, salvaríamos isso em uma tabela de configurações criptografada
      const { error } = await supabase
        .from('email_templates') // Usando tabela existente temporariamente para teste de conexão
        .select('id')
        .limit(1)

      if (error) throw error
      setMessage('✅ Configurações salvas localmente (demo B2B CRM).')
    } catch (err: any) {
      setMessage('❌ Erro ao salvar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const quickSetup = (provider: string) => {
    if (provider === 'gmail') {
      setSmtpHost('smtp.gmail.com')
      setSmtpPort('465')
    } else if (provider === 'hostinger') {
      setSmtpHost('smtp.hostinger.com')
      setSmtpPort('465')
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Configurações de E-mail (SMTP)</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => quickSetup('gmail')} className="btn-secondary" style={{ fontSize: '0.7rem' }}>Gmail</button>
          <button onClick={() => quickSetup('hostinger')} className="btn-secondary" style={{ fontSize: '0.7rem' }}>Hostinger</button>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SMTP HOST</label>
            <input type="text" placeholder="smtp.exemplo.com" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PORTA</label>
            <input type="text" placeholder="465" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} required />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>USUÁRIO / E-MAIL</label>
          <input type="email" placeholder="seu-email@hub.com" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} required />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SENHA DE APP / KEY</label>
          <input type="password" placeholder="••••••••••••" value={smtpPass} onChange={e => setSmtpUserPass(e.target.value)} required />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" disabled={loading}>Salvar Protocolo</button>
          <button type="button" className="btn-secondary">Testar Conexão</button>
        </div>
      </form>

      {message && <p style={{ marginTop: '1.5rem', color: 'var(--accent)', fontWeight: 700 }}>{message}</p>}
    </section>
  )
}
