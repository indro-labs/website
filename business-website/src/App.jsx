import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import RadonBusinessPage from './pages/Solutions/RadonBusinessPage'
import HomeownersPage from './pages/Solutions/HomeownersPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

const PAGE_BASES = new Set(['businesses', 'homeowners', 'about', 'contact-us'])

/**
 * Scroll to top only when the *base* page changes.
 * Navigating /homeowners → /homeowners/ho-waitlist does NOT scroll to top.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  const prevBase = useRef(null)

  const getBase = (path) => {
    const first = path.split('/').filter(Boolean)[0]
    return PAGE_BASES.has(first) ? `/${first}` : '/'
  }

  useEffect(() => {
    const base = getBase(pathname)
    if (prevBase.current !== base) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      prevBase.current = base
    }
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Home — root + section anchors like /contact-section */}
        <Route path="/"          element={<HomePage />} />
        <Route path="/:section"  element={<HomePage />} />

        {/* Businesses */}
        <Route path="/businesses"           element={<RadonBusinessPage />} />
        <Route path="/businesses/:section"  element={<RadonBusinessPage />} />

        {/* Homeowners */}
        <Route path="/homeowners"           element={<HomeownersPage />} />
        <Route path="/homeowners/:section"  element={<HomeownersPage />} />

        {/* About */}
        <Route path="/about"           element={<AboutPage />} />
        <Route path="/about/:section"  element={<AboutPage />} />

        {/* Contact */}
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
