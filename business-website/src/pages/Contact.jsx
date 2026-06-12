import { useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import './Contact.css'

export default function Contact() {
  const [done, setDone] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <>
      <NavBar />
      <div className="contact-page">
        <div className="contact-grid">
          {/* LEFT: Text & Links */}
          <div className="contact-info">
            <h1>Let's talk.</h1>
            <p className="contact-sub">
              Whether you're a potential partner, a curious rider, or just want to see how we're reshaping transit, we'd love to connect. Reach out through the form or find us directly below.
            </p>
            
            <div className="contact-links">
              <a href="mailto:info@indrolabs.ca">info@indrolabs.ca</a>
              <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer">Follow us on LinkedIn</a>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="contact-form-wrap">
            {done ? (
              <div className="contact-success">
                <h2>Message received.</h2>
                <p>Thanks for reaching out! We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <input type="text" placeholder="Your name" required />
                <input type="email" placeholder="Email address" required />
                <textarea placeholder="How can we help?" rows="6" required />
                <button type="submit" className="btn-primary">Send message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}