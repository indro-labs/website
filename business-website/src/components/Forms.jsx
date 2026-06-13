import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export function WaitlistForm() {
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
      console.error('Missing Formspree waitlist endpoint')
      setErr(true)
      return
    }

    setLoading(true)

    try {
      const r = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ name, email, role }),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
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
        {loading ? 'Submitting...' : 'Join waitlist'}
      </button>

      {err && <p className="ferr">Something went wrong — please try again.</p>}
      <p className="fnote">No spam. Updates only when it matters.</p>
    </form>
  )
}

export function PartnerForm() {
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
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
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

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Become partner'}
      </button>

      {err && <p className="ferr">Something went wrong — please try again.</p>}
    </form>
  )
}
