// Assembles the deployable site in dist/ (run after build:css).
// Social crawlers need absolute og:image / og:url values, so root-relative
// ones in the HTML are prefixed with the site's origin when it's known:
// SITE_URL if set, else Vercel's production domain, else the deployment URL.
// The same origin is used for sitemap.xml and the Sitemap line in robots.txt.
import fs from 'node:fs';

const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const origin = (process.env.SITE_URL || (host ? `https://${host}` : '')).replace(/\/$/, '');

// Public pages, as served with Vercel's cleanUrls (404.html is left out on purpose).
const pages = ['/', '/app'];

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/assets', { recursive: true });

for (const file of ['index.html', 'app.html', '404.html']) {
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

// Sitemaps must list absolute URLs, so sitemap.xml is only written when the origin is known.
let robots = 'User-agent: *\nAllow: /\n';
if (origin) {
  const urls = pages.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n  </url>`).join('\n');
  fs.writeFileSync(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  robots += `\nSitemap: ${origin}/sitemap.xml\n`;
}
fs.writeFileSync('dist/robots.txt', robots);

console.log(
  origin
    ? `Built dist/ with social URLs and sitemap on ${origin}`
    : 'Built dist/ (no SITE_URL or Vercel URL; social URLs left relative, no sitemap.xml)'
);
