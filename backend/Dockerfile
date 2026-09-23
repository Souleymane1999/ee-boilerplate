# Dockerfile de développement pour docker-compose (utilisé avec un bind mount
# du code source, gems/node_modules installés dans des volumes nommés pour la
# vitesse).
#
# Pour la production, voir Dockerfile.production (build multi-stage, image
# minimale, utilisateur non-root, assets précompilés) — à adapter à votre
# plateforme de déploiement (voir docs/runbook.md).

FROM ruby:3.2.2-slim

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential libpq-dev libyaml-dev pkg-config git curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install --no-install-recommends -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

WORKDIR /rails

COPY Gemfile Gemfile.lock ./
RUN bundle install && gem install foreman

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["bin/dev"]
