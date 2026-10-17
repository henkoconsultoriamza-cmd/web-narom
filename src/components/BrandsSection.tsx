import { motion } from 'framer-motion'
import { useState } from 'react'
import { useContent } from '../context/ContentContext'
import type { Brand } from '../data/brands'
import OptimizedImage from './OptimizedImage'

function BrandLogo({ brand, isRight }: { brand: Brand; isRight: boolean }) {
  const [failed, setFailed] = useState(false)
  const align = isRight ? 'flex-end' : 'flex-start'

  if (brand.logoFile && !failed) {
    return (
      <div className="mb-5" style={{ display: 'flex', justifyContent: align }}>
        <div style={{
          background: brand.logoBg ?? 'transparent',
          borderRadius: brand.logoBg ? 12 : 0,
          padding: brand.logoBg ? '8px 14px' : 0,
          display: 'inline-flex',
        }}>
          <OptimizedImage
            src={brand.logoFile}
            profile="logo"
            sizes="220px"
            alt={brand.name}
            onError={() => setFailed(true)}
            className="object-contain"
            style={{
              height: 'clamp(40px, 4.5vw, 68px)',
              maxWidth: '220px',
              filter: brand.logoBg ? 'none' : 'drop-shadow(0 2px 12px rgba(0,0,0,0.7)) brightness(1.05)',
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mb-5" style={{ display: 'flex', justifyContent: align }}>
      <div
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl"
        style={{ background: brand.brandAccent, boxShadow: `0 4px 20px ${brand.brandAccent}55` }}
      >
        <span
          className="font-black tracking-tight leading-none"
          style={{
            fontSize: 'clamp(18px, 2.5vw, 32px)',
            color: brand.brandAccent === '#2d8a4e' ? '#ffffff' : '#02152C',
          }}
        >
          {brand.name}
        </span>
      </div>
    </div>
  )
}

export default function BrandsSection() {
  const { content } = useContent()
  const { brands } = content
  const wa = content.contact.whatsapp

  return (
    <section id="marcas" style={{ background: '#02152C' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Nuestras marcas
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Todo lo que necesita tu ferretería,
            <br className="hidden sm:block" /> en un solo proveedor
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {brands.map((brand, i) => {
          const isRight = brand.overlayDir === 'right'
          return (
            <motion.div
              key={brand.id}
              id={brand.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full overflow-hidden group"
              style={{ minHeight: 'clamp(340px, 44vw, 460px)' }}
            >
              {i > 0 && (
                <div className="absolute top-0 inset-x-0 z-30" style={{ height: 8 }}>
                  <div style={{ height: 2, background: 'linear-gradient(to right, transparent 5%, #F4AA24 30%, #F4AA24 70%, transparent 95%)', opacity: 0.7 }} />
                  <div style={{ height: 6, background: 'linear-gradient(to bottom, rgba(2,21,44,0.95), transparent)' }} />
                </div>
              )}

              <OptimizedImage
                src={brand.situationalImage}
                profile="desktop"
                alt={brand.name}
                className="brand-bg-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                style={{
                  objectPosition: brand.imagePosition,
                  // @ts-ignore
                  '--mobile-pos': brand.mobilePosition ?? 'left center',
                }}
              />

              {/* overlay mobile */}
              <div className="absolute inset-0 sm:hidden" style={{ background: 'linear-gradient(135deg, rgba(2,21,44,0.80) 0%, rgba(2,21,44,0.20) 50%, rgba(2,21,44,0.70) 100%)' }} />
              {/* overlay desktop */}
              <div className="absolute inset-0 hidden sm:block" style={{
                background: isRight
                  ? 'linear-gradient(to left, rgba(2,21,44,0.92) 0%, rgba(2,21,44,0.60) 38%, rgba(2,21,44,0.05) 100%)'
                  : 'linear-gradient(to right, rgba(2,21,44,0.92) 0%, rgba(2,21,44,0.60) 38%, rgba(2,21,44,0.05) 100%)',
              }} />

              <div
                className="absolute font-black text-white/[0.04] select-none pointer-events-none leading-none"
                style={{
                  fontSize: 'clamp(140px, 22vw, 300px)',
                  bottom: '-0.1em',
                  [isRight ? 'right' : 'left']: '-0.04em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* ── MOBILE: logo esquina sup-izq · botones esquina inf-der ── */}
              <motion.div
                initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.1 }}
                className="sm:hidden absolute top-5 left-4 z-20"
              >
                <div style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9))' }}>
                  <BrandLogo brand={brand} isRight={false} />
                </div>
                <p className="text-[10px] tracking-[0.16em] uppercase font-bold text-white/90" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}>
                  {brand.tagline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.2 }}
                className="sm:hidden absolute bottom-5 right-4 z-20 flex flex-col gap-2 items-end"
              >
                <a href={brand.catalogUrl}
                  className="inline-flex items-center gap-1.5 font-black px-4 py-2 rounded-full text-xs whitespace-nowrap"
                  style={{ background: brand.brandAccent, color: '#fff' }}
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Ver catálogo
                </a>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold px-4 py-2 rounded-full border border-white/50 text-white text-xs whitespace-nowrap"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >
                  Contactá con un asesor
                </a>
              </motion.div>

              {/* ── DESKTOP: layout original centrado según overlayDir ── */}
              <div
                className={`hidden sm:flex absolute inset-0 flex-col justify-center px-12 lg:px-16 ${
                  isRight ? 'items-end text-right' : 'items-start text-left'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.75, delay: 0.15 }}
                  className="max-w-lg"
                >
                  <BrandLogo brand={brand} isRight={isRight} />
                  <p className="text-xs tracking-[0.22em] uppercase font-bold mb-3" style={{ color: brand.brandAccent }}>
                    {brand.tagline}
                  </p>
                  <p className={`text-white/60 text-sm leading-relaxed mb-6 ${isRight ? 'ml-auto' : ''}`} style={{ maxWidth: '26rem' }}>
                    {brand.description}
                  </p>
                  <div className={`flex flex-wrap gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
                    <a href={brand.catalogUrl}
                      className="inline-flex items-center gap-2 font-black px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap"
                      style={{ background: brand.brandAccent, color: '#fff' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      Ver catálogo
                    </a>
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-white/30 text-white hover:border-white/70 hover:bg-white/10 transition-all duration-300 text-sm whitespace-nowrap"
                    >
                      Contactá con un asesor
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .brand-bg-img { object-position: var(--mobile-pos, left center) !important; }
        }
      `}</style>
    </section>
  )
}
