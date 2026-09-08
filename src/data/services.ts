/**
 * Les quatre prestations principales.
 * Textes issus du PRD client — ne pas inventer de garantie, de label ni de chiffre.
 */

export type Service = {
  /** Segment d'URL sous /prestations/ */
  slug: string;
  /** Numero de poste affiche sur la ligne de mesure */
  num: string;
  name: string;
  /** Libelle court pour la navigation et les listes */
  navLabel: string;
  sub: string;
  /** Resume d'une phrase, utilise sur l'accueil et la page prestations */
  short: string;
  body: string[];
  points: string[];
  /** Ce que couvre concretement l'intervention */
  scope: string[];
  seo: { title: string; description: string };
  /** Visuel a fournir par le client : chemin + texte alternatif */
  image: { src: string | null; alt: string; brief: string };
};

export const services: Service[] = [
  {
    slug: 'enduit-monocouche',
    num: '01',
    name: 'Enduit monocouche',
    navLabel: 'Enduit monocouche',
    sub: 'Une finition extérieure à la fois esthétique et durable',
    short:
      'Application de l’enduit monocouche sur supports adaptés, en construction neuve comme en rénovation.',
    body: [
      'Nous réalisons l’application de l’enduit monocouche sur supports adaptés, en construction neuve comme en rénovation. Après une préparation rigoureuse du support, nous procédons à la mise en œuvre de l’enduit dans le respect des règles professionnelles afin d’obtenir une finition homogène, esthétique et durable.',
      'Nous intervenons notamment pour la préparation des supports, l’application de l’enduit et la réalisation des différentes finitions, selon les besoins du projet.',
    ],
    points: [
      'Préparation rigoureuse du support',
      'Application dans le respect des règles professionnelles',
      'Finitions adaptées aux besoins du projet',
    ],
    scope: ['Préparation des supports', 'Application de l’enduit', 'Réalisation des finitions'],
    seo: {
      title: 'Enduit monocouche à Angers et en Maine-et-Loire',
      description:
        'Application d’enduit monocouche en neuf et en rénovation à Angers et en Maine-et-Loire. Préparation des supports et finitions soignées.',
    },
    image: {
      src: null,
      alt: 'Façade enduite en monocouche réalisée par Renov’Ouest',
      brief: 'photo enduit monocouche\n1200 × 900 · à fournir',
    },
  },
  {
    slug: 'facade',
    num: '02',
    name: 'Façade',
    navLabel: 'Travaux de façade',
    sub: 'Travaux de façade et rénovation extérieure',
    short:
      'Prise en charge des travaux de façade, de la préparation des supports jusqu’à la finition.',
    body: [
      'Nous prenons en charge vos travaux de façade, de la préparation des supports jusqu’à la finition. Notre intervention permet de protéger durablement les façades tout en améliorant l’aspect esthétique du bâtiment.',
      'Nous réalisons les travaux de préparation, de réparation et de finition nécessaires afin de garantir un résultat propre, régulier et durable.',
    ],
    points: [
      'Préparation des supports',
      'Travaux de réparation',
      'Finitions propres, régulières et durables',
    ],
    scope: ['Préparation', 'Réparation', 'Finition'],
    seo: {
      title: 'Travaux de façade et rénovation extérieure à Angers',
      description:
        'Façadier à Saint-Jean-de-la-Croix, près d’Angers : préparation, réparation et finition de façade pour protéger durablement votre bâtiment. Devis sur demande.',
    },
    image: {
      src: null,
      alt: 'Façade rénovée par Renov’Ouest près d’Angers',
      brief: 'photo façade avant / après\n1200 × 900 · à fournir',
    },
  },
  {
    slug: 'peinture-interieure',
    num: '03',
    name: 'Peinture intérieure',
    navLabel: 'Peinture intérieure',
    sub: 'Travaux de peinture et finitions intérieures',
    short:
      'Travaux de peinture sur murs et plafonds, aussi bien dans le neuf qu’en rénovation.',
    body: [
      'Nous réalisons vos travaux de peinture sur murs et plafonds, aussi bien dans le neuf qu’en rénovation.',
      'Une préparation rigoureuse des surfaces permet d’obtenir un résultat homogène, propre et durable.',
    ],
    points: [
      'Peinture des murs et plafonds',
      'Neuf et rénovation',
      'Préparation rigoureuse des surfaces',
    ],
    scope: ['Préparation des surfaces', 'Mise en peinture', 'Finitions'],
    seo: {
      title: 'Peinture intérieure à Angers',
      description:
        'Travaux de peinture intérieure sur murs et plafonds à Angers et en Maine-et-Loire, en neuf comme en rénovation. Préparation soignée des surfaces.',
    },
    image: {
      src: null,
      alt: 'Pièce peinte par Renov’Ouest',
      brief: 'photo pièce peinte\n1200 × 900 · à fournir',
    },
  },
  {
    slug: 'pose-de-sols',
    num: '04',
    name: 'Pose de sols',
    navLabel: 'Pose de sols',
    sub: 'Une pose précise pour un résultat durable',
    short:
      'Pose de revêtements de sols, avec une attention particulière portée à la préparation des supports.',
    body: [
      'Nous assurons la pose de vos revêtements de sols en apportant une attention particulière à la préparation des supports, à la précision de la mise en œuvre et aux finitions.',
    ],
    points: [
      'Préparation des supports',
      'Précision de la mise en œuvre',
      'Finitions soignées',
    ],
    scope: ['Préparation du support', 'Pose du revêtement', 'Finitions'],
    seo: {
      title: 'Pose de sols à Angers',
      description:
        'Pose de revêtements de sols à Angers et en Maine-et-Loire : préparation des supports, mise en œuvre précise et finitions soignées. Devis sur demande.',
    },
    image: {
      src: null,
      alt: 'Sol posé par Renov’Ouest',
      brief: 'photo pose de sol\n1200 × 900 · à fournir',
    },
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
