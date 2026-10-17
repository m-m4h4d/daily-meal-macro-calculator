# MacroPulse — Daily Meal Macro Calculator

A single-page TDEE and macro calculator with a daily meal log, Smart Macro Finisher and hydration tracker. No build step, no backend — all data is stored in the browser's `localStorage`.

## Structure

| File | Route | Purpose |
| --- | --- | --- |
| `index.html` | `/` | Landing page |
| `app.html` | `/app` | The calculator app |
| `favicon.svg` | `/favicon.svg` | Site icon |
| `src/input.css` | — | Tailwind entry point |
| `tailwind.config.js` | — | Tailwind theme, content paths and safelist |
| `vercel.json` | — | Build settings, clean URLs, redirects, security headers |

Styles are compiled with the Tailwind CLI into `assets/styles.css` (git-ignored). `npm run build` writes the deployable site to `dist/`.

If you add Tailwind classes that are built at runtime from variables (e.g. `` `bg-${color}-500` ``), add them to the `safelist` in `tailwind.config.js`, since the build only keeps classes it can find written out in the HTML.

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
