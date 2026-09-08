# Déploiement sur Hostinger

Site **statique** : aucun Node.js, aucune base de données, aucun processus à faire tourner
sur le serveur. On construit en local, on envoie le résultat.

---

## 1. Construire avec le bon domaine

Le domaine sert aux URLs canoniques, au sitemap, à `robots.txt` et à l'Open Graph.
Il se définit **une seule fois**, au moment du build.

```bash
npm install
PUBLIC_SITE_URL=https://www.renovouest.fr npm run build
```

Sous Windows (PowerShell) :

```powershell
$env:PUBLIC_SITE_URL = "https://www.renovouest.fr"; npm run build
```

Sans cette variable, le domaine par défaut est `https://www.renovouest.fr`
(défini dans `astro.config.mjs`).

> **Domaine provisoire Hostinger.** Pour une première mise en ligne de démonstration,
> construire avec l'URL provisoire, puis **reconstruire et renvoyer** une fois le
> domaine définitif branché. Tout se met à jour automatiquement.

Le résultat est dans `dist/`.

---

## 2. Envoyer les fichiers

Envoyer **le contenu de `dist/`** (pas le dossier lui-même) dans `public_html/`.

Via le gestionnaire de fichiers Hostinger : envoyer `renov-ouest-hostinger.zip`,
puis « Extraire » dans `public_html/`.

Arborescence attendue sur le serveur :

```
public_html/
├── .htaccess
├── index.html
├── 404.html
├── robots.txt
├── sitemap-index.xml
├── sitemap-0.xml
├── og.jpg
├── favicon.svg
├── apple-touch-icon.png
├── _astro/
├── api/contact.php
├── contact/index.html
├── prestations/…
└── …
```

**Vérifier que `.htaccess` est bien présent** : les gestionnaires de fichiers masquent
souvent les fichiers commençant par un point (activer « afficher les fichiers cachés »).
Sans lui, les URLs sans slash final ne fonctionnent pas correctement.

---

## 3. Activer HTTPS et le domaine canonique

1. Dans hPanel : installer le certificat SSL gratuit (Sécurité → SSL).
2. Ouvrir `public_html/.htaccess` et **décommenter** le bloc « Domaine canonique »
   (retirer les `#` des 4 lignes), en remplaçant `www.renovouest.fr` par le domaine réel.

Cela force `http://` → `https://` et `renovouest.fr` → `www.renovouest.fr`
(ou l'inverse, au choix — garder **une seule** forme, celle des canonicals).

---

## 4. Configurer le formulaire de devis

Le formulaire envoie vers `api/contact.php`. Par défaut il utilise la fonction `mail()`
de PHP, qui fonctionne sur Hostinger mais finit souvent en spam.

**Recommandé** : créer une adresse email sur le domaine (hPanel → Emails) et renseigner
le SMTP en haut de `public_html/api/contact.php` :

```php
// Renseigner ces valeurs pour un envoi fiable (sinon repli sur mail())
$SMTP_HOST = 'smtp.hostinger.com';
$SMTP_PORT = 587;
$SMTP_USER = 'contact@renovouest.fr';
$SMTP_PASS = '••••••••';
$SMTP_FROM = 'contact@renovouest.fr';
$CONTACT_TO = 'renovouest49@gmail.com';
```

Ne jamais mettre ce mot de passe dans le dépôt de code.

---

## 5. Vérifications après mise en ligne

```bash
# doit renvoyer 200, PAS 301  (c'est le rôle du .htaccess)
curl -I https://www.renovouest.fr/contact

# doit rediriger en 301 vers l'URL sans slash
curl -I https://www.renovouest.fr/contact/

# doivent répondre 200
curl -I https://www.renovouest.fr/robots.txt
curl -I https://www.renovouest.fr/sitemap-index.xml
curl -I https://www.renovouest.fr/og.jpg
```

À contrôler ensuite :

- [ ] Le formulaire envoie bien un email (faire un essai réel).
- [ ] Le numéro est cliquable sur mobile.
- [ ] Une URL inexistante affiche la page 404 du site.
- [ ] Les pages légales sont accessibles depuis le pied de page.

Puis, dans **Google Search Console** : ajouter la propriété, valider le domaine,
et soumettre `https://www.renovouest.fr/sitemap-index.xml`.

---

## 6. Mettre à jour le site plus tard

Tout se fait dans le code, puis on reconstruit et on renvoie `dist/`.

| Ce qu'on veut changer | Où |
|---|---|
| Téléphone, email, adresse, zone d'intervention | `src/data/company.ts` |
| Textes et référencement des 4 prestations | `src/data/services.ts` |
| **Ajouter une réalisation** | `src/data/projects.ts` |
| Mentions légales, confidentialité | `src/data/legal.ts` |
| Couleurs, typographie, espacements | `src/styles/global.css` |

### Ajouter une réalisation

1. Déposer les photos dans `public/images/realisations/`.
2. Ajouter un objet dans le tableau `projects` de `src/data/projects.ts`.
3. Reconstruire et renvoyer.

La page `/realisations` se met à jour seule : tant que le tableau est vide, elle affiche
un état d'attente et reste **hors index** ; dès qu'une réalisation existe, elle
redevient indexable et **rejoint automatiquement le sitemap**.

---

## 7. Ce qui reste à compléter par le client

Ces éléments sont volontairement laissés en attente : ils n'ont pas été inventés.

- **Mentions légales** : forme juridique, SIREN/SIRET, TVA, responsable de publication,
  hébergeur (`src/data/legal.ts`).
- **Politique de confidentialité** : durée de conservation exacte, coordonnées de
  l'hébergeur.
- **Photos** : chantiers, façades, intérieurs — les emplacements sont prêts.
- **Réalisations** : aucun chantier n'est publié tant qu'ils ne sont pas fournis.
- **Domaine** : `renovouest.fr` n'a pas été vérifié comme disponible.

Aucune certification, aucun label, aucun avis client, aucune année d'expérience et aucun
chiffre n'a été inventé nulle part sur le site.
