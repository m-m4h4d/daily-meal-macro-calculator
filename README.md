# MacroPulse — Daily Meal Macro Calculator

A single-page TDEE and macro calculator with a daily meal log, Smart Macro Finisher and hydration tracker. No build step, no backend — all data is stored in the browser's `localStorage`.

## Structure

| File | Route | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Landing page |
| `app.html` | `/app` | The calculator app |
| `favicon.svg` | `/favicon.svg` | Site icon |
| `vercel.json` | — | Clean URLs, redirects from the old filename, security headers |

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

With `python3 -m http.server`, open the app at `/app.html` (clean URLs like `/app` are a Vercel feature; `npx serve` supports them too).

## Deploy to Vercel

1. Import this repository in the Vercel dashboard (**Add New → Project**).
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
