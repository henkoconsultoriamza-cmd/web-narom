import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import { AdminCard, AdminField, AdminInput, PageHeader } from '../AdminUI'

export default function SectionContacto({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [form, setForm] = useState(content.contact)

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      save({ contact: form })
        .then(() => onSave('Contacto guardado'))
        .catch(() => onSave('No se pudo guardar. Volv? a intentar.'))
    }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(form)])

  function set(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      <PageHeader
        title="Contacto"
        desc="Estos datos aparecen en toda la web: botón de WhatsApp, formulario de contacto y footer."
      />

      <AdminCard>
        <AdminField label="Número de WhatsApp" hint="Con código de país, sin espacios ni +. Ej: 5492615001234">
          <AdminInput
            type="tel"
            value={form.whatsapp}
            onChange={v => set('whatsapp', v)}
            placeholder="5492615000000"
          />
          <a
            href={`https://wa.me/${form.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#25D366', fontWeight: 600, marginTop: 6, display: 'inline-block' }}
          >
            ↗ Probar este número
          </a>
        </AdminField>

        <AdminField label="Email comercial">
          <AdminInput
            type="email"
            value={form.email}
            onChange={v => set('email', v)}
            placeholder="ventas@naromgroup.com"
          />
        </AdminField>

        <AdminField label="Dirección física" hint="Opcional. Se muestra si se activa una sección de ubicación.">
          <AdminInput
            type="text"
            value={form.address}
            onChange={v => set('address', v)}
            placeholder="Av. San Martín 1234, Mendoza"
          />
        </AdminField>

        <AdminField label="Horario de atención" hint="Opcional.">
          <AdminInput
            type="text"
            value={form.hours}
            onChange={v => set('hours', v)}
            placeholder="Lun a Vie 8:00 a 17:00 hs"
          />
        </AdminField>

      </AdminCard>
    </div>
  )
}
