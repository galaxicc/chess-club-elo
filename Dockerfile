FROM node:20-alpine

WORKDIR /app

# deps first for caching
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Persist data.json here (mount a volume in prod) or set DATA_FILE
ENV DATA_FILE=/data/data.json

CMD ["node", "server.js"]
