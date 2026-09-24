# Backup & Restauration

## Politique recommandée

| Aspect | Recommandation |
|---|---|
| Fréquence | Backup complet quotidien (minimum) ; snapshot managé (RDS/Cloud SQL) toutes les 5-15 min si disponible |
| Rétention | 7 backups quotidiens + 4 hebdomadaires + 3 mensuels (schéma 7/4/3) |
| Stockage | Hors du serveur applicatif — S3 (ou équivalent) avec chiffrement au repos et versioning activé |
| Chiffrement | En transit (TLS) et au repos (SSE-S3 ou KMS) |
| Test de restauration | **Au moins une fois par trimestre**, sur un environnement isolé — c'est le point le plus souvent oublié |
| Accès | Restreint (IAM dédié), jamais de credentials de prod en clair dans les scripts |

Un backup qu'on n'a jamais essayé de restaurer n'est pas un backup — c'est un espoir.

## Scripts fournis

### `scripts/backup.sh`

Fait un `pg_dump` de la base configurée par `DATABASE_URL` (ou les variables `PG*`) vers un fichier daté (`backups/db_YYYYmmdd_HHMMSS.dump`, format custom `-Fc` pour permettre une restauration sélective).

Le script contient un commentaire indiquant où brancher l'upload vers un stockage distant (ex. `aws s3 cp` vers un bucket S3, ou `rclone` vers tout autre provider). Cette partie est volontairement laissée générique — chaque équipe a son propre provider/credentials.

```bash
./scripts/backup.sh
```

### `scripts/restore.sh`

Restaure un dump donné en argument vers la base cible.

```bash
./scripts/restore.sh backups/db_20260101_020000.dump
```

**Toujours restaurer d'abord sur un environnement de test/staging**, jamais directement en prod sans un backup de la base actuelle au préalable.

## Procédure de test de restauration (à exécuter trimestriellement)

1. Provisionner une base PostgreSQL temporaire (nouvelle base locale, ou une instance staging dédiée).
2. Récupérer le backup le plus récent depuis le stockage distant.
3. Lancer `scripts/restore.sh <dump>` en pointant `DATABASE_URL` vers cette base temporaire.
4. Vérifier :
   - Le script se termine sans erreur.
   - Le nombre de lignes dans les tables clés correspond à ce qui est attendu (comparer avec la prod au moment du backup).
   - L'application peut démarrer et lire ces données (smoke test manuel ou script).
5. Documenter la date du test et le résultat dans le canal de l'équipe (ou un ticket dédié).
6. Détruire la base temporaire.

## En cas d'incident nécessitant une restauration en prod

Voir `docs/incident-response.md` pour le processus de déclaration de sévérité et de communication. Étapes techniques :

1. Geler les écritures si possible (mode maintenance).
2. Prendre un backup de l'état actuel avant toute restauration (même corrompu, il peut être utile pour l'analyse post-mortem).
3. Restaurer le dernier backup sain connu.
4. Vérifier l'intégrité des données restaurées.
5. Rouvrir les écritures.
6. Rédiger un post-mortem (template dans `docs/incident-response.md`).
