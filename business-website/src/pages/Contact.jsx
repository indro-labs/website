import { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import './Contact.css'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr(false)
    setLoading(true)

    const endpoint = import.meta.env.VITE_FORMSPREE_GENERAL_URL
    if (!endpoint) {
      console.error('Missing Formspree general endpoint')
      setErr(true)
      setLoading(false)
      return
    }

    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ name, email, subject, message }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (r.ok) {
        setDone(true)
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setErr(true)
      }
    } catch {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <NavBar />
      <div className="contact-page-wrapper">
        <div className="contact-page-inner">
          <div className="contact-grid">
            {/* LEFT: Text & Meta */}
            <div className="contact-info">
              <p className="contact-overline">CONTACT US</p>
              <h1>Let's talk.</h1>
              <p className="contact-sub">
                Whether you’re a senior living facility, paratransit provider, caregiving organization, or community transit operator — we’d love to hear from you.
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

          <div className="contact-card">
            <h2>Send us a message</h2>
              <p className="card-sub">We typically respond within one business day.</p>
              {done ? (
                <div className="form-ok">
            
                  <p>Thanks for reaching out. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="contact-form">
                  <label htmlFor="name">Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                  
                  <label htmlFor="email">Email *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  
                  <label htmlFor="subject">Subject</label>
                  <input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                  
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows="6" required />
                  
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                  
                  {err && <p className="ferr">Something went wrong — please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="c footer-inner">
          <a href="#top" className="footer-brand">
            <img src="/brand/logo.png" alt="Indro Transit" className="footer-logo" />
          </a>
          <nav className="footer-nav">
            <a href="/#services">Services</a>
            <a href="/#where">Regions</a>
            <a href="/#operators">Organizations</a>
            <a href="/about">About</a>
          </nav>
          <div className="footer-right">
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>
              <a href="mailto:info@indrolabs.ca" className="footer-social-link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></a>
            </div>
            <p className="footer-copy">© 2026 Indro Transit · Calgary, Alberta</p>
          </div>
        </div>
      </footer>
    </>
  )
}