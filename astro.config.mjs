import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://getloomia.app',
  // `/privacy` is built as `privacy.html`; Workers serves it without the
  // extension and redirects `/privacy/` and `/privacy.html` to it.
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
