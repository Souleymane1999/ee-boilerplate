#!/usr/bin/env bash
# scripts/backup.sh
#
# Fait un dump PostgreSQL de la base configurée par DATABASE_URL (ou PG* env vars)
# vers un fichier daté, format custom (-Fc) pour permettre une restauration sélective
# avec pg_restore.
#
# Usage:
#   ./scripts/backup.sh
#
# Variables d'environnement attendues (voir .env.example) :
#   DATABASE_URL   ex: postgres://user:pass@host:5432/dbname
# ou, à défaut:
#   PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE

set -euo pipefail

BACKUP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/backups"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
FILENAME="db_${TIMESTAMP}.dump"
FILEPATH="${BACKUP_DIR}/${FILENAME}"

mkdir -p "${BACKUP_DIR}"

if [ -z "${DATABASE_URL:-}" ] && [ -z "${PGDATABASE:-}" ]; then
  echo "Erreur: ni DATABASE_URL ni PGDATABASE ne sont définis. Voir .env.example." >&2
  exit 1
fi

echo "==> Démarrage du backup PostgreSQL..."

if [ -n "${DATABASE_URL:-}" ]; then
  pg_dump --format=custom --file="${FILEPATH}" "${DATABASE_URL}"
else
  pg_dump --format=custom --file="${FILEPATH}"
fi

echo "==> Backup terminé : ${FILEPATH}"
echo "    Taille: $(du -h "${FILEPATH}" | cut -f1)"

# -----------------------------------------------------------------------------
# TODO (à adapter par l'équipe) : upload vers un stockage distant hors serveur.
# Le backup local seul ne suffit pas (perte du serveur = perte du backup).
#
# Exemple avec AWS S3 (nécessite awscli configuré) :
#   aws s3 cp "${FILEPATH}" "s3://votre-bucket-backups/db/${FILENAME}" \
#     --sse aws:kms
#
# Exemple générique avec rclone (fonctionne avec S3, GCS, Backblaze, etc.) :
#   rclone copy "${FILEPATH}" remote:votre-bucket-backups/db/
#
# Voir docs/backup-restore.md pour la politique de rétention recommandée
# (7 quotidiens + 4 hebdomadaires + 3 mensuels) et la procédure de test de
# restauration trimestrielle.
# -----------------------------------------------------------------------------

echo "==> N'oubliez pas d'uploader ce dump vers un stockage distant (voir commentaire dans ce script)."
