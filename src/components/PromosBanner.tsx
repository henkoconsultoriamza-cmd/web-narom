import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'
import { getPromoImageSources } from '../lib/images'
import type { Promo } from '../data/promos'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'
// @ts-ignore
import 'swiper/css/pagination'
// @ts-ignore
import 'swiper/css/effect-fade'

function PromoImage({ promo, current }: { promo: Promo; current: boolean }) {
  const [useOriginal, setUseOriginal] = useState(false)
  const desktop = useOriginal
    ? { src: promo.image, srcSet: undefined }
    : getPromoImageSources(promo.image, 'desktop')
  const mobileSrc = promo.imageMobile || promo.image
  const mobile = useOriginal
    ? { src: mobileSrc, srcSet: undefined }
    : getPromoImageSources(mobileSrc, 'mobile')

  return (
    <picture className="absolute inset-0 w-full h-full">
      {mobile && (
        <source media="(max-width: 639px)" srcSet={mobile.srcSet ?? mobile.src} sizes="100vw" />
      )}
      <img
        src={desktop.src}
        srcSet={desktop.srcSet}
        sizes="100vw"
        alt={promo.title}
        decoding="async"
        fetchPriority={current ? 'high' : 'low'}
        onError={useOriginal ? undefined : () => setUseOriginal(true)}
        className="w-full h-full object-cover object-center transition-transform duration-[1.4s] group-hover:scale-105"
      />
    </picture>
  )
}

export default function PromosBanner() {
  const { content, loading } = useContent()
  const [activeIndex, setActiveIndex] = useState(0)
  const promos = content.promos.filter(promo => promo.active)
  const wa = content.contact.whatsapp

  return (
    <section id="promociones" style={{ background: '#02152C' }} className="py-16 sm:py-20">
      {/* Título */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Ofertas vigentes
          </p>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Promociones del mes
          </h2>
        </motion.div>
      </div>

      {/* Slider full width */}
      <div>
      {loading ? (
        <div
          role="status"
          aria-label="Cargando promociones"
          style={{ height: 'calc(clamp(420px, 55vw, 500px) + 40px)' }}
        />
      ) : promos.length > 0 ? (
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={promos.length > 1}
        autoplay={promos.length > 1 ? { delay: 4500, disableOnInteraction: false } : false}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        navigation
        pagination={{ clickable: true }}
        style={{ width: '100%', paddingBottom: '40px' }}
      >
        {promos.map((promo, index) => (
          <SwiperSlide key={promo.id} style={{ width: '100%' }}>
            <div
              className="relative w-full overflow-hidden"
              style={{ height: 'clamp(420px, 55vw, 500px)' }}
            >
              {/* Keep optimized slides mounted and ready to display. Autoplay
                  keeps its normal speed; no slide waits for an image request. */}
              {promo.image && (
                <PromoImage
                  key={`${promo.image}|${promo.imageMobile ?? ''}`}
                  promo={promo}
                  current={index === activeIndex}
                />
              )}
              <div className="absolute inset-0" style={{ background: 'rgba(2,21,44,0.25)' }} />
              <div className="absolute bottom-6 left-8">
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-black px-6 py-3 rounded-full border border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-sm"
                >
                  Lo quiero
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ) : null}
      </div>
    </section>
  )
}
