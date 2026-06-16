import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<App />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
