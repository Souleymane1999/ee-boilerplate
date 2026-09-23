# Design — TailwindCSS et lien avec le design system

Ce document explique comment le style du frontend (`frontend/`) est construit et comment il se rattache au design system de l'équipe (`design-system/`, Delta Force / iFutur).

## Stack de style

- **TailwindCSS v4** (`@tailwindcss/vite`) — pas de `tailwind.config.js` : la config se fait en CSS via `@theme` dans [`frontend/src/index.css`](frontend/src/index.css).
- Aucune dépendance de build entre `frontend/` (React) et `design-system/` (Vue/Nuxt) — ce sont deux stacks différentes. Le lien est **la valeur des tokens**, recopiée à la main, pas un import de code.

## Où vivent les tokens

| Source de vérité | Fichier |
|---|---|
| Design system (référence, Vue/Nuxt) | [`design-system/colors_and_type.css`](design-system/colors_and_type.css) |
| Frontend produit (React, Tailwind) | [`frontend/src/index.css`](frontend/src/index.css) — bloc `@theme` |

Les valeurs de couleur, police et rayons dans `frontend/src/index.css` sont une **copie manuelle** d'un sous-ensemble des tokens du design system (couleur de marque lime `#BBCB44`, neutres, sémantiques success/warning/danger/info, police Open Sans, rayons). Pas la totalité — seulement ce qui a été nécessaire jusqu'ici.

## Garder les deux fichiers synchronisés

Il n'y a pas de synchronisation automatique. Quand quelqu'un change une valeur dans `design-system/colors_and_type.css` (ex : la couleur de marque), il faut répercuter le changement à la main dans `frontend/src/index.css`. Deux options pour la suite, si le besoin grandit :

1. **Extraire les tokens dans un package JSON/CSS partagé** (ex : `@ifutur/tokens`) consommé à la fois par Tailwind (via `@theme`) et par le design system Vue — évite la duplication mais demande de la tuyauterie (workspace npm, publication interne).
2. **Rester en copie manuelle** tant qu'un seul frontend consomme les tokens — plus simple, suffisant pour ce boilerplate.

## Ce qui n'est PAS branché automatiquement

- Les **composants** du design system (`design-system/nuxt-app/components/*.vue`) sont en Vue, pas réutilisables tels quels dans React. Un composant React équivalent (bouton, badge, input...) reste à écrire à la main en s'inspirant du rendu Nuxt.
- Décrit plus en détail dans [`design-system/README.md`](design-system/README.md).

## Utilisation dans le code

```tsx
// Exemple réel : frontend/src/App.tsx
<span className="bg-success-bg text-success rounded-full px-3 py-1">
  Backend disponible
</span>
```

Les classes `bg-success-bg`, `text-success`, `text-brand-ink`, `text-neutral-500`, etc. viennent du bloc `@theme` — elles n'existent pas dans Tailwind par défaut, elles sont définies par ce boilerplate pour matcher iFutur.
