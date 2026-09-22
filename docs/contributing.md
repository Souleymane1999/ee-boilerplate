# Contribuer

## Lancer le projet localement

```bash
cp .env.example .env
# éditer .env si besoin (valeurs par défaut fonctionnelles pour le dev local)
docker-compose up
```

- Backend : http://localhost:3000 (health check sur `/up`)
- Frontend : http://localhost:5173

Première fois : voir la section "Quickstart" du `README.md` racine pour la création de la base de données.

## Lancer les tests localement

```bash
# Backend
docker-compose exec backend bundle exec rspec

# Frontend
docker-compose exec frontend npm run test
```

Ou sans Docker, directement dans chaque dossier (`backend/`, `frontend/`) avec les outils installés localement.

## Style de code

- **Backend** : Rubocop (`bundle exec rubocop`). Config dans `backend/.rubocop.yml`, basée sur des règles raisonnables (pas de style ultra-strict pour ne pas freiner l'équipe).
- **Frontend** : ESLint + Prettier (`npm run lint`, `npm run format`). Config dans `frontend/.eslintrc.cjs` et `frontend/.prettierrc`.
- Le lint tourne aussi en CI (`ci.yml`) — une PR avec du lint qui échoue ne peut pas être mergée.

## Convention de commits

On suit [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope optionnel>): <description courte>

[corps optionnel]
```

Types courants : `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `ci`, `perf`.

Exemples :
```
feat(api): ajoute l'endpoint GET /api/v1/pings
fix(frontend): corrige l'affichage du health check en erreur
docs: met à jour le runbook de déploiement
```

## Process de PR / review

1. Créer une branche depuis `main` : `git checkout -b feat/nom-de-la-feature`.
2. Développer, avec des tests pour tout nouveau comportement (voir `docs/testing` implicite via RSpec/Vitest déjà en place).
3. S'assurer que lint + tests passent localement avant de pousser.
4. Ouvrir une PR avec une description claire (quoi, pourquoi, comment tester).
5. La CI doit être verte (lint, tests, build, scans sécurité) avant tout merge.
6. Au moins une review approuvée requise avant merge (recommandé : configurer une branch protection rule sur `main`).
7. Préférer un merge type "squash" pour garder un historique `main` lisible.

## Ajouter une feature (résumé du flux)

1. Backend : générer le modèle/controller (`bin/rails generate ...`), écrire les specs RSpec en premier ou en parallèle.
2. Frontend : créer le composant, écrire un test Vitest/RTL, brancher l'appel API.
3. Mettre à jour la documentation concernée si le comportement public change (`docs/architecture.md`, README, etc.).
4. Vérifier localement, ouvrir la PR.
