import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/WhiteName.png" alt="Indro Labs" className="logo-img" />
        </Link>

        {/* Desktop nav links */}
        <div className="navbar-links">

          {/* Product */}
          <div className="nav-item">
            <span className="nav-link">Product</span>
            <div className="nav-dropdown">
              <Link to="/" className="dropdown-row">
                <div className="dropdown-row-title">Indro Smart</div>
                <div className="dropdown-row-desc">Smart radon for everyone</div>
              </Link>
              <a href="#" className="dropdown-row">
                <div className="dropdown-row-title">
                  Indro Reception
                  <span className="coming-badge">Coming soon</span>
                </div>
                <div className="dropdown-row-desc">Next-generation radon detection</div>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="nav-item">
            <span className="nav-link">Solutions</span>
            <div className="nav-dropdown">
              <Link to="/homeowners" className="dropdown-row">
                <div className="dropdown-row-title">For homeowners</div>
                <div className="dropdown-row-desc">Radon safety for your home</div>
              </Link>
              <Link to="/businesses" className="dropdown-row">
                <div className="dropdown-row-title">For radon businesses</div>
                <div className="dropdown-row-desc">Transform your radon business with smart systems</div>
              </Link>
            </div>
          </div>

          <Link to="/about" className="nav-link standalone">About</Link>
          <Link to="/contact-us" className="nav-link standalone">Contact us</Link>
        </div>

        {/* CTA button */}
        <div className="navbar-actions">
          <Link to="/contact" className="btn-bookdemo">Join waitlist</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <div className="mobile-group-label">Product</div>
          <Link to="/" onClick={() => setMenuOpen(false)}>Indro Smart</Link>
          <a href="#" onClick={() => setMenuOpen(false)} className="mobile-link-row">
            Indro Reception
            <span className="mobile-coming-badge">Coming soon</span>
          </a>
          <div className="mobile-group-label">Solutions</div>
          <Link to="/homeowners" onClick={() => setMenuOpen(false)}>For homeowners</Link>
          <Link to="/businesses" onClick={() => setMenuOpen(false)}>For radon businesses</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact us</Link>
          <div className="mobile-ctas">
            <Link to="/contact" className="btn-bookdemo" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>Join waitlist</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
