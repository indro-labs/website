import {
  Hero, BackedBy, TractionBar, WhyIndro, OfferTabs, FAQ, GetInTouch,
  // PlatformSection and Testimonials are temporarily removed from the homepage (kept in sections.jsx).
} from '../components/sections'

export default function Home() {
  return (
    <>
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
