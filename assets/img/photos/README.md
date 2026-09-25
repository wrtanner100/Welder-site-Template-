# Town page backgrounds (optional)

Each town page (`/service-areas/<town>/`) shows a background photo behind its heading. Until one is added, a subtle dark pattern shows instead.

To add one, drop a JPG here named after the town's `slug` from `src/data.js`:

```
city-your-city.jpg
city-nearby-town.jpg
...
```

No rebuild is needed for these.

Or point a town at any existing image by adding `photo: 'gallery/your-photo.jpg'` to its entry in `src/data.js`, then run `node build.js`.

Wide photos (about 1600px) with a clear, uncluttered subject work best. The page darkens them automatically so the text stays readable.
