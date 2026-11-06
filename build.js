// Builds the static site from src/. Run: node build.js
const fs = require('fs');
const path = require('path');
const { business: b, copy, gallery, heroPhoto, heroFallback, works, aboutPhoto, cities } = require('./src/data');
const L = require('./src/layout');

const write = (rel, html) => {
  const file = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('wrote', rel);
};

// Start clean so renamed or removed cities don't leave stale pages behind.
fs.rmSync(path.join(__dirname, 'service-areas'), { recursive: true, force: true });

const page = ({ root, path: p, title, description, jsonLd, home = false, body }) =>
  (L.head({ root, title, description, path: p, jsonLd }) + L.header({ root, home }) + body + L.footer({ root }))
    .replace(/\{\{root\}\}/g, root);

const esc = L.esc;
const areaCards = (list, hrefFor, withNotes) => list.map((c) => `
          <a class="area-card${c.featured ? ' area-featured' : ''}" href="${hrefFor(c)}"${c.featured ? ` data-label="${esc(copy.areas.featuredLabel)}"` : ''}>
            <span class="area-name">${esc(c.name)}</span>
            ${withNotes || c.featured ? `<span class="area-note">${c.areas.map(esc).join(' · ')}</span>` : ''}
            <span class="area-arrow">${L.icons.arrow}</span>
          </a>`).join('');

// "25+" → count up to 25 with a "+" suffix. Placeholders like "[X]+" just display as-is.
const stat = ([value, label]) => {
  const m = /^(\d+)(\D*)$/.exec(value);
  const attrs = m ? ` data-count="${m[1]}" data-suffix="${esc(m[2])}"` : '';
  return `<div class="stat"><strong${attrs}>${esc(value)}</strong><span>${esc(label)}</span></div>`;
};

/* ------------------------------ Home ------------------------------ */
const [l1, l2, l3] = copy.hero.lines;
const home = `
    <section class="hero" aria-label="Intro">
      <div class="hero-frame">
        <div class="hero-bg photo" data-img="assets/img/${heroPhoto}" data-fallback="assets/img/${heroFallback}" role="img" aria-label="${esc(b.name)}"></div>
        <div class="hero-shade" aria-hidden="true"></div>
        <div class="hero-content">
          <a class="hero-rating" href="#reviews"><span class="stars" aria-hidden="true">★★★★★</span> ${esc(copy.hero.rating)}</a>
          <h1 class="hero-title">
            <span class="line"><span>${esc(l1)}</span></span>
            <span class="line"><span>${esc(l2)}</span></span>
            <span class="line"><span><em>${esc(l3)}</em></span></span>
          </h1>
          <p class="hero-lead">${esc(copy.hero.lead)}</p>
          <div class="hero-actions">
            <a href="${b.phoneHref}" class="btn btn-red btn-xl">${L.icons.phone} Call Now &middot; ${b.phone}</a>
            <a href="#quote" class="btn btn-light btn-xl">Get a Free Quote</a>
          </div>
          <ul class="hero-trust">${copy.hero.trust.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
        <a class="hero-notch" href="#reviews" aria-label="Scroll to reviews">
          <span class="scroll-dot" aria-hidden="true"></span> Scroll
        </a>
      </div>
    </section>

    ${L.reviewsSection()}

    ${L.band()}

    <section class="section services" id="services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${esc(copy.services.eyebrow)}</p>
          <h2>${esc(copy.services.heading)}</h2>
          <p class="muted">${esc(copy.services.text)}</p>
        </div>
        ${L.serviceBoxes()}
        <div class="center-actions"><a href="services/" class="btn btn-outline-light">View services &amp; pricing ${L.icons.arrow}</a></div>
      </div>
    </section>

    <section class="section works" id="work">
      <div class="works-shape" aria-hidden="true"></div>
      <div class="container">
        <h2 class="works-title">${esc(copy.works.heading)}</h2>
        <div class="work-grid">
          ${works.map((w, i) => `
          <article class="work-card">
            ${L.slot(w.photo, '', w.title)}
            <div class="work-body">
              <h3>${esc(w.title).replace(' ', '<br />')}</h3>
              ${i === works.length - 1 ? `<a href="gallery/" class="pill-link">${esc(copy.works.button)}</a>` : ''}
            </div>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="section about" id="about">
      <div class="container about-grid">
        <div class="about-photo">
          ${L.slot(aboutPhoto, '', `Work by ${b.name}`)}
          ${L.awardBadge()}
        </div>
        <div>
          <p class="eyebrow">${esc(copy.about.eyebrow)}</p>
          <h2>${esc(b.tagline.join(' '))}</h2>
          <p class="muted">${esc(copy.about.text)}</p>
          <ul class="checks">
            ${copy.about.bullets.map(([bold, text]) => `<li><strong>${esc(bold)}</strong> ${esc(text)}</li>`).join('\n            ')}
          </ul>
          <div class="stats">
            ${copy.about.stats.map(stat).join('\n            ')}
          </div>
        </div>
      </div>
    </section>

    <section class="section areas" id="areas">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${esc(copy.areas.eyebrow)}</p>
          <h2>${esc(copy.areas.heading)}</h2>
        </div>
        <div class="area-grid">${areaCards(cities, (c) => `service-areas/${c.slug}/`, false)}
        </div>
      </div>
    </section>

    ${L.ctaBand()}
    ${L.contactSection()}
