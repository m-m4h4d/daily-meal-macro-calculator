# MacroPulse — Daily Meal Macro Calculator

A single-page TDEE and macro calculator with a daily meal log, Smart Macro Finisher and hydration tracker. No build step, no backend — all data is stored in the browser's `localStorage`.

## Structure

| File | Route | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Landing page |
| `app.html` | `/app` | The calculator app |
| `404.html` | any missing path | Not-found page (Vercel serves it automatically) |
| `favicon.svg` | `/favicon.svg` | Site icon |
| `og-image.png` | `/og-image.png` | 1200×630 social preview image (source: `og/template.html`) |
| `scripts/build.mjs` | — | Assembles `dist/` and makes social preview URLs absolute |
| `src/input.css` | — | Tailwind entry point |
| `tailwind.config.js` | — | Tailwind theme, content paths and safelist |
| `vercel.json` | — | Build settings, clean URLs, redirects, security headers |

Styles are compiled with the Tailwind CLI into `assets/styles.css` (git-ignored). `npm run build` writes the deployable site to `dist/`.

If you add Tailwind classes that are built at runtime from variables (e.g. `` `bg-${color}-500` ``), add them to the `safelist` in `tailwind.config.js`, since the build only keeps classes it can find written out in the HTML.

## Social previews

`og:image`, `og:url` and `twitter:image` are written as root-relative paths in the HTML. Link previews need absolute URLs, so `npm run build` prefixes them with the site's origin: `SITE_URL` if set, otherwise Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), otherwise the deployment URL. If you serve the site from a domain Vercel doesn't treat as the production domain, set `SITE_URL` (e.g. `https://example.com`) in the project's environment variables.

To change the image, edit `og/template.html` and regenerate:

```bash
npm i --no-save playwright
npm run og-image     # set CHROMIUM_PATH to use an existing Chromium
```

## Run locally

```bash
npm install
npm run dev          # rebuilds assets/styles.css on change
npx serve .          # in a second terminal, then open http://localhost:3000
```

To check the production build, run `npm run build` and serve `dist/`.

## Deploy to Vercel

Import the repository in the Vercel dashboard (**Add New → Project**). `vercel.json` sets the build command (`npm run build`) and output directory (`dist`), so no settings need changing.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
