import { useState, useEffect, useRef } from 'react'
import { useContent } from '../../context/ContentContext'
import type { TeamMember } from '../../context/ContentContext'
import {
  AdminCard, AdminCardTitle, AdminField, AdminInput,
  AdminTextarea, ImageUpload, DeleteButton, AddButton, PageHeader,
} from '../AdminUI'

function newMember(): TeamMember {
  return { nombre: '', rol: '', descripcion: '', foto: '' }
}

export default function SectionEquipo({ onSave }: { onSave: (msg: string) => void }) {
  const { content, save } = useContent()
  const [team, setTeam] = useState<TeamMember[]>(content.team)

  function update(index: number, key: keyof TeamMember, value: string) {
    setTeam(prev => prev.map((m, i) => i === index ? { ...m, [key]: value } : m))
  }

  function remove(index: number) {
    setTeam(prev => prev.filter((_, i) => i !== index))
  }

  function add() {
    setTeam(prev => [...prev, newMember()])
  }

  const mounted = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { save({ team }); onSave('Equipo guardado') }, 1500)
    return () => clearTimeout(timer.current)
  }, [JSON.stringify(team)])

  return (
    <div>
      <PageHeader
        title="Equipo"
        desc="Las personas que aparecen en la sección de equipo. Las fotos se muestran en círculo."
      />

      {team.map((member, i) => (
        <AdminCard key={i}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <AdminCardTitle>Persona {i + 1}</AdminCardTitle>
            <DeleteButton onClick={() => remove(i)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <AdminField label="Nombre completo">
              <AdminInput
                value={member.nombre}
                onChange={v => update(i, 'nombre', v)}
                placeholder="Juan García"
              />
            </AdminField>
            <AdminField label="Cargo / Función">
              <AdminInput
                value={member.rol}
                onChange={v => update(i, 'rol', v)}
                placeholder="Gerente Comercial"
              />
            </AdminField>
          </div>

          <AdminField label="Descripción breve">
            <AdminTextarea
              value={member.descripcion}
              onChange={v => update(i, 'descripcion', v)}
              rows={2}
              placeholder="Una oración describiendo su rol en la empresa."
            />
          </AdminField>

          <AdminField label="Foto de perfil" hint="Se muestra recortada en círculo. Fondo neutro preferentemente.">
            <ImageUpload
              value={member.foto}
              onChange={v => update(i, 'foto', v)}
              recommended="400 × 400 px (cuadrada, cara centrada)"
              aspect="square"
            />
          </AdminField>
        </AdminCard>
      ))}

      <AddButton onClick={add} label="Agregar persona al equipo" />

    </div>
  )
}
