import { useState } from 'react'
import './NavBar.css'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo" onClick={close}>
          <img src="/indro-logo.png" alt="Indro Labs" className="logo-img-main"/>
          <span className="logo-wordmark">Indro Labs</span>
        </a>

        <nav className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#home-health">Home health</a>
          <a href="#quiz-section">Get matched</a>
        </nav>

        <div className="nav-right">
          <a href="#quiz-section" className="nav-signin">Join Waitlist</a>
          <a href="#quiz-section" className="nav-pill">Take the quiz</a>
        </div>

        <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          <a href="#how-it-works" onClick={close}>How it works</a>
          <a href="#home-health" onClick={close}>Home health</a>
          <a href="#quiz-section" onClick={close}>Get matched</a>
          <a href="#quiz-section" className="nav-mobile-cta" onClick={close}>Take the quiz →</a>
        </nav>
      )}
    </header>
  )
}
