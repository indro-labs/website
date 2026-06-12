import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import './About.css'
import { CheckCircle } from 'lucide-react'



/* ── FORMS ────────────────────────────────────── */
function WaitlistForm() {
  const [role, setRole] = useState('Rider')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setErr(false)

    const endpoint = import.meta.env.VITE_FORMSPREE_WAITLIST_URL
    if (!endpoint) {
      console.error('Missing Formspree endpoint')
      setErr(true)
      return
    }

    setLoading(true)

    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ name, email, role }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (r.ok) {
        setDone(true)
        setName('')
        setEmail('')
        setRole('Rider')
      } else {
        setErr(true)
      }

    } catch {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  if (done)
    return (
      <div className="form-ok">
        <CheckCircle size={18} color="var(--orange)" />
        <div>
          <p className="fok-t">You're on the list.</p>
          <p className="fok-s">We'll reach out soon.</p>
        </div>
      </div>
    )

  return (
    <form onSubmit={submit} className="the-form">
      <div className="form-row">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="role-row">
        {['Rider', 'Caregiver', 'Care facility', 'Other'].map(r => (
          <button
            key={r}
            type="button"
            className={`rchip${role === r ? ' on' : ''}`}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Submitting...' : (
          <>
            Join  waitlist
          </>
        )}
      </button>

      {err && <p className="ferr">Something went wrong — please try again.</p>}

      <p className="fnote">No spam. Updates only when it matters.</p>
    </form>
  )
}

function PartnerForm() {
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setErr(false)

    const endpoint = import.meta.env.VITE_FORMSPREE_PARTNER_URL
    if (!endpoint) {
      console.error('Missing Formspree partner endpoint')
      setErr(true)
      return
    }

    const data = Object.fromEntries(new FormData(e.currentTarget))

    setLoading(true)

    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (r.ok) {
        setDone(true)
        e.currentTarget.reset()
      } else {
        setErr(true)
      }

    } catch {
      setErr(true)
    } finally {
      setLoading(false)
    }
  }

  if (done)
    return (
      <div className="form-ok">
        <CheckCircle size={18} color="var(--orange)" />
        <div>
          <p className="fok-t">Message received.</p>
          <p className="fok-s">We'll be in touch shortly.</p>
        </div>
      </div>
    )

  return (
    <form onSubmit={submit} className="the-form">
      <div className="form-row">
        <input name="name" type="text" placeholder="Your name" required />
        <input name="org" type="text" placeholder="Organization name" required />
      </div>

      <input name="email" type="email" placeholder="Email address" required />

      <select name="type" defaultValue="">
        <option value="" disabled>Type of organization</option>
        <option>Municipal transit authority</option>
        <option>Long-term care home</option>
        <option>Disability service provider</option>
        <option>Senior living community</option>
        <option>Healthcare facility</option>
        <option>Non-profit transport</option>
        <option>Other</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell us about your service area and what you're looking for."
        rows={4}
      />

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Sending...' : (
          <>
            Become partner
          </>
        )}
      </button>

      {err && <p className="ferr">Something went wrong — please try again.</p>}
    </form>
  )
}

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
      <NavBar />

      {/* ── HERO ── */}
      <section className="ap-hero">
        <div className="ap-c">
          <p className="ap-label">Our story</p>
          <h1 className="ap-hero-h">
            A question nobody<br />could answer.
          </h1>
          <p className="ap-hero-sub">
            Indro Transit was born out of a simple, maddening gap — accessible transit riders in Calgary had no way of knowing where their ride was. We set out to fix that.
          </p>
        </div>
        <div className="ap-hero-img-wrap">
          <img src="/calgarytower.png" alt="Calgary Tower" className="ap-hero-img" />
          <div className="ap-hero-overlay" />
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="ap-section ap-origin">
        <div className="ap-c ap-origin-grid">
          <div className="ap-origin-text">
            <p className="ap-label">Where it began</p>
            <h2 className="ap-h2">Built during Calgary’s AI Bootcamp, 2025.</h2>
            <p className="ap-body">
              Our team came together at the University of Calgary's AI Bootcamp with one goal: solve a real problem for real people. 
         
            </p>
            <p className='ap-body'>     
              We chose accessible transit. Not because it was trendy, but because someone we cared about needed it.</p>
            <p className="ap-body">
              We spent months in the field before writing a single line of code. We sat with riders, spoke to care workers, and contacted healthcare workers to understand their experience.
            </p>
            <p className="ap-body">
              Every conversation — every single one — came back to the same frustration.
            </p>
            <blockquote className="ap-quote">
              "We just want to know where the ride is."
            </blockquote>
            <p className="ap-body">
              This was their current reality. No live tracking, no arrival alerts, and no way to tell an elderly woman with limited mobility whether her van was six minutes away or sixty.
            </p>
            <p className='ap-body'> That uncertainty was the gap — and it became Indro Transit.</p>
          </div>
          <div className="ap-origin-img-wrap">
            <img src="/about-image.jpg" alt="Care worker with elderly resident" className="ap-origin-img" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="ap-stats-band">
        <div className="ap-c ap-stats-grid">
          <StatCard number="55+"  label="Riders & caregivers interviewed" />
          <StatCard number="12"   label="Partner conversations underway" />
          <StatCard number="2026" label="Calgary pilot launch" />
          <StatCard number="5+"   label="Communities engaged" />
        </div>
      </div>

      {/* ── MISSION ── */}
      <section className="ap-section ap-mission">
        <div className="ap-c">
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
              <p className="ap-principle-body">Every rider deserves to know their ride is coming. Every family deserves peace of mind. That's not a feature — it's the foundation of everything we build.</p>
            </div>
            <div className="ap-principle-divider"/>
            <div className="ap-principle">
              <div className="ap-principle-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#F6901A" strokeWidth="1.5"/><path d="M14 8v6l4 2" stroke="#F6901A" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h3 className="ap-principle-title">Safety, always.</h3>
              <p className="ap-principle-body">Riders are confirmed as arrived. Families are notified automatically. Care teams always know where their clients are. No gaps, no guesswork — just quiet certainty at every step.</p>
            </div>
            <div className="ap-principle-divider"/>
            <div className="ap-principle">
              <div className="ap-principle-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="#F6901A" strokeWidth="1.5"/><path d="M10 18c0-2.2 1.8-4 4-4s4 1.8 4 4M14 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#F6901A" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h3 className="ap-principle-title">Built with, not for.</h3>
              <p className="ap-principle-body">We spent months in the field before writing a single line of code. Riders, caregivers, and operators shaped what Indro Transit is — and what it prioritises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO BREAK ── */}
      <div className="ap-photo-break">
        <img src="/pexels-raquel-hawks-22734884-7260030.jpg" alt="Caregiver helping rider" className="ap-break-img" />
        <div className="ap-break-overlay" />
        <div className="ap-break-text">
          <p className="ap-break-quote">"Starting with Calgary in 2026 — and growing across Alberta, one community at a time."</p>
        </div>
      </div>

      {/* ── PRESS ── */}
      <section className="ap-section ap-press">
        <div className="ap-c">
          <p className="ap-label">In the news & community</p>
          <div className="ap-press-grid">
            {[
              { tag: 'Feature',  outlet: 'UCalgary News',    title: 'AI Bootcamp helps students design their own futures',      desc: 'UCalgary featured the Indro Transit team\'s work on accessible transit technology for southern Alberta.',           href: 'https://www.ucalgary.ca/news/ai-bootcamp-helps-students-design-their-own-futures' },
              { tag: 'Video',    outlet: 'Instagram · Reel', title: 'Indro Transit — what we\'re building and why',   desc: 'A short video introduction to Indro Transit and the problem we’re solving for accessible transportation across Alberta.',       href: 'https://www.instagram.com/p/DY7hX7HNP28/' },
              
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


            {/* CTA */}
      <section className="ap-cta bg-tint">
        <div className="c cta-grid">
          <div id="waitlist" className="cta-col">
            <p className="label">For riders &amp; families</p>
            <h2 className="ap-cta-h">Join the waitlist.</h2>
            <p className="ap-cta-sub">Be among the first when we launch in your community.</p>
            <WaitlistForm />
          </div>
          <div className="cta-divider" />
          <div id="partner" className="cta-col">
            <p className="label">For communities &amp; operators</p>
            <h2 className="ap-cta-h">Partner with us.</h2>
            <p className="ap-cta-sub">Operating transit in Alberta? Let's talk.</p>
            <PartnerForm />
          </div>
        </div>
      </section>
      

      {/* ── FOOTER ── */}
      <footer className="ap-footer">
        <div className="ap-c ap-footer-inner">
          <Link to="/" className="ap-footer-brand">
            <img src="/orange-transparent.png" alt="Indro Transit" className="ap-footer-logo" />
          </Link>
          <nav className="ap-footer-nav">
            <Link to="/">Home</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#where">Coverage</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="ap-footer-right">
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
              </a>
              <a href="mailto:info@indrolabs.ca" className="footer-social-link" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </a>
            </div>
            <p className="ap-footer-copy">© 2026 Indro Transit · Calgary, Alberta</p>
          </div>
        </div>
      </footer>
    </>
  )
}
