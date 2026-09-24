# Contribuer

## Lancer le projet localement

```bash
bundle install && yarn install
cp .env.example .env
# éditer .env si votre PostgreSQL local diffère des valeurs par défaut
bin/rails db:prepare
bin/dev
```

- App : http://localhost:3000 (health check sur `/up`)

Pas de Docker — même pattern que les autres projets Rails de l'équipe (voir "Pourquoi pas Docker ?" dans le `README.md` racine). Nécessite Ruby 3.2.2, Node 20 et PostgreSQL installés localement.

## Lancer les tests localement

```bash
bundle exec rspec
```

## Style de code

- Rubocop (`bundle exec rubocop`). Config dans `.rubocop.yml`, basée sur des règles raisonnables (pas de style ultra-strict pour ne pas freiner l'équipe).
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
feat(auth): ajoute la page de récupération de mot de passe
fix(dashboard): corrige l'affichage du statut en erreur
docs: met à jour le runbook de déploiement
```

## Process de PR / review

1. Créer une branche depuis `main` : `git checkout -b feat/nom-de-la-feature`.
2. Développer, avec des tests pour tout nouveau comportement (RSpec).
3. S'assurer que lint + tests passent localement avant de pousser.
4. Ouvrir une PR avec une description claire (quoi, pourquoi, comment tester).
5. La CI doit être verte (lint, tests, build des assets, scans sécurité) avant tout merge.
6. Au moins une review approuvée requise avant merge (recommandé : configurer une branch protection rule sur `main`).
7. Préférer un merge type "squash" pour garder un historique `main` lisible.

## Ajouter une feature (résumé du flux)

1. Générer le modèle/controller/vue (`bin/rails generate ...`), écrire les specs RSpec en premier ou en parallèle (`type: :request` pour un parcours HTTP complet).
2. Styliser les vues avec les classes Tailwind + tokens iFutur (voir `DESIGN.md`).
3. Mettre à jour la documentation concernée si le comportement public change (`docs/architecture.md`, README, etc.).
4. Vérifier localement (`bundle exec rspec`, `bundle exec rubocop`), ouvrir la PR.
