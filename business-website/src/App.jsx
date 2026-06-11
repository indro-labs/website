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
      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`cdot${i === active ? ' on' : ''}`} onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}

/* ── ALBERTA MAP — custom SVG, accurate coordinates ─ */
// viewBox 0 0 320 480
// x = (120 − lon) / 10 × 300 + 10
// y = (60 − lat) / 11 × 450 + 15
const CITIES = [
  { id:'calgary',      name:'Calgary',       status:'serving', detail:'Paratransit, microtransit & on-demand', cx:188, cy:381 },
  { id:'airdrie',      name:'Airdrie',        status:'serving', detail:'On-demand & microtransit',             cx:190, cy:371 },
  { id:'okotoks',      name:'Okotoks',        status:'serving', detail:'On-demand',                            cx:190, cy:394 },
  { id:'cochrane',     name:'Cochrane',       status:'serving', detail:'On-demand',                            cx:176, cy:376 },
  { id:'chestermere',  name:'Chestermere',    status:'serving', detail:'On-demand',                            cx:196, cy:381 },
  { id:'highriver',    name:'High River',     status:'soon',    detail:'Launching 2026',                       cx:192, cy:401 },
  { id:'strathmore',   name:'Strathmore',     status:'soon',    detail:'Launching 2026',                       cx:208, cy:381 },
  { id:'reddeer',      name:'Red Deer',       status:'soon',    detail:'Planned 2027',                         cx:196, cy:331 },
  { id:'edmonton',     name:'Edmonton',       status:'soon',    detail:'Planned 2027',                         cx:205, cy:279 },
  { id:'lethbridge',   name:'Lethbridge',     status:'soon',    detail:'Future coverage',                      cx:225, cy:437 },
  { id:'medicinehat',  name:'Medicine Hat',   status:'soon',    detail:'Future coverage',                      cx:290, cy:422 },
  { id:'fortmcmurray', name:'Fort McMurray',  status:'soon',    detail:'Future coverage',                      cx:269, cy:149 },
]

// Simplified but geographically accurate Alberta outline
const AB_PATH = `
  M 55,15
  L 310,15
  L 310,465
  L 45,465
  L 28,430
  L 22,390
  L 28,355
  L 38,305
  L 45,250
  L 42,195
  L 48,145
  L 50,85
  Z
`

