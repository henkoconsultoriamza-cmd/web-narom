export interface Promo {
  id: number
  title: string
  subtitle: string
  brand: string
  badge: string
  image: string
  imageMobile?: string
  cta: string
  active: boolean
}

export const promos: Promo[] = [
  {
    id: 1,
    title: 'Amoladora INGCO 750W',
    subtitle: 'Stock limitado · Consultá disponibilidad',
    brand: 'INGCO',
    badge: 'OFERTA',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1400&q=85',
    cta: 'Lo quiero',
    active: true,
  },
  {
    id: 2,
    title: 'Juego de llaves MOTA 12 piezas',
    subtitle: 'Precio especial para ferreterías',
    brand: 'MOTA',
    badge: 'DESTACADO',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=85',
    cta: 'Lo quiero',
    active: true,
  },
  {
    id: 3,
    title: 'Línea de caños SANIPLAST PP-R',
    subtitle: 'Combo de temporada con conexiones incluidas',
    brand: 'SANIPLAST',
    badge: 'COMBO',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85',
    cta: 'Lo quiero',
    active: true,
  },
  {
    id: 4,
    title: 'Látex interior TODO PINTURAS 4L',
    subtitle: 'Precio mayorista por volumen disponible',
    brand: 'TODO PINTURAS',
    badge: 'VOLUMEN',
    image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1400&q=85',
    cta: 'Lo quiero',
    active: true,
  },
]
