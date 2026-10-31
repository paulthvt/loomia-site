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
    openApp: 'Ouvrir l’app',
    privacy: 'Confidentialité',
    support: 'Aide',
    legal: 'Mentions légales',
    updated: 'Mis à jour le',
    home: 'Accueil Loomia',
  },
} as const;

/** The home page. `shot` is the file name in public/shots, without -light/-dark. */
const home = {
  en: {
    title: 'Loomia: know who to get back to today',
    description:
      'Loomia keeps your contacts, follow-ups and plans in one calm place, so nobody falls through the cracks.',
    heroTitle: 'Know who to get back to today.',
    heroText:
      'Loomia keeps your contacts, follow-ups and plans in one calm place, so nobody falls through the cracks.',
    heroAlt: "Loomia's Today screen: three people worth a message today, and who they are.",
    features: [
      {
        eyebrow: 'Today',
        title: 'Know what to do today',
        text: "The people to get back to, your tasks and today's events, on one screen.",
        shot: 'today-scrolled',
        alt: 'Today, further down: people to follow up and tasks.',
      },
      {
        eyebrow: 'Contacts',
        title: 'See where everyone is',
        text: 'Each contact shows their step and what comes next, with your notes and tags.',
        shot: 'contacts',
        alt: 'The contact list, filtered by prospects, customers and team.',
      },
      {
        eyebrow: 'Calendar',
        title: 'Events, and who was there',
        text: 'Plan a workshop, invite people, then note who was there and follow up.',
        shot: 'calendar',
        alt: "The month's calendar, with the day's follow-ups below it.",
      },
      {
        eyebrow: 'Month plan',
        title: 'Goals without pressure',
        text: "Pick a few goals for the month and see how it's going, at your own pace.",
        shot: 'month',
        alt: 'Goals: plan the coming month, compared with nobody else.',
      },
    ],
    closing: 'Start with the people you already know.',
    soon: 'Coming soon on iOS and Android.',
  },
  fr: {
    title: 'Loomia : sache qui recontacter aujourd’hui',
    description:
      'Loomia garde tes contacts, tes relances et tes objectifs au même endroit, pour que personne ne passe entre les mailles.',
    heroTitle: 'Sache qui recontacter aujourd’hui.',
    heroText:
      'Loomia garde tes contacts, tes relances et tes objectifs au même endroit, pour que personne ne passe entre les mailles.',
    heroAlt: 'L’écran Aujourd’hui de Loomia : trois personnes à qui écrire aujourd’hui, et qui elles sont.',
    features: [
      {
        eyebrow: 'Aujourd’hui',
        title: 'Sache quoi faire aujourd’hui',
        text: 'Les personnes à recontacter, tes tâches et les événements du jour, sur un seul écran.',
        shot: 'today-scrolled',
        alt: 'Aujourd’hui, plus bas : les personnes à suivre et les tâches.',
      },
      {
        eyebrow: 'Contacts',
        title: 'Vois où en est chacun',
        text: 'Chaque contact montre son étape et la suite, avec tes notes et tes étiquettes.',
        shot: 'contacts',
        alt: 'La liste des contacts, filtrée par prospects, clients et équipe.',
      },
      {
        eyebrow: 'Calendrier',
        title: 'Les événements, et qui était là',
        text: 'Prépare un atelier, invite du monde, puis note qui était là et assure le suivi.',
        shot: 'calendar',
        alt: 'Le calendrier du mois, avec les suivis du jour en dessous.',
      },
      {
        eyebrow: 'Plan du mois',
        title: 'Des objectifs sans pression',
        text: 'Choisis quelques objectifs pour le mois et vois où tu en es, à ton rythme.',
        shot: 'month',
        alt: 'Objectifs : prépare le mois qui vient, sans te comparer à personne.',
      },
    ],
    closing: 'Commence avec les gens que tu connais déjà.',
    soon: 'Bientôt sur iOS et Android.',
  },
} as const;

export const homeStrings = (lang: Lang) => home[lang];

export type Strings = (typeof strings)[Lang];

export const t = (lang: Lang): Strings => strings[lang];
