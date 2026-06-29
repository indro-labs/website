import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'
import { Popup } from './sections'
import '../App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Popup />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}
