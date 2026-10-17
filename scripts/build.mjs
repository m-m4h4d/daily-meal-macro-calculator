// Assembles the deployable site in dist/ (run after build:css).
// Social crawlers need absolute og:image / og:url values, so root-relative
// ones in the HTML are prefixed with the site's origin when it's known:
// SITE_URL if set, else Vercel's production domain, else the deployment URL.
import fs from 'node:fs';

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const origin = (process.env.SITE_URL || (host ? `https://${host}` : '')).replace(/\/$/, '');

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/assets', { recursive: true });

for (const file of ['index.html', 'app.html']) {
  let html = fs.readFileSync(file, 'utf8');
  if (origin) {
    html = html.replace(
      /(<meta (?:property|name)="(?:og:image|og:url|twitter:image)" content=")(\/[^"]*)"/g,
      (_, prefix, p) => `${prefix}${origin}${p}"`
    );
  }
  fs.writeFileSync(`dist/${file}`, html);
}
for (const file of ['favicon.svg', 'og-image.png']) fs.copyFileSync(file, `dist/${file}`);
fs.copyFileSync('assets/styles.css', 'dist/assets/styles.css');

console.log(origin ? `Built dist/ with social URLs on ${origin}` : 'Built dist/ (no SITE_URL or Vercel URL; social URLs left relative)');
