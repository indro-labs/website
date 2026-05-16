import { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import '../../App.css'
import './ContactPage.css'

function ContactPage() {
  const [formStatus, setFormStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_GENERAL_URL, {
      method: 'POST', body: formData, headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      setFormStatus({ type: 'success', message: "Thank you! We'll be in touch soon." })
      form.reset()
    } else {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <>
      {formStatus && (
        <div className={`toast ${formStatus.type}`}>
          <p>{formStatus.message}</p>
          <button onClick={() => setFormStatus(null)}>×</button>
        </div>
      )}

      <NavBar />

      <section id="ct-main">
        <div className="ct-container">

          {/* Left — info */}
          <div className="ct-left">
            <p className="ct-eyebrow">CONTACT US</p>
            <h1 className="ct-headline">Let's talk.</h1>
            <p className="ct-body">
              Whether you're a homeowner looking to protect your family or a radon professional ready to modernize your business — we'd love to hear from you.
            </p>

            <div className="ct-info-group">
              <h4 className="ct-info-label">Location</h4>
              <p className="ct-info-text">Based in Alberta, serving Canada</p>
            </div>

            <div className="ct-info-group">
              <h4 className="ct-info-label">Email</h4>
              <a href="mailto:info@indrolabs.ca" className="ct-info-link">info@indrolabs.ca</a>
            </div>

            <div className="ct-info-group">
              <h4 className="ct-info-label">Connect with us</h4>
              <a
                href="https://www.linkedin.com/company/indro-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Follow us on LinkedIn
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="ct-right">
            <form className="contact-card ct-form" onSubmit={handleSubmit}>
              <h3>Send us a message</h3>
              <p>We typically respond within one business day.</p>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Subject</label><input name="subject" type="text" /></div>
              <div className="form-group"><label>Message *</label><textarea name="message" required style={{ minHeight: '140px' }}></textarea></div>
              <button className="submit-button waitlist-submit-button" type="submit">Send message</button>
            </form>
          </div>

        </div>
      </section>

      <footer id="footer">
        <div className="footer-container">
          <div className="footer-column"><h4>Indro Labs</h4><p>Continuous radon protection monitoring</p></div>
          <div className="footer-column"><h4>Contact</h4><p>info@indrolabs.ca</p></div>
          <div className="footer-column"><h4>Location</h4><p>Alberta, Canada</p></div>
          <div className="footer-column">
            <h4>Follow us</h4>
            <a href="https://www.linkedin.com/company/indrolabs" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="footer-bottom">Copyright © 2026 Indro Labs — All Rights Reserved.</div>
      </footer>
    </>
  )
}

export default ContactPage
