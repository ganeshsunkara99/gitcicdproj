FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=node:node server.js ./
COPY --chown=node:node src/ ./src/

USER node
EXPOSE 3000

CMD ["node", "server.js"]
