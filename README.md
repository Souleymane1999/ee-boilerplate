# EE Boilerplate — Engineering Excellence

Boilerplate de départ pour tout nouveau projet de l'équipe : Rails API + React/Vite/TypeScript + PostgreSQL, avec CI/CD, tests, lint, observabilité, sauvegardes, sécurité et documentation déjà en place.

**Objectif** : démarrer un nouveau projet avec un niveau Engineering Excellence élevé dès le premier commit, sans tout reconfigurer à chaque fois.

## Stack

- **Backend** : Ruby on Rails 7.2 (mode API only) + PostgreSQL
- **Frontend** : React + Vite + TypeScript
- **Orchestration locale** : docker-compose (postgres + backend + frontend)
- **CI/CD** : GitHub Actions
- **Observabilité** : Sentry + logs JSON structurés (lograge)

## Quickstart

### Prérequis
- Docker et docker-compose installés

### Démarrer

```bash
cp .env.example .env
docker-compose up
```

- Frontend : http://localhost:5173
- Backend (API) : http://localhost:3000 (health check : `GET /up`)
- PostgreSQL : localhost:5432

Le premier démarrage exécute automatiquement les migrations (`db:prepare`).

### Sans Docker (dev local direct)

```bash
# Backend
cd backend
bundle install
cp ../.env.example .env   # ou configurer DATABASE_URL directement
bin/rails db:prepare
bin/rails server

# Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev
```

### Lancer les tests

```bash
# Backend (RSpec)
docker-compose exec backend bundle exec rspec
# ou en local : cd backend && bundle exec rspec

# Frontend (Vitest)
docker-compose exec frontend npm run test
# ou en local : cd frontend && npm run test
```

### Lint

```bash
# Backend
docker-compose exec backend bundle exec rubocop

# Frontend
docker-compose exec frontend npm run lint
docker-compose exec frontend npm run format:check
```

### Ajouter une feature

1. Backend : générer le modèle/controller, écrire les specs RSpec.
2. Frontend : créer le composant, écrire un test Vitest/React Testing Library, brancher l'appel API.
3. Vérifier lint + tests localement.
4. Ouvrir une PR — la CI doit être verte avant merge.

Détails complets : [`docs/contributing.md`](docs/contributing.md).

## Arborescence

```
ee-boilerplate/
├── backend/              # Rails API only + PostgreSQL (RSpec, Rubocop, Brakeman)
├── frontend/              # React + Vite + TypeScript (Vitest, ESLint, Prettier)
├── design-system/         # Design system de l'équipe (Delta Force / iFutur), app Nuxt incluse
├── docs/                  # Documentation (architecture, observabilité, sécurité, runbook...)
├── scripts/                # backup.sh / restore.sh
├── .github/
│   ├── workflows/ci.yml   # Lint + tests + build + scans sécurité
│   └── dependabot.yml     # Mises à jour hebdomadaires (bundler, npm, actions)
├── docker-compose.yml
├── .env.example
└── README.md               # ce fichier
```

## Ce que ce boilerplate fournit déjà

| Domaine | Où |
|---|---|
| Projet complet prêt à l'emploi | `backend/`, `frontend/`, `docker-compose.yml` |
| CI/CD automatisé (lint, tests, build, sécurité) | `.github/workflows/ci.yml` |
| Tests + lint configurés | RSpec + Rubocop (backend), Vitest + ESLint/Prettier (frontend) |
| Observabilité (Sentry, logs JSON) | `docs/observability.md` |
| Backup + restauration | `scripts/backup.sh`, `scripts/restore.sh`, `docs/backup-restore.md` |
| Sécurité (secrets, Dependabot, Brakeman, npm audit) | `docs/security.md`, `.github/dependabot.yml` |
| Documentation (architecture, runbook, contribution) | `docs/` |
| Gestion des incidents (sévérités, post-mortem) | `docs/incident-response.md` |
| Design system (Delta Force / iFutur) | `design-system/` |

## Table des matières (documentation)

- [`docs/architecture.md`](docs/architecture.md) — schéma et flux de données
- [`docs/observability.md`](docs/observability.md) — Sentry, logs, métriques à suivre
- [`docs/backup-restore.md`](docs/backup-restore.md) — politique de rétention et procédure de restauration
- [`docs/security.md`](docs/security.md) — gestion des secrets, scans, checklist
- [`docs/runbook.md`](docs/runbook.md) — déploiement, rollback, logs en prod
- [`docs/contributing.md`](docs/contributing.md) — convention de commits, process de PR
- [`docs/incident-response.md`](docs/incident-response.md) — sévérités, triage, post-mortem
- [`design-system/README.md`](design-system/README.md) — design system Delta Force / iFutur (tokens, UI kits, app Nuxt)

## Comment démarrer un nouveau projet à partir de ce boilerplate

1. **Cloner ce repo** (ou le dupliquer) sous le nom du nouveau projet :
   ```bash
   git clone <url-de-ce-repo> mon-nouveau-projet
   cd mon-nouveau-projet
   ```

2. **Chercher/remplacer le placeholder de nom de projet.** Ce boilerplate utilise `backend` / `ee-boilerplate` comme noms par défaut (nom de l'app Rails, nom du package frontend, nom des bases de données). Remplacer partout par le nom réel du projet, notamment dans :
   - `backend/config/database.yml` (noms des bases `backend_development`, `backend_test`, `backend_production`)
   - `backend/config/application.rb` (`module Backend`)
   - `frontend/package.json` (`"name": "frontend"`)
   - `.env.example` / `.env` (`POSTGRES_DB`, etc.)
   - `README.md` lui-même (titre, description)

   Commande utile pour repérer les occurrences :
   ```bash
   grep -ril "backend\|ee-boilerplate\|ee_boilerplate" --exclude-dir={.git,node_modules,vendor,tmp,log} .
   ```

3. **Régénérer la clé de credentials Rails** (ne pas réutiliser celle du boilerplate) :
   ```bash
   cd backend
   rm config/master.key config/credentials.yml.enc
   EDITOR="code --wait" bin/rails credentials:edit   # régénère les deux fichiers
   ```

4. **Réinitialiser l'historique git** (pour repartir d'un historique propre, propre au nouveau projet) :
   ```bash
   rm -rf .git
   git init
   git add -A
   git commit -m "chore: initial commit depuis ee-boilerplate"
   ```

5. **Créer le remote GitHub** du nouveau projet et pousser :
   ```bash
   gh repo create <org>/<mon-nouveau-projet> --private --source=. --push
   ```
   (ou configurer le remote manuellement avec `git remote add origin ...`)

6. **Configurer les GitHub Secrets** nécessaires à la CI (`RAILS_MASTER_KEY`, `SENTRY_DSN`, etc. — voir [`docs/security.md`](docs/security.md)).

7. **Adapter le design system** dans `design-system/` (voir [`design-system/README.md`](design-system/README.md)) si le nouveau projet a une identité différente d'iFutur, sinon le garder tel quel.

8. Adapter `docs/architecture.md` et ce `README.md` aux spécificités réelles du nouveau projet, et commencer à développer.
