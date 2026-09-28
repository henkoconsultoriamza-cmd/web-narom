export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  category: string;
  url?: string;
}

export const top10: Product[] = [
  { id: 1, name: 'Amoladora 4½" 750W', brand: 'INGCO', category: 'Eléctrica', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80' },
  { id: 2, name: 'Taladro percutor 13mm', brand: 'INGCO', category: 'Eléctrica', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80' },
  { id: 3, name: 'Juego llaves combinadas 12 pzs', brand: 'MOTA', category: 'Manual', image: 'https://images.unsplash.com/photo-1590417975126-9e07d4702eb7?w=400&q=80' },
  { id: 4, name: 'Pinza multigrip 10"', brand: 'MOTA', category: 'Manual', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80' },
  { id: 5, name: 'Sellador acrílico blanco 280ml', brand: 'SANIPLAST', category: 'Selladores', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80' },
  { id: 6, name: 'Impermeabilizante fibrado 4L', brand: 'SANIPLAST', category: 'Impermeabilizante', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80' },
  { id: 7, name: 'Pintura látex interior 4L', brand: 'TODO PINTURAS', category: 'Pintura', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&q=80' },
  { id: 8, name: 'Esmalte sintético brillante 1L', brand: 'TODO PINTURAS', category: 'Esmalte', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80' },
  { id: 9, name: 'Cortadora de disco 7¼"', brand: 'INGCO', category: 'Eléctrica', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80' },
  { id: 10, name: 'Destornillador set 6 pzs', brand: 'MOTA', category: 'Manual', image: 'https://images.unsplash.com/photo-1609205807107-2f8c5b9dc8c0?w=400&q=80' },
];
