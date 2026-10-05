import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ServiceCategory from './pages/ServiceCategory.jsx'
import About from './pages/About.jsx'
import Newsroom from './pages/Newsroom.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/services"       element={<Navigate to="/" replace />} />
          <Route path="/services/:slug" element={<ServiceCategory />} />
          <Route path="/about"          element={<About />} />
          <Route path="/newsroom"       element={<Newsroom />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/privacy"                        element={<Legal doc="privacy" />} />
          <Route path="/fr/privacy"                     element={<Legal doc="privacyFr" />} />
          <Route path="/terms"                          element={<Legal doc="terms" />} />
          <Route path="/fr/terms"                       element={<Legal doc="termsFr" />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
