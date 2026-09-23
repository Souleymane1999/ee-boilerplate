# Design — le style Delta Force / iFutur, et comment il est appliqué ici

Ce document a deux rôles : (1) résumer le guide de style Delta Force / iFutur pour que n'importe quel dev puisse construire une vue cohérente sans aller fouiller `design-system/`, et (2) expliquer comment ce style est concrètement branché dans cette app Rails via Tailwind.

Source complète et détaillée : [`design-system/README.md`](design-system/README.md) (brand, ton, fondations visuelles, iconographie — en anglais). Ce fichier-ci en est un résumé pratique, en français, orienté "comment coder une vue conforme".

> ⚠️ Le design system a été construit par extrapolation à partir du logo et d'un brief, pas d'une charte graphique complète fournie par l'équipe. À faire valider/corriger par quelqu'un qui a la vraie source de vérité avant un usage en production réelle.

## Identité en un coup d'œil

- **Marque** : iFutur, plateforme fintech de paiements/payouts pour entreprises (B2B).
- **Ton** : confiant, clair, jamais survendu — un collègue senior qui explique, pas un marketeur.
- **Couleur primaire** : lime `#BBCB44` — jamais utilisée comme couleur de statut.
- **Police** : Open Sans, partout (pas de mélange de familles).
- **Posture** : interface produit *light-first* ; surfaces sombres réservées au hero/marketing.

## Couleurs

| Rôle | Token Tailwind (ce repo) | Valeur | Usage |
|---|---|---|---|
| Marque | `bg-brand-lime` | `#BBCB44` | CTA primaire, focus ring, sélection — **jamais** un statut |
| Marque (hover) | `bg-brand-lime-600` | `#A3B339` | Hover sur bouton primaire |
| Marque (active) | `bg-brand-lime-700` | `#889732` | Press/active sur bouton primaire |
| Encre (texte/fond sombre) | `text-brand-ink` / `bg-brand-ink` | `#0E1110` | Texte principal, fonds sombres — **jamais** `#000000` (le noir pur écrase le lime) |
| Succès | `bg-success` / `bg-success-bg` | `#2F8F4F` / `#E6F4EA` | Confirmation, statut "Payé" |
| Attention | `bg-warning` / `bg-warning-bg` | `#C2841A` / `#FCF3DD` | Statut "En attente" |
| Danger | `bg-danger` / `bg-danger-bg` | `#C8362D` / `#FBE7E5` | Erreur, statut "Échec" |
| Info | `bg-info` / `bg-info-bg` | `#2C6DB5` / `#E5EFF9` | Information neutre |
| Neutres | `text-neutral-{50..900}` | voir `application.tailwind.css` | Texte secondaire, bordures, fonds — **toujours chauds** (légère teinte jaune), jamais du gris froid pur |

Règle d'or : le lime fait le CTA principal et rien d'autre. Les statuts (payé/en attente/échoué) utilisent toujours les tokens sémantiques, jamais le lime.

## Typographie

- **Open Sans** partout, poids 400/500/600/700/800 — pas de police secondaire.
- Titres (`h1`–`h4`) : 600–700, tracking légèrement négatif.
- Corps de texte : 400.
- Boutons et labels : 600 (`font-semibold`).
- Chiffres dans les tableaux/montants : numéros tabulaires (`tabular-nums`) — jamais proportionnels dans une colonne de chiffres.

## Espacement, rayons, bordures

- Échelle de base 4px : 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80.
- Rayons : `rounded-md` (10px) pour inputs/boutons, `rounded-lg` (14px) pour les cartes, `rounded-xl` (20px) pour les modales, `rounded-full` pour badges/chips.
- Bordures fines (`border-neutral-200`, 1px) portent la structure — les ombres restent secondaires.
- Une carte = fond clair + bordure fine + ombre légère. Jamais de carte avec ombre seule (flotte visuellement), jamais de bordure épaisse colorée, jamais de liseré coloré sur le côté.

## États interactifs

- **Hover (bouton primaire)** : `hover:bg-brand-lime-600` — un cran plus foncé sur la rampe lime.
- **Hover (secondaire/ghost)** : fond `hover:bg-neutral-50`, pas de changement de bordure.
- **Focus** : halo lime 3px à 35% d'opacité (`focus:ring-3 focus:ring-brand-lime/35`) — jamais un simple contour fin.
- **Active/press** : `active:bg-brand-lime-700`, éventuellement un `translateY(1px)`. Pas d'effet de scale (trop ludique pour un produit financier).

