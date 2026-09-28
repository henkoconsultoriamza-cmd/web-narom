import { motion } from "framer-motion"
import { useState } from "react"
import { useContent } from "../context/ContentContext"

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const { content } = useContent()
  const { whatsapp, email } = content.contact

  return (
    <section id="contacto" className="py-20 sm:py-28" style={{ background: "#02152C" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              Hablemos
            </p>
            <h2
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Queres sumarte como cliente?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Contanos el nombre de tu ferreteria y que rubros te interesan. Te respondemos con precios mayoristas y condiciones comerciales.
            </p>
            <div className="flex flex-col gap-4">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-[#F4AA24]/40 transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.096 1.508 5.822L0 24l6.335-1.493A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.624-.487-5.15-1.34l-.37-.217-3.76.886.934-3.668-.24-.384A9.943 9.943 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold group-hover:text-[#F4AA24] transition-colors">WhatsApp directo</p>
                  <p className="text-white/50 text-sm">Respuesta rapida en horario comercial</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-12 h-12 rounded-full bg-[#F4AA24] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#02152C]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">Email comercial</p>
                  <p className="text-white/50 text-sm">{email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 rounded-full bg-[#F4AA24] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#02152C]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">Mensaje enviado!</h3>
                <p className="text-white/60">Te contactamos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-4">
                {[
                  { id: "nombre", label: "Tu nombre", type: "text", placeholder: "Juan Garcia" },
                  { id: "ferreteria", label: "Nombre de la ferreteria", type: "text", placeholder: "Ferreteria El Martillo" },
                  { id: "email", label: "Email", type: "email", placeholder: "juan@ferreteria.com" },
                  { id: "tel", label: "Telefono / WhatsApp", type: "tel", placeholder: "+54 9 261 000-0000" },
                ].map(field => (
                  <div key={field.id}>
                    <label className="block text-white/60 text-sm font-medium mb-2">{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} required
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border border-white/10 focus:border-[#F4AA24]/60 transition-colors duration-300"
                      style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                ))}
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">Que productos te interesan?</label>
                  <textarea rows={3} placeholder="Herramientas electricas, pintura, selladores..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border border-white/10 focus:border-[#F4AA24]/60 transition-colors duration-300 resize-none"
                    style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
                <button type="submit" className="mt-2 bg-[#F4AA24] text-[#02152C] font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors duration-300 text-base">
                  Enviar consulta
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
