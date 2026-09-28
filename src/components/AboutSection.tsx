import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useContent } from '../context/ContentContext'

interface StatProps { value: number; label: string; suffix?: string }

function AnimatedStat({ value, label, suffix = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-black text-[#F4AA24] leading-none" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}>
        {count}{suffix}
      </div>
      <p className="text-white/50 text-sm mt-2 font-medium uppercase tracking-widest">{label}</p>
    </div>
  )
}

export default function AboutSection() {
  const { content } = useContent()
  const { about } = content
  const wa = content.contact.whatsapp

  return (
    <section id="empresa" style={{ background: '#02152C' }} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              Quiénes somos
            </p>
            <h2
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              Más que distribución:<br />una alianza para crecer
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-4">
              {about.intro}
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              {about.intro2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ height: '380px' }}
          >
            <img
              src={about.depotImage}
              alt="Depósito Narom Group"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(2,21,44,0.4) 0%, transparent 60%)' }} />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-t border-b border-white/10 mb-24"
        >
          {about.stats.map((s, i) => (
            <AnimatedStat key={i} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>

        {/* Por qué nos eligen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            La diferencia
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            ¿Por qué nos eligen?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {about.reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 sm:p-10 border-b border-r border-white/10 hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden group"
            >
              <span
                className="absolute top-4 right-6 font-black text-white/5 leading-none select-none group-hover:text-[#F4AA24]/10 transition-colors duration-500"
                style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <div className="w-8 h-0.5 bg-[#F4AA24] mb-6" />
                <h3
                  className="text-white font-black leading-tight mb-4"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}
                >
                  {r.titulo}
                </h3>
                <p className="text-white/55 text-base leading-relaxed">
                  {r.texto}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-[#F4AA24]/20"
          style={{ background: 'rgba(244,170,36,0.05)' }}
        >
          <div>
            <p className="text-white font-black text-xl sm:text-2xl leading-tight mb-1">
              ¿Querés ser parte de nuestra red?
            </p>
            <p className="text-white/50 text-sm">
              Un asesor te contacta con condiciones comerciales en menos de 24 h.
            </p>
          </div>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F4AA24] text-[#02152C] font-black px-7 py-4 rounded-full hover:bg-amber-400 transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.096 1.508 5.822L0 24l6.335-1.493A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.624-.487-5.15-1.34l-.37-.217-3.76.886.934-3.668-.24-.384A9.943 9.943 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Contactá con un asesor
          </a>
        </motion.div>

      </div>
    </section>
  )
}
