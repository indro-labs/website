import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { Listbox } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import aboutPhoto from '../assets/about_image.jpg'
import '../../App.css'
import './AboutPage.css'

/* ── Principles Carousel — arrows, looping, horizontal slide ── */
const PRINCIPLES = [
  {
    title: 'Continuous over periodic',
    desc: "A single snapshot test doesn't reflect how radon actually behaves. It fluctuates with pressure, seasons, and ventilation. We built for always-on monitoring because safety shouldn't have an expiry date.",
  },
  {
    title: 'Data that drives action',
    desc: "A reading is only valuable if it leads somewhere. Indro turns raw sensor data into clear insights, real-time alerts, and automated responses — so people and professionals can act, not just observe.",
  },
  {
    title: 'Built for the real world',
    desc: "Whether you're a homeowner or a professional managing dozens of properties, Indro fits your existing workflow. No new complexity — just smarter monitoring on top of what's already there.",
  },
  {
    title: 'Accessible without compromise',
    desc: "Protecting indoor air quality has historically required specialist knowledge and expensive equipment. We're building technology that removes those barriers without sacrificing accuracy or reliability.",
  },
]

function PrinciplesCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState('right')

  const total = PRINCIPLES.length
  const go    = (i) => { setDir(i > active ? 'right' : 'left'); setActive(i) }
  const prev  = () => go((active - 1 + total) % total)
  const next  = () => go((active + 1) % total)

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setDir('right')
      setActive(p => (p + 1) % total)
    }, 3600)
    return () => clearInterval(t)
  }, [])

  const p = PRINCIPLES[active]

  return (
    <div className="ab-carousel">
      <div className="ab-carousel-card" key={active} data-dir={dir}>
        <h3 className="ab-carousel-title">{p.title}</h3>
        <p className="ab-carousel-desc">{p.desc}</p>
      </div>
      <div className="ab-carousel-controls">
        <button className="ab-carousel-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="ab-carousel-dots">
          {PRINCIPLES.map((_, i) => (
            <button
              key={i}
              className={`ab-carousel-dot ${i === active ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Principle ${i + 1}`}
            />
          ))}
        </div>
        <button className="ab-carousel-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

/* ── Main Page ── */
function AboutPage() {
  const { section } = useParams()
  const [selectedOption, setSelectedOption] = useState('')
  const [formStatus, setFormStatus]         = useState(null)
  const options = ['Homeowner', 'Radon professional']

  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const el = document.querySelector(`[data-anchor="${section}"]`) || document.getElementById(section)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    }
  }, [section])

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

  const handlePartnerSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const response = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
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

      {/* ── Hero ── */}
      <section id="ab-hero">
        <div className="ab-hero-inner">
          <p className="ab-eyebrow">ABOUT INDRO LABS</p>
          <h1 className="ab-hero-headline">
            The air inside your building<br />
            is <em>telling you something.</em><br />
            We make sure you hear it.
          </h1>
        </div>
      </section>

      {/* ── Post-hero body — wrapped for mobile flex ordering ── */}
      <div className="ab-page-body">

        {/* ── Fade bridge ── */}
        <div className="ab-fade-bridge" />

        {/* ── Photo break (desktop: after mission; mobile: after hero via CSS order) ── */}
        <section id="ab-photo-break" className="ab-photo-section">
          <div className="ab-photo-wrap">
            <img src={aboutPhoto} alt="Indro Labs" className="ab-photo" />
            <div className="ab-photo-caption">
              Building the next generation of indoor air safety technology. Alberta, Canada.
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section id="ab-mission" data-anchor="mission" className="ab-mission-section">
          <div className="ab-mission-container">
            <div className="ab-mission-left">
              <p className="ab-label">OUR MISSION</p>
              <h2 className="ab-mission-headline">
                Indoor air quality has a data problem. We're fixing it.
              </h2>
            </div>
            <div className="ab-mission-right">
              <p className="ab-body">
                Radon is the second leading cause of lung cancer — yet most buildings have never been continuously monitored for it. Existing detection methods were designed for a world before real-time data: passive, slow, and reactive by design.
              </p>
              <p className="ab-body">
                Indro Labs is building intelligent indoor environmental monitoring technology that changes this. We make continuous, proactive air quality management accessible — to the homeowner protecting their family, and the professional managing dozens of properties.
              </p>
              <p className="ab-body">
                We believe the buildings people live and work in should be intelligent enough to protect them. Not occasionally. Continuously.
              </p>
            </div>
          </div>
        </section>

        {/* ── How We Think — carousel ── */}
        <section id="ab-principles" data-anchor="how-we-think">
          <div className="ab-principles-container">
            <div className="ab-principles-header">
              <p className="ab-label">HOW WE THINK</p>
              <h2 className="ab-principles-headline">Principles that guide everything we build.</h2>
            </div>
            <PrinciplesCarousel />
          </div>
        </section>

      </div>{/* end ab-page-body */}

      {/* ── Where We Are — half divide ── */}
      <section id="ab-location" data-anchor="where-we-are">
        <div className="ab-location-left">
          <div className="ab-location-left-inner">
            <p className="ab-label ab-label-blue">WHERE WE ARE</p>
            <h2 className="ab-location-headline">Based in Alberta.<br />Building for everywhere.</h2>
            <p className="ab-body ab-body-dark">
              Radon is a global problem. Canada has some of the highest radon exposure rates in the world — Alberta especially. We started here because the problem is acute and personal. We're building for a world where every building, everywhere, can be continuously protected.
            </p>
          </div>
        </div>
        <div className="ab-location-right">
          <div className="ab-location-right-inner">
            <div className="ab-stat">
              <div className="ab-stat-num">21k</div>
              <div className="ab-stat-label">Deaths per year in the U.S. from radon-induced lung cancer</div>
            </div>
            <div className="ab-stat-divider" />
            <div className="ab-stat">
              <div className="ab-stat-num">1 in 15</div>
              <div className="ab-stat-label">Homes in the U.S. exceed actionable radon levels</div>
            </div>
            <div className="ab-stat-divider" />
            <div className="ab-stat">
              <div className="ab-stat-num">&lt;1%</div>
              <div className="ab-stat-label">Of homes are continuously monitored for indoor air quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Forms ── */}
      <section id="ab-contact" data-anchor="contact">
        <div className="contact-container">
          <p className="ab-label ab-label-center ab-label-blue">GET IN TOUCH</p>
          <h2 className="contact-heading">Ready to work together?</h2>
          <p className="contact-intro">Join our waitlist or reach out to discuss partnership opportunities.</p>
          <div className="contact-grid">

            <form className="contact-card" onSubmit={handleWaitlistSubmit}>
              <h3>Join the waitlist</h3>
              <p>Be the first to know when we launch.</p>
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
                      {options.map(o => (
                        <Listbox.Option key={o} value={o} className="custom-select-option">{o}</Listbox.Option>
                      ))}
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

export default AboutPage
