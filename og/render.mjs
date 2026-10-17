// Renders og/template.html to og-image.png at 1200x630.
// Usage: npm i --no-save playwright && npm run og-image
// Set CHROMIUM_PATH to use an already-installed Chromium instead of Playwright's download.
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.join(root, 'og/template.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'og-image.png') });
await browser.close();
console.log('Wrote og-image.png');
