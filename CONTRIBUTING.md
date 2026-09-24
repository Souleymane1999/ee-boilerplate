# Contribuer

Le guide complet (convention de commits, process de PR/review, style de code, comment lancer les tests) vit dans [`docs/contributing.md`](docs/contributing.md).

Résumé rapide :

```bash
bundle install && yarn install
cp .env.example .env
bin/rails db:prepare
bin/dev
```

- App : http://localhost:3000
- Tests : `bundle exec rspec`

Commits au format [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, ...). CI (lint + tests + build + scans sécurité) doit être verte avant tout merge.
