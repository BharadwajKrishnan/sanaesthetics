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
- `lib/posts.tsx`: the newsletter issues; `lib/articles.tsx`: the flavour science articles; `lib/recipes.ts`: the written recipes. Each entry becomes a page under `/newsletter`, `/flavour-science` or `/recipes`. Links to issues and articles go through `issueLink()` / `articleLink()` so they always open in a new tab.
- `app/globals.css`: the colour palette (cream, parchment, forest green, maroon, brass) and the brass anjarapetti styling.
- `lib/photos.ts`: photos for the picture slots (hero, issue 1, and the three explore cards). Until a slot has a photo, an illustration from `components/Artwork.tsx` is drawn instead. Put photos in `public/images/` and set their paths here.
- `lib/instagram.ts`: the reels and posts shown under "Recipes with a story". Add a line to feature another one.
- `lib/spices.ts`, `components/TadkaPan.tsx`, `components/SixTastes.tsx`: the interactive pieces and their flavour facts.
- `components/SignupForm.tsx`: the email form used for both the newsletter and the classes waitlist.
- `lib/signups.ts`, `app/api/signup/`: the signup flow described below.

## Signups

The site keeps no subscriber list. It hands every signup to an n8n workflow, which adds the address to the sheet straight away. No confirmation email is sent.

1. A reader enters their name and email address. The site POSTs a `subscribed` event to the webhook.
2. The workflow adds the address to the Google Sheet, or updates its row if the address is already there.
3. The form tells the reader they're on the list.

Set these in `.env.local` locally and in the host's environment settings when deployed (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `SIGNUP_WEBHOOK_URL` | The n8n webhook URL (a Webhook node set to POST). |
| `SIGNUP_WEBHOOK_SECRET` | Optional. Sent as the `xi-api-key` header; have the workflow reject requests without it. |

Without `SIGNUP_WEBHOOK_URL`, signups are printed to the dev server's console so the form can be tried locally.

The webhook receives JSON:

```json
{ "event": "subscribed", "list": "newsletter", "name": "Meena Iyer", "email": "name@example.com", "subscribedAt": "2026-10-10T09:00:00.000Z" }
```

`list` is `newsletter` or `waitlist` (the classes form). If the workflow replies with `{ "status": "exists" }` for an address that is already in the sheet, the site tells the reader so.

A ready-made workflow is in `n8n/signup-workflow.json`. Import it in n8n (Workflow menu → Import from file), then:

1. Copy the **Webhook** node's production URL into `SIGNUP_WEBHOOK_URL`. To keep other callers out, set the node's authentication to Header Auth with a credential named `xi-api-key`, and put its value in `SIGNUP_WEBHOOK_SECRET`.
2. On **Append or update row in sheet**, connect a Google Sheets credential and pick the spreadsheet and sheet. The sheet needs a header row with `name`, `email`, `list` and `subscribedAt`. Rows are matched on `email`, so an address is never added twice.
3. Activate the workflow.
