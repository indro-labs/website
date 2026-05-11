import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NavBar from '../components/NavBar/NavBar'
import '../App.css'
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

/* ── Why Monitoring Carousel ── */
const WHY_CARDS = [
  {
    n: '01',
    title: 'Know before your client does',
    desc: 'Real-time alerts when radon levels rise at any client property — before they call you, or before they start looking for someone else.',
  },
  {
    n: '02',
    title: 'Fan health at a glance',
    desc: 'Monitor every mitigation fan remotely. Detect failures and performance drops without a single site visit.',
  },
  {
    n: '03',
    title: 'Virtual diagnostics',
    desc: 'Troubleshoot client systems remotely using live sensor data — reducing unnecessary truck rolls and saving hours each week.',
  },
  {
    n: '04',
    title: 'Full system visibility',
    desc: 'Every client, every property, every reading — in one dashboard. Nothing falls through the cracks.',
  },
]

function WhyCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState('right')

  const go = (next) => {
    setDir(next > active ? 'right' : 'left')
    setActive(next)
  }

  const prev = () => { if (active > 0) go(active - 1) }
  const next = () => { if (active < WHY_CARDS.length - 1) go(active + 1) }

  return (
    <div className="why-carousel">
      <div className="why-card" key={active} data-dir={dir}>
        <span className="why-card-num">{WHY_CARDS[active].n}</span>
        <h3 className="why-card-title">{WHY_CARDS[active].title}</h3>
        <p className="why-card-desc">{WHY_CARDS[active].desc}</p>
      </div>

      <div className="why-controls">
        <button className={`why-arrow ${active === 0 ? 'disabled' : ''}`} onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="why-dots">
          {WHY_CARDS.map((_, i) => (
            <button key={i} className={`why-dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Card ${i + 1}`} />
          ))}
        </div>
        <button className={`why-arrow ${active === WHY_CARDS.length - 1 ? 'disabled' : ''}`} onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ── Feature Cards ── */
const FEATURES = [
  {
    title: 'Remote monitoring',
    desc: 'Live radon levels and fan status for every client property — visible from anywhere.',
  },
  {
    title: 'Proactive alerts',
    desc: 'Get notified the moment something changes, before your client even notices.',
  },
  {
    title: 'Virtual diagnostics',
    desc: 'Identify and troubleshoot system issues remotely using live sensor data.',
  },
  {
    title: 'Unified dashboard',
    desc: 'Every client, every reading, every alert — managed from one central view.',
  },
]

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
  const [formStatus, setFormStatus] = useState(null)

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
              <button className="biz-btn-primary">Book a demo →</button>
              <a href="#biz-steps" className="biz-btn-link">See how it works</a>
            </div>
          </div>
          <div className="biz-hero-right">
            <ClientPortfolio />
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="biz-features">
        <div className="biz-features-container">
          <div className="biz-features-grid">
            {FEATURES.map(({ title, desc }) => (
              <div className="biz-feature-card" key={title}>
                <div className="biz-feature-bar" />
                <h4 className="biz-feature-title">{title}</h4>
                <p className="biz-feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Indro Labs ── */}
      <section id="biz-about">
        <div className="biz-about-container">
          <div className="biz-about-photo">
            <span className="biz-photo-label">PHOTO — TECHNICIAN AT WORK</span>
          </div>
          <div className="biz-about-text">
            <p className="biz-eyebrow light">ABOUT INDRO LABS</p>
            <h2 className="biz-about-headline">
              Built for the people<br />who <em>do the work.</em>
            </h2>
            <p className="biz-about-body">
              Indro Labs gives radon mitigation businesses a platform to remotely monitor every client system — replacing reactive service calls with proactive, data-driven care.
            </p>
            <p className="biz-about-body">
              Your clients get peace of mind. You get visibility, efficiency, and a competitive edge that sets your business apart.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why Monitoring Matters ── */}
      <section id="biz-why">
        <div className="biz-why-container">
          <div className="biz-why-left">
            <p className="biz-eyebrow light">WHY MONITORING MATTERS</p>
            <h2 className="biz-why-headline">
              Your business runs on trust. Indro makes that <em>visible.</em>
            </h2>
            <p className="biz-why-body">
              Every call-back costs you time. Every undetected fan failure costs you a client. Continuous remote monitoring changes the economics of your business.
            </p>
          </div>
          <div className="biz-why-right">
            <WhyCarousel />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="biz-steps">
        <div className="biz-steps-container">
          <p className="biz-eyebrow blue">HOW IT WORKS</p>
          <h2 className="biz-steps-headline">From installation to insight in four steps.</h2>
          <p className="biz-steps-sub">
            Designed for professional radon businesses. Indro Smart fits into your existing workflow from day one.
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
          <div className="biz-impact-card">
            <div className="impact-stat">
              <div className="impact-number">↓ 60%</div>
              <div className="impact-label">UNNECESSARY SITE VISITS</div>
              <div className="impact-desc">Resolve more issues remotely before they ever need a truck roll.</div>
            </div>
            <div className="impact-divider" />
            <div className="impact-stat">
              <div className="impact-number">24/7</div>
              <div className="impact-label">CLIENT MONITORING</div>
              <div className="impact-desc">Every client system watched continuously — not just on service days.</div>
            </div>
            <div className="impact-divider" />
            <div className="impact-stat">
              <div className="impact-number">+NPS</div>
              <div className="impact-label">CLIENT TRUST</div>
              <div className="impact-desc">Proactive outreach before problems escalate builds lasting loyalty.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Become a Partner ── */}
      <section id="biz-contact">
        <div className="contact-container">
          <h2 className="contact-heading">Become a partner</h2>
          <p className="contact-intro">
            We're actively partnering with radon professionals for early deployments. Let's build something together.
          </p>
          <div className="biz-form-wrap">
            <form className="contact-card biz-partner-form" onSubmit={handlePartnerSubmit}>
              <h3>Get in touch</h3>
              <p>Tell us about your business and we'll reach out within 48 hours.</p>
              <div className="form-group"><label>Company (optional)</label><input name="company" type="text" /></div>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Message *</label><textarea name="message" required></textarea></div>
              <button className="submit-button partner-submit-button" type="submit">Send Message</button>
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
        </div>
        <div className="footer-bottom">Copyright © 2026 Indro Labs — All Rights Reserved.</div>
      </footer>
    </>
  )
}

export default RadonBusinessPage