`;

write('index.html', page({
  root: '',
  path: '/',
  home: true,
  title: `${b.name} | ${l1} ${l2} ${l3}`,
  description: `${copy.description} Call ${b.phone}.`,
  jsonLd: L.localBusiness(),
  body: home,
}));

/* ------------------------------ Gallery ------------------------------ */
const types = ['All', ...new Set(gallery.map((g) => g.type))];
const galleryBody = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">Gallery</p>
        <h1>${esc(copy.gallery.heading)}</h1>
        <p class="hero-lead">${esc(copy.gallery.lead)}</p>
      </div>
    </section>
    <section class="section gallery-section">
      <div class="container">
        <div class="filters" role="group" aria-label="Filter photos">
          ${types.map((t, i) => `<button type="button" class="filter${i === 0 ? ' active' : ''}" data-filter="${esc(t)}" aria-pressed="${i === 0}">${esc(t)}</button>`).join('')}
        </div>
        <div class="gallery-grid">
          ${gallery.map((g) => {
            const alt = `${g.caption}${g.city ? `, ${g.city}` : ''}`;
            return `
          <figure class="g-item" data-type="${esc(g.type)}">
            <button type="button" class="g-open" aria-label="View larger: ${esc(alt)}">
              <img src="../assets/img/gallery/${g.file}" alt="${esc(alt)}" loading="lazy" width="442" height="403" />
            </button>
            <figcaption>${esc(g.caption)}${g.city ? `<span>${esc(g.city)}</span>` : ''}</figcaption>
          </figure>`;
          }).join('')}
        </div>
      </div>
    </section>
    ${L.reviewsSection()}
    ${L.ctaBand()}
    ${L.contactSection()}
`;
write('gallery/index.html', page({
  root: '../',
  path: '/gallery/',
  title: `Gallery | ${b.name}`,
  description: `Photos of recent projects by ${b.name}.`,
  jsonLd: L.localBusiness(),
  body: galleryBody,
}));

