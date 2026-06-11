import { useState, useEffect, useRef } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { ArrowRight, CheckCircle } from 'lucide-react'

/* ── HERO CAROUSEL ────────────────────────────── */
const SLIDES = [
  { src: '/pexels-raquel-hawks-22734884-7260030.jpg', alt: 'Caregiver helping elderly woman out of van' },
  { src: '/pexels-jsme-mila-523821574-18429374.jpg',  alt: 'Care worker with elderly resident' },
  { src: '/pexels-bertellifotografia-13871043.jpg',    alt: 'Senior couple smiling outdoors' },
  { src: '/pexels-tima-miroshnichenko-5591283.jpg',   alt: 'Transit driver assisting passenger' },
]

function HeroCarousel() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="carousel-wrap">
      {SLIDES.map((s, i) => (
        <div key={i} className={`carousel-slide${i === active ? ' active' : ''}`}>
          <img src={s.src} alt={s.alt} className="carousel-img" />
        </div>
      ))}
    </div>
  )
}

/* ── ALBERTA REGIONS MAP ─────────────────────────
   viewBox 0 0 400 560
   x = (120 - lon) / 10 * 380 + 10
   y = (60  - lat) / 11 * 540 + 10
──────────────────────────────────────────────── */
const AB_REGIONS = [
  {
    id: 'north',
    name: 'Northern Alberta',
    status: 'future',
    tag: 'Future expansion',
    cities: ['Fort McMurray', 'Peace River', 'Grande Prairie', 'High Level'],
    services: ['Planning underway'],
    desc: 'Service expansion into Northern Alberta communities is in the planning phase.',
    path: 'M 58,10 L 390,10 L 390,206 L 48,206 L 54,100 Z',
    labelX: 200, labelY: 108,
    pins: [{ name: 'Ft McMurray', cx: 318, cy: 168 }],
  },
  {
    id: 'edmonton',
    name: 'Edmonton Region',
    status: 'soon',
    tag: 'Launching 2027',
    cities: ['Edmonton', 'St. Albert', 'Leduc', 'Spruce Grove', 'Sherwood Park'],
    services: ['Paratransit', 'On-demand'],
    desc: 'Paratransit and on-demand service launches across the Edmonton Capital Region in 2027.',
    path: 'M 48,206 L 390,206 L 390,353 L 38,353 L 42,280 Z',
    labelX: 195, labelY: 278,
    pins: [{ name: 'Edmonton', cx: 242, cy: 324 }],
  },
  {
    id: 'central',
    name: 'Central Alberta',
    status: 'soon',
    tag: 'Launching 2027',
    cities: ['Red Deer', 'Lacombe', 'Innisfail', 'Sylvan Lake'],
    services: ['Microtransit', 'On-demand'],
    desc: 'Central Alberta expansion starts with Red Deer in 2027.',
    path: 'M 38,353 L 390,353 L 390,427 L 30,427 L 34,390 Z',
    labelX: 192, labelY: 394,
    pins: [{ name: 'Red Deer', cx: 231, cy: 387 }],
  },
  {
    id: 'calgary',
    name: 'Calgary Metro',
    status: 'serving',
    tag: 'Active now',
    cities: ['Calgary', 'Airdrie', 'Okotoks', 'Cochrane', 'Chestermere'],
    services: ['Paratransit', 'Microtransit', 'On-demand'],
    desc: 'Full-service coverage across the greater Calgary area — live and expanding.',
    path: 'M 30,427 L 390,427 L 390,500 L 22,500 L 26,465 Z',
    labelX: 185, labelY: 467,
    pins: [
      { name: 'Calgary', cx: 221, cy: 455 },
      { name: 'Airdrie', cx: 223, cy: 443 },
    ],
  },
  {
    id: 'south',
    name: 'Southern Alberta',
    status: 'soon',
    tag: 'Future expansion',
    cities: ['Lethbridge', 'Medicine Hat', 'Brooks', 'Taber'],
    services: ['On-demand', 'Paratransit'],
    desc: 'Southern Alberta communities are on the expansion roadmap.',
    path: 'M 22,500 L 390,500 L 390,552 L 36,552 Z',
    labelX: 192, labelY: 530,
    pins: [
      { name: 'Lethbridge',   cx: 266, cy: 516 },
      { name: 'Medicine Hat', cx: 346, cy: 510 },
    ],
  },
]

