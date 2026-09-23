# EE Boilerplate — Engineering Excellence

Boilerplate de départ pour tout nouveau projet de l'équipe : **une seule app Rails** (vues serveur + Tailwind + Hotwire, pas de frontend séparé — même architecture que cadastre-niger) + PostgreSQL, avec CI/CD, tests, lint, observabilité, sauvegardes, sécurité et documentation déjà en place.

**Objectif** : démarrer un nouveau projet avec un niveau Engineering Excellence élevé dès le premier commit, sans tout reconfigurer à chaque fois.

## Stack

- **Rails 7.2** (vues serveur, pas API-only) + **PostgreSQL**
- **TailwindCSS v4** via `cssbundling-rails`, tokens iFutur branchés (voir [`DESIGN.md`](DESIGN.md))
- **Hotwire** (Turbo + Stimulus) pour l'interactivité sans SPA
- **Devise** — authentification par sessions (cookies signés), pas de JWT ni d'API séparée à sécuriser
- **CI/CD** : GitHub Actions
- **Observabilité** : Sentry + logs JSON structurés (lograge)

## Quickstart

### Prérequis
- Docker et docker-compose installés (ou Ruby 3.2.2 + Node 20 + PostgreSQL en local)

### Démarrer

```bash
cp .env.example .env
docker-compose up
```

- App : http://localhost:3000 — health check : `GET /up`
- PostgreSQL : localhost:5432
- Design system (référence, Nuxt) : http://localhost:4000 — voir [`design-system/README.md`](design-system/README.md#démarrer), pas lancé par `docker-compose up`

Le premier démarrage exécute automatiquement les migrations (`db:prepare`).

### Sans Docker (dev local direct)

```bash
cd backend
bundle install
yarn install
cp ../.env.example .env   # ou configurer DATABASE_URL directement
bin/rails db:prepare
bin/dev
```

`bin/dev` lance en parallèle (via foreman) : le serveur Rails, le watcher Tailwind CSS, et le watcher esbuild JS — un seul terminal, tout se recharge en live.

### Lancer les tests

```bash
docker-compose exec backend bundle exec rspec
# ou en local : cd backend && bundle exec rspec
```

### Lint

```bash
docker-compose exec backend bundle exec rubocop
```

### Ajouter une feature

1. Générer le modèle/controller/vue Rails, écrire les specs RSpec (`type: :request` pour les parcours HTTP, `type: :model` pour la logique métier).
2. Styliser avec les classes Tailwind + tokens iFutur (voir [`DESIGN.md`](DESIGN.md)) — pas de CSS custom sauf nécessité réelle.
3. Vérifier lint + tests localement.
4. Ouvrir une PR — la CI doit être verte avant merge.

Détails complets : [`docs/contributing.md`](docs/contributing.md).

## Arborescence

```
ee-boilerplate/
├── backend/                # L'app Rails (vues, Tailwind, Devise, RSpec, Rubocop, Brakeman)
│   ├── app/views/devise/   # Vues Devise stylées (login, inscription...)
│   ├── app/assets/         # Tailwind (application.tailwind.css) + builds compilés
│   ├── app/javascript/     # Entrypoint esbuild (Turbo, Stimulus)
│   ├── bin/dev              # Lance web + css watcher + js watcher (foreman)
│   └── Procfile.dev
├── design-system/          # Design system de référence de l'équipe (Delta Force / iFutur), app Nuxt
├── docs/                   # Documentation (architecture, observabilité, sécurité, runbook...)
│   └── adr/                # Architecture Decision Records
├── scripts/                 # backup.sh / restore.sh
├── .github/
│   ├── workflows/ci.yml    # Lint + tests + build assets + scans sécurité
│   └── dependabot.yml      # Mises à jour hebdomadaires (bundler, yarn, actions)
├── docker-compose.yml       # postgres + backend (un seul service applicatif)
├── .env.example
├── DESIGN.md                 # TailwindCSS ↔ tokens du design system
└── README.md                 # ce fichier
```

## Statut Engineering Excellence

Ce boilerplate est audité selon la grille EE de l'équipe. Chaque ligne indique l'état **au moment où un nouveau projet démarre depuis ce template** — pas le score d'un projet réel en production.

Légende : ✅ fait (déjà configuré ici) · 🔲 à faire par l'équipe projet (nécessite une décision propre au projet) · ➖ non applicable à un template (dépend d'une plateforme/infra réelle qu'un boilerplate ne peut pas connaître à l'avance)

