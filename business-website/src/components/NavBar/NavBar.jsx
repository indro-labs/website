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
                <div className="dropdown-row-title">For Homeowners</div>
                <div className="dropdown-row-desc">Radon safety for your home</div>
              </Link>
              <Link to="/businesses" className="dropdown-row">
                <div className="dropdown-row-title">For Radon Businesses</div>
                <div className="dropdown-row-desc">Transform your radon business with smart systems</div>
              </Link>
            </div>
          </div>

          <a href="/#about-section" className="nav-link standalone">About</a>
          <a href="/#contact-section" className="nav-link standalone">Contact us</a>
        </div>

        {/* CTA buttons */}
        <div className="navbar-actions">
          <button className="btn-signin">Sign in</button>
          <button className="btn-bookdemo">Book demo</button>
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
          <a href="#" onClick={() => setMenuOpen(false)}>Indro Reception</a>
          <div className="mobile-group-label">Solutions</div>
          <Link to="/homeowners" onClick={() => setMenuOpen(false)}>For Homeowners</Link>
          <Link to="/businesses" onClick={() => setMenuOpen(false)}>For Radon Businesses</Link>
          <a href="/#about-section" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#contact-section" onClick={() => setMenuOpen(false)}>Contact us</a>
          <div className="mobile-ctas">
            <button className="btn-signin">Sign in</button>
            <button className="btn-bookdemo">Book demo</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