function RegionMap({ onHover }) {
  const [active, setActive] = useState(null)
  const enter = r => { setActive(r); onHover(r) }
  const leave = ()  => { setActive(null); onHover(null) }

  return (
    <div className="ab-wrap">
      <svg viewBox="0 0 400 560" className="ab-svg" aria-label="Interactive map of Alberta regions">
        {AB_REGIONS.map(r => {
          const isActive = active?.id === r.id
          const serving  = r.status === 'serving'
          return (
            <g key={r.id} onMouseEnter={() => enter(r)} onMouseLeave={leave} style={{ cursor: 'pointer' }}>
              <path
                d={r.path}
                fill={
                  isActive
                    ? serving ? 'rgba(246,144,26,0.28)' : 'rgba(100,116,139,0.20)'
                    : serving ? 'rgba(246,144,26,0.10)' : '#EDE9E1'
                }
                stroke={isActive ? (serving ? '#F6901A' : '#94A3B8') : '#D4CEC6'}
                strokeWidth={isActive ? 1.8 : 1}
                style={{ transition: 'fill 0.22s ease, stroke 0.22s ease' }}
              />
              <text x={r.labelX} y={r.labelY} textAnchor="middle"
                fontSize="9" fontFamily="DM Sans, sans-serif" fontWeight="600"
                fill={isActive ? (serving ? '#B86200' : '#475569') : '#A09A92'}
                style={{ pointerEvents: 'none', transition: 'fill 0.22s' }}>
                {r.name}
              </text>
            </g>
          )
        })}

        {/* City pins */}
        {AB_REGIONS.flatMap(r => r.pins.map(p => (
          <g key={p.name} style={{ pointerEvents: 'none' }}>
            <circle cx={p.cx} cy={p.cy} r={r.status === 'serving' ? 4 : 3}
              fill={r.status === 'serving' ? '#F6901A' : '#B0AAA2'}
              stroke="white" strokeWidth="1.5" />
          </g>
        )))}

        {/* Province outer border */}
        <path d="M 58,10 L 390,10 L 390,552 L 36,552 L 22,500 L 26,465 L 30,427 L 34,390 L 38,353 L 42,280 L 48,206 L 54,100 Z"
          fill="none" stroke="#C4BCB2" strokeWidth="1.5" strokeLinejoin="round"
          style={{ pointerEvents: 'none' }} />
      </svg>
    </div>
  )
}

