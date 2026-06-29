import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Baby, Bus, Trophy, Star, Building2, MapPin, Bell, ShieldCheck, ArrowRight,
  Radar, Accessibility, PhoneOff, Leaf, CalendarCheck, LayoutDashboard,
} from 'lucide-react'
import { CATEGORIES } from '../data/categories'
/* ── CALENDLY ─────────────────────────────────── */
// Replace this with your real Calendly scheduling link.
export const CALENDLY_URL = 'https://calendly.com/indrolabs-info/product-general-inquiry-call'
export function CalendlyEmbed({ url = CALENDLY_URL }) {
  const ref = useRef(null)
  useEffect(() => {
    const id = 'calendly-widget-script'
    const init = () => {
      if (window.Calendly && ref.current) {
        ref.current.innerHTML = ''
        window.Calendly.initInlineWidget({ url, parentElement: ref.current })
      }
    }
    if (!document.getElementById(id)) {
      const s = document.createElement('script')
      s.id = id
      s.src = 'https://assets.calendly.com/assets/external/widget.js'
      s.async = true
      s.onload = init
      document.body.appendChild(s)
    } else {
      init()
    }
  }, [url])
  return <div ref={ref} style={{ minWidth: '320px', height: '700px' }} />
}

/* ── HERO (split — text left, stacked images right) ── */
const SLIDES = [
  { src: '/images/hero/senior-couple-smile.jpg', alt: 'Senior couple smiling' },
  { src: '/images/hero/caregiver-van.jpg',       alt: 'Caregiver helping a passenger from a van' },
  { src: '/images/hero/wheelchair-woman.jpg',    alt: 'Rider boarding an accessible vehicle' },
]
export function Hero() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="hero2">
      <div className="c hero2-inner">
        <div className="hero2-text">
          <h1 className="hero2-h1">
            <span className="hero2-orange">Connecting communities to the rides</span>{' '}
            <span className="hero2-white">they depend on.</span>
          </h1>
          <p className="hero2-sub">Run your fleet on the modern on-demand dispatch platform built to eliminate tracking chaos, save valuable time, and bring complete peace of mind to every passenger.</p>
          <div className="hero2-actions">
            <Link to="/contact" className="btn-primary">Contact us →</Link>
            <Link to="/services" className="btn-text btn-text--light">Explore services →</Link>
          </div>
        </div>
        <div className="hero2-stack">
          {SLIDES.map((s, i) => {
            const pos = (i - active + SLIDES.length) % SLIDES.length
            return (
              <img
                key={i} src={s.src} alt={s.alt} className="hero2-card"
                style={{
                  transform: `translateY(${pos * 26}px) translateX(${pos * 18}px) scale(${1 - pos * 0.06})`,
                  zIndex: SLIDES.length - pos,
                  opacity: pos > 2 ? 0 : 1,
                }}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── OFFER TABS (homepage "What we offer") ────── */
export function OfferTabs() {
  const [active, setActive] = useState(0)
  const cur = CATEGORIES[active]
  return (
    <section className="offer-section" id="services">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">What we offer</p>
          <h2 className="sec-h2">One platform, tuned to who you move.</h2>
          <p className="sec-intro">Indro adapts to your operation — from after-school vans to municipal paratransit. Choose who you serve.</p>
        </div>
        <div className="offer-tabs">
          {CATEGORIES.map((c, i) => (
            <button key={c.slug} className={`offer-tab${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
              <c.Icon size={18} strokeWidth={2} />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <div className="offer-panel" key={cur.slug}>
          <div className="offer-panel-media">
            <img src={cur.img} alt={cur.label} />
          </div>
          <div className="offer-panel-body">
            <div className="offer-tag-row">
              {cur.tags.map(t => <span key={t} className="offer-tag">{t}</span>)}
            </div>
            <h3 className="offer-h">{cur.headline}</h3>
            <p className="offer-body">{cur.body}</p>
            <Link to={`/services/${cur.slug}`} className="btn-primary offer-cta">{cur.cta} →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CATEGORY PAGE SECTIONS ───────────────────── */
export function CategoryHero({ cat }) {
  return (
    <section className="cat-hero">
      <div className="c">
        <div className="cat-hero-grid">
          <div className="cat-hero-text">
            <div className="offer-tag-row">
              {cat.tags.map(t => <span key={t} className="offer-tag">{t}</span>)}
            </div>
            <h1 className="cat-hero-h">{cat.headline}</h1>
            <p className="cat-hero-sub">{cat.body}</p>
            <div className="page-hero-actions">
              <Link to="/contact" className="btn-primary">{cat.cta} →</Link>
            </div>
          </div>
          <div className="cat-hero-media"><img src={cat.img} alt={cat.label} /></div>
        </div>
      </div>
    </section>
  )
}
export function CorePillars({ cat }) {
  return (
    <section className="pillars-section">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">{cat.label}</p>
          <h2 className="sec-h2">Three core pillars.</h2>
        </div>
        <div className="pillars-grid">
          {cat.pillars.map((p, i) => (
            <div key={p.title} className="pillar-col">
              <span className="pillar-num">0{i + 1}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export function ProductHighlights({ cat }) {
  return (
    <section className="highlights-section">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">Key product highlights</p>
          <h2 className="sec-h2">Built for how you actually operate.</h2>
        </div>
        <div className="highlights-grid">
          {cat.highlights.map(h => (
            <div key={h.title} className="highlight-card">
              <div className="highlight-dot" />
              <h3 className="highlight-title">{h.title}</h3>
              <p className="highlight-body">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export function CategoryWhoFor({ cat }) {
  return (
    <section className="who-section">
      <div className="c">
        <div className="sec-hd">
          <p className="eyebrow">Who it's for</p>
          <h2 className="sec-h2">Made for the way<br />you move people.</h2>
        </div>
        <div className="who-alt-list">
          {cat.whoFor.map((w, i) => (
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
  )
}

/* ── GET IN TOUCH (band) ──────────────────────── */
export function GetInTouch() {
  return (
    <section className="getintouch" id="book">
      <div className="c">
        <p className="getintouch-eyebrow">Get in touch</p>
        <h2 className="getintouch-h">Ready to bring clarity to every ride?</h2>
        <p className="getintouch-sub">See Indro in action. Reach out and we'll show you exactly how it fits your fleet — no pressure, no sales script.</p>
        <Link to="/contact" className="getintouch-btn">Contact us →</Link>
      </div>
    </section>
  )
}

/* ── PAGE HERO (inner pages) ──────────────────── */
export function PageHero({ eyebrow, title, sub, primary, secondary }) {
  return (
    <section className="page-hero">
      <div className="c">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-hero-h">{title}</h1>
        {sub && <p className="page-hero-sub">{sub}</p>}
        {(primary || secondary) && (
          <div className="page-hero-actions">
            {primary && <Link to={primary.to} className="btn-primary">{primary.label} →</Link>}
            {secondary && <Link to={secondary.to} className="btn-text">{secondary.label} →</Link>}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── TRACTION BAR (scroll-revealed) ───────────── */
const STATS = [
  { n: '50+',  l: 'Riders, families & caregivers interviewed' },
  { n: '8',    l: 'Care organizations waitlisted for the pilot' },
  { n: '4',    l: 'Organizations confirmed for 2026' },
  { n: '2026', l: 'Calgary pilot launching this year' },
]
export function TractionBar() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.35 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`traction-bar${vis ? ' in' : ''}`}>
      <div className="c traction-inner">
        {STATS.map((t, i) => (
          <div key={t.n} className="traction-item" style={{ transitionDelay: `${i * 0.09}s` }}>
            <span className="traction-n">{t.n}</span>
            <span className="traction-l">{t.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── WHY INDRO (benefit cards) ────────────────── */
const WHY = [
  { Icon: Radar,         title: 'Real-time visibility',     desc: 'Live GPS tracking and automatic alerts mean riders, families, and staff always know where the ride is.' },
  { Icon: Accessibility, title: 'Built for accessibility',  desc: 'Designed first for seniors and people with disabilities — dignity and safety are the baseline, not an add-on.' },
  { Icon: PhoneOff,      title: 'Less manual coordination', desc: 'Booking, dispatch, and updates in one place — no more hours lost to phone tag and spreadsheets.' },
  { Icon: Leaf,          title: 'Local & supported',        desc: 'Built in Calgary, with a team that works alongside you from pilot to full rollout.' },
]
export function WhyIndro() {
  return (
    <section className="why-section">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">Why Indro</p>
          <h2 className="sec-h2">Communities choose Indro to move people with confidence.</h2>
        </div>
        <div className="why-grid">
          {WHY.map(w => (
            <div key={w.title} className="why-col">
              <div className="why-icon"><w.Icon size={30} strokeWidth={1.6} /></div>
              <h3 className="why-title">{w.title}</h3>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="why-cta">
          <span className="why-cta-line" />
          <Link to="/services" className="btn-primary">Explore our services →</Link>
          <span className="why-cta-line" />
        </div>
      </div>
    </section>
  )
}

/* ── SERVICES OVERVIEW CARDS (fan-out) ────────── */
const SERVICE_CARDS = [
  {
    to: '/services/on-demand', img: '/images/services/ondemand.png',
    label: 'On-Demand', title: 'Managed on-demand programs',
    desc: 'Daycare, school vans, extracurricular, premium private, and organization transport — booked, scheduled, and tracked from one platform.',
    bullets: ['Daycare & school vans', 'Extracurricular & activity', 'Premium private & organizations'],
  },
  {
    to: '/services/paratransit', img: '/images/services/paratransit.jpg',
    label: 'Paratransit', title: 'Accessible paratransit',
    desc: 'Real-time tracking and caregiver visibility built for seniors, people with disabilities, and the care teams who support them.',
    bullets: ['Live GPS tracking', 'Caregiver & family visibility', 'Automatic pickup & arrival alerts'],
  },
]
export function ServicesOverview({ heading = true }) {
  return (
    <section className="svc-ov-section" id="services">
      <div className="c">
        {heading && (
          <div className="sec-hd centered">
            <p className="eyebrow">What we offer</p>
            <h2 className="sec-h2">Solutions for every community need.</h2>
            <p className="sec-intro">Two ways Indro moves your community — a full suite of managed on-demand programs, and accessible paratransit. One platform behind both.</p>
          </div>
        )}
        <div className="svc-ov-grid">
          {SERVICE_CARDS.map(c => (
            <Link key={c.label} to={c.to} className="svc-ov-card">
              <div className="svc-ov-img"><img src={c.img} alt={c.title} /></div>
              <div className="svc-ov-body">
                <span className="svc-ov-label">{c.label}</span>
                <h3 className="svc-ov-title">{c.title}</h3>
                <p className="svc-ov-desc">{c.desc}</p>
                <ul className="svc-ov-bullets">
                  {c.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
                <span className="svc-ov-more">Learn more <ArrowRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PLATFORM SECTION ─────────────────────────── */
const PLATFORM_CAPS = [
  { Icon: CalendarCheck,    title: 'Booking & dispatch',              desc: 'Schedule, assign, and manage every trip from one operator dashboard.' },
  { Icon: MapPin,           title: 'Live GPS tracking',               desc: 'Real-time vehicle location on any device, for staff and families alike.' },
  { Icon: Bell,             title: 'Caregiver & family visibility',   desc: 'Automatic updates at pickup and arrival — no phone calls required.' },
  { Icon: LayoutDashboard,  title: 'One operations layer',            desc: 'Riders, drivers, schedules, and notifications — coordinated in a single place.' },
]
export function PlatformSection() {
  return (
    <section className="platform-band">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">The platform</p>
          <h2 className="sec-h2">One platform behind every trip.</h2>
          <p className="sec-intro">Every Indro service runs on the same software — so whether it's a school van or an accessible paratransit ride, coordination feels effortless.</p>
        </div>
        <div className="platform-caps">
          {PLATFORM_CAPS.map(p => (
            <div key={p.title} className="platform-cap">
              <div className="platform-cap-icon"><p.Icon size={22} strokeWidth={1.9} /></div>
              <h3 className="platform-cap-title">{p.title}</h3>
              <p className="platform-cap-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── ON-DEMAND CORE (tabbed carousel) ─────────── */
const ONDEMAND_SUITE = [
  { Icon: Baby,      title: 'Daycare transport',          img: '/images/hero/caregiver-van.jpg',          desc: 'Live child tracking with verified pickup and drop-off, so parents and daycare staff always know where every child is.' },
  { Icon: Bus,       title: 'School vans',                img: '/images/services/microtransit.jpg',       desc: 'Certified drivers with route and roster management for safe, on-time school runs.' },
  { Icon: Trophy,    title: 'Extracurricular & activity', img: '/images/services/ondemand.png',           desc: 'Flexible scheduled trips to sports, coaching, clubs, and programs — coordinated from one place.' },
  { Icon: Star,      title: 'Premium private facility',   img: '/images/hero/senior-car-smiling.jpg',     desc: 'White-glove, dedicated transport for private facilities and high-touch clients who expect more.' },
  { Icon: Building2, title: 'Organizations',              img: '/images/operators/transit-operators.jpg', desc: 'Corporate and community shuttles with dispatch tools and real-time visibility across your fleet.' },
]
export function OnDemandCore() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(a => (a + 1) % ONDEMAND_SUITE.length), 5000)
    return () => clearInterval(t)
  }, [paused])
  const cur = ONDEMAND_SUITE[active]
  return (
    <div className="core-para core-ondemand" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="core-para-media">
        {ONDEMAND_SUITE.map((s, i) => (
          <img key={s.title} src={s.img} alt={s.title} className={`core-media-slide${i === active ? ' active' : ''}`} loading="lazy" />
        ))}
        <div className="core-media-overlay" />
        <span className="core-media-cap">{cur.title}</span>
        <div className="core-media-dots">
          {ONDEMAND_SUITE.map((s, i) => (
            <button key={s.title} className={`core-media-dot${i === active ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={s.title} />
          ))}
        </div>
      </div>
      <div className="core-para-body">
        <span className="core-tag">On-demand suite</span>
        <h3 className="core-h">On-Demand</h3>
        <p className="core-lead">A suite of managed transport programs — booked, scheduled, and tracked from one platform. Choose a program to see it in action.</p>
        <div className="suite-tabs">
          {ONDEMAND_SUITE.map((s, i) => (
            <button key={s.title} className={`suite-tab${i === active ? ' active' : ''}`} onClick={() => setActive(i)} aria-expanded={i === active}>
              <span className="suite-tab-head">
                <span className="suite-tab-icon"><s.Icon size={18} strokeWidth={2} /></span>
                <span className="suite-tab-label">{s.title}</span>
                <ArrowRight size={16} className="suite-tab-arrow" />
              </span>
              {i === active && <span className="suite-tab-desc">{s.desc}</span>}
            </button>
          ))}
        </div>
        <Link to="/contact" className="core-cta">Book a demo <ArrowRight size={17} /></Link>
      </div>
    </div>
  )
}

/* ── PARATRANSIT CORE (split card) ────────────── */
const PARA_FEATURES = [
  { Icon: MapPin,      text: 'Live GPS tracking on every trip' },
  { Icon: Bell,        text: 'Automatic pickup & arrival alerts' },
  { Icon: ShieldCheck, text: 'Caregiver & family visibility, built in' },
]
export function ParatransitCore() {
  return (
    <div className="core-para">
      <div className="core-para-media">
        <img src="/images/services/paratransit.jpg" alt="Accessible paratransit van" />
      </div>
      <div className="core-para-body">
        <span className="core-tag">Accessibility layer</span>
        <h3 className="core-h">Paratransit</h3>
        <p className="core-lead">Accessible transit, modernized. Real-time tracking and caregiver visibility built for seniors, people with disabilities, and the care teams who support them.</p>
        <ul className="core-feats">
          {PARA_FEATURES.map(f => (
            <li key={f.text}><f.Icon size={18} strokeWidth={2.2} /><span>{f.text}</span></li>
          ))}
        </ul>
        <Link to="/contact" className="core-cta">Book a demo <ArrowRight size={17} /></Link>
      </div>
    </div>
  )
}

/* ── CHALLENGE (data section) ─────────────────── */
export function Challenge() {
  return (
    <section className="challenge-section">
      <div className="c">
        <div className="challenge-top">
          <h2 className="sec-h2">The data is clear.</h2>
        </div>
        <div className="challenge-grid">
          {[
            { stat: '87%', desc: 'of riders waited over 30 minutes for a single ride', note: 'sometimes two hours' },
            { stat: '83%', desc: 'missed a medical appointment or arrived too late due to transit', note: null },
            { stat: '91%', desc: 'of riders and caregivers want live vehicle tracking', note: 'asked unanimously' },
            { stat: '10+', unit: 'hrs / wk', desc: 'spent by care staff manually coordinating rides by phone', note: null },
          ].map(p => (
            <div key={p.stat} className="challenge-card">
              <div className="challenge-card-top">
                <span className="challenge-stat">{p.stat}</span>
                {p.unit && <span className="challenge-unit">{p.unit}</span>}
              </div>
              <p className="challenge-desc">{p.desc}</p>
              {p.note && <span className="challenge-note">{p.note}</span>}
            </div>
          ))}
        </div>
        <blockquote className="challenge-quote-bar">
          <p>"No way a person with a disability should have to spend 3 to 4 hours in a vehicle per day. It is unreasonable — leading to agitation, missed programs, and impacted wellbeing."</p>
          <cite>Disability service organization · Calgary · Provider survey</cite>
        </blockquote>
      </div>
    </section>
  )
}

/* ── IMPACT CARDS ─────────────────────────────── */
const IMPACT = [
  { img: '/images/hero/receptionist-smiling.jpg', title: 'Facility-wide coordination', desc: 'Care coordinators manage all riders, trips, and schedules from a single, simple dashboard.' },
  { img: '/images/hero/free-man.jpg',             title: 'Freed from the phone',       desc: 'Automatic alerts at every stage eliminate the constant stream of "where is the bus?" calls.' },
  { img: '/images/hero/smiling-at-phone.jpg',     title: 'Always know where they are', desc: 'Live GPS tracking gives caregivers, family, and staff real-time vehicle visibility on any device.' },
  { img: '/images/hero/senior-car-smiling.jpg',   title: 'Riders travel with dignity', desc: 'Riders know exactly where their vehicle is, so every trip feels safe, predictable, and respected.' },
  { img: '/images/hero/senior-family-smile.jpg',  title: 'Peace of mind for families', desc: 'Loved ones are updated automatically at pickup and arrival — no anxious phone calls.' },
  { img: '/images/hero/wheelchair-woman.jpg',     title: 'Independence, enabled',      desc: 'Riders with disabilities travel confidently — and care teams trust they are safe, every time.' },
]
export function ImpactCards() {
  return (
    <section className="impact-section">
      <div className="c">
        <div className="sec-hd centered">
          <p className="eyebrow">The solution</p>
          <h2 className="sec-h2">What Indro makes possible.</h2>
          <p className="sec-intro">From the moment a trip is booked to the moment the rider is safely home — everyone who needs to know, knows. In real time, without a single phone call.</p>
        </div>
        <div className="impact-grid">
          {IMPACT.map(item => (
            <div key={item.title} className="impact-card">
              <div className="impact-card-img"><img src={item.img} alt={item.title} /></div>
              <div className="impact-card-body">
                <h3 className="impact-title">{item.title}</h3>
                <p className="impact-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── WHO WE SERVE ─────────────────────────────── */
const HP_WHO = [
  { img: '/images/operators/senior-living.jpg',       tag: 'Senior living',         title: 'Long-term care & senior living',          desc: 'Coordinate resident transportation with less manual work and fewer missed appointments, while giving families real-time visibility into every trip.' },
  { img: '/images/operators/transit-operators.jpg',   tag: 'Transit operators',     title: 'Transit authorities & private operators', desc: 'Add live tracking, dispatch tools, and rider coordination to your existing fleet — no operational overhaul required to get started.' },
  { img: '/images/operators/disability-services.jpg', tag: 'Accessibility services', title: 'Disability & community services',         desc: 'Give riders and caregivers reliable transportation with clear, real-time trip updates from pickup to drop-off — every time.' },
]
export function WhoWeServe() {
  return (
    <section className="who-section" id="operators">
      <div className="c">
        <div className="sec-hd">
          <p className="eyebrow">Who this is for</p>
          <h2 className="sec-h2">Built for organizations<br />that move people.</h2>
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
  )
}

/* ── OUR STORY + MEDIA ────────────────────────── */
export function OurStory() {
  return (
    <section className="story-section" id="about">
      <div className="c">
        <div className="story-split">
          <div className="story-text">
            <p className="eyebrow">Our story</p>
            <h2 className="sec-h2">We built this because dignity in transit shouldn't be rare.</h2>
            <p className="story-body">We're a small team from Calgary who spent months sitting across from riders, family members, care coordinators, and transit operators. Every conversation came back to the same thing: no one knew where the ride was. And behind that simple frustration was something much harder — people feeling forgotten.</p>
            <p className="story-body">A grandmother waiting alone at the curb, not knowing if her ride was coming. A care worker calling dispatch for the fourth time. A daughter who couldn't reach anyone to confirm her father had arrived safely. These aren't edge cases. This is the daily reality for thousands of Albertans.</p>
            <p className="story-body">Indro is built on a simple belief: every rider deserves to feel seen, safe, and respected — and that starts with everyone knowing where the ride is. Not as a feature. As a baseline.</p>
          </div>
          <div className="story-photo-wrap">
            <img src="/brand/groupphoto.jpeg" alt="The Indro team" className="story-photo" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ─────────────────────────────── */
const TESTIMONIALS = [
  { quote: 'Consistency is an issue within Calgary Transit Access. Standardization or the ability to coordinate as a facility would be of great benefit.', name: 'Senior-serving organization', role: 'Calgary, AB · Provider survey' },
  { quote: "When I cancel an outbound trip, they always cancel my return trip without asking me. If I miss my ride because they didn't notify me, I have to take a taxi. An app that sends alerts would change everything.", name: 'CTA rider', role: 'Calgary, AB · Rider survey' },
  { quote: 'I just want to mention that this is an amazing project, and we welcome the great work you are doing on behalf of our organization and the individuals we support who are impacted so greatly.', name: 'Disability service organization', role: 'Calgary, AB · Provider survey' },
]
export function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="c">
        <div className="testimonials-hd">
          <p className="eyebrow">Heard directly</p>
          <h2 className="sec-h2">In their own words.</h2>
          <p className="testimonials-sub">We spent months listening. These are the voices that built Indro.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-attr">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FINAL CTA ────────────────────────────────── */
export function FinalCTA() {
  return (
    <section className="final-cta" id="book">
      <div className="c">
        <div className="final-cta-inner">
          <span className="final-cta-badge">Calgary · 2026</span>
          <h2 className="final-cta-h">Book a demo with us.</h2>
          <p className="final-cta-p">See how Indro coordinates accessible and on-demand transit in real time. Pick a time that works for you — we'll walk you through it.</p>
          <Link to="/contact" className="btn-primary final-cta-btn">Book a demo →</Link>
          <p className="final-cta-note">Prefer email? <a href="mailto:info@indrolabs.ca" className="final-cta-link">info@indrolabs.ca</a></p>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────── */
const FAQS = [
  { q: 'What kinds of organizations use Indro?', a: 'Youth and education programs, senior living and care facilities, private and corporate shuttles, municipal paratransit agencies, and custom fleets. If you move people on a schedule or on demand, Indro fits.' },
  { q: 'How do riders book a trip?', a: 'However suits them. Riders or coordinators can book through the Indro web portal or app, and dispatchers can log call-in requests for riders without a smartphone. Confirmation and driver details are sent immediately — no waiting for a callback.' },
  { q: 'Can parents, families, or staff track a ride in real time?', a: 'Yes. Anyone you authorize — a parent, family member, care coordinator, or clinician — gets a secure live-tracking link and automated text alerts at pickup, when the vehicle is near, and at drop-off. No account or download required.' },
  { q: 'Do drivers need special hardware?', a: 'No. Drivers use a simple, large-button app on a standard phone or tablet for digital manifests, check-in/check-out, and turn-by-turn routing. It updates your central dashboard in real time.' },
  { q: 'What types of vehicles and fleets are supported?', a: 'Any vehicle — sedans, vans, wheelchair-accessible vehicles, shuttles, and mixed fleets. The dispatch engine tracks each vehicle’s real-time capacity so the right equipment matches every trip.' },
  { q: 'Can it handle accessibility and compliance requirements?', a: 'Yes. Indro accounts for boarding buffer times, wheelchair-to-seat ratios, mandated pickup windows, and audit-ready reporting for regulated and NEMT services.' },
  { q: 'Can the rider experience be branded as ours?', a: 'For private and corporate shuttles, the passenger interface, live maps, and notifications can be fully white-labeled with your logo and colors.' },
  { q: 'How does an organization get started?', a: 'Reach out through our contact page and we’ll set up a walkthrough. We map your operation, configure your rules, and train your team — most operators are up and running within days, with no major IT overhaul.' },
]
export function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section">
      <div className="c faq-inner">
        <div className="faq-left">
          <p className="eyebrow">FAQ</p>
          <h2 className="sec-h2">Common questions</h2>
          <p className="faq-sub">Can't find your answer? <Link to="/contact" className="faq-link">Get in touch</Link> and we'll help.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── POPUP ────────────────────────────────────── */
export function Popup() {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem('indro-popup-seen')) return
    const t = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('indro-popup-seen', '1')
    }, 5000)
    return () => clearTimeout(t)
  }, [])
  const close = () => {
    setClosing(true)
    setTimeout(() => setVisible(false), 280)
  }
  if (!visible) return null
  return (
    <div className={`popup-overlay${closing ? ' closing' : ''}`} onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="popup-card">
        <button className="popup-close" onClick={close} aria-label="Close">✕</button>
        <span className="popup-badge">Calgary · 2026</span>
        <h3 className="popup-h">Book a demo with Indro.</h3>
        <p className="popup-p">See how Indro keeps riders, families, and operators connected in real time. Grab a time that works for you.</p>
        <Link to="/contact" className="btn-primary w-full" onClick={close}>Book a demo →</Link>
      </div>
    </div>
  )
}
