import OptimizedImage from './OptimizedImage'

export default function Hero() {
  return (
    <section id="inicio" className="relative h-[100dvh] w-full overflow-hidden">
      {/* Fondo */}
      <OptimizedImage
        src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=1920&q=85"
        profile="desktop"
        loading="eager"
        fetchPriority="high"
        alt=""
        className="anim-fade-in absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(150deg, rgba(2,21,44,0.95) 0%, rgba(2,21,44,0.80) 50%, rgba(2,21,44,0.65) 100%)' }}
      />

      {/* Contenido central */}
      <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20">

        {/* Título */}
        <h1
          className="anim-fade-up text-white font-black leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(36px, 5.5vw, 82px)', animationDelay: '600ms', maxWidth: '750px' }}
        >
          Tu ferretería, abastecida
          <br />
          <span className="text-[#F4AA24]">desde un solo lugar</span>
        </h1>

        {/* Bajada */}
        <p
          className="anim-fade-up text-white/55 leading-relaxed mb-10"
          style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', animationDelay: '780ms', maxWidth: '480px' }}
        >
          Distribuimos INGCO, MOTA, SANIPLAST y GAMA PINTURAS a ferreterías de toda la región.
        </p>

        {/* CTAs */}
        <div className="anim-fade-up flex flex-wrap gap-4" style={{ animationDelay: '950ms' }}>
          <a
            href="#marcas"
            className="inline-flex items-center gap-2 bg-[#F4AA24] text-[#02152C] font-black px-7 py-4 rounded-full hover:bg-amber-400 transition-all duration-300 hover:scale-105 text-sm"
          >
            Ver marcas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-4 rounded-full hover:border-[#F4AA24] hover:text-[#F4AA24] transition-all duration-300 text-sm"
          >
            Contactanos
          </a>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div
        className="anim-line absolute z-10 h-px"
        style={{ left: '5%', right: '5%', bottom: '0', background: 'rgba(244,170,36,0.2)' }}
      />
    </section>
  )
}
