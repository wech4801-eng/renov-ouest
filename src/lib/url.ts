/**
 * Construit une URL interne en tenant compte du prefixe de deploiement.
 *
 * Le site doit fonctionner a deux endroits sans changer une ligne de code :
 *   - a la racine d'un domaine        -> base = "/"            -> /contact
 *   - dans un sous-dossier            -> base = "/renov-ouest" -> /renov-ouest/contact
 *
 * `import.meta.env.BASE_URL` vaut la valeur de `base` dans astro.config.mjs.
 * Toujours passer par cette fonction pour un lien ou un asset interne.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const url = (path: string): string => {
  if (!path.startsWith('/')) return path;
  return path === '/' ? `${BASE}/` : `${BASE}${path}`;
};
