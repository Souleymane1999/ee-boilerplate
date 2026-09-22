# Contribuer

Le guide complet (convention de commits, process de PR/review, style de code, comment lancer les tests) vit dans [`docs/contributing.md`](docs/contributing.md).

Résumé rapide :

```bash
cp .env.example .env
docker-compose up
```

- Backend : http://localhost:3000
- Frontend : http://localhost:5173
- Tests backend : `docker-compose exec backend bundle exec rspec`
- Tests frontend : `docker-compose exec frontend npm run test`

Commits au format [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, ...). CI (lint + tests + build + scans sécurité) doit être verte avant tout merge.
