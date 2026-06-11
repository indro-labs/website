import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On about page, home links go to /#section
  const href = (hash) => isHome ? hash : `/${hash}`

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          <img src="/orange-transparent.png" alt="Indro Transit" className="logo-img"/>
        </Link>
        <nav className="nav-links">
          <a href={href('#services')}>Services</a>
          <a href={href('#where')}>Coverage</a>
          <a href={href('#operators')}>Operators</a>
          <Link to="/about" onClick={close}>About</Link>
        </nav>
        <div className="nav-right">
          <a href={href('#waitlist')} className="nav-wait">Join waitlist</a>
          <a href={href('#partner')} className="nav-partner">Partner</a>
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <nav className="nav-mobile">
          <a href={href('#services')} onClick={close}>Services</a>
          <a href={href('#where')} onClick={close}>Coverage</a>
          <a href={href('#operators')} onClick={close}>Operators</a>
          <Link to="/about" onClick={close}>About</Link>
          <a href={href('#waitlist')} className="nav-mobile-cta" onClick={close}>Join waitlist →</a>
        </nav>
      )}
    </header>
  )
}
