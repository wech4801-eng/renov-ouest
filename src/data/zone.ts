/**
 * Zone d'intervention.
 * N'ajouter une commune qu'apres validation explicite du client (cf. PRD §13).
 */

export type Area = {
  name: string;
  /** Precision affichee sous le nom. */
  note: string;
  /** Mise en avant sur la page zone d'intervention. */
  primary?: boolean;
};

export const areas: Area[] = [
  {
    name: 'Saint-Jean-de-la-Croix',
    note: 'Notre commune d’implantation, au bord de la Loire.',
    primary: true,
  },
  {
    name: 'Angers',
    note: 'À une dizaine de minutes de nos ateliers.',
    primary: true,
  },
  {
    name: 'Angers et alentours',
    note: 'Communes de l’agglomération angevine.',
  },
  {
    name: 'Maine-et-Loire',
    note: 'Interventions dans le département selon la nature du chantier.',
  },
];
