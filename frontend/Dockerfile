# Dockerfile de développement pour docker-compose.
# Pour la production, préférer un build multi-stage servant les fichiers
# statiques via nginx ou un CDN (voir docs/runbook.md).

FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
