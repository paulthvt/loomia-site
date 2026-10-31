# loomia-site

[getloomia.app](https://getloomia.app): the Loomia marketing site. The app
itself lives in [paulthvt/loomia](https://github.com/paulthvt/loomia) and
runs at [app.getloomia.app](https://app.getloomia.app). Issues are on the
app's [project board](https://github.com/users/paulthvt/projects/2).

Astro, static output, no JavaScript shipped. Design and decisions:
`docs/superpowers/specs/2026-10-30-marketing-site-design.md` in the app repo.

```bash
npm ci
npm run dev     # http://localhost:4321
npm run check   # build, then test/site.test.mjs against dist/
```

`npm run check` fails on a missing page, a `<script>`, a missing hreflang or
Open Graph tag, a language link that doesn't go to the same page, MLM wording,
or *vous* on a French page.

## Copy

Home and header/footer strings are in `src/i18n.ts`; Privacy, Support and
Legal notice are Markdown in `src/pages/` and `src/pages/fr/`. Every change
goes in both languages. French uses *tu*. The privacy policy describes what
the app does today: change it with the app when a processor or a stored field
changes, and update its `updated` date.

## Look

Colours are the app's tokens, copied into `src/styles/site.css`. The mark in
`src/components/Mark.astro` and `public/favicon.svg` has the same geometry as
the app's `tool/brand/icons.sh`: change them together.

Screenshots in `public/shots/` (English) and `public/shots/fr/` are taken from
the web app at 393×852, 3x, signed in to the demo account, light and dark,
then `cwebp -q 82 -resize 786 0`. They must show no real person, no PV/OV and
no rank. `public/og.png` is rendered from `og.html` (command in the file).

## Deploy

GitHub Actions (`.github/workflows/site.yaml`) checks every PR and deploys
`main` with `wrangler deploy`: a Worker named `loomia-site`, static assets
only, custom domain `getloomia.app` from `wrangler.jsonc`. Secrets:
`CLOUDFLARE_API_TOKEN` (Workers deploy, all zones of the account) and
`CLOUDFLARE_ACCOUNT_ID`. Rolling back: `npx wrangler rollback`.

Set by hand in Cloudflare, not in this repo:

- **`www`:** a proxied DNS record `www` (A `192.0.2.0`) and a Redirect Rule:
  hostname equals `www.getloomia.app` → `https://getloomia.app`, 301, path and
  query kept.
- **Email:** Email Routing on `getloomia.app`, `hello@` forwarded to Paul's
  Gmail.
