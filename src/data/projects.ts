/**
 * Realisations.
 *
 * VOLONTAIREMENT VIDE : aucun chantier reel n'a ete communique. Rien n'est invente ici.
 * Pour publier une realisation, ajouter un objet au tableau ci-dessous et deposer les
 * photos dans `public/images/realisations/`. La page /realisations s'adapte
 * automatiquement (etat vide tant que le tableau est vide).
 *
 * Cette forme est volontairement plate et serialisable : elle correspond a ce que
 * renverrait un CMS headless (Sanity, Storyblok, Decap), pour permettre la bascule
 * sans reecrire les composants.
 */

export type ProjectImage = {
  src: string;
  alt: string;
  /** Renseigner pour une paire avant/apres ; sinon laisser vide. */
  kind?: 'avant' | 'apres';
};

export type Project = {
  slug: string;
  title: string;
  /** Doit correspondre au `slug` d'une prestation de services.ts */
  serviceSlug: string;
  /** Commune du chantier — uniquement si le client l'a validee. */
  location?: string;
  year?: string;
  description: string;
  cover?: ProjectImage;
  gallery: ProjectImage[];
};

export const projects: Project[] = [];

export const projectsByService = (serviceSlug: string): Project[] =>
  projects.filter((p) => p.serviceSlug === serviceSlug);
