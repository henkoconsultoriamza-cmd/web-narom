import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import {
  AdminCard, AdminCardTitle, AdminField,
  AdminTextarea, ImageUpload, AdminInput, PageHeader, Divider, C,
} from '../AdminUI'

export default function SectionEmpresa({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [about, setAbout] = useState(content.about)

  function setField<K extends keyof typeof about>(key: K, value: typeof about[K]) {
    setAbout(prev => ({ ...prev, [key]: value }))
  }

  function updateStat(i: number, key: 'value' | 'suffix' | 'label', value: string) {
    const stats = about.stats.map((s, idx) =>
      idx === i ? { ...s, [key]: key === 'value' ? Number(value) : value } : s
    )
    setField('stats', stats)
  }

  function updateReason(i: number, key: 'titulo' | 'texto', value: string) {
    const reasons = about.reasons.map((r, idx) =>
      idx === i ? { ...r, [key]: value } : r
    )
    setField('reasons', reasons)
  }

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      save({ about })
        .then(() => onSave('Empresa guardada'))
        .catch(() => onSave('No se pudo guardar. Volvé a intentar.'))
    }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(about)])

  return (
    <div>
      <PageHeader
        title="Empresa"
        desc="Textos de la sección Quiénes somos, estadísticas y argumentos de venta."
      />

      {/* Intro */}
      <AdminCard>
        <AdminCardTitle>Quiénes somos</AdminCardTitle>

        <AdminField label="Párrafo principal">
          <AdminTextarea
            value={about.intro}
            onChange={v => setField('intro', v)}
            rows={3}
          />
        </AdminField>

        <AdminField label="Párrafo secundario">
          <AdminTextarea
            value={about.intro2}
            onChange={v => setField('intro2', v)}
            rows={2}
          />
        </AdminField>

        <AdminField label="Foto del depósito / empresa">
          <ImageUpload
            value={about.depotImage}
            imageKind="company"
            onChange={v => setField('depotImage', v)}
            recommended="800 × 600 px (horizontal)"
            aspect="landscape"
          />
        </AdminField>
      </AdminCard>

      {/* Stats */}
      <AdminCard>
        <AdminCardTitle>Estadísticas animadas</AdminCardTitle>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
          Los 4 números que aparecen con animación de conteo.
        </p>

        {about.stats.map((stat, i) => (
          <div key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 1fr', gap: 12, alignItems: 'end' }}>
              <AdminField label="Número">
                <AdminInput
                  type="number"
                  value={String(stat.value)}
                  onChange={v => updateStat(i, 'value', v)}
                  placeholder="500"
                />
              </AdminField>
              <AdminField label="Sufijo">
                <AdminInput
                  value={stat.suffix}
                  onChange={v => updateStat(i, 'suffix', v)}
                  placeholder="+"
                />
              </AdminField>
              <AdminField label="Descripción">
                <AdminInput
                  value={stat.label}
                  onChange={v => updateStat(i, 'label', v)}
                  placeholder="Ferreterías activas"
                />
              </AdminField>
            </div>
            {i < about.stats.length - 1 && <Divider />}
          </div>
        ))}
      </AdminCard>

      {/* Reasons */}
      <AdminCard>
        <AdminCardTitle>¿Por qué nos eligen?</AdminCardTitle>

        {about.reasons.map((reason, i) => (
          <div key={i}>
            <AdminField label={`Argumento ${i + 1} — Título`}>
              <AdminInput
                value={reason.titulo}
                onChange={v => updateReason(i, 'titulo', v)}
                placeholder="Un solo proveedor"
              />
            </AdminField>
            <AdminField label={`Argumento ${i + 1} — Descripción`}>
              <AdminTextarea
                value={reason.texto}
                onChange={v => updateReason(i, 'texto', v)}
                rows={2}
              />
            </AdminField>
            {i < about.reasons.length - 1 && <Divider />}
          </div>
        ))}
      </AdminCard>

    </div>
  )
}
