import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import {
  AdminCard, AdminCardTitle, AdminField, AdminInput,
  AdminTextarea, PageHeader, Divider,
} from '../AdminUI'
import type { Brand } from '../../data/brands'

export default function SectionMarcas({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [brands, setBrands] = useState<Brand[]>(content.brands)

  function update(index: number, key: keyof Brand, value: string) {
    setBrands(prev => prev.map((b, i) => i === index ? { ...b, [key]: value } : b))
  }

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { save({ brands }); onSave('Marcas guardadas') }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(brands)])

  return (
    <div>
      <PageHeader
        title="Marcas"
        desc="Editá el texto descriptivo y el link al catálogo de cada marca."
      />

      {brands.map((brand, i) => (
        <AdminCard key={brand.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: brand.brandAccent, flexShrink: 0,
            }} />
            <AdminCardTitle>{brand.name}</AdminCardTitle>
          </div>

          <AdminField label="Tagline" hint="Frase corta que aparece en mayúsculas sobre la imagen de la marca">
            <AdminInput
              value={brand.tagline}
              onChange={v => update(i, 'tagline', v)}
              placeholder="Herramientas para profesionales"
            />
          </AdminField>

          <AdminField label="Descripción" hint="2 a 3 oraciones. Aparece debajo del tagline.">
            <AdminTextarea
              value={brand.description}
              onChange={v => update(i, 'description', v)}
              rows={3}
            />
          </AdminField>

          <AdminField label="URL del catálogo" hint="Link al PDF del catálogo. Podés usar Google Drive, Dropbox o similar con acceso público.">
            <AdminInput
              type="url"
              value={brand.catalogUrl}
              onChange={v => update(i, 'catalogUrl', v)}
              placeholder="https://drive.google.com/file/d/..."
            />
          </AdminField>

          {i < brands.length - 1 && <Divider />}
        </AdminCard>
      ))}

    </div>
  )
}
