import { PageHero, OfferTabs, FAQ, GetInTouch } from '../components/sections'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Solutions for every community need."
        sub="One universal platform, tuned to who you move — from after-school vans to municipal paratransit. Pick the operation that sounds like yours."
        primary={{ label: 'Contact us', to: '/contact' }}
      />
      <div className="sections-wrap">
        <OfferTabs />
        <FAQ />
        <GetInTouch />
      </div>
    </>
  )
}