function AlbertaMap() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="ab-wrap">
      <svg viewBox="0 0 320 480" className="ab-svg" aria-label="Interactive Alberta map">
        {/* Province fill */}
        <path d={AB_PATH} className="ab-province" />

        {/* Serving glow region around Calgary area */}
        <ellipse cx="191" cy="382" rx="38" ry="34"
          fill="rgba(246,144,26,0.09)" stroke="none" />

        {/* City markers */}
        {CITIES.map(city => {
          const isHov = hovered?.id === city.id
          const serving = city.status === 'serving'
          return (
            <g key={city.id}
              onMouseEnter={() => setHovered(city)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}>
              {isHov && (
                <circle cx={city.cx} cy={city.cy} r={serving ? 14 : 11}
                  fill={serving ? 'rgba(246,144,26,0.15)' : 'rgba(150,150,150,0.12)'}
                  stroke={serving ? 'rgba(246,144,26,0.4)' : 'rgba(150,150,150,0.3)'}
                  strokeWidth="1"
                />
              )}
              <circle
                cx={city.cx} cy={city.cy}
                r={isHov ? 6 : serving ? 5 : 4}
                fill={serving ? '#F6901A' : '#C4C0BA'}
                stroke="white" strokeWidth={serving ? 2 : 1.5}
                style={{ transition: 'r 0.18s ease' }}
              />
            </g>
          )
        })}

        {/* Labels — major only */}
        {[
          { id:'calgary',      label:'Calgary',      dx:8, dy:4  },
          { id:'edmonton',     label:'Edmonton',     dx:8, dy:4  },
          { id:'reddeer',      label:'Red Deer',     dx:8, dy:4  },
          { id:'lethbridge',   label:'Lethbridge',   dx:8, dy:4  },
          { id:'fortmcmurray', label:'Ft McMurray',  dx:8, dy:4  },
        ].map(l => {
          const c = CITIES.find(x => x.id === l.id)
          return (
            <text key={l.id} x={c.cx + l.dx} y={c.cy + l.dy}
              className="ab-label" style={{ pointerEvents:'none' }}>
              {l.label}
            </text>
          )
        })}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div className="ab-tooltip" style={{
          top: `${(hovered.cy / 480) * 100}%`,
          ...(hovered.cx > 200
            ? { right: `${(1 - hovered.cx / 320) * 100 + 2}%` }
            : { left: `${(hovered.cx / 320) * 100 + 3}%` }),
          transform: 'translateY(-50%)',
        }}>
          <p className="ab-tt-name">{hovered.name}</p>
          <p className={`ab-tt-status ${hovered.status}`}>
            {hovered.status === 'serving' ? '● Active' : '○ Coming soon'}
          </p>
          <p className="ab-tt-detail">{hovered.detail}</p>
        </div>
      )}
    </div>
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
        method:'POST', body:JSON.stringify({ name, email, role }),
        headers:{ Accept:'application/json','Content-Type':'application/json' },
      })
      r.ok ? setDone(true) : setErr(true)
    } catch { setErr(true) }
  }
  if (done) return <div className="form-ok"><CheckCircle size={18} color="var(--orange)"/><div><p className="fok-t">You're on the list.</p><p className="fok-s">We'll reach out soon.</p></div></div>
  return (
    <form onSubmit={submit} className="the-form">
      <div className="form-row">
        <input type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <div className="role-row">
        {['Rider','Caregiver','Care facility','Other'].map(r => (
          <button key={r} type="button" className={`rchip${role===r?' on':''}`} onClick={()=>setRole(r)}>{r}</button>
        ))}
      </div>
      <button type="submit" className="btn-primary w-full">Join the waitlist <ArrowRight size={14}/></button>
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
        method:'POST', body:JSON.stringify(data),
        headers:{ Accept:'application/json','Content-Type':'application/json' },
      })
      r.ok ? setDone(true) : setErr(true)
    } catch { setErr(true) }
  }
  if (done) return <div className="form-ok"><CheckCircle size={18} color="var(--orange)"/><div><p className="fok-t">Message received.</p><p className="fok-s">We'll be in touch shortly.</p></div></div>
  return (
    <form onSubmit={submit} className="the-form">
      <div className="form-row">
        <input name="name" type="text" placeholder="Your name" required/>
        <input name="org" type="text" placeholder="Organization name" required/>
      </div>
      <input name="email" type="email" placeholder="Email address" required/>
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
      <textarea name="message" placeholder="Tell us about your service area and what you're looking for." rows={4}/>
      <button type="submit" className="btn-primary w-full">Send message <ArrowRight size={14}/></button>
      {err && <p className="ferr">Something went wrong — please try again.</p>}
    </form>
  )
}

