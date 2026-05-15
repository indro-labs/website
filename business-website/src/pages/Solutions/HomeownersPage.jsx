import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Listbox } from '@headlessui/react'
import { useParams, Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
const familyPhoto = '/FamilyHome.png'
import '../../App.css'
import './HomeownersPage.css'

/* ── Air Quality Hero Widget ── */
function AirQualityWidget() {
  const bars = [20, 35, 25, 45, 30, 80, 55, 40, 65, 35, 50, 45]
  return (
    <div className="ho-widget-wrap">
      <div className="ho-dash-card">
        <div className="ho-dash-header">
          <span className="ho-dash-title">Air Quality — Home</span>
          <span className="ho-safe-badge">● All Safe</span>
        </div>
        <div className="ho-dash-stats">
          <div className="ho-dash-stat">
            <span className="ho-dash-num green">0.8</span>
            <span className="ho-dash-label">pCi/L RADON</span>
          </div>
          <div className="ho-dash-stat">
            <span className="ho-dash-num">92</span>
            <span className="ho-dash-label">AIR SCORE</span>
          </div>
        </div>
        <div className="ho-dash-bars">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`ho-dash-bar ${i === 5 || i === 8 ? 'ho-bar-active' : ''}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div className="ho-phone-card">
        <span className="ho-phone-brand">Indro Labs</span>
        <div className="ho-phone-score-ring">
          <span className="ho-phone-score-num">92</span>
          <span className="ho-phone-score-label">SCORE</span>
        </div>
        <div className="ho-phone-readings">
          <div className="ho-reading">
            <span className="ho-reading-key">RADON</span>
            <span className="ho-reading-val green">0.8 pCi/L</span>
          </div>
          <div className="ho-reading">
            <span className="ho-reading-key">PM 2.5</span>
            <span className="ho-reading-val blue">9 μg/m³</span>
          </div>
          <div className="ho-reading">
            <span className="ho-reading-key">CO₂</span>
            <span className="ho-reading-val white">612 ppm</span>
          </div>
          <div className="ho-reading">
            <span className="ho-reading-key">VOC</span>
            <span className="ho-reading-val amber">142 ppb</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Why Accordion ── */
function WhyAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <div className="ho-accordion">
      {WHY_CARDS.map(({ n, title, desc }, i) => (
        <div
          key={n}
          className={`ho-acc-item ${open === i ? 'active' : ''}`}
          onClick={() => setOpen(i)}
        >
          <div className="ho-acc-header">
            <h4 className="ho-acc-title">{title}</h4>
            <span className="ho-acc-icon">{open === i ? '−' : '+'}</span>
          </div>
          <div className="ho-acc-body">
            <div className="ho-acc-body-inner">
              <p className="ho-acc-desc">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Carousel ── */
const CAROUSEL_CARDS = [
  {
    n: '01',
    title: "No waiting for lab results",
    desc: "Indro Smart monitors radon continuously, giving you real-time visibility instead of waiting weeks or months for passive test results.",
  },
  {
    n: '02',
    title: 'See changes as they happen',
    desc: 'Because radon levels shift with seasons, weather, pressure, and ventilation, Indro Smart tracks changes over time so you see the full picture.',
  },
  {
    n: '03',
    title: "Know when levels rise",
    desc: 'Indro Smart turns invisible radon risk into clear, actionable data with live readings, trends, and alerts when levels need attention.',
  },
  {
    n: '04',
    title: "Verify your system every day",
    desc: 'After mitigation is installed, Indro Smart helps confirm your system is still working properly with continuous monitoring and intelligent alerts.',
  },
]

function HomeCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState('right')

  const total = CAROUSEL_CARDS.length
  const go    = (next) => { setDir(next > active ? 'right' : 'left'); setActive(next) }
  const prev  = () => go((active - 1 + total) % total)
  const next  = () => go((active + 1) % total)

  return (
    <div className="ho-carousel">
      <div className="ho-card" key={active} data-dir={dir}>
        <h3 className="ho-card-title">{CAROUSEL_CARDS[active].title}</h3>
        <p className="ho-card-desc">{CAROUSEL_CARDS[active].desc}</p>
      </div>
      <div className="ho-controls">
        <button className="ho-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="ho-dots">
          {CAROUSEL_CARDS.map((_, i) => (
            <button key={i} className={`ho-dot ${i === active ? 'active' : ''}`} onClick={() => go(i)} aria-label={`Card ${i + 1}`} />
          ))}
        </div>
        <button className="ho-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ── Why It Matters cards ── */
const WHY_CARDS = [
  {
    n: '01',
    title: 'Passive tests can take months',
    desc: "By the time your lab results arrive, months of exposure have already happened. Indro monitors 24/7 so you're never behind.",
  },
  {
    n: '02',
    title: 'Levels change with seasons and weather',
    desc: 'Radon fluctuates based on pressure, temperature, and ventilation. A single annual test misses the full picture entirely.',
  },
  {
    n: '03',
    title: '1 in 6 Canadian homes exceed guidelines',
    desc: 'Many homeowners have no idea their home may contain elevated radon levels. Continuous monitoring replaces uncertainty with real-time visibility.',
  },
  {
    n: '04',
    title: 'Mitigation systems should be continuously verified',
    desc: "Radon mitigation is not a one-time fix. Continuous monitoring helps confirm your system is working properly over time.",
  },
]

/* ── Steps ── */
const STEPS = [
  {
    n: 1,
    title: 'Install Indro Smart',
    desc: 'Plug into your existing radon mitigation system. No complexity.',
  },
  {
    n: 2,
    title: 'Download the app',
    desc: 'Pair your device instantly and view live radon levels, air quality insights, and system status.',
  },
  {
    n: 3,
    title: 'Get alerts and insights',
    desc: 'Receive instant notifications if radon levels rise. Track trends and see how your home performs over time.',
  },
  {
    n: 4,
    title: 'Let smart control take over',
    desc: 'Indro Smart intelligently manages your mitigation system — adjusting automatically to keep levels safe.',
  },
]

/* ── Main Page ── */
function HomeownersPage() {
  const { section } = useParams()
  const [selectedOption, setSelectedOption] = useState('')
  const [formStatus, setFormStatus]         = useState(null)
  const impactRef = useRef(null)
  const options   = ['Homeowner', 'Radon professional']

  // Scroll to section on path-based navigation
  // Supports both clean URL anchors (data-anchor) and legacy IDs
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
          entry.target.querySelectorAll('.ho-impact-stat').forEach((el, i) => {
            setTimeout(() => el.classList.add('ho-impact-stat--visible'), i * 220)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (impactRef.current) observer.observe(impactRef.current)
    return () => observer.disconnect()
  }, [])

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
      setFormStatus({ type: 'success', message: 'Thank you! Your spot is reserved.' })
      form.reset(); setSelectedOption('')
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
      <section id="ho-hero">
        <div className="ho-hero-container">

          {/* Text — ORDER 2 on mobile (photo goes first) */}
          <div className="ho-hero-text-col">
            <p className="ho-eyebrow">FOR HOMEOWNERS</p>
            <h1 className="ho-hero-headline">
              Your home deserves<br />
              <em className="ho-hero-big">cleaner air.</em>
            </h1>
            <p className="ho-hero-body">
              Indro Smart continuously monitors radon levels, giving your family real-time insights and peace of mind beyond passive testing.
            </p>
            <div className="ho-hero-actions">
              <Link to="/homeowners/waitlist" className="ho-btn-primary">Join waitlist</Link>
              <Link to="/homeowners/how-it-works" className="ho-btn-link">See how it works</Link>
            </div>
          </div>

          {/* Photo — ORDER 1 on mobile */}
          <div className="ho-hero-photo-col">
            <div className="ho-hero-photo-wrap">
              <img src={familyPhoto} alt="Family enjoying a safe home" className="ho-hero-photo" />
              <div className="ho-hero-widget-overlay">
                <AirQualityWidget />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Why It Matters ── */}
      <section id="ho-flow">
        <section id="ho-why">
          <div className="ho-why-container">
            <div className="ho-why-left">
              <p className="ho-eyebrow light">WHY IT MATTERS</p>
              <h2 className="ho-why-headline">Radon doesn't announce itself.</h2>
              <p className="ho-why-sub">
                It's colourless, odourless, and the leading cause of lung cancer among non-smokers.  The only way to know is to measure it — continuously.
              </p>
            </div>
            <div className="ho-why-right">
              <WhyAccordion />
            </div>
          </div>
          
        </section>

        {/* ── Carousel ── */}
        <section id="ho-carousel">
          <div className="ho-carousel-container">
            <div className="ho-carousel-text">
              <p className="ho-eyebrow light">CONTINUOUS PROTECTION</p>
              <h2 className="ho-carousel-headline">
                One device. Always watching. <em>Always on.</em>
              </h2>
              <p className="ho-carousel-body">
                Passive radon tests give you a snapshot. Indro gives you the full picture — every hour, every day, automatically.
              </p>
            </div>
            <div className="ho-carousel-card-wrap">
              <HomeCarousel />
            </div>
          </div>
        </section>
      </section>
      {/* ── How It Works ── */}
      <section id="ho-steps" data-anchor="how-it-works">
        <div className="ho-steps-container">
          <p className="ho-eyebrow blue">HOW IT WORKS</p>
          <h2 className="ho-steps-headline">Set up in minutes. Protected continuously.</h2>
          <p className="ho-steps-sub">
            Plug in, connect, and let Indro Smart do the rest. 
          </p>
          <div className="ho-steps-grid">
            {STEPS.map(({ n, title, desc }) => (
              <div className="ho-step-card" key={n}>
                <div className="ho-step-num">{n}</div>
                <h4 className="ho-step-title">{title}</h4>
                <p className="ho-step-desc">{desc}</p>
                <div className="ho-step-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Impact ── */}
      <section id="ho-impact">
        <div className="ho-impact-container">
          <p className="ho-eyebrow light">THE IMPACT</p>
          <h2 className="ho-impact-headline">What you gain with Indro.</h2>
          <div className="ho-impact-card" ref={impactRef}>
            <div className="ho-impact-stat">
              <div className="ho-impact-number">24/7</div>
              <div className="ho-impact-label">CONTINUOUS COVERAGE</div>
              <div className="ho-impact-desc">Radon monitored around the clock — not just once a year.</div>
            </div>
            <div className="ho-impact-divider" />
            <div className="ho-impact-stat">
              <div className="ho-impact-number">&lt;5 min</div>
              <div className="ho-impact-label">SETUP TIME</div>
              <div className="ho-impact-desc">From unboxing to live monitoring in under five minutes.</div>
            </div>
            <div className="ho-impact-divider" />
            <div className="ho-impact-stat">
              <div className="ho-impact-number">Real-time</div>
              <div className="ho-impact-label">ALERTS</div>
              <div className="ho-impact-desc">Instant notifications the moment air quality changes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Join Waitlist ── */}
      <section id="ho-waitlist" data-anchor="waitlist">
        <div className="ho-waitlist-container">
          <div className="ho-waitlist-left">
            <p className="ho-eyebrow">JOIN THE WAITLIST</p>
            <h2 className="ho-waitlist-headline">Reserve your spot</h2>
            <p className="ho-waitlist-body">
              Be the first to know when Indro Smart is available in your area. We'll reach out as soon as we launch in your region.
            </p>
          </div>
          <div className="ho-waitlist-right">
            <form className="contact-card" onSubmit={handleWaitlistSubmit}>
              <div className="form-group"><label>Name *</label><input name="name" type="text" required /></div>
              <div className="form-group"><label>Email *</label><input name="email" type="email" required /></div>
              <div className="form-group"><label>City / Province (optional)</label><input name="cityProvince" type="text" /></div>
              <div className="form-group">
                <label>I am a *</label>
                <Listbox value={selectedOption} onChange={setSelectedOption}>
                  <div className="custom-select">
                    <Listbox.Button className="custom-select-button">
                      {selectedOption || 'Select an option'}<ChevronDown size={18} />
                    </Listbox.Button>
                    <Listbox.Options className="custom-select-options">
                      {options.map((o) => (
                        <Listbox.Option key={o} value={o} className="custom-select-option">{o}</Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
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

export default HomeownersPage
