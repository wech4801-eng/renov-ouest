/**
 * Savoir-faire de Renov'Ouest.
 *
 * POSITIONNEMENT : l'entreprise fait de la RENOVATION COMPLETE. Les quatre
 * savoir-faire ci-dessous sont des composantes d'un projet global, jamais
 * l'activite principale. Chaque texte doit permettre au visiteur de comprendre
 * qu'il peut confier a l'entreprise un chantier bien plus large.
 *
 * Aucune technique, garantie ni certification non confirmee n'est mentionnee.
 */

export type Service = {
  /** Segment d'URL sous /prestations/ */
  slug: string;
  /** Numero d'ordre affiche dans les listes */
  num: string;
  name: string;
  navLabel: string;
  /** Famille de rattachement : situe le savoir-faire dans l'offre globale. */
  family: 'Rénovation intérieure' | 'Rénovation extérieure';
  sub: string;
  /** Resume d'une phrase, utilise sur l'accueil et la page prestations */
  short: string;
  body: string[];
  points: string[];
  /** Ce que couvre concretement l'intervention */
  scope: string[];
  /** Rappelle que le savoir-faire s'inscrit dans un projet plus large. */
  global: string;
  seo: { title: string; description: string };
  image: { src: string | null; alt: string; brief: string };
};

