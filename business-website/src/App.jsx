import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { WaitlistForm, PartnerForm } from './components/Forms'
import './App.css'

/* ── HERO CAROUSEL ────────────────────────────── */
const SLIDES = [
  { src: '/images/hero/caregiver-van.jpg',       alt: 'Caregiver helping elderly woman out of van' },
  { src: '/images/hero/care-worker-elderly.jpg', alt: 'Care worker with elderly resident' },
  { src: '/images/hero/senior-couple.jpg',       alt: 'Senior couple smiling outdoors' },
  { src: '/images/hero/transit-driver.jpg',      alt: 'Transit driver assisting passenger' },
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
    photo: '/images/regions/calgary.jpg',
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
    photo: '/images/regions/edmonton.png',
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
    photo: '/images/regions/central-alberta.png',
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
    photo: '/images/regions/southern-alberta.png',
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
    photo: '/images/regions/northern-alberta.png',
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
          <h2 className="hp-title">Where we operate</h2>
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
            <div className="where-status-row">
              <h3 className="where-region-h">{r.name}</h3>
              <span className={`where-status-badge ${r.status}`}>
                {r.status === 'serving' ? 'Serving now' : r.status === 'soon' ? 'Coming 2027' : 'Planned'}
              </span>
            </div>
            <p className="where-region-desc">{r.desc}</p>

            <div className="where-block">
              <p className="where-block-label">Communities</p>
              <div className="where-chips">
                {r.cities.map(c => <span key={c} className="where-chip">{c}</span>)}
              </div>
            </div>

            <div className="where-block">
              <p className="where-block-label">{r.status === 'serving' ? 'Services operating' : 'Planned services'}</p>
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
          {items.map((c, i) => (
            <span key={i} className="ticker-item" tabIndex={0}>{c}</span>
          ))}
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
    title: 'Automated trip updates',
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
    title: 'Simple ride booking',
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
          <h2 className="section-title">Everyone involved in a ride stays informed in real time.</h2>
          <p className="feat-intro">Indro gives riders, families, care teams, and operators the visibility they need throughout every trip — from booking to arrival.</p>
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

const HP_BENEFITS = [
  { img: '/images/hero/caregiver-van.jpg',              title: 'Know ride location',      desc: 'Live GPS tracking means no more waiting and wondering. Riders see their vehicle in real time.' },
  { img: '/images/hero/care-worker-elderly.jpg',        title: 'Family peace of mind',   desc: 'Caregivers and family members receive automatic updates at pickup and drop-off — no calls needed.' },
  { img: '/images/operators/transit-operators.jpg',     title: 'Operator control',        desc: 'One dashboard for dispatch, routing, and fleet management. Fewer calls. Fewer missed trips.' },
  { img: '/images/hero/senior-couple.jpg',              title: 'Community access',        desc: 'Reliable transportation that expands mobility for seniors and people with disabilities.' },
]

const HP_SERVICES = [
  { img: '/images/hero/caregiver-van.jpg',              title: 'Real-time tracking',          desc: 'Riders, families, and staff see exactly where the vehicle is — live, on any device.' },
  { img: '/images/hero/care-worker-elderly.jpg',        title: 'Automatic notifications',     desc: 'Updates sent at booking, pickup, en route, and arrival. No phone calls needed.' },
  { img: '/images/hero/senior-couple.jpg',              title: 'Simple booking',              desc: 'Riders and coordinators can schedule trips online in minutes, from any device.' },
  { img: '/images/operators/senior-living.jpg',         title: 'Family & caregiver access',   desc: 'Give family members and caregivers the same live visibility as your internal staff.' },
  { img: '/images/operators/transit-operators.jpg',     title: 'Fleet & dispatch tools',      desc: 'Operators manage their entire fleet, routing, and dispatch from one simple dashboard.' },
  { img: '/images/operators/disability-services.jpg',   title: 'Trip records & reporting',    desc: 'Automatic trip logs and performance data — everything you need for compliance and billing.' },
]

const HP_WHO = [
  { img: '/images/operators/senior-living.jpg',         tag: 'Senior living',          title: 'Long-term care & senior living',          desc: 'Coordinate resident transportation with less manual work and fewer missed appointments, while giving families real-time visibility.' },
  { img: '/images/operators/transit-operators.jpg',     tag: 'Transit operators',       title: 'Transit authorities & private operators',  desc: 'Add live tracking, dispatch tools, and rider coordination to your existing fleet — no operational overhaul required.' },
  { img: '/images/operators/disability-services.jpg',   tag: 'Accessibility services',  title: 'Disability & community services',          desc: 'Give riders and caregivers reliable transportation with clear, real-time trip updates from pickup to drop-off.' },
]

const HP_WHY = [
  { title: 'Designed for vulnerable riders',      desc: 'Every feature is built with seniors, people with disabilities, and their caregivers in mind — not just fleet managers.' },
  { title: 'Built for Alberta communities',       desc: 'We started in Calgary and understand the specific needs of Alberta\'s transit landscape, providers, and regulations.' },
  { title: 'Real-time, all the time',             desc: 'No manual check-ins. No phone calls. Indro sends automatic updates to riders, families, and staff at every step.' },
  { title: 'Simple to set up, easy to use',       desc: 'Operators are up and running quickly. Riders and families don\'t need an app or technical knowledge — just a phone.' },
]

export default function App() {
  const location = useLocation()
  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.replace('#', ''))
    if (!el) return
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [location.hash])

  return (
    <>
      <NavBar />

      {/* ── 1. HERO ── */}
      <section id="hero" className="hero">
        <div className="c hero-inner">
          <div className="hero-text">
            <h1 className="hero-h1">Transit that meets people <em>where they are.</em></h1>
            <p className="hero-sub">Real-time tracking, easy booking, and family visibility — built for paratransit, senior living, and community transit in Alberta.</p>
            <div className="hero-actions">
              <a href="#waitlist" className="btn-primary">Join the waitlist</a>
              <a href="#partner" className="btn-ghost">Become a partner</a>
            </div>
          </div>
          <div className="hero-media">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ── 2. TICKER ── */}
      <CityTicker />

      {/* ── 3. WHAT WE OFFER ── */}
      <section id="services" className="hp-section bg-tint">
        <div className="c">
          <div className="hp-head hp-head--center">
            <h2 className="hp-title">What we offer</h2>
          </div>
          <div className="cards-3">
            {[
              { img: '/images/services/ondemand.png',     label: 'ON-DEMAND',    title: 'Rides when you need them.',       desc: 'Flexible, on-demand trips without fixed schedules. Book and dispatch from one platform.' },
              { img: '/images/services/microtransit.jpg', label: 'MICROTRANSIT', title: 'Shared rides. Smarter routes.',    desc: 'Dynamic routing and rider management that makes shared trips efficient and affordable.' },
              { img: '/images/services/paratransit.jpg',  label: 'PARATRANSIT',  title: 'Accessible transit, modernized.', desc: 'Real-time tracking and caregiver visibility designed for accessible transportation providers.' },
            ].map(c => (
              <div key={c.label} className="svc-card svc-card--overlay">
                <img src={c.img} alt={c.label} className="svc-img" />
                <div className="svc-overlay-static"><span className="svc-overlay-label">{c.label}</span></div>
                <div className="svc-overlay-hover">
                  <h3 className="svc-overlay-title">{c.title}</h3>
                  <p className="svc-overlay-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO SECTION ───────────────────────────── */}
      <section className="intro-section">
        <div className="c">
          <div className="intro-content">
            <h2 className="hp-title">
              Transportation software built for people who care.
            </h2>

            <p className="intro-sub">
              Indro Transit helps organizations coordinate paratransit,
              microtransit, and on-demand transportation with live tracking,
              automated notifications, and real-time rider visibility.
              Families stay informed, operators reduce status calls,
              and riders know where their ride is.
            </p>
          </div>

          <div className="intro-video-wrap">
            <video
              className="intro-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/senior-laughing.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── 4. OUR BENEFITS ── */}
      <section className="hp-section bg-tint">
        <div className="c">
          <div className="hp-head hp-head--center">
            <h2 className="hp-title">Our benefits</h2>
          </div>
          <div className="ben-grid">
            {HP_BENEFITS.map(b => (
              <div key={b.title} className="ben-card">
                <div className="ben-img-wrap">
                  <img src={b.img} alt={b.title} className="ben-img" />
                </div>
                <h3 className="ben-title">{b.title}</h3>
                <p className="ben-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. OUR SERVICES ── */}
      <section className="hp-section bg-tint" id="services-grid">
        <div className="c">
          <div className="hp-head hp-head--center">
            <h2 className="hp-title">Our services</h2>
            <p className="srv-sub">We offer a range of transit technology solutions — from real-time tracking and on-demand booking to accessible transport management — designed to work for every type of provider and community.</p>
          </div>
          <div className="srv-plain-grid">
            {HP_SERVICES.map(s => (
              <div key={s.title} className="srv-plain-item">
                <div className="srv-plain-img-wrap">
                  <img src={s.img} alt={s.title} className="srv-plain-img" />
                </div>
                <h3 className="srv-plain-title">{s.title}</h3>
                <p className="srv-plain-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHO WE SERVE ── */}
      <section className="hp-section" id="operators">
        <div className="c">
          <div className="hp-head">
            <h2 className="hp-title">Who we serve</h2>
          </div>
          <div className="who-alt-list">
            {HP_WHO.map((w, i) => (
              <div key={w.title} className={`who-alt-row${i % 2 === 1 ? ' who-alt-row--reverse' : ''}`}>
                <div className="who-alt-img-wrap">
                  <img src={w.img} alt={w.title} className="who-alt-img" />
                </div>
                <div className="who-alt-text">
                  <span className="who-tag">{w.tag}</span>
                  <h3 className="who-alt-title">{w.title}</h3>
                  <p className="who-alt-desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ABOUT US ── */}
      <section className="hp-section bg-tint" id="about">
        <div className="c about-split">
          <div className="about-split-img">
            <img src="/images/hero/care-worker-elderly.jpg" alt="Care worker with elderly resident" className="about-split-photo" />
          </div>
          <div className="about-split-text">
            <h2 className="hp-title">About us</h2>
            <p className="about-body">We started Indro after spending months with riders, families, care coordinators, and operators — and hearing the same thing: no one knew where the ride was when they needed to. We set out to fix that.</p>
            <Link to="/about" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>Read our full story</Link>
          </div>
        </div>
      </section>

      {/* ── 9. WHERE WE OPERATE ── */}
      <WhereWeOperate />

      {/* ── 10. CTA WITH BACKGROUND IMAGE ── */}
      <section className="cta-hero" id="waitlist">
        <div className="cta-hero-img-wrap">
          <img src="/images/hero/transit-driver.jpg" alt="Transit driver" className="cta-hero-img" />
          <div className="cta-hero-overlay" />
        </div>
        <div className="c cta-hero-inner">
          <h2 className="cta-hero-title">Ready to modernize your transit?</h2>
          <p className="cta-hero-sub">Join the waitlist or reach out to partner with us. We'd love to hear from you.</p>
          <div className="cta-hero-forms">
            <div className="cta-col">
              <p className="label">For riders &amp; families</p>
              <h3 className="cta-h">Join the waitlist.</h3>
              <p className="cta-p">Be among the first when we launch in your community.</p>
              <WaitlistForm />
            </div>
            <div className="cta-col" id="partner">
              <p className="label">For communities &amp; operators</p>
              <h3 className="cta-h">Partner with us.</h3>
              <p className="cta-p">Operating transit in Alberta? Let's talk.</p>
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
