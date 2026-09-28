import { motion } from "framer-motion"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Empresa", href: "#empresa" },
  { label: "Marcas", href: "#marcas" },
  { label: "Promociones", href: "#promociones" },
  { label: "Contacto", href: "#contacto" },
]

export default function Footer() {
  return (
    <footer
      style={{ background: "#000d1a", borderTop: "1px solid rgba(244,170,36,0.15)" }}
      className="py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12"
        >
          <div>
            <img
              src="/logos/PNG/Logo_Horizontal_Negativo_Narom_Group.png"
              alt="Narom Group"
              className="h-8 w-auto mb-4"
            />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Distribuidor mayorista de herramientas, pinturas y sanitarios para ferreterías.
            </p>
          </div>
          <div>
            <p className="text-[#F4AA24] text-xs tracking-widest uppercase font-semibold mb-4">Navegación</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/50 text-sm hover:text-[#F4AA24] transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-[#F4AA24] text-xs tracking-widest uppercase font-semibold mb-4">Marcas</p>
            <div className="flex flex-col gap-2">
              {["INGCO", "MOTA", "SANIPLAST", "GAMA PINTURAS"].map(m => (
                <a
                  key={m}
                  href="#marcas"
                  className="text-white/50 text-sm hover:text-[#F4AA24] transition-colors duration-300"
                >
                  {m}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-white/30 text-xs">© 2026 Narom Group. Todos los derechos reservados.</p>
            <span className="hidden sm:inline text-white/15 text-xs">·</span>
            <a
              href="/privacidad.html"
              className="text-white/30 text-xs hover:text-[#F4AA24] transition-colors duration-300"
            >
              Política de Privacidad
            </a>
          </div>
          <a
            href="https://consultoriahenko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300"
          >
            <span className="text-white/60 text-xs">Desarrollado por</span>
            <img
              src="/logos/Henko/Logo_Horizontal_Negativo_Henko.png"
              alt="Henko Consultoría"
              className="h-5 w-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
