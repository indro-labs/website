import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/categories'
import './Footer.css'

export default function Footer() {
  const services = CATEGORIES.filter(c => c.enabled)
  return (
    <footer className="site-footer">
      <div className="c footer-top">

        {/* Brand column */}
        <div className="footer-col footer-col--brand">
          <Link to="/">
            <img src="/brand/logo.png" alt="Indro Transit" className="footer-logo" />
          </Link>
          <p className="footer-tagline">
            Real-time transit software built for paratransit, senior living, and community transportation in Alberta.
          </p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="mailto:info@indrolabs.ca" className="footer-social-link" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col">
          <p className="footer-col-label">Services</p>
          <nav className="footer-links">
            {services.map(c => (
              <Link key={c.slug} to={`/services/${c.slug}`}>{c.label}</Link>
            ))}
            <Link to="/services">All services</Link>
          </nav>
        </div>

        {/* Company */}
        <div className="footer-col">
          <p className="footer-col-label">Company</p>
          <nav className="footer-links">
            <Link to="/about">About us</Link>
            <Link to="/newsroom">Newsroom</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <p className="footer-col-label">Get in touch</p>
          <div className="footer-contact-items">
            <div className="footer-contact-item">
              <span>Calgary, Alberta</span>
            </div>
            <div className="footer-contact-item">
              <a href="mailto:info@indrolabs.ca">info@indrolabs.ca</a>
            </div>
          </div>
          <Link to="/contact" className="footer-cta">Book a demo</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="c footer-bottom-inner">
          <p className="footer-copy">© 2026 Indro Transit Inc. · 🍁 Calgary, Alberta · All rights reserved.</p>
      
        </div>
      </div>
    </footer>
  )
}
