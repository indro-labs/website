import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import './NavBar.css'

const SERVICES = [
  ...CATEGORIES.filter(c => c.enabled).map(c => ({ to: `/services/${c.slug}`, title: c.label, desc: c.tags.slice(0, 2).join(' · ') })),
  { to: '/services', title: 'All services', desc: 'See everything Indro offers' },
]

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="nav-dd" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="nav-dd-btn" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {label} <ChevronDown size={15} className="nav-dd-chev" />
      </button>
      {open && (
        <div className="nav-dd-panel">
          {items.map(it => (
            <Link key={it.to} to={it.to} className="nav-dd-item" onClick={() => setOpen(false)}>
              <span className="nav-dd-title">{it.title}</span>
              <span className="nav-dd-desc">{it.desc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={close}>
          <img src="/brand/logo.png" alt="Indro Transit" className="logo-img" />
        </Link>

        <nav className="nav-links">
          <NavDropdown label="Services" items={SERVICES} />
          <Link to="/about" className="nav-link">About us</Link>
        </nav>

        <div className="nav-right">
          <Link className="nav-partner" to="/contact">Contact us</Link>
        </div>

        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          <p className="nav-mobile-label">Services</p>
          {SERVICES.map(it => <Link key={it.to} to={it.to} onClick={close}>{it.title}</Link>)}
          <p className="nav-mobile-label">Company</p>
          <Link to="/about" onClick={close}>About us</Link>
          <Link className="nav-mobile-cta" to="/contact" onClick={close}>Contact us</Link>
        </nav>
      )}
    </header>
  )
}
