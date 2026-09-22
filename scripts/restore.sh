#!/usr/bin/env bash
# scripts/restore.sh
#
# Restaure un dump PostgreSQL (créé par scripts/backup.sh) vers la base cible.
#
# ATTENTION : ceci écrase les données de la base cible. Ne jamais lancer
# directement sur une base de production sans avoir pris un backup préalable
# de l'état actuel (voir docs/backup-restore.md).
#
# Usage:
#   ./scripts/restore.sh <chemin_vers_dump>
#
# Variables d'environnement attendues (voir .env.example) :
#   DATABASE_URL   ex: postgres://user:pass@host:5432/dbname

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <chemin_vers_dump>" >&2
  exit 1
fi

DUMP_FILE="$1"

if [ ! -f "${DUMP_FILE}" ]; then
  echo "Erreur: fichier introuvable: ${DUMP_FILE}" >&2
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ] && [ -z "${PGDATABASE:-}" ]; then
  echo "Erreur: ni DATABASE_URL ni PGDATABASE ne sont définis. Voir .env.example." >&2
  exit 1
fi

echo "==> Vous êtes sur le point de restaurer '${DUMP_FILE}' vers la base cible."
echo "    Cible: ${DATABASE_URL:-$PGDATABASE}"
read -r -p "    Confirmez (tapez 'oui' pour continuer) : " CONFIRM
if [ "${CONFIRM}" != "oui" ]; then
  echo "Annulé."
  exit 0
fi

echo "==> Restauration en cours..."

if [ -n "${DATABASE_URL:-}" ]; then
  pg_restore --clean --if-exists --no-owner --no-privileges --dbname="${DATABASE_URL}" "${DUMP_FILE}"
else
  pg_restore --clean --if-exists --no-owner --no-privileges "${DUMP_FILE}"
fi

echo "==> Restauration terminée."
echo "==> Vérifiez l'intégrité des données restaurées avant de rouvrir le trafic (voir docs/backup-restore.md)."
