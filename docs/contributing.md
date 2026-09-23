# Contribuer

## Lancer le projet localement

```bash
cp .env.example .env
# éditer .env si besoin (valeurs par défaut fonctionnelles pour le dev local)
docker-compose up
```

- App : http://localhost:3000 (health check sur `/up`)

Première fois : voir la section "Quickstart" du `README.md` racine pour la création de la base de données.

## Lancer les tests localement

```bash
docker-compose exec app bundle exec rspec
```

Ou sans Docker, directement à la racine du repo avec Ruby/Node installés localement (`bundle exec rspec`).

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
