# South Indian Food Lab

Landing page for South Indian Food Lab (southindianfoodlab.com): vegetarian South Indian cooking, explored through tradition, technique and flavour science.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `app/page.tsx`: the page and its copy.
- `lib/site.ts`: brand name, domain (southindianfoodlab.com), newsletter name (Arusuvai), navigation and Instagram handle.
- `app/globals.css`: the colour palette (cream, parchment, forest green, maroon, brass) and the brass anjarapetti styling.
- `lib/photos.ts`: photos for the picture slots (hero, issue 1, and the three explore cards). Until a slot has a photo, an illustration from `components/Artwork.tsx` is drawn instead. Put photos in `public/images/` and set their paths here.
- `lib/instagram.ts`: the reels and posts shown under "Recipes with a story". Add a line to feature another one.
- `lib/spices.ts`, `components/SpiceBox.tsx`, `components/TadkaPan.tsx`, `components/SixTastes.tsx`: the three interactive pieces and their flavour facts.
- `components/SignupForm.tsx`: the email form used for both the Arusuvai newsletter and the classes waitlist.
- `lib/signups.ts`: where signups are stored. It writes to `data/waitlist.json` and `data/newsletter.json` locally; swap in a database or email service (for the newsletter, e.g. Buttondown or Mailchimp) before relying on the live forms.
