
import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import heroVideo from './assets/hero_video.mp4'
import aboutImage from './assets/about_image.jpg'
import { Activity, Bell, BarChart3 } from 'lucide-react'
import { useEffect, useRef } from 'react'

function App() {
const aboutRef = useRef(null)
useEffect(() => {

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
    },
    {
      threshold: 0.2,
    }
  )

  if (aboutRef.current) {
    observer.observe(aboutRef.current)
  }

  return () => {
    if (aboutRef.current) {
      observer.unobserve(aboutRef.current)
    }
  }

}, [])
  return (
    <>
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

      <section id="services-section"></section>

      <section id="technology-section"></section>

      <section id="contact-section"></section>
    </>
  )
}

export default App
