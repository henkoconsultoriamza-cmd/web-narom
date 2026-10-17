import { Suspense, lazy } from 'react'

const AdminApp = lazy(() => import('./AdminApp'))

export default function AdminRoute() {
  return (
    <Suspense fallback={<p role="status">Cargando panel…</p>}>
      <AdminApp />
    </Suspense>
  )
}