Exemple déjà implémenté dans ce boilerplate (`app/views/devise/sessions/new.html.erb`) :

```erb
<%= f.submit "Se connecter",
      class: "rounded-md border border-brand-lime-600 bg-brand-lime px-4 py-2.5
              text-sm font-semibold text-brand-ink hover:bg-brand-lime-600
              active:bg-brand-lime-700" %>
```

## Ton et contenu

- **Confiant, jamais survendu.** "Payout réglé en 90 min" plutôt que "Paiements ultra-rapides qui révolutionnent votre trésorerie".
- **Précis plutôt que vague.** Donner le chiffre/délai réel plutôt qu'un adjectif.
- **Calme dans les erreurs.** "Impossible de joindre votre banque. Réessayez dans une minute." — pas de "Oups ! 😅".
- **Aucun emoji** en UI produit (ni erreurs, ni succès, ni états vides).
- **Montants en CFA**, séparateur milliers = `.` (`1.240.000 CFA`), pas de décimales, chiffres tabulaires dans les tableaux.
- Phrase en minuscules pour titres/boutons/nav (`Ajouter un compte`, pas `Ajouter Un Compte`).

## Iconographie

- **[Lucide](https://lucide.dev)** est la librairie d'icônes standard du design system — traits (`stroke-width: 2`), pas d'icônes pleines en surface produit.
- Taille standard 24px (16px inline avec du texte).
- Couleur héritée du texte (`currentColor`), jamais une couleur imposée — le lime est réservé aux moments de marque actifs, pas décoratif.
- Ce boilerplate n'a pas encore intégré Lucide dans les vues Rails — à faire via un helper Rails (partial `_icon.html.erb` chargeant les SVG Lucide) si le projet en a besoin.

## Stack Tailwind — comment c'est branché techniquement

- **TailwindCSS v4** via `cssbundling-rails` — pas de `tailwind.config.js` : la config se fait en CSS via `@theme` dans [`app/assets/stylesheets/application.tailwind.css`](app/assets/stylesheets/application.tailwind.css).
- Compilé par le CLI Tailwind (`yarn build:css`), pas par un plugin de bundler — même toolchain que cadastre-niger.
- Aucune dépendance de build entre l'app Rails (ERB) et `design-system/` (Vue/Nuxt) — ce sont deux stacks différentes. Le lien est **la valeur des tokens**, recopiée à la main, pas un import de code.

### Où vivent les tokens

| Source de vérité | Fichier |
|---|---|
| Design system (référence, Vue/Nuxt) | [`design-system/colors_and_type.css`](design-system/colors_and_type.css) |
| App Rails (Tailwind) | [`app/assets/stylesheets/application.tailwind.css`](app/assets/stylesheets/application.tailwind.css) — bloc `@theme` |

Les valeurs de couleur, police et rayons dans `application.tailwind.css` sont une **copie manuelle** d'un sous-ensemble des tokens du design system. Pas la totalité — seulement ce qui a été nécessaire jusqu'ici (vues Devise, page d'accueil, tableau de bord).

### Garder les deux fichiers synchronisés

Il n'y a pas de synchronisation automatique. Quand quelqu'un change une valeur dans `design-system/colors_and_type.css` (ex : la couleur de marque), il faut répercuter le changement à la main dans `application.tailwind.css`, puis relancer `yarn build:css` (ou laisser `bin/dev` le faire en watch).

### Ce qui n'est PAS branché automatiquement

Les **composants** du design system (`design-system/nuxt-app/components/*.vue`) sont en Vue, pas réutilisables tels quels dans les vues ERB de Rails. Un partial Rails équivalent (bouton, badge, input...) reste à écrire à la main en s'inspirant du rendu Nuxt — voir `app/views/devise/shared/_auth_header.html.erb` pour un exemple déjà fait.

### Où voir des exemples dans ce boilerplate

- `app/views/devise/sessions/new.html.erb` — page de connexion
- `app/views/devise/registrations/new.html.erb` — page d'inscription
- `app/views/home/index.html.erb` — page d'accueil publique
- `app/views/dashboard/show.html.erb` — page protégée après connexion
- `app/views/layouts/application.html.erb` — messages flash stylés
