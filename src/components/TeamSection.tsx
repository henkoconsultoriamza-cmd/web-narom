import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import OptimizedImage from './OptimizedImage'

export default function TeamSection() {
  const { content } = useContent()
  const { team } = content

  return (
    <section style={{ background: '#02152C' }} className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Las personas detrás
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Nuestro equipo
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {team.map((persona, i) => (
            <motion.div
              key={persona.nombre + i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-5">
                <div
                  className="absolute inset-0 rounded-full border-2 border-[#F4AA24]/30 group-hover:border-[#F4AA24] transition-all duration-500 scale-110"
                />
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{ width: 'clamp(110px, 14vw, 160px)', height: 'clamp(110px, 14vw, 160px)' }}
                >
                  <OptimizedImage
                    src={persona.foto}
                    profile="portrait"
                    sizes="160px"
                    alt={persona.nombre}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(2,21,44,0.4) 100%)' }} />
                </div>
              </div>

              <div className="w-6 h-0.5 bg-[#F4AA24] mb-3 group-hover:w-10 transition-all duration-300" />

              <h3 className="text-white font-black text-base leading-tight mb-1">
                {persona.nombre}
              </h3>
              <p className="text-[#F4AA24] text-xs tracking-widest uppercase font-semibold mb-3">
                {persona.rol}
              </p>
              <p className="text-white/45 text-sm leading-relaxed">
                {persona.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
