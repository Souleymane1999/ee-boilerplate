# Architecture

## Vue d'ensemble

Ce boilerplate suit une architecture **monolithe Rails server-rendered**, sans frontend séparé — la même approche que cadastre-niger :

```
┌────────────────────────────────────────┐
│              Rails (backend/)            │
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

Pas d'API JSON séparée à sécuriser, pas de CORS, pas de token à transporter côté client : l'authentification (Devise) repose sur des sessions/cookies signés côté serveur, comme n'importe quelle app Rails classique.

## Composants

### App (`backend/`)
- Rails 7.2 classique (vues activées, asset pipeline via Propshaft).
- **TailwindCSS v4** compilé par `cssbundling-rails` (CLI Tailwind), **esbuild** pour le JS via `jsbundling-rails` — voir `DESIGN.md`.
- **Hotwire** (Turbo + Stimulus) pour la navigation et l'interactivité sans recharger toute la page, sans construire une SPA.
- **Devise** pour l'authentification par sessions.
- Toute la logique métier, les vues et les règles d'autorisation vivent ici.
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

`design-system/` est le **design system de référence** de l'équipe (Delta Force / iFutur) : tokens (couleurs, typographie), UI kits web/mobile, app Nuxt de démonstration. Ce n'est **pas** une dépendance de build de `backend/` — c'est une référence visuelle que l'on recopie à la main dans les vues Tailwind (voir `DESIGN.md`).

## Observabilité

- Erreurs applicatives : Sentry. Voir `docs/observability.md`.
- Logs applicatifs : format JSON structuré via `lograge`.
- Health check : `GET /up` pour les probes de liveness/readiness.

## Pourquoi cette architecture ?

- **Simplicité** : un seul service à déployer, faire tourner et déboguer — pas de synchronisation de versions entre un frontend et une API, pas de CORS à maintenir.
- **Cohérence avec le reste de l'équipe** : même pattern que cadastre-niger (Rails + Tailwind + Hotwire), donc un dev qui change de projet retrouve ses repères immédiatement.
- **Testabilité** : une seule suite de tests (RSpec, `type: :request` pour les parcours HTTP complets), exécutée en CI.
