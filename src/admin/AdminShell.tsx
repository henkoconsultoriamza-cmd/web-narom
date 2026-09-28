import React, { useState } from 'react'
import SectionContacto from './sections/SectionContacto'
import SectionMarcas from './sections/SectionMarcas'
import SectionPromos from './sections/SectionPromos'
import SectionProductos from './sections/SectionProductos'
import SectionEquipo from './sections/SectionEquipo'
import SectionEmpresa from './sections/SectionEmpresa'

type Section = 'contacto' | 'marcas' | 'promos' | 'productos' | 'equipo' | 'empresa'

const ICONS = {
  contacto: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  marcas: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>,
  promos: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
  productos: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  equipo: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  empresa: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
}

const NAV: Array<{ id: Section; label: string; desc: string }> = [
  { id: 'contacto', label: 'Contacto', desc: 'WhatsApp, email, dirección' },
  { id: 'marcas', label: 'Marcas', desc: 'Descripciones y catálogos' },
  { id: 'promos', label: 'Promociones', desc: 'Banner de ofertas vigentes' },
  { id: 'productos', label: 'Productos', desc: 'Top 10 más vendidos' },
  { id: 'equipo', label: 'Equipo', desc: 'Personas de la empresa' },
  { id: 'empresa', label: 'Empresa', desc: 'Historia, stats y valores' },
]

export default function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState<Section>('contacto')
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const sectionProps = { onSave: showToast }

  const SECTIONS: Record<Section, React.ReactElement> = {
    contacto: <SectionContacto {...sectionProps} />,
    marcas: <SectionMarcas {...sectionProps} />,
    promos: <SectionPromos {...sectionProps} />,
    productos: <SectionProductos {...sectionProps} />,
    equipo: <SectionEquipo {...sectionProps} />,
    empresa: <SectionEmpresa {...sectionProps} />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', background: '#f1f5f9' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 264,
        minHeight: '100vh',
        background: '#02152C',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 50,
        overflowY: 'auto',
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        transition: 'transform 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <img
            src="/logos/PNG/Logo_Horizontal_Negativo_Narom_Group.png"
            alt="Narom Group"
            style={{ height: 28, display: 'block', marginBottom: 10 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#F4AA24',
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            Panel Administrativo
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 12px' }}>
          {NAV.map(item => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false) }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  border: 'none',
                  borderLeft: isActive ? '3px solid #F4AA24' : '3px solid transparent',
                  background: isActive ? 'rgba(244,170,36,0.12)' : 'transparent',
                  color: isActive ? '#F4AA24' : 'rgba(255,255,255,0.55)',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: 2,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }}>{ICONS[item.id]}</span>
                <div>
                  <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.55, fontWeight: 400, marginTop: 1 }}>{item.desc}</div>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', background: '#F4AA24',
              color: '#02152C', borderRadius: 8,
              fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}
          >
            🌐 Ver web en nueva pestaña
          </a>
          <button
            onClick={onLogout}
            style={{
              padding: '10px 14px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
              color: 'rgba(255,255,255,0.45)', fontFamily: 'inherit',
              fontWeight: 500, fontSize: 13, cursor: 'pointer',
              textAlign: 'left', display: 'flex', gap: 8,
            }}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 264, padding: '40px 48px', minHeight: '100vh', boxSizing: 'border-box' }}>
        {/* Mobile top bar */}
        <div style={{ display: 'none' }} className="mobile-topbar">
          <button onClick={() => setSidebarOpen(true)} style={{ background: '#02152C', border: 'none', borderRadius: 8, padding: '8px 12px', color: '#F4AA24', cursor: 'pointer', fontSize: 18 }}>
            ☰
          </button>
        </div>

        {SECTIONS[active]}
      </main>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#02152C',
          color: '#fff',
          padding: '14px 22px',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          borderLeft: '4px solid #F4AA24',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'Montserrat, sans-serif',
        }}>
          <span style={{ fontSize: 18 }}>✅</span>
          {toast}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          aside { transform: translateX(-100%); }
          aside.open { transform: translateX(0); }
          main { margin-left: 0 !important; padding: 20px !important; }
          .mobile-topbar { display: flex !important; align-items: center; gap: 12px; margin-bottom: 24px; }
        }
      `}</style>
    </div>
  )
}
