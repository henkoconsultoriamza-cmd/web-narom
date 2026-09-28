import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext'

const navLinks = ['Inicio', 'Empresa', 'Marcas', 'Promociones', 'Contacto']
const navAnchors = ['#inicio', '#empresa', '#marcas', '#promociones', '#contacto']

export default function Header() {
  const { content } = useContent()
  const wa = content.contact.whatsapp
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(2,21,44,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(244,170,36,0.15)' : 'none',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#inicio" className="anim-fade-up flex-shrink-0" style={{ animationDelay: '800ms' }}>
            <img
              src="/logos/PNG/Logo_Horizontal_Negativo_Narom_Group.png"
              alt="Narom Group"
              className="h-8 sm:h-10 w-auto"
            />
          </a>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href={navAnchors[i]}
                className="anim-fade-up text-sm font-semibold text-white/80 hover:text-[#F4AA24] transition-colors duration-300 tracking-wide"
                style={{ animationDelay: `${1000 + i * 80}ms` }}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="anim-fade-up hidden sm:inline-flex items-center gap-2 bg-[#F4AA24] text-[#02152C] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-amber-400 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: '900ms' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.096 1.508 5.822L0 24l6.335-1.493A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.624-.487-5.15-1.34l-.37-.217-3.76.886.934-3.668-.24-.384A9.943 9.943 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>

            <button
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 anim-fade-up"
              style={{ animationDelay: '900ms' }}
              aria-label="Menú"
            >
              <span className="block h-0.5 w-6 bg-white transition-all duration-500 origin-center"
                style={menuOpen ? { transform: 'rotate(45deg) translateY(4px)' } : {}} />
              <span className="block h-0.5 w-6 bg-white transition-all duration-300"
                style={menuOpen ? { opacity: 0 } : {}} />
              <span className="block h-0.5 w-6 bg-white transition-all duration-500 origin-center"
                style={menuOpen ? { transform: 'rotate(-45deg) translateY(-4px)' } : {}} />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop mobile */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-500"
        style={{
          background: menuOpen ? 'rgba(0,0,0,0.6)' : 'transparent',
          backdropFilter: menuOpen ? 'blur(4px)' : 'none',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer mobile */}
      <div
        className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-40 lg:hidden flex flex-col px-8 py-10 transition-transform duration-500"
        style={{
          background: '#0d1b2a',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)',
        }}
      >
        <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6 mt-12">Navegación</p>
        <nav className="flex flex-col gap-2 mb-10">
          {navLinks.map((link, i) => (
            <a key={link} href={navAnchors[i]} onClick={() => setMenuOpen(false)}
              className="text-3xl font-black text-white hover:text-[#F4AA24] transition-colors duration-300 py-1">
              {link}
            </a>
          ))}
        </nav>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F4AA24] text-[#02152C] font-bold px-5 py-3 rounded-full text-sm w-fit">
          WhatsApp
        </a>
      </div>
    </>
  )
}
