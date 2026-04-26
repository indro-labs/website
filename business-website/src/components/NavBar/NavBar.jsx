import { useState } from 'react'
import './NavBar.css'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <a href="#center" className="navbar-logo">
          Indro Labs
        </a>

        <div className="navbar-links">
          <a href="#about-section">About</a>
          <a href="#mission-section">Mission</a>
          <a href="#solutions-section">Solutions</a>
          <a href="#contact-section">Contact</a>
        </div>

        <button
          className="navbar-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          <a href="#about-section">About</a>
          <a href="#mission-section">Mission</a>
          <a href="#solutions-section">Solutions</a>
          <a href="#contact-section">Contact</a>
        </div>
      )}
    </header>
  )
}

export default NavBar