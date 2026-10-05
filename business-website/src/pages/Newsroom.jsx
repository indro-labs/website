import { PageHero, FinalCTA } from '../components/sections'
import Seo from '../components/Seo'

const PRESS = [
  {
    tag: 'Feature', outlet: 'UCalgary News',
    title: 'AI Bootcamp helps students design their own futures',
    desc: 'UCalgary featured the Indro team\'s work on specialized transit technology for southern Alberta.',
    href: 'https://www.ucalgary.ca/news/ai-bootcamp-helps-students-design-their-own-futures',
  },
  {
    tag: 'Video', outlet: 'Instagram · Reel',
    title: "Indro — what we're building and why",
    desc: "A short video introduction to Indro and the problem we're solving for specialized transportation across Alberta.",
    href: 'https://www.instagram.com/reel/DY7hX7HNP28/',
  },
]

export default function Newsroom() {
  return (
    <>
      <Seo
        title="Newsroom | Indro Labs"
        description="Press, media coverage, and updates from the Indro Labs team as we build specialized transit technology across Alberta."
        path="/newsroom"
      />
      <PageHero
        eyebrow="Newsroom"
        title="Press, media & community."
        sub="Stories, coverage, and updates from the Indro team as we build specialized transit across Alberta."
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
