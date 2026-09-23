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

**Exemple concret dans ce boilerplate** : `secret_key_base` (qui signe les cookies de session, y compris ceux de Devise) vit dans `backend/config/credentials.yml.enc` — généré automatiquement par Rails, jamais en clair. L'authentification est gérée par sessions Devise standard (cookies signés côté serveur), pas par un token à transporter côté client.

## Scans automatisés (CI)

- **Brakeman** : analyse statique de sécurité pour Rails (détecte SQL injection, XSS, mass assignment non protégé, etc.). Lancé à chaque push/PR dans `ci.yml`.
- **bundler-audit** : vérifie les gems du `Gemfile.lock` contre la base CVE connue.
- **yarn audit** : vérifie les dépendances JS (Tailwind CLI, esbuild) contre les vulnérabilités connues.
- **Dependabot** (`.github/dependabot.yml`) : ouvre automatiquement des PRs hebdomadaires pour mettre à jour les dépendances (bundler, yarn, GitHub Actions) — y compris les correctifs de sécurité.

## Checklist sécurité rapide avant chaque déploiement

- [ ] `bundle audit check` et `brakeman` passent sans finding critique non justifié.
- [ ] `yarn audit` ne remonte pas de vulnérabilité `high`/`critical` non résolue.
- [ ] Aucun secret en dur dans le code (grep rapide sur `password`, `secret`, `api_key`, `token`).
- [ ] HTTPS forcé en production (`config.force_ssl = true`).
- [ ] Rate limiting sur les endpoints sensibles (login, reset password) si applicable.

## Autres bonnes pratiques appliquées dans ce boilerplate

- `.gitignore` couvre `.env`, `*.key`, `node_modules/`, `log/`, `tmp/`, `backend/config/master.key`, `coverage/`.
- Protection CSRF standard Rails active par défaut (`ActionController::Base`) — les formulaires Devise l'utilisent nativement.
- Les vues ERB échappent le HTML par défaut (`<%= %>`) ; n'utiliser `<%== %>`/`raw`/`html_safe` que sur du contenu de confiance.
