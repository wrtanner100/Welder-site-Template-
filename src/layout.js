const { business: b, copy, services, reviews, cities } = require('./data');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icons = {
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>',
  quote: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 6h10v10H8a4 4 0 0 0 4 4v4a8 8 0 0 1-8-8V6zm14 0h10v10h-6a4 4 0 0 0 4 4v4a8 8 0 0 1-8-8V6z" fill="currentColor" stroke="none"/></svg>',
  wrench: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 1-5-5L14 2l-1.8 1.8a4 4 0 0 0 2.5 2.5z"/><path d="M3 21l6-6"/></svg>',
  tools: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l7-7M14 4l6 6-3 3-6-6zM5 3l4 4-2 2-4-4z"/><path d="M13 14l6 6"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 6h13v11H1zM14 10h4l4 4v3h-8z"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M19.1 4.9l-3.5 3.5M8.4 15.6l-3.5 3.5"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21c0-9 5-15 16-16-1 11-7 16-16 16z"/><path d="M5 21 14 12"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
};

// Logo: replace assets/img/logo-white.svg (for the dark header/footer) with your own.
// A PNG with a transparent background works too; update the file name here.
const logo = (root) => `
<a href="${root}" class="logo" aria-label="${esc(b.name)} home">
  <img src="${root}assets/img/logo-white.svg" alt="${esc(b.name)}" width="240" height="80" />
</a>`;

const awardBadge = () => {
  if (!b.award) return '';
  const inner = `<span class="ab-top">${esc(b.award.top)}</span><span class="ab-name">${esc(b.award.name)}</span>`;
  return b.award.url
    ? `<a class="award-badge" href="${b.award.url}" target="_blank" rel="noopener" aria-label="${esc(`${b.award.top} ${b.award.name}`)}">${inner}</a>`
    : `<span class="award-badge" role="img" aria-label="${esc(`${b.award.top} ${b.award.name}`)}">${inner}</span>`;
};

const socialLinks = () => {
  const s = b.social || {};
  const items = [
    s.facebook && `<a href="${s.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icons.facebook}</a>`,
    s.instagram && `<a href="${s.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>`,
    s.yelp && `<a href="${s.yelp}" target="_blank" rel="noopener" aria-label="Yelp">Y</a>`,
    s.google && `<a href="${s.google}" target="_blank" rel="noopener" aria-label="Google">G</a>`,
  ].filter(Boolean);
  return items.length ? `<div class="socials">${items.join('')}</div>` : '';
};

