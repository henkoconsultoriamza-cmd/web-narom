import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { brands as defaultBrands } from '../data/brands'
import { promos as defaultPromos } from '../data/promos'
import { top10 as defaultProducts } from '../data/products'
import type { Brand } from '../data/brands'
import type { Promo } from '../data/promos'
import type { Product } from '../data/products'
import { supabase } from '../lib/supabase'

export interface TeamMember {
  nombre: string
  rol: string
  descripcion: string
  foto: string
}

export interface SiteContent {
  contact: {
    whatsapp: string
    email: string
    address: string
    hours: string
  }
  brands: Brand[]
  promos: Promo[]
  products: Product[]
  team: TeamMember[]
  about: {
    intro: string
    intro2: string
    depotImage: string
    stats: Array<{ value: number; suffix: string; label: string }>
    reasons: Array<{ titulo: string; texto: string }>
  }
}

const defaultTeam: TeamMember[] = [
  { nombre: 'Rodrigo Molina', rol: 'Gerente Comercial', descripcion: 'Gestiona las relaciones con ferreterías y define la estrategia de distribución.', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face' },
  { nombre: 'Valeria Díaz', rol: 'Responsable de Logística', descripcion: 'Coordina entregas y garantiza que cada pedido llegue completo y en tiempo.', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=face' },
  { nombre: 'Martín Suárez', rol: 'Asesor de Ventas', descripcion: 'Acompaña a cada ferretería en la selección de productos y condiciones comerciales.', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face' },
  { nombre: 'Carolina Vega', rol: 'Atención al Cliente', descripcion: 'Primer punto de contacto para consultas, pedidos y resolución de incidencias.', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face' },
]

export const defaultContent: SiteContent = {
  contact: {
    whatsapp: '5492613020015',
    email: 'ventas@naromgroup.com',
    address: 'Calle 3 esq. Lateral Santa Rita, Parque Industrial Las Heras, Mendoza',
    hours: 'Lun a Vie 8:00 a 17:00 hs',
  },
  brands: defaultBrands,
  promos: defaultPromos,
  products: defaultProducts,
  team: defaultTeam,
  about: {
    intro: 'Empezamos en 2018 como Ferreshop, nuestra primera distribuidora, y crecimos incorporando marcas, categorías y clientes hasta convertirnos en NAROM GROUP: una empresa con identidad propia y vocación de socio comercial para el mercado ferretero.',
    intro2: 'Nuestro propósito es facilitar y potenciar el negocio de cada cliente. Portfolio amplio, marcas competitivas, respuesta ágil y el trato directo que te permite confiar en quién te provee.',
    depotImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    stats: [
      { value: 8, suffix: ' años', label: 'de trayectoria' },
      { value: 200, suffix: '+', label: 'Ferreterías activas' },
      { value: 2000, suffix: '+', label: 'SKUs disponibles' },
      { value: 9, suffix: '', label: 'Marcas en portfolio' },
    ],
    reasons: [
      { titulo: 'Más que un proveedor', texto: 'Escuchamos, asesoramos y desarrollamos propuestas adaptadas a cada cliente. Un socio comercial para hacer crecer tu negocio.' },
      { titulo: 'Portfolio en crecimiento', texto: 'Herramientas, pinturas, sanitarios, impermeabilizantes y más. Todo lo que rota en una ferretería, en un solo pedido.' },
      { titulo: 'Precio de distribuidor', texto: 'Comprás directo, sin intermediarios. Tu margen protegido desde el primer pedido.' },
      { titulo: 'Trato humano y ágil', texto: 'La tecnología nos hace más rápidos, pero nunca perdemos lo más importante: la relación cercana y personalizada con cada cliente.' },
    ],
  },
}

const SUPABASE_ROW = 'narom_web'

function mergeWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...parsed,
    about: { ...defaultContent.about, ...(parsed.about ?? {}) },
    contact: { ...defaultContent.contact, ...(parsed.contact ?? {}) },
  }
}

interface Ctx {
  content: SiteContent
  save: (partial: Partial<SiteContent>) => Promise<void>
  loading: boolean
}

const ContentContext = createContext<Ctx | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      const { data, error } = await supabase
        .from('site_content')
        .select('data')
        .eq('id', SUPABASE_ROW)
        .single()

      if (!error && data?.data && Object.keys(data.data).length > 0) {
        setContent(mergeWithDefaults(data.data as Partial<SiteContent>))
      }
      setLoading(false)
    }
    fetchContent()
  }, [])

  async function save(partial: Partial<SiteContent>) {
    const next = {
      ...content,
      ...partial,
      about: { ...content.about, ...(partial.about ?? {}) },
      contact: { ...content.contact, ...(partial.contact ?? {}) },
    }
    setContent(next)
    await supabase
      .from('site_content')
      .upsert({ id: SUPABASE_ROW, data: next, updated_at: new Date().toISOString() })
  }

  return (
    <ContentContext.Provider value={{ content, save, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be inside ContentProvider')
  return ctx
}