export const services: Service[] = [
  {
    slug: 'enduit-monocouche',
    num: '01',
    name: 'Enduit monocouche',
    navLabel: 'Enduit monocouche',
    family: 'Rénovation extérieure',
    sub: 'Habiller et protéger vos façades, en neuf comme en rénovation',
    short:
      'L’enduit de façade, réalisé seul ou dans le cadre d’une rénovation extérieure plus large.',
    body: [
      'L’enduit monocouche donne à un bâtiment son aspect définitif tout en protégeant ses murs. Nous l’appliquons sur supports adaptés, aussi bien en construction neuve que dans le cadre de la rénovation d’une maison, d’un appartement ou d’un local professionnel.',
      'Après une préparation rigoureuse du support, nous procédons à la mise en œuvre de l’enduit dans le respect des règles professionnelles, afin d’obtenir une finition homogène, esthétique et durable.',
    ],
    points: [
      'Préparation rigoureuse du support',
      'Application dans le respect des règles professionnelles',
      'Finitions adaptées au rendu recherché',
    ],
    scope: ['Préparation des supports', 'Application de l’enduit', 'Réalisation des finitions'],
    global:
      'Votre projet ne se limite pas à l’enduit ? Nous prenons en charge la rénovation extérieure dans son ensemble, et jusqu’à la rénovation complète de votre bien.',
    seo: {
      title: 'Enduit monocouche à Angers — Rénovation de façade',
      description:
        'Application d’enduit monocouche à Angers et en Maine-et-Loire, seule ou intégrée à une rénovation extérieure complète. Préparation des supports et finitions soignées.',
    },
    image: {
      src: null,
      alt: 'Façade enduite en monocouche par Rénov’Ouest, près d’Angers',
      brief: 'Façade terminée en enduit monocouche, lumière rasante — 1600 × 1200',
    },
  },
  {
    slug: 'facade',
    num: '02',
    name: 'Façade',
    navLabel: 'Travaux de façade',
    family: 'Rénovation extérieure',
    sub: 'Remettre en état et valoriser l’extérieur de votre bâtiment',
    short:
      'La remise en état des façades, de la préparation des supports jusqu’au rendu final.',
    body: [
      'La façade est ce que l’on voit en premier, et ce qui protège le bâtiment. Nous prenons en charge sa remise en état : préparation des supports, réparations nécessaires, puis finition. L’intervention protège durablement les murs tout en transformant l’aspect extérieur.',
      'Ces travaux peuvent être menés seuls, ou s’inscrire dans une rénovation extérieure plus large — voire dans la rénovation complète d’une maison ou d’un local professionnel.',
    ],
    points: [
      'Préparation et remise en état des supports',
      'Travaux de réparation',
      'Finitions propres, régulières et durables',
    ],
    scope: ['Préparation', 'Réparation', 'Finition'],
    global:
      'Une façade rénovée s’accompagne souvent d’autres travaux. Nous coordonnons l’ensemble du chantier si votre projet va plus loin.',
    seo: {
      title: 'Rénovation de façade à Angers — Entreprise de rénovation',
      description:
        'Rénovation et remise en état de façade à Saint-Jean-de-la-Croix, Angers et en Maine-et-Loire : préparation, réparation, finition. Projets complets pris en charge.',
    },
    image: {
      src: null,
      alt: 'Façade rénovée par Rénov’Ouest près d’Angers',
      brief: 'Façade avant / après, même cadrage et même heure — 1600 × 1200 ×2',
    },
  },
  {
    slug: 'peinture-interieure',
    num: '03',
    name: 'Peinture intérieure',
    navLabel: 'Peinture intérieure',
    family: 'Rénovation intérieure',
    sub: 'Donner à vos pièces leur aspect définitif',
    short:
      'La mise en peinture des murs et plafonds, étape de finition d’une rénovation intérieure.',
    body: [
      'La peinture est souvent la dernière étape d’un chantier : c’est elle qui donne à une pièce son aspect définitif. Nous intervenons sur les murs et les plafonds, aussi bien pour la remise à neuf d’une seule pièce que dans le cadre de la rénovation intérieure d’un logement ou d’un local.',
      'Le résultat dépend d’abord de ce qui se passe avant : une préparation rigoureuse des surfaces permet d’obtenir un rendu homogène, propre et durable.',
    ],
    points: [
      'Préparation rigoureuse des surfaces',
      'Peinture des murs et plafonds',
      'Rendu homogène, propre et durable',
    ],
    scope: ['Préparation des surfaces', 'Mise en peinture', 'Finitions'],
    global:
      'La peinture intervient rarement seule : elle clôture une transformation. Nous pouvons prendre en charge l’ensemble des travaux qui la précèdent.',
    seo: {
      title: 'Peinture intérieure à Angers — Rénovation intérieure',
      description:
        'Peinture des murs et plafonds à Angers et en Maine-et-Loire, en rénovation comme en neuf. Préparation soignée des surfaces, dans le cadre de projets complets.',
    },
    image: {
      src: null,
      alt: 'Pièce rénovée et mise en peinture par Rénov’Ouest',
      brief: 'Pièce terminée, lumière naturelle, angle large — 1600 × 1200',
    },
  },
  {
    slug: 'pose-de-sols',
    num: '04',
    name: 'Pose de sols',
    navLabel: 'Pose de sols',
    family: 'Rénovation intérieure',
    sub: 'Un sol posé avec précision, pour un résultat qui dure',
    short:
      'La pose des revêtements de sols, composante d’un projet de rénovation intérieure.',
    body: [
      'Changer un sol transforme une pièce autant que la peinture. Nous assurons la pose de vos revêtements en apportant une attention particulière à la préparation des supports, à la précision de la mise en œuvre et aux finitions — notamment aux raccords et aux jonctions, là où le travail se juge.',
      'Cette étape s’inscrit naturellement dans une rénovation intérieure, qu’il s’agisse d’une pièce ou de l’ensemble d’un logement.',
    ],
    points: [
      'Préparation des supports',
      'Précision de la mise en œuvre',
      'Finitions et raccords soignés',
    ],
    scope: ['Préparation du support', 'Pose du revêtement', 'Finitions'],
    global:
      'Sol, peinture, cloisons : ces travaux se pensent ensemble. Nous coordonnons votre rénovation intérieure dans sa globalité.',
    seo: {
      title: 'Pose de sols à Angers — Rénovation intérieure',
      description:
        'Pose de revêtements de sols à Angers et en Maine-et-Loire : préparation des supports, mise en œuvre précise et finitions soignées, au sein de projets de rénovation.',
    },
    image: {
      src: null,
      alt: 'Sol posé par Rénov’Ouest dans une pièce rénovée',
      brief: 'Sol fini, raccord mural net, lumière rasante — 1600 × 1200',
    },
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/** Savoir-faire regroupes par famille, pour exprimer la hierarchie de l'offre. */
export const servicesByFamily = () => [
  {
    family: 'Rénovation intérieure' as const,
    lead: 'Transformer, aménager et remettre à neuf vos espaces de vie ou de travail.',
    items: services.filter((s) => s.family === 'Rénovation intérieure'),
  },
  {
    family: 'Rénovation extérieure' as const,
    lead: 'Protéger le bâtiment et lui redonner l’aspect qu’il mérite.',
    items: services.filter((s) => s.family === 'Rénovation extérieure'),
  },
];
