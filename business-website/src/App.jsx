import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RadonBusinessPage from './pages/RadonBusinessPage'

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses" element={<RadonBusinessPage />} />
      </Routes>
    </>
  )
}

export default App
