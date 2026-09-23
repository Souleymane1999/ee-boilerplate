# Runbook opérationnel

## Déploiement

### Pré-requis
- Variables d'environnement de production configurées (voir `.env.example` pour la liste, valeurs réelles dans le gestionnaire de secrets de la plateforme).
- `RAILS_MASTER_KEY` disponible côté environnement de déploiement.
- Migrations de base de données revues (pas de migration destructive non réversible sans plan de rollback).

### Étapes types (à adapter à votre plateforme : Render, Fly.io, Heroku, ECS, Kubernetes...)

1. CI verte sur la branche/PR à déployer (`ci.yml` : lint, tests, build des assets, scans sécurité).
2. Build de l'image (`backend/Dockerfile.production` — inclut la compilation Tailwind CSS + esbuild JS via `assets:precompile`) ou build de la plateforme.
3. Déploiement de l'app :
   - `bin/rails db:migrate` (idéalement dans un job de pré-déploiement, pas dans le process web).
   - Démarrage des nouvelles instances, health check sur `/up` avant bascule du trafic.
4. Vérification post-déploiement (smoke test) :
   - `GET /up` répond 200.
   - Un parcours critique fonctionne (ex. login, lecture d'une ressource clé).
   - Pas de pic d'erreurs Sentry dans les 10 minutes suivant le déploiement.

## Checklist de déploiement

- [ ] CI verte (lint + tests + build + sécurité)
- [ ] Migrations DB revues et testées en staging
- [ ] Variables d'environnement à jour sur l'environnement cible
- [ ] `RAILS_MASTER_KEY` / secrets présents
- [ ] Backup de la base pris avant une migration risquée
- [ ] Plan de rollback identifié (version précédente déployable en < 5 min)
- [ ] Personne d'astreinte informée si déploiement hors horaires habituels

## Rollback

1. Revenir à la version précédente de l'image/artefact (garder au moins les 3 dernières versions déployables).
2. Si une migration DB a été appliquée et casse la compatibilité avec l'ancienne version du code :
   - Préférer des migrations **rétro-compatibles** (ajouter une colonne nullable plutôt que renommer/supprimer directement — pattern expand/contract).
   - Si un rollback de migration est nécessaire : `bin/rails db:rollback STEP=1` (à tester au préalable en staging).
3. Vérifier `/up` et les métriques d'erreur après rollback.
4. Communiquer sur le canal incident (voir `docs/incident-response.md`).

## Voir les logs en production

- Logs applicatifs structurés en JSON (via `lograge`) — consulter via l'agrégateur branché (CloudWatch, Datadog Logs, etc., voir `docs/observability.md`).
- En attendant qu'un agrégateur soit branché : `docker compose logs -f backend` en local, ou la commande équivalente de la plateforme (`heroku logs --tail`, `kubectl logs -f <pod>`, etc.) en prod.
- Toujours filtrer/chercher par `request_id` pour suivre une requête de bout en bout.

## Commandes utiles

```bash
# Lancer l'environnement complet
docker-compose up

# Lancer les migrations
docker-compose exec backend bin/rails db:migrate

# Ouvrir une console Rails
docker-compose exec backend bin/rails console

# Voir les logs backend en direct
docker-compose logs -f backend

# Lancer un backup manuel
./scripts/backup.sh
```
