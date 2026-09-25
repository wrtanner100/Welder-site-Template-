// ============================================================================
// ALL SITE CONTENT LIVES HERE.
// Edit this file, then run `node build.js` to regenerate every page.
// Anything in [square brackets] is a placeholder you must replace before launch.
// ============================================================================

const business = {
  name: 'Your Business Name',
  // Used in friendly sentences like "Call or text our team".
  contactName: 'our team',
  // Three short words or phrases. Shown in the About section and footer.
  tagline: ['Quality.', 'Reliability.', 'Trust.'],
  phone: '(555) 123-4567',
  phoneHref: 'tel:+15551234567',
  email: 'hello@yourbusiness.com',
  street: '123 Main Street',
  city: 'Your City',
  region: 'ST',
  zip: '00000',
  country: 'US',
  site: 'https://www.yourbusiness.com', // no trailing slash
  hours: 'Mon–Fri 8 AM – 5 PM',
  hoursNote: 'Emergency service available', // set to '' to hide
  // Structured data for Google. Match it to `hours` above.
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
  // schema.org type: LocalBusiness, Plumber, Electrician, HVACBusiness, HomeAndConstructionBusiness,
  // AutoRepair, BeautySalon, Dentist, CleaningService (use LocalBusiness if unsure).
  schemaType: 'LocalBusiness',
  years: '[X]+',
  // Licence, certification or insurance line. Set `credential` to null to hide it everywhere.
  credential: {
    short: 'Licensed & Insured',
    long: 'Fully licensed and insured. License #[000000]',
  },
  // An award or badge (e.g. "Best of" a directory, "Top Rated", a local award). Set to null to hide.
  award: { top: 'Best of', name: '[Award]', url: '' },
  reviewsUrl: 'https://www.google.com/search?q=Your+Business+Name+reviews',
  social: {
    facebook: '',
    instagram: '',
    yelp: '',
    google: '',
  },
  get mapsUrl() {
    return `https://maps.google.com/?q=${encodeURIComponent(`${this.street}, ${this.city}, ${this.region} ${this.zip}`)}`;
  },
};

// Page copy. Keep headlines short; the design is built around them.
const copy = {
  description: 'Short one-sentence description of the business for search engines and the footer.',
  hero: {
    rating: '[#] Google reviews', // five stars are added automatically
    // Three lines. The third line is shown in the accent color.
    lines: ['Your Main Service', '& Second Service in', 'Your City & Nearby Areas'],
    lead: 'One or two sentences on what you do and why people pick you. Mention the area you serve.',
    trust: ['Licensed & insured', '[X]+ years', 'Free quotes'],
  },
  band: ['No job too small', 'Free quotes', 'Locally owned', 'Fast response', 'Satisfaction guaranteed'],
  services: {
    eyebrow: 'What We Do',
    heading: 'Everything you need, done right the first time',
    text: 'A sentence or two summarising the full range of work you take on.',
    helpHeading: 'Not sure what you need?',
    helpText: 'Send a photo or give us a call. Free quotes, no job too small.',
  },
  works: { heading: 'Our Previous Works', button: 'View Projects' },
  about: {
    eyebrow: 'Why Choose Us',
    text: 'Tell your story in two or three sentences: who runs the business, how long you’ve been at it, and what customers can count on.',
    bullets: [
      ['Licensed & accountable.', 'Fully licensed and insured, so the job is done properly.'],
      ['We show up.', 'On time, with the right tools, and we keep you updated.'],
      ['No job too small.', 'Small repairs and big projects get the same care.'],
      ['Free quotes.', 'Straight pricing up front, no surprises.'],
    ],
    // [value, label]. A plain number like '25+' animates (counts up) on scroll.
    stats: [
      ['[X]+', 'Years in business'],
      ['[#]+', '5-star reviews'],
      ['100%', 'Satisfaction focus'],
    ],
  },
  reviews: {
    heading: 'What Our Customers Say',
    summary: '<strong>5-star rated</strong> &middot; [#] reviews from local customers',
    button: 'Read all reviews',
  },
  areas: {
    eyebrow: 'Service Areas',
    heading: 'Serving Your City & the surrounding area',
    pageHeading: 'Proudly serving Your City and nearby communities',
    pageLead: 'Based in Your City, we cover the surrounding area. Pick your town.',
    notListed: 'Don’t see your town? Call us. We go where the job is.',
    featuredLabel: 'Most requested',
  },
  cta: { heading: 'Ready to get started', button: 'Get a Free Quote' },
  quote: {
    eyebrow: 'Free Quote',
    heading: 'Tell us what you need',
    text: 'Fill this out and your email app opens with everything ready to send. Or just call.',
    placeholder: 'e.g. A short description of the job',
    extraOptions: ['Emergency service', 'Something else'],
  },
  gallery: {
    heading: 'Recent projects',
    lead: 'A few recent jobs from around Your City. Tap any photo to see it bigger.',
  },
  city: {
    heading: (c) => `Our Services in ${c}`,
    focusHeading: (c) => `What ${c} calls us for`,
    servicesHeading: (c) => `Everything we offer, in ${c}`,
  },
};

