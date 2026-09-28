import { useState } from 'react'

const PASSWORD = 'Narom2026*123'

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pw === PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #02152C 0%, #0d2a4a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Montserrat, sans-serif',
      padding: 24,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        animation: shake ? 'shake 0.4s ease' : undefined,
      }}>
        <img
          src="/logos/PNG/Logo_Horizontal_Positivo_Narom_Group.png"
          alt="Narom Group"
          style={{ height: 36, display: 'block', marginBottom: 28 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />

        <span style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          color: '#F4AA24',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          background: 'rgba(244,170,36,0.1)',
          padding: '4px 10px',
          borderRadius: 20,
          marginBottom: 12,
        }}>
          Panel Administrativo
        </span>

        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#02152C', marginBottom: 32, lineHeight: 1.2 }}>
          Acceder al panel
        </h1>

        <form onSubmit={handleSubmit}>
          <label style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 700,
            color: '#02152C',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            Contraseña
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            placeholder="Ingresá tu contraseña"
            autoFocus
            style={{
              width: '100%',
              padding: '13px 16px',
              borderRadius: 10,
              border: error ? '2px solid #ef4444' : '1.5px solid #d0d0d0',
              fontSize: 15,
              fontFamily: 'inherit',
              color: '#1a1a1a',
              background: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
              marginBottom: error ? 8 : 20,
              caretColor: '#F4AA24',
              WebkitTextFillColor: '#1a1a1a',
            }}
          />
          {error && (
            <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16, fontWeight: 600 }}>
              Contraseña incorrecta. Intentá de nuevo.
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 15,
              background: '#F4AA24',
              border: 'none',
              borderRadius: 10,
              fontFamily: 'inherit',
              fontWeight: 900,
              fontSize: 15,
              color: '#02152C',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.1s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e09c1a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F4AA24')}
          >
            Ingresar →
          </button>
        </form>

        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: '#bbb' }}>
          Henko Consultoría · Panel privado
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
