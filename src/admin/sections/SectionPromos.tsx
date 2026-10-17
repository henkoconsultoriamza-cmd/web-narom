import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import {
  AdminCard, AdminCardTitle, AdminField, AdminInput,
  ImageUpload, DeleteButton, AddButton, PageHeader,
} from '../AdminUI'
import type { Promo } from '../../data/promos'

function newPromo(id: number): Promo {
  return { id, title: '', subtitle: '', brand: 'INGCO', badge: 'OFERTA', image: '', cta: 'Lo quiero', active: true }
}

export default function SectionPromos({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [promos, setPromos] = useState<Promo[]>(content.promos)

  function update(index: number, key: keyof Promo, value: string | boolean) {
    setPromos(prev => prev.map((p, i) => i === index ? { ...p, [key]: value } : p))
  }

  function remove(index: number) {
    setPromos(prev => prev.filter((_, i) => i !== index))
  }

  function add() {
    const maxId = promos.reduce((m, p) => Math.max(m, p.id), 0)
    setPromos(prev => [...prev, newPromo(maxId + 1)])
  }

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      save({ promos })
        .then(() => onSave('Promociones guardadas'))
        .catch(() => onSave('No se pudo guardar. Volv? a intentar.'))
    }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(promos)])

  return (
    <div>
      <PageHeader
        title="Promociones"
        desc="Las promociones aparecen en el banner corredizo. Podés agregar, editar o eliminar."
      />

      {promos.map((promo, i) => (
        <AdminCard key={promo.id}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AdminCardTitle>Promoción {i + 1}</AdminCardTitle>
              <button
                onClick={() => update(i, 'active', !promo.active)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  background: promo.active ? '#16a34a22' : '#dc262622',
                  color: promo.active ? '#4ade80' : '#f87171',
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: promo.active ? '#4ade80' : '#f87171',
                  display: 'inline-block',
                }} />
                {promo.active ? 'Activa' : 'Inactiva'}
              </button>
            </div>
            <DeleteButton onClick={() => remove(i)} />
          </div>

          <AdminField label="Imagen desktop" hint="1200 × 600 px, panorámica horizontal">
            <ImageUpload
              value={promo.image}
              imageKind="banner"
              onChange={v => update(i, 'image', v)}
              recommended="1200 × 600 px"
              aspect="landscape"
            />
          </AdminField>

          <AdminField label="Imagen mobile (opcional)" hint="800 × 900 px, más cuadrada. Si no subís, usa la de desktop">
            <ImageUpload
              value={promo.imageMobile ?? ''}
              imageKind="bannerMobile"
              onChange={v => update(i, 'imageMobile', v)}
              recommended="800 × 900 px"
              aspect="portrait"
            />
          </AdminField>

          <AdminField label="Texto del botón">
            <AdminInput
              value={promo.cta}
              onChange={v => update(i, 'cta', v)}
              placeholder="Lo quiero"
            />
          </AdminField>
        </AdminCard>
      ))}

      <AddButton onClick={add} label="Agregar promoción" />

    </div>
  )
}
