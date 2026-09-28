import {
  Hero, BackedBy, TractionBar, WhyIndro, OfferTabs, FAQ, GetInTouch,
  // PlatformSection and Testimonials are temporarily removed from the homepage (kept in sections.jsx).
} from '../components/sections'
import Seo from '../components/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Indro Labs | Transportation Operations Platform"
        description="Transportation operations software for senior living communities, care facilities, and community transit providers. Manage bookings, dispatching, vehicle tracking, and rider communication from a single platform."
        path="/"
      />
      <Hero />
      <BackedBy />
      <div className="sections-wrap">
        <WhyIndro />
        <TractionBar />
        <OfferTabs />
        {/* <PlatformSection /> */}
        {/* <Testimonials /> */}
        <FAQ />
        <GetInTouch />
      </div>
    </>
  )
}