// Service boxes. Icons: wrench, tools, home, shield, star, clock, truck, spark, leaf.
const services = [
  { id: 'repairs', title: 'Repairs', icon: 'wrench', text: 'Describe this service in one or two sentences: what it covers and who it’s for.' },
  { id: 'installations', title: 'Installations', icon: 'tools', text: 'Describe this service in one or two sentences: what it covers and who it’s for.' },
  { id: 'maintenance', title: 'Maintenance', icon: 'shield', text: 'Describe this service in one or two sentences: what it covers and who it’s for.' },
  { id: 'consultations', title: 'Consultations', icon: 'star', text: 'Describe this service in one or two sentences: what it covers and who it’s for.' },
  { id: 'emergency', title: 'Emergency Service', icon: 'clock', text: 'Describe this service in one or two sentences: what it covers and who it’s for.' },
];

// Gallery photos live in assets/img/gallery/. `type` drives the filter buttons.
const gallery = [
  { file: 'project-01.svg', caption: 'Project description', city: 'Your City', type: 'Residential' },
  { file: 'project-02.svg', caption: 'Project description', city: 'Nearby Town', type: 'Commercial' },
  { file: 'project-03.svg', caption: 'Project description', city: 'Your City', type: 'Residential' },
  { file: 'project-04.svg', caption: 'Project description', city: 'Another Town', type: 'Commercial' },
  { file: 'project-05.svg', caption: 'Project description', city: 'Your City', type: 'Residential' },
  { file: 'project-06.svg', caption: 'Project description', city: 'Neighboring City', type: 'Residential' },
];

// Hero background: drop in assets/img/hero.jpg. Until then the fallback shows.
const heroPhoto = 'hero.jpg';
const heroFallback = 'placeholder/hero.svg';
const works = [
  { title: 'Featured Project', photo: 'gallery/project-01.svg' },
  { title: 'Featured Project', photo: 'gallery/project-02.svg' },
  { title: 'Featured Project', photo: 'gallery/project-03.svg' },
];
const aboutPhoto = 'gallery/project-04.svg';

// Reviews shown on every page. Paste REAL reviews word for word, with the reviewer's name
// as it appears on the review site. Never invent reviews.
const reviews = [
  { quote: 'Paste a real customer review here, word for word. Short and specific works best.', name: 'Customer Name', source: 'Google review' },
  { quote: 'Paste a real customer review here, word for word. Short and specific works best.', name: 'Customer Name', source: 'Google review' },
  { quote: 'Paste a real customer review here, word for word. Short and specific works best.', name: 'Customer Name', source: 'Google review' },
];

// City pages. The first city with `featured: true` gets the big card.
const cityIntro = 'Two or three sentences about working in this city: how close you are, the kinds of customers here, and what you’re known for locally.';
const cityFocus = [
  ['Local need #1', 'A sentence about a common job in this city.'],
  ['Local need #2', 'A sentence about a common job in this city.'],
  ['Local need #3', 'A sentence about a common job in this city.'],
];
const cities = [
  { slug: 'your-city', name: 'Your City', featured: true, intro: cityIntro, focus: cityFocus, areas: ['Neighborhood A', 'Neighborhood B', 'Neighborhood C'] },
  { slug: 'nearby-town', name: 'Nearby Town', intro: cityIntro, focus: cityFocus, areas: ['Neighborhood A', 'Neighborhood B'] },
  { slug: 'another-town', name: 'Another Town', intro: cityIntro, focus: cityFocus, areas: ['Neighborhood A', 'Neighborhood B'] },
  { slug: 'neighboring-city', name: 'Neighboring City', intro: cityIntro, focus: cityFocus, areas: ['Neighborhood A', 'Neighborhood B'] },
];

module.exports = { business, copy, services, gallery, heroPhoto, heroFallback, works, aboutPhoto, reviews, cities };
