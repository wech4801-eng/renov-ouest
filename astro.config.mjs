// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { projects } from './src/data/projects';
import { readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Fontsource declare chaque police en woff2 PUIS en woff. Le woff n'est jamais
 * telecharge (tous les navigateurs cibles lisent le woff2) mais Vite l'emet
 * quand meme. On le retire du build pour ne pas deployer de fichiers morts.
 */
const dropLegacyWoff = () => ({
  name: 'drop-legacy-woff',
  hooks: {
    /** @param {{ dir: URL, logger: { info: (m: string) => void } }} ctx */
    'astro:build:done': async ({ dir, logger }) => {
      const assets = path.join(fileURLToPath(dir), '_astro');
      let removed = 0;
      for (const f of await readdir(assets).catch(() => [])) {
        if (f.endsWith('.woff')) {
          await unlink(path.join(assets, f));
          removed++;
        }
      }
      if (removed) logger.info(`${removed} fichier(s) .woff retire(s) du build`);
    },
  },
});

// Une seule variable pilote le deploiement : l'URL publique complete.
// Elle peut inclure un sous-dossier (GitHub Pages) ou non (hebergement classique).
//   https://www.renovouest.fr            -> site = origin, base = /
//   https://user.github.io/renov-ouest   -> site = origin, base = /renov-ouest
const PUBLIC_URL = new URL(process.env.PUBLIC_SITE_URL || 'https://www.renovouest.fr');
const SITE = PUBLIC_URL.origin;
const BASE = PUBLIC_URL.pathname.replace(/\/+$/, '') || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'never',
  // La feuille de style fait ~8 Ko : l'inliner supprime une requete
  // bloquante sur le chemin critique du premier rendu.
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    dropLegacyWoff(),
    sitemap({
      // Le sitemap ne doit lister que des URLs indexables : une URL en noindex
      // qui y figure envoie deux signaux contradictoires a Google.
      // Pages exclues et pourquoi :
      //  - mentions legales / confidentialite : <meta robots noindex>
      //  - realisations : noindex tant qu'aucun chantier n'est publie
      filter: (page) => {
        // On retire le prefixe de deploiement avant de comparer la route.
        const prefix = BASE === '/' ? '' : BASE;
        const full = new URL(page).pathname.replace(/\/+$/, '');
        const path = (full.startsWith(prefix) ? full.slice(prefix.length) : full) || '/';
        const noindex = ['/mentions-legales', '/politique-confidentialite'];
        if (projects.length === 0) noindex.push('/realisations');
        return !noindex.includes(path);
      },
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
