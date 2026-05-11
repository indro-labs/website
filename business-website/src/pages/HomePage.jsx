import NavBar from '../components/NavBar/NavBar'
import '../App.css'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Listbox } from '@headlessui/react'
import homeownerPhoto from '../assets/ForHomeowner.jpg'
import businessPhoto from '../assets/ForRadonBuisnesses.jpg'

/* ── Radon Gauge Widget ── */
function RadonGauge() {
  const cx = 150, cy = 150, r = 108
  const circumference = 2 * Math.PI * r
  const trackLength = (270 / 360) * circumference
  const valueLength = trackLength * 0.38

  return (
    <div className="gauge-wrapper">
      <div className="gauge-circle">
        <svg viewBox="0 0 300 300" className="gauge-svg" aria-hidden="true">
          <circle cx={cx} cy={cy} r={r + 28} fill="#eaedff" />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="#c8d0f0" strokeWidth="11" strokeLinecap="round"
            strokeDasharray={`${trackLength} ${circumference}`}
            transform={`rotate(135 ${cx} ${cy})`}
          />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="#2b5ce6" strokeWidth="11" strokeLinecap="round"
            strokeDasharray={`${valueLength} ${circumference}`}
            transform={`rotate(135 ${cx} ${cy})`}
          />
        </svg>
        <div className="gauge-center">
          <span className="gauge-live">RADON · LIVE</span>
          <span className="gauge-reading">0.8</span>
          <span className="gauge-unit">pCi / L</span>
          <div className="gauge-status">
            <span className="status-dot green"></span>
            <span>Healthy · trending stable</span>
          </div>
        </div>
      </div>

      <div className="reading-pill pill-voc">
        <span className="pill-label">VOC</span>
        <div className="pill-value">
          <span className="pill-dot amber"></span>
          <strong>142</strong>
          <span className="pill-unit">ppb</span>
        </div>
      </div>
      <div className="reading-pill pill-pm">
        <span className="pill-label">PM 2.5</span>
        <div className="pill-value">
          <span className="pill-dot green"></span>
          <strong>9</strong>
          <span className="pill-unit">μg/m³</span>
        </div>
      </div>
      <div className="reading-pill pill-co2">
        <span className="pill-label">CO₂</span>
        <div className="pill-value">
          <span className="pill-dot blue"></span>
          <strong>612</strong>
          <span className="pill-unit">ppm</span>
        </div>
      </div>
    </div>
  )
}

