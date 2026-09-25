# Local Business Website Template

A fast, modern, mobile-first website for **any small local business**: trades, home services, salons, clinics, auto shops, cleaners, landscapers, and so on.

It's plain HTML, CSS and a little JavaScript. There are no frameworks and no dependencies, and it hosts free on Vercel, Netlify, Cloudflare Pages or GitHub Pages.

## What you get

| Page | What's on it |
| --- | --- |
| `/` | Full-screen hero photo with a headline and Call Now / Free Quote buttons, reviews right below the hero, a scrolling highlights ticker, service boxes, featured projects, a "Why choose us" section with stats and an award badge, service areas, a call-to-action banner and a quote form |
| `/gallery/` | Photo gallery with filter buttons and a tap-to-enlarge viewer (arrow keys and Esc work) |
| `/service-areas/` | All the towns you serve |
| `/service-areas/<town>/` | One page per town with local copy, which helps local search rankings |

Also included:
- Click-to-call buttons everywhere and a sticky Call / Quote bar on phones
- SEO basics: page titles and descriptions, Open Graph tags, `LocalBusiness` structured data, `sitemap.xml` and `robots.txt`
- Subtle animations: the headline slides in, the hero photo slowly zooms and drifts as you scroll, cards reveal on scroll, stats count up, and the CTA graphic draws itself in. All animation is turned off for visitors who set "reduce motion" on their device.
- Accessibility: skip link, keyboard-friendly menus and gallery, visible focus styles, alt text on photos

## Set it up for a new business

### 1. Edit the content (one file)

Open **`src/data.js`**. Everything the site says lives there:

- **`business`:** name, phone, email, address, hours, website URL, license or credential line, award badge, social links
- **`copy`:** the hero headline, every section heading, the ticker items, the About text and stats, and the quote-form wording
- **`services`:** the service boxes. Pick an icon for each: `wrench`, `tools`, `home`, `shield`, `star`, `clock`, `truck`, `spark` or `leaf`.
- **`gallery`:** photos, captions, towns and filter categories
- **`reviews`:** 3–4 real reviews
- **`cities`:** one entry per town. The first one with `featured: true` gets the big card.

Anything in **[square brackets]** is a placeholder, like `[X]+ years` or `License #[000000]`. Search for `[` before launch to make sure you caught them all.

To hide the credential line or the award badge, set `credential: null` or `award: null`.

### 2. Rebuild

```bash
node build.js
```

You need Node 18 or newer. No `npm install` is needed. The build regenerates every `.html` file, `sitemap.xml` and `robots.txt`. Commit the generated files too, since they're what gets hosted.

### 3. Add the logo and photos

| File | What it's for |
| --- | --- |
| `assets/img/logo-white.svg` | Logo on the dark header and footer. A PNG with a transparent background works too; update the file name in `src/layout.js`. |
| `assets/img/logo-black.svg` | Same logo for light backgrounds (optional) |
| `assets/img/hero.jpg` | The big hero photo, about 1920px wide. It's picked up automatically, with no rebuild needed. |
| `assets/img/gallery/…` | Project photos. Name them however you like and list them in `gallery` in `src/data.js`. |
| `assets/img/og-image.jpg` | 1200×630 image shown when the site is shared on social media or in texts |
| `assets/img/favicon.svg` | Browser tab icon |

See [`assets/img/photos/README.md`](assets/img/photos/README.md) for optional per-town background photos.

Until real photos are added, every image spot shows a neutral placeholder, so nothing ever looks broken.

### 4. Change the colors (optional)

The colors are set at the top of `assets/css/styles.css`:

```css
:root {
  --red: #f65257;   /* the accent color: buttons, highlights, stars */
  --black: #0b0b0b;
  --bg: #121212;
  ...
}
```

Change `--red` to the business's brand color. The name is historical; it's simply the accent.

Fonts are Plus Jakarta Sans and Bebas Neue, self-hosted in `assets/fonts/`.

### 5. Quote form

The form checks the required fields, then opens the visitor's email app with the request filled in and addressed to `business.email`. To collect submissions without email, point the form at a service like Formspree or Netlify Forms in `assets/js/main.js`.

## Launch checklist

- [ ] Every `[placeholder]` in `src/data.js` is replaced (search for `[`)
- [ ] Phone number and `phoneHref` match, and a test call from a phone works
- [ ] **Reviews are real**, copied word for word, with the reviewer's name as shown on the review site. Never invent or edit reviews.
- [ ] Every stat, award and credential shown is true and current
- [ ] You have the rights to every photo (the owner's own photos, or properly licensed stock)
- [ ] Logo, hero photo, gallery photos and `og-image.jpg` are replaced
- [ ] `business.site` is the real domain, since the sitemap and canonical URLs use it
- [ ] `node build.js` has been run and the output committed

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy

- **Vercel:** go to vercel.com/new, import the repo, set Framework Preset to **Other**, leave the build command empty, and click Deploy.
- **Netlify / Cloudflare Pages:** no build command, publish directory `/`.
- **GitHub Pages:** go to Settings → Pages → Deploy from a branch, then pick the branch and `/ (root)`.

## Project structure

```
build.js              # generates all pages from src/
src/data.js           # ALL content: edit this
src/layout.js         # shared header, footer and section templates
index.html, gallery/, service-areas/   # generated output (don't edit by hand)
assets/css/styles.css # all styles; colors at the top
assets/js/main.js     # menu, gallery, form, animations
assets/img/           # logo, photos, placeholders
assets/fonts/         # self-hosted fonts
```
