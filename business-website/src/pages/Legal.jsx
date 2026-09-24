import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import privacy from '../content/legal/privacy.json'
import privacyFr from '../content/legal/privacy_fr.json'
import termsEn from '../content/legal/terms_en.json'
import termsFr from '../content/legal/terms_fr.json'
import './Legal.css'

const DOCS = {
  privacy: { blocks: privacy, lang: 'en', alt: { to: '/fr/privacy', label: 'Lire en français', lang: 'fr' }, title: 'Privacy Policy | Indro Labs' },
  privacyFr: { blocks: privacyFr, lang: 'fr', alt: { to: '/privacy', label: 'Read in English', lang: 'en' }, title: 'Politique de confidentialité | Indro Labs' },
  terms: { blocks: termsEn, lang: 'en', alt: { to: '/fr/terms', label: 'Lire en français', lang: 'fr' }, title: 'Website Terms of Use | Indro Labs' },
  termsFr: { blocks: termsFr, lang: 'fr', alt: { to: '/terms', label: 'Read in English', lang: 'en' }, title: 'Conditions d’utilisation du site Web | Indro Labs' },
}

const URL_RE = /(https?:\/\/[^\s)]+[^\s).,;])/g

function Text({ runs }) {
  return runs.map(([text, f], i) => {
    const parts = text.split(URL_RE).map((s, j) =>
      j % 2 === 1 ? <a key={j} href={s}>{s}</a> : s
    )
    let node = <>{parts}</>
    if (f.includes('b')) node = <strong>{node}</strong>
    if (f.includes('i')) node = <em>{node}</em>
    if (f.includes('u')) node = <u>{node}</u>
    return <span key={i}>{node}</span>
  })
}

export default function Legal({ doc }) {
  const { blocks, lang, title, alt } = DOCS[doc]
  useEffect(() => { document.title = title }, [title])

  let l1 = 0
  let l2 = 0
  const out = []
  let bullets = []
  const flush = key => {
    if (bullets.length) {
      out.push(<ul key={`ul${key}`}>{bullets}</ul>)
      bullets = []
    }
  }

  blocks.forEach((b, i) => {
    if (b.t === 'li') {
      bullets.push(<li key={i}><Text runs={b.r} /></li>)
      return
    }
    flush(i)
    if (b.t === 'title') out.push(<h1 key={i}><Text runs={b.r} /></h1>)
    else if (b.t === 'h1') out.push(<h2 key={i}><Text runs={b.r} /></h2>)
    else if (b.t === 'h2') out.push(<h3 key={i}><Text runs={b.r} /></h3>)
    else if (b.t === 'l1') {
      l1 += 1; l2 = 0
      out.push(<h2 key={i}><span className="legal-num">{l1}.</span><Text runs={b.r} /></h2>)
    } else if (b.t === 'l2') {
      l2 += 1
      out.push(
        <div key={i} className="legal-l2">
          <span className="legal-num">({String.fromCharCode(96 + l2)})</span>
          <p><Text runs={b.r} /></p>
        </div>
      )
    } else if (b.t === 'table') {
      out.push(
        <div key={i} className="legal-table-wrap">
          <table>
            <thead><tr>{b.rows[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
            <tbody>{b.rows.slice(1).map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )
    } else out.push(<p key={i}><Text runs={b.r} /></p>)
  })
  flush('end')

  return (
    <div className="legal-wrapper">
      <article className="legal" lang={lang}>
        <p className="legal-alt"><Link to={alt.to} lang={alt.lang} hrefLang={alt.lang}>{alt.label}</Link></p>
        {out}
      </article>
    </div>
  )
}
