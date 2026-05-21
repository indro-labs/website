import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import '../../App.css'
import './IndroManagerPage.css'

/* ── Property Hub Widget ── */
function ManagerWidget() {
  const SIDEBAR_PROPS = [
    { addr: '91 Lakeview Blvd', status: 'active',   selected: true },
    { addr: '4521 Birch Cres',  status: 'active' },
    { addr: '238 Oakwood Dr',   status: 'followup' },
    { addr: '17 Maple Lane',    status: 'active' },
  ]

  const TIMELINE = [
    { date: 'May 12, 2026', event: 'Annual inspection',    tag: 'Inspection' },
    { date: 'Mar 4, 2026',  event: 'Fan motor replacement', tag: 'Service' },
    { date: 'Jan 17, 2026', event: 'Initial installation',  tag: 'Install' },
  ]

  return (
    <div className="im-widget-wrap">
      <div className="im-widget">
        {/* App top bar */}
        <div className="im-widget-topbar">
          <div className="im-widget-app-icon">IM</div>
          <div className="im-widget-app-name">Indro Manager</div>
          <span className="im-widget-badge">● Live</span>
        </div>

        {/* Split body */}
        <div className="im-widget-body">
          {/* Sidebar — property list */}
          <div className="im-widget-sidebar">
            <div className="im-sidebar-header">
              <span className="im-sidebar-label">Properties</span>
              <span className="im-sidebar-count">47</span>
            </div>
            <div className="im-sidebar-list">
              {SIDEBAR_PROPS.map(({ addr, status, selected }) => (
                <div key={addr} className={`im-sidebar-item ${selected ? 'selected' : ''}`}>
                  <span className={`im-sidebar-dot ${status}`} />
                  <span className="im-sidebar-addr">{addr}</span>
                </div>
              ))}
              <div className="im-sidebar-more">+43 more</div>
            </div>
          </div>

          {/* Main — selected property detail */}
          <div className="im-widget-main">
            <div className="im-main-prop-name">91 Lakeview Blvd</div>
            <div className="im-main-prop-meta">J. Patel · Radon Technician</div>

            <div className="im-timeline-heading">Service History</div>
            <div className="im-timeline">
              {TIMELINE.map(({ date, event, tag }, i) => (
                <div key={i} className="im-timeline-row">
                  <div className="im-timeline-track">
                    <div className="im-timeline-node" />
                    {i < TIMELINE.length - 1 && <div className="im-timeline-line" />}
                  </div>
                  <div className="im-timeline-content">
                    <div className="im-timeline-event">{event}</div>
                    <div className="im-timeline-date">{date}</div>
                  </div>
                  <span className="im-timeline-tag">{tag}</span>
                </div>
              ))}
            </div>

            <div className="im-widget-action-btn">Generate Report →</div>
          </div>
        </div>
      </div>

      {/* Floating report notification */}
      <div className="im-widget-float">
        <div className="im-widget-float-icon">✓</div>
        <div>
          <div className="im-widget-float-title">Homeowner report ready</div>
          <div className="im-widget-float-sub">91 Lakeview · Generated May 12</div>
        </div>
      </div>
    </div>
  )
}

/* ── Features Accordion ── */
const FEATURES = [
  {
    title: 'Centralizes everything in one system',
    desc: 'Property records, customer history, technician notes, service reports, and follow-up activity — all in one place, always up to date.',
  },
  {
    title: 'Long-term records for every property',
    desc: 'Every installation, inspection, and service call is logged automatically. Build a complete history that grows with your business.',
  },
  {
    title: 'Simplifies team documentation',
    desc: 'Technicians can upload notes, photos, and reports in the field. No paperwork, no delays, no lost files.',
  },
  {
    title: 'Generates documentation automatically',
    desc: 'Homeowner reports and compliance documents are created from your existing records — no manual formatting required.',
  },
  {
    title: 'Built for operational continuity',
    desc: 'When a technician moves on or a property changes hands, the full history stays in the system. Nothing is lost.',
  },
]

function FeaturesAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <div className="im-accordion">
      {FEATURES.map(({ title, desc }, i) => (
        <div
          key={i}
          className={`im-acc-item ${open === i ? 'active' : ''}`}
          onClick={() => setOpen(i)}
        >
          <div className="im-acc-header">
            <h4 className="im-acc-title">{title}</h4>
            <span className="im-acc-icon">{open === i ? '−' : '+'}</span>
          </div>
          <div className="im-acc-body">
            <div className="im-acc-body-inner">
              <p className="im-acc-desc">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Steps ── */
const STEPS = [
  {
    n: 1,
    title: 'Add your properties',
    desc: 'Bring in your existing client list and property records. Indro Manager organizes everything from day one.',
  },
  {
    n: 2,
    title: 'Technicians log in the field',
    desc: 'Upload notes, photos, and service reports directly from the job site — no paperwork required.',
  },
  {
    n: 3,
    title: 'Track history across your team',
    desc: 'Every action is recorded with full visibility across properties, technicians, and service dates.',
  },
  {
    n: 4,
    title: 'Generate reports automatically',
    desc: 'Produce homeowner documents and compliance reports from your existing records in seconds.',
  },
]

/* ── Core Focus ── */
const FOCUS_AREAS = [
  {
    title: 'Property history',
    desc: 'Complete service records for every property, from first install to last visit.',
  },
  {
    title: 'Documentation management',
    desc: 'Homeowner reports and compliance docs generated automatically from service data.',
  },
  {
    title: 'Team visibility',
    desc: 'See technician activity, assignments, and field notes across your whole team.',
  },
  {
    title: 'Operational continuity',
    desc: 'Nothing is lost when team members change. Every record stays with the property.',
  },
  {
    title: 'Long-term service tracking',
    desc: 'Build a business asset — historical data that grows more valuable over time.',
  },
  {
    title: 'Scales with your operations',
    desc: 'Designed to grow alongside your team, your client list, and your service area.',
  },
]

/* ── Main Page ── */
function IndroManagerPage() {
  const { section } = useParams()
  const [formStatus, setFormStatus] = useState(null)
  const [focusTab, setFocusTab] = useState(0)
  const focusRef = useRef(null)

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
    const response = await fetch(import.meta.env.VITE_FORMSPREE_MANAGER_URL, {
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

      {/* ── Hero ── */}
      <section id="im-hero">
        <div className="im-hero-container">
          <div className="im-hero-left">
            <p className="im-eyebrow">INDRO MANAGER</p>
            <h1 className="im-hero-headline">
              Every property.<br />
              <em className="im-hero-big">All in one place.</em>
            </h1>
            <p className="im-hero-body">
              Centralize your service history, documentation, and team activity. Built around real field workflows — not complex enterprise software.
            </p>
            <div className="im-hero-actions">
              <button onClick={() => scrollToSection('waitlist')} className="im-btn-primary">Join waitlist</button>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works') }} className="im-btn-link">See how it works</a>
            </div>
          </div>
          <div className="im-hero-right">
            <ManagerWidget />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="im-features">
        <div className="im-features-container">
          <div className="im-features-left">
            <p className="im-eyebrow light">WHAT IT DOES</p>
            <h2 className="im-features-headline">Built around real field workflows.</h2>
            <p className="im-features-sub">
              Indro Manager replaces spreadsheets and scattered files with a single, organized system your whole team can rely on.
            </p>
          </div>
          <div className="im-features-right">
            <FeaturesAccordion />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="im-steps" data-anchor="how-it-works">
        <div className="im-steps-container">
          <p className="im-eyebrow blue">HOW IT WORKS</p>
          <h2 className="im-steps-headline">Set up in minutes. Running in days.</h2>
          <p className="im-steps-sub">Designed to scale alongside your operations without disrupting them.</p>
          <div className="im-steps-grid">
            {STEPS.map(({ n, title, desc }) => (
              <div className="im-step-card" key={n}>
                <div className="im-step-num">{n}</div>
                <h4 className="im-step-title">{title}</h4>
                <p className="im-step-desc">{desc}</p>
                <div className="im-step-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Focus ── */}
      <section id="im-focus">
        <div className="im-focus-container">
          <div className="im-focus-header">
            <p className="im-eyebrow">CORE FOCUS</p>
            <h2 className="im-focus-headline">What Indro Manager is built for.</h2>
            <p className="im-focus-subhead">Every feature exists to solve a real operational problem — nothing more, nothing less.</p>
          </div>
          <div className="im-focus-tabs-layout" ref={focusRef}>
            <div className="im-focus-tab-list">
              {FOCUS_AREAS.map(({ title }, i) => (
                <button
                  key={title}
                  className={`im-focus-tab ${focusTab === i ? 'active' : ''}`}
                  onClick={() => setFocusTab(i)}
                >
                  <span className="im-focus-tab-label">{title}</span>
                </button>
              ))}
            </div>
            <div className="im-focus-tab-panel" key={focusTab}>
              <div className="im-focus-panel-accent" />
              <h3 className="im-focus-panel-title">{FOCUS_AREAS[focusTab].title}</h3>
              <p className="im-focus-panel-desc">{FOCUS_AREAS[focusTab].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waitlist ── */}
      <section id="im-waitlist" data-anchor="waitlist">
        <div className="im-waitlist-container">
          <div className="im-waitlist-left">
            <p className="im-eyebrow">JOIN THE WAITLIST</p>
            <h2 className="im-waitlist-headline">Be the first to access Indro Manager.</h2>
            <p className="im-waitlist-body">
              We're onboarding early partners. Share your details and we'll reach out when Indro Manager is ready for your team.
            </p>
          </div>
          <div className="im-waitlist-right">
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

export default IndroManagerPage
