# South Indian Food Lab

The site behind southindianfoodlab.com: South Indian vegetarian cooking, explored through tradition, technique and flavour science. A newsletter, written recipes, flavour-science articles, an About page and a classes request form. Next.js 16 (App Router), React 19, Tailwind v4, no database and no CMS: every piece of content is a TypeScript file.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes the production build and `npm start` serves it. After a build, the dev server can fail with a Turbopack font error; delete `.next` and start it again.

## Where things live

- `app/page.tsx`: the homepage, section by section (hero, newsletter, flavour pyramid, six tastes, recipes, classes, about, subscribe).
- `app/about`, `app/newsletter`, `app/flavour-science`, `app/recipes`, `app/privacy`, `app/subscribe`: the other pages. `app/not-found.tsx` is the 404 page.
- `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`: robots, the sitemap (built from the content files), the social-card image and the icons. `app/fonts/` holds the one font the social card needs.
- `lib/site.ts`: brand name, domain, author, contact email, navigation, Instagram handle, and `openGraphShared`, which every page spreads into its `openGraph` so the social image is kept.
- `lib/posts.tsx`: the newsletter issues; `lib/articles.tsx`: the flavour-science articles; `lib/recipes.ts`: the written recipes. Each entry becomes a page under `/newsletter`, `/flavour-science` or `/recipes`. Links to issues and articles go through `issueLink()` / `articleLink()` so they always open in a new tab; recipes use `recipePath()` and open in the same tab. `latestPost` is the newest issue, which the homepage features. Each recipe names the issue it relates to in `issueSlug`.
- `lib/pyramid.ts` and `components/FlavourPyramid.tsx`: Sandhya's flavour pyramid on the homepage. Chips link only to writing that exists; slugs are checked at build time.
- `lib/classes.ts`: the classes shown on the homepage and offered in the request form.
- `lib/photos.ts`: photos for the picture slots (hero, issue 1, the two About photos, the spice-box cutout). Until a slot has a photo, an illustration from `components/Artwork.tsx` is drawn instead. Put photos in `public/images/` and set their paths here.
- `lib/instagram.ts`: the reels and posts shown under "Recipes with a story". Add a line to feature another one.
- `components/SixTastes.tsx`: the interactive six tastes on the homepage. `components/Zoomable.tsx` makes photos enlargeable; `components/ArticlePage.tsx` is the long-form layout shared by issues and articles; `components/Kolam.tsx` holds the ornaments.
- `components/SignupForm.tsx`: the form used for the newsletter and for class requests.
- `lib/signups.ts`, `app/api/signup/`: the signup flow described below.
- `next.config.ts`: image quality and the `/blog` to `/newsletter` redirects.

## Signups and class requests

The site keeps no list of its own. It hands every submission to an n8n workflow, which adds the row to a Google Sheet straight away. No confirmation email is sent, so the site's copy promises only that a reply to any issue is enough to be taken off the list. The privacy page (`app/privacy/page.tsx`) describes this in plain language; the contact address it shows is `contactEmail` in `lib/site.ts`.

1. A reader enters their name and email address. On the classes form they also pick a class and may leave a phone number. The site POSTs a `subscribed` event to the webhook.
2. The workflow adds the row to the Google Sheet, or updates its row if the address is already there.
3. The form tells the reader they are on the list, or that their request was received.

Set these in `.env.local` locally and in the host's environment settings when deployed (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `SIGNUP_WEBHOOK_URL` | The n8n webhook URL (a Webhook node set to POST). |
| `SIGNUP_WEBHOOK_SECRET` | Optional. Sent as the `xi-api-key` header; have the workflow reject requests without it. |

Without `SIGNUP_WEBHOOK_URL`, submissions are printed to the dev server's console so the forms can be tried locally.

The webhook receives JSON. A newsletter signup:

```json
{ "event": "subscribed", "list": "newsletter", "name": "Meena Iyer", "email": "name@example.com", "subscribedAt": "2026-10-10T09:00:00.000Z" }
```

A class request adds the class the reader chose, as its title, and the phone number exactly as typed, which is `""` when none was given:

```json
{ "event": "subscribed", "list": "waitlist", "name": "Meena Iyer", "email": "name@example.com", "classType": "Live cooking workshops", "phone": "+49 170 1234567", "subscribedAt": "2026-10-10T09:00:00.000Z" }
```

If the workflow replies with `{ "status": "exists" }` for an address that is already in the sheet, the site tells the reader so.

A ready-made workflow is in `n8n/signup-workflow.json`. Import it in n8n (Workflow menu → Import from file), then:

1. Copy the **Webhook** node's production URL into `SIGNUP_WEBHOOK_URL`. To keep other callers out, set the node's authentication to Header Auth with a credential named `xi-api-key`, and put its value in `SIGNUP_WEBHOOK_SECRET`.
2. On **Append or update row in sheet**, connect a Google Sheets credential and pick the spreadsheet and sheet. The sheet needs a header row with `name`, `email`, `list`, `classType`, `phone` and `subscribedAt`. Rows are matched on `email`, so an address is never added twice; a second class request from the same address updates its row.
3. Activate the workflow.
