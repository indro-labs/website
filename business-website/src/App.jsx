
import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'

function App() {

  return (
    <>
      <div className="bg-white">
        <NavBar />
      </div>
      <section id="center">
        <div>
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
