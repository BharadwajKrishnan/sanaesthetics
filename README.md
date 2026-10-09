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
- `lib/site.ts`: brand name, domain (southindianfoodlab.com), tagline, navigation and Instagram handle.
- `app/globals.css`: the colour palette (cream, sand, forest-green ink, one leaf-green accent) and fonts.
- `lib/instagram.ts`: the reels and posts shown in "From the kitchen". Add a line to feature another one.
- `components/SpiceBox.tsx`, `components/TadkaPan.tsx`, `components/SixTastes.tsx`: the three interactive pieces and their flavour facts.
- `components/SignupForm.tsx`: the email form used for both the waitlist and the newsletter.
- `lib/signups.ts`: where signups are stored. It writes to `data/waitlist.json` and `data/newsletter.json` locally; swap in a database or email service (for the newsletter, e.g. Buttondown or Mailchimp) before deploying.
