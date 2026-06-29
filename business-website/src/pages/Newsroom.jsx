import { PageHero, FinalCTA } from '../components/sections'

const PRESS = [
  {
    tag: 'Feature', outlet: 'UCalgary News',
    title: 'AI Bootcamp helps students design their own futures',
    desc: 'UCalgary featured the Indro Transit team\'s work on accessible transit technology for southern Alberta.',
    href: 'https://www.ucalgary.ca/news/ai-bootcamp-helps-students-design-their-own-futures',
  },
  {
    tag: 'Video', outlet: 'Instagram · Reel',
    title: "Indro Transit — what we're building and why",
    desc: "A short video introduction to Indro Transit and the problem we're solving for accessible transportation across Alberta.",
    href: 'https://www.instagram.com/reel/DY7hX7HNP28/',
  },
]

export default function Newsroom() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Press, media & community."
        sub="Stories, coverage, and updates from the Indro Transit team as we build accessible mobility across Alberta."
      />
      <div className="sections-wrap">
        <section className="news-section">
          <div className="c">
            <div className="news-grid">
              {PRESS.map(a => (
                <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className="news-card">
                  <div className="news-card-top">
                    <span className="news-tag">{a.tag}</span>
                    <span className="news-outlet">{a.outlet}</span>
                  </div>
                  <h3 className="news-title">{a.title}</h3>
                  <p className="news-desc">{a.desc}</p>
                  <span className="news-link">Read more →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
      </div>
    </>
  )
}
