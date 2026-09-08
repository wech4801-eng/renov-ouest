import type { APIRoute } from 'astro';

/**
 * robots.txt genere depuis `site` (astro.config.mjs / PUBLIC_SITE_URL).
 * Il suit donc automatiquement le domaine reel : aucun fichier a editer a la main
 * quand on passe du domaine provisoire Hostinger au domaine definitif.
 *
 * Les pages en noindex ne sont volontairement PAS bloquees ici : Google doit
 * pouvoir les explorer pour lire leur directive noindex.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://www.renovouest.fr')).origin;
  const prefix = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const base = origin + prefix;
  const body = [
    `# ${base}/robots.txt`,
    'User-agent: *',
    'Allow: /',
    '',
    '# Les pages legales et la page realisations (tant qu elle est vide) portent',
    '# un meta robots "noindex, follow". On ne les bloque pas ici : un Disallow',
    '# empecherait Googlebot de lire cette directive.',
    '',
    `Sitemap: ${base}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