/* ------------------------------ Services ------------------------------ */
const { servicesPage: sp } = require('./src/data');
const en = sp.entrance;
const cg = sp.corrugated;
const servicesBody = `
    <section class="page-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="../">Home</a> / <span>Services</span></nav>
        <p class="eyebrow">${esc(sp.hero.eyebrow)}</p>
        <h1>${esc(sp.hero.heading)}</h1>
        <p class="hero-lead">${esc(sp.hero.lead)}</p>
        <div class="hero-actions">
          <a href="${b.phoneHref}" class="btn btn-red btn-xl">${L.icons.phone} Call ${b.phone}</a>
          <a href="#quote" class="btn btn-light btn-xl">${esc(sp.cta.button)}</a>
        </div>
      </div>
    </section>

    <section class="section pkg-section" id="entrance-packages">
      <div class="container">
        <div class="pkg-intro">
          <div class="pkg-photo">${L.slot(en.photo, '', en.photoAlt)}</div>
          <div>
            <p class="eyebrow">${esc(en.eyebrow)}</p>
            <h2>${esc(en.heading)}</h2>
            <p class="muted">${esc(en.text)}</p>
          </div>
        </div>
        <div class="pkg-grid">
          ${en.options.map((o) => `
          <article class="pkg-card">
            <p class="pkg-label">${esc(o.label)}</p>
            <h3>${esc(o.title)}</h3>
            <p class="pkg-note">${esc(o.note)}</p>
            <p class="pkg-text">${esc(o.text)}</p>
            <dl class="pkg-prices">
              <div><dt>Gate only</dt><dd>${esc(o.gate)}</dd></div>
              <div class="pkg-total"><dt>Complete project</dt><dd>${esc(o.complete)}</dd></div>
            </dl>
            <a href="#quote" class="text-link">Get a quote for ${esc(o.label)} ${L.icons.arrow}</a>
          </article>`).join('')}
        </div>
        <div class="upgrades">
          <h3>${esc(en.upgradesHeading)}</h3>
          <ul class="upgrade-list">
            ${en.upgrades.map(([name, price]) => `<li class="upgrade"><span>${esc(name)}</span><strong>${esc(price)}</strong></li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    </section>

    <section class="section pkg-section pkg-alt" id="corrugated-fence">
      <div class="container pkg-intro pkg-intro-flip">
        <div>
          <p class="eyebrow">${esc(cg.eyebrow)}</p>
          <h2>${esc(cg.heading)}</h2>
          <p class="muted">${esc(cg.text)}</p>
          <div class="price-block">
            <strong>${esc(cg.price)}</strong>
            <span>${esc(cg.unit)}</span>
          </div>
          <p class="price-example">${esc(cg.example)}</p>
          <a href="#quote" class="btn btn-red btn-lg">Get a fence quote</a>
        </div>
        <div class="pkg-photo">${L.slot(cg.photo, '', cg.photoAlt)}</div>
      </div>
    </section>

    <section class="trust-section" aria-label="Why Deyo Contractors">
      <div class="container focus-grid">
        ${sp.trust.map(([t, d]) => `
        <div class="focus">
          <span class="focus-num">${esc(t)}</span>
          <p>${esc(d)}</p>
        </div>`).join('')}
      </div>
    </section>

    <section class="section services" id="more-services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${esc(sp.more.eyebrow)}</p>
          <h2>${esc(sp.more.heading)}</h2>
        </div>
        <div class="service-grid">
          ${sp.more.sections.map((m) => `
          <article class="service svc-card" id="${m.id}">
            ${L.slot(m.photo, 'svc-photo', m.photoAlt)}
            <div class="service-icon">${L.icons[m.icon] || L.icons.star}</div>
            <h3>${esc(m.title)}</h3>
            <p>${esc(m.text)}</p>
            <ul class="svc-list">${m.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
            <a href="#quote" class="text-link">Get a free quote ${L.icons.arrow}</a>
          </article>`).join('')}
        </div>
      </div>
    </section>

    ${L.ctaBand(null, sp.cta)}
    ${L.contactSection(null, 'project')}
`;
write('services/index.html', page({
  root: '../',
  path: '/services/',
  title: `Services & Pricing | ${b.name}`,
  description: `Custom logo entrance gate packages, 8' corrugated metal fences, fencing, decking and construction from ${b.name}. Licensed Arkansas contractor serving Heber Springs. Call ${b.phone}.`,
  jsonLd: L.localBusiness(),
  body: servicesBody,
}));

