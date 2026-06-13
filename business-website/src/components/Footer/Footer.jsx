import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="c footer-inner">
        <Link to="/" className="footer-brand">
          <img src="/brand/logo.png" alt="Indro Transit" className="footer-logo" />
        </Link>
        <nav className="footer-nav">
          <a href="/#services">Services</a>
          <a href="/#operators">Who We Serve</a>
          <a href="/#waitlist">Get started</a>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-right">
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="mailto:info@indrolabs.ca" className="footer-social-link" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            </a>
          </div>
          <p className="footer-copy">© 2026 Indro Transit · Calgary, Alberta</p>
        </div>
      </div>
    </footer>
  )
}
