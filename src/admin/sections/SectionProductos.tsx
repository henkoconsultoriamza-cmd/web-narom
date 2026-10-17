import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import {
  AdminCard, AdminCardTitle, AdminField, AdminInput,
  AdminSelect, ImageUpload, PageHeader, C,
} from '../AdminUI'
import type { Product } from '../../data/products'

const BRAND_OPTIONS = [
  { value: 'INGCO', label: 'INGCO' },
  { value: 'MOTA', label: 'MOTA' },
  { value: 'SANIPLAST', label: 'SANIPLAST' },
  { value: 'GAMA PINTURERIAS', label: 'GAMA PINTURERIAS' },
  { value: 'SIKA CONSTRUCCION', label: 'SIKA CONSTRUCCION' },
  { value: 'SINTEPLAST CONSTRUCCION', label: 'SINTEPLAST CONSTRUCCION' },
  { value: 'NAROM CHEMICAL Co.', label: 'NAROM CHEMICAL Co.' },
  { value: 'TELPLAST SRL', label: 'TELPLAST SRL' },
  { value: 'GAMA DILUYENTES', label: 'GAMA DILUYENTES' },
  { value: 'GAMA PINTURERIAS', label: 'GAMA PINTURERIAS' },
]

export default function SectionProductos({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [products, setProducts] = useState<Product[]>(content.products)

  function update(index: number, key: keyof Product, value: string) {
    setProducts(prev => prev.map((p, i) =>
      i === index ? { ...p, [key]: key === 'id' ? Number(value) : value } : p
    ))
  }

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      save({ products })
        .then(() => onSave('Productos guardados'))
        .catch(() => onSave('No se pudo guardar. Volvé a intentar.'))
    }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(products)])

  return (
    <div>
      <PageHeader
        title="Top 10 productos"
        desc="Los 10 productos que más se venden. Aparecen en el carousel horizontal."
      />

      {products.map((product, i) => (
        <AdminCard key={product.id}>
          <AdminCardTitle>
            <span style={{ color: C.amber, marginRight: 8 }}>#{String(i + 1).padStart(2, '0')}</span>
            {product.name || 'Producto sin nombre'}
          </AdminCardTitle>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>
            <AdminField label="Nombre del producto">
              <AdminInput
                value={product.name}
                onChange={v => update(i, 'name', v)}
                placeholder="Nombre del producto"
              />
            </AdminField>
            <AdminField label="Marca">
              <AdminSelect
                value={product.brand}
                onChange={v => update(i, 'brand', v)}
                options={BRAND_OPTIONS}
              />
            </AdminField>
            <AdminField label="Categoría">
              <AdminInput
                value={product.category}
                onChange={v => update(i, 'category', v)}
                placeholder="Eléctrica"
              />
            </AdminField>
          </div>

          <AdminField label="Enlace del producto" hint="Al hacer clic en la tarjeta se abre este link. Ej: página del catálogo en ese producto.">
            <AdminInput
              type="url"
              value={product.url ?? ''}
              onChange={v => update(i, 'url', v)}
              placeholder="https://catalogo.naromgroup.com/producto/..."
            />
          </AdminField>

          <AdminField label="Imagen del producto">
            <ImageUpload
              value={product.image}
              imageKind="product"
              onChange={v => update(i, 'image', v)}
              recommended="400 × 400 px (cuadrada)"
              aspect="square"
            />
          </AdminField>
        </AdminCard>
      ))}

    </div>
  )
}

