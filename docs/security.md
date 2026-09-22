# Sécurité

## Gestion des secrets

### Règle d'or
Aucun secret (clé API, mot de passe, token, `master.key`) ne doit jamais être commité dans git.

### En local
- `backend/config/master.key` et `backend/config/credentials.yml.enc` : le `master.key` **n'est jamais commité** (voir `.gitignore` à la racine et dans `backend/`). `credentials.yml.enc` peut être commité (il est chiffré), mais sa clé de déchiffrement (`master.key` ou `RAILS_MASTER_KEY`) ne l'est jamais.
- Toutes les variables d'environnement locales vivent dans `.env` (jamais commité — voir `.env.example` pour la liste documentée des variables attendues, sans valeurs réelles).

### En CI/CD (GitHub Actions)
- Utiliser **GitHub Secrets** (`Settings > Secrets and variables > Actions`) pour toute valeur sensible : `RAILS_MASTER_KEY`, `SENTRY_DSN`, credentials de déploiement, etc.
- Référencer dans les workflows via `${{ secrets.NOM_DU_SECRET }}`.
- Ne jamais logguer un secret (`echo $SECRET` est interdit dans un step CI).
- Limiter les secrets aux jobs qui en ont réellement besoin (principe du moindre privilège).

### En production
- Utiliser le gestionnaire de secrets de la plateforme d'hébergement (variables d'environnement chiffrées du PaaS, AWS Secrets Manager, Vault, etc.).
- Rotation régulière des secrets sensibles (clés API tierces, credentials DB).

## Rails credentials

```bash
# Éditer les credentials chiffrés (ouvre un éditeur)
cd backend && EDITOR="code --wait" bin/rails credentials:edit

# En CI, injecter la clé via l'env plutôt que de committer master.key
RAILS_MASTER_KEY=${{ secrets.RAILS_MASTER_KEY }}
```

## Scans automatisés (CI)

- **Brakeman** : analyse statique de sécurité pour Rails (détecte SQL injection, XSS, mass assignment non protégé, etc.). Lancé à chaque push/PR dans `ci.yml`.
- **bundler-audit** : vérifie les gems du `Gemfile.lock` contre la base CVE connue.
- **npm audit** : vérifie les dépendances npm du frontend contre les vulnérabilités connues.
- **Dependabot** (`.github/dependabot.yml`) : ouvre automatiquement des PRs hebdomadaires pour mettre à jour les dépendances (bundler, npm, GitHub Actions) — y compris les correctifs de sécurité.

## Checklist sécurité rapide avant chaque déploiement

- [ ] `bundle audit check` et `brakeman` passent sans finding critique non justifié.
- [ ] `npm audit` ne remonte pas de vulnérabilité `high`/`critical` non résolue.
- [ ] Aucun secret en dur dans le code (grep rapide sur `password`, `secret`, `api_key`, `token`).
- [ ] CORS configuré strictement (pas de `*` en prod côté `rack-cors`).
- [ ] HTTPS forcé en production (`config.force_ssl = true`).
- [ ] Rate limiting sur les endpoints sensibles (login, reset password) si applicable.

## Autres bonnes pratiques appliquées dans ce boilerplate

- `.gitignore` couvre `.env`, `*.key`, `node_modules/`, `log/`, `tmp/`, `backend/config/master.key`, `coverage/`.
- Rails API mode désactive par défaut les vecteurs XSS liés aux vues (pas de rendu HTML côté serveur).
- `rack-cors` doit être configuré explicitement avec la liste des origines autorisées (`FRONTEND_URL`) plutôt qu'un wildcard.
