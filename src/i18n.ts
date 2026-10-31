// Every string outside the Markdown pages. English and French, informal
// register (tu). No imports: test/site.test.mjs loads this file directly.

export type Lang = 'en' | 'fr';

export const APP_URL = 'https://app.getloomia.app';
export const CONTACT = 'hello@getloomia.app';

/** The language of a path: `/fr` and everything under it is French. */
export function langOf(path: string): Lang {
  return path === '/fr' || path.startsWith('/fr/') ? 'fr' : 'en';
}

/** The same page in the other language: `/privacy` ↔ `/fr/privacy`, `/` ↔ `/fr`. */
export function altPath(path: string): string {
  if (path === '/fr') return '/';
  if (path.startsWith('/fr/')) return path.slice(3);
  return path === '/' ? '/fr' : `/fr${path}`;
}

/** A page path in a language: `href('fr', '/privacy')` → `/fr/privacy`. */
export function href(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  return path === '/' ? '/fr' : `/fr${path}`;
}

const strings = {
  en: {
    otherLanguage: 'Français',
    openApp: 'Open the app',
    privacy: 'Privacy',
    support: 'Support',
    legal: 'Legal notice',
    updated: 'Last updated',
    home: 'Loomia home',
  },
  fr: {
    otherLanguage: 'English',
    openApp: "Ouvrir l'app",
    privacy: 'Confidentialité',
    support: 'Aide',
    legal: 'Mentions légales',
    updated: 'Mis à jour le',
    home: 'Accueil Loomia',
  },
} as const;

export type Strings = (typeof strings)[Lang];

export const t = (lang: Lang): Strings => strings[lang];
