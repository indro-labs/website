import { useState } from 'react'
import './NavBar.css'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-logo">
          Indro Labs
        </div>

        <div className="navbar-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#technology">Technology</a>
          <a href="#contact">Contact</a>
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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#technology">Technology</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </header>
  )
}

export default NavBar