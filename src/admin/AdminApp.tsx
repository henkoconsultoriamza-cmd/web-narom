import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminShell from './AdminShell'

const AUTH_KEY = 'narom_admin_session'

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'ok')

  function handleLogin() {
    sessionStorage.setItem(AUTH_KEY, 'ok')
    setAuthed(true)
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onLogin={handleLogin} />
  return <AdminShell onLogout={handleLogout} />
}
