# Sanaesthetics

Landing page for Sanaesthetics: vegetarian Indian cooking, explored through tradition, technique and flavour science.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `app/page.tsx`: the page and its copy.
- `lib/site.ts`: brand name, tagline, navigation and Instagram handle.
- `lib/instagram.ts`: the reels and posts shown in "From the kitchen". Add a line to feature another one.
- `components/SpiceBox.tsx`: the spice box in the hero and its flavour facts.
- `lib/waitlist.ts`: where waitlist emails are stored. It writes to `data/waitlist.json` locally; swap in a database or email service before deploying.
