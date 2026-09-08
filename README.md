# Renov'Ouest — site vitrine

Site vitrine de **Renov'Ouest**, entreprise de rénovation et de finition à
Saint-Jean-de-la-Croix (49130), près d'Angers.

Astro 7 · TypeScript strict · CSS (design system « Industry ») · sortie 100 % statique,
déployable sur Hostinger ou tout hébergement mutualisé.

---

## 1. Installation

Node 22.12 ou plus récent.

```bash
npm install
```

## 2. Développement

```bash
npm run dev
```

Le site est servi sur <http://localhost:4321>.

## 3. Build de production

```bash
npm run build
```

Le site statique est généré dans `dist/`.

## 4. Prévisualiser le build

```bash
npm run preview
```

## 5. Vérifier les types

```bash
npx astro check
```

Doit renvoyer `0 errors`.

---

## 6. Modifier les coordonnées

**Un seul fichier : `src/data/company.ts`.** Nom, adresse, téléphone, email et zone
d'intervention y sont centralisés et se propagent partout (header, footer, contact,
données structurées, mentions légales).

Le numéro de téléphone existe sous trois formes — garder les trois cohérentes :

| Champ | Valeur | Usage |
|---|---|---|
| `display` | `06 63 72 98 00` | Affichage |
| `href` | `tel:+33663729800` | Lien cliquable |
| `e164` | `+33663729800` | Données structurées |

## 7. Modifier les prestations

