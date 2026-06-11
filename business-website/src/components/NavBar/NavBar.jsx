import { useState } from 'react'
import './NavBar.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#top" className="navbar-logo" onClick={close}>
          <img src="/Indro Transit.png" alt="Indro Transit" className="logo-img"/>
        </a>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#where">Where we operate</a>
          <a href="#how">How it works</a>
          <a href="#operators">For cities &amp; operators</a>
        </nav>
        <div className="nav-right">
          <a href="#waitlist" className="nav-wait">Join waitlist</a>
          <a href="#partner" className="nav-partner">Partner with us</a>
        </div>
        <button className="nav-hamburger" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <nav className="nav-mobile">
          <a href="#services" onClick={close}>Services</a>
          <a href="#where" onClick={close}>Where we operate</a>
          <a href="#how" onClick={close}>How it works</a>
          <a href="#operators" onClick={close}>For cities &amp; operators</a>
          <a href="#waitlist" className="nav-mobile-cta" onClick={close}>Join waitlist →</a>
        </nav>
      )}
    </header>
  )
}