function WhereWeOperate() {
  const [hovered, setHovered] = useState(null)
  const r = hovered

  return (
    <section id="where" className="where-section">
      <div className="where-inner">
        <div className="where-grid">

          {/* Left panel — updates on hover */}
          <div className="where-panel">
            {r ? (
              <div className="where-detail-view" key={r.id}>
                <span className={`where-status-badge ${r.status}`}>
                  {r.status === 'serving' ? '● Active now' : r.tag}
                </span>
                <h2 className="where-region-name">{r.name}</h2>
                <p className="where-region-desc">{r.desc}</p>

                <div className="where-info-block">
                  <p className="where-info-label">Cities</p>
                  <div className="where-chips">
                    {r.cities.map(c => <span key={c} className="where-chip">{c}</span>)}
                  </div>
                </div>

                <div className="where-info-block">
                  <p className="where-info-label">Services</p>
                  <div className="where-chips">
                    {r.services.map(s => <span key={s} className={`where-chip svc ${r.status}`}>{s}</span>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="where-default-view">
                <p className="label">Where we operate</p>
                <h2 className="where-title">Built for Calgary.<br/>Expanding across Alberta.</h2>
                <p className="where-sub">We're live across the greater Calgary area and expanding north, south, and east. Hover a region on the map to explore.</p>
                <div className="where-legend">
                  <span className="legend-item">
                    <span className="legend-pip serving" />Active now
                  </span>
                  <span className="legend-item">
                    <span className="legend-pip soon" />Coming soon
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right — map */}
          <div className="where-map-col">
            <RegionMap onHover={setHovered} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TICKER ───────────────────────────────────── */
const TICKER_CITIES = ['Calgary','Airdrie','Okotoks','Cochrane','Chestermere','High River','Strathmore','Didsbury','Olds','Red Deer','Innisfail','Crossfield']
function CityTicker() {
  const items = [...TICKER_CITIES, ...TICKER_CITIES]
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">Coming soon to communities across Alberta</div>
      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {items.map((c, i) => <span key={i} className="ticker-item">{c}</span>)}
        </div>
      </div>
    </div>
  )
}

/* ── ANIMATED STAT ────────────────────────────── */
function StatCard({ number, label }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`stat-card${vis ? ' in' : ''}`}>
      <p className="stat-n">{number}</p>
      <p className="stat-l">{label}</p>
    </div>
  )
}

/* ── FORMS ────────────────────────────────────── */
function WaitlistForm() {
  const [role, setRole] = useState('Rider')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const submit = async e => {
    e.preventDefault(); setErr(false)
    try {
      const r = await fetch(import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/placeholder', {
        method: 'POST', body: JSON.stringify({ name, email, role }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      r.ok ? setDone(true) : setErr(true)
    } catch { setErr(true) }
  }
  if (done) return <div className="form-ok"><CheckCircle size={18} color="var(--orange)" /><div><p className="fok-t">You're on the list.</p><p className="fok-s">We'll reach out soon.</p></div></div>
  return (
    <form onSubmit={submit} className="the-form">
      <div className="form-row">
        <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="role-row">
        {['Rider', 'Caregiver', 'Care facility', 'Other'].map(r => (
          <button key={r} type="button" className={`rchip${role === r ? ' on' : ''}`} onClick={() => setRole(r)}>{r}</button>
        ))}
      </div>
      <button type="submit" className="btn-primary w-full">Join the waitlist <ArrowRight size={14} /></button>
      {err && <p className="ferr">Something went wrong — please try again.</p>}
      <p className="fnote">No spam. Updates only when it matters.</p>
    </form>
  )
}

function PartnerForm() {
  const [done, setDone] = useState(false)
  const [err, setErr] = useState(false)
  const submit = async e => {
    e.preventDefault(); setErr(false)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const r = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL || 'https://formspree.io/f/placeholder', {
        method: 'POST', body: JSON.stringify(data),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      r.ok ? setDone(true) : setErr(true)
    } catch { setErr(true) }
  }
  if (done) return <div className="form-ok"><CheckCircle size={18} color="var(--orange)" /><div><p className="fok-t">Message received.</p><p className="fok-s">We'll be in touch shortly.</p></div></div>
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
      <textarea name="message" placeholder="Tell us about your service area and what you're looking for." rows={4} />
      <button type="submit" className="btn-primary w-full">Send message <ArrowRight size={14} /></button>
      {err && <p className="ferr">Something went wrong — please try again.</p>}
    </form>
  )
}

/* ── APP ──────────────────────────────────────── */
export default function App() {
  return (
    <>
      <NavBar />

      {/* HERO */}
      <section id="top" className="hero">
        <div className="c hero-inner">
          <div className="hero-text">
            <h1 className="hero-h1">Transit that meets<br />people <em>where they are.</em></h1>
            <p className="hero-sub">The software platform behind paratransit, microtransit, and on-demand rides across southern Alberta — simple, dignified, and reliable.</p>
            <div className="hero-actions">
              <a href="#waitlist" className="btn-primary">Join the waitlist</a>
              <a href="#partner" className="btn-ghost">Partner with us <ArrowRight size={14} /></a>
            </div>
          </div>
          <div className="hero-media">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <CityTicker />

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="c">
          <div className="section-head">
            <p className="label">What we offer</p>
            <h2 className="section-title">Three ways we move people.</h2>
          </div>
          <div className="cards-3">
            {[
              { img: '/on-demandservices.jpg', tag: 'On-demand', title: 'Rides when you need them.', desc: 'Request a ride on your schedule. No fixed routes — just flexible, point-to-point service that fits your life.' },
              { img: '/microtransit.jpeg', tag: 'Microtransit', title: 'Shared rides. Smarter routes.', desc: 'Efficient shared-ride service for communities between cities. Affordable, frequent, and fully trackable.' },
              { img: '/paratransit.jpeg', tag: 'Paratransit', title: 'Calgary Transit Access — powered by Indro.', desc: "The city's accessible transit service, now with real-time tracking, arrival alerts, and caregiver visibility." },
            ].map(c => (
              <div key={c.tag} className="svc-card">
                <div className="svc-img-wrap">
                  <img src={c.img} alt={c.tag} className="svc-img" />
                </div>
                <div className="svc-body">
                  <span className="svc-tag">{c.tag}</span>
                  <h3 className="svc-title">{c.title}</h3>
                  <p className="svc-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE WE OPERATE — interactive region map */}
      <WhereWeOperate />

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <div className="c">
          <div className="section-head centered">
            <p className="label">How the platform works</p>
            <h2 className="section-title">Simple from start to finish.</h2>
          </div>
          <div className="steps">
            {[
              { n: '01', t: 'Book your ride', d: 'Schedule through the app or by phone. Instant confirmation — no hold music, no guesswork.' },
              { n: '02', t: 'Track in real time', d: 'See your vehicle on a live map. Know exactly when to head to the door.' },
              { n: '03', t: 'Get notified when close', d: 'A heads-up goes to you and anyone you choose — minutes before arrival.' },
              { n: '04', t: 'Arrive, confirmed', d: 'Drop-off is logged automatically. Family and care teams know you made it safely.' },
            ].map((s, i, arr) => (
              <div key={s.n} className={`step${i < arr.length - 1 ? ' step-sep' : ''}`}>
                <p className="step-n">{s.n}</p>
                <p className="step-t">{s.t}</p>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR OPERATORS */}
      <section id="operators" className="section bg-tint">
        <div className="c">
          <div className="section-head">
            <p className="label">For cities &amp; operators</p>
            <h2 className="section-title">The organizations we work with.</h2>
            <p className="section-sub">Indro works alongside teams already moving people who depend on accessible, reliable transportation.</p>
          </div>
          <div className="cards-3">
            {[
              { img: '/Long-term care & senior living.jpg', title: 'Long-term care & senior living', desc: 'Coordinate resident rides, reduce missed appointments, and give families real-time peace of mind.' },
              { img: '/Transit authorities & private operators.jpg', title: 'Transit authorities & private operators', desc: 'Layer live tracking and caregiver alerts onto your existing fleet — no new hardware required.' },
              { img: '/Disability & community services.jpg', title: 'Disability & community services', desc: 'Give clients and their support networks the predictability and independence they deserve.' },
            ].map(c => (
              <div key={c.title} className="op-card">
                <div className="op-img-wrap">
                  <img src={c.img} alt={c.title} className="op-img" />
                </div>
                <div className="op-body">
                  <h3 className="op-title">{c.title}</h3>
                  <p className="op-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="c">
          <div className="about-intro">
            <p className="label">Our story</p>
            <h2 className="section-title">Started at UCalgary.<br />Built with riders.</h2>
            <p className="about-body">Indro Transit began at the University of Calgary AI Bootcamp. After months of conversations with Transit Access riders, caregivers, and operators, one ask kept surfacing: <strong>just tell us where the ride is.</strong> We're building the platform around that — starting with Calgary in 2026 and growing across southern Alberta.</p>
          </div>
          <div className="stat-row">
            <StatCard number="40+" label="Riders & caregivers interviewed" />
            <StatCard number="12" label="Partner conversations underway" />
            <StatCard number="2026" label="Calgary pilot launch" />
          </div>
          <div className="press-grid">
            {[
              { tag: 'Feature', outlet: 'UCalgary News', title: 'AI Bootcamp helps students design their own futures', desc: 'UCalgary featured our work on accessible transit technology for southern Alberta.', href: '#' },
              { tag: 'Video', outlet: 'Instagram · Reel', title: 'Indro Transit in motion', desc: "A short video on what we're building and why it matters for Alberta's riders.", href: 'https://www.instagram.com/indrotransit' },
              { tag: 'Outreach', outlet: 'Community', title: 'Listening sessions with Transit Access riders', desc: 'Highlights from sessions with paratransit riders, caregivers, and long-term care providers.', href: 'https://www.instagram.com/indrotransit' },
            ].map(a => (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className="press-card">
                <div className="press-top">
                  <span className="press-tag">{a.tag}</span>
                  <span className="press-outlet">{a.outlet}</span>
                </div>
                <p className="press-title">{a.title}</p>
                <p className="press-desc">{a.desc}</p>
                <span className="press-link">Read more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-tint">
        <div className="c cta-grid">
          <div id="waitlist" className="cta-col">
            <p className="label">For riders &amp; families</p>
            <h2 className="cta-h">Join the waitlist.</h2>
            <p className="cta-p">Be among the first when we launch in your community.</p>
            <WaitlistForm />
          </div>
          <div className="cta-divider" />
          <div id="partner" className="cta-col">
            <p className="label">For cities &amp; operators</p>
            <h2 className="cta-h">Partner with us.</h2>
            <p className="cta-p">Operating transit in southern Alberta? Let's talk.</p>
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="c footer-inner">
          <a href="#top" className="footer-brand">
            <img src="/Indro Transit.png" alt="Indro Transit" className="footer-logo" />
          </a>
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#where">Where we operate</a>
            <a href="#how">How it works</a>
            <a href="#operators">For operators</a>
            <a href="#about">About</a>
          </nav>
          <p className="footer-copy">© 2026 Indro Transit · Calgary, Alberta</p>
        </div>
      </footer>
    </>
  )
}
