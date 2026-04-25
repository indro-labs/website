
import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import heroVideo from './assets/hero_video.mp4'

function App() {

  return (
    <>
      {/* Navbar */}
      <div className="bg-white">
        <NavBar />
      </div>
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

      <section id="spacer"></section>

    </>
  )
}

export default App
