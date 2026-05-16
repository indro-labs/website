import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import '../../App.css'
import './RadonBusinessPage.css'

/* ── Client Portfolio Dashboard Widget ── */
function ClientPortfolio() {
  const bars = [30, 45, 35, 55, 40, 70, 50, 65, 45, 80, 60, 75]
  return (
    <div className="portfolio-card">
      <div className="portfolio-header">
        <span className="portfolio-title">Client Portfolio — 24 Properties</span>
        <span className="portfolio-badge">● 22 Active</span>
      </div>

      <div className="portfolio-stats">
        <div className="p-stat">
          <span className="p-stat-num">22</span>
          <span className="p-stat-label">SYSTEMS<br />ONLINE</span>
        </div>
        <div className="p-stat-divider" />
        <div className="p-stat">
          <span className="p-stat-num alert">2</span>
          <span className="p-stat-label">CALL-BACK<br />ALERTS</span>
        </div>
        <div className="p-stat-divider" />
        <div className="p-stat">
          <span className="p-stat-num">99%</span>
          <span className="p-stat-label">FAN<br />UPTIME</span>
        </div>
      </div>

      <div className="portfolio-chart">
        {bars.map((h, i) => (
          <div key={i} className="p-bar" style={{ height: `${h}%` }} />
        ))}
      </div>

      <div className="portfolio-properties">
        <div className="p-prop">
          <span className="p-prop-addr">123 Maple St — Johnson</span>
          <span className="p-prop-status safe">● 1.2 pCi/L — Safe</span>
        </div>
        <div className="p-prop">
          <span className="p-prop-addr">456 Oak Ave — Williams</span>
          <span className="p-prop-status warn">● 3.8 pCi/L ↑</span>
        </div>
        <div className="p-prop">
          <span className="p-prop-addr">789 Pine Rd — Martinez</span>
          <span className="p-prop-status danger">● Fan alert</span>
        </div>
      </div>
    </div>
  )
}

/* ── Why Monitoring Carousel — looping, no numbers ── */
const WHY_CARDS = [
  {
    title: 'Know before your client',
    desc: 'Real-time alerts when radon levels rise at any client property — before they call you, or before they start looking for someone else.',
  },
  {
    title: 'Fan health at a glance',
    desc: 'Monitor every mitigation fan remotely. Detect failures and performance drops without a single site visit.',
  },
  {
    title: 'Virtual diagnostics',
    desc: 'Troubleshoot client systems remotely, reducing unnecessary truck rolls and saving valuable technician time.',
  },
  {
    title: 'Full system visibility',
    desc: 'Track every client, property, and radon reading from one centralized dashboard designed for growing mitigation businesses.',
  },
]

function WhyCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState('right')

  const total = WHY_CARDS.length
  const go = (next) => { setDir(next > active ? 'right' : 'left'); setActive(next) }
  const prev = () => go((active - 1 + total) % total)
  const next = () => go((active + 1) % total)

  return (
    <div className="why-carousel">
      <div className="why-card" key={active} data-dir={dir}>
        <h3 className="why-card-title">{WHY_CARDS[active].title}</h3>
        <p className="why-card-desc">{WHY_CARDS[active].desc}</p>
      </div>

      <div className="why-controls">
        <button className="why-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="why-dots">
          {WHY_CARDS.map((_, i) => (
            <button key={i} className={`why-dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Card ${i + 1}`} />
          ))}
        </div>
        <button className="why-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ── Steps data ── */
const STEPS = [
  {
    n: 1,
    title: 'Install on existing mitigation',
    desc: "Attach Indro Smart to your client's existing radon mitigation system. Professional installation in under 10 minutes.",
  },
  {
    n: 2,
    title: 'Monitor via your dashboard',
    desc: 'All client properties appear in your business dashboard — live readings, trends, and system health in one view.',
  },
  {
    n: 3,
    title: 'Receive alerts instantly',
    desc: 'Instant notifications when radon spikes, a fan underperforms, or any system needs attention across your portfolio.',
  },
  {
    n: 4,
    title: 'Troubleshoot virtually',
    desc: 'Use live sensor data to diagnose issues remotely — dispatch only when you know exactly what needs to be done.',
  },
]

/* ── Main Page ── */
function RadonBusinessPage() {
  const { section } = useParams()
  const [formStatus, setFormStatus] = useState(null)
  const impactRef = useRef(null)

  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const el = document.querySelector(`[data-anchor="${section}"]`) || document.getElementById(section)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [section])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.impact-stat').forEach((el, i) => {
            setTimeout(() => el.classList.add('impact-stat--visible'), i * 220)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (impactRef.current) observer.observe(impactRef.current)
    return () => observer.disconnect()
  }, [])

  const handlePartnerSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
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

      {/* ── Hero ── */}
      <section id="biz-hero">
        <div className="biz-hero-container">
          <div className="biz-hero-left">
            <p className="biz-eyebrow">FOR RADON BUSINESSES</p>
            <h1 className="biz-hero-headline">
              Run a smarter{' '}
              <em>mitigation<br />business.</em>
            </h1>
            <p className="biz-hero-body">
              Monitor every client system remotely. Get call-back alerts before clients do. Know your fans are working — without driving out.
            </p>
            <div className="biz-hero-actions">
              <Link to="/businesses/contact" className="biz-btn-primary">Become partner</Link>
              <Link to="/businesses/how-it-works" className="biz-btn-link">See how it works</Link>
            </div>
          </div>
          <div className="biz-hero-right">
            <ClientPortfolio />
          </div>
        </div>
      </section>

      {/* ── Why Monitoring Matters — carousel LEFT, text RIGHT ── */}
      <section id="biz-why">
        <div className="biz-why-container">
          <div className="biz-why-left">
            <WhyCarousel />
          </div>
          <div className="biz-why-right">
            <p className="biz-eyebrow light">WHY MONITORING MATTERS</p>
            <h2 className="biz-why-headline">
              Your business runs on trust. Indro makes that <em>visible.</em>
            </h2>
            <p className="biz-why-body">
              Every call-back costs you time. Every undetected fan failure costs you a client. Continuous remote monitoring changes the economics of your business.
            </p>
          </div>
        </div>

      </section>

      {/* ── How It Works ── */}
      <section id="biz-steps" data-anchor="how-it-works">
        <div className="biz-steps-container">
          <p className="biz-eyebrow blue">HOW IT WORKS</p>
          <h2 className="biz-steps-headline">From installation to insight in four steps.</h2>
          <p className="biz-steps-sub">
            Designed for professional radon businesses. 
          </p>
          <div className="biz-steps-grid">
            {STEPS.map(({ n, title, desc }) => (
              <div className="biz-step-card" key={n}>
                <div className="biz-step-num">{n}</div>
                <h4 className="biz-step-title">{title}</h4>
                <p className="biz-step-desc">{desc}</p>
                <div className="biz-step-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Impact ── */}
      <section id="biz-impact">
        <div className="biz-impact-container">
          <p className="biz-eyebrow light">THE IMPACT</p>
          <h2 className="biz-impact-headline">What Indro means for your business.</h2>
          <div className="biz-impact-card" ref={impactRef}>
                  <div className="impact-stat">
              <div className="impact-number">1</div>
              <div className="impact-label">CENTRALIZED DASHBOARD</div>
              <div className="impact-desc">
                Diagnose issues remotely and manage every client system from one unified platform.
              </div>
            </div>
            <div className="impact-divider" />
            <div className="impact-stat">
              <div className="impact-number">24/7</div>
              <div className="impact-label">CLIENT MONITORING</div>
              <div className="impact-desc">Every client system watched continuously — not just on service days.</div>
            </div>
            <div className="impact-divider" />
        
            <div className="impact-stat">
              <div className="impact-number">+30%</div>
              <div className="impact-label">HIGHER PROFIT MARGINS</div>
              <div className="impact-desc">
                Fewer unnecessary site visits and smarter diagnostics can help improve operational efficiency and profitability.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Become a Partner ── */}
      <section id="biz-contact" data-anchor="contact">
        <div className="biz-contact-container">
          <div className="biz-contact-left">
            <p className="biz-eyebrow blue">BECOME A PARTNER</p>
            <h2 className="biz-contact-headline">Partner with Indro Labs.</h2>
            <p className="biz-contact-body">
              We're actively partnering with radon professionals for early deployments. Let's build something together.
            </p>
          </div>
          <div className="biz-contact-right">
            <form className="contact-card" onSubmit={handlePartnerSubmit}>
              <h3>Get in touch</h3>
              <p>Tell us about your business and we'll reach out within 48 hours.</p>
              <div className="form-group"><label>Company (optional)</label><input name="company" type="text" /></div>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Message *</label><textarea name="message" required></textarea></div>
              <button className="submit-button partner-submit-button" type="submit">Send message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
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

export default RadonBusinessPage
