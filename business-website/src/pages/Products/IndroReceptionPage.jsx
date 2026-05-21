import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import '../../App.css'
import './IndroReceptionPage.css'

/* ── Animated AI Call Widget ── */
function ReceptionWidget() {
  const [step, setStep]     = useState(0)
  const [cycle, setCycle]   = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Animation sequence — restarts every time `cycle` increments
  useEffect(() => {
    setStep(0)
    setSeconds(0)
    const t = [
      setTimeout(() => setStep(1), 900),   // user msg 1
      setTimeout(() => setStep(2), 2000),  // AI typing indicator
      setTimeout(() => setStep(3), 3500),  // AI response replaces typing
      setTimeout(() => setStep(4), 5000),  // user msg 2
      setTimeout(() => setStep(5), 5900),  // Address ✓ tag
      setTimeout(() => setStep(6), 6700),  // Service ✓ tag
      setTimeout(() => setCycle(c => c + 1), 10500), // restart
    ]
    return () => t.forEach(clearTimeout)
  }, [cycle])

  // Live call timer
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [cycle])

  const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="ir-widget">
      {/* Header */}
        <div className="ir-widget-top">
          <div className="ir-live-row">
            <span className="ir-live-dot" />
            <span className="ir-live-text">AI handling call</span>
          </div>
          <span className="ir-timer">{fmt(seconds)}</span>
        </div>

        {/* Caller */}
        <div className="ir-caller-row">
          <div className="ir-avatar">SM</div>
          <div className="ir-caller-info">
            <div className="ir-caller-name">Sarah Mitchell</div>
            <div className="ir-caller-sub">Inbound · Radon inspection inquiry</div>
          </div>
        </div>

        {/* Transcript — fixed height so widget doesn't jump */}
        <div className="ir-transcript">
          {step >= 1 && (
            <div className="ir-bubble ir-bubble-user ir-bubble-in">
              "Hi, I need a radon test done — is this week available?"
            </div>
          )}
          {step === 2 && (
            <div className="ir-typing ir-bubble-in">
              <span className="ir-typing-dot" />
              <span className="ir-typing-dot" />
              <span className="ir-typing-dot" />
            </div>
          )}
          {step >= 3 && (
            <div className="ir-bubble ir-bubble-ai ir-bubble-in">
              <div className="ir-ai-tag">Indro Reception</div>
              "Absolutely! Could I get your address and a preferred time?"
            </div>
          )}
          {step >= 4 && (
            <div className="ir-bubble ir-bubble-user ir-bubble-in">
              "4521 Birch Cres — Thursday afternoon."
            </div>
          )}
        </div>

        {/* Collecting tags */}
        <div className="ir-collecting">
          <span className="ir-col-label">Collecting</span>
          {step >= 5 && <span className="ir-tag ir-tag-done ir-tag-in">Address ✓</span>}
          {step >= 6 && <span className="ir-tag ir-tag-done ir-tag-in">Service ✓</span>}
          <span className="ir-tag ir-tag-pending">Time slot</span>
        </div>

        {/* Stats bar */}
        <div className="ir-widget-stats">
          <div className="ir-ws">
            <span className="ir-ws-num">12</span>
            <span className="ir-ws-label">Calls today</span>
          </div>
          <div className="ir-ws-sep" />
          <div className="ir-ws">
            <span className="ir-ws-num">8</span>
            <span className="ir-ws-label">Leads qualified</span>
          </div>
          <div className="ir-ws-sep" />
          <div className="ir-ws">
            <span className="ir-ws-num">4</span>
            <span className="ir-ws-label">After-hours</span>
          </div>
        </div>
    </div>
  )
}

/* ── Features Accordion ── */
const FEATURES = [
  {
    title: 'Answers every call, text, and inquiry',
    desc: 'Indro Reception handles inbound phone calls, texts, and website inquiries instantly — no hold music, no missed leads.',
  },
  {
    title: 'Qualifies leads before they reach your team',
    desc: 'Incoming inquiries are screened and qualified automatically, so your team only engages with customers who are ready to book.',
  },
  {
    title: 'Collects customer information automatically',
    desc: 'Name, address, service type, and scheduling preferences are gathered and logged without your staff lifting a finger.',
  },
  {
    title: 'Handles after-hours and missed calls',
    desc: 'When your office is closed, Indro Reception keeps working. No lead is lost to voicemail.',
  },
  {
    title: 'Reduces repetitive intake work',
    desc: 'Educates customers with your company-specific FAQs and service details, cutting down on repeat questions and manual follow-ups.',
  },
]

function FeaturesAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <div className="ir-accordion">
      {FEATURES.map(({ title, desc }, i) => (
        <div
          key={i}
          className={`ir-acc-item ${open === i ? 'active' : ''}`}
          onClick={() => setOpen(i)}
        >
          <div className="ir-acc-header">
            <h4 className="ir-acc-title">{title}</h4>
            <span className="ir-acc-icon">{open === i ? '−' : '+'}</span>
          </div>
          <div className="ir-acc-body">
            <div className="ir-acc-body-inner">
              <p className="ir-acc-desc">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Stats Carousel ── */
const STAT_SLIDES = [
  {
    number: '62%',
    label: "Won't leave a voicemail",
    desc: "Callers who can't reach your business move on immediately — they call a competitor, not voicemail.",
  },
  {
    number: '78%',
    label: 'First to respond wins',
    desc: 'Of customers choose the first business that responds to their inquiry — not the best-reviewed one.',
  },
  {
    number: '85%',
    label: 'Missed calls never returned',
    desc: 'Of missed calls to small businesses are never called back, leaving significant revenue on the table.',
  },
  {
    number: '1 in 3',
    label: 'Calls happen after hours',
    desc: 'Inbound service inquiries arrive outside business hours — when most teams are unavailable.',
  },
]

function StatsCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState('right')

  const go = (i) => { setDir(i > active ? 'right' : 'left'); setActive(i) }

  useEffect(() => {
    const t = setInterval(() => {
      setDir('right')
      setActive(p => (p + 1) % STAT_SLIDES.length)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  const s = STAT_SLIDES[active]

  return (
    <div className="ir-stats-carousel">
      <div className="ir-stats-slide" key={active} data-dir={dir}>
        <div className="ir-stats-number">{s.number}</div>
        <div className="ir-stats-label">{s.label}</div>
        <div className="ir-stats-desc">{s.desc}</div>
      </div>
      <div className="ir-stats-dots">
        {STAT_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`ir-stats-dot ${i === active ? 'active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Stat ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Industry Marquee ── */
function IndustryMarquee() {
  return (
    <div className="ir-marquee-outer">
      <div className="ir-marquee-track">
        {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
          <span className="ir-industry-pill" key={i}>{name}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Steps ── */
const STEPS = [
  {
    n: 1,
    title: 'Connect to your business',
    desc: 'Indro Reception learns your services, FAQs, and scheduling workflows. Setup takes minutes, not weeks.',
  },
  {
    n: 2,
    title: 'Handles every incoming inquiry',
    desc: 'Calls, texts, and web inquiries are answered instantly and professionally — any time of day.',
  },
  {
    n: 3,
    title: 'Qualifies and routes to your team',
    desc: 'Collected information and qualified leads are forwarded to your team, ready to act on.',
  },
]

/* ── Industries ── */
const INDUSTRIES = [
  'Radon mitigation',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Environmental monitoring',
  'Home inspection',
  'Utilities & infrastructure',
]

/* ── Main Page ── */
function IndroReceptionPage() {
  const { section } = useParams()
  const [formStatus, setFormStatus] = useState(null)
  const spotlightRef = useRef(null)

  const handleStatsMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (spotlightRef.current) {
      spotlightRef.current.style.background =
        `radial-gradient(700px circle at ${x}px ${y}px, rgba(100, 149, 255, 0.13), rgba(43, 92, 230, 0.07) 40%, transparent 70%)`
      spotlightRef.current.style.opacity = '1'
    }
  }

  const handleStatsMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
  }

  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const el = document.querySelector(`[data-anchor="${section}"]`) || document.getElementById(section)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [section])

  const scrollToSection = (id) => {
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-anchor="${id}"]`) || document.getElementById(id)
      el?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_RECEPTION_URL, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    if (response.ok) {
      setFormStatus({ type: 'success', message: 'Thank you! Your spot is reserved.' })
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

      {/* ── Dark band: Hero → Stats → Features ── */}
      <div className="ir-dark-band" onMouseMove={handleStatsMouseMove} onMouseLeave={handleStatsMouseLeave}>
        <div ref={spotlightRef} className="ir-band-spotlight" />

        {/* ── Hero ── */}
        <section id="ir-hero">
          <div className="ir-hero-container">
            <div className="ir-hero-left">
              <p className="ir-eyebrow">INDRO RECEPTION</p>
              <h1 className="ir-hero-headline">
                Your AI front desk,<br />
                <em>always on.</em>
              </h1>
              <p className="ir-hero-body">
                Answer every call, qualify every lead, and collect customer information automatically — so your team focuses on the work that matters.
              </p>
              <div className="ir-hero-actions">
                <button onClick={() => scrollToSection('waitlist')} className="ir-btn-primary">Join waitlist</button>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works') }} className="ir-btn-link">See how it works</a>
              </div>
            </div>
            <div className="ir-hero-right">
              <ReceptionWidget />
            </div>
          </div>
        </section>

        {/* ── Stats Carousel ── */}
        <section id="ir-stats">
          <div className="ir-stats-container">
            <p className="ir-eyebrow blue">BY THE NUMBERS</p>
            <h2 className="ir-stats-headline">The cost of a missed call.</h2>
            <StatsCarousel />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="ir-features">
          <div className="ir-features-container">
            <div className="ir-features-left">
              <p className="ir-eyebrow light">WHAT IT DOES</p>
              <h2 className="ir-features-headline">Never miss a lead. Never repeat yourself.</h2>
              <p className="ir-features-sub">
                Indro Reception handles the repetitive, time-consuming front-desk work that slows your business down.
              </p>
            </div>
            <div className="ir-features-right">
              <FeaturesAccordion />
            </div>
          </div>
        </section>

      </div>{/* /ir-dark-band */}

      {/* ── How It Works ── */}
      <section id="ir-steps" data-anchor="how-it-works">
        <div className="ir-steps-container">
          <p className="ir-eyebrow blue">HOW IT WORKS</p>
          <h2 className="ir-steps-headline">Up and running in three steps.</h2>
          <p className="ir-steps-sub">Designed to fit inside your existing workflow — not replace it.</p>
          <div className="ir-steps-grid">
            {STEPS.map(({ n, title, desc }) => (
              <div className="ir-step-card" key={n}>
                <div className="ir-step-num">{n}</div>
                <h4 className="ir-step-title">{title}</h4>
                <p className="ir-step-desc">{desc}</p>
                <div className="ir-step-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Fit Industries ── */}
      <section id="ir-industries">
        <div className="ir-industries-container">
          <p className="ir-eyebrow light">BUILT FOR</p>
          <h2 className="ir-industries-headline">Designed for field service industries.</h2>
          <p className="ir-industries-sub">
            From radon mitigation to HVAC and plumbing — Indro Reception works for any company that handles inbound customer inquiries.
          </p>
        </div>
        <IndustryMarquee />
      </section>

      {/* ── Waitlist ── */}
      <section id="ir-waitlist" data-anchor="waitlist">
        <div className="ir-waitlist-container">
          <div className="ir-waitlist-left">
            <p className="ir-eyebrow">JOIN THE WAITLIST</p>
            <h2 className="ir-waitlist-headline">Be the first to access Indro Reception.</h2>
            <p className="ir-waitlist-body">
              We're onboarding early partners. Share your details and we'll reach out when Indro Reception is ready for your business.
            </p>
          </div>
          <div className="ir-waitlist-right">
            <form className="contact-card" onSubmit={handleSubmit}>
              <div className="form-group"><label>Company (optional)</label><input name="company" type="text" /></div>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>Message (optional)</label><textarea name="message" /></div>
              <button className="submit-button waitlist-submit-button" type="submit">Join waitlist</button>
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

export default IndroReceptionPage
