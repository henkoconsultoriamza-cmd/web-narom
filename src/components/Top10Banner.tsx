import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext'

// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/free-mode'


export default function Top10Banner() {
  const { content } = useContent()
  const top10 = content.products

  return (
    <section style={{ background: '#02152C' }} className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#F4AA24] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Los más pedidos
          </p>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Top 10 productos
          </h2>
        </motion.div>
      </div>

      <Swiper
        modules={[FreeMode]}
        freeMode
        spaceBetween={16}
        slidesPerView={1.3}
        breakpoints={{
          480:  { slidesPerView: 2.1 },
          768:  { slidesPerView: 3.1 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 5.1 },
        }}
        className="px-6 sm:px-10"
      >
        {top10.map((product, i) => (
          <SwiperSlide key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {product.url ? (
                <a href={product.url} target="_blank" rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl cursor-pointer block"
                  style={{ height: '280px' }}>
                  <img src={product.image} alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,21,44,0.95) 0%, rgba(2,21,44,0.3) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-[#F4AA24] text-xs font-semibold tracking-widest mb-1">{product.brand}</p>
                    <p className="text-white font-bold text-sm leading-tight">{product.name}</p>
                    <p className="text-white/40 text-xs mt-1">{product.category}</p>
                  </div>
                </a>
              ) : (
                <div className="group relative overflow-hidden rounded-xl cursor-default"
                  style={{ height: '280px' }}>
                  <img src={product.image} alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,21,44,0.95) 0%, rgba(2,21,44,0.3) 60%, transparent 100%)' }} />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="text-[#F4AA24] text-xs font-semibold tracking-widest mb-1">{product.brand}</p>
                    <p className="text-white font-bold text-sm leading-tight">{product.name}</p>
                    <p className="text-white/40 text-xs mt-1">{product.category}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
