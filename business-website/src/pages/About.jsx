import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetInTouch } from '../components/sections'
import './About.css'

/* ── Animated stat ── */
function StatCard({ number, label }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`astat-card${vis ? ' in' : ''}`}>
      <p className="astat-n">{number}</p>
      <p className="astat-l">{label}</p>
    </div>
  )
}

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="c">
          <p className="ap-label">Our story</p>
          <h1 className="ap-hero-h">
            A question nobody<br />could answer.
          </h1>
          <p className="ap-hero-sub">
            Indro Transit was born out of a simple, maddening gap — accessible transit riders in Calgary had no way of knowing where their ride was. We set out to fix that.
          </p>
        </div>
        <div className="ap-hero-img-wrap">
          <img src="/images/about/calgarytower.png" alt="Calgary Tower" className="ap-hero-img" />
          <div className="ap-hero-overlay" />
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="ap-section ap-origin">
        <div className="c ap-origin-grid">
          <div className="ap-origin-text">
            <p className="ap-label">Where it began</p>
            <h2 className="ap-h2">Started at UCalgary. Built with the people who actually use it.</h2>
            <p className="ap-body">
              Our team came together at the University of Calgary's AI Bootcamp in 2025 with one goal: solve a real problem for real people. We chose accessible transit because someone we cared about needed it.
            </p>
            <p className="ap-body">
              We spent months in the field before writing a line of code — sitting with riders, talking to care workers, and speaking with the staff who coordinate transportation every day. Every single conversation came back to the same frustration.
            </p>
            <blockquote className="ap-quote">
              "We just want to know where the ride is."
            </blockquote>
            <p className="ap-body">
              That was the gap. That became Indro.
            </p>
          </div>
          <div className="ap-origin-img-wrap">
            <img src="/images/about/care-team.jpg" alt="Care worker with elderly resident" className="ap-origin-img" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="ap-stats-band">
        <div className="c ap-stats-grid">
          <StatCard number="55+"  label="Riders & caregivers interviewed" />
          <StatCard number="12"   label="Partner conversations underway" />
          <StatCard number="2026" label="Calgary pilot launch" />
          <StatCard number="5+"   label="Communities engaged" />
        </div>
      </div>

      {/* ── MISSION ── */}
      <section className="ap-section ap-mission">
        <div className="c">
          <div className="ap-mission-header">
            <p className="ap-label">What we're building toward</p>
            <h2 className="ap-h2">Transit that doesn't<br />leave anyone behind.</h2>
            <p className="ap-mission-intro">
              Accessible transit in Canada is underfunded, fragmented, and invisible to the families who depend on it most. We're building the software layer that changes that — connecting riders, operators, and care teams so that getting somewhere safely stops being a source of anxiety.
            </p>
          </div>

          <div className="ap-principles">
            <div className="ap-principle">
              <div className="ap-principle-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#F6901A" strokeWidth="1.5"/><path d="M9 14.5l3.5 3.5 6.5-7" stroke="#F6901A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="ap-principle-title">Dignity first.</h3>
              <p className="ap-principle-body">Every rider deserves to know their ride is coming — and every family deserves peace of mind without making a single phone call.</p>
            </div>
            <div className="ap-principle-divider"/>
            <div className="ap-principle">
              <div className="ap-principle-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#F6901A" strokeWidth="1.5"/><path d="M14 8v6l4 2" stroke="#F6901A" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h3 className="ap-principle-title">Safety, always.</h3>
              <p className="ap-principle-body">Automatic confirmations and notifications at every step of the trip — no gaps, no guesswork, just quiet certainty.</p>
            </div>
            <div className="ap-principle-divider"/>
            <div className="ap-principle">
              <div className="ap-principle-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#F6901A" strokeWidth="1.5"/><path d="M10 18c0-2.2 1.8-4 4-4s4 1.8 4 4M14 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#F6901A" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 className="ap-principle-title">Built with, not for.</h3>
              <p className="ap-principle-body">We spent months with riders, caregivers, and operators before writing a single line of code — their needs shaped everything.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM PHOTO + VISION ── */}
      <div className="ap-photo-break">
        <img src="/brand/groupphoto.jpeg" alt="The Indro Transit team" className="ap-break-img" />
        <div className="ap-break-overlay" />
        <div className="ap-break-text">
          <p className="ap-break-quote">"We're building a world where no one is left waiting at the curb, wondering if their ride is coming."</p>
          <p className="ap-break-by">— The Indro Transit team · Calgary</p>
        </div>
      </div>

      {/* ── PRESS ── */}
      <section className="ap-section ap-press">
        <div className="c">
          <p className="ap-label">In the news & community</p>
          <div className="ap-press-grid">
            {[
              { tag: 'Feature',  outlet: 'UCalgary News',    title: 'AI Bootcamp helps students design their own futures',      desc: 'UCalgary featured the Indro Transit team\'s work on accessible transit technology for southern Alberta.',           href: 'https://www.ucalgary.ca/news/ai-bootcamp-helps-students-design-their-own-futures' },
              { tag: 'Video',    outlet: 'Instagram · Reel', title: "Indro Transit — what we're building and why",   desc: "A short video introduction to Indro Transit and the problem we're solving for accessible transportation across Alberta.",       href: 'https://www.instagram.com/p/DY7hX7HNP28/' },
              
            ].map(a => (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className="ap-press-card">
                <div className="ap-press-top">
                  <span className="ap-press-tag">{a.tag}</span>
                  <span className="ap-press-outlet">{a.outlet}</span>
                </div>
                <p className="ap-press-title">{a.title}</p>
                <p className="ap-press-desc">{a.desc}</p>
                <span className="ap-press-link">Read more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* ── HIRING ── */}
      <section className="ap-section ap-hiring">
        <div className="c ap-hiring-inner">
          <div className="ap-hiring-text">
            <p className="ap-label">Join the team</p>
            <h2 className="ap-h2">We're a small team with a big mission, and we're hiring.</h2>
            <p className="ap-body">If you care about building technology that gives people dignity, independence, and peace of mind, we'd love to meet you. We hire for heart as much as for skill — and there's a lot to build.</p>
          </div>
          <div className="ap-hiring-cta">
            <Link to="/contact" className="btn-primary">Get in touch</Link>
            <a href="mailto:info@indrolabs.ca" className="ap-hiring-mail">info@indrolabs.ca</a>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  )
}
