# Dockerfile de développement pour docker-compose (utilisé avec un bind mount
# du code source, gems installées dans un volume nommé pour la vitesse).
#
# Pour la production, voir Dockerfile.production (build multi-stage, image
# minimale, utilisateur non-root) — généré par `rails new` et à adapter à
# votre plateforme de déploiement (voir docs/runbook.md).

FROM ruby:3.2.2-slim

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential libpq-dev libyaml-dev pkg-config git curl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

WORKDIR /rails

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]
