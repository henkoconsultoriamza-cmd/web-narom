import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import { supabase } from '../lib/supabase'

// ─── Shared design tokens ────────────────────────────────────────────────────
export const C = {
  blue: '#02152C',
  amber: '#F4AA24',
  gray: '#f1f5f9',
  border: '#e2e8f0',
  text: '#1e293b',
  muted: '#64748b',
}

const inputBase: CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 8,
  border: `1.5px solid ${C.border}`,
  fontSize: 14,
  fontFamily: 'Montserrat, sans-serif',
  color: C.text,
  background: '#fafafa',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

// ─── Components ──────────────────────────────────────────────────────────────

export function PageHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: C.blue, margin: 0, lineHeight: 1.2 }}>{title}</h1>
      <p style={{ fontSize: 14, color: C.muted, marginTop: 6 }}>{desc}</p>
    </div>
  )
}

export function AdminCard({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: '28px 32px',
      boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
      border: `1px solid ${C.border}`,
      marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

export function AdminCardTitle({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: 11,
      fontWeight: 800,
      color: C.blue,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: 20,
      paddingBottom: 12,
      borderBottom: `1.5px solid ${C.border}`,
    }}>
      {children}
    </p>
  )
}

export function AdminField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block',
        fontSize: 12,
        fontWeight: 700,
        color: C.blue,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: hint ? 3 : 7,
      }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: 12, color: C.muted, marginBottom: 7 }}>{hint}</p>}
      {children}
    </div>
  )
}

export function AdminInput({
  type = 'text', value, onChange, placeholder,
}: {
  type?: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputBase}
      onFocus={e => { e.currentTarget.style.borderColor = C.amber }}
      onBlur={e => { e.currentTarget.style.borderColor = C.border }}
    />
  )
}

export function AdminTextarea({
  value, onChange, placeholder, rows = 3,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
      onFocus={e => { e.currentTarget.style.borderColor = C.amber }}
      onBlur={e => { e.currentTarget.style.borderColor = C.border }}
    />
  )
}

export function AdminSelect({
  value, onChange, options,
}: {
  value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }>
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, cursor: 'pointer' }}
      onFocus={e => { e.currentTarget.style.borderColor = C.amber }}
      onBlur={e => { e.currentTarget.style.borderColor = C.border }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export function ImagePreview({ src }: { src: string }) {
  if (!src) return null
  return (
    <div style={{ marginTop: 8 }}>
      <img
        src={src}
        alt="Preview"
        style={{ height: 80, borderRadius: 6, objectFit: 'cover', border: `1px solid ${C.border}` }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

export function ImageUpload({
  value,
  onChange,
  recommended,
  aspect = 'landscape',
}: {
  value: string
  onChange: (v: string) => void
  recommended: string
  aspect?: 'landscape' | 'square' | 'portrait'
}) {
  const [uploading, setUploading] = useState(false)

  const previewStyles: Record<string, CSSProperties> = {
    landscape: { width: '100%', maxWidth: 320, height: 140 },
    square:    { width: 120, height: 120 },
    portrait:  { width: 90,  height: 120 },
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 8 * 1024 * 1024) {
      alert('La imagen supera los 8 MB. Reducí el tamaño antes de subir.')
      return
    }
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('narom-images').upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from('narom-images').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err) {
      alert('Error al subir la imagen. Intentá de nuevo.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {/* Tamaño recomendado */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(244,170,36,0.08)', border: `1px solid rgba(244,170,36,0.3)`,
        borderRadius: 6, padding: '5px 10px', marginBottom: 10,
      }}>
        <svg width="13" height="13" fill="none" stroke="#F4AA24" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#c07a00' }}>
          Tamaño recomendado: <strong>{recommended}</strong>
        </span>
      </div>

      {/* Upload area */}
      <label style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: '20px 16px', borderRadius: 10,
        border: `2px dashed ${C.border}`, background: '#fafafa',
        cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
        textAlign: 'center',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = C.amber
          e.currentTarget.style.background = 'rgba(244,170,36,0.04)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = C.border
          e.currentTarget.style.background = '#fafafa'
        }}
      >
        {uploading ? (
          <span style={{ fontSize: 13, color: C.amber, fontWeight: 600 }}>Subiendo imagen…</span>
        ) : (
          <>
            <svg width="28" height="28" fill="none" stroke={C.muted} strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>Hacé clic para subir una imagen</span>
            <span style={{ fontSize: 11, color: '#aaa' }}>JPG, PNG o WEBP · Máximo 8 MB</span>
          </>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          style={{ display: 'none' }}
        />
      </label>

      {/* Preview */}
      {value && (
        <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
          <img
            src={value}
            alt="Preview"
            style={{
              ...previewStyles[aspect],
              objectFit: 'cover',
              borderRadius: aspect === 'square' ? '50%' : 8,
              border: `2px solid ${C.border}`,
              display: 'block',
            }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <button
            onClick={() => onChange('')}
            title="Quitar imagen"
            style={{
              position: 'absolute', top: -8, right: -8,
              width: 22, height: 22, borderRadius: '50%',
              background: '#ef4444', border: 'none', color: '#fff',
              fontSize: 13, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}

export function SaveButton({ onClick, label = 'Guardar cambios' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 8,
        padding: '13px 28px',
        background: C.amber,
        border: 'none',
        borderRadius: 8,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 900,
        fontSize: 14,
        color: C.blue,
        cursor: 'pointer',
        transition: 'background 0.2s, transform 0.1s',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#e09c1a' }}
      onMouseLeave={e => { e.currentTarget.style.background = C.amber }}
    >
      💾 {label}
    </button>
  )
}

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="Eliminar"
      style={{
        padding: '6px 10px',
        background: '#fff',
        border: '1px solid #fca5a5',
        borderRadius: 6,
        color: '#ef4444',
        cursor: 'pointer',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 13,
        fontWeight: 600,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2' }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
    >
      🗑 Eliminar
    </button>
  )
}

export function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: 'rgba(2,21,44,0.06)',
        border: `1.5px dashed ${C.blue}`,
        borderRadius: 8,
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
        fontSize: 13,
        color: C.blue,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        marginTop: 12,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(2,21,44,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(2,21,44,0.06)' }}
    >
      + {label}
    </button>
  )
}

export function Divider() {
  return <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '20px 0' }} />
}
