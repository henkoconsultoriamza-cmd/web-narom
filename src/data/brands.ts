export interface Brand {
  id: string
  name: string
  tagline: string
  description: string
  situationalImage: string
  logoFile: string | null
  catalogUrl: string
  imagePosition: string
  overlayDir: 'left' | 'right'
  brandAccent: string
  logoHasBg: boolean
  logoBg?: string
  mobilePosition?: string
}

export const brands: Brand[] = [
  {
    id: 'mota',
    name: 'MOTA',
    tagline: 'Trayectoria, confianza y soluciones para el profesional',
    description:
      'Herramientas manuales, discos, abrasivos, mechas y accesorios. Un portfolio amplio y estratégico para el mercado ferretero, profesional, industrial y de la construcción.',
    situationalImage:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=85',
    logoFile: '/brands/Mota.png',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'left',
    brandAccent: '#F5C800',
    logoHasBg: true,
  },
  {
    id: 'gama-pinturerias',
    name: 'GAMA PINTURERÍAS',
    tagline: 'Calidad que evoluciona. Pintamos y creamos futuro',
    description:
      'Nuestra fábrica familiar de pinturas y recubrimientos. Látex, esmaltes, impermeabilizantes y más — productos en constante desarrollo, con el respaldo de conocer cada detalle desde el origen.',
    situationalImage: '/brands/GamaBanner.png',
    logoFile: '/brands/Gama.png',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'right',
    brandAccent: '#e85d04',
    logoHasBg: false,
    logoBg: 'rgba(255,255,255,0.92)',
  },
  {
    id: 'ingco',
    name: 'INGCO',
    tagline: 'Potencia y rendimiento para cada trabajo',
    description:
      'Línea exclusiva de maquinarias: amoladora, taladros, sierras y más. Soluciones confiables y competitivas pensadas para dar potencia, rendimiento y practicidad al profesional exigente.',
    situationalImage: '/brands/IngcoBanner.png',
    logoFile: '/brands/Ingco.png',
    catalogUrl: '#',
    imagePosition: 'center',
    mobilePosition: 'right center',
    overlayDir: 'left',
    brandAccent: '#F5A800',
    logoHasBg: true,
  },
  {
    id: 'saniplast',
    name: 'SANIPLAST',
    tagline: 'Soluciones para el mundo del agua',
    description:
      'Caños, conexiones, termofusión y riego. Una línea completa para instalaciones sanitarias y proyectos que exigen soluciones prácticas y confiables.',
    situationalImage: '/brands/SaniplastBanner.jpg',
    logoFile: '/brands/Saniplast.png',
    catalogUrl: '#',
    imagePosition: 'top',
    overlayDir: 'right',
    brandAccent: '#2d8a4e',
    logoHasBg: true,
  },
  {
    id: 'sika',
    name: 'SIKA CONSTRUCCIÓN',
    tagline: 'Tecnología y confianza para la construcción',
    description:
      'Impermeabilización, sellado, reparación, hormigón y pisos. Soluciones químicas de referencia mundial, ahora disponibles en NAROM a precio de distribuidor.',
    situationalImage:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85',
    logoFile: '/brands/Sika.png',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'left',
    brandAccent: '#CC0000',
    logoHasBg: false,
  },
  {
    id: 'telplast',
    name: 'TELPLAST SRL',
    tagline: 'Soluciones profesionales para cada sellado',
    description:
      'Siliconas acéticas y neutras, selladores poliuretánicos y productos para zinguería. Más de 20 años fabricando en Argentina, con la calidad que exige la obra.',
    situationalImage:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85',
    logoFile: '/brands/Telplast.png',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'right',
    brandAccent: '#1565C0',
    logoHasBg: false,
  },
  {
    id: 'sinteplast',
    name: 'SINTEPLAST CONSTRUCCIÓN',
    tagline: 'Soluciones que acompañan cada obra',
    description:
      'Adhesivos, selladores e impermeabilizantes de amplia trayectoria en el mercado argentino. Calidad e innovación para el mercado ferretero, profesional y de obras.',
    situationalImage:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
    logoFile: '/brands/Sinteplast.jpg',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'left',
    brandAccent: '#0057A8',
    logoHasBg: false,
  },
  {
    id: 'narom-chemical',
    name: 'NAROM CHEMICAL Co.',
    tagline: 'Tecnología asfáltica. Soluciones que protegen',
    description:
      'Línea propia especializada en asfaltos e impermeabilizantes: emulsiones, pinturas y membranas asfálticas, autoadhesivas y asfaltos en pan para el mercado ferretero y profesional.',
    situationalImage: '/brands/NaromBanner.jpg',
    logoFile: '/brands/NaromChemical.png',
    catalogUrl: '#',
    imagePosition: 'center',
    overlayDir: 'right',
    brandAccent: '#F4AA24',
    logoHasBg: false,
  },
  {
    id: 'gama-diluyentes',
    name: 'GAMA DILUYENTES',
    tagline: 'Un diluyente para cada exigencia',
    description:
      'Thinners Limpieza, Estándar, Universal, Oro y Súper Acabado, más Aguarrás Comercial. Una escala completa de diluyentes y solventes para cada tipo de trabajo y terminación.',
    situationalImage: '/brands/GamaDiluyentesBanner.jpg',
    logoFile: null,
    catalogUrl: '#',
    imagePosition: 'center',
    mobilePosition: 'right center',
    overlayDir: 'left',
    brandAccent: '#e85d04',
    logoHasBg: false,
  },
]
