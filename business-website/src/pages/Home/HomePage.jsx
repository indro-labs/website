import NavBar from '../../components/NavBar/NavBar'
import '../../App.css'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Listbox } from '@headlessui/react'
import homeownerPhoto  from '../../assets/ForHomeowner.jpg'
import businessPhoto   from '../../assets/ForRadonBuisnesses.jpg'
import heroVideo       from '../../assets/hero_video.mp4'
import heroPoster       from '../../assets/hero_poster.jpg'
import step1Photo      from '../../assets/Mainpagestep1.jpg'
import step2Photo      from '../../assets/Mainpagestep2.jpg'
import step3Photo      from '../../assets/Mainpagestep3.jpg'



/* ── Stats Slider ── */
const STAT_SLIDES = [
  { number: '3.2k+',      label: 'DEATHS / YR', desc: 'In Canada attributed to radon-induced lung cancer.' },
  { number: '#1',      label: 'CAUSE', desc: 'Of lung cancer among non-smokers.' },
  { number: '1 in 5',  label: 'HOMES',        desc: 'In Canada exceed Health Canada radon guidelines.' },
  { number: '<1%',      label: 'MONITORED',       desc: 'Of homes are continuously monitored for changing radon levels.' },
]

function StatsSlider() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState('right')

  const go = (i) => { setDir(i > active ? 'right' : 'left'); setActive(i) }

  useEffect(() => {
    const t = setInterval(() => {
      setDir('right')
      setActive(p => (p + 1) % STAT_SLIDES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const s = STAT_SLIDES[active]

  return (
    <div className="stats-slider-card">
      <div className="stats-slide" key={active} data-dir={dir}>
        <div className="stat-number">{s.number}</div>
        <div className="stat-label">{s.label}</div>
        <div className="stat-desc">{s.desc}</div>
      </div>
      <div className="stats-slider-dots">
        {STAT_SLIDES.map((_, i) => (
          <button key={i} className={`stat-dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  )
}

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
          <circle cx={cx} cy={cy} r={r + 28} fill="rgba(255,255,255,0.07)" />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="11" strokeLinecap="round"
            strokeDasharray={`${trackLength} ${circumference}`}
            transform={`rotate(135 ${cx} ${cy})`}
          />
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="#7db3ff" strokeWidth="11" strokeLinecap="round"
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

/* ── Mobile Hero Card ── */
function HeroMobileCard() {
  return (
    <div className="hero-mobile-card">
      <div className="hmc-top">
        <div className="hmc-label-row">
          <span className="hmc-label">RADON · LIVE</span>
          <span className="hmc-safe"><span className="hmc-dot" />Safe</span>
        </div>
        <div className="hmc-reading">
          <span className="hmc-num">0.8</span>
          <span className="hmc-unit">pCi / L</span>
        </div>
        <div className="hmc-status">Healthy · trending stable</div>
      </div>
      <div className="hmc-divider" />
      <div className="hmc-metrics">
        <div className="hmc-metric">
          <span className="hmc-metric-label">PM 2.5</span>
          <span className="hmc-metric-val green">9 <span className="hmc-metric-unit">μg/m³</span></span>
        </div>
        <div className="hmc-metric-sep" />
        <div className="hmc-metric">
          <span className="hmc-metric-label">VOC</span>
          <span className="hmc-metric-val amber">142 <span className="hmc-metric-unit">ppb</span></span>
        </div>
        <div className="hmc-metric-sep" />
        <div className="hmc-metric">
          <span className="hmc-metric-label">CO₂</span>
          <span className="hmc-metric-val blue">612 <span className="hmc-metric-unit">ppm</span></span>
        </div>
      </div>
    </div>
  )
}

/* ── Home Page ── */
function HomePage() {
  const navigate = useNavigate()
  const { section } = useParams()
  const options = ['Homeowner', 'Radon professional']
  const [selectedOption, setSelectedOption] = useState('')
  const [formStatus, setFormStatus] = useState(null)

  /*Low power mode*/
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const heroVideoRef = useRef(null)

  const ensureVideoPlays = async (video) => {
    if (!video) return

    try {
      await video.play()
    } catch (error) {
      setIsLowPowerMode(true)
    }
  }

  useEffect(() => {
    ensureVideoPlays(heroVideoRef.current)
  }, [])

  // Scroll to section when navigated via /section-id path
  useEffect(() => {
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [section])

  // Direct scroll handler for click events (works every time, no route dependency)
  const scrollToSection = (id) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
  }


const handleWaitlistSubmit = async (e) => {
  e.preventDefault()

  const form = e.currentTarget

  if (!selectedOption) {
    setFormStatus({
        type: "error",
        message: "Please select an option."
      })
    return
  }

  const formData = new FormData(form)
  formData.set("userType", selectedOption)

  const response = await fetch(import.meta.env.VITE_FORMSPREE_WAITLIST_URL, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })

  if (response.ok) {
    setFormStatus({
      type: "success",
      message: "Thank you! Your form has been submitted."
    })
    form.reset()
    setSelectedOption("")
  } else {
    setFormStatus({
      type: "error",
      message: "Something went wrong. Please try again."
    })
  }
}
const handlePartnerSubmit = async (e) => {
  e.preventDefault()

  const form = e.currentTarget
  const formData = new FormData(form)

  const response = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })

  if (response.ok) {
    setFormStatus({
      type: "success",
      message: "Thank you! Your form has been submitted."
    })
    form.reset()
  } else {
    setFormStatus({
      type: "error",
      message: "Something went wrong. Please try again."
    })
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
             {isLowPowerMode ? (
              <img
                src={heroPoster}
                alt="Indro Labs hero background"
                className="hero-video-bg"
              />
            ) : (
              <video
                ref={heroVideoRef}
                className="hero-video-bg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}


        <div className="hero-video-overlay" />

        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-headline">
              <span>Breathe without <em>worry.</em></span>
              <span>Breathe without <em>radon.</em></span>
            </h1>
            <p className="hero-body">
               Indro Labs builds intelligent radon monitoring and mitigation technology designed to create safer, healthier, and smarter indoor spaces.
            </p>
            <div className="hero-actions">
              <button onClick={() => scrollToSection('contact')} className="hero-btn-primary">Join waitlist</button>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hero-btn-link">See how it works</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-gauge-panel hero-desktop-only">
              <RadonGauge />
            </div>
            <HeroMobileCard />
          </div>
        </div>
      </section>
      {/* Stats */}
      <section id="stats-section">
        <div className="stats-inner">
          <h2 className="stats-headline">
            The leading environmental cause of lung cancer hides in plain sight — {' '}
          <span className="radon-break">invisible, odorless <em>radon</em> gas.</span>
          </h2>
          <StatsSlider />
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions-section">
        <div className="solutions-header">
          <h2 className="section-title">Radon safety for everyone.</h2>
        </div>
        <div className="solutions-grid">
          <div className="sol-card">
            <div className="sol-photo" style={{ backgroundImage: `url(${homeownerPhoto})` }} />
            <div className="sol-overlay">
              <h3 className="sol-title">For homeowners.</h3>
              <p className="sol-desc">Protect your home and family with continuous radon monitoring, instant alerts, and intelligent automation.</p>
              <button className="sol-cta" onClick={() => navigate('/homeowners')}>Learn more</button>
            </div>
          </div>
          <div className="sol-card">
            <div className="sol-photo" style={{ backgroundImage: `url(${businessPhoto})` }} />
            <div className="sol-overlay">
              <h3 className="sol-title">For radon businesses.</h3>
              <p className="sol-desc">Run a smarter mitigation business. Monitor client systems remotely, track fan health, and diagnose virtually.</p>
              <button className="sol-cta" onClick={() => navigate('/businesses')}>Learn more</button>
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
            { n: 1, img: step1Photo, title: 'Buy Indro Smart', desc: 'Purchase for your home or your business. Plugs into existing radon mitigation systems with no complexity.' },
            { n: 2, img: step2Photo, title: 'Control radon levels', desc: 'Track radon levels from home or anywhere with real-time readings, trends, and instant alerts in the Indro app.' },
            { n: 3, img: step3Photo, title: 'Sense. Control. Stay safe.', desc: 'Set custom thresholds and let Indro Smart respond automatically with intelligent fan control, smart alerts, and adaptive mitigation.' },
          ].map(({ n, img, title, desc }) => (
            <div className="hiw-card" key={n}>
              <div className="hiw-photo-box">
                <img src={img} alt={title} className="hiw-photo-img" />
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
      <section id="contact">
        <div className="contact-container">
          <h2 className="contact-heading">Get updates</h2>
          <p className="contact-intro">Join the waitlist or contact us to discuss partnership opportunities.</p>
          <div className="contact-grid">
            <form className="contact-card" onSubmit={handleWaitlistSubmit}>
              <h3>Join the waitlist</h3>
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
              <button className="submit-button waitlist-submit-button" type="submit">Join waitlist</button>
            </form>

            <form className="contact-card" onSubmit={handlePartnerSubmit}>
              <h3>Partner with us</h3>
              <p>For industry professionals and organizations.</p>
              <div className="form-group"><label>Company (optional)</label><input name="company" type="text" /></div>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Message *</label><textarea name="message" required></textarea></div>
              <button className="submit-button partner-submit-button" type="submit">Send message</button>
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
          <div className="footer-column">
            <h4>Follow us</h4>
            <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link">
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

export default HomePage
