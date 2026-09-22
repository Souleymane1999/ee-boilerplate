# Architecture

## Vue d'ensemble

Ce boilerplate suit une architecture **SPA + API** classique, simple à raisonner et à faire évoluer :

```
┌─────────────────────┐        HTTPS / JSON        ┌──────────────────────┐
│   Frontend (React)  │ ──────────────────────────▶ │   Backend (Rails API) │
│   Vite + TypeScript │ ◀────────────────────────── │   Ruby on Rails 7.x   │
│   Port 5173 (dev)   │        REST endpoints        │   Port 3000            │
└─────────────────────┘                              └───────────┬───────────┘
                                                                  │
                                                                  │ ActiveRecord (SQL)
                                                                  ▼
                                                        ┌──────────────────┐
                                                        │   PostgreSQL     │
                                                        │   Port 5432       │
                                                        └──────────────────┘
```

## Composants

### Frontend (`frontend/`)
- React 18 + Vite + TypeScript.
- Ne contient aucune logique métier sensible : uniquement présentation et appels API.
- Communique avec le backend via `fetch`/`axios` sur l'URL définie par `VITE_API_URL`.
- Le design system (`design-system/`) est consommé ici comme dépendance (voir `docs/architecture.md#design-system`).

### Backend (`backend/`)
- Rails en mode **API only** (pas de vues ERB, pas d'assets pipeline).
- Expose des endpoints JSON versionnés (convention recommandée : `/api/v1/...`).
- Toute la logique métier et les règles d'autorisation vivent ici.
- Accède à PostgreSQL via ActiveRecord.

### Base de données (PostgreSQL)
- Une seule source de vérité pour les données persistées.
- En développement, tourne dans le conteneur `postgres` de `docker-compose.yml`.
- En production, utiliser un service managé (RDS, Cloud SQL, etc.) — voir `docs/runbook.md`.

## Flux de la donnée

1. L'utilisateur interagit avec l'UI React.
2. Le frontend appelle l'API Rails (JSON sur HTTP).
3. Rails valide, applique la logique métier, lit/écrit dans PostgreSQL via ActiveRecord.
4. Rails renvoie une réponse JSON.
5. React met à jour l'état et le rendu.

## Design system

`design-system/` est un **placeholder** : dans un vrai projet, il est remplacé par le repo GitHub du design system de l'équipe (composants React partagés, tokens, Storybook). Le frontend l'importe comme un package (workspace npm ou `npm link`). Voir `design-system/README.md`.

## Observabilité

- Erreurs applicatives : Sentry (backend + frontend). Voir `docs/observability.md`.
- Logs applicatifs : format JSON structuré via `lograge` côté Rails.
- Health check : `GET /up` (Rails) pour les probes de liveness/readiness.

## Pourquoi cette architecture ?

- **Séparation claire des responsabilités** : le frontend ne fait jamais d'accès direct à la base de données, tout passe par l'API.
- **Scalabilité indépendante** : le frontend (statique, servi par un CDN en prod) et le backend (stateless, horizontalement scalable) évoluent séparément.
- **Testabilité** : chaque couche a sa propre suite de tests (RSpec côté backend, Vitest côté frontend), exécutée indépendamment en CI.