`src/data/services.ts`. Chaque prestation contient son `slug` (segment d'URL), son
numéro d'affichage, ses textes, ses points clés et ses métadonnées SEO
(`seo.title`, `seo.description`).

Ajouter une prestation crée automatiquement sa page `/prestations/<slug>`, son entrée
dans le menu du pied de page, sa carte sur l'accueil et sa ligne dans le sitemap.

**Longueurs SEO à respecter :** titre 50 à 65 signes, description 120 à 158 signes.

## 8. Ajouter une réalisation

`src/data/projects.ts`. Le tableau `projects` est **volontairement vide** : aucun
chantier n'est inventé. Tant qu'il est vide, la page `/realisations` affiche des
gabarits marqués « GABARIT » ; dès qu'une réalisation est ajoutée, ils disparaissent.

```ts
export const projects: Project[] = [
  {
    slug: 'facade-sainte-gemmes',
    title: 'Ravalement de façade',
    serviceSlug: 'facade',        // doit correspondre à un slug de services.ts
    location: 'Sainte-Gemmes-sur-Loire',
    year: '2026',
    description: 'Nature des travaux, contraintes, résultat obtenu.',
    cover: { src: '/images/realisations/facade-01.avif', alt: 'Façade rénovée' },
    gallery: [],
  },
];
```

La structure est plate et sérialisable : elle correspond à ce que renverrait un CMS
headless, ce qui permettra la bascule sans réécrire les composants.

## 9. Gestion des images

- **Photos de contenu** → `src/assets/`, puis importées et servies par le composant
  `<Image />` d'Astro : conversion AVIF, `srcset` et dimensions automatiques.
  La photo du hero passe ainsi de 2,3 Mo à 24–235 Ko selon la taille d'écran.
- **Images déjà optimisées** → `public/images/`, référencées par leur chemin absolu.
- Les emplacements en attente affichent une hachure et la mention « à fournir »
  avec le format attendu. Les remplacer met fin à l'affichage du gabarit.

**Photos à fournir par le client :**

| Emplacement | Format |
|---|---|
| Enduit monocouche | 1200 × 900 |
| Façade (avant / après) | 1200 × 900 ×2 |
| Peinture intérieure | 1200 × 900 |
| Pose de sols | 1200 × 900 |
| Chantier — mise en œuvre | 1400 × 933 |
| Portrait / équipe | 900 × 1200 |
| Image de partage (Open Graph) | 1200 × 630 → `public/og.jpg` |
| Icône iOS | 180 × 180 → `public/apple-touch-icon.png` |

## 10. Variables d'environnement

Copier `.env.example` vers `.env` et compléter. **Aucun secret ne doit être versionné.**

| Variable | Rôle |
|---|---|
| `PUBLIC_SITE_URL` | URL publique — canonical, sitemap, Open Graph |
| `PUBLIC_FORM_ENDPOINT` | Endpoint du formulaire (défaut `/api/contact.php`) |
| `CONTACT_TO` | Destinataire des demandes |
| `SMTP_HOST` `SMTP_PORT` `SMTP_USER` `SMTP_PASS` `SMTP_FROM` `SMTP_SECURE` | Envoi SMTP |

## 11. Configuration du formulaire

Le formulaire poste vers `public/api/contact.php`, livré avec le site et copié tel quel
dans `dist/api/contact.php`.

Ce script :

1. valide et assainit chaque champ côté serveur ;
2. bloque les robots (champ piège + envoi en moins de 3 secondes) ;
3. limite à 5 envois par heure et par adresse IP ;
4. neutralise les tentatives d'injection d'en-têtes SMTP ;
5. envoie par **SMTP** si `SMTP_HOST` est défini, sinon retombe sur `mail()` ;
6. répond en JSON, ou redirige vers `/contact?envoye=1` si JavaScript est absent.

**Configuration sur l'hébergeur** — deux possibilités :

- variables d'environnement (recommandé) ;
- ou un fichier `public/api/config.php`, **non versionné** :

```php
<?php
return [
  'to' => 'renovouest49@gmail.com',
  'smtp_host' => 'smtp.hostinger.com',
  'smtp_port' => 587,
  'smtp_user' => 'contact@votre-domaine.fr',
  'smtp_pass' => '...',
  'smtp_from' => 'contact@votre-domaine.fr',
  'smtp_secure' => 'tls',
];
```

> **Important — PHP 8 requis.** Si l'hébergement n'exécute pas PHP, supprimer
> `public/api/` et pointer `PUBLIC_FORM_ENDPOINT` vers un service externe
> (Formspree, Web3Forms…) : le front n'a pas besoin d'être modifié.

## 12. Déploiement sur Hostinger

1. `npm run build`
2. Envoyer **le contenu** de `dist/` (pas le dossier lui-même) dans `public_html/`,
   via le gestionnaire de fichiers hPanel ou en FTP.
3. Vérifier que `public_html/api/contact.php` est présent et exécutable.
4. Renseigner les variables SMTP (hPanel → Avancé → Variables d'environnement, ou
   `config.php`).
5. Forcer le HTTPS depuis hPanel.

Le site ne nécessite **ni base de données, ni serveur Node** en production.

## 13. Domaine et HTTPS

1. Choisir le domaine avec le client — `renovouest.fr`, `renov-ouest.fr` et
   `renovouest49.fr` sont des pistes **à vérifier**, leur disponibilité n'a pas été
   contrôlée.
2. Le déclarer dans `PUBLIC_SITE_URL` **et** dans `astro.config.mjs`, puis rebuilder :
   canonical, sitemap et Open Graph en dépendent.
3. Mettre à jour l'URL du sitemap dans `public/robots.txt`.
4. Activer le certificat SSL (gratuit chez Hostinger) et la redirection HTTPS.

## 14. Vérifier le formulaire en production

1. Envoyer une vraie demande depuis `/contact`.
2. Vérifier la réception sur `renovouest49@gmail.com` (et les indésirables).
3. Vérifier que **Répondre** s'adresse bien à l'expéditeur du formulaire.
4. Tester le refus : soumettre le formulaire vide, les cinq messages doivent apparaître.
5. Tester sans JavaScript : la page doit rediriger vers `/contact?envoye=1`.

---

## Structure

```text
src/
├── data/          company.ts · services.ts · projects.ts · zone.ts · legal.ts
├── layouts/       BaseLayout.astro
├── components/    Header · Footer · PageHeader · ContactForm · LegalPage · Seo
├── pages/         12 routes + 404
├── assets/        images optimisées au build
└── styles/        global.css — design system et palette de marque
public/
├── api/           endpoint PHP du formulaire
├── favicon.svg · robots.txt
```

## Design system

Palette de marque appliquée sur le système « Industry » : objets wireframe (angles
vifs, filets 1 px, repères d'angle), Barlow Condensed en titres, Barlow en texte,
monospace pour les libellés.

| Rôle | Valeur |
|---|---|
| Encre | `#1e2b3a` |
| Encre profonde | `#17212c` |
| Fond | `#f7f4ef` |
| Surface | `#efe9e0` |
| Or (accent) | `#c08d4e` |
| Or foncé (texte sur clair) | `#8a6a2f` |

**Deux règles de contraste à respecter :**

- l'or `#c08d4e` ne porte **jamais** de texte sur fond clair (2,67:1) ; sur clair,
  utiliser `--color-accent-700`. Sur l'encre il passe (4,90:1) ;
- un bouton or porte un libellé **encre**, jamais blanc (le blanc sur or tombe à 2,93:1).

## Accessibilité et SEO

Vérifiés sur le build : un seul `h1` par page, hiérarchie de titres sans saut,
navigation clavier, `alt` sur toutes les images, labels de formulaire, cibles tactiles
de 44 px minimum, `prefers-reduced-motion` respecté, aucun débordement horizontal, et
**aucun échec de contraste** (mesure réelle, fond composité).

Chaque page a son `title`, sa meta description, son canonical, ses balises Open Graph
et ses données structurées `HomeAndConstructionBusiness`. `sitemap-index.xml` et
`robots.txt` sont générés au build ; les pages légales sont en `noindex`.

## Reste à fournir

- Les photos listées au point 9.
- Les mentions légales manquantes (forme juridique, SIREN/SIRET, responsable de
  publication, hébergeur) — signalées dans `src/data/legal.ts` et affichées comme
  « à fournir » sur le site.
- Le domaine définitif et les accès SMTP.
