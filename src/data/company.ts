/**
 * Source unique de verite pour toutes les coordonnees de l'entreprise.
 * Toute modification faite ici se propage a l'ensemble du site
 * (header, footer, contact, donnees structurees, mentions legales).
 */

export const company = {
  name: "Renov'Ouest",
  /** Graphie de la marque telle qu'elle figure sur le logo. */
  displayName: "Rénov'Ouest",
  tagline: 'Rénovons aujourd’hui, embellissons demain',
  legalName: "Renov'Ouest",
  /**
   * Positionnement : entreprise de renovation COMPLETE. Les savoir-faire
   * (peinture, enduit, facade, sols) sont des composantes de cette offre
   * globale, jamais l'activite principale.
   */
  description:
    'Entreprise de rénovation complète à Saint-Jean-de-la-Croix, près d’Angers : ' +
    'rénovation intérieure et extérieure de maisons, d’appartements et de locaux ' +
    'professionnels, avec une exigence particulière sur la qualité des finitions.',

  /** Accroche principale du site. Ne pas raccourcir ni reformuler. */
  headline: 'La rénovation complète de votre projet, avec l’exigence du détail.',

  /** Phrase d'explication placee directement sous l'accroche. */
  intro:
    'De la transformation de vos espaces aux dernières finitions, Rénov’Ouest vous ' +
    'accompagne dans vos projets de rénovation, de A à Z, pour particuliers comme ' +
    'professionnels.',

  /** Ce que l'entreprise peut renover. */
  buildingTypes: [
    'Maison',
    'Appartement',
    'Local professionnel',
    'Commerce',
    'Bureaux',
  ],

  address: {
    street: '91 levée ligérienne',
    postalCode: '49130',
    city: 'Saint-Jean-de-la-Croix',
    region: 'Maine-et-Loire',
    country: 'France',
    countryCode: 'FR',
  },

  /**
   * Coordonnees du 91 levee ligerienne, geocodees par la Base Adresse Nationale
   * (api-adresse.data.gouv.fr, score 0.95, type housenumber, INSEE 49288).
   * A ne pas modifier a la main : re-geocoder si l'adresse change.
   */
  geo: { latitude: 47.410176, longitude: -0.59415 },
  /** Code INSEE de la commune (source : BAN). */
  inseeCode: '49288',

  phone: {
    display: '06 63 72 98 00',
    href: 'tel:+33663729800',
    e164: '+33663729800',
  },

  email: {
    display: 'renovouest49@gmail.com',
    href: 'mailto:renovouest49@gmail.com',
  },

  /** Zones d'intervention confirmees par le client. Ne rien ajouter sans validation. */
  serviceArea: [
    'Saint-Jean-de-la-Croix',
    'Angers',
    'Angers et alentours',
    'Maine-et-Loire',
  ],

  audience: ['Particuliers', 'Professionnels'],

  projectTypes: [
    'Rénovation complète',
    'Rénovation intérieure',
    'Rénovation extérieure',
    'Construction neuve',
    'Embellissement',
  ],
} as const;

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Prestations', href: '/prestations' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Zone d’intervention', href: '/zone-intervention' },
  { label: 'Contact', href: '/contact' },
] as const;

export const formEndpoint =
  import.meta.env.PUBLIC_FORM_ENDPOINT ?? '/api/contact.php';

export const siteUrl = (
  import.meta.env.PUBLIC_SITE_URL ?? 'https://www.renovouest.fr'
).replace(/\/+$/, '');
