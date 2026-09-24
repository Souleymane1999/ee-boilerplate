# 2. Authentification double : sessions pour le web, JWT pour l'API

## Statut
Accepté

## Contexte
L'app web (vues Devise, `/users/sign_in`) est server-rendered et utilise naturellement des sessions cookies. Mais une analyse des trois applications Rails réelles de l'équipe (`ipay-money-app`, `financial-ipay`, `i-money-app`) montre que **les 3 utilisent Devise + devise-jwt**, avec un modèle `User` incluant `:jwt_authenticatable` en plus des modules de session classiques — pour authentifier un client mobile/API séparé de l'interface web.

## Décision
Le boilerplate garde les sessions Devise standard pour le web (`/users/sign_in`, `/users/sign_up`), et ajoute `devise-jwt` pour un namespace JSON dédié (`/api/v1/login`, `/api/v1/logout`, `/api/v1/me`), sans toucher au comportement web.

Détails techniques :
- Un seul `devise_for :users` avec le module `:jwt_authenticatable` (`app/models/user.rb`).
- `config.jwt.dispatch_requests`/`revocation_requests` scopés aux seules routes `/api/v1/login` et `/api/v1/logout` (`config/initializers/devise.rb`) — le login web n'émet jamais de token.
- `Api::V1::SessionsController < Devise::SessionsController` répond en JSON, et override `verify_signed_out_user` (pensé pour les sessions cookies, ne détecte pas fiablement une requête authentifiée uniquement par JWT) par un `authenticate_user!` classique.
- `JsonOrHtmlFailureApp` (`app/lib/`) route la réponse d'échec d'authentification selon le chemin demandé : JSON 401 sous `/api/v1/*`, redirection HTML partout ailleurs. Piège rencontré : `request.path` dans un `Devise::FailureApp` pointe vers un chemin interne factice (`/unauthenticated`), pas vers la route réellement demandée — il faut utiliser `attempted_path` (`warden_options[:attempted_path]`).

## Conséquences
- Le pattern est cohérent avec les 3 projets réels de l'équipe : un dev qui a travaillé sur l'un d'eux retrouve la même logique ici.
- L'API `/api/v1` n'est qu'un exemple minimal (login/logout/me) — à étoffer selon les besoins réels du nouveau projet (pagination, versionning, etc.).
- Deux mécanismes d'authentification à maintenir plutôt qu'un seul ajoute de la surface : si un projet n'a vraiment aucun besoin d'API mobile, retirer `devise-jwt`, la colonne `jti`, et le namespace `api/v1` est un retrait propre (voir git history de ce commit).
