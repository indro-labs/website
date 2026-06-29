import { CalendlyEmbed } from '../components/sections'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <div className="contact-page-wrapper">
        <div className="contact-page-inner">
          <div className="contact-grid">
            {/* LEFT: Text & Meta */}
            <div className="contact-info">
              <p className="contact-overline">BOOK A DEMO</p>
              <h1>Book a demo with us.</h1>
              <p className="contact-sub">
                See how Indro coordinates accessible and on-demand transit in real time. Pick a time below and we'll walk you through it — no pressure, no sales script.
              </p>

              <div className="contact-meta">
                <p className="meta-label">LOCATION</p>
                <p className="meta-value">Based in Alberta, serving Canada</p>

                <p className="meta-label">EMAIL</p>
                <a href="mailto:info@indrolabs.ca" className="meta-link">info@indrolabs.ca</a>

                <p className="meta-label">CONNECT WITH US</p>
                <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noreferrer" className="linkedin-btn">
                  <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                  </svg>
                  Follow us on LinkedIn
                </a>
              </div>
            </div>

            {/* RIGHT: Calendly booking */}
            <div className="contact-card contact-card--cal">
              <CalendlyEmbed />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
