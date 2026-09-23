# Observabilité

## Objectif

Savoir en temps réel si l'application fonctionne correctement, être alerté avant que les utilisateurs ne signalent un problème, et disposer des informations nécessaires pour diagnostiquer rapidement un incident.

## 1. Suivi des erreurs — Sentry

### Rails
- Gems : `sentry-ruby`, `sentry-rails` (voir `Gemfile`).
- Configuration : `config/initializers/sentry.rb`.
- Le DSN est lu depuis la variable d'environnement `SENTRY_DSN`.
- **Si `SENTRY_DSN` est absent, Sentry ne s'initialise pas** (no-op) — utile en dev/local sans bloquer.

Pour l'activer :
1. Créer un projet sur [sentry.io](https://sentry.io) (ou une instance self-hosted).
2. Copier le DSN dans `.env` (`SENTRY_DSN=https://...`).
3. Redémarrer l'app.

## 2. Logs structurés

- `lograge` est configuré côté Rails (`config/initializers/lograge.rb`) pour émettre un log JSON par requête (méthode, path, status, durée, params filtrés) au lieu du format multi-lignes par défaut.
- En production, envoyer ces logs vers un agrégateur (CloudWatch Logs, Datadog Logs, Loki, ELK...) via le driver de logs du conteneur/orchestrateur plutôt que de gérer la rotation manuellement.

## 3. Brancher un APM (Datadog ou équivalent)

Le boilerplate ne branche pas d'APM par défaut (pour rester léger), mais voici comment l'ajouter :

- **Datadog** : gem `ddtrace`, agent Datadog en side-car ou daemonset, variable `DD_AGENT_HOST`.
- **New Relic** : gem `newrelic_rpm`, clé de licence via `NEW_RELIC_LICENSE_KEY`.
- **OpenTelemetry** (vendor-neutral) : gems `opentelemetry-sdk` + exporters, recommandé si vous ne voulez pas être lié à un vendor.

Dans tous les cas : instrumenter au niveau du middleware Rack pour capter automatiquement les requêtes HTTP, et ajouter des spans custom autour des opérations coûteuses (appels externes, jobs).

## 4. Métriques à suivre en priorité

| Métrique | Pourquoi | Seuil d'alerte indicatif |
|---|---|---|
| Temps de réponse (p50/p95/p99) | Détecter une dégradation de perf avant qu'elle devienne critique | p95 > 500ms sur 5 min |
| Taux d'erreurs 5xx | Symptôme direct d'un problème backend | > 1% des requêtes sur 5 min |
| Taux d'erreurs 4xx anormal | Peut signaler un bug frontend ou une attaque | pic soudain vs baseline |
| Disponibilité (uptime) | SLA / confiance utilisateurs | < 99.9% sur le mois |
| Utilisation CPU/mémoire des conteneurs | Anticiper le scaling, détecter une fuite mémoire | > 80% soutenu |
| Connexions PostgreSQL actives / pool saturé | Éviter les timeouts en cascade | > 80% du pool |
| Taille de la queue de jobs (si Sidekiq/GoodJob ajouté plus tard) | Détecter un backlog qui grossit | croissance continue sur 15 min |
| Taux d'erreur Sentry (nouvelles issues / régression) | Détecter une régression après déploiement | toute nouvelle issue critique |

## 5. Health check

`GET /up` est exposé nativement par Rails (`Rails::HealthController`) et utilisable directement comme probe de liveness/readiness par un load balancer ou Kubernetes.
