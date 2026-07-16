import { GraduationCap, HeartHandshake, Building2, Accessibility, Puzzle, Globe, UserCheck, Route, LayoutDashboard, ClipboardList, Clock, Palette, Users, MapPin, FileText, BarChart2, Truck, Sliders, PieChart, Headphones } from 'lucide-react'

// Single source of truth for the 5 client categories.
// Drives: homepage "What we offer" tabs, nav Services dropdown, and /services/:slug pages.
export const CATEGORIES = [
  {
    slug: 'youth-education',
    label: 'Youth & Education',
    enabled: false,
    Icon: GraduationCap,
    img: '/images/services/microtransit.jpg',
    tags: ['After-School Programs', 'Youth Academies', 'Student Transportation'],
    headline: 'Total visibility for busy parents and youth providers.',
    body: 'Streamline daily pick-ups and drop-offs for your childcare, sports, or specialized youth programs. Our platform eliminates tracking chaos by giving parents live vehicle locations and automated text alerts when the ride is near, while giving your drivers simple digital check-in manifests.',
    cta: 'Learn more',
    pillars: [
      { title: 'Absolute safeguards & visibility', body: 'No more panicked phone calls asking where the van is. Parents get an automated SMS with a secure tracking link when the vehicle is five minutes away, and instant confirmation when their child is safely onboard.' },
      { title: 'Frictionless attendance tracking', body: 'Ditch the clipboards and paper lists. Drivers use a dead-simple, large-button tablet interface to check students in and out, instantly updating the central dashboard in real time.' },
      { title: 'Operational control for coordinators', body: "Easily manage changes to daily schedules. If a parent cancels a pickup last-minute via the portal, the driver's route updates automatically on the road -- saving fuel and unnecessary stops." },
    ],
    highlights: [
      { Icon: Globe, title: 'Parent portal', body: 'A clean, zero-download web link for families to track arrivals and manage schedules.' },
      { Icon: UserCheck, title: 'Rider profiles', body: 'Critical student notes on the driver manifest -- authorized guardians, booster-seat requirements, and more.' },
      { Icon: Route, title: 'Smart routing', body: 'AI optimization that keeps kids on the vehicle for the shortest time possible, avoiding long, tedious loops.' },
    ],
    whoFor: [
      { tag: 'After-school programs', title: 'After-school & enrichment programs', desc: 'Daily pickups from schools to your program and safe drop-offs home -- with parents looped in at every stop.', img: '/images/hero/caregiver-van.jpg' },
      { tag: 'Youth academies', title: 'Sports clubs & youth academies', desc: 'Coordinate practice, game-day, and tournament transport without a flood of parent phone calls.', img: '/images/services/microtransit.jpg' },
      { tag: 'Student transportation', title: 'Schools & student transport', desc: 'Reliable routes with digital manifests, so staff always know which student is on which vehicle.', img: '/images/operators/disability-services.jpg' },
    ],
  },
  {
    slug: 'senior-care',
    label: 'Senior & Care',
    enabled: false,
    Icon: HeartHandshake,
    img: '/images/hero/senior-car-smiling.jpg',
    tags: ['Senior Living Facilities', 'Specialized Care Vans', 'Resident Programs'],
    headline: 'Safe, dignified, and reliable specialized transit.',
    body: 'Built for private senior living developments and care facilities that require a premium touch. Easily coordinate resident outings, medical appointments, or campus shuttles with an intuitive interface that prioritizes passenger comfort, custom safety notes, and precise arrival timing.',
    cta: 'Learn more',
    pillars: [
      { title: 'Dignified & accommodating booking', body: 'Residents can book autonomously through a simplified portal, or front-desk staff can manage rides instantly from a central concierge dashboard.' },
      { title: 'Caregiver & family peace of mind', body: 'Automatically keep designated family members or medical staff in the loop with arrival and departure notifications, ensuring seamless handoffs at appointments.' },
      { title: 'Designed for specialized mobility', body: 'The dispatch engine factors in boarding buffer times for walkers and wheelchairs, so drivers are never rushed and schedules stay accurate.' },
    ],
    highlights: [
      { Icon: LayoutDashboard, title: 'Concierge dashboard', body: "Receptionists or clinic staff can book, modify, or track a resident's ride in two clicks." },
      { Icon: ClipboardList, title: 'Passenger care notes', body: 'Vital accessibility details and assistance instructions shown to the driver before they arrive.' },
      { Icon: Clock, title: 'Predictable timing', body: 'High-accuracy ETAs that minimize the time residents spend waiting outdoors or in lobbies.' },
    ],
    whoFor: [
      { tag: 'Senior living facilities', title: 'Private senior living facilities', desc: 'Resident outings, appointments, and campus shuttles booked in a couple of clicks by front-desk staff.', img: '/images/operators/senior-living.jpg' },
      { tag: 'Specialized care vans', title: 'Specialized care & medical vans', desc: 'Accessible trips with boarding buffer times and care notes surfaced to every driver.', img: '/images/hero/wheelchair-woman.jpg' },
      { tag: 'Resident programs', title: 'Resident & community programs', desc: 'Group programs and recurring trips coordinated with precise arrival timing and family updates.', img: '/images/hero/senior-couple.jpg' },
    ],
  },
  {
    slug: 'private-shuttles',
    label: 'Private Shuttles',
    enabled: false,
    Icon: Building2,
    img: '/images/operators/transit-operators.jpg',
    tags: ['Corporate Campuses', 'Residential Communities', 'Private Van Shuttles'],
    headline: 'Professional transportation that protects your brand identity.',
    body: "Designed for organizations moving passengers between specific buildings, business parks, or transit hubs. Replace rigid, inefficient schedules with a modern, white-labeled on-demand system that adapts seamlessly to your daily operational hours.",
    cta: 'Learn more',
    pillars: [
      { title: 'Your brand, front and center', body: "Unlike generic third-party platforms, our system is entirely white-labeled. The passenger interface, live maps, and text notifications feature your logo and colors." },
      { title: 'On-demand fleet optimization', body: 'Switch from rigid, empty hourly loops to a high-efficiency, rider-driven model that automatically groups passengers traveling along similar paths.' },
      { title: 'Enterprise-grade analytics', body: 'Prove your transit ROI with clean dashboards showing peak travel times, vehicle utilization, average wait times, and carbon-offset data.' },
    ],
    highlights: [
      { Icon: Palette, title: 'White-labeled interface', body: 'A premium, custom-branded web app tailored to your company or community guidelines.' },
      { Icon: Users, title: 'Dynamic pooling', body: 'Smart algorithms group multiple requests into a single efficient trip without delaying arrivals.' },
      { Icon: MapPin, title: 'Geofenced zones', body: 'Confine operations to specific campuses, business parks, or transit hubs with custom pickup and drop-off parameters.' },
    ],
    whoFor: [
      { tag: 'Corporate campuses', title: 'Corporate campuses', desc: 'Move employees between buildings, parking, and transit hubs on a modern on-demand shuttle.', img: '/images/operators/transit-operators.jpg' },
      { tag: 'Residential communities', title: 'Residential communities', desc: 'Give residents a premium, white-labeled shuttle that reflects your community brand.', img: '/images/hero/receptionist-smiling.jpg' },
      { tag: 'Private van shuttles', title: 'Private van shuttles', desc: 'Replace rigid hourly loops with efficient, rider-driven trips that adapt to demand.', img: '/images/hero/free-man.jpg' },
    ],
  },
  {
    slug: 'paratransit',
    label: 'Paratransit',
    enabled: false,
    Icon: Accessibility,
    img: '/images/services/paratransit.jpg',
    tags: ['Municipal Transit Agencies', 'Public Accessibility', 'Regulated NEMT'],
    headline: 'Smart, demand-responsive routing built for strict regulations.',
    body: 'Power your regional or municipal specialized transit networks with a robust, enterprise-grade dispatch engine. Automatically pool rider requests, optimize driver routes in real time, and easily handle complex scheduling and compliance rules without sacrificing passenger care.',
    cta: 'Learn more',
    pillars: [
      { title: 'Automated regulatory compliance', body: 'Simplify the complexities of public and accessible transit with advanced scheduling logic, dynamic capacity constraints like wheelchair-to-seat ratios, and automated reporting.' },
      { title: 'Equitable accessibility', body: 'Independent riders book via web portals, while dispatchers log call-in requests from a single interface -- all integrated into the live driver manifests.' },
      { title: 'Intelligent, stress-free dispatching', body: 'AI continuously monitors live traffic, fleet locations, and incoming ride requests to automatically optimize routes and minimize deadhead time.' },
    ],
    highlights: [
      { Icon: FileText, title: 'Dynamic manifests', body: 'Driver schedules update seamlessly on the fly while strictly preserving mandated pickup windows.' },
      { Icon: BarChart2, title: 'Comprehensive audit logs', body: 'Export data for state, provincial, or federal reporting, including detailed ride histories and performance metrics.' },
      { Icon: Truck, title: 'Mixed-fleet capacity management', body: 'Tracks the real-time physical constraints of every vehicle so the right equipment matches every trip.' },
    ],
    whoFor: [
      { tag: 'Municipal transit agencies', title: 'Municipal & regional agencies', desc: 'Enterprise-grade dispatch that pools requests and optimizes routes across your network.', img: '/images/operators/disability-services.jpg' },
      { tag: 'Public accessibility', title: 'Public accessibility services', desc: 'Equitable access with both call-in and digital booking, integrated into one live manifest.', img: '/images/hero/wheelchair-woman.jpg' },
      { tag: 'Regulated NEMT', title: 'Regulated & NEMT transport', desc: 'Compliance-ready scheduling, capacity rules, and audit-ready reporting built in.', img: '/images/hero/senior-family-smile.jpg' },
    ],
  },
  {
    slug: 'custom',
    label: 'Custom',
    enabled: false,
    Icon: Puzzle,
    img: '/images/services/ondemand.png',
    tags: ['Unique Workflows', 'Modular Dispatch', 'Bespoke Fleets'],
    headline: 'If you have a unique fleet, we have the flexible software to run it.',
    body: "Don't see your specific industry or vehicle type listed? Our platform is built from the ground up to be completely modular. We can configure custom dispatch logic, unique driver interfaces, and tailored passenger booking systems to fit exactly how your business moves.",
    cta: 'Talk to an expert',
    pillars: [
      { title: 'Modular architecture', body: "We don't force your unique operation into a rigid template. Every component -- from dispatcher rules to passenger notifications -- can be toggled and tweaked to match your exact workflow." },
      { title: 'Bespoke API & hardware integration', body: 'Connect your transit data to the software you already use -- internal HR systems, specialized medical booking platforms, or specific vehicle telematics.' },
      { title: 'Co-designed deployment partnership', body: "You aren't figuring it out alone. We map your operational constraints, configure your rules, and hands-on train your dispatchers and drivers." },
    ],
    highlights: [
      { Icon: Sliders, title: 'Custom rule engine', body: 'Define unique booking privileges, priority tiers, operational hours, and service parameters.' },
      { Icon: PieChart, title: 'Tailored reporting', body: 'Build custom dashboards to track the specific KPIs that matter most to your board, stakeholders, or city council.' },
      { Icon: Headphones, title: 'Dedicated onboarding', body: 'Local, white-glove setup and configuration support to guarantee a flawless launch day.' },
    ],
    whoFor: [
      { tag: 'Unique workflows', title: 'Unique operational workflows', desc: 'Toggle and tune dispatch rules, notifications, and interfaces to match exactly how you move.', img: '/images/operators/transit-operators.jpg' },
      { tag: 'Modular dispatch', title: 'Modular dispatch needs', desc: 'Mix and match components -- booking, routing, manifests -- into your own configuration.', img: '/images/services/microtransit.jpg' },
      { tag: 'Bespoke fleets', title: 'Bespoke & mixed fleets', desc: "Custom driver interfaces and booking flows for fleets that don't fit a template.", img: '/images/hero/smiling-at-phone.jpg' },
    ],
  },
  {
  slug: 'families',
  label: 'Families',
  enabled: true,
  Icon: Users,
  img: '/images/hero/senior-family-smile.jpg',
  tags: ['Family Members', 'Caregivers', 'Resident Support'],
  headline: 'Peace of mind for every ride your loved one takes.',
  whoForHeading: 'Made for the people who care.',
  body: 'Stay connected to your loved one’s transportation journey with real-time ride tracking, arrival updates, and notifications. Know when their ride is arriving without needing to call the facility or transit provider.',
  cta: 'Learn more',

  pillars: [
    {
      title: 'Real-time ride visibility',
      body: 'See where the vehicle is and when your loved one will arrive with simple, live updates from pickup to drop-off.'
    },
    {
      title: 'Automatic arrival updates',
      body: 'Receive notifications when a ride is approaching, arriving, or completed—keeping families informed without extra coordination.'
    },
    {
      title: 'Confidence from anywhere',
      body: 'Whether you are at work or across town, stay connected to every important journey.'
    },
  ],

  highlights: [
    {
      Icon: MapPin,
      title: 'Live tracking',
      body: 'View vehicle location and estimated arrival times in real time.'
    },
    {
      Icon: Clock,
      title: 'Arrival notifications',
      body: 'Know when rides are approaching without waiting or calling.'
    },
    {
      Icon: HeartHandshake,
      title: 'Peace of mind',
      body: 'Stay informed and confident throughout your loved one’s journey.'
    },
  ],

  whoFor: [
    {
      tag: 'Family members',
      title: 'Families supporting loved ones',
      desc: 'Stay connected to transportation updates and know when your loved one arrives safely.',
      img: '/images/hero/wheelchair-woman.jpg'
    },
    {
      tag: 'Remote family members',
      title: 'Stay connected from anywhere',
      desc: 'Follow important rides remotely and have confidence that your loved one is supported throughout their journey.',
      img: '/images/hero/person-smiling.jpg'
    },
    
    {
      tag: 'Guardians',
      title: 'Peace of mind for guardians',
      desc: 'Receive timely transportation updates and stay informed without needing to call for status updates.',
      img: '/images/hero/guardians-wheelchair.jpg'
    },
  ],
},
{
  slug: 'care-facilities',
  label: 'Care Facilities',
  enabled: true,
  Icon: HeartHandshake,
  img: '/images/operators/senior-living.jpg',
  tags: ['Senior Living', 'Disability Services', 'Care Homes'],
  headline: 'Coordinate every resident journey with confidence.',
  whoForHeading: 'Made for the teams supporting every resident journey.',
  body: 'Give staff a complete view of resident transportation with a centralized dashboard for tracking rides, monitoring arrivals, and keeping families informed. Reduce manual coordination while improving the resident experience.',
  cta: 'Learn more',

  pillars: [
    {
      title: 'One dashboard for every ride',
      body: 'Track resident transportation, upcoming arrivals, and ride status from one simple interface.'
    },
    {
      title: 'Less phone tag, more care',
      body: 'Reduce time spent calling drivers, families, and transit providers by giving everyone access to the information they need.'
    },
    {
      title: 'Built for accessibility',
      body: 'Designed around seniors and people with disabilities, including mobility considerations and care requirements.'
    },
  ],

  highlights: [
    {
      Icon: LayoutDashboard,
      title: 'Caregiver dashboard',
      body: 'Monitor resident trips, ETAs, and transportation status in one place.'
    },
    {
      Icon: ClipboardList,
      title: 'Resident information',
      body: 'Keep important accessibility notes and ride details organized.'
    },
    {
      Icon: Users,
      title: 'Family communication',
      body: 'Keep families informed with automatic updates and shared visibility.'
    },
  ],

  whoFor: [
    {
      tag: 'Senior living',
      title: 'Senior living communities',
      desc: 'Coordinate resident appointments, outings, and transportation with confidence.',
      img: '/images/operators/senior-living.jpg'
    },
    {
      tag: 'Disability services',
      title: 'Disability support organizations',
      desc: 'Improve visibility for accessible transportation and resident mobility.',
      img: '/images/operators/disability-services.jpg'
    },
    {
      tag: 'Care homes',
      title: 'Care homes & facilities',
      desc: 'Give staff the tools they need to manage daily transportation smoothly.',
      img: '/images/hero/receptionist-smile.jpg'
    },
  ],
},
]

export function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug)
}
