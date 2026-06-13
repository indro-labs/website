import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '16px' }}>404</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.1 }}>
          Page not found.
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '400px', marginBottom: '36px' }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '13px 26px', background: 'var(--orange)', color: 'white',
          borderRadius: '999px', fontSize: '14px', fontWeight: 600,
          textDecoration: 'none',
        }}>
          Back to home
        </Link>
      </div>
    </>
  )
}
