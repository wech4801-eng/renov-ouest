# Rénov'Ouest — site vitrine

Site de **Rénov'Ouest**, entreprise de rénovation et de finition située au
91 levée ligérienne, 49130 Saint-Jean-de-la-Croix, près d'Angers.
Enduit monocouche, travaux de façade, peinture intérieure et pose de sols.

**Aperçu en ligne :** https://wech4801-eng.github.io/renov-ouest/

> Version de validation client (une seule page autonome, en `noindex`).
> Le site définitif sera déployé sur un hébergement classique — voir
> [DEPLOIEMENT.md](DEPLOIEMENT.md).

## Stack

Astro 7 + TypeScript, généré statiquement. **Aucun JavaScript n'est envoyé au
visiteur** : le menu mobile et le formulaire tiennent en quelques lignes inline.
Polices auto-hébergées (Barlow / Barlow Condensed), images en AVIF et WebP.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # génère dist/
npm run preview      # sert dist/ en local
```

Construire pour la production avec le bon domaine :

```bash
PUBLIC_SITE_URL=https://www.renovouest.fr npm run build
```

## Structure

```
src/
├── data/          # source unique de vérité : coordonnées, prestations,
│                  # zone d'intervention, mentions légales, Schema.org
├── components/    # Header, Footer, Seo, ContactForm, PageHeader…
├── layouts/       # BaseLayout (métadonnées, polices, structure)
├── pages/         # 13 routes, dont /prestations/[slug]
└── styles/        # global.css — jetons de design et composants
public/
├── .htaccess      # configuration Apache (URLs, cache, compression)
└── api/contact.php # traitement du formulaire de devis
```

## Modifier le contenu

| Quoi | Où |
|---|---|
| Téléphone, email, adresse, zone | `src/data/company.ts` |
| Textes et SEO des prestations | `src/data/services.ts` |
| Ajouter une réalisation | `src/data/projects.ts` |
| Mentions légales, confidentialité | `src/data/legal.ts` |

La page `/realisations` reste hors index tant qu'aucun chantier n'est publié,
et rejoint le sitemap automatiquement dès qu'une réalisation est ajoutée.

## SEO

Données structurées Schema.org en graphe (entreprise, site, pages, fil d'Ariane,
prestations) avec des `@id` stables · `robots.txt` et sitemap générés depuis le
domaine · métadonnées Open Graph · Lighthouse mobile 100 en accessibilité,
bonnes pratiques et SEO sur le build de production.

**Rien n'est inventé** : aucune certification, aucun avis client, aucune note,
aucune année d'expérience, aucun chiffre. Les informations non fournies sont
explicitement marquées « à compléter » (notamment SIREN/SIRET et hébergeur dans
les mentions légales).
