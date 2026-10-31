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
