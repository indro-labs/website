import { useState, useEffect, useRef } from 'react'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { ArrowRight, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react'
import whoLivesThere from './assets/whoLivesThere.jpeg'
import petsImg from './assets/pets.jpeg'
import localWeather from './assets/localWeather.jpeg'
import maintenanceImg from './assets/maintenance.jpeg'
import homeAgeImg from './assets/ForyourHomesAge.jpeg'
import yourPriority from './assets/YourPriority.jpeg'

/* ─────────────────────────────────────────────────
   HERO LANDSCAPE
───────────────────────────────────────────────── */
function HeroLandscape() {
  return (
    <div className="landscape-wrap">
      <img src="/houses-hills-v3.png" alt="Canadian neighbourhood" className="landscape-img"/>
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
      <p className="city-ticker-label">COMING SOON TO HOMES IN</p>
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
   HEALTH SCORE CARD (dashboard overview)
───────────────────────────────────────────────── */
function HealthScoreCard() {
  const r = 38, circ = 2 * Math.PI * r
  const fill = (82 / 100) * circ
  return (
    <div className="health-score-card">
      <div className="hsc-left">
        <p className="hsc-label">HOME SCORE</p>
        <svg viewBox="0 0 90 90" className="hsc-gauge">
          <circle cx="45" cy="45" r={r} fill="none" stroke="#E8E6DE" strokeWidth="8"/>
          <circle cx="45" cy="45" r={r} fill="none" stroke="#4A7820" strokeWidth="8"
            strokeDasharray={`${fill} ${circ}`} strokeLinecap="round" transform="rotate(-90 45 45)"/>
          <text x="45" y="42" textAnchor="middle" fontSize="18" fontWeight="800" fill="#14140F" fontFamily="DM Sans,sans-serif">82</text>
          <text x="45" y="55" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4A7820" fontFamily="DM Sans,sans-serif" letterSpacing="1">GOOD</text>
        </svg>
        <p className="hsc-caption">Your home is on track</p>
      </div>
      <div className="hsc-right">
        {[
          { label:'HVAC',    status:'Serviced', ok:true  },
          { label:'Radon',   status:'Tested',   ok:true  },
          { label:'Eaves',   status:'Due soon', ok:false },
          { label:'Furnace', status:'Booked',   ok:true  },
        ].map(item => (
          <div className="hsc-item" key={item.label}>
            <span className="hsc-dot" style={{ background: item.ok ? '#4A7820' : '#D97020' }}/>
            <span className="hsc-item-label">{item.label}</span>
            <span className="hsc-item-status" style={{ color: item.ok ? '#4A7820' : '#D97020' }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   DASHBOARD MOCKUP
───────────────────────────────────────────────── */
const dashTabs = ['Overview','Seasonal plan','Contractors','Household','Warranties','Receipts']

const dashContent = {
  0: () => (
    <>
      <HealthScoreCard/>
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
        { initials:'SR', name:'Sarah Reynolds', role:'Radon & Indoor Air',     rating:'4.8', loc:'Edmonton, AB',   avail:'Available tomorrow'  },
        { initials:'MT', name:'Mike Tremblay',  role:'Roofing & Eavestroughs', rating:'5.0', loc:'Airdrie, AB',    avail:'Booked to May 8'     },
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
    </div>
  )
}

/* ─────────────────────────────────────────────────
   FEATURES CAROUSEL
───────────────────────────────────────────────── */
const features = [
  {
    title: 'Who lives here',
    desc: 'Children, seniors, pets, and household health needs can all influence what your home should prioritize.',
    img: whoLivesThere,
  },
  {
    title: 'Pets in the mix',
    desc: 'Pets can affect air quality, cleaning needs, and seasonal maintenance around the home.',
    img: petsImg,
  },
  {
    title: 'Local weather',
    desc: 'Your climate affects everything from HVAC maintenance to winter preparation and outdoor upkeep.',
    img: localWeather,
  },
  {
    title: "Your home's age",
    desc: 'Older homes and newer builds often have different maintenance, safety, and inspection priorities.',
    img: homeAgeImg,
  },
  {
    title: 'Maintenance history',
    desc: 'Past inspections, repairs, and upgrades help us understand what may need attention next.',
    img: maintenanceImg,
  },
  {
    title: 'Your priorities',
    desc: 'Whether you care most about health, comfort, efficiency, or prevention, your plan adapts to your goals.',
    img: yourPriority,
  },
]

function FeaturesCarousel() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const go = (i) => {
    setActive(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setActive(a => (a + 1) % features.length), 3500)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % features.length), 3500)
    return () => clearInterval(timerRef.current)
  }, [])

  const f = features[active]

  return (
    <div className="bau-carousel">
      <div className="bau-slide">
        <img src={f.img} alt={f.title} className="bau-slide-img"/>
        <div className="bau-slide-overlay"/>
        <div className="bau-slide-content">
          <h3 className="bau-slide-title">{f.title}</h3>
          <p className="bau-slide-desc">{f.desc}</p>
        </div>
      </div>
      <div className="bau-dots">
        {features.map((_, i) => (
          <button
            key={i}
            className={`bau-dot${active === i ? ' bau-dot-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Feature ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   QUIZ  (home health assessment)
───────────────────────────────────────────────── */

const newQuestions = [
  {
    q:'What type of home do you live in?',
    multi:false,
    options:[
      'Detached house',
      'Semi-detached / duplex',
      'Townhouse',
      'Condo / apartment'
    ]
  },

  {
    q:'Does your home have a basement?',
    multi:false,
    options:[
      'Yes — finished basement',
      'Yes — unfinished basement',
      'Crawl space',
      'No basement / slab'
    ]
  },

  {
    q:'Who lives in your home? (select all that apply)',
    multi:true,
    options:[
      'Children under 12',
      'Adults 65 or older',
      'Pets',
      'None of these'
    ]
  },

  {
    q:'Any hobbies that happen at home? (select all that apply)',
    multi:true,
    options:[
      'Woodworking or DIY',
      'Painting / art projects',
      'Heavy cooking',
      'Home gym or workshop',
      'None of these'
    ]
  },

  {
    q:'Has your home been tested for any of these? (select all that apply)',
    multi:true,
    options:[
      'Radon gas',
      'Mold or moisture',
      'HVAC / furnace efficiency',
      'None of these'
    ]
  },

  {
    q:'Have you experienced any of these in your home? (select all that apply)',
    multi:true,
    options:[
      'Water leak',
      'Flooding',
      'Condensation on windows',
      'Musty smell',
      'Visible mold',
      'None of these'
    ]
  }
]

function getCategories(answers) {
  const cats = []
  const a = answers

  const hasBasement = [
    'Yes — finished basement',
    'Yes — unfinished basement',
    'Crawl space'
  ].includes(a[1]?.[0])

  const testedRadon = a[4]?.includes('Radon gas')
  const testedMold = a[4]?.includes('Mold or moisture')
  const testedHVAC = a[4]?.includes('HVAC / furnace efficiency')

  const hasMoistureIssues = a[5]?.some(x =>
    [
      'Water leak',
      'Flooding',
      'Condensation on windows',
      'Musty smell',
      'Visible mold'
    ].includes(x)
  )

  const vulnPeople = a[2]?.some(x =>
    [
      'Children under 12',
      'Adults 65 or older',
      'Pets'
    ].includes(x)
  )

  const riskyHobbies = a[3]?.some(x =>
    [
      'Woodworking or DIY',
      'Painting / art projects',
      'Heavy cooking'
    ].includes(x)
  )

  if (hasBasement && !testedRadon) {
    cats.push({
      label: 'Radon Testing',
      desc: 'Radon can enter homes from the ground, especially through foundations, basements, and crawl spaces. A long-term test is the only way to know your level.'
    })
  }

  if ((hasBasement || hasMoistureIssues) && !testedMold) {
    cats.push({
      label: 'Moisture & Mold Inspection',
      desc: 'Basements, crawl spaces, leaks, condensation, and musty smells can point to moisture issues worth investigating.'
    })
  }

  if (!testedHVAC) {
    cats.push({
      label: 'HVAC & Furnace Service',
      desc: 'Regular HVAC maintenance can help your system run efficiently and support better indoor air circulation.'
    })
  }

  if (vulnPeople) {
    cats.push({
      label: 'Indoor Air Quality Check',
      desc: 'Children, seniors, and pets can all benefit from a healthy indoor environment with good ventilation and air quality.'
    })
  }

  if (riskyHobbies) {
    cats.push({
      label: 'Ventilation Assessment',
      desc: 'Activities like cooking, painting, and DIY projects can add particles, dust, or airborne chemicals to indoor air.'
    })
  }

  cats.push({
    label: 'Seasonal Maintenance Plan',
    desc: 'A simple seasonal plan can help you stay ahead of routine home maintenance.'
  })

  return cats.slice(0, 4)
}

function Quiz() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState([])
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [done, setDone]       = useState(false)
  const [err, setErr]         = useState(false)
  const resetQuiz = () => {
  setStep(0)
  setAnswers({})
  setSelected([])
  setName('')
  setEmail('')
  setDone(false)
  setErr(false)
}

  const total = newQuestions.length
  const onResult = step > total
  const cats = getCategories(answers)

  const toggleOption = (label) => {
    const q = newQuestions[step - 1]
    if (!q.multi) { setSelected([label]); return }
    if (label === 'None of these') { setSelected(['None of these']); return }
    const without = selected.filter(x => x !== 'None of these')
    setSelected(without.includes(label) ? without.filter(x => x !== label) : [...without, label])
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
      const r = await fetch(import.meta.env.VITE_FORMSPREE_HOMEOWNER_URL, {
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
      <p className="qz-desc">Tell us about your home and family. We'll build a personalized list of services and seasonal tasks.</p>
      <button className="pill-dark" onClick={() => setStep(1)}>Start the assessment <ArrowRight size={15}/></button>
    </div>
  )

 
  if (onResult) return (
  <div className="qz-panel">
    <p className="qz-meta" style={{ color:'#4A7820', fontWeight:700 }}>
      Your home profile is ready
    </p>

    <h3 className="qz-h3">We'd look into these for your home & connect you to licensed professionals.</h3>

    <div className="result-cats">
      {cats.map(c => (
        <div className="result-cat" key={c.label}>
          <div>
            <p className="rc-label">{c.label}</p>
            <p className="rc-desc">{c.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {!done ? (
      <form onSubmit={submit} className="qz-form">
        <p className="qz-form-title">Join early access — be first when we launch.</p>
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
        <button
          type="submit"
          className="pill-dark"
          style={{ width:'100%', justifyContent:'center' }}
        >
          Join Waitlist <ArrowRight size={15}/>
        </button>
        {err && <p className="qz-err">Something went wrong — please try again.</p>}

      </form>
    ) : (
      <div className="qz-success-inline">
        <CheckCircle size={22} color="#4A7820"/>
        <div>
          <p style={{ fontWeight:600, color:'var(--ink)', marginBottom:4 }}>
            You're on the list.
          </p>
          <p style={{ fontSize:13, color:'var(--muted)' }}>
            We'll keep you posted as Indro Labs launches in your area.
          </p>
        </div>
      </div>
    )}

    <button
      type="button"
      className="qz-retry-btn"
      onClick={resetQuiz}
    >
      Take the quiz again
    </button>
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
  const [hwDone, setHwDone] = useState(false)
  const [hwErr, setHwErr]   = useState(false)
  const [ctDone, setCtDone] = useState(false)
  const [ctErr, setCtErr]   = useState(false)

  const submitHomeowner = async (e) => {
    e.preventDefault(); setHwErr(false)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const r = await fetch(import.meta.env.VITE_FORMSPREE_HOMEOWNER_URL, {
        method:'POST', body:JSON.stringify(data),
        headers:{ Accept:'application/json', 'Content-Type':'application/json' },
      })
      r.ok ? setHwDone(true) : setHwErr(true)
    } catch { setHwErr(true) }
  }

  const submitContractor = async (e) => {
    e.preventDefault(); setCtErr(false)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const r = await fetch(import.meta.env.VITE_FORMSPREE_PARTNER_URL, {
        method:'POST', body:JSON.stringify(data),
        headers:{ Accept:'application/json', 'Content-Type':'application/json' },
      })
      r.ok ? setCtDone(true) : setCtErr(true)
    } catch { setCtErr(true) }
  }

  return (
    <>
      <NavBar/>

      {/* ── HERO ──────────────────────────── */}
      <section id="hero" className="hero-section">
        <div className="hero-text">
          <h1 className="hero-h1">
            Your life is complicated.<br/>
            <em>Your home shouldn't be.</em>
          </h1>
          <p className="hero-sub">
            Indro Labs helps Canadian homeowners understand what their home needs,
            stay ahead of maintenance, and connect with trusted local professionals.
          </p>
          <div className="hero-ctas">
            <a href="#home-health-quiz" className="pill-dark">Take the 2-min quiz <ArrowRight size={15}/></a>
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
          <div className="bau-box">
            <div className="bau-box-bg"/>
            <div className="bau-box-overlay"/>
            <div className="bau-box-inner">
              <div className="bau-left">
                <p className="eyebrow-white">BUILT AROUND YOU</p>
                <h2 className="bau-h2">
                  Every home is different.<br/>
                  <em>Your plan should be too.</em>
                </h2>
                <p className="bau-sub">
                  Your home's age, location, household, and maintenance history all influence what deserves attention.
                  We help you understand what matters most.
                </p>
              </div>
              <div className="bau-right">
                <FeaturesCarousel/>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ── GET MATCHED ───────────────────── */}
<section id="get-matched" className="match-section">
  <div className="wrap match-wrap">
    <div className="match-left">
      <p className="eyebrow-green">GET MATCHED</p>
      <h2 className="signup-h2">
        From home concern<br/><em>to trusted help.</em>
      </h2>
      <p className="signup-sub">
        Indro Labs helps homeowners understand what their home may need,
        then connects them with qualified local professionals who fit the job.
      </p>

      <div className="match-steps">
        {[
          {
            step: '01',
            title: 'Tell us what is going on',
            desc: 'Take the home health quiz or tell us about a specific issue, like radon, moisture, HVAC, or ventilation.',
          },
          {
            step: '02',
            title: 'See your next steps',
            desc: 'We help organize your answers into clear options, such as testing, inspection, maintenance, or monitoring.',
          },
          {
            step: '03',
            title: 'Connect with local pros',
            desc: 'We help connect you with professionals in your area based on service type, location, and availability.',
          },
        ].map(item => (
          <div className="match-step" key={item.step}>
            <span className="match-num">{item.step}</span>
            <div>
              <p className="match-title">{item.title}</p>
              <p className="match-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <a href="#home-health-quiz" className="pill-dark">
        Start with the quiz <ArrowRight size={15}/>
      </a>
    </div>

    <div className="match-right">
      <div className="match-phone-card">
        <p className="match-card-label">RECOMMENDED MATCH</p>

        <div className="match-service-card">
          <div className="match-icon">🏠</div>
          <div>
            <p className="match-service-title">Radon Testing</p>
            <p className="match-service-sub">Based on: basement · not tested · Calgary, AB</p>
          </div>
        </div>

        <div className="match-pro-card">
          <div className="match-avatar">JS</div>
          <div className="match-pro-info">
            <p className="match-pro-name">John Smith</p>
            <p className="match-pro-role">Radon & Indoor Air Quality</p>
            <p className="match-pro-meta">⭐ 4.8 · C-NRPP Certified · Available this week</p>
          </div>
        </div>

        <div className="match-actions">
          <button className="match-action-primary">Request intro</button>
          <button className="match-action-secondary">View profile</button>
        </div>

        <p className="match-note">
            Explore your options, ask questions, and choose the professional that's right for your home.
        </p>
      </div>
    </div>
  </div>
</section>

{/* ── QUICK PROJECT REQUEST ───────────────────── */}
<section id="quick-project" className="quick-project-section">
  <div className="wrap quick-project-wrap">
    <div className="quick-project-left">
      <p className="eyebrow-green">NO ACCOUNT NEEDED</p>
      <h2 className="signup-h2">
        Just need help<br/><em>with one home issue?</em>
      </h2>
      <p className="signup-sub">
        Skip the full setup. Tell us what is going on, create a quick project,
        and we’ll help connect you with qualified local technicians.
      </p>

      <div className="quick-project-points">
        {[
          'No account required to start',
          'Create a project in under 2 minutes',
          'Get matched by service type, location, and availability',
          'Create account later for a more personalized home profile',
          'Completely free',
        ].map(item => (
          <div className="quick-point" key={item}>
            <CheckCircle size={18}/>
            <span>{item}</span>
          </div>
        ))}
      </div>


    </div>

    <div className="quick-project-right">
      <div className="quick-project-card">
        <p className="quick-card-label">QUICK PROJECT</p>

        <div className="quick-field">
          <span className="quick-field-label">Issue</span>
          <span className="quick-field-value">Musty smell in basement</span>
        </div>

        <div className="quick-field">
          <span className="quick-field-label">Service needed</span>
          <span className="quick-field-value">Moisture & Mold Inspection</span>
        </div>

        <div className="quick-field">
          <span className="quick-field-label">Location</span>
          <span className="quick-field-value">Calgary, AB</span>
        </div>

        <div className="quick-match-preview">
          <p className="quick-match-title">3 technician matches found</p>
          <p className="quick-match-sub">
            Based on your project type, location, and availability.
          </p>
        </div>

       <div className="quick-actions">
        <button type="button" className="quick-see-btn">
          See matches
        </button>

        <button type="button" className="quick-unlock-btn">
          Unlock more matches
        </button>
      </div>

      <p className="quick-note">
        Create a free home profile to unlock additional matches, personalized recommendations, maintenance reminders, and project history.
      </p>
      </div>
    </div>
  </div>
</section>



      {/* ── HOME HEALTH QUIZ ────────────── */}
      <section id="home-health-quiz" className="hh-quiz-section">
        <div className="wrap">
          <div className="hh-quiz-box">
            <div className="hh-quiz-box-bg"/>
            <div className="hh-quiz-box-overlay"/>
            <div className="hh-quiz-box-inner">
              <div className="hh-quiz-left">
                <p className="eyebrow-white">HOME HEALTH ASSESSMENT</p>
                <h2 className="hh-quiz-h2">
                  Find out how<br/>healthy your<br/><em>home is today.</em>
                </h2>
                <p className="hh-quiz-sub">
                  6 questions · 2 minutes<br/>
                  Know exactly what your home needs.
                </p>
                <div className="hh-quiz-stats">
                  <div className="hqs-stat">
                    <p className="hqs-num">6</p>
                    <p className="hqs-cap">questions</p>
                  </div>
                  <div className="hqs-divider"/>
                  <div className="hqs-stat">
                    <p className="hqs-num">2 min</p>
                    <p className="hqs-cap">to complete</p>
                  </div>
                  <div className="hqs-divider"/>
                  <div className="hqs-stat">
                    <p className="hqs-num">Free</p>
                    <p className="hqs-cap">no sign-up needed</p>
                  </div>
                </div>
              </div>
              <div className="hh-quiz-right">
                <div className="hh-quiz-card">
                  <Quiz/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR HOMEOWNERS ──────────────── */}
      <section id="quiz-section" className="signup-section">
        <div className="wrap signup-wrap">

          {/* Left info */}
          <div className="signup-left">
            <p className="eyebrow-green">FOR HOMEOWNERS</p>
            <h2 className="signup-h2">
              Your home,<br/><em>always one step ahead.</em>
            </h2>
            <p className="signup-sub">
              Indro Labs takes the guesswork out of home ownership.
              Know what needs attention, when — and <strong>who to call.</strong>
            </p>

            {/* Timeline */}
            <div className="signup-timeline">
                {[
                  { step:'01', title:'Track your home health',  desc:'We build a living profile of your home — age, systems, household, and maintenance history.' },
                  { step:'02', title:'Get reminded on time',    desc:'Seasonal alerts help you stay ahead of routine maintenance and potential issues.' },
                  { step:'03', title:'Connect with a professional', desc:'Get introduced to qualified local contractors who fit the service you need.' },
                  { step:'04', title:'Earn rewards',            desc:'Earn points for completing home tasks, redeemable for future services and perks.' },
                ].map((item, idx, arr) => (
                <div className="tl-item" key={item.step}>
                  <div className="tl-step-col">
                    <div className="tl-dot">
                      <span className="tl-num">{item.step}</span>
                    </div>
                    {idx < arr.length - 1 && <div className="tl-line"/>}
                  </div>
                  <div className="tl-content">
                    <p className="tl-title">{item.title}</p>
                    <p className="tl-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="signup-right">
            <div className="signup-form-card">
              <p className="sfc-eyebrow">JOIN THE WAITLIST</p>
              <h3 className="sfc-title">Be first in your neighbourhood.</h3>
              <p className="sfc-sub">We're launching city by city across Canada. Join early access and be first in your neighbourhood.</p>
              {hwDone ? (
                <div className="sfc-success">
                  <CheckCircle size={22} color="#4A7820"/>
                  <div>
                    <p className="sfc-s-title">You're on the list.</p>
                    <p className="sfc-s-desc">We'll be in touch as Indro Labs launches in your area.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitHomeowner} className="sfc-form">
                  <div className="sfc-row">
                    <input name="first_name" type="text"  placeholder="First name" required/>
                    <input name="last_name"  type="text"  placeholder="Last name"  required/>
                  </div>
                  <input name="email"    type="email" placeholder="Email address" required/>
                  <input name="city"     type="text"  placeholder="Your city (e.g. Calgary, AB)" required/>
                  <input name="home_type" type="text" placeholder="Home type (e.g. Detached, Condo)"/>
                  <button type="submit" className="pill-dark" style={{ width:'100%', justifyContent:'center' }}>
                    Join Waitlist <ArrowRight size={15}/>
                  </button>
                  {hwErr && <p className="sfc-err">Something went wrong — please try again.</p>}
                  <p className="sfc-fine">Early access only. Cancel any time.</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOR CONTRACTORS ─────────────── */}
      <section id="contractors" className="signup-section signup-section-alt">
        <div className="wrap signup-wrap">

          {/* Left info */}
          <div className="signup-left">
            <p className="eyebrow-green">FOR CONTRACTORS</p>
            <h2 className="signup-h2">
              Become a partner.<br/><em>Reach the right homes.</em>
            </h2>
            <p className="signup-sub">
              Reach homeowners who are already thinking about their homes. Indro Labs helps connect qualified professionals with homeowners seeking testing, maintenance, inspections, and other home services.
            </p>

            <div className="ct-trades">
              <p className="ct-trades-label">TRADES WE WORK WITH</p>
              <div className="ct-trades-grid">
                {[
                    'Radon & Indoor Air Quality',
                    'HVAC & Mechanical',
                    'Plumbing, Drainage & Waterproofing',
                    'Insulation & Energy Efficiency',
                    'Roofing & Eavestroughs',
                    'Electrical',
                    'Landscaping & Snow Removal',
                    'General Contractors'
                  ].map(t => (
                  <span className="ct-trade-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="signup-right">
            <div className="signup-form-card">
              <p className="sfc-eyebrow">PARTNER APPLICATION</p>
              <h3 className="sfc-title">Join our contractor network.</h3>
              <p className="sfc-sub">Tell us about your business. We'll reach out when we launch in your service area.</p>
              {ctDone ? (
                <div className="sfc-success">
                  <CheckCircle size={22} color="#4A7820"/>
                  <div>
                    <p className="sfc-s-title">Application received.</p>
                    <p className="sfc-s-desc">We'll review you details and be in touch soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitContractor} className="sfc-form">
                  <div className="sfc-row">
                    <input name="first_name"    type="text" placeholder="First name"    required/>
                    <input name="last_name"     type="text" placeholder="Last name"     required/>
                  </div>
                  <input name="business_name"   type="text" placeholder="Business name"  required/>
                  <input name="trade"           type="text" placeholder="Trade / service type" required/>
                  <input name="service_area"    type="text" placeholder="Service area (city / province)" required/>
                  <input name="email"           type="email" placeholder="Business email" required/>
                  <input name="phone"           type="tel"   placeholder="Phone number (optional)"/>
                  <button type="submit" className="pill-dark" style={{ width:'100%', justifyContent:'center' }}>
                    Apply to Partner <ArrowRight size={15}/>
                  </button>
                  {ctErr && <p className="sfc-err">Something went wrong — please try again.</p>}
                  <p className="sfc-fine">We review every application.</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <img src="/white-indro-logo.png" alt="Indro Labs" className="footer-logo-img"/>
              Indro Labs
            </a>
            <p>Building the network behind healthier homes in Canada.</p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <p className="footer-col-head">PRODUCT</p>
              <a href="#how-it-works">How it works</a>
              <a href="#home-health-quiz">Home health quiz</a>
              <a href="#home-health">Built around you</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-head">JOIN</p>
              <a href="#quiz-section">Homeowners</a>
              <a href="#contractors">Contractors</a>
            </div>
            <div className="footer-col">
              <p className="footer-col-head">COMPANY</p>
              <a href="#quiz-section">Contact us</a>
              <a href="mailto:info@indrolabs.ca">info@indrolabs.ca</a>
              <a href="https://www.linkedin.com/company/indro-labs/" target="_blank" rel="noopener noreferrer" className="footer-linkedin">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-base">
          <div className="wrap">© 2026 Indro Labs 🍁 · Alberta, Canada · All Rights Reserved.</div>
        </div>
      </footer>
    </>
  )
}
