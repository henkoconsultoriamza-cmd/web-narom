import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContentProvider } from './context/ContentContext.tsx'
import AdminRoute from './admin/AdminRoute.tsx'

const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContentProvider>
      {isAdmin ? <AdminRoute /> : <App />}
    </ContentProvider>
  </StrictMode>,
)