/* -------------------------- Service areas index -------------------------- */
const areasIndex = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${esc(copy.areas.eyebrow)}</p>
        <h1>${esc(copy.areas.pageHeading)}</h1>
        <p class="hero-lead">${esc(copy.areas.pageLead)}</p>
      </div>
    </section>
    <section class="section areas">
      <div class="container">
        <div class="area-grid">${areaCards(cities, (c) => `${c.slug}/`, true)}
        </div>
        <p class="muted center">${esc(copy.areas.notListed)} <a href="${b.phoneHref}">${b.phone}</a></p>
      </div>
    </section>
    ${L.ctaBand()}
    ${L.contactSection()}
`;
write('service-areas/index.html', page({
  root: '../',
  path: '/service-areas/',
  title: `Service Areas | ${b.name}`,
  description: `${b.name} serves ${cities.map((c) => c.name).join(', ')}.`,
  jsonLd: L.localBusiness(),
  body: areasIndex,
}));

/* ------------------------------ City pages ------------------------------ */
cities.forEach((c) => {
  const others = cities.filter((o) => o.slug !== c.slug);
  const body = `
    <section class="page-hero city-hero">
      ${L.slot(c.photo || `photos/city-${c.slug}.jpg`, 'city-photo', `${b.name} in ${c.name}`)}
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="../../">Home</a> / <a href="../">Service Areas</a> / <span>${esc(c.name)}</span></nav>
        <div class="hero-badges">
          ${b.credential ? `<span class="pill pill-red">${esc(b.credential.short)}</span>` : ''}
          <span class="pill">${esc(copy.hero.trust[copy.hero.trust.length - 1])}</span>
        </div>
        <h1>${esc(copy.city.heading(c.name))}</h1>
        <p class="hero-lead">${esc(c.intro)}</p>
        <div class="hero-actions">
          <a href="${b.phoneHref}" class="btn btn-red btn-xl">${L.icons.phone} Call ${b.phone}</a>
          <a href="#quote" class="btn btn-light btn-xl">Get a Free Quote</a>
        </div>
      </div>
    </section>

    ${L.band()}

    <section class="section city-focus">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">In ${esc(c.name)}</p>
          <h2>${esc(copy.city.focusHeading(c.name))}</h2>
        </div>
        <div class="focus-grid">
          ${c.focus.map(([t, d], i) => `
          <div class="focus">
            <span class="focus-num">0${i + 1}</span>
            <h3>${esc(t)}</h3>
            <p>${esc(d)}</p>
          </div>`).join('')}
        </div>
        <p class="muted">Serving all of ${esc(c.name)}, including ${c.areas.map(esc).join(', ')}.</p>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">Services</p>
          <h2>${esc(copy.city.servicesHeading(c.name))}</h2>
        </div>
        ${L.serviceBoxes(c.name)}
      </div>
    </section>

    ${L.reviewsSection()}

    <section class="section areas">
      <div class="container">
        <div class="section-head"><p class="eyebrow">Nearby</p><h2>Also serving</h2></div>
        <div class="area-grid">
          ${others.map((o) => `<a class="area-card" href="../${o.slug}/"><span class="area-name">${esc(o.name)}</span><span class="area-arrow">${L.icons.arrow}</span></a>`).join('')}
        </div>
      </div>
    </section>

    ${L.ctaBand(c.name)}
    ${L.contactSection(c.name)}
`;
  write(`service-areas/${c.slug}/index.html`, page({
    root: '../../',
    path: `/service-areas/${c.slug}/`,
    title: `${copy.city.heading(c.name)} | ${b.name}`,
    description: `${b.name} in ${c.name}. ${copy.description} Call ${b.phone}.`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      areaServed: { '@type': 'City', name: c.name },
      provider: L.localBusiness(),
    },
    body,
  }));
});

/* ------------------------------ Sitemap ------------------------------ */
const urls = ['/', '/services/', '/gallery/', '/service-areas/', ...cities.map((c) => `/service-areas/${c.slug}/`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${b.site}${u}</loc></url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${b.site}/sitemap.xml\n`);
