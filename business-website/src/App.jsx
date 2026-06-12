import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import {CheckCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom';

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
    id: 'calgary',
    name: 'Greater Calgary',
    status: 'serving',
    tag: 'Serving now',
    cities: ['Calgary', 'Airdrie', 'Okotoks', 'Cochrane', 'Chestermere'],
    services: ['Paratransit', 'Microtransit', 'On-demand'],
    desc: 'Active deployments with partner organizations across the greater Calgary area.',
    photo: '/calgarypic.jpg',
    path: 'M 30,427 L 390,427 L 390,500 L 22,500 L 26,465 Z',
    labelX: 185, labelY: 467,
    pins: [{ name: 'Calgary', cx: 221, cy: 455 }, { name: 'Airdrie', cx: 223, cy: 443 }],
  },
  {
    id: 'edmonton',
    name: 'Edmonton Region',
    status: 'soon',
    tag: 'Launching 2027',
    cities: ['Edmonton', 'St. Albert', 'Leduc', 'Spruce Grove', 'Sherwood Park'],
    services: ['Paratransit', 'On-demand'],
    desc: 'Expansion planning underway with organizations in the Edmonton Capital Region.',
    photo: '/Edmontonregion.png',
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
    desc: 'Planned expansion beginning with Central Alberta communities.',
    photo: '/Sylvanlake.png',
    path: 'M 38,353 L 390,353 L 390,427 L 30,427 L 34,390 Z',
    labelX: 192, labelY: 394,
    pins: [{ name: 'Red Deer', cx: 231, cy: 387 }],
  },
  {
    id: 'south',
    name: 'Southern Alberta',
    status: 'soon',
    tag: 'Future expansion',
    cities: ['Lethbridge', 'Medicine Hat', 'Brooks', 'Taber'],
    services: ['On-demand', 'Paratransit'],
    desc: 'Southern Alberta communities included in long-term expansion plans.',
    photo: '/Southernalberta.png',
    path: 'M 22,500 L 390,500 L 390,552 L 36,552 Z',
    labelX: 192, labelY: 530,
    pins: [{ name: 'Lethbridge', cx: 266, cy: 516 }, { name: 'Medicine Hat', cx: 346, cy: 510 }],
  },
  {
    id: 'north',
    name: 'Northern Alberta',
    status: 'future',
    tag: 'Future expansion',
    cities: ['Fort McMurray', 'Peace River', 'Grande Prairie', 'High Level'],
    services: ['Planning underway'],
    desc: 'Northern Alberta included in long-term rollout roadmap.',
    photo: '/NorthernAlberta.png',
    path: 'M 58,10 L 390,10 L 390,206 L 48,206 L 54,100 Z',
    labelX: 200, labelY: 108,
    pins: [{ name: 'Ft McMurray', cx: 318, cy: 168 }],
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
  const [active, setActive] = useState('calgary')
  const r = AB_REGIONS.find(x => x.id === active)

  return (
    <section id="where" className="where-section">
      <div className="c">

        {/* Header */}
        <div className="where-hd">
          <p className="label">Where we operate</p>
          <h2 className="section-title">Built in Calgary.<br/>Expanding across Alberta.</h2>
        </div>

        {/* Tabs */}
        <div className="where-tabs">
          {AB_REGIONS.map(reg => (
            <button
              key={reg.id}
              className={`where-tab${active === reg.id ? ' active' : ''}${reg.status === 'serving' ? ' serving' : ''}`}
              onClick={() => setActive(reg.id)}
            >
              {reg.status === 'serving' && <span className="tab-dot" />}
              {reg.name}
            </button>
          ))}
        </div>

        {/* Info panel — fades on switch */}
        <div className="where-panel" key={active}>
          {/* Left: text */}
          <div className="where-panel-left">
            <h3 className="where-region-h">{r.name}</h3>
            <p className="where-region-desc">{r.desc}</p>

            <div className="where-block">
              <p className="where-block-label">Communities</p>
              <div className="where-chips">
                {r.cities.map(c => <span key={c} className="where-chip">{c}</span>)}
              </div>
            </div>

            <div className="where-block">
              <p className="where-block-label">How we serve them</p>
              <div className="where-chips">
                {r.services.map(s => (
                  <span key={s} className={`where-chip svc ${r.status}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: full bleed photo */}
          {r.photo && (
            <div className="where-photo-card">
              <img src={r.photo} alt={r.name} className="where-photo-img" />
              <div className="where-photo-overlay" />
              <p className="where-photo-label">{r.name}</p>
            </div>
          )}
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

/* ── FEATURE ACCORDION ────────────────────────── */
const FEATURES = [
  {
    id: 'live-tracking',
    title: 'Live GPS tracking',
    tag: 'Riders & families',
    summary: 'See exactly where the vehicle is in real time.',
    detail: 'A live map updates every few seconds so riders, family members, and care coordinators can see vehicle location in real time. Eliminates uncertainty around arrival times and reduces inbound status calls.',
    visual: {
      label: 'Live tracking',
      status: 'active',
      rows: [
        { key: 'Vehicle', val: 'Accessible Van #4' },
        { key: 'ETA', val: '4 min away' },
        { key: 'Driver', val: 'James B.' },
        { key: 'Status', val: 'En route', highlight: true },
      ],
    },
  },
  {
    id: 'notifications',
    title: 'Automatic notifications',
    tag: 'Care teams',
    summary: 'Alerts go out before and after every trip, no setup required.',
    detail: 'Automated alerts are sent when a driver is en route, shortly before arrival, and once the rider has been dropped off. Notifications can be shared with family members, caregivers, or care coordinators.',
    visual: {
      label: 'Trip alerts',
      status: 'sent',
      rows: [
        { key: 'Rider', val: 'Margaret L.' },
        { key: 'Alert 1', val: 'Driver en route — sent' },
        { key: 'Alert 2', val: '3 min away — sent' },
        { key: 'Alert 3', val: 'Arrived safely — sent', highlight: true },
      ],
    },
  },
  {
    id: 'booking',
    title: 'Easy ride booking',
    tag: 'Riders',
    summary: 'Book by app or phone. Confirmation arrives instantly.',
    detail: 'Schedule a ride through the Indro app or by phone. Riders receive instant confirmation with pickup details, driver information, and a shareable tracking link.',
    visual: {
      label: 'Booking confirmed',
      status: 'confirmed',
      rows: [
        { key: 'Pickup', val: 'Tue, Jun 17 · 9:30 AM' },
        { key: 'From', val: '142 Oakdale Cres SW' },
        { key: 'To', val: 'Foothills Medical Centre' },
        { key: 'Confirmation', val: 'Sent to rider + family', highlight: true },
      ],
    },
  },
  {
    id: 'caregiver-access',
    title: 'Caregiver & family access',
    tag: 'Families',
    summary: 'Add anyone to a trip: they get the same visibility you do.',
    detail: 'Add a family member, care coordinator, or clinician to any trip. They receive the same updates and can view live trip status without needing their own account.',
    visual: {
      label: 'Trip access',
      status: 'shared',
      rows: [
        { key: 'Rider', val: 'Margaret L.' },
        { key: 'Shared with', val: 'Susan L. (daughter)' },
        { key: 'Also shared', val: 'Dr. A. Reeves' },
        { key: 'Access level', val: 'Live map + alerts', highlight: true },
      ],
    },
  },
  {
    id: 'fleet-ops',
    title: 'Fleet & operator tools',
    tag: 'Operators',
    summary: 'Manage your entire fleet from one dashboard.',
    detail: 'Operators get a real-time dispatch dashboard, driver assignment tools, and automated trip logging. Reduce missed trips with automated reminders and export operational reports for billing, compliance, and planning.',
    visual: {
      label: 'Fleet overview',
      status: 'live',
      rows: [
        { key: 'Active trips', val: '12 in progress' },
        { key: 'Pending', val: '3 scheduled today' },
        { key: 'No-show rate', val: 'Down 34% this month' },
        { key: 'Report', val: 'June summary ready', highlight: true },
      ],
    },
  },
]

function FeatureVisual({ id }) {
  if (id === 'live-tracking') return (
    <div className="fv fv-track">
      <div className="fv-track-header fv-card-in" style={{animationDelay:'0ms'}}>
        <div className="fv-track-pulse"><span className="fv-pulse-dot"/></div>
        <div>
          <p className="fv-track-title">Van #4 is on the way</p>
          <p className="fv-track-sub">Accessible van · James R.</p>
        </div>
        <span className="fv-track-eta">4 min</span>
      </div>
      <div className="fv-track-steps">
        {[
          { label: 'Ride confirmed', done: true },
          { label: 'Driver assigned', done: true },
          { label: 'En route to pickup', done: true, active: true },
          { label: 'Arrived at destination', done: false },
        ].map((s, i) => (
          <div key={i} className={`fv-tstep fv-card-in${s.active ? ' fv-tstep-active' : ''}${s.done ? ' fv-tstep-done' : ''}`} style={{animationDelay:`${i*70}ms`}}>
            <div className="fv-tstep-dot"/>
            {i < 3 && <div className="fv-tstep-line"/>}
            <span className="fv-tstep-label">{s.label}</span>
            {s.done && <svg className="fv-tstep-check" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6.5" fill={s.active ? '#F6901A' : 'rgba(255,255,255,0.15)'}/><path d="M4 7l2.2 2.2L10 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        ))}
      </div>
      <div className="fv-track-footer fv-card-in" style={{animationDelay:'320ms'}}>
        <span className="fv-track-share">Share live location</span>
        <span className="fv-track-dest">Foothills Medical Centre</span>
      </div>
    </div>
  )

  if (id === 'notifications') return (
    <div className="fv fv-notifs">
      {[
          { bg: '#F0F4FF', icon: '👤', title: 'Trip summary sent to care team', sub: 'Just now',  new: true  },
          { bg: '#EDFAF3', icon: '✓', title: 'Margaret arrived safely', sub: '1 min ago', },
          { bg: '#FEF0DC', icon: '⏱', title: "Margaret's ride is arriving in 5 minutes", sub: '8 min ago' },
          { bg: '#FEF0DC', icon: '🚐', title: "Margaret's driver is on the way", sub: '15 min ago',},
        ].map((n, i) => (
        <div key={i} className={`fv-notif-row fv-card-in${n.new ? ' fv-notif-new' : ''}`} style={{ animationDelay: `${i * 90}ms`, background: n.bg }}>
          <span className="fv-notif-icon">{n.icon}</span>
          <div className="fv-notif-text">
            <p className="fv-notif-title">{n.title}</p>
            <p className="fv-notif-sub">Indro Transit · {n.sub}</p>
          </div>
          {n.new && <span className="fv-notif-badge">New</span>}
          {n.check && <span className="fv-check">✓</span>}
        </div>
      ))}
    </div>
  )

  if (id === 'booking') return (
    <div className="fv fv-booking">
      <div className="fv-booking-card fv-card-in" style={{animationDelay:'0ms'}}>
        <div className="fv-booking-header">
          <span className="fv-booking-badge">Confirmed</span>
          <span className="fv-booking-date">Tue, Jun 17 · 9:30 AM</span>
        </div>
        <div className="fv-booking-route">
          <div className="fv-booking-stop">
            <span className="fv-stop-dot origin"/>
            <div><p className="fv-stop-label">Pickup</p><p className="fv-stop-addr">142 Oakdale Cres SW</p></div>
          </div>
          <div className="fv-booking-line"/>
          <div className="fv-booking-stop">
            <span className="fv-stop-dot dest"/>
            <div><p className="fv-stop-label">Drop-off</p><p className="fv-stop-addr">Foothills Medical Centre</p></div>
          </div>
        </div>
        <div className="fv-booking-footer">
          <span className="fv-booking-driver">Driver: James R.</span>
          <span className="fv-booking-share">Share trip →</span>
        </div>
      </div>
      <div className="fv-booking-sms fv-card-in" style={{animationDelay:'180ms'}}>
        <p className="fv-sms-label">Text confirmation sent</p>
        <p className="fv-sms-msg">"Your Indro ride is confirmed for Tue 9:30 AM. Tap to track: indro.ca/t/4f8x"</p>
      </div>
    </div>
  )

  if (id === 'caregiver-access') return (
    <div className="fv fv-access">
      <div className="fv-access-header fv-card-in" style={{animationDelay:'0ms'}}>
        <p className="fv-access-title">Shared trip — Margaret L.</p>
        <p className="fv-access-sub">All contacts below receive live updates</p>
      </div>
      {[
        { initials: 'SL', name: 'Susan L.', role: 'Daughter', status: 'Notified', color: '#FEF0DC', tc: '#B86200' },
        { initials: 'AR', name: 'Dr. A. Reeves', role: 'Care coordinator', status: 'Notified', color: '#EDFAF3', tc: '#1A7A42' },
        { initials: 'RN', name: 'Sunrise Care Home', role: 'Nursing staff', status: 'Watching', color: '#F0F4FF', tc: '#3B5BDB' },
      ].map((p, i) => (
        <div key={i} className="fv-person fv-card-in" style={{ animationDelay: `${80 + i * 80}ms` }}>
          <div className="fv-person-avatar" style={{ background: p.color, color: p.tc }}>{p.initials}</div>
          <div className="fv-person-info">
            <p className="fv-person-name">{p.name}</p>
            <p className="fv-person-role">{p.role}</p>
          </div>
          <span className="fv-person-status" style={{ background: p.color, color: p.tc }}>{p.status}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="fv fv-fleet">
      <div className="fv-fleet-header fv-card-in" style={{animationDelay:'0ms'}}>
        <p className="fv-fleet-title">Today's dispatch</p>
        <span className="fv-fleet-live">Live</span>
      </div>
      {[
        { van: 'Van #2', driver: 'Priya T.', status: 'En route', stops: '2 stops left', bar: 60 },
        { van: 'Van #4', driver: 'James R.', status: 'En route', stops: '1 stop left', bar: 80 },
        { van: 'Van #7', driver: 'Nikki K.', status: 'Completed', stops: 'All done today', bar: 100 },
        { van: 'Van #9', driver: 'Omar T.', status: 'Scheduled', stops: 'Starts at 2 PM', bar: 0 },
      ].map((v, i) => (
        <div key={i} className="fv-van-row fv-card-in" style={{ animationDelay: `${60 + i * 70}ms` }}>
          <div className="fv-van-info">
            <p className="fv-van-name">{v.van} <span>· {v.driver}</span></p>
            <p className="fv-van-stops">{v.stops}</p>
          </div>
          <div className="fv-van-right">
            <span className={`fv-van-status ${v.status === 'Completed' ? 'done' : v.status === 'Scheduled' ? 'sched' : 'active'}`}>{v.status}</span>
            <div className="fv-van-bar"><div className="fv-van-fill" style={{ width: `${v.bar}%` }}/></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureAccordion() {
  const [active, setActive] = useState(FEATURES[0].id)
  const f = FEATURES.find(x => x.id === active)

  return (
    <section className="feat-section">
      <div className="c">
        <div className="feat-hd">
          <p className="label">Built with care</p>
          <h2 className="section-title">Everything riders and operators need.</h2>
        </div>
        <div className="feat-layout">

          {/* Left: feature list */}
          <div className="feat-list">
            {FEATURES.map(feat => (
              <button
                key={feat.id}
                className={`feat-item${active === feat.id ? ' active' : ''}`}
                onClick={() => setActive(feat.id)}
              >
                <div className="feat-item-top">
                  <span className="feat-item-tag">{feat.tag}</span>
                  {active === feat.id && <span className="feat-active-dot" />}
                </div>
                <p className="feat-item-title">{feat.title}</p>
                <p className="feat-item-summary">{feat.summary}</p>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="feat-panel" key={active}>
            <div className="feat-panel-visual">
              <FeatureVisual id={active} />
            </div>
            <div className="feat-panel-body">
              <span className="feat-panel-tag">{f.tag}</span>
              <h3 className="feat-panel-title">{f.title}</h3>
              <p className="feat-panel-detail">{f.detail}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ── APP ──────────────────────────────────────── */
export default function App() {
  return (
    <>
      <NavBar />

      {/* HERO */}
      <section id="hero" className="hero">
        
        <div className="c hero-inner">
          <div className="hero-text">
            <h1 className="hero-h1">Transit that meets<br />people <em>where they are.</em></h1>
            <p className="hero-sub">The software platform behind paratransit, microtransit, and on-demand rides across Alberta. Helping communities deliver accessible, reliable transportation for everyone.</p>
            <div className="hero-actions">
              <a href="#waitlist" className="btn-primary">Join waitlist</a>
              <a href="#partner" className="btn-ghost">Become partner</a>
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
              { img: '/ondemand.png', tag: 'On-demand', title: 'Rides when you need them.', desc: 'A booking and dispatch platform that helps organizations offer flexible, on-demand transportation without fixed schedules or routes.' },
              { img: '/microtransit.jpg', tag: 'Microtransit', title: 'Shared rides. Smarter routes.', desc: 'Dynamic routing and rider management tools that help communities deliver efficient, affordable shared transportation.' },
              { img: '/paratransit.jpg', tag: 'Paratransit',   title: 'Accessible transportation, modernized.',
                  desc: 'Real-time tracking, arrival alerts, and caregiver visibility designed for accessible transportation providers and their riders.'
                },
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

    <section id="operators" className="section bg-tint about-teaser">
  <div className="c">
    <div className="op-section-head center-content">
      <p className="label">Who we help</p>
      <h2 className="section-title">Built for organizations that move people.</h2>

    </div>

    <div className="op-cases">
      {[
        {
          img: '/Long-term care & senior living.jpg',
          tag: 'Senior living',
          title: 'Long-term care & senior living',
          desc: 'Coordinate resident transportation, reduce missed appointments, and give families real-time visibility into trips.'
        },
        {
          img: '/Transit authorities & private operators.jpg',
          tag: 'Transit operators',
          title: 'Transit authorities & private operators',
          desc: 'Add live tracking, dispatch tools, and rider coordination to your existing fleet without changing your operations.'
        },
        {
          img: '/Disability & community services.jpg',
          tag: 'Accessibility services',
          title: 'Disability & community services',
          desc: 'Give riders and caregivers predictable, reliable transportation with better communication and trip visibility.'
        }
      ].map((c, i) => (
        <div key={c.title} className={`op-case ${i % 2 === 1 ? 'reverse' : ''}`}>
          <div className="op-case-img">
            <img src={c.img} alt={c.title} />
          </div>
          <div className="op-case-text">
            <span className="op-tag">{c.tag}</span>
            <h3 className="op-title">{c.title}</h3>
            <p className="op-desc">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* FEATURES */}
      <FeatureAccordion />

      {/* ABOUT TEASER */}
      <section id="about" className="section about-teaser">
        <div className="c about-teaser-inner">
          <div className="about-teaser-text">
            <p className="label">Our story</p>
            <h2 className="section-title">
              Built from <span className="highlight">real needs</span>.<br/>
              Shaped by lived experience.
            </h2>
            <p className="section-sub" style={{ marginTop: 12, marginBottom: 28 }}>
              We spent months talking to Transit Access riders, caregivers, and care operators before writing a single line of code. One request came up again and again:  <em>just tell us where the ride is.</em>
            </p>
            <Link to="/about" className="btn-primary">Read our full story</Link>
          </div>
          <div className="about-teaser-img-wrap">
            <img src="/pexels-jsme-mila-523821574-18429374.jpg" alt="Care worker with elderly resident" className="about-teaser-img" />
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
            <p className="label">For communities &amp; operators</p>
            <h2 className="cta-h">Partner with us.</h2>
            <p className="cta-p">Operating transit in Alberta? Let's talk.</p>
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="c footer-inner">
          <a href="#top" className="footer-brand">
            <img src="/orange-transparent.png" alt="Indro Transit" className="footer-logo" />
          </a>
          <nav className="footer-nav">
            <a href="#services">Services</a>
            <a href="#where">Regions</a>
            <a href="#operators">Organizations</a>
            <a href="#about">About</a>
          </nav>
          <div className="footer-right">
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/indro-labs" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
              </a>
              <a href="mailto:info@indrolabs.ca" className="footer-social-link" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </a>
            </div>
            <p className="footer-copy">© 2026 Indro Transit · Calgary, Alberta</p>
          </div>
        </div>
      </footer>
    </>
  )
}
