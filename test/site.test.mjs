// Checks the built site in dist/: run `npm run check` (build, then this).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { altPath } from '../src/i18n.ts';

const SITE = 'https://getloomia.app';
const PAGES = ['/', '/privacy', '/support', '/legal', '/fr', '/fr/privacy', '/fr/support', '/fr/legal'];

/** The built file for a path: `/` → index.html, `/fr` → fr.html or fr/index.html. */
function file(path) {
  const base = path === '/' ? 'dist/index' : `dist${path}`;
  return [`${base}.html`, `${base}/index.html`].find((f) => existsSync(f));
}

const html = (path) => readFileSync(file(path), 'utf8');

/** What a reader sees: no tags, no style blocks, entities left as they are. */
const visible = (page) =>
  page.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');

/** Pages that exist; the first test reports the missing ones. */
const built = () => PAGES.filter(file);

const lang = (path) => (path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en');

test('every page is built', () => {
  for (const path of PAGES) assert.ok(file(path), `${path} is missing`);
});

test('no page ships a script', () => {
  for (const path of built()) assert.doesNotMatch(html(path), /<script\b/i, path);
});

test('every page has lang, canonical and hreflang', () => {
  for (const path of built()) {
    const page = html(path);
    const other = altPath(path);
    const [en, fr] = lang(path) === 'en' ? [path, other] : [other, path];
    assert.match(page, new RegExp(`<html[^>]* lang="${lang(path)}"`), path);
    assert.ok(page.includes(`<link rel="canonical" href="${SITE}${path}"`), `${path} canonical`);
    assert.ok(page.includes(`hreflang="en" href="${SITE}${en}"`), `${path} hreflang en`);
    assert.ok(page.includes(`hreflang="fr" href="${SITE}${fr}"`), `${path} hreflang fr`);
    assert.ok(page.includes(`hreflang="x-default" href="${SITE}${en}"`), `${path} x-default`);
  }
});

test('the language link points at the same page', () => {
  for (const path of built()) {
    const link = html(path).match(/<a [^>]*data-lang-switch[^>]*>/)?.[0] ?? '';
    assert.ok(link.includes(`href="${altPath(path)}"`), `${path}: ${link}`);
  }
});

test('nothing reads as MLM', () => {
  const words = /recruit|recrut|downline|\bPV\b|\bOV\b|elite|essential oil|huiles? essentielle/i;
  for (const path of built()) assert.doesNotMatch(visible(html(path)), words, path);
});

test('French uses tu', () => {
  for (const path of built().filter((p) => lang(p) === 'fr')) {
    assert.doesNotMatch(visible(html(path)), /\b(vous|votre|vos)\b/i, path);
  }
});

test('altPath swaps languages and keeps the page', () => {
  assert.equal(altPath('/'), '/fr');
  assert.equal(altPath('/fr'), '/');
  assert.equal(altPath('/privacy'), '/fr/privacy');
  assert.equal(altPath('/fr/privacy'), '/privacy');
});
