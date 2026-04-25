
import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import heroVideo from './assets/hero_video.mp4'
import aboutImage from './assets/about_image.jpg'

function App() {

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

        {/* Overlay */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-pill">
            Radon Mitigation Technology
          </div>
          <h1>The Future of Radon Mitigation Systems</h1>
          <p>
            Indro Labs delivers integrated hardware and software solutions for continuous radon monitoring, automated mitigation, and compliance management.
          </p>
        </div>

      </section>


      {/* About */}
      <section id="about-section">
        {/* Left Side */}
        <div className="about-text">

          <h2>About Indro Labs</h2>

          <p>
            Indro Labs is building the next generation of intelligent radon mitigation systems through integrated hardware, cloud monitoring, and AI-powered automation. 
          </p>
          <p>
            Our mission is to modernize indoor air safety with smarter environmental technology that protects homes and simplifies operations for radon professionals.
          </p>

        </div>

        {/* Right Side */}
        <div className="about-image-container">
          <img src={aboutImage} alt="About Indro Labs" />
          <div className="about-image-overlay"></div>
        </div>

      </section>

      <section id="services-section"></section>

      <section id="technology-section"></section>

      <section id="contact-section"></section>
    </>
  )
}

export default App
