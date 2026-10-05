FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# copy manifests first so the npm install layer is cached until deps change
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

# the official node image ships a non-root "node" user, no need to run as root
USER node

CMD ["node", "src/index.js"]
