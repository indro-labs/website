import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import { WaitlistForm, PartnerForm } from './components/Forms'
import './App.css'

/* ── STACK PANEL ──────────────────────────────── */
function StackPanel({ children, style }) {
  const wrapperRef = useRef(null)
  const panelRef   = useRef(null)

  useEffect(() => {
    const update = () => {
      if (!wrapperRef.current || !panelRef.current) return
      const panelH = panelRef.current.scrollHeight
      const dwell  = window.innerHeight
      wrapperRef.current.style.height = `${panelH + dwell}px`
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div ref={wrapperRef} className="panel-wrapper">
      <div ref={panelRef} className="scroll-panel" style={style}>
        {children}
      </div>
    </div>
  )
}

/* ── HERO ─────────────────────────────────────── */
const SLIDES = [
  { src: '/images/hero/senior-couple-smile.jpg',        alt: 'Senior couple smiling at laptop' },
  { src: '/images/hero/senior-couple.jpg',         alt: 'Senior couple smiling' },
  { src: '/images/hero/caregiver-van.jpg',         alt: 'Caregiver helping passenger from van' },
  
]
function Hero() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="hero-outer">
      <div className="hero-card">
        {SLIDES.map((s, i) => (
          <img key={i} src={s.src} alt={s.alt} className={`hero-bg-img${i === active ? ' active' : ''}`} fetchpriority={i === 0 ? 'high' : 'low'} loading={i === 0 ? 'eager' : 'lazy'} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-h1">
            Transportation operations
            <br />
            <em>made simple.</em>
          </h1>
          <p className="hero-sub">Transportation management for senior living communities, paratransit providers, and on-site shuttle services — keeping riders, families, and operators connected.</p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn-hero-cta">Get early access →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── PROBLEM STATEMENT ────────────────────────── */
function ProblemStatement() {
  return (
    <div className="problem-statement">
      <div className="c">
        <div className="problem-split">
          <div className="problem-left">
            <p className="eyebrow">The challenge</p>
            <h2 className="problem-h">Accessible transit runs on phone calls, guesswork, and manual coordination.</h2>
            <p className="problem-sub">Care organizations, transit operators, and the people they serve are all working with the same broken system — one that was never built for real-time visibility.</p>
          </div>
          <div className="problem-right">
            <div className="pain-cards">
              {[
                { role: 'Care coordinators', desc: 'Spend hours every week calling dispatch to confirm pickups, chase late rides, and update family members — manually.' },
                { role: 'Riders and families', desc: 'Have no way to know where the vehicle is, when it will arrive, or whether the trip is still on — until it is too late.' },
                { role: 'Transit operators', desc: 'Manage fleets and schedules with fragmented tools, fielding a constant stream of inbound status calls they cannot easily answer.' },
              ].map(p => (
                <div key={p.role} className="pain-card">
                  <h3 className="pain-role">{p.role}</h3>
                  <p className="pain-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── TRACTION BAR ─────────────────────────────── */
function TractionBar() {
  return (
    <div className="traction-bar">
      <div className="c traction-inner">
        {[
          { n: '50+',   l: 'Riders, families & caregivers interviewed' },
          { n: '8',     l: 'Care organizations waitlisted for the pilot' },
          { n: '4',     l: 'Organizations confirmed for 2026' },
          { n: '2026',  l: 'Calgary pilot launching this year' },
        ].map(t => (
          <div key={t.n} className="traction-item">
            <span className="traction-n">{t.n}</span>
            <span className="traction-l">{t.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CHALLENGE SECTION ────────────────────────── */
function Challenge() {
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

/* ── IMPACT / SOLUTION CARDS ──────────────────── */
const IMPACT = [
  { img: '/images/hero/receptionist-smiling.jpg',          title: 'Facility-wide coordination',  desc: 'Care coordinators manage all riders, trips, and schedules from a single, simple dashboard.' },
  { img: '/images/hero/free-man.jpg',      title: 'Freed from the phone',        desc: 'Automatic alerts at every stage eliminate the constant stream of "where is the bus?" calls.' },
  { img: '/images/hero/smiling-at-phone.jpg',               title: 'Always know where they are',  desc: 'Live GPS tracking gives caregivers, family, and staff real-time vehicle visibility on any device.' },
  { img: '/images/hero/senior-car-smiling.jpg',        title: 'Riders travel with dignity',         desc: 'Riders know exactly where their vehicle is, so every trip feels safe, predictable, and respected.' },
  { img: '/images/hero/senior-family-smile.jpg',               title: 'Peace of mind for families',  desc: 'Loved ones are updated automatically at pickup and arrival — no anxious phone calls.' },
  

 
  { img: '/images/hero/wheelchair-woman.jpg',    title: 'Independence, enabled',       desc: 'Riders with disabilities travel confidently — and care teams trust they are safe, every time.' },
]
function ImpactCards() {
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
              <div className="impact-card-img">
                <img src={item.img} alt={item.title} />
              </div>
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

/* ── SERVICES — overlay cards ─────────────────── */
function Services() {
  return (
    <section id="services" className="services-section">
      <div className="c">
        <div className="services-top-bar">
          <span className="eyebrow" style={{ margin: 0 }}>What we offer</span>
          <div className="services-top-line" />
        </div>
        <div className="svc-overlay-grid">
          {[
            { img: '/images/services/paratransit.jpg',  label: 'PARATRANSIT',  title: 'Accessible transit, modernized.', desc: 'Real-time tracking and caregiver visibility designed for accessible transportation providers.' },
            { img: '/images/services/ondemand.png',     label: 'ON-DEMAND',    title: 'Rides when you need them.',       desc: 'Flexible on-demand trips without fixed schedules. Book and dispatch from one platform.' },
            { img: '/images/services/microtransit.jpg', label: 'MICROTRANSIT', title: 'Shared rides. Smarter routes.',   desc: 'Dynamic routing and rider management that makes shared trips efficient and affordable.' },
          ].map(c => (
            <div key={c.label} className="svc-overlay-card">
              <img src={c.img} alt={c.label} className="svc-overlay-img" />
              <div className="svc-overlay-static">
                <span className="svc-overlay-label">{c.label}</span>
              </div>
              <div className="svc-overlay-hover">
                <h3 className="svc-overlay-title">{c.title}</h3>
                <p className="svc-overlay-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── WHO WE SERVE ────────────────────────────── */
const HP_WHO = [
  { img: '/images/operators/senior-living.jpg',       tag: 'Senior living',         title: 'Long-term care & senior living',         desc: 'Coordinate resident transportation with less manual work and fewer missed appointments, while giving families real-time visibility into every trip.' },
  { img: '/images/operators/transit-operators.jpg',   tag: 'Transit operators',      title: 'Transit authorities & private operators', desc: 'Add live tracking, dispatch tools, and rider coordination to your existing fleet — no operational overhaul required to get started.' },
  { img: '/images/operators/disability-services.jpg', tag: 'Accessibility services', title: 'Disability & community services',         desc: 'Give riders and caregivers reliable transportation with clear, real-time trip updates from pickup to drop-off — every time.' },
]
function WhoWeServe() {
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

/* ── WHERE WE OPERATE ─────────────────────────── */
const AB_REGIONS = [
  { id: 'calgary', name: 'Greater Calgary', status: 'serving', cities: ['Calgary', 'Airdrie', 'Okotoks', 'Cochrane', 'Chestermere'], services: ['Paratransit', 'Microtransit', 'On-demand'], desc: 'Active deployments with partner organizations across the greater Calgary area.', photo: '/images/regions/calgary.jpg', path: 'M 30,427 L 390,427 L 390,500 L 22,500 L 26,465 Z', labelX: 185, labelY: 467, pins: [{ name: 'Calgary', cx: 221, cy: 455 }, { name: 'Airdrie', cx: 223, cy: 443 }] },
  { id: 'edmonton', name: 'Edmonton Region', status: 'soon', cities: ['Edmonton', 'St. Albert', 'Leduc', 'Spruce Grove', 'Sherwood Park'], services: ['Paratransit', 'On-demand'], desc: 'Expansion planning underway with organizations in the Edmonton Capital Region.', photo: '/images/regions/edmonton.png', path: 'M 48,206 L 390,206 L 390,353 L 38,353 L 42,280 Z', labelX: 195, labelY: 278, pins: [{ name: 'Edmonton', cx: 242, cy: 324 }] },
  { id: 'central', name: 'Central Alberta', status: 'soon', cities: ['Red Deer', 'Lacombe', 'Innisfail', 'Sylvan Lake'], services: ['Microtransit', 'On-demand'], desc: 'Planned expansion beginning with Central Alberta communities.', photo: '/images/regions/central-alberta.png', path: 'M 38,353 L 390,353 L 390,427 L 30,427 L 34,390 Z', labelX: 192, labelY: 394, pins: [{ name: 'Red Deer', cx: 231, cy: 387 }] },
  { id: 'south', name: 'Southern Alberta', status: 'soon', cities: ['Lethbridge', 'Medicine Hat', 'Brooks', 'Taber'], services: ['On-demand', 'Paratransit'], desc: 'Southern Alberta communities included in long-term expansion plans.', photo: '/images/regions/southern-alberta.png', path: 'M 22,500 L 390,500 L 390,552 L 36,552 Z', labelX: 192, labelY: 530, pins: [{ name: 'Lethbridge', cx: 266, cy: 516 }, { name: 'Medicine Hat', cx: 346, cy: 510 }] },
  { id: 'north', name: 'Northern Alberta', status: 'future', cities: ['Fort McMurray', 'Peace River', 'Grande Prairie', 'High Level'], services: ['Planning underway'], desc: 'Northern Alberta included in long-term rollout roadmap.', photo: '/images/regions/northern-alberta.png', path: 'M 58,10 L 390,10 L 390,206 L 48,206 L 54,100 Z', labelX: 200, labelY: 108, pins: [{ name: 'Ft McMurray', cx: 318, cy: 168 }] },
]
function WhereWeOperate() {
  const [active, setActive] = useState('calgary')
  const r = AB_REGIONS.find(x => x.id === active)
  return (
    <section id="where" className="where-section">
      <div className="c">
        <div className="sec-hd">
          <p className="eyebrow">Coverage</p>
          <h2 className="sec-h2">Where we operate</h2>
        </div>
        <div className="where-tabs">
          {AB_REGIONS.map(reg => (
            <button key={reg.id} className={`where-tab${active === reg.id ? ' active' : ''}${reg.status === 'serving' ? ' serving' : ''}`} onClick={() => setActive(reg.id)}>
              {reg.status === 'serving' && <span className="tab-dot" />}
              {reg.name}
            </button>
          ))}
        </div>
        <div className="where-panel" key={active}>
          <div className="where-panel-left">
            <div className="where-status-row">
              <h3 className="where-region-h">{r.name}</h3>
              <span className={`where-status-badge ${r.status}`}>{r.status === 'serving' ? 'Serving now' : r.status === 'soon' ? 'Coming 2027' : 'Planned'}</span>
            </div>
            <p className="where-region-desc">{r.desc}</p>
            <div className="where-block">
              <p className="where-block-label">Communities</p>
              <div className="where-chips">{r.cities.map(c => <span key={c} className="where-chip">{c}</span>)}</div>
            </div>
            <div className="where-block">
              <p className="where-block-label">{r.status === 'serving' ? 'Services operating' : 'Planned services'}</p>
              <div className="where-chips">{r.services.map(s => <span key={s} className={`where-chip svc ${r.status}`}>{s}</span>)}</div>
            </div>
          </div>
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

/* ── OUR STORY + MEDIA ────────────────────────── */
function OurStory() {
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

        <div className="media-links-row">
          <a href="https://www.instagram.com/reel/DY7hX7HNP28/" target="_blank" rel="noopener noreferrer" className="media-link-item">
            <span className="media-link-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            Watch our story
            <span className="media-link-arrow">→</span>
          </a>
          <a href="https://ucalgary.ca/news/ai-bootcamp-helps-students-design-their-own-futures" target="_blank" rel="noopener noreferrer" className="media-link-item">
            <span className="media-link-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </span>
            Read our article
            <span className="media-link-arrow">→</span>
          </a>
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
function Testimonials() {
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

/* ── POPUP ────────────────────────────────────── */
function Popup() {
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
        <span className="popup-badge">Calgary Pilot · 2026</span>
        <h3 className="popup-h">Be part of what comes next.</h3>
        <p className="popup-p">We're selecting a small number of care organizations in Alberta to join our 2026 pilot. Spots are limited — leave your info and we'll be in touch.</p>
        <WaitlistForm compact />
      </div>
    </div>
  )
}

/* ── FINAL CTA ────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="final-cta" id="waitlist">
      <div className="c">
        <div className="final-cta-inner">
          <span className="final-cta-badge">Calgary Pilot · 2026</span>
          <h2 className="final-cta-h">We're selecting a small number of organizations to work with first.</h2>
          <p className="final-cta-p">If you coordinate transit for seniors, people with disabilities, or care facilities in Alberta — you're exactly who we built this for. This isn't a sign-up page. It's an application to be one of the first.</p>
          <div className="final-cta-form" id="partner">
            <WaitlistForm />
          </div>
          <p className="final-cta-note">Not a transit operator? <a href="mailto:hello@indrotransit.ca" className="final-cta-link">Email us directly.</a></p>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────── */
const FAQS = [
  { q: 'How do riders book a trip?', a: 'Riders or their care coordinators can book through the Indro app or by calling in. Confirmation and driver details are sent immediately — no waiting for a callback.' },
  { q: 'Can family members track a ride in real time?', a: 'Yes. You can add any family member, care coordinator, or clinician to a trip. They receive live updates and can view the map without needing their own account.' },
  { q: 'What types of vehicles are supported?', a: 'Indro works with any accessible vehicle — wheelchair-accessible vans, standard accessible transit, and private care vehicles of all sizes.' },
  { q: 'Is Indro only for seniors?', a: 'No. While we focus on senior living and paratransit, Indro serves any community transportation need including disability services and on-demand transit.' },
  { q: 'How does an operator get started?', a: 'Reach out through our Partner form and we will set up a demo. Most operators are fully up and running within a few days — no major IT overhaul required.' },
]
function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section">
      <div className="c faq-inner">
        <div className="faq-left">
          <p className="eyebrow">FAQ</p>
          <h2 className="sec-h2">Common questions</h2>
          <p className="faq-sub">Can't find your answer? <a href="/#waitlist" className="faq-link">Get in touch</a> and we'll help.</p>
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

/* ── APP ──────────────────────────────────────── */
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
      <Popup />
      <NavBar />

      <Hero />

      <div className="sections-wrap">
        <ProblemStatement />
        <TractionBar />
        <ImpactCards />
        <Services />
        <WhoWeServe />
        <Testimonials />
        <OurStory />
        <FinalCTA />
        <FAQ />
      </div>

      <Footer />
    </>
  )
}