### CI/CD et releases
| Contrôle | État | Détail |
|---|---|---|
| Pipeline CI sur chaque PR | ✅ | `.github/workflows/ci.yml` |
| Tests/lint/qualité bloquent le merge en cas d'échec | 🔲 | La CI échoue correctement ; il reste à activer la *branch protection rule* côté GitHub (réglage du repo, pas du code) |
| Déploiement automatisé | ➖ | Dépend de la plateforme d'hébergement du projet réel |
| Environnements séparés (dev/staging/prod) | ➖ | Idem — pas d'infra connue à l'avance |
| Procédure de rollback documentée et testée | 🔲 | Documentée (`docs/runbook.md`) ; "testée" suppose un vrai déploiement |
| Smoke tests post-déploiement | ➖ | Pas de déploiement réel à ce stade |
| Dépendances/vulnérabilités contrôlées en pipeline | ✅ | Brakeman + bundler-audit + yarn audit dans `ci.yml` |

### Tests et qualité du code
| Contrôle | État | Détail |
|---|---|---|
| Fonctionnalités critiques testées | ✅ | Auth (inscription/connexion/déconnexion, accès protégé), health check |
| Couverture de code mesurée | ✅ | SimpleCov — rapport dans `backend/coverage/` |
| Tests d'intégration sur les parcours critiques | ✅ | Specs de requête RSpec (`spec/requests/`) ; pas d'E2E navigateur (Capybara + système) — à ajouter si le projet en a besoin |
| Lint / analyse statique configuré | ✅ | Rubocop |
| Tests instables identifiés et suivis | ➖ | Process à instaurer une fois qu'il y a un historique de CI réel |
| Échecs de tests visibles et traités | ✅ | La CI échoue et bloque la PR |
| Règles de qualité appliquées avant prod | ✅ | Gate CI (lint + tests + audits) |

### Observabilité, télémétrie et MCP
| Contrôle | État | Détail |
|---|---|---|
| Logs structurés | ✅ | Lograge (JSON) |
| Erreurs suivies avec outil dédié | ✅ | Sentry (no-op si `SENTRY_DSN` vide) |
| Métriques principales définies | 🔲 | Dépend du métier du projet réel |
| Dashboards services critiques | ➖ | Dépend de l'outil APM choisi et de données réelles |
| Alertes configurées | ➖ | Dépend de la plateforme d'observabilité choisie |
| Événements métier traçables | 🔲 | Dépend du métier du projet |
| Accès agentique (MCP) documenté si utilisé | ➖ | Non applicable tant que le projet n'utilise pas d'agent IA en prod |
| Accès MCP limités et auditables | ➖ | Idem |

### Backup et restauration
| Contrôle | État | Détail |
|---|---|---|
| Données critiques sauvegardées | 🔲 | Script prêt (`scripts/backup.sh`), pas branché à un stockage réel |
| Fréquence documentée | ✅ | `docs/backup-restore.md` |
| Sauvegardes surveillées | ➖ | Dépend de l'infra réelle |
| Test de restauration réalisé régulièrement | 🔲 | Procédure documentée et scriptée (`scripts/restore.sh`) ; la cadence est un process d'équipe à instaurer |
| RPO / RTO définis | ➖ | Dépendent des besoins métier du projet réel |
| Données chiffrées | ➖ | Dépend du provider de stockage choisi |
| Réplication / redondance | ➖ | Dépend de l'infra réelle |
| Procédure de reprise après sinistre | ➖ | Nécessite une infra réelle pour exister |

### Documentation et connaissances
| Contrôle | État | Détail |
|---|---|---|
| README explique le projet | ✅ | Ce fichier |
| Installation locale documentée | ✅ | Section Quickstart |
| Variables d'env documentées sans exposer de secrets | ✅ | `.env.example` |
| Architecture expliquée | ✅ | `docs/architecture.md` |
| Décisions techniques conservées | ✅ | `docs/adr/` (Architecture Decision Records) |
| Guide de contribution | ✅ | `CONTRIBUTING.md` |
| Runbook opérationnel | ✅ | `docs/runbook.md` |
| APIs documentées | ➖ | Pas d'API exposée par ce boilerplate (app server-rendered) — pertinent seulement si le projet en ajoute une |
| Infos suffisantes pour la reprise par une autre équipe | ✅ | Ensemble de `docs/` |

### Staging et environnements
| Contrôle | État | Détail |
|---|---|---|
| Environnement staging existe | ➖ | Pas d'infra réelle pour un template |
| Staging proche de la prod | ➖ | Idem |
| Déploiement staging automatisé | ➖ | Idem |
| Smoke tests sur staging | ➖ | Idem |
| Données de test sûres et anonymisées | ✅ | Factories (FactoryBot) génèrent des données fictives, pas de données réelles |
| Différences staging/prod connues | ➖ | Pas de staging à ce stade |
| Migrations testées avant prod | ✅ | La CI fait tourner les migrations sur la base de test à chaque run |
| Accès par environnement contrôlés | ➖ | Dépend de la plateforme d'hébergement |

