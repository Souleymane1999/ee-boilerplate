# Design — TailwindCSS et lien avec le design system

Ce document explique comment le style de l'app (`backend/`) est construit et comment il se rattache au design system de l'équipe (`design-system/`, Delta Force / iFutur).

## Stack de style

- **TailwindCSS v4** via `cssbundling-rails` — pas de `tailwind.config.js` : la config se fait en CSS via `@theme` dans [`backend/app/assets/stylesheets/application.tailwind.css`](backend/app/assets/stylesheets/application.tailwind.css).
- Compilé par le CLI Tailwind (`yarn build:css`), pas par un plugin de bundler — même toolchain que cadastre-niger.
- Aucune dépendance de build entre `backend/` (Rails/ERB) et `design-system/` (Vue/Nuxt) — ce sont deux stacks différentes. Le lien est **la valeur des tokens**, recopiée à la main, pas un import de code.

## Où vivent les tokens

| Source de vérité | Fichier |
|---|---|
| Design system (référence, Vue/Nuxt) | [`design-system/colors_and_type.css`](design-system/colors_and_type.css) |
| App Rails (Tailwind) | [`backend/app/assets/stylesheets/application.tailwind.css`](backend/app/assets/stylesheets/application.tailwind.css) — bloc `@theme` |

Les valeurs de couleur, police et rayons dans `application.tailwind.css` sont une **copie manuelle** d'un sous-ensemble des tokens du design system (couleur de marque lime `#BBCB44`, neutres, sémantiques success/warning/danger/info, police Open Sans, rayons). Pas la totalité — seulement ce qui a été nécessaire jusqu'ici (les vues Devise, la page d'accueil, le tableau de bord).

## Garder les deux fichiers synchronisés

Il n'y a pas de synchronisation automatique. Quand quelqu'un change une valeur dans `design-system/colors_and_type.css` (ex : la couleur de marque), il faut répercuter le changement à la main dans `backend/app/assets/stylesheets/application.tailwind.css`, puis relancer `yarn build:css` (ou laisser `bin/dev` le faire en watch).

## Ce qui n'est PAS branché automatiquement

- Les **composants** du design system (`design-system/nuxt-app/components/*.vue`) sont en Vue, pas réutilisables tels quels dans les vues ERB de Rails. Un partial Rails équivalent (bouton, badge, input...) reste à écrire à la main en s'inspirant du rendu Nuxt — voir `app/views/devise/shared/_auth_header.html.erb` pour un exemple déjà fait.
- Décrit plus en détail dans [`design-system/README.md`](design-system/README.md).

## Utilisation dans le code

```erb
<%# Exemple réel : app/views/devise/sessions/new.html.erb %>
<%= f.submit "Se connecter",
      class: "rounded-md border border-brand-lime-600 bg-brand-lime px-4 py-2.5
              text-sm font-semibold text-brand-ink hover:bg-brand-lime-600
              active:bg-brand-lime-700" %>
```

Les classes `bg-brand-lime`, `text-brand-ink`, `bg-success-bg`, `text-neutral-500`, etc. viennent du bloc `@theme` — elles n'existent pas dans Tailwind par défaut, elles sont définies par ce boilerplate pour matcher iFutur.

## Où voir des exemples dans ce boilerplate

- `app/views/devise/sessions/new.html.erb` — page de connexion
- `app/views/devise/registrations/new.html.erb` — page d'inscription
- `app/views/home/index.html.erb` — page d'accueil publique
- `app/views/dashboard/show.html.erb` — page protégée après connexion
- `app/views/layouts/application.html.erb` — messages flash stylés
