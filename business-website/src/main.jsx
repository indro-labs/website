import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ServicesOverview from './pages/ServicesOverview.jsx'
import ServiceCategory from './pages/ServiceCategory.jsx'
import About from './pages/About.jsx'
import Newsroom from './pages/Newsroom.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/services"       element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServiceCategory />} />
          <Route path="/about"          element={<About />} />
          <Route path="/newsroom"       element={<Newsroom />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="*"               element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
