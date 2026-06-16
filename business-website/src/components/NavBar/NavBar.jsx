import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On about page, home links go to /#section
const href = (hash) => `/${hash}`

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/brand/logo.png" alt="Indro Transit" className="logo-img"/>
        </Link>
        <nav className="nav-links">
          <a href={href('#services')}>Services</a>
          <a href={href('#operators')}>Who we help</a>
          <a href={href('#waitlist')}>Get started</a>
        </nav>
        <div className="nav-right">
          <Link className="nav-partner" to="/contact">Contact us</Link>
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <nav className="nav-mobile">
          <a href={href('#services')} onClick={close}>Services</a>
          <a href={href('#operators')} onClick={close}>Who we help</a>
          <a href={href('#waitlist')} onClick={close}>Get started</a>
             <Link className="nav-mobile-cta" onClick={close} to="/contact">Contact us</Link>
        </nav>
      )}
    </header>
  )
}