/* ── Home Page ── */
function HomePage() {
  const navigate = useNavigate()
  const options = ['Homeowner', 'Radon professional']
  const [selectedOption, setSelectedOption] = useState('')
  const [formStatus, setFormStatus] = useState(null)

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!selectedOption) {
      setFormStatus({ type: 'error', message: 'Please select an option.' })
      return
    }
    const formData = new FormData(form)
    formData.set('userType', selectedOption)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_WAITLIST_URL, {
      method: 'POST', body: formData, headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      setFormStatus({ type: 'success', message: 'Thank you! Your form has been submitted.' })
      form.reset(); setSelectedOption('')
    } else {
      setFormStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  const handlePartnerSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
      method: 'POST', body: formData, headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      setFormStatus({ type: 'success', message: 'Thank you! Your form has been submitted.' })
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

      {/* Hero */}
      <section id="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-headline">
              <span>Breathe without <em>worry.</em></span>
              <span>Breathe without <em>radon.</em></span>
            </h1>
            <p className="hero-body">
              Indro Labs builds intelligent indoor environmental monitoring technology designed to make indoor spaces more proactive, data-driven, and easier to manage.
            </p>
            <div className="hero-actions">
              <button className="hero-btn-primary">Book a demo →</button>
              <a href="#how-it-works" className="hero-btn-link">See how it works</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-gauge-bg">
              <RadonGauge />
            </div>
          </div>
        </div>
      </section>

      <div className="grad-to-dark" />

      {/* Stats */}
      <section id="stats-section">
        <div className="stats-inner">
          <h2 className="stats-headline">
            The leading environmental cause of lung cancer is{' '}
            <em>invisible,</em> odorless, and <em>everywhere indoors.</em>
          </h2>
          <div className="stats-card">
            <div className="stat-item">
              <div className="stat-number">21k</div>
              <div className="stat-label">DEATHS / YR</div>
              <div className="stat-desc">In the U.S. attributed to radon-induced lung cancer.</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">1 in 15</div>
              <div className="stat-label">HOMES</div>
              <div className="stat-desc">In the U.S. exceed actionable radon levels.</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">&lt;1%</div>
              <div className="stat-label">TESTED</div>
              <div className="stat-desc">Of homes are continuously monitored for indoor air quality.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grad-to-light" />

      {/* Solutions */}
      <section id="solutions-section">
        <div className="solutions-header">
          <h2 className="section-title">Radon safety for everyone.</h2>
        </div>
        <div className="solutions-grid">
          <div className="sol-card">
            <div className="sol-photo" style={{ backgroundImage: `url(${homeownerPhoto})` }} />
            <div className="sol-overlay">
              <h3 className="sol-title">For Homeowners.</h3>
              <p className="sol-desc">Protect your home and family with real-time radon monitoring, instant alerts, and smart automation.</p>
              <button className="sol-cta" onClick={() => navigate('/homeowners')}>Learn more →</button>
            </div>
          </div>
          <div className="sol-card">
            <div className="sol-photo" style={{ backgroundImage: `url(${businessPhoto})` }} />
            <div className="sol-overlay">
              <h3 className="sol-title">For Radon Businesses.</h3>
              <p className="sol-desc">Run a smarter mitigation business. Monitor client systems remotely, track fan health, and diagnose virtually.</p>
              <button className="sol-cta" onClick={() => navigate('/businesses')}>Learn more →</button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <div className="hiw-header">
          <h2 className="section-title">Up and running in three steps.</h2>
        </div>
        <div className="hiw-grid">
          {[
            { n: 1, label: 'INSTALL PHOTO', title: 'Buy Indro Smart', desc: 'Purchase for your home or your business. Plugs into existing radon mitigation systems with no complexity.' },
            { n: 2, label: 'APP SCREENSHOT', title: 'Monitor radon levels', desc: 'Live readings from home or anywhere. Real-time data, trends, and alerts — all in the Indro app.' },
            { n: 3, label: 'DASHBOARD PHOTO', title: 'Sense. Control. Stay safe.', desc: 'Set thresholds and let Indro act — automated fan control, smart alerts, and intelligent mitigation.' },
          ].map(({ n, label, title, desc }) => (
            <div className="hiw-card" key={n}>
              <div className="hiw-photo-box">
                <span className="hiw-photo-label">{label}</span>
                <div className="hiw-hover-grad" />
              </div>
              <div className="hiw-step-num">{n}</div>
              <h4 className="hiw-title">{title}</h4>
              <p className="hiw-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact-section">
        <div className="contact-container">
          <h2 className="contact-heading">Get updates</h2>
          <p className="contact-intro">Join the waitlist or contact us to discuss partnership opportunities.</p>
          <div className="contact-grid">
            <form className="contact-card" onSubmit={handleWaitlistSubmit}>
              <h3>Join the Waitlist</h3>
              <p>Be the first to know when we launch.</p>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>City/Province (optional)</label><input name="cityProvince" type="text" /></div>
              <div className="form-group">
                <label>I am a *</label>
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                  <div className="custom-select">
                    <Listbox.Button className="custom-select-button">
                      {selectedOption || 'Select an option'}<ChevronDown size={18} />
                    </Listbox.Button>
                    <Listbox.Options className="custom-select-options">
                      {options.map((o) => <Listbox.Option key={o} value={o} className="custom-select-option">{o}</Listbox.Option>)}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <button className="submit-button waitlist-submit-button" type="submit">Join Waitlist</button>
            </form>

            <form className="contact-card" onSubmit={handlePartnerSubmit}>
              <h3>Partner with Us</h3>
              <p>For industry professionals and organizations.</p>
              <div className="form-group"><label>Company (optional)</label><input name="company" type="text" /></div>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Message *</label><textarea name="message" required></textarea></div>
              <button className="submit-button partner-submit-button" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-container">
          <div className="footer-column"><h4>Indro Labs</h4><p>Continuous radon protection monitoring</p></div>
          <div className="footer-column"><h4>Contact</h4><p>info@indrolabs.ca</p></div>
          <div className="footer-column"><h4>Location</h4><p>Alberta, Canada</p></div>
        </div>
        <div className="footer-bottom">Copyright © 2026 Indro Labs — All Rights Reserved.</div>
      </footer>
    </>
  )
}

export default HomePage
