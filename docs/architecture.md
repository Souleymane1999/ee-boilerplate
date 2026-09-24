# Architecture

## Vue d'ensemble

Ce boilerplate suit une architecture **monolithe Rails server-rendered**, sans frontend séparé — la même approche que cadastre-niger :

```
┌────────────────────────────────────────┐
│                 Rails                    │
│  Vues ERB + Turbo/Stimulus + Tailwind    │
│              Port 3000                   │
└───────────────────┬──────────────────────┘
                     │ ActiveRecord (SQL)
                     ▼
           ┌──────────────────┐
           │   PostgreSQL     │
           │   Port 5432       │
           └──────────────────┘
```

L'authentification web (Devise) repose sur des sessions/cookies signés côté serveur — pas de CORS, pas de token à transporter côté client pour naviguer le site. Un petit namespace JSON (`/api/v1`, JWT) existe en plus pour un futur client mobile — voir `docs/adr/0002-auth-sessions-and-jwt.md`.

## Composants

### App Rails (racine du repo)
- Rails 7.2 classique (vues activées, asset pipeline via Propshaft).
- **TailwindCSS v4** compilé par `cssbundling-rails` (CLI Tailwind), **esbuild** pour le JS via `jsbundling-rails` — voir `DESIGN.md`.
- **Hotwire** (Turbo + Stimulus) pour la navigation et l'interactivité sans recharger toute la page, sans construire une SPA.
- **Devise** (sessions web) + **devise-jwt** (API `/api/v1`, pour un futur client mobile).
- **Pundit** (`app/policies/`) pour l'autorisation, **app/services/** pour la logique métier qui ne tient ni dans un modèle ni dans un controller — les deux conventions les plus systématiques trouvées dans les 3 apps Rails réelles de l'équipe (ipay-money-app, financial-ipay, i-money-app).
- Accède à PostgreSQL via ActiveRecord.

### Base de données (PostgreSQL)
- Une seule source de vérité pour les données persistées.
- En développement, tourne dans le conteneur `postgres` de `docker-compose.yml`.
- En production, utiliser un service managé (RDS, Cloud SQL, etc.) — voir `docs/runbook.md`.

## Flux de la donnée

1. Le navigateur demande une page (ou une action Turbo Frame/Stream).
2. Un controller Rails traite la requête, applique la logique métier, lit/écrit dans PostgreSQL via ActiveRecord.
3. Rails rend une vue ERB (HTML), stylée avec les classes Tailwind/tokens iFutur.
4. Turbo intercepte la navigation et met à jour le DOM sans rechargement complet.

## Design system

`design-system/` est le **design system de référence** de l'équipe (Delta Force / iFutur) : tokens (couleurs, typographie), UI kits web/mobile, app Nuxt de démonstration. Ce n'est **pas** une dépendance de build de l'app Rails — c'est une référence visuelle que l'on recopie à la main dans les vues Tailwind (voir `DESIGN.md`).

## Observabilité

- Erreurs applicatives : Sentry. Voir `docs/observability.md`.
- Logs applicatifs : format JSON structuré via `lograge`.
- Health check : `GET /up` pour les probes de liveness/readiness.

## Pourquoi cette architecture ?

- **Simplicité** : un seul service à déployer, faire tourner et déboguer — pas de synchronisation de versions entre un frontend et une API, pas de CORS à maintenir.
- **Cohérence avec le reste de l'équipe** : même pattern que cadastre-niger (Rails + Tailwind + Hotwire), donc un dev qui change de projet retrouve ses repères immédiatement.
- **Testabilité** : une seule suite de tests (RSpec, `type: :request` pour les parcours HTTP complets), exécutée en CI.