/* ── APP ──────────────────────────────────────── */
export default function App() {
  return (
    <>
      <NavBar/>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="c hero-inner">
          <div className="hero-text">
            <h1 className="hero-h1">Transit that meets<br/>people <em>where they are.</em></h1>
            <p className="hero-sub">The software platform behind paratransit, microtransit, and on-demand rides across southern Alberta — simple, dignified, and reliable.</p>
            <div className="hero-actions">
              <a href="#waitlist" className="btn-primary">Join the waitlist</a>
              <a href="#partner" className="btn-ghost">Partner with us <ArrowRight size={14}/></a>
            </div>
          </div>
          <div className="hero-media">
            <HeroCarousel/>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <CityTicker/>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="c">
          <div className="section-head">
            <p className="label">What we offer</p>
            <h2 className="section-title">Three ways we move people.</h2>
          </div>
          <div className="cards-3">
            {[
              { img:'/on-demandservices.jpg',  tag:'On-demand',   title:'Rides when you need them.',                       desc:'Request a ride on your schedule. No fixed routes — just flexible, point-to-point service that fits your life.' },
              { img:'/microtransit.jpeg',       tag:'Microtransit', title:'Shared rides. Smarter routes.',                  desc:'Efficient shared-ride service for communities between cities. Affordable, frequent, and fully trackable.' },
              { img:'/paratransit.jpeg',        tag:'Paratransit',  title:'Calgary Transit Access — powered by Indro.',     desc:'The city\'s accessible transit service, now with real-time tracking, arrival alerts, and caregiver visibility.' },
            ].map(c => (
              <div key={c.tag} className="svc-card">
                <div className="svc-img-wrap">
                  <img src={c.img} alt={c.tag} className="svc-img"/>
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

      {/* WHERE WE OPERATE */}
      <section id="where" className="section bg-tint">
        <div className="c">
          <div className="where-grid">
            {/* Left — text */}
            <div className="where-text">
              <p className="label">Where we operate</p>
              <h2 className="section-title">Built for Calgary.<br/>Expanding across Alberta.</h2>

              <div className="city-group">
                <p className="city-group-label">Active now</p>
                {[
                  ['Calgary',      'Paratransit · Microtransit · On-demand'],
                  ['Airdrie',      'On-demand · Microtransit'],
                  ['Okotoks',      'On-demand'],
                  ['Cochrane',     'On-demand'],
                  ['Chestermere',  'On-demand'],
                ].map(([name, detail]) => (
                  <div key={name} className="city-row">
                    <span className="city-dot active"/>
                    <div>
                      <span className="city-name">{name}</span>
                      <span className="city-detail">{detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="city-group">
                <p className="city-group-label">Coming soon</p>
                {[
                  ['High River & Strathmore', '2026'],
                  ['Red Deer',                '2027'],
                  ['Edmonton',                '2027'],
                  ['Lethbridge · Medicine Hat · Fort McMurray', 'Future'],
                ].map(([name, when]) => (
                  <div key={name} className="city-row">
                    <span className="city-dot soon"/>
                    <div>
                      <span className="city-name">{name}</span>
                      <span className="city-when">{when}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — map */}
            <div className="where-map-col">
              <AlbertaMap/>
              <p className="map-hint">Hover a city for details</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <div className="c">
          <div className="section-head centered">
            <p className="label">How the platform works</p>
            <h2 className="section-title">Simple from start to finish.</h2>
          </div>
          <div className="steps">
            {[
              { n:'01', t:'Book your ride',          d:'Schedule through the app or by phone. Instant confirmation — no hold music, no guesswork.' },
              { n:'02', t:'Track in real time',       d:'See your vehicle on a live map. Know exactly when to head to the door.' },
              { n:'03', t:'Get notified when close',  d:'A heads-up goes to you and anyone you choose — minutes before arrival.' },
              { n:'04', t:'Arrive, confirmed',         d:'Drop-off is logged automatically. Family and care teams know you made it safely.' },
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
              { img:'/Long-term care & senior living.jpg',       title:'Long-term care & senior living',       desc:'Coordinate resident rides, reduce missed appointments, and give families real-time peace of mind.' },
              { img:'/Transit authorities & private operators.jpg', title:'Transit authorities & private operators', desc:'Layer live tracking and caregiver alerts onto your existing fleet — no new hardware required.' },
              { img:'/Disability & community services.jpg',      title:'Disability & community services',      desc:'Give clients and their support networks the predictability and independence they deserve.' },
            ].map(c => (
              <div key={c.title} className="op-card">
                <div className="op-img-wrap">
                  <img src={c.img} alt={c.title} className="op-img"/>
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
            <h2 className="section-title">Started at UCalgary.<br/>Built with riders.</h2>
            <p className="about-body">Indro Transit began at the University of Calgary AI Bootcamp. After months of conversations with Transit Access riders, caregivers, and operators, one ask kept surfacing: <strong>just tell us where the ride is.</strong> We're building the platform around that — starting with Calgary in 2026 and growing across southern Alberta.</p>
          </div>

          <div className="stat-row">
            <StatCard number="40+" label="Riders & caregivers interviewed"/>
            <StatCard number="12"  label="Partner conversations underway"/>
            <StatCard number="2026" label="Calgary pilot launch"/>
          </div>

          <div className="press-grid">
            {[
              { tag:'Feature',  outlet:'UCalgary News',     title:'AI Bootcamp helps students design their own futures', desc:'UCalgary featured our work on accessible transit technology for southern Alberta.', href:'#' },
              { tag:'Video',    outlet:'Instagram · Reel',  title:'Indro Transit in motion',                            desc:'A short video on what we\'re building and why it matters for Alberta\'s riders.', href:'https://www.instagram.com/indrotransit' },
              { tag:'Outreach', outlet:'Community',         title:'Listening sessions with Transit Access riders',       desc:'Highlights from sessions with paratransit riders, caregivers, and long-term care providers.', href:'https://www.instagram.com/indrotransit' },
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
            <WaitlistForm/>
          </div>
          <div className="cta-divider"/>
          <div id="partner" className="cta-col">
            <p className="label">For cities &amp; operators</p>
            <h2 className="cta-h">Partner with us.</h2>
            <p className="cta-p">Operating transit in southern Alberta? Let's talk.</p>
            <PartnerForm/>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="c footer-inner">
          <a href="#top" className="footer-brand">
            <img src="/Indro Transit.png" alt="Indro Transit" className="footer-logo"/>
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
