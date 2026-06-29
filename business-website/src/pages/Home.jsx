import {
  Hero, TractionBar, WhyIndro, OfferTabs, FAQ, GetInTouch,
  // PlatformSection and Testimonials are temporarily removed from the homepage (kept in sections.jsx).
} from '../components/sections'

export default function Home() {
  return (
    <>
      <Hero />
      <TractionBar />
      <div className="sections-wrap">
        <WhyIndro />
        <OfferTabs />
        {/* <PlatformSection /> */}
        {/* <Testimonials /> */}
        <FAQ />
        <GetInTouch />
      </div>
    </>
  )
}
