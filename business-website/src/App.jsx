
import NavBar from './components/NavBar/NavBar'
import './App.css'
import heroVideo from './assets/hero_video.mp4'
import heroPoster from './assets/hero_poster.jpg'
import aboutImage from './assets/about_image.jpg'
import { Activity, Bell, BarChart3, Gauge, TriangleAlert, BriefcaseBusiness, House,ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Listbox } from '@headlessui/react'


function App() {

const aboutRef = useRef(null)
const missionRef = useRef(null)
const solutionsRef = useRef(null)
const pilotRef = useRef(null)

const options = [
  'Homeowner',
  'Radon professional'
]

const [selectedOption, setSelectedOption] = useState('')
const [formStatus, setFormStatus] = useState(null)

const handleWaitlistSubmit = async (e) => {
  e.preventDefault()

  const form = e.currentTarget

  if (!selectedOption) {
    setFormStatus({
        type: "error",
        message: "Please selet an option."
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

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    },
    { threshold: 0.2 }
  )

  if (aboutRef.current) observer.observe(aboutRef.current)
  if (missionRef.current) observer.observe(missionRef.current)
  if (solutionsRef.current) observer.observe(solutionsRef.current)
  if (pilotRef.current) observer.observe(pilotRef.current)

  return () => {
    if (aboutRef.current) observer.unobserve(aboutRef.current)
    if (missionRef.current) observer.unobserve(missionRef.current)
    if (solutionsRef.current) observer.unobserve(solutionsRef.current)
    if (pilotRef.current) observer.unobserve(pilotRef.current)
  }
}, [])
  return (
    <>
      {formStatus && (
        <div className={`toast ${formStatus.type}`}>
          <p>{formStatus.message}</p>

          <button onClick={() => setFormStatus(null)}>
            ×
          </button>
        </div>
      )}
      {/* Navbar */}
      <div className="bg-white">
        <NavBar />
      </div>


      {/* Hero */}
      <section id="center">

        {/* Background Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-pill">
            Radon Mitigation Technology
          </div>
          <h1>The Future of Radon Mitigation Systems</h1>
          <p>
            Indro Labs delivers integrated hardware and software solutions for continuous radon monitoring, automated mitigation, and compliance management.
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <Activity className="hero-feature-icon" />
              <span>Continuous monitoring</span>
            </div>

            <div className="hero-feature">
              <Bell className="hero-feature-icon" />
              <span>Early alerts</span>
            </div>

            <div className="hero-feature">
              <BarChart3 className="hero-feature-icon" />
              <span>Clear reporting</span>
            </div>
          </div>
        </div>
      </section>
    
      <div id="padding-top"></div>

      {/* About */}
      <section
          id="about-section"
          ref={aboutRef}
          className="fade-up"
        >
        {/* Left Side */}
        <div className="about-text">
          <h2>
            About <span className="accent-text">Indro Labs</span>
          </h2>
          <p>
            Indro Labs is building the next generation of intelligent radon mitigation systems through integrated hardware, cloud monitoring, and AI-powered automation. 
          </p>
          <p>
            Our mission is to modernize indoor air safety with smarter environmental technology that protects homes and simplifies operations for radon professionals.
          </p>
        </div>

        {/* Right Side */}
        <div className="about-image-container">
          <div className="about-image-card">
            <img src={aboutImage} alt="About Indro Labs" />
            <div className="about-image-overlay"></div>
          </div>
        </div>
      </section>

      <div id="padding-top"></div>

      {/* Mission */}
      <section
          id="mission-section"
          ref={missionRef}
          className="fade-up"
        >
        <div className="mission-container">
          <h2>Why monitoring matters</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Activity size={22} />
              </div>
              <h3>Radon levels can change</h3>
              <p>
                Environmental factors, weather patterns, and home modifications can drastically affect radon levels over time.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <Gauge size={22} />
              </div>
              <h3>Systems can drift</h3>
              <p>
                Mitigation fans and systems may lose effectiveness or fail completely without regular monitoring and maintenance.
              </p>
            </div>

            <div className="mission-card">
              <div className="mission-icon">
                <TriangleAlert size={22} />
              </div>
              <h3>Issues found late</h3>
              <p>
                Without continuous monitoring, dangerous exposure levels may go undetected for months until the next manual test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section
          id="solutions-section"
          ref={solutionsRef}
          className="fade-up"
        >
        <div className="solutions-container">
          <h2>Who it's for</h2>

          <div className="solutions-grid">
            <div className="solutions-card">
              <div className="solutions-title">
                <BriefcaseBusiness className="solutions-title-icon" />
                <h3>Radon professionals</h3>
              </div>
              <ul>
                <li>Faster diagnostics with real-time system visibility</li>
                <li>Fewer reactive calls through early warnings</li>
                <li>Client-ready reports that are easy to understand</li>
              </ul>
            </div>

            <div className="solutions-card">
              <div className="solutions-title">
                <House className="solutions-title-icon" />
                <h3>Homeowners</h3>
              </div>
              <ul>
                <li>Peace of mind your home stays protected</li>
                <li>Clear radon status, trends, and system performance</li>
                <li>Instant alerts when something changes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Section */}
      <section id="pilot-section" ref={pilotRef} className="fade-up">
        <div className="pilot-container">
          <h2>Currently in pilot</h2>
          <p>
            Indro Labs is currently in pilot development and actively exploring partnerships with industry professionals interested in collaborating on early deployments and validation.
          </p>
        </div>
      </section>


      {/* Contact */}
      <section id="contact-section">
        <div className="contact-container">
          <h2>Get updates</h2>
          <p className="contact-intro">
            Join the waitlist or contact us to discuss partnership opportunities.
          </p>

          {/* Waitlist */}
          <div className="contact-grid">
            <form
                className="contact-card"
                onSubmit={handleWaitlistSubmit}
              >
              <h3>Join the Waitlist</h3>
              <p>Be the first to know when we launch.</p>

              <div className="form-group">
                <label>Name *</label>
                <input name="name" type="text" required/>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" required/>
              </div>
              <div className="form-group">
                <label>City/Province (optional)</label>
                <input name="cityProvince" type="text"  />
              </div>
              
              <div className="form-group">
                <label>I am a *</label>

                <Listbox
                  value={selectedOption}
                  onChange={setSelectedOption}
                >
                  <div className="custom-select">

                    <Listbox.Button className="custom-select-button">
                      {selectedOption || 'Select an option'}

                      <ChevronDown size={18} />
                    </Listbox.Button>

                    <Listbox.Options className="custom-select-options">

                      {options.map((option) => (
                        <Listbox.Option
                          key={option}
                          value={option}
                          className="custom-select-option"
                        >
                          {option}
                        </Listbox.Option>
                      ))}

                    </Listbox.Options>

                  </div>
                </Listbox>
               
              </div>

              <button className="submit-button waitlist-submit-button" type="submit">Join Waitlist</button>
            </form>

            {/* Partner */}
            <form
                className="contact-card"
                onSubmit={handlePartnerSubmit}
              >
              <h3>Partner with Us</h3>
              <p>For industry professionals and organizations.</p>
              <div className="form-group">
                <label>Company (optional)</label>
                <input name="company" type="text"/>
              </div>
              <div className="form-group">
                <label>Name *</label>
                <input name="name" type="text" required/>
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" required/>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" required
                ></textarea>
              </div>
              <button className="submit-button partner-submit-button" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-container">

          <div className="footer-column">
            <h4>Indro Labs</h4>
            <p>Continuous radon protection monitoring</p>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <p>info@indrolabs.ca</p>
          </div>

          <div className="footer-column">
            <h4>Location</h4>
            <p>Alberta, Canada</p>
          </div>

        </div>

        <div className="footer-bottom">
          Copyright © 2026 Indro labs - All Rights Reserved.
        </div>

      </footer>
    </>
  )
}

export default App