### Sécurité et accès
| Contrôle | État | Détail |
|---|---|---|
| Aucun secret dans le code | ✅ | `.gitignore` + vérifié manuellement (`master.key`, `.env` exclus) |
| Secrets gérés par un système dédié | ✅ | Rails credentials chiffrées (voir `docs/security.md`) |
| Permissions au moindre privilège | 🔲 | Pas de système de rôles métier — à concevoir selon le projet |
| Accès sensibles protégés par rôles | 🔲 | Devise fournit l'authentification ; l'autorisation par rôle reste à ajouter (ex. Pundit) |
| Dépendances analysées régulièrement | ✅ | Dependabot hebdomadaire + audits CI |
| Vulnérabilités critiques suivies jusqu'à résolution | ✅ | PRs Dependabot + CI bloquante |
| Accès importants journalisés | 🔲 | Lograge journalise les requêtes HTTP, pas un audit trail métier |
| Revues d'accès périodiques | ➖ | Process d'équipe, pas du code |
| Données sensibles identifiées et protégées | 🔲 | Dépend du métier du projet réel |

### Gestion des incidents
| Contrôle | État | Détail |
|---|---|---|
| Sévérités définies | ✅ | `docs/incident-response.md` |
| Responsabilités connues | ✅ | Template à personnaliser avec les noms réels de l'équipe |
| Chemin d'escalade | ✅ | `docs/incident-response.md` |
| Runbooks pour incidents critiques | ✅ | `docs/runbook.md` + `docs/incident-response.md` |
| Contacts d'astreinte identifiés | 🔲 | Template présent, noms réels à renseigner |
| Postmortems réalisés | ✅ | Template blameless fourni |
| Actions issues des incidents suivies | 🔲 | Process d'équipe à instaurer |
| MTTR mesuré | ➖ | Nécessite un historique d'incidents réels |

### Design system et expérience utilisateur
| Contrôle | État | Détail |
|---|---|---|
| Composants partagés réutilisés | ✅ | Vues Devise (login, inscription) stylées directement avec les classes Tailwind iFutur |
| Design system / bibliothèque UI utilisé | ✅ | TailwindCSS + tokens iFutur |
| Tokens de design centralisés | ✅ | `backend/app/assets/stylesheets/application.tailwind.css` (`@theme`), synchronisé à la main avec `design-system/colors_and_type.css` — voir `DESIGN.md` |
| Composants communs documentés | ✅ | `design-system/README.md` + UI kits Nuxt (référence visuelle) |
| Interface respecte les conventions iFutur | ✅ | Couleurs/typo appliquées dans les vraies vues (login, dashboard) |
| Accessibilité prise en compte | 🔲 | Pas de lint a11y automatisé côté ERB (contrairement à un projet React avec `eslint-plugin-jsx-a11y`) — vérification manuelle recommandée |
| Parcours cohérents desktop/mobile | 🔲 | Vues actuelles responsive de base (Tailwind), pas de vrai test mobile |
| États erreur/vide/chargement gérés | ✅ | Messages flash traduits en français, erreurs de formulaire affichées |

## Table des matières (documentation)

- [`docs/architecture.md`](docs/architecture.md) — schéma et flux de données
- [`docs/observability.md`](docs/observability.md) — Sentry, logs, métriques à suivre
- [`docs/backup-restore.md`](docs/backup-restore.md) — politique de rétention et procédure de restauration
- [`docs/security.md`](docs/security.md) — gestion des secrets, scans, checklist
- [`docs/runbook.md`](docs/runbook.md) — déploiement, rollback, logs en prod
- [`docs/contributing.md`](docs/contributing.md) — convention de commits, process de PR
- [`docs/incident-response.md`](docs/incident-response.md) — sévérités, triage, post-mortem
- [`design-system/README.md`](design-system/README.md) — design system Delta Force / iFutur (tokens, UI kits, app Nuxt de référence)
- [`DESIGN.md`](DESIGN.md) — comment Tailwind (backend) se rattache aux tokens du design system
- [`docs/adr/`](docs/adr/) — Architecture Decision Records

## Comment démarrer un nouveau projet à partir de ce boilerplate

1. **Cloner ce repo** (ou le dupliquer) sous le nom du nouveau projet :
   ```bash
   git clone <url-de-ce-repo> mon-nouveau-projet
   cd mon-nouveau-projet
   ```

2. **Chercher/remplacer le placeholder de nom de projet.** Ce boilerplate utilise `backend` / `ee-boilerplate` comme noms par défaut (nom de l'app Rails, nom des bases de données). Remplacer partout par le nom réel du projet, notamment dans :
   - `backend/config/database.yml` (noms des bases `backend_development`, `backend_test`, `backend_production`)
   - `backend/config/application.rb` (`module Backend`)
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

7. **Adapter le design system** dans `design-system/` (voir [`design-system/README.md`](design-system/README.md)) si le nouveau projet a une identité différente d'iFutur, sinon le garder tel quel comme référence.

8. Adapter `docs/architecture.md` et ce `README.md` aux spécificités réelles du nouveau projet, et commencer à développer.
