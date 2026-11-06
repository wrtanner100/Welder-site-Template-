// ============================================================================
// ALL SITE CONTENT LIVES HERE.
// Edit this file, then run `node build.js` to regenerate every page.
// Anything in [square brackets] is a placeholder you must replace before launch.
// ============================================================================

const business = {
  name: 'Deyo Contractors',
  // Text shown where the logo goes until the real logo file is ready (see src/layout.js).
  logoText: { name: 'DEYO', sub: 'Contractors' },
  // Used in friendly sentences like "Call or text our team".
  contactName: 'Deyo Contractors',
  // Three short words or phrases. Shown in the About section and footer.
  tagline: ['Straight lines.', 'Solid posts.', 'Honest work.'],
  phone: '(501) 270-1816',
  phoneHref: 'tel:+15012701816',
  email: 'deyocontractors@icloud.com',
  street: '508 E Booth Rd',
  city: 'Searcy',
  region: 'AR',
  zip: '72143',
  country: 'US',
  site: 'https://deyocontractors.com', // no trailing slash
  hours: 'Call or text for availability',
  hoursNote: 'Free estimates', // set to '' to hide
  // Structured data for Google. Fill in once regular hours are confirmed.
  openingHours: [],
  // schema.org type: LocalBusiness, Plumber, Electrician, HVACBusiness, HomeAndConstructionBusiness,
  // AutoRepair, BeautySalon, Dentist, CleaningService (use LocalBusiness if unsure).
  schemaType: 'HomeAndConstructionBusiness',
  years: '[X]+',
  // Licence, certification or insurance line. Set `credential` to null to hide it everywhere.
  credential: {
    short: 'Licensed AR Contractor',
    long: 'Arkansas Contractor License #0478850127',
  },
  // An award or badge (e.g. "Best of" a directory, "Top Rated", a local award). Set to null to hide.
  award: null,
  reviewsUrl: 'https://www.google.com/search?q=Deyo+Contractors+Heber+Springs+AR+reviews',
  social: {
    facebook: 'https://www.facebook.com/1939870462954088',
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
  description: 'Fence and gate installation, repair and staining for homes, farms and businesses in Heber Springs and surrounding Arkansas towns.',
  hero: {
    rating: '[#] Google reviews', // five stars are added automatically
    // Three lines. The third line is shown in the accent color.
    lines: ['Fences & Gates', 'Built Right in', 'Heber Springs & Beyond'],
    lead: 'Privacy fences, custom gates and decorative fencing for homes and businesses across Heber Springs and the surrounding Arkansas towns. Set straight, built solid, priced fairly.',
    trust: ['Licensed AR contractor', 'Residential & commercial', 'Free estimates'],
  },
  band: ['Privacy fences', 'Custom gates', 'Pool & pet fencing', 'Repairs & staining', 'Free estimates'],
  services: {
    eyebrow: 'What We Do',
    heading: 'Fences and gates, done right the first time',
    text: 'From a backyard privacy fence to a secure commercial gate, we handle the layout, materials and installation start to finish.',
    helpHeading: 'Not sure what you need?',
    helpText: 'Send a photo of your yard or property line, or give us a call. Estimates are free.',
  },
  works: { heading: 'Our Previous Works', button: 'View Projects' },
  about: {
    eyebrow: 'Why Choose Deyo',
    text: 'Deyo Contractors builds fences and gates for homes, farms and businesses in Heber Springs and the surrounding area. We use durable materials, set every post properly, and treat each property like our own.',
    bullets: [
      ['Licensed in Arkansas.', 'State contractor license #0478850127.'],
      ['Built to last.', 'Quality materials and posts set deep, so your fence stays straight for years.'],
      ['Residential & commercial.', 'Backyards, pools, pastures, storefronts and job sites.'],
      ['Free estimates.', 'Clear, up-front pricing before any work begins.'],
    ],
    // [value, label]. A plain number like '25+' animates (counts up) on scroll.
    stats: [
      ['2013', 'Established'],
      ['[#]+', 'Fences & gates built'],
      ['Free', 'On-site estimates'],
    ],
  },
  reviews: {
    heading: 'What Our Customers Say',
    summary: '<strong>5-star rated</strong> &middot; [#] reviews from local customers',
    button: 'Read all reviews',
  },
  areas: {
    eyebrow: 'Service Areas',
    heading: 'Serving Heber Springs & the surrounding area',
    pageHeading: 'Proudly serving Heber Springs and nearby Arkansas towns',
    pageLead: 'We build fences and gates throughout Heber Springs, Cleburne County and the surrounding towns. Pick yours.',
    notListed: 'Don’t see your town? Call us. We travel throughout central Arkansas.',
    featuredLabel: 'Primary service area',
  },
  cta: { heading: 'Ready for a new fence', button: 'Get a Free Estimate' },
  quote: {
    eyebrow: 'Free Estimate',
    heading: 'Tell us about your project',
    text: 'Fill this out and your email app opens with everything ready to send. Or just call or text.',
    placeholder: 'e.g. About 200 ft of 6 ft wood privacy fence with one walk gate',
    extraOptions: ['Chain-link fence', 'Something else'],
  },
  gallery: {
    heading: 'Recent projects',
    lead: 'A few recent fences and gates from around Heber Springs. Tap any photo to see it bigger.',
  },
  city: {
    heading: (c) => `Fence & Gate Installation in ${c}`,
    focusHeading: (c) => `What ${c} calls us for`,
    servicesHeading: (c) => `Everything we offer, in ${c}`,
  },
};

// Service boxes. Icons: wrench, tools, home, shield, star, clock, truck, spark, leaf.
const services = [
  { id: 'privacy-fences', title: 'Privacy Fences', icon: 'home', text: 'Wood, vinyl and metal privacy fences built to your height and style, with clean lines and properly set posts.' },
  { id: 'custom-gates', title: 'Custom Gates', icon: 'tools', text: 'Walk gates, double drive gates and secure commercial gates, built to swing true and latch every time.' },
  { id: 'decorative-fences', title: 'Decorative Fences', icon: 'star', text: 'Ornamental and decorative fencing that adds security and curb appeal, matched to your home.' },
  { id: 'pool-pet-fences', title: 'Pool & Pet Enclosures', icon: 'shield', text: 'Pool fences and gates built to local safety codes, and secure enclosures that keep pets safely in the yard.' },
  { id: 'repair-staining', title: 'Repair & Staining', icon: 'wrench', text: 'Leaning posts, broken pickets and sagging gates fixed, plus staining that protects wood from weather and insects.' },
];

// Gallery photos live in assets/img/gallery/. `type` drives the filter buttons.
// Add `city: 'Heber Springs'` etc. once real project photos are in.
const gallery = [
  { file: 'project-01.svg', caption: 'Wood privacy fence', type: 'Residential' },
  { file: 'project-02.svg', caption: 'Commercial security gate', type: 'Commercial' },
  { file: 'project-03.svg', caption: 'Custom drive gate', type: 'Residential' },
  { file: 'project-04.svg', caption: 'Chain-link enclosure', type: 'Commercial' },
  { file: 'project-05.svg', caption: 'Pool fence and gate', type: 'Residential' },
  { file: 'project-06.svg', caption: 'Decorative metal fence', type: 'Residential' },
];

// Hero background: drop in assets/img/hero.jpg. Until then the fallback shows.
const heroPhoto = 'hero.jpg';
const heroFallback = 'placeholder/hero.svg';
const works = [
  { title: 'Privacy Fences', photo: 'gallery/project-01.svg' },
  { title: 'Custom Gates', photo: 'gallery/project-02.svg' },
  { title: 'Decorative Fencing', photo: 'gallery/project-03.svg' },
];
const aboutPhoto = 'gallery/project-04.svg';

// Reviews shown on every page. Paste REAL reviews word for word, with the reviewer's name
// as it appears on the review site. Never invent reviews.
const reviews = [
  { quote: '[Paste a real customer review here, word for word.]', name: '[Customer Name]', source: 'Google review' },
  { quote: '[Paste a real customer review here, word for word.]', name: '[Customer Name]', source: 'Google review' },
  { quote: '[Paste a real customer review here, word for word.]', name: '[Customer Name]', source: 'Google review' },
];

// City pages. The first city with `featured: true` gets the big card.
const cityFocus = [
  ['Privacy fences', 'Backyard privacy fences in wood, vinyl and metal, built straight and set to last.'],
  ['Gates', 'Walk gates and drive gates that swing true, latch securely and hold up to daily use.'],
  ['Repairs & staining', 'Leaning posts, broken pickets and weathered wood brought back into shape.'],
];
const cities = [
  {
    slug: 'heber-springs', name: 'Heber Springs', featured: true,
    intro: 'Heber Springs is our home turf. We build privacy fences, custom gates and pool and pet enclosures for homes and businesses all over town and around Greers Ferry Lake.',
    focus: cityFocus,
    areas: ['Downtown', 'Greers Ferry Lake area', 'Sugar Loaf area'],
  },
  {
    slug: 'greers-ferry', name: 'Greers Ferry',
    intro: 'From lake homes to year-round properties, we install and repair fences and gates throughout Greers Ferry and the north side of the lake.',
    focus: cityFocus,
    areas: ['Greers Ferry', 'Higden', 'Edgemont'],
  },
  {
    slug: 'quitman', name: 'Quitman',
    intro: 'We build privacy fences, pasture gates and pet enclosures for homes and small farms in and around Quitman.',
    focus: cityFocus,
    areas: ['Quitman', 'Rose Bud', 'Concord'],
  },
  {
    slug: 'searcy', name: 'Searcy',
    intro: 'Our office is on East Booth Road in Searcy, and we install and repair residential and commercial fences and gates across White County.',
    focus: cityFocus,
    areas: ['Searcy', 'Kensett', 'Judsonia'],
  },
];

module.exports = { business, copy, services, gallery, heroPhoto, heroFallback, works, aboutPhoto, reviews, cities };