const head = ({ root, title, description, path, jsonLd }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#0b0b0b" />
  <link rel="canonical" href="${b.site}${path}" />
  <link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${b.site}${path}" />
  <meta property="og:image" content="${b.site}/assets/img/og-image.jpg" />
  <link rel="preload" href="${root}assets/fonts/plus-jakarta-sans-400.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="${root}assets/css/fonts.css" />
  <link rel="stylesheet" href="${root}assets/css/styles.css" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>`;

const localBusiness = (extra = {}) => ({
  '@context': 'https://schema.org',
  '@type': b.schemaType || 'LocalBusiness',
  name: b.name,
  slogan: b.tagline.join(' '),
  description: copy.description,
  url: `${b.site}/`,
  telephone: b.phoneHref.replace(/^tel:/, ''),
  email: b.email,
  address: { '@type': 'PostalAddress', streetAddress: b.street, addressLocality: b.city, addressRegion: b.region, postalCode: b.zip, addressCountry: b.country },
  openingHoursSpecification: (b.openingHours || []).map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  areaServed: cities.map((c) => c.name),
  sameAs: Object.values(b.social || {}).filter(Boolean),
  ...extra,
});

const header = ({ root, home }) => {
  const h = home ? '' : root; // on the homepage, in-page anchors; elsewhere link back home
  return `
  <header class="site-header">
    <div class="container header-inner">
      ${logo(root)}
      <nav class="nav" aria-label="Main">
        <ul class="nav-menu" id="nav-menu">
          <li><a href="${h}#services">Services</a></li>
          <li><a href="${h}#reviews">Reviews</a></li>
          <li><a href="${root}gallery/">Gallery</a></li>
          <li><a href="${root}service-areas/">Service Areas</a></li>
          <li><a href="${h}#contact">Contact</a></li>
        </ul>
      </nav>
      <div class="header-cta">
        <a href="${b.phoneHref}" class="btn btn-red btn-call" aria-label="Call ${b.phone}">${icons.phone}<span class="call-label">Call Now</span><span class="call-number">${b.phone}</span></a>
        <a href="${h}#quote" class="btn btn-light">Free Quote</a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <main id="main">`;
};

const slot = (file, cls = '', label = '') =>
  `<div class="photo ${cls}" data-img="{{root}}assets/img/${file}"${label ? ` role="img" aria-label="${esc(label)}"` : ''}></div>`;

const band = () => {
  const items = copy.band;
  const group = items.map((t) => `<span>&ndash; ${esc(t)}</span>`).join('');
  return `
  <section class="band" aria-label="${esc(items.join(', '))}">
    <div class="band-track"><div class="band-group">${group}</div><div class="band-group" aria-hidden="true">${group}</div></div>
  </section>`;
};

const serviceBoxes = (city) => `
  <div class="service-grid">
    ${services.map((s) => `
    <article class="service" id="${s.id}">
      <div class="service-icon">${icons[s.icon] || icons.star}</div>
      <h3>${esc(s.title)}${city ? ` <span class="in-city">in ${esc(city)}</span>` : ''}</h3>
      <p>${esc(s.text)}</p>
      <a href="#quote" class="text-link">Get a free quote ${icons.arrow}</a>
    </article>`).join('')}
    <article class="service service-cta">
      <h3>${esc(copy.services.helpHeading)}</h3>
      <p>${esc(copy.services.helpText)}</p>
      <a href="${b.phoneHref}" class="btn btn-black">${icons.phone} ${b.phone}</a>
    </article>
  </div>`;

const reviewsSection = () => `
  <section class="section reviews" id="reviews">
    <div class="container">
      <div class="section-title">
        <span class="title-mark" aria-hidden="true">${icons.quote}</span>
        <h2>${esc(copy.reviews.heading)}</h2>
        <span class="title-mark" aria-hidden="true">${icons.quote}</span>
      </div>
      <div class="rating-summary">
        <span class="stars" aria-hidden="true">★★★★★</span>
        <span>${copy.reviews.summary}</span>
      </div>
      <div class="review-grid">
        ${reviews.map((r) => `
        <figure class="review">
          <span class="stars" aria-label="5 out of 5 stars">★★★★★</span>
          <blockquote>“${esc(r.quote)}”</blockquote>
          <figcaption>
            <span class="avatar" aria-hidden="true">${esc(r.name[0])}</span>
            <span><strong>${esc(r.name)}</strong><small>${esc(r.source || '')}</small></span>
          </figcaption>
        </figure>`).join('')}
      </div>
      <div class="center-actions">
        <a href="${b.reviewsUrl}" target="_blank" rel="noopener" class="btn btn-outline-light">${esc(copy.reviews.button)} ${icons.arrow}</a>
      </div>
    </div>
  </section>`;

// CTA graphic: a badge with a checkmark that draws itself in, orbited by a few
// pulsing dots. Neutral enough for any trade or local service.
const ctaArt = () => {
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r1 = 112, r2 = i % 2 ? 118 : 124;
    const p = (r) => `${(150 + Math.cos(a) * r).toFixed(1)} ${(130 + Math.sin(a) * r).toFixed(1)}`;
    return `M${p(r1)}L${p(r2)}`;
  }).join('');
  return `<svg class="cta-art" viewBox="0 0 300 260" aria-hidden="true">
        <g class="badge-art">
          <circle class="draw" cx="150" cy="130" r="100"/>
          <path class="draw" d="${ticks}"/>
          <circle class="draw" cx="150" cy="130" r="76"/>
          <path class="draw check" d="M112 132l26 26 52-56"/>
        </g>
        <g class="orbit">
          <circle class="pulse" cx="150" cy="18" r="6" style="--d:0s"/>
          <circle class="pulse" cx="262" cy="130" r="5" style="--d:.6s"/>
          <circle class="pulse" cx="38" cy="130" r="4" style="--d:1.2s"/>
        </g>
      </svg>`;
};

const ctaBand = (city) => `
  <section class="cta-band">
    <div class="container cta-inner">
      <h2>${esc(copy.cta.heading)}${city ? ` in ${esc(city)}` : ''}?</h2>
      <div class="cta-actions">
        <a href="${b.phoneHref}" class="btn btn-black btn-lg">${icons.phone} Call ${b.phone}</a>
        <a href="#quote" class="btn btn-white btn-lg">${esc(copy.cta.button)}</a>
      </div>
      ${ctaArt()}
    </div>
  </section>`;

const contactSection = (city) => `
  <section class="section contact" id="contact">
    <div class="container contact-grid">
      <div id="quote">
        <p class="eyebrow">${esc(copy.quote.eyebrow)}</p>
        <h2>${esc(copy.quote.heading)}${city ? ` in ${esc(city)}` : ''}.</h2>
        <p class="muted">${esc(copy.quote.text)}</p>
        <form class="quote-form" id="quote-form" data-email="${esc(b.email)}" data-phone="${esc(b.phone)}" novalidate>
          <div class="form-row">
            <label><span>Name</span><input type="text" name="name" required autocomplete="name" /></label>
            <label><span>Phone</span><input type="tel" name="phone" required autocomplete="tel" /></label>
          </div>
          <div class="form-row">
            <label><span>Email <em>(optional)</em></span><input type="email" name="email" autocomplete="email" /></label>
            <label><span>City</span><input type="text" name="city" value="${city ? esc(city) : ''}" autocomplete="address-level2" /></label>
          </div>
          <label><span>What do you need?</span>
            <select name="service">
              ${services.map((s) => `<option>${esc(s.title)}</option>`).join('')}
              ${copy.quote.extraOptions.map((o) => `<option>${esc(o)}</option>`).join('')}
            </select>
          </label>
          <label><span>Details</span><textarea name="message" rows="4" required placeholder="${esc(copy.quote.placeholder)}"></textarea></label>
          <button type="submit" class="btn btn-red btn-lg">Send My Free Quote Request</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
      <aside class="contact-info">
        <a class="big-phone" href="${b.phoneHref}">${icons.phone}<span><small>Call or text ${esc(b.contactName)}</small>${b.phone}</span></a>
        <ul class="info-list">
          <li>${icons.mail}<a href="mailto:${b.email}">${b.email}</a></li>
          <li>${icons.pin}<a href="${b.mapsUrl}" target="_blank" rel="noopener">${b.street}, ${b.city}, ${b.region} ${b.zip}</a></li>
          <li>${icons.clock}<span>${b.hours}${b.hoursNote ? `<br />${esc(b.hoursNote)}` : ''}</span></li>
          ${b.credential ? `<li>${icons.shield}<span>${esc(b.credential.long)}</span></li>` : ''}
        </ul>
        ${awardBadge()}
      </aside>
    </div>
  </section>`;

const footer = ({ root }) => `
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo(root)}
        <p class="footer-tagline">${esc(b.tagline.join(' '))}</p>
        <p>${esc(copy.description)}</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>${services.map((s) => `<li><a href="${root}#${s.id}">${esc(s.title)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Service Areas</h4>
        <ul>${cities.map((c) => `<li><a href="${root}service-areas/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="${b.phoneHref}" class="footer-phone">${b.phone}</a></li>
          <li><a href="mailto:${b.email}">${b.email}</a></li>
          <li>${b.street}<br />${b.city}, ${b.region} ${b.zip}</li>
          <li>${b.hours}</li>
        </ul>
        ${socialLinks()}
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; <span id="year">${new Date().getFullYear()}</span> ${esc(b.name)}${b.credential ? ` &middot; ${esc(b.credential.short)}` : ''}</span>
      <a href="#main">Back to top &uarr;</a>
    </div>
  </footer>
  <div class="mobile-bar">
    <a href="${b.phoneHref}" class="btn btn-red">${icons.phone} Call Now</a>
    <a href="#quote" class="btn btn-light">Free Quote</a>
  </div>
  <script src="${root}assets/js/main.js" defer></script>
</body>
</html>
`;

module.exports = { esc, icons, head, header, footer, slot, band, serviceBoxes, reviewsSection, ctaBand, contactSection, localBusiness, awardBadge };
