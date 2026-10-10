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
- `lib/site.ts`: brand name, domain (southindianfoodlab.com), author, navigation and Instagram handle.
- `lib/posts.tsx`: the newsletter issues; `lib/recipes.ts`: the written recipes. Each entry becomes a page under `/newsletter` or `/recipes`. Links to issues go through `issueLink()` so they always open in a new tab.
- `app/globals.css`: the colour palette (cream, parchment, forest green, maroon, brass) and the brass anjarapetti styling.
- `lib/photos.ts`: photos for the picture slots (hero, issue 1, and the three explore cards). Until a slot has a photo, an illustration from `components/Artwork.tsx` is drawn instead. Put photos in `public/images/` and set their paths here.
- `lib/instagram.ts`: the reels and posts shown under "Recipes with a story". Add a line to feature another one.
- `lib/spices.ts`, `components/TadkaPan.tsx`, `components/SixTastes.tsx`: the interactive pieces and their flavour facts.
- `components/SignupForm.tsx`: the email form used for both the newsletter and the classes waitlist.
- `lib/signups.ts`, `app/api/signup/`: the double opt-in signup flow described below.

## Signups

The site keeps no subscriber list. It hands every signup to an n8n workflow, which sends the confirmation email and keeps the sheet.

1. A reader enters an address. The site signs a confirmation link and POSTs a `pending` event to the webhook. The workflow emails the link.
2. The reader opens the link. The site checks the signature (links last 48 hours) and POSTs a `confirmed` event. The workflow adds the address to the sheet.
3. The reader lands on `/subscribe?status=confirmed`.

Set these in `.env.local` locally and in the host's environment settings when deployed (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `SIGNUP_WEBHOOK_URL` | The n8n webhook URL (a Webhook node set to POST). |
| `SIGNUP_WEBHOOK_SECRET` | Optional. Sent as the `X-Signup-Secret` header; have the workflow reject requests without it. |
| `SIGNUP_SECRET` | Signs the links. Any long random string. Required in production. |
| `SITE_URL` | Optional. Origin for links in emails; defaults to https://southindianfoodlab.com in production. |

Without `SIGNUP_WEBHOOK_URL`, the events (including the confirmation link) are printed to the dev server's console so the flow can be tried locally.

The webhook receives JSON:

```json
{ "event": "pending", "list": "newsletter", "email": "name@example.com", "confirmUrl": "https://…/api/signup/confirm?token=…", "requestedAt": "2026-10-10T09:00:00.000Z" }
{ "event": "confirmed", "list": "newsletter", "email": "name@example.com", "confirmedAt": "2026-10-10T09:05:00.000Z" }
```

`list` is `newsletter` or `waitlist` (the classes form). A minimal workflow: Webhook → IF `event` is `pending` → send an email containing `confirmUrl`; otherwise → append `email`, `list` and `confirmedAt` to the sheet. If the workflow replies with `{ "status": "exists" }` for an address that is already in the sheet, the site tells the reader so instead of adding it twice.
