import { GraduationCap, HeartHandshake, Building2, Accessibility, Puzzle, Globe, UserCheck, Route, LayoutDashboard, ClipboardList, Clock, Palette, Users, User, MapPin, MapPinned, FileText, BarChart2, Truck, Sliders, PieChart, Headphones, Bell, ShieldCheck, Bus, MessageSquareText, Mail, CalendarCheck } from 'lucide-react'

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
  slug: 'nemt',
  label: 'NEMT providers',
  enabled: true,
  Icon: Bus,
  img: '/images/hero/senior-transportation2.jpg',
  tags: ['Non-emergency medical transport', 'Own fleet & drivers', 'Round trips'],
  headline: 'Run your own NEMT fleet with total visibility.',
  whoForHeading: 'Made for NEMT providers running their own fleet.',
  body: 'Indro is built for non-emergency medical transportation providers who operate their own vehicles and drivers. Schedule, dispatch, and manage every trip your riders need, from one-way rides to round trips. Riders, drivers, and admins each get their own simple dashboard, with scheduling built around each rider’s needs, your own pricing calculated automatically per trip, and automatic rider notifications.',
  cta: 'Learn more',

  pillars: [
    {
      title: 'Built for your own fleet',
      body: 'Whether you run a handful of vehicles or a growing fleet, dispatch every driver and vehicle from one system. No separate tools for scheduling, dispatch, and communication.'
    },
    {
      title: 'Your service area, your pricing',
      body: "Define your service area: by province, county, city, postal code, or a radius around a point. Only the bookings you can actually serve come through. Set a fixed price for specific locations, like a place your riders visit regularly, if you'd rather not bill by distance."
    },
    {
      title: 'Riders and families kept informed',
      body: 'Automatic SMS updates mean fewer calls — riders hear when their trip is booked, when the driver is on the way, and when they’ve arrived, and families can get alerts at pickup and drop-off.'
    },
  ],

  highlights: [
    {
      Icon: LayoutDashboard,
      title: 'Role-based dashboards',
      body: 'Drivers, admins, and riders each get their own dashboard, built around the specific tools their role actually needs. Kept simple and easy to use for anyone.'
    },
    {
      Icon: Sliders,
      title: 'Flexible pricing',
      body: 'Bill by distance, set a fixed price for specific locations, or both — whatever fits how your organization charges.'
    },
    {
      Icon: Bell,
      title: 'Automatic notifications',
      body: 'SMS updates for booking, driver en route, and arrival, plus email booking confirmations — sent without a dispatcher lifting a phone.'
    },
  ],

  whoFor: [
    {
      tag: 'Senior transportation fleets',
      title: 'Fleets serving seniors',
      desc: 'Give senior riders the transportation they need, along with arrival updates on every trip for them and their families.',
      img: '/images/hero/senior-couple.jpg'
    },
    {
      tag: 'Specific transportation',
      title: 'Riders who need specific vehicles',
      desc: "Larger vehicles and extra-wait-time needs travel with the rider's record, so the right vehicle and enough time are ready.",
      img: '/images/hero/Nemt-services-specifictransportation.jpeg'
    },
    {
      tag: 'Round trips',
      title: 'Round trip',
      desc: 'Book the ride there and the ride home together, so every part of your ride is supported — with the drivers and vehicles your organization already operates.',
      img: '/images/hero/nemt-services-roundtrip.jpeg'
    },
  ],

  faqs: [
    { q: 'Do we use our own vehicles and drivers?', a: 'Yes. Your organization runs the fleet — Indro gives you one place to schedule, dispatch, and manage every driver and vehicle.' },
    { q: 'How do riders book a trip?', a: 'Through your organization’s own booking link — with or without an account — or your team books on their behalf from the admin dashboard.' },
    { q: 'How do drivers receive their trips?', a: 'Drivers get a text when they’re assigned a trip and see every assigned trip in their own driver dashboard, where they update the status as they go — from on the way to dropped off.' },
    { q: 'Can we limit where we accept bookings?', a: 'Yes. Define your service area by city, county, province, postal code prefix, or a distance around an address. Every booking is checked, and anyone outside your area is asked to contact you directly.' },
    { q: 'How does pricing work?', a: 'Your pricing, calculated automatically on every trip: a base fare plus a per-kilometre rate, a flat fare for trips to or from specific locations, or both. You also set your own cancellation policy.' },
    { q: 'How do riders pay?', a: 'Riders pay upfront when they book.' },
    { q: 'How do we get started?', a: 'Book a demo or email us at info@indrolabs.ca and we’ll walk through your operation — service area, pricing, vehicles, and drivers — and get your team live.' },
  ],
},
  {
  slug: 'individual-riders',
  label: 'Individual riders',
  enabled: true,
  Icon: User,
  img: '/images/services/ondemand.png',
  tags: ['Easy booking', 'SMS alerts', 'Peace of mind'],
  headline: 'Book in minutes, and know when your ride is coming.',
  whoForHeading: 'Made for riders who count on every trip.',
  body: 'Book a ride in a few simple steps — pick a time, enter your pickup and destination, and you’re set. Then get SMS alerts when your driver is assigned, on the way, and arrived, with an email confirmation for every booking. Whether you ride regularly or occasionally, everything you need is in one simple app.',
  cta: 'Get started',
  pillars: [
    {
      title: 'Book in a few simple steps',
      body: 'Choose a date and time, enter your pickup and destination, and request your ride. Need to get there and back? Book a round trip in one go.'
    },
    {
      title: 'SMS alerts at every step',
      body: 'Get a text when your ride is booked, when a driver is assigned, when they’re on the way, and when they’ve arrived — so you’re ready at the door, not waiting outside.'
    },
    {
      title: 'Simple, easy-to-use experience',
      body: 'Designed for riders of all ages with an intuitive interface, large touch targets, and easy-to-read trip information.'
    },
  ],
  highlights: [
    {
      Icon: MessageSquareText,
      title: 'SMS alerts',
      body: 'A text when your driver is on the way and when your ride arrives, instead of waiting without updates.'
    },
    {
      Icon: Mail,
      title: 'Email confirmations',
      body: 'Booking confirmations and receipts arrive in your inbox, so every detail of your ride is easy to find.'
    },
    {
      Icon: ShieldCheck,
      title: 'Reliable trip information',
      body: 'View your pickup, destination, driver status, and trip progress all in one place.'
    },
  ],
  whoFor: [
    {
      tag: 'Specialized transit riders',
      title: 'People who rely on specialized transit',
      desc: 'Perfect for riders who want confidence that their vehicle is on the way, and that it’s right for them and meets their needs.',
      img: '/images/hero/caregiver-van.jpg'
    },
    {
      tag: 'Older adults',
      title: 'Seniors and older adults',
      desc: 'Simple booking and clear SMS alerts help reduce uncertainty and make every trip more comfortable.',
      img: '/images/hero/senior-car-smiling.jpg'
    },
  ],

  faqs: [
    { q: 'How do I book a ride?', a: 'Open your provider’s booking link, pick a date and time, enter your pickup and destination, and request your ride. If your provider charges for rides, you’ll pay securely online, and the ride is confirmed once payment goes through.' },
    { q: 'Can I book a round trip?', a: 'Yes. Choose Round trip and pick a pickup time and a return time — it’s one booking and one payment. Or book the return separately later.' },
    { q: 'Which texts will I get?', a: 'You can manage the notifications you wish to receive: ride booked, driver assigned, driver on the way, driver arrived, dropped off, and cancelled. You can opt out at any time.' },
    { q: 'Will I get emails too?', a: 'Yes. Booking confirmations, receipts, and cancellations arrive by email, so every detail of your ride is easy to find.' },
    { q: 'Can I change a ride after booking?', a: 'Rides can’t be edited once they’re booked. Check your provider’s cancellation policy to cancel the ride in time, and rebook.' },
    { q: 'What are ride preferences?', a: 'Options like a larger vehicle or extra time at pickup. They help your provider send the right vehicle and leave enough time.' },
    { q: 'How much will a ride cost?', a: 'Your provider sets the fare — usually a base fare plus a per-kilometre rate, or a flat fare for trips to or from certain places. You’ll see the fare before you pay.' },
    { q: 'How do I keep a family member informed?', a: 'Add them as a family contact and choose the alerts they get — pickup, drop-off, or both. Alerts arrive by text.' },
  ],
},
  {
  slug: 'care-facilities',
  label: 'Care facilities',
  enabled: true,
  Icon: HeartHandshake,
  img: '/images/operators/senior-living.jpg',
  tags: ['Senior living', 'Disability services', 'Care homes'],
  headline: 'Coordinate every resident journey with confidence.',
  whoForHeading: 'Made for the teams supporting every resident journey.',
  body: 'Give staff a complete view of resident transportation with a centralized dashboard for managing rides, monitoring arrivals, and keeping families informed. Reduce manual coordination while improving the resident experience.',
  cta: 'Learn more',

  pillars: [
    {
      title: 'One dashboard for every ride',
      body: 'Manage resident transportation, upcoming arrivals, and ride status from one simple interface.'
    },
    {
      title: 'Less phone tag, more care',
      body: 'Reduce time spent calling drivers, families, and transit providers by giving everyone access to the information they need.'
    },
    {
      title: 'Built for specialized transit',
      body: 'Designed to make transportation simpler for seniors and people with disabilities, with flexible ride preferences for a more comfortable journey.'
    },
  ],

  highlights: [
    {
      Icon: LayoutDashboard,
      title: 'Caregiver dashboard',
      body: 'Monitor resident trips, pickup times, and transportation status in one place.'
    },
    {
      Icon: ClipboardList,
      title: 'Resident information',
      body: 'Keep ride preferences and trip details organized.'
    },
    {
      Icon: Users,
      title: 'Family communication',
      body: 'Keep families informed with automatic SMS alerts at pickup and drop-off.'
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
      desc: 'Improve visibility for specialized transportation across your organization.',
      img: '/images/operators/disability-services.jpg'
    },
    {
      tag: 'Care homes',
      title: 'Care homes & facilities',
      desc: 'Give staff the tools they need to manage daily transportation smoothly.',
      img: '/images/hero/receptionist-smile.jpg'
    },
  ],

  faqs: [
    { q: 'What does the facility dashboard show?', a: 'One centralized view of every resident’s transportation: upcoming rides, pickup times, and ride status — so staff aren’t stuck calling drivers or transportation providers for updates.' },
    { q: 'Can staff book rides for residents?', a: 'Yes. Staff can book on a resident’s behalf from the dashboard in a few clicks, including round trips.' },
    { q: 'How are families kept informed?', a: 'Families can be added as contacts and choose text alerts at pickup, drop-off, or both.' },
    { q: 'Can we note a resident’s ride needs?', a: 'Yes. Preferences like a larger vehicle or extra time at pickup are saved on the resident’s record and shown to the driver on every trip.' },
    { q: 'How does a facility get started?', a: 'Reach out through our contact page and we’ll set up a walkthrough. We map your operation, set up access for your staff, residents, and families, and get your team live.' },
  ],
},
  {
  slug: 'families',
  label: 'Families',
  enabled: true,
  Icon: Users,
  img: '/images/hero/senior-family-smile.jpg',
  tags: ['Family members', 'Caregivers', 'Resident support'],
  headline: 'Peace of mind for every ride your loved one takes.',
  whoForHeading: 'Made for the people who care.',
  body: 'Stay connected to your loved one’s transportation journey with SMS alerts at pickup and drop-off. Know they’ve arrived safely without needing to call the facility or transportation provider.',
  cta: 'Learn more',

  pillars: [
    {
      title: 'Real-time ride visibility',
      body: 'Know the moment your loved one is picked up and the moment they’re dropped off — no calls to the provider needed.'
    },
    {
      title: 'Pickup and drop-off alerts',
      body: 'Choose the alerts you get — pickup, drop-off, or both — sent by text, keeping families informed without extra coordination.'
    },
    {
      title: 'Confidence from anywhere',
      body: 'Whether you are at work or across town, stay connected to every important journey.'
    },
  ],

  highlights: [
    {
      Icon: MessageSquareText,
      title: 'SMS alerts',
      body: 'Get a text the moment your loved one is picked up and when they’re dropped off.'
    },
    {
      Icon: Users,
      title: 'Easy to set up',
      body: 'Your loved one adds you as a family contact with just a name and phone number.'
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
      img: '/images/hero/families-services-familymembers.jpeg'
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
      img: '/images/hero/families-services-guardians.jpeg'
    },
  ],

  faqs: [
    { q: 'How will I know my loved one’s ride went smoothly?', a: 'You’ll get a text when they’re picked up and when they’re dropped off — so you know they’ve arrived without calling anyone.' },
    { q: 'How do I start getting alerts?', a: 'Your loved one, or their provider, adds you as a family contact with your name and phone number, then chooses which alerts you get — pickup, drop-off, or both.' },
    { q: 'Will I get a text for every update?', a: 'No. Family contacts only get the alerts chosen — pickup, drop-off, or both — so you stay informed without being flooded.' },
    { q: 'Can I stop the alerts?', a: 'Yes. Reply STOP to any text at any time, or ask your loved one to remove you as a contact.' },
    { q: 'Who can see my loved one’s trip information?', a: 'Only the people your loved one or their provider authorizes.' },
  ],
},
]

export function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug)
}
