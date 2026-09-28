import { useEffect } from 'react'

const SITE = 'https://www.indrolabs.ca'

// Updates the shared tags in index.html per-route, so each page gets its
// own title/description/canonical instead of sharing the homepage's.
export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    if (title) {
      document.title = title
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    }
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    }
    const url = `${SITE}${path}`
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
  }, [title, description, path])

  return null
}
