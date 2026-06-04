import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { ArrowRight, ArrowLeft, CheckCircle, ChevronRight, ChevronLeft, Star, Bell, Shield } from 'lucide-react'

/* ─────────────────────────────────────────────────
   HERO LANDSCAPE
───────────────────────────────────────────────── */
function HeroLandscape() {
  return (
    <div className="landscape-wrap">
      <img src="/houses-hills-v2.png" alt="Canadian neighbourhood" className="landscape-img"/>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   CITY TICKER
───────────────────────────────────────────────── */
function CityTicker() {
  const cities = ['Victoria','Mississauga','Hamilton','Toronto','Vancouver','Montréal','Calgary','Edmonton','Ottawa','Winnipeg','Saskatoon','Halifax']
  const doubled = [...cities, ...cities]
  return (
    <div className="city-ticker">
      <p className="city-ticker-label">TRUSTED BY HOMES IN</p>
      <div className="city-ticker-scroll">
        <div className="city-ticker-track">
          {doubled.map((c, i) => (
            <span key={i} className={`city-item${i % 3 === 1 ? ' city-item-italic' : ''}`}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   DASHBOARD PHONE OVERLAY
───────────────────────────────────────────────── */
function DashPhone() {
  const r = 32, circ = 2 * Math.PI * r
  const fill = (82 / 100) * circ
  return (
    <div className="dash-phone-wrap">
      <div className="dash-phone-frame">
        <div className="dp-notch"/>
        <div className="dp-screen">
          <div className="dp-hdr">
            <p className="dp-hdr-label">Home Score</p>
            <span className="dp-bell"><Bell size={11}/></span>
          </div>
          <div className="dp-gauge-wrap">
            <svg viewBox="0 0 80 80" className="dp-gauge-svg">
              <circle cx="40" cy="40" r={r} fill="none" stroke="#E8E6DE" strokeWidth="7"/>
              <circle cx="40" cy="40" r={r} fill="none" stroke="#4A7820" strokeWidth="7"
                strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" transform="rotate(-90 40 40)"/>
              <text x="40" y="37" textAnchor="middle" fontSize="15" fontWeight="800" fill="#14140F" fontFamily="DM Sans,sans-serif">82</text>
              <text x="40" y="48" textAnchor="middle" fontSize="6" fontWeight="700" fill="#4A7820" fontFamily="DM Sans,sans-serif" letterSpacing="0.8">GOOD</text>
            </svg>
            <p className="dp-score-cap">Your home is on track</p>
          </div>
          <div className="dp-items">
            {[
              { label:'HVAC',    status:'Serviced', ok:true  },
              { label:'Radon',   status:'Tested',   ok:true  },
              { label:'Eaves',   status:'Due soon', ok:false },
            ].map(i => (
              <div className="dp-item" key={i.label}>
                <span className="dp-dot" style={{background: i.ok ? '#4A7820' : '#D97020'}}/>
                <span className="dp-item-label">{i.label}</span>
                <span className="dp-item-status" style={{color: i.ok ? '#4A7820' : '#D97020'}}>{i.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   DASHBOARD MOCKUP — INTERACTIVE
───────────────────────────────────────────────── */
const dashTabs = ['Overview','Seasonal plan','Contractors','Household','Warranties','Receipts']

const dashContent = {
  0: () => (
    <>
      <div className="dash-info-row">
        <div className="dash-info-card">
          <p className="dic-label">HOUSEHOLD</p>
          <p className="dic-val">4 + 🐕 <em>Maple</em></p>
          <p className="dic-sub">2 adults · 2 kids</p>
        </div>
        <div className="dash-info-card">
          <p className="dic-label">YEAR BUILT</p>
          <p className="dic-val">1988</p>
          <p className="dic-sub">Re-roofed 2019</p>
        </div>
        <div className="dash-info-card">
          <p className="dic-label">CLIMATE ZONE</p>
          <p className="dic-val">6A</p>
          <p className="dic-sub">Avg 18 freeze cycles</p>
        </div>
      </div>
      <div className="dash-season-row">
        {[
          { s:'SPRING', cls:'ss-spring', icon:'🌿', task:'Eaves & roof',    date:'Apr 12 · Booked' },
          { s:'SUMMER', cls:'ss-summer', icon:'☀️', task:'A/C tune-up',     date:'Jun 02' },
          { s:'AUTUMN', cls:'ss-autumn', icon:'🍂', task:'Furnace check',   date:'Sep 18' },
          { s:'WINTER', cls:'ss-winter', icon:'❄️', task:'Pipe insulation', date:'Nov 24' },
        ].map(item => (
          <div className="dash-season-card" key={item.s}>
            <div className={`season-swatch ${item.cls}`}>
              <span className="season-swatch-icon">{item.icon}</span>
            </div>
            <p className="season-label">{item.s}</p>
            <p className="season-task">{item.task}</p>
            <p className="season-date">{item.date}</p>
          </div>
        ))}
      </div>
    </>
  ),
  1: () => (
    <div className="dash-seasonal-detail">
      {[
        { month:'April',     task:'Eaves & gutters cleaned',         status:'Booked',  statusCls:'booked'  },
        { month:'May',       task:'Radon test (annual)',              status:'Pending', statusCls:'pending' },
        { month:'June',      task:'A/C unit serviced & filter swap',  status:'Pending', statusCls:'pending' },
        { month:'September', task:'Furnace inspection & filter',      status:'Pending', statusCls:'pending' },
        { month:'October',   task:'Weatherstripping checked',         status:'Pending', statusCls:'pending' },
        { month:'November',  task:'Pipe insulation & exterior prep',  status:'Pending', statusCls:'pending' },
      ].map(r => (
        <div className="season-detail-row" key={r.month}>
          <span className="sdr-month">{r.month}</span>
          <span className="sdr-task">{r.task}</span>
          <span className={`sdr-status sdr-${r.statusCls}`}>{r.status}</span>
        </div>
      ))}
    </div>
  ),
  2: () => (
    <div className="dash-contractors">
      {[
        { initials:'JK', name:'James Kowalski', role:'HVAC Specialist',        rating:'4.9', loc:'Calgary, AB',    avail:'Available this week' },
        { initials:'SR', name:'Sarah Reynolds', role:'Radon & Indoor Air',     rating:'4.8', loc:'Edmonton, AB',   avail:'Available tomorrow' },
        { initials:'MT', name:'Mike Tremblay',  role:'Roofing & Eavestroughs', rating:'5.0', loc:'Airdrie, AB',    avail:'Booked to May 8' },
      ].map(c => (
        <div className="contractor-row" key={c.name}>
          <div className="c-avatar">{c.initials}</div>
          <div className="c-info">
            <p className="c-name">{c.name}</p>
            <p className="c-role">{c.role} · ⭐ {c.rating} · 📍 {c.loc}</p>
          </div>
          <span className={`c-avail ${c.avail.startsWith('Available') ? 'c-avail-yes' : 'c-avail-soon'}`}>{c.avail}</span>
        </div>
      ))}
    </div>
  ),
  3: () => (
    <div className="dash-household">
      <div className="hh-row"><span className="hh-label">Adults</span><span className="hh-val">2</span></div>
      <div className="hh-row"><span className="hh-label">Children</span><span className="hh-val">2 (ages 5 &amp; 9)</span></div>
      <div className="hh-row"><span className="hh-label">Pet</span><span className="hh-val">🐕 Maple — Golden Retriever</span></div>
      <div className="hh-row"><span className="hh-label">Climate zone</span><span className="hh-val">6A · Prairie winters</span></div>
      <div className="hh-row"><span className="hh-label">Home type</span><span className="hh-val">Detached · Full basement</span></div>
    </div>
  ),
  4: () => (
    <div className="dash-warranties">
      {[
        { item:'Furnace (Carrier)',    expires:'Mar 2028', status:'Active'  },
        { item:'Roof shingles',        expires:'Jun 2034', status:'Active'  },
        { item:'Hot water heater',     expires:'Aug 2024', status:'Expired' },
        { item:'Appliance package',    expires:'Dec 2026', status:'Active'  },
      ].map(w => (
        <div className="warranty-row" key={w.item}>
          <span className="w-item">{w.item}</span>
          <span className="w-expires">Exp. {w.expires}</span>
          <span className={`w-status ${w.status === 'Active' ? 'w-active' : 'w-expired'}`}>{w.status}</span>
        </div>
      ))}
    </div>
  ),
  5: () => (
    <div className="dash-receipts">
      {[
        { date:'Mar 14, 2025', desc:'Furnace tune-up — Kowalski HVAC',  amount:'$189' },
        { date:'Oct 2, 2024',  desc:'Eaves cleaning — CleanPro',         amount:'$240' },
        { date:'Jun 18, 2024', desc:'A/C service — CoolAir Calgary',     amount:'$155' },
        { date:'Apr 5, 2024',  desc:'Radon test kit — CML Labs',         amount:'$45'  },
      ].map(r => (
        <div className="receipt-row" key={r.desc}>
          <span className="r-date">{r.date}</span>
          <span className="r-desc">{r.desc}</span>
          <span className="r-amount">{r.amount}</span>
        </div>
      ))}
    </div>
  ),
}

function DashboardMockup() {
  const [activeTab, setActiveTab] = useState(0)
  const Content = dashContent[activeTab] || dashContent[0]
  return (
    <div className="dash-browser">
      <div className="dash-chrome">
        <div className="dash-dots">
          <span className="dd dd-r"/><span className="dd dd-y"/><span className="dd dd-g"/>
        </div>
        <div className="dash-url">indro.health&nbsp;/&nbsp;42-oak-crescent</div>
      </div>
      <div className="dash-body">
        <div className="dash-sidebar">
          <p className="dash-addr">42 OAK CRESCENT</p>
          <nav className="dash-nav">
            {dashTabs.map((t, i) => (
              <button key={t} className={`dash-nav-item${activeTab === i ? ' dn-active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
            ))}
          </nav>
        </div>
        <div className="dash-main">
          <Content/>
        </div>
      </div>
      <DashPhone/>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   FEATURES CAROUSEL
───────────────────────────────────────────────── */
const features = [
  { title:'Who lives here',      desc:'Kids, partners, parents — we flag risks like radon near nurseries or accessibility needs after 65.' },
  { title:'Pets in the mix',     desc:'Allergen filters, fence checks, and salt-free de-icing because Maple licks her paws.' },
  { title:'Local weather',       desc:'We watch the forecast for you. Ice storm Tuesday? We move your eaves cleaning.' },
  { title:'Your home\'s age',    desc:'A 1962 bungalow has different needs than a 2018 build. We know both.' },
  { title:'Your schedule',       desc:'Tell us you travel Tuesdays. We won\'t book a plumber on Tuesday.' },
  { title:'Your budget',         desc:'Pace big-ticket work over the year. Skip nothing critical.' },
]

function FeaturesCarousel() {
  const [start, setStart] = useState(0)
  const perPage = 3
  const canPrev = start > 0
  const canNext = start + perPage < features.length
  const visible = features.slice(start, start + perPage)

  return (
    <div className="carousel-wrap">
      <div className="features-grid">
        {visible.map(f => (
          <div className="feature-card" key={f.title}>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className={`carousel-btn${canPrev ? '' : ' disabled'}`} onClick={() => canPrev && setStart(start - perPage)} aria-label="Previous">
          <ChevronLeft size={18}/>
        </button>
        <div className="carousel-dots">
          {Array.from({ length: Math.ceil(features.length / perPage) }).map((_, i) => (
            <span key={i} className={`cdot${Math.floor(start / perPage) === i ? ' cdot-active' : ''}`} onClick={() => setStart(i * perPage)}/>
          ))}
        </div>
        <button className={`carousel-btn${canNext ? '' : ' disabled'}`} onClick={() => canNext && setStart(start + perPage)} aria-label="Next">
          <ChevronRight size={18}/>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   QUIZ  (new category-based version)
───────────────────────────────────────────────── */
const newQuestions = [
  {
    q: 'What type of home do you live in?',
    multi: false,
    options: ['Detached house','Semi-detached / duplex','Townhouse','Condo / apartment'],
  },
  {
    q: 'Does your home have a basement?',
    multi: false,
    options: ['Yes — finished basement','Yes — unfinished basement','Crawl space','No basement / slab'],
  },
  {
    q: 'Who lives in your home? (select all that apply)',
    multi: true,
    options: ['Children under 12','Adults 65 or older','Pets','None of these'],
  },
  {
    q: 'Any hobbies that happen at home? (select all that apply)',
    multi: true,
    options: ['Woodworking or DIY','Painting / art projects','Heavy cooking','Home gym or workshop','None of these'],
  },
  {
    q: 'Where in Canada is your home?',
    multi: false,
    options: ['Prairies — AB / SK / MB','Ontario or Quebec','British Columbia','Atlantic Canada / North'],
  },
  {
    q: 'Has your home been tested for any of these? (select all that apply)',
    multi: true,
    options: ['Radon gas','Mold or moisture','HVAC / furnace efficiency','None of these'],
  },
]

function getCategories(answers) {
  const cats = []
  const a = answers

  // Radon: basement + prairies/ontario + not tested
  const hasBasement = ['Yes — finished basement','Yes — unfinished basement','Crawl space'].includes(a[1]?.[0])
  const prairies = ['Prairies — AB / SK / MB','Ontario or Quebec'].includes(a[4]?.[0])
  const testedRadon = a[5]?.includes('Radon gas')
  if (hasBasement && !testedRadon) cats.push({ icon:'🔬', label:'Radon Testing', desc:'Basement homes in your region often have elevated radon. A simple test takes 3 months.' })

  // Mold: basement or older home
  const hasOldHome = ['10 – 30 years','Over 30 years'].includes(a[2]?.[0])
  const testedMold = a[5]?.includes('Mold or moisture')
  if (hasBasement && !testedMold) cats.push({ icon:'💧', label:'Moisture & Mold Inspection', desc:'Unfinished basements and crawl spaces in Canada commonly develop moisture issues.' })

  // HVAC
  const testedHVAC = a[5]?.includes('HVAC / furnace efficiency')
  if (!testedHVAC) cats.push({ icon:'🌡️', label:'HVAC & Furnace Service', desc:'Annual furnace servicing is the single highest-value maintenance most Canadian homes skip.' })

  // Kids/elderly/pets: air quality
  const vulnPeople = a[2]?.some(x => ['Children under 12','Adults 65 or older','Pets'].includes(x))
  if (vulnPeople) cats.push({ icon:'💨', label:'Indoor Air Quality Check', desc:'Kids, seniors, and pets are more sensitive to air quality issues. Worth checking VOCs and allergens.' })

  // Hobbies: air/VOC risk
  const riskyHobbies = a[3]?.some(x => ['Woodworking or DIY','Painting / art projects','Heavy cooking'].includes(x))
  if (riskyHobbies) cats.push({ icon:'🪵', label:'Ventilation Assessment', desc:'Your hobbies can introduce VOCs, dust, and particulates. Proper ventilation makes a big difference.' })

  // Seasonal
  cats.push({ icon:'📅', label:'Seasonal Maintenance Plan', desc:'Every Canadian home benefits from a structured spring/fall service schedule.' })

  return cats.slice(0, 4) // cap at 4
}

function Quiz() {
  const [step, setStep]         = useState(0)
  const [answers, setAnswers]   = useState({})    // { stepIndex: [selected labels] }
  const [selected, setSelected] = useState([])
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [done, setDone]         = useState(false)
  const [err, setErr]           = useState(false)

  const total = newQuestions.length
  const onResult = step > total
  const cats = getCategories(answers)

  const toggleOption = (label) => {
    const q = newQuestions[step - 1]
    if (!q.multi) {
      setSelected([label])
    } else {
      if (label === 'None of these') {
        setSelected(['None of these'])
      } else {
        const without = selected.filter(x => x !== 'None of these')
        setSelected(without.includes(label) ? without.filter(x => x !== label) : [...without, label])
      }
    }
  }

  const next = () => {
    if (selected.length === 0) return
    setAnswers(prev => ({ ...prev, [step - 1]: selected }))
    setSelected([])
    setStep(s => s + 1)
  }

  const submit = async (e) => {
    e.preventDefault(); setErr(false)
    try {
      const r = await fetch(import.meta.env.VITE_FORMSPREE_WAITLIST_URL, {
        method: 'POST',
        body: JSON.stringify({ name, email, categories: cats.map(c => c.label), answers }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      r.ok ? setDone(true) : setErr(true)
    } catch { setErr(true) }
  }

  const pct = step === 0 ? 0 : Math.round((step / total) * 100)

  if (step === 0) return (
    <div className="qz-panel">
      <p className="qz-meta">6 questions · 2 minutes</p>
      <h3 className="qz-h3">What does your home actually need?</h3>
      <p className="qz-desc">Tell us about your home and family. We'll build a personalized list of services and seasonal tasks — no fluff.</p>
      <button className="pill-dark" onClick={() => setStep(1)}>Start the quiz <ArrowRight size={15}/></button>
    </div>
  )

  if (onResult) return (
    <div className="qz-panel">
      <p className="qz-meta" style={{ color: '#4A7820', fontWeight: 700 }}>Your home profile is ready</p>
      <h3 className="qz-h3">We'd look into these for your home.</h3>
      <div className="result-cats">
        {cats.map(c => (
          <div className="result-cat" key={c.label}>
            <span className="rc-icon">{c.icon}</span>
            <div>
              <p className="rc-label">{c.label}</p>
              <p className="rc-desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {!done ? (
        <form onSubmit={submit} className="qz-form">
          <p className="qz-form-title">Get your full personalized home plan — free.</p>
          <input type="text"  placeholder="Your name"     value={name}  onChange={e => setName(e.target.value)}  required/>
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required/>
          <button type="submit" className="pill-dark" style={{ width:'100%', justifyContent:'center' }}>
            Send My Home Plan <ArrowRight size={15}/>
          </button>
          {err && <p className="qz-err">Something went wrong — please try again.</p>}
          <p className="qz-fine">No spam. Unsubscribe any time.</p>
        </form>
      ) : (
        <div className="qz-success">
          <CheckCircle size={28} className="qz-check-icon"/>
          <h4>You're on the list.</h4>
          <p>We'll send your personalized home plan and keep you posted as Indro Labs launches in your area.</p>
        </div>
      )}
    </div>
  )

  const q = newQuestions[step - 1]
  return (
    <div className="qz-panel">
      <div className="qz-progress"><div className="qz-bar" style={{ width:`${pct}%` }}/></div>
      <p className="qz-step-lbl">{step} / {total}</p>
      <h3 className="qz-h3">{q.q}</h3>
      {q.multi && <p className="qz-multi-hint">Select all that apply</p>}
      <div className="qz-opts">
        {q.options.map(o => (
          <button key={o} className={`qz-opt${selected.includes(o) ? ' sel' : ''}`} onClick={() => toggleOption(o)}>
            <span className={`qz-radio${q.multi ? ' qz-check' : ''}`}/>
            {o}
          </button>
        ))}
      </div>
      <button className="pill-dark" onClick={next} disabled={selected.length === 0}>
        {step === total ? 'See My Home Plan' : 'Next'} <ChevronRight size={15}/>
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   APP
───────────────────────────────────────────────── */
export default function App() {
  const [status, setStatus] = useState(null)

  const handleContact = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const r = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
      method:'POST', body: new FormData(form), headers:{ Accept:'application/json' },
    })
    if (r.ok) { setStatus({ ok:true, msg:"Thank you — we'll be in touch soon." }); form.reset() }
    else setStatus({ ok:false, msg:'Something went wrong. Please try again.' })
  }

  return (
    <>
      {status && (
        <div className={`toast ${status.ok ? 'toast-ok':'toast-err'}`}>
          <p>{status.msg}</p>
          <button onClick={() => setStatus(null)}>×</button>
        </div>
      )}

      <NavBar />

      {/* ── HERO ──────────────────────────── */}
      <section id="hero" className="hero-section">
        <div className="hero-text">
          <h1 className="hero-h1">
            Your life is complicated.<br/>
            <em>Your home shouldn't be.</em>
          </h1>
          <p className="hero-sub">
            Indro Labs is the home management platform built for Canada. We learn your house,
            your people, your climate — then handle everything with vetted local contractors.
          </p>
          <div className="hero-ctas">
            <a href="#quiz-section" className="pill-dark">Take the 2-min quiz <ArrowRight size={15}/></a>
            <a href="#how-it-works" className="pill-outline">See how it works</a>
          </div>
        </div>
        <HeroLandscape/>
      </section>

      {/* ── CITY TICKER ─────────────────── */}
      <CityTicker/>

      {/* ── HOME VAULT ──────────────────── */}
      <section id="how-it-works" className="vault-section">
        <div className="wrap">
          <p className="eyebrow-green">THE HOME VAULT</p>
          <h2 className="vault-h2">
            Everything about your home,<br/>
            <em>finally in one place.</em>
          </h2>
          <DashboardMockup/>
        </div>
      </section>

      {/* ── BUILT AROUND YOU ────────────── */}
      <section id="home-health" className="built-section">
        <div className="wrap">
          <p className="eyebrow-green">BUILT AROUND YOU</p>
          <h2 className="built-h2">
            We take your <em>whole life</em> into account.
          </h2>
          <p className="built-sub">
            Not just your square footage. Indro Labs tunes your home plan to the people, pets,
            and weather that actually live there.
          </p>
          <FeaturesCarousel/>
        </div>
      </section>

      {/* ── QUIZ SECTION ────────────────── */}
      <section id="quiz-section" className="quiz-section">
        <div className="wrap quiz-wrap">

          {/* Left: rewards / help vibe */}
          <div className="quiz-left">
            <p className="eyebrow-green">HOME HEALTH QUIZ</p>
            <h2 className="quiz-h2">
              Earn as you<br/><em>maintain.</em>
            </h2>
            <p className="quiz-left-sub">
              Keep your home in shape and earn points along the way.
              Redeem them for contractor discounts, seasonal tune-up packages, and member perks.
            </p>

            <div className="quiz-perks">
              <div className="quiz-perk">
                <div className="perk-icon"><Star size={16}/></div>
                <div>
                  <p className="perk-title">Earn rewards</p>
                  <p className="perk-desc">Points for every task completed — annual radon test, furnace service, and more.</p>
                </div>
              </div>
              <div className="quiz-perk">
                <div className="perk-icon"><Bell size={16}/></div>
                <div>
                  <p className="perk-title">Get reminded, not surprised</p>
                  <p className="perk-desc">Seasonal alerts before things become expensive emergencies.</p>
                </div>
              </div>
              <div className="quiz-perk">
                <div className="perk-icon"><Shield size={16}/></div>
                <div>
                  <p className="perk-title">Seek help easily</p>
                  <p className="perk-desc">One tap to book a vetted Canadian professional for any service your home needs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contractor CTA + quiz */}
          <div className="quiz-right">
            <div className="quiz-contractor-card">
              <p className="qcc-eyebrow">FIND TRUSTED CONTRACTORS</p>
              <h3 className="qcc-title">For every corner<br/>of your home.</h3>
              <p className="qcc-sub">
                Indro Labs matches you with certified, vetted Canadian professionals — based on your home,
                your climate, and your actual needs.
              </p>
            </div>
            <div className="quiz-card">
              <Quiz/>
            </div>
          </div>

        </div>
      </section>

      {/* ── DARK CTA ────────────────────── */}
      <section className="dark-cta-section">
        <div className="wrap">
          <div className="dark-cta-box">
            <div className="dark-cta-bg"/>
            <div className="dark-cta-left">
              <h2 className="dark-cta-h2">
                Stop remembering.<br/><em>Start living.</em>
              </h2>
              <p className="dark-cta-sub">
                Two minutes to set up. A lifetime of forgetting about your furnace filter.
              </p>
              <div className="dark-cta-btns">
                <a href="#quiz-section" className="pill-white">Take the quiz</a>
                <a href="#contact-section" className="pill-outline-white">Browse contractors</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <span className="footer-logo-icon">
                <img src="/indro-logo.png" alt="Indro Labs" style={{ width:16, height:16, objectFit:'contain' }}/>
              </span>
              Indro <em>Labs</em>
            </a>
            <p>Building the network behind healthier homes in Canada.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <p className="footer-col-head">PRODUCT</p>
              <a href="#how-it-works">How it works</a>
              <a href="#quiz-section">Take the quiz</a>
              <a href="#home-health">Home health</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-head">NETWORK</p>
              <a href="#contact-section">Partners</a>
              <a href="#contact-section">Professionals</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-head">COMPANY</p>
              <a href="#contact-section">Contact us</a>
              <a href="mailto:info@indrolabs.ca">info@indrolabs.ca</a>
            </div>
          </div>
        </div>
        <div className="footer-base">
          <div className="wrap">© 2026 Indro Labs · Alberta, Canada · All Rights Reserved.</div>
        </div>
      </footer>
    </>
  )
}
